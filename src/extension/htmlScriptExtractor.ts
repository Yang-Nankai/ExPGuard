/**
 * Lightweight HTML→script extractor used by the extension loader to discover
 * scripts referenced by popup / options / side_panel / devtools / override /
 * offscreen HTML files.
 *
 * The project doesn't ship a real HTML parser (no parse5 / cheerio /
 * htmlparser2 in `node_modules`), so we run a tolerant regex pass. That's a
 * deliberate tradeoff: a strict parser would reject the malformed HTML many
 * obfuscated extensions ship, while a regex covers >99% of the manifest-level
 * script wiring we actually care about.
 *
 * What we extract:
 *
 *   - `<script src="..."></script>`              → external script
 *   - `<script type="module" src="..."></script>` → external module script
 *   - `<script>...</script>`                      → inline script
 *
 * Inline scripts are materialized as virtual `.js` files under
 * `<baseDir>/.epg-inline/<htmlBaseName>.inline-<n>.js` so the existing
 * `ExtensionScript` / `ScriptRegistry` / AST pipeline can consume them
 * unchanged. The user opted into "Virtual-file + analyze" semantics for
 * inline scripts during planning.
 */
import fs from "fs";
import path from "path";
import logger from "../utils/logger";
import { isIgnoredAbsolutePath } from "../utils/scriptPathFilter";
import { ExtensionScript } from "./extensionScript";

export interface ExtractedScript {
  /** ScriptKey resolved against `baseDir`. */
  scriptKey: string;
  /** Absolute path on disk (real or virtual). */
  absPath: string;
  /** External: from `src=`. Inline: synthesized from `<script>...</script>`. */
  kind: "external" | "inline";
  /** Original `type` attribute when present (e.g. `module`). */
  scriptType?: string;
  /** Source HTML the script was discovered in, relative to `baseDir`. */
  fromHtml: string;
}

export interface ExtractHtmlOptions {
  /** Whether inline scripts should be materialized as virtual files. */
  inlineMode?: "virtual" | "skip";
}

