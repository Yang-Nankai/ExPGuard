# Source-level Taint Flow — iekecadicdlboncnocjmnkajchdafecb 2.7.1

- Source type: CRX
- Files with issues: 11 / 16
- Distinct taint flows: 14  (collapsed from 15 raw issue entries)
- Sinkless sources skipped: 37 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/content-script` L282:C31 -> L282:C65  `event.data.title = »event.data.title ?? document.title« ?? new Date().getTime().toString();`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L161:C20 -> L161:C44  `»window.postMessage(data)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L163:C20 -> L163:C36  `»fetch(data.data)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L167:C28 -> L167:C52  `»window.postMessage(data)«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L152:C16 -> L152:C43  `»window.postMessage(Message)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (212 raw steps → 30 distinct lines):
   1. L282 `»event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString()«;`  · ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty
   2. L283 `event.data.title = »event.data.title.replaceAll('"', "").replaceAll("'", "").replaceAll(" ", "")«;`  · ELEMENT:member-element, RETURN:fallback-return
   3. L295 `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
   4. L299 `»chrome.runtime.sendMessage({ Message: "closeScript", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
   5. L290 `»data = { ...event.data, ...data }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   6. L158 `const »data = { ...Message, ...item }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
   7. L160 `if (»data.data« instanceof Blob) {`  · ELEMENT:member-element, ELEMENT:member-element-container
   8. L163 `fetch(»data.data«)`  · ELEMENT:member-element, ELEMENT:member-element-container
   9. L6 (→L198) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/content-script]; runtime.single.sender.message[js/popup->js/content-script]`
  10. L9 `if (»Message.Message« == "getVideoState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L58 `if (»Message.Message« == "speed") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L65 `if (»Message.Message« == "pip") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L76 `if (»Message.Message« == "fullScreen") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L89 `if (»Message.Message« == "play") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L94 `if (»Message.Message« == "pause") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L99 `if (»Message.Message« == "loop") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L106 `if (»Message.Message« == "setVolume") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L114 `if (»Message.Message« == "muted") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L121 `if (»Message.Message« == "setTime") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L129 `if (»Message.Message« == "screenshot") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  21. L146 `if (»Message.Message« == "getKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L150 `if (»Message.Message« == "ffmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  23. L151 `if (»!Message.files«) {`  · ELEMENT:member-element-container, ASSIGN:unary
  24. L156 `Message.quantity ??= »Message.files.length«;`  · ELEMENT:member-element-container, ELEMENT:member.length
  25. L517 _(in `js/background`)_ `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty
  26. L157 `for (»let item of Message.files«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  27. L159 `data.type = »item.type ?? "video"«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  28. L174 `if (»Message.Message« == "getPage") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  29. L183 `if (»Message.Message« == "getM3u8Text") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  30. L191 `if (»Message.Message« == "getM3u8Cache") {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content-script` L236:C12 -> L236:C23  `if (»!event.data« || !event.data.action || event.origin !== window.location.origin || !action.includes(event.data.action)) { return; }`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L248:C16 -> L248:C37  `»fetch(event.data.url)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L152:C16 -> L152:C43  `»window.postMessage(Message)«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L161:C20 -> L161:C44  `»window.postMessage(data)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L163:C20 -> L163:C36  `»fetch(data.data)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L167:C28 -> L167:C52  `»window.postMessage(data)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (495 raw steps → 60 distinct lines):
   1. L236 `if (»!event.data || !event.data.action || event.origin !== window.location.origin || !action.includes(event.data.action)«) { return; }`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L240 `if (»event.data.action« == "catCatchAddMedia") {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L241 `if (»!event.data.url«) { return; }`  · ELEMENT:member-element, ASSIGN:unary
   4. L258 `if (»event.data.action« == "catCatchAddKey") {`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L259 `let key = »event.data.key«;`  · ELEMENT:member-element
   6. L276 `if (»event.data.action« == "catCatchFFmpeg") {`  · ELEMENT:member-element, ASSIGN:binary-left
   7. L247 `if (»event.data.url.startsWith("blob:") && isFirefox«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
   8. L260 `if (»key« instanceof ArrayBuffer || key instanceof Array) {`  · ASSIGN:identifier
   9. L277 (→L280) `if (»!event.data.use ||«`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  10. L278 `»!event.data.files« ||`  · ELEMENT:member-element, ASSIGN:unary
  11. L280 `»event.data.files.length« == 0`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  12. L293 `if (»event.data.action« == "catCatchFFmpegResult") {`  · ELEMENT:member-element, ASSIGN:binary-left
  13. L248 `fetch(»event.data.url«)`  · ELEMENT:member-element
  14. L251 `m3u8Text.set(»event.data.url«, text);`  · ELEMENT:member-element
  15. L226 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  16. L224 (→L232) `»        chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  17. L227 `href: »data.href ?? location.href«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  18. L228 `extraExt: »data.ext«,`  · ASSIGN:identifier, ELEMENT:member-element
  19. L229 `mime: »data.mime«,`  · ASSIGN:identifier, ELEMENT:member-element
  20. L230 `requestHeaders: { referer: »data.referer« },`  · ASSIGN:identifier, ELEMENT:member-element
  21. L231 `requestId: »data.requestId«`  · ASSIGN:identifier, ELEMENT:member-element
  22. L261 `»key = ArrayToBase64(key)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  23. L306 `let bytes = »new Uint8Array(data)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  24. L308 `for (let i = 0; i < »bytes.byteLength«; i++) {`  · ELEMENT:member-element, ASSIGN:binary-right
  25. L309 `binary += »String.fromCharCode(bytes[i])«;`  · ELEMENT:member-element, RETURN:string.fromCharCode
  26. L312 `return _btoa(»binary«);`  · ASSIGN:identifier
  27. L314 `return »btoa(binary)«;`  · ASSIGN:identifier, RETURN:btoa
  28. L294 `if (»!event.data.state || !event.data.tabId«) { return; }`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  29. L297 `if (»event.data.action« == "catCatchCloseScript") {`  · ELEMENT:member-element, ASSIGN:binary-left
  30. L263 `if (_key.has(»key«)) { return; }`  · ASSIGN:identifier
  31. L282 `»event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString()«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  32. L283 `event.data.title = »event.data.title.replaceAll('"', "").replaceAll("'", "").replaceAll(" ", "")«;`  · ELEMENT:member-element, RETURN:fallback-return
  33. L295 `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
  34. L299 `»chrome.runtime.sendMessage({ Message: "closeScript", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
  35. L290 `»data = { ...event.data, ...data }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  36. L6 (→L198) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/content-script]; runtime.single.sender.message[js/popup->js/content-script]`
  37. L9 `if (»Message.Message« == "getVideoState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  38. L58 `if (»Message.Message« == "speed") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  39. L65 `if (»Message.Message« == "pip") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  40. L76 `if (»Message.Message« == "fullScreen") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  41. L89 `if (»Message.Message« == "play") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  42. L94 `if (»Message.Message« == "pause") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  43. L99 `if (»Message.Message« == "loop") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  44. L106 `if (»Message.Message« == "setVolume") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  45. L114 `if (»Message.Message« == "muted") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  46. L121 `if (»Message.Message« == "setTime") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  47. L129 `if (»Message.Message« == "screenshot") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  48. L146 `if (»Message.Message« == "getKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  49. L150 `if (»Message.Message« == "ffmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  50. L151 `if (»!Message.files«) {`  · ELEMENT:member-element-container, ASSIGN:unary
  51. L156 `Message.quantity ??= »Message.files.length«;`  · ELEMENT:member-element-container, ELEMENT:member.length
  52. L517 _(in `js/background`)_ `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty
  53. L157 `for (»let item of Message.files«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  54. L158 `const »data = { ...Message, ...item }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:identifier
  55. L159 `data.type = »item.type ?? "video"«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  56. L160 `if (»data.data« instanceof Blob) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  57. L174 `if (»Message.Message« == "getPage") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  58. L163 `fetch(»data.data«)`  · ELEMENT:member-element, ELEMENT:member-element-container
  59. L183 `if (»Message.Message« == "getM3u8Text") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  60. L191 `if (»Message.Message« == "getM3u8Cache") {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L317:C0 -> L560:C2 (spans to L560)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L930:C8 -> L930:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L934:C8 -> L934:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L944:C8 -> L961:C10 (spans to L961)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L965:C4 -> L967:C6 (spans to L967)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L520:C16 -> L524:C18 (spans to L524)  `»chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, function (tab) {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3347 raw steps → 92 distinct lines):
   1. L317 (→L560) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]; runtime.single.sender.message[js/popup->js/background]`
   2. L358 `if (»Message.Message == "getData" && Message.requestId«) {`  · ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left
   3. L324 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
   4. L295 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty
   5. L327 `if (»Message.Message« == "pushData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L333 `if (»Message.Message« == "getAllData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L342 `if (»Message.Message« == "ClearIcon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   8. L348 `if (»Message.Message« == "enable") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   9. L379 `if (»Message.Message« == "getData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L387 `if (»Message.Message« == "getButtonState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L400 `if (»Message.Message« == "mobileUserAgent") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L407 `if (»Message.Message« == "autoDown") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L418 `if (»Message.Message« == "script") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L455 `if (»Message.Message« == "scriptI18n") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L466 `if (»Message.Message« == "HeartBeat") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L476 `if (»Message.Message« == "clearData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L496 `if (»Message.Message« == "clearRedundant") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L502 `if (»Message.Message« == "addMedia") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L516 `if (»Message.Message« == "catCatchFFmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L538 `if (»Message.Message == "send2local" && G.send2local«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  21. L543 `if (»Message.Message« == "damnUrlHas") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L547 `if (»Message.Message« == "closeScript") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  23. L299 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "closeScript", ...event.data })«;`  · ELEMENT:object.setProperty
  24. L548 `if (»!Message.script || !G.scriptList.has(Message.script)«) {`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left
  25. L552 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  26. L554 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  27. L555 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  28. L290 _(in `js/popup`)_ `»            const url = 'm3u8dl:'« + (G.m3u8dl == 1 ? Base64.encode(textarea) : textarea);`  · ELEMENT:object.setProperty
  29. L343 `»Message.type ? SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:object.setProperty
  30. L930 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
  31. L934 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
  32. L360 `if (!Array.isArray(»Message.requestId«)) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  33. L361 `»Message.requestId = [Message.requestId]«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  34. L380 `sendResponse(cacheData[»Message.tabId«]);`  · ELEMENT:member-element-container
  35. L389 `MobileUserAgent: G.featMobileTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  36. L390 `AutoDown: G.featAutoDownTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  37. L364 `if (»Message.requestId.length«) {`  · ELEMENT:member-element-container, ELEMENT:member.length
  38. L401 `mobileUserAgent(»Message.tabId, !G.featMobileTabId.has(Message.tabId«));`  · ELEMENT:member-element-container
  39. L942 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
  40. L964 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
  41. L945 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  42. L944 (→L961) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  43. L947 `"id": »tabId«,`  · ASSIGN:identifier
  44. L957 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  45. L966 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  46. L965 (→L967) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  47. L402 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  48. L408 `if (G.featAutoDownTabId.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  49. L409 `G.featAutoDownTabId.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  50. L411 `G.featAutoDownTabId.add(»Message.tabId«);`  · ELEMENT:member-element-container
  51. L419 `if (G.damn && G.damnUrlSet.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  52. L367 `if (»Message.requestId.includes(data.requestId)«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  53. L457 `target: { tabId: »Message.tabId«, allFrames: true },`  · ELEMENT:member-element-container
  54. L456 (→L461) `»        chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  55. L478 `if (»Message.type«) {`  · ELEMENT:member-element
  56. L422 `if (!G.scriptList.has(»Message.script«)) {`  · ELEMENT:member-element
  57. L426 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  58. L487 `if (item == »Message.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  59. L517 `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member-element-container, ASSIGN:logical-left
  60. L428 `const refresh = »Message.refresh ?? script.refresh«;`  · ELEMENT:member-element, ASSIGN:logical-left
  61. L539 `try { send2local(»Message.action, Message.data, Message.tabId«); } catch (e) { console.log(e); }`  · ELEMENT:member-element-container, ELEMENT:member-element
  62. L429 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  63. L544 `sendResponse(G.damnUrlSet.has(»Message.tabId«));`  · ELEMENT:member-element-container
  64. L430 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  65. L438 `scriptTabid.add(»Message.tabId«);`  · ELEMENT:member-element-container
  66. L431 `if (»Message.script« == "search.js") {`  · ELEMENT:member-element, ASSIGN:binary-left
  67. L439 `if (»refresh«) {`  · ASSIGN:identifier
  68. L432 `G.deepSearchTemporarilyClose = »Message.tabId«;`  · ELEMENT:member-element-container
  69. L440 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  70. L442 `const »files = [`catch-script/${Message.script}`]«;`  · ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add
  71. L445 `target: { tabId: »Message.tabId«, allFrames: script.allFrames },`  · ELEMENT:member-element-container
  72. L444 (→L449) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  73. L434 `refresh && chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  74. L394 `state[item.key] = item.tabId.has(»Message.tabId«);`  · ELEMENT:member-element-container
  75. L505 `if (item.url == »Message.href«) {`  · ELEMENT:member-element, ASSIGN:binary-right
  76. L510 `»findMedia({ url: Message.url, tabId: -1, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, initiator: Message.href, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  77. L102 (→L104) `if (»data.initiator != "null" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  78. L103 `»data.initiator« != undefined &&`  · ASSIGN:binary-left
  79. L972 `if (»!url || url == "null"«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  80. L973 `return »!(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  81. L109 `if (»isSpecialPage(data.url)«) { return; }`  · ELEMENT:implicit.add
  82. L110 `const »urlParsing = new URL(data.url)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  83. L111 `let [name, ext] = fileNameParse(»urlParsing.pathname«);`  · ELEMENT:member-element
  84. L870 `let fileName = »decodeURI(pathname.split("/").pop())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURI
  85. L871 `let ext = »fileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  86. L872 `ext = ext.length == 1 ? undefined : »ext.pop().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  87. L873 `»return [fileName, ext ? ext : undefined];«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ELEMENT:implicit.add
  88. L197 `const »tabFingerprints = G.urlMap.get(data.tabId) || new Set()«;`  · ELEMENT:object.setProperty
  89. L203 `if (»tabFingerprints.size« >= 500) {`  · ELEMENT:member-element, ASSIGN:binary-left
  90. L204 `»tabFingerprints.clear«();`  · ELEMENT:member-element-container
  91. L506 `»findMedia({ url: Message.url, tabId: item.id, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  92. L520 (→L524) `chrome.tabs.create({ url: G.ffmpegConfig.url, active: »Message.active ?? true }, function (tab) {«`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #4 — DOCUMENT_LOCATION (location.href)  ·  2× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `js/background` L317:C0 -> L560:C2 (spans to L560)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L930:C8 -> L930:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L934:C8 -> L934:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L944:C8 -> L961:C10 (spans to L961)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L965:C4 -> L967:C6 (spans to L967)  `»chrome.declarativeNetRequest.updateSessionRules({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L317 (→L560) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]`

---

## Flow #5 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/background` L317:C0 -> L560:C2 (spans to L560)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L930:C8 -> L930:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L934:C8 -> L934:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L944:C8 -> L961:C10 (spans to L961)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L965:C4 -> L967:C6 (spans to L967)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L520:C16 -> L524:C18 (spans to L524)  `»chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, function (tab) {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3283 raw steps → 92 distinct lines):
   1. L317 (→L560) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]; runtime.single.sender.message[js/popup->js/background]`
   2. L324 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:member-element
   3. L295 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty
   4. L327 `if (»Message.Message« == "pushData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L333 `if (»Message.Message« == "getAllData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L342 `if (»Message.Message« == "ClearIcon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L348 `if (»Message.Message« == "enable") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   8. L358 `if (»Message.Message == "getData" && Message.requestId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   9. L379 `if (»Message.Message« == "getData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L387 `if (»Message.Message« == "getButtonState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L400 `if (»Message.Message« == "mobileUserAgent") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L407 `if (»Message.Message« == "autoDown") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L418 `if (»Message.Message« == "script") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L455 `if (»Message.Message« == "scriptI18n") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L466 `if (»Message.Message« == "HeartBeat") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L476 `if (»Message.Message« == "clearData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L496 `if (»Message.Message« == "clearRedundant") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L502 `if (»Message.Message« == "addMedia") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L516 `if (»Message.Message« == "catCatchFFmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L538 `if (»Message.Message == "send2local" && G.send2local«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  21. L543 `if (»Message.Message« == "damnUrlHas") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L547 `if (»Message.Message« == "closeScript") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  23. L299 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "closeScript", ...event.data })«;`  · ELEMENT:object.setProperty
  24. L548 `if (»!Message.script || !G.scriptList.has(Message.script)«) {`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left
  25. L552 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  26. L554 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  27. L555 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  28. L290 _(in `js/popup`)_ `»            const url = 'm3u8dl:'« + (G.m3u8dl == 1 ? Base64.encode(textarea) : textarea);`  · ELEMENT:object.setProperty
  29. L343 `»Message.type ? SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:object.setProperty
  30. L930 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
  31. L934 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
  32. L360 `if (!Array.isArray(»Message.requestId«)) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  33. L361 `»Message.requestId = [Message.requestId]«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  34. L380 `sendResponse(cacheData[»Message.tabId«]);`  · ELEMENT:member-element-container
  35. L389 `MobileUserAgent: G.featMobileTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  36. L390 `AutoDown: G.featAutoDownTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  37. L364 `if (»Message.requestId.length«) {`  · ELEMENT:member-element-container, ELEMENT:member.length
  38. L401 `mobileUserAgent(»Message.tabId, !G.featMobileTabId.has(Message.tabId«));`  · ELEMENT:member-element-container
  39. L942 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
  40. L964 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
  41. L945 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  42. L944 (→L961) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  43. L947 `"id": »tabId«,`  · ASSIGN:identifier
  44. L957 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  45. L966 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  46. L965 (→L967) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  47. L402 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  48. L408 `if (G.featAutoDownTabId.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  49. L409 `G.featAutoDownTabId.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  50. L411 `G.featAutoDownTabId.add(»Message.tabId«);`  · ELEMENT:member-element-container
  51. L419 `if (G.damn && G.damnUrlSet.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  52. L367 `if (»Message.requestId.includes(data.requestId)«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  53. L457 `target: { tabId: »Message.tabId«, allFrames: true },`  · ELEMENT:member-element-container
  54. L456 (→L461) `»        chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  55. L478 `if (»Message.type«) {`  · ELEMENT:member-element
  56. L422 `if (!G.scriptList.has(»Message.script«)) {`  · ELEMENT:member-element
  57. L426 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  58. L487 `if (item == »Message.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  59. L517 `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member-element-container, ASSIGN:logical-left
  60. L428 `const refresh = »Message.refresh ?? script.refresh«;`  · ELEMENT:member-element, ASSIGN:logical-left
  61. L539 `try { send2local(»Message.action, Message.data, Message.tabId«); } catch (e) { console.log(e); }`  · ELEMENT:member-element-container, ELEMENT:member-element
  62. L429 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  63. L544 `sendResponse(G.damnUrlSet.has(»Message.tabId«));`  · ELEMENT:member-element-container
  64. L430 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  65. L438 `scriptTabid.add(»Message.tabId«);`  · ELEMENT:member-element-container
  66. L431 `if (»Message.script« == "search.js") {`  · ELEMENT:member-element, ASSIGN:binary-left
  67. L439 `if (»refresh«) {`  · ASSIGN:identifier
  68. L432 `G.deepSearchTemporarilyClose = »Message.tabId«;`  · ELEMENT:member-element-container
  69. L440 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  70. L442 `const »files = [`catch-script/${Message.script}`]«;`  · ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add
  71. L445 `target: { tabId: »Message.tabId«, allFrames: script.allFrames },`  · ELEMENT:member-element-container
  72. L444 (→L449) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  73. L434 `refresh && chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  74. L394 `state[item.key] = item.tabId.has(»Message.tabId«);`  · ELEMENT:member-element-container
  75. L505 `if (item.url == »Message.href«) {`  · ELEMENT:member-element, ASSIGN:binary-right
  76. L510 `»findMedia({ url: Message.url, tabId: -1, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, initiator: Message.href, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  77. L102 (→L104) `if (»data.initiator != "null" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  78. L103 `»data.initiator« != undefined &&`  · ASSIGN:binary-left
  79. L972 `if (»!url || url == "null"«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  80. L973 `return »!(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  81. L109 `if (»isSpecialPage(data.url)«) { return; }`  · ELEMENT:implicit.add
  82. L110 `const »urlParsing = new URL(data.url)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  83. L111 `let [name, ext] = fileNameParse(»urlParsing.pathname«);`  · ELEMENT:member-element
  84. L870 `let fileName = »decodeURI(pathname.split("/").pop())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURI
  85. L871 `let ext = »fileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  86. L872 `ext = ext.length == 1 ? undefined : »ext.pop().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  87. L873 `»return [fileName, ext ? ext : undefined];«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ELEMENT:implicit.add
  88. L197 `const »tabFingerprints = G.urlMap.get(data.tabId) || new Set()«;`  · ELEMENT:object.setProperty
  89. L203 `if (»tabFingerprints.size« >= 500) {`  · ELEMENT:member-element, ASSIGN:binary-left
  90. L204 `»tabFingerprints.clear«();`  · ELEMENT:member-element-container
  91. L506 `»findMedia({ url: Message.url, tabId: item.id, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  92. L520 (→L524) `chrome.tabs.create({ url: G.ffmpegConfig.url, active: »Message.active ?? true }, function (tab) {«`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #6 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/popup` L2:C6 -> L2:C50  `const »params = new URL(location.href).searchParams«;`
- **Sink(s)**:
  - `FETCH_RESOURCE` (http://localhost:6800/jsonrpc) — `js/popup` L88:C4 -> L94:C6 (spans to L94)  `»} else if (isJSON(data)) {«`  (url-control=FULL)
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L318:C8 -> L322:C50 (spans to L322)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/function` L390:C12 -> L390:C51  `»fetch(send2localURL.toString(), option)«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L553:C12 -> L553:C44  `»chrome.tabs.create({ url: url })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L735:C8 -> L735:C55  `»chrome.tabs.create({ url: G.ffmpegConfig.url })«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L751:C16 -> L751:C98  `»chrome.tabs.create({ url: `preview.html?tabId=${G.tabId}`, index: tab.index + 1 })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L1022:C8 -> L1032:C10 (spans to L1032)  `»chrome.tabs.create(arg, (tab) => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (109595 raw steps → 168 distinct lines):
   1. L2 `const »params = new URL(location.href).searchParams«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container
   2. L3 `const _tabId = »parseInt(params.get("tabId"))«;`  · ELEMENT:member-element, RETURN:fallback-return, RETURN:parseInt
   3. L4 `const _type = »params.get("type")«;`  · ELEMENT:member-element, RETURN:fallback-return
   4. L835 `if (»G.popup && !_tabId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:logical-left
   5. L840 `if (»_tabId«) {`  · ASSIGN:identifier
   6. L841 `G.tabId = »_tabId«;`  · ASSIGN:identifier
   7. L319 _(in `js/init`)_ `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty
   8. L848 `if (»G.getHtmlDOM«) {`  · ELEMENT:member-element-container
   9. L857 (→L874) `chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getData", tabId: »G.tabId }, function (data) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  10. L880 `const html = AddMedia(Message.data, Message.data.tabId == »G.tabId«);`  · ELEMENT:member-element-container, ASSIGN:binary-right
  11. L65 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  12. L72 (→L75) `data.downFileName = G.TitleName ? templates(»G.downFileName, data) : data.name;«`  · ELEMENT:member-element-container, ASSIGN:logical-right, ASSIGN:logical-left
  13. L279 _(in `js/init`)_ `»        chrome.storage.sync.set({ c«opyM3U8: items.copyM3U8 });`  · ASSIGN:identifier, ELEMENT:implicit.add
  14. L43 _(in `js/function`)_ `if (!byte || byt»e < «1024) { return 0; }`  · ASSIGN:identifier
  15. L73 `data».do«wnFileName = filterFileName(data.downFileName);`  · ASSIGN:identifier, ASSIGN:binary-left
  16. L74 `if (»isEmpty(data.downFileNa«me)) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container
  17. L75 `»data.downFileName «= data.name;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty, ELEMENT:implicit.add
  18. L80 _(in `js/init`)_ `TitleName: false,   // 使用»自定义文件名保存文件(默认为网页标«题)`  · ELEMENT:member-element-container
  19. L56 (→L82) `»«`  · ELEMENT:object.setProperty
  20. L81 _(in `js/templates`)_ `userAgent: »G.userAgent ?? navigator.userAgent«,`  · ELEMENT:member-element-container, ASSIGN:logical-left
  21. L84 _(in `js/function`)_ `chrome.dec»larativeNetRequest.updateSession«Rules({ removeRuleIds: [1] });`  · ELEMENT:object.setProperty, COPY:object-spread
  22. L86 _(in `js/function`)_ `const rules = { removeRu»leId«s: [tabs ? tabs.id : 1] };`  · ASSIGN:identifier
  23. L198 _(in `js/function`)_ `// 第一次解析失»败，修正字符串后递归调用«`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  24. L94 _(in `js/templates`)_ `const peek = (offset = 0) => pos + offset < input.length ? »input[pos + offset]« : '';`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:conditional-consequent
  25. L199 _(in `js/init`)_ `G.scriptList.set»("webrtc.js", { key: "webrtc", re«fresh: true, allFrames: true, world: "MAIN", name: i18n.recordWebRTC, off: i18n.closeRecording, i18n: true, tabId: new Set() });`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  26. L95 _(in `js/templates`)_ `const advance = () => pos < input.length ? »input[pos++]« : '';`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  27. L96 _(in `js/function`)_ `"resourceType»s": ["xmlhtt«prequest", "media", "image"],`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  28. L120 `<di»v id="mediaInfo" da«ta-state="false">`  · ASSIGN:unary, ASSIGN:logical-left
  29. L134 _(in `js/function`)_ `if (!item.r»equestHeade«rs) { continue; }`  · ASSIGN:identifier, ELEMENT:member-element-container
  30. L123 `</di»v>«`  · ASSIGN:identifier, ASSIGN:binary-left
  31. L124 _(in `js/init`)_ `send2localBody: »'{"action": "${action}"«, "data": ${data}, "tabId": "${tabId}"}',`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  32. L125 `<div »id="qrcode"><img src="i«mg/qrcode.png" class="icon qrcode" title="QR Code"/></div>`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  33. L127 `<div» id="catDownFFmpeg"><img src«="img/send2ffmpeg.svg" class="icon send2ffmpeg" title="${i18n.sendFfmpeg}"/></div>`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  34. L128 `<div><img» s«rc="img/invoke.svg" class="icon invoke" title="${i18n.invoke}"/></div>`  · ASSIGN:identifier, ASSIGN:binary-left
  35. L192 `const totalBytes = fr»agments«.reduce((sum, item) => sum + item.bytes, 0);`  · ASSIGN:identifier
  36. L139 _(in `js/function`)_ `"requestHeaders"»: Object.k«eys(item.requestHeaders).map(key => ({ header: key, operation: "set", value: item.requestHeaders[key] }))`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  37. L140 `data.panelHeading = dat»a.html«.find(".panel-heading");`  · ASSIGN:identifier, ELEMENT:member-element
  38. L142 `data.urlPane»lS«how = !data.urlPanelShow;`  · ASSIGN:identifier, ASSIGN:binary-left
  39. L143 `const mediaI»nfo = data.html.find("#«mediaInfo");`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:member-element-container
  40. L144 `const preview = d»ata.html.find("#preview«");`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:member-element-container
  41. L145 _(in `js/templates`)_ `else if (»!inDouble && !inSingle && ch === '|'«) return i;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:member-element-container
  42. L193 `const totalDuration =» fragments.reduce((sum, item) => sum + item.durat«ion, 0);`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  43. L194 _(in `js/templates`)_ `const pipes = pipeIdx === -1 ? [] : »parsePipeChain(content.slice(pipeIdx + 1).trim())«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  44. L186 `if (!frag || !stats» || !fra«g.duration) return;`  · ASSIGN:identifier
  45. L153 _(in `js/function`)_ `chrome.declarativeNetRequest».updateSes«sionRules(rules, () => {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  46. L154 _(in `js/templates`)_ `const ch = »str[i]«;`  · ASSIGN:identifier, ELEMENT:member-element
  47. L164 `if »(data.tra«cks && !data.tracks.audiovideo) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  48. L151 `!previ»ew[0].paus«ed && preview.trigger("pause");`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  49. L156 _(in `js/popup-utils`)_ `clie»ntId: `${G.mqttClientId || "cat-catch-client"}-${Math.random().toString(16).slice(2)}`«,`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:template-literal
  50. L157 _(in `js/templates`)_ `if (»!inSingle && ch === '"'«) inDouble = !inDouble;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  51. L158 `const hls» = new Hls({ enableWork«er: false });`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  52. L159 `setReques»tHeaders(data.requestHeaders, functi«on () {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  53. L195 `»            mediaInfo.append(`<br><b>${«i18n.bitrate}:</b> ${formatBitrate(bps)}`);`  · ASSIGN:identifier, ELEMENT:object.setProperty
  54. L114 `<im»g src="img/aria2.png" class="icon aria2 ${G.en«ableAria2Rpc ? "" : "hide"}"" id="aria2" title="Aria2"/>`  · ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  55. L115 `»    <img src="img/invoke.svg" class="icon invoke ${G.inv«oke ? "" : "hide"}"" id="invoke" title="${i18n.invoke}"/>`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:object.setProperty
  56. L92 `if (data.f»avIconUrl «&& !favicon.has(data.webUrl)) {`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  57. L211 (→L217) `»   return false;«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  58. L212 _(in `js/function`)_ `* @param {Objec»t} option«s Blob配置`  · ELEMENT:member-element-container, ASSIGN:binary-left
  59. L213 `prev»iew.on("loadedmetada«ta", function () {`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  60. L214 _(in `js/templates`)_ `} else if (»node.type« === 'tag') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  61. L223 _(in `js/function`)_ `retu»rn new Blob«();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  62. L227 `»    const bps = («size * 8) / data.duration;`  · ELEMENT:member-element-container
  63. L225 `».then(function (size«) {`  · RETURN:json.stringify
  64. L230 _(in `js/templates`)_ `let current = value !== undefined ? String(»value«) : '';`  · ASSIGN:identifier
  65. L231 `»            conso«le.warn(error);`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:unary
  66. L232 _(in `js/templates`)_ `return value !== undefined ? String(»value) : '${' + tag.varName + '}'«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:conditional-alternate
  67. L235 `if (e»vent.target.id == "play«") {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  68. L236 (→L243) `preview.show().trigge»r("play");«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L215 `»if (this.duration && this.duration != Infinit«y) {`  · ELEMENT:implicit.add
  70. L245 _(in `js/templates`)_ `if (isEmpty(current) && !['exists', 'find', 'prompt'].includes(»pipe.name«)) return '';`  · ASSIGN:identifier, ELEMENT:member-element
  71. L246 _(in `js/templates`)_ `if (»resolvedArgs.length === 0 && !['filter', 'prompt'].includes(pipe.name)«) break;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left
  72. L248 _(in `js/templates`)_ `const processor = Template._processors[»pipe.name«];`  · ASSIGN:identifier, ELEMENT:member-element
  73. L977 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ELEMENT:member-element-container, ASSIGN:logical-left
  74. L97 `if (allData.get(»currentTab«).has(data.requestId)) {`  · ASSIGN:identifier
  75. L440 `allData.get(»currentTab«).set(data.requestId, data);`  · ASSIGN:identifier
  76. L881 `if (Message.data.tabId == »G.tabId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  77. L1087 `if (»checkedData.length != 2 || (!G.isFirefox && maxSize > G.chromeLimitSize)«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  78. L844 `»_type« == "window" && $("#currentPage").show();`  · ASSIGN:identifier, ASSIGN:binary-left
  79. L955 (→L973) `chrome.runtime.sendMessage({ Message: "getButtonState", tabId: »G.tabId }, function (state) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  80. L918 `$("#playbackRate").val(»G.playbackRate«);`  · ELEMENT:member-element-container
  81. L510 `$(".Tabs» .TabButto«n").click(function () {`  · ELEMENT:member-element-container
  82. L518 _(in `js/function`)_ `styleElement.textContent = »G.css«;`  · ELEMENT:member-element-container
  83. L926 (→L939) `chrome.webNavigation.getAllFrames({ tabId: »G.tabId }, function (frames) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  84. L832 `if (»!G.initSyncComplete || !G.initLocalComplete || !G.tabId«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  85. L999 `if (»!extra.ffmpeg && !G.downStream && Math.max(...data.map(item => item._size)) > G.chromeLimitSize && confirm(i18n("fileTooLargeStream", ["2G"]))«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:logical-left
  86. L5 _(in `js/templates`)_ `replace»: (txt, ar«g) => txt.replace(...arg),`  · ELEMENT:member-element-container
  87. L11 _(in `js/init`)_ `// /^https:\/\/.*»\.do«uyin\.com\/.*$/i,`  · ASSIGN:identifier
  88. L7 `const $mediaLis»t = $('#m«ediaList');`  · ELEMENT:member-element-container
  89. L9 `const $currentC»ount = $("#«currentTab #quantity");`  · ELEMENT:member-element-container
  90. L64 `let »trimName = data«.name;`  · ELEMENT:member-element-container
  91. L71 _(in `js/function`)_ `function» isEmpty(obj)« {`  · ELEMENT:member-element-container
  92. L76 _(in `js/init`)_ `{ "type": "ig", "regex": ".*\\.bilivi»deo\\.(com|cn).*\\/live-bvc\\/.*m4s", "ext": ""«, "blackList": true, "state": false },`  · ELEMENT:member-element-container, ASSIGN:binary-right
  93. L88 `} else» if (isJSO«N(data)) {`  · ELEMENT:member-element-container
  94. L271 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  95. L314 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  96. L273 `const m3u8dlArg = templates(»G.m3u8dlArg«, data);`  · ELEMENT:member-element-container
  97. L489 `data.html.find('».panel-«heading').click(function () {`  · ELEMENT:member-element-container
  98. L321 `saveAs: »G.saveAs«`  · ELEMENT:member-element-container
  99. L318 (→L322) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  100. L10 _(in `js/templates`)_ `retur»n match.slice(1).fi«lter(Boolean).map(s => s.trim()).join("");`  · INITIAL:Uint8Array.constructor
  101. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  102. L274 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:binary-right
  103. L275 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  104. L281 `if (»G.m3u8dlConfirm«) {`  · ELEMENT:member-element-container
  105. L305 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  106. L306 `window.location.href = »url«;`  · ASSIGN:identifier
  107. L309 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  108. L292 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  109. L327 `const url = templates(»G.invokeText«, data);`  · ELEMENT:member-element-container
  110. L330 `if (»G.invokeConfirm«) {`  · ELEMENT:member-element-container
  111. L354 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  112. L358 `»chrome.tabs.update({ url: url })«;`  · ELEMENT:object.setProperty
  113. L340 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  114. L363 `if (isEmpty(»G.Player«)) { return true; }`  · ELEMENT:member-element-container
  115. L364 `if (»G.Player == "$shareApi$" || G.Player == "${shareApi}"«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  116. L368 `let url = templates(»G.Player«, data);`  · ELEMENT:member-element-container
  117. L369 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  118. L373 `»chrome.tabs.update({ url: url })«;`  · ELEMENT:object.setProperty
  119. L407 _(in `js/function`)_ `let body = »G.send2localBody«;`  · ELEMENT:member-element-container
  120. L411 _(in `js/function`)_ `body = »G.send2localBody.replaceAll«('${data}', `"${data}"`);`  · ELEMENT:member-element-container
  121. L415 _(in `js/function`)_ `let postData = templates(»body«, data);`  · ASSIGN:identifier
  122. L325 _(in `js/function`)_ `const »option = { method: G.send2localMethod }«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  123. L329 _(in `js/function`)_ `let send2localURL = templates(»G.send2localURL«, templateContext);`  · ELEMENT:member-element-container
  124. L333 `»        <text«area type="text" class="width100" rows="10">${url}</textarea>`  · ASSIGN:binary-left
  125. L347 `confir»m.find("#close")«.click(function () {`  · ELEMENT:member-element-container
  126. L381 `// 多选框 创建che»cked属性 值和checked状态绑«定`  · ELEMENT:member-element-container
  127. L111 `»    <img src=«"img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${data.parsing}" title="${i18n.parser}"/>`  · ELEMENT:member-element-container, ASSIGN:unary
  128. L117 `<img src="im»g/mqtt.svg" class="icon «mqtt ${G.mqttEnable ? "" : "hide"}" id="mqtt" title="${i18n.send2MQTT}"/>`  · ELEMENT:member-element-container, ASSIGN:logical-left
  129. L118 _(in `js/popup-utils`)_ `data.title = data.title.slice(0, »titleLength«) || "";`  · ASSIGN:identifier
  130. L146 `if (event.tar»get.id == «"play") {`  · ELEMENT:member-element-container
  131. L148 _(in `js/function`)_ `rule».action.requestHeaders.push({ header: «"Cookie", operation: "set", value: item.cookie });`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  132. L152 _(in `js/templates`)_ `let start = 0, i»nDouble = false, inSingle = false, escap«ed = false;`  · ASSIGN:identifier, ASSIGN:template-literal
  133. L155 (→L160) `»        if (!mediaInfo.data("state")) {«`  · ELEMENT:object.setProperty
  134. L163 `»hls.on(Hls«.Events.BUFFER_CREATED, function (event, data) {`  · ELEMENT:member-element-container
  135. L166 `»        !data.«tracks.video && mediaInfo.append(`<br><b>${i18n.noVideo}</b>`);`  · ELEMENT:member-element-container
  136. L185 `const stats = frag && f»rag.sta«ts;`  · ASSIGN:identifier
  137. L525 `if (key == »G.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  138. L541 `if (»G.enableAria2Rpc«) {`  · ELEMENT:member-element-container
  139. L550 `if (»G.m3u8dl && (data.parsing == "m3u8" || data.parsing == "mpd") && !data.url.startsWith("blob:")«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  140. L551 `const m3u8dlArg = templates(»G.m3u8dlArg«, data);`  · ELEMENT:member-element-container
  141. L556 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  142. L552 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:binary-right
  143. L553 `»chrome.tabs.create({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  144. L687 `»chrome.runtime.sendMessage({ Message: "clearData", tabId: G.tabId, type: activeTab })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  145. L688 `»chrome.runtime.sendMessage({ Message: "ClearIcon", type: activeTab, tabId: G.tabId })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  146. L701 (→L704) `chrome.runtime.sendMessage({ Message: "mobileUserAgent", tabId: »G.tabId }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  147. L702 `»G.refreshClear« && $('#Clear').click();`  · ELEMENT:member-element
  148. L708 (→L710) `chrome.runtime.sendMessage({ Message: "autoDown", tabId: »G.tabId }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  149. L714 (→L717) `chrome.runtime.sendMessage({ Message: "script", tabId: »G.tabId, script: this.id + ".js" }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  150. L715 `»G.autoClearMode« > 0 && $('#Clear').click();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  151. L735 `»chrome.tabs.create({ url: G.ffmpegConfig.url })«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  152. L748 `chrome.tabs.get(»G.tabId«, function (tab) {`  · ELEMENT:member-element-container
  153. L749 `switch (»G.popupMode«) {`  · ELEMENT:member-element-container
  154. L751 `»chrome.tabs.create({ url: `preview.html?tabId=${G.tabId}`, index: tab.index + 1 })«;`  · ELEMENT:member-element-container, ASSIGN:template-literal, ELEMENT:object.setProperty
  155. L771 `»chrome.tabs.update({ url: `popup.html?tabId=${tabs[0].id}${_type ? "&type=" + _type : ""}` })«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-consequent, ASSIGN:template-literal, ELEMENT:object.setProperty
  156. L784 `send2localArray("catch", checkedData, »G.tabId«).then(function (success) {`  · ELEMENT:member-element-container
  157. L433 _(in `js/function`)_ `»results.push(templates("${data}", { ...item, action, index, tabId }))«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  158. L435 _(in `js/function`)_ `let body = »G.send2localBody.replaceAll«('${data}', `[${results.join(",")}]`);`  · ELEMENT:member-element-container
  159. L436 _(in `js/function`)_ `let »postData = templates(body, { action, tabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  160. L438 _(in `js/function`)_ `»return executeCoreRequest(postData, { action, tabId });«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  161. L816 `chrome.tabs.sendMessage(»G.tabId«, { Message: "getPage" }, { frameId: 0 }, (response) => {`  · ELEMENT:member-element-container
  162. L905 `if (»tabId == -1 || tabId == G.tabId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-right
  163. L929 `chrome.tabs.sendMessage(»G.tabId«, { Message: "getKey" }, { frameId: frame.frameId }, function (result) {`  · ELEMENT:member-element-container
  164. L943 `if (»response && G.damn«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  165. L970 `const script = »G.scriptList.get«(key + ".js");`  · ELEMENT:member-element-container
  166. L1013 `chrome.tabs.get(»G.tabId«, function (tab) {`  · ELEMENT:member-element-container
  167. L1020 `active: »!G.downActive«`  · ELEMENT:member-element-container, ASSIGN:unary
  168. L1014 (→L1021) `»        const arg = {«`  · ELEMENT:object.setProperty

---

## Flow #7 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/popup` L876:C4 -> L913:C6 (spans to L913)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/function` L544:C11 -> L544:C41  `return »fetch(url, { method: "HEAD" })«`  (url-control=FULL)
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/popup` L996:C4 -> L996:C62  `»localStorage.setItem('downloadData', JSON.stringify(data))«;`
  - `FETCH_BODY` (http://localhost:6800/jsonrpc) — `js/popup` L88:C4 -> L94:C6 (spans to L94)  `»} else if (isJSON(data)) {«`
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L318:C8 -> L322:C50 (spans to L322)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/function` L390:C12 -> L390:C51  `»fetch(send2localURL.toString(), option)«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (14305 raw steps → 221 distinct lines):
   1. L876 (→L913) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/popup]; runtime.single.sender.message[js/background->js/popup]`
   2. L877 `if (»!Message.Message || !Message.data«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L879 `if (»Message.Message« == "popupAddData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L895 `if (»Message.Message« == "popupAddKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L880 `const html = AddMedia(»Message.data, Message.data.tabId« == G.tabId);`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L59 _(in `js/init`)_ `»    { "ext": "opus", "size": 0, "operator": ">=",« "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   7. L60 _(in `js/templates`)_ `»        initiator: data.requestHeaders?.referer ? data.requestHeaders.referer : data.initiator«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:conditional-consequent, ASSIGN:logical-left, ASSIGN:binary-right
   8. L250 `»catDownload(data, «{ ffmpeg: "addFile" });`  · ASSIGN:identifier, ASSIGN:unary
   9. L251 _(in `js/function`)_ `»str = filterFileName(str, text)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  10. L268 _(in `js/function`)_ `if (»!str) { return str«; }`  · ASSIGN:identifier, ASSIGN:unary
  11. L270 (→L324) `»data.html.find('#download').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L271 (→L282) `if» (G.m3u8dl && (isM3U8(data) || isMPD(data))) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  13. L285 `»                <«button class="button2" id="confirm">${i18n.confirm}</button>`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L286 `»   «       <button class="button2" id="close">${i18n.close}</button>`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L288 `»            confirm«.find("#confirm").click(function () {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L289 `con»st «textarea = confirm.find("textarea").val();`  · ASSIGN:identifier, ASSIGN:binary-right
  17. L291 `»   «          confirm.remove();`  · ASSIGN:identifier
  18. L252 (→L257) `//点击复制»网址«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L258 _(in `js/function`)_ `return »str«;`  · ASSIGN:identifier
  20. L62 `»data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, RETURN:decodeURIComponent, ASSIGN:conditional-consequent, ASSIGN:logical-left, ASSIGN:logical-right
  21. L64 _(in `js/init`)_ `{ "type": "»audio/*", "size": «0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  22. L65 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  23. L66 `trimName = »trimName.substr(0, 20) + '...' + trimName.substr(-30)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  24. L69 `Object.defineProp»erty(data, "pageD«OM", {`  · ASSIGN:identifier, ELEMENT:member-element
  25. L72 (→L75) `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name;«`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-alternate
  26. L279 _(in `js/init`)_ `chrome.storage.sync.s»et({« copyM3U8: items.copyM3U8 });`  · ASSIGN:identifier
  27. L46 _(in `js/templates`)_ `try { »data.fullFileName = new URL(data.url).pathname.split("/").pop(); } catch { data.fullFileName = '«NULL'; }`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return, ASSIGN:binary-left
  28. L47 `if (»G.catDownload) { delete downData[item.id]; r«eturn; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, RETURN:Number.toFixed
  29. L48 `const er»rorList = ["SERVER_BAD_CONTENT", "SERVER_UNAU«THORIZED", "SERVER_FORBIDDEN", "SERVER_UNREACHABLE", "SERVER_CROSS_ORIGIN_REDIRECT", "SERVER_FAILED", "NETWORK_FAILED"];`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  30. L49 `if (»item.error && errorList.includes(item.error.c«urrent) && downData[item.id]) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, RETURN:Number.toFixed
  31. L50 `catDownload(»downData«[item.id]);`  · ASSIGN:identifier, ELEMENT:member-element
  32. L73 `»data.downFileName = filterFileName(data.downFileName)«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, ELEMENT:implicit.add
  33. L74 `if (»isEmpty(data.downFileName«)) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element
  34. L75 `»data.downFileName = data.name«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:implicit.add
  35. L51 _(in `js/init`)_ `{ "e»xt": "asf", "size": 0, "operator": ">="«, "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  36. L52 _(in `js/init`)_ `{ "ext": "movie", "size": 0, "operator": ">=»", "unit": "KB", "state": tru«e },`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  37. L57 _(in `js/init`)_ `{ "ext": »"mpd", "size":« 0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  38. L56 (→L82) `»«`  · ELEMENT:object.setProperty
  39. L58 (→L63) `function AddMedia(dat»a, currentTab = true) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:implicit.add
  40. L61 _(in `js/init`)_ `{ "ext": "vt»t", "size": 0, "o«perator": ">=", "unit": "KB", "state": false },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  41. L63 _(in `js/templates`)_ `pageDOM: »data.pageDOM«,`  · ASSIGN:identifier, ELEMENT:member-element
  42. L77 _(in `js/init`)_ `{ "t»ype": "ig", "regex": "(^https://scont«ent[a-z0-9-]*\\.cdninstagram\\.com/.*)&bytestart=.*", "ext": "", "blackList": false, "state": false },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  43. L78 _(in `js/init`)_ `»    { "type": "ig", "regex": "(^https://.*\\.fbcdn\\.net/.*)&bytesta«rt=.*", "ext": "", "blackList": false, "state": false },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:binary-right
  44. L79 _(in `js/templates`)_ `»    ext: data.ext ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  45. L83 _(in `js/init`)_ `»MobileUserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 «like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",   // 模拟手机浏览器UA`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  46. L84 _(in `js/popup-utils`)_ `pa»rams.header.push("Authorization: " + data.requestHeaders.authorization«);`  · ASSIGN:identifier, COPY:object-spread, ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:binary-right
  47. L227 `»    const bps = (size * 8) / data.duration«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  48. L225 `».then(function (size«) {`  · RETURN:json.stringify
  49. L230 _(in `js/templates`)_ `let current = value !== undefined ? String(»value«) : '';`  · ASSIGN:identifier
  50. L232 _(in `js/templates`)_ `return value !== undefined ? String(»value«) : '${' + tag.varName + '}';`  · ASSIGN:identifier
  51. L80 `»data.size = byteToSize(data.size)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  52. L43 _(in `js/function`)_ `if (»!byte || byte < 1024«) { return 0; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  53. L44 `chrome.r»unti«me.sendMessage(chrome.runtime.id, { Message: "clearRedundant" });`  · ASSIGN:identifier, ASSIGN:binary-left
  54. L45 _(in `js/function`)_ `return »(byte / 1024).toFixed(1)« + "KB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  55. L15 (→L20) `let allC»ount = 0;«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  56. L16 _(in `js/function`)_ `let »hour = («sec / 3600) | 0;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  57. L17 _(in `js/popup-utils`)_ `»data.type?.endsWith("/vnd.apple.mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  58. L18 _(in `js/popup-utils`)_ `»data.type?.endsWith("/x-mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  59. L19 _(in `js/function`)_ `let »time = hour > 0 ? hour + ":" : «"";`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  60. L20 _(in `js/function`)_ `time» += min.toString().padStart(2, '0') + ":"«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  61. L85 `»data«.parsing = "m3u8";`  · ASSIGN:identifier
  62. L86 `} else if (isMPD(»data«)) {`  · ASSIGN:identifier
  63. L24 (→L25) `[true, n»ew Map()],  // 当前页面«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  64. L25 `[fal»se, new M«ap()]  // 其他页面`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  65. L92 `if (»data.favIconUrl && !favicon.has(data.webUrl)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  66. L87 _(in `js/init`)_ `»m3u8dlArg: `"\${url}" --save-dir "%U«SERPROFILE%\\Downloads\\m3u8dl" --save-name "\${title}_\${now}" \${referer|exists:'-H "Referer:*"'} \${cookie|exists:'-H "Cookie:*"'} --no-log`,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  67. L88 (→L100) `} else if (isJSON(»data)) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  68. L29 (→L31) `// 储存所有扩展名，保»存是否筛选状态 来判断新加入的资源 立刻判断是否需要隐藏«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  69. L30 `const fi»lterExt =« new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  70. L31 _(in `js/function`)_ `if (»bps >= 10«00 * 1000) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  71. L93 `favico»n.set(data.webUrl, data.favIconUrl«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  72. L89 `»data«.parsing = "json";`  · ASSIGN:identifier
  73. L95 `»data.isPlay = isPlay(data«);`  · ASSIGN:identifier
  74. L977 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  75. L35 (→L42) _(in `js/init`)_ `{ "e»xt": "wma", "size": 0, "operator": ">=", "unit": "KB", "state": true },«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  76. L36 `const »downData = []«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
  77. L37 _(in `js/init`)_ `»{ "ext":« "m4a", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  78. L38 `const fa»vicon = «new Map();`  · ELEMENT:member-element, ASSIGN:binary-left
  79. L39 _(in `js/function`)_ `* @para»m {Numbe«r} byte 大小`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  80. L40 `let page»DOM = un«defined;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  81. L41 _(in `js/init`)_ `»{ "ext":« "ogv", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  82. L42 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "HeartBeat" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  83. L979 `return »isMediaExt(data.ext) || typeArray.includes(data.type) || isM3U8(data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  84. L97 `if (allData.get(»currentTab).has(data.requestId«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  85. L98 `»data.requestId = data.requestId + "_"« + Date.now().toString();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  86. L106 `${G.ShowWebIco ? »`<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.requestId}" src="${data.favIconUrl}"/>`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  87. L108 `<span class="name ${data.parsing || data.isRegex || data.tabId == -1 ? "bold" : ""}">${»trimName«}</span>`  · ASSIGN:identifier
  88. L109 `<span class="size ${data.size ? "" : "hide"}">${»data.size«}</span>`  · ASSIGN:identifier, ELEMENT:member-element
  89. L111 `<img src="img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${»data.parsing«}" title="${i18n.parser}"/>`  · ASSIGN:identifier, ELEMENT:member-element
  90. L121 `${data.title ? »`<b>${i18n.title}:</b> ${data.title}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  91. L122 `${data.type ? »`<br><b>MIME:</b>  ${data.type}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  92. L130 `<a href="${»data.url}" target="_blank" download="${data.downFileName}">${data.url«}</a>`  · ASSIGN:identifier, ELEMENT:member-element
  93. L102 (→L135) `»data.html = $(`«`  · ASSIGN:template-literal, ASSIGN:identifier
  94. L138 `»data.urlPanel = data.html.find(".url")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  95. L139 `»data«.urlPanelShow = false;`  · ASSIGN:identifier
  96. L140 `»data.panelHeading = data.html.find(".panel-heading")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  97. L141 (→L239) `»data.panelHeading.click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  98. L241 (→L244) `»data.html.find("#qrcode").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  99. L246 (→L248) `»data.html.find("#catDown").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  100. L249 (→L251) `»data.html.find("#catDownFFmpeg").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  101. L253 (→L258) `»data.html.find('#copy').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  102. L260 (→L268) `»data.html.find('#aria2').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  103. L326 (→L360) `»data.html.find('.invoke').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  104. L362 (→L375) `»data.html.find('#play').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L377 (→L380) `»data.html.find('#parsing').click(function (e) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  106. L382 `»data«._checked = checkboxState;`  · ASSIGN:identifier
  107. L383 `»data.html.find(".DownCheck").prop("checked", data._checked)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  108. L384 (→L388) `»data.html.find('input').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  109. L389 `Object.defineProperty(»data«, "checked", {`  · ASSIGN:identifier
  110. L400 (→L407) `»data.html.find("#send2local").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  111. L410 (→L437) `»data.html.find("#mqtt").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  112. L440 `allData.get(»currentTab).set(data.requestId, data«);`  · ASSIGN:identifier, ELEMENT:member-element
  113. L443 `if (!filterExt.has(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  114. L444 `filterExt.set(»data.ext«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  115. L461 `if (!filterExt.get(»data.ext) || duplicateFilenamesSet?.has(data.name«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  116. L445 `const html = $(»`<label class="flexFilter" id="${data.ext}"><input type="checkbox" checked>${data.ext}</label>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  117. L462 `»data.html.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  118. L463 `»data.html.find("input").prop("checked", false)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  119. L465 `duplicateFilenamesSet && duplicateFilenamesSet.add(»data.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  120. L467 `return »data.html«;`  · ASSIGN:identifier, ELEMENT:member-element
  121. L881 `if (»Message.data.tabId« == G.tabId) {`  · ELEMENT:member-element, ASSIGN:binary-left
  122. L884 `$current.append(»html«);`  · ASSIGN:identifier
  123. L142 `»data.urlPanelShow = !data.urlPanelShow«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  124. L143 `const mediaInfo = »data.html.find("#mediaInfo")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  125. L144 `const preview = »data.html.find("#preview")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  126. L145 `if (»!data.urlPanelShow«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  127. L154 `»data.urlPanel.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  128. L147 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  129. L150 `»data.urlPanel.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  130. L155 `if (»!mediaInfo.data("state")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  131. L151 `»!preview[0].paused && preview.trigger("pause")«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, RETURN:fallback-return
  132. L156 `»mediaInfo.data("state", true)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L157 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  134. L236 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  135. L201 `} else if (»data.isPlay«) {`  · ASSIGN:identifier, ELEMENT:member-element
  136. L159 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  137. L202 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  138. L205 `} else if (isPicture(»data«)) {`  · ASSIGN:identifier
  139. L213 (→L233) `»preview.on("loadedmetadata", function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  140. L206 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  141. L160 `hls.loadSource(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  142. L161 `hls.attachMedia(»preview[0]«);`  · ASSIGN:identifier, ELEMENT:member-element
  143. L165 `!data.tracks.audio && »mediaInfo.append(`<br><b>${i18n.noAudio}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  144. L166 `!data.tracks.video && »mediaInfo.append(`<br><b>${i18n.noVideo}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  145. L173 `if (»data.levels.length > 1 && !mediaInfo.text().includes(i18n.m3u8Playlist)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  146. L174 `»mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  147. L195 `»         mediaInfo.append(`<br><b>${i18n.bitrate}:</b> ${formatBitrate(bps)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:json.parse
  148. L196 `totalFragments && »mediaInfo.append(`<br><b>${i18n.estimateSize}:</b> ${byteToSize(totalBytes / fragments.length * totalFragments)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  149. L203 `»preview.attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  150. L207 `»data.html.find("#screenshots").show().attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  151. L214 `»preview.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  152. L216 `»data«.duration = this.duration;`  · ASSIGN:identifier
  153. L217 `»mediaInfo.append(`<br><b>${i18n.duration}:</b> ${secToTime(this.duration)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  154. L220 `»mediaInfo.append(`<br><b>${i18n.resolution}:</b> ${this.videoWidth}x${this.videoHeight}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  155. L224 `»!isM3U8(data) && getRemoteFileSize(data.url«)`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element
  156. L221 `»data«.videoWidth = this.videoWidth;`  · ASSIGN:identifier
  157. L544 `aria2»Add«Uri(data);`  · ASSIGN:identifier
  158. L222 `»data«.videoHeight = this.videoHeight;`  · ASSIGN:identifier
  159. L228 `»mediaInfo.append(`<br><b>${i18n.bitrate}:</b> ${formatBitrate(bps)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:template-literal, RETURN:fallback-return
  160. L32 _(in `js/function`)_ `return »(bps / 1000 / 1000).toFixed(2)« + ' Mbps';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  161. L34 _(in `js/function`)_ `return »(bps / 1000).toFixed(2)« + ' kbps';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  162. L243 `»$(this).html("").qrcode({ width: size, height: size, text: data.url }).off("click")«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  163. L247 `catDownload(»data«);`  · ASSIGN:identifier
  164. L993 `if (!Array.isArray(»data)) { data = [data]«; }`  · ASSIGN:identifier, ELEMENT:object.setProperty
  165. L996 `localStorage.setItem('downloadData', »JSON.stringify(data)«);`  · RETURN:json.stringify
  166. L1003 (→L1010) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "catDownload", data: data }, (message) => {«`  · ELEMENT:object.setProperty
  167. L988 `catDownload(»data«, extra);`  · ASSIGN:identifier
  168. L254 `const text = copyLink(»data«);`  · ASSIGN:identifier
  169. L3 `const _tabId = »parseInt«(params.get("tabId"));`  · ASSIGN:identifier, ELEMENT:member-element
  170. L4 `const _t»ype = params«.get("type");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  171. L6 _(in `js/function`)_ `function append»Zero(date) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  172. L11 _(in `js/init`)_ `// /^https:\/\/.*\.douy»in\.«com\/.*$/i,`  · ASSIGN:identifier
  173. L261 `aria2AddUri(»data«, function (data) {`  · ASSIGN:identifier
  174. L68 _(in `js/function`)_ `* @para»m {Object|String}« obj 判断的变量`  · ASSIGN:identifier, ELEMENT:member-element
  175. L67 _(in `js/init`)_ `{ »"type": "ap«plication/vnd.apple.mpegurl", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ELEMENT:object.setProperty
  176. L81 _(in `js/templates`)_ `userAgent: G.userAgent ?? naviga»tor.userAge«nt,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  177. L272 `if (»!data.url.startsWith("blob:")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  178. L314 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  179. L273 `const m3u8dlArg = templates(G.m3u8dlArg, »data«);`  · ASSIGN:identifier
  180. L315 `openParser(»data«, { autoDown: true });`  · ASSIGN:identifier
  181. L319 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  182. L318 (→L322) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  183. L320 `filename: »data.downFileName«,`  · ASSIGN:identifier, ELEMENT:member-element
  184. L322 `}, function (id) { downData[id] = »data«; });`  · ASSIGN:identifier
  185. L327 `const url = templates(G.invokeText, »data«);`  · ASSIGN:identifier
  186. L368 `let url = templates(G.Player, »data«);`  · ASSIGN:identifier
  187. L378 `openParser(»data«);`  · ASSIGN:identifier
  188. L385 `»data«._checked = this.checked;`  · ASSIGN:identifier
  189. L391 `return »data._checked«;`  · ASSIGN:identifier, ELEMENT:member-element
  190. L394 `»data«._checked = newValue;`  · ASSIGN:identifier
  191. L395 `»data.html.find('input').prop("checked", newValue)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  192. L401 `send2local("catch", »data, data.tabId«).then(function (success) {`  · ASSIGN:identifier, ELEMENT:member-element
  193. L411 _(in `js/function`)_ `body = »G.send2localBody.replaceAll('${data}', `"${data}"`)«;`  · ASSIGN:identifier, ASSIGN:template-literal, MUTATE:string.replace, ELEMENT:member-element-container
  194. L414 `»    «if ($mqttButton.hasClass('mqtt-sending')) {`  · ASSIGN:identifier
  195. L412 _(in `js/function`)_ `»data = { tabId: tabId }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  196. L415 _(in `js/function`)_ `let postData = templates(»body«, data);`  · ASSIGN:identifier
  197. L416 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:implicit.add
  198. L353 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  199. L325 _(in `js/function`)_ `const »option = { method: G.send2localMethod }«;`  · ELEMENT:object.setProperty
  200. L424 `sendToMQTT(»data«).then(function (success) {`  · ASSIGN:identifier
  201. L118 _(in `js/popup-utils`)_ `»data.title = data.title.slice(0, titleLength) || ""«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  202. L119 `»    «<div class="url hide">`  · ASSIGN:identifier
  203. L120 `<div id=»"med«iaInfo" data-state="false">`  · ASSIGN:identifier
  204. L528 `$al»l.append(AddMed«ia(data[key][i], false));`  · ASSIGN:identifier, COPY:object-spread
  205. L435 _(in `js/function`)_ `let body = »G.send2localBody.replaceAll«('${data}', `[${results.join(",")}]`);`  · ELEMENT:member-element-container
  206. L436 _(in `js/function`)_ `let postData = templates(»body«, { action, tabId });`  · ASSIGN:identifier
  207. L900 `if (item.url == »Message.url«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  208. L906 `$maybeKey.append(AddKey(»Message.data«));`  · ELEMENT:member-element
  209. L472 `const base64Key = base64ToHex(»key«);`  · ASSIGN:identifier
  210. L1133 `binaryString = »atob(base64)«;`  · ASSIGN:identifier, RETURN:atob
  211. L1139 `for (let i = 0; i < »binaryString.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  212. L1140 `let hex = »binaryString.charCodeAt(i).toString(16)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  213. L1141 `if (»hex.length« === 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  214. L1142 `hex = '0' + »hex«;`  · ASSIGN:identifier, ASSIGN:binary-right
  215. L1144 `hexString += »hex«;`  · ASSIGN:identifier
  216. L1146 `return »hexString«;`  · ASSIGN:identifier
  217. L473 `if (»!base64Key«) { return; }`  · ASSIGN:identifier, ASSIGN:unary
  218. L479 `<span class="name bold">${»key«}</span>`  · ASSIGN:identifier
  219. L484 `Hex: ${»base64Key«}`  · ASSIGN:identifier
  220. L486 `Base64: ${»key«}`  · ASSIGN:identifier
  221. L476 (→L488) `»    data.html = $(`«`  · ASSIGN:template-literal

---

## Flow #8 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/popup` L876:C4 -> L913:C6 (spans to L913)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/function` L544:C11 -> L544:C41  `return »fetch(url, { method: "HEAD" })«`  (url-control=FULL)
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/popup` L996:C4 -> L996:C62  `»localStorage.setItem('downloadData', JSON.stringify(data))«;`
  - `FETCH_BODY` (http://localhost:6800/jsonrpc) — `js/popup` L88:C4 -> L94:C6 (spans to L94)  `»} else if (isJSON(data)) {«`
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L318:C8 -> L322:C50 (spans to L322)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/function` L390:C12 -> L390:C51  `»fetch(send2localURL.toString(), option)«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (14295 raw steps → 221 distinct lines):
   1. L876 (→L913) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/popup]; runtime.single.sender.message[js/background->js/popup]`
   2. L877 `if (»!Message.Message || !Message.data«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L879 `if (»Message.Message« == "popupAddData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L895 `if (»Message.Message« == "popupAddKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L880 `const html = AddMedia(»Message.data, Message.data.tabId« == G.tabId);`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L59 _(in `js/init`)_ `»    { "ext": "opus", "size": 0, "operator": ">=",« "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   7. L60 _(in `js/templates`)_ `»        initiator: data.requestHeaders?.referer ? data.requestHeaders.referer : data.initiator«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:conditional-consequent, ASSIGN:logical-left, ASSIGN:binary-right
   8. L250 `»catDownload(data, «{ ffmpeg: "addFile" });`  · ASSIGN:identifier, ASSIGN:unary
   9. L251 _(in `js/function`)_ `»str = filterFileName(str, text)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  10. L268 _(in `js/function`)_ `if (»!str) { return str«; }`  · ASSIGN:identifier, ASSIGN:unary
  11. L270 (→L324) `»data.html.find('#download').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L271 (→L282) `if» (G.m3u8dl && (isM3U8(data) || isMPD(data))) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  13. L285 `»                <«button class="button2" id="confirm">${i18n.confirm}</button>`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L286 `»   «       <button class="button2" id="close">${i18n.close}</button>`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L288 `»            confirm«.find("#confirm").click(function () {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L289 `con»st «textarea = confirm.find("textarea").val();`  · ASSIGN:identifier, ASSIGN:binary-right
  17. L291 `»   «          confirm.remove();`  · ASSIGN:identifier
  18. L252 (→L257) `//点击复制»网址«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L258 _(in `js/function`)_ `return »str«;`  · ASSIGN:identifier
  20. L62 `»data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, RETURN:decodeURIComponent, ASSIGN:conditional-consequent, ASSIGN:logical-left, ASSIGN:logical-right
  21. L64 _(in `js/init`)_ `{ "type": "»audio/*", "size": «0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  22. L65 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  23. L66 `trimName = »trimName.substr(0, 20) + '...' + trimName.substr(-30)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  24. L69 `Object.defineProp»erty(data, "pageD«OM", {`  · ASSIGN:identifier, ELEMENT:member-element
  25. L72 (→L75) `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name;«`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-alternate
  26. L279 _(in `js/init`)_ `chrome.storage.sync.s»et({« copyM3U8: items.copyM3U8 });`  · ASSIGN:identifier
  27. L46 _(in `js/templates`)_ `try { »data.fullFileName = new URL(data.url).pathname.split("/").pop(); } catch { data.fullFileName = '«NULL'; }`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return, ASSIGN:binary-left
  28. L47 `if (»G.catDownload) { delete downData[item.id]; r«eturn; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, RETURN:Number.toFixed
  29. L48 `const er»rorList = ["SERVER_BAD_CONTENT", "SERVER_UNAU«THORIZED", "SERVER_FORBIDDEN", "SERVER_UNREACHABLE", "SERVER_CROSS_ORIGIN_REDIRECT", "SERVER_FAILED", "NETWORK_FAILED"];`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  30. L49 `if (»item.error && errorList.includes(item.error.c«urrent) && downData[item.id]) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, RETURN:Number.toFixed
  31. L50 `catDownload(»downData«[item.id]);`  · ASSIGN:identifier, ELEMENT:member-element
  32. L73 `»data.downFileName = filterFileName(data.downFileName)«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, ELEMENT:implicit.add
  33. L74 `if (»isEmpty(data.downFileName«)) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element
  34. L75 `»data.downFileName = data.name«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:implicit.add
  35. L51 _(in `js/init`)_ `{ "e»xt": "asf", "size": 0, "operator": ">="«, "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  36. L52 _(in `js/init`)_ `{ "ext": "movie", "size": 0, "operator": ">=»", "unit": "KB", "state": tru«e },`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  37. L57 _(in `js/init`)_ `{ "ext": »"mpd", "size":« 0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  38. L56 (→L82) `»«`  · ELEMENT:object.setProperty
  39. L58 (→L63) `function AddMedia(dat»a, currentTab = true) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:implicit.add
  40. L61 _(in `js/init`)_ `{ "ext": "vt»t", "size": 0, "o«perator": ">=", "unit": "KB", "state": false },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  41. L63 _(in `js/templates`)_ `pageDOM: »data.pageDOM«,`  · ASSIGN:identifier, ELEMENT:member-element
  42. L77 _(in `js/init`)_ `{ "t»ype": "ig", "regex": "(^https://scont«ent[a-z0-9-]*\\.cdninstagram\\.com/.*)&bytestart=.*", "ext": "", "blackList": false, "state": false },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  43. L78 _(in `js/init`)_ `»    { "type": "ig", "regex": "(^https://.*\\.fbcdn\\.net/.*)&bytesta«rt=.*", "ext": "", "blackList": false, "state": false },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:binary-right
  44. L79 _(in `js/templates`)_ `»    ext: data.ext ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  45. L83 _(in `js/init`)_ `»MobileUserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 «like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",   // 模拟手机浏览器UA`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  46. L84 _(in `js/popup-utils`)_ `pa»rams.header.push("Authorization: " + data.requestHeaders.authorization«);`  · ASSIGN:identifier, COPY:object-spread, ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:binary-right
  47. L227 `»    const bps = (size * 8) / data.duration«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  48. L225 `».then(function (size«) {`  · RETURN:json.stringify
  49. L230 _(in `js/templates`)_ `let current = value !== undefined ? String(»value«) : '';`  · ASSIGN:identifier
  50. L232 _(in `js/templates`)_ `return value !== undefined ? String(»value«) : '${' + tag.varName + '}';`  · ASSIGN:identifier
  51. L80 `»data.size = byteToSize(data.size)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  52. L43 _(in `js/function`)_ `if (»!byte || byte < 1024«) { return 0; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  53. L44 `chrome.r»unti«me.sendMessage(chrome.runtime.id, { Message: "clearRedundant" });`  · ASSIGN:identifier, ASSIGN:binary-left
  54. L45 _(in `js/function`)_ `return »(byte / 1024).toFixed(1)« + "KB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  55. L15 (→L20) `let allC»ount = 0;«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  56. L16 _(in `js/function`)_ `let »hour = («sec / 3600) | 0;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  57. L17 _(in `js/popup-utils`)_ `»data.type?.endsWith("/vnd.apple.mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  58. L18 _(in `js/popup-utils`)_ `»data.type?.endsWith("/x-mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  59. L19 _(in `js/function`)_ `let »time = hour > 0 ? hour + ":" : «"";`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  60. L20 _(in `js/function`)_ `time» += min.toString().padStart(2, '0') + ":"«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  61. L85 `»data«.parsing = "m3u8";`  · ASSIGN:identifier
  62. L86 `} else if (isMPD(»data«)) {`  · ASSIGN:identifier
  63. L24 (→L25) `[true, n»ew Map()],  // 当前页面«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  64. L25 `[fal»se, new M«ap()]  // 其他页面`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  65. L92 `if (»data.favIconUrl && !favicon.has(data.webUrl)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  66. L87 _(in `js/init`)_ `»m3u8dlArg: `"\${url}" --save-dir "%U«SERPROFILE%\\Downloads\\m3u8dl" --save-name "\${title}_\${now}" \${referer|exists:'-H "Referer:*"'} \${cookie|exists:'-H "Cookie:*"'} --no-log`,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  67. L88 (→L100) `} else if (isJSON(»data)) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  68. L29 (→L31) `// 储存所有扩展名，保»存是否筛选状态 来判断新加入的资源 立刻判断是否需要隐藏«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  69. L30 `const fi»lterExt =« new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  70. L31 _(in `js/function`)_ `if (»bps >= 10«00 * 1000) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  71. L93 `favico»n.set(data.webUrl, data.favIconUrl«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  72. L89 `»data«.parsing = "json";`  · ASSIGN:identifier
  73. L95 `»data.isPlay = isPlay(data«);`  · ASSIGN:identifier
  74. L977 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  75. L35 (→L42) _(in `js/init`)_ `{ "e»xt": "wma", "size": 0, "operator": ">=", "unit": "KB", "state": true },«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  76. L36 `const »downData = []«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
  77. L37 _(in `js/init`)_ `»{ "ext":« "m4a", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  78. L38 `const fa»vicon = «new Map();`  · ELEMENT:member-element, ASSIGN:binary-left
  79. L39 _(in `js/function`)_ `* @para»m {Numbe«r} byte 大小`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  80. L40 `let page»DOM = un«defined;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  81. L41 _(in `js/init`)_ `»{ "ext":« "ogv", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  82. L42 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "HeartBeat" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  83. L979 `return »isMediaExt(data.ext) || typeArray.includes(data.type) || isM3U8(data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  84. L97 `if (allData.get(»currentTab).has(data.requestId«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  85. L98 `»data.requestId = data.requestId + "_"« + Date.now().toString();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  86. L106 `${G.ShowWebIco ? »`<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.requestId}" src="${data.favIconUrl}"/>`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  87. L108 `<span class="name ${data.parsing || data.isRegex || data.tabId == -1 ? "bold" : ""}">${»trimName«}</span>`  · ASSIGN:identifier
  88. L109 `<span class="size ${data.size ? "" : "hide"}">${»data.size«}</span>`  · ASSIGN:identifier, ELEMENT:member-element
  89. L111 `<img src="img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${»data.parsing«}" title="${i18n.parser}"/>`  · ASSIGN:identifier, ELEMENT:member-element
  90. L121 `${data.title ? »`<b>${i18n.title}:</b> ${data.title}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  91. L122 `${data.type ? »`<br><b>MIME:</b>  ${data.type}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  92. L130 `<a href="${»data.url}" target="_blank" download="${data.downFileName}">${data.url«}</a>`  · ASSIGN:identifier, ELEMENT:member-element
  93. L102 (→L135) `»data.html = $(`«`  · ASSIGN:template-literal, ASSIGN:identifier
  94. L138 `»data.urlPanel = data.html.find(".url")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  95. L139 `»data«.urlPanelShow = false;`  · ASSIGN:identifier
  96. L140 `»data.panelHeading = data.html.find(".panel-heading")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  97. L141 (→L239) `»data.panelHeading.click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  98. L241 (→L244) `»data.html.find("#qrcode").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  99. L246 (→L248) `»data.html.find("#catDown").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  100. L249 (→L251) `»data.html.find("#catDownFFmpeg").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  101. L253 (→L258) `»data.html.find('#copy').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  102. L260 (→L268) `»data.html.find('#aria2').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  103. L326 (→L360) `»data.html.find('.invoke').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  104. L362 (→L375) `»data.html.find('#play').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L377 (→L380) `»data.html.find('#parsing').click(function (e) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  106. L382 `»data«._checked = checkboxState;`  · ASSIGN:identifier
  107. L383 `»data.html.find(".DownCheck").prop("checked", data._checked)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  108. L384 (→L388) `»data.html.find('input').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  109. L389 `Object.defineProperty(»data«, "checked", {`  · ASSIGN:identifier
  110. L400 (→L407) `»data.html.find("#send2local").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  111. L410 (→L437) `»data.html.find("#mqtt").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  112. L440 `allData.get(»currentTab).set(data.requestId, data«);`  · ASSIGN:identifier, ELEMENT:member-element
  113. L443 `if (!filterExt.has(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  114. L444 `filterExt.set(»data.ext«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  115. L461 `if (!filterExt.get(»data.ext) || duplicateFilenamesSet?.has(data.name«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  116. L445 `const html = $(»`<label class="flexFilter" id="${data.ext}"><input type="checkbox" checked>${data.ext}</label>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  117. L462 `»data.html.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  118. L463 `»data.html.find("input").prop("checked", false)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  119. L465 `duplicateFilenamesSet && duplicateFilenamesSet.add(»data.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  120. L467 `return »data.html«;`  · ASSIGN:identifier, ELEMENT:member-element
  121. L881 `if (»Message.data.tabId« == G.tabId) {`  · ELEMENT:member-element, ASSIGN:binary-left
  122. L884 `$current.append(»html«);`  · ASSIGN:identifier
  123. L142 `»data.urlPanelShow = !data.urlPanelShow«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  124. L143 `const mediaInfo = »data.html.find("#mediaInfo")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  125. L144 `const preview = »data.html.find("#preview")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  126. L145 `if (»!data.urlPanelShow«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  127. L154 `»data.urlPanel.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  128. L147 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  129. L150 `»data.urlPanel.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  130. L155 `if (»!mediaInfo.data("state")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  131. L151 `»!preview[0].paused && preview.trigger("pause")«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, RETURN:fallback-return
  132. L156 `»mediaInfo.data("state", true)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L157 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  134. L236 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  135. L201 `} else if (»data.isPlay«) {`  · ASSIGN:identifier, ELEMENT:member-element
  136. L159 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  137. L202 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  138. L205 `} else if (isPicture(»data«)) {`  · ASSIGN:identifier
  139. L213 (→L233) `»preview.on("loadedmetadata", function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  140. L206 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  141. L160 `hls.loadSource(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  142. L161 `hls.attachMedia(»preview[0]«);`  · ASSIGN:identifier, ELEMENT:member-element
  143. L165 `!data.tracks.audio && »mediaInfo.append(`<br><b>${i18n.noAudio}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  144. L166 `!data.tracks.video && »mediaInfo.append(`<br><b>${i18n.noVideo}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  145. L173 `if (»data.levels.length > 1 && !mediaInfo.text().includes(i18n.m3u8Playlist)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  146. L174 `»mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  147. L195 `»         mediaInfo.append(`<br><b>${i18n.bitrate}:</b> ${formatBitrate(bps)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:json.parse
  148. L196 `totalFragments && »mediaInfo.append(`<br><b>${i18n.estimateSize}:</b> ${byteToSize(totalBytes / fragments.length * totalFragments)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  149. L203 `»preview.attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  150. L207 `»data.html.find("#screenshots").show().attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  151. L214 `»preview.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  152. L216 `»data«.duration = this.duration;`  · ASSIGN:identifier
  153. L217 `»mediaInfo.append(`<br><b>${i18n.duration}:</b> ${secToTime(this.duration)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  154. L220 `»mediaInfo.append(`<br><b>${i18n.resolution}:</b> ${this.videoWidth}x${this.videoHeight}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  155. L224 `»!isM3U8(data) && getRemoteFileSize(data.url«)`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element
  156. L221 `»data«.videoWidth = this.videoWidth;`  · ASSIGN:identifier
  157. L544 `aria2»Add«Uri(data);`  · ASSIGN:identifier
  158. L222 `»data«.videoHeight = this.videoHeight;`  · ASSIGN:identifier
  159. L228 `»mediaInfo.append(`<br><b>${i18n.bitrate}:</b> ${formatBitrate(bps)}`)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:template-literal, RETURN:fallback-return
  160. L32 _(in `js/function`)_ `return »(bps / 1000 / 1000).toFixed(2)« + ' Mbps';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  161. L34 _(in `js/function`)_ `return »(bps / 1000).toFixed(2)« + ' kbps';`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  162. L243 `»$(this).html("").qrcode({ width: size, height: size, text: data.url }).off("click")«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  163. L247 `catDownload(»data«);`  · ASSIGN:identifier
  164. L993 `if (!Array.isArray(»data)) { data = [data]«; }`  · ASSIGN:identifier, ELEMENT:object.setProperty
  165. L996 `localStorage.setItem('downloadData', »JSON.stringify(data)«);`  · RETURN:json.stringify
  166. L1003 (→L1010) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "catDownload", data: data }, (message) => {«`  · ELEMENT:object.setProperty
  167. L988 `catDownload(»data«, extra);`  · ASSIGN:identifier
  168. L254 `const text = copyLink(»data«);`  · ASSIGN:identifier
  169. L3 `const _tabId = »parseInt«(params.get("tabId"));`  · ASSIGN:identifier, ELEMENT:member-element
  170. L4 `const _t»ype = params«.get("type");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  171. L6 _(in `js/function`)_ `function append»Zero(date) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  172. L11 _(in `js/init`)_ `// /^https:\/\/.*\.douy»in\.«com\/.*$/i,`  · ASSIGN:identifier
  173. L261 `aria2AddUri(»data«, function (data) {`  · ASSIGN:identifier
  174. L68 _(in `js/function`)_ `* @para»m {Object|String}« obj 判断的变量`  · ASSIGN:identifier, ELEMENT:member-element
  175. L67 _(in `js/init`)_ `{ »"type": "ap«plication/vnd.apple.mpegurl", "size": 0, "operator": ">=", "unit": "KB", "state": true },`  · ELEMENT:object.setProperty
  176. L81 _(in `js/templates`)_ `userAgent: G.userAgent ?? naviga»tor.userAge«nt,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  177. L272 `if (»!data.url.startsWith("blob:")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  178. L314 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  179. L273 `const m3u8dlArg = templates(G.m3u8dlArg, »data«);`  · ASSIGN:identifier
  180. L315 `openParser(»data«, { autoDown: true });`  · ASSIGN:identifier
  181. L319 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  182. L318 (→L322) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  183. L320 `filename: »data.downFileName«,`  · ASSIGN:identifier, ELEMENT:member-element
  184. L322 `}, function (id) { downData[id] = »data«; });`  · ASSIGN:identifier
  185. L327 `const url = templates(G.invokeText, »data«);`  · ASSIGN:identifier
  186. L368 `let url = templates(G.Player, »data«);`  · ASSIGN:identifier
  187. L378 `openParser(»data«);`  · ASSIGN:identifier
  188. L385 `»data«._checked = this.checked;`  · ASSIGN:identifier
  189. L391 `return »data._checked«;`  · ASSIGN:identifier, ELEMENT:member-element
  190. L394 `»data«._checked = newValue;`  · ASSIGN:identifier
  191. L395 `»data.html.find('input').prop("checked", newValue)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  192. L401 `send2local("catch", »data, data.tabId«).then(function (success) {`  · ASSIGN:identifier, ELEMENT:member-element
  193. L411 _(in `js/function`)_ `body = »G.send2localBody.replaceAll('${data}', `"${data}"`)«;`  · ASSIGN:identifier, ASSIGN:template-literal, MUTATE:string.replace, ELEMENT:member-element-container
  194. L414 `»    «if ($mqttButton.hasClass('mqtt-sending')) {`  · ASSIGN:identifier
  195. L412 _(in `js/function`)_ `»data = { tabId: tabId }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  196. L415 _(in `js/function`)_ `let postData = templates(»body«, data);`  · ASSIGN:identifier
  197. L416 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:implicit.add
  198. L353 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  199. L325 _(in `js/function`)_ `const »option = { method: G.send2localMethod }«;`  · ELEMENT:object.setProperty
  200. L424 `sendToMQTT(»data«).then(function (success) {`  · ASSIGN:identifier
  201. L118 _(in `js/popup-utils`)_ `»data.title = data.title.slice(0, titleLength) || ""«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  202. L119 `»    «<div class="url hide">`  · ASSIGN:identifier
  203. L120 `<div id=»"med«iaInfo" data-state="false">`  · ASSIGN:identifier
  204. L528 `$al»l.append(AddMed«ia(data[key][i], false));`  · ASSIGN:identifier, COPY:object-spread
  205. L435 _(in `js/function`)_ `let body = »G.send2localBody.replaceAll«('${data}', `[${results.join(",")}]`);`  · ELEMENT:member-element-container
  206. L436 _(in `js/function`)_ `let postData = templates(»body«, { action, tabId });`  · ASSIGN:identifier
  207. L900 `if (item.url == »Message.url«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  208. L906 `$maybeKey.append(AddKey(»Message.data«));`  · ELEMENT:member-element
  209. L472 `const base64Key = base64ToHex(»key«);`  · ASSIGN:identifier
  210. L1133 `binaryString = »atob(base64)«;`  · ASSIGN:identifier, RETURN:atob
  211. L1139 `for (let i = 0; i < »binaryString.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  212. L1140 `let hex = »binaryString.charCodeAt(i).toString(16)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  213. L1141 `if (»hex.length« === 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  214. L1142 `hex = '0' + »hex«;`  · ASSIGN:identifier, ASSIGN:binary-right
  215. L1144 `hexString += »hex«;`  · ASSIGN:identifier
  216. L1146 `return »hexString«;`  · ASSIGN:identifier
  217. L473 `if (»!base64Key«) { return; }`  · ASSIGN:identifier, ASSIGN:unary
  218. L479 `<span class="name bold">${»key«}</span>`  · ASSIGN:identifier
  219. L484 `Hex: ${»base64Key«}`  · ASSIGN:identifier
  220. L486 `Base64: ${»key«}`  · ASSIGN:identifier
  221. L476 (→L488) `»    data.html = $(`«`  · ASSIGN:template-literal

---

## Flow #9 — JQUERY_ELEMENT_VAL (#videoTabIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L70:C17 -> L70:C29  `if (!»currentTabId« || currentTabId == -1) return;`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (mediaControl) — `js/media-control` L174:C16 -> L174:C120  `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (276 raw steps → 23 distinct lines):
   1. L70 `if (»!currentTabId || currentTabId == -1«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L71 `_tabId = »parseInt(currentTabId)«;`  · ASSIGN:identifier, RETURN:parseInt
   3. L74 `chrome.tabs.sendMessage(»_tabId«, { Message: "getVideoState", index: _index }, { frameId: 0 }, (state) => {`  · ASSIGN:identifier
   4. L68 `if (»_tabId« === -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L174 `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L210 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   7. L213 `chrome.tabs.sendMessage(»_tabId«, { Message: "speed", speed: $(this).data("switch") === "speed" ? speed : 1, index: _index });`  · ASSIGN:identifier
   8. L218 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   9. L219 `chrome.tabs.sendMessage(»_tabId«, { Message: "pip", index: _index }, (state) => {`  · ASSIGN:identifier
  10. L227 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  11. L228 `chrome.tabs.get(»_tabId«, (tab) => {`  · ASSIGN:identifier
  12. L230 `chrome.tabs.sendMessage(»_tabId«, { Message: "fullScreen", index: _index }, () => close());`  · ASSIGN:identifier
  13. L237 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  14. L239 `chrome.tabs.sendMessage(»_tabId«, { Message: action, index: _index });`  · ASSIGN:identifier
  15. L244 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  16. L246 `chrome.tabs.sendMessage(»_tabId«, { Message: this.id, action, index: _index });`  · ASSIGN:identifier
  17. L251 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  18. L257 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  19. L258 `chrome.tabs.sendMessage(»_tabId«, { Message: "setVolume", volume: $(this).val(), index: _index }, () => {`  · ASSIGN:identifier
  20. L265 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  21. L266 `chrome.tabs.sendMessage(»_tabId«, { Message: "setTime", time: $(this).val(), index: _index }, () => {`  · ASSIGN:identifier
  22. L273 `if (»_index < 0 || _tabId < 0«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  23. L274 `chrome.tabs.sendMessage(»_tabId«, { Message: "screenshot", index: _index });`  · ASSIGN:identifier

---

## Flow #10 — JQUERY_ELEMENT_VAL (#videoTabIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L182:C21 -> L182:C56  `_tabId = »parseInt($("#videoTabIndex").val())«;`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (mediaControl) — `js/media-control` L187:C8 -> L187:C112  `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (11 raw steps → 4 distinct lines):
   1. L182 `_tabId = »parseInt($("#videoTabIndex").val())«;`  · RETURN:parseInt
   2. L187 `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L68 `if (»_tabId« === -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L74 `chrome.tabs.sendMessage(»_tabId«, { Message: "getVideoState", index: _index }, { frameId: 0 }, (state) => {`  · ASSIGN:identifier

---

## Flow #11 — JQUERY_ELEMENT_VAL (#playbackRate)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L211:C22 -> L211:C58  `const speed = »parseFloat($("#playbackRate").val())«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (playbackRate) — `js/media-control` L212:C8 -> L212:C56  `»chrome.storage.sync.set({ playbackRate: speed })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (6 raw steps → 3 distinct lines):
   1. L211 `const speed = »parseFloat($("#playbackRate").val())«;`  · RETURN:parseFloat
   2. L212 `»chrome.storage.sync.set({ playbackRate: speed })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L213 `»chrome.tabs.sendMessage(_tabId, { Message: "speed", speed: $(this).data("switch") === "speed" ? speed : 1, index: _index })«;`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty

---

## Flow #12 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

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

## Flow #13 — ELEMENT_INNER_HTML (i18n)

- **Source**: `ELEMENT_INNER_HTML` — `js/i18n` L9:C28 -> L9:C72  `element.outerHTML = »i18n(element.innerHTML) ?? element.innerHTML«;`
- **Sink(s)**:
  - `DOM_INNER_HTML` (outerHTML) — `js/i18n` L9:C16 -> L9:C25  `element.»outerHTML« = i18n(element.innerHTML) ?? element.innerHTML;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L9 `element.outerHTML = »i18n(element.innerHTML) ?? element.innerHTML«;`  · ASSIGN:logical-right
   2. L8 (→L10) `»    document.querySelectorAll('i18n').forEach(function (element) {«`  · ELEMENT:object.setProperty

---

## Flow #14 — JQUERY_ELEMENT_VAL (#testTextarea)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/options` L216:C29 -> L216:C59  `const result = templates(»$("#testTextarea").val() ?? ""«, data);`
- **Sink(s)**:
  - `JQUERY_ELEMENT_HTML_SET` (#tagTestResult) — `js/options` L218:C4 -> L218:C99  `»$("#tagTestResult").html(`${result}<br><br><a href="${m3u8dl}" class="test_url">${m3u8dl}</a>`)«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (7224 raw steps → 60 distinct lines):
   1. L216 `const result = templates(»$("#testTextarea").val() ?? ""«, data);`  · ASSIGN:logical-left
   2. L279 _(in `js/init`)_ `»        chrome.storage.sync.set({ c«opyM3U8: items.copyM3U8 });`  · ASSIGN:identifier, ELEMENT:implicit.add
   3. L43 `if (key »== "«Ext" || key == "Type" || key == "Regex") { continue; }`  · ASSIGN:identifier
   4. L73 `playerLi»st «= new Map();`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L72 (→L75) `»// 自定义播放调用模板«`  · ASSIGN:logical-right, ASSIGN:logical-left
   6. L74 `playerLi»st.«set("tips", { name: i18n.invokeProtocolTemplate, template: "" });`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L75 `playerLi»st.«set("default", { name: i18n.default + " / " + i18n.disable, template: "" });`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L86 _(in `js/function`)_ `const rules = { removeRu»leId«s: [tabs ? tabs.id : 1] };`  · ASSIGN:identifier
   9. L198 `query = $("#r»egexList [na«me=state]");`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  10. L94 _(in `js/templates`)_ `const peek = (offset = 0) => pos + offset < input.length ? »input[pos + offset]« : '';`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:conditional-consequent
  11. L199 _(in `js/init`)_ `G.scriptList.set»("webrtc.js", { key: "webrtc", re«fresh: true, allFrames: true, world: "MAIN", name: i18n.recordWebRTC, off: i18n.closeRecording, i18n: true, tabId: new Set() });`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  12. L95 _(in `js/templates`)_ `const advance = () => pos < input.length ? »input[pos++]« : '';`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  13. L96 `html = `<td><input ty»pe="text" va«lue="${Param.type ? Param.type : ""}" name="text" placeholder="${i18n.type}" class="type"></td>``  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  14. L120 `» <label class="swit«chLabel switchRadius">`  · ASSIGN:unary, ASSIGN:logical-left
  15. L134 `html.find("inpu»t").on("input", functio«n () {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L123 `»</«label>`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L124 _(in `js/init`)_ `send2localBody: »'{"action": "${action}"«, "data": ${data}, "tabId": "${tabId}"}',`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  18. L125 _(in `js/function`)_ `function setHeaders(data,» callBack, tabId = -1) «{`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  19. L127 `<img src»="img/delete.svg" class="Rem«oveButton">`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  20. L128 _(in `js/init`)_ `popup: false,   // 是否默认弹出»模式«`  · ASSIGN:identifier, ASSIGN:binary-left
  21. L192 _(in `js/templates`)_ `const pipeIdx = findTopLevelPipe(»content«);`  · ASSIGN:identifier
  22. L139 _(in `js/function`)_ `"requestHeaders"»: Object.k«eys(item.requestHeaders).map(key => ({ header: key, operation: "set", value: item.requestHeaders[key] }))`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  23. L140 _(in `js/templates`)_ `const ch = »str[i]«;`  · ASSIGN:identifier, ELEMENT:member-element
  24. L142 `$("#type»Li«st tr").each(function () {`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L143 `let »GetText = $(this).find(«"[name=text]").val();`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  26. L144 `if (isEmp»ty(GetText)) { return t«rue; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  27. L145 _(in `js/templates`)_ `else if (»!inDouble && !inSingle && ch === '|'«) return i;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  28. L193 _(in `js/templates`)_ `const varName = pipeIdx === -1 ? »content.trim() : content.slice(0, pipeIdx).trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  29. L194 _(in `js/templates`)_ `const pipes = pipeIdx === -1 ? [] : »parsePipeChain(content.slice(pipeIdx + 1).trim())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-alternate
  30. L186 _(in `js/templates`)_ `return splitByTopLevelPipe(»chainStr«).map(s => parseOnePipe(s.trim()));`  · ASSIGN:identifier
  31. L153 _(in `js/function`)_ `chrome.declarativeNetRequest».updateSes«sionRules(rules, () => {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  32. L154 _(in `js/templates`)_ `const ch = »str[i]«;`  · ASSIGN:identifier, ELEMENT:member-element
  33. L164 _(in `js/templates`)_ `parts.push(»str.slice(start)«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  34. L151 _(in `js/function`)_ `rules.addR»ules.push(«rule);`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  35. L156 _(in `js/init`)_ `mqttEnable: fals»e,«`  · ASSIGN:identifier, ASSIGN:binary-left
  36. L157 _(in `js/templates`)_ `if (»!inSingle && ch === '"'«) inDouble = !inDouble;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  37. L158 _(in `js/templates`)_ `else if (»!inDouble && ch === "'"«) inSingle = !inSingle;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  38. L159 `if (this.id == "Playe»rTemplate" && playerList.has(Value) «&& Value != "tips") {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  39. L195 _(in `js/init`)_ `G.scriptList».set("search.js", { key: "search", refr«esh: true, allFrames: true, world: "MAIN", name: i18n.deepSearch, off: i18n.closeSearch, i18n: false, tabId: new Set() });`  · ASSIGN:identifier, ELEMENT:object.setProperty
  40. L114 _(in `js/templates`)_ `while (»!eof() && !(peek() === '$' && peek(1) === '{')«) advance();`  · ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  41. L115 _(in `js/templates`)_ `»return { type: 'text', value: input.slice(start, pos) };«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty
  42. L92 `ht»ml = `<td>«<input type="text" value="${Param.ext ? Param.ext : ""}" name="text" placeholder="${i18n.suffix}" class="ext"></td>``  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  43. L211 (→L217) `reque»stHeaders: { referer: $("#referer").val() },«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  44. L212 `initiato»r: $("#in«itiator").val(),`  · ELEMENT:member-element-container, ASSIGN:binary-left
  45. L213 _(in `js/init`)_ `return G».onlineServiceAddres«s == 0 ? "https://stream.bmmmd.com/mitm.html" : "https://ffmpeg.94cat.com/mitm.html";`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  46. L214 `title: $("#titl»e").val()«,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  47. L223 _(in `js/function`)_ `retu»rn new Blob«();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  48. L227 _(in `js/init`)_ `(chrome.storage.sessi»on ?? chrom«e.storage.local).get({ MediaData: {} }, function (items) {`  · ELEMENT:member-element-container
  49. L231 `chro»me.storage.sync.s«et({ [Option]: G.OptionLists[Option] }, () => {`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:unary
  50. L232 _(in `js/templates`)_ `return value !== undefined ? String(value) : »'${' + tag.varName + '}'«;`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:conditional-alternate
  51. L235 _(in `js/function`)_ `b»lobs.push(new Blob([chu«nk]));`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  52. L236 (→L243) _(in `js/init`)_ `if (chrome.runtime.lastEr»ror) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  53. L215 _(in `js/templates`)_ `»result += this._evalTag(node, data, trimData)«;`  · ELEMENT:implicit.add
  54. L245 _(in `js/templates`)_ `if (isEmpty(current) && !['exists', 'find', 'prompt'].includes(»pipe.name«)) return '';`  · ASSIGN:identifier, ELEMENT:member-element
  55. L246 _(in `js/templates`)_ `if (»resolvedArgs.length === 0 && !['filter', 'prompt'].includes(pipe.name)«) break;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left
  56. L248 _(in `js/templates`)_ `const processor = Template._processors[»pipe.name«];`  · ASSIGN:identifier, ELEMENT:member-element
  57. L10 _(in `js/templates`)_ `retur»n match.slice(1).fi«lter(Boolean).map(s => s.trim()).join("");`  · INITIAL:Uint8Array.constructor
  58. L14 _(in `js/templates`)_ `»    concat: «(txt, arg) => txt + (arg[0] || ""),`  · ELEMENT:member-element-container
  59. L217 `const m3u8dl = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(result) : result«);`  · ASSIGN:binary-right
  60. L218 `$("#tagTestResult").html(»`${result}<br><br><a href="${m3u8dl}" class="test_url">${m3u8dl}</a>`«);`  · ASSIGN:identifier, ASSIGN:template-literal

---
