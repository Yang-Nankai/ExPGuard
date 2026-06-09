/**
 * Main batch runner orchestrating parallel extension analysis
 */

import os from "os";
import path from "path";
import fs from "fs";
import { BatchOptions, BatchSummary, JobResult } from "./types";
import { resolveJobs } from "./job-resolver";
import { runJob } from "./worker";
import { generateStatistics } from "./statistics";
import { generateHtmlReport } from "./html-report";

/**
 * Run batch analysis with concurrent workers
 */
export async function runBatch(options: BatchOptions): Promise<BatchSummary> {
  const startTime = Date.now();

  // Resolve jobs from input
  console.log(`[BATCH] Resolving jobs from ${options.input} (mode: ${options.sourceMode})...`);
  const jobs = resolveJobs(options.input, options.sourceMode, options.platform);

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
  const workers = options.jobs || os.cpus().length;
  const actualWorkers = Math.min(workers, jobs.length);

  console.log(
    `[BATCH] Starting batch analysis with ${actualWorkers} concurrent worker(s)...`
  );

  // Create output directory
  fs.mkdirSync(options.outputDir, { recursive: true });

  // Run jobs concurrently with worker pool
  const results: JobResult[] = [];
  const inProgress: Set<Promise<void>> = new Set();
  let completed = 0;
  let totalFindings = 0;
  let totalErrors = 0;

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const jobIndex = i;

    // Create worker promise
    const workerPromise = (async () => {
      try {
        const result = await runJob(job, jobIndex, options.outputDir, {
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
        const icon =
          result.status === "error"
            ? "⚠️"
            : result.findings > 0
            ? "🔴"
            : "🟢";
        console.log(
          `[BATCH] ${completed}/${jobs.length} ${icon} ${label} ` +
            `(${result.findings} finding(s), ${(result.durationMs / 1000).toFixed(1)}s)`
        );
      } catch (err) {
        console.error(`[BATCH] Unexpected error processing job ${jobIndex}:`, err);
        totalErrors++;
        completed++;
      }
    })();

    inProgress.add(workerPromise);
    workerPromise.finally(() => inProgress.delete(workerPromise));

    // Wait if we've hit the concurrency limit
    if (inProgress.size >= actualWorkers) {
      await Promise.race(inProgress);
    }
  }

  // Wait for all remaining jobs to complete
  await Promise.all(inProgress);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log(
    `[BATCH] Complete: ${jobs.length} extensions, ${totalFindings} findings, ` +
      `${totalErrors} errors, ${duration}s`
  );

  // Sort results by job index for stable output
  results.sort((a, b) => {
    const indexA = jobs.indexOf(a.job);
    const indexB = jobs.indexOf(b.job);
    return indexA - indexB;
  });

  // Create batch summary
  const summary: BatchSummary = {
    total: results.length,
    findings: totalFindings,
    errors: totalErrors,
    startedAtMs: startTime,
    endedAtMs: endTime,
    results,
  };

  // Write batch-summary.json
  const summaryPath = path.join(options.outputDir, "batch-summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf-8");
  console.log(`[BATCH] Summary written to ${summaryPath}`);

  // Generate statistics report
  const stats = generateStatistics(summary);
  const statsPath = path.join(options.outputDir, "batch-statistics.json");
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), "utf-8");
  console.log(`[BATCH] Statistics written to ${statsPath}`);

  // Generate HTML report if any findings or errors exist
  if (totalFindings > 0 || totalErrors > 0) {
    const htmlReport = generateHtmlReport(stats);
    const htmlPath = path.join(options.outputDir, "batch-report.html");
    fs.writeFileSync(htmlPath, htmlReport, "utf-8");
    console.log(`[BATCH] HTML report written to ${htmlPath}`);
  }

  return summary;
}
