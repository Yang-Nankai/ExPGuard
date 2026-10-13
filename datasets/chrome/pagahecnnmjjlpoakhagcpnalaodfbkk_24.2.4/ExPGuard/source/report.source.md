# Source-level Taint Flow — pagahecnnmjjlpoakhagcpnalaodfbkk 24.2.4

- Source type: CRX
- Files with issues: 3 / 6
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `src/content-script` L402:C61 -> L402:C70  `if (msg.source !== $sa_selector.contentWindow && »!msg.data«) return;`
- **Sink(s)**:
  - `JQUERY_ELEMENT_TEXT_SET` (<div/>) — `src/content-script` L261:C12 -> L261:C41  `»$text.text(data.file.summary)«;`
  - `JQUERY_ELEMENT_TEXT_SET` (<div/>) — `src/content-script` L283:C12 -> L283:C32  `»$text.text(linkInfo)«;`
  - `JQUERY_ELEMENT_VAL_SET` (textarea#_chatText) — `src/content-script` L370:C20 -> L370:C55  `»$input.val(`${text}${data.link}\n`)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (385 raw steps → 40 distinct lines):
   1. L402 `if (»msg.source !== $sa_selector.contentWindow && !msg.data«) return;`  · ASSIGN:unary, ASSIGN:logical-right
   2. L406 `if (»data.type« === 'send-link') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L407 `on_complete(»data«);`  · ASSIGN:identifier
   4. L340 `if (»service === 'gmail' && composeView && data«) {`  · ASSIGN:identifier, ASSIGN:logical-right
   5. L341 `const attachment = create_attachment_tag_ele(»data«);`  · ASSIGN:identifier
   6. L209 `if (»!data«) {`  · ASSIGN:identifier, ASSIGN:unary
   7. L259 `if (»data.file.summary«) {`  · ASSIGN:identifier, ELEMENT:member-element
   8. L261 `$text.text(»data.file.summary«);`  · ASSIGN:identifier, ELEMENT:member-element
   9. L277 `const »fileCount = data.file.count > 1 ? chrome.i18n.getMessage('more_files', [data.file.count - 1]) : null«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
  10. L278 `const »linkInfo = `${getFileSize(data.file.size)} • ${getExpirationTime(data.expires_at)}`«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:template-literal
  11. L511 `if (»n« <= 1024) {`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L512 `return »n« + ' B';`  · ASSIGN:identifier, ASSIGN:binary-left
  13. L513 `} else if (»n« <= 1024 * 1024) {`  · ASSIGN:identifier, ASSIGN:binary-left
  14. L514 `return »Math.round(n / 1024 * 100) / 100.0« + ' KB';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.round
  15. L515 `} else if (»n« <= 1024 * 1024 * 1024) {`  · ASSIGN:identifier, ASSIGN:binary-left
  16. L516 `return »Math.round(n / 1024 / 1024 * 100) / 100.0« + ' MB';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.round
  17. L518 `return »Math.round(n / 1024 / 1024 / 1024 * 100) / 100.0« + ' GB';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.round
  18. L524 `const diff = »Math.trunc(time - now / 1000)«;`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.trunc
  19. L525 `const hours = »Math.trunc(diff / 3600)«;`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.trunc
  20. L526 `const remainedMinutes = »Math.ceil((diff - hours * 60 * 60) / 60)«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.ceil
  21. L528 `if (»diff« < 0) {`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L533 `? chrome.i18n.getMessage('expiration_time_hm', [»hours, remainedMinutes«])`  · ASSIGN:identifier
  23. L532 (→L534) `»    return hours > 0«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  24. L534 `: chrome.i18n.getMessage('expiration_time_m', [»hours, remainedMinutes«]);`  · ASSIGN:identifier
  25. L283 `$text.text(»linkInfo«);`  · ASSIGN:identifier
  26. L312 `const linkText = »data.link.replace(/(^\w+:|^)\/\//, '')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  27. L313 `const $link = $(»`<a href=${data.link}>${linkText}</a>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  28. L348 `} else if (»service === 'editable' && data && right_click_ele«) {`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:logical-left
  29. L366 `} else if (»service === 'chatwork' && data«) {`  · ASSIGN:identifier, ASSIGN:logical-right
  30. L373 `} else if (»service === 'slack' && data«) {`  · ASSIGN:identifier, ASSIGN:logical-right
  31. L409 `} else if (»data.type« === 'close-extension') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  32. L411 `} else if (»data.type« === 'update-setting') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L412 `sendBackgroundMessage(»data«);`  · ASSIGN:identifier
  34. L538 `chrome.runtime.sendMessage(chrome.runtime.id, »msg«, function(res) {`  · ASSIGN:identifier
  35. L379 `$input.text(»text + data.link« + '\n');`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
  36. L370 `$input.val(»`${text}${data.link}\n`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  37. L349 `const input_id = »right_click_ele.element«;`  · ELEMENT:member-element-container
  38. L351 `if (»right_click_ele.insert_type« === 'value') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  39. L355 `$input.val(»text + data.link« + '\n');`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
  40. L393 `const input = »right_click_ele.element«;`  · ELEMENT:member-element-container

---

## Flow #2 — JQUERY_ELEMENT_VAL (textarea#_chatText)

- **Source**: `JQUERY_ELEMENT_VAL` — `src/content-script` L370:C34 -> L370:C38  `$input.val(`${»text«}${data.link}\n`);`
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (textarea#_chatText) — `src/content-script` L370:C20 -> L370:C55  `»$input.val(`${text}${data.link}\n`)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L370 `$input.val(»`${text}${data.link}\n`«);`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `src/service_worker` L142:C0 -> L179:C2 (spans to L179)  `»chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (options) — `src/service_worker` L156:C6 -> L156:C42  `»chrome.storage.sync.set({ options })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (494 raw steps → 23 distinct lines):
   1. L142 (→L179) `»chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[src/content-script->src/service_worker]`
   2. L147 `if (»msg.type« === 'update-setting') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L159 `} else if (»msg.type === 'storage_get' && msg.key«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L149 `if (»msg.name« === 'activateGmail') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L160 `chrome.storage.local.get(»msg.key«, (result) => {`  · ASSIGN:identifier, ELEMENT:member-element
   6. L161 `const value = result[»msg.key«];`  · ASSIGN:identifier, ELEMENT:member-element
   7. L165 `} else if (»msg.type === 'inboxsdk__injectPageWorld' && sender.tab«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   8. L150 `»options.gmail = msg.value« === true;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   9. L47 (→L48) `»const APP_DATA = {«`  · ELEMENT:object.setProperty
  10. L151 `} else if (»msg.name« === 'activateSlack') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L156 `»chrome.storage.sync.set({ options })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier
  12. L152 `»options.slack = msg.value« === true;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L153 `} else if (»msg.name« === 'activateChatwork') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  14. L70 `const »options = getAppData('options')«;`  · ELEMENT:implicit.add
  15. L71 `if (»options && (options.slack || options.chatwork)«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  16. L73 `if (»options.slack«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:implicit.add
  17. L76 `if (»options.chatwork«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:implicit.add
  18. L154 `»options.chatwork = msg.value« === true;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L52 `if (key) return »APP_DATA[key]«;`  · ELEMENT:member-element, ELEMENT:member-element-container
  20. L145 `const »options = getAppData('options')«;`  · ELEMENT:implicit.add
  21. L148 `if (»options«) {`  · ASSIGN:identifier
  22. L59 `const »oldValue = getAppData(key)«;`  · ELEMENT:implicit.add
  23. L61 `if (»typeof newValue !== 'object' && newValue === oldValue«) return;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right

---

## Flow #4 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `src/service_worker` L183:C41 -> L183:C52  `const options = res && res.options ? »res.options« : {};`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (options) — `src/service_worker` L191:C4 -> L191:C40  `»chrome.storage.sync.set({ options })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (19 raw steps → 9 distinct lines):
   1. L183 `const options = res && res.options ? »res.options« : {};`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   2. L191 `»chrome.storage.sync.set({ options })«;`  · ELEMENT:object.setProperty
   3. L61 `if (»typeof newValue !== 'object' && newValue === oldValue«) return;`  · ASSIGN:binary-left, ASSIGN:logical-right
   4. L47 (→L48) `»const APP_DATA = {«`  · ELEMENT:object.setProperty
   5. L52 `if (key) return »APP_DATA[key]«;`  · ELEMENT:member-element-container
   6. L70 `const »options = getAppData('options')«;`  · ELEMENT:implicit.add
   7. L71 `if (»options && (options.slack || options.chatwork)«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
   8. L73 `if (»options.slack«) {`  · ELEMENT:member-element-container
   9. L76 `if (»options.chatwork«) {`  · ELEMENT:member-element-container

---
