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
  .option("--version <version>", "extension version")
  .action(async (opts) => {
    const sourceType = opts.type.toUpperCase();

    if (!["CRX", "DIR", "WEB"].includes(sourceType)) {
      console.error("Invalid --type, must be CRX | DIR | WEB");
      process.exit(1);
    }

    await runSingleTask({
      sourceType,
      input: opts.input,
      outputDir: path.resolve(opts.out),
      extensionId: opts.id,
      extensionVersion: opts.version,
    });
  });

program.parse(process.argv);
