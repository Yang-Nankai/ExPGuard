/**
 * Recursively traverse a directory and collect all JavaScript file paths (relative to the root directory).
 */
export declare function collectJsFiles(rootDir: string): string[];
/**
 * Format any file path into a standardized relative script key.
 * Examples:
 *  /path/to/extension/bg/background.js → ./bg/background.js
 *  ./scripts/main.ts → ./scripts/main.ts
 */
export declare function toRelativeScriptKey(filePath: string, baseDir: string): string;
/**
 * Recursively copy a directory (async version).
 */
export declare function copyDirectoryAsync(src: string, dest: string): Promise<string>;
/**
 * Recursively copy a directory (synchronous version).
 */
export declare function copyDirectorySync(src: string, dest: string): string;
