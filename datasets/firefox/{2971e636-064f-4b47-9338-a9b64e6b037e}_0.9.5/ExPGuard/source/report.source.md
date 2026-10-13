# Source-level Taint Flow — {2971e636-064f-4b47-9338-a9b64e6b037e} 0.9.5

- Source type: XPI
- Files with issues: 5 / 5
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 17 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L20:C38 -> L20:C56  `if (event.source !== window || !»event.data?.source«?.startsWith("vsc-")) {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) — `content` L26:C10 -> L26:C39  `»chrome.storage.sync.set(data)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (76 raw steps → 9 distinct lines):
   1. L20 `if (»event.source !== window || !event.data?.source?.startsWith("vsc-")«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
   2. L23 `const { »source, action, data« } = event.data;`  · ELEMENT:destructure-property[source], ELEMENT:destructure-property[action], ELEMENT:destructure-property[data]
   3. L24 `if (»source« === "vsc-page") {`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L25 `if (»action« === "storage-update") {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L26 `chrome.storage.sync.set(»data«);`  · ASSIGN:identifier
   6. L27 `} else if (»action« === "runtime-message") {`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L28 `if (»data.type« !== "VSC_STATE_UPDATE") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L31 `} else if (»action« === "get-storage") {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L29 `chrome.runtime.sendMessage(»data«);`  · ASSIGN:identifier

---

## Flow #2 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `content` L33:C12 -> L37:C19 (spans to L37)  `»window.postMessage({«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L33:C12 -> L37:C19 (spans to L37)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L33 (→L37) `»            window.postMessage({«`  · ELEMENT:object.setProperty

---
