import fs from "fs";
import path from "path";
import { Errors } from "../utils/errorCode";
import { CrxExtractor } from "../loader/crxExtractor";
import { assertDirectoryExists, assertFileExists, assertValidExtensionId } from "../utils/validation";
import logger from "../utils/logger";
import { downloadCrxFromCWS } from "../loader/crxDownloader";
import { copyDirectoryAsync } from "../utils/fileHandler";
import { ExtensionContext } from "./extensionContext";

export enum ExtensionSourceType {
  CRX = "CRX",
  DIR = "DIR",
  WEB = "WEB",
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
  switch (source) {
    case ExtensionSourceType.CRX: {
      assertValidExtensionId(extensionId);
      assertFileExists(inputPath);

      await loadFromCrx(inputPath, outputDir, extensionId);
      break;
    }

    case ExtensionSourceType.WEB: {
      assertValidExtensionId(extensionId);

      await loadFromWeb(extensionId, outputDir);
      break;
    }

    case ExtensionSourceType.DIR: {
      assertDirectoryExists(inputPath);

      await loadFromDir(inputPath, outputDir);
      break;
    }
  }

  if (fs.existsSync(outputDir) && fs.statSync(outputDir).isDirectory()) {
    return new ExtensionContext(extensionId, outputDir);
  }

  throw Errors.LoaderError("Extension load error!");
}


/**
 * Handle CRX file extraction
 */
async function loadFromCrx(
  inputPath: string,
  outputDir: string,
  extensionId: string
) {
  const extractor = new CrxExtractor(inputPath, outputDir);
  await extractor.extract();

  const crxId = extractor.getExtensionId();
  const outputPath = extractor.getOutputPath();

  if (extensionId !== crxId) {
    Errors.LoaderError(
      `(handleCrx) Provided extensionId (${extensionId}) does not match CRX ID (${crxId})`
    );
  }

  logger.info(`Extracted CRX → ID: ${extensionId}, Output: ${outputPath}`);
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
