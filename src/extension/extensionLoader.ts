import fs from "fs";
import path from "path";
import { Errors } from "../utils/errorCode";
import { CrxExtractor } from "../loader/crxExtractor";
import { XpiExtractor } from "../loader/xpiExtractor";
import {
  assertDirectoryExists,
  assertFileExists,
  assertValidChromeExtensionId,
} from "../utils/validation";
import logger from "../utils/logger";
import { downloadCrxFromCWS } from "../loader/crxDownloader";
import { copyDirectoryAsync } from "../utils/fileHandler";
import { ExtensionContext } from "./extensionContext";

export enum ExtensionSourceType {
  CRX = "CRX",
  DIR = "DIR",
  WEB = "WEB",
  XPI = "XPI",
}

/**
 * Handle extension loading from various sources (CRX file, directory, Web Store)
 */
export async function loadExtensionAsync(
  source: ExtensionSourceType,
  inputPath: string,
  outputDir: string,
  extensionId: string
): Promise<ExtensionContext> {
  // The ID used to construct the ExtensionContext. For CRX/XPI it may be
  // replaced with an ID derived from the archive.
  let resolvedId = extensionId;

  switch (source) {
    case ExtensionSourceType.CRX: {
      assertFileExists(inputPath);

      const provided =
        extensionId && extensionId !== "unknown" ? extensionId : null;
      if (provided) assertValidChromeExtensionId(provided);

      resolvedId = await loadFromCrx(inputPath, outputDir, provided);
      break;
    }

    case ExtensionSourceType.WEB: {
      assertValidChromeExtensionId(extensionId);

      await loadFromWeb(extensionId, outputDir);
      break;
    }

    case ExtensionSourceType.DIR: {
      assertDirectoryExists(inputPath);

      await loadFromDir(inputPath, outputDir);
      break;
    }

    case ExtensionSourceType.XPI: {
      assertFileExists(inputPath);

      resolvedId = await loadFromXpi(inputPath, outputDir, extensionId);
      break;
    }
  }

  if (fs.existsSync(outputDir) && fs.statSync(outputDir).isDirectory()) {
    return new ExtensionContext(resolvedId, outputDir);
  }

  throw Errors.LoaderError("Extension load error!");
}

/**
 * Handle CRX file extraction.
 *
 * If the caller did not provide a Chrome extension ID, derive it from the CRX
 * header. Batch mode often receives arbitrary local filenames, so requiring
 * the filename to be the extension ID makes folder-based processing brittle.
 */
async function loadFromCrx(
  inputPath: string,
  outputDir: string,
  extensionId: string | null
): Promise<string> {
  const extractor = new CrxExtractor(inputPath, outputDir);
  await extractor.extract();

  const crxId = extractor.getExtensionId();
  const outputPath = extractor.getOutputPath();

  if (!crxId) {
    Errors.LoaderError("Could not derive extensionId from CRX header");
    throw new Error("unreachable");
  }

  if (extensionId && extensionId !== crxId) {
    Errors.LoaderError(
      `(handleCrx) Provided extensionId (${extensionId}) does not match CRX ID (${crxId})`
    );
  }

  logger.info(`Extracted CRX ID: ${crxId}, Output: ${outputPath}`);
  return crxId;
}

/**
 * Handle Firefox XPI extraction.
 *
 * Returns the extension ID to use: the caller-supplied `extensionId` when it
 * looks meaningful, otherwise the gecko ID read from the manifest
 * (`browser_specific_settings.gecko.id` / `applications.gecko.id`), falling
 * back to a stable placeholder for temporary add-ons that declare no ID.
 */
async function loadFromXpi(
  inputPath: string,
  outputDir: string,
  extensionId: string
): Promise<string> {
  const extractor = new XpiExtractor(inputPath, outputDir);
  await extractor.extract();

  const manifestId = extractor.getExtensionId();
  const provided =
    extensionId && extensionId !== "unknown" ? extensionId : null;
  // Placeholder is email-style so it passes Firefox ID validation in the
  // ExtensionContext constructor (temporary add-ons may declare no ID).
  const resolvedId = provided ?? manifestId ?? "unknown@firefox";

  if (provided && manifestId && provided !== manifestId) {
    logger.info(
      `(handleXpi) Provided extensionId (${provided}) does not match manifest gecko ID (${manifestId})`
    );
  }

  logger.info(
    `Extracted XPI ID: ${resolvedId}, Output: ${extractor.getOutputPath()}`
  );
  return resolvedId;
}

/**
 * Handle loading from extension directory
 */
async function loadFromDir(inputPath: string, outputDir: string) {
  const manifestPath = path.join(inputPath, "manifest.json");

  if (!fs.existsSync(manifestPath)) {
    Errors.LoaderError(
      "manifest.json not found in directory, maybe not a valid extension directory."
    );
  }

  const outputPath = await copyDirectoryAsync(inputPath, outputDir);
  logger.info(`Copied extension directory ${inputPath} to: ${outputPath}`);
}

/**
 * Download and load extension from Web Store
 */
async function loadFromWeb(extensionId: string, outputDir: string) {
  const downloadPath = await downloadCrxFromCWS(extensionId, outputDir);
  if (!downloadPath) {
    Errors.LoaderError(
      `Failed to download CRX file for extensionId: ${extensionId}`
    );
  }

  await loadFromCrx(downloadPath, outputDir, extensionId);
}
