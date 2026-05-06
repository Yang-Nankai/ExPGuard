"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChromeOrEdgeExtensionId = validateChromeOrEdgeExtensionId;
exports.validateFirefoxExtensionId = validateFirefoxExtensionId;
exports.validateExtensionVersion = validateExtensionVersion;
exports.validateExtensionDir = validateExtensionDir;
exports.assertValidExtensionId = assertValidExtensionId;
exports.assertFileExists = assertFileExists;
exports.assertDirectoryExists = assertDirectoryExists;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./logger"));
const errorCode_1 = require("./errorCode");
// ================= Regex Constants =================
// Chrome / Edge extension ID: 32 lowercase letters (a-p)
const CHROME_EDGE_EXTENSION_ID_REGEX = /^[a-p]{32}$/;
// Firefox extension ID (GUID format)
const FIREFOX_GUID_REGEX = /^\{[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\}$/;
// Firefox extension ID (email-like format)
const FIREFOX_EMAIL_REGEX = /^[\w.-]+@[\w.-]+$/;
// Extension version (e.g. 1.0.3 / 1.2 / 2.0.0.1)
const EXTENSION_VERSION_REGEX = /^(\d+\.)?(\d+\.)?(\d+)(\.\d+)*$/;
/**
 * Validate Chrome/Edge extension ID format.
 */
function validateChromeOrEdgeExtensionId(extensionId) {
    if (typeof extensionId !== "string")
        return false;
    return CHROME_EDGE_EXTENSION_ID_REGEX.test(extensionId);
}
/**
 * Validate Firefox extension ID (GUID or email-style).
 */
function validateFirefoxExtensionId(extensionId) {
    if (typeof extensionId !== "string")
        return false;
    return FIREFOX_GUID_REGEX.test(extensionId) || FIREFOX_EMAIL_REGEX.test(extensionId);
}
/**
 * Validate extension version string.
 */
function validateExtensionVersion(version) {
    if (typeof version !== "string" || version.trim() === "")
        return false;
    return EXTENSION_VERSION_REGEX.test(version.trim());
}
/**
 * Validate whether a directory is a valid extension directory.
 * Requirements:
 *   1. Must exist
 *   2. Must be a directory
 *   3. Must contain manifest.json
 */
function validateExtensionDir(extensionDir) {
    if (!extensionDir || typeof extensionDir !== "string") {
        logger_1.default.error("Invalid input: extensionDir must be a non-empty string.");
        return false;
    }
    try {
        const stats = fs_1.default.statSync(extensionDir);
        // Ensure it is a directory
        if (!stats.isDirectory()) {
            logger_1.default.error(`Path is not a directory: ${extensionDir}`);
            return false;
        }
        // Check manifest.json existence
        const manifestPath = path_1.default.join(extensionDir, "manifest.json");
        if (!fs_1.default.existsSync(manifestPath)) {
            logger_1.default.error(`Missing manifest.json in directory: ${extensionDir}`);
            return false;
        }
        return true;
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        logger_1.default.error(`Failed to validate extension directory "${extensionDir}": ${message}`);
        return false;
    }
}
/**
 * Throw LoaderError if extensionId is invalid.
 */
function assertValidExtensionId(extensionId) {
    if (!validateChromeOrEdgeExtensionId(extensionId)) {
        errorCode_1.Errors.LoaderError(`Invalid extensionId: ${extensionId}`);
    }
}
/**
 * Assert that a file exists and is a regular file.
 */
function assertFileExists(path) {
    if (!fs_1.default.existsSync(path) || !fs_1.default.statSync(path).isFile()) {
        errorCode_1.Errors.LoaderError(`File not found: ${path}`);
    }
}
/**
 * Assert that a directory exists and is a directory.
 */
function assertDirectoryExists(path) {
    if (!fs_1.default.existsSync(path) || !fs_1.default.statSync(path).isDirectory()) {
        errorCode_1.Errors.LoaderError(`Directory not found: ${path}`);
    }
}
