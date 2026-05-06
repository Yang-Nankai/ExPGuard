import fs from "fs";
import path from "path";
import config from "../config";
import logger from "../utils/logger";
import {
  ExtensionScript,
  ScriptFrameFamily,
  ScriptFrameTag,
} from "./extensionScript";
import { ScriptRegistry } from "./extensionRegistry";
import { isIgnoredAbsolutePath } from "../utils/scriptPathFilter";

export interface FrameConstraint {
  matches?: string[];
  includeGlobs?: string[];
  excludeMatches?: string[];
  excludeGlobs?: string[];
}

export interface FrameDescriptor {
  id: ScriptFrameTag;
  family: ScriptFrameFamily;
  constraint?: FrameConstraint;
}

class ScriptUsageTracker {
  private _enabled = false;
  private _baseDir = "";
  private _registry: ScriptRegistry | null = null;
  private _usedScriptKeys: Set<string> = new Set();
  private _scriptFrames: Map<string, Set<ScriptFrameTag>> = new Map();
  private _frameFamilies: Map<ScriptFrameTag, ScriptFrameFamily> = new Map();
  private _frameConstraints: Map<ScriptFrameTag, FrameConstraint> = new Map();
  private _frameScriptOrder: Map<ScriptFrameTag, string[]> = new Map();
  private _initialAnalysisOrder: string[] = [];
  private _externallyConnectableDeclared = false;
  private _externallyConnectableMatches?: string[];
  private _externallyConnectableIds?: string[];

  reset() {
    this._enabled = false;
    this._baseDir = "";
    this._registry = null;
    this._usedScriptKeys.clear();
    this._scriptFrames.clear();
    this._frameFamilies.clear();
    this._frameConstraints.clear();
    this._frameScriptOrder.clear();
    this._initialAnalysisOrder = [];
    this._externallyConnectableDeclared = false;
    this._externallyConnectableMatches = undefined;
    this._externallyConnectableIds = undefined;
  }

  initialize(opts: {
    baseDir: string;
    manifest: Record<string, any>;
    scripts: ScriptRegistry;
  }) {
    this.reset();

    this._enabled = config.filterUnusedRuntimeScripts;
    this._baseDir = opts.baseDir;
    this._registry = opts.scripts;

    this.seedFromManifest(opts.manifest);

    logger.info(
      `[SCRIPT-USAGE] initialized, frames=${this._frameFamilies.size}, scriptsWithFrame=${this._scriptFrames.size}, initialOrder=${this._initialAnalysisOrder.length}`,
    );
  }

  isEnabled() {
    return this._enabled;
  }

  isScriptUsed(scriptKey: string) {
    if (!this._enabled) return true;
    return this._usedScriptKeys.has(scriptKey);
  }

  getInitialAnalysisOrder(): string[] {
    return [...this._initialAnalysisOrder];
  }

  getFramedScriptKeys(): string[] {
    return [...this._scriptFrames.keys()];
  }

  getScriptFrameTagsByKey(scriptKey: string): ScriptFrameTag[] {
    const tags = this._scriptFrames.get(scriptKey);
    if (!tags || tags.size === 0) return ["UNKNOWN"];
    return Array.from(tags.values());
  }

  getScriptFrameDescriptorsByKey(scriptKey: string): FrameDescriptor[] {
    const tags = this._scriptFrames.get(scriptKey);
    if (!tags || tags.size === 0) {
      return [{ id: "UNKNOWN", family: "UNKNOWN" }];
    }

    const list: FrameDescriptor[] = [];
    for (const id of tags) {
      list.push({
        id,
        family: this.getFrameFamily(id),
        constraint: this.getFrameConstraint(id),
      });
    }
    return list;
  }

  getPrimaryFrameByKey(scriptKey: string): ScriptFrameTag {
    const tags = this._scriptFrames.get(scriptKey);
    if (!tags || tags.size === 0) return "UNKNOWN";

    const arr = Array.from(tags.values());
    arr.sort((a, b) => {
      const af = this.getFrameFamily(a);
      const bf = this.getFrameFamily(b);
      if (af !== bf) {
        if (af === "BG") return -1;
        if (bf === "BG") return 1;
        if (af === "CS") return -1;
        if (bf === "CS") return 1;
      }
      return a.localeCompare(b);
    });

    return arr[0];
  }

  getFrameFamily(frameId: ScriptFrameTag): ScriptFrameFamily {
    if (!frameId || frameId === "UNKNOWN") return "UNKNOWN";
    return this._frameFamilies.get(frameId) ?? "UNKNOWN";
  }

  getFrameConstraint(frameId: ScriptFrameTag): FrameConstraint | undefined {
    return this._frameConstraints.get(frameId);
  }

  getExternallyConnectableConfig(): {
    declared: boolean;
    matches?: string[];
    ids?: string[];
  } {
    return {
      declared: this._externallyConnectableDeclared,
      matches: this._externallyConnectableMatches,
      ids: this._externallyConnectableIds,
    };
  }

