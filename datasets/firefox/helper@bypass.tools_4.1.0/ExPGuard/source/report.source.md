# Source-level Taint Flow — helper@bypass.tools 4.1.0

- Source type: XPI
- Files with issues: 5 / 7
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content` L226:C13 -> L226:C23  `if (!»currentUrl«.includes('favicon.ico') && !currentUrl.includes('.css') && !currentUrl.includes('.js')) {`
- **Sink(s)**:
  - `WEB_SESSION_STORAGE_SET_VALUE` — `content` L231:C16 -> L231:C72  `»sessionStorage.setItem('easx_early_capture', currentUrl)«;`
  - `WINDOW_POSTMESSAGE` (*) — `content` L177:C8 -> L177:C68  `»window.postMessage({ type: 'bt-ext-forward', payload }, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (24 raw steps → 5 distinct lines):
   1. L226 `if (»!currentUrl.includes('favicon.ico') && !currentUrl.includes('.css') && !currentUrl.includes('.js')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   2. L227 `unsafeWindow.easxEarlyCapture = »currentUrl«;`  · ASSIGN:identifier
   3. L231 `sessionStorage.setItem('easx_early_capture', »currentUrl«);`  · ASSIGN:identifier
   4. L267 `»sendExtensionMessage({ type: 'bt-lock-nav', stayUrl: location.href, dest: resolvedDest })«;`  · ELEMENT:object.setProperty
   5. L177 `»window.postMessage({ type: 'bt-ext-forward', payload }, '*')«;`  · ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content-module` L947:C18 -> L947:C84  `const »parts = new URL(location.href).pathname.split('/').filter(Boolean)«;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content-module` L940:C31 -> L940:C51  `const html = await »fetch(location.href)«.then(r => r.text());`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `content-module` L1259:C35 -> L1262:C18 (spans to L1262)  `const resp = await »fetch(tcUrl, {«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (188 raw steps → 10 distinct lines):
   1. L947 `const »parts = new URL(location.href).pathname.split('/').filter(Boolean)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element, RETURN:fallback-return
   2. L948 `const custom = »parts[1] || parts[0] || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L949 `const »sr = new URLSearchParams(new URL(location.href).search).get('sr') || ''«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element
   4. L951 `_wiOpenWS(userId, »custom«, sr, monocle);`  · ASSIGN:identifier
   5. L845 `const wsUrl = »`wss://work.ink/_api/v2/ws?userId=${userId}&custom=${custom}&referrer=https://work.ink/&toLink=&serverOverride=${serverOverride}&customerSessionToken=${tok}&monocleAssessment=${monocle || ''}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   6. L846 `_wiRealWS = new (window._btWIOrigWS || WebSocket)(»wsUrl«);`  · ASSIGN:identifier
   7. L993 `if (»!CONFIG.LootLabs || !location.href.includes("/s?")«) return;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
   8. L1242 (→L1249) `»            const tcBody = {«`  · ELEMENT:object.setProperty
   9. L1261 `credentials: 'include', mode: 'cors', body: »JSON.stringify(tcBody)«`  · RETURN:json.stringify
  10. L1259 (→L1262) `»                const resp = await fetch(tcUrl, {«`  · ELEMENT:object.setProperty

---

## Flow #3 — DOCUMENT_URL (document.referrer)

- **Source**: `DOCUMENT_URL` — `content-module` L1242:C18 -> L1249:C13 (spans to L1249)  `const »tcBody = {«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `content-module` L1259:C35 -> L1262:C18 (spans to L1262)  `const resp = await »fetch(tcUrl, {«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (64 raw steps → 4 distinct lines):
   1. L1242 (→L1249) `»            const tcBody = {«`  · ELEMENT:object.setProperty
   2. L1261 `credentials: 'include', mode: 'cors', body: »JSON.stringify(tcBody)«`  · RETURN:json.stringify
   3. L1259 (→L1262) `»                const resp = await fetch(tcUrl, {«`  · ELEMENT:object.setProperty
   4. L1601 `else if (»document.referrer && !document.referrer.includes('bypass')«) { originalUrl = document.referrer; }`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L77:C0 -> L106:C2 (spans to L106)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L53:C31 -> L58:C10 (spans to L58)  `const response = await »fetch(request.url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L53:C31 -> L58:C10 (spans to L58)  `const response = await »fetch(request.url, {«`
  - `FETCH_BODY` ([Unknown URL]) — `background` L53:C31 -> L58:C10 (spans to L58)  `const response = await »fetch(request.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (212 raw steps → 12 distinct lines):
   1. L77 (→L106) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[proxy->background]`
   2. L78 `if (»request.type === 'bt-lock-nav' && sender.tab && sender.tab.id«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   3. L91 `if (»request.type === 'bt-allow-nav' && sender.tab && sender.tab.id«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   4. L81 `stayUrl: »request.stayUrl«,`  · ASSIGN:identifier, ELEMENT:member-element
   5. L80 (→L86) `»        navLocks.set(tabId, {«`  · ELEMENT:object.setProperty
   6. L82 `dest: »request.dest«,`  · ASSIGN:identifier, ELEMENT:member-element
   7. L102 `if (»request.type« === 'GM_xmlhttpRequest') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L103 `performExtensionFetch(»request«).then(sendResponse);`  · ASSIGN:identifier
   9. L53 (→L58) `const response = await fetch(»request.url, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  10. L54 `method: »request.method || 'GET'«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  11. L55 `headers: »request.headers || {}«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  12. L56 `body: »request.data || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left

---

## Flow #5 — WINDOW_CUSTOM_EVENT (window.addEventListener(BypassTools_GM_XHR))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L77:C0 -> L106:C2 (spans to L106)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L53:C31 -> L58:C10 (spans to L58)  `const response = await »fetch(request.url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L53:C31 -> L58:C10 (spans to L58)  `const response = await »fetch(request.url, {«`
  - `FETCH_BODY` ([Unknown URL]) — `background` L53:C31 -> L58:C10 (spans to L58)  `const response = await »fetch(request.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (7 raw steps → 5 distinct lines):
   1. L77 (→L106) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[proxy->background]`
   2. L54 `method: »request.method || 'GET'«,`  · ASSIGN:logical-left
   3. L53 (→L58) `»        const response = await fetch(request.url, {«`  · ELEMENT:object.setProperty
   4. L55 `headers: »request.headers || {}«,`  · ASSIGN:logical-left
   5. L56 `body: »request.data || null«,`  · ASSIGN:logical-left

---
