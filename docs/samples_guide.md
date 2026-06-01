# Samples Guide

Each subdirectory of `samples/` is a self-contained Chrome Extension (MV3 unless noted) crafted to exercise a specific class of detector. Run them with:

```bash
node dist/main.js analyze \
  --type DIR \
  --input ./samples/<name>/ \
  --out   ./output/<name>/ \
  --id    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
  --version 1.0
```

Replace `aaaa...` with any 32-character `[a-p]` string — the analyzer only requires the format to be valid; CRX-derived IDs are only checked when `--type=CRX`.

The table below lists the flow types ExPGuard is expected to surface for each sample. Sources/sinks are the *primary* ones — propagation may involve intermediate `ASSIGN`, `RETURN`, `ELEMENT`, `MESSAGE`, `STORAGE` edges.

| Sample | Frames | Detected flows (classified) | Detected report issues | Severity |
|--------|--------|------------------------------|------------------------|----------|
| `privilege_execution/` | BG_1, CS_1 | WINDOW_MESSAGE_EVENT → CHROME_BOOKMARK_CREATE_INFO (PRIVILEGE_ESCALATION); + STORAGE roundtrip → BOOKMARK | 3 | CRITICAL (`<all_urls>`) |
| `code_injection/` | CRX-packed | ELEMENT_VALUE → TIME_EVAL (CODE_INJECTION) | 2 | host-specific |
| `data_leak/` | BG_1, CS_1 | CHROME_HISTORY_INFO → CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE (DATA_LEAK); CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_HISTORY_ADD_URL (PRIVILEGE_ESCALATION); WINDOW_MESSAGE_EVENT → FETCH_RESOURCE via message hop (REQUEST_FORGERY) | 3 classified flows | LOW (specific host) |
| `storage_poisoning/` | BG_1, CS_1 | 3× WINDOW_CUSTOM_EVENT → CHROME_SYNC_STORAGE (STORAGE_POSOING); TARGET_CUSTOM_EVENT → CHROME_BOOKMARK_CREATE_INFO via message; WINDOW_CUSTOM_EVENT → CHROME_HISTORY_ADD_URL / CHROME_TABS_CREATE_OPTIONS (×2) / CHROME_TABS_EXECUTE (PRIVILEGE_ESCALATION) | 8 classified flows | HIGH (`*://*.theme-marketplace.example/*`) |
| `request_forgery/` | BG_1 | CHROME_ONMESSAGEEXTERNAL_MESSAGE → {FETCH_RESOURCE, FETCH_OPTIONS, XML_HTTP_REQUEST_OPEN, XML_HTTP_REQUEST_SEND, WEBSOCKET_URL} (REQUEST_FORGERY); CHROME_ONCONNECTEXTERNAL_ONMESSAGE → AXIOS_URL; sanitiser path: NO flow logged (taint cleared by `crypto.subtle.digest`) | 7 classified flows + 4 sanitizer events | HIGH (`https://*.partner-a.example/*` subdomain wildcard) |
| `dom_xss/` | BG_1, CS_1 | WINDOW_MESSAGE_EVENT → TIME_EVAL (CODE_INJECTION); plus 3 unclassified-but-detected per-file issues (DOCUMENT_LOCATION→EVAL, ELEMENT_VALUE source, WINDOW_CUSTOM_EVENT source) | 4 per-file issues / 1 classified flow | CRITICAL (`<all_urls>`) |
| `multi_channel/` | BG_1, CS_1, helper (BG_1 via getURL) | CHROME_IDENTITY_TOKEN → CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE (DATA_LEAK); CHROME_ONCONNECTEXTERNAL_ONMESSAGE → CHROME_TABS_EXECUTE (PRIVILEGE_ESCALATION); WINDOW_MESSAGE_EVENT → FETCH_RESOURCE via port bridge (REQUEST_FORGERY) | 3 classified flows | CRITICAL (`externally_connectable.ids = ["*"]`) |

## What each sample exercises in the engine

### `samples/privilege_execution/` *(pre-existing)*

Showcases:

