# Source-level Taint Flow — lkjffochdceoneajnigkbdddjdekhojj 1.7.2

- Source type: CRX
- Files with issues: 5 / 10
- Distinct taint flows: 23  (collapsed from 257 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/contents` L101:C23 -> L101:C28  `function detectspecialk»eysup«(e){`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (125 raw steps → 12 distinct lines):
   1. L101 _(in `js/contents`)_ `function detectspecialk»eysup«(e){`  · ASSIGN:identifier
   2. L546 `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L648 `locale = »locale.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 `locale = »locale.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 `if (isSupportLanguage(»locale«) == false) {`  · ASSIGN:identifier
   7. L25 `lang = »lang.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 `lang = »lang.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 `if (»lang« == langSupport[i]) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L565 (→L583) `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/common]
  11. L568 `saveOptions(»options«);`  · ASSIGN:identifier
  12. L571 `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #2 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/contents` L116:C39 -> L116:C44  `<option value="»el">G«reek</option> \`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (20 raw steps → 6 distinct lines):
   1. L116 _(in `js/contents`)_ `<option value="»el">G«reek</option> \`  · ASSIGN:identifier
   2. L546 `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L565 (→L583) `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/common]
   5. L568 `saveOptions(»options«);`  · ASSIGN:identifier
   6. L571 `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #3 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/notebook` L124:C35 -> L124:C40  `if (list.length > 0 && list»[0].u«serId != null) {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (19 raw steps → 6 distinct lines):
   1. L124 _(in `js/notebook`)_ `if (list.length > 0 && list»[0].u«serId != null) {`  · ASSIGN:identifier
   2. L546 `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L565 (→L583) `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/common]
   5. L568 `saveOptions(»options«);`  · ASSIGN:identifier
   6. L571 `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #4 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `js/background` L306:C12 -> L306:C15  `if (»msg«.request == "requestUrl") {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L22:C4 -> L22:C23  `»fetch(url, options)«`  (url-control=FULL)
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `js/background` L309:C16 -> L309:C71  `»port.postMessage({ result: data, requestUrl: msg.url })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (25 raw steps → 5 distinct lines):
   1. L306 `if (»msg.request« == "requestUrl") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L307 `requestXHTML(»msg.url«, function (data) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L15 `if (»url.indexOf('api.mazii.net')« != -1) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   4. L22 `fetch(»url«, options)`  · ASSIGN:identifier
   5. L309 `»port.postMessage({ result: data, requestUrl: msg.url })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #5 — JQUERY_ELEMENT_VAL (#dict-search)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/background` L107:C0 -> L301:C2 (spans to L301)  `»chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` (https://mazii.net/api/search/kanji/v3) — `js/background` L22:C4 -> L22:C23  `»fetch(url, options)«`  (url-control=FULL)
  - `FETCH_RESOURCE` (https://mazii.net/api/search/kanji/v3) — `js/background` L52:C4 -> L52:C23  `»fetch(url, options)«`  (url-control=FULL)
  - `FETCH_BODY` (https://mazii.net/api/search/kanji/v3) — `js/background` L52:C4 -> L52:C23  `»fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 7 distinct lines):
   1. L107 (→L301) `»chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/popup->js/background]`
   2. L206 `if (»msg.data === null || msg.data === undefined«) {`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L15 `if (»url.indexOf('api.mazii.net')« != -1) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   4. L22 `fetch(»url«, options)`  · ASSIGN:identifier
   5. L48 `body: »JSON.stringify(data)«`  · RETURN:json.stringify
   6. L42 (→L49) `»    let options = {«`  · ELEMENT:object.setProperty
   7. L52 `fetch(»url«, options)`  · ASSIGN:identifier

---

## Flow #6 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  24× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/background` L101:C23 -> L101:C28  `cm_clickHandler»(info«, tab);`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/background` L324:C16 -> L325:C18 (spans to L325)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (126 raw steps → 13 distinct lines):
   1. L101 `cm_clickHandler»(info«, tab);`  · ASSIGN:identifier
   2. L546 _(in `libs/angular-ui-router/release/angular-ui-router`)_ `* @pa»ram {object}« locals  values to make available to the injectables`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/bundle`)_ `»	compilerCache = createCache(),«`  · ELEMENT:object.setProperty
   4. L648 _(in `js/bundle`)_ `rtrim = new »RegExp( "^" + whitespace« + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 _(in `js/common`)_ `locale = »locale.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 _(in `js/bundle`)_ `rcombinators = new RegExp»( "^" «+ whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),`  · ASSIGN:identifier
   7. L25 `»     throw new Error('«Network response was not ok: ' + response.status);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 _(in `js/common`)_ `lang = »lang.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 `»retu«rn response.text();`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L319 (→L327) `»        chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
  11. L322 `if (»options.shortKeyEnableDbclick« == true) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L323 `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
  13. L324 (→L325) `»                chrome.storage.sync.set({ 'maziioption': options }, function () {«`  · ELEMENT:object.setProperty

---

## Flow #7 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  24× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/bundle` L116:C39 -> L116:C44  `// Return all the elements in a clea»n arr«ay`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/background` L324:C16 -> L325:C18 (spans to L325)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 7 distinct lines):
   1. L116 _(in `js/bundle`)_ `// Return all the elements in a clea»n arr«ay`  · ASSIGN:identifier
   2. L546 _(in `libs/angular-ui-router/release/angular-ui-router`)_ `* @pa»ram {object}« locals  values to make available to the injectables`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/bundle`)_ `»	compilerCache = createCache(),«`  · ELEMENT:object.setProperty
   4. L319 (→L327) `»        chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
   5. L322 `if (»options.shortKeyEnableDbclick« == true) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L323 `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
   7. L324 (→L325) `»                chrome.storage.sync.set({ 'maziioption': options }, function () {«`  · ELEMENT:object.setProperty

---

## Flow #8 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  24× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/bundle` L124:C35 -> L124:C40  `// Build a new jQuery matched ele»ment «set`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/background` L324:C16 -> L325:C18 (spans to L325)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 7 distinct lines):
   1. L124 _(in `js/bundle`)_ `// Build a new jQuery matched ele»ment «set`  · ASSIGN:identifier
   2. L546 _(in `libs/angular-ui-router/release/angular-ui-router`)_ `* @pa»ram {object}« locals  values to make available to the injectables`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/bundle`)_ `»	compilerCache = createCache(),«`  · ELEMENT:object.setProperty
   4. L319 (→L327) `»        chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
   5. L322 `if (»options.shortKeyEnableDbclick« == true) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L323 `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
   7. L324 (→L325) `»                chrome.storage.sync.set({ 'maziioption': options }, function () {«`  · ELEMENT:object.setProperty

---

## Flow #9 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/background)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/kindTables` L101:C23 -> L101:C28  `char: 'ký tự đặ»c trư«ng',`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/popup` L587:C4 -> L588:C6 (spans to L588)  `»                                                );«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (135 raw steps → 16 distinct lines):
   1. L101 _(in `js/kindTables`)_ `char: 'ký tự đặ»c trư«ng',`  · ASSIGN:identifier
   2. L546 `»            «            }`  · ELEMENT:object.setProperty
   3. L587 (→L588) `»       );«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L648 `function upda»teTranslateModelOptions(«isPremium) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 `// Lưu tr»ạng thái premium để «dùng khi người dùng chọn model`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 _(in `js/common`)_ `if (isSupportLanguage(»locale«) == false) {`  · ASSIGN:identifier
   7. L25 _(in `js/common`)_ `lang = »lang.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 `searchT»extbox = $("#dict-«search");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 `if (key »== n«ull || key == undefined) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L319 (→L327) `»    if (itemWord) itemWord.onclick = function () {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
  11. L322 _(in `js/handwriter`)_ `KanjiWriter.prot»otype.printResult = function(«result) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L323 _(in `js/background`)_ `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
  13. L324 (→L325) `»    if (itemKanji) itemKanji.onclick = function () {«`  · ELEMENT:object.setProperty
  14. L565 (→L583) `»                                    premiumData = results[0].result.premiumData«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/background, receiver: js/popup]
  15. L568 `»       «           )`  · ASSIGN:identifier
  16. L571 `»       «             // Xử lý trường hợp tokenId là object hoặc Promise`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #10 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/background)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/bundle` L116:C39 -> L116:C44  `// Return all the elements in a clea»n arr«ay`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/popup` L587:C4 -> L588:C6 (spans to L588)  `»                                                );«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (30 raw steps → 10 distinct lines):
   1. L116 _(in `js/bundle`)_ `// Return all the elements in a clea»n arr«ay`  · ASSIGN:identifier
   2. L546 `»            «            }`  · ELEMENT:object.setProperty
   3. L587 (→L588) `»       );«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L319 (→L327) `»    if (itemWord) itemWord.onclick = function () {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
   5. L322 _(in `js/handwriter`)_ `KanjiWriter.prot»otype.printResult = function(«result) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L323 _(in `js/background`)_ `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
   7. L324 (→L325) `»    if (itemKanji) itemKanji.onclick = function () {«`  · ELEMENT:object.setProperty
   8. L565 (→L583) `»                                    premiumData = results[0].result.premiumData«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/background, receiver: js/popup]
   9. L568 `»       «           )`  · ASSIGN:identifier
  10. L571 `»       «             // Xử lý trường hợp tokenId là object hoặc Promise`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #11 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/background)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/popup` L124:C35 -> L124:C40  `var currentQuery = searchTe»xtbox«.val().trim();`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/popup` L587:C4 -> L588:C6 (spans to L588)  `»                                                );«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (29 raw steps → 10 distinct lines):
   1. L124 `var currentQuery = searchTe»xtbox«.val().trim();`  · ASSIGN:identifier
   2. L546 `»            «            }`  · ELEMENT:object.setProperty
   3. L587 (→L588) `»       );«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L319 (→L327) `»    if (itemWord) itemWord.onclick = function () {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
   5. L322 _(in `js/handwriter`)_ `KanjiWriter.prot»otype.printResult = function(«result) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L323 _(in `js/background`)_ `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
   7. L324 (→L325) `»    if (itemKanji) itemKanji.onclick = function () {«`  · ELEMENT:object.setProperty
   8. L565 (→L583) `»                                    premiumData = results[0].result.premiumData«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/background, receiver: js/popup]
   9. L568 `»       «           )`  · ASSIGN:identifier
  10. L571 `»       «             // Xử lý trường hợp tokenId là object hoặc Promise`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #12 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/kindTables` L101:C23 -> L101:C28  `char: 'ký tự đặ»c trư«ng',`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/popup` L587:C4 -> L588:C6 (spans to L588)  `»                                                );«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (125 raw steps → 12 distinct lines):
   1. L101 _(in `js/kindTables`)_ `char: 'ký tự đặ»c trư«ng',`  · ASSIGN:identifier
   2. L546 `»            «            }`  · ELEMENT:object.setProperty
   3. L587 (→L588) `»       );«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L648 `function upda»teTranslateModelOptions(«isPremium) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 `// Lưu tr»ạng thái premium để «dùng khi người dùng chọn model`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 _(in `js/common`)_ `if (isSupportLanguage(»locale«) == false) {`  · ASSIGN:identifier
   7. L25 _(in `js/common`)_ `lang = »lang.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 `searchT»extbox = $("#dict-«search");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 `if (key »== n«ull || key == undefined) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L565 (→L583) `»                                    premiumData = results[0].result.premiumData«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/popup]
  11. L568 `»       «           )`  · ASSIGN:identifier
  12. L571 `»       «             // Xử lý trường hợp tokenId là object hoặc Promise`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #13 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/bundle` L116:C39 -> L116:C44  `// Return all the elements in a clea»n arr«ay`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/popup` L587:C4 -> L588:C6 (spans to L588)  `»                                                );«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (20 raw steps → 6 distinct lines):
   1. L116 _(in `js/bundle`)_ `// Return all the elements in a clea»n arr«ay`  · ASSIGN:identifier
   2. L546 `»            «            }`  · ELEMENT:object.setProperty
   3. L587 (→L588) `»       );«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L565 (→L583) `»                                    premiumData = results[0].result.premiumData«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/popup]
   5. L568 `»       «           )`  · ASSIGN:identifier
   6. L571 `»       «             // Xử lý trường hợp tokenId là object hoặc Promise`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #14 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/popup` L124:C35 -> L124:C40  `var currentQuery = searchTe»xtbox«.val().trim();`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/popup` L587:C4 -> L588:C6 (spans to L588)  `»                                                );«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (19 raw steps → 6 distinct lines):
   1. L124 `var currentQuery = searchTe»xtbox«.val().trim();`  · ASSIGN:identifier
   2. L546 `»            «            }`  · ELEMENT:object.setProperty
   3. L587 (→L588) `»       );«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L565 (→L583) `»                                    premiumData = results[0].result.premiumData«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/popup]
   5. L568 `»       «           )`  · ASSIGN:identifier
   6. L571 `»       «             // Xử lý trường hợp tokenId là object hoặc Promise`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #15 — JQUERY_ELEMENT_VAL (#language-selector)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L101:C23 -> L101:C28  `options.lang = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (116 raw steps → 9 distinct lines):
   1. L101 `options.lang = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `»    chrome.storage.sync.set({ 'maziioption': options }, function () {«`  · ELEMENT:object.setProperty
   4. L648 _(in `js/common`)_ `locale = »locale.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 _(in `js/common`)_ `locale = »locale.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 _(in `js/common`)_ `if (isSupportLanguage(»locale«) == false) {`  · ASSIGN:identifier
   7. L25 `$('»#popup-select-key').va«l(options.selectTriggerKey);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 _(in `js/common`)_ `lang = »lang.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 _(in `js/common`)_ `if (»lang« == langSupport[i]) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #16 — JQUERY_ELEMENT_VAL (#popup-dblclick-key)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L116:C39 -> L116:C44  `options.doubleCickTriggerKey = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L116 `options.doubleCickTriggerKey = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `»    chrome.storage.sync.set({ 'maziioption': options }, function () {«`  · ELEMENT:object.setProperty

---

## Flow #17 — JQUERY_ELEMENT_VAL (#popup-select-key)

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L124:C35 -> L124:C40  `options.selectTriggerKey = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (10 raw steps → 3 distinct lines):
   1. L124 `options.selectTriggerKey = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `»    chrome.storage.sync.set({ 'maziioption': options }, function () {«`  · ELEMENT:object.setProperty

---

## Flow #18 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/background)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L101:C23 -> L101:C28  `options.lang = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (135 raw steps → 16 distinct lines):
   1. L101 `options.lang = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L648 _(in `js/common`)_ `locale = »locale.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 _(in `js/common`)_ `locale = »locale.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 _(in `js/common`)_ `if (isSupportLanguage(»locale«) == false) {`  · ASSIGN:identifier
   7. L25 `$('»#popup-select-key').va«l(options.selectTriggerKey);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 _(in `js/common`)_ `lang = »lang.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 _(in `js/common`)_ `if (»lang« == langSupport[i]) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L319 (→L327) _(in `js/common`)_ `»function getMatchResult(data, selection) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
  11. L322 _(in `js/background`)_ `if (»options.shortKeyEnableDbclick« == true) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  12. L323 _(in `js/background`)_ `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
  13. L324 (→L325) _(in `js/common`)_ `»«`  · ELEMENT:object.setProperty
  14. L565 (→L583) _(in `js/common`)_ `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/background, receiver: js/option]
  15. L568 _(in `js/common`)_ `saveOptions(»options«);`  · ASSIGN:identifier
  16. L571 _(in `js/common`)_ `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #19 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/background)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L116:C39 -> L116:C44  `options.doubleCickTriggerKey = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (30 raw steps → 10 distinct lines):
   1. L116 `options.doubleCickTriggerKey = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L319 (→L327) _(in `js/common`)_ `»function getMatchResult(data, selection) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
   5. L322 _(in `js/background`)_ `if (»options.shortKeyEnableDbclick« == true) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L323 _(in `js/background`)_ `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
   7. L324 (→L325) _(in `js/common`)_ `»«`  · ELEMENT:object.setProperty
   8. L565 (→L583) _(in `js/common`)_ `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/background, receiver: js/option]
   9. L568 _(in `js/common`)_ `saveOptions(»options«);`  · ASSIGN:identifier
  10. L571 _(in `js/common`)_ `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #20 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/background)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L124:C35 -> L124:C40  `options.selectTriggerKey = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (29 raw steps → 10 distinct lines):
   1. L124 `options.selectTriggerKey = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L319 (→L327) _(in `js/common`)_ `»function getMatchResult(data, selection) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/background], ELEMENT:object.setProperty
   5. L322 _(in `js/background`)_ `if (»options.shortKeyEnableDbclick« == true) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L323 _(in `js/background`)_ `options.doubleClickEnable = »!options.doubleClickEnable«;`  · ELEMENT:member-element-container, ASSIGN:unary
   7. L324 (→L325) _(in `js/common`)_ `»«`  · ELEMENT:object.setProperty
   8. L565 (→L583) _(in `js/common`)_ `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/background, receiver: js/option]
   9. L568 _(in `js/common`)_ `saveOptions(»options«);`  · ASSIGN:identifier
  10. L571 _(in `js/common`)_ `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #21 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L101:C23 -> L101:C28  `options.lang = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (125 raw steps → 12 distinct lines):
   1. L101 `options.lang = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L648 _(in `js/common`)_ `locale = »locale.replace('-', '_')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L649 _(in `js/common`)_ `locale = »locale.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L651 _(in `js/common`)_ `if (isSupportLanguage(»locale«) == false) {`  · ASSIGN:identifier
   7. L25 `$('»#popup-select-key').va«l(options.selectTriggerKey);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L26 _(in `js/common`)_ `lang = »lang.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L29 _(in `js/common`)_ `if (»lang« == langSupport[i]) {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L565 (→L583) _(in `js/common`)_ `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/option]
  11. L568 _(in `js/common`)_ `saveOptions(»options«);`  · ASSIGN:identifier
  12. L571 _(in `js/common`)_ `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #22 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L116:C39 -> L116:C44  `options.doubleCickTriggerKey = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (20 raw steps → 6 distinct lines):
   1. L116 `options.doubleCickTriggerKey = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L565 (→L583) _(in `js/common`)_ `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/option]
   5. L568 _(in `js/common`)_ `saveOptions(»options«);`  · ASSIGN:identifier
   6. L571 _(in `js/common`)_ `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #23 — JQUERY_ELEMENT_VAL (From storage.sync.set('maziioption') in js/option)  ·  12× duplicate paths collapsed

- **Source**: `JQUERY_ELEMENT_VAL` — `js/option` L124:C35 -> L124:C40  `options.selectTriggerKey = »value«;`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (maziioption) — `js/common` L587:C4 -> L588:C6 (spans to L588)  `»chrome.storage.sync.set({ 'maziioption': options }, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (19 raw steps → 6 distinct lines):
   1. L124 `options.selectTriggerKey = »value«;`  · ASSIGN:identifier
   2. L546 _(in `js/common`)_ `var »options = {}«;`  · ELEMENT:object.setProperty
   3. L587 (→L588) _(in `js/common`)_ `chrome.storage.sync.set({ 'maziioption': »options }, function () {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   4. L565 (→L583) _(in `js/common`)_ `»    chrome.storage.sync.get("maziioption", function (obj) {«`  · STORAGE:STORAGE_FLOW[area: sync, key: maziioption, sender: js/option, receiver: js/option]
   5. L568 _(in `js/common`)_ `saveOptions(»options«);`  · ASSIGN:identifier
   6. L571 _(in `js/common`)_ `if (»options« == null) {`  · ASSIGN:identifier, ASSIGN:binary-left

---
