import { Command } from "commander";
import path from "path";
import { runSingleTask } from "./run";
import config from "./config";

const program = new Command();

program
  .name("epg-analyzer")
  .description("Chrome Extension Privacy Analysis Framework")
  .version(config.appVersion);

program
  .command("analyze")
  .requiredOption("--type <type>", "CRX | DIR | WEB")
  .requiredOption("--input <path>", "CRX file path or directory path or web url")
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

    if (!["CRX", "DIR", "WEB"].includes(sourceType)) {
      console.error("Invalid --type, must be CRX | DIR | WEB");
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

    // Non-zero exit on failure so external orchestrators (e.g. the Python batch
    // runner in scripts/batch_analyze.py) can detect a failed analysis.
    if (result.status === "error") process.exitCode = 1;
  });

program.parse(process.argv);
