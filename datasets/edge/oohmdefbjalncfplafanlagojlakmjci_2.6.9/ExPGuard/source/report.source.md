# Source-level Taint Flow — oohmdefbjalncfplafanlagojlakmjci 2.6.9

- Source type: CRX
- Files with issues: 11 / 15
- Distinct taint flows: 22  (collapsed from 35 raw issue entries)
- Sinkless sources skipped: 62 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/content-script` L234:C31 -> L234:C65  `event.data.title = »event.data.title ?? document.title« ?? new Date().getTime().toString();`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L150:C20 -> L150:C44  `»window.postMessage(data)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L152:C20 -> L152:C36  `»fetch(data.data)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L156:C28 -> L156:C52  `»window.postMessage(data)«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L141:C16 -> L141:C43  `»window.postMessage(Message)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (243 raw steps → 27 distinct lines):
   1. L234 `»event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString()«;`  · ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty
   2. L235 `event.data.title = »event.data.title.replaceAll('"', "").replaceAll("'", "").replaceAll(" ", "")«;`  · ELEMENT:member-element, RETURN:fallback-return
   3. L247 `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
   4. L242 `»data = { ...event.data, ...data }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   5. L147 `const »data = { ...Message, ...item }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   6. L149 `if (»data.data« instanceof Blob) {`  · ELEMENT:member-element, ELEMENT:member-element-container
   7. L152 `fetch(»data.data«)`  · ELEMENT:member-element, ELEMENT:member-element-container
   8. L5 (→L172) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/content-script]; runtime.single.sender.message[js/popup->js/content-script]`
   9. L8 `if (»Message.Message« == "getVideoState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L56 `if (»Message.Message« == "speed") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L61 `if (»Message.Message« == "pip") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L72 `if (»Message.Message« == "fullScreen") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L85 `if (»Message.Message« == "play") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L90 `if (»Message.Message« == "pause") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L95 `if (»Message.Message« == "loop") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L100 `if (»Message.Message« == "setVolume") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L106 `if (»Message.Message« == "muted") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L111 `if (»Message.Message« == "setTime") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L118 `if (»Message.Message« == "screenshot") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L135 `if (»Message.Message« == "getKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  21. L139 `if (»Message.Message« == "ffmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L140 `if (»!Message.files«) {`  · ELEMENT:member-element-container, ASSIGN:unary
  23. L145 `Message.quantity ??= »Message.files.length«;`  · ELEMENT:member-element-container, ELEMENT:member.length
  24. L518 _(in `js/background`)_ `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty
  25. L146 `for (»let item of Message.files«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  26. L148 `data.type = »item.type ?? "video"«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  27. L163 `if (»Message.Message« == "getPage") {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content-script` L197:C12 -> L197:C23  `if (»!event.data« || !event.data.action || event.origin !== window.location.origin) { return; }`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L141:C16 -> L141:C43  `»window.postMessage(Message)«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L150:C20 -> L150:C44  `»window.postMessage(data)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L152:C20 -> L152:C36  `»fetch(data.data)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L156:C28 -> L156:C52  `»window.postMessage(data)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (609 raw steps → 60 distinct lines):
   1. L197 `if (»!event.data || !event.data.action || event.origin !== window.location.origin«) { return; }`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L198 `if (»event.data.action« == "catCatchAddMedia") {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L199 `if (»!event.data.url«) { return; }`  · ELEMENT:member-element, ASSIGN:unary
   4. L210 `if (»event.data.action« == "catCatchAddKey") {`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L211 `let key = »event.data.key«;`  · ELEMENT:member-element
   6. L228 `if (»event.data.action« == "catCatchFFmpeg") {`  · ELEMENT:member-element, ASSIGN:binary-left
   7. L202 `url: »event.data.url«,`  · ELEMENT:member-element
   8. L200 (→L208) `»            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   9. L203 `href: »event.data.href ?? event.source.location.href«,`  · ELEMENT:member-element, ASSIGN:logical-left
  10. L204 `extraExt: »event.data.ext«,`  · ELEMENT:member-element
  11. L205 `mime: »event.data.mime«,`  · ELEMENT:member-element
  12. L206 `requestHeaders: { referer: »event.data.referer« },`  · ELEMENT:member-element
  13. L207 `requestId: »event.data.requestId«`  · ELEMENT:member-element
  14. L212 `if (»key« instanceof ArrayBuffer || key instanceof Array) {`  · ASSIGN:identifier
  15. L229 (→L232) `if (»!event.data.use ||«`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  16. L230 `»!event.data.files« ||`  · ELEMENT:member-element, ASSIGN:unary
  17. L232 `»event.data.files.length« == 0`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  18. L245 `if (»event.data.action« == "catCatchFFmpegResult") {`  · ELEMENT:member-element, ASSIGN:binary-left
  19. L213 `»key = ArrayToBase64(key)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  20. L261 `let bytes = »new Uint8Array(data)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  21. L263 `for (let i = 0; i < »bytes.byteLength«; i++) {`  · ELEMENT:member-element, ASSIGN:binary-right
  22. L264 `binary += »String.fromCharCode(bytes[i])«;`  · ELEMENT:member-element, RETURN:string.fromCharCode
  23. L267 `return _btoa(»binary«);`  · ASSIGN:identifier
  24. L269 `return »btoa(binary)«;`  · ASSIGN:identifier, RETURN:btoa
  25. L246 `if (»!event.data.state || !event.data.tabId«) { return; }`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  26. L215 `if (_key.has(»key«)) { return; }`  · ASSIGN:identifier
  27. L234 `»event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString()«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  28. L235 `event.data.title = »event.data.title.replaceAll('"', "").replaceAll("'", "").replaceAll(" ", "")«;`  · ELEMENT:member-element, RETURN:fallback-return
  29. L247 `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
  30. L216 `_key.add(»key«);`  · ASSIGN:identifier
  31. L4 `var »_key = new Set()«;`  · ELEMENT:object.setProperty
  32. L220 `data: »key«,`  · ASSIGN:identifier
  33. L217 (→L221) `»            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  34. L242 `»data = { ...event.data, ...data }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  35. L224 `data: »key«,`  · ASSIGN:identifier
  36. L222 (→L226) `»            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  37. L136 `»sendResponse(Array.from(_key))«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  38. L5 (→L172) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/content-script]; runtime.single.sender.message[js/popup->js/content-script]`
  39. L8 `if (»Message.Message« == "getVideoState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  40. L56 `if (»Message.Message« == "speed") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  41. L61 `if (»Message.Message« == "pip") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  42. L72 `if (»Message.Message« == "fullScreen") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  43. L85 `if (»Message.Message« == "play") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  44. L90 `if (»Message.Message« == "pause") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  45. L95 `if (»Message.Message« == "loop") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  46. L100 `if (»Message.Message« == "setVolume") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  47. L106 `if (»Message.Message« == "muted") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  48. L111 `if (»Message.Message« == "setTime") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  49. L118 `if (»Message.Message« == "screenshot") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  50. L135 `if (»Message.Message« == "getKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  51. L139 `if (»Message.Message« == "ffmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  52. L140 `if (»!Message.files«) {`  · ELEMENT:member-element-container, ASSIGN:unary
  53. L145 `Message.quantity ??= »Message.files.length«;`  · ELEMENT:member-element-container, ELEMENT:member.length
  54. L518 _(in `js/background`)_ `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty
  55. L146 `for (»let item of Message.files«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  56. L147 `const »data = { ...Message, ...item }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  57. L148 `data.type = »item.type ?? "video"«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  58. L149 `if (»data.data« instanceof Blob) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  59. L163 `if (»Message.Message« == "getPage") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  60. L152 `fetch(»data.data«)`  · ELEMENT:member-element, ELEMENT:member-element-container

---

## Flow #3 — JQUERY_ELEMENT_VAL (#videoIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/content-script` L5:C4 -> L172:C6 (spans to L172)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L141:C16 -> L141:C43  `»window.postMessage(Message)«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L150:C20 -> L150:C44  `»window.postMessage(data)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L152:C20 -> L152:C36  `»fetch(data.data)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L156:C28 -> L156:C52  `»window.postMessage(data)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (38 raw steps → 5 distinct lines):
   1. L5 (→L172) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/media-control->js/content-script]`
   2. L34 `Message.index = Message.index == -1 ? 0 : »Message.index«;`  · ASSIGN:conditional-alternate
   3. L147 `const »data = { ...Message, ...item }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   4. L149 `if (»data.data« instanceof Blob) {`  · ELEMENT:member-element, ELEMENT:member-element-container
   5. L152 `fetch(»data.data«)`  · ELEMENT:member-element, ELEMENT:member-element-container

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L318:C0 -> L548:C2 (spans to L548)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L887:C8 -> L887:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L891:C8 -> L891:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L901:C8 -> L918:C10 (spans to L918)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L922:C4 -> L924:C6 (spans to L924)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L521:C16 -> L525:C18 (spans to L525)  `»chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, function (tab) {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3776 raw steps → 87 distinct lines):
   1. L318 (→L548) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]; runtime.single.sender.message[js/popup->js/background]`
   2. L359 `if (»Message.Message == "getData" && Message.requestId«) {`  · ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left
   3. L325 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
   4. L247 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty
   5. L328 `if (»Message.Message« == "pushData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L334 `if (»Message.Message« == "getAllData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L343 `if (»Message.Message« == "ClearIcon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   8. L349 `if (»Message.Message« == "enable") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   9. L380 `if (»Message.Message« == "getData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L388 `if (»Message.Message« == "getButtonState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L401 `if (»Message.Message« == "mobileUserAgent") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L408 `if (»Message.Message« == "autoDown") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L419 `if (»Message.Message« == "script") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L456 `if (»Message.Message« == "scriptI18n") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L467 `if (»Message.Message« == "HeartBeat") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L477 `if (»Message.Message« == "clearData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L497 `if (»Message.Message« == "clearRedundant") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L503 `if (»Message.Message« == "addMedia") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L517 `if (»Message.Message« == "catCatchFFmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L539 `if (»Message.Message == "send2local" && G.send2local«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  21. L544 `if (»Message.Message« == "damnUrlHas") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L242 `»info.initiator = info.requestHead«ers?.referer ?? webInfo?.url;`  · ELEMENT:object.setProperty
  23. L344 `»Message.type ? SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:object.setProperty
  24. L887 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
  25. L891 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
  26. L361 `if (!Array.isArray(»Message.requestId«)) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  27. L362 `»Message.requestId = [Message.requestId]«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  28. L381 `sendResponse(cacheData[»Message.tabId«]);`  · ELEMENT:member-element-container
  29. L390 `MobileUserAgent: G.featMobileTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  30. L391 `AutoDown: G.featAutoDownTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  31. L365 `if (»Message.requestId.length«) {`  · ELEMENT:member-element-container, ELEMENT:member.length
  32. L402 `mobileUserAgent(»Message.tabId, !G.featMobileTabId.has(Message.tabId«));`  · ELEMENT:member-element-container
  33. L899 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
  34. L921 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
  35. L902 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  36. L901 (→L918) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  37. L904 `"id": »tabId«,`  · ASSIGN:identifier
  38. L914 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  39. L923 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  40. L922 (→L924) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  41. L403 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  42. L409 `if (G.featAutoDownTabId.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  43. L410 `G.featAutoDownTabId.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  44. L412 `G.featAutoDownTabId.add(»Message.tabId«);`  · ELEMENT:member-element-container
  45. L420 `if (G.damn && G.damnUrlSet.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  46. L368 `if (»Message.requestId.includes(data.requestId)«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  47. L458 `target: { tabId: »Message.tabId«, allFrames: true },`  · ELEMENT:member-element-container
  48. L457 (→L462) `»        chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  49. L479 `if (»Message.type«) {`  · ELEMENT:member-element
  50. L423 `if (!G.scriptList.has(»Message.script«)) {`  · ELEMENT:member-element
  51. L427 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  52. L488 `if (item == »Message.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  53. L518 `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member-element-container, ASSIGN:logical-left
  54. L429 `const refresh = »Message.refresh ?? script.refresh«;`  · ELEMENT:member-element, ASSIGN:logical-left
  55. L540 `try { send2local(»Message.action, Message.data, Message.tabId«); } catch (e) { console.log(e); }`  · ELEMENT:member-element-container, ELEMENT:member-element
  56. L430 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  57. L545 `sendResponse(G.damnUrlSet.has(»Message.tabId«));`  · ELEMENT:member-element-container
  58. L431 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  59. L439 `scriptTabid.add(»Message.tabId«);`  · ELEMENT:member-element-container
  60. L432 `if (»Message.script« == "search.js") {`  · ELEMENT:member-element, ASSIGN:binary-left
  61. L440 `if (»refresh«) {`  · ASSIGN:identifier
  62. L433 `G.deepSearchTemporarilyClose = »Message.tabId«;`  · ELEMENT:member-element-container
  63. L441 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  64. L443 `const »files = [`catch-script/${Message.script}`]«;`  · ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add
  65. L446 `target: { tabId: »Message.tabId«, allFrames: script.allFrames },`  · ELEMENT:member-element-container
  66. L445 (→L450) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  67. L435 `refresh && chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  68. L395 `state[item.key] = item.tabId.has(»Message.tabId«);`  · ELEMENT:member-element-container
  69. L506 `if (item.url == »Message.href«) {`  · ELEMENT:member-element, ASSIGN:binary-right
  70. L511 `»findMedia({ url: Message.url, tabId: -1, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, initiator: Message.href, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  71. L103 (→L105) `if (»data.initiator != "null" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  72. L104 `»data.initiator« != undefined &&`  · ASSIGN:binary-left
  73. L929 `if (»!url || url == "null"«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  74. L930 `return »!(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  75. L110 `if (»isSpecialPage(data.url)«) { return; }`  · ELEMENT:implicit.add
  76. L111 `const »urlParsing = new URL(data.url)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  77. L112 `let [name, ext] = fileNameParse(»urlParsing.pathname«);`  · ELEMENT:member-element
  78. L827 `let fileName = »decodeURI(pathname.split("/").pop())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURI
  79. L828 `let ext = »fileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  80. L829 `ext = ext.length == 1 ? undefined : »ext.pop().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  81. L830 `»return [fileName, ext ? ext : undefined];«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ELEMENT:implicit.add
  82. L198 `const »tabFingerprints = G.urlMap.get(data.tabId) || new Set()«;`  · ELEMENT:object.setProperty
  83. L204 `if (»tabFingerprints.size« >= 500) {`  · ELEMENT:member-element, ASSIGN:binary-left
  84. L205 `»tabFingerprints.clear«();`  · ELEMENT:member-element-container
  85. L507 `»findMedia({ url: Message.url, tabId: item.id, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  86. L521 (→L525) `chrome.tabs.create({ url: G.ffmpegConfig.url, active: »Message.active ?? true }, function (tab) {«`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  87. L254 (→L271) `»        chrome.runtime.sendMessage({ Message: "popupAddData", data: info }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/background]`

---

## Flow #5 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/background` L318:C0 -> L548:C2 (spans to L548)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L887:C8 -> L887:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L891:C8 -> L891:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L901:C8 -> L918:C10 (spans to L918)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L922:C4 -> L924:C6 (spans to L924)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L521:C16 -> L525:C18 (spans to L525)  `»chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, function (tab) {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3714 raw steps → 86 distinct lines):
   1. L318 (→L548) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]; runtime.single.sender.message[js/popup->js/background]`
   2. L325 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:member-element
   3. L247 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty
   4. L328 `if (»Message.Message« == "pushData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L334 `if (»Message.Message« == "getAllData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L343 `if (»Message.Message« == "ClearIcon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L349 `if (»Message.Message« == "enable") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   8. L359 `if (»Message.Message == "getData" && Message.requestId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   9. L380 `if (»Message.Message« == "getData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L388 `if (»Message.Message« == "getButtonState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L401 `if (»Message.Message« == "mobileUserAgent") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L408 `if (»Message.Message« == "autoDown") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L419 `if (»Message.Message« == "script") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L456 `if (»Message.Message« == "scriptI18n") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L467 `if (»Message.Message« == "HeartBeat") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L477 `if (»Message.Message« == "clearData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L497 `if (»Message.Message« == "clearRedundant") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L503 `if (»Message.Message« == "addMedia") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L517 `if (»Message.Message« == "catCatchFFmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L539 `if (»Message.Message == "send2local" && G.send2local«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  21. L544 `if (»Message.Message« == "damnUrlHas") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L242 `»info.initiator = info.requestHead«ers?.referer ?? webInfo?.url;`  · ELEMENT:object.setProperty
  23. L344 `»Message.type ? SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:object.setProperty
  24. L887 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
  25. L891 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
  26. L361 `if (!Array.isArray(»Message.requestId«)) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  27. L362 `»Message.requestId = [Message.requestId]«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  28. L381 `sendResponse(cacheData[»Message.tabId«]);`  · ELEMENT:member-element-container
  29. L390 `MobileUserAgent: G.featMobileTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  30. L391 `AutoDown: G.featAutoDownTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  31. L365 `if (»Message.requestId.length«) {`  · ELEMENT:member-element-container, ELEMENT:member.length
  32. L402 `mobileUserAgent(»Message.tabId, !G.featMobileTabId.has(Message.tabId«));`  · ELEMENT:member-element-container
  33. L899 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
  34. L921 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
  35. L902 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  36. L901 (→L918) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  37. L904 `"id": »tabId«,`  · ASSIGN:identifier
  38. L914 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  39. L923 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  40. L922 (→L924) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  41. L403 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  42. L409 `if (G.featAutoDownTabId.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  43. L410 `G.featAutoDownTabId.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  44. L412 `G.featAutoDownTabId.add(»Message.tabId«);`  · ELEMENT:member-element-container
  45. L420 `if (G.damn && G.damnUrlSet.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  46. L368 `if (»Message.requestId.includes(data.requestId)«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  47. L458 `target: { tabId: »Message.tabId«, allFrames: true },`  · ELEMENT:member-element-container
  48. L457 (→L462) `»        chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  49. L479 `if (»Message.type«) {`  · ELEMENT:member-element
  50. L423 `if (!G.scriptList.has(»Message.script«)) {`  · ELEMENT:member-element
  51. L427 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  52. L488 `if (item == »Message.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  53. L518 `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member-element-container, ASSIGN:logical-left
  54. L429 `const refresh = »Message.refresh ?? script.refresh«;`  · ELEMENT:member-element, ASSIGN:logical-left
  55. L540 `try { send2local(»Message.action, Message.data, Message.tabId«); } catch (e) { console.log(e); }`  · ELEMENT:member-element-container, ELEMENT:member-element
  56. L430 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  57. L545 `sendResponse(G.damnUrlSet.has(»Message.tabId«));`  · ELEMENT:member-element-container
  58. L431 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  59. L439 `scriptTabid.add(»Message.tabId«);`  · ELEMENT:member-element-container
  60. L432 `if (»Message.script« == "search.js") {`  · ELEMENT:member-element, ASSIGN:binary-left
  61. L440 `if (»refresh«) {`  · ASSIGN:identifier
  62. L433 `G.deepSearchTemporarilyClose = »Message.tabId«;`  · ELEMENT:member-element-container
  63. L441 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  64. L443 `const »files = [`catch-script/${Message.script}`]«;`  · ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add
  65. L446 `target: { tabId: »Message.tabId«, allFrames: script.allFrames },`  · ELEMENT:member-element-container
  66. L445 (→L450) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  67. L435 `refresh && chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  68. L395 `state[item.key] = item.tabId.has(»Message.tabId«);`  · ELEMENT:member-element-container
  69. L506 `if (item.url == »Message.href«) {`  · ELEMENT:member-element, ASSIGN:binary-right
  70. L511 `»findMedia({ url: Message.url, tabId: -1, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, initiator: Message.href, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  71. L103 (→L105) `if (»data.initiator != "null" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  72. L104 `»data.initiator« != undefined &&`  · ASSIGN:binary-left
  73. L929 `if (»!url || url == "null"«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  74. L930 `return »!(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  75. L110 `if (»isSpecialPage(data.url)«) { return; }`  · ELEMENT:implicit.add
  76. L111 `const »urlParsing = new URL(data.url)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  77. L112 `let [name, ext] = fileNameParse(»urlParsing.pathname«);`  · ELEMENT:member-element
  78. L827 `let fileName = »decodeURI(pathname.split("/").pop())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURI
  79. L828 `let ext = »fileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  80. L829 `ext = ext.length == 1 ? undefined : »ext.pop().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  81. L830 `»return [fileName, ext ? ext : undefined];«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ELEMENT:implicit.add
  82. L198 `const »tabFingerprints = G.urlMap.get(data.tabId) || new Set()«;`  · ELEMENT:object.setProperty
  83. L204 `if (»tabFingerprints.size« >= 500) {`  · ELEMENT:member-element, ASSIGN:binary-left
  84. L205 `»tabFingerprints.clear«();`  · ELEMENT:member-element-container
  85. L507 `»findMedia({ url: Message.url, tabId: item.id, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  86. L521 (→L525) `chrome.tabs.create({ url: G.ffmpegConfig.url, active: »Message.active ?? true }, function (tab) {«`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #6 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/background` L318:C0 -> L548:C2 (spans to L548)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L887:C8 -> L887:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L891:C8 -> L891:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L901:C8 -> L918:C10 (spans to L918)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L922:C4 -> L924:C6 (spans to L924)  `»chrome.declarativeNetRequest.updateSessionRules({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (207 raw steps → 15 distinct lines):
   1. L318 (→L548) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/popup->js/background]`
   2. L325 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ASSIGN:logical-left
   3. L488 `if (item == »Message.tabId«) { continue; }`  · ASSIGN:binary-right
   4. L344 `Message.type ? »SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:object.setProperty
   5. L887 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
   6. L891 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
   7. L899 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
   8. L921 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
   9. L902 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  10. L901 (→L918) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  11. L904 `"id": »tabId«,`  · ASSIGN:identifier
  12. L914 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  13. L923 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  14. L922 (→L924) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  15. L445 (→L450) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty

---

## Flow #7 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/init` L210:C14 -> L210:C42  `G.isFirefox = »navigator.userAgent.includes«('Firefox') && (typeof browser !== 'undefined' && !!browser.runtime?.getBrowserInfo);`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L308:C12 -> L308:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L312:C12 -> L312:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L316:C12 -> L316:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L320:C12 -> L320:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (622 raw steps → 39 distinct lines):
   1. L210 `G.isFirefox = »navigator.userAgent.includes('Firefox') && (typeof browser !== 'undefined' && !!browser.runtime?.getBrowserInfo)«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
   2. L43 `var »G = {}«;`  · ELEMENT:object.setProperty
   3. L211 `G.version = »navigator.userAgent.match(/(Chrome|Firefox)\/([\d]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
   4. L212 `G.version = G.version && G.version[2] ? »parseInt(G.version[2])« : 93;`  · ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   5. L326 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   6. L342 `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar«, function (items) {`  · ELEMENT:member-element-container
   7. L345 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   8. L356 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
   9. L380 (→L384) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L358 (→L365) `G.Ext = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  11. L388 (→L390) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L369 (→L376) `G.Type = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L394 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  14. L397 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  15. L398 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L401 `G[key] = »newValue«;`  · ASSIGN:identifier
  17. L264 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  18. L266 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  19. L269 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  20. L270 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  21. L275 (→L283) `items.Ext = new Map(»items.Ext.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  22. L271 `items[key] = »G.OptionLists[key]«;`  · ELEMENT:member-element-container
  23. L73 (→L198) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  24. L285 (→L293) `items.Type = new Map(»items.Type.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  25. L295 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  26. L301 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  27. L306 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  28. L307 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  29. L310 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  30. L308 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  31. L311 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  32. L314 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  33. L312 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  34. L315 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  35. L316 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  36. L324 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  37. L320 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  38. L332 `isLockUrl(tab.url) && »G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container
  39. L333 `isDamnUrl(tab.url) && »G.damnUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #8 — JQUERY_ELEMENT_VAL (From storage.session.set('mediaControl') in js/media-control)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/init` L51:C16 -> L51:C28  `G.urlMap = new M»ap();   // u«rl查重map`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L308:C12 -> L308:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L312:C12 -> L312:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L316:C12 -> L316:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L320:C12 -> L320:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1022 raw steps → 60 distinct lines):
   1. L51 `G.urlMap = new M»ap();   // u«rl查重map`  · ASSIGN:identifier, ASSIGN:binary-left
   2. L52 `G.deepSearchTemporari»lyClose = null; // 深度搜«索临时变量`  · ASSIGN:identifier, RETURN:parseInt
   3. L54 _(in `js/options`)_ `$("#AddExt").bind("click", funct»ion ()« {`  · ASSIGN:identifier
   4. L49 `G.blockUrlSe»t = ne«w Set();    // 屏蔽网址列表`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L104 _(in `js/media-control`)_ `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L138 _(in `js/function`)_ `rule»s.removeRuleIds.push(par«seInt(item.requestId));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   7. L145 _(in `js/options`)_ `GetText = GetTex»t.trim«();`  · ASSIGN:identifier
   8. L141 _(in `js/function`)_ `chrome.declarativeNetRequest.upd»ateSes«sionRules(rules, () => {`  · ASSIGN:identifier
   9. L149 _(in `js/preview`)_ `»this.fileItems.forEach(i«tem => {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  10. L150 _(in `js/m3u8`)_ `_ffmpeg && $("#StreamSaver")».prop(«"checked", false);`  · ASSIGN:identifier
  11. L157 `send2loc»alBody: '{"action": "${a«ction}", "data": ${data}, "tabId": "${tabId}"}',`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  12. L158 _(in `js/options`)_ `const Value = $(this»).val(«);`  · ASSIGN:identifier
  13. L160 _(in `js/options`)_ `const template = playerList.get(»Value)«.template;`  · ASSIGN:identifier
  14. L168 _(in `js/function`)_ `if (text».length == 0) { return [«]; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  15. L170 _(in `js/preview`)_ `send.classList.remov»e("hid«e");`  · ASSIGN:identifier
  16. L36 _(in `catch-script/search`)_ `const ne»wWorker = new _Worker(URL.crea«teObjectURL(blob), options);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  17. L174 _(in `js/function`)_ `for (let» i = 0; i < text.length;« i++) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  18. L176 _(in `js/function`)_ `parts.push(text.slic»e(star«t, i));`  · ASSIGN:identifier
  19. L180 _(in `js/function`)_ `} el»se if (text[i] === "'" &«& !inQuotes) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  20. L185 _(in `js/options`)_ `chrome.s»torage.sync.set({ [this.«id]: val });`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  21. L186 _(in `js/downloader`)_ `document.title =» title«;`  · ASSIGN:identifier
  22. L193 _(in `js/function`)_ `replace:» (txt, arg) => txt.repla«ce(...arg),`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  23. L194 _(in `js/function`)_ `replaceAll: (txt, arg) => tx»t.repl«aceAll(...arg),`  · ASSIGN:identifier
  24. L201 _(in `js/function`)_ `prepend:» (txt, arg) => (arg[0] |«| "") + txt,`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  25. L202 _(in `js/function`)_ `concat: (txt, arg) => txt + »(arg[0«] || ""),`  · ASSIGN:identifier
  26. L342 (→L347) `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar, function (items) {«`  · STORAGE:STORAGE_FLOW[area: session, key: mediaControl, sender: js/media-control, receiver: js/init], ELEMENT:member-element-container
  27. L345 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  28. L356 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
  29. L380 (→L384) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L358 (→L365) `G.Ext = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  31. L388 (→L390) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  32. L369 (→L376) `G.Type = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  33. L394 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  34. L397 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  35. L398 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  36. L401 `G[key] = »newValue«;`  · ASSIGN:identifier
  37. L264 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  38. L266 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  39. L269 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  40. L270 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  41. L275 (→L283) `items.Ext = new Map(»items.Ext.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  42. L271 `items[key] = »G.OptionLists[key]«;`  · ELEMENT:member-element-container
  43. L73 (→L198) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  44. L285 (→L293) `items.Type = new Map(»items.Type.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  45. L295 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  46. L301 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  47. L306 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  48. L307 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  49. L310 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  50. L308 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  51. L311 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  52. L314 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  53. L312 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  54. L315 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  55. L316 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  56. L324 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  57. L320 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  58. L326 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  59. L332 `isLockUrl(tab.url) && »G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container
  60. L333 `isDamnUrl(tab.url) && »G.damnUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #9 — JQUERY_ELEMENT_VAL (From storage.session.set('mediaControl') in js/media-control)  ·  2× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/init` L114:C21 -> L114:C56  `{ "type": "ap»plication/mpegurl", "size": 0, "ope«rator": ">=", "unit": "KB", "state": true },`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L308:C12 -> L308:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L312:C12 -> L312:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L316:C12 -> L316:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L320:C12 -> L320:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (568 raw steps → 39 distinct lines):
   1. L114 `{ "type": "ap»plication/mpegurl", "size": 0, "ope«rator": ">=", "unit": "KB", "state": true },`  · RETURN:parseInt
   2. L118 _(in `js/media-control`)_ `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L49 `G.blockUrlSe»t = ne«w Set();    // 屏蔽网址列表`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L54 _(in `js/options`)_ `$("#AddExt").bind("click", funct»ion ()« {`  · ASSIGN:identifier
   5. L342 (→L347) `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar, function (items) {«`  · STORAGE:STORAGE_FLOW[area: session, key: mediaControl, sender: js/media-control, receiver: js/init], ELEMENT:member-element-container
   6. L345 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   7. L356 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
   8. L380 (→L384) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L358 (→L365) `G.Ext = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L388 (→L390) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  11. L369 (→L376) `G.Type = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L394 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  13. L397 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  14. L398 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L401 `G[key] = »newValue«;`  · ASSIGN:identifier
  16. L264 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  17. L266 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  18. L269 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  19. L270 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  20. L275 (→L283) `items.Ext = new Map(»items.Ext.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  21. L271 `items[key] = »G.OptionLists[key]«;`  · ELEMENT:member-element-container
  22. L73 (→L198) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  23. L285 (→L293) `items.Type = new Map(»items.Type.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  24. L295 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  25. L301 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  26. L306 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  27. L307 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  28. L310 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  29. L308 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  30. L311 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  31. L314 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  32. L312 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  33. L315 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  34. L316 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  35. L324 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  36. L320 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  37. L326 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  38. L332 `isLockUrl(tab.url) && »G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container
  39. L333 `isDamnUrl(tab.url) && »G.damnUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #10 — JQUERY_ELEMENT_VAL (From storage.session.set('mediaControl') in js/media-control)  ·  2× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/init` L116:C21 -> L116:C53  `{ "type": "ap»plication/dash+xml", "size": 0, «"operator": ">=", "unit": "KB", "state": true },`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L308:C12 -> L308:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L312:C12 -> L312:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L316:C12 -> L316:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L320:C12 -> L320:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (617 raw steps → 49 distinct lines):
   1. L116 `{ "type": "ap»plication/dash+xml", "size": 0, «"operator": ">=", "unit": "KB", "state": true },`  · RETURN:parseInt
   2. L118 _(in `js/media-control`)_ `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L54 (→L85) _(in `js/background`)_ `chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter(»Boolean)«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L138 _(in `js/function`)_ `rule»s.removeRuleIds.push(par«seInt(item.requestId));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   5. L145 _(in `js/media-control`)_ `»chrome.tabs.sendMessage(_tabId, { Message: "speed", speed: 1, index: _index })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L141 _(in `catch-script/catch`)_ `»    <label><input type="checkbox" id="checkHead" ${checkboxStyle}><span data-i18n=«"checkHead">清理多余头部数据</span></label>`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L149 _(in `js/preview`)_ `»this.fileItems.forEach(i«tem => {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   8. L150 (→L153) _(in `js/preview`)_ `item.html.querySelector('.file-title').classList.»toggle('hide', !e.target.checked);«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L157 `send2loc»alBody: '{"action": "${a«ction}", "data": ${data}, "tabId": "${tabId}"}',`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  10. L160 (→L162) _(in `js/media-control`)_ `chrome.tabs.sendMessage(_tabId, { Message: "fullScreen", index: »_index }, function (state) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L168 _(in `js/function`)_ `if (text».length == 0) { return [«]; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  12. L170 _(in `catch-script/recorder2`)_ `»    cat.style.top = document.documentElement.scrollTop + window.inn«erHeight - catAttr.height + "px";`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L83 `{ "ext": "ts", "size": 0, "opera»tor": «">=", "unit": "KB", "state": false },`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  14. L84 `{ "ext": "webm", "size": »0, "op«erator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier
  15. L342 (→L347) `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar, function (items) {«`  · STORAGE:STORAGE_FLOW[area: session, key: mediaControl, sender: js/media-control, receiver: js/init], ELEMENT:member-element-container
  16. L345 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  17. L356 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
  18. L380 (→L384) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L358 (→L365) `G.Ext = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L388 (→L390) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L369 (→L376) `G.Type = new Map(»newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  22. L394 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  23. L397 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  24. L398 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  25. L401 `G[key] = »newValue«;`  · ASSIGN:identifier
  26. L264 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  27. L266 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  28. L269 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  29. L270 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  30. L275 (→L283) `items.Ext = new Map(»items.Ext.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  31. L271 `items[key] = »G.OptionLists[key]«;`  · ELEMENT:member-element-container
  32. L73 (→L198) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  33. L285 (→L293) `items.Type = new Map(»items.Type.map(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  34. L295 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  35. L301 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  36. L306 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  37. L307 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  38. L310 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  39. L308 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  40. L311 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  41. L314 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  42. L312 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  43. L315 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  44. L316 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  45. L324 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  46. L320 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  47. L326 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  48. L332 `isLockUrl(tab.url) && »G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container
  49. L333 `isDamnUrl(tab.url) && »G.damnUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #11 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/popup` L2:C6 -> L2:C50  `const »params = new URL(location.href).searchParams«;`
- **Sink(s)**:
  - `FETCH_RESOURCE` (http://localhost:6800/jsonrpc) — `js/popup` L82:C4 -> L88:C6 (spans to L88)  `»// 是否需要解析«`  (url-control=FULL)
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L279:C8 -> L283:C50 (spans to L283)  `»chrome.downloads.download({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/popup` L643:C12 -> L643:C51  `chrome.r»untime.sendMessage({ Message: "clearDat«a", tabId: G.tabId, type: activeTab });`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `js/popup` L643:C12 -> L643:C51  `chrome.r»untime.sendMessage({ Message: "clearDat«a", tabId: G.tabId, type: activeTab });`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L509:C12 -> L509:C44  `»chrome.tabs.create({ url: url })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L691:C8 -> L691:C55  `»chrome.tabs.create({ url: G.ffmpegConfig.url })«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L707:C16 -> L707:C98  `»chrome.tabs.create({ url: `preview.html?tabId=${G.tabId}`, index: tab.index + 1 })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L963:C8 -> L973:C10 (spans to L973)  `»chrome.tabs.create(arg, (tab) => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (6867 raw steps → 127 distinct lines):
   1. L2 `const »params = new URL(location.href).searchParams«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container
   2. L3 `const _tabId = »parseInt(params.get("tabId"))«;`  · ELEMENT:member-element, RETURN:fallback-return, RETURN:parseInt
   3. L4 `const _type = »params.get("type")«;`  · ELEMENT:member-element, RETURN:fallback-return
   4. L779 `if (»G.popup && !_tabId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:logical-left
   5. L785 `if (»_tabId«) {`  · ASSIGN:identifier
   6. L786 `G.tabId = »_tabId«;`  · ASSIGN:identifier
   7. L345 `Obje»ct.defineProperty(data«, "checked", {`  · ELEMENT:object.setProperty
   8. L794 `if (»G.getHtmlDOM«) {`  · ELEMENT:member-element-container
   9. L798 (→L815) `chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getData", tabId: »G.tabId }, function (data) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  10. L821 `const html = AddMedia(Message.data, Message.data.tabId == »G.tabId«);`  · ELEMENT:member-element-container, ASSIGN:binary-right
  11. L65 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  12. L72 `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  13. L276 `open»Pars«er(data, { autoDown: true });`  · ASSIGN:identifier
  14. L61 _(in `js/function`)_ `»obj« == null ||`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L60 (→L63) `»    data.title = stringModify(data.title);«`  · ASSIGN:logical-right, ASSIGN:logical-left
  16. L62 `data».na«me = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name));`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L63 `//截取»文件名«长度`  · ASSIGN:identifier, ASSIGN:binary-left
  18. L324 `let »url = templates(G.Player, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  19. L293 (→L326) `»            const confirm = $(`<div class="confirm">«`  · ELEMENT:object.setProperty
  20. L325 _(in `js/function`)_ `user»Agent: G.userAgent ? G.userAgent« : navigator.userAgent,`  · ELEMENT:member-element-container
  21. L331 _(in `js/function`)_ `const »_data = { ...data, ...trimData }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  22. L332 _(in `js/function`)_ `text = »text.replace«(reTemplates, function (original, tag, action) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  23. L346 `get»() {«`  · ASSIGN:identifier
  24. L918 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ELEMENT:member-element-container, ASSIGN:logical-left
  25. L97 `if (allData.get(»currentTab«).has(data.requestId)) {`  · ASSIGN:identifier
  26. L396 `allData.get(»currentTab«).set(data.requestId, data);`  · ASSIGN:identifier
  27. L822 `if (Message.data.tabId == »G.tabId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  28. L1028 `if (»checkedData.length != 2 || (!G.isFirefox && maxSize > G.chromeLimitSize)«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  29. L896 (→L914) `chrome.runtime.sendMessage({ Message: "getButtonState", tabId: »G.tabId }, function (state) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  30. L790 `»_type« == "window" && $("#currentPage").show();`  · ASSIGN:identifier, ASSIGN:binary-left
  31. L859 `$("#playbackRate").val(»G.playbackRate«);`  · ELEMENT:member-element-container
  32. L763 `»          «  resolve(response);`  · ELEMENT:member-element-container
  33. L771 _(in `js/function`)_ `styleElement.textContent = »G.css«;`  · ELEMENT:member-element-container
  34. L867 (→L880) `chrome.webNavigation.getAllFrames({ tabId: »G.tabId }, function (frames) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  35. L776 `if (»!G.initSyncComplete || !G.initLocalComplete || !G.tabId«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  36. L940 `if (»!extra.ffmpeg && !G.downStream && Math.max(...data.map(item => item._size)) > G.chromeLimitSize && confirm(i18n("fileTooLargeStream", ["2G"]))«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:logical-left
  37. L5 _(in `js/init`)_ `chrome.»i18n.getMe«ssage = (key) => data[key].messages;`  · ELEMENT:member-element-container
  38. L11 _(in `js/init`)_ `* 使»用传统下载方式下载 但无法监听 无法另存为 无法判断下载是«否失败 唉~`  · ASSIGN:identifier, ELEMENT:implicit.add
  39. L7 `const $mediaLis»t = $('#m«ediaList');`  · ELEMENT:member-element-container
  40. L9 `const $currentC»ount = $("#«currentTab #quantity");`  · ELEMENT:member-element-container
  41. L64 `let »trimName = data«.name;`  · ELEMENT:member-element-container
  42. L68 _(in `js/popup-utils`)_ `if (»G.enableAria2RpcReferer«) {`  · ELEMENT:member-element-container
  43. L70 _(in `js/popup-utils`)_ `params.header.push("User-Agent: " + (»G.userAgent ? G.userAgent : navigator.userAgent«));`  · ELEMENT:member-element-container, ASSIGN:binary-right
  44. L69 `Obje»ct.defineProperty(«data, "pageDOM", {`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  45. L82 _(in `js/init`)_ `{ »"ext": "m4«a", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ELEMENT:member-element-container
  46. L238 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  47. L275 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  48. L240 `const »m3u8dlArg = data.m3u8dlArg ?? templates(G.m3u8dlArg, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-right
  49. L742 `error ? »Tips(er«ror, 1000) : Tips(i18n.sendFailed, 1000);`  · ELEMENT:member-element-container
  50. L282 `saveAs: »G.saveAs«`  · ELEMENT:member-element-container
  51. L279 (→L283) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  52. L241 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:identifier, ASSIGN:binary-right
  53. L10 _(in `js/media-control`)_ `clearInte»rval(VideoTagTimer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  54. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  55. L242 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  56. L243 `navigator.clipboard.writeText(»m3u8dlArg«);`  · ASSIGN:identifier
  57. L248 `if (»G.m3u8dlConfirm && event.originalEvent && event.originalEvent.isTrusted«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  58. L266 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  59. L267 `window.location.href = »url«;`  · ASSIGN:identifier
  60. L270 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  61. L288 `const »url = data.invoke ?? templates(G.invokeText, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-right
  62. L291 `if (»G.invokeConfirm && event.originalEvent && event.originalEvent.isTrusted«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  63. L310 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  64. L311 `window.location.href = »url«;`  · ASSIGN:identifier
  65. L313 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  66. L319 `if (isEmpty(»G.Player«)) { return true; }`  · ELEMENT:member-element-container
  67. L320 `if (»G.Player == "$shareApi$" || G.Player == "${shareApi}"«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  68. L329 `»chrome.tabs.update({ url: url })«;`  · ELEMENT:object.setProperty
  69. L660 _(in `js/function`)_ `let body = »G.send2localBody«;`  · ELEMENT:member-element-container
  70. L664 (→L666) `chrome.runt»ime.sendMessage({ Message: "autoDown", tabId: G.tabId }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  71. L668 _(in `js/function`)_ `let »postData = templates(body, data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  72. L370 `if ($mq»ttButton.hasCla«ss('mqtt-sending')) {`  · RETURN:json.parse
  73. L669 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:implicit.add
  74. L578 `if» (data.html.is(":hidden")) { return tru«e; }`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  75. L582 _(in `js/function`)_ `let »send2localURL = templates(G.send2localURL, templateContext)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  76. L583 `»if (data.html.is(":hidden")) { return «true; }`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  77. L586 _(in `js/function`)_ `if (»option.method« === 'GET') {`  · ASSIGN:binary-left
  78. L600 `// $(".contain»er").css("margin«-bottom", _height);`  · ELEMENT:member-element-container
  79. L606 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  80. L634 _(in `js/function`)_ `if (»G.send2localHeaders«) {`  · ELEMENT:member-element-container
  81. L643 `»chrome.runtime.sendMessage({ Message: "clearData", tabId: G.tabId, type: activeTab })«;`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member-element-container, ELEMENT:object.setProperty
  82. L105 `»    <input ty«pe="checkbox" class="DownCheck"/>`  · ELEMENT:member-element-container, ASSIGN:unary
  83. L111 `<img src="im»g/parsing.png" class="ic«on parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${data.parsing}" title="${i18n.parser}"/>`  · ELEMENT:member-element-container, ASSIGN:logical-left
  84. L112 `<img src="img/play.png" c»lass="icon «play ${data.isPlay ? "" : "hide"}" id="play" title="${i18n.preview}"/>`  · ASSIGN:identifier
  85. L137 _(in `js/popup-utils`)_ `const protocol = »G.mqttProtocol«;`  · ELEMENT:member-element-container
  86. L138 `data.urlPanel = data.ht»ml.find(".ur«l");`  · ELEMENT:member-element-container
  87. L139 _(in `js/popup-utils`)_ `const port = »G.mqttPort«;`  · ELEMENT:member-element-container
  88. L140 `data.panelHeading = d»ata.html.f«ind(".panel-heading");`  · ELEMENT:member-element-container
  89. L142 _(in `js/popup-utils`)_ `if (»!protocol || !broker || !port || !path«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  90. L146 _(in `js/popup-utils`)_ `const mqttUrl = »`${protocol}://${broker}:${port}${path}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  91. L150 _(in `js/popup-utils`)_ `clientId: »`${G.mqttClientId || "cat-catch-client"}-${Math.random().toString(16).slice(2)}`«,`  · ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:template-literal
  92. L149 (→L154) `»            }«`  · ELEMENT:object.setProperty
  93. L157 `if (»isM3U8(dat«a)) {`  · ELEMENT:member-element-container
  94. L160 `»    hls.loadSo«urce(data.url);`  · ELEMENT:member-element-container
  95. L179 `preview.attr("src", dat»a.url);«`  · ASSIGN:identifier
  96. L481 `if (key == »G.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  97. L497 `if (»G.enableAria2Rpc«) {`  · ELEMENT:member-element-container
  98. L506 `if (»G.m3u8dl && (data.parsing == "m3u8" || data.parsing == "mpd") && !data.url.startsWith("blob:")«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  99. L507 `const »m3u8dlArg = templates(G.m3u8dlArg, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  100. L512 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  101. L508 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:binary-right
  102. L509 `»chrome.tabs.create({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  103. L543 `const »url = []«;`  · ELEMENT:object.setProperty
  104. L644 `»chrome.runtime.sendMessage({ Message: "ClearIcon", type: activeTab, tabId: G.tabId })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  105. L657 (→L660) `chrome.runtime.sendMessage({ Message: "mobileUserAgent", tabId: »G.tabId }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  106. L658 `»G.refreshClear« && $('#Clear').click();`  · ELEMENT:member-element
  107. L670 (→L673) `chrome.runtime.sendMessage({ Message: "script", tabId: »G.tabId, script: this.id + ".js" }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  108. L671 `»G.autoClearMode« > 0 && $('#Clear').click();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  109. L691 _(in `js/function`)_ `»return executeCoreRequest(postData, { action, tabId });«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ASSIGN:identifier
  110. L704 `chrome.tabs.get(»G.tabId«, function (tab) {`  · ELEMENT:member-element-container
  111. L705 `switch (»G.popupMode«) {`  · ELEMENT:member-element-container
  112. L707 `»chrome.tabs.create({ url: `preview.html?tabId=${G.tabId}`, index: tab.index + 1 })«;`  · ELEMENT:member-element-container, ASSIGN:template-literal, ELEMENT:object.setProperty
  113. L726 `»chrome.tabs.update({ url: `popup.html?tabId=${tabs[0].id}${_type ? "&type=" + _type : ""}` })«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-consequent, ASSIGN:template-literal, ELEMENT:object.setProperty
  114. L739 `send2localArray("catch", checkedData, »G.tabId«).then(function (success) {`  · ELEMENT:member-element-container
  115. L686 _(in `js/function`)_ `»results.push(templates("${data}", { ...item, action, index, tabId }))«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  116. L303 `con»firm.find("#clo«se").click(function () {`  · ASSIGN:logical-left
  117. L688 _(in `js/function`)_ `let body = »G.send2localBody.replaceAll«('${data}', `[${results.join(",")}]`);`  · ELEMENT:member-element-container
  118. L689 _(in `js/function`)_ `let »postData = templates(body, { action, tabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  119. L690 _(in `js/function`)_ `»postData = JSONparse(postData, arrayData[0])«;`  · ELEMENT:implicit.add
  120. L759 `chrome.tabs.sendMessage(»G.tabId«, { Message: "getPage" }, { frameId: 0 }, (response) => {`  · ELEMENT:member-element-container
  121. L846 `if (»tabId == -1 || tabId == G.tabId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-right
  122. L870 `chrome.tabs.sendMessage(»G.tabId«, { Message: "getKey" }, { frameId: frame.frameId }, function (result) {`  · ELEMENT:member-element-container
  123. L884 `if (»response && G.damn«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  124. L911 `const script = »G.scriptList.get«(key + ".js");`  · ELEMENT:member-element-container
  125. L954 `chrome.tabs.get(»G.tabId«, function (tab) {`  · ELEMENT:member-element-container
  126. L961 `active: »!G.downActive«`  · ELEMENT:member-element-container, ASSIGN:unary
  127. L955 (→L962) `»        const arg = {«`  · ELEMENT:object.setProperty

---

## Flow #12 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/popup` L817:C4 -> L854:C6 (spans to L854)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/popup` L937:C4 -> L937:C62  `»localStorage.setItem('downloadData', JSON.stringify(data))«;`
  - `FETCH_BODY` (http://localhost:6800/jsonrpc) — `js/popup` L82:C4 -> L88:C6 (spans to L88)  `»// 是否需要解析«`
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L279:C8 -> L283:C50 (spans to L283)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/popup` L643:C12 -> L643:C51  `chrome.r»untime.sendMessage({ Message: "clearDat«a", tabId: G.tabId, type: activeTab });`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (66794 raw steps → 274 distinct lines):
   1. L817 (→L854) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/popup]; runtime.single.sender.message[js/background->js/popup]`
   2. L818 `if (»!Message.Message || !Message.data«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L820 `if (»Message.Message« == "popupAddData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L836 `if (»Message.Message« == "popupAddKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L821 `const html = AddMedia(»Message.data, Message.data.tabId« == G.tabId);`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L59 `»data._title = data.title«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L60 (→L63) `»data.title = stringModify(data.title);«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:binary-right
   8. L503 _(in `js/function`)_ `if (»!str) { return str«; }`  · ASSIGN:identifier, ASSIGN:unary
   9. L504 _(in `js/function`)_ `»str = filterFileName(str, text)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  10. L521 `»    chrome.downloa«ds.download({`  · ASSIGN:identifier, ASSIGN:unary
  11. L523 _(in `js/function`)_ `str = »str.replaceAll(/\u200B/g, "").replaceAll(/\u200C/g, "").replaceAll(/\u200D/g, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L524 (→L535) `»  }, function (id) { downData[id] = data; });«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L538 _(in `js/function`)_ `if (»str.endsWith(".")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L539 `catDownloa»d(c«heckedData, { ffmpeg: "merge" })`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L541 _(in `js/function`)_ `if (»str.startsWith(".")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L542 `$('#AllCopy').click(functio»n («) {`  · ASSIGN:identifier, ASSIGN:binary-right
  17. L544 `getData»().«forEach(function (data) {`  · ASSIGN:identifier
  18. L505 (→L510) `for (l»et data of checkedData) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L511 _(in `js/function`)_ `return »str«;`  · ASSIGN:identifier
  20. L62 `»data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, RETURN:decodeURIComponent, ASSIGN:conditional-consequent
  21. L64 `let trimName = »data.name«;`  · ASSIGN:identifier, ELEMENT:member-element
  22. L65 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  23. L66 `trimName = »trimName.substr(0, 20) + '...' + trimName.substr(-30)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  24. L69 `Obje»ct.defineProperty(data«, "pageDOM", {`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  25. L72 `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate, ASSIGN:binary-right
  26. L279 (→L283) `»chrome.downloads.download({«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return
  27. L284 _(in `js/function`)_ `»data.fileName = data.fullFileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  28. L285 _(in `js/function`)_ `»data.fileName.length > 1 && data.fileName.pop()«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  29. L286 _(in `js/function`)_ `»data.fileName = data.fileName.join(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L288 `const ur»l = data.invoke ?? templates(G.invokeText, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  31. L61 _(in `js/function`)_ `»obj« == null ||`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L63 `//截取»文件名«长度`  · ASSIGN:identifier, ASSIGN:binary-left
  33. L289 _(in `js/function`)_ `»data.ext = data.fullFileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  34. L290 _(in `js/function`)_ `»data.ext = data.ext.length == 1 ? "" : data.ext[data.ext.length - 1]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  35. L295 `»           <bu«tton class="button2" id="confirm">${i18n.confirm}</button>`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  36. L293 (→L326) `»            const confirm = $(`<div class="confirm">«`  · ELEMENT:object.setProperty
  37. L296 `»       <button class="button2" id=«"close">${i18n.close}</button>`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  38. L297 _(in `js/function`)_ `origin: »data.requestHeaders?.origin ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  39. L298 _(in `js/function`)_ `initiator: data.requestHeaders?.referer ? »data.requestHeaders.referer : data.initiator«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  40. L299 `»data.invoke = con«firm.find("textarea").val();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  41. L300 `» data.html.find('.invoke').click();«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, RETURN:fallback-return
  42. L301 `c»onfirm.hide(«);`  · ASSIGN:identifier, ELEMENT:member-element
  43. L302 _(in `js/function`)_ `cookie: »data.cookie ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L303 `con»firm.find("#clo«se").click(function () {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  45. L319 _(in `js/function`)_ `fullFileName: data.fullFileName ? »data.fullFileName« : "",`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  46. L320 `if (G.Player == "$shareApi»$" || G.Playe«r == "${shareApi}") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  47. L321 `n»avigator.share«({ url: data.url });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  48. L329 _(in `js/function`)_ `trimData.title = »trimData.title.replace(/[/\\]/g, "_")«;`  · ELEMENT:member-element, RETURN:fallback-return
  49. L331 _(in `js/function`)_ `const »_data = { ...data, ...trimData }«;`  · ASSIGN:identifier, COPY:object-spread, ELEMENT:object.setProperty
  50. L73 `»data.downFileName = filterFileName(data.downFileName)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  51. L74 `if (isEm»pty(data.downFileName«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  52. L75 _(in `js/init`)_ `»{ "ext": "flv", "size": 0, "operator": ">=", "u«nit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  53. L78 _(in `js/popup-utils`)_ `»        params.header.push("Authorization: " + data.requestHeaders.authorization«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  54. L79 `if (»data.size«) {`  · ASSIGN:identifier, ELEMENT:member-element
  55. L80 `»data.size = byteToSize(data.size)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  56. L31 _(in `js/function`)_ `if (»!byte || byte < 1024«) { return 0; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
  57. L32 `let dupl»icat«eFilenamesSet = null;`  · ASSIGN:identifier, ASSIGN:binary-left
  58. L33 _(in `js/function`)_ `return »(byte / 1024).toFixed(1)« + "KB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  59. L34 `let activeTab =» tru«e;`  · ASSIGN:identifier, ASSIGN:binary-left
  60. L35 (→L42) _(in `js/function`)_ `retu»rn (byte / 1024 / 1024).toFixed(1) + "MB";«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  61. L37 _(in `js/function`)_ `»return (byte / 1024 / 1024 / 1024).toFixed(1)« + "GB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element
  62. L83 `»data«.parsing = false;`  · ASSIGN:identifier
  63. L84 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  64. L15 (→L20) `let allC»ount = 0;«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  65. L16 _(in `js/function`)_ `let »hour = («sec / 3600) | 0;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  66. L17 _(in `js/popup-utils`)_ `»data.type?.endsWith("/vnd.apple.mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  67. L18 _(in `js/init`)_ `»    a.download = options.filename«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  68. L19 _(in `js/function`)_ `let »time = hour > 0 ? hour + ":" : «"";`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L20 _(in `js/function`)_ `time» += min.toString().padStart(2, '0') + ":"«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  70. L85 `»data«.parsing = "m3u8";`  · ASSIGN:identifier
  71. L86 `} else if (isMPD(»data«)) {`  · ASSIGN:identifier
  72. L24 (→L25) `[true, n»ew Map()],  // 当前页面«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  73. L25 `[fal»se, new M«ap()]  // 其他页面`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  74. L92 `if (»data.favIconUrl && !favicon.has(data.webUrl)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  75. L87 _(in `js/init`)_ `»{ "ext": "acc", "size": 0,« "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, RETURN:json.stringify
  76. L88 `} else if (isJSON(»data«)) {`  · ASSIGN:identifier
  77. L29 (→L31) `// 储存所有扩展名，保»存是否筛选状态 来判断新加入的资源 立刻判断是否需要隐藏«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  78. L30 `const fi»lterExt =« new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  79. L93 `favicon.set(»data.webUrl, data.favIconUrl«);`  · ASSIGN:identifier, ELEMENT:member-element
  80. L89 `»data«.parsing = "json";`  · ASSIGN:identifier
  81. L95 `»data.isPlay = isPlay(data«);`  · ASSIGN:identifier
  82. L918 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  83. L36 `const »downData = []«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
  84. L38 `const fa»vicon = «new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  85. L39 _(in `js/init`)_ `»return c«hrome.i18n.getMessage(key);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  86. L40 `let page»DOM = un«defined;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  87. L41 _(in `js/popup-utils`)_ `»data.ext« == "webp" ||`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  88. L42 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "HeartBeat" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  89. L920 `return »isMediaExt(data.ext) || typeArray.includes(data.type) || isM3U8(data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  90. L46 _(in `js/popup-utils`)_ `return ['ogg', 'ogv', 'mp4', 'webm', 'mp3', 'wav', 'm4a', '3gp', 'mpeg', 'mov', 'm4s', 'aac'].includes(»ext«);`  · ASSIGN:identifier
  91. L97 `if (allData.get(»currentTab).has(data.requestId«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  92. L98 `»data.requestId = data.requestId + "_"« + Date.now().toString();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  93. L106 `${G.ShowWebIco ? »`<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.requestId}" src="${data.favIconUrl}"/>`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  94. L108 `<span class="name ${data.parsing || data.isRegex || data.tabId == -1 ? "bold" : ""}">${»trimName«}</span>`  · ASSIGN:identifier
  95. L109 `<span class="size ${data.size ? "" : "hide"}">${»data.size«}</span>`  · ASSIGN:identifier, ELEMENT:member-element
  96. L111 `<img src="img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${»data.parsing«}" title="${i18n.parser}"/>`  · ASSIGN:identifier, ELEMENT:member-element
  97. L121 `${data.title ? »`<b>${i18n.title}:</b> ${data.title}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  98. L122 `${data.type ? »`<br><b>MIME:</b>  ${data.type}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  99. L130 `<a href="${»data.url}" target="_blank" download="${data.downFileName}">${data.url«}</a>`  · ASSIGN:identifier, ELEMENT:member-element
  100. L102 (→L135) `»data.html = $(`«`  · ASSIGN:template-literal, ASSIGN:identifier
  101. L138 `»data.urlPanel = data.html.find(".url")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  102. L139 `»data«.urlPanelShow = false;`  · ASSIGN:identifier
  103. L140 `»data.panelHeading = data.html.find(".panel-heading")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  104. L141 (→L206) `»data.panelHeading.click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L208 (→L211) `»data.html.find("#qrcode").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  106. L213 (→L215) `»data.html.find("#catDown").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  107. L216 (→L218) `»data.html.find("#catDownFFmpeg").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  108. L220 (→L225) `»data.html.find('#copy').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  109. L227 (→L235) `»data.html.find('#aria2').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  110. L237 (→L285) `»data.html.find('#download').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  111. L287 (→L316) `»data.html.find('.invoke').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  112. L318 (→L331) `»data.html.find('#play').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  113. L333 (→L336) `»data.html.find('#parsing').click(function (e) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  114. L338 `»data«._checked = checkboxState;`  · ASSIGN:identifier
  115. L339 `»data.html.find(".DownCheck").prop("checked", data._checked)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  116. L340 (→L344) `»data.html.find('input').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  117. L345 `Object.defineProperty(»data«, "checked", {`  · ASSIGN:identifier
  118. L356 (→L363) `»data.html.find("#send2local").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  119. L366 (→L393) `»data.html.find("#mqtt").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  120. L396 `allData.get(»currentTab).set(data.requestId, data«);`  · ASSIGN:identifier, ELEMENT:member-element
  121. L399 `if (!filterExt.has(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  122. L400 `filterExt.set(»data.ext«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  123. L417 `if (!filterExt.get(»data.ext) || duplicateFilenamesSet?.has(data.name«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  124. L401 `const html = $(»`<label class="flexFilter" id="${data.ext}"><input type="checkbox" checked>${data.ext}</label>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  125. L418 `»data.html.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  126. L419 `»data.html.find("input").prop("checked", false)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  127. L421 `duplicateFilenamesSet && duplicateFilenamesSet.add(»data.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  128. L423 `return »data.html«;`  · ASSIGN:identifier, ELEMENT:member-element
  129. L822 `if (»Message.data.tabId« == G.tabId) {`  · ELEMENT:member-element, ASSIGN:binary-left
  130. L825 `$current.append(»html«);`  · ASSIGN:identifier
  131. L142 `»data.urlPanelShow = !data.urlPanelShow«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  132. L143 `const mediaInfo = »data.html.find("#mediaInfo")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L144 `const preview = »data.html.find("#preview")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  134. L145 `if (»!data.urlPanelShow«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  135. L154 `»data.urlPanel.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  136. L147 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  137. L150 `»data.urlPanel.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  138. L155 `if (»!mediaInfo.data("state")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  139. L151 `»!preview[0].paused && preview.trigger("pause")«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, RETURN:fallback-return
  140. L156 `»mediaInfo.data("state", true)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  141. L157 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  142. L203 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  143. L177 `} else if (»data.isPlay«) {`  · ASSIGN:identifier, ELEMENT:member-element
  144. L159 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  145. L178 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  146. L181 `} else if (isPicture(»data«)) {`  · ASSIGN:identifier
  147. L189 (→L200) `»preview.on("loadedmetadata", function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  148. L182 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  149. L160 `hls.loadSource(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  150. L161 `hls.attachMedia(»preview[0]«);`  · ASSIGN:identifier, ELEMENT:member-element
  151. L165 `!data.tracks.audio && »mediaInfo.append(`<br><b>${i18n.noAudio}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  152. L166 `!data.tracks.video && »mediaInfo.append(`<br><b>${i18n.noVideo}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  153. L173 `if (»data.levels.length > 1 && !mediaInfo.text().includes(i18n.m3u8Playlist)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  154. L174 `»mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  155. L179 `»preview.attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  156. L183 `»data.html.find("#screenshots").show().attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  157. L190 `»preview.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  158. L192 `»data«.duration = this.duration;`  · ASSIGN:identifier
  159. L193 `»mediaInfo.append(`<br><b>${i18n.duration}:</b> ` + secToTime(this.duration))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  160. L196 `»mediaInfo.append(`<br><b>${i18n.resolution}:</b> ` + this.videoWidth + "x" + this.videoHeight)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  161. L197 `»data«.videoWidth = this.videoWidth;`  · ASSIGN:identifier
  162. L198 `»data«.videoHeight = this.videoHeight;`  · ASSIGN:identifier
  163. L210 `»$(this).html("").qrcode({ width: size, height: size, text: data.url }).off("click")«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  164. L214 `catDownload(»data«);`  · ASSIGN:identifier
  165. L934 `if (!Array.isArray(»data)) { data = [data]«; }`  · ASSIGN:identifier, ELEMENT:object.setProperty
  166. L937 `localStorage.setItem('downloadData', »JSON.stringify(data)«);`  · RETURN:json.stringify
  167. L944 (→L951) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "catDownload", data: data }, (message) => {«`  · ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  168. L217 `catDownload(»data«, { ffmpeg: "addFile" });`  · ASSIGN:identifier
  169. L929 `catDownload(»data«, extra);`  · ASSIGN:identifier
  170. L221 `const text = copyLink(»data«);`  · ASSIGN:identifier
  171. L3 `const _tabId = »parseInt«(params.get("tabId"));`  · ASSIGN:identifier, ELEMENT:member-element
  172. L4 `const _t»ype = params«.get("type");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  173. L6 _(in `js/function`)_ `function append»Zero(date) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  174. L11 _(in `js/init`)_ `* 使用传统下载方式下载 但无法监听 无法另存为 无»法判断下«载是否失败 唉~`  · ASSIGN:identifier
  175. L228 `aria2AddUri(»data«, function (data) {`  · ASSIGN:identifier
  176. L58 (→L63) `»function AddMedia(data, currentTab = true) {«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  177. L67 _(in `js/popup-utils`)_ `const »params = { out: data.downFileName }«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  178. L71 _(in `js/function`)_ `function set»RequestHeaders(data = {}, ca«llback = undefined) {`  · ASSIGN:identifier, ELEMENT:member-element
  179. L77 _(in `js/init`)_ `{ "e»xt": "f4v", "size": 0, "operator":« ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element
  180. L81 _(in `js/function`)_ `»                "requestHeaders": Ob«ject.keys(data).map(key => ({ header: key, operation: "set", value: data[key] }))`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  181. L82 (→L94) `»    // 是否需要解析«`  · ELEMENT:object.setProperty
  182. L238 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  183. L239 `if (»!data.url.startsWith("blob:")«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  184. L275 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  185. L240 `const m3u8dlArg = »data.m3u8dlArg ?? templates(G.m3u8dlArg, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  186. L276 `open»Parser(data«, { autoDown: true });`  · ASSIGN:identifier
  187. L280 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  188. L281 `filename: »data.downFileName«,`  · ASSIGN:identifier, ELEMENT:member-element
  189. L283 `}, function (id) { downData[id] = »data«; });`  · ASSIGN:identifier
  190. L241 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:identifier, ASSIGN:binary-right
  191. L10 _(in `js/media-control`)_ `clearInte»rval(VideoTagTimer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  192. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  193. L242 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  194. L243 `navigator.clipboard.writeText(»m3u8dlArg«);`  · ASSIGN:identifier
  195. L267 `window.location.href = »url«;`  · ASSIGN:identifier
  196. L270 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  197. L256 `»data«.m3u8dlArg = confirm.find("textarea").val();`  · ASSIGN:identifier
  198. L257 `»data.html.find('#download').click()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  199. L311 `window.location.href = »url«;`  · ASSIGN:identifier
  200. L313 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  201. L324 `let url = templates(G.Player, »data«);`  · ASSIGN:identifier
  202. L334 `openParser(»data«);`  · ASSIGN:identifier
  203. L341 `»data«._checked = this.checked;`  · ASSIGN:identifier
  204. L347 `return »data._checked«;`  · ASSIGN:identifier, ELEMENT:member-element
  205. L350 `»data«._checked = newValue;`  · ASSIGN:identifier
  206. L351 `»data.html.find('input').prop("checked", newValue)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  207. L357 `send2local("catch", »data, data.tabId«).then(function (success) {`  · ASSIGN:identifier, ELEMENT:member-element
  208. L664 (→L666) `chrome.runt»ime.sendMessage({ Message: "autoDown", tabId: G.tabId }, function () {«`  · ASSIGN:identifier, ASSIGN:template-literal, MUTATE:string.replace, ELEMENT:member-element-container, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  209. L667 _(in `js/function`)_ `»data«.action = action;`  · ASSIGN:identifier
  210. L665 _(in `js/function`)_ `»data = { tabId: tabId }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  211. L668 _(in `js/function`)_ `let »postData = templates(body, data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  212. L332 _(in `js/function`)_ `text = »text.replace«(reTemplates, function (original, tag, action) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  213. L346 `get»() {«`  · ASSIGN:identifier
  214. L669 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:implicit.add
  215. L370 `if ($mq»ttButton.hasCla«ss('mqtt-sending')) {`  · RETURN:json.parse
  216. L606 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  217. L578 `if» (data.html.is(":hidden")) { return tru«e; }`  · ELEMENT:object.setProperty
  218. L380 `sendToMQTT(»data«).then(function (success) {`  · ASSIGN:identifier
  219. L112 `»        <img src="img/play.png" class="icon play ${«data.isPlay ? "" : "hide"}" id="play" title="${i18n.preview}"/>`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  220. L113 `»    «    <img src="img/download.svg" class="icon download" id="download" title="${i18n.download}"/>`  · ASSIGN:identifier
  221. L114 `<img src»="im«g/aria2.png" class="icon aria2 ${G.enableAria2Rpc ? "" : "hide"}"" id="aria2" title="Aria2"/>`  · ASSIGN:identifier
  222. L688 _(in `js/function`)_ `let body = »G.send2localBody.replaceAll«('${data}', `[${results.join(",")}]`);`  · ELEMENT:member-element-container
  223. L689 _(in `js/function`)_ `let »postData = templates(body, { action, tabId })«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  224. L690 _(in `js/function`)_ `»postData = JSONparse(postData, arrayData[0])«;`  · ELEMENT:implicit.add
  225. L841 `if (item.url == »Message.url«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  226. L847 `$maybeKey.append(AddKey(»Message.data«));`  · ELEMENT:member-element
  227. L428 `const base64Key = base64ToHex(»key«);`  · ASSIGN:identifier
  228. L1074 `binaryString = »atob(base64)«;`  · ASSIGN:identifier, RETURN:atob
  229. L1080 `for (let i = 0; i < »binaryString.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  230. L1081 `let hex = »binaryString.charCodeAt(i).toString(16)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  231. L1082 `if (»hex.length« === 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  232. L1083 `hex = '0' + »hex«;`  · ASSIGN:identifier, ASSIGN:binary-right
  233. L1085 `hexString += »hex«;`  · ASSIGN:identifier
  234. L1087 `return »hexString«;`  · ASSIGN:identifier
  235. L429 `if (»!base64Key«) { return; }`  · ASSIGN:identifier, ASSIGN:unary
  236. L435 `<span class="name bold">${»key«}</span>`  · ASSIGN:identifier
  237. L440 `Hex: ${»base64Key«}`  · ASSIGN:identifier
  238. L442 `Base64: ${»key«}`  · ASSIGN:identifier
  239. L432 (→L444) `»    data.html = $(`«`  · ASSIGN:template-literal
  240. L798 (→L815) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getData", tabId: G.tabId }, function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  241. L799 `if (»!data || data === "OK"«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
  242. L804 `currentCount = »data.length«;`  · ELEMENT:member.length
  243. L805 `if (»currentCount >= 500 && confirm(i18n("confirmLoading", [currentCount]))«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty, ASSIGN:logical-left
  244. L1000 `$currentCount.text(currentCount ? »`[${currentCount}]`« : "");`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  245. L810 `for (let key = 0; key < »currentCount«; key++) {`  · ASSIGN:identifier, ASSIGN:binary-right
  246. L811 `$current.append(AddMedia(»data[key]«));`  · ELEMENT:member-element-container
  247. L628 `»duplicateFilenamesSet = new Set()«;`  · ELEMENT:object.setProperty
  248. L896 (→L914) `»    chrome.runtime.sendMessage({ Message: "getButtonState", tabId: G.tabId }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  249. L897 `for (»let key« in state) {`  · ITERATE:loop.iteration
  250. L898 `const $DOM = $(»`#${key}`«);`  · ASSIGN:template-literal
  251. L899 `if (»key« == "MobileUserAgent") {`  · ASSIGN:binary-left
  252. L903 `if (»key« == "AutoDown") {`  · ASSIGN:binary-left
  253. L907 `if (»key« == "enable") {`  · ASSIGN:binary-left
  254. L911 `const script = G.scriptList.get(»key« + ".js");`  · ASSIGN:binary-left
  255. L883 (→L887) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "damnUrlHas" }, function (response) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  256. L884 `if (»response && G.damn«) {`  · ASSIGN:logical-left
  257. L478 (→L489) `»    !allCount && chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getAllData" }, function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  258. L480 `for (»let key« in data) {`  · ITERATE:loop.iteration
  259. L481 `if (»key« == G.tabId) { continue; }`  · ASSIGN:binary-left
  260. L482 `»allCount += data[key].length«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:member.length
  261. L1001 `$allCount.text(allCount ? »`[${allCount}]`« : "");`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  262. L483 `for (let i = 0; »i < data[key].length«; i++) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-right
  263. L484 `»$all.append(AddMedia(data[key][i], false))«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  264. L657 (→L660) `»    chrome.runtime.sendMessage({ Message: "mobileUserAgent", tabId: G.tabId }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  265. L823 `»!currentCount« && $mediaList.append($current);`  · ASSIGN:identifier, ASSIGN:unary
  266. L827 `} else if (»allCount«) {`  · ASSIGN:identifier
  267. L828 `»allCount++«;`  · ASSIGN:identifier, ASSIGN:update
  268. L824 `»currentCount++«;`  · ASSIGN:identifier, ASSIGN:update
  269. L670 (→L673) `»    chrome.runtime.sendMessage({ Message: "script", tabId: G.tabId, script: this.id + ".js" }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  270. L698 (→L700) `»    chrome.runtime.sendMessage({ Message: "enable" }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  271. L759 (→L765) `»            chrome.tabs.sendMessage(G.tabId, { Message: "getPage" }, { frameId: 0 }, (response) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  272. L870 (→L878) `»            chrome.tabs.sendMessage(G.tabId, { Message: "getKey" }, { frameId: frame.frameId }, function (result) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  273. L871 `if (»chrome.runtime.lastError || !result || result.length == 0«) { return; }`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  274. L873 (→L875) `for (»let key of result) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration

---

## Flow #13 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/popup` L817:C4 -> L854:C6 (spans to L854)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/popup` L937:C4 -> L937:C62  `»localStorage.setItem('downloadData', JSON.stringify(data))«;`
  - `FETCH_BODY` (http://localhost:6800/jsonrpc) — `js/popup` L82:C4 -> L88:C6 (spans to L88)  `»// 是否需要解析«`
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L279:C8 -> L283:C50 (spans to L283)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/popup` L643:C12 -> L643:C51  `chrome.r»untime.sendMessage({ Message: "clearDat«a", tabId: G.tabId, type: activeTab });`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (18676 raw steps → 239 distinct lines):
   1. L817 (→L854) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/popup]; runtime.single.sender.message[js/background->js/popup]`
   2. L818 `if (»!Message.Message || !Message.data«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L820 `if (»Message.Message« == "popupAddData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L836 `if (»Message.Message« == "popupAddKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L821 `const html = AddMedia(»Message.data, Message.data.tabId« == G.tabId);`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L59 `»data._title = data.title«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L60 (→L63) `»data.title = stringModify(data.title);«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:binary-right
   8. L503 _(in `js/function`)_ `if (»!str) { return str«; }`  · ASSIGN:identifier, ASSIGN:unary
   9. L504 _(in `js/function`)_ `»str = filterFileName(str, text)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  10. L521 `»    chrome.downloa«ds.download({`  · ASSIGN:identifier, ASSIGN:unary
  11. L523 _(in `js/function`)_ `str = »str.replaceAll(/\u200B/g, "").replaceAll(/\u200C/g, "").replaceAll(/\u200D/g, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L524 (→L535) `»  }, function (id) { downData[id] = data; });«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L538 _(in `js/function`)_ `if (»str.endsWith(".")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L539 `catDownloa»d(c«heckedData, { ffmpeg: "merge" })`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L541 _(in `js/function`)_ `if (»str.startsWith(".")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L542 `$('#AllCopy').click(functio»n («) {`  · ASSIGN:identifier, ASSIGN:binary-right
  17. L544 `getData»().«forEach(function (data) {`  · ASSIGN:identifier
  18. L505 (→L510) `for (l»et data of checkedData) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L511 _(in `js/function`)_ `return »str«;`  · ASSIGN:identifier
  20. L62 `»data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, RETURN:decodeURIComponent, ASSIGN:conditional-consequent
  21. L64 `let trimName = »data.name«;`  · ASSIGN:identifier, ELEMENT:member-element
  22. L65 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  23. L66 `trimName = »trimName.substr(0, 20) + '...' + trimName.substr(-30)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  24. L69 `Obje»ct.defineProperty(data«, "pageDOM", {`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  25. L72 `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate, ASSIGN:binary-right
  26. L279 (→L283) `»chrome.downloads.download({«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return
  27. L284 _(in `js/function`)_ `»data.fileName = data.fullFileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  28. L285 _(in `js/function`)_ `»data.fileName.length > 1 && data.fileName.pop()«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  29. L286 _(in `js/function`)_ `»data.fileName = data.fileName.join(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L288 `const ur»l = data.invoke ?? templates(G.invokeText, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  31. L61 _(in `js/function`)_ `»obj« == null ||`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L63 `//截取»文件名«长度`  · ASSIGN:identifier, ASSIGN:binary-left
  33. L289 _(in `js/function`)_ `»data.ext = data.fullFileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  34. L290 _(in `js/function`)_ `»data.ext = data.ext.length == 1 ? "" : data.ext[data.ext.length - 1]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  35. L295 `»           <bu«tton class="button2" id="confirm">${i18n.confirm}</button>`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  36. L293 (→L326) `»            const confirm = $(`<div class="confirm">«`  · ELEMENT:object.setProperty
  37. L296 `»       <button class="button2" id=«"close">${i18n.close}</button>`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  38. L297 _(in `js/function`)_ `origin: »data.requestHeaders?.origin ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  39. L298 _(in `js/function`)_ `initiator: data.requestHeaders?.referer ? »data.requestHeaders.referer : data.initiator«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  40. L299 `»data.invoke = con«firm.find("textarea").val();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  41. L300 `» data.html.find('.invoke').click();«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, RETURN:fallback-return
  42. L301 `c»onfirm.hide(«);`  · ASSIGN:identifier, ELEMENT:member-element
  43. L302 _(in `js/function`)_ `cookie: »data.cookie ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L303 `con»firm.find("#clo«se").click(function () {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  45. L319 _(in `js/function`)_ `fullFileName: data.fullFileName ? »data.fullFileName« : "",`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  46. L320 `if (G.Player == "$shareApi»$" || G.Playe«r == "${shareApi}") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  47. L321 `n»avigator.share«({ url: data.url });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  48. L329 _(in `js/function`)_ `trimData.title = »trimData.title.replace(/[/\\]/g, "_")«;`  · ELEMENT:member-element, RETURN:fallback-return
  49. L331 _(in `js/function`)_ `const »_data = { ...data, ...trimData }«;`  · ASSIGN:identifier, COPY:object-spread, ELEMENT:object.setProperty
  50. L73 `»data.downFileName = filterFileName(data.downFileName)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  51. L74 `if (isEm»pty(data.downFileName«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  52. L75 _(in `js/init`)_ `»{ "ext": "flv", "size": 0, "operator": ">=", "u«nit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  53. L78 _(in `js/popup-utils`)_ `»        params.header.push("Authorization: " + data.requestHeaders.authorization«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  54. L79 `if (»data.size«) {`  · ASSIGN:identifier, ELEMENT:member-element
  55. L80 `»data.size = byteToSize(data.size)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  56. L31 _(in `js/function`)_ `if (»!byte || byte < 1024«) { return 0; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
  57. L32 `let dupl»icat«eFilenamesSet = null;`  · ASSIGN:identifier, ASSIGN:binary-left
  58. L33 _(in `js/function`)_ `return »(byte / 1024).toFixed(1)« + "KB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  59. L34 `let activeTab =» tru«e;`  · ASSIGN:identifier, ASSIGN:binary-left
  60. L35 (→L42) _(in `js/function`)_ `retu»rn (byte / 1024 / 1024).toFixed(1) + "MB";«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  61. L37 _(in `js/function`)_ `»return (byte / 1024 / 1024 / 1024).toFixed(1)« + "GB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element
  62. L83 `»data«.parsing = false;`  · ASSIGN:identifier
  63. L84 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  64. L15 (→L20) `let allC»ount = 0;«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  65. L16 _(in `js/function`)_ `let »hour = («sec / 3600) | 0;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  66. L17 _(in `js/popup-utils`)_ `»data.type?.endsWith("/vnd.apple.mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  67. L18 _(in `js/init`)_ `»    a.download = options.filename«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  68. L19 _(in `js/function`)_ `let »time = hour > 0 ? hour + ":" : «"";`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L20 _(in `js/function`)_ `time» += min.toString().padStart(2, '0') + ":"«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  70. L85 `»data«.parsing = "m3u8";`  · ASSIGN:identifier
  71. L86 `} else if (isMPD(»data«)) {`  · ASSIGN:identifier
  72. L24 (→L25) `[true, n»ew Map()],  // 当前页面«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  73. L25 `[fal»se, new M«ap()]  // 其他页面`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  74. L92 `if (»data.favIconUrl && !favicon.has(data.webUrl)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  75. L87 _(in `js/init`)_ `»{ "ext": "acc", "size": 0,« "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, RETURN:json.stringify
  76. L88 `} else if (isJSON(»data«)) {`  · ASSIGN:identifier
  77. L29 (→L31) `// 储存所有扩展名，保»存是否筛选状态 来判断新加入的资源 立刻判断是否需要隐藏«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  78. L30 `const fi»lterExt =« new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  79. L93 `favicon.set(»data.webUrl, data.favIconUrl«);`  · ASSIGN:identifier, ELEMENT:member-element
  80. L89 `»data«.parsing = "json";`  · ASSIGN:identifier
  81. L95 `»data.isPlay = isPlay(data«);`  · ASSIGN:identifier
  82. L918 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  83. L36 `const »downData = []«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
  84. L38 `const fa»vicon = «new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  85. L39 _(in `js/init`)_ `»return c«hrome.i18n.getMessage(key);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  86. L40 `let page»DOM = un«defined;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  87. L41 _(in `js/popup-utils`)_ `»data.ext« == "webp" ||`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  88. L42 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "HeartBeat" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  89. L920 `return »isMediaExt(data.ext) || typeArray.includes(data.type) || isM3U8(data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  90. L46 _(in `js/popup-utils`)_ `return ['ogg', 'ogv', 'mp4', 'webm', 'mp3', 'wav', 'm4a', '3gp', 'mpeg', 'mov', 'm4s', 'aac'].includes(»ext«);`  · ASSIGN:identifier
  91. L97 `if (allData.get(»currentTab).has(data.requestId«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  92. L98 `»data.requestId = data.requestId + "_"« + Date.now().toString();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  93. L106 `${G.ShowWebIco ? »`<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.requestId}" src="${data.favIconUrl}"/>`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  94. L108 `<span class="name ${data.parsing || data.isRegex || data.tabId == -1 ? "bold" : ""}">${»trimName«}</span>`  · ASSIGN:identifier
  95. L109 `<span class="size ${data.size ? "" : "hide"}">${»data.size«}</span>`  · ASSIGN:identifier, ELEMENT:member-element
  96. L111 `<img src="img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${»data.parsing«}" title="${i18n.parser}"/>`  · ASSIGN:identifier, ELEMENT:member-element
  97. L121 `${data.title ? »`<b>${i18n.title}:</b> ${data.title}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  98. L122 `${data.type ? »`<br><b>MIME:</b>  ${data.type}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  99. L130 `<a href="${»data.url}" target="_blank" download="${data.downFileName}">${data.url«}</a>`  · ASSIGN:identifier, ELEMENT:member-element
  100. L102 (→L135) `»data.html = $(`«`  · ASSIGN:template-literal, ASSIGN:identifier
  101. L138 `»data.urlPanel = data.html.find(".url")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  102. L139 `»data«.urlPanelShow = false;`  · ASSIGN:identifier
  103. L140 `»data.panelHeading = data.html.find(".panel-heading")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  104. L141 (→L206) `»data.panelHeading.click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L208 (→L211) `»data.html.find("#qrcode").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  106. L213 (→L215) `»data.html.find("#catDown").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  107. L216 (→L218) `»data.html.find("#catDownFFmpeg").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  108. L220 (→L225) `»data.html.find('#copy').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  109. L227 (→L235) `»data.html.find('#aria2').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  110. L237 (→L285) `»data.html.find('#download').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  111. L287 (→L316) `»data.html.find('.invoke').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  112. L318 (→L331) `»data.html.find('#play').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  113. L333 (→L336) `»data.html.find('#parsing').click(function (e) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  114. L338 `»data«._checked = checkboxState;`  · ASSIGN:identifier
  115. L339 `»data.html.find(".DownCheck").prop("checked", data._checked)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  116. L340 (→L344) `»data.html.find('input').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  117. L345 `Object.defineProperty(»data«, "checked", {`  · ASSIGN:identifier
  118. L356 (→L363) `»data.html.find("#send2local").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  119. L366 (→L393) `»data.html.find("#mqtt").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  120. L396 `allData.get(»currentTab).set(data.requestId, data«);`  · ASSIGN:identifier, ELEMENT:member-element
  121. L399 `if (!filterExt.has(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  122. L400 `filterExt.set(»data.ext«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  123. L417 `if (!filterExt.get(»data.ext) || duplicateFilenamesSet?.has(data.name«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  124. L401 `const html = $(»`<label class="flexFilter" id="${data.ext}"><input type="checkbox" checked>${data.ext}</label>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  125. L418 `»data.html.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  126. L419 `»data.html.find("input").prop("checked", false)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  127. L421 `duplicateFilenamesSet && duplicateFilenamesSet.add(»data.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  128. L423 `return »data.html«;`  · ASSIGN:identifier, ELEMENT:member-element
  129. L822 `if (»Message.data.tabId« == G.tabId) {`  · ELEMENT:member-element, ASSIGN:binary-left
  130. L825 `$current.append(»html«);`  · ASSIGN:identifier
  131. L142 `»data.urlPanelShow = !data.urlPanelShow«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  132. L143 `const mediaInfo = »data.html.find("#mediaInfo")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L144 `const preview = »data.html.find("#preview")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  134. L145 `if (»!data.urlPanelShow«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  135. L154 `»data.urlPanel.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  136. L147 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  137. L150 `»data.urlPanel.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  138. L155 `if (»!mediaInfo.data("state")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  139. L151 `»!preview[0].paused && preview.trigger("pause")«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, RETURN:fallback-return
  140. L156 `»mediaInfo.data("state", true)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  141. L157 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  142. L203 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  143. L177 `} else if (»data.isPlay«) {`  · ASSIGN:identifier, ELEMENT:member-element
  144. L159 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  145. L178 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  146. L181 `} else if (isPicture(»data«)) {`  · ASSIGN:identifier
  147. L189 (→L200) `»preview.on("loadedmetadata", function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  148. L182 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  149. L160 `hls.loadSource(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  150. L161 `hls.attachMedia(»preview[0]«);`  · ASSIGN:identifier, ELEMENT:member-element
  151. L165 `!data.tracks.audio && »mediaInfo.append(`<br><b>${i18n.noAudio}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  152. L166 `!data.tracks.video && »mediaInfo.append(`<br><b>${i18n.noVideo}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  153. L173 `if (»data.levels.length > 1 && !mediaInfo.text().includes(i18n.m3u8Playlist)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  154. L174 `»mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  155. L179 `»preview.attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  156. L183 `»data.html.find("#screenshots").show().attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  157. L190 `»preview.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  158. L192 `»data«.duration = this.duration;`  · ASSIGN:identifier
  159. L193 `»mediaInfo.append(`<br><b>${i18n.duration}:</b> ` + secToTime(this.duration))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  160. L196 `»mediaInfo.append(`<br><b>${i18n.resolution}:</b> ` + this.videoWidth + "x" + this.videoHeight)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  161. L197 `»data«.videoWidth = this.videoWidth;`  · ASSIGN:identifier
  162. L198 `»data«.videoHeight = this.videoHeight;`  · ASSIGN:identifier
  163. L210 `»$(this).html("").qrcode({ width: size, height: size, text: data.url }).off("click")«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  164. L214 `catDownload(»data«);`  · ASSIGN:identifier
  165. L934 `if (!Array.isArray(»data)) { data = [data]«; }`  · ASSIGN:identifier, ELEMENT:object.setProperty
  166. L937 `localStorage.setItem('downloadData', »JSON.stringify(data)«);`  · RETURN:json.stringify
  167. L944 (→L951) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "catDownload", data: data }, (message) => {«`  · ELEMENT:object.setProperty
  168. L217 `catDownload(»data«, { ffmpeg: "addFile" });`  · ASSIGN:identifier
  169. L929 `catDownload(»data«, extra);`  · ASSIGN:identifier
  170. L221 `const text = copyLink(»data«);`  · ASSIGN:identifier
  171. L3 `const _tabId = »parseInt«(params.get("tabId"));`  · ASSIGN:identifier, ELEMENT:member-element
  172. L4 `const _t»ype = params«.get("type");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  173. L6 _(in `js/function`)_ `function append»Zero(date) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  174. L11 _(in `js/init`)_ `* 使用传统下载方式下载 但无法监听 无法另存为 无»法判断下«载是否失败 唉~`  · ASSIGN:identifier
  175. L228 `aria2AddUri(»data«, function (data) {`  · ASSIGN:identifier
  176. L58 (→L63) `»function AddMedia(data, currentTab = true) {«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  177. L67 _(in `js/popup-utils`)_ `const »params = { out: data.downFileName }«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  178. L71 _(in `js/function`)_ `function set»RequestHeaders(data = {}, ca«llback = undefined) {`  · ASSIGN:identifier, ELEMENT:member-element
  179. L77 _(in `js/init`)_ `{ "e»xt": "f4v", "size": 0, "operator":« ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element
  180. L81 _(in `js/function`)_ `»                "requestHeaders": Ob«ject.keys(data).map(key => ({ header: key, operation: "set", value: data[key] }))`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  181. L82 (→L94) `»    // 是否需要解析«`  · ELEMENT:object.setProperty
  182. L238 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  183. L239 `if (»!data.url.startsWith("blob:")«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  184. L275 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  185. L240 `const m3u8dlArg = »data.m3u8dlArg ?? templates(G.m3u8dlArg, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  186. L276 `open»Parser(data«, { autoDown: true });`  · ASSIGN:identifier
  187. L280 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  188. L281 `filename: »data.downFileName«,`  · ASSIGN:identifier, ELEMENT:member-element
  189. L283 `}, function (id) { downData[id] = »data«; });`  · ASSIGN:identifier
  190. L241 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:identifier, ASSIGN:binary-right
  191. L10 _(in `js/media-control`)_ `clearInte»rval(VideoTagTimer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  192. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  193. L242 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  194. L243 `navigator.clipboard.writeText(»m3u8dlArg«);`  · ASSIGN:identifier
  195. L267 `window.location.href = »url«;`  · ASSIGN:identifier
  196. L270 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  197. L256 `»data«.m3u8dlArg = confirm.find("textarea").val();`  · ASSIGN:identifier
  198. L257 `»data.html.find('#download').click()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  199. L311 `window.location.href = »url«;`  · ASSIGN:identifier
  200. L313 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  201. L324 `let url = templates(G.Player, »data«);`  · ASSIGN:identifier
  202. L334 `openParser(»data«);`  · ASSIGN:identifier
  203. L341 `»data«._checked = this.checked;`  · ASSIGN:identifier
  204. L347 `return »data._checked«;`  · ASSIGN:identifier, ELEMENT:member-element
  205. L350 `»data«._checked = newValue;`  · ASSIGN:identifier
  206. L351 `»data.html.find('input').prop("checked", newValue)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  207. L357 `send2local("catch", »data, data.tabId«).then(function (success) {`  · ASSIGN:identifier, ELEMENT:member-element
  208. L664 `chrome.runt»ime.sendMessage({ Message: "autoDown", tabId: G.tab«Id }, function () {`  · ASSIGN:identifier, ASSIGN:template-literal, MUTATE:string.replace, ELEMENT:member-element-container
  209. L667 _(in `js/function`)_ `»data«.action = action;`  · ASSIGN:identifier
  210. L665 _(in `js/function`)_ `»data = { tabId: tabId }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  211. L668 _(in `js/function`)_ `let »postData = templates(body, data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  212. L332 _(in `js/function`)_ `text = »text.replace«(reTemplates, function (original, tag, action) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  213. L346 `get»() {«`  · ASSIGN:identifier
  214. L669 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:implicit.add
  215. L370 `if ($mq»ttButton.hasCla«ss('mqtt-sending')) {`  · RETURN:json.parse
  216. L606 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  217. L578 `if» (data.html.is(":hidden")) { return tru«e; }`  · ELEMENT:object.setProperty
  218. L380 `sendToMQTT(»data«).then(function (success) {`  · ASSIGN:identifier
  219. L112 `»        <img src="img/play.png" class="icon play ${«data.isPlay ? "" : "hide"}" id="play" title="${i18n.preview}"/>`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  220. L113 `»    «    <img src="img/download.svg" class="icon download" id="download" title="${i18n.download}"/>`  · ASSIGN:identifier
  221. L114 `<img src»="im«g/aria2.png" class="icon aria2 ${G.enableAria2Rpc ? "" : "hide"}"" id="aria2" title="Aria2"/>`  · ASSIGN:identifier
  222. L688 _(in `js/function`)_ `let body = »G.send2localBody.replaceAll«('${data}', `[${results.join(",")}]`);`  · ELEMENT:member-element-container
  223. L689 _(in `js/function`)_ `let »postData = templates(body, { action, tabId })«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  224. L690 _(in `js/function`)_ `»postData = JSONparse(postData, arrayData[0])«;`  · ELEMENT:implicit.add
  225. L841 `if (item.url == »Message.url«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  226. L847 `$maybeKey.append(AddKey(»Message.data«));`  · ELEMENT:member-element
  227. L428 `const base64Key = base64ToHex(»key«);`  · ASSIGN:identifier
  228. L1074 `binaryString = »atob(base64)«;`  · ASSIGN:identifier, RETURN:atob
  229. L1080 `for (let i = 0; i < »binaryString.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  230. L1081 `let hex = »binaryString.charCodeAt(i).toString(16)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  231. L1082 `if (»hex.length« === 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  232. L1083 `hex = '0' + »hex«;`  · ASSIGN:identifier, ASSIGN:binary-right
  233. L1085 `hexString += »hex«;`  · ASSIGN:identifier
  234. L1087 `return »hexString«;`  · ASSIGN:identifier
  235. L429 `if (»!base64Key«) { return; }`  · ASSIGN:identifier, ASSIGN:unary
  236. L435 `<span class="name bold">${»key«}</span>`  · ASSIGN:identifier
  237. L440 `Hex: ${»base64Key«}`  · ASSIGN:identifier
  238. L442 `Base64: ${»key«}`  · ASSIGN:identifier
  239. L432 (→L444) `»    data.html = $(`«`  · ASSIGN:template-literal

---

## Flow #14 — JQUERY_ELEMENT_VAL (#videoTabIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L51:C16 -> L51:C28  `if (»currentTabId« == -1) { return; }`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (mediaControl) — `js/media-control` L104:C16 -> L104:C120  `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (465 raw steps → 25 distinct lines):
   1. L51 `if (»currentTabId« == -1) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left
   2. L52 `_tabId = »parseInt(currentTabId)«;`  · ASSIGN:identifier, RETURN:parseInt
   3. L54 `chrome.tabs.sendMessage(»_tabId«, { Message: "getVideoState", index: _index }, { frameId: 0 }, function (state) {`  · ASSIGN:identifier
   4. L49 `if (»_tabId« == -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L104 `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L138 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   7. L145 `chrome.tabs.sendMessage(»_tabId«, { Message: "speed", speed: 1, index: _index });`  · ASSIGN:identifier
   8. L141 `chrome.tabs.sendMessage(»_tabId«, { Message: "speed", speed: speed, index: _index });`  · ASSIGN:identifier
   9. L149 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  10. L150 `chrome.tabs.sendMessage(»_tabId«, { Message: "pip", index: _index }, function (state) {`  · ASSIGN:identifier
  11. L157 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  12. L158 `chrome.tabs.get(»_tabId«, function (tab) {`  · ASSIGN:identifier
  13. L160 `chrome.tabs.sendMessage(»_tabId«, { Message: "fullScreen", index: _index }, function (state) {`  · ASSIGN:identifier
  14. L168 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  15. L170 `chrome.tabs.sendMessage(»_tabId«, { Message: action, index: _index });`  · ASSIGN:identifier
  16. L36 `if (»tab == G.tabId && _tabId == -1«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  17. L174 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  18. L176 `chrome.tabs.sendMessage(»_tabId«, { Message: this.id, action: action, index: _index });`  · ASSIGN:identifier
  19. L180 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  20. L185 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  21. L186 `chrome.tabs.sendMessage(»_tabId«, { Message: "setVolume", volume: $(this).val(), index: _index }, function () {`  · ASSIGN:identifier
  22. L193 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  23. L194 `chrome.tabs.sendMessage(»_tabId«, { Message: "setTime", time: $(this).val(), index: _index }, function () {`  · ASSIGN:identifier
  24. L201 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  25. L202 `chrome.tabs.sendMessage(»_tabId«, { Message: "screenshot", index: _index });`  · ASSIGN:identifier

---

## Flow #15 — JQUERY_ELEMENT_VAL (#videoTabIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L114:C21 -> L114:C56  `_tabId = »parseInt($("#videoTabIndex").val())«;`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (mediaControl) — `js/media-control` L118:C8 -> L118:C112  `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (11 raw steps → 4 distinct lines):
   1. L114 `_tabId = »parseInt($("#videoTabIndex").val())«;`  · RETURN:parseInt
   2. L118 `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L49 `if (»_tabId« == -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L54 `chrome.tabs.sendMessage(»_tabId«, { Message: "getVideoState", index: _index }, { frameId: 0 }, function (state) {`  · ASSIGN:identifier

---

## Flow #16 — JQUERY_ELEMENT_VAL (#videoIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L116:C21 -> L116:C53  `_index = »parseInt($("#videoIndex").val())«;`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (mediaControl) — `js/media-control` L118:C8 -> L118:C112  `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (60 raw steps → 14 distinct lines):
   1. L116 `_index = »parseInt($("#videoIndex").val())«;`  · RETURN:parseInt
   2. L118 `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L54 (→L85) `chrome.tabs.sendMessage(_tabId, { Message: "getVideoState", index: »_index }, { frameId: 0 }, function (state) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L138 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   5. L145 `»chrome.tabs.sendMessage(_tabId, { Message: "speed", speed: 1, index: _index })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L141 `»chrome.tabs.sendMessage(_tabId, { Message: "speed", speed: speed, index: _index })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L149 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   8. L150 (→L153) `chrome.tabs.sendMessage(_tabId, { Message: "pip", index: »_index }, function (state) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L157 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  10. L160 (→L162) `chrome.tabs.sendMessage(_tabId, { Message: "fullScreen", index: »_index }, function (state) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L168 `if (»_index < 0 || _tabId < 0«) { return; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  12. L170 `»chrome.tabs.sendMessage(_tabId, { Message: action, index: _index })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L83 `_index = _index == -1 ? 0 : »_index«;`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  14. L84 `$("#videoIndex").val(»_index«);`  · ASSIGN:identifier

---

## Flow #17 — JQUERY_ELEMENT_VAL (#playbackRate)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L140:C26 -> L140:C62  `const speed = »parseFloat($("#playbackRate").val())«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (playbackRate) — `js/media-control` L142:C12 -> L142:C60  `»chrome.storage.sync.set({ playbackRate: speed })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (5 raw steps → 3 distinct lines):
   1. L140 `const speed = »parseFloat($("#playbackRate").val())«;`  · RETURN:parseFloat
   2. L141 `»chrome.tabs.sendMessage(_tabId, { Message: "speed", speed: speed, index: _index })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L142 `»chrome.storage.sync.set({ playbackRate: speed })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #18 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/media-control` L30:C16 -> L40:C18 (spans to L40)  `»chrome.tabs.sendMessage(tab, { Message: "getVideoState", index: 0 }, { frameId: 0 }, function (state) {«`
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (#volume) — `js/media-control` L60:C12 -> L60:C42  `»$("#volume").val(state.volume)«;`
  - `JQUERY_ELEMENT_HTML_SET` (#timeShow) — `js/media-control` L62:C16 -> L62:C101  `»$("#timeShow").html(secToTime(state.currentTime) + " / " + secToTime(state.duration))«;`
  - `JQUERY_ELEMENT_VAL_SET` (#time) — `js/media-control` L63:C16 -> L63:C42  `»$("#time").val(state.time)«;`
  - `JQUERY_ELEMENT_VAL_SET` (#playbackRate) — `js/media-control` L70:C16 -> L70:C51  `»$("#playbackRate").val(state.speed)«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (1140 raw steps → 36 distinct lines):
   1. L30 (→L40) `»                chrome.tabs.sendMessage(tab, { Message: "getVideoState", index: 0 }, { frameId: 0 }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
   2. L31 `if (»chrome.runtime.lastError || state.count == 0«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
   3. L54 (→L85) `»        chrome.tabs.sendMessage(_tabId, { Message: "getVideoState", index: _index }, { frameId: 0 }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
   4. L55 `if (»chrome.runtime.lastError || state.count == 0«) { return; }`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
   5. L56 `if (»state.type« == "audio") {`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L60 `$("#volume").val(»state.volume«);`  · ELEMENT:member-element
   7. L61 `if (»state.duration && state.duration != Infinity«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L62 `$("#timeShow").html(»secToTime(state.currentTime) + " / " + secToTime(state.duration)«);`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
   9. L16 `for »(let tab o«f tabs) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L17 `» videoTabList.pus«h(tab.id);`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L18 _(in `js/function`)_ `sec = (»sec % 60«) | 0;`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L19 `if (compareTab».toString(«) == videoTabList.toString()) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent
  13. L20 _(in `js/function`)_ `time += »min.toString().padStart(2, '0')« + ":";`  · ASSIGN:identifier, RETURN:Primitive.toString, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  14. L21 _(in `js/function`)_ `time += »sec.toString().padStart(2, '0')«;`  · ASSIGN:identifier, RETURN:Primitive.toString, ELEMENT:member-element, RETURN:fallback-return
  15. L22 `» com«pareTab = videoTabList;`  · ASSIGN:identifier
  16. L65 `»state.paused« ? $("#control").html(i18n.play).data("switch", "play") : $("#control").html(i18n.pause).data("switch", "pause");`  · ELEMENT:member-element
  17. L63 `$("#time").val(»state.time«);`  · ELEMENT:member-element
  18. L66 `»state.speed« == 1 ? $("#speed").html(i18n.speedPlayback).data("switch", "speed") : $("#speed").html(i18n.normalPlay).data("switch", "normal");`  · ELEMENT:member-element, ASSIGN:binary-left
  19. L67 `$("#loop").prop("checked", »state.loop«);`  · ELEMENT:member-element
  20. L68 `$("#muted").prop("checked", »state.muted«);`  · ELEMENT:member-element
  21. L69 `if (»setSpeed && state.speed != 1«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  22. L70 `$("#playbackRate").val(»state.speed«);`  · ELEMENT:member-element
  23. L72 `if (»compareVideo.toString() != state.src.toString()«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:identifier, ASSIGN:binary-left
  24. L73 `compareVideo = »state.src«;`  · ELEMENT:member-element
  25. L75 `for (let i = 0; i < »state.count«; i++) {`  · ELEMENT:member-element, ASSIGN:binary-right
  26. L76 `let src = »state.src[i].split("/").pop()«;`  · ELEMENT:member-element, RETURN:fallback-return
  27. L77 `if (»src.length« >= 60) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  28. L78 `src = »src.substr(0, 35) + '...' + src.substr(-35)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  29. L80 `$("#videoIndex").append(»`<option value='${i}'>${src}</option>`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  30. L97 (→L105) `»            chrome.tabs.sendMessage(G.mediaControl.tabid, { Message: "getVideoState", index: 0 }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  31. L99 `if (»state.count« > G.mediaControl.index) {`  · ELEMENT:member-element, ASSIGN:binary-left
  32. L150 (→L153) `»        chrome.tabs.sendMessage(_tabId, { Message: "pip", index: _index }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  33. L152 `»state.state« ? $("#pip").html(i18n.exit) : $("#pip").html(i18n.pictureInPicture);`  · ELEMENT:member-element
  34. L160 (→L162) `»                chrome.tabs.sendMessage(_tabId, { Message: "fullScreen", index: _index }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  35. L186 (→L189) `»        chrome.tabs.sendMessage(_tabId, { Message: "setVolume", volume: $(this).val(), index: _index }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  36. L194 (→L197) `»        chrome.tabs.sendMessage(_tabId, { Message: "setTime", time: $(this).val(), index: _index }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`

---

## Flow #19 — ELEMENT_INNER_HTML

- **Source**: `ELEMENT_INNER_HTML` — `js/media-control` L30:C16 -> L40:C18 (spans to L40)  `»chrome.tabs.sendMessage(tab, { Message: "getVideoState", index: 0 }, { frameId: 0 }, function (state) {«`
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (#volume) — `js/media-control` L60:C12 -> L60:C42  `»$("#volume").val(state.volume)«;`
  - `JQUERY_ELEMENT_HTML_SET` (#timeShow) — `js/media-control` L62:C16 -> L62:C101  `»$("#timeShow").html(secToTime(state.currentTime) + " / " + secToTime(state.duration))«;`
  - `JQUERY_ELEMENT_VAL_SET` (#time) — `js/media-control` L63:C16 -> L63:C42  `»$("#time").val(state.time)«;`
  - `JQUERY_ELEMENT_VAL_SET` (#playbackRate) — `js/media-control` L70:C16 -> L70:C51  `»$("#playbackRate").val(state.speed)«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (882 raw steps → 36 distinct lines):
   1. L30 (→L40) `»                chrome.tabs.sendMessage(tab, { Message: "getVideoState", index: 0 }, { frameId: 0 }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
   2. L31 `if (»chrome.runtime.lastError || state.count == 0«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
   3. L54 (→L85) `»        chrome.tabs.sendMessage(_tabId, { Message: "getVideoState", index: _index }, { frameId: 0 }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
   4. L55 `if (»chrome.runtime.lastError || state.count == 0«) { return; }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
   5. L56 `if (»state.type« == "audio") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L60 `$("#volume").val(»state.volume«);`  · ASSIGN:identifier, ELEMENT:member-element
   7. L61 `if (»state.duration && state.duration != Infinity«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L62 `$("#timeShow").html(»secToTime(state.currentTime) + " / " + secToTime(state.duration)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
   9. L16 `for »(let tab o«f tabs) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L17 `» videoTabList.pus«h(tab.id);`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L18 _(in `js/function`)_ `sec = (»sec % 60«) | 0;`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L19 `if (compareTab».toString(«) == videoTabList.toString()) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:conditional-consequent
  13. L20 _(in `js/function`)_ `time += »min.toString().padStart(2, '0')« + ":";`  · ASSIGN:identifier, RETURN:Primitive.toString, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  14. L21 _(in `js/function`)_ `time += »sec.toString().padStart(2, '0')«;`  · ASSIGN:identifier, RETURN:Primitive.toString, ELEMENT:member-element, RETURN:fallback-return
  15. L22 `» com«pareTab = videoTabList;`  · ASSIGN:identifier
  16. L65 `»state.paused« ? $("#control").html(i18n.play).data("switch", "play") : $("#control").html(i18n.pause).data("switch", "pause");`  · ASSIGN:identifier, ELEMENT:member-element
  17. L63 `$("#time").val(»state.time«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L66 `»state.speed« == 1 ? $("#speed").html(i18n.speedPlayback).data("switch", "speed") : $("#speed").html(i18n.normalPlay).data("switch", "normal");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L67 `$("#loop").prop("checked", »state.loop«);`  · ASSIGN:identifier, ELEMENT:member-element
  20. L68 `$("#muted").prop("checked", »state.muted«);`  · ASSIGN:identifier, ELEMENT:member-element
  21. L69 `if (»setSpeed && state.speed != 1«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  22. L70 `$("#playbackRate").val(»state.speed«);`  · ASSIGN:identifier, ELEMENT:member-element
  23. L72 `if (»compareVideo.toString() != state.src.toString()«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:binary-left
  24. L73 `compareVideo = »state.src«;`  · ASSIGN:identifier, ELEMENT:member-element
  25. L75 `for (let i = 0; i < »state.count«; i++) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  26. L76 `let src = »state.src[i].split("/").pop()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  27. L77 `if (»src.length« >= 60) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  28. L78 `src = »src.substr(0, 35) + '...' + src.substr(-35)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  29. L80 `$("#videoIndex").append(»`<option value='${i}'>${src}</option>`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  30. L97 (→L105) `»            chrome.tabs.sendMessage(G.mediaControl.tabid, { Message: "getVideoState", index: 0 }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  31. L99 `if (»state.count« > G.mediaControl.index) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  32. L150 (→L153) `»        chrome.tabs.sendMessage(_tabId, { Message: "pip", index: _index }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  33. L152 `»state.state« ? $("#pip").html(i18n.exit) : $("#pip").html(i18n.pictureInPicture);`  · ASSIGN:identifier, ELEMENT:member-element
  34. L160 (→L162) `»                chrome.tabs.sendMessage(_tabId, { Message: "fullScreen", index: _index }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  35. L186 (→L189) `»        chrome.tabs.sendMessage(_tabId, { Message: "setVolume", volume: $(this).val(), index: _index }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`
  36. L194 (→L197) `»        chrome.tabs.sendMessage(_tabId, { Message: "setTime", time: $(this).val(), index: _index }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/media-control]`

---

## Flow #20 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `lib/hls.min` L1:C223847 -> L1:C223848  `…f.postMessage({event:e,data:t,instanceNo:r})}void 0!==t&&t&&self.addEventListener("message",(function(e){var t=e.data,r=»t«.instanceNo;if(void 0!==r){var i=la[r];if("reset"===t.cmd&&(delete la[t.resetNo],i&&i.destroy(),t.cmd="init"),"init"===t…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C223724 -> L1:C223771  `…event:"transmuxComplete",data:t[0],instanceNo:i}),e.postMessage({event:"flush",data:r,instanceNo:i})}function fa(e,t,r){»self.postMessage({event:e,data:t,instanceNo:r})«}void 0!==t&&t&&self.addEventListener("message",(function(e){var t=e.data,r=t.instanceNo;if(void 0!==r){var i=la[r];if("…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C223369 -> L1:C223432  `…deo||i.text||i.id3||i.initSegment))return!1;var i,n=[],a=t.remuxResult,s=a.audio,o=a.video;return s&&da(n,s),o&&da(n,o),»e.postMessage({event:"transmuxComplete",data:t,instanceNo:r},n)«,!0}function da(e,t){t.data1&&e.push(t.data1.buffer),t.data2&&e.push(t.data2.buffer)}function ha(e,t,r,i){t.reduce((func…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C223589 -> L1:C223653  `…t.data1.buffer),t.data2&&e.push(t.data2.buffer)}function ha(e,t,r,i){t.reduce((function(t,r){return ua(e,r,i)||t}),!1)||»e.postMessage({event:"transmuxComplete",data:t[0],instanceNo:i})«,e.postMessage({event:"flush",data:r,instanceNo:i})}function fa(e,t,r){self.postMessage({event:e,data:t,instanceNo:r})}v…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C223654 -> L1:C223704  `…,i){t.reduce((function(t,r){return ua(e,r,i)||t}),!1)||e.postMessage({event:"transmuxComplete",data:t[0],instanceNo:i}),»e.postMessage({event:"flush",data:r,instanceNo:i})«}function fa(e,t,r){self.postMessage({event:e,data:t,instanceNo:r})}void 0!==t&&t&&self.addEventListener("message",(func…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (627 raw steps → 1 distinct lines):
   1. L1 `…s=a.audio,o=a.video;»return s&&da(n,s),o&&da(n,o),e.postMessage({event:"transmuxComplete",data:t,instanceNo:r},n),!0}function da(e,t){t.data1 …⟨tainted span: 1597 chars⟩… ROR,details:k.FRAG_PARSING_ERROR,chunkMeta:t.chunkMeta,fatal:!1,error:e,err:e,reason:"transmuxer-worker flush error"},r)«})):ha(self,u,l,r)}}…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, RETURN:json.parse, ELEMENT:object.setProperty

---

## Flow #21 — ELEMENT_INNER_HTML (i18n)

- **Source**: `ELEMENT_INNER_HTML` — `js/i18n` L9:C28 -> L9:C72  `element.outerHTML = »i18n(element.innerHTML) ?? element.innerHTML«;`
- **Sink(s)**:
  - `DOM_INNER_HTML` (outerHTML) — `js/i18n` L9:C16 -> L9:C25  `element.»outerHTML« = i18n(element.innerHTML) ?? element.innerHTML;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L9 `element.outerHTML = »i18n(element.innerHTML) ?? element.innerHTML«;`  · ASSIGN:logical-right
   2. L8 (→L10) `»    document.querySelectorAll('i18n').forEach(function (element) {«`  · ELEMENT:object.setProperty

---

## Flow #22 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/function` L325:C47 -> L325:C66  `userAgent: G.userAgent ? G.userAgent : »navigator.userAgent«,`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `js/options` L231:C8 -> L233:C10 (spans to L233)  `»chrome.storage.sync.set({ [Option]: G.OptionLists[Option] }, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (35 raw steps → 8 distinct lines):
   1. L325 _(in `js/function`)_ `userAgent: G.userAgent ? G.userAgent : »navigator.userAgent«,`  · ASSIGN:conditional-alternate
   2. L293 (→L326) `»    for (let i = 1; i < result.length; i++) {«`  · ELEMENT:object.setProperty
   3. L331 `»  if (keys.includes(item) && imp«ortData[item] !== undefined) {`  · ELEMENT:object.setProperty, COPY:object-spread
   4. L231 (→L233) `chrome.storage.sync.set({ [Option]: »G.OptionLists[Option] }, () => {«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:object.setProperty
   5. L326 `»    importData = Base6«4.decode(importData);`  · ELEMENT:object.setProperty, COPY:object-spread
   6. L342 _(in `js/init`)_ `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar«, function (items) {`  · ELEMENT:member-element-container
   7. L345 _(in `js/init`)_ `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   8. L242 `acc[id] = »G.OptionLists[id]«;`  · ELEMENT:computed-member-unknown-alternative

---
