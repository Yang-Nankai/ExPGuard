# Source-level Taint Flow — cmkojcnichgfcdhlfalahahfaehnokob 1.7.7

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 5  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 19 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `background.min` L20:C2469 -> L20:C2537  `…-1,g(s),o=t[0]}).catch(e=>console.log(e)):"bookmark"===t.action?chrome.storage.sync.get(["folder"],function(e){e=e||"0",»chrome.bookmarks.create({parentId:e.folder,title:t.title,url:t.url})«}).catch(e=>console.log(e)):"remove bookmark"===t.action?chrome.bookmarks.getTree(function(e){(function e(t,n){if(t.url&…`
- **Sink(s)**:
  - `CHROME_BOOKMARK_CREATE_INFO` — `background.min` L20:C2469 -> L20:C2537  `…-1,g(s),o=t[0]}).catch(e=>console.log(e)):"bookmark"===t.action?chrome.storage.sync.get(["folder"],function(e){e=e||"0",»chrome.bookmarks.create({parentId:e.folder,title:t.title,url:t.url})«}).catch(e=>console.log(e)):"remove bookmark"===t.action?chrome.bookmarks.getTree(function(e){(function e(t,n){if(t.url&…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L20 `…-1,g(s),o=t[0]}).catch(e=>console.log(e)):"bookmark"===t.action?chrome.storage.sync.get(["folder"],function(e){e=e||"0",»chrome.bookmarks.create({parentId:e.folder,title:t.title,url:t.url})«}).catch(e=>console.log(e)):"remove bookmark"===t.action?chrome.bookmarks.getTree(function(e){(function e(t,n){if(t.url&…`  · ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `background.min` L20:C1276 -> L20:C3085  `…=>console.log(e))})}»chrome.runtime.onMessage.addListener(function(t,n,r){let s=0;try{i(),"new tab"===t.action?chrome.tabs.query({currentWind …⟨tainted span: 1809 chars⟩… ():"zoom out"===t.action&&chrome.tabs.getZoom(function(e){chrome.tabs.setZoom(e-.1)}),r("ok")}catch(m){console.log(m)}})«,chrome.windows.onCr…`
- **Sink(s)**:
  - `CHROME_BOOKMARK_CREATE_INFO` — `background.min` L20:C2469 -> L20:C2537  `…-1,g(s),o=t[0]}).catch(e=>console.log(e)):"bookmark"===t.action?chrome.storage.sync.get(["folder"],function(e){e=e||"0",»chrome.bookmarks.create({parentId:e.folder,title:t.title,url:t.url})«}).catch(e=>console.log(e)):"remove bookmark"===t.action?chrome.bookmarks.getTree(function(e){(function e(t,n){if(t.url&…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L20 `…=>console.log(e))})}»chrome.runtime.onMessage.addListener(function(t,n,r){let s=0;try{i(),"new tab"===t.action?chrome.tabs.query({currentWind …⟨tainted span: 1809 chars⟩… ():"zoom out"===t.action&&chrome.tabs.getZoom(function(e){chrome.tabs.setZoom(e-.1)}),r("ok")}catch(m){console.log(m)}})«,chrome.windows.onCr…`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[assets/web_assist/js/webassistbundled.min->background.min]`

---

## Flow #3 — ELEMENT_VALUE (timeout)

- **Source**: `ELEMENT_VALUE` — `settings.min` L1:C81 -> L1:C142  `const extpay=ExtPay("web-assist");var optSettings=null,defaultTimeout=30,paid=!1,»options={autostart:!0,enableWakeup:!0,timeout:defaultTimeout}«,initialized=!1;function checkSettings(e){extpay.getUser().then(t=>{(paid=t.paid)?enableSettings(t):"past_due"===t.subsc…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (timeout) — `settings.min` L1:C2602 -> L1:C2719  `…value}document.getElementById("waOptionsMessage").innerText=t,storeOptions(options)}})})}async function storeOptions(e){»chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize(){checkSettings(!0),getOptions(options),initializeEvents()}function checkFocus(){checkSettings()}in…`
  - `CHROME_SYNC_STORAGE` (autostart) — `settings.min` L1:C2602 -> L1:C2719  `…value}document.getElementById("waOptionsMessage").innerText=t,storeOptions(options)}})})}async function storeOptions(e){»chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize(){checkSettings(!0),getOptions(options),initializeEvents()}function checkFocus(){checkSettings()}in…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L1 `…tTimeout=30,paid=!1,»options={autostart:!0,enableWakeup:!0,timeout:defaultTimeout},initialized=!1;function checkSettings(e){extpay.getUser(). …⟨tainted span: 2638 chars⟩… e){chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container

---

## Flow #4 — ELEMENT_VALUE (From storage.sync.set('autostart') in settings.min)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `settings.min` L1:C81 -> L1:C142  `const extpay=ExtPay("web-assist");var optSettings=null,defaultTimeout=30,paid=!1,»options={autostart:!0,enableWakeup:!0,timeout:defaultTimeout}«,initialized=!1;function checkSettings(e){extpay.getUser().then(t=>{(paid=t.paid)?enableSettings(t):"past_due"===t.subsc…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (autostart) — `settings.min` L1:C2602 -> L1:C2719  `…value}document.getElementById("waOptionsMessage").innerText=t,storeOptions(options)}})})}async function storeOptions(e){»chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize(){checkSettings(!0),getOptions(options),initializeEvents()}function checkFocus(){checkSettings()}in…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (12 raw steps → 1 distinct lines):
   1. L1 `…tTimeout=30,paid=!1,»options={autostart:!0,enableWakeup:!0,timeout:defaultTimeout},initialized=!1;function checkSettings(e){extpay.getUser(). …⟨tainted span: 2638 chars⟩… e){chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, STORAGE:STORAGE_FLOW[area: sync, key: autostart, sender: settings.min, receiver: settings.min], ASSIGN:binary-right

---

## Flow #5 — ELEMENT_VALUE (From storage.sync.set('timeout') in settings.min)

- **Source**: `ELEMENT_VALUE` — `settings.min` L1:C81 -> L1:C142  `const extpay=ExtPay("web-assist");var optSettings=null,defaultTimeout=30,paid=!1,»options={autostart:!0,enableWakeup:!0,timeout:defaultTimeout}«,initialized=!1;function checkSettings(e){extpay.getUser().then(t=>{(paid=t.paid)?enableSettings(t):"past_due"===t.subsc…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (autostart) — `settings.min` L1:C2602 -> L1:C2719  `…value}document.getElementById("waOptionsMessage").innerText=t,storeOptions(options)}})})}async function storeOptions(e){»chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize(){checkSettings(!0),getOptions(options),initializeEvents()}function checkFocus(){checkSettings()}in…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (12 raw steps → 1 distinct lines):
   1. L1 `…tTimeout=30,paid=!1,»options={autostart:!0,enableWakeup:!0,timeout:defaultTimeout},initialized=!1;function checkSettings(e){extpay.getUser(). …⟨tainted span: 2638 chars⟩… e){chrome.storage.sync.set({autostart:e.autostart,enableWakeup:e.enableWakeup,timeout:e.timeout,paid:paid},function(){})«}function initialize…`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, STORAGE:STORAGE_FLOW[area: sync, key: timeout, sender: settings.min, receiver: settings.min], ASSIGN:binary-right

---
