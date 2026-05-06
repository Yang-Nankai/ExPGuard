"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRelativePath = normalizeRelativePath;
exports.isIgnoredRelativePath = isIgnoredRelativePath;
exports.isIgnoredAbsolutePath = isIgnoredAbsolutePath;
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const DOUBLE_STAR_TOKEN = "__DOUBLE_STAR__";
function normalizeSlashes(p) {
    return p.replace(/\\/g, "/");
}
function trimLeadingDotSlash(p) {
    return p.replace(/^\.\//, "").replace(/^\//, "");
}
function normalizeRelativePath(p) {
    return trimLeadingDotSlash(normalizeSlashes(p));
}
function normalizePattern(pattern) {
    let p = normalizeRelativePath(pattern.trim());
    if (p.endsWith("/"))
        p += "**";
    return p;
}
function globToRegexBody(globPattern) {
    const withToken = globPattern.replace(/\*\*/g, DOUBLE_STAR_TOKEN);
    const escaped = withToken.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    const singleStar = escaped.replace(/\*/g, "[^/]*");
    return singleStar.replace(new RegExp(DOUBLE_STAR_TOKEN, "g"), ".*");
}
function matchGlob(targetRelPath, pattern) {
    const p = normalizePattern(pattern);
    if (!p)
        return false;
    const t = normalizeRelativePath(targetRelPath);
    const body = globToRegexBody(p);
    // If the pattern has no slash, match file/dir name at any depth.
    const regex = p.includes("/")
        ? new RegExp(`^${body}$`)
        : new RegExp(`(^|.*/)${body}$`);
    return regex.test(t);
}
function isIgnoredRelativePath(relativePath, patterns = config_1.default.analysisIgnorePatterns) {
    const rel = normalizeRelativePath(relativePath);
    if (!rel)
        return false;
    let ignored = false;
    for (const raw of patterns !== null && patterns !== void 0 ? patterns : []) {
        if (!raw || !raw.trim())
            continue;
        const trimmed = raw.trim();
        const isNegation = trimmed.startsWith("!");
        const pattern = isNegation ? trimmed.slice(1) : trimmed;
        if (!pattern)
            continue;
        if (!matchGlob(rel, pattern))
            continue;
        ignored = !isNegation;
    }
    return ignored;
}
function isIgnoredAbsolutePath(absPath, baseDir, patterns = config_1.default.analysisIgnorePatterns) {
    const rel = normalizeRelativePath(path_1.default.relative(baseDir, absPath));
    return isIgnoredRelativePath(rel, patterns);
}
