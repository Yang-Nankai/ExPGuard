# Source-level Taint Flow — jolajcnbcjbfmlkccdppfjpbnlfgejpn 1.3.4

- Source type: CRX
- Files with issues: 3 / 7
- Distinct taint flows: 16  (collapsed from 31 raw issue entries)
- Sinkless sources skipped: 18 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L99:C8 -> L99:C15  `if (»message«.source === 'supabase-auth-adapter') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L53:C6 -> L53:C36  `»port.postMessage(notification)«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L129:C12 -> L129:C54  `»chrome.storage.local.set({ [key]: value })«;`
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L79:C8 -> L86:C10 (spans to L86)  `»chrome.storage.sync.set(syncQueue, () => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (67 raw steps → 22 distinct lines):
   1. L99 `if (»message.source« === 'supabase-auth-adapter') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L100 `switch (»message.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L172 `} else if (»message.type« === 'broadcast') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L173 `notifyConnectedClients(»message.data || message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   5. L53 `port.postMessage(»notification«);`  · ASSIGN:identifier
   6. L107 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
   7. L108 `if (syncQueue[»key«] !== undefined) {`  · ASSIGN:identifier
   8. L127 `const { »key, value } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
   9. L109 `sendResponse({ status: 'success', value: syncQueue[»key«] });`  · ASSIGN:identifier
  10. L111 `chrome.storage.sync.get(»key«, result => {`  · ASSIGN:identifier
  11. L115 `sendResponse({ status: 'success', value: result[»key«] || null });`  · ASSIGN:identifier
  12. L128 `syncQueue[»key] = value«;`  · ASSIGN:identifier
  13. L74 `let »syncQueue = {}«;`  · ELEMENT:object.setProperty
  14. L147 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
  15. L129 `»chrome.storage.local.set({ [key]: value })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L148 `chrome.storage.sync.remove(»key«, () => {`  · ASSIGN:identifier
  17. L168 `console.warn('Unknown action:', »message.action«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L136 `»key«,`  · ASSIGN:identifier
  19. L133 (→L139) `»            notifyConnectedClients({«`  · ELEMENT:object.setProperty
  20. L137 `»value«,`  · ASSIGN:identifier
  21. L155 `»key«,`  · ASSIGN:identifier
  22. L152 (→L157) `»                notifyConnectedClients({«`  · ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_VALUE (brightness)

- **Source**: `ELEMENT_VALUE` — `popup` L152:C20 -> L152:C73  `brightness: »parseInt(document.getElementById('brightness').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (customPreset) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (29 raw steps → 9 distinct lines):
   1. L152 `brightness: »parseInt(document.getElementById('brightness').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE (contrast)

- **Source**: `ELEMENT_VALUE` — `popup` L153:C18 -> L153:C69  `contrast: »parseInt(document.getElementById('contrast').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (customPreset) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (29 raw steps → 9 distinct lines):
   1. L153 `contrast: »parseInt(document.getElementById('contrast').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE (sepia)

- **Source**: `ELEMENT_VALUE` — `popup` L154:C15 -> L154:C63  `sepia: »parseInt(document.getElementById('sepia').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (customPreset) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (29 raw steps → 9 distinct lines):
   1. L154 `sepia: »parseInt(document.getElementById('sepia').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (grayscale)

- **Source**: `ELEMENT_VALUE` — `popup` L155:C19 -> L155:C71  `grayscale: »parseInt(document.getElementById('grayscale').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (customPreset) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (29 raw steps → 9 distinct lines):
   1. L155 `grayscale: »parseInt(document.getElementById('grayscale').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (hueRotate)

- **Source**: `ELEMENT_VALUE` — `popup` L156:C19 -> L156:C71  `hueRotate: »parseInt(document.getElementById('hueRotate').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (customPreset) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (26 raw steps → 9 distinct lines):
   1. L156 `hueRotate: »parseInt(document.getElementById('hueRotate').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty

---

## Flow #7 — ELEMENT_VALUE (From storage.local.set('themeSettings') in popup)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup` L152:C20 -> L152:C73  `brightness: »parseInt(document.getElementById('brightness').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L270:C20 -> L272:C22 (spans to L272)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (151 raw steps → 40 distinct lines):
   1. L152 `brightness: »parseInt(document.getElementById('brightness').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: themeSettings, sender: popup, receiver: popup]
  11. L235 `const s = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-left
  12. L240 `const shouldBeEnabled = »hasAccess && (s.enabled !== undefined ? s.enabled : false)«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  13. L242 `master.checked = »shouldBeEnabled«;`  · ASSIGN:identifier
  14. L237 `const »master = document.getElementById('master-switch')«;`  · ELEMENT:object.setProperty
  15. L243 `updateToggleIcons(»shouldBeEnabled«);`  · ASSIGN:identifier
  16. L245 `if (»!hasAccess && s.enabled«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  17. L280 `refreshUI(s, »s.activePreset || 'dark'«);`  · ELEMENT:member-element, ASSIGN:logical-left
  18. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  19. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  20. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  21. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  22. L173 `const offset = »val« - 100;`  · ASSIGN:binary-left, ASSIGN:identifier
  23. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  24. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  25. L176 `label.textContent = »val« + '°';`  · ASSIGN:binary-left, ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty
  27. L219 `const index = presetIds.indexOf(»activePresetId«);`  · ASSIGN:identifier
  28. L252 `master.checked = »!wantedState«;`  · ASSIGN:identifier, ASSIGN:unary
  29. L263 `master.checked = »wantedState«;`  · ASSIGN:identifier
  30. L264 `updateToggleIcons(»wantedState«);`  · ASSIGN:identifier
  31. L268 `const »newSettings = { ...current, enabled: wantedState }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  32. L270 (→L272) `»                    chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  33. L271 `if (typeof refreshUI === 'function') refreshUI(newSettings, »newSettings.activePreset«);`  · ELEMENT:member-element
  34. L319 `const current = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-right
  35. L321 `»...current«,`  · COPY:object-spread
  36. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  37. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  38. L166 `el.value = »val«;`  · ASSIGN:identifier
  39. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  40. L346 `»...current«,`  · COPY:object-spread

---

## Flow #8 — ELEMENT_VALUE (From storage.local.set('themeSettings') in popup)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup` L153:C18 -> L153:C69  `contrast: »parseInt(document.getElementById('contrast').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L270:C20 -> L272:C22 (spans to L272)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (151 raw steps → 40 distinct lines):
   1. L153 `contrast: »parseInt(document.getElementById('contrast').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: themeSettings, sender: popup, receiver: popup]
  11. L235 `const s = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-left
  12. L240 `const shouldBeEnabled = »hasAccess && (s.enabled !== undefined ? s.enabled : false)«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  13. L242 `master.checked = »shouldBeEnabled«;`  · ASSIGN:identifier
  14. L237 `const »master = document.getElementById('master-switch')«;`  · ELEMENT:object.setProperty
  15. L243 `updateToggleIcons(»shouldBeEnabled«);`  · ASSIGN:identifier
  16. L245 `if (»!hasAccess && s.enabled«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  17. L280 `refreshUI(s, »s.activePreset || 'dark'«);`  · ELEMENT:member-element, ASSIGN:logical-left
  18. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  19. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  20. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  21. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  22. L173 `const offset = »val« - 100;`  · ASSIGN:binary-left, ASSIGN:identifier
  23. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  24. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  25. L176 `label.textContent = »val« + '°';`  · ASSIGN:binary-left, ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty
  27. L219 `const index = presetIds.indexOf(»activePresetId«);`  · ASSIGN:identifier
  28. L252 `master.checked = »!wantedState«;`  · ASSIGN:identifier, ASSIGN:unary
  29. L263 `master.checked = »wantedState«;`  · ASSIGN:identifier
  30. L264 `updateToggleIcons(»wantedState«);`  · ASSIGN:identifier
  31. L268 `const »newSettings = { ...current, enabled: wantedState }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  32. L270 (→L272) `»                    chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  33. L271 `if (typeof refreshUI === 'function') refreshUI(newSettings, »newSettings.activePreset«);`  · ELEMENT:member-element
  34. L319 `const current = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-right
  35. L321 `»...current«,`  · COPY:object-spread
  36. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  37. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  38. L166 `el.value = »val«;`  · ASSIGN:identifier
  39. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  40. L346 `»...current«,`  · COPY:object-spread

---

## Flow #9 — ELEMENT_VALUE (From storage.local.set('themeSettings') in popup)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup` L154:C15 -> L154:C63  `sepia: »parseInt(document.getElementById('sepia').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L270:C20 -> L272:C22 (spans to L272)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (151 raw steps → 40 distinct lines):
   1. L154 `sepia: »parseInt(document.getElementById('sepia').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: themeSettings, sender: popup, receiver: popup]
  11. L235 `const s = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-left
  12. L240 `const shouldBeEnabled = »hasAccess && (s.enabled !== undefined ? s.enabled : false)«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  13. L242 `master.checked = »shouldBeEnabled«;`  · ASSIGN:identifier
  14. L237 `const »master = document.getElementById('master-switch')«;`  · ELEMENT:object.setProperty
  15. L243 `updateToggleIcons(»shouldBeEnabled«);`  · ASSIGN:identifier
  16. L245 `if (»!hasAccess && s.enabled«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  17. L280 `refreshUI(s, »s.activePreset || 'dark'«);`  · ELEMENT:member-element, ASSIGN:logical-left
  18. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  19. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  20. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  21. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  22. L173 `const offset = »val« - 100;`  · ASSIGN:binary-left, ASSIGN:identifier
  23. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  24. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  25. L176 `label.textContent = »val« + '°';`  · ASSIGN:binary-left, ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty
  27. L219 `const index = presetIds.indexOf(»activePresetId«);`  · ASSIGN:identifier
  28. L252 `master.checked = »!wantedState«;`  · ASSIGN:identifier, ASSIGN:unary
  29. L263 `master.checked = »wantedState«;`  · ASSIGN:identifier
  30. L264 `updateToggleIcons(»wantedState«);`  · ASSIGN:identifier
  31. L268 `const »newSettings = { ...current, enabled: wantedState }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  32. L270 (→L272) `»                    chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  33. L271 `if (typeof refreshUI === 'function') refreshUI(newSettings, »newSettings.activePreset«);`  · ELEMENT:member-element
  34. L319 `const current = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-right
  35. L321 `»...current«,`  · COPY:object-spread
  36. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  37. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  38. L166 `el.value = »val«;`  · ASSIGN:identifier
  39. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  40. L346 `»...current«,`  · COPY:object-spread

---

## Flow #10 — ELEMENT_VALUE (From storage.local.set('themeSettings') in popup)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup` L155:C19 -> L155:C71  `grayscale: »parseInt(document.getElementById('grayscale').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L270:C20 -> L272:C22 (spans to L272)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (151 raw steps → 40 distinct lines):
   1. L155 `grayscale: »parseInt(document.getElementById('grayscale').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: themeSettings, sender: popup, receiver: popup]
  11. L235 `const s = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-left
  12. L240 `const shouldBeEnabled = »hasAccess && (s.enabled !== undefined ? s.enabled : false)«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  13. L242 `master.checked = »shouldBeEnabled«;`  · ASSIGN:identifier
  14. L237 `const »master = document.getElementById('master-switch')«;`  · ELEMENT:object.setProperty
  15. L243 `updateToggleIcons(»shouldBeEnabled«);`  · ASSIGN:identifier
  16. L245 `if (»!hasAccess && s.enabled«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  17. L280 `refreshUI(s, »s.activePreset || 'dark'«);`  · ELEMENT:member-element, ASSIGN:logical-left
  18. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  19. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  20. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  21. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  22. L173 `const offset = »val« - 100;`  · ASSIGN:binary-left, ASSIGN:identifier
  23. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  24. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  25. L176 `label.textContent = »val« + '°';`  · ASSIGN:binary-left, ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty
  27. L219 `const index = presetIds.indexOf(»activePresetId«);`  · ASSIGN:identifier
  28. L252 `master.checked = »!wantedState«;`  · ASSIGN:identifier, ASSIGN:unary
  29. L263 `master.checked = »wantedState«;`  · ASSIGN:identifier
  30. L264 `updateToggleIcons(»wantedState«);`  · ASSIGN:identifier
  31. L268 `const »newSettings = { ...current, enabled: wantedState }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  32. L270 (→L272) `»                    chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  33. L271 `if (typeof refreshUI === 'function') refreshUI(newSettings, »newSettings.activePreset«);`  · ELEMENT:member-element
  34. L319 `const current = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-right
  35. L321 `»...current«,`  · COPY:object-spread
  36. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  37. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  38. L166 `el.value = »val«;`  · ASSIGN:identifier
  39. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  40. L346 `»...current«,`  · COPY:object-spread

---

## Flow #11 — ELEMENT_VALUE (From storage.local.set('themeSettings') in popup)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup` L156:C19 -> L156:C71  `hueRotate: »parseInt(document.getElementById('hueRotate').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L270:C20 -> L272:C22 (spans to L272)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L352:C8 -> L359:C10 (spans to L359)  `»chrome.storage.local.set({ «`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (148 raw steps → 40 distinct lines):
   1. L156 `hueRotate: »parseInt(document.getElementById('hueRotate').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:template-literal
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: themeSettings, sender: popup, receiver: popup]
  11. L235 `const s = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-left
  12. L240 `const shouldBeEnabled = »hasAccess && (s.enabled !== undefined ? s.enabled : false)«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  13. L242 `master.checked = »shouldBeEnabled«;`  · ASSIGN:identifier
  14. L237 `const »master = document.getElementById('master-switch')«;`  · ELEMENT:object.setProperty
  15. L243 `updateToggleIcons(»shouldBeEnabled«);`  · ASSIGN:identifier
  16. L245 `if (»!hasAccess && s.enabled«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  17. L280 `refreshUI(s, »s.activePreset || 'dark'«);`  · ELEMENT:member-element, ASSIGN:logical-left
  18. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  19. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  20. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  21. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  22. L173 `const offset = »val« - 100;`  · ASSIGN:binary-left, ASSIGN:identifier
  23. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  24. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  25. L176 `label.textContent = »val« + '°';`  · ASSIGN:binary-left, ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty
  27. L219 `const index = presetIds.indexOf(»activePresetId«);`  · ASSIGN:identifier
  28. L252 `master.checked = »!wantedState«;`  · ASSIGN:identifier, ASSIGN:unary
  29. L263 `master.checked = »wantedState«;`  · ASSIGN:identifier
  30. L264 `updateToggleIcons(»wantedState«);`  · ASSIGN:identifier
  31. L268 `const »newSettings = { ...current, enabled: wantedState }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  32. L270 (→L272) `»                    chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  33. L271 `if (typeof refreshUI === 'function') refreshUI(newSettings, »newSettings.activePreset«);`  · ELEMENT:member-element
  34. L319 `const current = »res.themeSettings || CONFIG.DEFAULT_SETTINGS«;`  · ASSIGN:logical-right
  35. L321 `»...current«,`  · COPY:object-spread
  36. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  37. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  38. L166 `el.value = »val«;`  · ASSIGN:identifier
  39. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  40. L346 `»...current«,`  · COPY:object-spread

---

## Flow #12 — ELEMENT_VALUE (From storage.local.set('customPreset') in popup)

- **Source**: `ELEMENT_VALUE` — `popup` L152:C20 -> L152:C73  `brightness: »parseInt(document.getElementById('brightness').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (85 raw steps → 26 distinct lines):
   1. L152 `brightness: »parseInt(document.getElementById('brightness').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal, ELEMENT:member-element-container
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: customPreset, sender: popup, receiver: popup]
  11. L314 `const »data = (presetId === 'custom') ? presets.custom : CONFIG.PRESETS[presetId]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:conditional-consequent
  12. L322 `»...data«,`  · COPY:object-spread
  13. L320 (→L325) `»            const newSettings = {«`  · ELEMENT:object.setProperty
  14. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  15. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  16. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  17. L166 `el.value = »val«;`  · ASSIGN:identifier
  18. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  19. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  20. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  21. L173 `const offset = »val« - 100;`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  23. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  24. L176 `label.textContent = »val« + '°';`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty

---

## Flow #13 — ELEMENT_VALUE (From storage.local.set('customPreset') in popup)

- **Source**: `ELEMENT_VALUE` — `popup` L153:C18 -> L153:C69  `contrast: »parseInt(document.getElementById('contrast').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (85 raw steps → 26 distinct lines):
   1. L153 `contrast: »parseInt(document.getElementById('contrast').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal, ELEMENT:member-element-container
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: customPreset, sender: popup, receiver: popup]
  11. L314 `const »data = (presetId === 'custom') ? presets.custom : CONFIG.PRESETS[presetId]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:conditional-consequent
  12. L322 `»...data«,`  · COPY:object-spread
  13. L320 (→L325) `»            const newSettings = {«`  · ELEMENT:object.setProperty
  14. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  15. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  16. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  17. L166 `el.value = »val«;`  · ASSIGN:identifier
  18. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  19. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  20. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  21. L173 `const offset = »val« - 100;`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  23. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  24. L176 `label.textContent = »val« + '°';`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty

---

## Flow #14 — ELEMENT_VALUE (From storage.local.set('customPreset') in popup)

- **Source**: `ELEMENT_VALUE` — `popup` L154:C15 -> L154:C63  `sepia: »parseInt(document.getElementById('sepia').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (85 raw steps → 26 distinct lines):
   1. L154 `sepia: »parseInt(document.getElementById('sepia').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal, ELEMENT:member-element-container
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: customPreset, sender: popup, receiver: popup]
  11. L314 `const »data = (presetId === 'custom') ? presets.custom : CONFIG.PRESETS[presetId]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:conditional-consequent
  12. L322 `»...data«,`  · COPY:object-spread
  13. L320 (→L325) `»            const newSettings = {«`  · ELEMENT:object.setProperty
  14. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  15. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  16. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  17. L166 `el.value = »val«;`  · ASSIGN:identifier
  18. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  19. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  20. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  21. L173 `const offset = »val« - 100;`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  23. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  24. L176 `label.textContent = »val« + '°';`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty

---

## Flow #15 — ELEMENT_VALUE (From storage.local.set('customPreset') in popup)

- **Source**: `ELEMENT_VALUE` — `popup` L155:C19 -> L155:C71  `grayscale: »parseInt(document.getElementById('grayscale').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (85 raw steps → 26 distinct lines):
   1. L155 `grayscale: »parseInt(document.getElementById('grayscale').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:binary-left, ASSIGN:template-literal, ELEMENT:member-element-container
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: customPreset, sender: popup, receiver: popup]
  11. L314 `const »data = (presetId === 'custom') ? presets.custom : CONFIG.PRESETS[presetId]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:conditional-consequent
  12. L322 `»...data«,`  · COPY:object-spread
  13. L320 (→L325) `»            const newSettings = {«`  · ELEMENT:object.setProperty
  14. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  15. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  16. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  17. L166 `el.value = »val«;`  · ASSIGN:identifier
  18. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  19. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  20. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  21. L173 `const offset = »val« - 100;`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  23. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  24. L176 `label.textContent = »val« + '°';`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty

---

## Flow #16 — ELEMENT_VALUE (From storage.local.set('customPreset') in popup)

- **Source**: `ELEMENT_VALUE` — `popup` L156:C19 -> L156:C71  `hueRotate: »parseInt(document.getElementById('hueRotate').value)«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (themeSettings) — `popup` L326:C12 -> L328:C14 (spans to L328)  `»chrome.storage.local.set({ themeSettings: newSettings }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (82 raw steps → 26 distinct lines):
   1. L156 `hueRotate: »parseInt(document.getElementById('hueRotate').value)«,`  · RETURN:parseInt
   2. L151 (→L158) `»    return {«`  · ELEMENT:object.setProperty
   3. L194 `return »`brightness(${s.brightness / 100}) contrast(${s.contrast / 100}) sepia(${s.sepia / 100}) grayscale(${s.grayscale / 100}) hue-rotate(${s.hueRotate}deg) invert(${s.invert ? 1 : 0})`«;`  · ASSIGN:template-literal, ELEMENT:member-element-container, ASSIGN:binary-left
   4. L200 `const »settingsToSend = { ...values, gridFilter, preview: true }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   5. L204 `»chrome.tabs.sendMessage(tab.id, { type: 'PREVIEW_THEME', settings: settingsToSend })«;`  · ELEMENT:object.setProperty
   6. L345 (→L350) `»        const newSettings = {«`  · ELEMENT:object.setProperty
   7. L347 `»...currentValues«,`  · COPY:object-spread
   8. L352 (→L359) `»        chrome.storage.local.set({ «`  · ELEMENT:object.setProperty
   9. L1 (→L54) `»const wallId = (typeof CONFIG !== 'undefined') ? CONFIG.WALL_ID : "676";«`  · ELEMENT:object.setProperty
  10. L233 (→L281) `»chrome.storage.local.get(['themeSettings', 'customPreset'], async (res) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: customPreset, sender: popup, receiver: popup]
  11. L314 `const »data = (presetId === 'custom') ? presets.custom : CONFIG.PRESETS[presetId]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:conditional-consequent
  12. L322 `»...data«,`  · COPY:object-spread
  13. L320 (→L325) `»            const newSettings = {«`  · ELEMENT:object.setProperty
  14. L326 (→L328) `»            chrome.storage.local.set({ themeSettings: newSettings }, () => {«`  · ELEMENT:object.setProperty
  15. L214 `const val = settings[id] !== undefined ? »settings[id]« : (id === 'hueRotate' ? 0 : 100);`  · ELEMENT:member-element-container
  16. L215 `updateLabel(id, »val«);`  · ASSIGN:identifier
  17. L166 `el.value = »val«;`  · ASSIGN:identifier
  18. L163 `const »el = document.getElementById(id)«;`  · ELEMENT:object.setProperty
  19. L167 `const percent = (»(el.value - el.min) / (el.max - el.min)«) * 100;`  · ASSIGN:binary-left
  20. L169 `if (fill) »fill.style.width = percent + '%'«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  21. L173 `const offset = »val« - 100;`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L174 `label.textContent = (offset >= 0 ? '+' : '') + »offset«;`  · ASSIGN:identifier, ASSIGN:binary-right
  23. L162 `const »label = document.getElementById(id + '-val')«;`  · ELEMENT:object.setProperty
  24. L176 `label.textContent = »val« + '°';`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L178 `label.textContent = »val«;`  · ASSIGN:identifier
  26. L217 `»document.getElementById('invert').checked = !!settings.invert«;`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:object.setProperty

---
