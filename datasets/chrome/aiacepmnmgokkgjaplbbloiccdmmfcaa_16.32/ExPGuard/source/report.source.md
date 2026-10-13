# Source-level Taint Flow — aiacepmnmgokkgjaplbbloiccdmmfcaa 16.32

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 15 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(RequestWindow))

- **Source**: `TARGET_CUSTOM_EVENT` — `popup` L8:C14 -> L8:C24  `var pid = »evt.detail«.pid;`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_OPEN` — `popup` L44:C8 -> L44:C30  `»x.open('GET', linkUrl)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6 raw steps → 4 distinct lines):
   1. L8 `var pid = »evt.detail.pid«;`  · ELEMENT:member-element
   2. L9 `var urlPost = window.location.protocol + '//spineditor.com/Code/Web/WebService.asmx/PostForum?pid=' + »pid«;`  · ASSIGN:identifier, ASSIGN:binary-right
   3. L10 `RequestLinkUrl(»urlPost«, function (data) {`  · ASSIGN:identifier
   4. L44 `x.open('GET', »linkUrl«);`  · ASSIGN:identifier

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(OpenWindowTemp))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L59:C0 -> L233:C2 (spans to L233)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L223:C8 -> L230:C4 (spans to L230)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 4 distinct lines):
   1. L59 (→L233) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L224 `url: »request.obj.url«,`  · ELEMENT:member-element
   3. L223 (→L230) `»        chrome.tabs.create({«`  · ELEMENT:object.setProperty
   4. L229 `},»request.obj.timeout«);`  · ELEMENT:member-element

---

## Flow #3 — TARGET_CUSTOM_EVENT (target.addEventListener(OpenView))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L59:C0 -> L233:C2 (spans to L233)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L75:C8 -> L88:C10 (spans to L88)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (120 raw steps → 21 distinct lines):
   1. L59 (→L233) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L63 `var url = »spinView.substring(0, spinView.indexOf(";"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L64 `if (»spinView.indexOf(";")« == -1) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   4. L65 `url = »spinView«;`  · ASSIGN:identifier
   5. L68 `spinView = »spinView.substring(spinView.indexOf(";") + 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   6. L76 `url: »url«,`  · ASSIGN:identifier
   7. L75 (→L88) `»        chrome.tabs.create({«`  · ELEMENT:object.setProperty
   8. L81 `if(»timeV« > 1000){`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L85 `var winName=»"spineditorview_" + request.Id + "_" + (timeV * 1000) + "_"« + spinView;`  · ASSIGN:binary-right, ASSIGN:binary-left
  10. L86 `»listTab.push({ 'id': tab.id, 'exp': dateExpired,'name': winName})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L1 `var »listTab = []«;`  · ELEMENT:object.setProperty
  12. L87 `»listTabName.push({id:tab.id,name:winName})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L2 `var »listTabName=[]«;`  · ELEMENT:object.setProperty
  14. L110 `for (var k = 0; k < »listTabName.length«; k++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  15. L111 `var tab = »listTabName[k]«;`  · ELEMENT:member-element-container
  16. L112 `if(»tab.id« == request.tabId){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L333 `if (»listTab.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  18. L370 `if(»listTabName.length«>0){`  · ELEMENT:member.length, ASSIGN:binary-left
  19. L337 `for (var k = 0; k < »listTab.length«; k++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  20. L338 `var tab = »listTab[k]«;`  · ELEMENT:member-element-container
  21. L343 `if (tabId == »tab.id«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right

---

## Flow #4 — TARGET_CUSTOM_EVENT (target.addEventListener(RequestLink))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L59:C0 -> L233:C2 (spans to L233)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L28:C21 -> L28:C31  `const resp = await »fetch(url)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (72 raw steps → 9 distinct lines):
   1. L59 (→L233) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L162 `if (»linkUrl.localeCompare(spinUrlRequest)« == 0) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L174 `spinUrlRequest = »linkUrl«;`  · ASSIGN:identifier
   4. L176 `if (»mobile«) {`  · ASSIGN:identifier
   5. L177 `checkIsMobile = »mobile«;`  · ASSIGN:identifier
   6. L181 `loadLinkUrl(»linkUrl«,request);`  · ASSIGN:identifier
   7. L236 `loadUrl(»linkUrl«,function(data,resp){`  · ASSIGN:identifier
   8. L28 `const resp = await fetch(»url«);`  · ASSIGN:identifier
   9. L242 `wname='spineditor-captcha-'+»request.mid«;`  · ASSIGN:binary-right

---

## Flow #5 — TARGET_CUSTOM_EVENT (target.addEventListener(AjaxLink))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L59:C0 -> L233:C2 (spans to L233)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L37:C1 -> L48:C3 (spans to L48)  `»fetch(url, {«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L37:C1 -> L48:C3 (spans to L48)  `»fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (15 raw steps → 8 distinct lines):
   1. L59 (→L233) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L187 `var linkUrl = »request.obj.url«;`  · ELEMENT:member-element
   3. L188 `var datajson = »request.obj.data«;`  · ELEMENT:member-element
   4. L189 `if (»linkUrl« == postRequest) {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L198 `postRequest = »linkUrl«;`  · ASSIGN:identifier
   6. L200 `postUrl(»linkUrl,datajson«,function(data){`  · ASSIGN:identifier
   7. L37 (→L50) `fetch(»url, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L47 `body: »data«`  · ASSIGN:identifier

---
