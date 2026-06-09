/**
 * Worker for running individual extension analysis in isolated Node processes
 */

import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { BatchJob, JobResult } from "./types";

const REPO_ROOT = path.resolve(__dirname, "../..");
const MAIN_JS = path.join(REPO_ROOT, "dist", "main.js");

/**
 * Generate a safe slug for the job output directory
 */
export function generateJobSlug(job: BatchJob, index: number): string {
  const base =
    job.extensionId ||
    path.basename(job.input, path.extname(job.input)) ||
    "ext";
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").substring(0, 64);
  return `${String(index + 1).padStart(3, "0")}_${safe}`;
}

/**
 * Run a single extension analysis in an isolated Node subprocess
 */
export async function runJob(
  job: BatchJob,
  index: number,
  outputRoot: string,
  options: {
    html?: boolean;
    taintRules?: string;
    timeout?: number;
    nodeBin?: string;
  } = {}
): Promise<JobResult> {
  const jobOutputDir = path.join(outputRoot, generateJobSlug(job, index));

  // Create output directory
  fs.mkdirSync(jobOutputDir, { recursive: true });

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
  let errorMessage: string | undefined;

  try {
    await runProcess(nodeBin, args, REPO_ROOT, options.timeout);
  } catch (err) {
    procFailed = true;
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  const durationMs = Date.now() - startTime;

  // Read summary.json for analysis results
  const result: JobResult = {
    job,
    outputDir: jobOutputDir,
    status: "error",
    durationMs,
    totalFiles: 0,
    findings: 0,
    flowTypeCounts: {},
  };

  const summaryPath = path.join(jobOutputDir, "summary.json");
  if (fs.existsSync(summaryPath)) {
    try {
      const summary = JSON.parse(fs.readFileSync(summaryPath, "utf-8"));
      const flows = summary.flows || [];

      const flowTypeCounts: Record<string, number> = {};
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
    } catch (err) {
      result.status = "error";
      result.errorType = "BatchSummaryParse";
      result.errorMessage =
        err instanceof Error ? err.message : String(err);
    }
  } else {
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
}

/**
 * Run a process with optional timeout
 */
function runProcess(
  command: string,
  args: string[],
  cwd: string,
  timeout?: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let timer: NodeJS.Timeout | undefined;

    if (timeout) {
      timer = setTimeout(() => {
        timedOut = true;
        proc.kill("SIGTERM");
        setTimeout(() => proc.kill("SIGKILL"), 5000);
      }, timeout * 1000);
    }

    proc.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("error", (err) => {
      if (timer) clearTimeout(timer);
      reject(err);
    });

    proc.on("close", (code) => {
      if (timer) clearTimeout(timer);

      if (timedOut) {
        reject(new Error(`Process timed out after ${timeout}s`));
      } else if (code !== 0) {
        const tail = (stdout + stderr)
          .trim()
          .split("\n")
          .slice(-5)
          .join(" / ");
        reject(new Error(`Process exited with code ${code}: ${tail}`));
      } else {
        resolve();
      }
    });
  });
}
