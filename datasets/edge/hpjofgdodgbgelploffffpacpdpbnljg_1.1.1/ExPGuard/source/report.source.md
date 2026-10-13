# Source-level Taint Flow — hpjofgdodgbgelploffffpacpdpbnljg 1.1.1

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 6  (collapsed from 15 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L107:C8 -> L107:C15  `if (»request«.action === 'ping') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (streamHistory) — `js/background` L52:C4 -> L52:C54  `»chrome.storage.local.set({streamHistory: history})«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L69:C2 -> L71:C4 (spans to L71)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (36 raw steps → 12 distinct lines):
   1. L107 `if (»request.action« === 'ping') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L110 `} else if (»request.action === 'playStream' && request.url«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L111 `openStreamInPlayer(»request.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   4. L58 `if (»!url«) return;`  · ASSIGN:identifier, ASSIGN:unary
   5. L61 `saveStreamToHistory(»url«);`  · ASSIGN:identifier
   6. L46 `history.unshift(»url«);`  · ASSIGN:identifier
   7. L40 `let »history = result.streamHistory || []«;`  · ELEMENT:object.setProperty
   8. L49 `history = »history.slice«(0, 5);`  · ELEMENT:member-element-container
   9. L52 `»chrome.storage.local.set({streamHistory: history})«;`  · ELEMENT:object.setProperty
  10. L70 `url: 'player.html?url=' + »encodeURIComponent(url)«`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-right
  11. L69 (→L71) `»  chrome.tabs.create({«`  · ELEMENT:object.setProperty
  12. L43 `history = history.filter(item => item !== »url«);`  · ASSIGN:identifier, ASSIGN:binary-right

---

## Flow #2 — ELEMENT_VALUE (stream-url)

- **Source**: `ELEMENT_VALUE` — `js/background` L75:C0 -> L84:C2 (spans to L84)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (streamHistory) — `js/background` L52:C4 -> L52:C54  `»chrome.storage.local.set({streamHistory: history})«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L69:C2 -> L71:C4 (spans to L71)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (25 raw steps → 10 distinct lines):
   1. L75 (→L84) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/popup->js/background]`
   2. L79 `} else if (»request.action === 'playStream' && request.url«) {`  · ASSIGN:logical-right
   3. L58 `if (»!url«) return;`  · ASSIGN:identifier, ASSIGN:unary
   4. L61 `saveStreamToHistory(»url«);`  · ASSIGN:identifier
   5. L46 `history.unshift(»url«);`  · ASSIGN:identifier
   6. L40 `let »history = result.streamHistory || []«;`  · ELEMENT:object.setProperty
   7. L49 `history = »history.slice«(0, 5);`  · ELEMENT:member-element-container
   8. L52 `»chrome.storage.local.set({streamHistory: history})«;`  · ELEMENT:object.setProperty
   9. L70 `url: 'player.html?url=' + »encodeURIComponent(url)«`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-right
  10. L69 (→L71) `»  chrome.tabs.create({«`  · ELEMENT:object.setProperty

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('streamHistory') in js/background)  ·  5× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L107:C8 -> L107:C15  `if (»request«.action === 'ping') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (streamHistory) — `js/background` L52:C4 -> L52:C54  `»chrome.storage.local.set({streamHistory: history})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (77 raw steps → 13 distinct lines):
   1. L107 `if (»request.action« === 'ping') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L110 `} else if (»request.action === 'playStream' && request.url«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L111 `openStreamInPlayer(»request.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   4. L58 `if (»!url«) return;`  · ASSIGN:identifier, ASSIGN:unary
   5. L61 `saveStreamToHistory(»url«);`  · ASSIGN:identifier
   6. L46 `»history.unshift(url)«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
   7. L40 `let »history = result.streamHistory || []«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left
   8. L49 `history = »history.slice(0, 5)«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L52 `»chrome.storage.local.set({streamHistory: history})«;`  · ELEMENT:object.setProperty, ASSIGN:identifier
  10. L70 `url: 'player.html?url=' + »encodeURIComponent(url)«`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-right
  11. L69 (→L71) `»  chrome.tabs.create({«`  · ELEMENT:object.setProperty
  12. L43 `history = »history.filter(item => item !== url)«;`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  13. L39 (→L53) `»  chrome.storage.local.get('streamHistory', function(result) {«`  · STORAGE:STORAGE_FLOW[area: local, key: streamHistory, sender: js/background, receiver: js/background]

---

## Flow #4 — ELEMENT_VALUE (From storage.local.set('streamHistory') in js/background)  ·  5× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `js/background` L75:C0 -> L84:C2 (spans to L84)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (streamHistory) — `js/background` L52:C4 -> L52:C54  `»chrome.storage.local.set({streamHistory: history})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (66 raw steps → 12 distinct lines):
   1. L75 (→L84) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/popup->js/background]`
   2. L79 `} else if (»request.action === 'playStream' && request.url«) {`  · ASSIGN:logical-right
   3. L58 `if (»!url«) return;`  · ASSIGN:identifier, ASSIGN:unary
   4. L61 `saveStreamToHistory(»url«);`  · ASSIGN:identifier
   5. L46 `»history.unshift(url)«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
   6. L40 `let »history = result.streamHistory || []«;`  · ELEMENT:object.setProperty, ASSIGN:logical-left
   7. L49 `history = »history.slice(0, 5)«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L52 `»chrome.storage.local.set({streamHistory: history})«;`  · ELEMENT:object.setProperty, ASSIGN:identifier
   9. L70 `url: 'player.html?url=' + »encodeURIComponent(url)«`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-right
  10. L69 (→L71) `»  chrome.tabs.create({«`  · ELEMENT:object.setProperty
  11. L39 (→L53) `»  chrome.storage.local.get('streamHistory', function(result) {«`  · STORAGE:STORAGE_FLOW[area: local, key: streamHistory, sender: js/background, receiver: js/background]
  12. L43 `history = »history.filter(item => item !== url)«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier

---

## Flow #5 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `js/i18n` L189:C15 -> L189:C39  `const lang = »navigator.language.split«('-')[0].toLowerCase();`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-9DH5BSD860) — `js/popup` L109:C6 -> L112:C8 (spans to L112)  `if» (window.Analytics) {«`
  - `CHROME_LOCAL_STORAGE` (language) — `js/i18n` L203:C2 -> L203:C60  `»chrome.storage.local.set({ language: language }, callback)«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (148 raw steps → 24 distinct lines):
   1. L189 _(in `js/i18n`)_ `const »lang = navigator.language.split('-')[0].toLowerCase()«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return
   2. L190 `window.Analytics.trackLa»nguageChanged(selectedLanguage«);`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   3. L196 _(in `js/i18n`)_ `const language = »result.language || getBrowserLanguage()«;`  · ASSIGN:logical-right
   4. L197 _(in `js/i18n`)_ `callback(»language«);`  · ASSIGN:identifier
   5. L127 `languageSelector.value = »language«;`  · ASSIGN:identifier
   6. L8 `const »languageSelector = document.getElementById('language-selector')«;`  · ELEMENT:object.setProperty
   7. L163 `const feedbackBu»tton = d«ocument.getElementById('feedback-button');`  · ASSIGN:identifier
   8. L162 (→L164) `»  // Feedback button event listener«`  · ELEMENT:object.setProperty
   9. L90 (→L101) `»      «`  · ELEMENT:object.setProperty
  10. L98 `docume»nt.querySelect«or('.recent-streams').style.display = 'none';`  · COPY:object-spread
  11. L111 _(in `js/i18n`)_ `'streamUrl»Example': 'https://exem«plo.pt/ao-vivo/canal.m3u8',`  · RETURN:json.stringify
  12. L109 (→L115) `»    if (window.Analytics) {«`  · ELEMENT:object.setProperty
  13. L193 `setCurrentLanguage(»selectedLanguage«, function() {`  · ASSIGN:identifier
  14. L203 _(in `js/i18n`)_ `»chrome.storage.local.set({ language: language }, callback)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L224 _(in `js/i18n`)_ `element.placeholder = getTranslation(key, »language«);`  · ASSIGN:identifier
  16. L208 _(in `js/i18n`)_ `if (»!language || !translations[language]«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  17. L226 _(in `js/i18n`)_ `element.textContent = getTranslation(key, »language«);`  · ASSIGN:identifier
  18. L236 _(in `js/i18n`)_ `element.placeholder = getTranslation(key, »language«);`  · ASSIGN:identifier
  19. L241 _(in `js/i18n`)_ `updateSelectOptions(»language«);`  · ASSIGN:identifier
  20. L252 _(in `js/i18n`)_ `options[0].text = `2 MB (${getTranslation('basic', »language«)})`;`  · ASSIGN:identifier
  21. L253 _(in `js/i18n`)_ `options[1].text = `4 MB (${getTranslation('standard', »language«)})`;`  · ASSIGN:identifier
  22. L254 _(in `js/i18n`)_ `options[2].text = `8 MB (${getTranslation('enhanced', »language«)})`;`  · ASSIGN:identifier
  23. L255 _(in `js/i18n`)_ `options[3].text = `16 MB (${getTranslation('maximum', »language«)})`;`  · ASSIGN:identifier
  24. L263 _(in `js/i18n`)_ `const seconds = getTranslation('seconds', »language«);`  · ASSIGN:identifier

---

## Flow #6 — NAVIGATOR_LANGUAGE (From storage.local.set('language') in js/popup)  ·  2× duplicate paths collapsed

- **Source**: `NAVIGATOR_LANGUAGE` — `js/i18n` L189:C15 -> L189:C39  `const lang = »navigator.language.split«('-')[0].toLowerCase();`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-9DH5BSD860) — `js/popup` L109:C6 -> L112:C8 (spans to L112)  `if» (window.Analytics) {«`
  - `CHROME_LOCAL_STORAGE` (language) — `js/i18n` L203:C2 -> L203:C60  `»chrome.storage.local.set({ language: language }, callback)«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (151 raw steps → 25 distinct lines):
   1. L189 _(in `js/i18n`)_ `const »lang = navigator.language.split('-')[0].toLowerCase()«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return
   2. L190 `window.Analytics.trackLa»nguageChanged(selectedLanguage«);`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   3. L196 _(in `js/i18n`)_ `const language = »result.language || getBrowserLanguage()«;`  · ASSIGN:logical-right, ASSIGN:logical-left
   4. L197 _(in `js/i18n`)_ `callback(»language«);`  · ASSIGN:identifier
   5. L127 `languageSelector.value = »language«;`  · ASSIGN:identifier
   6. L8 `const »languageSelector = document.getElementById('language-selector')«;`  · ELEMENT:object.setProperty
   7. L163 `const feedbackBu»tton = d«ocument.getElementById('feedback-button');`  · ASSIGN:identifier
   8. L162 (→L164) `»  // Feedback button event listener«`  · ELEMENT:object.setProperty
   9. L90 (→L101) `»      «`  · ELEMENT:object.setProperty
  10. L98 `docume»nt.querySelect«or('.recent-streams').style.display = 'none';`  · COPY:object-spread
  11. L111 _(in `js/i18n`)_ `'streamUrl»Example': 'https://exem«plo.pt/ao-vivo/canal.m3u8',`  · RETURN:json.stringify
  12. L109 (→L115) `»    if (window.Analytics) {«`  · ELEMENT:object.setProperty
  13. L193 `setCurrentLanguage(»selectedLanguage«, function() {`  · ASSIGN:identifier
  14. L203 _(in `js/i18n`)_ `»chrome.storage.local.set({ language: language }, callback)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L224 _(in `js/i18n`)_ `element.placeholder = getTranslation(key, »language«);`  · ASSIGN:identifier
  16. L208 _(in `js/i18n`)_ `if (»!language || !translations[language]«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  17. L226 _(in `js/i18n`)_ `element.textContent = getTranslation(key, »language«);`  · ASSIGN:identifier
  18. L236 _(in `js/i18n`)_ `element.placeholder = getTranslation(key, »language«);`  · ASSIGN:identifier
  19. L241 _(in `js/i18n`)_ `updateSelectOptions(»language«);`  · ASSIGN:identifier
  20. L252 _(in `js/i18n`)_ `options[0].text = `2 MB (${getTranslation('basic', »language«)})`;`  · ASSIGN:identifier
  21. L253 _(in `js/i18n`)_ `options[1].text = `4 MB (${getTranslation('standard', »language«)})`;`  · ASSIGN:identifier
  22. L254 _(in `js/i18n`)_ `options[2].text = `8 MB (${getTranslation('enhanced', »language«)})`;`  · ASSIGN:identifier
  23. L255 _(in `js/i18n`)_ `options[3].text = `16 MB (${getTranslation('maximum', »language«)})`;`  · ASSIGN:identifier
  24. L263 _(in `js/i18n`)_ `const seconds = getTranslation('seconds', »language«);`  · ASSIGN:identifier
  25. L195 (→L198) `»    });«`  · STORAGE:STORAGE_FLOW[area: local, key: language, sender: js/popup, receiver: js/popup]

---
