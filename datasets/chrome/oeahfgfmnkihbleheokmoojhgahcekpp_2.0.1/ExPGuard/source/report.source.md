# Source-level Taint Flow — oeahfgfmnkihbleheokmoojhgahcekpp 2.0.1

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 6  (collapsed from 49 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service_worker` L92:C12 -> L92:C19  `switch (»message«.type) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L30:C11 -> L33:C6 (spans to L33)  `return »fetch('http://' + GetHost(settings.SelectPort) + params, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L112:C9 -> L115:C4 (spans to L115)  `return »fetch(link, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L151:C15 -> L155:C10 (spans to L155)  `return »fetch('http://' + GetHost(settings.SelectPort) + params, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (64 raw steps → 10 distinct lines):
   1. L92 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L94 `if (»message.url && message.url.startsWith('magnet:')«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   3. L96 `SendLinkTorrentApp(settings, »message.url, message.folder«)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L21 `'?action=add-url&download_dir=0&token=' + token + '&s=' + »encodeURI(link)«`  · ASSIGN:identifier, RETURN:encodeURI, ASSIGN:binary-right
   5. L23 `if (»where !== MAIN_FOLDER) params += '&path=' + where«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   6. L30 `return fetch('http://' + GetHost(settings.SelectPort) + »params«, {`  · ASSIGN:identifier, ASSIGN:binary-right
   7. L100 `LinkGetSentPro(settings, »message.url, message.folder«)`  · ASSIGN:identifier, ELEMENT:member-element
   8. L112 `return fetch(»link«, {`  · ASSIGN:identifier
   9. L141 `if (»where !== MAIN_FOLDER) params += '&path=' + where«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  10. L151 `return fetch('http://' + GetHost(settings.SelectPort) + »params«, {`  · ASSIGN:identifier, ASSIGN:binary-right

---

## Flow #2 — ELEMENT_VALUE (From storage.local.set('settings') in options/options)  ·  15× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options/options` L10:C10 -> L10:C53  `»document.querySelector('#SelectPort').value« +`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L195:C9 -> L198:C4 (spans to L198)  `return »fetch(settings.SelectPort + 'token.html', {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L151:C15 -> L155:C10 (spans to L155)  `return »fetch('http://' + GetHost(settings.SelectPort) + params, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L30:C11 -> L33:C6 (spans to L33)  `return »fetch('http://' + GetHost(settings.SelectPort) + params, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (121 raw steps → 20 distinct lines):
   1. L10 _(in `options/options`)_ `»document.querySelector('#SelectPort').value« +`  · ASSIGN:binary-right
   2. L9 (→L10) `»var messageid = 0«`  · ASSIGN:binary-left
   3. L4 (→L15) `»  path: MAIN_FOLDER,«`  · ELEMENT:object.setProperty
   4. L56 (→L63) `»  chrome.storage.local.get('settings', ({ settings }) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: settings, sender: options/options, receiver: service_worker]
   5. L57 `if (»!settings«) {`  · ASSIGN:identifier, ASSIGN:unary
   6. L109 `Authorization: 'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   7. L108 (→L110) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
   8. L192 `Authorization: 'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   9. L191 (→L193) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  10. L195 `return fetch(»settings.SelectPort« + 'token.html', {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L148 `'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  12. L146 (→L149) `»        const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  13. L151 `return fetch(»'http://' + GetHost(settings.SelectPort)« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  14. L12 `if (»SelectPort«) {`  · ASSIGN:identifier
  15. L13 `let result = »SelectPort.replace(/^https?:\/\//, '')«`  · ASSIGN:identifier, RETURN:String.replace
  16. L15 `return result.endsWith('/') ? »result : result« + '/'`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent
  17. L229 (→L239) `»settings.path.split(':').forEach((folder) => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  18. L27 `'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  19. L25 (→L28) `»    const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  20. L30 `return fetch(»'http://' + GetHost(settings.SelectPort)« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #3 — ELEMENT_VALUE (From storage.local.set('settings') in options/options)  ·  30× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `service_worker` L4:C4 -> L15:C6 (spans to L15)  `pa»th: MAIN_FOLDER,«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L195:C9 -> L198:C4 (spans to L198)  `return »fetch(settings.SelectPort + 'token.html', {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L151:C15 -> L155:C10 (spans to L155)  `return »fetch('http://' + GetHost(settings.SelectPort) + params, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L30:C11 -> L33:C6 (spans to L33)  `return »fetch('http://' + GetHost(settings.SelectPort) + params, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (115 raw steps → 18 distinct lines):
   1. L4 (→L15) `»  path: MAIN_FOLDER,«`  · ELEMENT:object.setProperty
   2. L56 (→L63) `»  chrome.storage.local.get('settings', ({ settings }) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: settings, sender: options/options, receiver: service_worker]
   3. L57 `if (»!settings«) {`  · ASSIGN:identifier, ASSIGN:unary
   4. L109 `Authorization: 'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   5. L108 (→L110) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
   6. L192 `Authorization: 'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   7. L191 (→L193) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
   8. L195 `return fetch(»settings.SelectPort« + 'token.html', {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   9. L148 `'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  10. L146 (→L149) `»        const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  11. L151 `return fetch(»'http://' + GetHost(settings.SelectPort)« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  12. L12 `if (»SelectPort«) {`  · ASSIGN:identifier
  13. L13 `let result = »SelectPort.replace(/^https?:\/\//, '')«`  · ASSIGN:identifier, RETURN:String.replace
  14. L15 `return result.endsWith('/') ? »result : result« + '/'`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent
  15. L229 (→L239) `»settings.path.split(':').forEach((folder) => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  16. L27 `'Basic ' + »btoa(settings.UserName + ':' + settings.UserPass)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  17. L25 (→L28) `»    const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  18. L30 `return fetch(»'http://' + GetHost(settings.SelectPort)« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #4 — ELEMENT_VALUE (#SelectPort)

- **Source**: `ELEMENT_VALUE` — `options/options` L10:C10 -> L10:C53  `»document.querySelector('#SelectPort').value« +`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `options/options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L10 `»document.querySelector('#SelectPort').value« +`  · ASSIGN:binary-right
   2. L9 (→L10) `»          'http://localhost:' +«`  · ASSIGN:binary-left
   3. L4 (→L15) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (#UserName)

- **Source**: `ELEMENT_VALUE` — `options/options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `options/options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L4 (→L15) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (#UserPass)

- **Source**: `ELEMENT_VALUE` — `options/options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `options/options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L4 (→L15) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---
