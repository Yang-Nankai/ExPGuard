# Source-level Taint Flow — {21368c2e-1e43-414c-9c63-e1b87782681f} 1.8.2

- Source type: XPI
- Files with issues: 2 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L30:C12 -> L30:C31  `if (»message.data.target« !== 'ext') {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `content` L59:C8 -> L59:C59  `»window.postMessage(message, window.location.origin)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (16 raw steps → 3 distinct lines):
   1. L30 `if (»message.data.target« !== 'ext') {`  · ELEMENT:member-element, ASSIGN:binary-left
   2. L43 (→L60) `»    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->content]`
   3. L54 `if (»message.target« !== 'app') {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L704:C0 -> L956:C2 (spans to L956)  `»chrome.runtime.onMessage.addListener(async (message, sender) => {«`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (unknown) — `background` L796:C12 -> L796:C75  `»chrome.storage.session.set({ [previewId]: message.previewURL })«;`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L1032:C10 -> L1042:C6 (spans to L1042)  `await »chrome.declarativeNetRequest.updateSessionRules({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L608:C35 -> L608:C51  `const response = await »fetch(scriptUrl)«;`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L918:C34 -> L918:C102  `fetchResponse = await »fetch(message.url, message.fetchOptions ? message.fetchOptions : {})«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9103 raw steps → 124 distinct lines):
   1. L704 (→L956) `»chrome.runtime.onMessage.addListener(async (message, sender) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L705 `log('Background.js received message from content script:', »message«);`  · ASSIGN:identifier
   3. L719 `if (»message.target« !== 'ext') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L723 `if (»message.event« === 'UPDATE_OPTIONS') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L724 `extensionOptions[»message.optionName] = message.optionVal«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L22 (→L25) `»const extensionOptions = {«`  · ELEMENT:object.setProperty
   7. L728 `if (»message.event« === 'START_DOWNLOAD') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L742 `if (»message.event« === 'START_BATCH_DOWNLOAD') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   9. L738 `downloadLinks(»message«);`  · ASSIGN:identifier
  10. L226 `const links = »message.links«;`  · ASSIGN:identifier, ELEMENT:member-element
  11. L228 `if (»!links«) {`  · ASSIGN:identifier, ASSIGN:unary
  12. L233 `if (»!links.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:unary
  13. L238 `if (»links[links.length - 1].url« === 'exceeded') {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container
  14. L244 `const isSingle = »message.event« === 'START_DOWNLOAD';`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L247 `const createFolder = »(isSingle && extensionOptions.btDlFolder) || (!isSingle && extensionOptions.btDlAllFolder)«;`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:unary, ASSIGN:logical-right
  16. L253 `if (»message.extActions && message.extActions.headers«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  17. L254 `if (»message.extActions.headers.download && message.extActions.headers.download.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  18. L260 `} else if (»message.extActions.headers.both && message.extActions.headers.both.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  19. L256 `for (»const index in message.extActions.headers.download«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  20. L257 `decodeCookies(»message.extActions.headers.download[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  21. L963 `if (»headersObj.action && headersObj.action.requestHeaders«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  22. L964 `for (»const key in headersObj.action.requestHeaders«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  23. L965 `if (»headersObj.action.requestHeaders[key].header« === 'cookie') {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container, ASSIGN:binary-left
  24. L967 `»headersObj.action.requestHeaders[key].value«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  25. L966 (→L968) `»headersObj.action.requestHeaders[key].value = decodeURIComponent(«`  · RETURN:decodeURIComponent, ASSIGN:identifier
  26. L262 `for (»const index in message.extActions.headers.both«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  27. L258 `headerObjArr.push(»message.extActions.headers.download[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  28. L252 `const »headerObjArr = []«;`  · ELEMENT:object.setProperty
  29. L263 `decodeCookies(»message.extActions.headers.both[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  30. L264 `headerObjArr.push(»message.extActions.headers.both[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  31. L764 `if (»message.event« === 'STOP_BATCH_DOWNLOAD') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  32. L784 `if (»message.event« === 'PREVIEW') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L753 `activeBatchTabUUID = »message.tabUUID«;`  · ASSIGN:identifier, ELEMENT:member-element
  34. L768 `if (»activeBatchTabUUID«) {`  · ASSIGN:identifier
  35. L786 `let tabUrl = »message.previewURL«;`  · ASSIGN:identifier, ELEMENT:member-element
  36. L743 `if (»activeBatchTabUUID«) {`  · ASSIGN:identifier
  37. L754 `remainingLinksUI = »message.links.length«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length
  38. L772 `tabUUID: »activeBatchTabUUID«,`  · ASSIGN:identifier
  39. L769 (→L775) `»            chrome.tabs.sendMessage(sender.tab.id, {«`  · ELEMENT:object.setProperty
  40. L773 `remainingLinks: »remainingLinksUI«,`  · ASSIGN:identifier
  41. L789 (→L791) `»message.player === 'true' ||«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  42. L790 `(»message.extActions && message.extActions.playerPreview«) ||`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  43. L791 `»message.linkType« === 'raw'`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  44. L850 `if (»isPrivate && message.type === 'ext-fetch'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right
  45. L747 `tabUUID: »activeBatchTabUUID«,`  · ASSIGN:identifier
  46. L744 (→L748) `»            chrome.tabs.sendMessage(sender.tab.id, {«`  · ELEMENT:object.setProperty
  47. L755 `activeMessage = »message«;`  · ASSIGN:identifier
  48. L851 `»message«.type = 'ext-tab';`  · ASSIGN:identifier
  49. L857 `if (»message.type« === 'ext-fetch') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  50. L757 `log('Active tabUUID:', »activeBatchTabUUID«);`  · ASSIGN:identifier
  51. L795 `tabUrl = chrome.runtime.getURL(»`player.html?data=${message.linkType}&previewId=${previewId}`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  52. L801 `if (»message.extActions && message.extActions.headers«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  53. L852 `»message«['headers'] = {};`  · ASSIGN:identifier
  54. L862 `tabUUID: »message.tabUUID«,`  · ASSIGN:identifier, ELEMENT:member-element
  55. L859 (→L866) `»        const pageObj = {«`  · ELEMENT:object.setProperty
  56. L863 `url: »message.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  57. L941 `if (»message.type« === 'ext-tab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  58. L796 `»chrome.storage.session.set({ [previewId]: message.previewURL })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  59. L802 `if (»message.extActions.headers.preview && message.extActions.headers.preview.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  60. L853 `»message«['actions'] = [];`  · ASSIGN:identifier
  61. L942 `const pageObj = await openTab(»message«);`  · ASSIGN:identifier
  62. L466 `tabUUID: »message.tabUUID«,`  · ASSIGN:identifier, ELEMENT:member-element
  63. L461 (→L479) `»        const defaultResponse = [«`  · ELEMENT:object.setProperty
  64. L467 `url: »message.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  65. L476 `windowURL: »message.windowURL«,`  · ASSIGN:identifier, ELEMENT:member-element
  66. L485 `log('Received headers:', »message.headers«);`  · ASSIGN:identifier, ELEMENT:member-element
  67. L487 `for (»const headerObj of message.headers«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  68. L488 `»headerObj«.condition['tabIds'] = [tab.id];`  · ASSIGN:identifier
  69. L504 `»await chrome.tabs.update(tab.id, { url: message.url, active: false })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  70. L490 `const headerInfo = await setHeaders(»headerObj.action, headerObj.condition«);`  · ASSIGN:identifier, ELEMENT:member-element
  71. L996 `if (»!action || !condition«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  72. L1002 `sanitizeHeaders(»action.requestHeaders«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  73. L1077 `if (Array.isArray(»headerArr«)) {`  · ASSIGN:identifier
  74. L1078 `for (let i = »headerArr.length - 1; i >= 0; i--«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:update
  75. L1079 `const »item = headerArr[i]«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:implicit.add
  76. L1080 `if (typeof item?.header === 'string' && DISALLOWED_HEADERS.has(»item.header.toLowerCase()«)) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member-element-container
  77. L1081 `»headerArr.splice(i, 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member-element-container
  78. L1003 `sanitizeHeaders(»action.responseHeaders«);`  · ASSIGN:identifier, ELEMENT:member-element
  79. L1006 `const »jsonString = JSON.stringify({ action, condition })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, RETURN:json.stringify
  80. L1007 `const headerUUID = hash(»jsonString«);`  · ASSIGN:identifier
  81. L1028 `log('Set headers (action):', »action«);`  · ASSIGN:identifier
  82. L1029 `log('Set headers (condition):', »condition«);`  · ASSIGN:identifier
  83. L1037 `»action«,`  · ASSIGN:identifier
  84. L1032 (→L1042) `»    await chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  85. L1038 `»condition«,`  · ASSIGN:identifier
  86. L592 `args: [»message«],`  · ASSIGN:identifier
  87. L586 (→L593) `»        injectionResult = await ensureExecuteScript({«`  · ELEMENT:object.setProperty
  88. L590 `document.LLPage = »message«;`  · ASSIGN:identifier
  89. L601 `if (»message.actions.script«) {`  · ASSIGN:identifier, ELEMENT:member-element
  90. L604 `const »scriptUrl = new URL(`${message.actions.script}.js`, baseFolderUrl).href«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container
  91. L605 `log('Script to fetch:', »scriptUrl«);`  · ASSIGN:identifier
  92. L608 `const response = await fetch(»scriptUrl«);`  · ASSIGN:identifier
  93. L760 `downloadLinks(»activeMessage«);`  · ASSIGN:identifier
  94. L803 `for (»const index in message.extActions.headers.preview«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  95. L807 `} else if (»message.extActions.headers.both && message.extActions.headers.both.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  96. L854 `»message«['xhr'] = [];`  · ASSIGN:identifier
  97. L872 `if (»message.fetchOptions.headers && Object.keys(message.fetchOptions.headers)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  98. L804 `decodeCookies(»message.extActions.headers.preview[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  99. L808 `for (»const index in message.extActions.headers.both«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  100. L873 `for (const [key, val] of Object.entries(»message.fetchOptions.headers«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  101. L949 `? »pageObj[0]?.result«`  · ELEMENT:member-element-container
  102. L950 `: »{ event: 'PRE_EXTRACTION', target: 'app', tabUUID: message.tabUUID, html: '' }«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-alternate
  103. L946 (→L951) `»        chrome.tabs.sendMessage(«`  · ELEMENT:object.setProperty
  104. L805 `headerObjArr.push(»message.extActions.headers.preview[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  105. L800 `const »headerObjArr = []«;`  · ELEMENT:object.setProperty
  106. L809 `decodeCookies(»message.extActions.headers.both[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  107. L883 `if (»message.fetchOptions.referrer«) {`  · ASSIGN:identifier, ELEMENT:member-element
  108. L810 `headerObjArr.push(»message.extActions.headers.both[index]«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  109. L887 `value: »message.fetchOptions.referrer«,`  · ASSIGN:identifier, ELEMENT:member-element
  110. L884 (→L888) `»            requestHeaders.push({«`  · ELEMENT:object.setProperty
  111. L869 `let »requestHeaders = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  112. L892 `if (»message.fetchOptions.referrerPolicy«) {`  · ASSIGN:identifier, ELEMENT:member-element
  113. L896 `value: »message.fetchOptions.referrerPolicy«,`  · ASSIGN:identifier, ELEMENT:member-element
  114. L893 (→L897) `»requestHeaders.push({«`  · ELEMENT:object.setProperty, ELEMENT:member-element-container
  115. L820 `for (»const headerObj« of headerObjArr) {`  · ITERATE:loop.iteration
  116. L902 `if (»requestHeaders.length«) {`  · ELEMENT:member.length
  117. L821 `»headerObj«.condition['tabIds'] = [tab.id];`  · ASSIGN:identifier
  118. L903 (→L912) `»            headerInfo = await setHeaders(«`  · ELEMENT:object.setProperty
  119. L910 `urlFilter: »`|${message.url}|`«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  120. L823 `const headerInfo = await setHeaders(»headerObj.action, headerObj.condition«);`  · ASSIGN:identifier, ELEMENT:member-element
  121. L918 `fetchResponse = await fetch(»message.url, message.fetchOptions ? message.fetchOptions« : {});`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  122. L107 `»remainingLinksUI--«;`  · ASSIGN:identifier, ASSIGN:update
  123. L654 `»message«['doNotReFetch'] = true;`  · ASSIGN:identifier
  124. L657 `resolve(await openTab(»message«));`  · ASSIGN:identifier

---
