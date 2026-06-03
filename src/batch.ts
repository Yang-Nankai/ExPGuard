// batch.ts
//
// Batch analysis: run ExPGuard over many extensions in one process, resetting
// all analysis-global state between each so runs don't contaminate one another.
// Emits live console progress and (optionally) Feishu webhook cards — a
// progress card after each extension and a final summary card.
//
// Input forms (auto-detected):
//   - A .json manifest: { "extensions": [ { "type": "DIR"|"CRX"|"WEB",
//       "input": "<path|url>", "id"?: "...", "version"?: "..." }, ... ] }
//     (a bare top-level array of those items is also accepted)
//   - A directory: each immediate child that is itself an unpacked extension
//     (contains manifest.json) or a *.crx file becomes one job.

import fs from "fs";
import path from "path";
import { runSingleTask, resetAnalysisState, RunResult } from "./run";
import { ExtensionSourceType } from "./extension/extensionLoader";
import logger from "./utils/logger";
import { FeishuNotifier } from "./notify/feishu";
import { buildProgressCard, buildSummaryCard } from "./notify/feishuCards";

export interface BatchJob {
  sourceType: ExtensionSourceType;
  input: string;
  extensionId?: string;
  extensionVersion?: string;
}

export interface BatchOptions {
  /** Manifest file (.json) or a directory of extensions. */
  input: string;
  /** Root output directory; each job writes to <out>/<slug>. */
  outputDir: string;
  taintRulesPath?: string;
  emitHtml?: boolean;
  feishuWebhook?: string;
  feishuSecret?: string;
  /** Send a Feishu progress card at most every N completed jobs (default 1). */
  progressEvery?: number;
  nowMs?: () => number;
}

/** Filesystem-safe slug for an extension's output subdirectory. */
function slugFor(job: BatchJob, index: number): string {
  const base =
    job.extensionId ||
    path.basename(job.input).replace(/\.(crx|zip)$/i, "") ||
    `ext`;
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 64);
  return `${String(index + 1).padStart(3, "0")}_${safe}`;
}

function coerceSourceType(raw: string): ExtensionSourceType {
  const up = String(raw || "").toUpperCase();
  if (up === "CRX") return ExtensionSourceType.CRX;
  if (up === "WEB") return ExtensionSourceType.WEB;
  return ExtensionSourceType.DIR;
}

/** Parse a manifest item into a BatchJob. */
function jobFromManifestItem(item: any): BatchJob | null {
  if (!item || typeof item !== "object") return null;
  const input = item.input ?? item.path ?? item.url;
  if (!input || typeof input !== "string") return null;
  return {
    sourceType: coerceSourceType(item.type ?? item.sourceType ?? "DIR"),
    input,
    extensionId: item.id ?? item.extensionId,
    extensionVersion: item.version ?? item.extensionVersion,
  };
}

/** Discover jobs from a directory: child unpacked extensions and *.crx files. */
function jobsFromDirectory(dir: string): BatchJob[] {
  const jobs: BatchJob[] = [];
  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    logger.error(`[BATCH] Cannot read input directory ${dir}: ${String(err)}`);
    return jobs;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fs.existsSync(path.join(full, "manifest.json"))) {
        jobs.push({ sourceType: ExtensionSourceType.DIR, input: full });
      }
    } else if (entry.isFile() && /\.crx$/i.test(entry.name)) {
      jobs.push({ sourceType: ExtensionSourceType.CRX, input: full });
    }
  }
  return jobs;
}

/** Resolve the batch input into a concrete job list. */
export function resolveJobs(input: string): BatchJob[] {
  const stat = fs.statSync(input);

  if (stat.isDirectory()) {
    return jobsFromDirectory(input);
  }

  // Treat as a JSON manifest.
  const raw = fs.readFileSync(input, "utf-8");
  const parsed = JSON.parse(raw);
  const items: any[] = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.extensions)
      ? parsed.extensions
      : [];
  return items
    .map(jobFromManifestItem)
    .filter((j): j is BatchJob => j !== null);
}

