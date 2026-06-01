/**
 * Unified Chrome-extension component model.
 *
 * Until now `ScriptUsageTracker` only modelled `background` and `content_scripts`.
 * Real extensions ship a richer set of entrypoints — popup HTML, options pages,
 * side panels, devtools pages, devtools panels, chrome_url_overrides, offscreen
 * documents and ad-hoc extension pages opened through `chrome.runtime.getURL`.
 * Each of those can host arbitrary JavaScript that lives in the extension's
 * high-privilege context, so they need to participate in the same taint
 * analysis pipeline as background / content scripts.
 *
 * This file defines a small, uniform abstraction so the rest of the engine
 * does not have to special-case each manifest field. Discovery, HTML parsing
 * and frame propagation are owned by `ScriptUsageTracker`; this module owns
 * the data model + a registry to look components up by id, type or script key.
 */
import { ScriptFrameTag } from "./extensionScript";

/**
 * Execution context of a component, used by taint policy / severity to decide
 * whether a source/sink is reachable from the public web or only from inside
 * the extension surface.
 */
export type ComponentPermissionsContext =
  // Privileged extension page: shares cookies/permissions with the rest of the
  // extension, can call any `chrome.*` API the manifest declares. Examples:
  // background, popup, options, side_panel, devtools, chrome_url_overrides,
  // offscreen documents, extension pages opened via `chrome.runtime.getURL`.
  | "extension"
  // Runs in an isolated world inside a regular web page. Has access to the
  // page DOM and a subset of `chrome.*` APIs (storage, runtime, i18n, ...).
  | "content_script"
  // Runs inside an attacker-controlled web page (e.g. a script injected via
  // `world: "MAIN"`). Currently unused but reserved for future MV3 main-world
  // injection support.
  | "web_page";

/**
 * Identifies *kind* of component. Drives default permissions context, frame
 * family selection and severity defaults.
 */
export type ExtensionComponentType =
  | "background"
  | "content_script"
  | "popup"
  | "options"
  | "side_panel"
  | "devtools"
  | "devtools_panel"
  | "override_page"
  | "offscreen"
  | "extension_page";

/**
 * Where the component was discovered. Useful for diagnostics and for severity
 * analysis (e.g. dynamic offscreen documents need a softer severity than
 * statically declared popups).
 */
export type ComponentDiscovery =
  // Discovered via a manifest field (`action.default_popup`, `options_page`, ...)
  | "manifest"
  // Discovered via static constant folding of a runtime API call
  // (`chrome.offscreen.createDocument`, `chrome.devtools.panels.create`).
  | "runtime-static"
  // Reserved: discovered at runtime via dynamic URL whose value couldn't be
  // resolved statically — never instantiated today (we emit a warning instead),
  // but kept on the union so future heuristics can mark optimistic guesses.
  | "runtime-dynamic";

/**
 * Manifest version this component belongs to. MV2 popups are declared under
 * `browser_action` / `page_action`; MV3 popups live under `action`. Tracking
 * this lets the engine emit MV-version-aware warnings.
 */
export type ManifestVersion = 2 | 3;

export interface ExtensionComponent {
  /** Stable, human-readable id, e.g. `popup:1`, `offscreen:offscreen.html`. */
  id: string;
  type: ExtensionComponentType;
  /**
   * HTML entry path (relative to extension `baseDir`) when the component is
   * declared via an HTML page. Omitted for `background.service_worker` /
   * `background.scripts[]` which list scripts directly.
   */
  htmlPath?: string;
  /** Script keys (`ExtensionScript.key`) extracted from `htmlPath` + manifest. */
  scriptPaths: string[];
  permissionsContext: ComponentPermissionsContext;
  /**
   * Manifest pointer that produced this component, e.g. `action.default_popup`,
   * or `runtime:chrome.offscreen.createDocument`. Kept as a free-form string
   * so future discovery paths don't require a schema bump.
   */
  manifestSource: string;
  mv: ManifestVersion;
  discovery: ComponentDiscovery;
  /**
   * Frame tag assigned to every script in `scriptPaths`. Distinct components
   * always get distinct frame tags so cross-component bridges can pinpoint
   * the originating surface.
   */
  frameTag: ScriptFrameTag;
}

/**
 * Singleton registry of discovered components. Populated by
 * `ScriptUsageTracker` during `initialize` and extended at analysis time when
 * dynamic component discovery (e.g. `chrome.offscreen.createDocument`) finds
 * new HTML entries.
 */
