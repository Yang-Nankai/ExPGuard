"use strict";
/**
 * Main batch runner orchestrating parallel extension analysis
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
exports.runBatch = runBatch;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const job_resolver_1 = require("./job-resolver");
const worker_1 = require("./worker");
const statistics_1 = require("./statistics");
const html_report_1 = require("./html-report");
/**
 * Run batch analysis with concurrent workers
 */
function runBatch(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = Date.now();
        // Resolve jobs from input
        console.log(`[BATCH] Resolving jobs from ${options.input} (mode: ${options.sourceMode})...`);
        const jobs = (0, job_resolver_1.resolveJobs)(options.input, options.sourceMode, options.platform);
        if (jobs.length === 0) {
            console.log(`[BATCH] No extensions found in ${options.input}`);
            return {
                total: 0,
                findings: 0,
                errors: 0,
                startedAtMs: startTime,
                endedAtMs: Date.now(),
                results: [],
            };
        }
        console.log(`[BATCH] Found ${jobs.length} extension(s) to analyze`);
        // Determine worker count
        const workers = options.jobs || os_1.default.cpus().length;
        const actualWorkers = Math.min(workers, jobs.length);
        console.log(`[BATCH] Starting batch analysis with ${actualWorkers} concurrent worker(s)...`);
        // Create output directory
        fs_1.default.mkdirSync(options.outputDir, { recursive: true });
        // Run jobs concurrently with worker pool
        const results = [];
        const inProgress = new Set();
        let completed = 0;
        let totalFindings = 0;
        let totalErrors = 0;
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            const jobIndex = i;
            // Create worker promise
            const workerPromise = (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield (0, worker_1.runJob)(job, jobIndex, options.outputDir, {
                        html: options.html,
                        taintRules: options.taintRules,
                        timeout: options.timeout,
                    });
                    results.push(result);
                    completed++;
                    // Update counters
                    if (result.status === "error") {
                        totalErrors++;
                    }
                    totalFindings += result.findings;
                    // Log progress
                    const label = result.job.extensionId || result.job.input;
                    const icon = result.status === "error"
                        ? "⚠️"
                        : result.findings > 0
                            ? "🔴"
                            : "🟢";
                    console.log(`[BATCH] ${completed}/${jobs.length} ${icon} ${label} ` +
                        `(${result.findings} finding(s), ${(result.durationMs / 1000).toFixed(1)}s)`);
                }
                catch (err) {
                    console.error(`[BATCH] Unexpected error processing job ${jobIndex}:`, err);
                    totalErrors++;
                    completed++;
                }
            }))();
            inProgress.add(workerPromise);
            workerPromise.finally(() => inProgress.delete(workerPromise));
            // Wait if we've hit the concurrency limit
            if (inProgress.size >= actualWorkers) {
                yield Promise.race(inProgress);
            }
        }
        // Wait for all remaining jobs to complete
        yield Promise.all(inProgress);
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);
        console.log(`[BATCH] Complete: ${jobs.length} extensions, ${totalFindings} findings, ` +
            `${totalErrors} errors, ${duration}s`);
        // Sort results by job index for stable output
        results.sort((a, b) => {
            const indexA = jobs.indexOf(a.job);
            const indexB = jobs.indexOf(b.job);
            return indexA - indexB;
        });
        // Create batch summary
        const summary = {
            total: results.length,
            findings: totalFindings,
            errors: totalErrors,
            startedAtMs: startTime,
            endedAtMs: endTime,
            results,
        };
        // Write batch-summary.json
        const summaryPath = path_1.default.join(options.outputDir, "batch-summary.json");
        fs_1.default.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf-8");
        console.log(`[BATCH] Summary written to ${summaryPath}`);
        // Generate statistics report
        const stats = (0, statistics_1.generateStatistics)(summary);
        const statsPath = path_1.default.join(options.outputDir, "batch-statistics.json");
        fs_1.default.writeFileSync(statsPath, JSON.stringify(stats, null, 2), "utf-8");
        console.log(`[BATCH] Statistics written to ${statsPath}`);
        // Generate HTML report if any findings or errors exist
        if (totalFindings > 0 || totalErrors > 0) {
            const htmlReport = (0, html_report_1.generateHtmlReport)(stats);
            const htmlPath = path_1.default.join(options.outputDir, "batch-report.html");
            fs_1.default.writeFileSync(htmlPath, htmlReport, "utf-8");
            console.log(`[BATCH] HTML report written to ${htmlPath}`);
        }
        return summary;
    });
}
