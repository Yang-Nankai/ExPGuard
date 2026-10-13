# Source-level Taint Flow — nokccdnfdobcfbdiapoljmomndcohjpj 2.6.3

- Source type: CRX
- Files with issues: 10 / 14
- Distinct taint flows: 22  (collapsed from 31 raw issue entries)
- Sinkless sources skipped: 59 (sources that reach no sink)

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

- **Propagation** (242 raw steps → 27 distinct lines):
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
  24. L505 _(in `js/background`)_ `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty
  25. L146 `for (»let item of Message.files«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  26. L148 `data.type = »item.type ?? "video"«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  27. L163 `if (»Message.Message« == "getPage") {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content-script` L197:C12 -> L197:C23  `if (»!event.data« || !event.data.action) { return; }`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L141:C16 -> L141:C43  `»window.postMessage(Message)«;`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L150:C20 -> L150:C44  `»window.postMessage(data)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/content-script` L152:C20 -> L152:C36  `»fetch(data.data)«`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L156:C28 -> L156:C52  `»window.postMessage(data)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (596 raw steps → 60 distinct lines):
   1. L197 `if (»!event.data || !event.data.action«) { return; }`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
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
  20. L257 `let bytes = »new Uint8Array(data)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  21. L259 `for (let i = 0; i < »bytes.byteLength«; i++) {`  · ELEMENT:member-element, ASSIGN:binary-right
  22. L260 `binary += »String.fromCharCode(bytes[i])«;`  · ELEMENT:member-element, RETURN:string.fromCharCode
  23. L263 `return _btoa(»binary«);`  · ASSIGN:identifier
  24. L265 `return »btoa(binary)«;`  · ASSIGN:identifier, RETURN:btoa
  25. L246 `if (»!event.data.state || !event.data.tabId«) { return; }`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  26. L249 `if (»event.data.action« == "catCatchToBackground") {`  · ELEMENT:member-element, ASSIGN:binary-left
  27. L215 `if (»!key || _key.includes(key)«) { return; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  28. L234 `»event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString()«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  29. L235 `event.data.title = »event.data.title.replaceAll('"', "").replaceAll("'", "").replaceAll(" ", "")«;`  · ELEMENT:member-element, RETURN:fallback-return
  30. L247 `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty, COPY:object-spread
  31. L216 `_key.push(»key«);`  · ASSIGN:identifier
  32. L4 `var »_key = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  33. L220 `data: »key«,`  · ASSIGN:identifier
  34. L217 (→L221) `»            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  35. L242 `»data = { ...event.data, ...data }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  36. L224 `data: »key«,`  · ASSIGN:identifier
  37. L222 (→L226) `»            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
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
  54. L505 _(in `js/background`)_ `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty
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

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L308:C0 -> L531:C2 (spans to L531)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L809:C8 -> L809:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L813:C8 -> L813:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L823:C8 -> L840:C10 (spans to L840)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L844:C4 -> L846:C6 (spans to L846)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L508:C16 -> L512:C18 (spans to L512)  `»chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, function (tab) {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3195 raw steps → 84 distinct lines):
   1. L308 (→L531) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]; runtime.single.sender.message[js/popup->js/background]`
   2. L349 `if (»Message.Message == "getData" && Message.requestId«) {`  · ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left
   3. L315 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
   4. L247 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty
   5. L318 `if (»Message.Message« == "pushData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L324 `if (»Message.Message« == "getAllData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L333 `if (»Message.Message« == "ClearIcon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   8. L339 `if (»Message.Message« == "enable") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   9. L370 `if (»Message.Message« == "getData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L378 `if (»Message.Message« == "getButtonState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L391 `if (»Message.Message« == "mobileUserAgent") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L398 `if (»Message.Message« == "autoDown") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L409 `if (»Message.Message« == "script") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L443 `if (»Message.Message« == "scriptI18n") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L454 `if (»Message.Message« == "HeartBeat") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L464 `if (»Message.Message« == "clearData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L484 `if (»Message.Message« == "clearRedundant") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L490 `if (»Message.Message« == "addMedia") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L504 `if (»Message.Message« == "catCatchFFmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L526 `if (»Message.Message == "send2local" && G.send2local«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  21. L505 `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member-element-container, ASSIGN:logical-left
  22. L242 _(in `js/m3u8`)_ `»if (!m3u8Text.includes("#EXTM3U")«) {`  · ELEMENT:object.setProperty
  23. L334 `»Message.type ? SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:object.setProperty
  24. L809 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
  25. L813 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
  26. L351 `if (!Array.isArray(»Message.requestId«)) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  27. L352 `»Message.requestId = [Message.requestId]«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  28. L371 `sendResponse(cacheData[»Message.tabId«]);`  · ELEMENT:member-element-container
  29. L380 `MobileUserAgent: G.featMobileTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  30. L381 `AutoDown: G.featAutoDownTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  31. L355 `if (»Message.requestId.length«) {`  · ELEMENT:member-element-container, ELEMENT:member.length
  32. L392 `mobileUserAgent(»Message.tabId, !G.featMobileTabId.has(Message.tabId«));`  · ELEMENT:member-element-container
  33. L821 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
  34. L843 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
  35. L824 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  36. L823 (→L840) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  37. L826 `"id": »tabId«,`  · ASSIGN:identifier
  38. L836 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  39. L845 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  40. L844 (→L846) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  41. L393 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  42. L399 `if (G.featAutoDownTabId.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  43. L400 `G.featAutoDownTabId.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  44. L402 `G.featAutoDownTabId.add(»Message.tabId«);`  · ELEMENT:member-element-container
  45. L410 `if (!G.scriptList.has(»Message.script«)) {`  · ELEMENT:member-element
  46. L358 `if (»Message.requestId.includes(data.requestId)«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  47. L414 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  48. L445 `target: { tabId: »Message.tabId«, allFrames: true },`  · ELEMENT:member-element-container
  49. L444 (→L449) `»        chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  50. L416 `const refresh = »Message.refresh ?? script.refresh«;`  · ELEMENT:member-element, ASSIGN:logical-left
  51. L466 `if (»Message.type«) {`  · ELEMENT:member-element
  52. L417 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  53. L418 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  54. L426 `scriptTabid.add(»Message.tabId«);`  · ELEMENT:member-element-container
  55. L475 `if (item == »Message.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  56. L419 `if (»Message.script« == "search.js") {`  · ELEMENT:member-element, ASSIGN:binary-left
  57. L427 `if (»refresh«) {`  · ASSIGN:identifier
  58. L420 `G.deepSearchTemporarilyClose = »Message.tabId«;`  · ELEMENT:member-element-container
  59. L428 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  60. L430 `const »files = [`catch-script/${Message.script}`]«;`  · ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add
  61. L527 `try { send2local(»Message.action, Message.data, Message.tabId«); } catch (e) { console.log(e); }`  · ELEMENT:member-element-container, ELEMENT:member-element
  62. L433 `target: { tabId: »Message.tabId«, allFrames: script.allFrames },`  · ELEMENT:member-element-container
  63. L432 (→L437) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  64. L422 `refresh && chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  65. L385 `state[item.key] = item.tabId.has(»Message.tabId«);`  · ELEMENT:member-element-container
  66. L493 `if (item.url == »Message.href«) {`  · ELEMENT:member-element, ASSIGN:binary-right
  67. L498 `»findMedia({ url: Message.url, tabId: -1, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, initiator: Message.href, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  68. L98 (→L100) `if (»data.initiator != "null" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  69. L99 `»data.initiator« != undefined &&`  · ASSIGN:binary-left
  70. L851 `if (»!url || url == "null"«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  71. L852 `return »!(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  72. L105 `if (»isSpecialPage(data.url)«) { return; }`  · ELEMENT:implicit.add
  73. L106 `const »urlParsing = new URL(data.url)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  74. L107 `let [name, ext] = fileNameParse(»urlParsing.pathname«);`  · ELEMENT:member-element
  75. L749 `let fileName = »decodeURI(pathname.split("/").pop())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURI
  76. L750 `let ext = »fileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  77. L751 `ext = ext.length == 1 ? undefined : »ext.pop().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  78. L752 `»return [fileName, ext ? ext : undefined];«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ELEMENT:implicit.add
  79. L193 `const »tabFingerprints = G.urlMap.get(data.tabId) || new Set()«;`  · ELEMENT:object.setProperty
  80. L199 `if (»tabFingerprints.size« >= 500) {`  · ELEMENT:member-element, ASSIGN:binary-left
  81. L200 `»tabFingerprints.clear«();`  · ELEMENT:member-element-container
  82. L494 `»findMedia({ url: Message.url, tabId: item.id, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  83. L508 (→L512) `chrome.tabs.create({ url: G.ffmpegConfig.url, active: »Message.active ?? true }, function (tab) {«`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  84. L249 (→L266) `»        chrome.runtime.sendMessage({ Message: "popupAddData", data: info }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/background]`

---

## Flow #5 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/background` L308:C0 -> L531:C2 (spans to L531)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L809:C8 -> L809:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L813:C8 -> L813:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L823:C8 -> L840:C10 (spans to L840)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L844:C4 -> L846:C6 (spans to L846)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L508:C16 -> L512:C18 (spans to L512)  `»chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, function (tab) {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3137 raw steps → 83 distinct lines):
   1. L308 (→L531) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]; runtime.single.sender.message[js/popup->js/background]`
   2. L315 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:member-element
   3. L247 _(in `js/content-script`)_ `»chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data })«;`  · ELEMENT:object.setProperty
   4. L318 `if (»Message.Message« == "pushData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L324 `if (»Message.Message« == "getAllData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L333 `if (»Message.Message« == "ClearIcon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L339 `if (»Message.Message« == "enable") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   8. L349 `if (»Message.Message == "getData" && Message.requestId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   9. L370 `if (»Message.Message« == "getData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  10. L378 `if (»Message.Message« == "getButtonState") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L391 `if (»Message.Message« == "mobileUserAgent") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L398 `if (»Message.Message« == "autoDown") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L409 `if (»Message.Message« == "script") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L443 `if (»Message.Message« == "scriptI18n") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L454 `if (»Message.Message« == "HeartBeat") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L464 `if (»Message.Message« == "clearData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  17. L484 `if (»Message.Message« == "clearRedundant") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  18. L490 `if (»Message.Message« == "addMedia") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L504 `if (»Message.Message« == "catCatchFFmpeg") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L526 `if (»Message.Message == "send2local" && G.send2local«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  21. L505 `const »data = { ...Message, Message: "ffmpeg", tabId: Message.tabId ?? sender.tab.id, version: G.ffmpegConfig.version }«;`  · ELEMENT:object.setProperty, COPY:object-spread, ELEMENT:member-element-container, ASSIGN:logical-left
  22. L242 _(in `js/m3u8`)_ `»if (!m3u8Text.includes("#EXTM3U")«) {`  · ELEMENT:object.setProperty
  23. L334 `»Message.type ? SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:object.setProperty
  24. L809 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
  25. L813 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
  26. L351 `if (!Array.isArray(»Message.requestId«)) {`  · ELEMENT:member-element, ELEMENT:member-element-container
  27. L352 `»Message.requestId = [Message.requestId]«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  28. L371 `sendResponse(cacheData[»Message.tabId«]);`  · ELEMENT:member-element-container
  29. L380 `MobileUserAgent: G.featMobileTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  30. L381 `AutoDown: G.featAutoDownTabId.has(»Message.tabId«),`  · ELEMENT:member-element-container
  31. L355 `if (»Message.requestId.length«) {`  · ELEMENT:member-element-container, ELEMENT:member.length
  32. L392 `mobileUserAgent(»Message.tabId, !G.featMobileTabId.has(Message.tabId«));`  · ELEMENT:member-element-container
  33. L821 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
  34. L843 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
  35. L824 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  36. L823 (→L840) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  37. L826 `"id": »tabId«,`  · ASSIGN:identifier
  38. L836 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  39. L845 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  40. L844 (→L846) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  41. L393 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  42. L399 `if (G.featAutoDownTabId.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  43. L400 `G.featAutoDownTabId.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  44. L402 `G.featAutoDownTabId.add(»Message.tabId«);`  · ELEMENT:member-element-container
  45. L410 `if (!G.scriptList.has(»Message.script«)) {`  · ELEMENT:member-element
  46. L358 `if (»Message.requestId.includes(data.requestId)«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  47. L414 `const script = G.scriptList.get(»Message.script«);`  · ELEMENT:member-element
  48. L445 `target: { tabId: »Message.tabId«, allFrames: true },`  · ELEMENT:member-element-container
  49. L444 (→L449) `»        chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  50. L416 `const refresh = »Message.refresh ?? script.refresh«;`  · ELEMENT:member-element, ASSIGN:logical-left
  51. L466 `if (»Message.type«) {`  · ELEMENT:member-element
  52. L417 `if (scriptTabid.has(»Message.tabId«)) {`  · ELEMENT:member-element-container
  53. L418 `scriptTabid.delete(»Message.tabId«);`  · ELEMENT:member-element-container
  54. L426 `scriptTabid.add(»Message.tabId«);`  · ELEMENT:member-element-container
  55. L475 `if (item == »Message.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  56. L419 `if (»Message.script« == "search.js") {`  · ELEMENT:member-element, ASSIGN:binary-left
  57. L427 `if (»refresh«) {`  · ASSIGN:identifier
  58. L420 `G.deepSearchTemporarilyClose = »Message.tabId«;`  · ELEMENT:member-element-container
  59. L428 `chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  60. L430 `const »files = [`catch-script/${Message.script}`]«;`  · ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add
  61. L527 `try { send2local(»Message.action, Message.data, Message.tabId«); } catch (e) { console.log(e); }`  · ELEMENT:member-element-container, ELEMENT:member-element
  62. L433 `target: { tabId: »Message.tabId«, allFrames: script.allFrames },`  · ELEMENT:member-element-container
  63. L432 (→L437) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  64. L422 `refresh && chrome.tabs.reload(»Message.tabId«, { bypassCache: true });`  · ELEMENT:member-element-container
  65. L385 `state[item.key] = item.tabId.has(»Message.tabId«);`  · ELEMENT:member-element-container
  66. L493 `if (item.url == »Message.href«) {`  · ELEMENT:member-element, ASSIGN:binary-right
  67. L498 `»findMedia({ url: Message.url, tabId: -1, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, initiator: Message.href, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  68. L98 (→L100) `if (»data.initiator != "null" &&«`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  69. L99 `»data.initiator« != undefined &&`  · ASSIGN:binary-left
  70. L851 `if (»!url || url == "null"«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  71. L852 `return »!(url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:"))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  72. L105 `if (»isSpecialPage(data.url)«) { return; }`  · ELEMENT:implicit.add
  73. L106 `const »urlParsing = new URL(data.url)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  74. L107 `let [name, ext] = fileNameParse(»urlParsing.pathname«);`  · ELEMENT:member-element
  75. L749 `let fileName = »decodeURI(pathname.split("/").pop())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURI
  76. L750 `let ext = »fileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  77. L751 `ext = ext.length == 1 ? undefined : »ext.pop().toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  78. L752 `»return [fileName, ext ? ext : undefined];«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, ELEMENT:implicit.add
  79. L193 `const »tabFingerprints = G.urlMap.get(data.tabId) || new Set()«;`  · ELEMENT:object.setProperty
  80. L199 `if (»tabFingerprints.size« >= 500) {`  · ELEMENT:member-element, ASSIGN:binary-left
  81. L200 `»tabFingerprints.clear«();`  · ELEMENT:member-element-container
  82. L494 `»findMedia({ url: Message.url, tabId: item.id, extraExt: Message.extraExt, mime: Message.mime, requestId: Message.requestId, requestHeaders: Message.requestHeaders }, true, true)«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty, ELEMENT:member-element
  83. L508 (→L512) `chrome.tabs.create({ url: G.ffmpegConfig.url, active: »Message.active ?? true }, function (tab) {«`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #6 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/background` L308:C0 -> L531:C2 (spans to L531)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L809:C8 -> L809:C137  `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `js/background` L813:C8 -> L813:C133  `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L823:C8 -> L840:C10 (spans to L840)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L844:C4 -> L846:C6 (spans to L846)  `»chrome.declarativeNetRequest.updateSessionRules({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (193 raw steps → 15 distinct lines):
   1. L308 (→L531) `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/popup->js/background]`
   2. L315 `Message.tabId = »Message.tabId ?? G.tabId«;`  · ASSIGN:logical-left
   3. L475 `if (item == »Message.tabId«) { continue; }`  · ASSIGN:binary-right
   4. L334 `Message.type ? »SetIcon({ tabId: Message.tabId })« : SetIcon();`  · ELEMENT:object.setProperty
   5. L809 `»chrome.action.setBadgeText({ text: "", tabId: obj?.tabId ?? G.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ASSIGN:logical-left, ELEMENT:object.setProperty
   6. L813 `»chrome.action.setBadgeText({ text: obj.number, tabId: obj.tabId }, function () { if (chrome.runtime.lastError) { return; } })«;`  · ELEMENT:object.setProperty
   7. L821 `G.featMobileTabId.add(»tabId«);`  · ASSIGN:identifier
   8. L843 `G.featMobileTabId.delete(»tabId«) && (chrome.storage.session ?? chrome.storage.local).set({ featMobileTabId: Array.from(G.featMobileTabId) });`  · ASSIGN:identifier
   9. L824 `removeRuleIds: [»tabId«],`  · ASSIGN:identifier
  10. L823 (→L840) `»        chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  11. L826 `"id": »tabId«,`  · ASSIGN:identifier
  12. L836 `"tabIds": [»tabId«],`  · ASSIGN:identifier
  13. L845 `removeRuleIds: [»tabId«]`  · ASSIGN:identifier
  14. L844 (→L846) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  15. L432 (→L437) `»            chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty

---

## Flow #7 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/init` L180:C12 -> L180:C37  `G.version = »navigator.userAgent.match«(/(Chrome|Firefox)\/([\d]+)/);`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L261:C12 -> L261:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L265:C12 -> L265:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L269:C12 -> L269:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L273:C12 -> L273:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (606 raw steps → 37 distinct lines):
   1. L180 `G.version = »navigator.userAgent.match(/(Chrome|Firefox)\/([\d]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L43 `var »G = {}«;`  · ELEMENT:object.setProperty
   3. L181 `G.version = G.version && G.version[2] ? »parseInt(G.version[2])« : 93;`  · ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   4. L279 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   5. L294 `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar«, function (items) {`  · ELEMENT:member-element-container
   6. L297 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   7. L308 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
   8. L318 (→L322) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L310 `G.Ext = new Map(»newValue.map(item => [item.ext, item])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L326 (→L328) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  11. L314 `G.Type = new Map(»newValue.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L332 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  13. L335 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  14. L336 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L339 `G[key] = »newValue«;`  · ASSIGN:identifier
  16. L233 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  17. L235 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  18. L238 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  19. L239 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  20. L244 `items.Ext = new Map(»items.Ext.map(item => [item.ext, item])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  21. L240 `»items[key] = G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  22. L67 (→L170) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  23. L246 `items.Type = new Map(»items.Type.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  24. L248 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  25. L254 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  26. L259 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  27. L260 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  28. L263 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  29. L261 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  30. L264 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  31. L267 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  32. L265 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  33. L268 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  34. L269 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  35. L277 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  36. L273 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  37. L285 `»G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #8 — JQUERY_ELEMENT_VAL (From storage.session.set('mediaControl') in js/media-control)  ·  8× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/init` L51:C16 -> L51:C28  `G.urlMap = new M»ap();   // u«rl查重map`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L261:C12 -> L261:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L265:C12 -> L265:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L269:C12 -> L269:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L273:C12 -> L273:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (932 raw steps → 59 distinct lines):
   1. L51 `G.urlMap = new M»ap();   // u«rl查重map`  · ASSIGN:identifier, ASSIGN:binary-left
   2. L52 `G.deepSearchTemporari»lyClose = null; // 深度搜«索临时变量`  · ASSIGN:identifier, RETURN:parseInt
   3. L54 _(in `js/options`)_ `$("#typeList [name=text]").l»ast().«focus();`  · ASSIGN:identifier
   4. L49 `G.blockUrlSe»t = ne«w Set();    // 屏蔽网址列表`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L104 _(in `js/popup`)_ `»${G.ShowWebIco ? `<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.reques«tId}" src="${data.favIconUrl}"/>` : ""}`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L138 _(in `js/function`)_ `rule»s.removeRuleIds.push(par«seInt(item.requestId));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   7. L145 `send2localURL: "http://127.0».0.1:8«000/",`  · ASSIGN:identifier
   8. L141 _(in `js/function`)_ `chrome.declarativeNetRequest.upd»ateSes«sionRules(rules, () => {`  · ASSIGN:identifier
   9. L149 _(in `catch-script/catch`)_ `»    background: rgb(255 «255 255 / 85%);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  10. L150 `popupMode: 0, // 0:preview.h»tml 1:«popup.html 2:window preview.html 3: window popup.html`  · ASSIGN:identifier
  11. L157 _(in `js/popup`)_ `»        hls.attachMedia(«preview[0]);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  12. L158 _(in `js/downloader`)_ `const $dom =» itemD«OM.get(fragment.index);`  · ASSIGN:identifier
  13. L160 _(in `js/popup`)_ `if (data.tracks && !»data.t«racks.audiovideo) {`  · ASSIGN:identifier
  14. L168 _(in `js/function`)_ `if (text».length == 0) { return [«]; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  15. L170 _(in `js/popup`)_ `mediaInf»o.appe«nd(`<br><b>${i18n.m3u8Playlist}</b>`);`  · ASSIGN:identifier
  16. L36 _(in `catch-script/search`)_ `cons»t blob = new Blob([`(${__CAT_C«ATCH_CATCH_SCRIPT__.toString()})();`, xhr.response], { type: 'text/javascript' });`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  17. L174 _(in `js/function`)_ `for (let» i = 0; i < text.length;« i++) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  18. L176 _(in `js/function`)_ `parts.push(text.slic»e(star«t, i));`  · ASSIGN:identifier
  19. L180 `G.version = »navigator.userAgent.matc«h(/(Chrome|Firefox)\/([\d]+)/);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  20. L185 `G.scriptList».set("search.js", { key:« "search", refresh: true, allFrames: true, world: "MAIN", name: i18n.deepSearch, off: i18n.closeSearch, i18n: false, tabId: new Set() });`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  21. L186 `G.scriptList.set("catch.js", { k»ey: "c«atch", refresh: true, allFrames: true, world: "MAIN", name: i18n.cacheCapture, off: i18n.closeCapture, i18n: true, tabId: new Set() });`  · ASSIGN:identifier
  22. L193 _(in `js/m3u8`)_ `»                const re«sponse = await fetch(url, { method: 'HEAD' });`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  23. L194 _(in `js/options`)_ `query = $("#blockUrlList» [name«=state]");`  · ASSIGN:identifier
  24. L201 _(in `js/m3u8`)_ `»            // 防止死循环 最大9«999个`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  25. L202 _(in `js/function`)_ `const colon = item.index»Of(":"«);`  · ASSIGN:identifier
  26. L294 (→L299) `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar, function (items) {«`  · STORAGE:STORAGE_FLOW[area: session, key: mediaControl, sender: js/media-control, receiver: js/init], ELEMENT:member-element-container
  27. L297 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  28. L308 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
  29. L318 (→L322) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L310 `G.Ext = new Map(»newValue.map(item => [item.ext, item])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  31. L326 (→L328) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  32. L314 `G.Type = new Map(»newValue.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  33. L332 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  34. L335 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  35. L336 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  36. L339 `G[key] = »newValue«;`  · ASSIGN:identifier
  37. L233 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  38. L235 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  39. L238 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  40. L239 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  41. L244 `items.Ext = new Map(»items.Ext.map(item => [item.ext, item])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  42. L240 `»items[key] = G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  43. L67 (→L170) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  44. L246 `items.Type = new Map(»items.Type.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  45. L248 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  46. L254 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  47. L259 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  48. L260 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  49. L263 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  50. L261 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  51. L264 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  52. L267 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  53. L265 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  54. L268 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  55. L269 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  56. L277 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  57. L273 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  58. L279 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  59. L285 `»G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #9 — JQUERY_ELEMENT_VAL (From storage.session.set('mediaControl') in js/media-control)  ·  2× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/options` L114:C21 -> L114:C56  `<»label class="switchLabel switchRadi«us">`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L261:C12 -> L261:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L265:C12 -> L265:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L269:C12 -> L269:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L273:C12 -> L273:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (574 raw steps → 38 distinct lines):
   1. L114 _(in `js/options`)_ `<»label class="switchLabel switchRadi«us">`  · RETURN:parseInt
   2. L118 `Mobi»leUserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like« Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L49 `G.blockUrlSe»t = ne«w Set();    // 屏蔽网址列表`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L54 _(in `js/options`)_ `$("#typeList [name=text]").l»ast().«focus();`  · ASSIGN:identifier
   5. L294 (→L299) `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar, function (items) {«`  · STORAGE:STORAGE_FLOW[area: session, key: mediaControl, sender: js/media-control, receiver: js/init], ELEMENT:member-element-container
   6. L297 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   7. L308 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
   8. L318 (→L322) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L310 `G.Ext = new Map(»newValue.map(item => [item.ext, item])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L326 (→L328) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  11. L314 `G.Type = new Map(»newValue.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L332 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  13. L335 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  14. L336 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L339 `G[key] = »newValue«;`  · ASSIGN:identifier
  16. L233 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  17. L235 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  18. L238 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  19. L239 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  20. L244 `items.Ext = new Map(»items.Ext.map(item => [item.ext, item])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  21. L240 `»items[key] = G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  22. L67 (→L170) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  23. L246 `items.Type = new Map(»items.Type.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  24. L248 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  25. L254 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  26. L259 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  27. L260 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  28. L263 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  29. L261 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  30. L264 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  31. L267 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  32. L265 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  33. L268 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  34. L269 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  35. L277 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  36. L273 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  37. L279 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  38. L285 `»G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #10 — JQUERY_ELEMENT_VAL (From storage.session.set('mediaControl') in js/media-control)  ·  2× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/options` L116:C21 -> L116:C53  `»   <span class="switchRound swit«chRadius"><em class="switchRoundBtn switchRadius"></em></span>`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (copyM3U8) — `js/init` L261:C12 -> L261:C65  `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`
  - `CHROME_SYNC_STORAGE` (copyMPD) — `js/init` L265:C12 -> L265:C63  `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`
  - `CHROME_SYNC_STORAGE` (copyOther) — `js/init` L269:C12 -> L269:C67  `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`
  - `CHROME_SYNC_STORAGE` (m3u8dl) — `js/init` L273:C12 -> L273:C61  `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (623 raw steps → 48 distinct lines):
   1. L116 _(in `js/options`)_ `»   <span class="switchRound swit«chRadius"><em class="switchRoundBtn switchRadius"></em></span>`  · RETURN:parseInt
   2. L118 `Mobi»leUserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like« Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L54 (→L85) _(in `js/background`)_ `chrome.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter(»Boolean)«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L138 _(in `js/function`)_ `rule»s.removeRuleIds.push(par«seInt(item.requestId));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   5. L145 _(in `catch-script/search`)_ `»        postData({ action: "catCatchAddKey", key: this.response, href: locatio«n.href, ext: "key" });`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L141 _(in `catch-script/catch`)_ `»        <label><input type="checkbox" id="restartAlways" ${localStorage.getItem("C«atCatchCatch_restart") || ""} ${checkboxStyle}><span data-i18n="alwaysCapturedBeginning">始终从头捕获</span>(beta)</label>`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L149 _(in `catch-script/catch`)_ `»    background: rgb(255 «255 255 / 85%);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
   8. L150 (→L153) `popupMode: 0, // 0:preview.html 1:popup.html 2:window preview».html 3: window popup.html«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L157 _(in `js/popup`)_ `»        hls.attachMedia(«preview[0]);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  10. L160 (→L162) _(in `js/downloader`)_ `const progress = (receivedLength / contentLength * 100).toFixed(»2) + "%";«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L168 _(in `js/function`)_ `if (text».length == 0) { return [«]; }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  12. L170 _(in `js/popup`)_ `»                mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L83 `{ "ext": "mkv", "size": 0, "stat»e": tr«ue },`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  14. L84 `{ "ext": "m4s", "size": 0», "sta«te": true },`  · ASSIGN:identifier
  15. L294 (→L299) `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar, function (items) {«`  · STORAGE:STORAGE_FLOW[area: session, key: mediaControl, sender: js/media-control, receiver: js/init], ELEMENT:member-element-container
  16. L297 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  17. L308 `newValue ??= »G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
  18. L318 (→L322) `G.Regex = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L310 `G.Ext = new Map(»newValue.map(item => [item.ext, item])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L326 (→L328) `G.blockUrl = »newValue.map(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L314 `G.Type = new Map(»newValue.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  22. L332 `G[key] = new Set(»newValue«);`  · ASSIGN:identifier
  23. L335 `if (»key == "sidePanel" && !G.isFirefox«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right
  24. L336 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: newValue })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  25. L339 `G[key] = »newValue«;`  · ASSIGN:identifier
  26. L233 `chrome.storage.sync.get(»G.OptionLists«, function (items) {`  · ELEMENT:member-element-container
  27. L235 `items = »G.OptionLists«;`  · ELEMENT:member-element-container
  28. L238 `for (»let key in G.OptionLists«) {`  · ELEMENT:member-element-container, ITERATE:loop.iteration
  29. L239 `if (»items[key] === undefined || items[key] === null«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  30. L244 `items.Ext = new Map(»items.Ext.map(item => [item.ext, item])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  31. L240 `»items[key] = G.OptionLists[key]«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  32. L67 (→L170) `»G.OptionLists = {«`  · ELEMENT:object.setProperty
  33. L246 `items.Type = new Map(»items.Type.map(item => [item.type, { size: item.size, state: item.state }])«);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  34. L248 `items.Regex = »items.Regex.map«(item => {`  · ELEMENT:member-element-container
  35. L254 `items.blockUrl = »items.blockUrl.map«(item => {`  · ELEMENT:member-element-container
  36. L259 `if (»items.copyM3U8.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  37. L260 `items.copyM3U8 = »items.copyM3U8.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  38. L263 `if (»items.copyMPD.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  39. L261 `»chrome.storage.sync.set({ copyM3U8: items.copyM3U8 })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  40. L264 `items.copyMPD = »items.copyMPD.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  41. L267 `if (»items.copyOther.includes('$url$')«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  42. L265 `»chrome.storage.sync.set({ copyMPD: items.copyMPD })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  43. L268 `items.copyOther = »items.copyOther.replaceAll('$url$', '${url}').replaceAll('$referer$', '${referer}').replaceAll«('$title$', '${title}');`  · ELEMENT:member-element-container
  44. L269 `»chrome.storage.sync.set({ copyOther: items.copyOther })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  45. L277 `»chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: items.sidePanel })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  46. L273 `»chrome.storage.sync.set({ m3u8dl: items.m3u8dl })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  47. L279 `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  48. L285 `»G.blockUrlSet.add«(tab.id);`  · ELEMENT:member-element-container

---

## Flow #11 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/popup` L2:C6 -> L2:C50  `const »params = new URL(location.href).searchParams«;`
- **Sink(s)**:
  - `FETCH_RESOURCE` (http://localhost:6800/jsonrpc) — `js/popup` L82:C4 -> L88:C6 (spans to L88)  `»if (isM3U8(data)) {«`  (url-control=FULL)
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L272:C8 -> L276:C50 (spans to L276)  `»chrome.downloads.download({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/function` L639:C12 -> L639:C40  `»fetch(send2localURL, option)«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `js/function` L639:C12 -> L639:C40  `»fetch(send2localURL, option)«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L471:C12 -> L471:C44  `»chrome.tabs.create({ url: url })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L635:C8 -> L635:C55  `»chrome.tabs.create({ url: G.ffmpegConfig.url })«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L650:C12 -> L650:C72  `»chrome.tabs.create({ url: `preview.html?tabId=${G.tabId}` })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/popup` L874:C8 -> L884:C10 (spans to L884)  `»chrome.tabs.create(arg, (tab) => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (5462 raw steps → 104 distinct lines):
   1. L2 `const »params = new URL(location.href).searchParams«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container
   2. L3 `const _tabId = »parseInt(params.get("tabId"))«;`  · ELEMENT:member-element, RETURN:fallback-return, RETURN:parseInt
   3. L4 `const _type = »params.get("type")«;`  · ELEMENT:member-element, RETURN:fallback-return
   4. L690 `if (»G.popup && !_tabId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element-container, ASSIGN:logical-left
   5. L696 `if (»_tabId«) {`  · ASSIGN:identifier
   6. L697 `G.tabId = »_tabId«;`  · ASSIGN:identifier
   7. L297 `»        confirm.remove«();`  · ELEMENT:object.setProperty
   8. L705 `chrome.tabs.sendMessage(»G.tabId«, { Message: "getPage" }, { frameId: 0 }, function (result) {`  · ELEMENT:member-element-container
   9. L710 (→L727) `chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getData", tabId: »G.tabId }, function (data) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  10. L733 `const html = AddMedia(Message.data, Message.data.tabId == »G.tabId«);`  · ELEMENT:member-element-container, ASSIGN:binary-right
  11. L63 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:binary-left
  12. L70 `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  13. L284 `if (»G.invokeConfirm && event.originalEvent && event.originalEvent.isTrusted«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:logical-left
  14. L61 `//截取»文件名«长度`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L60 (→L63) `»    data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name));«`  · ASSIGN:logical-right, ASSIGN:logical-left
  16. L62 `let »tri«mName = data.name;`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L331 _(in `js/function`)_ `mobileUserAgent: »G.MobileUserAgent«,`  · ELEMENT:member-element-container
  18. L301 (→L333) `»        }«`  · ELEMENT:object.setProperty
  19. L332 `data.html.find(".DownCheck").»prop("check«ed", data._checked);`  · ELEMENT:member-element-container
  20. L334 _(in `js/function`)_ `const »_data = { ...data, ...trimData }«;`  · ELEMENT:object.setProperty, COPY:object-spread
  21. L335 `mer»geDownButton«();`  · ASSIGN:identifier, ELEMENT:member-element-container
  22. L345 _(in `js/function`)_ `return »text«;`  · ASSIGN:identifier
  23. L828 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ELEMENT:member-element-container, ASSIGN:logical-left
  24. L95 `if (allData.get(»currentTab«).has(data.requestId)) {`  · ASSIGN:identifier
  25. L359 `allData.get(»currentTab«).set(data.requestId, data);`  · ASSIGN:identifier
  26. L734 `if (Message.data.tabId == »G.tabId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  27. L928 `if (»checkedData.length != 2 || (!G.isFirefox && maxSize > G.chromeLimitSize)«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  28. L806 (→L824) `chrome.runtime.sendMessage({ Message: "getButtonState", tabId: »G.tabId }, function (state) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  29. L701 `»_type« == "window" && $("#currentPage").show();`  · ASSIGN:identifier, ASSIGN:binary-left
  30. L771 `$("#playbackRate").val(»G.playbackRate«);`  · ELEMENT:member-element-container
  31. L774 `if (»G.isMobile«) {`  · ELEMENT:member-element-container
  32. L778 `»$(`<style>${G.css}</style>`).appendTo("head")«;`  · ELEMENT:member-element-container, ASSIGN:template-literal, ELEMENT:object.setProperty
  33. L784 (→L797) `chrome.webNavigation.getAllFrames({ tabId: »G.tabId }, function (frames) {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  34. L687 `if (»!G.initSyncComplete || !G.initLocalComplete || !G.tabId«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  35. L851 `if (»!extra.ffmpeg && !G.downStream && Math.max(...data.map(item => item._size)) > G.chromeLimitSize && confirm(i18n("fileTooLargeStream", ["2G"]))«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:logical-left
  36. L5 _(in `js/init`)_ `chrome.»i18n.getMe«ssage = (key) => data[key].messages;`  · ELEMENT:member-element-container
  37. L11 _(in `js/init`)_ `* 使»用传统下载方式下载 但无法监听 无法另存为 无法判断下载是«否失败 唉~`  · ASSIGN:identifier, ELEMENT:implicit.add
  38. L7 `const $mediaLis»t = $('#m«ediaList');`  · ELEMENT:member-element-container
  39. L9 `const $currentC»ount = $("#«currentTab #quantity");`  · ELEMENT:member-element-container
  40. L64 `»trimName = trim«Name.substr(0, 20) + '...' + trimName.substr(-30);`  · ELEMENT:member-element-container
  41. L68 `»get() { return pageDOM;« }`  · ELEMENT:member-element-container
  42. L69 _(in `js/function`)_ `* @para»m {Function} callb«ack`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  43. L82 `if (is»M3U8(data)«) {`  · ELEMENT:member-element-container
  44. L231 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  45. L268 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  46. L233 `const »m3u8dlArg = data.m3u8dlArg ?? templates(G.m3u8dlArg, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-right
  47. L686 `const interval = set»Interva«l(function () {`  · ELEMENT:member-element-container
  48. L275 `saveAs: »G.saveAs«`  · ELEMENT:member-element-container
  49. L272 (→L276) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  50. L234 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:identifier, ASSIGN:binary-right
  51. L10 _(in `js/media-control`)_ `clearInte»rval(VideoTagTimer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  52. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  53. L235 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  54. L236 `navigator.clipboard.writeText(»m3u8dlArg«);`  · ASSIGN:identifier
  55. L241 `if (»G.m3u8dlConfirm && event.originalEvent && event.originalEvent.isTrusted«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  56. L259 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  57. L260 `window.location.href = »url«;`  · ASSIGN:identifier
  58. L263 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  59. L281 `const »url = data.invoke ?? templates(G.invokeText, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-right
  60. L303 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  61. L304 `window.location.href = »url«;`  · ASSIGN:identifier
  62. L306 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  63. L312 `if (isEmpty(»G.Player«)) { return true; }`  · ELEMENT:member-element-container
  64. L313 `if (»G.Player == "$shareApi$" || G.Player == "${shareApi}"«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  65. L317 `let »url = templates(G.Player, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  66. L318 `if (»G.isFirefox«) {`  · ELEMENT:member-element-container
  67. L322 `»chrome.tabs.update({ url: url })«;`  · ELEMENT:object.setProperty
  68. L570 _(in `js/function`)_ `const »option = { method: G.send2localMethod }«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  69. L573 _(in `js/function`)_ `let body = »G.send2localBody«;`  · ELEMENT:member-element-container
  70. L576 _(in `js/function`)_ `body = »G.send2localBody.replaceAll«('${data}', `"${data}"`);`  · ELEMENT:member-element-container
  71. L581 _(in `js/function`)_ `let »postData = templates(body, data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  72. L369 `»     value.chec«ked = true;`  · RETURN:json.parse
  73. L584 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:implicit.add
  74. L588 `»chrome.runtime.sendMessage({ Message: "ClearIcon", type: activeTab, tabId: G.tabId })«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ELEMENT:object.setProperty
  75. L589 _(in `js/function`)_ `»send2localURL = new URL(send2localURL)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  76. L592 _(in `js/function`)_ `if (»option.method« === 'GET') {`  · ASSIGN:binary-left
  77. L606 _(in `js/function`)_ `}[»G.send2localType«];`  · ELEMENT:member-element-container
  78. L611 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  79. L638 _(in `js/function`)_ `send2localURL = »send2localURL.toString()«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  80. L639 _(in `js/function`)_ `fetch(»send2localURL«, option)`  · ASSIGN:identifier
  81. L443 `if (key == »G.tabId«) { continue; }`  · ELEMENT:member-element-container, ASSIGN:binary-right
  82. L459 `if (»G.enableAria2Rpc«) {`  · ELEMENT:member-element-container
  83. L468 `if (»G.m3u8dl && (data.parsing == "m3u8" || data.parsing == "mpd") && !data.url.startsWith("blob:")«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  84. L469 `const »m3u8dlArg = templates(G.m3u8dlArg, data)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  85. L474 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  86. L470 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:binary-right
  87. L471 `»chrome.tabs.create({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  88. L502 `const »url = []«;`  · ELEMENT:object.setProperty
  89. L587 `»chrome.runtime.sendMessage({ Message: "clearData", tabId: G.tabId, type: activeTab })«;`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  90. L601 (→L604) `chrome.runtime.sendMessage({ Message: "mobileUserAgent", tabId: »G.tabId }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  91. L602 `»G.refreshClear« && $('#Clear').click();`  · ELEMENT:member-element
  92. L608 (→L610) `chrome.runtime.sendMessage({ Message: "autoDown", tabId: »G.tabId }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  93. L614 (→L617) `chrome.runtime.sendMessage({ Message: "script", tabId: »G.tabId, script: this.id + ".js" }, function () {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  94. L615 `»G.autoClearMode« > 0 && $('#Clear').click();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  95. L635 `»chrome.tabs.create({ url: G.ffmpegConfig.url })«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  96. L648 `switch (»G.popupMode«) {`  · ELEMENT:member-element-container
  97. L650 `»chrome.tabs.create({ url: `preview.html?tabId=${G.tabId}` })«;`  · ELEMENT:member-element-container, ASSIGN:template-literal, ELEMENT:object.setProperty
  98. L668 `»chrome.tabs.update({ url: `popup.html?tabId=${tabs[0].id}${_type ? "&type=" + _type : ""}` })«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-consequent, ASSIGN:template-literal, ELEMENT:object.setProperty
  99. L758 `if (»tabId == -1 || tabId == G.tabId«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-right
  100. L787 `chrome.tabs.sendMessage(»G.tabId«, { Message: "getKey" }, { frameId: frame.frameId }, function (result) {`  · ELEMENT:member-element-container
  101. L821 `const script = »G.scriptList.get«(key + ".js");`  · ELEMENT:member-element-container
  102. L865 `chrome.tabs.get(»G.tabId«, function (tab) {`  · ELEMENT:member-element-container
  103. L872 `active: »!G.downActive«`  · ELEMENT:member-element-container, ASSIGN:unary
  104. L866 (→L873) `»        const arg = {«`  · ELEMENT:object.setProperty

---

## Flow #12 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/popup` L729:C4 -> L766:C6 (spans to L766)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/popup` L848:C4 -> L848:C62  `»localStorage.setItem('downloadData', JSON.stringify(data))«;`
  - `FETCH_BODY` (http://localhost:6800/jsonrpc) — `js/popup` L82:C4 -> L88:C6 (spans to L88)  `»if (isM3U8(data)) {«`
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L272:C8 -> L276:C50 (spans to L276)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/function` L639:C12 -> L639:C40  `»fetch(send2localURL, option)«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (32719 raw steps → 249 distinct lines):
   1. L729 (→L766) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/popup]; runtime.single.sender.message[js/background->js/popup]`
   2. L730 `if (»!Message.Message || !Message.data«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L732 `if (»Message.Message« == "popupAddData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L748 `if (»Message.Message« == "popupAddKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L733 `const html = AddMedia(»Message.data, Message.data.tabId« == G.tabId);`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L57 `»data._title = data.title«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L58 (→L63) `»data.title = stringModify(data.title);«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:object.setProperty
   8. L501 `$('#AllC»opy').click(functi«on () {`  · ASSIGN:identifier, ASSIGN:unary
   9. L502 _(in `js/function`)_ `»str = filterFileName(str, text)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  10. L513 `if (»this.id == "AllSel«ect") {`  · ASSIGN:identifier, ASSIGN:unary
  11. L515 _(in `js/function`)_ `str = »str.replaceAll(/\u200B/g, "").replaceAll(/\u200C/g, "").replaceAll(/\u200D/g, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L516 (→L527) _(in `js/function`)_ `str = »str.replace(reFilterFileName, function (match) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L530 `} el»se if (this.id ==« "unfoldPlay") {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L531 `getDat»a()«.forEach(function (data) {`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L533 `» da«ta.isPlay && !data.urlPanelShow && data.panelHeading.click();`  · ASSIGN:identifier
  16. L503 _(in `js/function`)_ `return »str.replaceAll("\\", "&bsol;").replaceAll("/", "&sol;")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L60 (→L63) `»data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name));«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, RETURN:decodeURIComponent, ASSIGN:conditional-consequent, ASSIGN:logical-right, ASSIGN:logical-left
  18. L62 `let »trimName = data.name«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L63 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  20. L64 `trimName = »trimName.substr(0, 20) + '...' + trimName.substr(-30)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  21. L67 _(in `js/media-control`)_ `»  $("#loop").prop("checked", state.«loop);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  22. L70 `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate
  23. L287 `»                <textarea type="text" class="width100" rows="10«">${url}</textarea>`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return
  24. L292 `»            data.invoke = confirm.find("text«area").val();`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  25. L293 _(in `js/function`)_ `»data.fileName.length > 1 && data.fileName.pop()«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  26. L294 _(in `js/function`)_ `»data.fileName = data.fileName.join(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  27. L296 `conf»irm.find«("#close").click(function () {`  · ASSIGN:identifier, ELEMENT:member-element
  28. L61 `//截取»文件名«长度`  · ASSIGN:identifier, ASSIGN:binary-left
  29. L297 _(in `js/function`)_ `»data.ext = data.fullFileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L298 _(in `js/function`)_ `»data.ext = data.ext.length == 1 ? "" : data.ext[data.ext.length - 1]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  31. L303 _(in `js/function`)_ `url: »data.url ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  32. L301 (→L333) `»        }«`  · ELEMENT:object.setProperty
  33. L304 _(in `js/function`)_ `referer: »data.requestHeaders?.referer ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  34. L305 _(in `js/function`)_ `origin: »data.requestHeaders?.origin ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  35. L306 _(in `js/function`)_ `init»iator: data.requestHeaders?.referer ? data.requestHeaders.referer : data.initiator«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty
  36. L307 _(in `js/function`)_ `webUrl: »data.webUrl ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  37. L308 _(in `js/function`)_ `title: »data._title ?? data.title«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  38. L309 _(in `js/function`)_ `pageDOM: »data.pageDOM«,`  · ASSIGN:identifier, ELEMENT:member-element
  39. L310 _(in `js/function`)_ `cookie: »data.cookie ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  40. L311 (→L324) `»data.html.find('#play').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, RETURN:fallback-return
  41. L326 (→L329) `»data.html.find('#parsing').click(function (e) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, RETURN:fallback-return
  42. L327 _(in `js/function`)_ `fileName: d»ata.fileName ? data.fileName« : "",`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  43. L328 _(in `js/function`)_ `ext: »data.ext ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L334 _(in `js/function`)_ `cons»t _data = { ...data, ...trimData }«;`  · ASSIGN:identifier, COPY:object-spread, ELEMENT:object.setProperty
  45. L71 `»data.downFileName = filterFileName(data.downFileName)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  46. L72 _(in `js/function`)_ `chrome.decla»rativeNetRequest.updateSessionRules({ removeRuleIds: [1]« });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  47. L73 `»data.downFileName = data.name«;`  · ASSIGN:identifier, ELEMENT:member-element
  48. L76 `»data._size = data.size«;`  · ASSIGN:identifier, ELEMENT:member-element
  49. L77 _(in `js/init`)_ `»{ "ext": "ts", "size": 0, "state": fal«se },`  · ASSIGN:identifier, ELEMENT:member-element
  50. L78 _(in `js/pupup-utils`)_ `»    params.header.push("Authorization: " + data.requestHeaders.authorization«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:binary-right
  51. L31 _(in `js/function`)_ `if (»!byte || byte < 1024«) { return 0; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
  52. L32 `let acti»veTa«b = true;`  · ASSIGN:identifier, ASSIGN:binary-left
  53. L33 _(in `js/function`)_ `return »(byte / 1024).toFixed(1)« + "KB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  54. L34 `const »downData = []«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  55. L35 (→L42) _(in `js/function`)_ `retu»rn (byte / 1024 / 1024).toFixed(1) + "MB";«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  56. L37 _(in `js/function`)_ `»return (byte / 1024 / 1024 / 1024).toFixed(1)« + "GB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element
  57. L81 _(in `js/function`)_ `»                "requestHeaders": Ob«ject.keys(data).map(key => ({ header: key, operation: "set", value: data[key] }))`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  58. L82 (→L94) `if (isM3U8(»data)) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  59. L15 (→L20) `let allC»ount = 0;«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  60. L16 _(in `js/function`)_ `let »hour = («sec / 3600) | 0;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  61. L17 _(in `js/pupup-utils`)_ `»data.type?.endsWith("/vnd.apple.mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  62. L18 _(in `js/init`)_ `»    a.download = options.filename«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  63. L19 _(in `js/function`)_ `let »time = hour > 0 ? hour + ":" : «"";`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  64. L20 _(in `js/function`)_ `time» += min.toString().padStart(2, '0') + ":"«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  65. L83 `»data«.parsing = "m3u8";`  · ASSIGN:identifier
  66. L84 `} else if (isMPD(»data«)) {`  · ASSIGN:identifier
  67. L24 (→L25) `[true, n»ew Map()],  // 当前页面«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  68. L25 `[fal»se, new M«ap()]  // 其他页面`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  69. L90 `if (»data.favIconUrl && !favicon.has(data.webUrl)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  70. L85 `»data«.parsing = "mpd";`  · ASSIGN:identifier
  71. L86 `} else if (isJSON(»data«)) {`  · ASSIGN:identifier
  72. L29 (→L31) `// 储存所有扩展名，保»存是否筛选状态 来判断新加入的资源 立刻判断是否需要隐藏«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  73. L30 `const fi»lterExt =« new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  74. L91 `favicon.set(»data.webUrl, data.favIconUrl«);`  · ASSIGN:identifier, ELEMENT:member-element
  75. L87 _(in `js/init`)_ `»{ "ext": "mpeg", "size": 0«, "state": true },`  · ASSIGN:identifier, RETURN:json.stringify
  76. L93 `»data.isPlay = isPlay(data«);`  · ASSIGN:identifier
  77. L828 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  78. L36 `const fa»vicon = «new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  79. L38 `let page»DOM = un«defined;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  80. L39 _(in `js/init`)_ `»return c«hrome.i18n.getMessage(key);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  81. L40 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "HeartBeat" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  82. L41 _(in `js/pupup-utils`)_ `»data.ext« == "webp" ||`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  83. L42 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "clearRedundant" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  84. L830 `return »isMediaExt(data.ext) || typeArray.includes(data.type) || isM3U8(data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  85. L46 `const errorList = ["SERVER_BAD_CONTENT", "SERVER_UNAUTHORIZED", "SERVER_FORBIDDEN", "SERVER_UNREACHABLE»", «"SERVER_CROSS_ORIGIN_REDIRECT", "SERVER_FAILED", "NETWORK_FAILED"];`  · ASSIGN:identifier
  86. L95 `if (allData.get(»currentTab).has(data.requestId«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  87. L96 `»data.requestId = data.requestId + "_"« + Date.now().toString();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  88. L104 `${G.ShowWebIco ? »`<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.requestId}" src="${data.favIconUrl}"/>`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  89. L106 `<span class="name ${data.parsing || data.isRegex || data.tabId == -1 ? "bold" : ""}">${»trimName«}</span>`  · ASSIGN:identifier
  90. L107 `<span class="size ${data.size ? "" : "hide"}">${»data.size«}</span>`  · ASSIGN:identifier, ELEMENT:member-element
  91. L109 `<img src="img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${»data.parsing«}" title="${i18n.parser}"/>`  · ASSIGN:identifier, ELEMENT:member-element
  92. L118 `${data.title ? »`<b>${i18n.title}:</b> ${data.title}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  93. L119 `${data.type ? »`<br><b>MIME:</b>  ${data.type}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  94. L126 `<a href="${»data.url}" target="_blank" download="${data.downFileName}">${data.url«}</a>`  · ASSIGN:identifier, ELEMENT:member-element
  95. L100 (→L131) `»data.html = $(`«`  · ASSIGN:template-literal, ASSIGN:identifier
  96. L134 `»data.urlPanel = data.html.find(".url")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  97. L135 `»data«.urlPanelShow = false;`  · ASSIGN:identifier
  98. L136 `»data.panelHeading = data.html.find(".panel-heading")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  99. L137 (→L202) `»data.panelHeading.click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  100. L204 (→L207) `»data.html.find("#qrcode").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  101. L209 (→L211) `»data.html.find("#catDown").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  102. L213 (→L218) `»data.html.find('#copy').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  103. L220 (→L228) `»data.html.find('#aria2').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  104. L230 (→L278) `»data.html.find('#download').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L280 (→L309) `»data.html.find('.invoke').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  106. L331 `»data«._checked = checkboxState;`  · ASSIGN:identifier
  107. L332 `»data.html.find(".DownCheck").prop("checked", data._checked)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  108. L333 (→L337) `»data.html.find('input').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  109. L338 `Object.defineProperty(»data«, "checked", {`  · ASSIGN:identifier
  110. L349 (→L356) `»data.html.find("#send2local").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  111. L359 `allData.get(»currentTab).set(data.requestId, data«);`  · ASSIGN:identifier, ELEMENT:member-element
  112. L362 `if (!filterExt.has(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  113. L363 `filterExt.set(»data.ext«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  114. L380 `if (!filterExt.get(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  115. L364 `const html = $(»`<label class="flexFilter" id="${data.ext}"><input type="checkbox" checked>${data.ext}</label>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  116. L381 `»data.html.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  117. L385 `return »data.html«;`  · ASSIGN:identifier, ELEMENT:member-element
  118. L382 `»data.html.find("input").prop("checked", false)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  119. L734 `if (»Message.data.tabId« == G.tabId) {`  · ELEMENT:member-element, ASSIGN:binary-left
  120. L737 `$current.append(»html«);`  · ASSIGN:identifier
  121. L138 `»data.urlPanelShow = !data.urlPanelShow«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  122. L139 `const mediaInfo = »data.html.find("#mediaInfo")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  123. L140 `const preview = »data.html.find("#preview")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  124. L141 `if (»!data.urlPanelShow«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  125. L150 `»data.urlPanel.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  126. L143 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  127. L146 `»data.urlPanel.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  128. L151 `if (»!mediaInfo.data("state")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  129. L147 `»!preview[0].paused && preview.trigger("pause")«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, RETURN:fallback-return
  130. L152 `»mediaInfo.data("state", true)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  131. L153 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  132. L199 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L173 `} else if (»data.isPlay«) {`  · ASSIGN:identifier, ELEMENT:member-element
  134. L155 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  135. L174 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  136. L177 `} else if (isPicture(»data«)) {`  · ASSIGN:identifier
  137. L185 (→L196) `»preview.on("loadedmetadata", function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  138. L178 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  139. L156 `hls.loadSource(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  140. L157 `hls.attachMedia(»preview[0]«);`  · ASSIGN:identifier, ELEMENT:member-element
  141. L161 `!data.tracks.audio && »mediaInfo.append(`<br><b>${i18n.noAudio}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  142. L162 `!data.tracks.video && »mediaInfo.append(`<br><b>${i18n.noVideo}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  143. L169 `if (»data.levels.length > 1 && !mediaInfo.text().includes(i18n.m3u8Playlist)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  144. L170 `»mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  145. L175 `»preview.attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  146. L179 `»data.html.find("#screenshots").show().attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  147. L186 `»preview.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  148. L188 `»data«.duration = this.duration;`  · ASSIGN:identifier
  149. L189 `»mediaInfo.append(`<br><b>${i18n.duration}:</b> ` + secToTime(this.duration))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  150. L192 `»mediaInfo.append(`<br><b>${i18n.resolution}:</b> ` + this.videoWidth + "x" + this.videoHeight)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  151. L193 `»data«.videoWidth = this.videoWidth;`  · ASSIGN:identifier
  152. L194 `»data«.videoHeight = this.videoHeight;`  · ASSIGN:identifier
  153. L206 `»$(this).html("").qrcode({ width: size, height: size, text: data.url }).off("click")«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  154. L210 `catDownload(»data«);`  · ASSIGN:identifier
  155. L845 `if (!Array.isArray(»data)) { data = [data]«; }`  · ASSIGN:identifier, ELEMENT:object.setProperty
  156. L848 `localStorage.setItem('downloadData', »JSON.stringify(data)«);`  · RETURN:json.stringify
  157. L855 (→L862) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "catDownload", data: data }, (message) => {«`  · ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  158. L214 `const text = copyLink(»data«);`  · ASSIGN:identifier
  159. L3 `const _tabId = »parseInt«(params.get("tabId"));`  · ASSIGN:identifier, ELEMENT:member-element
  160. L4 `const _t»ype = params«.get("type");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  161. L6 _(in `js/function`)_ `function append»Zero(date) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  162. L11 _(in `js/init`)_ `* 使用传统下载方式下载 但无法监听 无法另存为 无»法判断下«载是否失败 唉~`  · ASSIGN:identifier
  163. L221 `aria2AddUri(»data«, function (data) {`  · ASSIGN:identifier
  164. L69 _(in `js/function`)_ `* @para»m {Function} callb«ack`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  165. L74 _(in `js/function`)_ `cons»t rules = {« removeRuleIds: [tabs ? tabs.id : 1] };`  · ASSIGN:identifier, ELEMENT:member-element
  166. L75 _(in `js/media-control`)_ `for (let i = 0; i < state.co»unt; i++) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  167. L231 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  168. L232 `if (»!data.url.startsWith("blob:")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  169. L268 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  170. L233 `const m3u8dlArg = »data.m3u8dlArg ?? templates(G.m3u8dlArg, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  171. L269 `openParser(»data«, { autoDown: true });`  · ASSIGN:identifier
  172. L273 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  173. L272 (→L276) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  174. L274 `filename: »data.downFileName«,`  · ASSIGN:identifier, ELEMENT:member-element
  175. L276 `}, function (id) { downData[id] = »data«; });`  · ASSIGN:identifier
  176. L234 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:identifier, ASSIGN:binary-right
  177. L10 _(in `js/media-control`)_ `clearInte»rval(VideoTagTimer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  178. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  179. L235 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  180. L236 `navigator.clipboard.writeText(»m3u8dlArg«);`  · ASSIGN:identifier
  181. L260 `window.location.href = »url«;`  · ASSIGN:identifier
  182. L263 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  183. L249 `»data«.m3u8dlArg = confirm.find("textarea").val();`  · ASSIGN:identifier
  184. L250 `»data.html.find('#download').click()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  185. L281 `const url = »data.invoke ?? templates(G.invokeText, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  186. L317 `let url = templates(G.Player, »data«);`  · ASSIGN:identifier
  187. L340 `return »data._checked«;`  · ASSIGN:identifier, ELEMENT:member-element
  188. L343 `»data«._checked = newValue;`  · ASSIGN:identifier
  189. L344 `»data.html.find('input').prop("checked", newValue)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  190. L350 `send2local("catch", »data, data.tabId«).then(function (success) {`  · ASSIGN:identifier, ELEMENT:member-element
  191. L576 _(in `js/function`)_ `body = »G.send2localBody.replaceAll('${data}', `"${data}"`)«;`  · ASSIGN:identifier, ASSIGN:template-literal, MUTATE:string.replace, ELEMENT:member-element-container
  192. L580 _(in `js/function`)_ `»data«.action = action;`  · ASSIGN:identifier
  193. L577 `»    data.checked = fals«e;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  194. L581 _(in `js/function`)_ `let »postData = templates(body, data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  195. L284 `if (G.in»voke«Confirm && event.originalEvent && event.originalEvent.isTrusted) {`  · ASSIGN:identifier
  196. L335 `mer»geDownButton«();`  · ASSIGN:identifier, ELEMENT:member-element-container
  197. L345 _(in `js/function`)_ `return »text«;`  · ASSIGN:identifier
  198. L584 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:implicit.add
  199. L369 `»     value.chec«ked = true;`  · RETURN:json.parse
  200. L611 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  201. L570 _(in `js/function`)_ `const »option = { method: G.send2localMethod }«;`  · ELEMENT:object.setProperty
  202. L753 `if (item.url == »Message.url«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  203. L759 `$maybeKey.append(AddKey(»Message.data«));`  · ELEMENT:member-element
  204. L390 `const base64Key = base64ToHex(»key«);`  · ASSIGN:identifier
  205. L974 `binaryString = »atob(base64)«;`  · ASSIGN:identifier, RETURN:atob
  206. L980 `for (let i = 0; i < »binaryString.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  207. L981 `let hex = »binaryString.charCodeAt(i).toString(16)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  208. L982 `if (»hex.length« === 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  209. L983 `hex = '0' + »hex«;`  · ASSIGN:identifier, ASSIGN:binary-right
  210. L985 `hexString += »hex«;`  · ASSIGN:identifier
  211. L987 `return »hexString«;`  · ASSIGN:identifier
  212. L391 `if (»!base64Key«) { return; }`  · ASSIGN:identifier, ASSIGN:unary
  213. L397 `<span class="name bold">${»key«}</span>`  · ASSIGN:identifier
  214. L402 `Hex: ${»base64Key«}`  · ASSIGN:identifier
  215. L404 `Base64: ${»key«}`  · ASSIGN:identifier
  216. L394 (→L406) `»    data.html = $(`«`  · ASSIGN:template-literal
  217. L705 (→L708) `»    chrome.tabs.sendMessage(G.tabId, { Message: "getPage" }, { frameId: 0 }, function (result) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  218. L710 (→L727) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getData", tabId: G.tabId }, function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  219. L711 `if (»!data || data === "OK"«) {`  · ASSIGN:binary-left, ASSIGN:logical-right
  220. L716 `currentCount = »data.length«;`  · ELEMENT:member.length
  221. L717 `if (»currentCount >= 500 && confirm(i18n("confirmLoading", [currentCount]))«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty, ASSIGN:logical-left
  222. L900 `$currentCount.text(currentCount ? »`[${currentCount}]`« : "");`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  223. L722 `for (let key = 0; key < »currentCount«; key++) {`  · ASSIGN:identifier, ASSIGN:binary-right
  224. L723 `$current.append(AddMedia(»data[key]«));`  · ELEMENT:member-element-container
  225. L806 (→L824) `»    chrome.runtime.sendMessage({ Message: "getButtonState", tabId: G.tabId }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  226. L807 `for (»let key« in state) {`  · ITERATE:loop.iteration
  227. L808 `const $DOM = $(»`#${key}`«);`  · ASSIGN:template-literal
  228. L809 `if (»key« == "MobileUserAgent") {`  · ASSIGN:binary-left
  229. L813 `if (»key« == "AutoDown") {`  · ASSIGN:binary-left
  230. L817 `if (»key« == "enable") {`  · ASSIGN:binary-left
  231. L821 `const script = G.scriptList.get(»key« + ".js");`  · ASSIGN:binary-left
  232. L440 (→L451) `»    !allCount && chrome.runtime.sendMessage(chrome.runtime.id, { Message: "getAllData" }, function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  233. L442 `for (»let key« in data) {`  · ITERATE:loop.iteration
  234. L443 `if (»key« == G.tabId) { continue; }`  · ASSIGN:binary-left
  235. L444 `»allCount += data[key].length«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:member.length
  236. L901 `$allCount.text(allCount ? »`[${allCount}]`« : "");`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:conditional-consequent
  237. L445 `for (let i = 0; »i < data[key].length«; i++) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-right
  238. L446 `»$all.append(AddMedia(data[key][i], false))«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  239. L601 (→L604) `»    chrome.runtime.sendMessage({ Message: "mobileUserAgent", tabId: G.tabId }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  240. L735 `»!currentCount« && $mediaList.append($current);`  · ASSIGN:identifier, ASSIGN:unary
  241. L739 `} else if (»allCount«) {`  · ASSIGN:identifier
  242. L740 `»allCount++«;`  · ASSIGN:identifier, ASSIGN:update
  243. L736 `»currentCount++«;`  · ASSIGN:identifier, ASSIGN:update
  244. L608 (→L610) `»    chrome.runtime.sendMessage({ Message: "autoDown", tabId: G.tabId }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  245. L614 (→L617) `»    chrome.runtime.sendMessage({ Message: "script", tabId: G.tabId, script: this.id + ".js" }, function () {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  246. L642 (→L644) `»    chrome.runtime.sendMessage({ Message: "enable" }, function (state) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  247. L787 (→L795) `»            chrome.tabs.sendMessage(G.tabId, { Message: "getKey" }, { frameId: frame.frameId }, function (result) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[js/content-script->js/popup]`
  248. L788 `if (»chrome.runtime.lastError || !result || result.length == 0«) { return; }`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  249. L790 (→L792) `for (»let key of result) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration

---

## Flow #13 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `js/popup` L729:C4 -> L766:C6 (spans to L766)  `»chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/popup` L848:C4 -> L848:C62  `»localStorage.setItem('downloadData', JSON.stringify(data))«;`
  - `FETCH_BODY` (http://localhost:6800/jsonrpc) — `js/popup` L82:C4 -> L88:C6 (spans to L88)  `»if (isM3U8(data)) {«`
  - `CHROME_DOWNLOADS_OPTIONS` — `js/popup` L272:C8 -> L276:C50 (spans to L276)  `»chrome.downloads.download({«`
  - `FETCH_BODY` ([Unknown URL]) — `js/function` L639:C12 -> L639:C40  `»fetch(send2localURL, option)«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (17609 raw steps → 216 distinct lines):
   1. L729 (→L766) `»    chrome.runtime.onMessage.addListener(function (Message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/popup]; runtime.single.sender.message[js/background->js/popup]`
   2. L730 `if (»!Message.Message || !Message.data«) { return; }`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L732 `if (»Message.Message« == "popupAddData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L748 `if (»Message.Message« == "popupAddKey") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   5. L733 `const html = AddMedia(»Message.data, Message.data.tabId« == G.tabId);`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L57 `»data._title = data.title«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L58 (→L63) `»data.title = stringModify(data.title);«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:object.setProperty
   8. L501 `$('#AllC»opy').click(functi«on () {`  · ASSIGN:identifier, ASSIGN:unary
   9. L502 _(in `js/function`)_ `»str = filterFileName(str, text)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  10. L513 `if (»this.id == "AllSel«ect") {`  · ASSIGN:identifier, ASSIGN:unary
  11. L515 _(in `js/function`)_ `str = »str.replaceAll(/\u200B/g, "").replaceAll(/\u200C/g, "").replaceAll(/\u200D/g, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L516 (→L527) _(in `js/function`)_ `str = »str.replace(reFilterFileName, function (match) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L530 `} el»se if (this.id ==« "unfoldPlay") {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L531 `getDat»a()«.forEach(function (data) {`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L533 `» da«ta.isPlay && !data.urlPanelShow && data.panelHeading.click();`  · ASSIGN:identifier
  16. L503 _(in `js/function`)_ `return »str.replaceAll("\\", "&bsol;").replaceAll("/", "&sol;")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L60 (→L63) `»data.name = isEmpty(data.name) ? data.title + '.' + data.ext : decodeURIComponent(stringModify(data.name));«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, RETURN:decodeURIComponent, ASSIGN:conditional-consequent, ASSIGN:logical-right, ASSIGN:logical-left
  18. L62 `let »trimName = data.name«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L63 `if (»data.name && data.name.length >= 50 && !_tabId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  20. L64 `trimName = »trimName.substr(0, 20) + '...' + trimName.substr(-30)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
  21. L67 _(in `js/media-control`)_ `»  $("#loop").prop("checked", state.«loop);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  22. L70 `»data.downFileName = G.TitleName ? templates(G.downFileName, data) : data.name«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate
  23. L287 `»                <textarea type="text" class="width100" rows="10«">${url}</textarea>`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return
  24. L292 `»            data.invoke = confirm.find("text«area").val();`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  25. L293 _(in `js/function`)_ `»data.fileName.length > 1 && data.fileName.pop()«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, RETURN:fallback-return
  26. L294 _(in `js/function`)_ `»data.fileName = data.fileName.join(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  27. L296 `conf»irm.find«("#close").click(function () {`  · ASSIGN:identifier, ELEMENT:member-element
  28. L61 `//截取»文件名«长度`  · ASSIGN:identifier, ASSIGN:binary-left
  29. L297 _(in `js/function`)_ `»data.ext = data.fullFileName.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L298 _(in `js/function`)_ `»data.ext = data.ext.length == 1 ? "" : data.ext[data.ext.length - 1]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  31. L303 _(in `js/function`)_ `url: »data.url ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  32. L301 (→L333) `»        }«`  · ELEMENT:object.setProperty
  33. L304 _(in `js/function`)_ `referer: »data.requestHeaders?.referer ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  34. L305 _(in `js/function`)_ `origin: »data.requestHeaders?.origin ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  35. L306 _(in `js/function`)_ `init»iator: data.requestHeaders?.referer ? data.requestHeaders.referer : data.initiator«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty
  36. L307 _(in `js/function`)_ `webUrl: »data.webUrl ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  37. L308 _(in `js/function`)_ `title: »data._title ?? data.title«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  38. L309 _(in `js/function`)_ `pageDOM: »data.pageDOM«,`  · ASSIGN:identifier, ELEMENT:member-element
  39. L310 _(in `js/function`)_ `cookie: »data.cookie ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  40. L311 (→L324) `»data.html.find('#play').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, RETURN:fallback-return
  41. L326 (→L329) `»data.html.find('#parsing').click(function (e) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, RETURN:fallback-return
  42. L327 _(in `js/function`)_ `fileName: d»ata.fileName ? data.fileName« : "",`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  43. L328 _(in `js/function`)_ `ext: »data.ext ?? ""«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L334 _(in `js/function`)_ `cons»t _data = { ...data, ...trimData }«;`  · ASSIGN:identifier, COPY:object-spread, ELEMENT:object.setProperty
  45. L71 `»data.downFileName = filterFileName(data.downFileName)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add
  46. L72 _(in `js/function`)_ `chrome.decla»rativeNetRequest.updateSessionRules({ removeRuleIds: [1]« });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  47. L73 `»data.downFileName = data.name«;`  · ASSIGN:identifier, ELEMENT:member-element
  48. L76 `»data._size = data.size«;`  · ASSIGN:identifier, ELEMENT:member-element
  49. L77 _(in `js/init`)_ `»{ "ext": "ts", "size": 0, "state": fal«se },`  · ASSIGN:identifier, ELEMENT:member-element
  50. L78 _(in `js/pupup-utils`)_ `»    params.header.push("Authorization: " + data.requestHeaders.authorization«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ASSIGN:binary-right
  51. L31 _(in `js/function`)_ `if (»!byte || byte < 1024«) { return 0; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
  52. L32 `let acti»veTa«b = true;`  · ASSIGN:identifier, ASSIGN:binary-left
  53. L33 _(in `js/function`)_ `return »(byte / 1024).toFixed(1)« + "KB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed
  54. L34 `const »downData = []«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty
  55. L35 (→L42) _(in `js/function`)_ `retu»rn (byte / 1024 / 1024).toFixed(1) + "MB";«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  56. L37 _(in `js/function`)_ `»return (byte / 1024 / 1024 / 1024).toFixed(1)« + "GB";`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Number.toFixed, ELEMENT:member-element
  57. L81 _(in `js/function`)_ `»                "requestHeaders": Ob«ject.keys(data).map(key => ({ header: key, operation: "set", value: data[key] }))`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  58. L82 (→L94) `if (isM3U8(»data)) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  59. L15 (→L20) `let allC»ount = 0;«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  60. L16 _(in `js/function`)_ `let »hour = («sec / 3600) | 0;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  61. L17 _(in `js/pupup-utils`)_ `»data.type?.endsWith("/vnd.apple.mpegurl")« ||`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  62. L18 _(in `js/init`)_ `»    a.download = options.filename«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  63. L19 _(in `js/function`)_ `let »time = hour > 0 ? hour + ":" : «"";`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  64. L20 _(in `js/function`)_ `time» += min.toString().padStart(2, '0') + ":"«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  65. L83 `»data«.parsing = "m3u8";`  · ASSIGN:identifier
  66. L84 `} else if (isMPD(»data«)) {`  · ASSIGN:identifier
  67. L24 (→L25) `[true, n»ew Map()],  // 当前页面«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  68. L25 `[fal»se, new M«ap()]  // 其他页面`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  69. L90 `if (»data.favIconUrl && !favicon.has(data.webUrl)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  70. L85 `»data«.parsing = "mpd";`  · ASSIGN:identifier
  71. L86 `} else if (isJSON(»data«)) {`  · ASSIGN:identifier
  72. L29 (→L31) `// 储存所有扩展名，保»存是否筛选状态 来判断新加入的资源 立刻判断是否需要隐藏«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  73. L30 `const fi»lterExt =« new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  74. L91 `favicon.set(»data.webUrl, data.favIconUrl«);`  · ASSIGN:identifier, ELEMENT:member-element
  75. L87 _(in `js/init`)_ `»{ "ext": "mpeg", "size": 0«, "state": true },`  · ASSIGN:identifier, RETURN:json.stringify
  76. L93 `»data.isPlay = isPlay(data«);`  · ASSIGN:identifier
  77. L828 `if (»G.Player && !isJSON(data) && !isPicture(data)«) { return true; }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left
  78. L36 `const fa»vicon = «new Map();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  79. L38 `let page»DOM = un«defined;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  80. L39 _(in `js/init`)_ `»return c«hrome.i18n.getMessage(key);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  81. L40 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "HeartBeat" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  82. L41 _(in `js/pupup-utils`)_ `»data.ext« == "webp" ||`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  83. L42 `chrome.r»untime.s«endMessage(chrome.runtime.id, { Message: "clearRedundant" });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  84. L830 `return »isMediaExt(data.ext) || typeArray.includes(data.type) || isM3U8(data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  85. L46 `const errorList = ["SERVER_BAD_CONTENT", "SERVER_UNAUTHORIZED", "SERVER_FORBIDDEN", "SERVER_UNREACHABLE»", «"SERVER_CROSS_ORIGIN_REDIRECT", "SERVER_FAILED", "NETWORK_FAILED"];`  · ASSIGN:identifier
  86. L95 `if (allData.get(»currentTab).has(data.requestId«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  87. L96 `»data.requestId = data.requestId + "_"« + Date.now().toString();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  88. L104 `${G.ShowWebIco ? »`<img class="favicon ${!data.favIconUrl ? "faviconFlag" : ""}" requestId="${data.requestId}" src="${data.favIconUrl}"/>`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  89. L106 `<span class="name ${data.parsing || data.isRegex || data.tabId == -1 ? "bold" : ""}">${»trimName«}</span>`  · ASSIGN:identifier
  90. L107 `<span class="size ${data.size ? "" : "hide"}">${»data.size«}</span>`  · ASSIGN:identifier, ELEMENT:member-element
  91. L109 `<img src="img/parsing.png" class="icon parsing ${data.parsing ? "" : "hide"}" id="parsing" data-type="${»data.parsing«}" title="${i18n.parser}"/>`  · ASSIGN:identifier, ELEMENT:member-element
  92. L118 `${data.title ? »`<b>${i18n.title}:</b> ${data.title}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  93. L119 `${data.type ? »`<br><b>MIME:</b>  ${data.type}`« : ""}`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent
  94. L126 `<a href="${»data.url}" target="_blank" download="${data.downFileName}">${data.url«}</a>`  · ASSIGN:identifier, ELEMENT:member-element
  95. L100 (→L131) `»data.html = $(`«`  · ASSIGN:template-literal, ASSIGN:identifier
  96. L134 `»data.urlPanel = data.html.find(".url")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  97. L135 `»data«.urlPanelShow = false;`  · ASSIGN:identifier
  98. L136 `»data.panelHeading = data.html.find(".panel-heading")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  99. L137 (→L202) `»data.panelHeading.click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  100. L204 (→L207) `»data.html.find("#qrcode").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  101. L209 (→L211) `»data.html.find("#catDown").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  102. L213 (→L218) `»data.html.find('#copy').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  103. L220 (→L228) `»data.html.find('#aria2').click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  104. L230 (→L278) `»data.html.find('#download').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L280 (→L309) `»data.html.find('.invoke').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  106. L331 `»data«._checked = checkboxState;`  · ASSIGN:identifier
  107. L332 `»data.html.find(".DownCheck").prop("checked", data._checked)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  108. L333 (→L337) `»data.html.find('input').click(function (event) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  109. L338 `Object.defineProperty(»data«, "checked", {`  · ASSIGN:identifier
  110. L349 (→L356) `»data.html.find("#send2local").click(function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  111. L359 `allData.get(»currentTab).set(data.requestId, data«);`  · ASSIGN:identifier, ELEMENT:member-element
  112. L362 `if (!filterExt.has(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  113. L363 `filterExt.set(»data.ext«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  114. L380 `if (!filterExt.get(»data.ext«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  115. L364 `const html = $(»`<label class="flexFilter" id="${data.ext}"><input type="checkbox" checked>${data.ext}</label>`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  116. L381 `»data.html.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  117. L385 `return »data.html«;`  · ASSIGN:identifier, ELEMENT:member-element
  118. L382 `»data.html.find("input").prop("checked", false)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  119. L734 `if (»Message.data.tabId« == G.tabId) {`  · ELEMENT:member-element, ASSIGN:binary-left
  120. L737 `$current.append(»html«);`  · ASSIGN:identifier
  121. L138 `»data.urlPanelShow = !data.urlPanelShow«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  122. L139 `const mediaInfo = »data.html.find("#mediaInfo")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  123. L140 `const preview = »data.html.find("#preview")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  124. L141 `if (»!data.urlPanelShow«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  125. L150 `»data.urlPanel.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  126. L143 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  127. L146 `»data.urlPanel.hide()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  128. L151 `if (»!mediaInfo.data("state")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  129. L147 `»!preview[0].paused && preview.trigger("pause")«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, RETURN:fallback-return
  130. L152 `»mediaInfo.data("state", true)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  131. L153 `if (isM3U8(»data«)) {`  · ASSIGN:identifier
  132. L199 `»preview.show().trigger("play")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L173 `} else if (»data.isPlay«) {`  · ASSIGN:identifier, ELEMENT:member-element
  134. L155 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  135. L174 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  136. L177 `} else if (isPicture(»data«)) {`  · ASSIGN:identifier
  137. L185 (→L196) `»preview.on("loadedmetadata", function () {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  138. L178 `setRequestHeaders(»data.requestHeaders«, function () {`  · ASSIGN:identifier, ELEMENT:member-element
  139. L156 `hls.loadSource(»data.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  140. L157 `hls.attachMedia(»preview[0]«);`  · ASSIGN:identifier, ELEMENT:member-element
  141. L161 `!data.tracks.audio && »mediaInfo.append(`<br><b>${i18n.noAudio}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  142. L162 `!data.tracks.video && »mediaInfo.append(`<br><b>${i18n.noVideo}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  143. L169 `if (»data.levels.length > 1 && !mediaInfo.text().includes(i18n.m3u8Playlist)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  144. L170 `»mediaInfo.append(`<br><b>${i18n.m3u8Playlist}</b>`)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  145. L175 `»preview.attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  146. L179 `»data.html.find("#screenshots").show().attr("src", data.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  147. L186 `»preview.show()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  148. L188 `»data«.duration = this.duration;`  · ASSIGN:identifier
  149. L189 `»mediaInfo.append(`<br><b>${i18n.duration}:</b> ` + secToTime(this.duration))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  150. L192 `»mediaInfo.append(`<br><b>${i18n.resolution}:</b> ` + this.videoWidth + "x" + this.videoHeight)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  151. L193 `»data«.videoWidth = this.videoWidth;`  · ASSIGN:identifier
  152. L194 `»data«.videoHeight = this.videoHeight;`  · ASSIGN:identifier
  153. L206 `»$(this).html("").qrcode({ width: size, height: size, text: data.url }).off("click")«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  154. L210 `catDownload(»data«);`  · ASSIGN:identifier
  155. L845 `if (!Array.isArray(»data)) { data = [data]«; }`  · ASSIGN:identifier, ELEMENT:object.setProperty
  156. L848 `localStorage.setItem('downloadData', »JSON.stringify(data)«);`  · RETURN:json.stringify
  157. L855 (→L862) `»    chrome.runtime.sendMessage(chrome.runtime.id, { Message: "catDownload", data: data }, (message) => {«`  · ELEMENT:object.setProperty
  158. L214 `const text = copyLink(»data«);`  · ASSIGN:identifier
  159. L3 `const _tabId = »parseInt«(params.get("tabId"));`  · ASSIGN:identifier, ELEMENT:member-element
  160. L4 `const _t»ype = params«.get("type");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  161. L6 _(in `js/function`)_ `function append»Zero(date) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  162. L11 _(in `js/init`)_ `* 使用传统下载方式下载 但无法监听 无法另存为 无»法判断下«载是否失败 唉~`  · ASSIGN:identifier
  163. L221 `aria2AddUri(»data«, function (data) {`  · ASSIGN:identifier
  164. L69 _(in `js/function`)_ `* @para»m {Function} callb«ack`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  165. L74 _(in `js/function`)_ `cons»t rules = {« removeRuleIds: [tabs ? tabs.id : 1] };`  · ASSIGN:identifier, ELEMENT:member-element
  166. L75 _(in `js/media-control`)_ `for (let i = 0; i < state.co»unt; i++) {«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  167. L231 `if (»G.m3u8dl && (isM3U8(data) || isMPD(data))«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  168. L232 `if (»!data.url.startsWith("blob:")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  169. L268 `if (»G.m3u8AutoDown && data.parsing == "m3u8"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  170. L233 `const m3u8dlArg = »data.m3u8dlArg ?? templates(G.m3u8dlArg, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  171. L269 `openParser(»data«, { autoDown: true });`  · ASSIGN:identifier
  172. L273 `url: »data.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  173. L272 (→L276) `»        chrome.downloads.download({«`  · ELEMENT:object.setProperty
  174. L274 `filename: »data.downFileName«,`  · ASSIGN:identifier, ELEMENT:member-element
  175. L276 `}, function (id) { downData[id] = »data«; });`  · ASSIGN:identifier
  176. L234 `const url = 'm3u8dl:' + (»G.m3u8dl == 1 ? Base64.encode(m3u8dlArg) : m3u8dlArg«);`  · ASSIGN:identifier, ASSIGN:binary-right
  177. L10 _(in `js/media-control`)_ `clearInte»rval(VideoTagTimer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  178. L14 `cons»t $allCount «= $("#allTab #quantity");`  · ELEMENT:member-element-container
  179. L235 `if (»url.length« >= 2046) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  180. L236 `navigator.clipboard.writeText(»m3u8dlArg«);`  · ASSIGN:identifier
  181. L260 `window.location.href = »url«;`  · ASSIGN:identifier
  182. L263 `»chrome.tabs.update({ url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  183. L249 `»data«.m3u8dlArg = confirm.find("textarea").val();`  · ASSIGN:identifier
  184. L250 `»data.html.find('#download').click()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  185. L281 `const url = »data.invoke ?? templates(G.invokeText, data)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  186. L317 `let url = templates(G.Player, »data«);`  · ASSIGN:identifier
  187. L340 `return »data._checked«;`  · ASSIGN:identifier, ELEMENT:member-element
  188. L343 `»data«._checked = newValue;`  · ASSIGN:identifier
  189. L344 `»data.html.find('input').prop("checked", newValue)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  190. L350 `send2local("catch", »data, data.tabId«).then(function (success) {`  · ASSIGN:identifier, ELEMENT:member-element
  191. L576 _(in `js/function`)_ `body = »G.send2localBody.replaceAll('${data}', `"${data}"`)«;`  · ASSIGN:identifier, ASSIGN:template-literal, MUTATE:string.replace, ELEMENT:member-element-container
  192. L580 _(in `js/function`)_ `»data«.action = action;`  · ASSIGN:identifier
  193. L577 `»    data.checked = fals«e;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  194. L581 _(in `js/function`)_ `let »postData = templates(body, data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  195. L284 `if (G.in»voke«Confirm && event.originalEvent && event.originalEvent.isTrusted) {`  · ASSIGN:identifier
  196. L335 `mer»geDownButton«();`  · ASSIGN:identifier, ELEMENT:member-element-container
  197. L345 _(in `js/function`)_ `return »text«;`  · ASSIGN:identifier
  198. L584 _(in `js/function`)_ `»postData = JSONparse(postData, { action, data, tabId })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:implicit.add
  199. L369 `»     value.chec«ked = true;`  · RETURN:json.parse
  200. L611 _(in `js/function`)_ `option.body = »JSON.stringify(postData)«;`  · RETURN:json.stringify
  201. L570 _(in `js/function`)_ `const »option = { method: G.send2localMethod }«;`  · ELEMENT:object.setProperty
  202. L753 `if (item.url == »Message.url«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right
  203. L759 `$maybeKey.append(AddKey(»Message.data«));`  · ELEMENT:member-element
  204. L390 `const base64Key = base64ToHex(»key«);`  · ASSIGN:identifier
  205. L974 `binaryString = »atob(base64)«;`  · ASSIGN:identifier, RETURN:atob
  206. L980 `for (let i = 0; i < »binaryString.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  207. L981 `let hex = »binaryString.charCodeAt(i).toString(16)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  208. L982 `if (»hex.length« === 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  209. L983 `hex = '0' + »hex«;`  · ASSIGN:identifier, ASSIGN:binary-right
  210. L985 `hexString += »hex«;`  · ASSIGN:identifier
  211. L987 `return »hexString«;`  · ASSIGN:identifier
  212. L391 `if (»!base64Key«) { return; }`  · ASSIGN:identifier, ASSIGN:unary
  213. L397 `<span class="name bold">${»key«}</span>`  · ASSIGN:identifier
  214. L402 `Hex: ${»base64Key«}`  · ASSIGN:identifier
  215. L404 `Base64: ${»key«}`  · ASSIGN:identifier
  216. L394 (→L406) `»    data.html = $(`«`  · ASSIGN:template-literal

---

## Flow #14 — JQUERY_ELEMENT_VAL (#videoTabIndex)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/media-control` L51:C16 -> L51:C28  `if (»currentTabId« == -1) { return; }`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (mediaControl) — `js/media-control` L104:C16 -> L104:C120  `»(chrome.storage.session ?? chrome.storage.local).set({ mediaControl: { tabid: _tabId, index: _index } })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (369 raw steps → 25 distinct lines):
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

- **Propagation** (386 raw steps → 36 distinct lines):
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

- **Source**: `WINDOW_MESSAGE_EVENT` — `lib/hls.min` L1:C217349 -> L1:C217350  `…f.postMessage({event:e,data:t,instanceNo:r})}void 0!==t&&t&&self.addEventListener("message",(function(e){var t=e.data,r=»t«.instanceNo;if(void 0!==r){var i=zn[r];if("reset"===t.cmd&&(delete zn[t.resetNo],i&&i.destroy(),t.cmd="init"),"init"===t…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C217226 -> L1:C217273  `…event:"transmuxComplete",data:t[0],instanceNo:i}),e.postMessage({event:"flush",data:r,instanceNo:i})}function ea(e,t,r){»self.postMessage({event:e,data:t,instanceNo:r})«}void 0!==t&&t&&self.addEventListener("message",(function(e){var t=e.data,r=t.instanceNo;if(void 0!==r){var i=zn[r];if("…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C216871 -> L1:C216934  `…deo||i.text||i.id3||i.initSegment))return!1;var i,n=[],a=t.remuxResult,s=a.audio,o=a.video;return s&&Jn(n,s),o&&Jn(n,o),»e.postMessage({event:"transmuxComplete",data:t,instanceNo:r},n)«,!0}function Jn(e,t){t.data1&&e.push(t.data1.buffer),t.data2&&e.push(t.data2.buffer)}function Zn(e,t,r,i){t.reduce((func…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C217091 -> L1:C217155  `…t.data1.buffer),t.data2&&e.push(t.data2.buffer)}function Zn(e,t,r,i){t.reduce((function(t,r){return $n(e,r,i)||t}),!1)||»e.postMessage({event:"transmuxComplete",data:t[0],instanceNo:i})«,e.postMessage({event:"flush",data:r,instanceNo:i})}function ea(e,t,r){self.postMessage({event:e,data:t,instanceNo:r})}v…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `lib/hls.min` L1:C217156 -> L1:C217206  `…,i){t.reduce((function(t,r){return $n(e,r,i)||t}),!1)||e.postMessage({event:"transmuxComplete",data:t[0],instanceNo:i}),»e.postMessage({event:"flush",data:r,instanceNo:i})«}function ea(e,t,r){self.postMessage({event:e,data:t,instanceNo:r})}void 0!==t&&t&&self.addEventListener("message",(func…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (627 raw steps → 1 distinct lines):
   1. L1 `…s=a.audio,o=a.video;»return s&&Jn(n,s),o&&Jn(n,o),e.postMessage({event:"transmuxComplete",data:t,instanceNo:r},n),!0}function Jn(e,t){t.data1 …⟨tainted span: 1559 chars⟩… ROR,details:k.FRAG_PARSING_ERROR,chunkMeta:t.chunkMeta,fatal:!1,error:e,err:e,reason:"transmuxer-worker flush error"},r)«})):Zn(self,u,l,r)}}…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, RETURN:json.parse, ELEMENT:object.setProperty

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

- **Source**: `NAVIGATOR_USER_AGENT` — `js/function` L332:C47 -> L332:C66  `userAgent: G.userAgent ? G.userAgent : »navigator.userAgent«,`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `js/options` L225:C8 -> L227:C10 (spans to L227)  `»chrome.storage.sync.set({ [Option]: G.OptionLists[Option] }, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (35 raw steps → 8 distinct lines):
   1. L332 _(in `js/function`)_ `userAgent: G.userAgent ? G.userAgent : »navigator.userAgent«,`  · ASSIGN:conditional-alternate
   2. L301 (→L333) `»        if (G.isFirefox) {«`  · ELEMENT:object.setProperty
   3. L334 `$("#import»Options").bind("click", function« () {`  · ELEMENT:object.setProperty, COPY:object-spread
   4. L225 (→L227) `chrome.storage.sync.set({ [Option]: »G.OptionLists[Option] }, () => {«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:object.setProperty
   5. L279 _(in `js/init`)_ `»G = { ...items, ...G }«;`  · ELEMENT:object.setProperty, COPY:object-spread
   6. L294 _(in `js/init`)_ `(chrome.storage.session ?? chrome.storage.local).get(»G.LocalVar«, function (items) {`  · ELEMENT:member-element-container
   7. L297 `»let ExportData = JSON.«stringify(items);`  · ELEMENT:object.setProperty, COPY:object-spread
   8. L236 `acc[id] = »G.OptionLists[id]«;`  · ELEMENT:computed-member-unknown-alternative

---
