# Source-level Taint Flow — nglbhlefjhcjockellmeclkcijildjhi 3.1.2

- Source type: CRX
- Files with issues: 6 / 8
- Distinct taint flows: 25  (collapsed from 32 raw issue entries)
- Sinkless sources skipped: 28 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `content` L94:C153 -> L94:C162  `chrome.storage.local.set({sourceLanguage: languages.includes(l) ? l : 'unknown', pageText: pageContent.textContent.replace(/^\s+/g, ''), »pageTitle«})`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (pageTitle) — `content` L94:C16 -> L94:C164  `»chrome.storage.local.set({sourceLanguage: languages.includes(l) ? l : 'unknown', pageText: pageContent.textContent.replace(/^\s+/g, ''), pageTitle})«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L94 `»chrome.storage.local.set({sourceLanguage: languages.includes(l) ? l : 'unknown', pageText: pageContent.textContent.replace(/^\s+/g, ''), pageTitle})«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `content` L86:C16 -> L86:C30  `const { »sourceLanguage«, targetLanguage, showHints, knownLanguages, learningLanguage } = settings;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (sourceLanguage) — `content` L97:C20 -> L97:C80  `»chrome.storage.local.set({sourceLanguage: learningLanguage})«`
  - `CHROME_LOCAL_STORAGE` (knownLanguages) — `content` L101:C20 -> L101:C94  `»chrome.storage.local.set({knownLanguages: [...knownLanguages, pageLang] })«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (29 raw steps → 5 distinct lines):
   1. L86 `const { »sourceLanguage, targetLanguage, showHints, knownLanguages, learningLanguage« } = settings;`  · ELEMENT:destructure-property[sourceLanguage], ELEMENT:destructure-property[targetLanguage], ELEMENT:destructure-property[showHints], ELEMENT:destructure-property[knownLanguages], ELEMENT:destructure-property[learningLanguage]
   2. L96 `if (»targetLanguage« === l) {`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L97 `»chrome.storage.local.set({sourceLanguage: learningLanguage})«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L99 `if (»!knownLanguages.includes(pageLang)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   5. L101 `»chrome.storage.local.set({knownLanguages: [...knownLanguages, pageLang] })«`  · ASSIGN:identifier, ELEMENT:array-spread, ELEMENT:object.setProperty, ELEMENT:implicit.add

---

## Flow #3 — ELEMENT_INNER_HTML (wtf)

- **Source**: `ELEMENT_INNER_HTML` — `content` L396:C64 -> L396:C121  `document.getElementsByTagName('wtf')[0].innerHTML = »document.getElementsByTagName('wtf')[0].innerHTML.replace«(separatorNew, '').replace(separatorNew, '');`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `content` L396:C52 -> L396:C61  `document.getElementsByTagName('wtf')[0].»innerHTML« = document.getElementsByTagName('wtf')[0].innerHTML.replace(separatorNew, '').replace(separatorNew, '');`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (91 raw steps → 1 distinct lines):
   1. L396 `»document.getElementsByTagName('wtf')[0].innerHTML = document.getElementsByTagName('wtf')[0].innerHTML.replace(separatorNew, '').replace(separatorNew, '')«;`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #4 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `content` L280:C28 -> L280:C42  `const { »currentContext« } = settings;`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `content` L281:C32 -> L281:C41  `contextElem.»innerHTML« = addStrongTags(currentContext) + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;`
  - `DOM_INNER_HTML` (innerHTML) — `content` L318:C36 -> L318:C45  `contextElem.»innerHTML« = addStrongTags(context) + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (143 raw steps → 12 distinct lines):
   1. L280 `const { »currentContext« } = settings;`  · ELEMENT:destructure-property[currentContext]
   2. L281 `contextElem.innerHTML = »addStrongTags(currentContext)« + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L159 `addStrongTags = text => (»text.replace(separator, '<strong>').replace(separatorLast, '</strong>')«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   4. L279 `const »contextElem = document.getElementsByClassName('ll-popup-context')[0]«;`  · ELEMENT:object.setProperty
   5. L282 `document.getElementsByClassName('ll-popup-context-button')[0].addEventListener('click', () => translateContext(»currentContext«));`  · ASSIGN:identifier
   6. L318 `contextElem.innerHTML = »addStrongTags(context)« + ` <a class="ll-popup-context-button">${chrome.i18n.getMessage("translate")}</a>`;`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L316 `const »contextElem = document.getElementsByClassName('ll-popup-context')[0]«;`  · ELEMENT:object.setProperty
   8. L319 `document.getElementsByClassName('ll-popup-context-button')[0].addEventListener('click', () => translateContext(»context«));`  · ASSIGN:identifier
   9. L295 `"text": »context.replace(/(<([^>]+)>)/gi, "")«,`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L290 (→L302) `»            const body = JSON.stringify(«`  · ELEMENT:object.setProperty, RETURN:json.stringify
  11. L307 `»body«,`  · ASSIGN:identifier
  12. L304 (→L322) `»            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty

---

## Flow #5 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `storage` L24:C21 -> L24:C45  `knownLanguages: [»navigator.language.slice«(0, 2).toLowerCase()],`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (knownLanguages) — `storage` L81:C8 -> L81:C49  `»chrome.storage.local.set(defaultSettings)«;`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L84:C4 -> L84:C139  `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L101:C16 -> L101:C164  `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L97:C38 -> L97:C138  `changeInfo.removed && »chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18 raw steps → 5 distinct lines):
   1. L24 `knownLanguages: [»navigator.language.slice(0, 2).toLowerCase()«],`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
   2. L2 (→L30) `»export const defaultSettings = {«`  · ELEMENT:object.setProperty
   3. L84 `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
   4. L101 `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent, ELEMENT:object.setProperty
   5. L97 `changeInfo.removed && »chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()})«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #6 — NAVIGATOR_PLATFORM (navigator.platform)

- **Source**: `NAVIGATOR_PLATFORM` — `storage` L27:C11 -> L27:C37  `isMac: »navigator.platform.indexOf«('Mac') > -1,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (isMac) — `storage` L81:C8 -> L81:C49  `»chrome.storage.local.set(defaultSettings)«;`
  - `CHROME_LOCAL_STORAGE` (isMac) — `storage` L84:C4 -> L84:C139  `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (8 raw steps → 3 distinct lines):
   1. L27 `isMac: »navigator.platform.indexOf('Mac')« > -1,`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   2. L2 (→L30) `»export const defaultSettings = {«`  · ELEMENT:object.setProperty
   3. L84 `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ELEMENT:object.setProperty

---

## Flow #7 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `storage` L69:C55 -> L69:C61  `chrome.storage.local.set({userid: cookie ? »cookie«.value : ''})`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userid) — `storage` L69:C12 -> L69:C74  `»chrome.storage.local.set({userid: cookie ? cookie.value : ''})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L69 `»chrome.storage.local.set({userid: cookie ? cookie.value : ''})«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty

---

## Flow #8 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `storage` L71:C61 -> L71:C67  `chrome.storage.local.set({remember: cookie ? »cookie«.value : ''})`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (remember) — `storage` L71:C16 -> L71:C80  `»chrome.storage.local.set({remember: cookie ? cookie.value : ''})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L71 `»chrome.storage.local.set({remember: cookie ? cookie.value : ''})«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty

---

## Flow #9 — STORAGE_ALL_ITEMS (storage.all.items[local])  ·  3× duplicate paths collapsed

- **Source**: `STORAGE_ALL_ITEMS` — `storage` L33:C12 -> L33:C20  `const { »remember«, userid, host, learningLanguage, sourceLanguage } = settings;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L40:C8 -> L40:C80  `»fetch(`https://${host}/getUserProfile`, {method: 'POST', body, headers})«`  (url-control=PARTIAL)
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L40:C8 -> L40:C80  `»fetch(`https://${host}/getUserProfile`, {method: 'POST', body, headers})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (42 raw steps → 6 distinct lines):
   1. L33 `const { »remember, userid, host, learningLanguage, sourceLanguage« } = settings;`  · ELEMENT:destructure-property[remember], ELEMENT:destructure-property[userid], ELEMENT:destructure-property[host], ELEMENT:destructure-property[learningLanguage], ELEMENT:destructure-property[sourceLanguage]
   2. L36 `'Cookie': »`remember="${remember}";userid=${userid}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   3. L34 (→L37) `»    let headers = {«`  · ELEMENT:object.setProperty
   4. L40 (→L62) `fetch(»`https://${host}/getUserProfile`, {method: 'POST', body, headers})«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
   5. L51 `if (»sourceLanguage« !== targetLang) {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L54 `if (»!sourceLanguage«) {`  · ASSIGN:identifier, ASSIGN:unary

---

## Flow #10 — CHROME_COOKIES_ONCHANGED

- **Source**: `CHROME_COOKIES_ONCHANGED` — `storage` L94:C16 -> L94:C26  `if (»changeInfo«.cookie.domain === formattedHost && changeInfo.cookie.name === "remember") {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (remember) — `storage` L95:C16 -> L95:C104  `»chrome.storage.local.set({remember: changeInfo.removed ? '' :  changeInfo.cookie.value})«`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L101:C16 -> L101:C164  `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 7 distinct lines):
   1. L94 `if (»changeInfo.cookie.domain === formattedHost && changeInfo.cookie.name === "remember"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L95 `»chrome.storage.local.set({remember: changeInfo.removed ? '' :  changeInfo.cookie.value})«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate, ELEMENT:object.setProperty
   3. L99 `} else if (»changeInfo.cookie.domain === formattedHost && changeInfo.cookie.name === "lang"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L96 `»!changeInfo.removed« && chrome.storage.local.get(null, getUserProfile);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   5. L100 `('langUpd', »changeInfo.cookie.value.slice(0, 2)«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L97 `»changeInfo.removed« && chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()});`  · ASSIGN:identifier, ELEMENT:member-element
   7. L101 `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #11 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `storage` L101:C80 -> L101:C104  `chrome.storage.local.set({targetLanguage: changeInfo.removed ?  »navigator.language.slice«(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L101:C16 -> L101:C164  `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L97:C38 -> L97:C138  `changeInfo.removed && »chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()})«;`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L84:C4 -> L84:C139  `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (13 raw steps → 3 distinct lines):
   1. L101 _(in `storage`)_ `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent, ELEMENT:object.setProperty
   2. L97 _(in `storage`)_ `changeInfo.removed && »chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()})«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
   3. L84 _(in `storage`)_ `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #12 — NAVIGATOR_PLATFORM (navigator.platform)

- **Source**: `NAVIGATOR_PLATFORM` — `storage` L84:C99 -> L84:C125  `chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: »navigator.platform.indexOf«('Mac') > -1})`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (isMac) — `storage` L84:C4 -> L84:C139  `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L84 _(in `storage`)_ `»chrome.storage.local.set({targetLanguage: navigator.language.slice(0, 2).toLowerCase(), isMac: navigator.platform.indexOf('Mac') > -1})«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ELEMENT:object.setProperty

---

## Flow #13 — STORAGE_ALL_ITEMS (storage.all.items[local])  ·  5× duplicate paths collapsed

- **Source**: `STORAGE_ALL_ITEMS` — `background` L101:C0 -> L101:C51  `»chrome.runtime.onMessage.addListener(handleMessage)«;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L54:C4 -> L54:C47  `»fetch(url, {method: "POST", body, headers})«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L54:C4 -> L54:C47  `»fetch(url, {method: "POST", body, headers})«`
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L54:C4 -> L54:C47  `»fetch(url, {method: "POST", body, headers})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (48 raw steps → 2 distinct lines):
   1. L101 `»chrome.runtime.onMessage.addListener(handleMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L54 (→L95) `fetch(»url, {method: "POST", body, headers})«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #14 — ELEMENT_VALUE (ll-popup-translations-input)

- **Source**: `ELEMENT_VALUE` — `background` L101:C0 -> L101:C51  `»chrome.runtime.onMessage.addListener(handleMessage)«;`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background` L54:C4 -> L54:C47  `»fetch(url, {method: "POST", body, headers})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L101 `»chrome.runtime.onMessage.addListener(handleMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L54 (→L95) `fetch(url, {method: "POST", »body, headers})«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #15 — CHROME_COOKIES_ONCHANGED

- **Source**: `CHROME_COOKIES_ONCHANGED` — `storage` L94:C16 -> L94:C26  `if (»changeInfo«.cookie.domain === formattedHost && changeInfo.cookie.name === "remember") {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (remember) — `storage` L95:C16 -> L95:C104  `»chrome.storage.local.set({remember: changeInfo.removed ? '' :  changeInfo.cookie.value})«`
  - `CHROME_LOCAL_STORAGE` (targetLanguage) — `storage` L101:C16 -> L101:C164  `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 7 distinct lines):
   1. L94 _(in `storage`)_ `if (»changeInfo.cookie.domain === formattedHost && changeInfo.cookie.name === "remember"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L95 _(in `storage`)_ `»chrome.storage.local.set({remember: changeInfo.removed ? '' :  changeInfo.cookie.value})«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate, ELEMENT:object.setProperty
   3. L99 _(in `storage`)_ `} else if (»changeInfo.cookie.domain === formattedHost && changeInfo.cookie.name === "lang"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L96 _(in `storage`)_ `»!changeInfo.removed« && chrome.storage.local.get(null, getUserProfile);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   5. L100 _(in `storage`)_ `('langUpd', »changeInfo.cookie.value.slice(0, 2)«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L97 _(in `storage`)_ `»changeInfo.removed« && chrome.storage.local.set({userid: '', targetLanguage: navigator.language.slice(0, 2).toLowerCase()});`  · ASSIGN:identifier, ELEMENT:member-element
   7. L101 _(in `storage`)_ `»chrome.storage.local.set({targetLanguage: changeInfo.removed ?  navigator.language.slice(0, 2).toLowerCase() : changeInfo.cookie.value.slice(0, 2)})«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---

## Flow #16 — STORAGE_ALL_ITEMS (storage.all.items[local])  ·  2× duplicate paths collapsed

- **Source**: `STORAGE_ALL_ITEMS` — `background` L33:C12 -> L33:C20  `cons»t tabInf«o = await chrome.tabs.get(tab.tabId);`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L40:C8 -> L40:C80  `»            console.log('Content script not loaded in tab (tabChanged):'«, tabInfo.url);`  (url-control=PARTIAL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L40:C8 -> L40:C80  `»            console.log('Content script not loaded in tab (tabChanged):'«, tabInfo.url);`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 6 distinct lines):
   1. L33 _(in `storage`)_ `const { »remember, userid, host, learningLanguage, sourceLanguage« } = settings;`  · ELEMENT:destructure-property[remember], ELEMENT:destructure-property[userid], ELEMENT:destructure-property[host], ELEMENT:destructure-property[learningLanguage], ELEMENT:destructure-property[sourceLanguage]
   2. L36 _(in `storage`)_ `'Cookie': »`remember="${remember}";userid=${userid}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   3. L34 (→L37) `»«`  · ELEMENT:object.setProperty
   4. L40 (→L62) `»      console.log('Content script not loaded in tab (tabChanged):', tabInfo.url);«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
   5. L51 _(in `storage`)_ `if (»sourceLanguage« !== targetLang) {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L54 `fetch(url, {meth»od: "POST", bod«y, headers})`  · ASSIGN:identifier, ASSIGN:unary

---

## Flow #17 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L69:C55 -> L69:C61  `sendResponse({ transcription, translate, so»und_ur«l });`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userid) — `storage` L69:C12 -> L69:C74  `»chrome.storage.local.set({userid: cookie ? cookie.value : ''})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L69 _(in `storage`)_ `»chrome.storage.local.set({userid: cookie ? cookie.value : ''})«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty

---

## Flow #18 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `storage` L71:C61 -> L71:C67  `chrome.storage.local.set({remember: cookie ? »cookie«.value : ''})`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (remember) — `storage` L71:C16 -> L71:C80  `»chrome.storage.local.set({remember: cookie ? cookie.value : ''})«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L71 _(in `storage`)_ `»chrome.storage.local.set({remember: cookie ? cookie.value : ''})«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty

---

## Flow #19 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `popup/popup` L204:C16 -> L204:C24  `const { »remember«, userid, pageText, pageTitle, host, sourceLanguage, fetching } = restored;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup/popup` L209:C12 -> L209:C183  `»fetch(`https://${host}/SetJungleContent`, {method: 'POST', body: data, headers: { 'Content-type': 'application/json','Cookie': `remember="${remember}";userid=${userid}`}})«`  (url-control=PARTIAL)
  - `FETCH_HEADERS` ([Unknown URL]) — `popup/popup` L209:C12 -> L209:C183  `»fetch(`https://${host}/SetJungleContent`, {method: 'POST', body: data, headers: { 'Content-type': 'application/json','Cookie': `remember="${remember}";userid=${userid}`}})«`
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L209:C12 -> L209:C183  `»fetch(`https://${host}/SetJungleContent`, {method: 'POST', body: data, headers: { 'Content-type': 'application/json','Cookie': `remember="${remember}";userid=${userid}`}})«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (45 raw steps → 5 distinct lines):
   1. L204 `const { »remember, userid, pageText, pageTitle, host, sourceLanguage, fetching« } = restored;`  · ELEMENT:destructure-property[remember], ELEMENT:destructure-property[userid], ELEMENT:destructure-property[pageText], ELEMENT:destructure-property[pageTitle], ELEMENT:destructure-property[host], ELEMENT:destructure-property[sourceLanguage], ELEMENT:destructure-property[fetching]
   2. L206 `if (»!fetching && pageText«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   3. L208 `const »data = JSON.stringify({"apiVersion":"1.0.1", "port": 1001, "content":[{"contentId":null,"valueList":{"targetLang": sourceLanguage, "contentName": pageTitle,"contentText":pageText,"contentTags":[],"subtitleText":"","format":3,"embeddedUrl":"","publish":0,"pic":""}}],"ctx":{"config":{"isCheckData":true,"isLogging":true}}})«`  · ASSIGN:identifier, ELEMENT:object.setProperty, RETURN:json.stringify
   4. L209 (→L219) `fetch(»`https://${host}/SetJungleContent`, {method: 'POST', body: data, headers: { 'Content-type': 'application/json','Cookie': `remember="${remember}";userid=${userid}`}})«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
   5. L213 `const url = »`https://${host.split('.')[1] + '.' + host.split('.')[2]}/ru/jungle/${success[0].contentId}`«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:template-literal

---

## Flow #20 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `popup/popup` L238:C16 -> L238:C24  `const { »remember«, userid, historyTranslations, host, notify, fetching } = settings;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup/popup` L266:C16 -> L266:C82  `»fetch(`https://${host}/SetWords`, {method: 'POST', body, headers})«`  (url-control=PARTIAL)
  - `FETCH_HEADERS` ([Unknown URL]) — `popup/popup` L266:C16 -> L266:C82  `»fetch(`https://${host}/SetWords`, {method: 'POST', body, headers})«`
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L266:C16 -> L266:C82  `»fetch(`https://${host}/SetWords`, {method: 'POST', body, headers})«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (26 raw steps → 9 distinct lines):
   1. L238 `const { »remember, userid, historyTranslations, host, notify, fetching« } = settings;`  · ELEMENT:destructure-property[remember], ELEMENT:destructure-property[userid], ELEMENT:destructure-property[historyTranslations], ELEMENT:destructure-property[host], ELEMENT:destructure-property[notify], ELEMENT:destructure-property[fetching]
   2. L239 `if (»!fetching«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L241 `if (»remember«) {`  · ASSIGN:identifier
   4. L247 `'Cookie': »`remember="${remember}";userid=${userid}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L245 (→L248) `»                let headers = {«`  · ELEMENT:object.setProperty
   6. L252 `"userId": »userid«,`  · ASSIGN:identifier
   7. L250 (→L264) `»                const body = JSON.stringify({«`  · ELEMENT:object.setProperty, RETURN:json.stringify
   8. L266 (→L289) `fetch(»`https://${host}/SetWords`, {method: 'POST', body, headers})«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
   9. L275 (→L279) `»historyTranslations.map((transObj, i) => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #21 — ELEMENT_VALUE (translate-input)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L258:C45 -> L258:C49  `"wordValue": »word«,`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L266:C16 -> L266:C82  `»fetch(`https://${host}/SetWords`, {method: 'POST', body, headers})«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (8 raw steps → 3 distinct lines):
   1. L258 `"wordValue": »word«,`  · ASSIGN:identifier
   2. L250 (→L264) `»                const body = JSON.stringify({«`  · ELEMENT:object.setProperty, RETURN:json.stringify
   3. L266 (→L289) `fetch(`https://${host}/SetWords`, {method: 'POST', »body, headers})«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #22 — ELEMENT_VALUE (translate-input)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L310:C12 -> L310:C16  `if (»text«) {`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L329:C12 -> L329:C83  `»fetch(`https://${host}/gettranslates`, {method: 'POST', body, headers})«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (21 raw steps → 4 distinct lines):
   1. L310 `if (»text«) {`  · ASSIGN:identifier
   2. L320 `"text": »text«,`  · ASSIGN:identifier
   3. L315 (→L327) `»            const body = JSON.stringify(«`  · ELEMENT:object.setProperty, RETURN:json.stringify
   4. L329 (→L366) `fetch(`https://${host}/gettranslates`, {method: 'POST', »body, headers})«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #23 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `popup/popup` L308:C16 -> L308:C24  `const { »remember«, userid, targetLanguage, sourceLanguage, host, lastInput } = settings;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup/popup` L329:C12 -> L329:C83  `»fetch(`https://${host}/gettranslates`, {method: 'POST', body, headers})«`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `popup/popup` L329:C12 -> L329:C83  `»fetch(`https://${host}/gettranslates`, {method: 'POST', body, headers})«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (69 raw steps → 6 distinct lines):
   1. L308 `const { »remember, userid, targetLanguage, sourceLanguage, host, lastInput« } = settings;`  · ELEMENT:destructure-property[remember], ELEMENT:destructure-property[userid], ELEMENT:destructure-property[targetLanguage], ELEMENT:destructure-property[sourceLanguage], ELEMENT:destructure-property[host], ELEMENT:destructure-property[lastInput]
   2. L322 `"source": »sourceLanguage«,`  · ASSIGN:identifier
   3. L315 (→L327) `»            const body = JSON.stringify(«`  · ELEMENT:object.setProperty, RETURN:json.stringify
   4. L323 `"target": targetLanguage === "en" ? "en-US" : »targetLanguage«`  · ASSIGN:identifier, ASSIGN:conditional-alternate
   5. L329 (→L366) `fetch(»`https://${host}/gettranslates`, {method: 'POST', body, headers})«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
   6. L334 `if (»lastInput« !== document.getElementsByClassName("translate-input")[0].value) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #24 — ELEMENT_VALUE (translate-input)

- **Source**: `ELEMENT_VALUE` — `popup/popup` L405:C45 -> L405:C49  `chrome.storage.local.set({lastInput: »text«}, () => getTranslates())`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (lastInput) — `popup/popup` L405:C8 -> L405:C74  `»chrome.storage.local.set({lastInput: text}, () => getTranslates())«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L405 `»chrome.storage.local.set({lastInput: text}, () => getTranslates())«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #25 — ELEMENT_VALUE (dev-input)

- **Source**: `ELEMENT_VALUE` — `pages/settings/settings` L26:C22 -> L26:C26  `const clearHost = »host«.split('.')[1] + '.' + host.split('.')[2];`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (host) — `pages/settings/settings` L27:C4 -> L27:C36  `»chrome.storage.local.set({host})«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `pages/settings/settings` L28:C4 -> L28:C53  `»chrome.tabs.create({url: 'https://' + clearHost})«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (16 raw steps → 3 distinct lines):
   1. L26 `const clearHost = »host.split('.')[1] + '.' + host.split('.')[2]«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
   2. L27 `»chrome.storage.local.set({host})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L28 `»chrome.tabs.create({url: 'https://' + clearHost})«;`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty

---
