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
import {
  ComponentDiscovery,
  componentRegistry,
  componentTypeToFrameFamily,
  defaultPermissionsContext,
  ExtensionComponent,
  ExtensionComponentType,
  ManifestVersion,
} from "./extensionComponent";
import { extractScriptsFromHtml } from "./htmlScriptExtractor";

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
  private _manifest: Record<string, any> | null = null;
  private _manifestVersion: ManifestVersion = 3;
  private _usedScriptKeys: Set<string> = new Set();
  private _scriptFrames: Map<string, Set<ScriptFrameTag>> = new Map();
  private _frameFamilies: Map<ScriptFrameTag, ScriptFrameFamily> = new Map();
  private _frameConstraints: Map<ScriptFrameTag, FrameConstraint> = new Map();
  private _frameScriptOrder: Map<ScriptFrameTag, string[]> = new Map();
  /** Synthetic page-world frame tags keyed by injected script. */
  private _mainFrameTags: Map<string, ScriptFrameTag> = new Map();
  private _initialAnalysisOrder: string[] = [];
  private _externallyConnectableDeclared = false;
  private _externallyConnectableMatches?: string[];
  private _externallyConnectableIds?: string[];
  // Counter for monotonically-named frames (popups/options often only ship one,
  // but devtools_panel / offscreen pages can repeat).
  private _frameCounters: Map<string, number> = new Map();

  reset() {
    this._enabled = false;
    this._baseDir = "";
    this._registry = null;
    this._manifest = null;
    this._manifestVersion = 3;
    this._usedScriptKeys.clear();
    this._scriptFrames.clear();
    this._frameFamilies.clear();
    this._frameConstraints.clear();
    this._frameScriptOrder.clear();
    this._mainFrameTags.clear();
    this._initialAnalysisOrder = [];
    this._externallyConnectableDeclared = false;
    this._externallyConnectableMatches = undefined;
    this._externallyConnectableIds = undefined;
    this._frameCounters.clear();
    componentRegistry.reset();
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
    this._manifest = opts.manifest;
    this._manifestVersion = this.detectManifestVersion(opts.manifest);

    this.seedFromManifest(opts.manifest);

    logger.info(
      `[SCRIPT-USAGE] initialized, mv=${this._manifestVersion}, frames=${this._frameFamilies.size}, scriptsWithFrame=${this._scriptFrames.size}, initialOrder=${this._initialAnalysisOrder.length}, components=${componentRegistry.size()}`,
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

  /**
   * Pick the most "important" frame tag of a script for reporting.
   *
   * Precedence: BG > CS > EX > DT > OF > MAIN > UNKNOWN. Background and content
   * scripts come first because they were the original primary surfaces;
   * extension UI pages and devtools/offscreen follow, which means a script
   * shared by background + popup is still reported as `BG_1`. This matches
   * the pre-existing reporting heuristic for CS/BG.
   */
  getPrimaryFrameByKey(scriptKey: string): ScriptFrameTag {
    const tags = this._scriptFrames.get(scriptKey);
    if (!tags || tags.size === 0) return "UNKNOWN";

    const familyOrder: Record<ScriptFrameFamily, number> = {
      BG: 0,
      CS: 1,
      EX: 2,
      DT: 3,
      OF: 4,
      MAIN: 5,
      UNKNOWN: 6,
    };

    const arr = Array.from(tags.values());
    arr.sort((a, b) => {
      const af = familyOrder[this.getFrameFamily(a)];
      const bf = familyOrder[this.getFrameFamily(b)];
      if (af !== bf) return af - bf;
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

  getManifestVersion(): ManifestVersion {
    return this._manifestVersion;
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

  markReferencedScript(
    fromScript: ExtensionScript | undefined,
    source: string,
    propagateFrame = true,
    executionFrameFamily?: ScriptFrameFamily,
  ) {
    if (!fromScript) return;

    if (this._enabled && !this._usedScriptKeys.has(fromScript.key)) return;

    const resolved = fromScript.resolveRelativeScriptKey(source);
    if (!resolved) return;

    // `propagateFrame` is false for programmatic tab injection
    // (`chrome.scripting.executeScript` / `chrome.tabs.executeScript`): those run
    // the target file in the PAGE tab (a content-script context), NOT in the
    // caller's frame, so inheriting the caller's (e.g. background) frame would
    // misattribute a page-reachable script as privileged and collapse the CS->BG
    // boundary. The file keeps its own manifest frame (e.g. content_scripts) or
    // stays unframed; reachability is still marked so its body is analyzed.
    if (executionFrameFamily) {
      this.markScriptInSyntheticFrame(
        resolved,
        executionFrameFamily,
        `runtime-injection:${fromScript.key}`,
      );
    } else if (propagateFrame) {
      this.propagateFrameByReference(
        fromScript.key,
        resolved,
        `ref-from:${fromScript.key}`,
      );
    }

    if (this._enabled) {
      this.markUsedByKey(resolved, `ref-from:${fromScript.key}`);
    }
  }

  markReferencedScriptByKey(
    fromScriptKey: string | undefined,
    source: string,
    propagateFrame = true,
    executionFrameFamily?: ScriptFrameFamily,
  ) {
    if (!fromScriptKey || !this._registry) return;
    const script = this._registry.get(fromScriptKey);
    if (!script) return;
    this.markReferencedScript(
      script,
      source,
      propagateFrame,
      executionFrameFamily,
    );
  }

  markReferencedScriptByPathOrUrlByKey(
    fromScriptKey: string | undefined,
    value: string,
    propagateFrame = true,
    executionFrameFamily?: ScriptFrameFamily,
  ) {
    if (!value) return;

    const runtimePath = this.runtimeUrlToPath(value);
    if (runtimePath) {
      this.markReferencedScriptByKey(
        fromScriptKey,
        runtimePath,
        propagateFrame,
        executionFrameFamily,
      );
      return;
    }

    this.markReferencedScriptByKey(
      fromScriptKey,
      value,
      propagateFrame,
      executionFrameFamily,
    );
  }

  /**
   * Recognize only a DOM script-element load. `runtime.getURL` is also used
   * for images and extension pages, so all other calls retain their caller's
   * frame and historical TP behavior.
   */
  isMainWorldScriptReference(
    callNode: any,
    astNode: any,
    fromScriptKey?: string,
  ): boolean {
    // The CFG FlowNode is normally built for the containing statement, while
    // `astNode` is the nested CallExpression. Walk that small statement tree
    // to recover the syntactic parent of the getURL call.
    let parent: any = callNode?.parent as any;
    const root = callNode?.astNode as any;
    const visit = (node: any, nodeParent: any): boolean => {
      if (!node || typeof node !== "object") return false;
      if (node === astNode) {
        parent = nodeParent;
        return true;
      }
      for (const [key, value] of Object.entries(node)) {
        if (key === "loc" || key === "start" || key === "end" || key === "range") continue;
        if (Array.isArray(value)) {
          for (const child of value) {
            if (visit(child, node)) return true;
          }
        } else if (visit(value, node)) {
          return true;
        }
      }
      return false;
    };
    visit(root, callNode?.parent);
    if (!parent) return false;

    // Bundled content scripts commonly split the idiom into two statements:
    // `const url = chrome.runtime.getURL("injected.js"); script.src = url;`.
    // Recover that one-hop local binding from the complete scope AST.
    const declaredName =
      parent.type === "VariableDeclarator" &&
      parent.init === astNode &&
      parent.id?.type === "Identifier"
        ? parent.id.name
        : undefined;
    if (declaredName) {
      const fullRoot = (callNode?.scopeTree as any)?.root?.ast ?? root;
      let found = false;
      const scan = (node: any): void => {
        if (found || !node || typeof node !== "object") return;
        if (
          node.type === "AssignmentExpression" &&
          node.left?.type === "MemberExpression" &&
          !node.left.computed &&
          node.left.property?.type === "Identifier" &&
          node.left.property.name === "src" &&
          node.right?.type === "Identifier" &&
          node.right.name === declaredName
        ) {
          found = true;
          return;
        }
        if (
          node.type === "CallExpression" &&
          node.callee?.type === "MemberExpression" &&
          !node.callee.computed &&
          node.callee.property?.type === "Identifier" &&
          node.callee.property.name === "setAttribute" &&
          node.arguments?.[0]?.type === "Literal" &&
          node.arguments[0].value === "src" &&
          node.arguments?.[1]?.type === "Identifier" &&
          node.arguments[1].name === declaredName
        ) {
          found = true;
          return;
        }
        for (const [key, value] of Object.entries(node)) {
          if (key === "loc" || key === "start" || key === "end" || key === "range") continue;
          if (Array.isArray(value)) value.forEach(scan);
          else scan(value);
        }
      };
      scan(fullRoot);
      if (found) return true;
    }

    // ASTs produced by heavily bundled files may expose only the current
    // function body through ScopeTree. Fall back to a bounded source-text
    // check for the same one-hop binding; it is deliberately tied to a
    // literal getURL path and a subsequent `.src = <that binding>`.
    if (fromScriptKey && this._registry) {
      const script = this._registry.get(fromScriptKey);
      const code = script?.getCode() ?? "";
      if (code) {
        const binding = /\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*chrome\.runtime\.getURL\s*\([^;\n]*\)[\s\S]{0,1200}?\b[A-Za-z_$][\w$]*\.src\s*=\s*\1\b/;
        if (binding.test(code)) return true;
      }
    }

    if (
      parent.type === "AssignmentExpression" &&
      parent.right === astNode &&
      parent.left?.type === "MemberExpression" &&
      !parent.left.computed &&
      parent.left.property?.type === "Identifier" &&
      parent.left.property.name === "src"
    ) {
      return true;
    }

    if (
      parent.type === "CallExpression" &&
      parent.callee?.type === "MemberExpression" &&
      !parent.callee.computed &&
      parent.callee.property?.type === "Identifier" &&
      parent.callee.property.name === "setAttribute" &&
      parent.arguments?.[1] === astNode &&
      parent.arguments?.[0]?.type === "Literal" &&
      parent.arguments[0].value === "src"
    ) {
      return true;
    }

    return false;
  }

  /**
   * Register an HTML-backed component discovered at runtime via constant
   * folding of a builtin (`chrome.offscreen.createDocument`,
   * `chrome.devtools.panels.create`). The caller has already confirmed the
   * URL argument is a string literal — we just resolve it and forward to the
   * regular component-registration path.
   *
   * Returns the registered component, or `null` if the HTML couldn't be
   * resolved (missing file, ignored path, etc.).
   */
  registerRuntimeDiscoveredComponent(opts: {
    type: ExtensionComponentType;
    htmlRelPath: string;
    manifestSource: string;
    discoveredFromScriptKey?: string;
  }): ExtensionComponent | null {
    if (!this._baseDir || !this._registry) return null;

    const trimmed = opts.htmlRelPath.replace(/^\/+/, "").trim();
    if (!trimmed) return null;

    const absPath = path.resolve(this._baseDir, trimmed);
    if (isIgnoredAbsolutePath(absPath, this._baseDir)) return null;
    if (!fs.existsSync(absPath)) {
      logger.warn(
        `[SCRIPT-USAGE] runtime component HTML not found: ${trimmed} (source=${opts.manifestSource})`,
      );
      return null;
    }

    const id = `${opts.type}:${trimmed}`;
    const existing = componentRegistry.get(id);
    if (existing) {
      // Already discovered — still propagate frames in case the call appears
      // in multiple sites (idempotent).
      this.activateComponent(existing);
      return existing;
    }

    const component = this.discoverHtmlBackedComponent({
      type: opts.type,
      htmlAbsPath: absPath,
      manifestSource: opts.manifestSource,
      discovery: "runtime-static",
      id,
    });

    if (component) {
      logger.info(
        `[SCRIPT-USAGE] discovered runtime component: ${component.id} via ${opts.manifestSource} (${component.scriptPaths.length} scripts)`,
      );
    }

    return component;
  }

  private detectManifestVersion(manifest: Record<string, any>): ManifestVersion {
    const v = Number(manifest?.manifest_version);
    return v === 2 ? 2 : 3;
  }

  private seedFromManifest(manifest: Record<string, any>) {
    this.seedExternallyConnectable(manifest);
    this.seedContentScripts(manifest);
    this.seedBackground(manifest);
    this.seedPopup(manifest);
    this.seedOptions(manifest);
    this.seedSidePanel(manifest);
    this.seedDevtools(manifest);
    this.seedChromeUrlOverrides(manifest);
  }

  private seedExternallyConnectable(manifest: Record<string, any>) {
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
  }

  private seedContentScripts(manifest: Record<string, any>) {
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

      const scriptKeys: string[] = [];
      const jsArr = Array.isArray(item?.js) ? item.js : [];
      for (const js of jsArr) {
        const key = this.sourceToScriptKey(String(js));
        if (!key) continue;

        this.markFrameByKey(key, frameId, "manifest-content-script");
        this.appendFrameOrderIfMissing(frameId, key);
        this.addToInitialOrder(key);
        if (this._enabled) this.markUsedByKey(key, "manifest-content-script");
        scriptKeys.push(key);
      }

      this.registerComponent({
        id: `content_script:${csIndex}`,
        type: "content_script",
        scriptPaths: scriptKeys,
        manifestSource: `content_scripts[${csIndex - 1}]`,
        discovery: "manifest",
        frameTag: frameId,
      });
    }
  }

  private seedBackground(manifest: Record<string, any>) {
    const background = manifest?.background;
    if (!background || typeof background !== "object") return;

    const bgFrameId = "BG_1";
    this._frameFamilies.set(bgFrameId, "BG");
    const collected: string[] = [];

    const bgScripts = Array.isArray(background.scripts)
      ? background.scripts
      : [];

    for (const s of bgScripts) {
      const key = this.sourceToScriptKey(String(s));
      if (!key) continue;
      this.markFrameByKey(key, bgFrameId, "manifest-background-scripts");
      this.appendFrameOrderIfMissing(bgFrameId, key);
      this.addToInitialOrder(key);
      if (this._enabled) this.markUsedByKey(key, "manifest-background-scripts");
      collected.push(key);
    }

    if (typeof background.service_worker === "string") {
      const key = this.sourceToScriptKey(background.service_worker);
      if (key) {
        this.markFrameByKey(key, bgFrameId, "manifest-service-worker");
        this.appendFrameOrderIfMissing(bgFrameId, key);
        this.addToInitialOrder(key);
        if (this._enabled) this.markUsedByKey(key, "manifest-service-worker");
        collected.push(key);
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
      const extracted = extractScriptsFromHtml(pageAbs, this._baseDir);
      for (const item of extracted) {
        this.registerExtractedScript(item.scriptKey, item.absPath);
        this.markFrameByKey(item.scriptKey, bgFrameId, "manifest-background-page");
        this.appendFrameOrderIfMissing(bgFrameId, item.scriptKey);
        this.addToInitialOrder(item.scriptKey);
        if (this._enabled) this.markUsedByKey(item.scriptKey, "manifest-background-page");
        collected.push(item.scriptKey);
      }
    }

    this.registerComponent({
      id: "background:1",
      type: "background",
      scriptPaths: collected,
      manifestSource: backgroundPage
        ? "background.page"
        : background.service_worker
          ? "background.service_worker"
          : "background.scripts",
      discovery: "manifest",
      frameTag: bgFrameId,
    });
  }

  /**
   * Popup discovery covers all three manifest spellings:
   *   - MV3:  `action.default_popup`
   *   - MV2:  `browser_action.default_popup`
   *   - MV2:  `page_action.default_popup`
   *
   * `chrome_action.default_popup` (the legacy spelling some MV2 extensions
   * still use) is intentionally NOT supported — it isn't part of the
   * Chrome Extensions docs.
   */
  private seedPopup(manifest: Record<string, any>) {
    const popupCandidates = [
      { field: "action.default_popup", value: manifest?.action?.default_popup },
      {
        field: "browser_action.default_popup",
        value: manifest?.browser_action?.default_popup,
      },
      {
        field: "page_action.default_popup",
        value: manifest?.page_action?.default_popup,
      },
    ];

    let count = 0;
    for (const { field, value } of popupCandidates) {
      if (typeof value !== "string" || !value) continue;
      count += 1;
      this.discoverHtmlBackedComponent({
        type: "popup",
        htmlAbsPath: this.resolveFromBase(value),
        manifestSource: field,
        discovery: "manifest",
        id: `popup:${count}`,
      });
    }
  }

  private seedOptions(manifest: Record<string, any>) {
    const optionsCandidates = [
      { field: "options_page", value: manifest?.options_page },
      { field: "options_ui.page", value: manifest?.options_ui?.page },
    ];

    let count = 0;
    for (const { field, value } of optionsCandidates) {
      if (typeof value !== "string" || !value) continue;
      count += 1;
      this.discoverHtmlBackedComponent({
        type: "options",
        htmlAbsPath: this.resolveFromBase(value),
        manifestSource: field,
        discovery: "manifest",
        id: `options:${count}`,
      });
    }
  }

  private seedSidePanel(manifest: Record<string, any>) {
    const sidePanel = manifest?.side_panel?.default_path;
    if (typeof sidePanel !== "string" || !sidePanel) return;

    this.discoverHtmlBackedComponent({
      type: "side_panel",
      htmlAbsPath: this.resolveFromBase(sidePanel),
      manifestSource: "side_panel.default_path",
      discovery: "manifest",
      id: "side_panel:1",
    });
  }

  /**
   * DevTools page itself is statically declared. Panels created via
   * `chrome.devtools.panels.create` are picked up by the runtime semantic
   * (see `chrome/devtools.ts`); the call site lives inside the devtools
   * script, so panel frames are propagated as runtime-discovered components.
   */
  private seedDevtools(manifest: Record<string, any>) {
    const devtoolsPage = manifest?.devtools_page;
    if (typeof devtoolsPage !== "string" || !devtoolsPage) return;

    this.discoverHtmlBackedComponent({
      type: "devtools",
      htmlAbsPath: this.resolveFromBase(devtoolsPage),
      manifestSource: "devtools_page",
      discovery: "manifest",
      id: "devtools:1",
    });
  }

  private seedChromeUrlOverrides(manifest: Record<string, any>) {
    const overrides = manifest?.chrome_url_overrides;
    if (!overrides || typeof overrides !== "object") return;

    for (const slot of ["newtab", "history", "bookmarks"] as const) {
      const value = overrides[slot];
      if (typeof value !== "string" || !value) continue;
      this.discoverHtmlBackedComponent({
        type: "override_page",
        htmlAbsPath: this.resolveFromBase(value),
        manifestSource: `chrome_url_overrides.${slot}`,
        discovery: "manifest",
        id: `override_page:${slot}`,
      });
    }
  }

  /**
   * Common path for HTML-backed components (popup / options / side_panel /
   * devtools / overrides / offscreen). Extracts scripts via the regex parser,
   * registers them under a freshly minted frame tag and routes them into the
   * initial analysis order.
   */
  private discoverHtmlBackedComponent(opts: {
    type: ExtensionComponentType;
    htmlAbsPath: string;
    manifestSource: string;
    discovery: ComponentDiscovery;
    id: string;
  }): ExtensionComponent | null {
    if (!fs.existsSync(opts.htmlAbsPath)) {
      logger.warn(
        `[SCRIPT-USAGE] component HTML missing: ${opts.htmlAbsPath} (source=${opts.manifestSource})`,
      );
      return null;
    }

    const frameTag = this.allocateFrameTag(opts.type, opts.id);
    const family = componentTypeToFrameFamily(opts.type);
    this._frameFamilies.set(frameTag, family);

    const extracted = extractScriptsFromHtml(opts.htmlAbsPath, this._baseDir);
    const scriptKeys: string[] = [];

    for (const item of extracted) {
      this.registerExtractedScript(item.scriptKey, item.absPath);
      this.markFrameByKey(item.scriptKey, frameTag, opts.manifestSource);
      this.appendFrameOrderIfMissing(frameTag, item.scriptKey);
      this.addToInitialOrder(item.scriptKey);
      if (this._enabled) this.markUsedByKey(item.scriptKey, opts.manifestSource);
      scriptKeys.push(item.scriptKey);
    }

    const component: ExtensionComponent = {
      id: opts.id,
      type: opts.type,
      htmlPath: path
        .relative(this._baseDir, opts.htmlAbsPath)
        .replace(/\\/g, "/"),
      scriptPaths: scriptKeys,
      permissionsContext: defaultPermissionsContext(opts.type),
      manifestSource: opts.manifestSource,
      mv: this._manifestVersion,
      discovery: opts.discovery,
      frameTag,
    };

    this.registerComponent(component);

    if (scriptKeys.length === 0) {
      logger.info(
        `[SCRIPT-USAGE] component ${opts.id} has no scripts (HTML may use only inline / external URLs)`,
      );
    }

    return component;
  }

  /**
   * Newly-extracted scripts (inline materializations and `<script src=...>`
   * targets that the initial JS-file walk missed) must end up in the global
   * `ScriptRegistry`, otherwise downstream lookups will silently drop them.
   */
  private registerExtractedScript(scriptKey: string, absPath: string) {
    if (!this._registry) return;
    if (this._registry.has(scriptKey)) return;
    this._registry.register(new ExtensionScript(absPath, this._baseDir));
  }

  /**
   * Allocate a stable, unique frame tag for a component.
   *
   *  - Singletons (popup / options / devtools / side_panel) use a counter so
   *    we don't accidentally collapse multiple discoveries under one tag.
   *  - Repeated types (devtools_panel / offscreen / override_page /
   *    extension_page) include a discriminator drawn from the component id.
   */
  private allocateFrameTag(
    type: ExtensionComponentType,
    componentId: string,
  ): ScriptFrameTag {
    const prefixMap: Record<ExtensionComponentType, string> = {
      background: "BG",
      content_script: "CS",
      popup: "POPUP",
      options: "OPTIONS",
      side_panel: "SIDEPANEL",
      devtools: "DEVTOOLS",
      devtools_panel: "DEVTOOLS_PANEL",
      override_page: "OVERRIDE",
      offscreen: "OFFSCREEN",
      extension_page: "EXTENSION_PAGE",
    };
    const prefix = prefixMap[type];

    // Distinct id → distinct tag. Use the discriminator from componentId when
    // available, fall back to a monotonic counter per prefix.
    const discriminator = componentId.split(":").slice(1).join(":") || "";
    if (discriminator && /^[\w.-]+$/.test(discriminator)) {
      const tag = `${prefix}_${discriminator.replace(/[^\w.-]+/g, "_")}`;
      return this.uniqueFrameTag(tag);
    }

    const n = (this._frameCounters.get(prefix) ?? 0) + 1;
    this._frameCounters.set(prefix, n);
    return this.uniqueFrameTag(`${prefix}_${n}`);
  }

  private uniqueFrameTag(candidate: ScriptFrameTag): ScriptFrameTag {
    if (!this._frameFamilies.has(candidate)) return candidate;
    let n = 2;
    while (this._frameFamilies.has(`${candidate}#${n}`)) n += 1;
    return `${candidate}#${n}`;
  }

  /** Push a registered component into the global registry. */
  private registerComponent(opts: {
    id: string;
    type: ExtensionComponentType;
    scriptPaths: string[];
    manifestSource: string;
    discovery: ComponentDiscovery;
    frameTag: ScriptFrameTag;
    htmlPath?: string;
  }) {
    componentRegistry.register({
      id: opts.id,
      type: opts.type,
      htmlPath: opts.htmlPath,
      scriptPaths: opts.scriptPaths,
      permissionsContext: defaultPermissionsContext(opts.type),
      manifestSource: opts.manifestSource,
      mv: this._manifestVersion,
      discovery: opts.discovery,
      frameTag: opts.frameTag,
    });
  }

  /**
   * Re-mark every script of an already-known component so frame propagation
   * picks it up on repeated runtime discoveries.
   */
  private activateComponent(component: ExtensionComponent) {
    for (const key of component.scriptPaths) {
      this.markFrameByKey(key, component.frameTag, component.manifestSource);
      this.appendFrameOrderIfMissing(component.frameTag, key);
      this.addToInitialOrder(key);
      if (this._enabled) this.markUsedByKey(key, component.manifestSource);
    }
  }

  private addToInitialOrder(key: string) {
    if (!this._registry?.has(key)) return;
    if (this._initialAnalysisOrder.includes(key)) return;
    this._initialAnalysisOrder.push(key);
  }

  private normalizeStrArray(value: any): string[] | undefined {
    if (!Array.isArray(value)) return undefined;
    const list = value
      .filter((v) => typeof v === "string")
      .map((v) => String(v));
    return list.length > 0 ? list : undefined;
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

  private markScriptInSyntheticFrame(
    scriptKey: string,
    family: ScriptFrameFamily,
    reason: string,
  ) {
    if (!this._registry?.has(scriptKey)) return;

    let tag = this._mainFrameTags.get(scriptKey);
    if (!tag) {
      const prefix = family === "MAIN" ? "MAIN" : family;
      tag = this.uniqueFrameTag(
        `${prefix}_${scriptKey.replace(/[^\w.-]+/g, "_")}`,
      );
      this._mainFrameTags.set(scriptKey, tag);
      this._frameFamilies.set(tag, family);
    }

    this.markFrameByKey(scriptKey, tag, reason);
    this.appendFrameOrderIfMissing(tag, scriptKey);
  }
}

export const scriptUsageTracker = new ScriptUsageTracker();
