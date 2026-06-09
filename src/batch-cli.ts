#!/usr/bin/env node
/**
 * Standalone batch analysis CLI
 * Run with: node dist/batch-cli.js [options]
 */

import { Command } from "commander";
import path from "path";
import fs from "fs";
import { runBatch } from "../batch";
import config from "./config";

const program = new Command();

program
  .name("epg-batch")
  .description("Batch analysis tool for browser extensions")
  .version(config.appVersion);

program
  .option(
    "-i, --input <path>",
    "Input source: directory containing extensions or JSONL file"
  )
  .requiredOption(
    "-m, --mode <mode>",
    "Source mode: directory | jsonl"
  )
  .requiredOption(
    "-p, --platform <platform>",
    "Target platform: chrome | firefox"
  )
  .option(
    "-o, --output <dir>",
    "Output directory for batch results",
    "./results/batch"
  )
  .option(
    "-j, --jobs <number>",
    "Number of concurrent workers (default: CPU count)",
    (val) => parseInt(val, 10)
  )
  .option(
    "--html",
    "Generate HTML reports for each extension",
    false
  )
  .option(
    "--taint-rules <path>",
    "Path to custom taint rules file"
  )
  .option(
    "--timeout <seconds>",
    "Timeout per extension in seconds",
    (val) => parseFloat(val)
  )
  .action(async (options) => {
    // Validate input
    if (!options.input) {
      console.error("Error: --input is required");
      process.exit(1);
    }

    if (!["directory", "jsonl"].includes(options.mode)) {
      console.error("Error: --mode must be 'directory' or 'jsonl'");
      process.exit(1);
    }

    if (!["chrome", "firefox"].includes(options.platform)) {
      console.error("Error: --platform must be 'chrome' or 'firefox'");
      process.exit(1);
    }

    const inputPath = path.resolve(options.input);
    if (!fs.existsSync(inputPath)) {
      console.error(`Error: Input path not found: ${inputPath}`);
      process.exit(1);
    }

    // Validate mode matches input
    const isDir = fs.statSync(inputPath).isDirectory();
    if (options.mode === "directory" && !isDir) {
      console.error("Error: --mode is 'directory' but input is not a directory");
      process.exit(1);
    }
    if (options.mode === "jsonl" && isDir) {
      console.error("Error: --mode is 'jsonl' but input is a directory");
      process.exit(1);
    }

    try {
      const summary = await runBatch({
        input: inputPath,
        sourceMode: options.mode,
        platform: options.platform,
        outputDir: path.resolve(options.output),
        jobs: options.jobs,
        html: options.html,
        taintRules: options.taintRules ? path.resolve(options.taintRules) : undefined,
        timeout: options.timeout,
      });

      // Exit with error code if any extension failed
      if (summary.errors > 0) {
        process.exit(1);
      }
    } catch (err) {
      console.error("[BATCH] Fatal error:", err);
      process.exit(1);
    }
  });

program.parse(process.argv);
