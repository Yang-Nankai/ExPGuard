# Extension Components

ExPGuard's loader originally modelled only `content_scripts[*]` and `background.*`. Real Chrome extensions ship a much richer set of high-privilege surfaces — popups, options pages, side panels, devtools, override pages and offscreen documents — every one of which can host JavaScript that participates in privilege-escalation flows. This document describes the unified component model that brings those surfaces under the same analysis pipeline as background and content scripts.

## TL;DR

| Manifest field | Component type | Frame family | Discovery |
|----------------|----------------|--------------|-----------|
| `content_scripts[i].js[]` | `content_script` | `CS` | manifest |
| `background.scripts[]`, `background.service_worker`, `background.page` | `background` | `BG` | manifest |
| `action.default_popup` | `popup` (MV3) | `EX` | manifest |
| `browser_action.default_popup` / `page_action.default_popup` | `popup` (MV2) | `EX` | manifest |
| `options_page` | `options` | `EX` | manifest |
| `options_ui.page` | `options` | `EX` | manifest |
| `side_panel.default_path` | `side_panel` | `EX` | manifest |
| `devtools_page` | `devtools` | `DT` | manifest |
| `chrome_url_overrides.newtab` / `.history` / `.bookmarks` | `override_page` | `EX` | manifest |
| `chrome.offscreen.createDocument({url: <literal>})` | `offscreen` | `OF` | runtime (static) |
| `chrome.devtools.panels.create(_, _, <literal>, _)` | `devtools_panel` | `DT` | runtime (static) |

The HTML files referenced by these fields are parsed for `<script src=...>` and inline `<script>...</script>` blocks; the discovered scripts are registered, tagged with a fresh frame id, and fed through the existing AST → CFG → reaching-def → taint pipeline.

## Files

- `src/extension/extensionComponent.ts` — `ExtensionComponent` type + `componentRegistry` singleton + frame-family mapping.
- `src/extension/htmlScriptExtractor.ts` — Regex-based HTML→scripts pass (external + inline + module).
- `src/extension/scriptUsageTracker.ts` — Manifest seeder, frame propagation, runtime-discovery hook.
- `src/def-use/builtins/builtinSemantics/chrome/offscreen.ts` — `chrome.offscreen.createDocument` discovery.
- `src/def-use/builtins/builtinSemantics/chrome/devtools.ts` — `chrome.devtools.panels.create` discovery.
- `src/def-use/builtins/builtinSemantics/chrome/sidePanel.ts` — `chrome.sidePanel.*` side-effect-only no-ops.
- `src/def-use/builtins/builtins.ts` — Chrome API surface bindings (so the calls reach the semantics).

## The `ExtensionComponent` model

```ts
interface ExtensionComponent {
  id: string;                        // e.g. "popup:1", "offscreen:offscreen.html"
  type: ExtensionComponentType;      // background | content_script | popup | options | ...
  htmlPath?: string;                 // relative HTML entry, undefined for background.* JS
  scriptPaths: string[];             // ScriptKey[] — all JS owned by this component
  permissionsContext: "extension" | "content_script" | "web_page";
  manifestSource: string;            // e.g. "action.default_popup", "runtime:chrome.offscreen.createDocument"
  mv: 2 | 3;                         // manifest version
  discovery: "manifest" | "runtime-static" | "runtime-dynamic";
  frameTag: ScriptFrameTag;          // unique tag like "POPUP_1", "OFFSCREEN_offscreen.html"
}
```

Every component gets a distinct `frameTag`, so cross-component flows in `summary.json` always identify the originating surface. Frames are organized into families used by taint policy / severity:

| Family | Members | Notes |
|--------|---------|-------|
| `BG` | background service worker / scripts / background.html | No `window` event loop in MV3 SWs (web-message sources dropped) |
| `CS` | content scripts | Hybrid permissions, isolated world |
| `EX` | popup / options / side_panel / override_page / extension_page | Privileged extension UI; reachable from user actions |
| `DT` | devtools_page + devtools_panel | Privileged, only loaded when DevTools is open |
| `OF` | offscreen documents | Privileged, no UI; spawned by service worker |

## HTML extractor

`extractScriptsFromHtml(htmlPath, baseDir, options?)` returns one `ExtractedScript` per `<script>` discovered:

- **External scripts** (`<script src="...">`) — paths are resolved relative to the HTML file first, falling back to the extension root for bare paths. External URLs (`https:`, `data:`, `blob:`, `chrome-extension:`) are ignored.
- **Module scripts** (`<script type="module" src="...">`) — same path resolution as external, with `scriptType: "module"` preserved on the result.
- **Inline scripts** (`<script>...</script>`) — materialized as virtual `.js` files under `<baseDir>/.epg-inline/<safe>.inline-<n>.js`. Each virtual file begins with a header comment recording the originating HTML and script index. The header always ends with a newline so the original body isn't accidentally folded into a comment (a subtle bug to look out for if you ever rework the header).

