# Source / Sink / Sanitizer Catalog

Authoritative lists live in `src/taint/types.ts` (string union types) and `src/constants/taint.ts` (classification arrays). The semantics that *create* each source/sink live in `src/def-use/builtins/builtinSemantics/`. The tables below pair them up — use this to know exactly which API call to write in a sample to exercise a particular detector.

Conventions:

- `chrome.x.y(...)` reflects the actual built-in semantic. The source/sink fires when the API is called (typically via the callback's argument or the API's argument index).
- `cb arg N` means "Nth parameter of the callback function passed to the API".
- Pseudo sources / sinks (`PSEUDO_*`) never appear in final reports — they only exist to wire cross-context bridges.

## Sources

### ATTACKER_INPUT (`ATTACKER_SOURCES`)

Externally controllable data: cross-extension messages, web-page postMessage, custom events.

| SourceType | Trigger | Semantic file |
|------------|---------|---------------|
| `CHROME_SENDMESSAGE_EXTERNAL_RESPONSE` | callback response of `chrome.runtime.sendMessage(extId, msg, cb)` to another extension | `chrome/runtime.ts` |
| `CHROME_SENDNATIVEMESSAGE_EXTERNAL_RESPONSE` | `chrome.runtime.sendNativeMessage` callback | `chrome/runtime.ts` |
| `CHROME_CONNECT_ONMESSAGE_EXTERANL` | port from `chrome.runtime.connect(extId).onMessage.addListener((msg)=>...)` | `chrome/runtime.ts` |
| `CHROME_ONMESSAGEEXTERNAL_MESSAGE` | message argument of `chrome.runtime.onMessageExternal.addListener((msg, sender, sendResponse)=>...)` | `chrome/runtime.ts` |
| `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` | message argument from a port supplied to `chrome.runtime.onConnectExternal.addListener` | `chrome/runtime.ts` |
| `CHROME_CONNECTNATIVE_ONMESSAGE` | `chrome.runtime.connectNative(...).onMessage.addListener` | `chrome/runtime.ts` |
| `WINDOW_MESSAGE_EVENT` | `event.data` from `window.addEventListener("message", e => ...)` | `browser/event.ts` |
| `WINDOW_CUSTOM_EVENT` | non-standard event name on `window.addEventListener(name, e => ...)` | `browser/event.ts` |
| `TARGET_CUSTOM_EVENT` | non-standard event name on `element.addEventListener(name, e => ...)` | `browser/event.ts` |

### SENSITIVE_DATA (`SENSITIVE_SOURCES`)

User data behind permissions: bookmarks, history, cookies, identity tokens, tab info, etc. Reports a `DATA_LEAK` only when reaching a MESSAGE sink.

`CHROME_TABS_DETECT_LANUAGE`, `CHROME_TABS_CAPUTURE_VISIBLE_TAB`, `CHROME_BOOKMARK_INFO`, `CHROME_COOKIES_INFO`, `CHROME_COOKIES_STORE`, `CHROME_HISTORY_INFO`, `CHROME_READINGLIST_INFO`, `CHROME_MANAGEMENT_INFO`, `CHROME_DOWNLOADS_SEARCH`, `CHROME_DOWNLOADS_FILEICON`, `CHROME_TOPSITES_INFO`, `CHROME_PAGECAPTURE_MHTML`, `CHROME_IDENTITY_TOKEN`, `CHROME_IDENTITY_PROFILE`, `CHROME_BOOKMARKS_ONCREATED`, `CHROME_COOKIES_ONCHANGED`, `CHROME_DOWNLOADS_ONCHANGED`, `CHROME_DOWNLOADS_ONCREATED`, `CHROME_HISTORY_ONVISITED`, `CHROME_MANAGEMENT_ONENABLED`, `CHROME_MANAGEMENT_ONDISABLED`, `CHROME_MANAGEMENT_ONINSTALLED`.

### SYSTEM_INFO (`SYSTEM_SOURCES`)

Browser fingerprint / system specs. Reports `DATA_LEAK` only for non-navigator entries (navigator.* and SCREEN_INFO are excluded via `shouldReportDataLeakSource`).

`NAVIGAROR_GEOLOCATION` (typo preserved for compatibility), `NAVIGATOR_CLIPBOARD`, `NAVIGATOR_CONNECTION`, `NAVIGATOR_DEVICE_MEMORY`, `NAVIGATOR_HARDWARE_CONCURRENCY`, `NAVIGATOR_LANGUAGE`, `NAVIGATOR_MAX_TOUCH_POINTS`, `NAVIGATOR_PLATFORM`, `NAVIGATOR_PLUGINS`, `NAVIGATOR_USER_AGENT`, `NAVIGATOR_GPU_ADAPTER`, `SCREEN_INFO`, `CHROME_FONTSETTINGS_FONTLIST`, `CHROME_SYSTEM_CPU`, `CHROME_SYSTEM_DISPLAY_LAYOUT`, `CHROME_SYSTEM_DISPLAY`, `CHROME_SYSTEM_MEMORY`, `CHROME_SYSTEM_STORAGE`.

### NETWORK_RESPONSE (`NETWORK_SOURCES`)

Untrusted bytes coming back from the network — flowing into code/storage/privileged sinks is dangerous.

`JQUERY_AJAX_RESPONSE`, `FETCH_RESPONSE`, `XML_HTTP_RESPONSE`, `AXIOS_RESPONSE`, `AXIOS_GET_RESPONSE`, `AXIOS_POST_RESPONSE`, `AXIOS_REQUEST_RESPONSE`.

### WEB_CONTENT (`DOCUMENT_SOURCES`)

