"use strict";
// import path from "path";
// import logger from "./logger";
// export type ScriptKey = string;
// /**
//  * ScriptKey format:
//  * <normalized-relative-path-without-extension>
//  *
//  * Examples:
//  * background/index
//  * content/inject
//  */
// export function createScriptKey(
//   absPath: string,
//   baseDir: string
// ): ScriptKey {
//   return path
//     .relative(baseDir, absPath)
//     .replace(/\\/g, "/")
//     .replace(/\.(js|ts)$/, "");
// }
// /**
//  * Resolve a relative ScriptKey from another ScriptKey
//  *
//  * @example
//  * background/index + ./utils.js
//  * → background/utils
//  */
// export function resolveRelativeScriptKey(
//   importerKey: ScriptKey,
//   source: string
// ): ScriptKey | null {
//   // Only handle relative imports
//   // FIXME: 这里是存在问题的，如果直接是 base 的路径怎么办？看看是否有这种情况发生
//   if (!source.startsWith(".")) {
//     // TODO: 后续根据base的路径来，从当前分析的扩展来拿到当前的路径，比如 main 中提供一个接口给这里
//     logger.error("[NEED FIX] The source did not start with '.'");
//     return null;
//   }
//   // Directory of the importing script (posix-style)
//   const importerDir = path.posix.dirname(importerKey);
//   // Resolve and normalize the relative path
//   const resolved = path.posix.normalize(
//     path.posix.join(importerDir, source)
//   );
//   const relKey = resolved.replace(/^\.\//, "").replace(/\.(js|ts)$/, "");
//   if (!relKey) {
//     logger.warn(`Failed to resolve relative script key: ${importerKey} + ${source}`);
//     return null;
//   }
//   return relKey;
// }
