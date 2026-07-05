import { Command } from "commander";
import path from "path";
import { runSingleTask } from "./run";
import config from "./config";

const program = new Command();

program
  .name("epg-analyzer")
  .description("Browser Extension Privacy Analysis Framework")
  .version(config.appVersion);

program
  .command("analyze")
  .requiredOption("--type <type>", "CRX | DIR | WEB | XPI")
  .requiredOption("--input <path>", "CRX/XPI file path or directory path or web url")
  .option("--out <dir>", "output directory", "./results")
  .option("--id <extensionId>", "extension id")
  .option(
    "--extension-version <version>",
    "extension version to include in summary and generated reports",
  )
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
      extensionVersion: opts.extensionVersion,
      taintRulesPath: opts.taintRules ? path.resolve(opts.taintRules) : undefined,
      emitHtml: opts.html,
    });

    if (result.status === "error") process.exitCode = 1;
  });

program.parse(process.argv);
