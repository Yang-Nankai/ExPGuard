import path from "path";
import config from "../config";

const DOUBLE_STAR_TOKEN = "__DOUBLE_STAR__";

function normalizeSlashes(p: string): string {
  return p.replace(/\\/g, "/");
}

function trimLeadingDotSlash(p: string): string {
  return p.replace(/^\.\//, "").replace(/^\//, "");
}

export function normalizeRelativePath(p: string): string {
  return trimLeadingDotSlash(normalizeSlashes(p));
}

function normalizePattern(pattern: string): string {
  let p = normalizeRelativePath(pattern.trim());
  if (p.endsWith("/")) p += "**";
  return p;
}

function globToRegexBody(globPattern: string): string {
  const withToken = globPattern.replace(/\*\*/g, DOUBLE_STAR_TOKEN);
  const escaped = withToken.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const singleStar = escaped.replace(/\*/g, "[^/]*");
  return singleStar.replace(new RegExp(DOUBLE_STAR_TOKEN, "g"), ".*");
}

function matchGlob(targetRelPath: string, pattern: string): boolean {
  const p = normalizePattern(pattern);
  if (!p) return false;

  const t = normalizeRelativePath(targetRelPath);
  const body = globToRegexBody(p);

  // If the pattern has no slash, match file/dir name at any depth.
  const regex = p.includes("/")
    ? new RegExp(`^${body}$`)
    : new RegExp(`(^|.*/)${body}$`);

  return regex.test(t);
}

export function isIgnoredRelativePath(
  relativePath: string,
  patterns: string[] = config.analysisIgnorePatterns,
): boolean {
  const rel = normalizeRelativePath(relativePath);
  if (!rel) return false;

  let ignored = false;

  for (const raw of patterns ?? []) {
    if (!raw || !raw.trim()) continue;

    const trimmed = raw.trim();
    const isNegation = trimmed.startsWith("!");
    const pattern = isNegation ? trimmed.slice(1) : trimmed;

    if (!pattern) continue;
    if (!matchGlob(rel, pattern)) continue;

    ignored = !isNegation;
  }

  return ignored;
}

export function isIgnoredAbsolutePath(
  absPath: string,
  baseDir: string,
  patterns: string[] = config.analysisIgnorePatterns,
): boolean {
  const rel = normalizeRelativePath(path.relative(baseDir, absPath));
  return isIgnoredRelativePath(rel, patterns);
}
