import { Command } from "commander";
import path from "path";
import { runSingleTask } from "./run";
import { runBatch } from "./batch";
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

    await runSingleTask({
      sourceType,
      input: opts.input,
      outputDir: path.resolve(opts.out),
      extensionId: opts.id,
      taintRulesPath: opts.taintRules ? path.resolve(opts.taintRules) : undefined,
      emitHtml: opts.html,
    });
  });

program
  .command("analyze-batch")
  .description(
    "Analyze many extensions in one run, with live Feishu progress cards",
  )
  .requiredOption(
    "--input <path>",
    "a JSON manifest of extensions, or a directory of unpacked extensions / *.crx files",
  )
  .option("--out <dir>", "root output directory", "./results/batch")
  .option(
    "--taint-rules <path>",
    "path to a custom taint rule file applied to every extension",
  )
  .option("--html", "emit report.html for each extension", false)
  .option(
    "--feishu-webhook <url>",
    "Feishu (Lark) custom-bot webhook URL for progress + summary cards",
  )
  .option(
    "--feishu-secret <secret>",
    "Feishu custom-bot signing secret (if signature verification is enabled)",
  )
  .option(
    "--progress-every <n>",
    "send a Feishu progress card every N completed extensions",
    "1",
  )
  .action(async (opts) => {
    const webhook = opts.feishuWebhook ?? process.env.EPG_FEISHU_WEBHOOK;
    const secret = opts.feishuSecret ?? process.env.EPG_FEISHU_SECRET;

    const results = await runBatch({
      input: path.resolve(opts.input),
      outputDir: path.resolve(opts.out),
      taintRulesPath: opts.taintRules ? path.resolve(opts.taintRules) : undefined,
      emitHtml: opts.html,
      feishuWebhook: webhook,
      feishuSecret: secret,
      progressEvery: Number.parseInt(opts.progressEvery, 10) || 1,
    });

    const errored = results.filter((r) => r.status === "error").length;
    const findings = results.reduce((a, r) => a + r.findings, 0);
    console.log(
      `\n[BATCH] ${results.length} extension(s), ${findings} finding(s), ${errored} error(s).`,
    );
    // Non-zero exit if any extension errored, so CI can gate on it.
    if (errored > 0) process.exitCode = 1;
  });

program.parse(process.argv);
