import fs from "fs";
import path from "path";
import { Errors } from "./errorCode";
import { isIgnoredRelativePath, normalizeRelativePath } from "./scriptPathFilter";


/**
 * Recursively traverse a directory and collect all JavaScript file paths (relative to the root directory).
 */
export function collectJsFiles(rootDir: string): string[] {
  if (!fs.existsSync(rootDir)) {
    Errors.LoaderError(`Directory not found: ${rootDir}`);
  }

  const jsFiles: string[] = [];

  const traverse = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      const relPath = normalizeRelativePath(path.relative(rootDir, fullPath));

      if (isIgnoredRelativePath(relPath)) {
        continue;
      }

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        // Note: Only .js files are collected here. Other extensions can be added if needed.
        jsFiles.push(path.relative(rootDir, fullPath).replace(/\\/g, "/"));
      }
    }
  };

  traverse(rootDir);
  return jsFiles;
}

/**
 * Format any file path into a standardized relative script key.
 * Examples:
 *  /path/to/extension/bg/background.js → ./bg/background.js
 *  ./scripts/main.ts → ./scripts/main.ts
 */
export function toRelativeScriptKey(filePath: string, baseDir: string): string {
  let relative = path.relative(baseDir, filePath).replace(/\\/g, "/");

  // Ensure the path starts with "./"
  if (!relative.startsWith("./")) {
    relative = `./${relative}`;
  }

  return relative;
}


/**
 * Recursively copy a directory (async version).
 */
export async function copyDirectoryAsync(src: string, dest: string): Promise<string> {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirectoryAsync(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }

  return dest;
}


/**
 * Recursively copy a directory (synchronous version).
 */
export function copyDirectorySync(src: string, dest: string): string {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  return dest;
}
