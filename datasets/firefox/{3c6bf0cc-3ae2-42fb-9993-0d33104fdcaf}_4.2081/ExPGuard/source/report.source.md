# Source-level Taint Flow — {3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf} 4.2081

- Source type: XPI
- Files with issues: 14 / 27
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 39 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_TEXT_CONTENT (#it-messages-from-youtube)

- **Source**: `ELEMENT_TEXT_CONTENT` — `js&css/extension/init` L167:C24 -> L167:C31  `message = JSON.parse(»message«);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `js&css/extension/init` L276:C4 -> L276:C62  `»chrome.storage.local.set({ [message.key]: message.value })«;`
  - `CHROME_LOCAL_STORAGE` (watched) — `js&css/extension/init` L271:C3 -> L273:C5 (spans to L273)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (watched) — `js&css/extension/www.youtube.com/general/general` L700:C2 -> L702:C4 (spans to L702)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (12495 raw steps → 43 distinct lines):
   1. L167 `message = »JSON.parse(message)«;`  · ASSIGN:identifier, RETURN:json.parse
   2. L174 `if (»message.requestOptionsUrl« === true) {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L178 `} else if (»message.onlyOnePlayer« === true) {`  · ELEMENT:member-element, ASSIGN:binary-left
   4. L182 `} else if (»message.action« === 'fixPopup') {`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L185 `width: »message.width«,`  · ELEMENT:member-element
   6. L183 (→L188) `»			chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   7. L186 `height: »message.height«,`  · ELEMENT:member-element
   8. L187 `title: »message.title«,`  · ELEMENT:member-element
   9. L189 `} else if (»message.action« === 'analyzer') {`  · ELEMENT:member-element, ASSIGN:binary-left
  10. L217 `} else if (»message.action« === 'blocklist') {`  · ELEMENT:member-element, ASSIGN:binary-left
  11. L191 `var data = »message.name«,`  · ELEMENT:member-element
  12. L256 `} else if (»message.action« === 'watched') {`  · ELEMENT:member-element, ASSIGN:binary-left
  13. L274 `} else if (»message.action« === 'set') {`  · ELEMENT:member-element, ASSIGN:binary-left
  14. L222 `switch (»message.type«) {`  · ELEMENT:member-element
  15. L275 `if (»message.value«) {`  · ELEMENT:member-element
  16. L261 `if (»message.type« === 'add') {`  · ELEMENT:member-element, ASSIGN:binary-left
  17. L276 `»chrome.storage.local.set({ [message.key]: message.value })«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  18. L278 `»chrome.storage.local.remove([message.key])«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  19. L263 `title: »message.title«`  · ELEMENT:member-element
  20. L262 (→L264) `extension.storage.data.watched[»message.id] = {«`  · ELEMENT:object.setProperty, ELEMENT:member-element
  21. L258 `»extension.storage.data.watched = {}«;`  · ELEMENT:object.setProperty
  22. L227 `if (»message.added«) {`  · ELEMENT:member-element
  23. L267 `if (»message.type« === 'remove') {`  · ELEMENT:member-element, ASSIGN:binary-left
  24. L229 `title: »message.title«,`  · ELEMENT:member-element
  25. L228 (→L232) `extension.storage.data.blocklist.channels[»message.id] = {«`  · ELEMENT:object.setProperty, ELEMENT:member-element
  26. L230 `preview: »message.preview«,`  · ELEMENT:member-element
  27. L231 `when: »message.when«`  · ELEMENT:member-element
  28. L225 `»extension.storage.data.blocklist.channels = {}«;`  · ELEMENT:object.setProperty
  29. L242 `if (»message.added«) {`  · ELEMENT:member-element
  30. L244 `title: »message.title«,`  · ELEMENT:member-element
  31. L243 (→L246) `extension.storage.data.blocklist.videos[»message.id] = {«`  · ELEMENT:object.setProperty, ELEMENT:member-element
  32. L245 `when: »message.when«`  · ELEMENT:member-element
  33. L240 `»extension.storage.data.blocklist.videos = {}«;`  · ELEMENT:object.setProperty
  34. L271 (→L273) `»			chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  35. L207 `if (!extension.storage.data.analyzer[date][hours][»data«]) {`  · ASSIGN:identifier
  36. L208 `extension.storage.data.analyzer[date][hours][»data«] = 0;`  · ASSIGN:identifier
  37. L211 `extension.storage.data.analyzer[date][hours][»data«]++;`  · ASSIGN:identifier
  38. L254 `blocklist»: extension.«storage.data.blocklist`  · ELEMENT:computed-member-unknown-alternative, ASSIGN:identifier, ELEMENT:member-element-container
  39. L253 _(in `js&css/extension/www.youtube.com/general/general`)_ `/*-----»---------------------------«------------------------------`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  40. L653 _(in `js&css/extension/www.youtube.com/general/general`)_ `if (»extension.storage.get('watched') && extension.storage.get('watched')[button.dataset.id]«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
  41. L622 _(in `js&css/extension/www.youtube.com/general/general`)_ `if (»extension.storage.get('watched') && extension.storage.get('watched')[id]«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
  42. L696 (→L698) _(in `js&css/extension/www.youtube.com/general/general`)_ `»		extension.storage.get('watched')[id] = {«`  · ELEMENT:implicit.add
  43. L700 (→L702) _(in `js&css/extension/www.youtube.com/general/general`)_ `»		chrome.storage.local.set({«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_TEXT_CONTENT (#it-messages-from-youtube)

- **Source**: `ELEMENT_TEXT_CONTENT` — `background` L284:C0 -> L387:C2 (spans to L387)  `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background` L354:C5 -> L354:C32  `»chrome.windows.create(data)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11 raw steps → 6 distinct lines):
   1. L284 (→L387) `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js&css/extension/init->background]`
   2. L347 `width: »parseInt(message.width, 10)«,`  · RETURN:parseInt
   3. L345 (→L351) `»						  data = { type: 'popup',«`  · ELEMENT:object.setProperty
   4. L348 `height: »parseInt(message.height, 10)«,`  · RETURN:parseInt
   5. L358 `if (»tabId === tID && changeInfo.status === 'complete' && !message.title.startsWith("undefined")«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
   6. L360 `chrome.scripting.executeScript({ target: { tabId: tID }, func: () => { document.title = »`${message.title} - ImprovedTube`«; } });			//manifest3`  · ASSIGN:template-literal

---
