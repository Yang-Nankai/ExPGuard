# Source-level Taint Flow — icfhhpfimihpdgglmdlnmpaadfeaacbk 0.6.0

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 10  (collapsed from 10 raw issue entries)
- Sinkless sources skipped: 20 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `worker` L612:C16 -> L612:C23  `execute(»request«.app, request.tab, request.selectionText, request.frameId || 0, request.extra);`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `worker` L142:C4 -> L164:C6 (spans to L164)  `»chrome.downloads.download({url}, id => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2247525 raw steps → 51 distinct lines):
   1. L612 `execute(»request.app, request.tab, request.selectionText, request.frameId || 0, request.extra«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   2. L540 `if (»app.pre«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L544 `tabId: »tab.id«,`  · ASSIGN:identifier, ELEMENT:member-element
   4. L541 (→L595) `»    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
   5. L545 `frameIds: [»frameId«]`  · ASSIGN:identifier
   6. L583 `args: [»app.pre«]`  · ASSIGN:identifier, ELEMENT:member-element
   7. L496 `const next = pre => argv(»app, tab.url, selectionText, tab, pre, extra«).then(args => {`  · ASSIGN:identifier, ELEMENT:member-element
   8. L310 `let userAgent = »app.userAgent || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   9. L311 `let referrer = »app.referrer || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  10. L312 `let cookie = »app.cookie || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  11. L314 `const tabId = »tab.id«;`  · ASSIGN:identifier, ELEMENT:member-element
  12. L316 `if (»tabId && app.args.indexOf('[USERAGENT]') !== -1 && !userAgent«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  13. L318 `target: {»tabId«},`  · ASSIGN:identifier
  14. L317 (→L324) `»    await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  15. L326 `if (»tabId && app.args.indexOf('[REFERRER]') !== -1 && !referrer«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  16. L328 `target: {»tabId«},`  · ASSIGN:identifier
  17. L327 (→L334) `»    await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  18. L336 `if (»tabId && app.args.indexOf('[COOKIE]') !== -1 && !cookie«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  19. L338 `target: {»tabId«},`  · ASSIGN:identifier
  20. L337 (→L344) `»    await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  21. L348 `»url = new URL(url)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor
  22. L361 `const dPath = quote(app.args.includes('[DOWNLOADED_PATH]') ? await download(»url.href«).then(d => d.filename) : '');`  · ELEMENT:member-element-container
  23. L135 `if (/google\.[^./]+\/url?/.test(»url«)) {`  · ASSIGN:identifier
  24. L136 `const tmp = /url=([^&]+)/.exec(»url«);`  · ASSIGN:identifier
  25. L142 (→L164) `chrome.downloads.download({»url}, id => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  26. L377 `if (/\[EXTRA\]/.test(»app.args«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  27. L379 `const encodedData = »encoder.encode(extra || '')«;`  · ASSIGN:identifier, ASSIGN:logical-left, INITIAL:Uint8Array.constructor
  28. L391 (→L407) `termref.lineBuffer = »app.args«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  29. L394 `.replace(/\[TITLE\]/g, quote(»tab.title«))`  · ASSIGN:identifier, ELEMENT:member-element
  30. L359 `const quote = s => s ? »s.replaceAll('\\', '\\\\').replaceAll('"', `\\"`).replaceAll(`'`, `\\'`) : s«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  31. L395 `.replace(/\[HREF\]/g, »url.href«)`  · ELEMENT:member-element-container
  32. L396 `.replace(/\[HOSTNAME\]/g, »url.hostname«)`  · ELEMENT:member-element
  33. L397 `.replace(/\[PATHNAME\]/g, »url.pathname«)`  · ELEMENT:member-element
  34. L398 `.replace(/\[HASH\]/g, »url.hash«)`  · ELEMENT:member-element
  35. L399 `.replace(/\[PROTOCOL\]/g, »url.protocol«)`  · ELEMENT:member-element
  36. L400 `.replace(/\[SELECTIONTEXT\]/g, quote(»selectionText«))`  · ASSIGN:identifier
  37. L402 `.replace(/\[FILENAME\]/g, »app.filename«)`  · ASSIGN:identifier, ELEMENT:member-element
  38. L403 `.replace(/\[REFERRER\]/g, »referrer«)`  · ASSIGN:identifier
  39. L404 `.replace(/\[USERAGENT\]/g, »userAgent«)`  · ASSIGN:identifier
  40. L405 `.replace(/\[COOKIE\]/g, quote(»cookie«))`  · ASSIGN:identifier
  41. L387 (→L389) `»    const termref = {«`  · ELEMENT:object.setProperty
  42. L410 `if (»app.args.includes('[PROMPT')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  43. L381 `for (let i = 0; i < »encodedData.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  44. L422 `termref.lineBuffer = »termref.lineBuffer.replace(/\[PROMPT[^]*\]/g, quote(await pp()))«;`  · ELEMENT:member-element, RETURN:fallback-return
  45. L412 `const parts = »termref.lineBuffer.split('[PROMPT')[1].split(']')[0]«;`  · ELEMENT:member-element, RETURN:fallback-return
  46. L413 `const r = »parts.split('|')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  47. L415 `return prompt(»r[1] || 'User Input', r[2] || ''«).then(a => {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  48. L382 `binaryString += »String.fromCharCode(encodedData[i])«;`  · ELEMENT:member-element, RETURN:string.fromCharCode
  49. L384 `extrap = »btoa(binaryString)«;`  · ASSIGN:identifier, RETURN:btoa
  50. L393 `.replace(/\[EXTRA\]/g, »extrap«)`  · ASSIGN:identifier
  51. L446 `if (»app.quotes«) {`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #2 — ELEMENT_VALUE ([data-id=path])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L127:C7 -> L127:C11  `if (!»path«) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (10 raw steps → 5 distinct lines):
   1. L127 `if (»!path«) {`  · ASSIGN:identifier, ASSIGN:unary
   2. L153 `id, name, errors, quotes, closeme, changestate, »path«,`  · ASSIGN:identifier
   3. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   4. L101 `»path«,`  · ASSIGN:identifier
   5. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE ([data-id=name])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L123:C7 -> L123:C11  `if (!»name«) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (10 raw steps → 5 distinct lines):
   1. L123 `if (»!name«) {`  · ASSIGN:identifier, ASSIGN:unary
   2. L153 `id, »name«, errors, quotes, closeme, changestate, path,`  · ASSIGN:identifier
   3. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   4. L100 `»name«,`  · ASSIGN:identifier
   5. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE ([data-id=arguments])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L154:C4 -> L154:C8  `»args«, pre, post, toolbar, context, pattern, filters, redirects, index`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (28 raw steps → 8 distinct lines):
   1. L154 `»args«, pre, post, toolbar, context, pattern, filters, redirects, index`  · ASSIGN:identifier
   2. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   3. L102 `»args«,`  · ASSIGN:identifier
   4. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   5. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   6. L196 (→L197) `form.args.value = »form.args.value.substring(0, startPos) +«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   7. L198 `»form.args.value.substring(endPos, form.args.value.length)«;`  · ELEMENT:member-element, ELEMENT:member.length, RETURN:fallback-return, ASSIGN:binary-right
   8. L9 (→L28) `»const form = {«`  · ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE ([data-id=pre])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L154:C10 -> L154:C13  `args, »pre«, post, toolbar, context, pattern, filters, redirects, index`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 5 distinct lines):
   1. L154 `args, »pre«, post, toolbar, context, pattern, filters, redirects, index`  · ASSIGN:identifier
   2. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   3. L103 `»pre«,`  · ASSIGN:identifier
   4. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   5. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE ([data-id=post])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L154:C15 -> L154:C19  `args, pre, »post«, toolbar, context, pattern, filters, redirects, index`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 5 distinct lines):
   1. L154 `args, pre, »post«, toolbar, context, pattern, filters, redirects, index`  · ASSIGN:identifier
   2. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   3. L104 `»post«,`  · ASSIGN:identifier
   4. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   5. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---

## Flow #7 — ELEMENT_VALUE ([data-id=pattern])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L154:C39 -> L154:C46  `args, pre, post, toolbar, context, »pattern«, filters, redirects, index`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (27 raw steps → 6 distinct lines):
   1. L154 `args, pre, post, toolbar, context, »pattern«, filters, redirects, index`  · ASSIGN:identifier
   2. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   3. L87 `pattern = »(pattern || '').split(/\s*,\s*/).filter((s, i, l) => l.indexOf(s) === i).join(', ')«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return
   4. L107 `»pattern«,`  · ASSIGN:identifier
   5. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   6. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---

## Flow #8 — ELEMENT_VALUE ([data-id=filters])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L154:C48 -> L154:C55  `args, pre, post, toolbar, context, pattern, »filters«, redirects, index`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (27 raw steps → 6 distinct lines):
   1. L154 `args, pre, post, toolbar, context, pattern, »filters«, redirects, index`  · ASSIGN:identifier
   2. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   3. L88 `filters = »(filters || '').split(/\s*,\s*/).filter((s, i, l) => l.indexOf(s) === i).join(', ')«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return
   4. L108 `»filters«,`  · ASSIGN:identifier
   5. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   6. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---

## Flow #9 — ELEMENT_VALUE ([data-id=redirects])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L135:C46 -> L135:C66  `const redirects = form.navigation.checked ? »form.redirects.value« : '';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (33 raw steps → 8 distinct lines):
   1. L135 `const redirects = form.navigation.checked ? »form.redirects.value« : '';`  · ASSIGN:conditional-consequent
   2. L137 `if (»!toolbar && !menuitem && redirects === ''«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   3. L154 `args, pre, post, toolbar, context, pattern, filters, »redirects«, index`  · ASSIGN:identifier
   4. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   5. L89 `»redirects = (redirects || '').split(/\s*,\s*/).filter((s, i, l) => l.indexOf(s) === i).join(', ')«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, RETURN:array.join, ELEMENT:member-element, RETURN:fallback-return
   6. L109 `»redirects«,`  · ASSIGN:identifier
   7. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   8. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---

## Flow #10 — ELEMENT_VALUE ([data-id=changestate])

- **Source**: `ELEMENT_VALUE` — `data/options/index` L153:C39 -> L153:C50  `id, name, errors, quotes, closeme, »changestate«, path,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (apps) — `data/options/index` L112:C4 -> L115:C6 (spans to L115)  `»chrome.storage.local.set(prefs, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 5 distinct lines):
   1. L153 `id, name, errors, quotes, closeme, »changestate«, path,`  · ASSIGN:identifier
   2. L152 (→L155) `»  const s = {«`  · ELEMENT:object.setProperty
   3. L99 `»changestate«,`  · ASSIGN:identifier
   4. L94 (→L111) `»    prefs.apps[id] = {«`  · ELEMENT:object.setProperty
   5. L210 (→L222) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---
