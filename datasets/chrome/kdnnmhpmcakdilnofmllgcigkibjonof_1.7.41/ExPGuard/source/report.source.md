# Source-level Taint Flow — kdnnmhpmcakdilnofmllgcigkibjonof 1.7.41

- Source type: CRX
- Files with issues: 5 / 6
- Distinct taint flows: 7  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(paddle))

- **Source**: `WINDOW_CUSTOM_EVENT` — `storage` L168:C5 -> L168:C13  `if (»e.detail«.hasOwnProperty("order")) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (order_id) — `storage` L186:C4 -> L195:C6 (spans to L195)  `»chrome.storage.local.set(obj, function() { // Version 1.4.3 - Added , function() instead of setTimeout below«`
  - `CHROME_LOCAL_STORAGE` (is_subscription) — `storage` L186:C4 -> L195:C6 (spans to L195)  `»chrome.storage.local.set(obj, function() { // Version 1.4.3 - Added , function() instead of setTimeout below«`
  - `CHROME_LOCAL_STORAGE` (settings) — `storage` L186:C4 -> L195:C6 (spans to L195)  `»chrome.storage.local.set(obj, function() { // Version 1.4.3 - Added , function() instead of setTimeout below«`
  - `CHROME_LOCAL_STORAGE` (settings) — `storage` L228:C4 -> L237:C6 (spans to L237)  `»chrome.storage.local.set(obj, function() { // Version 1.4.3 - Added , function() instead of setTimeout below«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (46 raw steps → 10 distinct lines):
   1. L168 `if (»e.detail.hasOwnProperty("order")«) {`  · ELEMENT:member-element, RETURN:fallback-return
   2. L170 `var product_id = »e.detail.order.product_id || e.detail.lockers[0].product_id || ""«; // Version 1.4.2g`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   3. L171 `if (products_array.indexOf(»product_id«) > -1) { // Version 1.4.2g - Changed e.detail.order["product_id"] to product_id`  · ASSIGN:identifier
   4. L174 `obj["order_id"] = »e.detail.order.order_id«; // It appears that the order_id should always be used with paddle`  · ELEMENT:member-element
   5. L172 `var »obj = {}«;`  · ELEMENT:object.setProperty
   6. L177 `obj["is_subscription"] = »e.detail.order.is_subscription || ""«;	// Version 1.6.7 - Added || ""`  · ELEMENT:member-element, ASSIGN:logical-left
   7. L1 (→L45) `»var sra = { «`  · ELEMENT:object.setProperty
   8. L183 `sra.settings.status = »e.detail.state || ""«; // Version 1.6.7 - Added || ""`  · ELEMENT:member-element, ASSIGN:logical-left
   9. L191 (→L193) `»						chrome.runtime.sendMessage({"getLicense": obj.order_id}, function(response) { // Version 1.4.4b - Because send_to_backgroud only worked if sr.html was open«`  · ELEMENT:object.setProperty
  10. L216 `var »obj = {}«;`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(lemon))

- **Source**: `WINDOW_CUSTOM_EVENT` — `storage` L209:C5 -> L209:C13  `if (»e.detail«.attributes && e.detail.attributes.first_order_item) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (order_id) — `storage` L228:C4 -> L237:C6 (spans to L237)  `»chrome.storage.local.set(obj, function() { // Version 1.4.3 - Added , function() instead of setTimeout below«`
  - `CHROME_LOCAL_STORAGE` (settings) — `storage` L228:C4 -> L237:C6 (spans to L237)  `»chrome.storage.local.set(obj, function() { // Version 1.4.3 - Added , function() instead of setTimeout below«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (41 raw steps → 10 distinct lines):
   1. L209 `if (»e.detail.attributes && e.detail.attributes.first_order_item«) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L211 `var product_id = »e.detail.attributes.first_order_item.product_id«;`  · ELEMENT:member-element
   3. L212 `var product_name = »e.detail.attributes.first_order_item.product_name«;`  · ELEMENT:member-element
   4. L213 (→L214) `if (products_array.indexOf(»product_id) > -1 «`  · ASSIGN:identifier, ASSIGN:logical-right
   5. L214 `|| »product_name.match(/speech recognition anywhere/i)«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L217 `obj["order_id"] = »e.detail.id«; // order_id`  · ELEMENT:member-element
   7. L216 `var »obj = {}«;`  · ELEMENT:object.setProperty
   8. L1 (→L45) `»var sra = { «`  · ELEMENT:object.setProperty
   9. L225 `sra.settings.status = »e.detail.attributes.status || ""«; // Version 1.6.7 - Added || ""`  · ELEMENT:member-element, ASSIGN:logical-left
  10. L233 (→L235) `»						chrome.runtime.sendMessage({"getLicense": obj.order_id}, function(response) { // Version 1.4.4b - Because send_to_backgroud only worked if sr.html was open«`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_CUSTOM_EVENT (window.addEventListener(paddle))

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L657:C0 -> L819:C4 (spans to L819)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `content` L90:C1 -> L100:C3 (spans to L100)  `»if (keyword.match(/^(hide|remove|ausblenden|entfernen|Ocultar|Eliminar|nascondi|rimuovi)/i))«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L657 (→L819) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[storage->content]`
   2. L662 `var »obj = { settings : sra.settings }«;`  · ELEMENT:object.setProperty
   3. L674 `var »obj = { settings : sra.settings }«;`  · ELEMENT:object.setProperty

---

## Flow #4 — WINDOW_CUSTOM_EVENT (window.addEventListener(lemon))

- **Source**: `WINDOW_CUSTOM_EVENT` — `content` L657:C0 -> L819:C4 (spans to L819)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (settings) — `content` L90:C1 -> L100:C3 (spans to L100)  `»if (keyword.match(/^(hide|remove|ausblenden|entfernen|Ocultar|Eliminar|nascondi|rimuovi)/i))«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6 raw steps → 3 distinct lines):
   1. L657 (→L819) `»chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[storage->content]`
   2. L662 `var »obj = { settings : sra.settings }«;`  · ELEMENT:object.setProperty
   3. L674 `var »obj = { settings : sra.settings }«;`  · ELEMENT:object.setProperty

---

## Flow #5 — CHROME_IDENTITY_PROFILE (identity.profileUserInfo)

- **Source**: `CHROME_IDENTITY_PROFILE` — `license2020` L206:C14 -> L206:C22  `console.log(»userInfo«); // {email: "name@gmail.com", id: "123456789012345678901"}`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.seabreezecomputers.com/speech/license/license.php) — `license2020` L89:C1 -> L93:C4 (spans to L93)  `»fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (78 raw steps → 15 distinct lines):
   1. L206 `console.log(»userInfo«); // {email: "name@gmail.com", id: "123456789012345678901"}`  · ASSIGN:identifier
   2. L208 `»userInfo«.order_id = (typeof sra.order_id !== "undefined" && sra.order_id != "") ? sra.order_id : "";`  · ASSIGN:identifier
   3. L212 `»userInfo«.order_id = document.settings_form.order_id.value;`  · ASSIGN:identifier
   4. L213 `»userInfo.google_id = (userInfo.hasOwnProperty('id')) ? userInfo.id« : "";`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
   5. L214 `if (typeof sra.kind !== "undefined" && sra.kind != "") »userInfo«.kind = sra.kind; // chromewebstore or paypal_sub`  · ASSIGN:identifier
   6. L215 `if (typeof sra.license !== "undefined" && sra.license != "") »userInfo«.license = sra.license;`  · ASSIGN:identifier
   7. L216 `if (typeof sra.createdTime !== "undefined" && sra.createdTime != "") »userInfo«.createdTime = sra.createdTime;`  · ASSIGN:identifier
   8. L217 `if (sra.error) »userInfo«.error = sra.error; // Version 1.4.3`  · ASSIGN:identifier
   9. L218 `»userInfo«.product_id = product_id; // Version 1.4.2 - Changed from "sra" to product_id`  · ASSIGN:identifier
  10. L219 `»userInfo«.product_name = product_name || ""; // Version 1.4.2`  · ASSIGN:identifier
  11. L220 `»userInfo«.product_description = product_description || ""; // Version 1.4.2`  · ASSIGN:identifier
  12. L221 `if (»userInfo.email != "" || userInfo.id != "" || userInfo.order_id != ""«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  13. L223 `ajax_fetch("https://www.seabreezecomputers.com/speech/license/license.php", »JSON.stringify(userInfo)«, ajax_callback);`  · ASSIGN:identifier, RETURN:json.stringify
  14. L92 `body: »data«,`  · ASSIGN:identifier
  15. L89 (→L97) `»	fetch(url, {«`  · ELEMENT:object.setProperty

---

## Flow #6 — CHROME_IDENTITY_PROFILE (identity.profileUserInfo)

- **Source**: `CHROME_IDENTITY_PROFILE` — `license2020` L206:C14 -> L206:C22  `console.log(»userInfo«); // {email: "name@gmail.com", id: "123456789012345678901"}`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.seabreezecomputers.com/speech/license/license.php) — `background` L89:C1 -> L93:C4 (spans to L93)  `»   	if (obj.hasOwnProperty("beep"))«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (78 raw steps → 15 distinct lines):
   1. L206 _(in `license2020`)_ `console.log(»userInfo«); // {email: "name@gmail.com", id: "123456789012345678901"}`  · ASSIGN:identifier
   2. L208 _(in `license2020`)_ `»userInfo«.order_id = (typeof sra.order_id !== "undefined" && sra.order_id != "") ? sra.order_id : "";`  · ASSIGN:identifier
   3. L212 `func»tion ope«n_sr_page() {`  · ASSIGN:identifier
   4. L213 _(in `license2020`)_ `»userInfo.google_id = (userInfo.hasOwnProperty('id')) ? userInfo.id« : "";`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
   5. L214 `var active_toggle = ($GLOBALS.sra && $GLOBALS.sra.setti»ngs && $«GLOBALS.sra.settings['start_in_background']) ? false : true; // Version 1.5.7 - Added sra && sra.settings &&`  · ASSIGN:identifier
   6. L215 `var pin_tab = ($GLOBALS.sra && $GLOBALS.sra.settings && $GLOB»ALS.sra.«settings['pin_tab']) ? true : false; // Version 1.7.15f - Added`  · ASSIGN:identifier
   7. L216 `// Found out I don't really need chrome.extension.getURL. It understa»nds rela«tive paths`  · ASSIGN:identifier
   8. L217 `//chrome.tabs.c»reate({"«url":chrome.extension.getURL("sr.html"),"selected":true}, function(tab){`  · ASSIGN:identifier
   9. L218 `»chrome.t«abs.create({"url":"sr.html","active":active_toggle,"pinned":pin_tab}, function(tab){ // Version 1.7.2 - From selected to active because selected deprecated`  · ASSIGN:identifier
  10. L219 `»	if ($GL«OBALS.test_mode) // Version 1.7.0`  · ASSIGN:identifier
  11. L220 `»		consol«e.log(tab); // Version 1.3.2 test`  · ASSIGN:identifier
  12. L221 _(in `license2020`)_ `if (»userInfo.email != "" || userInfo.id != "" || userInfo.order_id != ""«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  13. L223 _(in `license2020`)_ `ajax_fetch("https://www.seabreezecomputers.com/speech/license/license.php", »JSON.stringify(userInfo)«, ajax_callback);`  · ASSIGN:identifier, RETURN:json.stringify
  14. L92 `beep.p»lay(«);`  · ASSIGN:identifier
  15. L89 (→L97) `»    	if (obj.hasOwnProperty("beep"))«`  · ELEMENT:object.setProperty

---

## Flow #7 — CHROME_IDENTITY_PROFILE (identity.profileUserInfo)

- **Source**: `CHROME_IDENTITY_PROFILE` — `background` L463:C17 -> L463:C25  `console.log(»userInfo«);`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L465:C5 -> L465:C23  `»sendResponse(info)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 3 distinct lines):
   1. L463 `console.log(»userInfo«);`  · ASSIGN:identifier
   2. L464 `info = »userInfo«;`  · ASSIGN:identifier
   3. L465 `sendResponse(»info«);`  · ASSIGN:identifier

---
