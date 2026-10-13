# Source-level Taint Flow — youtube-volume-scroll@github.com 3.4.1

- Source type: XPI
- Files with issues: 4 / 7
- Distinct taint flows: 7  (collapsed from 12 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `index` L80:C12 -> L80:C23  `»e.data.type« === 'YoutubeVolumeScroll-volume' &&`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (savedVolume) — `index` L170:C8 -> L170:C63  `»browserApi.storage.sync.set({ savedVolume: newVolume })«;`
  - `CHROME_SYNC_STORAGE` (config) — `index` L89:C12 -> L89:C66  `»browserApi.storage.sync.set({ config: e.data.config })«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (42 raw steps → 6 distinct lines):
   1. L80 (→L81) `»e.data.type === 'YoutubeVolumeScroll-volume' &&«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   2. L83 `saveVolume(»e.data.newVolume«);`  · ELEMENT:member-element
   3. L170 `»browserApi.storage.sync.set({ savedVolume: newVolume })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L85 (→L86) `»e.data.type === 'YoutubeVolumeScroll-config-save' &&«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   5. L88 `configFromPageAccess = »e.data.config«;`  · ELEMENT:member-element
   6. L89 `»browserApi.storage.sync.set({ config: e.data.config })«;`  · ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.sync.set('savedVolume') in index)  ·  4× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `index` L80:C12 -> L80:C23  `»e.data.type« === 'YoutubeVolumeScroll-volume' &&`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `index` L121:C16 -> L127:C17 (spans to L127)  `»window.localStorage.setItem(«`
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `index` L136:C20 -> L143:C21 (spans to L143)  `»window.localStorage.setItem(«`
  - `WEB_SESSION_STORAGE_SET_VALUE` — `index` L145:C20 -> L151:C21 (spans to L151)  `»window.sessionStorage.setItem(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (57 raw steps → 18 distinct lines):
   1. L80 (→L81) `»e.data.type === 'YoutubeVolumeScroll-volume' &&«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   2. L83 `saveVolume(»e.data.newVolume«);`  · ELEMENT:member-element
   3. L170 `»browserApi.storage.sync.set({ savedVolume: newVolume })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L85 (→L86) `»e.data.type === 'YoutubeVolumeScroll-config-save' &&«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   5. L88 `configFromPageAccess = »e.data.config«;`  · ELEMENT:member-element
   6. L89 `»browserApi.storage.sync.set({ config: e.data.config })«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   7. L117 (→L159) `»    browserApi.storage.sync.get('savedVolume', data => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: savedVolume, sender: index, receiver: index]
   8. L118 `if (»data?.savedVolume« !== undefined) {`  · ASSIGN:binary-left
   9. L121 (→L127) `»                window.localStorage.setItem(«`  · ELEMENT:object.setProperty
  10. L123 (→L126) `»                    JSON.stringify({«`  · RETURN:json.stringify
  11. L130 (→L133) `»                    const cookieData = JSON.stringify({«`  · ELEMENT:object.setProperty, RETURN:json.stringify
  12. L132 `muted: »data.savedVolume« <= 0,`  · ASSIGN:binary-left
  13. L139 `data: »cookieData«,`  · ASSIGN:identifier
  14. L136 (→L143) `»                    window.localStorage.setItem(«`  · ELEMENT:object.setProperty
  15. L138 (→L142) `»                        JSON.stringify({«`  · RETURN:json.stringify
  16. L148 `data: »cookieData«,`  · ASSIGN:identifier
  17. L145 (→L151) `»                    window.sessionStorage.setItem(«`  · ELEMENT:object.setProperty
  18. L147 (→L150) `»                        JSON.stringify({«`  · RETURN:json.stringify

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.sync.set('config') in index)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `index` L80:C12 -> L80:C23  `»e.data.type« === 'YoutubeVolumeScroll-volume' &&`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `index` L110:C4 -> L113:C5 (spans to L113)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (45 raw steps → 9 distinct lines):
   1. L80 (→L81) `»e.data.type === 'YoutubeVolumeScroll-volume' &&«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   2. L83 `saveVolume(»e.data.newVolume«);`  · ELEMENT:member-element
   3. L170 `»browserApi.storage.sync.set({ savedVolume: newVolume })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L85 (→L86) `»e.data.type === 'YoutubeVolumeScroll-config-save' &&«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   5. L88 `configFromPageAccess = »e.data.config«;`  · ELEMENT:member-element
   6. L89 `»browserApi.storage.sync.set({ config: e.data.config })«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   7. L101 (→L103) `»        browserApi.storage.sync.get('config', data => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: config, sender: index, receiver: index]
   8. L111 `{ type: 'YoutubeVolumeScroll-config-change', »config« },`  · ASSIGN:identifier
   9. L110 (→L113) `»    window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #4 — TARGET_CUSTOM_EVENT (From storage.sync.set('config') in popup/popup)