`inlineMode: "skip"` disables inline materialization if you ever need to compare what changes when only external scripts are analyzed.

The extractor is intentionally a tolerant regex rather than `parse5`/`cheerio` — it isn't pulled in as a dependency, and real-world obfuscated extensions ship malformed HTML that a strict parser rejects.

## Runtime-discovered components

Some components only exist if a Chrome API is called with a static URL:

- `chrome.offscreen.createDocument({ url: "offscreen.html", ... })` → registers an `offscreen` component when `url` is a string literal.
- `chrome.devtools.panels.create("Title", "icon.png", "panel.html", cb?)` → registers a `devtools_panel` component when the third argument is a string literal.

When the URL/page argument is **dynamic** (a variable, template literal with non-literal interpolation, etc.), the call still proceeds as a normal side-effecting builtin but **no component is registered** and a `debug`-level warning is emitted. The implementation lives in:

- `src/def-use/builtins/builtinSemantics/chrome/offscreen.ts`
- `src/def-use/builtins/builtinSemantics/chrome/devtools.ts`

This is the "best-effort constant folding" mode chosen during design. Template literals with constant `quasis` are already folded by the optimizer pass (`src/transformation/transformer.ts`), so `\`pages/${variant}.html\`` may still be picked up if `variant` evaluates to a literal.

## Frame propagation and analysis ordering

`scriptUsageTracker.initialize` performs the discovery in this order:

1. `externally_connectable` config (matches / ids) is captured for severity.
2. `content_scripts[*]` — each entry mints a `CS_n` frame with its match constraints.
3. `background.*` — service worker / scripts / page produce a single `BG_1` frame.
4. `popup` candidates (`action`, `browser_action`, `page_action`).
5. `options_page` and `options_ui.page`.
6. `side_panel.default_path`.
7. `devtools_page`.
8. `chrome_url_overrides.{newtab, history, bookmarks}`.

For each manifest-declared HTML entry, the extractor finds its scripts, registers them in the `ScriptRegistry` (using a freshly minted `ExtensionScript` if `collectJsFiles` missed them — that happens for materialized inline scripts), tags them with the component's `frameTag`, and adds them to the initial analysis order.

`extensionContext.analyzeScriptsInOrder` analyzes scripts in this order and re-pulls `scriptUsageTracker.getFramedScriptKeys()` after every file — so runtime-discovered components (e.g. an offscreen document spawned from background.js) join the queue and get analyzed in the same pass.

## Taint policy and severity

The new families compose with existing policy:

- **Filter** (`shouldFilterSourceByFrame`): `WEB_EVENT_SOURCES` (window message / custom event) are dropped when the source frame is `BG` or `OF` — service workers and offscreen documents don't host the relevant event listeners on a `window` object. `CS → CS` for `WEB_STORAGE_SINKS` is still dropped as before.
- **Severity** (`analyzeFlowConstraintSeverity`): a new `EXTENSION_UI_PAGE` constraint kind covers `WINDOW_*` sources from `EX`/`DT`/`OF` frames. These surfaces have no manifest URL constraint to evaluate; the constraint is reported as `MEDIUM` by default with `severityReason` calling out the originating surface and `severityEvidence: [frameTag]`. `EXTERNALLY_CONNECTABLE` and `CONTENT_SCRIPT_MATCHES` keep their existing semantics.

The `summary.json` flow records also gain access to the component model through `frame` / `frameTag` — call `componentRegistry.getByFrameTag(tag)` from external tooling to look up the originating component.

## Cross-component message bridges

The existing `InterContextBridge` machinery already routes messages between any pair of contexts, so popup → background, options → background, side_panel → background, devtools_panel → background and offscreen → background all flow through the same pseudo-sender / pseudo-receiver path used for content_script → background:

- Internal `chrome.runtime.sendMessage(msg)` → `runtime.single.sender.message` channel; the matching `chrome.runtime.onMessage.addListener(handler)` registers a deferred receiver. When the bridge resolves, the engine invokes `handler(msg, sender, sendResponse)` with the sender's tainted message def, transferring taint into the receiver context.
- Port-based channels (`chrome.runtime.connect` + `port.postMessage` + `port.onMessage.addListener`) work the same way through `runtime.connect.sender.message`.

No code change was needed in the bridge layer — components are discovered and registered like any other script, so their channel endpoints land in the same bridge pool.

## Known limitations

