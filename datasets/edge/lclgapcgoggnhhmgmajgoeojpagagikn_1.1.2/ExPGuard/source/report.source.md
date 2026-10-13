# Source-level Taint Flow — lclgapcgoggnhhmgmajgoeojpagagikn 1.1.2

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 4  (collapsed from 22 raw issue entries)
- Sinkless sources skipped: 19 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(gwd_extension))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/main` L242:C10 -> L242:C18  `switch (»e.detail«.type) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (currency) — `js/main` L60:C2 -> L62:C4 (spans to L62)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (_PD_UTMSEO_KEY) — `js/main` L288:C6 -> L291:C8 (spans to L291)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (_PD_UTMSEO_TIM) — `js/main` L288:C6 -> L291:C8 (spans to L291)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (unknown) — `js/main` L118:C2 -> L118:C31  `»chrome.storage.local.set(obj)«`
  - `CHROME_LOCAL_STORAGE` (permanent) — `js/main` L124:C4 -> L126:C6 (spans to L126)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (252 raw steps → 60 distinct lines):
   1. L242 `switch (»e.detail.type«) {`  · ELEMENT:member-element
   2. L244 `let reqId = »e.detail.reqId«`  · ELEMENT:member-element
   3. L247 `path: »e.detail.path«,`  · ELEMENT:member-element
   4. L245 (→L254) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   5. L248 `params: »e.detail.params«`  · ELEMENT:member-element
   6. L257 `proxyRequestPost(»e.detail.url, e.detail.payload«, function(data) {`  · ELEMENT:member-element
   7. L259 `}, »e.detail.referer«)`  · ELEMENT:member-element
   8. L89 `url: »url«,`  · ASSIGN:identifier
   9. L87 (→L97) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  10. L90 `data: »payload«,`  · ASSIGN:identifier
  11. L91 `referer: »referer«`  · ASSIGN:identifier
  12. L262 `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function(data) {`  · ELEMENT:member-element
  13. L264 `}, »e.detail.referer«)`  · ELEMENT:member-element
  14. L104 `url: »url«,`  · ASSIGN:identifier
  15. L102 (→L112) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  16. L105 `data: »payload«,`  · ASSIGN:identifier
  17. L106 `referer: »referer«`  · ASSIGN:identifier
  18. L267 `proxyRequest(»e.detail.url«, function(data) {`  · ELEMENT:member-element
  19. L269 `}, »e.detail.referer«)`  · ELEMENT:member-element
  20. L75 `url: »url«,`  · ASSIGN:identifier
  21. L73 (→L82) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  22. L76 `referer: »referer«`  · ASSIGN:identifier
  23. L280 `setStoreRate(»e.detail.info«)`  · ELEMENT:member-element
  24. L61 `'currency': »currency«`  · ASSIGN:identifier
  25. L60 (→L62) `»  chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  26. L289 `'_PD_UTMSEO_KEY': »e.detail._PD_UTMSEO_KEY«,`  · ELEMENT:member-element
  27. L288 (→L291) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  28. L290 `'_PD_UTMSEO_TIM': »e.detail._PD_UTMSEO_TIM«`  · ELEMENT:member-element
  29. L297 `runTaobaoImg(»e.detail.src«);`  · ELEMENT:member-element
  30. L195 `if (»imgsrc«)`  · ASSIGN:identifier
  31. L196 `src = »imgsrc«`  · ASSIGN:identifier
  32. L300 `var info = »e.detail.info«;`  · ELEMENT:member-element
  33. L302 `if (»info« != '') {`  · ASSIGN:identifier, ASSIGN:binary-left
  34. L303 `info = »JSON.parse(info)«`  · ASSIGN:identifier, RETURN:json.parse
  35. L320 `sendMsg(»e.detail«, function(data) {`  · ELEMENT:member-element
  36. L28 `chrome.runtime.sendMessage(»obj«, function(response) {`  · ASSIGN:identifier
  37. L304 `runTaobaoUniq(»info.nid, info.uniqid«)`  · ELEMENT:member-element
  38. L206 `var url = »'https://s.taobao.com/search?type=samestyle&app=i2i&rec_type=1&uniqpid=' + uniqid + '&nid=' + nid«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  39. L209 `url: »url«`  · ASSIGN:identifier
  40. L207 (→L210) `»  var obj = {«`  · ELEMENT:object.setProperty
  41. L330 `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  42. L117 `obj[»k] = v«;`  · ASSIGN:identifier
  43. L116 `var »obj = {}«`  · ELEMENT:object.setProperty
  44. L121 `»d.permanent[k] = v«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  45. L124 (→L126) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  46. L333 `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  47. L119 (→L127) `»  chrome.storage.local.get('permanent', function(d) {«`  · ELEMENT:object.setProperty
  48. L336 `chrome.storage.local.get(»e.detail.key«, function(data) {`  · ELEMENT:member-element
  49. L337 `dispatch('getStorage' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  50. L37 `type: »b«,`  · ASSIGN:identifier
  51. L36 (→L40) `»  let payload = {«`  · ELEMENT:object.setProperty
  52. L42 `payload = »JSON.stringify(payload)«`  · RETURN:json.stringify, ASSIGN:identifier
  53. L44 `evt.initCustomEvent('gwd_content', true, true, »payload«)`  · ASSIGN:identifier
  54. L341 `sendMsg(»e.detail«, function() {});`  · ELEMENT:member-element
  55. L268 `dispatch('proxyRequest', data, »e.detail.url«)`  · ELEMENT:member-element
  56. L39 `id: »id«`  · ASSIGN:identifier
  57. L258 `dispatch('proxyRequestPost', data, »e.detail.reqId«)`  · ELEMENT:member-element
  58. L263 `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  59. L251 `reqId: »reqId«,`  · ASSIGN:identifier
  60. L250 (→L253) `»        dispatch('backgroundResp', {«`  · ELEMENT:object.setProperty

---

## Flow #2 — TARGET_CUSTOM_EVENT (From storage.local.set('permanent') in js/main)  ·  19× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `js/main` L242:C10 -> L242:C18  `switch (»e.detail«.type) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (permanent) — `js/main` L124:C4 -> L126:C6 (spans to L126)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (260 raw steps → 63 distinct lines):
   1. L242 `switch (»e.detail.type«) {`  · ELEMENT:member-element
   2. L244 `let reqId = »e.detail.reqId«`  · ELEMENT:member-element
   3. L247 `path: »e.detail.path«,`  · ELEMENT:member-element
   4. L245 (→L254) `»      chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
   5. L248 `params: »e.detail.params«`  · ELEMENT:member-element
   6. L257 `proxyRequestPost(»e.detail.url, e.detail.payload«, function(data) {`  · ELEMENT:member-element
   7. L259 `}, »e.detail.referer«)`  · ELEMENT:member-element
   8. L89 `url: »url«,`  · ASSIGN:identifier
   9. L87 (→L97) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  10. L90 `data: »payload«,`  · ASSIGN:identifier
  11. L91 `referer: »referer«`  · ASSIGN:identifier
  12. L262 `proxyRequestPostForm(»e.detail.url, e.detail.payload«, function(data) {`  · ELEMENT:member-element
  13. L264 `}, »e.detail.referer«)`  · ELEMENT:member-element
  14. L104 `url: »url«,`  · ASSIGN:identifier
  15. L102 (→L112) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  16. L105 `data: »payload«,`  · ASSIGN:identifier
  17. L106 `referer: »referer«`  · ASSIGN:identifier
  18. L267 `proxyRequest(»e.detail.url«, function(data) {`  · ELEMENT:member-element
  19. L269 `}, »e.detail.referer«)`  · ELEMENT:member-element
  20. L75 `url: »url«,`  · ASSIGN:identifier
  21. L73 (→L82) `»  chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  22. L76 `referer: »referer«`  · ASSIGN:identifier
  23. L280 `setStoreRate(»e.detail.info«)`  · ELEMENT:member-element
  24. L61 `'currency': »currency«`  · ASSIGN:identifier
  25. L60 (→L62) `»  chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  26. L289 `'_PD_UTMSEO_KEY': »e.detail._PD_UTMSEO_KEY«,`  · ELEMENT:member-element
  27. L288 (→L291) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  28. L290 `'_PD_UTMSEO_TIM': »e.detail._PD_UTMSEO_TIM«`  · ELEMENT:member-element
  29. L297 `runTaobaoImg(»e.detail.src«);`  · ELEMENT:member-element
  30. L195 `if (»imgsrc«)`  · ASSIGN:identifier
  31. L196 `src = »imgsrc«`  · ASSIGN:identifier
  32. L300 `var info = »e.detail.info«;`  · ELEMENT:member-element
  33. L302 `if (»info« != '') {`  · ASSIGN:identifier, ASSIGN:binary-left
  34. L303 `info = »JSON.parse(info)«`  · ASSIGN:identifier, RETURN:json.parse
  35. L320 `sendMsg(»e.detail«, function(data) {`  · ELEMENT:member-element
  36. L28 `chrome.runtime.sendMessage(»obj«, function(response) {`  · ASSIGN:identifier
  37. L304 `runTaobaoUniq(»info.nid, info.uniqid«)`  · ELEMENT:member-element
  38. L206 `var url = »'https://s.taobao.com/search?type=samestyle&app=i2i&rec_type=1&uniqpid=' + uniqid + '&nid=' + nid«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  39. L209 `url: »url«`  · ASSIGN:identifier
  40. L207 (→L210) `»  var obj = {«`  · ELEMENT:object.setProperty
  41. L330 `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  42. L117 `obj[»k] = v«;`  · ASSIGN:identifier
  43. L116 `var »obj = {}«`  · ELEMENT:object.setProperty
  44. L121 `»d.permanent[k] = v«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  45. L124 (→L126) `»    chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  46. L333 `setStorages(»e.detail.key, e.detail.value«)`  · ELEMENT:member-element
  47. L119 (→L127) `»  chrome.storage.local.get('permanent', function(d) {«`  · ELEMENT:object.setProperty
  48. L336 `chrome.storage.local.get(»e.detail.key«, function(data) {`  · ELEMENT:member-element
  49. L337 `dispatch('getStorage' + »e.detail.id«, data)`  · ELEMENT:member-element, ASSIGN:binary-right
  50. L37 `type: »b«,`  · ASSIGN:identifier
  51. L36 (→L40) `»  let payload = {«`  · ELEMENT:object.setProperty
  52. L42 `payload = »JSON.stringify(payload)«`  · RETURN:json.stringify, ASSIGN:identifier
  53. L44 `evt.initCustomEvent('gwd_content', true, true, »payload«)`  · ASSIGN:identifier
  54. L341 `sendMsg(»e.detail«, function() {});`  · ELEMENT:member-element
  55. L268 `dispatch('proxyRequest', data, »e.detail.url«)`  · ELEMENT:member-element
  56. L39 `id: »id«`  · ASSIGN:identifier
  57. L258 `dispatch('proxyRequestPost', data, »e.detail.reqId«)`  · ELEMENT:member-element
  58. L263 `dispatch('proxyRequestPostForm', data, »e.detail.reqId«)`  · ELEMENT:member-element
  59. L251 `reqId: »reqId«,`  · ASSIGN:identifier
  60. L250 (→L253) `»        dispatch('backgroundResp', {«`  · ELEMENT:object.setProperty
  61. L272 (→L274) `»      chrome.storage.local.get('permanent', function(data) {«`  · STORAGE:STORAGE_FLOW[area: local, key: permanent, sender: js/main, receiver: js/main]
  62. L273 `dispatch('get_permanent', »JSON.stringify(data.permanent)«)`  · RETURN:json.stringify
  63. L38 `value: »c«,`  · ASSIGN:identifier

---

## Flow #3 — TARGET_CUSTOM_EVENT (target.addEventListener(gwd_extension))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L48:C0 -> L173:C4 (spans to L173)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L69:C8 -> L75:C10 (spans to L75)  `»fetch(obj.url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L69:C8 -> L75:C10 (spans to L75)  `»fetch(obj.url, {«`
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L69:C8 -> L75:C10 (spans to L75)  `»fetch(obj.url, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L96:C8 -> L102:C10 (spans to L102)  `»fetch(obj.url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L96:C8 -> L102:C10 (spans to L102)  `»fetch(obj.url, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L281:C2 -> L285:C4 (spans to L285)  `»fetch(url, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `js/background` L281:C2 -> L285:C4 (spans to L285)  `»fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (238 raw steps → 27 distinct lines):
   1. L48 (→L173) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/main->js/background]`
   2. L69 (→L82) `fetch(»obj.url, {«`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
   3. L96 (→L109) `fetch(»obj.url, {«`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
   4. L112 `request(»obj.url.replace('callback=?', '')«, function(data) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier
   5. L281 (→L285) `fetch(»url, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L283 `'x-referer': »referer«`  · ASSIGN:identifier
   7. L50 `if (»obj.type« === 'checkUserToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L53 `switch (»obj.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   9. L71 `body: »obj.data«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L73 `'x-referer': »obj.referer«`  · ASSIGN:identifier, ELEMENT:member-element
  11. L86 `console.log(»obj.data«)`  · ASSIGN:identifier, ELEMENT:member-element
  12. L119 `}, »obj.referer«)`  · ASSIGN:identifier, ELEMENT:member-element
  13. L87 `Object.keys(»obj.data«).forEach(item => {`  · ASSIGN:identifier, ELEMENT:member-element
  14. L131 `request(»obj.src«, function(content) {`  · ASSIGN:identifier, ELEMENT:member-element
  15. L100 `'x-referer': »obj.referer«`  · ASSIGN:identifier, ELEMENT:member-element
  16. L136 `request(»obj.info«, function(content) {`  · ASSIGN:identifier, ELEMENT:member-element
  17. L141 `saveHistory(»obj«)`  · ASSIGN:identifier
  18. L187 `if (»!obj.dp_id«) return;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  19. L190 `'dp_id': »obj.dp_id«,`  · ASSIGN:identifier, ELEMENT:member-element
  20. L189 (→L194) `»  var obj = {«`  · ELEMENT:object.setProperty
  21. L192 `'lowest_pri': »obj.price«,`  · ASSIGN:identifier, ELEMENT:member-element
  22. L193 `'price': »obj.price«`  · ASSIGN:identifier, ELEMENT:member-element
  23. L200 `if (arr[i].dp_id === »obj.dp_id«) {`  · ASSIGN:binary-right
  24. L167 `if (»obj.url«)`  · ASSIGN:identifier, ELEMENT:member-element
  25. L168 `request(»obj.url«, function(content) {`  · ASSIGN:identifier, ELEMENT:member-element
  26. L88 `formData.append(item, »obj.data[item]«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  27. L85 `let »formData = new FormData()«`  · ELEMENT:object.setProperty

---

## Flow #4 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `js/background` L312:C2 -> L321:C4 (spans to L321)  `»chrome.cookies.getAll({}, function(e) {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (bajbgcodue_fugnhijoknl) — `js/background` L316:C8 -> L318:C10 (spans to L318)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (117 raw steps → 5 distinct lines):
   1. L312 (→L321) `»  chrome.cookies.getAll({}, function(e) {«`  · ELEMENT:object.setProperty
   2. L314 `for (var i = 0; i < »e.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
   3. L315 `if (»e[i].name« === 'bajbgcodue_fugnhijoknl') {`  · ELEMENT:member-element-container, ELEMENT:member-element, ASSIGN:binary-left
   4. L317 `'bajbgcodue_fugnhijoknl': »e[i].value«`  · ELEMENT:member-element-container, ELEMENT:member-element
   5. L316 (→L318) `»        chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---
