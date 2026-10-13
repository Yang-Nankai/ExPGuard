# Source-level Taint Flow — bnofologaglcigfnbljobhnglbaicmci 1.0.1

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 6  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content-script` L71:C17 -> L71:C40  `if (event && »event.data.textSpeecher«) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (defaultSpeed) — `js/content-script` L93:C10 -> L95:C12 (spans to L95)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (voiceParams) — `js/content-script` L108:C10 -> L113:C12 (spans to L113)  `»chrome.storage.local.set({«`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L80:C12 -> L89:C14 (spans to L89)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (53 raw steps → 12 distinct lines):
   1. L71 `if (»event && event.data.textSpeecher«) {`  · ELEMENT:member-element, ASSIGN:logical-right
   2. L72 `switch (»event.data.message«) {`  · ELEMENT:member-element
   3. L94 `defaultSpeed: »event.data.speed«`  · ELEMENT:member-element
   4. L93 (→L95) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   5. L76 `for (let i = 0; i < »event.data.props.length«; i++) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-right
   6. L77 `resources.push(chrome.runtime.getURL(»event.data.props[i]«));`  · ELEMENT:member-element
   7. L110 `voice: »event.data.params.voice«,`  · ELEMENT:member-element
   8. L108 (→L113) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   9. L111 `lang: »event.data.params.lang«`  · ELEMENT:member-element
  10. L116 `chrome.i18n.detectLanguage(»event.data.text«).then(data => {`  · ELEMENT:member-element
  11. L88 `type: »event.data.type«`  · ELEMENT:member-element
  12. L80 (→L89) `»            window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('defaultSpeed') in js/content-script)

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content-script` L71:C17 -> L71:C40  `if (event && »event.data.textSpeecher«) {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L132:C12 -> L136:C14 (spans to L136)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (55 raw steps → 14 distinct lines):
   1. L71 `if (»event && event.data.textSpeecher«) {`  · ELEMENT:member-element, ASSIGN:logical-right
   2. L72 `switch (»event.data.message«) {`  · ELEMENT:member-element
   3. L94 `defaultSpeed: »event.data.speed«`  · ELEMENT:member-element
   4. L93 (→L95) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   5. L76 `for (let i = 0; i < »event.data.props.length«; i++) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-right
   6. L77 `resources.push(chrome.runtime.getURL(»event.data.props[i]«));`  · ELEMENT:member-element
   7. L110 `voice: »event.data.params.voice«,`  · ELEMENT:member-element
   8. L108 (→L113) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   9. L111 `lang: »event.data.params.lang«`  · ELEMENT:member-element
  10. L116 `chrome.i18n.detectLanguage(»event.data.text«).then(data => {`  · ELEMENT:member-element
  11. L88 `type: »event.data.type«`  · ELEMENT:member-element
  12. L80 (→L89) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  13. L131 (→L137) `»          chrome.storage.local.get(['defaultSpeed'], async storage => {«`  · STORAGE:STORAGE_FLOW[area: local, key: defaultSpeed, sender: js/content-script, receiver: js/content-script]
  14. L132 (→L136) `»            window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.local.set('voiceParams') in js/content-script)

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/content-script` L71:C17 -> L71:C40  `if (event && »event.data.textSpeecher«) {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/content-script` L141:C12 -> L145:C14 (spans to L145)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (55 raw steps → 14 distinct lines):
   1. L71 `if (»event && event.data.textSpeecher«) {`  · ELEMENT:member-element, ASSIGN:logical-right
   2. L72 `switch (»event.data.message«) {`  · ELEMENT:member-element
   3. L94 `defaultSpeed: »event.data.speed«`  · ELEMENT:member-element
   4. L93 (→L95) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   5. L76 `for (let i = 0; i < »event.data.props.length«; i++) {`  · ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-right
   6. L77 `resources.push(chrome.runtime.getURL(»event.data.props[i]«));`  · ELEMENT:member-element
   7. L110 `voice: »event.data.params.voice«,`  · ELEMENT:member-element
   8. L108 (→L113) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   9. L111 `lang: »event.data.params.lang«`  · ELEMENT:member-element
  10. L116 `chrome.i18n.detectLanguage(»event.data.text«).then(data => {`  · ELEMENT:member-element
  11. L88 `type: »event.data.type«`  · ELEMENT:member-element
  12. L80 (→L89) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  13. L140 (→L146) `»          chrome.storage.local.get(['voiceParams'], async storage => {«`  · STORAGE:STORAGE_FLOW[area: local, key: voiceParams, sender: js/content-script, receiver: js/content-script]
  14. L141 (→L145) `»            window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #4 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/widget` L3734:C14 -> L3740:C9 (spans to L3740)  `const »reportObj = {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://speechit.pro/issue) — `js/widget` L3741:C8 -> L3747:C10 (spans to L3747)  `»fetch('https://speechit.pro/issue', {«`
- **Sanitized**: NO
- **Frame**: `MAIN_js_widget`

- **Propagation** (3 raw steps → 3 distinct lines):
   1. L3734 (→L3740) `»        const reportObj = {«`  · ELEMENT:object.setProperty
   2. L3746 `body: »JSON.stringify(reportObj)«`  · RETURN:json.stringify
   3. L3741 (→L3747) `»        fetch('https://speechit.pro/issue', {«`  · ELEMENT:object.setProperty

---

## Flow #5 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/widget` L3843:C10 -> L3843:C30  `if (»event.data.forWidget«) {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/widget` L3499:C14 -> L3506:C16 (spans to L3506)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `MAIN_js_widget`

- **Propagation** (1901 raw steps → 118 distinct lines):
   1. L3843 `if (»event.data.forWidget«) {`  · ELEMENT:member-element
   2. L3844 `if (»event.data.type === 'start' && event.data.message === 'sendResources'«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L3845 `const [»back, backMore, next, nextMore, minimize, close, drag, widgetIcon, play, pause] = event.data.resources«;`  · ELEMENT:member-element, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1], ELEMENT:destructure-element[2], ELEMENT:destructure-element[3], ELEMENT:destructure-element[4], ELEMENT:destructure-element[5], ELEMENT:destructure-element[6], ELEMENT:destructure-element[7], ELEMENT:destructure-element[8], ELEMENT:destructure-element[9]
   4. L3869 `switch (»event.data.message«) {`  · ELEMENT:member-element
   5. L3847 `»avatarsVersion«,`  · ELEMENT:destructure-property[avatarsVersion]
   6. L3848 `»avatarsLastUpdate«,`  · ELEMENT:destructure-property[avatarsLastUpdate]
   7. L3849 `»extVer«`  · ELEMENT:destructure-property[extVer]
   8. L3871 `defaultSpeed = »event.data.speed«;`  · ELEMENT:member-element
   9. L3851 `avatars = »event.data.avatars«;`  · ELEMENT:member-element
  10. L3872 `setBaseSpeed(»event.data.speed«);`  · ELEMENT:member-element
  11. L2668 `document.querySelector('.shadowRootSpeecher').shadowRoot.querySelector('.speed').innerHTML = »speed« + 'x';`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L3852 `widgetIconPath = »widgetIcon«;`  · ASSIGN:identifier
  13. L3853 `svgPlay = »play«;`  · ASSIGN:identifier
  14. L3182 `shadowElem.shadowRoot.querySelector('.playPauseIcon').src = »svgPlay«;`  · ASSIGN:identifier
  15. L3126 `plannedTime = (selectedText.split(' ').length / (130 / 60) + (selectedText.match(/\./g) ? selectedText.match(/\./g).length * 2 : 0)) / (»rate ? rate : defaultSpeed«);`  · ASSIGN:identifier, ASSIGN:binary-right
  16. L3127 `timeLeft = »plannedTime«;`  · ASSIGN:identifier
  17. L3886 `lang: »event.data.params.lang«,`  · ELEMENT:member-element
  18. L3885 (→L3888) `»            setVoiceParams({«`  · ELEMENT:object.setProperty
  19. L3887 `voice: »event.data.params.voice«`  · ELEMENT:member-element
  20. L2635 (→L2638) `»  const defaultVoiceParams = {«`  · ELEMENT:object.setProperty
  21. L2824 `name: »props.voice.name«,`  · ELEMENT:member-element
  22. L2823 (→L2829) `»    const voiceObj = {«`  · ELEMENT:object.setProperty
  23. L2825 `lang: »props.voice.lang«,`  · ELEMENT:member-element
  24. L2826 `default: »props.voice.default«,`  · ELEMENT:member-element
  25. L2827 `localService: »props.voice.localService«,`  · ELEMENT:member-element
  26. L2828 `voiceURI: »props.voice.voiceURI«`  · ELEMENT:member-element
  27. L2830 `»props.voice« !== 'any' ? defaultVoiceParams.voice = voiceObj : defaultVoiceParams.voice = 'any';`  · ASSIGN:binary-left
  28. L2836 `if (»defaultVoiceParams.lang« !== 'auto') {`  · ASSIGN:binary-left
  29. L2841 `shadowElem.shadowRoot.querySelector(»`#${defaultVoiceParams.lang}`«).setAttribute('checked', true);`  · ASSIGN:template-literal
  30. L3241 `const langCode = »selectedLanguage || defaultVoiceParams.lang«;`  · ASSIGN:logical-right
  31. L2842 `shadowElem.shadowRoot.querySelector(»`#${defaultVoiceParams.lang}`«).parentNode.classList.add('languageActive');`  · ASSIGN:template-literal
  32. L2707 `const voiceFromStorage = »avatars.find(item => item.originalName === props.name)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  33. L2703 `if (»defaultVoiceParams.lang« !== 'auto') {`  · ASSIGN:binary-left
  34. L2716 `shadowElem.shadowRoot.querySelector('.voiceAvatar').setAttribute('src', »`https://speechit.pro/avatars/${voiceFromStorage ? voiceFromStorage.avatarImageName : 'noname.webp'}`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:template-literal
  35. L3854 `svgPause = »pause«;`  · ASSIGN:identifier
  36. L3891 `if (»event.data.type« === 'close') {`  · ELEMENT:member-element, ASSIGN:binary-left
  37. L3856 `»back«,`  · ASSIGN:identifier
  38. L3855 (→L3867) `»          widget = widgetHtml({«`  · ELEMENT:object.setProperty
  39. L3857 `»backMore«,`  · ASSIGN:identifier
  40. L3858 `»next«,`  · ASSIGN:identifier
  41. L3859 `»nextMore«,`  · ASSIGN:identifier
  42. L3860 `»minimize«,`  · ASSIGN:identifier
  43. L3861 `»close«,`  · ASSIGN:identifier
  44. L3862 `»drag«,`  · ASSIGN:identifier
  45. L3863 `»play«,`  · ASSIGN:identifier
  46. L3864 `»avatarsVersion«,`  · ASSIGN:identifier
  47. L3865 `»avatarsLastUpdate«,`  · ASSIGN:identifier
  48. L3866 `»extVer«`  · ASSIGN:identifier
  49. L1915 `<img style="user-select: none" draggable="false" src="${»drag«}"/>`  · ASSIGN:identifier
  50. L1923 `<img src="${»minimize«}"/>`  · ASSIGN:identifier
  51. L1926 `<img src="${»close«}"/>`  · ASSIGN:identifier
  52. L1938 `<img class="control" src="${»backMore«}"/>`  · ASSIGN:identifier
  53. L1941 `<img class="control" src="${»back«}"/>`  · ASSIGN:identifier
  54. L1944 `<img class="playPauseIcon" src="${»play«}"/>`  · ASSIGN:identifier
  55. L1947 `<img class="control" src="${»next«}"/>`  · ASSIGN:identifier
  56. L1950 `<img class="control" src="${»nextMore«}"/>`  · ASSIGN:identifier
  57. L2087 `Avatars version: ${»avatarsVersion«}<br>`  · ASSIGN:identifier
  58. L2088 `Avatars last update: ${»avatarsLastUpdate«}<br>`  · ASSIGN:identifier
  59. L2089 `Extension version: ${»extVer«}`  · ASSIGN:identifier
  60. L912 (→L2091) `»  const widget = `«`  · ASSIGN:template-literal
  61. L2092 `return »widget«;`  · ASSIGN:identifier
  62. L3907 `avatars = »event.data.avatars«;`  · ELEMENT:member-element
  63. L3117 `if (»defaultVoiceParams.lang« === 'auto') isAutoSelect = true;`  · ASSIGN:binary-left
  64. L3128 `document.querySelector('.shadowRootSpeecher').shadowRoot.querySelector('.playPauseIcon').src = »svgPause«;`  · ASSIGN:identifier
  65. L3142 `if (»isVoiceChanged && !isAutoSelect && language !== defaultVoiceParams.lang«) {`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-right
  66. L2651 `const reCalcTime = (originalText.split(' ').length / (130 / 60) + (originalText.match(/\./g) ? originalText.match(/\./g).length * 2 : 0)) / (»rate ? rate : defaultSpeed«);`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-alternate
  67. L2652 `document.querySelector('.shadowRootSpeecher').shadowRoot.querySelector('.time').innerHTML = timeFormat(»reCalcTime«);`  · ASSIGN:identifier
  68. L2640 `const minutes = »Math.floor(seconds.toFixed(0) / 60)«;`  · ASSIGN:identifier, RETURN:Number.toFixed, ASSIGN:binary-left, RETURN:Math.floor
  69. L2641 `const remainingSeconds = »seconds.toFixed(0)« % 60;`  · ASSIGN:identifier, RETURN:Number.toFixed, ASSIGN:binary-left
  70. L2642 `const formattedSeconds = remainingSeconds < 10 ? »'0' + remainingSeconds : remainingSeconds«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:conditional-consequent
  71. L2643 `return »(minutes < 10 ? '0' : '') + minutes + ':' + formattedSeconds«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  72. L3920 `if (»avatars.length«) {`  · ASSIGN:identifier, ELEMENT:member.length
  73. L3781 `if (»widget && document.body«) {`  · ASSIGN:identifier, ASSIGN:logical-left
  74. L3782 `elem.innerHTML = »widget«;`  · ASSIGN:identifier
  75. L3562 `inputRange.value = speedPool.indexOf(»defaultSpeed«) * 13.1;`  · ASSIGN:identifier
  76. L3563 `circleSvg.setAttribute('cx', speedPool.indexOf(»defaultSpeed«) * 13.1 + 4 + '%');`  · ASSIGN:identifier
  77. L3564 `progressLine.setAttribute('cx', speedPool.indexOf(»defaultSpeed«) * 13.1 + 4 + '%');`  · ASSIGN:identifier
  78. L3565 `progressLine.setAttribute('x2', speedPool.indexOf(»defaultSpeed«) * 13.1 + 4 + '%');`  · ASSIGN:identifier
  79. L3568 `if (currentSpeed !== »defaultSpeed«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  80. L3824 `if (»!widgetIconPath || !document.body«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  81. L3830 `widgetIcon.style = »`cursor: pointer; height: 40px; width: 40px; background-image: url("${widgetIconPath}"); background-size: 100%;`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  82. L2665 `setTimeout(() => setBaseSpeed(»speed«), 100);`  · ASSIGN:identifier
  83. L2708 `const voiceElement = Array.from(shadowElem.shadowRoot.querySelectorAll('.voiceControlPanel')).find(item => item.getAttribute('name') === »voiceFromStorage?.originalName«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  84. L2782 `shadowElem.shadowRoot.querySelector('.playPauseIcon').src = »svgPause«;`  · ASSIGN:identifier
  85. L2776 `timeLeft = (text.split(' ').length / (130 / 60) + (text.match(/\./g) ? text.match(/\./g).length * 2 : 0)) / (»rate ? rate : defaultSpeed«);`  · ASSIGN:identifier, ASSIGN:conditional-alternate, ASSIGN:binary-right
  86. L2901 `if (»defaultVoiceParams.lang === 'auto' || selectedLanguage === 'auto'«) {`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:identifier, ASSIGN:logical-right, ELEMENT:member-element-container
  87. L2911 `const customAvatar = »avatars.find(avatar => avatar.originalName === defaultVoiceParams.voice.name)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  88. L2912 `if (shadowElem.shadowRoot.querySelector('.voiceAvatar').src !== »`https://speechit.pro/avatars/${customAvatar ? customAvatar.avatarImageName : 'noname.webp'}`«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:template-literal, ASSIGN:binary-right
  89. L2838 `pasteVoices(availableVoices.filter(voice => voice.lang.split('-')[0] === »defaultVoiceParams.lang«));`  · ASSIGN:binary-right
  90. L2875 `timeLeft = (textForCalcTime.split(' ').length / (130 / 60) + (textForCalcTime.match(/\./g) ? textForCalcTime.match(/\./g).length * 2 : 0)) / (»rate ? rate : defaultSpeed«);`  · ASSIGN:identifier, ASSIGN:conditional-alternate, ASSIGN:binary-right
  91. L2903 `if (defaultLanguages.find(item => item === »ln«)) {`  · ASSIGN:identifier, ASSIGN:binary-right
  92. L2904 `currentVoice = availableVoices.find(item => item.name === defaultVoices[»ln«]);`  · ASSIGN:identifier
  93. L2906 `currentVoice = availableVoices.find(item => item.lang.split('-')[0] === »ln«);`  · ASSIGN:identifier, ASSIGN:binary-right
  94. L2923 `utterance.rate = rate ? rate : »defaultSpeed«;`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  95. L2921 `const »utterance = new SpeechSynthesisUtterance()«;`  · ELEMENT:object.setProperty
  96. L2957 `playPauseElement.src = »svgPlay«;`  · ASSIGN:identifier
  97. L2975 `utterance.rate = rate ? rate : »defaultSpeed«;`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  98. L2973 `const »utterance = new SpeechSynthesisUtterance()«;`  · ELEMENT:object.setProperty
  99. L3009 `playPauseElement.src = »svgPlay«;`  · ASSIGN:identifier
  100. L3245 `if (»defaultVoiceParams.lang === 'auto' && defaultVoiceParams.voice === 'any'«) {`  · ASSIGN:binary-left, ASSIGN:logical-left
  101. L3260 `if (item.name === defaultVoices[»ln«]) {`  · ASSIGN:identifier
  102. L3267 `if (»defaultVoiceParams.voice === 'any' && langCode !== 'auto' && !isSelected«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:logical-left
  103. L3268 `if (item.lang.split('-')[0] === »langCode«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  104. L3281 `let voiceSupplies = »avatars.find(avatar => avatar.originalName === item.name)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L3282 `if (»!voiceSupplies«) {`  · ASSIGN:identifier, ASSIGN:unary
  106. L3283 `const noName = »avatars.find(avatar => avatar.originalName === 'All other voices')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  107. L3284 `if (»noName«) {`  · ASSIGN:identifier
  108. L3286 `»...noName«,`  · ASSIGN:identifier, COPY:object-spread
  109. L3259 `if (defaultLanguages.find(item => item === »ln«)) {`  · ASSIGN:identifier, ASSIGN:binary-right
  110. L3354 `utterance.rate = rate ? rate : »defaultSpeed«;`  · ASSIGN:identifier, ASSIGN:conditional-alternate
  111. L3353 `const »utterance = new SpeechSynthesisUtterance()«;`  · ELEMENT:object.setProperty
  112. L3467 `if (»defaultVoiceParams.lang« === 'auto') {`  · ASSIGN:binary-left
  113. L3482 `if (»selectedLanguage«) {`  · ASSIGN:identifier
  114. L3483 `defaultVoiceParams.lang = »selectedLanguage«;`  · ASSIGN:identifier
  115. L3499 (→L3506) `»              window.postMessage({«`  · ELEMENT:object.setProperty
  116. L2646 `if (»!timeLeft || timeLeft.toFixed(0) <= 0«) {`  · ASSIGN:identifier, ASSIGN:unary, RETURN:Number.toFixed, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  117. L2659 `timeLeft = »timeLeft« - 1;`  · ASSIGN:identifier, ASSIGN:binary-left
  118. L2660 `document.querySelector('.shadowRootSpeecher').shadowRoot.querySelector('.time').innerHTML = timeFormat(»timeLeft«);`  · ASSIGN:identifier

---

## Flow #6 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/widget` L3733:C10 -> L3733:C30  `if (»event.data.forWidget« && event.data.message === 'gotReportData') {`
- **Sink(s)**:
  - `FETCH_BODY` (https://speechit.pro/issue) — `js/widget` L3741:C8 -> L3747:C10 (spans to L3747)  `»fetch('https://speechit.pro/issue', {«`
- **Sanitized**: NO
- **Frame**: `MAIN_js_widget`

- **Propagation** (14 raw steps → 6 distinct lines):
   1. L3733 `if (»event.data.forWidget && event.data.message === 'gotReportData'«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L3735 `uId: »event.data.reportData.uId«,`  · ELEMENT:member-element
   3. L3734 (→L3740) `»        const reportObj = {«`  · ELEMENT:object.setProperty
   4. L3736 `eId: »event.data.reportData.extensionId«,`  · ELEMENT:member-element
   5. L3746 `body: »JSON.stringify(reportObj)«`  · RETURN:json.stringify
   6. L3741 (→L3747) `»        fetch('https://speechit.pro/issue', {«`  · ELEMENT:object.setProperty

---
