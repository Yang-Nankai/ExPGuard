"use strict";
/**
 * Worker for running individual extension analysis in isolated Node processes
 */
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
exports.generateJobSlug = generateJobSlug;
exports.runJob = runJob;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const REPO_ROOT = path_1.default.resolve(__dirname, "../..");
const MAIN_JS = path_1.default.join(REPO_ROOT, "dist", "main.js");
/**
 * Generate a safe slug for the job output directory
 */
function generateJobSlug(job, index) {
    const base = job.extensionId ||
        path_1.default.basename(job.input, path_1.default.extname(job.input)) ||
        "ext";
    const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").substring(0, 64);
    return `${String(index + 1).padStart(3, "0")}_${safe}`;
}
/**
 * Run a single extension analysis in an isolated Node subprocess
 */
function runJob(job_1, index_1, outputRoot_1) {
    return __awaiter(this, arguments, void 0, function* (job, index, outputRoot, options = {}) {
        const jobOutputDir = path_1.default.join(outputRoot, generateJobSlug(job, index));
        // Create output directory
        fs_1.default.mkdirSync(jobOutputDir, { recursive: true });
        // Build command
        const nodeBin = options.nodeBin || "node";
        const args = [
            MAIN_JS,
            "analyze",
            "--type",
            job.sourceType,
            "--input",
            job.input,
            "--out",
            jobOutputDir,
        ];
        if (job.extensionId) {
            args.push("--id", job.extensionId);
        }
        if (options.taintRules) {
            args.push("--taint-rules", options.taintRules);
        }
        if (options.html) {
            args.push("--html");
        }
        const startTime = Date.now();
        let procFailed = false;
        let errorMessage;
        try {
            yield runProcess(nodeBin, args, REPO_ROOT, options.timeout);
        }
        catch (err) {
            procFailed = true;
            errorMessage = err instanceof Error ? err.message : String(err);
        }
        const durationMs = Date.now() - startTime;
        // Read summary.json for analysis results
        const result = {
            job,
            outputDir: jobOutputDir,
            status: "error",
            durationMs,
            totalFiles: 0,
            findings: 0,
            flowTypeCounts: {},
        };
        const summaryPath = path_1.default.join(jobOutputDir, "summary.json");
        if (fs_1.default.existsSync(summaryPath)) {
            try {
                const summary = JSON.parse(fs_1.default.readFileSync(summaryPath, "utf-8"));
                const flows = summary.flows || [];
                const flowTypeCounts = {};
                for (const flow of flows) {
                    const flowType = flow.flowType || "UNKNOWN";
                    flowTypeCounts[flowType] = (flowTypeCounts[flowType] || 0) + 1;
                }
                result.status = summary.status || "error";
                result.totalFiles = summary.totalFiles || 0;
                result.findings = flows.length;
                result.flowTypeCounts = flowTypeCounts;
                const coverage = summary.coverage || {};
                result.nodeCoverage = coverage.nodeCoverage;
                result.scopeCoverage = coverage.scopeCoverage;
                result.errorType = summary.errorType;
                result.errorMessage = summary.errorMessage;
            }
            catch (err) {
                result.status = "error";
                result.errorType = "BatchSummaryParse";
                result.errorMessage =
                    err instanceof Error ? err.message : String(err);
            }
        }
        else {
            result.status = "error";
            result.errorType = "BatchCrash";
            result.errorMessage = errorMessage || "no summary.json produced";
        }
        // Override with process failure if applicable
        if (procFailed && result.status !== "error") {
            result.status = "error";
            result.errorType = result.errorType || "NodeNonZeroExit";
            result.errorMessage = result.errorMessage || errorMessage;
        }
        return result;
    });
}
/**
 * Run a process with optional timeout
 */
function runProcess(command, args, cwd, timeout) {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const proc = (0, child_process_1.spawn)(command, args, {
            cwd,
            stdio: ["ignore", "pipe", "pipe"],
        });
        let stdout = "";
        let stderr = "";
        let timedOut = false;
        let timer;
        if (timeout) {
            timer = setTimeout(() => {
                timedOut = true;
                proc.kill("SIGTERM");
                setTimeout(() => proc.kill("SIGKILL"), 5000);
            }, timeout * 1000);
        }
        (_a = proc.stdout) === null || _a === void 0 ? void 0 : _a.on("data", (data) => {
            stdout += data.toString();
        });
        (_b = proc.stderr) === null || _b === void 0 ? void 0 : _b.on("data", (data) => {
            stderr += data.toString();
        });
        proc.on("error", (err) => {
            if (timer)
                clearTimeout(timer);
            reject(err);
        });
        proc.on("close", (code) => {
            if (timer)
                clearTimeout(timer);
            if (timedOut) {
                reject(new Error(`Process timed out after ${timeout}s`));
            }
            else if (code !== 0) {
                const tail = (stdout + stderr)
                    .trim()
                    .split("\n")
                    .slice(-5)
                    .join(" / ");
                reject(new Error(`Process exited with code ${code}: ${tail}`));
            }
            else {
                resolve();
            }
        });
    });
}