const SCRIPT_TAG_REGEX = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
const ATTR_REGEX = /(\w[\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>"'`=]+))/g;
const INLINE_DIR_NAME = ".epg-inline";

/**
 * Extract every script (external + inline) referenced by an HTML file.
 *
 * On unreadable HTML / non-existent script src, a warning is logged and the
 * problem entry is skipped — the rest of the page still produces a usable
 * list, which is what the analysis loop wants.
 */
export function extractScriptsFromHtml(
  htmlAbsPath: string,
  baseDir: string,
  options: ExtractHtmlOptions = {},
): ExtractedScript[] {
  if (!fs.existsSync(htmlAbsPath) || !fs.statSync(htmlAbsPath).isFile()) {
    logger.warn(`[HTML-EXTRACT] HTML not found: ${htmlAbsPath}`);
    return [];
  }

  let html = "";
  try {
    html = fs.readFileSync(htmlAbsPath, "utf-8");
  } catch (err) {
    logger.warn(`[HTML-EXTRACT] Failed to read ${htmlAbsPath}: ${String(err)}`);
    return [];
  }

  const inlineMode = options.inlineMode ?? "virtual";
  const htmlDir = path.dirname(htmlAbsPath);
  const htmlRel = relPath(htmlAbsPath, baseDir);
  const out: ExtractedScript[] = [];
  const seenAbs = new Set<string>();

  let inlineIndex = 0;

  for (
    let match = SCRIPT_TAG_REGEX.exec(html);
    match;
    match = SCRIPT_TAG_REGEX.exec(html)
  ) {
    const attrs = parseAttrs(match[1] ?? "");
    const body = (match[2] ?? "").trim();
    const src = attrs["src"];
    const scriptType = attrs["type"];

    if (src) {
      const trimmed = src.trim();
      if (!trimmed || isExternalUrl(trimmed)) continue;

      const absPath = resolveSrc(trimmed, htmlDir, baseDir);
      if (!absPath) continue;
      if (isIgnoredAbsolutePath(absPath, baseDir)) continue;
      if (!fs.existsSync(absPath)) {
        logger.warn(
          `[HTML-EXTRACT] script src not found: ${trimmed} (referenced from ${htmlRel})`,
        );
        continue;
      }
      if (seenAbs.has(absPath)) continue;
      seenAbs.add(absPath);

      out.push({
        scriptKey: ExtensionScript.createScriptKey(absPath, baseDir),
        absPath,
        kind: "external",
        scriptType,
        fromHtml: htmlRel,
      });
      continue;
    }

    if (!body) continue;
    if (inlineMode === "skip") {
      logger.debug(
        `[HTML-EXTRACT] inline script in ${htmlRel} skipped (inlineMode=skip)`,
      );
      continue;
    }

    const inlineAbsPath = materializeInlineScript({
      htmlAbsPath,
      baseDir,
      body,
      index: inlineIndex++,
      scriptType,
    });

    if (!inlineAbsPath) continue;
    if (seenAbs.has(inlineAbsPath)) continue;
    seenAbs.add(inlineAbsPath);

    out.push({
      scriptKey: ExtensionScript.createScriptKey(inlineAbsPath, baseDir),
      absPath: inlineAbsPath,
      kind: "inline",
      scriptType,
      fromHtml: htmlRel,
    });
  }

  return out;
}

/**
 * Resolve a `<script src>` value to an absolute path within the extension.
 *
 *  - `./` / `../`  → relative to the HTML directory
 *  - `/foo.js`     → relative to `baseDir`
 *  - `foo.js`      → resolved first against HTML dir, falls back to `baseDir`.
 *    Bare paths in MV3 extensions usually live next to the HTML, so we try
 *    that first; the baseDir fallback covers the legacy MV2 idiom.
 */
function resolveSrc(src: string, htmlDir: string, baseDir: string): string | null {
  if (src.startsWith("./") || src.startsWith("../")) {
    return path.resolve(htmlDir, src);
  }
  if (src.startsWith("/")) {
    return path.resolve(baseDir, src.replace(/^\/+/, ""));
  }
  // Bare path — prefer html-relative, fall back to baseDir-relative
  const beside = path.resolve(htmlDir, src);
  if (fs.existsSync(beside)) return beside;
  return path.resolve(baseDir, src);
}

function isExternalUrl(value: string): boolean {
  return /^(https?:|data:|blob:|chrome-extension:|moz-extension:)/i.test(value);
}

function parseAttrs(raw: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (
    let m = ATTR_REGEX.exec(raw);
    m;
    m = ATTR_REGEX.exec(raw)
  ) {
    const name = m[1].toLowerCase();
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    map[name] = value;
  }
  // Reset lastIndex; ATTR_REGEX is a module-level RegExp object shared across
  // calls and `exec` is stateful.
  ATTR_REGEX.lastIndex = 0;
  return map;
}

function relPath(absPath: string, baseDir: string): string {
  return path.relative(baseDir, absPath).replace(/\\/g, "/");
}

/**
 * Write an inline `<script>` body to `<baseDir>/.epg-inline/...` so it can be
 * picked up by the regular script-analysis pipeline.
 *
 * We append a tiny header comment with provenance + the original `type=` so
 * later report inspection can tell where the synthesized file came from.
 * Errors here are non-fatal — failing to materialize one inline block must
 * not prevent the rest of the extension from being analyzed.
 */
function materializeInlineScript(opts: {
  htmlAbsPath: string;
  baseDir: string;
  body: string;
  index: number;
  scriptType?: string;
}): string | null {
  const { htmlAbsPath, baseDir, body, index, scriptType } = opts;

  try {
    const htmlRel = relPath(htmlAbsPath, baseDir);
    const safe = htmlRel.replace(/[/\\:]/g, "_").replace(/\.html?$/i, "");
    const fileName = `${safe}.inline-${index}.js`;
    const outDir = path.join(baseDir, INLINE_DIR_NAME);
    fs.mkdirSync(outDir, { recursive: true });

    const outPath = path.join(outDir, fileName);
    // The trailing "\n" matters: a `.filter(Boolean)` here would silently drop
    // the blank separator line because empty strings are falsy, glueing the
    // last header comment to the first line of body — which then becomes part
    // of the comment and quietly removes a whole statement from analysis.
    const headerLines = [
      `// [epg-virtual-inline]`,
      `// source-html: ${htmlRel}`,
      `// script-index: ${index}`,
    ];
    if (scriptType) headerLines.push(`// script-type: ${scriptType}`);
    const header = headerLines.join("\n") + "\n";

    fs.writeFileSync(outPath, header + body, "utf-8");
    return outPath;
  } catch (err) {
    logger.warn(
      `[HTML-EXTRACT] Failed to materialize inline script #${index} from ${htmlAbsPath}: ${String(err)}`,
    );
    return null;
  }
}
