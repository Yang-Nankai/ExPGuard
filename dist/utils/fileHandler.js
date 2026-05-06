"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectJsFiles = collectJsFiles;
exports.toRelativeScriptKey = toRelativeScriptKey;
exports.copyDirectoryAsync = copyDirectoryAsync;
exports.copyDirectorySync = copyDirectorySync;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const errorCode_1 = require("./errorCode");
const scriptPathFilter_1 = require("./scriptPathFilter");
/**
 * Recursively traverse a directory and collect all JavaScript file paths (relative to the root directory).
 */
function collectJsFiles(rootDir) {
    if (!fs_1.default.existsSync(rootDir)) {
        errorCode_1.Errors.LoaderError(`Directory not found: ${rootDir}`);
    }
    const jsFiles = [];
    const traverse = (dir) => {
        for (const entry of fs_1.default.readdirSync(dir, { withFileTypes: true })) {
            const fullPath = path_1.default.join(dir, entry.name);
            const relPath = (0, scriptPathFilter_1.normalizeRelativePath)(path_1.default.relative(rootDir, fullPath));
            if ((0, scriptPathFilter_1.isIgnoredRelativePath)(relPath)) {
                continue;
            }
            if (entry.isDirectory()) {
                traverse(fullPath);
            }
            else if (entry.isFile() && entry.name.endsWith(".js")) {
                // Note: Only .js files are collected here. Other extensions can be added if needed.
                jsFiles.push(path_1.default.relative(rootDir, fullPath).replace(/\\/g, "/"));
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
function toRelativeScriptKey(filePath, baseDir) {
    let relative = path_1.default.relative(baseDir, filePath).replace(/\\/g, "/");
    // Ensure the path starts with "./"
    if (!relative.startsWith("./")) {
        relative = `./${relative}`;
    }
    return relative;
}
/**
 * Recursively copy a directory (async version).
 */
function copyDirectoryAsync(src, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_1.default.promises.mkdir(dest, { recursive: true });
        const entries = yield fs_1.default.promises.readdir(src, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path_1.default.join(src, entry.name);
            const destPath = path_1.default.join(dest, entry.name);
            if (entry.isDirectory()) {
                yield copyDirectoryAsync(srcPath, destPath);
            }
            else {
                yield fs_1.default.promises.copyFile(srcPath, destPath);
            }
        }
        return dest;
    });
}
/**
 * Recursively copy a directory (synchronous version).
 */
function copyDirectorySync(src, dest) {
    fs_1.default.mkdirSync(dest, { recursive: true });
    const entries = fs_1.default.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path_1.default.join(src, entry.name);
        const destPath = path_1.default.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirectorySync(srcPath, destPath);
        }
        else {
            fs_1.default.copyFileSync(srcPath, destPath);
        }
    }
    return dest;
}
