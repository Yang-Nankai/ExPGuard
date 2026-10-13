# Source-level Taint Flow — aahnibhpidkdaeaplfdogejgoajkjgob 13.1.0.9

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 6  (collapsed from 49 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L213:C12 -> L213:C19  `switch (»message«.type) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L99:C11 -> L102:C6 (spans to L102)  `return »fetch(settings.host + params, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L131:C9 -> L134:C4 (spans to L134)  `return »fetch(link, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L173:C15 -> L177:C10 (spans to L177)  `return »fetch(settings.host + params, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (66 raw steps → 11 distinct lines):
   1. L213 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L215 `if (»message.url && message.url.startsWith('magnet:')«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   3. L217 `addTorrents(settings, »message.url, message.folder«)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L91 `'?action=add-url&download_dir=0&token=' + token + '&s=' + »encodeURI(link)«`  · ASSIGN:identifier, RETURN:encodeURI, ASSIGN:binary-right
   5. L93 `if (»where !== ROOT_FOLDER) params += '&path=' + where«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   6. L99 `return fetch(settings.host + »params«, {`  · ASSIGN:identifier, ASSIGN:binary-right
   7. L221 `downloadLink(settings, »message.url, message.folder«)`  · ASSIGN:identifier, ELEMENT:member-element
   8. L131 `return fetch(»link«, {`  · ASSIGN:identifier
   9. L162 `if (»where !== ROOT_FOLDER) params += '&path=' + where«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  10. L172 `console.log('Sonn:' + settings.host + »params«)`  · ASSIGN:identifier, ASSIGN:binary-right
  11. L173 `return fetch(settings.host + »params«, {`  · ASSIGN:identifier, ASSIGN:binary-right

---

## Flow #2 — ELEMENT_VALUE (From storage.local.set('settings') in options)  ·  15× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L10:C10 -> L10:C47  `»document.querySelector('#host').value« +`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L30:C9 -> L33:C4 (spans to L33)  `return »fetch(settings.host + 'token.html', {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L173:C15 -> L177:C10 (spans to L177)  `return »fetch(settings.host + params, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L99:C11 -> L102:C6 (spans to L102)  `return »fetch(settings.host + params, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (163 raw steps → 23 distinct lines):
   1. L10 _(in `options`)_ `»document.querySelector('#host').value« +`  · ASSIGN:binary-right
   2. L9 (→L10) `»var messageid = 0«`  · ASSIGN:binary-left
   3. L4 (→L15) `»  folders: ROOT_FOLDER,«`  · ELEMENT:object.setProperty
   4. L12 (→L19) `»  chrome.storage.local.get('settings', ({ settings }) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: settings, sender: options, receiver: background], ELEMENT:object.setProperty
   5. L13 `if (»!settings«) {`  · ASSIGN:identifier, ASSIGN:unary
   6. L128 `Authorization: 'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   7. L127 (→L129) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
   8. L24 `Authorization: 'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   9. L23 (→L25) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  10. L27 `settings.host = makeHost(»settings.host«)`  · ELEMENT:member-element-container
  11. L205 `if (»host«) {`  · ASSIGN:identifier
  12. L206 `let result = »host.replace('https', 'http')«`  · ASSIGN:identifier, RETURN:String.replace
  13. L207 `return result.endsWith('/') ? »result : result« + '/'`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent
  14. L28 `console.log(»'Link:' + settings.host« + 'token.html')`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  15. L30 `return fetch(»settings.host« + 'token.html', {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L169 `'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  17. L167 (→L170) `»        const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  18. L172 `console.log(»'Sonn:' + settings.host« + params)`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  19. L173 `return fetch(»settings.host« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L240 (→L250) `»settings.folders.split(':').forEach((folder) => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  21. L96 `Authorization: 'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  22. L95 (→L97) `»    const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  23. L99 `return fetch(»settings.host« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #3 — ELEMENT_VALUE (From storage.local.set('settings') in options)  ·  30× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L4:C4 -> L15:C6 (spans to L15)  `fo»lders: ROOT_FOLDER,«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L30:C9 -> L33:C4 (spans to L33)  `return »fetch(settings.host + 'token.html', {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L173:C15 -> L177:C10 (spans to L177)  `return »fetch(settings.host + params, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L99:C11 -> L102:C6 (spans to L102)  `return »fetch(settings.host + params, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (157 raw steps → 21 distinct lines):
   1. L4 (→L15) `»  folders: ROOT_FOLDER,«`  · ELEMENT:object.setProperty
   2. L12 (→L19) `»  chrome.storage.local.get('settings', ({ settings }) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: settings, sender: options, receiver: background], ELEMENT:object.setProperty
   3. L13 `if (»!settings«) {`  · ASSIGN:identifier, ASSIGN:unary
   4. L128 `Authorization: 'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   5. L127 (→L129) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
   6. L24 `Authorization: 'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
   7. L23 (→L25) `»  const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
   8. L27 `settings.host = makeHost(»settings.host«)`  · ELEMENT:member-element-container
   9. L205 `if (»host«) {`  · ASSIGN:identifier
  10. L206 `let result = »host.replace('https', 'http')«`  · ASSIGN:identifier, RETURN:String.replace
  11. L207 `return result.endsWith('/') ? »result : result« + '/'`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent
  12. L28 `console.log(»'Link:' + settings.host« + 'token.html')`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  13. L30 `return fetch(»settings.host« + 'token.html', {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L169 `'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  15. L167 (→L170) `»        const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  16. L172 `console.log(»'Sonn:' + settings.host« + params)`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  17. L173 `return fetch(»settings.host« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L240 (→L250) `»settings.folders.split(':').forEach((folder) => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  19. L96 `Authorization: 'Basic ' + »btoa(settings.user + ':' + settings.password)«,`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:btoa
  20. L95 (→L97) `»    const myHeaders = new Headers({«`  · ELEMENT:object.setProperty
  21. L99 `return fetch(»settings.host« + params, {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #4 — ELEMENT_VALUE (#host)

- **Source**: `ELEMENT_VALUE` — `options` L10:C10 -> L10:C47  `»document.querySelector('#host').value« +`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L10 `»document.querySelector('#host').value« +`  · ASSIGN:binary-right
   2. L9 (→L10) `»          'https://localhost:' +«`  · ASSIGN:binary-left
   3. L4 (→L15) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (#user)

- **Source**: `ELEMENT_VALUE` — `options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L4 (→L15) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (#password)

- **Source**: `ELEMENT_VALUE` — `options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `options` L4:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L4 (→L15) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---