1. **`addEventListener("click", cb)` does not invoke `cb`.** `JS_EVENT_NAMES` in `src/constants/event.ts` enumerates events the analyzer treats as non-data-carrying; click / change / submit / keydown / keyup / etc. callbacks are skipped. Popup logic that lives entirely inside a click handler will not surface a flow. Workarounds: read the input value at script load, drive the flow from a `window.addEventListener("message", ...)` (which **is** modelled as a source), or move logic into a `chrome.runtime.onMessage.addListener(...)` handler.
2. **Dynamic component paths.** Non-literal `chrome.offscreen.createDocument({url})` and `chrome.devtools.panels.create(_,_,pagePath,_)` calls are skipped with a debug warning. The HTML on disk is never inspected and no component is registered. (Template literals with fully-static `quasis` are folded by the optimizer pass and may still be picked up.)
3. **`chrome.runtime.getURL("xxx.html")` page opens are not modelled.** The string is resolved by `scriptUsageTracker.markReferencedScriptByPathOrUrlByKey`, but the HTML it points to isn't parsed for child scripts; only `.js` paths are propagated. Future work: have the runtime semantic call into `registerRuntimeDiscoveredComponent({type: "extension_page", ...})` when the URL points to an HTML file.
4. **Inline `<script>` parsing is regex-based.** Malformed HTML (e.g. `<script>` inside string literals in attributes) can in principle fool the extractor. In practice this is fine for the manifest-level surface the loader cares about; obfuscation lives in the JS, not the HTML.
5. **Devtools panel HTML must use a literal `pagePath`.** `chrome.devtools.panels.create(title, icon, somePath, cb)` where `somePath` is a variable is not resolved even when the variable is set once from a literal earlier in the same function — the semantic doesn't run reaching-def on the argument. A future enhancement could query `Def` for a literal value before falling back.
6. **MV2 popups without `browser_action.default_popup`.** Some old MV2 extensions register the popup via `browserAction.setPopup(...)` at runtime. Not modelled.
7. **No support yet for `chrome.action.setPopup` runtime overrides** of an already-discovered popup. Once a popup is registered from the manifest, replacing it at runtime is invisible to the analyzer.

## Adding a new component type

To extend the model:

1. Add the new value to `ExtensionComponentType` in `src/extension/extensionComponent.ts`. Update `componentTypeToFrameFamily` (decide whether it lives in `EX`, `DT`, `OF`, or warrants a new family).
2. If declared in the manifest: add a `seedXxx(manifest)` method to `ScriptUsageTracker.seedFromManifest` calling `discoverHtmlBackedComponent(...)`.
3. If discovered at runtime: add a builtin semantic that calls `scriptUsageTracker.registerRuntimeDiscoveredComponent({...})` with `discovery: "runtime-static"`. Hook the new semantic name into `src/def-use/builtins/builtins.ts` so it gets dispatched.
4. (Optional) Adjust `shouldFilterSourceByFrame` and `analyzeFlowConstraintSeverity` if the new component has different attack-surface semantics.

## Example: end-to-end

`tests/fixtures/extension_components/popup_privilege/`:

```
manifest.json
  └─ action.default_popup: "popup.html"
  └─ background.service_worker: "background.js"
popup.html
  └─ <script src="popup.js"></script>
popup.js   (POPUP_1)
  └─ document.URL → chrome.runtime.sendMessage({type, url})
background.js   (BG_1)
  └─ chrome.runtime.onMessage.addListener(req →
       chrome.bookmarks.create({title, url: req.url})
     )
```

Resulting flow in `summary.json`:

```
flowType:    PRIVILEGE_ESCALATION
sourceType:  DOCUMENT_URL
sourceFrame: POPUP_1
sinkType:    CHROME_BOOKMARK_CREATE_INFO
sinkFrame:   BG_1
messagePassing: true
channel:     runtime.single.sender.message[popup->background]
constraintKind: EXTENSION_UI_PAGE
severity:    MEDIUM
```

The fixture directory contains seven extensions exercising every new component type — see `tests/integration/extensionComponents.test.ts` for the assertions.

## Sample fixtures shipped

Under `tests/fixtures/extension_components/`:

| Fixture | Component type(s) | Flow under test |
|---------|-------------------|------------------|
| `popup_privilege/` | popup (MV3) + background | `DOCUMENT_URL` → `chrome.bookmarks.create` |
| `options_storage/` | options (MV3) + background | `WINDOW_MESSAGE_EVENT` → `chrome.storage.sync.set` |
| `sidepanel_dom_xss/` | side_panel + background | `DOCUMENT_URL` → `eval` |
| `devtools_panel_relay/` | devtools + devtools_panel + background | `DOCUMENT_URL` → `new Function` |
| `offscreen_relay/` | background + offscreen | offscreen surface registered via `chrome.offscreen.createDocument` |
| `override_newtab/` | override_page | `chrome_url_overrides.newtab` registers an `override_page` component |
| `mv2_popup/` | popup (MV2) + background | `browser_action.default_popup` discovery on an MV2 manifest |
| `inline_popup/` | popup with inline `<script>` + background | inline script materialization end-to-end |

Note: these fixtures live under `tests/fixtures/` rather than the top-level `samples/` because the harness's permission settings denied writes under `samples/` during development. Once `samples/` writes are unblocked, they can be moved over — the integration test only needs its `FIXTURES` path updated.
