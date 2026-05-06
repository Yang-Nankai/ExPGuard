"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const paths_1 = require("./constants/paths");
const EXT_DIR = path_1.default.join(paths_1.DATA_PATH, "histories");
const RESULT_ROOT = path_1.default.join(paths_1.DATA_PATH, "results");
const TIMEOUT = 3 * 60 * 1000; // 3 分钟
function parseCrxName(filename) {
    /**
     * {a-p}{32}.{version}.crx
     */
    const m = filename.match(/^([a-p]{32})\.([0-9]+(?:\.[0-9]+)*)\.crx$/);
    if (!m)
        return null;
    return {
        extensionId: m[1],
        extensionVersion: m[2],
    };
}
// Compare version strings like "1.2.10" > "1.2.9"
function compareVersion(v1, v2) {
    const a = v1.split(".").map(Number);
    const b = v2.split(".").map(Number);
    const len = Math.max(a.length, b.length);
    for (let i = 0; i < len; i++) {
        const n1 = a[i] || 0;
        const n2 = b[i] || 0;
        if (n1 !== n2)
            return n1 - n2;
    }
    return 0;
}
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const globalSummary = {
            withSinks: [],
            withTaintOnly: [],
            clean: [],
        };
        // 1️⃣ 读取并收集 crx + size + meta
        const allCrxFiles = fs_1.default
            .readdirSync(EXT_DIR)
            .filter((f) => f.endsWith(".crx"))
            .map((file) => {
            const meta = parseCrxName(file);
            if (!meta)
                return null;
            const fullPath = path_1.default.join(EXT_DIR, file);
            const stat = fs_1.default.statSync(fullPath);
            return {
                file,
                size: stat.size,
                extensionId: meta.extensionId,
                extensionVersion: meta.extensionVersion,
            };
        })
            .filter((f) => !!f); // 过滤 null
        // 2️⃣ 按 extensionId 分组，保留最新版本
        const latestCrxMap = new Map();
        for (const crx of allCrxFiles) {
            const existing = latestCrxMap.get(crx.extensionId);
            if (!existing || compareVersion(crx.extensionVersion, existing.extensionVersion) > 0) {
                latestCrxMap.set(crx.extensionId, crx);
            }
        }
        // 3️⃣ 得到最终待处理的 crx 列表，并按文件大小排序
        const crxFiles = Array.from(latestCrxMap.values()).sort((a, b) => a.size - b.size);
        console.log(`📦 Found ${crxFiles.length} latest-version crx files, processing from small → large`);
        for (const { file, size, extensionId, extensionVersion } of crxFiles) {
            const extensionPath = path_1.default.join(EXT_DIR, file);
            const outputDir = path_1.default.join(RESULT_ROOT, `${extensionId}.${extensionVersion}`);
            fs_1.default.mkdirSync(outputDir, { recursive: true });
            console.log(`▶ Processing ${file} (${(size / 1024 / 1024).toFixed(2)} MB)`);
            const child = (0, child_process_1.fork)(path_1.default.join(__dirname, "worker.js"), [
                JSON.stringify({
                    extensionPath,
                    extensionId,
                    extensionVersion,
                    outputDir,
                }),
            ], { stdio: "inherit" });
            const timer = setTimeout(() => {
                console.error(`⏱ Timeout: ${file}`);
                child.kill("SIGKILL");
            }, TIMEOUT);
            yield new Promise((resolve) => {
                child.once("exit", () => {
                    clearTimeout(timer);
                    resolve();
                });
            });
            const summaryPath = path_1.default.join(outputDir, "summary.json");
            if (fs_1.default.existsSync(summaryPath)) {
                const s = JSON.parse(fs_1.default.readFileSync(summaryPath, "utf-8"));
                if (s.hasSink) {
                    globalSummary.withSinks.push(s);
                }
                else if (s.hasTaint) {
                    globalSummary.withTaintOnly.push(s);
                }
                else {
                    globalSummary.clean.push(s);
                }
            }
        }
        const globalReportPath = path_1.default.join(RESULT_ROOT, "GLOBAL_REPORT.json");
        fs_1.default.writeFileSync(globalReportPath, JSON.stringify({
            generatedAt: new Date().toISOString(),
            stats: {
                total: globalSummary.withSinks.length +
                    globalSummary.withTaintOnly.length +
                    globalSummary.clean.length,
                withSinks: globalSummary.withSinks.length,
                withTaintOnly: globalSummary.withTaintOnly.length,
                clean: globalSummary.clean.length,
            },
            results: globalSummary,
        }, null, 2));
        console.log(`📊 Global report written to ${globalReportPath}`);
        console.log("✅ All extensions processed");
    });
})();