  getPrimaryFrameFamilyByKey(scriptKey: string): ScriptFrameFamily {
    return this.getFrameFamily(this.getPrimaryFrameByKey(scriptKey));
  }

  getFramePredecessorScriptKeys(scriptKey: string): string[] {
    const tags = this._scriptFrames.get(scriptKey);
    if (!tags || tags.size === 0) return [];

    const result = new Set<string>();

    for (const frameId of tags) {
      const order = this._frameScriptOrder.get(frameId);
      if (!order || order.length === 0) continue;

      const idx = order.indexOf(scriptKey);
      if (idx <= 0) continue;

      for (let i = 0; i < idx; i += 1) {
        result.add(order[i]);
      }
    }

    return [...result.values()];
  }

  markReferencedScript(fromScript: ExtensionScript | undefined, source: string) {
    if (!fromScript) return;

    if (this._enabled && !this._usedScriptKeys.has(fromScript.key)) return;

    const resolved = fromScript.resolveRelativeScriptKey(source);
    if (!resolved) return;

    this.propagateFrameByReference(
      fromScript.key,
      resolved,
      `ref-from:${fromScript.key}`,
    );

    if (this._enabled) {
      this.markUsedByKey(resolved, `ref-from:${fromScript.key}`);
    }
  }

  markReferencedScriptByKey(fromScriptKey: string | undefined, source: string) {
    if (!fromScriptKey || !this._registry) return;
    const script = this._registry.get(fromScriptKey);
    if (!script) return;
    this.markReferencedScript(script, source);
  }

  markReferencedScriptByPathOrUrlByKey(
    fromScriptKey: string | undefined,
    value: string,
  ) {
    if (!value) return;

    const runtimePath = this.runtimeUrlToPath(value);
    if (runtimePath) {
      this.markReferencedScriptByKey(fromScriptKey, runtimePath);
      return;
    }

    this.markReferencedScriptByKey(fromScriptKey, value);
  }

  private seedFromManifest(manifest: Record<string, any>) {
    const initialOrderSet = new Set<string>();

    const addToInitialOrder = (key: string) => {
      if (!this._registry?.has(key)) return;
      if (initialOrderSet.has(key)) return;
      initialOrderSet.add(key);
      this._initialAnalysisOrder.push(key);
    };

    const registerInFrameOrder = (frameId: ScriptFrameTag, key: string) => {
      if (!this._registry?.has(key)) return;
      if (!this._frameScriptOrder.has(frameId)) {
        this._frameScriptOrder.set(frameId, []);
      }

      const order = this._frameScriptOrder.get(frameId)!;
      if (!order.includes(key)) {
        order.push(key);
      }
    };

    const externallyConnectable = manifest?.externally_connectable;
    if (externallyConnectable && typeof externallyConnectable === "object") {
      this._externallyConnectableDeclared = true;
      this._externallyConnectableMatches = this.normalizeStrArray(
        externallyConnectable.matches,
      );
      this._externallyConnectableIds = this.normalizeStrArray(
        externallyConnectable.ids,
      );
    }

    const contentScripts = Array.isArray(manifest?.content_scripts)
      ? manifest.content_scripts
      : [];

    let csIndex = 0;
    for (const item of contentScripts) {
      csIndex += 1;
      const frameId = `CS_${csIndex}`;

      this._frameFamilies.set(frameId, "CS");
      this._frameConstraints.set(frameId, {
        matches: this.normalizeStrArray(item?.matches),
        includeGlobs: this.normalizeStrArray(item?.include_globs),
        excludeMatches: this.normalizeStrArray(item?.exclude_matches),
        excludeGlobs: this.normalizeStrArray(item?.exclude_globs),
      });

      const jsArr = Array.isArray(item?.js) ? item.js : [];
      for (const js of jsArr) {
        const key = this.sourceToScriptKey(String(js));
        if (!key) continue;

        this.markFrameByKey(key, frameId, "manifest-content-script");
        registerInFrameOrder(frameId, key);
        addToInitialOrder(key);

        if (this._enabled) {
          this.markUsedByKey(key, "manifest-content-script");
        }
      }
    }

    const background = manifest?.background;
    if (background && typeof background === "object") {
      const bgFrameId = "BG_1";
      this._frameFamilies.set(bgFrameId, "BG");

      const bgScripts = Array.isArray(background.scripts)
        ? background.scripts
        : [];

      for (const s of bgScripts) {
        const key = this.sourceToScriptKey(String(s));
        if (!key) continue;

        this.markFrameByKey(key, bgFrameId, "manifest-background-scripts");
        registerInFrameOrder(bgFrameId, key);
        addToInitialOrder(key);

        if (this._enabled) {
          this.markUsedByKey(key, "manifest-background-scripts");
        }
      }

      if (typeof background.service_worker === "string") {
        const key = this.sourceToScriptKey(background.service_worker);
        if (key) {
          this.markFrameByKey(key, bgFrameId, "manifest-service-worker");
          registerInFrameOrder(bgFrameId, key);
          addToInitialOrder(key);

          if (this._enabled) {
            this.markUsedByKey(key, "manifest-service-worker");
          }
        }
      }

      const backgroundPage =
        typeof background.page === "string"
          ? background.page
          : typeof background.background_page === "string"
            ? background.background_page
            : null;

      if (backgroundPage) {
        const pageAbs = this.resolveFromBase(backgroundPage);
        const scriptKeys = this.extractScriptKeysFromHtml(pageAbs);

        for (const key of scriptKeys) {
          this.markFrameByKey(key, bgFrameId, "manifest-background-page");
          registerInFrameOrder(bgFrameId, key);
          addToInitialOrder(key);

          if (this._enabled) {
            this.markUsedByKey(key, "manifest-background-page");
          }
        }
      }
    }
  }