- **Source**: `TARGET_CUSTOM_EVENT` — `pageAccess` L160:C49 -> L160:C55  `return document.cookie.split('; ').find(r»ow => «row.startsWith(`${n}=`));`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `index` L110:C4 -> L113:C5 (spans to L113)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (25 raw steps → 9 distinct lines):
   1. L160 _(in `pageAccess`)_ `return document.cookie.split('; ').find(r»ow => «row.startsWith(`${n}=`));`  · ELEMENT:destructure-property[detail]
   2. L161 _(in `popup/popup`)_ `config.hudColor = »detail.color«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L64 _(in `popup/popup`)_ `»config = { ...defaultConfig, ...(data?.config || {}) }«;`  · ELEMENT:object.setProperty
   4. L58 _(in `popup/popup`)_ `»browserApi.storage.local.set({ config })«;`  · ELEMENT:object.setProperty
   5. L165 _(in `popup/popup`)_ `colorInput.value = »config.hudColor«;`  · ELEMENT:member-element-container
   6. L73 _(in `popup/popup`)_ `»browserApi.storage.sync.set({ config })«;`  · ELEMENT:object.setProperty
   7. L111 `{ type: 'YoutubeVolumeScroll»-config-change', config« },`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:identifier
   8. L101 (→L103) `»        browserApi.storage.sync.get('config', data => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: config, sender: popup/popup, receiver: index]
   9. L110 (→L113) `»    window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #5 — TARGET_CUSTOM_EVENT (target.addEventListener(coloris:pick))

- **Source**: `TARGET_CUSTOM_EVENT` — `popup/popup` L160:C49 -> L160:C55  `document.addEventListener('coloris:pick', ({ »detail« }) => {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (config) — `popup/popup` L58:C8 -> L58:C48  `»browserApi.storage.local.set({ config })«;`
  - `CHROME_SYNC_STORAGE` (config) — `popup/popup` L73:C8 -> L73:C47  `»browserApi.storage.sync.set({ config })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (22 raw steps → 7 distinct lines):
   1. L160 `document.addEventListener('coloris:pick', ({ »detail« }) => {`  · ELEMENT:destructure-property[detail]
   2. L161 `config.hudColor = »detail.color«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L64 `»config = { ...defaultConfig, ...(data?.config || {}) }«;`  · ELEMENT:object.setProperty
   4. L58 `»browserApi.storage.local.set({ config })«;`  · ELEMENT:object.setProperty
   5. L165 `colorInput.value = »config.hudColor«;`  · ELEMENT:member-element-container
   6. L73 `»browserApi.storage.sync.set({ config })«;`  · ELEMENT:object.setProperty
   7. L111 `setCustomOptionsEnabled(»config.hud« === hudTypes.custom);`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #6 — WINDOW_MESSAGE_EVENT (From storage.sync.set('config') in index)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `popup/popup` L80:C12 -> L80:C23  `// only »shown if cu«stom hud is selected`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (config) — `popup/popup` L58:C8 -> L58:C48  `»browserApi.storage.local.set({ config })«;`
  - `CHROME_SYNC_STORAGE` (config) — `popup/popup` L73:C8 -> L73:C47  `»browserApi.storage.sync.set({ config })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (74 raw steps → 16 distinct lines):
   1. L80 (→L81) `// only »shown if custom hud is selected«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   2. L83 _(in `index`)_ `saveVolume(»e.data.newVolume«);`  · ELEMENT:member-element
   3. L170 _(in `index`)_ `»browserApi.storage.sync.set({ savedVolume: newVolume })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L85 (→L86) `const pe»rmissions = {«`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   5. L88 `browserApi.permissions.contains»(permissions,« result => {`  · ELEMENT:member-element
   6. L89 _(in `index`)_ `»browserApi.storage.sync.set({ config: e.data.config })«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   7. L63 (→L69) `»browserApi.storage.sync.get('config', data => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: config, sender: index, receiver: popup/popup]
   8. L64 `config = { ...defaultConfig, »...(data?.config || {})« };`  · ASSIGN:logical-left, COPY:object-spread
   9. L132 `slider.value = »parseFloat(config.steps)«;`  · ELEMENT:member-element-container, RETURN:parseFloat
  10. L116 `setCustomOptionsEnabled(»config.hud === hudTypes.custom«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  11. L142 `slider.value = »parseFloat(config.hudSize)«;`  · ELEMENT:member-element-container, RETURN:parseFloat
  12. L156 `checkbox.checked = »config.hudPositionMode«;`  · ELEMENT:member-element-container
  13. L58 `»browserApi.storage.local.set({ config })«;`  · ELEMENT:object.setProperty
  14. L165 `colorInput.value = »config.hudColor«;`  · ELEMENT:member-element-container
  15. L73 `»browserApi.storage.sync.set({ config })«;`  · ELEMENT:object.setProperty
  16. L111 `setCustomOptionsEnabled(»config.hud === hudTypes.custom«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right

---

## Flow #7 — TARGET_CUSTOM_EVENT (From storage.sync.set('config') in popup/popup)

- **Source**: `TARGET_CUSTOM_EVENT` — `popup/popup` L160:C49 -> L160:C55  `document.addEventListener('coloris:pick', ({ »detail« }) => {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (config) — `popup/popup` L58:C8 -> L58:C48  `»browserApi.storage.local.set({ config })«;`
  - `CHROME_SYNC_STORAGE` (config) — `popup/popup` L73:C8 -> L73:C47  `»browserApi.storage.sync.set({ config })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (38 raw steps → 12 distinct lines):
   1. L160 `document.addEventListener('coloris:pick', ({ »detail« }) => {`  · ELEMENT:destructure-property[detail]
   2. L161 `config.hudColor = »detail.color«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L64 `»config = { ...defaultConfig, ...(data?.config || {}) }«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left, COPY:object-spread
   4. L58 `»browserApi.storage.local.set({ config })«;`  · ELEMENT:object.setProperty
   5. L165 `colorInput.value = »config.hudColor«;`  · ELEMENT:member-element-container
   6. L73 `»browserApi.storage.sync.set({ config })«;`  · ELEMENT:object.setProperty
   7. L111 `setCustomOptionsEnabled(»config.hud === hudTypes.custom«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
   8. L63 (→L69) `»browserApi.storage.sync.get('config', data => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: config, sender: popup/popup, receiver: popup/popup]
   9. L132 `slider.value = »parseFloat(config.steps)«;`  · ELEMENT:member-element-container, RETURN:parseFloat
  10. L116 `setCustomOptionsEnabled(»config.hud === hudTypes.custom«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  11. L142 `slider.value = »parseFloat(config.hudSize)«;`  · ELEMENT:member-element-container, RETURN:parseFloat
  12. L156 `checkbox.checked = »config.hudPositionMode«;`  · ELEMENT:member-element-container

---