- Direct content-script → background message channel (`chrome.runtime.sendMessage` / `onMessage.addListener`) with a deferred callback bridge.
- Storage roundtrip resolving `PSEUDO_STORAGE` against an earlier `chrome.storage.local.set` in the same key — yielding two distinct issues for the same logical attack.
- Helper module (`utils.js`) imported from background, picking up the BG_1 frame tag and exposing a privileged Chrome API (`chrome.bookmarks.create`).
- Frame constraint: `content_scripts.matches = ["<all_urls>"]` → CRITICAL severity for the WEB_MESSAGE-derived source.

### `samples/code_injection/` *(pre-existing CRX)*

Packaged extension `example.crx`. The CRX extractor demonstrates:

- `CrxExtractor.parseCrxHeader` (v3) → unzipping into `output/code_injection/unpacked`
- Detection of `ELEMENT_VALUE` from `document.getElementById("txtPath").value`
- Propagation through string concatenation to a `setTimeout("...string...", n)` call → `TIME_EVAL` sink.

### `samples/data_leak/`

**Files**: `manifest.json`, `background.js`, `reporter.js`, `util.js`, `content.js`.

Exercises:

- `chrome.cookies.getAll(...)` callback → returns array of cookies tainted with `CHROME_COOKIES_INFO`; flows through `Array.prototype.map` (handled by `js/array.ts` semantics) into `fetch()`.
- `chrome.history.search` callback → results array tainted with `CHROME_HISTORY_INFO` and sent through `sendResponse` (`runtime.sendResponse.external`) of `chrome.runtime.onMessageExternal.addListener`.
- DOM-derived storage poisoning: `document.cookie` / `location.href` / `document.title` packed into an object, written into `chrome.storage.local`, then read by the background which posts the payload to `fetch(...)`. Tests `resolveStorageTaints` + multi-attribute propagation.
- `import` graph spans 3 files — the dependency analyser must produce a topo order that puts `util.js` and `reporter.js` before `background.js`.
- Includes `externally_connectable.ids = ["aaaa..."]` → constraint severity will report LOW for the external-message path (only one specific extension allowed).

### `samples/storage_poisoning/`

**Files**: `manifest.json`, `content.js`, `background.js`, `rules.js`.

Exercises:

- `WINDOW_CUSTOM_EVENT` (non-standard `themeImport` name) → entire `event.detail` is tainted by `browser/event.ts` → packed object → `chrome.storage.sync.set`. The storage `set` is itself a `CHROME_SYNC_STORAGE` sink AND a storage source for the background.
- `TARGET_CUSTOM_EVENT` from a per-element `addEventListener("themeCommit", ...)` → demonstrates the per-element source path through `document.getElementById(...).addEventListener`.
- Storage roundtrip in the BG: `chrome.storage.sync.get([...])` for individual keys (`PSEUDO_STORAGE` → resolved to `WINDOW_CUSTOM_EVENT`) → `chrome.tabs.create`, `chrome.history.addUrl`, recursive helper `applyRedirectRules` that calls `chrome.tabs.executeScript({ code })`.
- `chrome.storage.sync.get(null, cb)` triggers `STORAGE_ALL_ITEMS` source as a control flow.
- Inter-procedural call from `background.js` to `rules.js`'s `applyRedirectRules` exercises `interAnalyzer.analyze` with array-iteration GEN handling.

### `samples/request_forgery/`

**Files**: `manifest.json`, `background.js`, `signer.js`, `axiosBridge.js`, `vendor/axios.min.js`.

Exercises:

- `chrome.runtime.onMessageExternal.addListener` with `externally_connectable.matches = ["https://*.partner-a.example/*"]` → constraint severity should report HIGH (subdomain wildcard).
- 4 distinct sinks from the same source:
  - `fetch(msg.endpoint, ...)` → `FETCH_RESOURCE` + `FETCH_OPTIONS`
  - `xhr.open(method, msg.endpoint)` → `XML_HTTP_REQUEST_OPEN`
  - `new WebSocket(msg.wsUrl)` → `WEBSOCKET_URL`
  - `ws.send(...)` → `WEBSOCKET_DATA`
