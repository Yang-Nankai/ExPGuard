import path from "path";
import fs from "fs/promises";
import { epgModelBuilder } from "./epgmodelbuilder";
import { ExtensionSourceType } from "./extension/extensionLoader";
import {
  taintManager,
  printTaintReportsCLI,
  renderHtmlReport,
  collectFileTree,
  buildReportModel,
  renderModelJson,
  renderModelMarkdown,
  ScriptSource,
} from "./taint";
import { computeCoverage, formatCoveragePct } from "./coverage/coverage";
import { scopeController } from "./scope/scopeCtrl";
import { taintRuleEngine } from "./taint/ruleEngine";
import config from "./config";
import logger, { setLogFile } from "./utils/logger";
import { interAnalyzer } from "./def-use/analyzers/interProceduralAnalyzer";
import { cleanupArtifacts } from "./utils/cleanup";
import { Timer } from "./utils/timer";

type TaskStatus = "success" | "error";

/** Structured outcome of a single extension analysis. */
export interface RunResult {
  extensionId?: string;
  extensionVersion?: string;
  sourceType: ExtensionSourceType;
  input: string;
  outputDir: string;
  status: TaskStatus;
  durationMs: number;
  totalFiles: number;
  /** Number of taint flows detected. */
  findings: number;
  /** Per-flowType finding counts. */
  flowTypeCounts: Record<string, number>;
  /** Node coverage ratio 0..1, if computed. */
  nodeCoverage?: number;
  scopeCoverage?: number;
  errorType?: string;
  errorMessage?: string;
}

interface RunOptions {
  sourceType: ExtensionSourceType;
  input: string;
  outputDir: string;
  extensionId?: string;
  extensionVersion?: string;
  /**
   * Optional path to a custom taint-rule file. Overrides
   * `config.taintRulesPath` for this run only. The engine layers the file
   * on top of the bundled defaults; it does not replace them.
   */
  taintRulesPath?: string;

  /**
   * When true, also write a self-contained `report.html` to the output
   * directory. Overrides `config.emitHtmlReport` for this run only.
   */
  emitHtml?: boolean;
}

interface TaskError {
  type?: string;
  message?: string;
}

function serializeError(err: unknown): TaskError {
  if (err instanceof Error) {
    return {
      type: err.name,
      message: err.stack ?? err.message,
    };
  }
  return {
    type: "UnknownError",
    message: String(err),
  };
}

async function safeWriteFile(
  filePath: string,
  content: string,
): Promise<void> {
  try {
    await fs.writeFile(filePath, content, "utf-8");
  } catch (err) {
    logger.error(`[] Failed to write file: ${filePath}`);
    logger.error(String(err));
  }
}

