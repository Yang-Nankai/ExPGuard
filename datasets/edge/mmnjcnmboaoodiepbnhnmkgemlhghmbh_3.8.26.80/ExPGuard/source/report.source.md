# Source-level Taint Flow — mmnjcnmboaoodiepbnhnmkgemlhghmbh 3.8.26.80

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/ContentScript` L2:C8 -> L2:C23  `if (»event.data.type« && (event.data.type === "FROM_PAGE")) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `js/ContentScript` L29:C55 -> L29:C133  `if (event.data.details.action === 'setCursor') »chrome.storage.local.set({[event.data.details.key]: event.data.details.value})«;`
  - `WINDOW_POSTMESSAGE` (*) — `js/ContentScript` L43:C8 -> L43:C94  `»window.postMessage({_cursors:'1', key: request.content, handler: request.handler},'*')«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (98 raw steps → 16 distinct lines):
   1. L2 `if (»event.data.type && (event.data.type === "FROM_PAGE")«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L6 `} else if (»event.data.getCustCurs«) {`  · ELEMENT:member-element
   3. L7 `if (»event.data.type« === 'getCursorData') {`  · ELEMENT:member-element, ASSIGN:binary-left
   4. L14 `} else if (»event.data.type && (event.data.type === "FROM_ADD_CURSOR")«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   5. L18 `} else if (»event.data.type && (event.data.type === "FROM_PAGE_CURSOR")«){`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   6. L26 `} else if (»event?.data?.cursorData«){`  · ELEMENT:member-element
   7. L27 `if (»event.data.details.action« === 'closeTab') chrome.runtime.sendMessage({type: "CLOSE_TAB"}, function (response) { });`  · ELEMENT:member-element, ASSIGN:binary-left
   8. L28 `if (»event.data.details.action === 'openTab') chrome.runtime.sendMessage({type: "OPEN_TAB",properties: event.data.details.props}, function (response) { })«;`  · ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
   9. L29 `if (»event.data.details.action === 'setCursor') chrome.storage.local.set({[event.data.details.key]: event.data.details.value})«;`  · ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
  10. L30 `if (»event.data.details.action« === 'getCursor') {`  · ELEMENT:member-element, ASSIGN:binary-left
  11. L31 (→L33) `chrome.storage.local.get([»event.data.details.key], response => {«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  12. L32 `»event.source.postMessage({_cursors:'1', key: response[event.data.details.key], handler: event.data.details.handler},'*')«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  13. L35 `if (»event.data.details.action« === 'getConfigValue') {`  · ELEMENT:member-element, ASSIGN:binary-left
  14. L36 `»chrome.runtime.sendMessage({type: "GET_CONFIG_VALUE",endpoint:event.data.details.endpoint,options: event.data.details.options,handler: event.data.details.handler}, function (response) { })«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  15. L41 (→L56) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/ContentScript]`
  16. L43 `»window.postMessage({_cursors:'1', key: request.content, handler: request.handler},'*')«;`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L356:C0 -> L388:C2 (spans to L388)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L374:C42 -> L374:C80  `else if (request.type === 'OPEN_TAB') »chrome.tabs.create(request.properties)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L367:C8 -> L367:C48  `»fetch(request.endpoint, request.options)«.then((response) => response.text()).then((data) => {`  (url-control=FULL)
  - `FETCH_OPTIONS` ([Unknown URL]) — `js/background` L367:C8 -> L367:C48  `»fetch(request.endpoint, request.options)«.then((response) => response.text()).then((data) => {`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9 raw steps → 4 distinct lines):
   1. L356 (→L388) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/ContentScript->js/background]`
   2. L366 `else if (»request.type === 'GET_CONFIG_VALUE' && request.endpoint && sender && sender.tab && request.handler«) {`  · ASSIGN:logical-right, ASSIGN:logical-left
   3. L368 `»chrome.tabs.sendMessage(sender.tab.id,{'type':'CONFIG_VALUE','handler':request.handler,'content':data})«;`  · ELEMENT:object.setProperty
   4. L370 `»chrome.tabs.sendMessage(sender.tab.id,{'type':'CONFIG_VALUE','handler':request.handler,'content':null})«;`  · ELEMENT:object.setProperty

---

## Flow #3 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L81:C8 -> L89:C10 (spans to L89)  `»chrome.cookies.getAll({ url: "https://cursor-changer.online" }, _cookies => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (cursorData) — `js/background` L85:C34 -> L85:C72  `cursorData && »chrome.storage.local.set({cursorData})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (48 raw steps → 5 distinct lines):
   1. L81 (→L89) `»        chrome.cookies.getAll({ url: "https://cursor-changer.online" }, _cookies => {«`  · ELEMENT:object.setProperty
   2. L82 `for(let i = 0; i < »_cookies.length«; i++){`  · ELEMENT:member.length, ASSIGN:binary-right
   3. L83 `if (»_cookies[i].name« === 'cursorData') {`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:binary-left
   4. L84 `const cursorData = »JSON.parse(JSON.stringify(decodeURIComponent(_cookies[i].value)))«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:decodeURIComponent, RETURN:json.stringify, RETURN:json.parse
   5. L85 `cursorData && »chrome.storage.local.set({cursorData})«;`  · ELEMENT:object.setProperty

---

## Flow #4 — CHROME_COOKIES_INFO (cookies(https://cursor-changer.online))

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L82:C31 -> L82:C46  `for(let i = 0; i < »_cookies.length«; i++){`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (cursorData) — `js/background` L85:C34 -> L85:C72  `cursorData && »chrome.storage.local.set({cursorData})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (47 raw steps → 4 distinct lines):
   1. L82 `for(let i = 0; i < »_cookies.length«; i++){`  · ELEMENT:member.length, ASSIGN:binary-right
   2. L83 `if (»_cookies[i].name« === 'cursorData') {`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:binary-left
   3. L84 `const cursorData = »JSON.parse(JSON.stringify(decodeURIComponent(_cookies[i].value)))«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:decodeURIComponent, RETURN:json.stringify, RETURN:json.parse
   4. L85 `cursorData && »chrome.storage.local.set({cursorData})«;`  · ELEMENT:object.setProperty

---