DOM-derived values:

`ELEMENT_TEXT_CONTENT`, `ELEMENT_INNER_HTML`, `ELEMENT_OUTER_HTML`, `ELEMENT_VALUE`, `JQUERY_ELEMENT_VAL`, `JQUERY_ELEMENT_TEXT`, `JQUERY_ELEMENT_HTML`, `DOCUMENT_COOKIE`, `DOCUMENT_URL`, `DOCUMENT_TITLE`.

Sources fire when `document.getElementById` / `querySelector` are called: each returned element ships a tainted `textContent`, `innerHTML`, `outerHTML`, `value` property. jQuery selectors do the same via `JQuery.fn.val/text/html`.

### STORAGE_DATA (`STORAGE_SOURCES`)

`STORAGE_ALL_ITEMS` — `chrome.storage.<area>.get()` / `get(null)` (entire-storage read).

Per-key reads start as `PSEUDO_STORAGE` and become a real source after `resolveStorageTaints` matches them with a Set.

## Sinks

### CODE_EXECUTION (`CODE_SINKS`)

`NEW_FUNCTION` (`new Function(...)`), `EVAL` (`eval(...)`), `TIME_EVAL` (`setTimeout("string", ...)` / `setInterval("string", ...)`), `JQUERY_GLOBAL_EVAL` (`$.globalEval(...)`).

### NETWORK_SEND (`NETWORK_SINKS`)

`FETCH_RESOURCE`, `FETCH_OPTIONS` (URL / init), `JQUERY_AJAX_URL`, `JQUERY_AJAX_DATA`, `JQUERY_AJAX_SETTINGS_*`, `JQUERY_GET_*`, `JQUERY_POST_*`, `JQUERY_SETTINGS_*`, `XML_HTTP_REQUEST_OPEN`, `XML_HTTP_REQUEST_SEND`, `AXIOS_URL`, `AXIOS_DATA`, `AXIOS_HEADERS`, `WEBSOCKET_URL`, `WEBSOCKET_DATA`.

### MESSAGE_RESPONSE (`MESSAGE_SINKS`)

Cross-extension or postMessage egress: `CHROME_RUNTIME_SENDMESSAGE_EXTERNAL`, `CHROME_RUNTIME_CONNECT_POSTMESSAGE_EXTERNAL`, `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE`, `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE`, `CHROME_RUNTIME_SENDNATIVEMESSAGE_EXTERNAL`, `CHROME_RUNTIME_ONCONNECTNATIVE_POSTMESSAGE`, `WINDOW_POSTMESSAGE`.

### DOM_WRITE (`DOM_SINKS`)

`JQUERY_ELEMENT_VAL_SET`, `JQUERY_ELEMENT_TEXT_SET`, `JQUERY_ELEMENT_HTML_SET`, `DOCUMENT_WRITE`, `DOCUMENT_EXECCOMMAND`.

### STORAGE_WRITE (`STORAGE_SINKS`)

`CHROME_LOCAL_STORAGE`, `CHROME_SYNC_STORAGE`, `CHROME_SESSION_STORAGE`. Web storage variants are tracked separately in `WEB_STORAGE_SINKS` (used in policy filtering, not in flow classification today).

### PRIVILEGED_OPERATION (`PRIVILEGED_SINKS`)

Every Chrome API that mutates browser state, e.g. `CHROME_BOOKMARK_CREATE_INFO`, `CHROME_HISTORY_ADD_URL`, `CHROME_COOKIES_SET_OPTIONS`, `CHROME_TABS_CREATE_OPTIONS`, `CHROME_TABS_EXECUTE`, `CHROME_NOTIFICATIONS_CREATE_OPTIONS`, `CHROME_PROXY_SETTINGS_SET`, `CHROME_MANAGEMENT_UNINSTALL_ID`, ... see `PRIVILEGED_SINKS` for the full list.

## Propagation kinds

`PropagateType` is just the label shown in `report.txt`:

`ASSIGN`, `ARGUMENT`, `RETURN`, `ELEMENT` (object/array element), `GLOBAL`, `INITIAL` (constructor binding), `MUTATE`, `COPY`, `STORAGE` (cross-context storage hop), `ITERATE` (for-of / for-in), `MERGE`, `MESSAGE` (cross-context channel hop), `EVENT`, `OTHER`.

## Sanitizers

| Sanitizer name | Trigger | Effect |
|----------------|---------|--------|
| `WebCrypto.hash` | `crypto.subtle.digest(algo, data)` | Removes taint from `data` |
| `WebCrypto.sign` | `crypto.subtle.sign(algo, key, data)` | Removes taint from `data` |
| `CryptoJS.HASH` | `CryptoJS.MD5/SHA1/SHA256/...` | Removes taint from input |

To add a sanitizer, call `taintManager.applySanitizer(def, "<name>", astNode)` inside a built-in semantic.

## Flow type matrix (quick reference)

| Sample folder | Source | Sink | FlowType |
|---------------|--------|------|----------|
| `privilege_execution/` | `WINDOW_MESSAGE_EVENT` | `CHROME_TABS_CREATE_OPTIONS` | `PRIVILEGE_ESCALATION` |
| `storage_poisoning/` | `WINDOW_MESSAGE_EVENT` | `CHROME_LOCAL_STORAGE` | `STORAGE_POSOING` |
| `dom_xss/` | `DOCUMENT_URL` | `DOM_INNER_HTML` | `DOM_XSS` |
| `request_forgery/` | `CHROME_ONMESSAGEEXTERNAL_MESSAGE` | `FETCH_RESOURCE`, `FETCH_BODY` | `REQUEST_FORGERY` |