- `chrome.runtime.onConnectExternal.addListener` → port.onMessage → axios `axios.get(url, ...)` (library semantics in `library/axios.ts`).
- **Sanitiser path**: `signer.js` calls `crypto.subtle.digest("SHA-256", data)` which removes taint from `data`; the subsequent `fetch(endpoint + "?digest=" + hashed, ...)` should produce *no* flow. This validates that `applySanitizer` actually clears the taint id and downstream sinks observe an untainted def.
- `axiosBridge.js`'s `vendor/axios.min.js` matches the axios library regex in `src/constants/library.ts`; `detectLibraryByFilename` flags it as a library file. Because axios is NOT in the ignore list, its semantics fire normally — but you can demonstrate library-ignore behaviour by renaming the vendor file to `moment.min.js`.

### `samples/dom_xss/`

**Files**: `manifest.json`, `content.js`, `background.js`.

Exercises:

- `<all_urls>` content script → CRITICAL severity for every web-attack-surface flow.
- Four distinct code-injection paths to exercise each `CODE_SINK`:
  - `location.hash` → `eval(code)` (`EVAL`)
  - `event.data.code` → `setTimeout(string, delay)` (`TIME_EVAL`)
  - element `.value` → `document.write(...)` (`DOCUMENT_WRITE`)
  - `event.detail.body` → `new Function(...)` (`NEW_FUNCTION`)
- Inline function passed to `chrome.scripting.executeScript({ func, args: [...] })`: the analyzer runs `interAnalyzer.analyze(callNode, funcDef, argDefs, null, astNode)`, binding the tainted `msg.greeting` to the function's `greeting` parameter so subsequent `document.body.innerHTML = greeting` records DOM-write propagation inside the injected function.

### `samples/multi_channel/`

**Files**: `manifest.json`, `background.js`, `content.js`, `uploader.js`, `helper.js`.

Exercises everything the other samples skip:

- `externally_connectable.ids = ["*"]` → CRITICAL severity for the external connect path.
- `chrome.runtime.connect()` from CS + `chrome.runtime.onConnect.addListener` on BG → port-based bridge (`runtime.connect.sender.message`).
- `chrome.runtime.onConnectExternal.addListener` → port from any extension → both code-execution and privileged sinks.
- `chrome.identity.getAuthToken` (SENSITIVE_DATA) → port.postMessage (external) → DATA_LEAK with cross-context MESSAGE edge.
- `chrome.pageCapture.saveAsMHTML` (SENSITIVE_DATA) → blob → `FormData.append` → `fetch(uploadUrl, { body: fd })` → DATA_LEAK via `library/`-free path.
- `chrome.runtime.getURL("helper.js")` — frame propagation: without this call, `scriptUsageTracker` would drop `helper.js` from reports because no manifest entry references it. The static analysis still discovers `helper.js`'s sinks (`eval(message.code)`, `chrome.tabs.create({ url })`).
- `chrome.scripting.executeScript({ files: ["..."] })` — exercises another frame propagation path inside `chrome/scripting.ts`.

## Manifest-driven severity matrix

| Sample | `content_scripts.matches` | `externally_connectable` | Expected highest severity |
|--------|---------------------------|--------------------------|----------------------------|
| `privilege_execution` | `<all_urls>` | (none) | **CRITICAL** |
| `code_injection` | host-specific path | (none) | LOW |
| `data_leak` | `https://*.shop.example/*` | `ids: ["aaaa..."]` | LOW |
| `storage_poisoning` | `*://*.theme-marketplace.example/*` | (none) | **HIGH** (subdomain wildcard) |
| `request_forgery` | (none) | `matches: ["https://*.partner-a.example/*"]` | **HIGH** |
| `dom_xss` | `<all_urls>` | (none) | **CRITICAL** |
| `multi_channel` | `*://*.devhub.example/*` | `ids: ["*"]` | **CRITICAL** |

Use these samples for regression testing whenever you touch:

- `src/taint/policy.ts` (`getFlowType`, `shouldFilterSourceByFrame`)
- `src/taint/constraintSeverity.ts` (`analyzeFlowConstraintSeverity`)
- `src/def-use/builtins/builtinSemantics/{chrome,browser,library}/*` semantics
- `src/extension/scriptUsageTracker.ts` frame propagation
- `src/taint/manager.ts` storage roundtrip / message bridge resolution

## Verified analyzer output (baseline)

The flow counts below are what `node dist/main.js analyze --type=DIR --input=./samples/<name>/ ...` produced at the time these samples were added. Use them as a regression baseline.

