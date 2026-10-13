# Source-level Taint Flow — abfimpkhacgimamjbiegeoponlepcbob 1.0.4

- Source type: CRX
- Files with issues: 3 / 6
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L580:C4 -> L583:C6 (spans to L583)  `»browser.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.seedr.cc/api/token) — `background` L116:C29 -> L119:C8 (spans to L119)  `chrome.tabs.sendM»essage(tabs[0].id, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (152 raw steps → 9 distinct lines):
   1. L580 (→L583) `»    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L107 (→L112) `»        const extMatch = /\.([^.]+)$/.exec(filename);«`  · ELEMENT:object.setProperty
   3. L47 (→L53) `»   chrome.tabs.sendMessage(tab.id, {«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L48 `»     « type: "add_torrent",`  · ASSIGN:identifier
   5. L49 _(in `oauth`)_ `formData.append(»key, value.data, value.filename«);`  · ASSIGN:identifier, ELEMENT:member-element
   6. L46 _(in `oauth`)_ `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
   7. L51 _(in `oauth`)_ `formData.append(»key, value«);`  · ASSIGN:identifier
   8. L116 (→L119) `»            chrome.tabs.sendMessage(tabs[0].id, {«`  · ELEMENT:object.setProperty
   9. L585 (→L588) `»    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L593:C26 -> L593:C33  `external_listener(»request«, sender, sendResponse);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (access_token) — `background` L21:C5 -> L28:C7 (spans to L28)  `»   chrome.runtime.sendMessage({type: 'keep_alive'});«`
  - `CHROME_LOCAL_STORAGE` (refresh_token) — `background` L21:C5 -> L28:C7 (spans to L28)  `»   chrome.runtime.sendMessage({type: 'keep_alive'});«`
  - `CHROME_LOCAL_STORAGE` (username) — `background` L21:C5 -> L28:C7 (spans to L28)  `»   chrome.runtime.sendMessage({type: 'keep_alive'});«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (66 raw steps → 17 distinct lines):
   1. L593 `external_listener(»request«, sender, sendResponse);`  · ASSIGN:identifier
   2. L535 `if (»request.func« == 'login') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L536 `await »oauth.login(request.username, request.access_token, 3600 * 12, request.refresh_token«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
   4. L176 _(in `oauth`)_ `this.username = »username«;`  · ASSIGN:identifier
   5. L10 (→L253) `»    'torrent_added': -1,«`  · ELEMENT:object.setProperty
   6. L177 `addC»lass: 'seedr«-button seedr-reset seedr-button-success',`  · ASSIGN:identifier
   7. L178 `text:» 'Upgrade for« more Slots +',`  · ASSIGN:identifier
   8. L181 _(in `oauth`)_ `await s_storage.set('access_token', »access_token«);`  · ASSIGN:identifier
   9. L15 _(in `storage`)_ `this.settings[setting] = »value«;`  · ASSIGN:identifier
  10. L1 (→L64) `»console.log('test')«`  · ELEMENT:object.setProperty
  11. L17 _(in `oauth`)_ `refreshTimeout»: nul«l,`  · ASSIGN:identifier
  12. L16 `const i»s_fire«fox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;`  · ELEMENT:object.setProperty
  13. L25 _(in `storage`)_ `console.log(»'Setting ' + setting + ' : ' + value« + ' saved');`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  14. L30 `const downl»oad_l«istener = async (item, suggest) => {`  · ASSIGN:identifier
  15. L182 _(in `oauth`)_ `await s_storage.set('refresh_token', »refresh_token«);`  · ASSIGN:identifier
  16. L183 _(in `oauth`)_ `await s_storage.set('username', »username«);`  · ASSIGN:identifier
  17. L537 `} else if (»request.func« == 'logout') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L598:C26 -> L598:C33  `external_listener(»request«, sender, sendResponse);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (access_token) — `background` L21:C5 -> L28:C7 (spans to L28)  `»   chrome.runtime.sendMessage({type: 'keep_alive'});«`
  - `CHROME_LOCAL_STORAGE` (refresh_token) — `background` L21:C5 -> L28:C7 (spans to L28)  `»   chrome.runtime.sendMessage({type: 'keep_alive'});«`
  - `CHROME_LOCAL_STORAGE` (username) — `background` L21:C5 -> L28:C7 (spans to L28)  `»   chrome.runtime.sendMessage({type: 'keep_alive'});«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (65 raw steps → 17 distinct lines):
   1. L598 `external_listener(»request«, sender, sendResponse);`  · ASSIGN:identifier
   2. L535 `if (»request.func« == 'login') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L536 `await oauth.login(»request.username, request.access_token, 3600 * 12, request.refresh_token«);`  · ASSIGN:identifier, ELEMENT:member-element
   4. L176 _(in `oauth`)_ `this.username = »username«;`  · ASSIGN:identifier
   5. L10 (→L253) `»    'torrent_added': -1,«`  · ELEMENT:object.setProperty
   6. L177 `addC»lass: 'seedr«-button seedr-reset seedr-button-success',`  · ASSIGN:identifier
   7. L178 `text:» 'Upgrade for« more Slots +',`  · ASSIGN:identifier
   8. L181 _(in `oauth`)_ `await s_storage.set('access_token', »access_token«);`  · ASSIGN:identifier
   9. L15 _(in `storage`)_ `this.settings[setting] = »value«;`  · ASSIGN:identifier
  10. L1 (→L64) `»console.log('test')«`  · ELEMENT:object.setProperty
  11. L17 _(in `oauth`)_ `refreshTimeout»: nul«l,`  · ASSIGN:identifier
  12. L16 `const i»s_fire«fox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;`  · ELEMENT:object.setProperty
  13. L25 _(in `storage`)_ `console.log(»'Setting ' + setting + ' : ' + value« + ' saved');`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  14. L30 `const downl»oad_l«istener = async (item, suggest) => {`  · ASSIGN:identifier
  15. L182 _(in `oauth`)_ `await s_storage.set('refresh_token', »refresh_token«);`  · ASSIGN:identifier
  16. L183 _(in `oauth`)_ `await s_storage.set('username', »username«);`  · ASSIGN:identifier
  17. L537 `} else if (»request.func« == 'logout') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---