class ComponentRegistry {
  private readonly _byId = new Map<string, ExtensionComponent>();
  private readonly _byFrameTag = new Map<ScriptFrameTag, ExtensionComponent>();
  // One script can belong to multiple components (e.g. a shared util loaded
  // by both popup and options). Track every component that references it.
  private readonly _byScriptKey = new Map<string, Set<string>>();

  reset() {
    this._byId.clear();
    this._byFrameTag.clear();
    this._byScriptKey.clear();
  }

  register(component: ExtensionComponent) {
    // Last-write-wins on duplicate id but keep the script-key index growing —
    // re-registering a component (e.g. when extra scripts are discovered later
    // in the same session) should never drop scripts already linked to it.
    const prior = this._byId.get(component.id);
    if (prior) {
      const merged: ExtensionComponent = {
        ...prior,
        ...component,
        scriptPaths: dedupe([...prior.scriptPaths, ...component.scriptPaths]),
      };
      this._byId.set(component.id, merged);
      this._byFrameTag.set(merged.frameTag, merged);
      this.indexScripts(merged);
      return;
    }

    this._byId.set(component.id, component);
    this._byFrameTag.set(component.frameTag, component);
    this.indexScripts(component);
  }

  private indexScripts(component: ExtensionComponent) {
    for (const key of component.scriptPaths) {
      if (!this._byScriptKey.has(key)) {
        this._byScriptKey.set(key, new Set());
      }
      this._byScriptKey.get(key)!.add(component.id);
    }
  }

  attachScriptToComponent(componentId: string, scriptKey: string) {
    const component = this._byId.get(componentId);
    if (!component) return;
    if (component.scriptPaths.includes(scriptKey)) return;
    component.scriptPaths.push(scriptKey);

    if (!this._byScriptKey.has(scriptKey)) {
      this._byScriptKey.set(scriptKey, new Set());
    }
    this._byScriptKey.get(scriptKey)!.add(componentId);
  }

  get(id: string): ExtensionComponent | undefined {
    return this._byId.get(id);
  }

  getByFrameTag(tag: ScriptFrameTag): ExtensionComponent | undefined {
    return this._byFrameTag.get(tag);
  }

  componentsForScript(scriptKey: string): ExtensionComponent[] {
    const ids = this._byScriptKey.get(scriptKey);
    if (!ids) return [];

    const list: ExtensionComponent[] = [];
    for (const id of ids) {
      const c = this._byId.get(id);
      if (c) list.push(c);
    }
    return list;
  }

  all(): ExtensionComponent[] {
    return [...this._byId.values()];
  }

  byType(type: ExtensionComponentType): ExtensionComponent[] {
    return this.all().filter((c) => c.type === type);
  }

  size(): number {
    return this._byId.size;
  }
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

export const componentRegistry = new ComponentRegistry();

/**
 * Default permissions context for a component type. UI pages declared in the
 * manifest all run in the extension context — the only outlier today is
 * `content_script`, which has a hybrid permissions model and is therefore
 * marked explicitly.
 */
export function defaultPermissionsContext(
  type: ExtensionComponentType,
): ComponentPermissionsContext {
  switch (type) {
    case "content_script":
      return "content_script";
    default:
      return "extension";
  }
}

/**
 * Frame family used by `getFrameFamily` for severity / filter classification.
 *
 *  - `BG` / `CS` map to existing background / content-script semantics.
 *  - `EX` covers UI surfaces that share the extension permission set with the
 *    background but are not the background itself: popup, options, side panel,
 *    chrome_url_overrides, and ad-hoc extension pages.
 *  - `DT` (devtools) and `OF` (offscreen) are split out because they have
 *    distinct attack-surface stories: devtools pages can be opened only when
 *    the user opens DevTools, offscreen documents have no UI and exist only
 *    to host APIs that are unavailable to service workers.
 */
export function componentTypeToFrameFamily(
  type: ExtensionComponentType,
): "BG" | "CS" | "EX" | "DT" | "OF" {
  switch (type) {
    case "background":
      return "BG";
    case "content_script":
      return "CS";
    case "popup":
    case "options":
    case "side_panel":
    case "override_page":
    case "extension_page":
      return "EX";
    case "devtools":
    case "devtools_panel":
      return "DT";
    case "offscreen":
      return "OF";
  }
}