export async function runSingleTask(opts: RunOptions): Promise<RunResult> {
  const outputDir = opts.outputDir;

  await fs.mkdir(outputDir, { recursive: true });
  setLogFile(path.join(outputDir, "analysis.log"));

  // Load any user-supplied taint rules before analysis starts. The CLI flag
  // takes precedence over `config.taintRulesPath`; pass `--taint-rules ""`
  // to skip both. Failures here are logged and the analyzer falls back to
  // the bundled default ruleset.
  const rulesPath = opts.taintRulesPath ?? config.taintRulesPath;
  if (rulesPath) {
    try {
      taintRuleEngine.loadFromFile(rulesPath);
    } catch (err) {
      logger.error(
        `[TAINT-RULES] Failed to load ${rulesPath}, falling back to defaults: ${String(err)}`,
      );
    }
  }

  const timer = new Timer("EPG Run Analysis Task");
  timer.start();

  let status: TaskStatus = "success";
  let taskError: TaskError | undefined;
  let result: RunResult;

  try {
    await epgModelBuilder.analyze({
      extensionPath: opts.input,
      extensionType: opts.sourceType,
      outputPath: outputDir,
      extensionId: opts.extensionId ?? "unknown",
      extensionVersion: opts.extensionVersion,
    });
    
  } catch (err) {
    status = "error";
    taskError = serializeError(err);
    logger.error(taskError.message);
  } finally {

    timer.stop();
    const fileStats: any[] = epgModelBuilder.extensionContext?.getScriptsSummary() ?? [];

    // Effective extension ID. For XPI the ID is derived from the manifest's
    // gecko settings inside the loader, so prefer the resolved context ID over
    // the (possibly undefined) CLI-supplied one.
    const effectiveId =
      epgModelBuilder.extensionContext?.id ?? opts.extensionId;
    const effectiveExtensionVersion = opts.extensionVersion;

   try {
     // Source-level report: resolve every propagation step back to the
     // extension's own source and emit a compact, de-duplicated report.
     // Format ("json" | "md" | "both") and sink filtering are config-driven.
     const ctx = epgModelBuilder.extensionContext;
     const sources: ScriptSource[] = [];
     if (ctx) {
       for (const script of ctx.scripts.values()) {
         try {
           const code = script.getCode?.();
           if (typeof code === "string") {
             sources.push({ key: script.key, code });
           }
         } catch {
           /* skip unreadable script */
         }
       }
     }

     const model = buildReportModel({
       // includeCode:false — the source report recomputes its own compact,
       // resolved code lines, so per-step snippet building in the engine would
       // be wasted work (it runs once per propagation step, i.e. millions of
       // times on pathological flows).
       reports: taintManager.generateGlobalReport({
         level: "detailed",
         includeCode: false,
         dedupSources: true,
       }),
       sources,
       extensionId: effectiveId ?? "unknown",
       extensionVersion: effectiveExtensionVersion,
       sourceType: opts.sourceType,
       onlyWithSinks: config.reportOnlyWithSinks,
     });

     const fmt = config.reportFormat;
     if (fmt === "json" || fmt === "both") {
       await safeWriteFile(
         path.join(outputDir, "report.flows.json"),
         renderModelJson(model),
       );
     }
     if (fmt === "md" || fmt === "both") {
       await safeWriteFile(
         path.join(outputDir, "report.source.md"),
         renderModelMarkdown(model),
       );
     }
   } catch (err) {
     logger.error(
       `[REPORT] Failed to generate/write source report: ${String(err)}`,
     );
   }

    const baseSummary = taintManager.getGlobalSummary?.() ?? {};

    // Analysis coverage: how much of the extension's code the analyzer reached.
    // Computed from the in-memory scope trees / CFGs before any teardown.
    let coverage: ReturnType<typeof computeCoverage> | undefined;
    try {
      coverage = computeCoverage(scopeController.pageScopeTrees);
      logger.info(
        `[COVERAGE] node=${formatCoveragePct(coverage.nodeCoverage)} ` +
          `(${coverage.coveredNodes}/${coverage.totalNodes}) ` +
          `scope=${formatCoveragePct(coverage.scopeCoverage)} ` +
          `(${coverage.coveredScopes}/${coverage.totalScopes}) ` +
          `scripts=${coverage.analyzedScripts}`,
      );
    } catch (err) {
      logger.error(`[COVERAGE] Failed to compute coverage: ${String(err)}`);
    }

    const summary = {
      extensionId: effectiveId,
      ...(effectiveExtensionVersion
        ? { extensionVersion: effectiveExtensionVersion }
        : {}),
      sourceType: opts.sourceType,
      status,
      duration: timer.getDuration(),
      files: fileStats, // save file details to summary
      totalFiles: fileStats.length,
      totalSize: fileStats.reduce((acc, f) => acc + f.size, 0),
      cacheStats: interAnalyzer.getCacheReport?.(),
      coverage,
      errorType: taskError?.type,
      errorMessage: taskError?.message,
      analysisConfiguration: {
        enableModuleResolution: config.enableModuleResolution,
        enableStorageImplicitPropagation:
          config.enableStorageImplicitPropagation,
      },
      ...baseSummary,
    };

    await safeWriteFile(
      path.join(outputDir, "summary.json"),
      JSON.stringify(summary, null, 2),
    );

    // Optional self-contained HTML report. Must run BEFORE cleanupArtifacts(),
    // which deletes the unpacked/ dir we read code snippets and the file tree
    // from. Failures here are logged and never abort the run.
    if ((opts.emitHtml ?? config.emitHtmlReport) && status !== "error") {
      try {
        const ctx = epgModelBuilder.extensionContext;
        const html = renderHtmlReport({
          meta: {
            extensionId: effectiveId,
            extensionVersion: effectiveExtensionVersion,
            sourceType: opts.sourceType,
            generatedAt: new Date().toISOString(),
            durationMs: timer.getDurationMs(),
          } as any,
          manifest: ctx?.manifest ?? {},
          files: ctx ? collectFileTree(ctx.baseDir) : [],
          scripts: fileStats,
          reports: taintManager.generateGlobalReport({ includeCode: true }),
          flows: (baseSummary as any).flows ?? [],
          coverage,
        });
        await safeWriteFile(path.join(outputDir, "report.html"), html);
        logger.info(`[HTML-REPORT] wrote ${path.join(outputDir, "report.html")}`);
      } catch (err) {
        logger.error(`[HTML-REPORT] Failed to generate report.html: ${String(err)}`);
      }
    }

    // cleanup
    await cleanupArtifacts(outputDir, summary);

    logger.info(`Analysis finished with status=${status}`);

    // Aggregate a structured result for the CLI caller.
    const flows: any[] = (baseSummary as any).flows ?? [];
    const flowTypeCounts: Record<string, number> = {};
    for (const f of flows) {
      flowTypeCounts[f.flowType] = (flowTypeCounts[f.flowType] ?? 0) + 1;
    }
    result = {
      extensionId: effectiveId,
      extensionVersion: effectiveExtensionVersion,
      sourceType: opts.sourceType,
      input: opts.input,
      outputDir,
      status,
      durationMs: timer.getDurationMs(),
      totalFiles: fileStats.length,
      findings: flows.length,
      flowTypeCounts,
      nodeCoverage: coverage?.nodeCoverage,
      scopeCoverage: coverage?.scopeCoverage,
      errorType: taskError?.type,
      errorMessage: taskError?.message,
    };
  }

  return result;
}
