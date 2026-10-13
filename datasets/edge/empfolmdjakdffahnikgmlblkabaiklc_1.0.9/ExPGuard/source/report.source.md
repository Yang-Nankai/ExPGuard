# Source-level Taint Flow — empfolmdjakdffahnikgmlblkabaiklc 1.0.9

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 15 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(contentScriptExecuteScriptEndFromPage))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/content-script` L253:C19 -> L253:C30  `var detail = »data.detail« || {};`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `js/content-script` L247:C59 -> L247:C68  `document.querySelector('#contentScriptListenerData').»innerHTML« = data.actionData;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (536 raw steps → 17 distinct lines):
   1. L253 `var detail = »data.detail || {}«;`  · ELEMENT:member-element, ASSIGN:logical-left
   2. L254 `if (»detail.actionSource« !== 'page') {`  · ELEMENT:member-element, ASSIGN:binary-left
   3. L263 `waitTime: »detail.waitTime«,`  · ELEMENT:member-element
   4. L262 (→L265) `»      chrome.runtime.sendMessage(Object.assign({}, executeScriptDataPrefix, { «`  · ELEMENT:object.setProperty, COPY:object.assign
   5. L264 `actionData: detail.data ? »JSON.stringify(detail.data)« : ''`  · ELEMENT:member-element, RETURN:json.stringify
   6. L242 (→L248) `»    chrome.runtime.onMessage.addListener(function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/content-script]`
   7. L247 `»document.querySelector('#contentScriptListenerData').innerHTML = data.actionData«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
   8. L309 (→L315) `»    chrome.runtime.onMessage.addListener(function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/background->js/content-script]`
   9. L314 `globalEvent.emit(»data.actionId, data.actionData ? JSON.parse(data.actionData)« : {});`  · RETURN:json.parse, ASSIGN:identifier, ELEMENT:member-element
  10. L15 `if(this.handles && this.handles[»eventName«]){`  · ASSIGN:identifier
  11. L16 `this.handles[»eventName«](arguments[1]);`  · ASSIGN:identifier
  12. L244 `if (»data.actionSource« !== 'sendMessageCrossContentScriptFromBg') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L311 `if (»data.actionSource« !== 'backgroundCrossApi') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  14. L126 (→L168) `»      port.onMessage.addListener(async (msg) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[js/background->js/content-script]`
  15. L175 (→L184) `»      port.onMessage.addListener(async (msg) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[js/background->js/content-script]`
  16. L183 `fileCacheListenerDataEl.innerHTML = »JSON.stringify(msg)«;`  · RETURN:json.stringify
  17. L176 `let »fileCacheListenerDataEl = document.querySelector('#fileCacheListenerData')«;`  · ELEMENT:object.setProperty

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(contentScriptExecuteScriptEndFromPage))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L462:C0 -> L474:C2 (spans to L474)  `»chrome.runtime.onMessage.addListener(function (data) {«`
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `js/background` L534:C16 -> L534:C79  `»chrome.cookies.remove({url: actionData.url, name: cookie.name})«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L553:C8 -> L559:C10 (spans to L559)  `»chrome.tabs.create({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L74:C35 -> L74:C75  `const response = await »fetch(this.videoUrl, { method: 'HEAD' })«;`  (url-control=FULL)
  - `CHROME_LOCAL_STORAGE` (unknown) — `js/background` L598:C8 -> L609:C9 (spans to L609)  `»chrome.storage.local.set(«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L662:C12 -> L662:C52  `»fetch(actionData.url, actionData.config)«.then(res => res.text()).then((data) => {`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L680:C12 -> L680:C52  `»fetch(actionData.url, actionData.config)«.then(res => res.json()).then((data) => {`  (url-control=FULL)
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L706:C8 -> L769:C10 (spans to L769)  `»chrome.tabs.create(Object.assign({«`
  - `EVAL` — `js/background` L722:C24 -> L725:C26 (spans to L725)  `»eval(`«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `js/background` L807:C12 -> L882:C14 (spans to L882)  `»chrome.windows.create(Object.assign({«`
  - `EVAL` — `js/background` L829:C28 -> L829:C40  `»eval(script)«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L1041:C12 -> L1051:C13 (spans to L1051)  `»chrome.tabs[actionData.funcName](«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L1053:C12 -> L1064:C13 (spans to L1064)  `»chrome.tabs[actionData.funcName](«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L899:C22 -> L931:C17 (spans to L931)  `await »chrome.declarativeNetRequest.updateDynamicRules(«`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L1066:C12 -> L1078:C13 (spans to L1078)  `»chrome.tabs[actionData.funcName](«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L956:C22 -> L969:C17 (spans to L969)  `await »chrome.declarativeNetRequest.updateDynamicRules(«`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `js/background` L1128:C14 -> L1133:C9 (spans to L1133)  `await »chrome.declarativeNetRequest.updateDynamicRules(«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1286 raw steps → 346 distinct lines):
   1. L462 (→L474) `»chrome.runtime.onMessage.addListener(function (data) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]`
   2. L464 `if (»data.actionSource !== 'getLocalStorage' && data.actionSource !== 'contentScriptExecuteScriptEnd'«) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L467 `if (Number(»data.waitTime«) > 0) {`  · ELEMENT:member-element-container
   4. L470 `}, Number(»data.waitTime«));`  · ELEMENT:member-element-container
   5. L469 `globalEvent.emit(»data.action + data.actionId, data.actionData ? JSON.parse(data.actionData)« : {});`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:json.parse
   6. L404 `if(this.handles && this.handles[»eventName«]){`  · ASSIGN:identifier
   7. L405 `this.handles[»eventName«].fn(arguments[1]);`  · ASSIGN:identifier
   8. L472 `globalEvent.emit(»data.action + data.actionId, data.actionData ? JSON.parse(data.actionData)« : {});`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:json.parse
   9. L476 (→L482) `»chrome.runtime.onMessage.addListener(function (data, sender) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]`
  10. L478 `if (»data.actionSource« !== 'closeTabBySelf') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  11. L484 (→L493) `»chrome.runtime.onMessage.addListener(function (data, sender) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]`
  12. L486 `if (»data.actionSource« !== 'sendMessageCrossContentScript') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  13. L489 (→L492) `chrome.tabs.sendMessage(Number(»data.senderTabId), {«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  14. L491 `actionData: »data.actionData«`  · ELEMENT:member-element-container
  15. L499 (→L1232) `»chrome.runtime.onMessage.addListener(async function(data, sender){«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content-script->js/background]`
  16. L501 `var action = »data.action«;`  · ELEMENT:member-element-container
  17. L502 `var actionId = »data.actionId«;`  · ELEMENT:member-element-container
  18. L503 `var actionSource = »data.actionSource«;`  · ELEMENT:member-element-container
  19. L504 `var »actionData = JSON.parse(data.actionData || '{}')«;`  · ELEMENT:member-element-container, ASSIGN:logical-left, RETURN:json.parse, ELEMENT:object.setProperty
  20. L508 `if (»actionSource« !== 'crossApi') {`  · ASSIGN:identifier, ASSIGN:binary-left
  21. L512 `if (»data.action« === 'getCookies'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L513 (→L530) `chrome.cookies.getAll({ domain: »actionData.domain }, function(cookies) {«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  23. L524 `action: »action«,`  · ASSIGN:identifier
  24. L523 (→L528) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  25. L525 `actionId: »actionId«,`  · ASSIGN:identifier
  26. L531 `} else if (»data.action« === 'clearAllCookies'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  27. L1231 `}, data.actionTimeout ? »data.actionTimeout« : (['executeScript', 'executeScriptByWindow'].includes(data.action) ? 5 * 60 * 1000 : 20000));`  · ELEMENT:member-element, ASSIGN:conditional-consequent
  28. L1226 `action: »action«,`  · ASSIGN:identifier
  29. L1225 (→L1230) `»        chrome.tabs.sendMessage(sender.tab.id, {«`  · ELEMENT:object.setProperty
  30. L1227 `actionId: »actionId«,`  · ASSIGN:identifier
  31. L532 (→L543) `chrome.cookies.getAll({ domain: »actionData.domain }, function(cookies) {«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  32. L534 `»chrome.cookies.remove({url: actionData.url, name: cookie.name})«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  33. L537 `action: »action«,`  · ASSIGN:identifier
  34. L536 (→L541) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  35. L538 `actionId: »actionId«,`  · ASSIGN:identifier
  36. L544 `} else if (»data.action« === 'getLocalStorage'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  37. L545 `var url = »actionData.url«;`  · ELEMENT:member-element
  38. L582 `} else if (»data.action« === 'getGlobalStorage'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  39. L546 `if (»url.includes('?')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  40. L583 `var key = »actionData.key«;`  · ELEMENT:member-element
  41. L593 `} else if (»data.action« === 'setGlobalStorage'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  42. L547 `url = »url + '&getLocalStorage=1&action=' + data.action + '&actionId=' + encodeURIComponent(data.actionId)«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:encodeURIComponent
  43. L549 `url = »url + '?getLocalStorage=1&action=' + data.action + '&actionId=' + encodeURIComponent(data.actionId)«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:encodeURIComponent
  44. L584 `chrome.storage.local.get(»key«, function(items) {`  · ASSIGN:identifier
  45. L586 `action: »action«,`  · ASSIGN:identifier
  46. L585 (→L590) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  47. L587 `actionId: »actionId«,`  · ASSIGN:identifier
  48. L594 `var key = »actionData.key«;`  · ELEMENT:member-element
  49. L610 `} else if (»data.action« === 'removeGlobalStorage'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  50. L595 `var value = »actionData.value«;`  · ELEMENT:member-element
  51. L611 `var key = »actionData.key«;`  · ELEMENT:member-element
  52. L623 `} else if (»data.action« === 'cacheChunkByUrl') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  53. L554 `url: »url«,`  · ASSIGN:identifier
  54. L553 (→L559) `»        chrome.tabs.create({«`  · ELEMENT:object.setProperty
  55. L612 `chrome.storage.local.remove(»key«,`  · ASSIGN:identifier
  56. L624 `cacheChunkByUrl(sender.tab.id, »actionData.url«, actionData).then(function() {`  · ELEMENT:member-element
  57. L203 `if (»lastFileCacheData && lastFileCacheData.url === url«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  58. L217 `if (globalFileFetchMap[»url«]) {`  · ASSIGN:identifier
  59. L218 `return globalFileFetchMap[»url«];`  · ASSIGN:identifier
  60. L227 `fileCachePort = chrome.tabs.connect(tabId, »Object.assign({ name: "fileCache" }, actionData.connectConfig)«);`  · ELEMENT:member-element, COPY:object.assign-opaque
  61. L229 (→L243) `const downloader = new VideoChunkDownloader(»url, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  62. L230 `concurrency: »actionData.fetchConcurrency«,`  · ELEMENT:member-element
  63. L231 `chunkSize: »actionData.fetchChunkSize«,`  · ELEMENT:member-element
  64. L32 `this.videoUrl = »videoUrl«;`  · ASSIGN:identifier
  65. L33 `this.chunkSize = »options.chunkSize || 2.5 * 1024 * 1024«; // 2.5MB`  · ASSIGN:logical-left
  66. L34 `this.concurrency = »options.concurrency || 3«; // 并发下载数`  · ASSIGN:logical-left
  67. L84 `this.totalChunks = »Math.ceil(this.totalSize / this.chunkSize)«;`  · ASSIGN:binary-right, RETURN:Math.ceil
  68. L94 (→L98) `»            const tasks = Array.from({ length: this.totalChunks }, (_, index) => index)«`  · ELEMENT:object.setProperty
  69. L143 (→L148) `»            const workers = Array.from({ length: this.concurrency }, async () => {«`  · ELEMENT:object.setProperty
  70. L159 `const ext = »this.videoUrl.split('.').pop()?.toLowerCase()«;`  · ELEMENT:member-element, RETURN:fallback-return
  71. L167 `return mimeTypes[»ext«] || 'video/mp4';`  · ASSIGN:identifier
  72. L246 `globalFileFetchMap[»url«] = downloader.download()`  · ASSIGN:identifier
  73. L297 `return globalFileFetchMap[»url«];`  · ASSIGN:identifier
  74. L641 `} else if (»data.action« === 'fetchAndSendFileToContentScript') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  75. L560 `globalEvent.on(»data.action + data.actionId«, function(responseActionData) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  76. L398 `this.handles[»eventName«] = {`  · ASSIGN:identifier
  77. L597 `map[»key] = value«;`  · ASSIGN:identifier
  78. L596 `var »map = {}«;`  · ELEMENT:object.setProperty
  79. L320 `if (»lastFileCacheData && lastFileCacheData.url === actionData.url«) {`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right
  80. L331 `await cacheChunkByUrl(tabId, »actionData.url«, actionData);`  · ELEMENT:member-element
  81. L349 `fileTransferPort = chrome.tabs.connect(tabId, »Object.assign({ name: "fileTransfer" }, actionData.transferConnectConfig)«);`  · ELEMENT:member-element, COPY:object.assign-opaque
  82. L354 `const concurrency = »actionData.transferConcurrency || 5«; // 并发数，可根据需求调整`  · ELEMENT:member-element, ASSIGN:logical-left
  83. L357 (→L377) `const workers = Array.from({ length: »concurrency }, async () => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  84. L644 `action: »action«,`  · ASSIGN:identifier
  85. L643 (→L648) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  86. L645 `actionId: »actionId«,`  · ASSIGN:identifier
  87. L659 `} else if (»data.action« === 'crossFetch'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  88. L579 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  89. L409 `if(this.handles && this.handles[»eventName«]) delete this.handles[eventName];`  · ASSIGN:identifier
  90. L602 `action: »action«,`  · ASSIGN:identifier
  91. L601 (→L606) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  92. L603 `actionId: »actionId«,`  · ASSIGN:identifier
  93. L660 `actionData.config = »actionData.config || {}«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  94. L698 `} else if (»data.action« === 'executeScript') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  95. L661 `if (»actionData.config.responseText«) {`  · ELEMENT:member-element-container, ELEMENT:member-element
  96. L699 `var url = »actionData.url«;`  · ELEMENT:member-element
  97. L770 `} else if (»data.action« === 'executeScriptByWindow') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  98. L662 `fetch(»actionData.url, actionData.config«).then(res => res.text()).then((data) => {`  · ELEMENT:member-element, ELEMENT:member-element-container
  99. L664 `action: »action«,`  · ASSIGN:identifier
  100. L663 (→L668) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  101. L665 `actionId: »actionId«,`  · ASSIGN:identifier
  102. L680 `fetch(»actionData.url, actionData.config«).then(res => res.json()).then((data) => {`  · ELEMENT:member-element, ELEMENT:member-element-container
  103. L682 `action: »action«,`  · ASSIGN:identifier
  104. L681 (→L686) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  105. L683 `actionId: »actionId«,`  · ASSIGN:identifier
  106. L700 `var config = »actionData.config« || {};`  · ELEMENT:member-element-container
  107. L771 `var url = »actionData.url«;`  · ELEMENT:member-element
  108. L884 `} else if (»data.action« === 'coverNetworkHeader') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  109. L701 `if (»url.includes('?')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  110. L772 `var config = »actionData.config« || {};`  · ELEMENT:member-element-container
  111. L885 `var prefix = »actionData.prefix«;`  · ELEMENT:member-element
  112. L941 `} else if (»data.action« === 'setBeforeRequestRedirect') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  113. L702 `url = »url + '&executeScript=1&actionExec=' + data.action + '&actionId=' + encodeURIComponent(data.actionId) + '&executeScriptTitle=' + encodeURIComponent(encodeURIComponent(config.executeScriptTitle || '')) + '&executeScriptContent=' + encodeURIComponent(encodeURIComponent(config.executeScriptContent || ''))«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:encodeURIComponent, ELEMENT:member-element, ASSIGN:logical-left
  114. L704 `url = »url + '?executeScript=1&actionExec=' + data.action + '&actionId=' + encodeURIComponent(data.actionId) + '&executeScriptTitle=' + encodeURIComponent(encodeURIComponent(config.executeScriptTitle || '')) + '&executeScriptContent=' + encodeURIComponent(encodeURIComponent(config.executeScriptContent || ''))«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:encodeURIComponent, ELEMENT:member-element, ASSIGN:logical-left
  115. L773 `if (»url.includes('?')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  116. L886 `var url = »actionData.url«;`  · ELEMENT:member-element
  117. L942 `var key = »actionData.key«;`  · ELEMENT:member-element
  118. L979 `} else if (»data.action« === 'clearUselessDynamicRules') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  119. L707 `»url«,`  · ASSIGN:identifier
  120. L706 (→L769) `»        chrome.tabs.create(Object.assign({«`  · ELEMENT:object.setProperty, COPY:object.assign
  121. L710 `}, »config.tabConfig || {}«), function(tab) {`  · ELEMENT:member-element, ASSIGN:logical-left
  122. L768 `}, »config.waitTime || 5000«);`  · ELEMENT:member-element, ASSIGN:logical-left
  123. L727 `world: »config.scriptConfig?.world || "MAIN"«,`  · ELEMENT:member-element, ASSIGN:logical-left
  124. L719 (→L730) `»                chrome.scripting.executeScript(Object.assign({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, COPY:object.assign
  125. L729 `args: [»actionData.script«, senderTabId]`  · ELEMENT:member-element
  126. L730 `}, »config.otherExecuteScriptConfig || {}«));`  · ELEMENT:member-element, ASSIGN:logical-left
  127. L724 `${»script«}`  · ASSIGN:identifier
  128. L722 (→L725) `»                        eval(`«`  · ASSIGN:template-literal
  129. L731 `globalEvent.on(»data.action + data.actionId«, function(responseActionData) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  130. L742 `if (»config.closeByTargetUrl«) {`  · ELEMENT:member-element
  131. L743 `setTabIdTriggerCallback(tab.id, »config.closeByTargetUrl, config.closeByTargetUrlExact«, () => {`  · ELEMENT:member-element
  132. L420 `targetUrl: »targetUrl«,`  · ASSIGN:identifier
  133. L418 (→L423) `»    var obj = {«`  · ELEMENT:object.setProperty
  134. L421 `exact: »!!exact«,`  · ASSIGN:identifier, ASSIGN:unary
  135. L413 `var »tabIdTriggerCallbackArr = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  136. L757 `if (»config.triggerByManualClose«) {`  · ELEMENT:member-element
  137. L774 `url = »url + '&executeScript=1&actionExec=' + data.action + '&actionId=' + encodeURIComponent(data.actionId) + '&executeScriptTitle=' + encodeURIComponent(encodeURIComponent(config.executeScriptTitle || '')) + '&executeScriptContent=' + encodeURIComponent(encodeURIComponent(config.executeScriptContent || ''))«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:encodeURIComponent, ELEMENT:member-element, ASSIGN:logical-left
  138. L776 `url = »url + '?executeScript=1&actionExec=' + data.action + '&actionId=' + encodeURIComponent(data.actionId) + '&executeScriptTitle=' + encodeURIComponent(encodeURIComponent(config.executeScriptTitle || '')) + '&executeScriptContent=' + encodeURIComponent(encodeURIComponent(config.executeScriptContent || ''))«`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:binary-right, RETURN:encodeURIComponent, ELEMENT:member-element, ASSIGN:logical-left
  139. L887 `var requestHeaders = »actionData.requestHeaders || []«;`  · ELEMENT:member-element, ASSIGN:logical-left
  140. L943 `var redirect = »actionData.redirect || {}«;`  · ELEMENT:member-element, ASSIGN:logical-left
  141. L1000 `} else if (»data.action« === 'getTabInfoByRule') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  142. L780 `if (»config.closeAllBeforeWindows«) {`  · ELEMENT:member-element
  143. L808 `»url«,`  · ASSIGN:identifier
  144. L807 (→L882) `»            chrome.windows.create(Object.assign({«`  · ELEMENT:object.setProperty, COPY:object.assign
  145. L810 `width: »config.width«,`  · ELEMENT:member-element
  146. L811 `height: »config.height«,`  · ELEMENT:member-element
  147. L812 `top: »config.top«,`  · ELEMENT:member-element
  148. L813 `left: »config.left«,`  · ELEMENT:member-element
  149. L814 `}, »config.otherWindowConfig || {}«), function(newWindow) {`  · ELEMENT:member-element, ASSIGN:logical-left
  150. L881 `}, config.waitTime === undefined ? 3000 : »config.waitTime«);`  · ELEMENT:member-element, ASSIGN:conditional-alternate
  151. L831 `world: »config.scriptConfig?.world || "MAIN"«,`  · ELEMENT:member-element, ASSIGN:logical-left
  152. L826 (→L834) `»                    chrome.scripting.executeScript(Object.assign({«`  · ELEMENT:object.setProperty, COPY:object.assign
  153. L833 `args: [»actionData.script«]`  · ELEMENT:member-element
  154. L834 `}, »config.otherExecuteScriptConfig || {}«));`  · ELEMENT:member-element, ASSIGN:logical-left
  155. L829 `eval(»script«);`  · ASSIGN:identifier
  156. L835 `globalEvent.on(»data.action + data.actionId«, function(responseActionData) {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  157. L850 `if (»config.closeByTargetUrl«) {`  · ELEMENT:member-element
  158. L851 `setTabIdTriggerCallback(newWindow?.tabs[0]?.id, »config.closeByTargetUrl, config.closeByTargetUrlExact«, () => {`  · ELEMENT:member-element
  159. L415 `if (»tabIdTriggerCallbackArr.length« > 20) {`  · ELEMENT:member.length, ASSIGN:binary-left
  160. L416 `»tabIdTriggerCallbackArr.shift()«;`  · ELEMENT:array.shift
  161. L870 `if (»config.triggerByManualClose«) {`  · ELEMENT:member-element
  162. L888 `var responseHeaders = »actionData.responseHeaders || []«;`  · ELEMENT:member-element, ASSIGN:logical-left
  163. L944 `var condition = »actionData.condition || {}«;`  · ELEMENT:member-element, ASSIGN:logical-left
  164. L1010 `} else if (»data.action« === 'updateTab') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  165. L945 `var actionDataStrNew = »JSON.stringify(actionData)«;`  · RETURN:json.stringify
  166. L1012 `»actionData.tabId«,`  · ELEMENT:member-element
  167. L1013 `»actionData.updateProperties || {}«,`  · ELEMENT:member-element, ASSIGN:logical-left
  168. L1024 `} else if (»data.action« === 'sendTabMessage') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  169. L890 `if (»url && prefix && (!coverNetworkHeaderMap[prefix] || coverNetworkHeaderMap[prefix].url !== url)«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right
  170. L1026 `»actionData.tabId«,`  · ELEMENT:member-element
  171. L1027 `»actionData.message«,`  · ELEMENT:member-element
  172. L1028 `»actionData.options || {}«,`  · ELEMENT:member-element, ASSIGN:logical-left
  173. L1039 `} else if (»data.action« === 'executeTabFunc') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  174. L893 `if (»coverNetworkHeaderMap[prefix] && coverNetworkHeaderMap[prefix].url !== url«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  175. L947 `if (»key && redirect && condition && (!setBeforeRequestRedirectMap[key] || setBeforeRequestRedirectMap[key].actionDataStr !== actionDataStrNew)«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:binary-right, ASSIGN:logical-right
  176. L1040 `if (»actionData.argsCount« === 1) {`  · ELEMENT:member-element, ASSIGN:binary-left
  177. L1088 `} else if (»data.action« === 'isTabExsitByRule') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  178. L894 `removeRuleIds = [coverNetworkHeaderMap[»prefix«].ruleId];`  · ASSIGN:identifier
  179. L950 `if (»setBeforeRequestRedirectMap[key] && setBeforeRequestRedirectMap[key].actionDataStr !== actionDataStrNew«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  180. L1041 `chrome.tabs[»actionData.funcName«](`  · ELEMENT:member-element
  181. L1042 `»actionData.args[0]«,`  · ELEMENT:member-element
  182. L1045 `action: »action«,`  · ASSIGN:identifier
  183. L1044 (→L1049) `»                    chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  184. L1046 `actionId: »actionId«,`  · ASSIGN:identifier
  185. L1052 `} else if (»actionData.argsCount« === 2) {`  · ELEMENT:member-element, ASSIGN:binary-left
  186. L1098 `} else if (»data.action« === 'closeTabsByRule') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  187. L951 `removeRuleIds = [setBeforeRequestRedirectMap[»key«].ruleId];`  · ASSIGN:identifier
  188. L1053 `chrome.tabs[»actionData.funcName«](`  · ELEMENT:member-element
  189. L1054 `»actionData.args[0]«,`  · ELEMENT:member-element
  190. L1055 `»actionData.args[1]«,`  · ELEMENT:member-element
  191. L1058 `action: »action«,`  · ASSIGN:identifier
  192. L1057 (→L1062) `»                    chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  193. L1059 `actionId: »actionId«,`  · ASSIGN:identifier
  194. L1065 `} else if (»actionData.argsCount« === 3) {`  · ELEMENT:member-element, ASSIGN:binary-left
  195. L1114 `} else if (»data.action« === 'getDynamicRules') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  196. L909 `requestHeaders: »requestHeaders.map«(function(header) {`  · ELEMENT:member-element-container
  197. L899 (→L931) `»                await chrome.declarativeNetRequest.updateDynamicRules(«`  · ELEMENT:object.setProperty
  198. L918 `responseHeaders: »responseHeaders.map«(function(header) {`  · ELEMENT:member-element-container
  199. L905 (→L925) `»                            action: Object.assign({«`  · COPY:object.assign
  200. L927 `urlFilter: »'*' + prefix« + '*'`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  201. L1066 `chrome.tabs[»actionData.funcName«](`  · ELEMENT:member-element
  202. L1067 `»actionData.args[0]«,`  · ELEMENT:member-element
  203. L1068 `»actionData.args[1]«,`  · ELEMENT:member-element
  204. L1069 `»actionData.args[2]«,`  · ELEMENT:member-element
  205. L1081 `action: »action«,`  · ASSIGN:identifier
  206. L1080 (→L1085) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  207. L1082 `actionId: »actionId«,`  · ASSIGN:identifier
  208. L1125 `} else if (»data.action« === 'updateDynamicRules') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  209. L933 `url: »url«,`  · ASSIGN:identifier
  210. L932 (→L935) `coverNetworkHeaderMap[»prefix] = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  211. L495 `var »coverNetworkHeaderMap = {}«;`  · ELEMENT:object.setProperty
  212. L956 (→L969) `»                await chrome.declarativeNetRequest.updateDynamicRules(«`  · ELEMENT:object.setProperty
  213. L1117 `action: »action«,`  · ASSIGN:identifier
  214. L1116 (→L1123) `»        chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  215. L1118 `actionId: »actionId«,`  · ASSIGN:identifier
  216. L1126 `var addRules = actionData.addRules ? »JSON.parse(actionData.addRules)« : [];`  · ELEMENT:member-element, RETURN:json.parse
  217. L1141 `} else if (»data.action« === 'getBackgroundVar') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  218. L971 `actionDataStr: »actionDataStrNew«,`  · ASSIGN:identifier
  219. L970 (→L973) `setBeforeRequestRedirectMap[»key] = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  220. L496 `var »setBeforeRequestRedirectMap = {}«;`  · ELEMENT:object.setProperty
  221. L1127 `var removeRuleIds = actionData.removeRuleIds ? »JSON.parse(actionData.removeRuleIds)« : [];`  · ELEMENT:member-element, RETURN:json.parse
  222. L1142 `var key = »actionData.key«;`  · ELEMENT:member-element
  223. L1156 `} else if (»data.action« === 'setBackgroundVar') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  224. L1128 (→L1133) `»        await chrome.declarativeNetRequest.updateDynamicRules(«`  · ELEMENT:object.setProperty
  225. L1143 `var value = self[»key«] || '';`  · ASSIGN:identifier
  226. L1157 `var key = »actionData.key || ''«;`  · ELEMENT:member-element, ASSIGN:logical-left
  227. L1174 `} else if (»data.action« === 'reloadBackgroundPage') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  228. L1135 `action: »action«,`  · ASSIGN:identifier
  229. L1134 (→L1139) `»        chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  230. L1136 `actionId: »actionId«,`  · ASSIGN:identifier
  231. L1158 `var value = »actionData.value || ''«;`  · ELEMENT:member-element, ASSIGN:logical-left
  232. L1187 `} else if (»data.action« === 'commonExecuteFunc'){`  · ELEMENT:member-element-container, ASSIGN:binary-left
  233. L1159 `var vType = »actionData.vType || 'string'«;`  · ELEMENT:member-element, ASSIGN:logical-left
  234. L1148 `action: »action«,`  · ASSIGN:identifier
  235. L1147 (→L1154) `»        chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  236. L1149 `actionId: »actionId«,`  · ASSIGN:identifier
  237. L1160 `if (»vType« === 'number') {`  · ASSIGN:identifier, ASSIGN:binary-left
  238. L1189 `var executeArgs = »actionData.executeArgs || []«;`  · ELEMENT:member-element, ASSIGN:logical-left
  239. L1161 `self[»key] = Number(value«);`  · ASSIGN:identifier
  240. L1162 `} else if (»vType« === 'object') {`  · ASSIGN:identifier, ASSIGN:binary-left
  241. L1182 `action: »action«,`  · ASSIGN:identifier
  242. L1181 (→L1186) `»        chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  243. L1183 `actionId: »actionId«,`  · ASSIGN:identifier
  244. L1190 `if (»actionData.executeKeys.length« === 0) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  245. L1168 `action: »action«,`  · ASSIGN:identifier
  246. L1167 (→L1172) `»        chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  247. L1169 `actionId: »actionId«,`  · ASSIGN:identifier
  248. L1163 `self[»key] = JSON.parse(value)«;`  · ASSIGN:identifier, RETURN:json.parse
  249. L1165 `self[»key] = value«;`  · ASSIGN:identifier
  250. L1191 `executeFunc = chrome[»actionData.executeFunc«];`  · ELEMENT:member-element
  251. L1192 `} else if (»actionData.executeKeys.length« === 1) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  252. L1218 `executeFunc(getFinalArgs(»executeArgs[0]), getFinalArgs(executeArgs[1]«));`  · ELEMENT:member-element
  253. L1193 `executeFunc = chrome[»actionData.executeKeys[0]][actionData.executeFunc«];`  · ELEMENT:member-element
  254. L1194 `} else if (»actionData.executeKeys.length« === 2) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  255. L1195 `executeFunc = chrome[»actionData.executeKeys[0]][actionData.executeKeys[1]][actionData.executeFunc«];`  · ELEMENT:member-element
  256. L144 `while (»tasks.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  257. L145 `const task = »tasks.shift()«;`  · ELEMENT:array.shift
  258. L146 `await »task()«;`  · ASSIGN:identifier, RETURN:fallback-return
  259. L209 `return request.url === »url«;`  · ASSIGN:identifier, ASSIGN:binary-right
  260. L235 `url: »url«,`  · ASSIGN:identifier
  261. L234 (→L236) `»            fileCachePort.postMessage(Object.assign({«`  · ELEMENT:object.setProperty
  262. L249 `const fileType = »actionData.fileType || res.fileType«;`  · ELEMENT:member-element, ASSIGN:logical-left
  263. L253 `const cacheLimitSize = »actionData.cacheLimitSize || 1024 * 1024 * 1024 * 2«; // 默认最大缓存2G`  · ELEMENT:member-element, ASSIGN:logical-left
  264. L254 `const cacheLimitCount = »actionData.cacheLimitCount || 10«; // 默认最大缓存10个文件`  · ELEMENT:member-element, ASSIGN:logical-left
  265. L284 `const »cacheData = {fileType, fileSize, base64Arr: sortedChunks, cacheDate: +new Date()}«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  266. L285 `»lastFileCacheData = { url: url, cacheData: cacheData }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  267. L287 `return cache.put(new Request(»url), new Response(JSON.stringify(cacheData)«, {`  · ASSIGN:identifier, RETURN:json.stringify
  268. L257 `let needRemoveCache = arrayOfRequest.length >= »cacheLimitCount«;`  · ASSIGN:identifier, ASSIGN:binary-right
  269. L272 `needRemoveCache = totalSize >= »cacheLimitSize«;`  · ASSIGN:identifier, ASSIGN:binary-right
  270. L273 `if (»needRemoveCache«) {`  · ASSIGN:identifier
  271. L325 `return cache.match(new Request(»actionData.url«))?.then(function(res) {`  · ELEMENT:member-element
  272. L333 `return cache.match(new Request(»actionData.url«))?.then(function(res) {`  · ELEMENT:member-element
  273. L370 `const ackRes = await waitForAck(fileTransferPort, index, »actionData.ackTimeout«);`  · ELEMENT:member-element
  274. L313 `}, »ackTimeout || 10000«);`  · ASSIGN:identifier, ASSIGN:logical-left
  275. L432 `var »findObj = tabIdTriggerCallbackArr[objIndex]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  276. L434 `»findObj.callback«();`  · ELEMENT:member-element-container
  277. L754 `}, »config.closeByTargetUrlDelay || 0«);`  · ELEMENT:member-element, ASSIGN:logical-left
  278. L745 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  279. L747 `action: »action«,`  · ASSIGN:identifier
  280. L746 (→L751) `»                            chrome.tabs.sendMessage(senderTabId, { «`  · ELEMENT:object.setProperty
  281. L748 `actionId: »actionId«,`  · ASSIGN:identifier
  282. L867 `}, »config.closeByTargetUrlDelay || 0«);`  · ELEMENT:member-element, ASSIGN:logical-left
  283. L853 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  284. L855 `action: »action«,`  · ASSIGN:identifier
  285. L854 (→L859) `»                                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  286. L856 `actionId: »actionId«,`  · ASSIGN:identifier
  287. L759 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  288. L761 `action: »action«,`  · ASSIGN:identifier
  289. L760 (→L765) `»                        chrome.tabs.sendMessage(senderTabId, { «`  · ELEMENT:object.setProperty
  290. L762 `actionId: »actionId«,`  · ASSIGN:identifier
  291. L872 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  292. L874 `action: »action«,`  · ASSIGN:identifier
  293. L873 (→L878) `»                            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  294. L875 `actionId: »actionId«,`  · ASSIGN:identifier
  295. L561 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  296. L570 `action: »action«,`  · ASSIGN:identifier
  297. L569 (→L574) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  298. L571 `actionId: »actionId«,`  · ASSIGN:identifier
  299. L615 `action: »action«,`  · ASSIGN:identifier
  300. L614 (→L619) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  301. L616 `actionId: »actionId«,`  · ASSIGN:identifier
  302. L626 `action: »action«,`  · ASSIGN:identifier
  303. L625 (→L630) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  304. L627 `actionId: »actionId«,`  · ASSIGN:identifier
  305. L634 `action: »action«,`  · ASSIGN:identifier
  306. L633 (→L638) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  307. L635 `actionId: »actionId«,`  · ASSIGN:identifier
  308. L652 `action: »action«,`  · ASSIGN:identifier
  309. L651 (→L656) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  310. L653 `actionId: »actionId«,`  · ASSIGN:identifier
  311. L672 `action: »action«,`  · ASSIGN:identifier
  312. L671 (→L676) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  313. L673 `actionId: »actionId«,`  · ASSIGN:identifier
  314. L690 `action: »action«,`  · ASSIGN:identifier
  315. L689 (→L694) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  316. L691 `actionId: »actionId«,`  · ASSIGN:identifier
  317. L732 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  318. L734 `action: »action«,`  · ASSIGN:identifier
  319. L733 (→L738) `»                    chrome.tabs.sendMessage(senderTabId, { «`  · ELEMENT:object.setProperty
  320. L735 `actionId: »actionId«,`  · ASSIGN:identifier
  321. L836 `globalEvent.destory(»data.action + data.actionId«);`  · ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  322. L838 `action: »action«,`  · ASSIGN:identifier
  323. L837 (→L842) `»                        chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  324. L839 `actionId: »actionId«,`  · ASSIGN:identifier
  325. L1003 `action: »action«,`  · ASSIGN:identifier
  326. L1002 (→L1007) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  327. L1004 `actionId: »actionId«,`  · ASSIGN:identifier
  328. L1016 `action: »action«,`  · ASSIGN:identifier
  329. L1015 (→L1020) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  330. L1017 `actionId: »actionId«,`  · ASSIGN:identifier
  331. L1031 `action: »action«,`  · ASSIGN:identifier
  332. L1030 (→L1035) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  333. L1032 `actionId: »actionId«,`  · ASSIGN:identifier
  334. L1072 `action: »action«,`  · ASSIGN:identifier
  335. L1071 (→L1076) `»                    chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  336. L1073 `actionId: »actionId«,`  · ASSIGN:identifier
  337. L1091 `action: »action«,`  · ASSIGN:identifier
  338. L1090 (→L1095) `»            chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  339. L1092 `actionId: »actionId«,`  · ASSIGN:identifier
  340. L1104 (→L1111) `chrome.tabs.query({url: »actionData.url}, function(tabs) {«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  341. L1106 `action: »action«,`  · ASSIGN:identifier
  342. L1105 (→L1110) `»                chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  343. L1107 `actionId: »actionId«,`  · ASSIGN:identifier
  344. L1207 `action: »action«,`  · ASSIGN:identifier
  345. L1206 (→L1211) `»                    chrome.tabs.sendMessage(sender.tab.id, { «`  · ELEMENT:object.setProperty
  346. L1208 `actionId: »actionId«,`  · ASSIGN:identifier

---

## Flow #3 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L532:C8 -> L543:C10 (spans to L543)  `»chrome.cookies.getAll({ domain: actionData.domain }, function(cookies) {«`
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `js/background` L534:C16 -> L534:C79  `»chrome.cookies.remove({url: actionData.url, name: cookie.name})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5 raw steps → 3 distinct lines):
   1. L532 (→L543) `»        chrome.cookies.getAll({ domain: actionData.domain }, function(cookies) {«`  · ELEMENT:object.setProperty
   2. L533 (→L535) `»            cookies.forEach((cookie) => {«`  · ELEMENT:implicit.add
   3. L534 `»chrome.cookies.remove({url: actionData.url, name: cookie.name})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---
