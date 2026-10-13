# Source-level Taint Flow — lhmminnoafalclkgcbokfcngkocoffcp 6.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 5  (collapsed from 146 raw issue entries)
- Sinkless sources skipped: 12 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L2:C34 -> L2:C49  `if (event.source !== window || !»event.data.type«) return;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L72:C4 -> L75:C5 (spans to L75)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (41 raw steps → 18 distinct lines):
   1. L2 `if (»event.source !== window || !event.data.type«) return;`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right
   2. L6 `if (»event.data.type« === "REQUEST_FULL_TOKEN") {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L8 `{ type: »event.data.type, payload: event.data.payload« },`  · ELEMENT:member-element
   4. L7 (→L17) `»    chrome.runtime.sendMessage(«`  · ELEMENT:object.setProperty
   5. L34 `if (»event.data.type« === "SET_FULL_TOKEN_TO_EXTENSION") {`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L36 `type: »event.data.type«,`  · ELEMENT:member-element
   7. L35 (→L38) `»    chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   8. L37 `payload: »event.data.payload«,`  · ELEMENT:member-element
   9. L48 `if (»event.data.type« === "REQUEST_LOGOUT_TO_EXTENSION") {`  · ELEMENT:member-element, ASSIGN:binary-left
  10. L50 `type: »event.data.type«,`  · ELEMENT:member-element
  11. L49 (→L52) `»    chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  12. L51 `payload: »event.data.payload«,`  · ELEMENT:member-element
  13. L55 `if (»event.data.type« === "SET_TOTAL_EARNING_TO_EXTENSION") {`  · ELEMENT:member-element, ASSIGN:binary-left
  14. L57 `type: »event.data.type«,`  · ELEMENT:member-element
  15. L56 (→L59) `»    chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  16. L58 `payload: »event.data.payload«,`  · ELEMENT:member-element
  17. L63 (→L88) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->content]`
  18. L72 (→L75) `»    window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('access_token') in background)  ·  48× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L7:C4 -> L17:C5 (spans to L17)  `»chrome.runtime.sendMessage(«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L11:C10 -> L14:C11 (spans to L14)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (145 raw steps → 2 distinct lines):
   1. L7 (→L17) `»    chrome.runtime.sendMessage(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background->content]`
   2. L11 (→L14) `»          window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.local.set('refresh_token') in background)  ·  48× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L7:C4 -> L17:C5 (spans to L17)  `»chrome.runtime.sendMessage(«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L11:C10 -> L14:C11 (spans to L14)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (133 raw steps → 2 distinct lines):
   1. L7 (→L17) `»    chrome.runtime.sendMessage(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background->content]`
   2. L11 (→L14) `»          window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #4 — WINDOW_MESSAGE_EVENT (From storage.local.set('public_key') in background)  ·  48× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L7:C4 -> L17:C5 (spans to L17)  `»chrome.runtime.sendMessage(«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L11:C10 -> L14:C11 (spans to L14)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (121 raw steps → 2 distinct lines):
   1. L7 (→L17) `»    chrome.runtime.sendMessage(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background->content]`
   2. L11 (→L14) `»          window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #5 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L5:C0 -> L139:C2 (spans to L139)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (access_token) — `background` L50:C4 -> L62:C5 (spans to L62)  `»chrome.storage.local.set(«`
  - `CHROME_LOCAL_STORAGE` (refresh_token) — `background` L50:C4 -> L62:C5 (spans to L62)  `»chrome.storage.local.set(«`
  - `CHROME_LOCAL_STORAGE` (public_key) — `background` L50:C4 -> L62:C5 (spans to L62)  `»chrome.storage.local.set(«`
  - `CHROME_LOCAL_STORAGE` (earning) — `background` L124:C4 -> L134:C5 (spans to L134)  `»chrome.storage.local.set(«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (209 raw steps → 13 distinct lines):
   1. L5 (→L139) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L8 `if (»message.type« === "REQUEST_FULL_TOKEN") {`  · ASSIGN:binary-left
   3. L42 `if (»message.type« === "REQUEST_LOGOUT_TO_EXTENSION") {`  · ASSIGN:binary-left
   4. L49 `if (»message.type« === "SET_FULL_TOKEN_TO_EXTENSION") {`  · ASSIGN:binary-left
   5. L52 `access_token: »message?.payload?.accessToken«,`  · ELEMENT:member-element
   6. L50 (→L62) `»    chrome.storage.local.set(«`  · ELEMENT:object.setProperty
   7. L53 `refresh_token: »message?.payload?.refreshToken«,`  · ELEMENT:member-element
   8. L54 `public_key: »message?.payload?.publicKey«,`  · ELEMENT:member-element
   9. L82 `if (»message.type« === "REQUEST_LOGOUT_FROM_EXTENSION") {`  · ASSIGN:binary-left
  10. L95 `if (»message.type« === "SET_FULL_TOKEN_FROM_EXTENSION") {`  · ASSIGN:binary-left
  11. L123 `if (»message.type« === "SET_TOTAL_EARNING_TO_EXTENSION") {`  · ASSIGN:binary-left
  12. L124 (→L134) `»    chrome.storage.local.set(«`  · ELEMENT:object.setProperty
  13. L99 (→L102) `»          chrome.tabs.sendMessage(tab.id, {«`  · ELEMENT:object.setProperty

---
