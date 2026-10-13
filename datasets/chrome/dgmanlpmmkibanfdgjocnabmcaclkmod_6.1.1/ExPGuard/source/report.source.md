# Source-level Taint Flow — dgmanlpmmkibanfdgjocnabmcaclkmod 6.1.1

- Source type: CRX
- Files with issues: 4 / 4
- Distinct taint flows: 3  (collapsed from 18 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L197:C0 -> L233:C2 (spans to L233)  `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (jrSecret) — `background` L220:C4 -> L220:C59  `»chrome.storage.sync.set({ jrSecret: request.jrSecret })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L197 (→L233) `»chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[messager->background]`
   2. L220 `»chrome.storage.sync.set({ jrSecret: request.jrSecret })«;`  · ELEMENT:object.setProperty

---

## Flow #2 — STORAGE_ALL_ITEMS (From storage.sync.set('auto-enable-site-list') in options)  ·  16× duplicate paths collapsed

- **Source**: `STORAGE_ALL_ITEMS` — `options` L71:C7 -> L71:C14  `for (»let key« in storage) {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (auto-enable-site-list) — `background` L115:C8 -> L128:C9 (spans to L128)  `»chrome.storage.sync.set(«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2276 raw steps → 96 distinct lines):
   1. L71 _(in `options`)_ `for (»let key« in storage) {`  · ITERATE:loop.iteration
   2. L72 `ti»tle«: "View this page using Just Read",`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L73 _(in `content_script`)_ `// Generate a ran»dom UUID (st«ring)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L62 _(in `options`)_ `for (let i = 0; i < »domains.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
   5. L63 _(in `external-libraries/readability/readability`)_ `this._disableJSONL»D = !!opti«ons.disableJSONLD;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L66 _(in `options`)_ `domainList.value = »domainString«;`  · ASSIGN:identifier
   7. L735 _(in `content_script`)_ `»  // Find the paragraphs with the most words in it«`  · ELEMENT:object.setProperty
   8. L74 `contexts:» ["«page"],`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L75 _(in `external-libraries/readability/readability`)_ `if (node.nodeType == no»de.TEXT_NODE«) {`  · ASSIGN:identifier, ELEMENT:member-element
  10. L741 _(in `options`)_ `const »hideSegments = document.getElementById("hideSegments")«,`  · ELEMENT:object.setProperty
  11. L76 `chrome.runt»ime«.lastError,`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L77 _(in `options`)_ `summaryReplace.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  13. L742 _(in `options`)_ `»summaryReplace = document.getElementById("summaryReplace")«,`  · ELEMENT:object.setProperty
  14. L78 _(in `external-libraries/readability/readability`)_ `let attrP»air«s = Array.from(node.attributes || [], function (attr) {`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L79 _(in `content_script`)_ `(crypto.getRandomValues(n»ew Uint8Arra«y(1))[0] & (15 >> (c / 4)))`  · ASSIGN:identifier, ELEMENT:member-element
  16. L743 _(in `options`)_ `»summaryAutoRun = document.getElementById("summaryAutoRun")«,`  · ELEMENT:object.setProperty
  17. L80 `// Create an »ent«ry to allow user to open a given link using Just read`  · ASSIGN:identifier, ASSIGN:binary-left
  18. L81 _(in `external-libraries/readability/readability`)_ `return `<${node.localName»} ${attrPair«s}>`;`  · ASSIGN:identifier, ELEMENT:member-element
  19. L744 _(in `options`)_ `»openSharedPage = document.getElementById("openSharedPage")«,`  · ELEMENT:object.setProperty
  20. L82 _(in `options`)_ `} else if (»key« === "closeOldPage") {`  · ASSIGN:identifier, ASSIGN:binary-left
  21. L83 `title: "View the linked» page using «Just Read",`  · ASSIGN:identifier, ELEMENT:member-element
  22. L745 _(in `content_script`)_ `»      checkAgainstBlacklist(p, 3) && // Make sure it's« not in our blacklist`  · ELEMENT:object.setProperty
  23. L84 `id: "link»CM"«,`  · ASSIGN:identifier, ASSIGN:binary-left
  24. L85 _(in `external-libraries/readability/readability`)_ `let args = Arra»y.from(argum«ents, (arg) => {`  · ASSIGN:identifier, ELEMENT:member-element
  25. L746 _(in `options`)_ `»pageCM = document.getElementById("pageCM")«,`  · ELEMENT:object.setProperty
  26. L86 _(in `content_script`)_ `Array.from(s.»css«Rules).forEach((rule) => (text += rule.cssText));`  · ASSIGN:identifier, ASSIGN:binary-left
  27. L87 _(in `options`)_ `linkCM.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L747 _(in `options`)_ `»linkCM = document.getElementById("linkCM")«,`  · ELEMENT:object.setProperty
  29. L88 _(in `options`)_ `} else if (»key« === "enable-autorunCM") {`  · ASSIGN:identifier, ASSIGN:binary-left
  30. L89 _(in `options`)_ `autorunCM.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  31. L748 _(in `content_script`)_ `»      //  Make sure it's visible on the regular «page`  · ELEMENT:object.setProperty
  32. L90 `function create»Aut«orunCM() {`  · ASSIGN:identifier, ASSIGN:binary-left
  33. L91 `// Create an entry to al»low user to «open a given link using Just read`  · ASSIGN:identifier, ELEMENT:member-element
  34. L92 `autorunCMId =» ch«rome.contextMenus.create(`  · ASSIGN:identifier, ASSIGN:binary-left
  35. L93 _(in `content_script`)_ `const cssVar = regExp.e»xec(color)[1«];`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  36. L94 `title: "A»dd «this site to Just Read's auto-run list",`  · ASSIGN:identifier, ASSIGN:binary-left
  37. L95 _(in `content_script`)_ `return computedStyl»es.getProper«tyValue(cssVar);`  · ASSIGN:identifier, ELEMENT:member-element
  38. L96 `contexts:» ["«page"],`  · ASSIGN:identifier, ASSIGN:binary-left
  39. L97 _(in `external-libraries/readability/readability`)_ `return x && x.»nodeName ? l«ogNode(x) : x;`  · ASSIGN:identifier, ELEMENT:member-element
  40. L98 `chrome.runt»ime«.lastError,`  · ASSIGN:identifier, ASSIGN:binary-left
  41. L99 _(in `options`)_ `addOrigURL.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  42. L100 _(in `content_script`)_ `///////////////»///«///////////////////`  · ASSIGN:identifier, ASSIGN:binary-left
  43. L101 _(in `options`)_ `addTimeEstimate.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  44. L102 (→L137) `chrome.storag»e.sync.get("auto-enable-site-list", function (result) {«`  · ASSIGN:identifier, ASSIGN:binary-left, STORAGE:STORAGE_FLOW[area: sync, key: auto-enable-site-list, sender: options, receiver: background]
  45. L103 `let url = new URL((info »!= null && i«nfo.pageUrl) || tab.url);`  · ASSIGN:identifier, ELEMENT:member-element
  46. L749 _(in `content_script`)_ `»      const myInnerText = p.innerText.match(/\S+/g);«`  · ELEMENT:object.setProperty
  47. L104 _(in `content_script`)_ `// User-selecte»d t«ext functionality`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L105 `if (url.pathname !== "/»" && url.pat«hname !== "") {`  · ASSIGN:identifier, ELEMENT:member-element
  49. L750 _(in `options`)_ `»autoscroll = document.getElementById("autoscroll")«,`  · ELEMENT:object.setProperty
  50. L106 `entry = u»rl.«hostname + "/.+";`  · ASSIGN:identifier, ASSIGN:binary-left
  51. L107 _(in `options`)_ `scrollSpeed.value = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  52. L751 _(in `options`)_ `»scrollSpeed = document.querySelector("[name='scrollSpeed']")«;`  · ELEMENT:object.setProperty
  53. L108 `entry = u»rl.«hostname;`  · ASSIGN:identifier, ASSIGN:binary-left
  54. L109 _(in `options`)_ `domainSelectors.value = »JSON.stringify(storage[key], null, 4)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  55. L736 _(in `options`)_ `»domainSelectors = document.querySelector(".domainSelectors")«,`  · ELEMENT:object.setProperty
  56. L110 _(in `external-libraries/readability/readability`)_ `FLAG_WEIGHT_C»LAS«SES: 0x2,`  · ASSIGN:identifier, ASSIGN:binary-left
  57. L111 `let currentDomains = result[»"auto-enable«-site-list"];`  · ASSIGN:identifier, ELEMENT:member-element
  58. L737 _(in `options`)_ `»summarizerOptions = document.getElementById("summarizerOptions")«;`  · ELEMENT:object.setProperty
  59. L112 _(in `content_script`)_ `if (las»t !«= null) {`  · ASSIGN:identifier, ASSIGN:binary-left
  60. L113 `if (!isEmpty(»currentDomains«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  61. L114 `if (»!currentDomains.includes(entry)«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  62. L117 `"au»to-enable-site-list": [...currentDomains«, entry],`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:array-spread
  63. L116 _(in `options`)_ `jrSecret = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  64. L118 _(in `external-libraries/readability/readability`)_ `DEFAULT_MAX_ELEM»S_TO_PARSE: «0,`  · ASSIGN:identifier, ELEMENT:member-element
  65. L119 `funct»ion« () {`  · ASSIGN:identifier, ASSIGN:binary-left
  66. L120 `if (»currentDomains.indexOf(url.hostname)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  67. L121 _(in `external-libraries/readability/readability`)_ `// tight the »competition is amon«g candidates.`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  68. L123 _(in `options`)_ `stylesheetObj[»key.substring(3)] = storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L45 `»      "/external-l«ibraries/Rangy/rangy-highlighter.min.js",`  · ELEMENT:object.setProperty
  70. L298 (→L300) _(in `external-libraries/readability/readability`)_ `»  throw new Error("Do not pass live node lists to _removeNodes");«`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  71. L300 _(in `content_script`)_ `// R»EMOVE WHEN SWITCHING TO CS«S SCROLL ANIMATION FOR SCROLLBAR`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  72. L299 (→L300) `»});«`  · ASSIGN:logical-right
  73. L331 _(in `options`)_ `currTheme = »currTheme || defaultStylesheet«;`  · ASSIGN:identifier, ASSIGN:logical-left
  74. L335 _(in `external-libraries/readability/readability`)_ `* @p»aram  NodeList« nodeList The NodeList.`  · ITERATE:loop.iteration
  75. L340 _(in `content_script`)_ `»simpleArticleIframe.quer«ySelector(".simple-comments").innerHTML`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  76. L380 _(in `content_script`)_ `cons»t ltrChar«s =`  · ASSIGN:identifier
  77. L345 _(in `external-libraries/readability/readability`)_ `* the supplied te»st functio«n`  · ASSIGN:identifier
  78. L348 _(in `options`)_ `if (»stylesheet === defaultStylesheet || stylesheet === darkStylesheet«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  79. L354 _(in `external-libraries/readability/readability`)_ `_findN»ode: function (nodeList,« fn) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  80. L358 _(in `options`)_ `stylesheetObj[fileName] === undefined ? "" : »stylesheetObj[fileName]«,`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  81. L309 `chrome.runtime».lastErr«or,`  · ASSIGN:identifier
  82. L304 (→L323) `»    {«`  · ELEMENT:object.setProperty
  83. L308 (→L310) `»    },«`  · RETURN:json.stringify
  84. L130 `» console.error«(`  · ITERATE:loop.iteration
  85. L132 _(in `external-libraries/readability/readability`)_ `//» All of the regular expressions in use within reada«bility.`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member-element-container, ELEMENT:implicit.add
  86. L131 `»"Entry a«lready exists inside of Just Read's auto-run list. Not adding new entry.",`  · ELEMENT:object.setProperty
  87. L182 _(in `content_script`)_ `e»lem.tagName !== "path" «&&`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  88. L205 _(in `options`)_ `stylesheetObj[fileNameInput.value] = »stylesheetObj[liItem.innerText]«;`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  89. L260 _(in `options`)_ `stylesheetObj[fileName] === undefined ? "" : »stylesheetObj[fileName]«,`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  90. L508 _(in `options`)_ `const domainLine = »domainList.value.split("\n").filter(String)«;`  · ELEMENT:member-element, RETURN:fallback-return
  91. L509 _(in `options`)_ `»chrome.storage.sync.set({ "auto-enable-site-list": domainLine })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  92. L514 _(in `options`)_ `»chrome.storage.sync.set({ "summarizer-options": summarizerOptions.value })«;`  · ELEMENT:object.setProperty
  93. L520 _(in `options`)_ `const domainSelectorArr = »JSON.parse(domainSelectors.value)«;`  · RETURN:json.parse
  94. L521 _(in `options`)_ `»chrome.storage.sync.set({ domainSelectors: domainSelectorArr })«;`  · ELEMENT:object.setProperty
  95. L2 `if (»obj) return Object.keys(obj«).length === 0;`  · ASSIGN:identifier
  96. L115 (→L128) `»        chrome.storage.sync.set(«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add

---

## Flow #3 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `options` L71:C7 -> L71:C14  `for (»let key« in storage) {`
- **Sink(s)**:
  - `FETCH_BODY` (https://justread.link/checkPremium) — `options` L304:C4 -> L311:C6 (spans to L311)  `»fetch(jrDomain + "checkPremium", {«`
  - `CHROME_SYNC_STORAGE` (jr-unknown) — `options` L133:C4 -> L147:C6 (spans to L147)  `»chrome.storage.sync.set(obj, function () {«`
  - `CHROME_SYNC_STORAGE` (unknown) — `options` L133:C4 -> L147:C6 (spans to L147)  `»chrome.storage.sync.set(obj, function () {«`
  - `CHROME_SYNC_STORAGE` (auto-enable-site-list) — `options` L509:C4 -> L509:C68  `»chrome.storage.sync.set({ "auto-enable-site-list": domainLine })«;`
  - `CHROME_SYNC_STORAGE` (summarizer-options) — `options` L514:C4 -> L514:C78  `»chrome.storage.sync.set({ "summarizer-options": summarizerOptions.value })«;`
  - `CHROME_SYNC_STORAGE` (domainSelectors) — `options` L521:C6 -> L521:C69  `»chrome.storage.sync.set({ domainSelectors: domainSelectorArr })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1915 raw steps → 94 distinct lines):
   1. L71 `for (»let key« in storage) {`  · ITERATE:loop.iteration
   2. L72 `if (»key« === "auto-enable-site-list") {`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L73 `setDomains(»storage[key]«);`  · ASSIGN:identifier, ELEMENT:member-element
   4. L62 `for (let i = 0; i < »domains.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
   5. L63 `domainString += »domains[i]« + "\n";`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L66 `domainList.value = »domainString«;`  · ASSIGN:identifier
   7. L735 `»domainList = document.getElementById("domainList")«,`  · ELEMENT:object.setProperty
   8. L74 `} else if (»key« === "hideSegments") {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L75 `hideSegments.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  10. L741 `const »hideSegments = document.getElementById("hideSegments")«,`  · ELEMENT:object.setProperty
  11. L76 `} else if (»key« === "summaryReplace") {`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L77 `summaryReplace.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  13. L742 `»summaryReplace = document.getElementById("summaryReplace")«,`  · ELEMENT:object.setProperty
  14. L78 `} else if (»key« === "summaryAutoRun") {`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L79 `summaryAutoRun.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  16. L743 `»summaryAutoRun = document.getElementById("summaryAutoRun")«,`  · ELEMENT:object.setProperty
  17. L80 `} else if (»key« === "openSharedPage") {`  · ASSIGN:identifier, ASSIGN:binary-left
  18. L81 `openSharedPage.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  19. L744 `»openSharedPage = document.getElementById("openSharedPage")«,`  · ELEMENT:object.setProperty
  20. L82 `} else if (»key« === "closeOldPage") {`  · ASSIGN:identifier, ASSIGN:binary-left
  21. L83 `closeOldPage.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  22. L745 `»closeOldPage = document.getElementById("closeOldPage")«,`  · ELEMENT:object.setProperty
  23. L84 `} else if (»key« === "enable-pageCM") {`  · ASSIGN:identifier, ASSIGN:binary-left
  24. L85 `pageCM.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  25. L746 `»pageCM = document.getElementById("pageCM")«,`  · ELEMENT:object.setProperty
  26. L86 `} else if (»key« === "enable-linkCM") {`  · ASSIGN:identifier, ASSIGN:binary-left
  27. L87 `linkCM.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L747 `»linkCM = document.getElementById("linkCM")«,`  · ELEMENT:object.setProperty
  29. L88 `} else if (»key« === "enable-autorunCM") {`  · ASSIGN:identifier, ASSIGN:binary-left
  30. L89 `autorunCM.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  31. L748 `»autorunCM = document.getElementById("autorunCM")«,`  · ELEMENT:object.setProperty
  32. L90 `} else if (»key« === "scrollbar") {`  · ASSIGN:identifier, ASSIGN:binary-left
  33. L91 `scrollbar.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  34. L92 `} else if (»key« === "remove-orig-content") {`  · ASSIGN:identifier, ASSIGN:binary-left
  35. L93 `removeOrig.checked = »storage[key]« !== false;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  36. L94 `} else if (»key« === "backup") {`  · ASSIGN:identifier, ASSIGN:binary-left
  37. L95 `backup.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  38. L96 `} else if (»key« === "leave-pres") {`  · ASSIGN:identifier, ASSIGN:binary-left
  39. L97 `leavePres.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  40. L98 `} else if (»key« === "addOrigURL") {`  · ASSIGN:identifier, ASSIGN:binary-left
  41. L99 `addOrigURL.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  42. L100 `} else if (»key« === "addTimeEstimate") {`  · ASSIGN:identifier, ASSIGN:binary-left
  43. L101 `addTimeEstimate.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  44. L102 `} else if (»key« === "alwaysAddAR") {`  · ASSIGN:identifier, ASSIGN:binary-left
  45. L103 `alwaysAddAR.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  46. L749 `»alwaysAddAR = document.getElementById("alwaysAddAR")«,`  · ELEMENT:object.setProperty
  47. L104 `} else if (»key« === "autoscroll") {`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L105 `autoscroll.checked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  49. L750 `»autoscroll = document.getElementById("autoscroll")«,`  · ELEMENT:object.setProperty
  50. L106 `} else if (»key« === "scroll-speed") {`  · ASSIGN:identifier, ASSIGN:binary-left
  51. L107 `scrollSpeed.value = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  52. L751 `»scrollSpeed = document.querySelector("[name='scrollSpeed']")«;`  · ELEMENT:object.setProperty
  53. L108 `} else if (»key« === "domainSelectors") {`  · ASSIGN:identifier, ASSIGN:binary-left
  54. L109 `domainSelectors.value = »JSON.stringify(storage[key], null, 4)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  55. L736 `»domainSelectors = document.querySelector(".domainSelectors")«,`  · ELEMENT:object.setProperty
  56. L110 `} else if (»key« === "summarizer-options") {`  · ASSIGN:identifier, ASSIGN:binary-left
  57. L111 `summarizerOptions.value = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  58. L737 `»summarizerOptions = document.getElementById("summarizerOptions")«;`  · ELEMENT:object.setProperty
  59. L112 `} else if (»key« === "currentTheme") {`  · ASSIGN:identifier, ASSIGN:binary-left
  60. L113 `currTheme = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  61. L114 `} else if (»key« === "jrSecret") {`  · ASSIGN:identifier, ASSIGN:binary-left
  62. L117 `} else if (»key« === "isPremium") {`  · ASSIGN:identifier, ASSIGN:binary-left
  63. L116 `jrSecret = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  64. L118 `isPremium = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  65. L119 `} else if (»key« === "jrLastChecked") {`  · ASSIGN:identifier, ASSIGN:binary-left
  66. L120 `jrLastChecked = »storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element
  67. L121 `} else if (»key.substring(0, 3)« === "jr-") {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  68. L123 `stylesheetObj[»key.substring(3)] = storage[key]«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L45 `»stylesheetObj = {}«,`  · ELEMENT:object.setProperty
  70. L298 (→L300) `»jrSecret &&«`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  71. L300 `»Date.now() - jrLastChecked« > 86400000)`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  72. L299 (→L300) `»    (typeof jrLastChecked === "undefined" ||«`  · ASSIGN:logical-right
  73. L331 `currTheme = »currTheme || defaultStylesheet«;`  · ASSIGN:identifier, ASSIGN:logical-left
  74. L335 `for (»let stylesheet« in stylesheetObj) {`  · ITERATE:loop.iteration
  75. L340 `if (»stylesheet === currTheme«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  76. L380 `if (»isPremium«) {`  · ASSIGN:identifier
  77. L345 `li.innerText += »stylesheet«;`  · ASSIGN:identifier
  78. L348 `if (»stylesheet === defaultStylesheet || stylesheet === darkStylesheet«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  79. L354 `if (»stylesheet === currTheme«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  80. L358 `stylesheetObj[fileName] === undefined ? "" : »stylesheetObj[fileName]«,`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  81. L309 `jrSecret: »jrSecret«,`  · ASSIGN:identifier
  82. L304 (→L323) `»    fetch(jrDomain + "checkPremium", {«`  · ELEMENT:object.setProperty
  83. L308 (→L310) `»      body: JSON.stringify({«`  · RETURN:json.stringify
  84. L130 `for (»let stylesheet« in stylesheetObj) {`  · ITERATE:loop.iteration
  85. L132 `»obj["jr-" + stylesheet] = stylesheetObj[stylesheet]«;`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member-element-container, ELEMENT:implicit.add
  86. L131 `const »obj = {}«;`  · ELEMENT:object.setProperty
  87. L182 `while (»stylesheetObj[tempName]«)`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  88. L205 `stylesheetObj[fileNameInput.value] = »stylesheetObj[liItem.innerText]«;`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  89. L260 `stylesheetObj[fileName] === undefined ? "" : »stylesheetObj[fileName]«,`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  90. L508 `const domainLine = »domainList.value.split("\n").filter(String)«;`  · ELEMENT:member-element, RETURN:fallback-return
  91. L509 `»chrome.storage.sync.set({ "auto-enable-site-list": domainLine })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  92. L514 `»chrome.storage.sync.set({ "summarizer-options": summarizerOptions.value })«;`  · ELEMENT:object.setProperty
  93. L520 `const domainSelectorArr = »JSON.parse(domainSelectors.value)«;`  · RETURN:json.parse
  94. L521 `»chrome.storage.sync.set({ domainSelectors: domainSelectorArr })«;`  · ELEMENT:object.setProperty

---
