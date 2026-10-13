# Source-level Taint Flow — {a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c} 1.2.1

- Source type: XPI
- Files with issues: 2 / 2
- Distinct taint flows: 6  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 24 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `content` L383:C20 -> L383:C31  `var  proxySite =  »articleMeta«.match(/Firefox\/(\d+)/);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (e31qqwdw) — `content` L328:C3 -> L328:C51  `»chrome.storage.local.set({[ baseUrl]:  webPage})«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (19 raw steps → 6 distinct lines):
   1. L383 `var  proxySite =  »articleMeta.match(/Firefox\/(\d+)/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   2. L384 `if (»proxySite.length« ){`  · ASSIGN:identifier, ELEMENT:member.length
   3. L385 `return  »proxySite[ removeAttr]«*1;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L325 `»webPage =  rootSite.unlockExpiredSession(1) + 366«,`  · ELEMENT:implicit.add, ASSIGN:binary-left
   5. L328 `»chrome.storage.local.set({[ baseUrl]:  webPage})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L331 `if (»webPage« >  articleMeta[ baseUrl]){`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L79:C11 -> L79:C37  `switch (»unlockResend.data. webPage«){`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content` L86:C5 -> L86:C69  `»chrome.storage.local.set(unlockResend.data. srcDomain, () => {})«;`
  - `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) — `content` L94:C5 -> L94:C68  `»chrome.storage.sync.set(unlockResend.data. srcDomain, () => {})«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (10 raw steps → 6 distinct lines):
   1. L79 `switch (»unlockResend.data. webPage«){`  · ELEMENT:member-element
   2. L81 `chrome.runtime.sendMessage(»unlockResend.data. srcDomain«, (unlockModal) => {`  · ELEMENT:member-element
   3. L86 `chrome.storage.local.set(»unlockResend.data. srcDomain«, () => {});`  · ELEMENT:member-element
   4. L89 `chrome.storage.local.get(»unlockResend.data. srcDomain«, (unlockModal) => {`  · ELEMENT:member-element
   5. L94 `chrome.storage.sync.set(»unlockResend.data. srcDomain«, () => {});`  · ELEMENT:member-element
   6. L97 `chrome.storage.sync.get(»unlockResend.data. srcDomain«, (unlockModal) => {`  · ELEMENT:member-element

---

## Flow #3 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `content` L165:C6 -> L165:C30  `if (»removeAttr[ articleMeta]«) editArticleExcerpt(articleMeta,  removeAttr[ articleMeta])`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content` L599:C4 -> L599:C56  `»(baseUrl ||  rootSite. unlockResend).set(removeAttr)«;`
  - `CHROME_LOCAL_STORAGE` (e31qqwdw) — `content` L599:C4 -> L599:C56  `»(baseUrl ||  rootSite. unlockResend).set(removeAttr)«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (42 raw steps → 3 distinct lines):
   1. L165 `if (»removeAttr[ articleMeta]) editArticleExcerpt(articleMeta,  removeAttr[ articleMeta]«)`  · ELEMENT:member-element-container, ELEMENT:member-element
   2. L598 `removeAttr[ articleMeta] =  »unlockTimer«;`  · ASSIGN:identifier
   3. L597 `var  »removeAttr = {}«;`  · ELEMENT:object.setProperty

---

## Flow #4 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `content` L466:C7 -> L466:C18  `for (»articleMeta« in  srcDomain) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (e31qqwdw) — `content` L599:C4 -> L599:C56  `»(baseUrl ||  rootSite. unlockResend).set(removeAttr)«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (1646 raw steps → 26 distinct lines):
   1. L466 `for (»articleMeta« in  srcDomain) {`  · ITERATE:loop.iteration
   2. L467 `removeEmpty[ »articleMeta] =  srcDomain[ articleMeta]«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L316 `var  »removeEmpty = {}«,  rootSite={`  · ELEMENT:object.setProperty
   4. L470 `unlockTokenExpiry(»removeEmpty[ rootSite. removeEmpty]«, " dlLink", " unlockPayload");`  · ELEMENT:member-element
   5. L586 `if (»proxySite«){`  · ASSIGN:identifier
   6. L587 `var  articleMeta = unlockCredentialHash(»proxySite«);`  · ASSIGN:identifier
   7. L567 `if (»! unlockTimer«) return "";`  · ASSIGN:identifier, ASSIGN:unary
   8. L570 `var  srcDomain = setSiteTheme(removeAttr +  »unlockTimer«, "");`  · ASSIGN:identifier, ASSIGN:binary-right
   9. L864 `return  articleMeta? »articleMeta.toString().split(unlockTimer)«:[];`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  10. L571 `»srcDomain.forEach«(function(articleMeta) {`  · ELEMENT:member-element-container
  11. L471 `removeHistoryLog(»removeEmpty[ rootSite. pageView]«);`  · ELEMENT:member-element
  12. L653 `if (»articleMeta«) {`  · ASSIGN:identifier
  13. L654 `var  removeAttr = (»rootSite. removeAttr -  articleMeta /  rootSite. articleMeta«) / 72E5 ;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  14. L309 `if (»removeEmpty[ rootSite. unlockSuccess[2]]« == "1") {`  · ELEMENT:member-element-container, ASSIGN:binary-left, ELEMENT:computed-member-unknown-alternative
  15. L167 `var  proxySite= »removeEmpty[ rootSite. unlockSuccess[8]] ||  rootSite. removeAttr«`  · ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:computed-member-unknown-alternative
  16. L168 `editArticleExcerpt(articleMeta,  »proxySite« *  rootSite. articleMeta)`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L598 `removeAttr[ articleMeta] =  »unlockTimer«;`  · ASSIGN:identifier
  18. L597 `var  »removeAttr = {}«;`  · ELEMENT:object.setProperty
  19. L655 `if (»removeAttr« <  rootSite. accessKey * 10) {`  · ASSIGN:identifier, ASSIGN:binary-left
  20. L659 `var  proxySite =  »removeEmpty[ rootSite. unlockSuccess[2]]«;`  · ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative
  21. L245 `if (»! removeEmpty[ rootSite. unlockTimeout]«) {`  · ELEMENT:member-element, ASSIGN:unary
  22. L246 `if (»removeEmpty[ rootSite. unlockSuccess[39]].indexOf(rootSite. unlockSuccess[18])« > -1){`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ELEMENT:computed-member-unknown-alternative
  23. L251 `var  articleMeta = (»rootSite. removeAttr -  removeEmpty[" unlockErr"]«) / 36E5;`  · ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  24. L252 `unlockContentEntry(12,  »articleMeta«,  srcDomain);`  · ASSIGN:identifier
  25. L306 `var  unlockTimer =  proxySite ?  rootSite. unlockSuccess[ removeAttr].replace("$1", »proxySite«) :  rootSite. unlockSuccess[ removeAttr];`  · ASSIGN:identifier
  26. L253 `if (»articleMeta« >  srcDomain) return removeLogEntries();`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #5 — ELEMENT_INNER_HTML (article)

- **Source**: `ELEMENT_INNER_HTML` — `content` L624:C8 -> L624:C17  `var »data = {}«;`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `content` L628:C13 -> L628:C22  `data.»innerHTML« = article.innerHTML;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L624 `var »data = {}«;`  · ELEMENT:object.setProperty
   2. L631 `return unlockTimer ? »JSON.stringify(data) : data«;`  · RETURN:json.stringify, ASSIGN:conditional-alternate

---

## Flow #6 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L29:C0 -> L46:C2 (spans to L46)  `»chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L39:C2 -> L39:C41  `»fetch(msg. removeAttr, {method: 'GET'})«`  (url-control=FULL)
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L36:C3 -> L36:C103  `»chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:  baseUrl, addRules: msg. proxySite})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (37 raw steps → 8 distinct lines):
   1. L29 (→L46) `»chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L30 `if (»msg. proxySite«){`  · ASSIGN:identifier, ELEMENT:member-element
   3. L38 `}else if (»msg. removeAttr && msg. baseUrl«){`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   4. L39 `fetch(»msg. removeAttr«, {method: 'GET'})`  · ASSIGN:identifier, ELEMENT:member-element
   5. L42 `var  proxySite = {[»msg. srcDomain]:  articleMeta.split(msg. baseUrl«)[1]};`  · ASSIGN:identifier, ELEMENT:member-element
   6. L43 `chrome.storage.local.set({[»msg. baseUrl«]:  proxySite})`  · ASSIGN:identifier, ELEMENT:member-element
   7. L36 `»chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:  baseUrl, addRules: msg. proxySite})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   8. L34 `if ( »proxySite > msg. articleMeta &&  proxySite < msg. removeAttr« )  baseUrl.push( proxySite)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right

---
