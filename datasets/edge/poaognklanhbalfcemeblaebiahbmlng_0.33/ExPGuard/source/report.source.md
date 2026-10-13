# Source-level Taint Flow — poaognklanhbalfcemeblaebiahbmlng 0.33

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 3  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 27 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_COOKIE (From storage.local.set('cookie') in dist/static/js/background)  ·  2× duplicate paths collapsed

- **Source**: `DOCUMENT_COOKIE` — `dist/static/js/content` L18:C0 -> L44:C2 (spans to L44)  `»/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");«`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://zhinang.ai/api/session) — `dist/static/js/content` L4701:C24 -> L4703:C8 (spans to L4703)  `const res = await »fetch('https://zhinang.ai/api/session', {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 5 distinct lines):
   1. L18 (→L44) `»/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[dist/static/js/cookie->dist/static/js/background]`
   2. L20 (→L22) `»/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");«`  · ELEMENT:object.setProperty
   3. L4691 `const s = await »chrome.storage.local.get(['cookie'])«;`  · STORAGE:STORAGE_FLOW[area: local, key: cookie, sender: dist/static/js/background, receiver: dist/static/js/content]
   4. L4695 (→L4699) `»    const headers = {«`  · ELEMENT:object.setProperty
   5. L4701 (→L4703) `»      const res = await fetch('https://zhinang.ai/api/session', {«`  · ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `dist/static/js/background` L18:C0 -> L44:C2 (spans to L44)  `»chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (cookie) — `dist/static/js/background` L20:C4 -> L22:C6 (spans to L22)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L18 (→L44) `»chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[dist/static/js/cookie->dist/static/js/background]`
   2. L20 (→L22) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #3 — DOCUMENT_COOKIE (From storage.local.set('cookie') in dist/static/js/background)  ·  2× duplicate paths collapsed

- **Source**: `DOCUMENT_COOKIE` — `dist/static/js/popup` L18:C0 -> L44:C2 (spans to L44)  `»/* harmony import */ var _stores_user_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../stores/user.store */ "./src/stores/user.store.ts");«`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://zhinang.ai/api/session) — `dist/static/js/popup` L479:C24 -> L481:C8 (spans to L481)  `const res = await »fetch('https://zhinang.ai/api/session', {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (5 raw steps → 5 distinct lines):
   1. L18 (→L44) `»/* harmony import */ var _stores_user_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../stores/user.store */ "./src/stores/user.store.ts");«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[dist/static/js/cookie->dist/static/js/background]`
   2. L20 (→L22) `»/* harmony import */ var _utils_getLang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/getLang */ "./src/utils/getLang.ts");«`  · ELEMENT:object.setProperty
   3. L469 `const s = await »chrome.storage.local.get(['cookie'])«;`  · STORAGE:STORAGE_FLOW[area: local, key: cookie, sender: dist/static/js/background, receiver: dist/static/js/popup]
   4. L473 (→L477) `»    const headers = {«`  · ELEMENT:object.setProperty
   5. L479 (→L481) `»      const res = await fetch('https://zhinang.ai/api/session', {«`  · ELEMENT:object.setProperty

---
