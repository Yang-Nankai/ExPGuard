# Source-level Taint Flow — nenibigflkdikhamlnekfppbganmojlg 3.0.29

- Source type: CRX
- Files with issues: 4 / 6
- Distinct taint flows: 16  (collapsed from 472 raw issue entries)
- Sinkless sources skipped: 38 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_INNER_HTML (html)

- **Source**: `ELEMENT_INNER_HTML` — `contentscript` L46:C22 -> L46:C44  `var valStrH = »obj.innerHTML.toString«();`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `contentscript` L52:C16 -> L52:C25  `obj.»innerHTML« = valNewH;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (57 raw steps → 5 distinct lines):
   1. L46 `var valStrH = »obj.innerHTML.toString()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L47 (→L49) `var valNewH = »valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L51 `if (»valNewH != valStrH«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   4. L52 `obj.innerHTML = »valNewH«;`  · ASSIGN:identifier
   5. L42 `var »objects = document.getElementsByTagName('html')«;`  · ELEMENT:object.setProperty

---

## Flow #2 — JQUERY_ELEMENT_VAL (#classList)

- **Source**: `JQUERY_ELEMENT_VAL` — `contentscript` L1316:C12 -> L1316:C20  `let »obj = {}«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `contentscript` L1319:C8 -> L1319:C37  `»chrome.storage.local.set(obj)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L1316 `let »obj = {}«`  · ELEMENT:object.setProperty

---

## Flow #3 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (#extclassroomid) — `contentscript` L1327:C12 -> L1327:C59  `»$('#extclassroomid').val($('#classList').val())«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---

## Flow #4 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (#extclassroomname) — `contentscript` L1328:C12 -> L1328:C78  `»$('#extclassroomname').val($("#classList option:selected").text())«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---

## Flow #5 — JQUERY_ELEMENT_VAL (#attendanceFreq)

- **Source**: `JQUERY_ELEMENT_VAL` — `contentscript` L1437:C65 -> L1437:C101  `attendancefrequency = $('#attendanceFreq').val() != '' ? »parseInt($('#attendanceFreq').val())« : ''`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (freq) — `contentscript` L1439:C8 -> L1439:C63  `»chrome.storage.local.set({ freq: attendancefrequency })«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (88 raw steps → 9 distinct lines):
   1. L1437 `attendancefrequency = $('#attendanceFreq').val() != '' ? »parseInt($('#attendanceFreq').val())« : ''`  · RETURN:parseInt, ASSIGN:conditional-consequent
   2. L1439 `»chrome.storage.local.set({ freq: attendancefrequency })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L1443 `value: »attendancefrequency«`  · ASSIGN:identifier
   4. L1440 (→L1444) `»        let data = {«`  · ELEMENT:object.setProperty
   5. L88 `attendancefrequency = attendancefrequency ? »attendancefrequency« : 3000000`  · ASSIGN:identifier
   6. L1434 `$('#attendanceFreq').val(»attendancefrequency«)`  · ASSIGN:identifier
   7. L891 `if (»attendancefrequency« === '') {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L900 `»attendancefrequency«)`  · ASSIGN:identifier
   9. L902 `console.log('interval', »attendancefrequency, attendancefrequency« / 1000, interval)`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #6 — JQUERY_ELEMENT_VAL (From storage.local.set('freq') in contentscript)  ·  182× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `contentscript` L1437:C65 -> L1437:C101  `attendancefrequency = $('#attendanceFreq').val() != '' ? »parseInt($('#attendanceFreq').val())« : ''`
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (#attendanceFreq) — `contentscript` L1434:C4 -> L1434:C49  `»$('#attendanceFreq').val(attendancefrequency)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (103 raw steps → 11 distinct lines):
   1. L1437 `attendancefrequency = $('#attendanceFreq').val() != '' ? »parseInt($('#attendanceFreq').val())« : ''`  · RETURN:parseInt, ASSIGN:conditional-consequent
   2. L1439 `»chrome.storage.local.set({ freq: attendancefrequency })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L1443 `value: »attendancefrequency«`  · ASSIGN:identifier
   4. L1440 (→L1444) `»        let data = {«`  · ELEMENT:object.setProperty
   5. L88 `attendancefrequency = attendancefrequency ? »attendancefrequency« : 3000000`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   6. L1434 `$('#attendanceFreq').val(»attendancefrequency«)`  · ASSIGN:identifier
   7. L891 `if (»attendancefrequency« === '') {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L900 `»attendancefrequency«)`  · ASSIGN:identifier
   9. L902 `console.log('interval', »attendancefrequency, attendancefrequency« / 1000, interval)`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L86 (→L92) `»    chrome.storage.local.get(['freq'], function (res) {«`  · STORAGE:STORAGE_FLOW[area: local, key: freq, sender: contentscript, receiver: contentscript]
  11. L87 `if (»res.freq« == undefined) {`  · ASSIGN:binary-left

---

## Flow #7 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `background` L64:C0 -> L69:C1 (spans to L69)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2178 raw steps → 13 distinct lines):
   1. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[contentscript->background]`
   2. L562 `»chrome.tabs.sendMessage(request.sendingTab, { type: 'download', rows: rows, meet: request.meet })«;`  · ELEMENT:object.setProperty
   3. L607 `if (»meet«) {`  · ASSIGN:identifier
   4. L608 `settings[»`${meet}sheetId`] = result[`${meet}sheetId`«]`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L609 `settings[»`${meet}sheetDate`] = result[`${meet}sheetDate`«]`  · ASSIGN:identifier, ASSIGN:template-literal
   6. L447 `request.sheetId = settings[»`${request.meet}sheetId`«]`  · ASSIGN:template-literal
   7. L1398 `if (»request.title && request.title != ''«) {`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L806 `if (»request.title« == '') {`  · ASSIGN:binary-left
   9. L809 (→L821) `»    request.body = {«`  · ELEMENT:object.setProperty
  10. L1408 (→L1415) `»    const options = {«`  · ELEMENT:object.setProperty
  11. L1427 `body: »JSON.stringify(options.request)«`  · RETURN:json.stringify
  12. L1421 (→L1428) `»    const option = {«`  · ELEMENT:object.setProperty
  13. L469 `const »data = { type: 'newattendance', values: roster, meet: request.meet, link: request.link, attendance: true }«`  · ELEMENT:object.setProperty

---

## Flow #8 — CHROME_IDENTITY_TOKEN (identity.authToken)

- **Source**: `CHROME_IDENTITY_TOKEN` — `background` L214:C17 -> L214:C22  `if (!»token«) {`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://www.googleapis.com//oauth2/v2/userinfo) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_HEADERS` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1520 raw steps → 15 distinct lines):
   1. L214 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
   2. L218 `request.token = »token«`  · ASSIGN:identifier
   3. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · ELEMENT:object.setProperty
   4. L29 (→L31) `»    var data = {«`  · ELEMENT:object.setProperty
   5. L1499 `if (»!request.token«) {`  · ASSIGN:unary
   6. L1506 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:binary-right
   7. L1503 (→L1509) `»    const options = {«`  · ELEMENT:object.setProperty
   8. L1375 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:binary-right
   9. L1372 (→L1378) `»        let options = {«`  · ELEMENT:object.setProperty
  10. L1388 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:binary-right
  11. L1385 (→L1391) `»        let options = {«`  · ELEMENT:object.setProperty
  12. L1408 (→L1415) `»    const options = {«`  · ELEMENT:object.setProperty
  13. L1424 `Authorization: 'Bearer ' + »options.token«,`  · ASSIGN:binary-right
  14. L1421 (→L1428) `»    const option = {«`  · ELEMENT:object.setProperty
  15. L1427 `body: »JSON.stringify(options.request)«`  · RETURN:json.stringify

---

## Flow #9 — JQUERY_ELEMENT_TEXT (#classList option:selected)  ·  5× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_TEXT` — `background` L64:C0 -> L69:C1 (spans to L69)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 1 distinct lines):
   1. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[contentscript->background]`

---

## Flow #10 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L74:C8 -> L74:C11  `»req«.sendingTab = sender.tab.id`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L494:C12 -> L494:C85  `»chrome.tabs.create({ url: 'auth.html', openerTabId: request.sendingTab })«;`
  - `FETCH_HEADERS` (https://www.googleapis.com//oauth2/v2/userinfo) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_BODY` (https://us-central1-claycodes.cloudfunctions.net/usersubscription) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_HEADERS` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_HEADERS` (https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (23959 raw steps → 292 distinct lines):
   1. L74 `»req«.sendingTab = sender.tab.id`  · ASSIGN:identifier
   2. L75 `sendResponse(await newRequest(»req«))`  · ASSIGN:identifier
   3. L489 `request = await getAuth(»request«)`  · ASSIGN:identifier
   4. L218 `»request«.token = token`  · ASSIGN:identifier
   5. L219 `chrome.tabs.sendMessage(»request.sendingTab«, { type: 'authorized', authorized: true });`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
   6. L220 `resolve(»request«)`  · ASSIGN:identifier
   7. L492 `switch (»request.type«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
   8. L494 `»chrome.tabs.create({ url: 'auth.html', openerTabId: request.sendingTab })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
   9. L497 `initialize(»request«)`  · ASSIGN:identifier
  10. L142 `»request«.token = await getToken();`  · ASSIGN:identifier
  11. L143 `settings.account = await fetchUser(»request«)`  · ASSIGN:identifier
  12. L1498 `console.log('token', »request.token«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  13. L1499 `if (»!request.token«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  14. L1506 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  15. L1503 (→L1509) `»    const options = {«`  · ELEMENT:object.setProperty
  16. L146 `chrome.tabs.sendMessage(»request.sendingTab«, initsetting);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  17. L147 `»request«.token = await getToken();`  · ASSIGN:identifier
  18. L148 `let userInfo = await fetchUser(»request«)`  · ASSIGN:identifier
  19. L151 `»request«.email = (userInfo && userInfo.email) ? userInfo.email : 'Unknown User'`  · ASSIGN:identifier
  20. L152 `if (»request.email« == 'Unknown User') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  21. L153 `chrome.tabs.sendMessage(»request.sendingTab«, { type: 'unknown', message: true });`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  22. L155 `»request«.subscription = 'prod_Hmgytm7tNFfpVD'`  · ASSIGN:identifier
  23. L166 `await setSubScription(»request«)`  · ASSIGN:identifier
  24. L171 `let sub = await subscription(»request«)`  · ASSIGN:identifier
  25. L1333 `»request.body = { email: request.email, subscription: request.subscription }«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  26. L1339 `body: »JSON.stringify(request.body)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify, ELEMENT:member-element-container
  27. L1334 (→L1340) `»    let options = {«`  · ELEMENT:object.setProperty
  28. L181 `chrome.tabs.sendMessage(»request.sendingTab«, { type: 'subscription', subscription: active });`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  29. L500 `createSink(»request«)`  · ASSIGN:identifier
  30. L227 `dataRefresh(»request«)`  · ASSIGN:identifier
  31. L251 `settings.account = await fetchUser(»request«)`  · ASSIGN:identifier
  32. L252 `await initlocalsettings(»request.meet«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  33. L607 `if (»meet«) {`  · ASSIGN:identifier
  34. L608 `settings[»`${meet}sheetId`] = result[`${meet}sheetId`«]`  · ASSIGN:identifier, ASSIGN:template-literal
  35. L609 `settings[»`${meet}sheetDate`] = result[`${meet}sheetDate`«]`  · ASSIGN:identifier, ASSIGN:template-literal
  36. L230 `»request«.id = settings.sinksheetid`  · ASSIGN:identifier
  37. L234 `sinkSend(»request«)`  · ASSIGN:identifier
  38. L829 `console.log('sink', »request«)`  · ASSIGN:identifier
  39. L862 `newRows = »request.values«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  40. L863 `updateSinkHeaders(»request«)`  · ASSIGN:identifier
  41. L961 `sheetId: »request.sheetId«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  42. L958 (→L977) `»    let cellformat = {«`  · ELEMENT:object.setProperty
  43. L979 `»request«.body = {`  · ASSIGN:identifier
  44. L984 `sendToBatch(»request«)`  · ASSIGN:identifier
  45. L1314 `if (»!request.id«) { return }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  46. L1316 `»request«.function = 'sendToBatch'`  · ASSIGN:identifier
  47. L1317 `var sheetUpdate = await sendtoScript(»request«)`  · ASSIGN:identifier
  48. L1410 `token: »request.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  49. L1408 (→L1415) `»    const options = {«`  · ELEMENT:object.setProperty
  50. L1412 `function: »request.function«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  51. L1413 `parameters: »request«`  · ASSIGN:identifier
  52. L1424 `Authorization: 'Bearer ' + »options.token«,`  · ASSIGN:binary-right
  53. L1421 (→L1428) `»    const option = {«`  · ELEMENT:object.setProperty
  54. L1427 `body: »JSON.stringify(options.request)«`  · RETURN:json.stringify
  55. L843 (→L846) `newRows = »request.values.filter(row => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member-element-container
  56. L866 `if (»newRows.length« > 0) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  57. L847 `console.log('sink newrows', »newRows«)`  · ASSIGN:identifier
  58. L867 `let newreq = »request«`  · ASSIGN:identifier
  59. L851 (→L854) `matchRows = »request.values.filter(row => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member-element-container
  60. L869 `»newreq«.function = 'appendSink'`  · ASSIGN:identifier
  61. L896 `»newsink = newsink.concat(matchRows)«`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:array.concat.scalar, ELEMENT:member-element-container, COPY:array.concat, ELEMENT:implicit.add
  62. L929 `sessionStorage.sink = »JSON.stringify(newsink)«`  · RETURN:json.stringify
  63. L855 (→L859) `matchRows = »matchRows.map(row => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  64. L872 `values: »newRows«`  · ASSIGN:identifier
  65. L870 (→L873) `»newreq.body = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  66. L898 `»request«.body = {`  · ASSIGN:identifier
  67. L874 `let res = await sendtoScript(»newreq«)`  · ASSIGN:identifier
  68. L906 (→L921) `»request.body.data = matchRows.map(row => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  69. L895 `if (»matchRows.length« > 0) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  70. L922 `if (»request.from == 'end' || !sinkbuffer || sinkbuffer < new Date().getTime()«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container
  71. L923 `sendToValueFilterBatch(»request«)`  · ASSIGN:identifier
  72. L1261 `if (»request.body.data[0].values.length == 0 || !request.id«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
  73. L1264 `console.log('send batch', subscribed, »request.auto, request.new, request.end«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  74. L1267 `»request«.function = 'sendToValueFilterBatch'`  · ASSIGN:identifier
  75. L1268 `sheet = await sendtoScript(»request«)`  · ASSIGN:identifier
  76. L1289 `if (»request.snap«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  77. L1290 `sheetCol[»request.sheetId«] = colCount`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  78. L885 (→L889) `»newRows.forEach(row => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  79. L890 `console.log('sink', »newRows«)`  · ASSIGN:identifier
  80. L891 `»newsink = newsink.concat(newRows)«`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add, COPY:array.concat, ELEMENT:array.concat.scalar
  81. L243 `updateSinkHeaders(»request«)`  · ASSIGN:identifier
  82. L503 `updateSinkHeaders(»request«)`  · ASSIGN:identifier
  83. L512 `meetInit(»request«)`  · ASSIGN:identifier
  84. L257 `let meet = »request.meet«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  85. L258 `await dataRefresh(»request«)`  · ASSIGN:identifier
  86. L261 `const list = await classroomList(»request«)`  · ASSIGN:identifier
  87. L1353 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  88. L1350 (→L1356) `»        let options = {«`  · ELEMENT:object.setProperty
  89. L508 `endMeet(null, »request.meet«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  90. L81 `if (»!meet«) {`  · ASSIGN:identifier, ASSIGN:unary
  91. L516 `settings[»request.setting] = request.value«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  92. L12 `var lastSend = {}, sheetCol = {}, sendingObject = {}, »settings = {}«;`  · ELEMENT:object.setProperty
  93. L520 `sheetCheck(»request«)`  · ASSIGN:identifier
  94. L296 `await dataRefresh(»request«)`  · ASSIGN:identifier
  95. L306 `»request«.id = settings.spreadsheetId`  · ASSIGN:identifier
  96. L307 `»chrome.tabs.sendMessage(request.sendingTab, { type: 'sheet', id: request.id, token: request.token })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  97. L303 `await createSpreadSheet(»request«)`  · ASSIGN:identifier
  98. L1441 `»request«.folderid = res.folderid ? res.folderid : lres.folderid`  · ASSIGN:identifier
  99. L1444 `»request«.folderName = appName`  · ASSIGN:identifier
  100. L1446 `»request«.body = {`  · ASSIGN:identifier
  101. L1452 `»request«.function = 'createSpreadSheet'`  · ASSIGN:identifier
  102. L1453 `ss = await sendtoScript(»request«)`  · ASSIGN:identifier
  103. L1454 `if (»request.folderid« != ss.folderid) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  104. L1476 `token: »request.token«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  105. L1473 (→L1477) `»            var data = {«`  · ELEMENT:object.setProperty
  106. L1478 `»request«.id = ss.spreadsheetId`  · ASSIGN:identifier
  107. L1479 `console.log('create', »request.id«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  108. L1481 `chrome.tabs.sendMessage(»request.sendingTab«, data);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  109. L1487 `»addSheet(request)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  110. L675 `»request«.automated = true`  · ASSIGN:identifier
  111. L679 `cach['cache' + »request.meet«] = [[]]`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  112. L687 `if (»!request.meet«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  113. L688 `return »request«`  · ASSIGN:identifier
  114. L692 `let sheetname = request.title ? »request.title : `${d} ${request.meet}`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent, ELEMENT:member-element-container, ASSIGN:conditional-alternate
  115. L698 `title: »sheetname«,`  · ASSIGN:identifier
  116. L693 (→L709) `»request.body = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  117. L711 `if (»!request.id«) { return }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  118. L713 `»request«.function = 'sendToBatch'`  · ASSIGN:identifier
  119. L714 `var sheet = await sendtoScript(»request«)`  · ASSIGN:identifier
  120. L732 `sheetId[»`${request.meet}sheetId`«] = sheet.replies[0].addSheet.properties.sheetId`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  121. L733 `settings[»`${request.meet}sheetId`«] = sheet.replies[0].addSheet.properties.sheetId`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  122. L734 `sheetDate[»`${request.meet}sheetDate`«] = d`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  123. L736 `»request«['sheetDate'] = d`  · ASSIGN:identifier
  124. L737 `settings[»`${request.meet}sheetDate`«] = d`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  125. L739 `»request«['sheetId'] = sheet.replies[0].addSheet.properties.sheetId`  · ASSIGN:identifier
  126. L740 `»request«[`${request.meet}sheetId`] = sheet.replies[0].addSheet.properties.sheetId`  · ASSIGN:identifier
  127. L745 `»request«.sheetId = sheet.replies[0].addSheet.properties.sheetId`  · ASSIGN:identifier
  128. L746 `»request«.sheetDate = d`  · ASSIGN:identifier
  129. L749 `sheet.token = »request.token«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  130. L750 `sheet.id = »request.id«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  131. L752 `if (»request.automated«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  132. L757 `sheetCol[»request.sheetId«] = colCount`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  133. L759 `formatCells(»request«, sheet)`  · ASSIGN:identifier
  134. L1056 `sheetId: »request.sheetId«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  135. L1053 (→L1072) `»    var formatting = {«`  · ELEMENT:object.setProperty
  136. L1076 `sheetId: »request.sheetId«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  137. L1073 (→L1091) `»    var formatting2 = {«`  · ELEMENT:object.setProperty
  138. L1092 (→L1095) `»request.body = {«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:identifier
  139. L1097 `sendToBatch(»request«)`  · ASSIGN:identifier
  140. L761 `console.log('sheet adding', »request«)`  · ASSIGN:identifier
  141. L762 `return »request«;`  · ASSIGN:identifier
  142. L523 `newAttendance(»request«)`  · ASSIGN:identifier
  143. L313 `console.log('new', settings, »request«)`  · ASSIGN:identifier
  144. L314 `if (»!subscribed && request.auto«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right, ELEMENT:member-element-container
  145. L318 `await dataRefresh(»request«)`  · ASSIGN:identifier
  146. L321 `if (»!request.id«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  147. L322 `»request«.id = settings.spreadsheetId`  · ASSIGN:identifier
  148. L324 `if (»!request.id && !settings.spreadsheetId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ELEMENT:member-element-container
  149. L325 `var spreadsheet = await createSpreadSheet(»request«)`  · ASSIGN:identifier
  150. L326 `»request«.id = spreadsheet.id`  · ASSIGN:identifier
  151. L375 `if (»!request.sheetId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  152. L376 `»request.sheetId = settings[`${request.meet}sheetId`]«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  153. L379 `if (»!request.sheetDate«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  154. L380 `»request.sheetDate = settings[`${request.meet}sheetDate`]«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  155. L383 `if (»!request.sheetId && request.sheetDate != new Date().toLocaleDateString()«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
  156. L402 `} else if (»request.sheetId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  157. L403 `if (»request.values.length« > 0) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container
  158. L386 `var sheetname = »`${d} ${request.meet}`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  159. L404 `if (»request.snap«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  160. L413 `var sheetname = »`${d} ${request.meet}`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  161. L387 `»request.tempSheetname = sheetname«`  · ASSIGN:identifier
  162. L405 `addData(»request«)`  · ASSIGN:identifier
  163. L989 `if (!sheetCol[»request.sheetId«]) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  164. L990 `sheet = await getBySheetId(»request«)`  · ASSIGN:identifier
  165. L774 `sheetId: »request.sheetId«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  166. L768 (→L778) `»request.body = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  167. L781 `»request«.function = 'getBySheetId'`  · ASSIGN:identifier
  168. L782 `sheet = await sendtoScript(»request«)`  · ASSIGN:identifier
  169. L998 `colCount = sheetCol[»request.sheetId«] + 1`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  170. L1000 `sheetCol[»request.sheetId«] = colCount`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  171. L992 `if (»request.automated«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  172. L1001 `let sheetId = »request.sheetId«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  173. L1007 `sheetId: »sheetId«,`  · ASSIGN:identifier
  174. L1002 (→L1021) `»    let object = {«`  · ELEMENT:object.setProperty
  175. L1026 `»values.push([request.link])«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  176. L1023 `let »values = []«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  177. L1027 `for (let i = 0; i < »request.values.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element-container
  178. L1028 `»values.push([request.values[i][0]])«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  179. L1031 `object.data[0].dataFilter.gridRange.endRowIndex = »values.length«`  · ELEMENT:member.length
  180. L1035 `»request«.body = object`  · ASSIGN:identifier
  181. L1036 `sendToValueFilterBatch(»request«)`  · ASSIGN:identifier
  182. L407 `addDataCache(»request«)`  · ASSIGN:identifier
  183. L1109 `const result = await getStorage('local', »`cache${request.meet}`«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  184. L205 `chrome.storage[type].get(»key«, function (val) {`  · ASSIGN:identifier
  185. L1111 `const cacheArray = result['cache' + request.meet] ? result['cache' + »request.meet«] : [[]]`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  186. L1113 `let dataValues = »request.values«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  187. L1115 `let sheetId = »request.sheetId«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  188. L1139 `sheetId: »sheetId«,`  · ASSIGN:identifier
  189. L1134 (→L1153) `»    const object = {«`  · ELEMENT:object.setProperty
  190. L1159 `for (let i = 0; i < »dataValues.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  191. L1160 `let coord = getIndexOfK(cacheArray, »dataValues[i][0]«)`  · ASSIGN:identifier, ELEMENT:member-element
  192. L1578 `var index = »arr[i].indexOf(k)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  193. L1161 `let datarow = »dataValues[i]«`  · ASSIGN:identifier, ELEMENT:member-element
  194. L1191 `const coord = getIndexOfK(»dataValues«, cacheArray[i][0])`  · ASSIGN:identifier
  195. L1577 `for (var i = 0; i < »arr.length«; i++) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  196. L1579 `if (»index« > -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  197. L1580 `return [i, »index«];`  · ASSIGN:identifier
  198. L1178 `if (»cacheArray[row][map[header[1]]] == absent && datarow[4]«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  199. L1182 `if (»datarow[5] == 'left' && cacheArray[row][5] != 'left'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
  200. L1210 `»request«.body = object`  · ASSIGN:identifier
  201. L1211 `if (»!sendingObject[request.meet] && !request.end«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-left, ELEMENT:computed-member-unknown-alternative
  202. L1212 `»sendingObject[request.meet] = {}«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  203. L1214 `if (»!request.end«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  204. L1215 `sendingObject[»request.meet].request = request«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  205. L1219 `cach['cache' + »request.meet«] = cacheArray`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  206. L1222 `if ((»!subscribed && !request.new && !request.end && (lastSend[request.meet] && lastSend[request.meet] > new Date().getTime())«)) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:member-element-container
  207. L1229 `if (»!valueFilterLock && (request.new || request.end || (!lastSend[request.meet] || lastSend[request.meet] < new Date().getTime() || newUser))«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
  208. L1231 `console.log('sending', »request«)`  · ASSIGN:identifier
  209. L1232 `sendToValueFilterBatch(»request«)`  · ASSIGN:identifier
  210. L1237 `lastSend[»request.meet«] = new Date().getTime() + freq`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  211. L414 `»request.tempSheetname = sheetname«`  · ASSIGN:identifier
  212. L390 `»request = await addSheet(request)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  213. L417 `»request = await addSheet(request)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  214. L395 `if (»request.values.length« > 0) {`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  215. L421 `if (»request.values.length« > 0) {`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  216. L396 `if (»request.snap«) {`  · ELEMENT:member-element-container
  217. L422 `if (»request.snap«) {`  · ELEMENT:member-element-container
  218. L526 `getClasslist(»request«)`  · ASSIGN:identifier
  219. L434 `const list = await classroomList(»request«)`  · ASSIGN:identifier
  220. L435 `console.log('sendingtab', »request.sendingTab«) //may be able to replace the query`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  221. L529 `getClassRoster(»request«)`  · ASSIGN:identifier
  222. L444 `await dataRefresh(»request«)`  · ASSIGN:identifier
  223. L446 `»request«.id = settings.spreadsheetId`  · ASSIGN:identifier
  224. L447 `»request.sheetId = settings[`${request.meet}sheetId`]«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member-element-container
  225. L448 `const list = await classroomRoster(»request«)`  · ASSIGN:identifier
  226. L1368 `if (»!request.classId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ELEMENT:member-element-container
  227. L1375 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  228. L1372 (→L1378) `»        let options = {«`  · ELEMENT:object.setProperty
  229. L1379 `let url = token ? »`https://classroom.googleapis.com/v1/courses/${request.classId}/students?pageSize=30&pageToken=${token}` : `https://classroom.googleapis.com/v1/courses/${request.classId}/students?pageSize=30`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent, ELEMENT:member-element-container
  230. L1380 `var roster = await fetchRetry(»url«, options)`  · ASSIGN:identifier
  231. L1532 `console.log('FETCH', options.method, »url«, options)`  · ASSIGN:identifier
  232. L1537 `let res = await fetch(»url«, options)`  · ASSIGN:identifier
  233. L1388 `Authorization: 'Bearer ' + »request.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:member-element-container
  234. L1385 (→L1391) `»        let options = {«`  · ELEMENT:object.setProperty
  235. L1392 `let url = token ? »`https://classroom.googleapis.com/v1/courses/${request.classId}/teachers?pageSize=30&pageToken=${token}` : `https://classroom.googleapis.com/v1/courses/${request.classId}/teachers?pageSize=30`«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:conditional-consequent, ELEMENT:member-element-container
  236. L1393 `var roster = await fetchRetry(»url«, options)`  · ASSIGN:identifier
  237. L1398 `if (»request.title && request.title != ''«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
  238. L1400 `tabRename(»request«)`  · ASSIGN:identifier
  239. L806 `if (»request.title« == '') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  240. L814 `sheetId: »request.sheetId«,`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  241. L809 (→L821) `»request.body = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  242. L815 `title: »request.title«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  243. L822 `let sheet = await sendToBatch(»request«)`  · ASSIGN:identifier
  244. L449 `»request.title = request.className«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  245. L469 `const »data = { type: 'newattendance', values: roster, meet: request.meet, link: request.link, attendance: true }«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  246. L532 `exportCSV(»request«)`  · ASSIGN:identifier
  247. L561 `const »rows = sendingObject[request.meet].request.body.data[0].values«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:member-element-container
  248. L562 `»chrome.tabs.sendMessage(request.sendingTab, { type: 'download', rows: rows, meet: request.meet })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:member-element-container
  249. L535 `»request.id = await createSpreadSheet(request«)`  · ASSIGN:identifier
  250. L538 `addNewSheet(»request«)`  · ASSIGN:identifier
  251. L475 `»request.title = request.title ? request.title« : new Date().toLocaleString()`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:member-element-container
  252. L477 `»await addSheet(request)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  253. L22 `if (»sendingObject[tabId]«) {`  · ELEMENT:implicit.add
  254. L82 `»meet = sendingObject[tabId] ? sendingObject[tabId].meet : ''«`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  255. L97 `if (»!tabId && meet«) {`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:unary, ASSIGN:logical-left
  256. L91 `console.log(»m, meet, m == meet«)`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  257. L99 `tabId = »sendingObject[meet].tabid«`  · ASSIGN:identifier, ELEMENT:member-element
  258. L92 `if (»m == meet«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  259. L102 `console.log(»meet«, ct)`  · ASSIGN:identifier
  260. L105 `sendingObject[»meet«] = undefined`  · ASSIGN:identifier
  261. L107 `»chrome.storage.local.remove(['cacheObject' + meet])«`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty
  262. L108 `»chrome.storage.local.remove(['cache' + meet])«`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty
  263. L134 `console.log('end of ending', tabId, »meet«, sendingObject)`  · ASSIGN:identifier
  264. L112 `if (»sendingObject[m].meet == meet«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member-element, ASSIGN:binary-left
  265. L113 `sendingObject[»meet].tabid = sendingObject[m].tabid«`  · ASSIGN:identifier, ELEMENT:member-element
  266. L127 `sendingObject[»meet«] = ''`  · ASSIGN:identifier
  267. L285 `»sendingObject[tabid] = { tabid: tabid, meet: request.meet }«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  268. L55 `»sendingObject = {}«`  · ELEMENT:object.setProperty
  269. L275 `if (»sendingObject[i].meet != request.meet«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  270. L85 `for (»let m« in sendingObject) {`  · ITERATE:loop.iteration
  271. L86 `if (»sendingObject[m].request«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element
  272. L87 `let request = »sendingObject[m].request«`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element
  273. L88 `»request«.end = true`  · ASSIGN:identifier
  274. L89 `addDataCache(»request«)`  · ASSIGN:identifier
  275. L111 `for (»let m« in sendingObject) {`  · ITERATE:loop.iteration
  276. L286 `if (»!sendingObject[meet]«) {`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:unary
  277. L276 `»sendingObject[i] = { tabid: tabid, meet: request.meet }«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  278. L287 `»sendingObject[meet] = { tabid: tabid, meet: request.meet }«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  279. L272 `for (»let i« in sendingObject) {`  · ITERATE:loop.iteration
  280. L273 `if (meets.indexOf(sendingObject[»i«].meet) > -1) {`  · ASSIGN:identifier
  281. L274 `if (»sendingObject[i].tabid == tabid && parseInt(i) > 0«) {`  · ASSIGN:identifier, RETURN:parseInt, ASSIGN:binary-left, ASSIGN:logical-right
  282. L280 `let end = sendingObject[i].meet ? »sendingObject[i].meet : i«`  · ASSIGN:identifier, ASSIGN:conditional-consequent
  283. L281 `endMeet(null, »end«)`  · ASSIGN:identifier
  284. L453 `if (!tabid) { »tabid = sendingObject[request.meet].tabid« }`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:member-element-container
  285. L454 `chrome.tabs.sendMessage(»tabid«, { type: 'classRoster', list: list });`  · ASSIGN:identifier
  286. L1252 `for (»let m« in sendingObject) {`  · ITERATE:loop.iteration
  287. L1253 `console.log('backgroundTrigger object', »sendingObject[m].request«)`  · ASSIGN:identifier, ELEMENT:member-element-container
  288. L1254 `if (»sendingObject[m].request«) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  289. L1255 `newRequest(»sendingObject[m].request«)`  · ASSIGN:identifier, ELEMENT:member-element-container
  290. L838 `sinkstorage = sessionStorage.sink ? »JSON.parse(sessionStorage.sink)« : []`  · ELEMENT:member-element-container, RETURN:json.parse
  291. L840 `if (»sinkstorage.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  292. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · ELEMENT:object.setProperty

---

## Flow #11 — STORAGE_ALL_ITEMS (storage.all.items[sync])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L579:C54 -> L579:C69  `settings.newdaily = result.newdaily ? »result.newdaily« : (lresult.newdaily ? lresult.newdaily : true)`
- **Sink(s)**:
  - `CHROME_ALARMS_CREATE_OPTIONS` — `background` L553:C16 -> L553:C106  `»chrome.alarms.create('timedBackground', { periodInMinutes: parseInt(freq / (1000 * 60)) })«`
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5475 raw steps → 32 distinct lines):
   1. L579 `settings.newdaily = result.newdaily ? »result.newdaily« : (lresult.newdaily ? lresult.newdaily : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   2. L12 `var »lastSend = {}, sheetCol = {}, sendingObject = {}, settings = {}«;`  · ELEMENT:object.setProperty
   3. L580 `settings.newmeet = result.newmeet ? »result.newmeet« : (lresult.newmeet ? lresult.newmeet : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   4. L581 `settings.spreadsheetId = result.spreadsheetId ? »result.spreadsheetId« : lresult.spreadsheetId`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   5. L582 `settings['freq'] = result['freq'] ? »result['freq']« : (lresult['freq'] ? lresult['freq'] : 300000)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   6. L583 `settings['status'] = result['status'] ? »result['status']« : (lresult['status'] ? lresult['status'] : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   7. L584 `settings['automated'] = result['automated'] ? »result['automated']« : (lresult['automated'] ? lresult['automated'] : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   8. L226 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary
   9. L924 `sinkbuffer = new Date().getTime() + »settings.freq«`  · ASSIGN:binary-right
  10. L922 `if (»request.from == 'end' || !sinkbuffer || sinkbuffer < new Date().getTime()«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:binary-left, ASSIGN:logical-left
  11. L1103 `if (»!settings['status'] || !settings['automated']«) {`  · ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  12. L1237 `lastSend[request.meet] = new Date().getTime() + »freq«`  · ASSIGN:identifier, ASSIGN:binary-right
  13. L1222 `if ((»!subscribed && !request.new && !request.end && (lastSend[request.meet] && lastSend[request.meet] > new Date().getTime())«)) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  14. L1229 `if (»!valueFilterLock && (request.new || request.end || (!lastSend[request.meet] || lastSend[request.meet] < new Date().getTime() || newUser))«) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  15. L295 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary
  16. L298 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary
  17. L674 `if (»settings.automated || settings.daily || settings.newmeet«) {`  · ASSIGN:logical-left, ASSIGN:logical-right
  18. L324 `if (»!request.id && !settings.spreadsheetId«) {`  · ASSIGN:unary, ASSIGN:logical-right
  19. L328 `if (»!settings.newmeet«) {`  · ASSIGN:unary
  20. L356 `if (»!settings.newdaily«) {`  · ASSIGN:unary
  21. L376 `request.sheetId = »settings[`${request.meet}sheetId`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  22. L380 `request.sheetDate = »settings[`${request.meet}sheetDate`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  23. L447 `request.sheetId = »settings[`${request.meet}sheetId`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  24. L552 `const freq = »settings.freq« | 300000`  · ASSIGN:binary-left
  25. L553 `»chrome.alarms.create('timedBackground', { periodInMinutes: parseInt(freq / (1000 * 60)) })«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:parseInt, ELEMENT:object.setProperty
  26. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · ELEMENT:object.setProperty
  27. L809 (→L821) `»    request.body = {«`  · ELEMENT:object.setProperty
  28. L1314 `if (»!request.id«) { return }`  · ASSIGN:unary
  29. L1408 (→L1415) `»    const options = {«`  · ELEMENT:object.setProperty
  30. L1427 `body: »JSON.stringify(options.request)«`  · RETURN:json.stringify
  31. L1421 (→L1428) `»    const option = {«`  · ELEMENT:object.setProperty
  32. L443 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary

---

## Flow #12 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L579:C92 -> L579:C108  `settings.newdaily = result.newdaily ? result.newdaily : (lresult.newdaily ? »lresult.newdaily« : true)`
- **Sink(s)**:
  - `CHROME_ALARMS_CREATE_OPTIONS` — `background` L553:C16 -> L553:C106  `»chrome.alarms.create('timedBackground', { periodInMinutes: parseInt(freq / (1000 * 60)) })«`
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5377 raw steps → 32 distinct lines):
   1. L579 `settings.newdaily = result.newdaily ? result.newdaily : (lresult.newdaily ? »lresult.newdaily« : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   2. L12 `var »lastSend = {}, sheetCol = {}, sendingObject = {}, settings = {}«;`  · ELEMENT:object.setProperty
   3. L580 `settings.newmeet = result.newmeet ? result.newmeet : (lresult.newmeet ? »lresult.newmeet« : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   4. L581 `settings.spreadsheetId = result.spreadsheetId ? result.spreadsheetId : »lresult.spreadsheetId«`  · ELEMENT:member-element
   5. L582 `settings['freq'] = result['freq'] ? result['freq'] : (lresult['freq'] ? »lresult['freq']« : 300000)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   6. L583 `settings['status'] = result['status'] ? result['status'] : (lresult['status'] ? »lresult['status']« : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   7. L584 `settings['automated'] = result['automated'] ? result['automated'] : (lresult['automated'] ? »lresult['automated']« : true)`  · ELEMENT:member-element, ASSIGN:conditional-consequent
   8. L226 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary
   9. L924 `sinkbuffer = new Date().getTime() + »settings.freq«`  · ASSIGN:binary-right
  10. L922 `if (»request.from == 'end' || !sinkbuffer || sinkbuffer < new Date().getTime()«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:binary-left, ASSIGN:logical-left
  11. L1103 `if (»!settings['status'] || !settings['automated']«) {`  · ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  12. L1237 `lastSend[request.meet] = new Date().getTime() + »freq«`  · ASSIGN:identifier, ASSIGN:binary-right
  13. L1222 `if ((»!subscribed && !request.new && !request.end && (lastSend[request.meet] && lastSend[request.meet] > new Date().getTime())«)) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  14. L1229 `if (»!valueFilterLock && (request.new || request.end || (!lastSend[request.meet] || lastSend[request.meet] < new Date().getTime() || newUser))«) {`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  15. L295 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary
  16. L298 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary
  17. L674 `if (»settings.automated || settings.daily || settings.newmeet«) {`  · ASSIGN:logical-left, ASSIGN:logical-right
  18. L324 `if (»!request.id && !settings.spreadsheetId«) {`  · ASSIGN:unary, ASSIGN:logical-right
  19. L328 `if (»!settings.newmeet«) {`  · ASSIGN:unary
  20. L356 `if (»!settings.newdaily«) {`  · ASSIGN:unary
  21. L376 `request.sheetId = »settings[`${request.meet}sheetId`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  22. L380 `request.sheetDate = »settings[`${request.meet}sheetDate`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  23. L447 `request.sheetId = »settings[`${request.meet}sheetId`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  24. L552 `const freq = »settings.freq« | 300000`  · ASSIGN:binary-left
  25. L553 `»chrome.alarms.create('timedBackground', { periodInMinutes: parseInt(freq / (1000 * 60)) })«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:parseInt, ELEMENT:object.setProperty
  26. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · ELEMENT:object.setProperty
  27. L809 (→L821) `»    request.body = {«`  · ELEMENT:object.setProperty
  28. L1314 `if (»!request.id«) { return }`  · ASSIGN:unary
  29. L1408 (→L1415) `»    const options = {«`  · ELEMENT:object.setProperty
  30. L1427 `body: »JSON.stringify(options.request)«`  · RETURN:json.stringify
  31. L1421 (→L1428) `»    const option = {«`  · ELEMENT:object.setProperty
  32. L443 `if (»!settings.spreadsheetId«) {`  · ASSIGN:unary

---

## Flow #13 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `background` L608:C45 -> L608:C69  `settings[`${meet}sheetId`] = »result[`${meet}sheetId`]«`
- **Sink(s)**:
  - `FETCH_BODY` (https://script.googleapis.com/v1/scripts/1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS:run) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1775 raw steps → 14 distinct lines):
   1. L608 `settings[`${meet}sheetId`] = »result[`${meet}sheetId`]«`  · ELEMENT:member-element-container
   2. L12 `var lastSend = {}, sheetCol = {}, sendingObject = {}, »settings = {}«;`  · ELEMENT:object.setProperty
   3. L609 `settings[`${meet}sheetDate`] = »result[`${meet}sheetDate`]«`  · ELEMENT:member-element-container
   4. L610 `settings['sheetId'] = »result['sheetId']«`  · ELEMENT:member-element
   5. L611 `settings['sinksheetid'] = »result['sinksheetid']«`  · ELEMENT:member-element
   6. L612 `settings['sendtosink'] = »result['sendtosink']«`  · ELEMENT:member-element
   7. L376 `request.sheetId = »settings[`${request.meet}sheetId`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
   8. L380 `request.sheetDate = »settings[`${request.meet}sheetDate`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
   9. L447 `request.sheetId = »settings[`${request.meet}sheetId`]«`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  10. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · ELEMENT:object.setProperty
  11. L809 (→L821) `»    request.body = {«`  · ELEMENT:object.setProperty
  12. L1408 (→L1415) `»    const options = {«`  · ELEMENT:object.setProperty
  13. L1427 `body: »JSON.stringify(options.request)«`  · RETURN:json.stringify
  14. L1421 (→L1428) `»    const option = {«`  · ELEMENT:object.setProperty

---

## Flow #14 — JQUERY_ELEMENT_VAL (From storage.local.set('freq') in contentscript)  ·  252× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `contentscript` L1437:C65 -> L1437:C101  `attendancefrequency = $('#attendanceFreq').val() != '' ? »parseInt($('#attendanceFreq').val())« : ''`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L1220:C4 -> L1220:C34  `»chrome.storage.local.set(cach)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11357 raw steps → 33 distinct lines):
   1. L1437 _(in `contentscript`)_ `attendancefrequency = $('#attendanceFreq').val() != '' ? »parseInt($('#attendanceFreq').val())« : ''`  · RETURN:parseInt, ASSIGN:conditional-consequent
   2. L1439 `»chrome.storage.local.get('folderid', async function (lr«es) {`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L1443 `const s»heetTitle = await g«etLanguageMessage('sheetTitle')`  · ASSIGN:identifier
   4. L1440 (→L1444) `»«`  · ELEMENT:object.setProperty
   5. L88 _(in `contentscript`)_ `attendancefrequency = attendancefrequency ? »attendancefrequency« : 3000000`  · ASSIGN:identifier
   6. L1434 _(in `contentscript`)_ `$('#attendanceFreq').val(»attendancefrequency«)`  · ASSIGN:identifier
   7. L891 `»        newsink = n«ewsink.concat(newRows)`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L900 _(in `js/tests`)_ `»if (deprecations ==« null) {`  · ASSIGN:identifier
   9. L902 _(in `contentscript`)_ `console.log('interval', »attendancefrequency, attendancefrequency« / 1000, interval)`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L205 (→L207) `»        chrome.storage[type].get(key, function (val) {«`  · STORAGE:STORAGE_FLOW[area: local, key: freq, sender: contentscript, receiver: background]
  11. L1111 `const cacheArray = result['cache' + request.meet] ? »result['cache' + request.meet]« : [[]]`  · ELEMENT:computed-member-unknown-alternative, ASSIGN:conditional-consequent
  12. L1155 `if (»cacheArray[0][0]« != head1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:binary-left
  13. L1132 `const end = columnToLetter(map[»header[2]«] + 2)`  · ELEMENT:member-element-container
  14. L1577 `for (var i = 0; i < »arr.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  15. L1578 `var index = »arr[i].indexOf(k)«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  16. L1579 `if (»index« > -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L1580 `return [i, »index«];`  · ASSIGN:identifier
  18. L1190 `for (let i = 1; i < »cacheArray.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  19. L1191 `const coord = getIndexOfK(dataValues, »cacheArray[i][0]«)`  · ELEMENT:member-element-container, ELEMENT:member-element
  20. L1200 `const values = »cacheArray.slice«()`  · ELEMENT:member-element-container
  21. L1178 `if (»cacheArray[row][map[header[1]]] == absent && datarow[4]«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left
  22. L1195 `if (»cacheArray[i][5] != 'left' && cacheArray[i][map[header[1]]] != absent«) {`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  23. L1201 `for (let i = 0; i < »values.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  24. L1179 `cacheArray[row][map[»header[1]«]] = d`  · ELEMENT:member-element-container
  25. L1196 `cacheArray[i][map[»header[2]«]] = d`  · ELEMENT:member-element-container
  26. L1202 `values[i] = »values[i].slice«(0, 4)`  · ELEMENT:member-element-container
  27. L1182 `if (»datarow[5] == 'left' && cacheArray[row][5] != 'left'«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-right
  28. L1205 `object.data[0].dataFilter.gridRange.endRowIndex = »values.length«`  · ELEMENT:member.length
  29. L1134 (→L1153) `»    const object = {«`  · ELEMENT:object.setProperty
  30. L1184 `cacheArray[row][map[»header[2]«]] = d`  · ELEMENT:member-element-container
  31. L1207 `object.data[0].dataFilter.gridRange.endColumnIndex = »values[0].length«`  · ELEMENT:member-element-container, ELEMENT:member.length
  32. L1185 `»console.log('datacache left', cacheArray[row])«`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  33. L1218 `const »cach = {}«`  · ELEMENT:object.setProperty

---

## Flow #15 — JQUERY_ELEMENT_VAL (From storage.local.set('freq') in contentscript)  ·  21× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `background` L64:C0 -> L69:C1 (spans to L69)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1537:C24 -> L1537:C43  `let res = await »fetch(url, options)«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1030 raw steps → 8 distinct lines):
   1. L64 (→L69) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[contentscript->background]`
   2. L1368 `if (»!request.classId«) {`  · ASSIGN:unary
   3. L1379 `let url = token ? »`https://classroom.googleapis.com/v1/courses/${request.classId}/students?pageSize=30&pageToken=${token}` : `https://classroom.googleapis.com/v1/courses/${request.classId}/students?pageSize=30`«`  · ASSIGN:template-literal, ASSIGN:conditional-consequent
   4. L1380 `var roster = await fetchRetry(»url«, options)`  · ASSIGN:identifier
   5. L1532 `console.log('FETCH', options.method, »url«, options)`  · ASSIGN:identifier
   6. L1537 `let res = await fetch(»url«, options)`  · ASSIGN:identifier
   7. L1392 `let url = token ? »`https://classroom.googleapis.com/v1/courses/${request.classId}/teachers?pageSize=30&pageToken=${token}` : `https://classroom.googleapis.com/v1/courses/${request.classId}/teachers?pageSize=30`«`  · ASSIGN:template-literal, ASSIGN:conditional-consequent
   8. L1393 `var roster = await fetchRetry(»url«, options)`  · ASSIGN:identifier

---

## Flow #16 — ELEMENT_INNER_HTML (html)

- **Source**: `ELEMENT_INNER_HTML` — `popup` L14:C22 -> L14:C44  `var valStrH = »obj.innerHTML.toString«();`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `popup` L20:C16 -> L20:C25  `obj.»innerHTML« = valNewH;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (114 raw steps → 5 distinct lines):
   1. L14 `var valStrH = »obj.innerHTML.toString()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L15 (→L17) `var valNewH = »valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L19 `if (»valNewH != valStrH«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   4. L20 `obj.innerHTML = »valNewH«;`  · ASSIGN:identifier
   5. L10 `var »objects = document.getElementsByTagName('html')«;`  · ELEMENT:object.setProperty

---
