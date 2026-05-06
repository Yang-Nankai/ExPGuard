import fs from "fs";
import path from "path";
import logger from "./logger";
import { Errors } from "./errorCode";

// ================= Regex Constants =================

// Chrome / Edge extension ID: 32 lowercase letters (a-p)
const CHROME_EDGE_EXTENSION_ID_REGEX = /^[a-p]{32}$/;

// Firefox extension ID (GUID format)
const FIREFOX_GUID_REGEX =
  /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/;

// Firefox extension ID (email-like format)
const FIREFOX_EMAIL_REGEX = /^[\w.-]+@[\w.-]+$/;

// Extension version (e.g. 1.0.3 / 1.2 / 2.0.0.1)
const EXTENSION_VERSION_REGEX = /^(\d+\.)?(\d+\.)?(\d+)(\.\d+)*$/;


/**
 * Validate Chrome/Edge extension ID format.
 */
export function validateChromeOrEdgeExtensionId(extensionId: string): boolean {
  if (typeof extensionId !== "string") return false;
  return CHROME_EDGE_EXTENSION_ID_REGEX.test(extensionId);
}


/**
 * Validate Firefox extension ID (GUID or email-style).
 */
export function validateFirefoxExtensionId(extensionId: string): boolean {
  if (typeof extensionId !== "string") return false;
  return FIREFOX_GUID_REGEX.test(extensionId) || FIREFOX_EMAIL_REGEX.test(extensionId);
}


/**
 * Validate extension version string.
 */
export function validateExtensionVersion(version: string): boolean {
  if (typeof version !== "string" || version.trim() === "") return false;
  return EXTENSION_VERSION_REGEX.test(version.trim());
}


/**
 * Validate whether a directory is a valid extension directory.
 * Requirements:
 *   1. Must exist
 *   2. Must be a directory
 *   3. Must contain manifest.json
 */
export function validateExtensionDir(extensionDir: string): boolean {
  if (!extensionDir || typeof extensionDir !== "string") {
    logger.error("Invalid input: extensionDir must be a non-empty string.");
    return false;
  }

  try {
    const stats = fs.statSync(extensionDir);

    // Ensure it is a directory
    if (!stats.isDirectory()) {
      logger.error(`Path is not a directory: ${extensionDir}`);
      return false;
    }

    // Check manifest.json existence
    const manifestPath = path.join(extensionDir, "manifest.json");
    if (!fs.existsSync(manifestPath)) {
      logger.error(`Missing manifest.json in directory: ${extensionDir}`);
      return false;
    }

    return true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error(`Failed to validate extension directory "${extensionDir}": ${message}`);
    return false;
  }
}


/**
 * Throw LoaderError if extensionId is invalid.
 */
export function assertValidExtensionId(extensionId: string) {
  if (!validateChromeOrEdgeExtensionId(extensionId)) {
    Errors.LoaderError(`Invalid extensionId: ${extensionId}`);
  }
}


/**
 * Assert that a file exists and is a regular file.
 */
export function assertFileExists(path: string) {
  if (!fs.existsSync(path) || !fs.statSync(path).isFile()) {
    Errors.LoaderError(`File not found: ${path}`);
  }
}


/**
 * Assert that a directory exists and is a directory.
 */
export function assertDirectoryExists(path: string) {
  if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
    Errors.LoaderError(`Directory not found: ${path}`);
  }
}