```
samples/data_leak             → 3 classified flows
  [DATA_LEAK]              CHROME_HISTORY_INFO              → CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE
  [PRIVILEGE_ESCALATION]   CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_HISTORY_ADD_URL
  [REQUEST_FORGERY]        WINDOW_MESSAGE_EVENT             → FETCH_RESOURCE      (cross-context MESSAGE)

samples/storage_poisoning     → 8 classified flows
  [STORAGE_POSOING]        WINDOW_CUSTOM_EVENT  → CHROME_SYNC_STORAGE   (×3 — preset/name/autoRedirect)
  [PRIVILEGE_ESCALATION]   TARGET_CUSTOM_EVENT  → CHROME_BOOKMARK_CREATE_INFO  (via runtime.sendMessage)
  [PRIVILEGE_ESCALATION]   WINDOW_CUSTOM_EVENT  → CHROME_HISTORY_ADD_URL       (via storage roundtrip)
  [PRIVILEGE_ESCALATION]   WINDOW_CUSTOM_EVENT  → CHROME_TABS_CREATE_OPTIONS   (×2 — direct + via applyRedirectRules)
  [PRIVILEGE_ESCALATION]   WINDOW_CUSTOM_EVENT  → CHROME_TABS_EXECUTE          (via applyRedirectRules)

samples/request_forgery       → 7 classified flows + 4 sanitiser hits
  [REQUEST_FORGERY]        CHROME_ONMESSAGEEXTERNAL_MESSAGE  → FETCH_RESOURCE
  [REQUEST_FORGERY]        CHROME_ONMESSAGEEXTERNAL_MESSAGE  → FETCH_OPTIONS
  [REQUEST_FORGERY]        CHROME_ONMESSAGEEXTERNAL_MESSAGE  → WEBSOCKET_URL
  [REQUEST_FORGERY]        CHROME_ONMESSAGEEXTERNAL_MESSAGE  → FETCH_RESOURCE   (RAW_XHR path: msg.body via JSON.stringify)
  [REQUEST_FORGERY]        CHROME_ONMESSAGEEXTERNAL_MESSAGE  → XML_HTTP_REQUEST_OPEN
  [REQUEST_FORGERY]        CHROME_ONMESSAGEEXTERNAL_MESSAGE  → XML_HTTP_REQUEST_SEND
  [REQUEST_FORGERY]        CHROME_ONCONNECTEXTERNAL_ONMESSAGE → AXIOS_URL
  Sanitiser:               crypto.subtle.digest("SHA-256", data) clears taint id 121 four times.
                           → No FETCH flow recorded for the SIGNED_LOG path (correct).

samples/dom_xss               → 1 classified flow + 3 per-file source/sink issues
  [CODE_INJECTION]         WINDOW_MESSAGE_EVENT → TIME_EVAL  (setTimeout(string, n) path)
  Per-file report.txt also surfaces:
   - DOCUMENT_LOCATION → EVAL                       (hash → decodeURIComponent → eval)
   - ELEMENT_VALUE source (input.value → document.write — sink not classified in policy.ts today)
   - WINDOW_CUSTOM_EVENT source (event.detail.body → new Function — propagation stops short of sink)

samples/multi_channel         → 3 classified flows + helper.js discovered via runtime.getURL
  [DATA_LEAK]              CHROME_IDENTITY_TOKEN              → CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE
  [PRIVILEGE_ESCALATION]   CHROME_ONCONNECTEXTERNAL_ONMESSAGE → CHROME_TABS_EXECUTE
  [REQUEST_FORGERY]        WINDOW_MESSAGE_EVENT               → FETCH_RESOURCE   (port bridge to uploader.js)
  Frame propagation: helper.js gets BG_1 frame because background calls chrome.runtime.getURL("helper.js").
```

The dom_xss sample intentionally exercises sinks the current policy does NOT classify as flows. They still surface as per-file issues in `report.txt`, which is useful for testing the propagation engine even when classification is conservative. Adding a `WEB_CONTENT → DOM_WRITE` arrow to `getFlowType` would turn the ELEMENT_VALUE → DOCUMENT_WRITE pattern into a classified DOM_XSS flow.
