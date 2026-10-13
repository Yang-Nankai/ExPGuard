# Source-level Taint Flow — hoaepbdbkbncfnmplpeecofbnophahah 1.2.5

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 2  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L73:C0 -> L83:C2 (spans to L83)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (email) — `js/background` L75:C8 -> L77:C25 (spans to L77)  `»chrome.storage.local.set({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L37:C12 -> L43:C14 (spans to L43)  `»fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (54 raw steps → 13 distinct lines):
   1. L73 (→L83) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/zendrop-aliexpress-importer->js/background]`
   2. L74 `if (»message.type« === 'LOGIN_TO_EXTENSION') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L76 `'email': »message.email«`  · ASSIGN:identifier, ELEMENT:member-element
   4. L75 (→L77) `»        chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   5. L78 `} else if (»message.type« === 'LOGOUT_TO_EXTENSION') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L80 `} else if (»message.type« === 'PRODUCT_DETAIL') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L81 `fetchData().then(r => sendToServer(»message«));`  · ASSIGN:identifier
   8. L20 `if (»content.data?.productInfoComponent === null || content.data?.productInfoComponent === undefined«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   9. L33 `productData: »content.data«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L31 (→L35) `»            const requestData = {«`  · ELEMENT:object.setProperty
  11. L34 `url: »content.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L42 `body: »JSON.stringify(requestData)«,`  · RETURN:json.stringify
  13. L37 (→L56) `»            fetch(url, {«`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('email') in js/background)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L73:C0 -> L83:C2 (spans to L83)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L37:C12 -> L43:C14 (spans to L43)  `»fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (61 raw steps → 15 distinct lines):
   1. L73 (→L83) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/zendrop-aliexpress-importer->js/background]`
   2. L74 `if (»message.type« === 'LOGIN_TO_EXTENSION') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L76 `'email': »message.email«`  · ASSIGN:identifier, ELEMENT:member-element
   4. L75 (→L77) `»        chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   5. L78 `} else if (»message.type« === 'LOGOUT_TO_EXTENSION') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L80 `} else if (»message.type« === 'PRODUCT_DETAIL') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L81 `fetchData().then(r => sendToServer(»message«));`  · ASSIGN:identifier
   8. L20 `if (»content.data?.productInfoComponent === null || content.data?.productInfoComponent === undefined«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   9. L33 `productData: »content.data«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L31 (→L35) `»            const requestData = {«`  · ELEMENT:object.setProperty
  11. L34 `url: »content.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L42 `body: »JSON.stringify(requestData)«,`  · RETURN:json.stringify
  13. L37 (→L56) `»            fetch(url, {«`  · ELEMENT:object.setProperty
  14. L27 (→L57) `»        chrome.storage.local.get(['email'], function(result) {«`  · STORAGE:STORAGE_FLOW[area: local, key: email, sender: js/background, receiver: js/background]
  15. L32 `email: »email«,`  · ASSIGN:identifier

---
