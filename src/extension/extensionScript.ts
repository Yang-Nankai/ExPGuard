import fs from "fs";
import path from "path";
import { Node } from "acorn";
import { parser } from "../ast/jsParser";
import { astValidator } from "../ast/astValidator";
import { astToString, optimizeAST } from "../transformation/transformer";
import { dependencyAnalyzer } from "../utils/denpendency";
import { Errors } from "../utils/errorCode";
import config from "../config";
import logger from "../utils/logger";
import Set from "../utils/set";
import { isIgnoredAbsolutePath } from "../utils/scriptPathFilter";
// import { createScriptKey, ScriptKey } from "../utils/scriptKey";

/**
 * ScriptKey format:
 * <normalized-relative-path-without-extension>
 *
 * Examples:
 * background/index
 * content/inject
 */
export type ScriptKey = string;
export type ScriptFrameTag = string;
/**
 * Frame families:
 *  - BG   background service worker / scripts / background.html
 *  - CS   content_scripts.js[]
 *  - EX   privileged extension UI page (popup, options, side_panel,
 *         chrome_url_overrides, ad-hoc extension_page)
 *  - DT   devtools_page + devtools_panel scripts (privileged, only loaded
 *         when DevTools is open)
 *  - OF   offscreen document scripts (privileged, no UI)
 *  - UNKNOWN catch-all for orphan helpers not referenced by any manifest
 *         entry (and not pulled in via import / runtime API)
 */
export type ScriptFrameFamily = "CS" | "BG" | "EX" | "DT" | "OF" | "UNKNOWN";

/**
 * Represents a single script file inside an extension
 */
export class ExtensionScript {
  readonly key: ScriptKey;
  readonly absPath: string;
  readonly relativePath: string;
  readonly baseDir: string;

  private code?: string;
  private ast?: Node;
  private dependencies?: Set<string>;
  private analysisDurationMs: number = 0; // Add: track analysis duration

  constructor(absPath: string, baseDir: string) {
    // this.ensureValidFile(absPath);

    this.absPath = absPath;
    this.baseDir = baseDir;
    this.relativePath = path.relative(baseDir, absPath).replace(/\\/g, "/");

    this.key = ExtensionScript.createScriptKey(absPath, baseDir);
  }

  /**
   * Create ScriptKey from absolute path
   */
  static createScriptKey(absPath: string, baseDir: string): ScriptKey {
    return path
      .relative(baseDir, absPath)
      .replace(/\\/g, "/")
      .replace(/\.(js|ts)$/, "");
  }

  /**
   * Resolve import / importScripts target to ScriptKey
   *
   * Rules:
   * 1. source starts with "."  -> relative to current script directory
   * 2. source does NOT start with "." -> relative to extension baseDir
   */
  resolveRelativeScriptKey(source: string): ScriptKey | null {
    let resolvedAbsPath: string;

    if (source.startsWith(".")) {
      // relative to current script
      const importerDir = path.dirname(this.absPath);
      resolvedAbsPath = path.resolve(importerDir, source);
    } else {
      // relative to extension baseDir
      resolvedAbsPath = path.resolve(this.baseDir, source);
    }

    const normalized = resolvedAbsPath.replace(/\\/g, "/");

    if (isIgnoredAbsolutePath(normalized, this.baseDir)) {
      return null;
    }

    if (!fs.existsSync(normalized)) {
      logger.warn(`Resolved script does not exist: ${this.key} -> ${source}`);
      return null;
    }

    return ExtensionScript.createScriptKey(normalized, this.baseDir);
  }

  /**
   * Lazily parse and validate AST
   */
  getAST(): Node {
    if (this.ast) {
      return this.ast;
    }

    try {
      const code = fs.readFileSync(this.absPath, "utf-8");
      this.code = code;

      let ast = parser.parseAST(code) as Node;

      if (config.optimizationEnabled) {
        ast = optimizeAST(ast);
      }

      astValidator.validate(ast);

      if (config.enableOptimizationRewrite) {
        this.writeOptimizedOutput(ast);
      }

      this.ast = ast;
      return ast;
    } catch (err) {
      // FIXME: do not crash here
      throw Errors.ValidatorError(
        `Failed to parse script: ${this.relativePath}`,
      );
    }
  }

  /**
   * Add: Get file size in bytes
   */
  getFileSize(): number {
    try {
      return fs.statSync(this.absPath).size;
    } catch {
      return 0;
    }
  }
  /**
   * Add: set analysis duration in milliseconds
   */
  setAnalysisDuration(s: number) {
    this.analysisDurationMs = s;
  }

  getCode(): string | null {
    if (this.code) {
      return this.code;
    }

    try {
      this.code = fs.readFileSync(this.absPath, "utf-8");
      return this.code;
    } catch (err) {
      logger.warn(`Failed to read code from file: ${this.absPath}`, err);
      return null;
    }
  }

  /**
   * Analyze import / importScripts dependencies
   */
  getDependencies(): Set<string> {
    if (!this.dependencies) {
      this.dependencies = dependencyAnalyzer.analyzeAST(this.getAST());
    }
    return this.dependencies;
  }

  toJSON() {
    return {
      key: this.key,
      path: this.relativePath,
      dependencies: this.dependencies,
      sizeBytes: this.getFileSize(),
      analysisDurationMs: this.analysisDurationMs,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON(), null, 2);
  }

  // Internal helpers
  private ensureValidFile(absPath: string): void {
    if (!fs.existsSync(absPath) || !fs.statSync(absPath).isFile()) {
      throw Errors.ValidatorError(
        `Script not found or inaccessible: ${absPath}`,
      );
    }
  }

  // Internal helpers
  private writeOptimizedOutput(ast: Node): void {
    try {
      const optimizedCode = astToString(ast);
      fs.writeFileSync(`${this.absPath}.prep.js`, optimizedCode);
    } catch (err) {
      logger.warn(`Failed to write optimized output for ${this.absPath}`, err);
    }
  }
}
