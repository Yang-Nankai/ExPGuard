# Source-level Taint Flow — cpjicfogbgognnifjgmenmaldnmeeeib 3.0.21

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 3  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(requestPluginVersion))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L38:C0 -> L96:C2 (spans to L96)  `»chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (gaea_plugin_token) — `background` L45:C10 -> L45:C68  `await »chrome.storage.local.set({ gaea_plugin_token: tokenInfo })«;`
  - `CHROME_LOCAL_STORAGE` (gaea_plugin_status) — `background` L49:C10 -> L49:C89  `await »chrome.storage.local.set({ gaea_plugin_status: request["gaea_plugin_status"] })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L38 (→L96) `»chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content_scripts->background]`
   2. L45 `»await chrome.storage.local.set({ gaea_plugin_token: tokenInfo })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L49 `»await chrome.storage.local.set({ gaea_plugin_status: request["gaea_plugin_status"] })«;`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (From storage.local.set('gaea_plugin_token') in background)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L38:C0 -> L96:C2 (spans to L96)  `»chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (gaea_plugin_token) — `background` L107:C10 -> L107:C57  `await »chrome.storage.local.set({ gaea_plugin_token })«;`
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L23:C9 -> L23:C28  `return »fetch(url, options)«; // Make the API call`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (25 raw steps → 10 distinct lines):
   1. L38 (→L96) `»chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content_scripts->background]`
   2. L45 `»await chrome.storage.local.set({ gaea_plugin_token: tokenInfo })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L49 `»await chrome.storage.local.set({ gaea_plugin_status: request["gaea_plugin_status"] })«;`  · ELEMENT:object.setProperty
   4. L100 `const { gaea_plugin_token } = await »chrome.storage.local.get(["gaea_plugin_token"])«;`  · STORAGE:STORAGE_FLOW[area: local, key: gaea_plugin_token, sender: background, receiver: background]
   5. L105 `if (»gaea_plugin_token«) {`  · ASSIGN:identifier
   6. L106 `tokenInfo = »gaea_plugin_token«;`  · ASSIGN:identifier
   7. L107 `»await chrome.storage.local.set({ gaea_plugin_token })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L12 `if (»!tokenInfo«) return { success: false };`  · ASSIGN:identifier, ASSIGN:unary
   9. L18 `'Authorization': »`Bearer ${tokenInfo}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L14 (→L21) `»  const options = {«`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_CUSTOM_EVENT (From storage.local.set('gaea_plugin_status') in background)  ·  4× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L38:C0 -> L96:C2 (spans to L96)  `»chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (gaea_plugin_status) — `background` L103:C10 -> L103:C58  `await »chrome.storage.local.set({ gaea_plugin_status })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 6 distinct lines):
   1. L38 (→L96) `»chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content_scripts->background]`
   2. L45 `»await chrome.storage.local.set({ gaea_plugin_token: tokenInfo })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L49 `»await chrome.storage.local.set({ gaea_plugin_status: request["gaea_plugin_status"] })«;`  · ELEMENT:object.setProperty
   4. L101 `const { gaea_plugin_status } = await »chrome.storage.local.get(["gaea_plugin_status"])«;`  · STORAGE:STORAGE_FLOW[area: local, key: gaea_plugin_status, sender: background, receiver: background]
   5. L102 `if (»gaea_plugin_status«) {`  · ASSIGN:identifier
   6. L103 `»await chrome.storage.local.set({ gaea_plugin_status })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
