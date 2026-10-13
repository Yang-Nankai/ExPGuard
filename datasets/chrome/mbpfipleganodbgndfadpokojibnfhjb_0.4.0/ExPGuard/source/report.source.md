# Source-level Taint Flow — mbpfipleganodbgndfadpokojibnfhjb 0.4.0

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `serviceWorker` L1366:C11 -> L1366:C18  `router(»message«.request, sender, sendResponse);`
- **Sink(s)**:
  - `WEBSOCKET_URL` — `serviceWorker` L1135:C21 -> L1135:C39  `const socket = »new WebSocket(uri)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (46 raw steps → 11 distinct lines):
   1. L1366 `router(»message.request«, sender, sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element
   2. L1322 `switch (»request.uri«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L1324 `import_webextension_polyfill.default.cookies[»request.method](request.args[0]«).catch((err) => error = err).then((data) => {`  · ASSIGN:identifier, ELEMENT:member-element
   4. L1339 `doWebSocket(»request.args[0], request.args[1]«).then(sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L1135 `const socket = new WebSocket(»uri«);`  · ASSIGN:identifier
   6. L1147 `body: »JSON.stringify(transformSocketRequest(uri, initial_data))«`  · ASSIGN:identifier, RETURN:json.stringify
   7. L1121 `if (!(»data« instanceof Object)) {`  · ASSIGN:identifier
   8. L1122 `return »data«;`  · ASSIGN:identifier
   9. L1124 `if (»uri.match(/\/verify/) && Object.hasOwn(data, "authorization")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  10. L1130 `return »data«;`  · ASSIGN:identifier
  11. L1145 (→L1148) `»        const request = new Request("open", {«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty

---
