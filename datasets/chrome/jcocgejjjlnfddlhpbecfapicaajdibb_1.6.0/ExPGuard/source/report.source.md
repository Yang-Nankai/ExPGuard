# Source-level Taint Flow — jcocgejjjlnfddlhpbecfapicaajdibb 1.6.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `monitor` L116:C9 -> L116:C17  `if (!»location« && payload.activityType === "image") location = designLocationFor(payload);`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `monitor` L120:C4 -> L120:C92  `»window.postMessage({ type: "CANVA_ACTIVITY", payload: payload }, window.location.origin)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (45 raw steps → 5 distinct lines):
   1. L116 `if (»!location && payload.activityType === "image"«) location = designLocationFor(payload);`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   2. L117 `if (»location) payload.location = location«;`  · ASSIGN:identifier
   3. L139 `»post({ activityType: "image", message: "", mediaUrl: url })«;`  · ELEMENT:object.setProperty
   4. L120 `»window.postMessage({ type: "CANVA_ACTIVITY", payload: payload }, window.location.origin)«;`  · ELEMENT:object.setProperty
   5. L129 `»post({ activityType: "message", message: text })«;`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `monitor` L327:C0 -> L354:C2 (spans to L354)  `»chrome.runtime.onMessage.addListener(function(message) {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://urls.bark.us) — `monitor` L11:C9 -> L17:C4 (spans to L17)  `return »fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (100 raw steps → 17 distinct lines):
   1. L327 (→L354) `»chrome.runtime.onMessage.addListener(function(message) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->monitor]`
   2. L328 `if (»message.type« === "GEMINI_PROMPT") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L329 (→L334) `sendData(API_URL, »message.payload.email, message.payload.runtimeId, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   4. L330 `message: »message.payload.messageText«,`  · ASSIGN:identifier, ELEMENT:member-element
   5. L5 `const json = »JSON.stringify(payload)«;`  · RETURN:json.stringify
   6. L7 `headers.append('X-Bark-Email', »email«);`  · ASSIGN:identifier
   7. L8 `headers.append('X-Bark-Extension', »runtimeId«);`  · ASSIGN:identifier
   8. L15 `body: »json«,`  · ASSIGN:identifier
   9. L11 (→L22) `»  return fetch(url, {«`  · ELEMENT:object.setProperty
  10. L338 `if (»message.type« === "CANVA_ACTIVITY") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L339 `const p = »message.payload«;`  · ASSIGN:identifier, ELEMENT:member-element
  12. L342 `type: »p.activityType«,`  · ASSIGN:identifier, ELEMENT:member-element
  13. L340 (→L344) `»    const payload = {«`  · ELEMENT:object.setProperty
  14. L343 `message: »p.message«`  · ASSIGN:identifier, ELEMENT:member-element
  15. L348 `if (»p.activityType === "image") payload.media_url = p.mediaUrl«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L349 `if (»p.location) payload.location = p.location«;`  · ASSIGN:identifier, ELEMENT:member-element
  17. L351 `sendData(API_URL, »p.email, p.runtimeId«, payload)`  · ASSIGN:identifier, ELEMENT:member-element

---
