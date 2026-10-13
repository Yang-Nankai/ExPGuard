# Source-level Taint Flow — kdglfacllamekkphagegcaabjaicekin 3.1.8

- Source type: CRX
- Files with issues: 5 / 11
- Distinct taint flows: 7  (collapsed from 24 raw issue entries)
- Sinkless sources skipped: 29 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/index` L319:C8 -> L329:C3 (spans to L329)  `const »params = {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/index` L339:C2 -> L339:C46  `»postMessage({ cmd: 'id', params }, iframeId)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L319 (→L329) `»  const params = {«`  · ELEMENT:object.setProperty
   2. L339 `»postMessage({ cmd: 'id', params }, iframeId)«`  · ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_LOCATION (location.origin)

- **Source**: `DOCUMENT_LOCATION` — `js/index` L319:C8 -> L329:C3 (spans to L329)  `const »params = {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/index` L339:C2 -> L339:C46  `»postMessage({ cmd: 'id', params }, iframeId)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L319 (→L329) `»  const params = {«`  · ELEMENT:object.setProperty
   2. L339 `»postMessage({ cmd: 'id', params }, iframeId)«`  · ELEMENT:object.setProperty

---

## Flow #3 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `js/index` L319:C8 -> L329:C3 (spans to L329)  `const »params = {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `js/index` L339:C2 -> L339:C46  `»postMessage({ cmd: 'id', params }, iframeId)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L319 (→L329) `»  const params = {«`  · ELEMENT:object.setProperty
   2. L339 `»postMessage({ cmd: 'id', params }, iframeId)«`  · ELEMENT:object.setProperty

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L16:C63 -> L16:C70  `console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  background" + »message«.type);`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L15:C18 -> L21:C14 (spans to L21)  `chrome.runtime.onM»essageExternal.addListener((message, sender, sendResponse) => {«`
  - `CHROME_SYNC_STORAGE` (qiuqiToken) — `background` L34:C8 -> L34:C84  `»chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })«`
  - `CHROME_SYNC_STORAGE` (qiuqiData) — `js/bkutils` L25:C8 -> L25:C64  `»chrome.storage.sync.set({ qiuqiData: data }, (r) => { })«`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L279:C6 -> L279:C55  `»sendResponse(packMsgRep(true, response, message))«`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L284:C8 -> L284:C54  `»sendResponse(packMsgRep(false, eMes, message))«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (254 raw steps → 37 distinct lines):
   1. L16 `console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  background" + »message.type«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   2. L18 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L20 `updateRules(»message«)`  · ASSIGN:identifier
   4. L9 `import { updateRules, getParentUr»l } from './«js/bgTools.js'`  · ASSIGN:identifier, ELEMENT:member-element
   5. L10 `import config from '.»/common/conf«ig.js'`  · ASSIGN:identifier, ELEMENT:member-element
   6. L28 _(in `js/index`)_ `»return patterns.some(p«attern => pattern.test(url));`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L25 _(in `js/bkutils`)_ `»chrome.storage.sync.set({ qiuqiData: data }, (r) => { })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L34 `»chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   9. L60 `for (»let i in message.data«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  10. L61 `localData[»i] = message.data[i]«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  11. L11 `let »localData = {}«`  · ELEMENT:object.setProperty
  12. L94 `bqRfqTask(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  13. L763 (→L769) `»dataList.forEach((item) => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L23 _(in `js/index`)_ `pattern = patte»rn.replace(/\*/g, '.«*');`  · RETURN:json.stringify, ASSIGN:identifier
  15. L145 `.request(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  16. L12 _(in `js/http`)_ `»this.mergeOptions(requestOptions, options)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  17. L85 _(in `js/index`)_ `//» 阿里部分页面限制使«用insertAdjacentHTML`  · ASSIGN:identifier, ASSIGN:unary
  18. L89 _(in `js/http`)_ `if (»newOption[key] === undefined«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:implicit.add
  19. L92 _(in `js/http`)_ `»targetOption[key] = newOption[key]«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:implicit.add
  20. L4 (→L11) `»  fetchServer,«`  · ELEMENT:object.setProperty
  21. L157 `.request(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  22. L195 `.request(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  23. L240 `const { »imageBase64, orgwidth, orgheight, zipsize, orgsize, imgType } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[imageBase64], ELEMENT:destructure-property[orgwidth], ELEMENT:destructure-property[orgheight], ELEMENT:destructure-property[zipsize], ELEMENT:destructure-property[orgsize], ELEMENT:destructure-property[imgType]
  24. L272 `console.log('消息类型非法：', »message«)`  · ASSIGN:identifier
  25. L254 `let file = dataURLtoFile(»imageBase64«, 'img');`  · ASSIGN:identifier
  26. L273 `reject(»`消息 ${message} 类型非法。`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  27. L257 `formData.append('orgwidth', »orgwidth«)`  · ASSIGN:identifier
  28. L256 `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  29. L258 `formData.append('orgheight', »orgheight«)`  · ASSIGN:identifier
  30. L259 `formData.append('zipsize', »zipsize«)`  · ASSIGN:identifier
  31. L260 `formData.append('orgsize', »orgsize«)`  · ASSIGN:identifier
  32. L262 (→L267) `»        http.request({ method: 'post', url: 'https://file.made-in-china.com/img-search/upload', data: formData }).then(response => {«`  · ELEMENT:object.setProperty
  33. L279 `sendResponse(packMsgRep(true, response, »message«))`  · ASSIGN:identifier
  34. L114 `»  // console«.info('异步  ---getRfqBuyer ', cook)`  · ASSIGN:identifier, ELEMENT:member-element
  35. L112 (→L117) `»            //    格式«`  · ELEMENT:object.setProperty
  36. L251 `return new File([u8arr], filename + '.' + »imgType«, { type: 'application/octet-stream' });`  · ASSIGN:identifier, ASSIGN:binary-right
  37. L284 `sendResponse(packMsgRep(false, eMes, »message«))`  · ASSIGN:identifier

---

## Flow #5 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L228:C20 -> L228:C66  `const »cookies = await chrome.cookies.getAll({ url })«;`
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `background` L230:C22 -> L230:C71  `await »chrome.cookies.remove({ url, name: cookie.name })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18 raw steps → 3 distinct lines):
   1. L228 `const »cookies = await chrome.cookies.getAll({ url })«;`  · ELEMENT:object.setProperty
   2. L229 (→L231) `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L230 `»await chrome.cookies.remove({ url, name: cookie.name })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #6 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L522:C20 -> L522:C66  `const »cookies = await chrome.cookies.getAll({ url })«;`
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `background` L524:C22 -> L524:C71  `await »chrome.cookies.remove({ url, name: cookie.name })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18 raw steps → 3 distinct lines):
   1. L522 `const »cookies = await chrome.cookies.getAll({ url })«;`  · ELEMENT:object.setProperty
   2. L523 (→L525) `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L524 `»await chrome.cookies.remove({ url, name: cookie.name })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #7 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('qiuqiData') in background)  ·  18× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L16:C63 -> L16:C70  `console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  background" + »message«.type);`
- **Sink(s)**:
  - `WEBSOCKET_URL` — `background` L598:C14 -> L598:C76  `wsIns = »new WebSocket(config.wsBaseUrl + '/ws/connect?token=' + token)«`  (url-control=PARTIAL)
  - `CHROME_SYNC_STORAGE` (qiuqiData) — `js/bkutils` L25:C8 -> L25:C64  `»chrome.storage.sync.set({ qiuqiData: data }, (r) => { })«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1276 raw steps → 55 distinct lines):
   1. L16 `console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  background" + »message.type«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   2. L18 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L20 `updateRules(»message«)`  · ASSIGN:identifier
   4. L9 `import { updateRules, getParentUr»l } from './«js/bgTools.js'`  · ASSIGN:identifier, ELEMENT:member-element
   5. L10 `import config from '.»/common/conf«ig.js'`  · ASSIGN:identifier, ELEMENT:member-element
   6. L28 _(in `js/index`)_ `»return patterns.some(p«attern => pattern.test(url));`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L25 _(in `js/bkutils`)_ `»chrome.storage.sync.set({ qiuqiData: data }, (r) => { })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L34 `»chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   9. L60 `for (»let i in message.data«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  10. L61 `localData[»i] = message.data[i]«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  11. L11 `let »localData = {}«`  · ELEMENT:object.setProperty
  12. L94 `bqRfqTask(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  13. L763 (→L769) `»dataList.forEach((item) => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L23 _(in `js/index`)_ `pattern = patte»rn.replace(/\*/g, '.«*');`  · RETURN:json.stringify, ASSIGN:identifier
  15. L145 `.request(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  16. L12 _(in `js/http`)_ `»this.mergeOptions(requestOptions, options)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  17. L85 _(in `js/index`)_ `//» 阿里部分页面限制使«用insertAdjacentHTML`  · ASSIGN:identifier, ASSIGN:unary
  18. L89 _(in `js/http`)_ `if (»newOption[key] === undefined«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:implicit.add
  19. L92 _(in `js/http`)_ `»targetOption[key] = newOption[key]«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:implicit.add
  20. L4 (→L11) `»  fetchServer,«`  · ELEMENT:object.setProperty
  21. L157 `.request(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  22. L195 `.request(»message.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  23. L240 `const { »imageBase64, orgwidth, orgheight, zipsize, orgsize, imgType } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[imageBase64], ELEMENT:destructure-property[orgwidth], ELEMENT:destructure-property[orgheight], ELEMENT:destructure-property[zipsize], ELEMENT:destructure-property[orgsize], ELEMENT:destructure-property[imgType]
  24. L272 `console.log('消息类型非法：', »message«)`  · ASSIGN:identifier
  25. L254 `let file = dataURLtoFile(»imageBase64«, 'img');`  · ASSIGN:identifier
  26. L273 `reject(»`消息 ${message} 类型非法。`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  27. L257 `formData.append('orgwidth', »orgwidth«)`  · ASSIGN:identifier
  28. L256 `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  29. L258 `formData.append('orgheight', »orgheight«)`  · ASSIGN:identifier
  30. L259 `formData.append('zipsize', »zipsize«)`  · ASSIGN:identifier
  31. L260 `formData.append('orgsize', »orgsize«)`  · ASSIGN:identifier
  32. L262 (→L267) `»        http.request({ method: 'post', url: 'https://file.made-in-china.com/img-search/upload', data: formData }).then(response => {«`  · ELEMENT:object.setProperty
  33. L279 `sendResponse(packMsgRep(true, response, »message«))`  · ASSIGN:identifier
  34. L114 `»  // console«.info('异步  ---getRfqBuyer ', cook)`  · ASSIGN:identifier, ELEMENT:member-element
  35. L112 (→L117) `»            //    格式«`  · ELEMENT:object.setProperty
  36. L251 `return new File([u8arr], filename + '.' + »imgType«, { type: 'application/octet-stream' });`  · ASSIGN:identifier, ASSIGN:binary-right
  37. L284 `sendResponse(packMsgRep(false, eMes, »message«))`  · ASSIGN:identifier
  38. L172 (→L185) `»            chrome.storage.sync.get(['qiuqiData'], (r) => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: qiuqiData, sender: background, receiver: background]
  39. L173 `localData = »r.qiuqiData || {}«`  · ASSIGN:logical-left
  40. L177 `localData = »JSON.parse(localData)«`  · RETURN:json.parse
  41. L181 `if (»localData.vuex_token«) {`  · ELEMENT:member-element
  42. L751 `if (»localData.vuex_token«) {`  · ELEMENT:member-element
  43. L204 `statu»sText: response.stat«usText,`  · ELEMENT:member-element
  44. L201 (→L205) `»              // console.log(reader.result);«`  · ELEMENT:object.setProperty
  45. L215 _(in `js/index`)_ `Authorization: »localData.vuex_token«,`  · ELEMENT:member-element
  46. L207 (→L217) `»            };«`  · ELEMENT:object.setProperty
  47. L637 `if (»!wsIns && localData.vuex_token«) {`  · ELEMENT:member-element, ASSIGN:logical-right
  48. L638 `initWs(»localData.vuex_token«)`  · ELEMENT:member-element
  49. L598 `wsIns = new WebSocket(config.wsBaseUrl + '/ws/connect?token=' + »token«)`  · ASSIGN:identifier, ASSIGN:binary-right
  50. L641 `if (»!localData.vuex_token«) {`  · ELEMENT:member-element, ASSIGN:unary
  51. L756 `if (»localData.vuex_token«) {`  · ELEMENT:member-element
  52. L885 (→L888) `»      let result = await fetchServer(config.baseURL + '/subscribe/addrfq', localData, {«`  · ELEMENT:object.setProperty
  53. L214 (→L216) `»      }«`  · ASSIGN:conditional-alternate
  54. L953 `console.info('getRfqList === ', »localData.maxids«, keyword)`  · ELEMENT:member-element, ELEMENT:member-element-container
  55. L896 (→L899) `»      fetchServer(config.baseURL + '/subscribe/setmaxrfqid', localData, {«`  · ELEMENT:object.setProperty

---
