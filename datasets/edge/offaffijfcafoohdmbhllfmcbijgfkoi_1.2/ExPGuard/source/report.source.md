# Source-level Taint Flow — offaffijfcafoohdmbhllfmcbijgfkoi 1.2

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `contentScript` L8:C8 -> L8:C23  `if (»event.data.type« && (event.data.type == "ESMART_WEB_EXTENSION_REQUEST")) {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `contentScript` L14:C12 -> L14:C131  `»window.postMessage({ type: "ESMART_WEB_EXTENSION_RESPONSE", requestId: event.data.requestId, response: response }, "*")«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (14 raw steps → 6 distinct lines):
   1. L8 `if (»event.data.type && (event.data.type == "ESMART_WEB_EXTENSION_REQUEST")«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L10 `operation: »event.data.operation«,`  · ELEMENT:member-element
   3. L9 (→L15) `»        browser.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   4. L11 `data: »event.data.data«,`  · ELEMENT:member-element
   5. L12 `method: »event.data.method«`  · ELEMENT:member-element
   6. L14 `»window.postMessage({ type: "ESMART_WEB_EXTENSION_RESPONSE", requestId: event.data.requestId, response: response }, "*")«;`  · ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L3:C0 -> L60:C2 (spans to L60)  `»browser.runtime.onMessage.addListener(async (request, sender) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L48:C15 -> L48:C42  `return »fetch(url, fetchParameters)«.then(function (response) {`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L48:C15 -> L48:C42  `return »fetch(url, fetchParameters)«.then(function (response) {`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (322 raw steps → 15 distinct lines):
   1. L3 (→L60) `»browser.runtime.onMessage.addListener(async (request, sender) => {«`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[contentScript->background]`
   2. L29 `var url = url + »request.operation«;`  · ASSIGN:binary-right
   3. L31 `request.method = request.method ? »request.method« : "GET";`  · ASSIGN:conditional-consequent
   4. L32 (→L37) `»        let fetchParameters = {«`  · ELEMENT:object.setProperty
   5. L40 `if (»request.method.toLowerCase()« == "get") {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   6. L48 `return fetch(»url«, fetchParameters).then(function (response) {`  · ASSIGN:identifier
   7. L41 `url = buildUrl(»url«, request.data);`  · ASSIGN:identifier
   8. L73 `for (»var key in parameters«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
   9. L74 `var value = »parameters[key]«;`  · ASSIGN:identifier, ELEMENT:member-element-container
  10. L75 `qs += »encodeURIComponent(key) + "=" + encodeURIComponent(value)« + "&";`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-left, ASSIGN:binary-right
  11. L78 `qs = »qs.substring(0, qs.length - 1)«; //chop off last "&"`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  12. L81 `return »url«;`  · ASSIGN:identifier
  13. L79 `url = »url + "?" + qs«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  14. L77 `if (»qs.length« > 0) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  15. L44 `fetchParameters.body = »JSON.stringify(request.data)«;`  · RETURN:json.stringify

---

## Flow #3 — ELEMENT_VALUE (serviceUrl)

- **Source**: `ELEMENT_VALUE` — `options` L24:C38 -> L24:C48  `findStorage().set({ 'serviceUrl': »serviceUrl« }, function () {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (serviceUrl) — `options` L24:C4 -> L26:C6 (spans to L26)  `»findStorage().set({ 'serviceUrl': serviceUrl }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (4 raw steps → 2 distinct lines):
   1. L24 (→L26) `findStorage().set({ 'serviceUrl': »serviceUrl }, function () {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   2. L25 `console.log('Value is set to ' + »serviceUrl«);`  · ASSIGN:identifier, ASSIGN:binary-right

---
