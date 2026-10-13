# Source-level Taint Flow — fmdnmmbkngflkenkpfgeoonodjohnapj 1.0.2

- Source type: CRX
- Files with issues: 4 / 4
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 20 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L99:C8 -> L99:C81  `if (»event.source === window && event.origin === location.origin && event.data« && event.data.source === 'echo360-cc-inject') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (echo360ProgressState) — `content` L117:C12 -> L126:C14 (spans to L126)  `»chrome.storage.local.set({ echo360ProgressState: progressPayload }, () => {«`
  - `CHROME_LOCAL_STORAGE` (echo360TranscriptExport) — `content` L135:C12 -> L149:C14 (spans to L149)  `»chrome.storage.local.set({ echo360TranscriptExport: exportPayload }, () => {«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `content` L55:C4 -> L58:C23 (spans to L58)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (185 raw steps → 28 distinct lines):
   1. L99 `if (»event.source === window && event.origin === location.origin && event.data && event.data.source === 'echo360-cc-inject'«) {`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   2. L100 `if (»event.data.type === 'TRANSLATE_REQUEST' && event.data.requestId && event.data.payload«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L101 `forwardTranslateRequest('TRANSLATE_TEXT', »event.data.requestId, event.data.payload«);`  · ELEMENT:member-element
   4. L62 (→L94) `chrome.runtime.sendMessage({ type: messageType, »payload }, (response) => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   5. L105 `if (»event.data.type === 'TRANSLATE_BATCH_REQUEST' && event.data.requestId && event.data.payload«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   6. L106 `forwardTranslateRequest('TRANSLATE_TEXT_BATCH', »event.data.requestId, event.data.payload«);`  · ELEMENT:member-element
   7. L110 `if (»event.data.type« === 'PROGRESS_UPDATE') {`  · ELEMENT:member-element, ASSIGN:binary-left
   8. L112 `percent: Number(»event.data.percent«) || 0,`  · ELEMENT:member-element
   9. L113 `msg: »event.data.msg || ''«,`  · ELEMENT:member-element, ASSIGN:logical-left
  10. L111 (→L115) `»            const progressPayload = {«`  · ELEMENT:object.setProperty
  11. L129 `if (»event.data.type === 'TRANSCRIPT_EXPORT_UPDATE' && event.data.payload«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  12. L117 (→L126) `»            chrome.storage.local.set({ echo360ProgressState: progressPayload }, () => {«`  · ELEMENT:object.setProperty
  13. L119 (→L124) `»                    chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  14. L121 `»...progressPayload«`  · COPY:object-spread
  15. L131 `»...event.data.payload«,`  · ELEMENT:member-element, COPY:object-spread
  16. L135 (→L149) `»            chrome.storage.local.set({ echo360TranscriptExport: exportPayload }, () => {«`  · ELEMENT:object.setProperty
  17. L140 `title: »exportPayload.title«,`  · ELEMENT:member-element
  18. L137 (→L147) `»                    chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  19. L141 `cueCount: »exportPayload.cues?.length || 0«,`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left
  20. L142 `translatedCount: »exportPayload.translatedCount || 0«,`  · ELEMENT:member-element, ASSIGN:logical-left
  21. L143 `isTranslationComplete: »!!exportPayload.isTranslationComplete«`  · ELEMENT:member-element, ASSIGN:unary
  22. L85 `»requestId«,`  · ASSIGN:identifier
  23. L83 (→L93) `»        postMessageToPage({«`  · ELEMENT:object.setProperty
  24. L55 (→L58) `»    window.postMessage({«`  · ELEMENT:object.setProperty
  25. L57 `»...message«`  · COPY:object-spread
  26. L66 `setTimeout(() => forwardTranslateRequest(messageType, »requestId, payload«, true), 500);`  · ASSIGN:identifier
  27. L72 `»requestId«,`  · ASSIGN:identifier
  28. L70 (→L79) `»            postMessageToPage({«`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L143:C0 -> L205:C2 (spans to L205)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L88:C31 -> L88:C74  `const response = await »fetch(gtUrl, { signal: controller.signal })«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (258 raw steps → 15 distinct lines):
   1. L143 (→L205) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L151 `const text = String(»message.payload?.text || ''«);`  · ELEMENT:member-element, ASSIGN:logical-left
   3. L152 `const targetLang = »message.payload?.targetLang«;`  · ELEMENT:member-element
   4. L153 `const data = await fetchTranslation(text, »targetLang«);`  · ASSIGN:identifier
   5. L83 `const gtUrl = »`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${sanitizeLang(targetLang)}&dt=t&q=${encodeURIComponent(text)}`«;`  · ASSIGN:identifier, ASSIGN:template-literal, RETURN:encodeURIComponent
   6. L15 `return ALLOWED_LANGS.has(lang) ? »lang« : 'zh-CN';`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   7. L88 `const response = await fetch(»gtUrl«, { signal: controller.signal });`  · ASSIGN:identifier
   8. L163 `const texts = Array.isArray(message.payload?.texts) ? »message.payload.texts.map((item) => String(item || ''))« : [];`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
   9. L164 `const separator = String(»message.payload?.separator || ''«);`  · ELEMENT:member-element, ASSIGN:logical-left
  10. L165 `if (»texts.length === 0 || !separator«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left
  11. L173 `const requestText = »texts.join(separator)«;`  · ELEMENT:member-element-container, RETURN:array.join
  12. L174 `const data = await fetchTranslation(»requestText, message.payload?.targetLang«);`  · ASSIGN:identifier, ELEMENT:member-element
  13. L178 `if (translatedTexts.length !== »texts.length«) {`  · ELEMENT:member.length, ASSIGN:binary-right
  14. L144 `if (»!message || (message.type !== 'TRANSLATE_TEXT' && message.type !== 'TRANSLATE_TEXT_BATCH')«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  15. L150 `if (»message.type« === 'TRANSLATE_TEXT') {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #3 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `inject` L337:C8 -> L345:C10 (spans to L345)  `»return {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `inject` L352:C8 -> L356:C27 (spans to L356)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `MAIN_inject`

- **Propagation** (607 raw steps → 3 distinct lines):
   1. L337 (→L345) `»        return {«`  · ELEMENT:object.setProperty
   2. L349 `const »payload = buildTranscriptExportPayload()«;`  · ELEMENT:implicit.add
   3. L352 (→L356) `»        window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #4 — WINDOW_CUSTOM_EVENT (window.addEventListener(echo360-cc-config-updated))

- **Source**: `WINDOW_CUSTOM_EVENT` — `inject` L478:C31 -> L478:C43  `applyConfigImmediately(»event.detail« || {});`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `inject` L352:C8 -> L356:C27 (spans to L356)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `inject` L123:C12 -> L128:C31 (spans to L128)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `MAIN_inject`

- **Propagation** (2906 raw steps → 29 distinct lines):
   1. L478 `applyConfigImmediately(»event.detail || {}«);`  · ELEMENT:member-element, ASSIGN:logical-left
   2. L447 `»...(nextConfig || {})«`  · COPY:object-spread
   3. L454 `if (»activeConfig.ccEnableSubtitles« === false) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L458 `const bgOp = activeConfig.ccBgOpacity !== undefined ? »activeConfig.ccBgOpacity« : 0.6;`  · ELEMENT:member-element-container
   5. L459 `overlay.style.setProperty('background', »`rgba(0, 0, 0, ${bgOp})`«, 'important');`  · ASSIGN:identifier, ASSIGN:template-literal
   6. L472 `if (»transcriptData && activeConfig.ccTargetLang && window._LAST_CC_LANG !== activeConfig.ccTargetLang«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:logical-left
   7. L445 (→L448) `»        activeConfig = {«`  · ELEMENT:object.setProperty
   8. L381 `return sanitizeLang(»config.ccTargetLang || 'zh-CN'«);`  · ASSIGN:logical-left
   9. L22 `return ALLOWED_LANGS.has(lang) ? »lang« : 'zh-CN';`  · ASSIGN:identifier
  10. L340 `»targetLang«,`  · ASSIGN:identifier
  11. L337 (→L345) `»        return {«`  · ELEMENT:object.setProperty
  12. L349 `const »payload = buildTranscriptExportPayload()«;`  · ELEMENT:implicit.add
  13. L352 (→L356) `»        window.postMessage({«`  · ELEMENT:object.setProperty
  14. L827 `const isNewTask = »translationState.cues !== cues || translationState.targetLang !== targetLang«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:binary-left
  15. L830 `if (»isNewTask«) {`  · ASSIGN:identifier
  16. L845 `} else if (»isNewTask«) {`  · ASSIGN:identifier
  17. L833 `translationState.targetLang = »targetLang«;`  · ASSIGN:identifier
  18. L52 (→L61) `»    const translationState = {«`  · ELEMENT:object.setProperty
  19. L843 `requestFastLaneTranslation(cues, focusIndex, »targetLang«, translationState.runId);`  · ASSIGN:identifier
  20. L849 `if (»isNewTask«) {`  · ASSIGN:identifier
  21. L974 `if (»config.ccEnableSubtitles« === false) {`  · ASSIGN:binary-left
  22. L985 `if (»config.ccTargetLang && window._LAST_CC_LANG !== config.ccTargetLang«) {`  · ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-left
  23. L363 `log.info(»`Language changed from ${window._LAST_CC_LANG} to ${newLang}, flushing translations...`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  24. L371 `window._LAST_CC_LANG = »newLang«;`  · ASSIGN:identifier
  25. L374 `translationState.targetLang = »newLang«;`  · ASSIGN:identifier
  26. L629 `»targetLang«,`  · ASSIGN:identifier
  27. L627 (→L631) `»            const response = await requestBackgroundTranslation('TRANSLATE_BATCH_REQUEST', {«`  · ELEMENT:object.setProperty
  28. L123 (→L128) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  29. L1027 `overlay.style.setProperty('background', »`rgba(0, 0, 0, ${bgOp})`«, 'important');`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #5 — ELEMENT_TEXT_CONTENT

- **Source**: `ELEMENT_TEXT_CONTENT` — `inject` L243:C16 -> L243:C20  `return (»text« || '')`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `inject` L352:C8 -> L356:C27 (spans to L356)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `MAIN_inject`

- **Propagation** (31449 raw steps → 17 distinct lines):
   1. L243 (→L246) `return (»text || '')«`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return
   2. L256 `if (»!text || text.length < 4 || seen.has(text)«) return;`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L257 `seen.add(»text«);`  · ASSIGN:identifier
   4. L251 `const »seen = new Set()«;`  · ELEMENT:object.setProperty
   5. L258 `values.push(»text«);`  · ASSIGN:identifier
   6. L250 `const »values = []«;`  · ELEMENT:object.setProperty
   7. L300 `if (»breadcrumbTexts.length« >= 2) {`  · ELEMENT:member.length, ASSIGN:binary-left
   8. L303 `} else if (»primaryTitle && secondaryCandidates.length > 0«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
   9. L302 `finalTitle = »`${tail[0]} / ${tail[1]}`«;`  · ELEMENT:member-element-container, ASSIGN:template-literal
  10. L304 `finalTitle = »`${primaryTitle} / ${secondaryCandidates[0]}`«;`  · ELEMENT:member-element-container, ASSIGN:template-literal
  11. L318 `if (»dateCandidates.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  12. L319 `finalTitle += »` - ${dateCandidates[0]}`«;`  · ELEMENT:member-element-container, ASSIGN:template-literal
  13. L322 `return »finalTitle«;`  · ASSIGN:identifier
  14. L316 `]).filter(text => »text && !finalTitle.includes(text) && text.length > 4 && text.length < 30 && (/\d/.test(text))«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  15. L337 (→L345) `»        return {«`  · ELEMENT:object.setProperty
  16. L349 `const »payload = buildTranscriptExportPayload()«;`  · ELEMENT:implicit.add
  17. L352 (→L356) `»        window.postMessage({«`  · ELEMENT:object.setProperty

---
