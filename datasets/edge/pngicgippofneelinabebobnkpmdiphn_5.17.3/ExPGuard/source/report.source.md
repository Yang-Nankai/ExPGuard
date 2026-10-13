# Source-level Taint Flow — pngicgippofneelinabebobnkpmdiphn 5.17.3

- Source type: CRX
- Files with issues: 6 / 8
- Distinct taint flows: 18  (collapsed from 113 raw issue entries)
- Sinkless sources skipped: 40 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `js/main` L233:C16 -> L233:C37  `var cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (user_info) — `js/main` L246:C4 -> L248:C6 (spans to L248)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (157 raw steps → 11 distinct lines):
   1. L233 `var »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L234 `for (var i = 0; i < »cookies.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
   3. L235 `if (»cookies[i].indexOf('plt_user_email')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   4. L236 `info['email'] = »decodeURIComponent(cookies[i].split('=')[1])«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURIComponent
   5. L232 `var »info = {}«;`  · ELEMENT:object.setProperty
   6. L247 `'user_info': »JSON.stringify(info)«`  · RETURN:json.stringify
   7. L246 (→L248) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   8. L238 `if (»cookies[i].indexOf('plt_user_nickname')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   9. L241 `if (»cookies[i].indexOf('plt_user_id')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  10. L242 `info['id'] = »decodeURIComponent(cookies[i].split('=')[1])«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURIComponent
  11. L245 `if (»info['email'] && info['name']«)`  · ASSIGN:logical-left

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(gwd_extension))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/main` L262:C7 -> L262:C15  `if (!»e.detail«.evt_from) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (currency) — `js/main` L203:C2 -> L205:C4 (spans to L205)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (browser_setinfo) — `js/main` L215:C4 -> L217:C6 (spans to L217)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (371 raw steps → 59 distinct lines):
   1. L262 `if (»!e.detail.evt_from«) {`  · ELEMENT:member-element, ASSIGN:unary
   2. L265 `if (»e.detail.evt_from.indexOf('bijiago')« > -1) return`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L266 `switch (»e.detail.type«) {`  · ELEMENT:member-element
   4. L268 `let reqId = »e.detail.reqId«`  · ELEMENT:member-element
   5. L271 `path: »e.detail.path«,`  · ELEMENT:member-element
   6. L269 (→L278) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   7. L272 `params: »e.detail.params«`  · ELEMENT:member-element
   8. L293 `data: »e.detail.value«`  · ELEMENT:member-element
   9. L291 (→L294) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  10. L299 `data: »e.detail.value«`  · ELEMENT:member-element
  11. L297 (→L300) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  12. L303 `sendListInfo(»e.detail.url, e.detail.data«)`  · ELEMENT:member-element
  13. L76 `url: »url«,`  · ASSIGN:identifier
  14. L74 (→L78) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  15. L77 `data: »data«`  · ASSIGN:identifier
  16. L306 `proxyRequestPost(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  17. L34 `url: »url«,`  · ASSIGN:identifier
  18. L32 (→L42) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  19. L35 `data: »payload«,`  · ASSIGN:identifier
  20. L311 `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  21. L48 `url: »url«,`  · ASSIGN:identifier
  22. L46 (→L56) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  23. L49 `data: »payload«,`  · ASSIGN:identifier
  24. L316 `proxyRequestPostWWWForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  25. L62 `url: »url«,`  · ASSIGN:identifier
  26. L60 (→L70) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  27. L63 `data: »payload«,`  · ASSIGN:identifier
  28. L321 `proxyRequest(»e.detail.url«, function (data) {`  · ELEMENT:member-element
  29. L21 `url: »url«,`  · ASSIGN:identifier
  30. L19 (→L28) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  31. L340 `downloadImg(»e.detail.src«);`  · ELEMENT:member-element
  32. L148 `if (»!src«) return;`  · ASSIGN:identifier, ASSIGN:unary
  33. L150 `src: »src«,`  · ASSIGN:identifier
  34. L149 (→L152) `»  var obj = {«`  · ELEMENT:object.setProperty
  35. L343 `var info = »e.detail.info«;`  · ELEMENT:member-element
  36. L345 `if (»info != '') info = JSON.parse(info)«`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:json.parse
  37. L353 `var info = »e.detail.info«;`  · ELEMENT:member-element
  38. L362 `setStoreRate(»e.detail.info«)`  · ELEMENT:member-element
  39. L204 `'currency': »currency«`  · ASSIGN:identifier
  40. L203 (→L205) `»  chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  41. L368 `sendMsg(»e.detail«, function (data) {`  · ELEMENT:member-element
  42. L82 `chrome.runtime.sendMessage(»url«, function (response) {`  · ASSIGN:identifier
  43. L373 `sendMsg(»e.detail«, function (data) { })`  · ELEMENT:member-element
  44. L376 `sendMsg(»e.detail«, function (data) {`  · ELEMENT:member-element
  45. L381 `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  46. L212 `»d.browser_setinfo[k] = v«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L215 (→L217) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  48. L384 `sendMsg(»e.detail«, function (data) {`  · ELEMENT:member-element
  49. L392 `sendMsg(»e.detail«, function (data) { })`  · ELEMENT:member-element
  50. L322 `dispatch('proxyRequest', data, »e.detail.url«)`  · ELEMENT:member-element
  51. L196 `id: »id«`  · ASSIGN:identifier
  52. L193 (→L197) `»  evt.initCustomEvent('gwd_content', true, true, {«`  · ELEMENT:object.setProperty
  53. L307 `dispatch('proxyRequestPost', data, »e.detail.reqId«)`  · ELEMENT:member-element
  54. L312 `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  55. L317 `dispatch('proxyRequestPostWWWForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  56. L275 `reqId: »reqId«,`  · ASSIGN:identifier
  57. L274 (→L277) `»        dispatch('backgroundResp', {«`  · ELEMENT:object.setProperty
  58. L377 `dispatch('commonReq' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  59. L194 `type: »b«,`  · ASSIGN:identifier

---

## Flow #3 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `js/backgroundTask` L3112:C10 -> L3112:C16  `if (»cookie«) {`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `js/backgroundTask` L3113:C8 -> L3127:C10 (spans to L3127)  `»chrome.cookies.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (41 raw steps → 10 distinct lines):
   1. L3112 `if (»cookie«) {`  · ASSIGN:identifier
   2. L3116 `value: »cookie.value«,`  · ASSIGN:identifier, ELEMENT:member-element
   3. L3113 (→L3127) `»        chrome.cookies.set({«`  · ELEMENT:object.setProperty
   4. L3117 `domain: »cookie.domain«,`  · ASSIGN:identifier, ELEMENT:member-element
   5. L3118 `path: »cookie.path«,`  · ASSIGN:identifier, ELEMENT:member-element
   6. L3119 `secure: »cookie.secure«,`  · ASSIGN:identifier, ELEMENT:member-element
   7. L3120 `httpOnly: »cookie.httpOnly«,`  · ASSIGN:identifier, ELEMENT:member-element
   8. L3121 `expirationDate: »cookie.expirationDate«,`  · ASSIGN:identifier, ELEMENT:member-element
   9. L3129 `resolve(»cookie«);`  · ASSIGN:identifier
  10. L3203 `res(»cookie«);`  · ASSIGN:identifier

---

## Flow #4 — CHROME_COOKIES_INFO (cookies(https://browser.gwdang.com/brwext/permanent_id))

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L97:C10 -> L97:C11  `if (»e« && e.value) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (browser_setinfo) — `js/background` L103:C6 -> L105:C8 (spans to L105)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (360 raw steps → 8 distinct lines):
   1. L97 `if (»e && e.value«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L98 `if (»e.value.indexOf('%')« > -1) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L99 `»e.value = decodeURIComponent(e.value)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:decodeURIComponent
   4. L101 `browserSetInfo.email = »e.value«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L70 (→L86) `»  var browserSetInfo = {«`  · ELEMENT:object.setProperty
   6. L103 (→L105) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   7. L89 `for (»var pattern« in browserSetInfo) {`  · ITERATE:loop.iteration
   8. L90 `»browserSetInfo[pattern] = data.browser_setinfo[pattern] || browserSetInfo[pattern]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-right

---

## Flow #5 — TARGET_CUSTOM_EVENT (target.addEventListener(gwd_extension))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L125:C0 -> L326:C4 (spans to L326)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `js/background` L168:C8 -> L175:C10 (spans to L175)  `»chrome.cookies.set({«`
  - `CHROME_COOKIES_SET_OPTIONS` — `js/background` L179:C8 -> L186:C10 (spans to L186)  `»chrome.cookies.set({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L198:C8 -> L204:C10 (spans to L204)  `»fetch(obj.url, {«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L198:C8 -> L204:C10 (spans to L204)  `»fetch(obj.url, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L207:C8 -> L213:C10 (spans to L213)  `»fetch(obj.url, {«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L207:C8 -> L213:C10 (spans to L213)  `»fetch(obj.url, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L250:C8 -> L258:C10 (spans to L258)  `»fetch(obj.url, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L273:C8 -> L280:C10 (spans to L280)  `»fetch(obj.url, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L355:C2 -> L359:C4 (spans to L359)  `»fetch(url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L207:C8 -> L213:C10 (spans to L213)  `»fetch(obj.url, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L355:C2 -> L359:C4 (spans to L359)  `»fetch(url, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L250:C8 -> L258:C10 (spans to L258)  `»fetch(obj.url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1961 raw steps → 58 distinct lines):
   1. L125 (→L326) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/main->js/background]`
   2. L168 (→L175) `»        chrome.cookies.set({«`  · ELEMENT:object.setProperty
   3. L179 (→L186) `»        chrome.cookies.set({«`  · ELEMENT:object.setProperty
   4. L146 `if (»(obj.url || obj.info) && (obj.type.includes('proxyRequest') || obj.type === 'getTaobaoTrend')«) {`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right, RETURN:fallback-return, ASSIGN:binary-left
   5. L151 `let »url = new URL(obj.url || obj.info), refererUrl = new URL(referer)«`  · ASSIGN:logical-left, ELEMENT:object.setProperty, INITIAL:URL.constructor, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
   6. L114 `var base64 = »dataURI«`  · ASSIGN:identifier
   7. L115 `var raw = »atob(base64).split(',')«;`  · ASSIGN:identifier, RETURN:atob, ELEMENT:member-element, RETURN:fallback-return
   8. L116 `var rawLength = »raw.length«;`  · ASSIGN:identifier, ELEMENT:member.length
   9. L117 `var »array = new Uint8Array(new ArrayBuffer(rawLength))«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L119 `for(var i = 0; i < »rawLength«; i++) {`  · ASSIGN:identifier, ASSIGN:binary-right
  11. L120 `array[i] = »parseInt(raw[i])«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt
  12. L198 (→L204) `fetch(»obj.url, {«`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
  13. L152 `let host = »url.host, refererHost = refererUrl.host«`  · ELEMENT:member-element
  14. L207 (→L219) `fetch(»obj.url, {«`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
  15. L224 `if (»obj.data.GWD_FORCE_FILE«) {`  · ELEMENT:member-element, ASSIGN:identifier
  16. L225 `let forceFileList = »obj.data.GWD_FORCE_FILE«`  · ELEMENT:member-element, ASSIGN:identifier
  17. L227 (→L236) `»forceFileList.forEach(item => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L289 `request(»obj.url.replace('callback=?', '')«, function(data) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  19. L355 (→L359) `fetch(»url, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  20. L147 `const referer = »obj.referer«`  · ASSIGN:identifier, ELEMENT:member-element
  21. L165 `switch (»obj.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
  22. L148 `if (»!referer«) {`  · ASSIGN:identifier, ASSIGN:unary
  23. L171 `value: »obj.data«,`  · ASSIGN:identifier, ELEMENT:member-element
  24. L182 `value: »obj.data«,`  · ASSIGN:identifier, ELEMENT:member-element
  25. L200 `body: convertDataURIToBinary(»obj.data«),`  · ASSIGN:identifier, ELEMENT:member-element
  26. L209 `body: »obj.data«,`  · ASSIGN:identifier, ELEMENT:member-element
  27. L211 `'x-referer': »obj.referer«`  · ASSIGN:identifier, ELEMENT:member-element
  28. L223 `console.log(»obj.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  29. L267 `console.log(»obj.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  30. L268 `const params = Object.keys(»obj.data«).map(item => {`  · ASSIGN:identifier, ELEMENT:member-element
  31. L296 `}, »obj.referer«)`  · ASSIGN:identifier, ELEMENT:member-element
  32. L357 `'x-referer': »referer«`  · ASSIGN:identifier
  33. L238 `Object.keys(»obj.data«).forEach(item => {`  · ASSIGN:identifier, ELEMENT:member-element
  34. L299 `request(»obj.info«, function(content) {`  · ASSIGN:identifier, ELEMENT:member-element
  35. L250 (→L264) `fetch(»obj.url, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  36. L254 `'x-referer': »obj.referer«,`  · ASSIGN:identifier, ELEMENT:member-element
  37. L255 `referer: »obj.referer«,`  · ASSIGN:identifier, ELEMENT:member-element
  38. L273 `fetch(»obj.url«, {`  · ASSIGN:identifier, ELEMENT:member-element
  39. L323 `console.log('empty type', »obj.type«)`  · ASSIGN:identifier, ELEMENT:member-element
  40. L155 `const whiteList = whiteListL2.some(item => »refererHost.endsWith(item)«) ? whiteListL2 : whiteListL1`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  41. L158 `return »host.endsWith(item)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  42. L228 `const imgBase64 = »obj.data[item]«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  43. L229 `if (»typeof imgBase64 !== 'string' || imgBase64.indexOf('data:') !== 0«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-right
  44. L232 `const fileType = »imgBase64.split(';')[0].split('/')[1]«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  45. L234 `const file = dataURLtoFile(»imgBase64, `blob.${fileType}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  46. L4 `var arr = »dataurl.split(',')«,`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  47. L5 `mime = »arr[0].match(/:(.*?);/)[1]«,`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  48. L6 `bstr = »atob(arr[arr.length - 1])«,`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, RETURN:atob
  49. L7 `n = »bstr.length«,`  · ASSIGN:identifier, ELEMENT:member.length
  50. L8 `»u8arr = new Uint8Array(n)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor, ELEMENT:object.setProperty
  51. L9 `while(»n--«){`  · ASSIGN:identifier, ASSIGN:update
  52. L10 `u8arr[»n] = bstr.charCodeAt(n)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  53. L12 `»return new File([u8arr], filename, {type:mime});«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  54. L235 `»obj«.data[item] = file`  · ASSIGN:identifier
  55. L240 `formData.append(item, »obj.data[item], obj.data[item].name«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  56. L222 `let »formData = new FormData()«`  · ELEMENT:object.setProperty
  57. L243 `formData.append(item, »obj.data[item]«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  58. L269 `return »`${encodeURIComponent(item)}=${encodeURIComponent(obj.data[item])}`«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container, RETURN:encodeURIComponent, ASSIGN:template-literal

---

## Flow #6 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/background` L125:C0 -> L326:C4 (spans to L326)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L207:C8 -> L213:C10 (spans to L213)  `»fetch(obj.url, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L250:C8 -> L258:C10 (spans to L258)  `»fetch(obj.url, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L355:C2 -> L359:C4 (spans to L359)  `»fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (81 raw steps → 8 distinct lines):
   1. L125 (→L326) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/main->js/background]`
   2. L148 `if (»!referer«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L151 `let url = new URL(obj.url || obj.info), »refererUrl = new URL(referer)«`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor
   4. L152 `let host = url.host, refererHost = »refererUrl.host«`  · ELEMENT:member-element
   5. L207 (→L219) `»        fetch(obj.url, {«`  · ELEMENT:object.setProperty
   6. L250 (→L264) `»        fetch(obj.url, {«`  · ELEMENT:object.setProperty
   7. L357 `'x-referer': »referer«`  · ASSIGN:identifier
   8. L355 (→L359) `»  fetch(url, {«`  · ELEMENT:object.setProperty

---

## Flow #7 — CHROME_COOKIES_INFO (cookies(https://www.gwdang.com/))

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L536:C8 -> L536:C9  `if (»e« && e.value) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L355:C2 -> L359:C4 (spans to L359)  `»fetch(url, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (953 raw steps → 9 distinct lines):
   1. L536 `if (»e && e.value«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L537 `EmailCache = »e.value«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L538 `getFavor(»e.value«, 1, editFavor)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L364 `if (»!email«) return;`  · ASSIGN:identifier, ASSIGN:unary
   5. L366 `var url = »"https://www.gwdang.com/window/collect?email=" + email + "&pg=" + pg« + "&ps=50";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
   6. L367 `request(»url«, function(data) {`  · ASSIGN:identifier
   7. L355 `fetch(»url«, {`  · ASSIGN:identifier
   8. L382 `getFavor(»EmailCache«, getPg, editFavor2)`  · ASSIGN:identifier
   9. L411 `obj[»EmailCache«] = data.favorData`  · ASSIGN:identifier

---

## Flow #8 — TARGET_CUSTOM_EVENT (From storage.local.set('browser_setinfo') in js/main)  ·  3× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L262:C7 -> L262:C15  `»     sen«dResponse(r)`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (browser_setinfo) — `js/background` L103:C6 -> L105:C8 (spans to L105)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (485 raw steps → 65 distinct lines):
   1. L262 `»      sendResponse«(r)`  · ELEMENT:member-element, ASSIGN:unary
   2. L265 _(in `js/main`)_ `if (»e.detail.evt_from.indexOf('bijiago')« > -1) return`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L266 `case» 'proxyReques«tPostWWWForm':`  · ELEMENT:member-element
   4. L268 `const para»ms = Object.ke«ys(obj.data).map(item => {`  · ELEMENT:member-element
   5. L271 `consol»e.log(params)«`  · ELEMENT:member-element
   6. L269 (→L278) `»          return `${encodeURIComponent(item)}=${encodeURIComponent(obj.data[item])}`«`  · ELEMENT:object.setProperty
   7. L272 _(in `js/backgroundTask`)_ `while (react»ion = reactions«.get()) {`  · ELEMENT:member-element
   8. L293 _(in `js/backgroundTask`)_ `var onUnhandle»d = function («state) {`  · ELEMENT:member-element
   9. L291 (→L294) `»            data = JSON.parse(data)«`  · ELEMENT:object.setProperty
  10. L299 `reques»t(obj.info, fu«nction(content) {`  · ELEMENT:member-element
  11. L297 (→L300) `»        break;«`  · ELEMENT:object.setProperty
  12. L303 _(in `js/backgroundTask`)_ `} else disp»atchEvent(UNHANDLED_REJECTI«ON, promise, value);`  · ELEMENT:member-element
  13. L76 `setSh»owP«romo: '1',`  · ASSIGN:identifier
  14. L74 (→L78) `»    bottom_fold: '0',«`  · ELEMENT:object.setProperty
  15. L77 `setInf»oNum«: '1',`  · ASSIGN:identifier
  16. L306 _(in `js/backgroundTask`)_ `state.rejection =» IS_NODE || isUnhandled(state)« ? UNHANDLED : HANDLED;`  · ELEMENT:member-element
  17. L34 `} els»e {«`  · ASSIGN:identifier
  18. L32 (→L42) `»    if (data && data.run_before == "1") {«`  · ELEMENT:object.setProperty
  19. L35 `chro»me.stor«age.local.set({`  · ASSIGN:identifier
  20. L311 _(in `js/main`)_ `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  21. L48 `} catch (»e) «{};`  · ASSIGN:identifier
  22. L46 (→L56) `»  })«`  · ELEMENT:object.setProperty
  23. L49 _(in `js/chrome`)_ `if (ty»pe === «'换购') {`  · ASSIGN:identifier
  24. L316 _(in `js/main`)_ `proxyRequestPostWWWForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  25. L62 `befor»est«r = beforestr + str[parseInt(Math.random() * 10)]`  · ASSIGN:identifier
  26. L60 (→L70) `»    type = 'edge';«`  · ELEMENT:object.setProperty
  27. L63 _(in `js/chrome`)_ `if» (!(pro«moItem && promoItem.text)) {`  · ASSIGN:identifier
  28. L321 `//   sendRe»sponse(conte«nt)`  · ELEMENT:member-element
  29. L21 `unins»tal«lUrl = 'https://www.gwdang.com/brwext/uninstall?browser=qq';`  · ASSIGN:identifier
  30. L19 (→L28) `»  if (utype.indexOf('qqbrowser') > -1) {«`  · ELEMENT:object.setProperty
  31. L340 `request(url, fun»ction(data) «{`  · ELEMENT:member-element
  32. L148 `»if («!referer) {`  · ASSIGN:identifier, ASSIGN:unary
  33. L150 _(in `js/popup`)_ `rmsPrefi»x =« /^-ms-/,`  · ASSIGN:identifier
  34. L149 (→L152) `»        return«`  · ELEMENT:object.setProperty
  35. L343 `if (newdata) »newdata = new«data[1];`  · ELEMENT:member-element
  36. L345 _(in `js/backgroundTask`)_ `if (stat»e.facade === value) throw new TypeE«rror("Promise can't be resolved itself");`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:json.parse
  37. L353 _(in `js/backgroundTask`)_ `bind(»internalRejec«t, wrapper, state)`  · ELEMENT:member-element
  38. L362 _(in `js/chrome`)_ `if (thi»s.options.len«gth > 2) {`  · ELEMENT:member-element
  39. L204 _(in `js/backgroundTask`)_ `var setInternalS»tate = I«nternalStateModule.set;`  · ASSIGN:identifier
  40. L203 (→L205) `»          }«`  · ELEMENT:object.setProperty
  41. L368 _(in `js/chrome`)_ `setPro»ducts: f«unction (products) {`  · ELEMENT:member-element
  42. L82 _(in `js/backgroundTask`)_ `var stringSlice = uncurryThis»(''«.slice);`  · ASSIGN:identifier
  43. L373 `function editF»avor(dat«a) {`  · ELEMENT:member-element
  44. L376 `if (!data »|| data.«result_code !== 1) return;`  · ELEMENT:member-element
  45. L381 _(in `js/main`)_ `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  46. L212 _(in `js/backgroundTask`)_ `var ne»wGenericPromiseCapabilit«y = newPromiseCapability;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L215 (→L217) `»            sendResponse(JSON.parse(r))«`  · ELEMENT:object.setProperty
  48. L384 _(in `js/backgroundTask`)_ `PromiseProto»type = P«romiseConstructor.prototype;`  · ELEMENT:member-element
  49. L392 `function editF»avor2(da«ta) {`  · ELEMENT:member-element
  50. L322 _(in `js/popup`)_ `// Since version 1.3, DOM methods and »functions li«ke alert`  · ELEMENT:member-element
  51. L196 `»br«eak;`  · ASSIGN:identifier
  52. L193 (→L197) `»          let val = e ? e.value: ''«`  · ELEMENT:object.setProperty
  53. L307 _(in `js/chrome`)_ `if (f) throw new TypeError("Generat»or is already «executing.");`  · ELEMENT:member-element
  54. L312 _(in `js/main`)_ `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  55. L317 _(in `js/chrome`)_ `if (!(t = _.trys, t = t.length» > 0 && t[t.le«ngth - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }`  · ELEMENT:member-element
  56. L275 `body: p»arams«,`  · ASSIGN:identifier
  57. L274 (→L277) `»          method: 'post',«`  · ELEMENT:object.setProperty
  58. L377 _(in `js/main`)_ `dispatch('commonReq' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  59. L194 `»s«endResponse(`${val}`)`  · ASSIGN:identifier
  60. L87 (→L108) `»  chrome.storage.local.get('browser_setinfo', function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: browser_setinfo, sender: js/main, receiver: js/background]
  61. L90 `»browserSetInfo[pattern] = data.browser_setinfo[pattern] || browserSetInfo[pattern]«;`  · ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
  62. L70 (→L86) `»  var browserSetInfo = {«`  · ELEMENT:object.setProperty
  63. L103 (→L105) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  64. L89 `for (»var pattern« in browserSetInfo) {`  · ITERATE:loop.iteration
  65. L88 `if (»data && data.browser_setinfo«) {`  · ASSIGN:logical-right

---

## Flow #9 — CHROME_COOKIES_INFO (From storage.local.set('browser_setinfo') in js/background)  ·  54× duplicate paths collapsed

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L97:C10 -> L97:C11  `if (»e« && e.value) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (browser_setinfo) — `js/background` L103:C6 -> L105:C8 (spans to L105)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (414 raw steps → 10 distinct lines):
   1. L97 `if (»e && e.value«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L98 `if (»e.value.indexOf('%')« > -1) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L99 `»e.value = decodeURIComponent(e.value)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:decodeURIComponent
   4. L101 `browserSetInfo.email = »e.value«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L70 (→L86) `»  var browserSetInfo = {«`  · ELEMENT:object.setProperty
   6. L103 (→L105) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   7. L89 `for (»var pattern« in browserSetInfo) {`  · ITERATE:loop.iteration
   8. L90 `»browserSetInfo[pattern] = data.browser_setinfo[pattern] || browserSetInfo[pattern]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-right, ASSIGN:logical-left
   9. L87 (→L108) `»  chrome.storage.local.get('browser_setinfo', function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: browser_setinfo, sender: js/background, receiver: js/background]
  10. L88 `if (»data && data.browser_setinfo«) {`  · ASSIGN:logical-right

---

## Flow #10 — TARGET_CUSTOM_EVENT (From storage.local.set('currency') in js/main)

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L262:C7 -> L262:C15  `»     sen«dResponse(r)`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (currency) — `js/background` L433:C14 -> L433:C44  `»chrome.storage.local.set(data)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (374 raw steps → 61 distinct lines):
   1. L262 `»      sendResponse«(r)`  · ELEMENT:member-element, ASSIGN:unary
   2. L265 _(in `js/main`)_ `if (»e.detail.evt_from.indexOf('bijiago')« > -1) return`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L266 `case» 'proxyReques«tPostWWWForm':`  · ELEMENT:member-element
   4. L268 `const para»ms = Object.ke«ys(obj.data).map(item => {`  · ELEMENT:member-element
   5. L271 `consol»e.log(params)«`  · ELEMENT:member-element
   6. L269 (→L278) `»          return `${encodeURIComponent(item)}=${encodeURIComponent(obj.data[item])}`«`  · ELEMENT:object.setProperty
   7. L272 _(in `js/backgroundTask`)_ `while (react»ion = reactions«.get()) {`  · ELEMENT:member-element
   8. L293 _(in `js/backgroundTask`)_ `var onUnhandle»d = function («state) {`  · ELEMENT:member-element
   9. L291 (→L294) `»            data = JSON.parse(data)«`  · ELEMENT:object.setProperty
  10. L299 `reques»t(obj.info, fu«nction(content) {`  · ELEMENT:member-element
  11. L297 (→L300) `»        break;«`  · ELEMENT:object.setProperty
  12. L303 _(in `js/backgroundTask`)_ `} else disp»atchEvent(UNHANDLED_REJECTI«ON, promise, value);`  · ELEMENT:member-element
  13. L76 `setSh»owP«romo: '1',`  · ASSIGN:identifier
  14. L74 (→L78) `»    bottom_fold: '0',«`  · ELEMENT:object.setProperty
  15. L77 `setInf»oNum«: '1',`  · ASSIGN:identifier
  16. L306 _(in `js/backgroundTask`)_ `state.rejection =» IS_NODE || isUnhandled(state)« ? UNHANDLED : HANDLED;`  · ELEMENT:member-element
  17. L34 `} els»e {«`  · ASSIGN:identifier
  18. L32 (→L42) `»    if (data && data.run_before == "1") {«`  · ELEMENT:object.setProperty
  19. L35 `chro»me.stor«age.local.set({`  · ASSIGN:identifier
  20. L311 _(in `js/main`)_ `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  21. L48 `} catch (»e) «{};`  · ASSIGN:identifier
  22. L46 (→L56) `»  })«`  · ELEMENT:object.setProperty
  23. L49 _(in `js/chrome`)_ `if (ty»pe === «'换购') {`  · ASSIGN:identifier
  24. L316 _(in `js/main`)_ `proxyRequestPostWWWForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  25. L62 `befor»est«r = beforestr + str[parseInt(Math.random() * 10)]`  · ASSIGN:identifier
  26. L60 (→L70) `»    type = 'edge';«`  · ELEMENT:object.setProperty
  27. L63 _(in `js/chrome`)_ `if» (!(pro«moItem && promoItem.text)) {`  · ASSIGN:identifier
  28. L321 `//   sendRe»sponse(conte«nt)`  · ELEMENT:member-element
  29. L21 `unins»tal«lUrl = 'https://www.gwdang.com/brwext/uninstall?browser=qq';`  · ASSIGN:identifier
  30. L19 (→L28) `»  if (utype.indexOf('qqbrowser') > -1) {«`  · ELEMENT:object.setProperty
  31. L340 `request(url, fun»ction(data) «{`  · ELEMENT:member-element
  32. L148 `»if («!referer) {`  · ASSIGN:identifier, ASSIGN:unary
  33. L150 _(in `js/popup`)_ `rmsPrefi»x =« /^-ms-/,`  · ASSIGN:identifier
  34. L149 (→L152) `»        return«`  · ELEMENT:object.setProperty
  35. L343 `if (newdata) »newdata = new«data[1];`  · ELEMENT:member-element
  36. L345 _(in `js/backgroundTask`)_ `if (stat»e.facade === value) throw new TypeE«rror("Promise can't be resolved itself");`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:json.parse
  37. L353 _(in `js/backgroundTask`)_ `bind(»internalRejec«t, wrapper, state)`  · ELEMENT:member-element
  38. L362 _(in `js/chrome`)_ `if (thi»s.options.len«gth > 2) {`  · ELEMENT:member-element
  39. L204 _(in `js/backgroundTask`)_ `var setInternalS»tate = I«nternalStateModule.set;`  · ASSIGN:identifier
  40. L203 (→L205) `»          }«`  · ELEMENT:object.setProperty
  41. L368 _(in `js/chrome`)_ `setPro»ducts: f«unction (products) {`  · ELEMENT:member-element
  42. L82 _(in `js/backgroundTask`)_ `var stringSlice = uncurryThis»(''«.slice);`  · ASSIGN:identifier
  43. L373 `function editF»avor(dat«a) {`  · ELEMENT:member-element
  44. L376 `if (!data »|| data.«result_code !== 1) return;`  · ELEMENT:member-element
  45. L381 _(in `js/main`)_ `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  46. L212 _(in `js/backgroundTask`)_ `var ne»wGenericPromiseCapabilit«y = newPromiseCapability;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L215 (→L217) `»            sendResponse(JSON.parse(r))«`  · ELEMENT:object.setProperty
  48. L384 _(in `js/backgroundTask`)_ `PromiseProto»type = P«romiseConstructor.prototype;`  · ELEMENT:member-element
  49. L392 `function editF»avor2(da«ta) {`  · ELEMENT:member-element
  50. L322 _(in `js/popup`)_ `// Since version 1.3, DOM methods and »functions li«ke alert`  · ELEMENT:member-element
  51. L196 `»br«eak;`  · ASSIGN:identifier
  52. L193 (→L197) `»          let val = e ? e.value: ''«`  · ELEMENT:object.setProperty
  53. L307 _(in `js/chrome`)_ `if (f) throw new TypeError("Generat»or is already «executing.");`  · ELEMENT:member-element
  54. L312 _(in `js/main`)_ `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  55. L317 _(in `js/chrome`)_ `if (!(t = _.trys, t = t.length» > 0 && t[t.le«ngth - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }`  · ELEMENT:member-element
  56. L275 `body: p»arams«,`  · ASSIGN:identifier
  57. L274 (→L277) `»          method: 'post',«`  · ELEMENT:object.setProperty
  58. L377 _(in `js/main`)_ `dispatch('commonReq' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  59. L194 `»s«endResponse(`${val}`)`  · ASSIGN:identifier
  60. L429 (→L437) `»      chrome.storage.local.get(EmailCache, function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: currency, sender: js/main, receiver: js/background]
  61. L430 `if (»data[EmailCache]«) {`  · ELEMENT:computed-member-unknown-alternative

---

## Flow #11 — TARGET_CUSTOM_EVENT (From storage.local.set('currency') in js/background)

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L262:C7 -> L262:C15  `»     sen«dResponse(r)`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (currency) — `js/background` L433:C14 -> L433:C44  `»chrome.storage.local.set(data)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (375 raw steps → 61 distinct lines):
   1. L262 `»      sendResponse«(r)`  · ELEMENT:member-element, ASSIGN:unary
   2. L265 _(in `js/main`)_ `if (»e.detail.evt_from.indexOf('bijiago')« > -1) return`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L266 `case» 'proxyReques«tPostWWWForm':`  · ELEMENT:member-element
   4. L268 `const para»ms = Object.ke«ys(obj.data).map(item => {`  · ELEMENT:member-element
   5. L271 `consol»e.log(params)«`  · ELEMENT:member-element
   6. L269 (→L278) `»          return `${encodeURIComponent(item)}=${encodeURIComponent(obj.data[item])}`«`  · ELEMENT:object.setProperty
   7. L272 _(in `js/backgroundTask`)_ `while (react»ion = reactions«.get()) {`  · ELEMENT:member-element
   8. L293 _(in `js/backgroundTask`)_ `var onUnhandle»d = function («state) {`  · ELEMENT:member-element
   9. L291 (→L294) `»            data = JSON.parse(data)«`  · ELEMENT:object.setProperty
  10. L299 `reques»t(obj.info, fu«nction(content) {`  · ELEMENT:member-element
  11. L297 (→L300) `»        break;«`  · ELEMENT:object.setProperty
  12. L303 _(in `js/backgroundTask`)_ `} else disp»atchEvent(UNHANDLED_REJECTI«ON, promise, value);`  · ELEMENT:member-element
  13. L76 `setSh»owP«romo: '1',`  · ASSIGN:identifier
  14. L74 (→L78) `»    bottom_fold: '0',«`  · ELEMENT:object.setProperty
  15. L77 `setInf»oNum«: '1',`  · ASSIGN:identifier
  16. L306 _(in `js/backgroundTask`)_ `state.rejection =» IS_NODE || isUnhandled(state)« ? UNHANDLED : HANDLED;`  · ELEMENT:member-element
  17. L34 `} els»e {«`  · ASSIGN:identifier
  18. L32 (→L42) `»    if (data && data.run_before == "1") {«`  · ELEMENT:object.setProperty
  19. L35 `chro»me.stor«age.local.set({`  · ASSIGN:identifier
  20. L311 _(in `js/main`)_ `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  21. L48 `} catch (»e) «{};`  · ASSIGN:identifier
  22. L46 (→L56) `»  })«`  · ELEMENT:object.setProperty
  23. L49 _(in `js/chrome`)_ `if (ty»pe === «'换购') {`  · ASSIGN:identifier
  24. L316 _(in `js/main`)_ `proxyRequestPostWWWForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  25. L62 `befor»est«r = beforestr + str[parseInt(Math.random() * 10)]`  · ASSIGN:identifier
  26. L60 (→L70) `»    type = 'edge';«`  · ELEMENT:object.setProperty
  27. L63 _(in `js/chrome`)_ `if» (!(pro«moItem && promoItem.text)) {`  · ASSIGN:identifier
  28. L321 `//   sendRe»sponse(conte«nt)`  · ELEMENT:member-element
  29. L21 `unins»tal«lUrl = 'https://www.gwdang.com/brwext/uninstall?browser=qq';`  · ASSIGN:identifier
  30. L19 (→L28) `»  if (utype.indexOf('qqbrowser') > -1) {«`  · ELEMENT:object.setProperty
  31. L340 `request(url, fun»ction(data) «{`  · ELEMENT:member-element
  32. L148 `»if («!referer) {`  · ASSIGN:identifier, ASSIGN:unary
  33. L150 _(in `js/popup`)_ `rmsPrefi»x =« /^-ms-/,`  · ASSIGN:identifier
  34. L149 (→L152) `»        return«`  · ELEMENT:object.setProperty
  35. L343 `if (newdata) »newdata = new«data[1];`  · ELEMENT:member-element
  36. L345 _(in `js/backgroundTask`)_ `if (stat»e.facade === value) throw new TypeE«rror("Promise can't be resolved itself");`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:json.parse
  37. L353 _(in `js/backgroundTask`)_ `bind(»internalRejec«t, wrapper, state)`  · ELEMENT:member-element
  38. L362 _(in `js/chrome`)_ `if (thi»s.options.len«gth > 2) {`  · ELEMENT:member-element
  39. L204 _(in `js/backgroundTask`)_ `var setInternalS»tate = I«nternalStateModule.set;`  · ASSIGN:identifier
  40. L203 (→L205) `»          }«`  · ELEMENT:object.setProperty
  41. L368 _(in `js/chrome`)_ `setPro»ducts: f«unction (products) {`  · ELEMENT:member-element
  42. L82 _(in `js/backgroundTask`)_ `var stringSlice = uncurryThis»(''«.slice);`  · ASSIGN:identifier
  43. L373 `function editF»avor(dat«a) {`  · ELEMENT:member-element
  44. L376 `if (!data »|| data.«result_code !== 1) return;`  · ELEMENT:member-element
  45. L381 _(in `js/main`)_ `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  46. L212 _(in `js/backgroundTask`)_ `var ne»wGenericPromiseCapabilit«y = newPromiseCapability;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L215 (→L217) `»            sendResponse(JSON.parse(r))«`  · ELEMENT:object.setProperty
  48. L384 _(in `js/backgroundTask`)_ `PromiseProto»type = P«romiseConstructor.prototype;`  · ELEMENT:member-element
  49. L392 `function editF»avor2(da«ta) {`  · ELEMENT:member-element
  50. L322 _(in `js/popup`)_ `// Since version 1.3, DOM methods and »functions li«ke alert`  · ELEMENT:member-element
  51. L196 `»br«eak;`  · ASSIGN:identifier
  52. L193 (→L197) `»          let val = e ? e.value: ''«`  · ELEMENT:object.setProperty
  53. L307 _(in `js/chrome`)_ `if (f) throw new TypeError("Generat»or is already «executing.");`  · ELEMENT:member-element
  54. L312 _(in `js/main`)_ `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  55. L317 _(in `js/chrome`)_ `if (!(t = _.trys, t = t.length» > 0 && t[t.le«ngth - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }`  · ELEMENT:member-element
  56. L275 `body: p»arams«,`  · ASSIGN:identifier
  57. L274 (→L277) `»          method: 'post',«`  · ELEMENT:object.setProperty
  58. L377 _(in `js/main`)_ `dispatch('commonReq' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  59. L194 `»s«endResponse(`${val}`)`  · ASSIGN:identifier
  60. L429 (→L437) `»      chrome.storage.local.get(EmailCache, function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: currency, sender: js/main, receiver: js/background], STORAGE:STORAGE_FLOW[area: local, key: currency, sender: js/background, receiver: js/background]
  61. L430 `if (»data[EmailCache]«) {`  · ELEMENT:computed-member-unknown-alternative

---

## Flow #12 — DOCUMENT_COOKIE (From storage.local.set('user_info') in js/main)  ·  3× duplicate paths collapsed

- **Source**: `DOCUMENT_COOKIE` — `js/backgroundTask` L233:C16 -> L233:C37  `var ok = state».state === FULFILLED;«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (user_info) — `js/background` L433:C14 -> L433:C44  `»chrome.storage.local.set(data)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (160 raw steps → 13 distinct lines):
   1. L233 _(in `js/popup`)_ `retu»rn this.prevObject || this.construct«or(null);`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L234 `const file» = dataURLtoFi«le(imgBase64, `blob.${fileType}`)`  · ELEMENT:member.length, ASSIGN:binary-right
   3. L235 _(in `js/main`)_ `if (»cookies[i].indexOf('plt_user_email')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   4. L236 _(in `js/main`)_ `info['email'] = »decodeURIComponent(cookies[i].split('=')[1])«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURIComponent
   5. L232 `»      con«st fileType = imgBase64.split(';')[0].split('/')[1]`  · ELEMENT:object.setProperty
   6. L247 `// for (con»st pair of formData)« {`  · RETURN:json.stringify
   7. L246 (→L248) `»        // const data = new URLSearchParams()«`  · ELEMENT:object.setProperty
   8. L238 `»Object.keys(obj.data).forEach(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   9. L241 _(in `js/main`)_ `if (»cookies[i].indexOf('plt_user_id')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  10. L242 _(in `js/backgroundTask`)_ `if (state.r»ejection === UNHANDLED) onHandleUnhandled(st«ate);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURIComponent
  11. L245 _(in `js/backgroundTask`)_ `»if (handler === true) result «= value;`  · ASSIGN:logical-left
  12. L429 (→L437) `»      chrome.storage.local.get(EmailCache, function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: user_info, sender: js/main, receiver: js/background]
  13. L430 `if (»data[EmailCache]«) {`  · ELEMENT:computed-member-unknown-alternative

---

## Flow #13 — DOCUMENT_COOKIE (From storage.local.set('user_info') in js/background)  ·  3× duplicate paths collapsed

- **Source**: `DOCUMENT_COOKIE` — `js/backgroundTask` L233:C16 -> L233:C37  `var ok = state».state === FULFILLED;«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (user_info) — `js/background` L433:C14 -> L433:C44  `»chrome.storage.local.set(data)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (161 raw steps → 13 distinct lines):
   1. L233 _(in `js/popup`)_ `retu»rn this.prevObject || this.construct«or(null);`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L234 `const file» = dataURLtoFi«le(imgBase64, `blob.${fileType}`)`  · ELEMENT:member.length, ASSIGN:binary-right
   3. L235 _(in `js/main`)_ `if (»cookies[i].indexOf('plt_user_email')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   4. L236 _(in `js/main`)_ `info['email'] = »decodeURIComponent(cookies[i].split('=')[1])«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURIComponent
   5. L232 `»      con«st fileType = imgBase64.split(';')[0].split('/')[1]`  · ELEMENT:object.setProperty
   6. L247 `// for (con»st pair of formData)« {`  · RETURN:json.stringify
   7. L246 (→L248) `»        // const data = new URLSearchParams()«`  · ELEMENT:object.setProperty
   8. L238 `»Object.keys(obj.data).forEach(item => {«`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   9. L241 _(in `js/main`)_ `if (»cookies[i].indexOf('plt_user_id')« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  10. L242 _(in `js/backgroundTask`)_ `if (state.r»ejection === UNHANDLED) onHandleUnhandled(st«ate);`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, RETURN:decodeURIComponent
  11. L245 _(in `js/backgroundTask`)_ `»if (handler === true) result «= value;`  · ASSIGN:logical-left
  12. L429 (→L437) `»      chrome.storage.local.get(EmailCache, function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: user_info, sender: js/main, receiver: js/background], STORAGE:STORAGE_FLOW[area: local, key: user_info, sender: js/background, receiver: js/background]
  13. L430 `if (»data[EmailCache]«) {`  · ELEMENT:computed-member-unknown-alternative

---

## Flow #14 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `JQUERY_ELEMENT_VAL_SET` (#copy-input) — `js/setting` L219:C6 -> L219:C53  `»$('#copy-input').val($('.copy-content').text())«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---

## Flow #15 — TARGET_CUSTOM_EVENT (From storage.local.set('browser_setinfo') in js/main)  ·  2× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `js/lib/jquery-2.0.0` L262:C7 -> L262:C15  `retur»n this.p«ushStack( j >= 0 && j < len ? [ this[j] ] : [] );`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (browser_setinfo) — `js/setting` L86:C2 -> L88:C4 (spans to L88)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (746 raw steps → 80 distinct lines):
   1. L262 _(in `js/lib/jquery-2.0.0`)_ `retu»rn this.pushStack(« j >= 0 && j < len ? [ this[j] ] : [] );`  · ELEMENT:member-element, ASSIGN:unary
   2. L265 _(in `js/main`)_ `if (»e.detail.evt_from.indexOf('bijiago')« > -1) return`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L266 _(in `js/lib/jquery-2.0.0`)_ `return t»his.pushStack«( jQuery.map(this, function( elem, i ) {`  · ELEMENT:member-element
   4. L268 _(in `js/background`)_ `const para»ms = Object.ke«ys(obj.data).map(item => {`  · ELEMENT:member-element
   5. L271 _(in `js/popup`)_ `// Only deal» with non-nul«l/undefined values`  · ELEMENT:member-element
   6. L269 (→L278) _(in `js/chrome`)_ `»/***/ ((module) => {«`  · ELEMENT:object.setProperty
   7. L272 _(in `js/chrome`)_ `module.exports =» "data:image/pn«g;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABQVBMVEUAAABwcHBoaGj///9qampsbGz///9ubm5sbGxra2v///9qamptbW3Pz8/…`  · ELEMENT:member-element
   8. L293 _(in `js/chrome`)_ `var __awaiter »= (this && thi«s.__awaiter) || function (thisArg, _arguments, P, generator) {`  · ELEMENT:member-element
   9. L291 (→L294) _(in `js/chrome`)_ `»    return __assign.apply(this, arguments);«`  · ELEMENT:object.setProperty
  10. L299 _(in `js/chrome`)_ `step((»generator = ge«nerator.apply(thisArg, _arguments || [])).next());`  · ELEMENT:member-element
  11. L297 (→L300) _(in `js/chrome`)_ `»        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }«`  · ELEMENT:object.setProperty
  12. L303 _(in `js/chrome`)_ `var _ = { label»: 0, sent: function() { if «(t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);`  · ELEMENT:member-element
  13. L76 `if (d»ata«[key] === '1') {`  · ASSIGN:identifier
  14. L74 (→L78) `»  }«`  · ELEMENT:object.setProperty
  15. L77 `chro»me.s«torage.local.set({`  · ASSIGN:identifier
  16. L306 _(in `js/backgroundTask`)_ `state.rejection =» IS_NODE || isUnhandled(state)« ? UNHANDLED : HANDLED;`  · ELEMENT:member-element
  17. L34 `'op_v»': «['1', '0']`  · ASSIGN:identifier
  18. L32 (→L42) `»    'op': 'setsteam',«`  · ELEMENT:object.setProperty
  19. L35 _(in `js/chrome`)_ `let te»xtNode «= $(item).find('.hl_red');`  · ASSIGN:identifier
  20. L311 _(in `js/main`)_ `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  21. L48 `'op_k»': «'promotion',`  · ASSIGN:identifier
  22. L46 (→L56) `»  {«`  · ELEMENT:object.setProperty
  23. L49 `'op_v'»: ['1',« '0']`  · ASSIGN:identifier
  24. L316 _(in `js/main`)_ `proxyRequestPostWWWForm(»e.detail.url, e.detail.payload«, function (data) {`  · ELEMENT:member-element
  25. L62 `var key» = «data['key'];`  · ASSIGN:identifier
  26. L60 (→L70) `»  if (!data) data = null;«`  · ELEMENT:object.setProperty
  27. L63 `»browserInfo[key«] = data[key]`  · ASSIGN:identifier
  28. L321 _(in `js/chrome`)_ `» if (t[2]) _«.ops.pop();`  · ELEMENT:member-element
  29. L21 _(in `js/chrome`)_ `let loc»alP«romo = await globalCondition.met('localPromoGot');`  · ASSIGN:identifier
  30. L19 (→L28) `»    'op_v': ['1', '0']«`  · ELEMENT:object.setProperty
  31. L340 _(in `js/popup`)_ `// subtraction f»orces infini«ties to NaN`  · ELEMENT:member-element
  32. L148 _(in `js/chrome`)_ `re»turn« $$out;`  · ASSIGN:identifier, ASSIGN:unary
  33. L150 _(in `js/lib/jquery-2.0.0`)_ `} els»e {«`  · ASSIGN:identifier
  34. L149 (→L152) `»  })«`  · ELEMENT:object.setProperty
  35. L343 _(in `js/background`)_ `if (newdata) »newdata = new«data[1];`  · ELEMENT:member-element
  36. L345 _(in `js/backgroundTask`)_ `if (stat»e.facade === value) throw new TypeE«rror("Promise can't be resolved itself");`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:json.parse
  37. L353 _(in `js/lib/jquery-2.0.0`)_ `noConflict: func»tion( deep ) «{`  · ELEMENT:member-element
  38. L362 _(in `js/chrome`)_ `if (thi»s.options.len«gth > 2) {`  · ELEMENT:member-element
  39. L204 `d[option.o»p] = opt«ion.op_v[value];`  · ASSIGN:identifier
  40. L203 (→L205) `»      var value = $(this).hasClass('active') ? 1 : 0;«`  · ELEMENT:object.setProperty
  41. L368 _(in `js/chrome`)_ `setPro»ducts: f«unction (products) {`  · ELEMENT:member-element
  42. L82 _(in `js/backgroundTask`)_ `var stringSlice = uncurryThis»(''«.slice);`  · ASSIGN:identifier
  43. L373 _(in `js/chrome`)_ `va»r otherP«rops = {};`  · ELEMENT:member-element
  44. L376 _(in `js/chrome`)_ `»  otherP«rops[option.name] = selectedOption.value;`  · ELEMENT:member-element
  45. L381 _(in `js/main`)_ `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  46. L212 _(in `js/chrome`)_ `//» eslint-disable-next-lin«e no-self-compare -- NaN check`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L215 (→L217) `»  var setTime«`  · ELEMENT:object.setProperty
  48. L384 _(in `js/lib/jquery-2.0.0`)_ `// Abort if »there ar«e pending holds or we're already ready`  · ELEMENT:member-element
  49. L392 _(in `js/chrome`)_ `va»r produc«t = (0, skuUtil_1.selectProductBySkuProps)(__assign(__assign({}, prop), otherProps), this.products);`  · ELEMENT:member-element
  50. L322 _(in `js/popup`)_ `// Since version 1.3, DOM methods and »functions li«ke alert`  · ELEMENT:member-element
  51. L196 `$('.op»ti«on.switch').on('click', function() {`  · ASSIGN:identifier
  52. L193 (→L197) `»    $(this).addClass('active').siblings('div').removeClass('active');«`  · ELEMENT:object.setProperty
  53. L307 _(in `js/chrome`)_ `if (f) throw new TypeError("Generat»or is already «executing.");`  · ELEMENT:member-element
  54. L312 _(in `js/main`)_ `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  55. L317 _(in `js/chrome`)_ `if (!(t = _.trys, t = t.length» > 0 && t[t.le«ngth - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }`  · ELEMENT:member-element
  56. L275 _(in `js/lib/jquery-2.0.0`)_ `// For internal »use o«nly.`  · ASSIGN:identifier
  57. L274 (→L277) _(in `js/chrome`)_ `»/***/ }),«`  · ELEMENT:object.setProperty
  58. L377 _(in `js/main`)_ `dispatch('commonReq' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  59. L194 _(in `js/chrome`)_ `array[»i«ndex] = 515 - index;`  · ASSIGN:identifier
  60. L108 (→L149) `»  chrome.storage.local.get('browser_setinfo', function(d) {«`  · STORAGE:STORAGE_FLOW[area: local, key: browser_setinfo, sender: js/main, receiver: js/setting]
  61. L109 `if (»d && d.browser_setinfo«) {`  · ASSIGN:logical-right
  62. L111 `browserInfo = »info«`  · ASSIGN:identifier
  63. L112 `if (»info.setStyle«) {`  · ASSIGN:identifier, ELEMENT:member-element
  64. L113 `var stylestr = '.setStyle .style-' + »info.setStyle«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  65. L117 `if (»info.setTip« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  66. L115 `$(»stylestr«).addClass('active')`  · ASSIGN:identifier
  67. L120 `if (»info.setWishlist« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  68. L123 `if (»info.setShowPromo« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  69. L126 `if (»info.sethaitao« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  70. L129 `if (»info.setclock« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  71. L132 `if (»info.setsteam« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  72. L135 `if (»info.promotion« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  73. L138 `if (»info.fold« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  74. L144 `if (»info.user_extension_id && info.version«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  75. L145 `var href = »"https://www.gwdang.com/brwext/suggest?refer=settingpage&v=" + info.version + "&id=" + info.user_extension_id«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
  76. L146 `$('#suggest').attr('href', »href«)`  · ASSIGN:identifier
  77. L87 `'browser_setinfo': »browserInfo«`  · ASSIGN:identifier
  78. L86 (→L88) `»  chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  79. L175 `style = »browserInfo.setStyle || 'top'«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  80. L176 `$("#setting-container .setting-result .demo-screen img").attr('src', »`../images/setting/style_${style}.png`«);`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #16 — CHROME_COOKIES_INFO (From storage.local.set('browser_setinfo') in js/background)  ·  36× duplicate paths collapsed

- **Source**: `CHROME_COOKIES_INFO` — `js/setting` L97:C10 -> L97:C11  `} else» «{`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (browser_setinfo) — `js/setting` L86:C2 -> L88:C4 (spans to L88)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (735 raw steps → 30 distinct lines):
   1. L97 _(in `js/chrome`)_ `// let c»oupons = rem«otePromos.promo_list.filter(x => x.tag === 'coupon').map(x => {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L98 `$('.se»tcollect .option').a«ddClass('active')`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L99 _(in `js/chrome`)_ `//     t»ext: x.text.split(':').length > 1 ? x«.text.split(':')[1] : x.text,`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:decodeURIComponent
   4. L101 `chrome.storage.local.get('for»bidImgS«earch', res => {`  · ASSIGN:identifier, ELEMENT:member-element
   5. L70 (→L86) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   6. L103 (→L105) `»      $('.setImgSearch').removeClass('active')«`  · ELEMENT:object.setProperty
   7. L89 _(in `js/chrome`)_ `// ur»l = '//sear«ch.jd.com/Search?activity_id=' + url.split('_')[0] + '&sku=' + G.dp.itemId.replace('-3', '')`  · ITERATE:loop.iteration
   8. L90 _(in `js/background`)_ `»browserSetInfo[pattern] = data.browser_setinfo[pattern] || browserSetInfo[pattern]«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-right
   9. L108 (→L149) `»  chrome.storage.local.get('browser_setinfo', function(d) {«`  · STORAGE:STORAGE_FLOW[area: local, key: browser_setinfo, sender: js/background, receiver: js/setting]
  10. L109 `if (»d && d.browser_setinfo«) {`  · ASSIGN:logical-right
  11. L111 `browserInfo = »info«`  · ASSIGN:identifier
  12. L112 `if (»info.setStyle«) {`  · ASSIGN:identifier, ELEMENT:member-element
  13. L113 `var stylestr = '.setStyle .style-' + »info.setStyle«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  14. L117 `if (»info.setTip« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L115 `$(»stylestr«).addClass('active')`  · ASSIGN:identifier
  16. L120 `if (»info.setWishlist« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L123 `if (»info.setShowPromo« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L126 `if (»info.sethaitao« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L129 `if (»info.setclock« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  20. L132 `if (»info.setsteam« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L135 `if (»info.promotion« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L138 `if (»info.fold« === '1') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L144 `if (»info.user_extension_id && info.version«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  24. L145 `var href = »"https://www.gwdang.com/brwext/suggest?refer=settingpage&v=" + info.version + "&id=" + info.user_extension_id«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
  25. L146 `$('#suggest').attr('href', »href«)`  · ASSIGN:identifier
  26. L63 `»browserInfo«[key] = data[key]`  · ASSIGN:identifier
  27. L87 `'browser_setinfo': »browserInfo«`  · ASSIGN:identifier
  28. L86 (→L88) `»  chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  29. L175 `style = »browserInfo.setStyle || 'top'«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  30. L176 `$("#setting-container .setting-result .demo-screen img").attr('src', »`../images/setting/style_${style}.png`«);`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #17 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/chrome` L16975:C26 -> L16975:C38  `ajaxLocParts = rurl.exec( »ajaxLocation«.toLowerCase() ) || [];`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_SETHEADER` — `js/chrome` L6607:C8 -> L6607:C47  `»xhr.setRequestHeader(key, headers[key])«;`
  - `XML_HTTP_REQUEST_OPEN` — `js/chrome` L29043:C6 -> L29043:C168  `»xml.open('POST', `${window.gwd_G.server}/extension?ac=sendListInfo&site_id=${siteid}&u=${G.union}&from=externalJS&url=${encodeURIComponent(location.href)}`, true)«;`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (2556 raw steps → 173 distinct lines):
   1. L16975 `ajaxLocParts = rurl.exec( »ajaxLocation.toLowerCase()« ) || [];`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   2. L17213 `url: »ajaxLocation«,`  · ASSIGN:identifier
   3. L17203 (→L17694) `»jQuery.extend({«`  · ELEMENT:object.setProperty
   4. L101328 `if (»location.href.includes('install_complete')«) {`  · ELEMENT:member-element, RETURN:fallback-return
   5. L134398 `if (»location.href.indexOf('plogin.m.jd.com')« > -1) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   6. L134401 `if (»location.href.includes('221.122.98.229:8000')«) {`  · ELEMENT:member-element, RETURN:fallback-return
   7. L45126 (→L45132) `»      communicate.trigger({«`  · ELEMENT:object.setProperty
   8. L28118 (→L28210) `»G.extend({«`  · ELEMENT:object.setProperty
   9. L127291 `var no_url = »href.match(/[&\?]no_url/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L127296 `var main_url = »href«;`  · ASSIGN:identifier
  11. L127292 `if (»!no_url && (self.location != top.location || self.frameElement && self.frameElement.tagName == "IFRAME" || window.top != window.self)«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  12. L127297 `if (»location.href.indexOf('?')« > 0) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  13. L127298 `main_url = »href.substr(0, href.indexOf('?'))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L127301 `if (»main_url.match(/\.kaluli.com/)«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  15. L127305 `if (»main_url.match(/(?:cartridge|Camcorder|carters|feifei\.com\/order\/|ref=ord_cart_shr)/)« != null) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  16. L127308 `if (»location.host.indexOf(`${G.extName}.com`) > -1 && !location.href.includes('jd_enhance')«) return true;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right
  17. L127309 `if (»main_url.match(/detail\.zol\.com\.cn/)«) return false;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L127310 `if (»main_url.match(/(?:cart|member|order|myhome|picture_index|handle-buy-box|chat|t.sina.com.cn|discussion|union.dangdang|eve.360buy|bank.vmall|checkout|confirm|gateway|trade|http:\/\/i.taobao.com|we.taobao.com|passport.yougou.com)/ig)« != null) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  19. L127254 `url = »url || href«;`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:logical-left
  20. L127255 `if (»url.indexOf('oneplus.com/cn/store')« > -1) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  21. L127258 `if (»G.from_device === 'bijiago' && location.href.indexOf('https://pcsitepp-fm.jd.com/') > -1«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-right
  22. L127262 `let matchs = »url.match(new RegExp(pattern, 'i'))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  23. L127263 `if (»matchs«) {`  · ASSIGN:identifier
  24. L127266 `const »host = new URL(url).host«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element
  25. L127267 `if (»site === "amazon" && host !== "www.amazon.cn" && matchs[1]«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:logical-left
  26. L127268 `let m = »matchs[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
  27. L127269 `if (»m.indexOf('.') > -1) m = m.split('.')[1]«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  28. L127270 `m = 'amazon-' + »m«;`  · ASSIGN:identifier, ASSIGN:binary-right
  29. L127271 `return »m«;`  · ASSIGN:identifier
  30. L127332 `»name = module.exports.isProductPage()«;`  · ELEMENT:implicit.add
  31. L127241 `if (»location.hostname.includes('.gwdang.com') && location.href.includes('/jd_enhance')«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  32. L127317 `if (»location.href.match(/Web_GB\/en/)«) {`  · ELEMENT:member-element, RETURN:fallback-return
  33. L27967 `if (»!(location.href.includes('cart.taobao.com/cart.htm') || location.href.includes('cart.jd.com/cart_index'))«) return;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  34. L27970 `if (»location.href.includes('autoclick')«) {`  · ELEMENT:member-element, RETURN:fallback-return
  35. L27975 `ifr.src = »location.href« + '#autoclick';`  · ASSIGN:binary-left
  36. L43095 `if (»location.href.includes('autoclick')«) {`  · ELEMENT:member-element, RETURN:fallback-return
  37. L43103 `if (»location.href.startsWith('https://checkout.vip.com/te2/')«) {`  · ELEMENT:member-element, RETURN:fallback-return
  38. L43106 `if (»location.href.startsWith('https://trade.jd.com/shopping/order/')«) {`  · ELEMENT:member-element, RETURN:fallback-return
  39. L122042 `let url = »`${G.server}/extension?ac=currency&url=${encodeURIComponent(location.href)}`«;`  · RETURN:encodeURIComponent, ASSIGN:template-literal
  40. L85900 `const »params = new URL(url).searchParams«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container
  41. L85901 `return »params.get(name)«;`  · ELEMENT:member-element, RETURN:fallback-return
  42. L85905 `results = regex.exec(»url«);`  · ASSIGN:identifier
  43. L23515 `let »urlDpId = util.getParameterByName('dp_id', url)«;`  · ELEMENT:implicit.add
  44. L55364 (→L55368) `»      communicate.trigger({«`  · ELEMENT:object.setProperty
  45. L37331 `if (»url !== location.href || window.extNeedReload«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left
  46. L37338 `extConsole.warn('reload start', »url !== location.href«);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  47. L41327 (→L41418) `»G.extend({«`  · ELEMENT:object.setProperty
  48. L20564 (→L20569) `»  return {«`  · ELEMENT:object.setProperty
  49. L21657 `let match = »location.href.match(/\/dp\/([0-9A-Za-z]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  50. L21658 `if (»match«) {`  · ASSIGN:identifier
  51. L21659 `return »match[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
  52. L21661 `match = »location.href.match(/\/gp\/([0-9A-Za-z]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  53. L21662 `if (»match«) {`  · ASSIGN:identifier
  54. L21663 `return »match[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
  55. L21656 (→L21666) `»    dp.itemId = function () {«`  · ELEMENT:implicit.add
  56. L21679 `dp.url2 = »url.replace«(host, 'www.amazon.cn');`  · ASSIGN:identifier, ELEMENT:member-element-container
  57. L23437 `if (»dp.url« == null) {`  · ASSIGN:binary-left
  58. L23461 `dp.icon = »dp.url.replace«(/^http[s]?\:\/\//g, "");`  · ELEMENT:member-element-container
  59. L23462 `dp.icon = »dp.icon.replace«(/\/.*?$/g, "");`  · ELEMENT:member-element-container
  60. L134484 (→L134487) `»      (__webpack_require__(12826).get)(() => {«`  · ELEMENT:implicit.add
  61. L122043 `request.get(»url«).then(data => {`  · ASSIGN:identifier
  62. L411 `var u = »encodeURIComponent(location.href)«;`  · RETURN:encodeURIComponent
  63. L412 `location.href = »"https://www.gwdang.com/user/login?ext=1&from_url=".concat(u)«;`  · ASSIGN:identifier, RETURN:string.concat
  64. L905 `let »skuId = (__webpack_require__(60340).getParameterByName)('skuId')«;`  · ELEMENT:implicit.add
  65. L1092 (→L1097) `»    let data = {«`  · ELEMENT:object.setProperty
  66. L1099 `(__webpack_require__(49388).post)(`${G.server}/extension?ac=sendPromos&site_id=3&jfrom=jcoupon`, »JSON.stringify(data)«, false);`  · RETURN:json.stringify
  67. L55424 (→L55428) `»      communicate.trigger({«`  · ELEMENT:object.setProperty
  68. L6670 `'x-referer-page': »location.href.split('#')[0]«,`  · ELEMENT:member-element-container, ELEMENT:string.split
  69. L6669 (→L6672) `»    const res = await postForm(host, payload, {«`  · ELEMENT:object.setProperty
  70. L6606 `if (»headers[key] !== undefined && headers[key] !== null && headers[key] !== ''«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  71. L6607 `»xhr.setRequestHeader(key, headers[key])«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  72. L7266 `var pageUrl = »encodeURIComponent(location.href)«;`  · RETURN:encodeURIComponent
  73. L7328 `var »z = trendd.encrypt(pageUrl, 2, !0)«,`  · ASSIGN:identifier, ELEMENT:implicit.add
  74. L7283 `if (!trendd.isString(»a«)) return "";`  · ASSIGN:identifier
  75. L7277 `return "[object String]" === Object.prototype.toString.call(»a«);`  · ASSIGN:identifier
  76. L7284 `for (f = 0, l = »a.length; f < l; f++) g[g.length] = trendd.to(a.charCodeAt(f)«, b);`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return
  77. L7288 `var e = "" + »(a + codeOfs).toString(16)«,`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right
  78. L7289 `f = c - »e.length«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  79. L7290 `return f > 0 ? »trendd.zero[f - 1] + e : e«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:conditional-consequent
  80. L7282 `»g = []«;`  · ELEMENT:object.setProperty
  81. L7285 `return e ? »trendd.strReverse(g.join("")) : g.join("")«;`  · RETURN:array.join, ASSIGN:conditional-consequent
  82. L7273 `for (b = 0, l = »a.length; b < l; b++) c[c.length] = a.charAt(b)«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return
  83. L7272 `»c = []«;`  · ELEMENT:object.setProperty
  84. L7274 `return »c.reverse().join("")«;`  · RETURN:array.join
  85. L7329 `A = 1900 - »z.length«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  86. L7330 `trendK = trendK.length > A ? trendK.substr(0, »A«) : trendK;`  · ASSIGN:identifier
  87. L7331 `var url = location.protocol + gstr + "enew&av=3.0&ext" + "ensionid=" + extensionid + "&email=&pop=&k=" + trendK + "&nl=true&m=" + »z«;`  · ASSIGN:identifier, ASSIGN:binary-right
  88. L7332 `return »url«;`  · ASSIGN:identifier
  89. L17423 `s.url = »( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" )«;`  · ASSIGN:identifier, ASSIGN:logical-right, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return
  90. L21282 `var »arr = dp.url.split('/')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
  91. L21283 `var url = »arr[0]« + '//';`  · ELEMENT:member-element-container, ASSIGN:binary-left
  92. L21284 `var html = »arr[arr.length - 1].split('.')«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  93. L21285 `for (var i = 2; i < »arr.length - 1«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  94. L21286 `url = »url + arr[i]« + '/';`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:binary-right
  95. L21290 `dp.url = »url + $("div.Ydrug_info dl:first dd").text() + '.' + html[1]«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:binary-right
  96. L21731 `dp.itemId = »location.href.match(/dangdang\.com\/(\d+)/)[1]«;`  · ELEMENT:member-element, RETURN:fallback-return
  97. L21781 `if (»dp.url.indexOf("javascript")« > -1) {`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  98. L109723 `if (»cachedSku && location.href.includes(cachedSku.pageConfigVO.skuid)«) return cachedSku;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  99. L21915 `dp.itemId = »location.href.match(/(\d+)\.html/)[1]«;`  · ELEMENT:member-element, RETURN:fallback-return
  100. L22092 `var »dp = getArticleInfoNew('input[name=returnURL]', 0, "value", "suning")«;`  · ELEMENT:implicit.add
  101. L22109 `»dp«.url = location.href;`  · ASSIGN:identifier
  102. L22118 `»dp«.name = name;`  · ASSIGN:identifier
  103. L22119 `»dp«.isbn = isbn;`  · ASSIGN:identifier
  104. L22120 `»dp«.brand_string = window.sn && window.sn.brandName || '';`  · ASSIGN:identifier
  105. L22121 `»dp«.price = window.sn && window.sn.promotionPrice || 0;`  · ASSIGN:identifier
  106. L22123 `»dp«.price = mainPrice;`  · ASSIGN:identifier
  107. L22126 `»dp«.price = promotionPrice;`  · ASSIGN:identifier
  108. L22129 `»dp«.price = tgPrice;`  · ASSIGN:identifier
  109. L22131 `»dp.itemId = location.href.match(/(\d+\/\d+)\.html/)[1]«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
  110. L22134 `»dp«.cat_id = cathref.match(/(\d-\d{0,}-\d)\.html/) ? cathref.match(/(\d-\d{0,}-\d)\.html/)[1] : "";`  · ASSIGN:identifier
  111. L22135 `»dp«.website = "suning";`  · ASSIGN:identifier
  112. L22136 `»dp«.pic = $('#bigImage img').attr('src');`  · ASSIGN:identifier
  113. L22137 `if (»dp.pic) dp«.pic = $('#bigImg img').attr('src');`  · ASSIGN:identifier, ELEMENT:member-element-container
  114. L22138 `if (»!dp.name) dp«.name = window.sn && window.sn.itemDisplayName;`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:unary
  115. L22139 `»dp.name = dp.name && dp.name.replace('【苏宁易购超市】', '')«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  116. L22143 `return »dp«;`  · ASSIGN:identifier
  117. L22153 `var »dp = getArticleInfoNew('input[name=returnURL]', 0, "value", "suning")«;`  · ELEMENT:implicit.add
  118. L22172 `»dp«.name = name;`  · ASSIGN:identifier
  119. L22173 `»dp«.isbn = isbn;`  · ASSIGN:identifier
  120. L22174 `return »dp«;`  · ASSIGN:identifier
  121. L22177 `var »dp = getArticleInfoNew('input[name=returnURL]', 0, "value", "suning")«;`  · ELEMENT:implicit.add
  122. L22178 `»dp«.name = $('.brief-info h1 strong').text();`  · ASSIGN:identifier
  123. L22179 `»dp«.isbn = $('.parm-isbn span.attr-v').text();`  · ASSIGN:identifier
  124. L22180 `return »dp«;`  · ASSIGN:identifier
  125. L22208 `var »dp = getArticleInfoNew('input[name=returnURL]', 0, "value", "suning")«;`  · ELEMENT:implicit.add
  126. L22220 `»dp«.name = name;`  · ASSIGN:identifier
  127. L22221 `»dp«.isbn = isbn;`  · ASSIGN:identifier
  128. L22222 `»dp«.url = url;`  · ASSIGN:identifier
  129. L22223 `return »dp«;`  · ASSIGN:identifier
  130. L22265 `dp.itemId = »location.href.match(/gome\.com\.cn\/([A-Z0-9]+)-/)[1]«;`  · ELEMENT:member-element, RETURN:fallback-return
  131. L22322 `var itemId = »location.href.match(/item\/([0-9]{5,9})/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  132. L22323 `dp.itemId = »itemId && itemId[1]«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  133. L22665 `info.url = »`https://detail.tmall.com/item.htm?id=${info.id}`«;`  · ELEMENT:member-element-container, ASSIGN:template-literal
  134. L22666 `info.itemId = »location.href.match(/item_id=(\d+)/)[1]«;`  · ELEMENT:member-element, RETURN:fallback-return
  135. L22725 `var itemid = »location.href.match(/[?&]id=(\d+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  136. L22726 `itemid = »itemid && itemid[1]«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  137. L22770 `info.itemId = »itemid«;`  · ASSIGN:identifier
  138. L22777 `info.url = »url«;`  · ASSIGN:identifier
  139. L22884 `info.nnid = »location.href.match(/[?&]id=([0-9]+)/) && location.href.match(/[?&]id=([0-9]+)/)[1]«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  140. L22962 `var href = »window.location.href.toString()«;`  · ELEMENT:member-element, RETURN:fallback-return
  141. L22963 `var matches = »href.match(/gwd_isbn=(\d+)/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  142. L22964 `if (»isbn == "" && matches«) {`  · ASSIGN:identifier, ASSIGN:logical-right
  143. L22965 `isbn = »matches[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
  144. L24911 `request.get(»`${G.server}/extension/price_towards?url=${location.href}&ver=1`«, true).then(res => {`  · ASSIGN:template-literal
  145. L24872 `link = 'https://' + location.hostname + »link«;`  · ASSIGN:identifier, ASSIGN:binary-right
  146. L24877 `link: »link«`  · ASSIGN:identifier
  147. L24875 (→L24878) `»        return {«`  · ELEMENT:object.setProperty
  148. L25078 `if (»location.href.includes('.tmall.com') || location.href.includes('.taobao.com')«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  149. L26240 `let id = »location.href.match(/[?&]id=([0-9]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  150. L26241 `if (»id && id.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  151. L26242 `id = »id[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
  152. L26243 `getuniqPid(»id«);`  · ASSIGN:identifier
  153. L26131 `if (»id« == '') return;`  · ASSIGN:identifier, ASSIGN:binary-left
  154. L26132 `let url = »`${G.server}/extension?ac=getuniqpid&nid=${id}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  155. L26133 `request.get(»url«).done(data => {`  · ASSIGN:identifier
  156. L27043 `let id = »location.href.match(/[?&]id=([0-9]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  157. L27044 `if (»id && id.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  158. L27045 `id = »id[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
  159. L27046 `getuniqPid(»id«);`  · ASSIGN:identifier
  160. L26935 `if (»id« == '') return;`  · ASSIGN:identifier, ASSIGN:binary-left
  161. L26936 `let url = »`${G.server}/extension?ac=getuniqpid&nid=${id}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  162. L26937 `request.get(»url«).done(data => {`  · ASSIGN:identifier
  163. L27279 (→L27289) `»  let obj = {«`  · ELEMENT:object.setProperty
  164. L27290 `let str = »`type=${obj.type}&browser=${obj.browser}&ver=${obj.ver}&style_show_type=undefined&style_ADID=undefined&currency=undefined&language=${obj.language}&r=${obj.r}&url=${encodeURIComponent(location.href)}`«;`  · RETURN:encodeURIComponent, ASSIGN:template-literal
  165. L27291 `return »str«;`  · ASSIGN:identifier
  166. L27425 `url: 'https://plugin.aliprice.com/plugin/chrome_v07.php?' + »str«`  · ASSIGN:identifier, ASSIGN:binary-right
  167. L27423 (→L27426) `»  communicate.trigger({«`  · ELEMENT:object.setProperty
  168. L29043 `xml.open('POST', »`${window.gwd_G.server}/extension?ac=sendListInfo&site_id=${siteid}&u=${G.union}&from=externalJS&url=${encodeURIComponent(location.href)}`«, true);`  · RETURN:encodeURIComponent, ASSIGN:template-literal
  169. L29647 `let url = »encodeURIComponent(location.href)«;`  · RETURN:encodeURIComponent
  170. L29733 `url: »url«,`  · ASSIGN:identifier
  171. L29729 (→L29740) `»    let dom = template.compile(html)({«`  · ELEMENT:object.setProperty
  172. L29710 `url: »url«,`  · ASSIGN:identifier
  173. L29706 (→L29718) `»      let dom = template.compile(html)({«`  · ELEMENT:object.setProperty

---

## Flow #18 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `js/chrome` L134377:C6 -> L134377:C32  `if (»location.hostname.endsWith«('.gwdang.com')) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/chrome` L5096:C4 -> L5096:C105  `»fetch(`https://${domain}/coupons?skuId=${skuId}&cat=${encodeURIComponent(cat)}&venderId=${venderId}`)«.then(r => r.text()).then(res => {`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (103 raw steps → 13 distinct lines):
   1. L134377 `if (»location.hostname.endsWith('.gwdang.com')«) {`  · ELEMENT:member-element, RETURN:fallback-return
   2. L127241 `if (»location.hostname.includes('.gwdang.com') && location.href.includes('/jd_enhance')«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
   3. L134445 `if (»location.hostname.includes('trade.jd.com') || location.hostname.includes('checkout.vip.com')«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   4. L5093 `if (»domain.includes('.jkcsjd.com')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L5096 `fetch(»`https://${domain}/coupons?skuId=${skuId}&cat=${encodeURIComponent(cat)}&venderId=${venderId}`«).then(r => r.text()).then(res => {`  · ASSIGN:identifier, ASSIGN:template-literal
   6. L23805 `if (»location.hostname« === 'chaoshi.detail.tmall.com') {`  · ASSIGN:binary-left
   7. L24872 `link = »'https://' + location.hostname + link«;`  · ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:identifier
   8. L24877 `link: »link«`  · ASSIGN:identifier
   9. L24875 (→L24878) `»        return {«`  · ELEMENT:object.setProperty
  10. L25527 `if (»!location.hostname.startsWith('search.jd.com')«) return [3 /*break*/, 4];`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  11. L25537 `if (»!(location.hostname === 'list.jd.com')«) return [3 /*break*/, 7];`  · ASSIGN:binary-left, ASSIGN:unary
  12. L25552 `if (»!location.hostname.startsWith('s.taobao.com')«) return [3 /*break*/, 10];`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  13. L25971 `if (»location.hostname.indexOf('smzdm.com')« > -1) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left

---
