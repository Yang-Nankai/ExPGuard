import { Command } from "commander";
import path from "path";
import fs from "fs";
import { runSingleTask } from "./run";
import { runBatch } from "../batch";
import config from "./config";

const program = new Command();

program
  .name("epg-analyzer")
  .description("Browser Extension Privacy Analysis Framework")
  .version(config.appVersion);

program
  .command("analyze")
  .description("Analyze a single extension")
  .requiredOption("--type <type>", "CRX | DIR | WEB | XPI")
  .requiredOption("--input <path>", "CRX/XPI file path or directory path or web url")
  .option("--out <dir>", "output directory", "./results")
  .option("--id <extensionId>", "extension id")
  .option(
    "--taint-rules <path>",
    "path to a custom taint rule file (.json or .ts/.js) to layer on top of the defaults",
  )
  .option(
    "--html",
    "additionally emit a self-contained report.html (folder tree + propagation timeline)",
    false,
  )
  .action(async (opts) => {
    const sourceType = opts.type.toUpperCase();

    if (!["CRX", "DIR", "WEB", "XPI"].includes(sourceType)) {
      console.error("Invalid --type, must be CRX | DIR | WEB | XPI");
      process.exit(1);
    }

    const result = await runSingleTask({
      sourceType,
      input: opts.input,
      outputDir: path.resolve(opts.out),
      extensionId: opts.id,
      taintRulesPath: opts.taintRules ? path.resolve(opts.taintRules) : undefined,
      emitHtml: opts.html,
    });

    // Non-zero exit on failure so external orchestrators can detect a failed analysis.
    if (result.status === "error") process.exitCode = 1;
  });

program
  .command("batch")
  .description("Batch analyze multiple extensions with parallel workers")
  .requiredOption("-i, --input <path>", "Input directory or JSONL file")
  .requiredOption("-m, --mode <mode>", "Source mode: directory | jsonl")
  .requiredOption("-p, --platform <platform>", "Target platform: chrome | firefox")
  .option("-o, --output <dir>", "Output directory", "./results/batch")
  .option("-j, --jobs <number>", "Number of concurrent workers (default: CPU count)", (val) =>
    parseInt(val, 10)
  )
  .option("--html", "Generate HTML reports for each extension", false)
  .option("--taint-rules <path>", "Path to custom taint rules file")
  .option("--timeout <seconds>", "Timeout per extension in seconds", (val) =>
    parseFloat(val)
  )
  .action(async (opts) => {
    // Validate options
    if (!["directory", "jsonl"].includes(opts.mode)) {
      console.error("Error: --mode must be 'directory' or 'jsonl'");
      process.exit(1);
    }

    if (!["chrome", "firefox"].includes(opts.platform)) {
      console.error("Error: --platform must be 'chrome' or 'firefox'");
      process.exit(1);
    }

    const inputPath = path.resolve(opts.input);
    if (!fs.existsSync(inputPath)) {
      console.error(`Error: Input path not found: ${inputPath}`);
      process.exit(1);
    }

    // Validate mode matches input
    const isDir = fs.statSync(inputPath).isDirectory();
    if (opts.mode === "directory" && !isDir) {
      console.error("Error: --mode is 'directory' but input is not a directory");
      process.exit(1);
    }
    if (opts.mode === "jsonl" && isDir) {
      console.error("Error: --mode is 'jsonl' but input is a directory");
      process.exit(1);
    }

    try {
      const summary = await runBatch({
        input: inputPath,
        sourceMode: opts.mode,
        platform: opts.platform,
        outputDir: path.resolve(opts.output),
        jobs: opts.jobs,
        html: opts.html,
        taintRules: opts.taintRules ? path.resolve(opts.taintRules) : undefined,
        timeout: opts.timeout,
      });

      // Exit with error code if any extension failed
      if (summary.errors > 0) {
        process.exitCode = 1;
      }
    } catch (err) {
      console.error("[BATCH] Fatal error:", err);
      process.exit(1);
    }
  });

program.parse(process.argv);
