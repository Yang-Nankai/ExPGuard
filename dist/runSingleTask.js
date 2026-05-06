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
exports.runSingleTask = runSingleTask;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const taint_1 = require("./taint");
const logger_1 = __importDefault(require("./utils/logger"));
const interProceduralAnalyzer_1 = require("./def-use/analyzers/interProceduralAnalyzer");
const timer_1 = require("./utils/timer");
const config_1 = __importDefault(require("./config"));
const child_process_1 = require("child_process");
function serializeError(err) {
    var _a;
    if (err instanceof Error) {
        return (_a = err.stack) !== null && _a !== void 0 ? _a : err.message;
    }
    return String(err);
}
function withTimeout(task, timeoutMs, onTimeout) {
    return __awaiter(this, void 0, void 0, function* () {
        let timeoutId;
        const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
                onTimeout();
                reject(new Error(`Task timeout after ${timeoutMs} ms`));
            }, timeoutMs);
        });
        try {
            return yield Promise.race([task, timeoutPromise]);
        }
        finally {
            clearTimeout(timeoutId);
        }
    });
}
function runSingleTask(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const taskId = `Extension ${opts.extensionId}-${opts.extensionVersion}`;
        const outputDir = opts.outputDir;
        let errorMessage = "";
        yield promises_1.default.mkdir(outputDir, { recursive: true });
        logger_1.default.info(`Start analyzing task=${taskId}`);
        const timer = new timer_1.Timer(taskId);
        timer.start();
        // 1. 确定 worker 路径（兼容 TS 和编译后的 JS）
        const isTs = path_1.default.extname(__filename) === ".ts";
        const workerPath = path_1.default.join(__dirname, isTs ? "worker.ts" : "worker.js");
        // 2. 准备参数
        const workerArgs = JSON.stringify({
            extensionPath: opts.input,
            sourceType: opts.sourceType,
            outputDir: outputDir,
            extensionId: opts.extensionId,
            extensionVersion: opts.extensionVersion,
        });
        // 3. 启动子进程
        const child = (0, child_process_1.fork)(workerPath, [workerArgs], {
            // 如果是 TS 环境，自动载入 ts-node
            execArgv: isTs ? ["-r", "ts-node/register"] : [],
            stdio: "inherit", // 子进程日志直接输出到控制台
        });
        let status = "success";
        // 4. 处理超时杀掉进程
        const timeoutHandle = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (child.exitCode === null) {
                logger_1.default.warn(`Timeout: Killing child process for ${taskId}`);
                child.kill("SIGKILL"); // 强制杀死
                status = "timeout";
            }
        }), config_1.default.analysisTimeOut || 300000);
        // 5. 等待进程结束
        try {
            yield new Promise((resolve, reject) => {
                child.on("exit", (code) => {
                    clearTimeout(timeoutHandle);
                    if (status === "timeout") {
                        reject(new Error("Analysis Timed Out"));
                    }
                    else if (code !== 0) {
                        status = "error";
                        timer.stop();
                        const report = (0, taint_1.printTaintReportsCLI)(taint_1.taintManager.generateGlobalReport());
                        console.log(report);
                        reject(new Error(`Worker exited with code ${code}`));
                    }
                    else {
                        resolve();
                    }
                });
                child.on("error", reject);
            });
        }
        catch (err) {
            errorMessage = `Task ${taskId} failed: ${err}`;
            logger_1.default.error(errorMessage);
        }
        finally {
            if (status === "success") {
                timer.stop();
                const report = (0, taint_1.printTaintReportsCLI)(taint_1.taintManager.generateGlobalReport());
                const reportPath = path_1.default.join(outputDir, "report.txt");
                yield promises_1.default.appendFile(reportPath, report, "utf-8");
                const baseSummary = (_b = (_a = taint_1.taintManager.getGlobalSummary) === null || _a === void 0 ? void 0 : _a.call(taint_1.taintManager)) !== null && _b !== void 0 ? _b : {};
                const summary = Object.assign({ extensionId: opts.extensionId, extensionVersion: opts.extensionVersion, status, durationMs: timer.getElapsedDuration(), cacheStats: (_c = interProceduralAnalyzer_1.interAnalyzer.getCacheReport) === null || _c === void 0 ? void 0 : _c.call(interProceduralAnalyzer_1.interAnalyzer), errorMessage }, baseSummary);
                yield promises_1.default.writeFile(path_1.default.join(outputDir, "summary.json"), JSON.stringify(summary, null, 2), "utf-8");
                if (status === "success") {
                    logger_1.default.info("Analysis finished successfully");
                }
                else {
                    logger_1.default.warn(`Analysis finished with status=${status}`);
                }
            }
        }
    });
}
