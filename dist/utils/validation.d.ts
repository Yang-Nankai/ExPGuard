/**
 * Validate Chrome/Edge extension ID format.
 */
export declare function validateChromeOrEdgeExtensionId(extensionId: string): boolean;
/**
 * Validate Firefox extension ID (GUID or email-style).
 */
export declare function validateFirefoxExtensionId(extensionId: string): boolean;
/**
 * Validate extension version string.
 */
export declare function validateExtensionVersion(version: string): boolean;
/**
 * Validate whether a directory is a valid extension directory.
 * Requirements:
 *   1. Must exist
 *   2. Must be a directory
 *   3. Must contain manifest.json
 */
export declare function validateExtensionDir(extensionDir: string): boolean;
/**
 * Throw LoaderError if extensionId is invalid.
 */
export declare function assertValidExtensionId(extensionId: string): void;
/**
 * Assert that a file exists and is a regular file.
 */
export declare function assertFileExists(path: string): void;
/**
 * Assert that a directory exists and is a directory.
 */
export declare function assertDirectoryExists(path: string): void;