/**
 * Run a batch. Returns the per-extension results. Never throws on a single
 * extension's failure — the failure is captured in that extension's RunResult.
 */
export async function runBatch(opts: BatchOptions): Promise<RunResult[]> {
  const now = opts.nowMs ?? (() => Date.now());
  const jobs = resolveJobs(opts.input);

  if (jobs.length === 0) {
    logger.warn(`[BATCH] No extensions found at ${opts.input}`);
    return [];
  }

  fs.mkdirSync(opts.outputDir, { recursive: true });

  const notifier = new FeishuNotifier({
    webhook: opts.feishuWebhook,
    secret: opts.feishuSecret,
  });
  const progressEvery = Math.max(1, opts.progressEvery ?? 1);

  const results: RunResult[] = [];
  const startedAtMs = now();
  let findings = 0;
  let errors = 0;

  logger.info(`[BATCH] Starting batch of ${jobs.length} extension(s)`);
  if (notifier.enabled) {
    await notifier.sendCard(
      buildProgressCard({
        total: jobs.length,
        completed: 0,
        current: jobs[0].extensionId || jobs[0].input,
        findings: 0,
        errors: 0,
        startedAtMs,
        nowMs: now(),
      }),
    );
  }

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const slug = slugFor(job, i);
    const jobOut = path.join(opts.outputDir, slug);
    const label = job.extensionId || job.input;

    logger.info(`[BATCH] (${i + 1}/${jobs.length}) analyzing ${label}`);
    // Console progress line (carriage-return updated for a live feel).
    process.stdout.write(
      `\r[BATCH] ${i + 1}/${jobs.length} → ${truncate(label, 48)}`.padEnd(80) +
        "\n",
    );

    // Fresh state for every extension — the core batch-safety guarantee.
    resetAnalysisState();

    let result: RunResult;
    try {
      result = await runSingleTask({
        sourceType: job.sourceType,
        input: job.input,
        outputDir: jobOut,
        extensionId: job.extensionId,
        extensionVersion: job.extensionVersion,
        taintRulesPath: opts.taintRulesPath,
        emitHtml: opts.emitHtml,
      });
    } catch (err) {
      // runSingleTask already guards internally, but never let the batch die.
      logger.error(`[BATCH] ${label} crashed: ${String(err)}`);
      result = {
        sourceType: job.sourceType,
        input: job.input,
        extensionId: job.extensionId,
        extensionVersion: job.extensionVersion,
        outputDir: jobOut,
        status: "error",
        durationMs: 0,
        totalFiles: 0,
        findings: 0,
        flowTypeCounts: {},
        errorType: "BatchCrash",
        errorMessage: String(err),
      };
    }

    results.push(result);
    findings += result.findings;
    if (result.status === "error") errors++;

    const isLast = i === jobs.length - 1;
    if (
      notifier.enabled &&
      ((i + 1) % progressEvery === 0 || isLast)
    ) {
      await notifier.sendCard(
        buildProgressCard({
          total: jobs.length,
          completed: i + 1,
          current: isLast ? undefined : jobs[i + 1].extensionId || jobs[i + 1].input,
          findings,
          errors,
          startedAtMs,
          nowMs: now(),
        }),
      );
    }
  }

  const endedAtMs = now();
  logger.info(
    `[BATCH] Done. extensions=${results.length} findings=${findings} errors=${errors} ` +
      `time=${Math.round((endedAtMs - startedAtMs) / 1000)}s`,
  );

  // Write a machine-readable batch summary.
  try {
    fs.writeFileSync(
      path.join(opts.outputDir, "batch-summary.json"),
      JSON.stringify(
        {
          total: results.length,
          findings,
          errors,
          startedAtMs,
          endedAtMs,
          results,
        },
        null,
        2,
      ),
      "utf-8",
    );
  } catch (err) {
    logger.error(`[BATCH] Failed to write batch-summary.json: ${String(err)}`);
  }

  if (notifier.enabled) {
    await notifier.sendCard(buildSummaryCard(results, startedAtMs, endedAtMs));
  }

  return results;
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}