  private normalizeStrArray(value: any): string[] | undefined {
    if (!Array.isArray(value)) return undefined;
    const list = value
      .filter((v) => typeof v === "string")
      .map((v) => String(v));
    return list.length > 0 ? list : undefined;
  }

  private extractScriptKeysFromHtml(htmlAbsPath: string): string[] {
    const result: string[] = [];
    if (!fs.existsSync(htmlAbsPath)) return result;

    let html = "";
    try {
      html = fs.readFileSync(htmlAbsPath, "utf-8");
    } catch {
      return result;
    }

    const dir = path.dirname(htmlAbsPath);
    const scriptSrcRegex = /<script[^>]*\ssrc\s*=\s*["']([^"']+)["'][^>]*>/gi;

    for (
      let match = scriptSrcRegex.exec(html);
      match;
      match = scriptSrcRegex.exec(html)
    ) {
      const src = String(match[1] ?? "").trim();
      if (!src || this.isExternalUrl(src)) continue;

      const absPath = src.startsWith(".")
        ? path.resolve(dir, src)
        : path.resolve(this._baseDir, src.replace(/^\//, ""));

      if (isIgnoredAbsolutePath(absPath, this._baseDir)) continue;
      if (!fs.existsSync(absPath)) continue;

      result.push(ExtensionScript.createScriptKey(absPath, this._baseDir));
    }

    return result;
  }

  private isExternalUrl(value: string): boolean {
    return /^(https?:|data:|blob:|chrome-extension:|moz-extension:)/i.test(value);
  }

  private runtimeUrlToPath(value: string): string | null {
    if (!/^(chrome-extension:|moz-extension:)/i.test(value)) return null;

    try {
      const parsed = new URL(value);
      const p = decodeURIComponent(parsed.pathname || "").replace(/^\//, "");
      return p || null;
    } catch {
      return null;
    }
  }

  private sourceToScriptKey(source: string): string | null {
    if (!source || this.isExternalUrl(source)) return null;

    const abs = this.resolveFromBase(source);
    if (isIgnoredAbsolutePath(abs, this._baseDir)) return null;
    if (!fs.existsSync(abs)) return null;

    return ExtensionScript.createScriptKey(abs, this._baseDir);
  }

  private resolveFromBase(source: string): string {
    return path.resolve(this._baseDir, source.replace(/^\//, ""));
  }

  private markUsedByKey(scriptKey: string, reason: string) {
    if (!this._registry?.has(scriptKey)) return;
    if (this._usedScriptKeys.has(scriptKey)) return;

    this._usedScriptKeys.add(scriptKey);
    logger.debug(`[SCRIPT-USAGE] mark used: ${scriptKey} (${reason})`);
  }

  private markFrameByKey(scriptKey: string, tag: ScriptFrameTag, reason: string) {
    if (!this._registry?.has(scriptKey)) return;
    if (!this._scriptFrames.has(scriptKey)) {
      this._scriptFrames.set(scriptKey, new Set());
    }

    const set = this._scriptFrames.get(scriptKey)!;
    if (set.has(tag)) return;

    set.add(tag);
    logger.debug(`[SCRIPT-USAGE] mark frame: ${scriptKey} -> ${tag} (${reason})`);
  }

  private appendFrameOrderIfMissing(frameId: ScriptFrameTag, scriptKey: string) {
    if (!this._registry?.has(scriptKey)) return;
    if (!this._frameScriptOrder.has(frameId)) {
      this._frameScriptOrder.set(frameId, []);
    }

    const order = this._frameScriptOrder.get(frameId)!;
    if (!order.includes(scriptKey)) {
      order.push(scriptKey);
    }
  }

  private propagateFrameByReference(
    fromScriptKey: string,
    toScriptKey: string,
    reason: string,
  ) {
    const sourceTags = this._scriptFrames.get(fromScriptKey);
    if (!sourceTags || sourceTags.size === 0) return;

    for (const tag of sourceTags) {
      this.markFrameByKey(toScriptKey, tag, reason);
      this.appendFrameOrderIfMissing(tag, toScriptKey);
    }
  }
}

export const scriptUsageTracker = new ScriptUsageTracker();
