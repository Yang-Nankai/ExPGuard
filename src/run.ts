import path from "path";
import fs from "fs/promises";
import { epgModelBuilder } from "./epgmodelbuilder";
import { ExtensionSourceType } from "./extension/extensionLoader";
import { taintManager, printTaintReportsCLI, renderHtmlReport, collectFileTree } from "./taint";
import { taintRuleEngine } from "./taint/ruleEngine";
import config from "./config";
import logger, { setLogFile } from "./utils/logger";
import { interAnalyzer } from "./def-use/analyzers/interProceduralAnalyzer";
import { cleanupArtifacts } from "./utils/cleanup";
import { Timer } from "./utils/timer";

type TaskStatus = "success" | "error";

interface RunOptions {
  sourceType: ExtensionSourceType;
  input: string;
  outputDir: string;
  extensionId?: string;
  extensionVersion?: string;
  /**
   * Optional path to a custom taint-rule file. Overrides
   * `config.taintRulesPath` for this run only. The engine layers the file
   * on top of the bundled defaults — it does not replace them.
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

export async function runSingleTask(opts: RunOptions) {
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

   try {
     const report = printTaintReportsCLI(
       taintManager.generateGlobalReport(),
     );
     await fs.appendFile(
       path.join(outputDir, "report.txt"),
       report,
       "utf-8",
     );
   } catch (err) {
     logger.error("[REPORT] Failed to generate/write report");
   }

    const baseSummary = taintManager.getGlobalSummary?.() ?? {};
    const summary = {
      extensionId: opts.extensionId,
      extensionVersion: opts.extensionVersion,
      sourceType: opts.sourceType,
      status,
      duration: timer.getDuration(),
      files: fileStats, // save file details to summary
      totalFiles: fileStats.length,
      totalSize: fileStats.reduce((acc, f) => acc + f.size, 0),
      cacheStats: interAnalyzer.getCacheReport?.(),
      errorType: taskError?.type,
      errorMessage: taskError?.message,
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
            extensionId: opts.extensionId,
            extensionVersion: opts.extensionVersion,
            sourceType: opts.sourceType,
            generatedAt: new Date().toISOString(),
            durationMs: timer.getDurationMs(),
          } as any,
          manifest: ctx?.manifest ?? {},
          files: ctx ? collectFileTree(ctx.baseDir) : [],
          scripts: fileStats,
          reports: taintManager.generateGlobalReport({ includeCode: true }),
          flows: (baseSummary as any).flows ?? [],
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
  }
}
