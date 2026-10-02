# Source-level Taint Flow — inehghpkjjjdgpnagcbogckbonilnidc 8.0.8

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 3  (collapsed from 8 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L350:C27 -> L350:C34  `const message = ((_a = »request«.message) === null || _a === void 0 ? void 0 : _a.message) || request.message;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (dgServiceHost) — `background` L357:C12 -> L359:C14 (spans to L359)  `»chrome.storage.sync.set({ dgServiceHost: dgServiceHost + localPort }, function () {«`
  - `CHROME_SYNC_STORAGE` (degreed_bearer_access) — `background` L385:C12 -> L388:C14 (spans to L388)  `»chrome.storage.sync.set(storageValue, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (52 raw steps → 10 distinct lines):
   1. L350 `const message = »((_a = request.message) === null || _a === void 0 ? void 0 : _a.message) || request.message«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L351 `switch (»message«) {`  · ASSIGN:identifier
   3. L354 `const dgServiceHost = »request.value«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L355 `const serviceHostIsLocalAndMissingPort = »dgServiceHost.includes('localhost') && !dgServiceHost.includes(port)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   5. L357 (→L359) `chrome.storage.sync.set({ dgServiceHost: »dgServiceHost + localPort }, function () {«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
   6. L378 `const token = »request.token || ((_b = request.message) === null || _b === void 0 ? void 0 : _b.value)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   7. L379 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
   8. L384 `storageValue[BEARER_ACCESS_TOKEN] = »token[BEARER_ACCESS_TOKEN] || token«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   9. L383 `const »storageValue = {}«;`  · ELEMENT:object.setProperty
  10. L401 `console.log('Unknown message received from Angular app: ', »request«);`  · ASSIGN:identifier

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('dgServiceHost') in background)  ·  4× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L350:C27 -> L350:C34  `const message = ((_a = »request«.message) === null || _a === void 0 ? void 0 : _a.message) || request.message;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L125:C8 -> L130:C10 (spans to L130)  `»fetch(`${dgServiceHost}/api/extension/notifications/userunreadnotificationscount?dg-casing=camel`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (59 raw steps → 12 distinct lines):
   1. L350 `const message = »((_a = request.message) === null || _a === void 0 ? void 0 : _a.message) || request.message«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L351 `switch (»message«) {`  · ASSIGN:identifier
   3. L354 `const dgServiceHost = »request.value«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L355 `const serviceHostIsLocalAndMissingPort = »dgServiceHost.includes('localhost') && !dgServiceHost.includes(port)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   5. L357 (→L359) `chrome.storage.sync.set({ dgServiceHost: »dgServiceHost + localPort }, function () {«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
   6. L378 `const token = »request.token || ((_b = request.message) === null || _b === void 0 ? void 0 : _b.value)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   7. L379 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
   8. L384 `storageValue[BEARER_ACCESS_TOKEN] = »token[BEARER_ACCESS_TOKEN] || token«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   9. L383 `const »storageValue = {}«;`  · ELEMENT:object.setProperty
  10. L401 `console.log('Unknown message received from Angular app: ', »request«);`  · ASSIGN:identifier
  11. L113 (→L115) `»    chrome.storage.sync.get(['dgServiceHost'], function (result) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: dgServiceHost, sender: background, receiver: background]
  12. L125 `fetch(»`${dgServiceHost}/api/extension/notifications/userunreadnotificationscount?dg-casing=camel`«, {`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('degreed_bearer_access') in background)  ·  3× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L350:C27 -> L350:C34  `const message = ((_a = »request«.message) === null || _a === void 0 ? void 0 : _a.message) || request.message;`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L125:C8 -> L130:C10 (spans to L130)  `»fetch(`${dgServiceHost}/api/extension/notifications/userunreadnotificationscount?dg-casing=camel`, {«`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L374:C16 -> L374:C113  `»sendResponse((result === null || result === void 0 ? void 0 : result[BEARER_ACCESS_TOKEN]) || '')«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (73 raw steps → 15 distinct lines):
   1. L350 `const message = »((_a = request.message) === null || _a === void 0 ? void 0 : _a.message) || request.message«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L351 `switch (»message«) {`  · ASSIGN:identifier
   3. L354 `const dgServiceHost = »request.value«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L355 `const serviceHostIsLocalAndMissingPort = »dgServiceHost.includes('localhost') && !dgServiceHost.includes(port)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   5. L357 (→L359) `chrome.storage.sync.set({ dgServiceHost: »dgServiceHost + localPort }, function () {«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
   6. L378 `const token = »request.token || ((_b = request.message) === null || _b === void 0 ? void 0 : _b.value)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   7. L379 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
   8. L384 `storageValue[BEARER_ACCESS_TOKEN] = »token[BEARER_ACCESS_TOKEN] || token«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   9. L383 `const »storageValue = {}«;`  · ELEMENT:object.setProperty
  10. L401 `console.log('Unknown message received from Angular app: ', »request«);`  · ASSIGN:identifier
  11. L161 (→L168) `»    chrome.storage.sync.get(TOKEN_KEY, function (storage) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: degreed_bearer_access, sender: background, receiver: background]
  12. L162 `if (»storage && storage[TOKEN_KEY]«) {`  · ASSIGN:logical-right
  13. L117 `if (»!storage || !storage[TOKEN_KEY]«) {`  · ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element-container
  14. L128 `Authorization: »`Bearer ${accessToken}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  15. L125 (→L157) `»        fetch(`${dgServiceHost}/api/extension/notifications/userunreadnotificationscount?dg-casing=camel`, {«`  · ELEMENT:object.setProperty

---
