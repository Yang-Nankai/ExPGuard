# Source-level Taint Flow — ljnadbaeifgbakekpdcecdiefpbooihh 5.8

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L152:C15 -> L152:C22  `processAsync(»request«, sendResponse)`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `background` L24:C32 -> L24:C85  `return new Promise(resolve => »chrome.downloads.download({ url, filename }, resolve)«)`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L63:C34 -> L69:C8 (spans to L69)  `const fetchResponse = await »fetch(request.url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L63:C34 -> L69:C8 (spans to L69)  `const fetchResponse = await »fetch(request.url, {«`
  - `FETCH_BODY` ([Unknown URL]) — `background` L63:C34 -> L69:C8 (spans to L69)  `const fetchResponse = await »fetch(request.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (85 raw steps → 20 distinct lines):
   1. L152 `processAsync(»request«, sendResponse)`  · ASSIGN:identifier
   2. L49 `if (['GET', 'POST', 'HEAD'].includes(»request.method«)) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L117 `} else if (»request.method« === 'DOWNLOAD') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L55 `if (»request.contentType«) {`  · ASSIGN:identifier, ELEMENT:member-element
   5. L119 `const result = await chromeDownload(»request.url, request.filename«)`  · ASSIGN:identifier, ELEMENT:member-element
   6. L6 `const currentId = await startdownload(»url, filename«)`  · ASSIGN:identifier
   7. L24 `return new Promise(resolve => chrome.downloads.download({ »url, filename« }, resolve))`  · ASSIGN:identifier
   8. L9 `console.log(`Couldn't start download`, »url«)`  · ASSIGN:identifier
   9. L16 `console.log(`Download failed`, currentId, »url«, result)`  · ASSIGN:identifier
  10. L138 `} else if (»request.method« === 'HELLO') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L56 `headers['Content-Type'] = »request.contentType«`  · ASSIGN:identifier, ELEMENT:member-element
  12. L51 (→L53) `»      const headers = {«`  · ELEMENT:object.setProperty
  13. L59 `if (»request.at«) {`  · ASSIGN:identifier, ELEMENT:member-element
  14. L60 `headers['at'] = »request.at«`  · ASSIGN:identifier, ELEMENT:member-element
  15. L63 (→L69) `const fetchResponse = await fetch(»request.url, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  16. L64 `method: »request.method«,`  · ASSIGN:identifier, ELEMENT:member-element
  17. L68 `body: »request.body«,`  · ASSIGN:identifier, ELEMENT:member-element
  18. L74 `if (»fetchResponse.redirected && request.responseType === 'json'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  19. L96 `if (»request.responseType« === 'json') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  20. L98 `} else if (»request.responseType === 'buffer' || request.responseType === 'blob'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #2 — CHROME_DOWNLOADS_ONCHANGED

- **Source**: `CHROME_DOWNLOADS_ONCHANGED` — `background` L29:C64 -> L29:C66  `chrome.downloads.onChanged.addListener(function onChanged({ »id«, state }) {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L127:C6 -> L127:C35  `»sendResponse(responseMessage)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (30 raw steps → 9 distinct lines):
   1. L29 `chrome.downloads.onChanged.addListener(function onChanged({ »id, state« }) {`  · ELEMENT:destructure-property[id], ELEMENT:destructure-property[state]
   2. L30 `if (»id === itemId && state && state.current !== 'in_progress'«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
   3. L32 `resolve(»state.current«)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L15 `if (»result« !== 'complete') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L16 `console.log(`Download failed`, currentId, url, »result«)`  · ASSIGN:identifier
   6. L20 `return »result«`  · ASSIGN:identifier
   7. L119 `const »result = await chromeDownload(request.url, request.filename)«`  · ELEMENT:implicit.add
   8. L122 `ok: »result« === 'complete',`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L121 (→L125) `»      const responseMessage = {«`  · ELEMENT:object.setProperty

---
