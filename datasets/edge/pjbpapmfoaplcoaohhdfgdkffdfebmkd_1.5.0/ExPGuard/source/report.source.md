# Source-level Taint Flow — pjbpapmfoaplcoaohhdfgdkffdfebmkd 1.5.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `monitor` L103:C8 -> L103:C16  `if (»location«) payload.location = location;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `monitor` L106:C4 -> L106:C92  `»window.postMessage({ type: "CANVA_ACTIVITY", payload: payload }, window.location.origin)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 4 distinct lines):
   1. L103 `if (»location) payload.location = location«;`  · ASSIGN:identifier
   2. L122 `»post({ activityType: "image", message: "", mediaUrl: url })«;`  · ELEMENT:object.setProperty
   3. L106 `»window.postMessage({ type: "CANVA_ACTIVITY", payload: payload }, window.location.origin)«;`  · ELEMENT:object.setProperty
   4. L115 `»post({ activityType: "message", message: text })«;`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `monitor` L205:C0 -> L232:C2 (spans to L232)  `»chrome.runtime.onMessage.addListener(function(message) {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://urls.bark.us) — `monitor` L11:C9 -> L17:C4 (spans to L17)  `return »fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (100 raw steps → 17 distinct lines):
   1. L205 (→L232) `»chrome.runtime.onMessage.addListener(function(message) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->monitor]`
   2. L206 `if (»message.type« === "GEMINI_PROMPT") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L207 (→L212) `sendData(API_URL, »message.payload.email, message.payload.runtimeId, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   4. L208 `message: »message.payload.messageText«,`  · ASSIGN:identifier, ELEMENT:member-element
   5. L5 `const json = »JSON.stringify(payload)«;`  · RETURN:json.stringify
   6. L7 `headers.append('X-Bark-Email', »email«);`  · ASSIGN:identifier
   7. L8 `headers.append('X-Bark-Extension', »runtimeId«);`  · ASSIGN:identifier
   8. L15 `body: »json«,`  · ASSIGN:identifier
   9. L11 (→L22) `»  return fetch(url, {«`  · ELEMENT:object.setProperty
  10. L216 `if (»message.type« === "CANVA_ACTIVITY") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L217 `const p = »message.payload«;`  · ASSIGN:identifier, ELEMENT:member-element
  12. L220 `type: »p.activityType«,`  · ASSIGN:identifier, ELEMENT:member-element
  13. L218 (→L222) `»    const payload = {«`  · ELEMENT:object.setProperty
  14. L221 `message: »p.message«`  · ASSIGN:identifier, ELEMENT:member-element
  15. L226 `if (»p.activityType === "image") payload.media_url = p.mediaUrl«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L227 `if (»p.location) payload.location = p.location«;`  · ASSIGN:identifier, ELEMENT:member-element
  17. L229 `sendData(API_URL, »p.email, p.runtimeId«, payload)`  · ASSIGN:identifier, ELEMENT:member-element

---
