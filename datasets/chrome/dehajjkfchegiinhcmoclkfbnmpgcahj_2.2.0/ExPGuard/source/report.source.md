# Source-level Taint Flow — dehajjkfchegiinhcmoclkfbnmpgcahj 2.2.0

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_IDENTITY_TOKEN (identity.authToken)

- **Source**: `CHROME_IDENTITY_TOKEN` — `version` L78:C4 -> L97:C6 (spans to L97)  `»chrome.runtime.sendMessage(msg, function(token) {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `version` L96:C8 -> L96:C48  `»window.postMessage(msg, location.origin)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (9 raw steps → 5 distinct lines):
   1. L78 (→L97) `»    chrome.runtime.sendMessage(msg, function(token) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background->version]`
   2. L83 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L93 `token: »token«,`  · ASSIGN:identifier
   4. L92 (→L95) `»        var msg = {«`  · ELEMENT:object.setProperty
   5. L132 (→L137) `»    chrome.runtime.sendMessage(msg, function() {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[background->version]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L185:C0 -> L234:C2 (spans to L234)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L231:C8 -> L231:C76  `»fetch('https://dnmkr7tf85gze.cloudfront.net/data/p/' + request.uuid)«.then(response => response.json()).then(json => sendResponse(json));`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (82 raw steps → 15 distinct lines):
   1. L185 (→L234) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[version->background]`
   2. L186 `if (»request.type« == 'tutorial') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L187 `tutorial[sender.tab.id] = »request.page«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L183 `var »tutorial = {}«;`  · ELEMENT:object.setProperty
   5. L189 `else if (»request.type« == 'login') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L204 `else if (»request.type« == 'relayFromIframeBridge') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L210 `else if (»request.type« == 'userType') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L213 `else if (»request.type« == 'logout') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   9. L214 (→L227) `chrome.identity.getAuthToken({ 'interactive': false, scopes: »request.scopes }, function(token) {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  10. L230 `else if (»request.type« == 'getReadworksArticle') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L231 `fetch('https://dnmkr7tf85gze.cloudfront.net/data/p/' + »request.uuid«).then(response => response.json()).then(json => sendResponse(json));`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  12. L42 `else if (details.url == »tutorial[details.tabId]«) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-right
  13. L46 `else if (»!tutorial[details.tabId] && Object.values(tutorial).includes(details.url)«) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty, ASSIGN:logical-left
  14. L196 `»chrome.identity.getAuthToken({interactive: request.interactive, scopes: request.scopes }, sendResponse)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  15. L207 `chrome.tabs.sendMessage(sender.tab.id, »request«, {frameId: iframeBridge?.parentFrameId || 0 });`  · ASSIGN:identifier

---

## Flow #3 — CHROME_IDENTITY_TOKEN (identity.authToken)

- **Source**: `CHROME_IDENTITY_TOKEN` — `background` L218:C58 -> L218:C63  `chrome.identity.removeCachedAuthToken({token: »token« }, function() {`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_OPEN` — `background` L222:C12 -> L222:C89  `»xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + token)«;`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 2 distinct lines):
   1. L218 (→L220) `chrome.identity.removeCachedAuthToken({token: »token }, function() {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   2. L222 `xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + »token«);`  · ASSIGN:identifier, ASSIGN:binary-right

---
