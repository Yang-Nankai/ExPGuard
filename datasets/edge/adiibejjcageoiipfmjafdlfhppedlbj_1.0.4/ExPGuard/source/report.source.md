# Source-level Taint Flow — adiibejjcageoiipfmjafdlfhppedlbj 1.0.4

- Source type: CRX
- Files with issues: 1 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_DOWNLOADS_SEARCH

- **Source**: `CHROME_DOWNLOADS_SEARCH` — `background` L56:C8 -> L83:C10 (spans to L83)  `»chrome.downloads.search({ id: downloadId }, (results) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L134:C4 -> L134:C22  `»fetch(downloadUrl)«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L185:C4 -> L185:C22  `»fetch(downloadUrl)«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (36 raw steps → 18 distinct lines):
   1. L56 (→L83) `»        chrome.downloads.search({ id: downloadId }, (results) => {«`  · ELEMENT:object.setProperty
   2. L58 `if (»results && results.length > 0«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L59 `const downloadItem = »results[0]«;`  · ELEMENT:member-element-container
   4. L60 `const downloadUrl = »downloadItem.url«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L61 `const downloadFilename = »downloadItem.filename«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L62 `const fileUrl = »downloadItem.finalUrl«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L63 `console.log(»downloadUrl, downloadFilename, fileUrl«);`  · ASSIGN:identifier
   8. L67 `const result = »downloadUrl.match(regex)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L70 `const result2 = »downloadUrl.match(regex2)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L74 `console.log(»result,result2«);`  · ASSIGN:identifier
  11. L75 `if (»result«) {`  · ASSIGN:identifier
  12. L76 `openDUoOrder(email, »downloadUrl, downloadFilename«);`  · ASSIGN:identifier
  13. L134 `fetch(»downloadUrl«)`  · ASSIGN:identifier
  14. L137 `formData.append("file", blob, »downloadFilename«);// 第三个参数设置文件名称，不设置会默认名称为blob`  · ASSIGN:identifier
  15. L77 `} else if (»result2«) {`  · ASSIGN:identifier
  16. L78 `openDuoAudit(email, »downloadUrl, downloadFilename«);`  · ASSIGN:identifier
  17. L185 `fetch(»downloadUrl«)`  · ASSIGN:identifier
  18. L188 `formData.append("file", blob, »downloadFilename«);// 第三个参数设置文件名称，不设置会默认名称为blob`  · ASSIGN:identifier

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L106:C16 -> L106:C23  `console.log(»message«);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (email) — `background` L122:C8 -> L124:C10 (spans to L124)  `»chrome.storage.local.set({ 'email': message.data.email }, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (29 raw steps → 5 distinct lines):
   1. L106 `console.log(»message«);`  · ASSIGN:identifier
   2. L107 `if (»message.type« == 'get-authorization') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L114 `} else if (»message.type« == 'remove-authorization') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L120 `} else if (»message.type« == 'set-authorization') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L122 (→L124) `chrome.storage.local.set({ 'email': »message.data.email }, function () {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---
