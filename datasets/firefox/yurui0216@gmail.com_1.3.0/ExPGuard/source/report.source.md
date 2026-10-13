# Source-level Taint Flow — yurui0216@gmail.com 1.3.0

- Source type: XPI
- Files with issues: 9 / 18
- Distinct taint flows: 15  (collapsed from 1897 raw issue entries)
- Sinkless sources skipped: 20 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(deepshare:convertToDocx))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L7:C0 -> L31:C2 (spans to L31)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background` L35:C31 -> L39:C10 (spans to L39)  `const response = await »fetch(request.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (630 raw steps → 2 distinct lines):
   1. L7 (→L31) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/docxConverter->background]`
   2. L35 (→L39) `»        const response = await fetch(request.url, {«`  · ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_VALUE (From storage.sync.set('docxServerUrl') in popup/popup)  ·  765× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L7:C0 -> L31:C2 (spans to L31)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L35:C31 -> L39:C10 (spans to L39)  `const response = await »fetch(request.url, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L57:C31 -> L60:C10 (spans to L60)  `const response = await »fetch(request.url, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L7 (→L31) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/docxConverter->background]`

---

## Flow #3 — ELEMENT_VALUE (From storage.sync.set('docxApiKey') in popup/popup)  ·  612× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L7:C0 -> L31:C2 (spans to L31)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L35:C31 -> L39:C10 (spans to L39)  `const response = await »fetch(request.url, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L57:C31 -> L60:C10 (spans to L60)  `const response = await »fetch(request.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L7 (→L31) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/docxConverter->background]`

---

## Flow #4 — ELEMENT_VALUE (From storage.sync.set('lastUsedTemplate') in popup/popup)  ·  153× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L7:C0 -> L31:C2 (spans to L31)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background` L35:C31 -> L39:C10 (spans to L39)  `const response = await »fetch(request.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (460 raw steps → 2 distinct lines):
   1. L7 (→L31) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/docxConverter->background]`
   2. L35 (→L39) `»        const response = await fetch(request.url, {«`  · ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (docxApiKey)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L464:C7 -> L464:C13  `if (!»apiKey« || !serverUrl) {`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `popup/popup` L493:C29 -> L498:C8 (spans to L498)  `const response = await »fetch(`${serverUrl}/auth/quota`, {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (1232 raw steps → 3 distinct lines):
   1. L464 `if (»!apiKey || !serverUrl«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   2. L496 `'X-API-Key': »apiKey«`  · ASSIGN:identifier
   3. L493 (→L498) `»      const response = await fetch(`${serverUrl}/auth/quota`, {«`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (docxServerUrl)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L464:C18 -> L464:C27  `if (!apiKey || !»serverUrl«) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup/popup` L493:C29 -> L498:C8 (spans to L498)  `const response = await »fetch(`${serverUrl}/auth/quota`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (840 raw steps → 2 distinct lines):
   1. L464 `if (»!apiKey || !serverUrl«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
   2. L493 `const response = await fetch(»`${serverUrl}/auth/quota`«, {`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #7 — ELEMENT_VALUE (watermark)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L413:C8 -> L443:C3 (spans to L443)  `const »settings = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (customWatermark) — `popup/popup` L446:C2 -> L454:C4 (spans to L454)  `»chrome.storage.sync.set(settings, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (51 raw steps → 1 distinct lines):
   1. L413 (→L443) `»  const settings = {«`  · ELEMENT:object.setProperty

---

## Flow #8 — ELEMENT_VALUE (docxServerUrl)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L413:C8 -> L443:C3 (spans to L443)  `const »settings = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (docxServerUrl) — `popup/popup` L446:C2 -> L454:C4 (spans to L454)  `»chrome.storage.sync.set(settings, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (51 raw steps → 1 distinct lines):
   1. L413 (→L443) `»  const settings = {«`  · ELEMENT:object.setProperty

---

## Flow #9 — ELEMENT_VALUE (docxApiKey)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L413:C8 -> L443:C3 (spans to L443)  `const »settings = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (docxApiKey) — `popup/popup` L446:C2 -> L454:C4 (spans to L454)  `»chrome.storage.sync.set(settings, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (51 raw steps → 1 distinct lines):
   1. L413 (→L443) `»  const settings = {«`  · ELEMENT:object.setProperty

---

## Flow #10 — ELEMENT_VALUE (wordTemplateSelect)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L413:C8 -> L443:C3 (spans to L443)  `const »settings = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (lastUsedTemplate) — `popup/popup` L446:C2 -> L454:C4 (spans to L454)  `»chrome.storage.sync.set(settings, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (51 raw steps → 1 distinct lines):
   1. L413 (→L443) `»  const settings = {«`  · ELEMENT:object.setProperty

---

## Flow #11 — ELEMENT_INNER_HTML (convertMarkdownBtn)

- **Source**: `ELEMENT_INNER_HTML` — `popup/popup` L665:C31 -> L665:C49  `convertBtn.innerHTML = »originalButtonHTML«;`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `popup/popup` L665:C19 -> L665:C28  `convertBtn.»innerHTML« = originalButtonHTML;`
  - `DOM_INNER_HTML` (innerHTML) — `popup/popup` L686:C19 -> L686:C28  `convertBtn.»innerHTML« = originalButtonHTML;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L665 `convertBtn.innerHTML = »originalButtonHTML«;`  · ASSIGN:identifier
   2. L588 `const »convertBtn = document.getElementById('convertMarkdownBtn')«;`  · ELEMENT:object.setProperty
   3. L686 `convertBtn.innerHTML = »originalButtonHTML«;`  · ASSIGN:identifier

---

## Flow #12 — ELEMENT_VALUE (markdownInput)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L597:C25 -> L597:C49  `const markdownText = »markdownInput.value.trim«();`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L758:C27 -> L765:C6 (spans to L765)  `const response = await »fetch(`${url}/convert-text`, {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (425 raw steps → 25 distinct lines):
   1. L597 `const markdownText = »markdownInput.value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L600 `if (»!markdownText«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L652 `await convertMarkdownToDocx(»markdownText«, settings.docxServerUrl, settings.docxApiKey, settings.removeDividers, settings.removeEmojis, settings.convertMermaid, settings.compatMode, document.getElementById('wordTemplateSelect').value);`  · ASSIGN:identifier
   4. L703 `const firstLine = »markdownText.split('\n')[0] || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
   5. L704 `let filename = »firstLine.trim().substring(0, 10).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5]/g, '') || 'document'«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
   6. L718 `filename = »`${filename}_${timestamp}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L724 `let processedContent = »markdownText«;`  · ASSIGN:identifier
   8. L728 `processedContent = »processedContent.replace(/0\uFE0F?\u20E3/gu, '0. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L746 `content: »processedContent«,`  · ASSIGN:identifier
  10. L745 (→L752) `»    const body = {«`  · ELEMENT:object.setProperty
  11. L747 `filename: »filename«,`  · ASSIGN:identifier
  12. L729 `processedContent = »processedContent.replace(/1\uFE0F?\u20E3/gu, '1. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L730 `processedContent = »processedContent.replace(/2\uFE0F?\u20E3/gu, '2. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L731 `processedContent = »processedContent.replace(/3\uFE0F?\u20E3/gu, '3. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  15. L764 `body: »JSON.stringify(body)«`  · RETURN:json.stringify
  16. L758 (→L765) `»    const response = await fetch(`${url}/convert-text`, {«`  · ELEMENT:object.setProperty
  17. L732 `processedContent = »processedContent.replace(/4\uFE0F?\u20E3/gu, '4. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L733 `processedContent = »processedContent.replace(/5\uFE0F?\u20E3/gu, '5. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L734 `processedContent = »processedContent.replace(/6\uFE0F?\u20E3/gu, '6. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L735 `processedContent = »processedContent.replace(/7\uFE0F?\u20E3/gu, '7. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L736 `processedContent = »processedContent.replace(/8\uFE0F?\u20E3/gu, '8. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  22. L737 `processedContent = »processedContent.replace(/9\uFE0F?\u20E3/gu, '9. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  23. L777 `link.download = »`${filename}.docx`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  24. L739 `processedContent = »processedContent.replace(/🔟/gu, '10. ')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  25. L742 `processedContent = »processedContent.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{1F200}-\u{1F251}]/gu, '')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #13 — ELEMENT_VALUE (wordTemplateSelect)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L754:C8 -> L754:C16  `if (»template«) {`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L758:C27 -> L765:C6 (spans to L765)  `const response = await »fetch(`${url}/convert-text`, {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (36 raw steps → 5 distinct lines):
   1. L754 `if (»template«) {`  · ASSIGN:identifier
   2. L755 `body.template_name = »template«;`  · ASSIGN:identifier
   3. L745 (→L752) `»    const body = {«`  · ELEMENT:object.setProperty
   4. L764 `body: »JSON.stringify(body)«`  · RETURN:json.stringify
   5. L758 (→L765) `»    const response = await fetch(`${url}/convert-text`, {«`  · ELEMENT:object.setProperty

---

## Flow #14 — ELEMENT_VALUE (From storage.sync.set('docxServerUrl') in popup/popup)  ·  204× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup/popup` L413:C8 -> L443:C3 (spans to L443)  `const »settings = {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup/popup` L758:C27 -> L765:C6 (spans to L765)  `const response = await »fetch(`${url}/convert-text`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup/popup` L804:C27 -> L804:C58  `const response = await »fetch(`${serverUrl}/templates`)«;`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (55 raw steps → 3 distinct lines):
   1. L413 (→L443) `»  const settings = {«`  · ELEMENT:object.setProperty
   2. L35 (→L114) `»  chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: docxServerUrl, sender: popup/popup, receiver: popup/popup]
   3. L61 `»document.getElementById('docxServerUrl').value = data.docxServerUrl || 'https://api.ds.rick216.cn'«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #15 — ELEMENT_VALUE (From storage.sync.set('docxApiKey') in popup/popup)  ·  153× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup/popup` L413:C8 -> L443:C3 (spans to L443)  `const »settings = {«`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `popup/popup` L758:C27 -> L765:C6 (spans to L765)  `const response = await »fetch(`${url}/convert-text`, {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (58 raw steps → 5 distinct lines):
   1. L413 (→L443) `»  const settings = {«`  · ELEMENT:object.setProperty
   2. L35 (→L114) `»  chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: docxApiKey, sender: popup/popup, receiver: popup/popup]
   3. L64 `apiKeyInput.value = »data.docxApiKey || ''«;`  · ASSIGN:logical-left
   4. L63 `const »apiKeyInput = document.getElementById('docxApiKey')«;`  · ELEMENT:object.setProperty
   5. L96 `if (»highlightApiKey || (!data.docxApiKey && highlightApiKey !== false)«) {`  · ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right

---
