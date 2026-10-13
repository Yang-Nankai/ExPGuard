# Source-level Taint Flow — gdnpkbipbholkoaggmlblpbmgemddbgb 1.27.1

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 41 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background.min` L2:C617762 -> L2:C619480  `…-web"});const vt={};»chrome.runtime.onMessage.addListener((function(e,t,r){if("OPEN_VIOLATION_DETAILS"===e.type){const r=t.tab.id;return vt[e …⟨tainted span: 1718 chars⟩… ,t({message:"Accessible Web Helper opened"})}}))})(e,r),"ORIGIN_ERROR"===e.type&&console.error("Unknown origin",t),!0}))«})()})();`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background.min` L2:C618287 -> L2:C618328  `…ailsToggle",nodeId:t},{frameId:r})})(r,t,n)}return"HIGHLIGHT_VIOLATION"===e.type&&(async(e,t)=>{let r=!0;const n=(await »chrome.tabs.create({active:!0,url:e.url})«).id;chrome.tabs.onUpdated.addListener((async(a,o)=>{if(a===n&&o.hasOwnProperty("status")&&"complete"===o.status&&r){let…`
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background.min` L2:C618917 -> L2:C618958  `…,t({message:"Accessible Web Helper opened"})}}))})(e,r),"TEST_CRITERIA"===e.type&&(async(e,t)=>{let r=!0;const n=(await »chrome.tabs.create({active:!0,url:e.url})«).id;chrome.tabs.onUpdated.addListener((async(a,o)=>{if(a===n&&o.hasOwnProperty("status")&&"complete"===o.status&r){let …`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (93 raw steps → 1 distinct lines):
   1. L2 `…-web"});const vt={};»chrome.runtime.onMessage.addListener((function(e,t,r){if("OPEN_VIOLATION_DETAILS"===e.type){const r=t.tab.id;return vt[e …⟨tainted span: 1718 chars⟩… ,t({message:"Accessible Web Helper opened"})}}))})(e,r),"ORIGIN_ERROR"===e.type&&console.error("Unknown origin",t),!0}))«})()})();`  · MESSAGE, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:logical-left
      ⇄ cross-context hop: `runtime.single.sender.message[js/awebChromeHelper.min->js/background.min]`

---

## Flow #2 — CHROME_COOKIES_INFO (cookies(https://ramp.accessibleweb.com/))

- **Source**: `CHROME_COOKIES_INFO` — `js/popup.min` L2:C115238 -> L2:C115239  `…hed"])).authed}catch(e){return!1}},async authenticate(){const e=await chrome.cookies.get({url:ya,name:"csrftoken"}),t=e?»e«.value:null,n=await chrome.cookies.get({url:ya,name:"sessionid"}),i=n?n.value:null;chrome.storage.sync.set({authed:null!…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (authed) — `js/popup.min` L2:C115322 -> L2:C115372  `….get({url:ya,name:"csrftoken"}),t=e?e.value:null,n=await chrome.cookies.get({url:ya,name:"sessionid"}),i=n?n.value:null;»chrome.storage.sync.set({authed:null!=t&&null!=i})«.then((()=>{wa.defaults.headers["X-CSRFTOKEN"]=t}))},async request(e,t){let n=arguments.length>2&&void 0!==arguments[2]?…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L2 `…hed"])).authed}catch(e){return!1}},async authenticate(){const e=await chrome.cookies.get({url:ya,name:"csrftoken"}),t=e?»e.value:null,n=await chrome.cookies.get({url:ya,name:"sessionid"}),i=n?n.value:null;chrome.storage.sync.set({authed:null!=t&&null!=i}).then((()=>{wa.defaults.headers["X-CSRFTOKEN"]=t}))«},async request(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==ar…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:binary-right, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #3 — CHROME_COOKIES_INFO (cookies(https://ramp.accessibleweb.com/))

- **Source**: `CHROME_COOKIES_INFO` — `js/popup.min` L2:C115309 -> L2:C115310  `…hrome.cookies.get({url:ya,name:"csrftoken"}),t=e?e.value:null,n=await chrome.cookies.get({url:ya,name:"sessionid"}),i=n?»n«.value:null;chrome.storage.sync.set({authed:null!=t&&null!=i}).then((()=>{wa.defaults.headers["X-CSRFTOKEN"]=t}))},async…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (authed) — `js/popup.min` L2:C115322 -> L2:C115372  `….get({url:ya,name:"csrftoken"}),t=e?e.value:null,n=await chrome.cookies.get({url:ya,name:"sessionid"}),i=n?n.value:null;»chrome.storage.sync.set({authed:null!=t&&null!=i})«.then((()=>{wa.defaults.headers["X-CSRFTOKEN"]=t}))},async request(e,t){let n=arguments.length>2&&void 0!==arguments[2]?…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L2 `…hrome.cookies.get({url:ya,name:"csrftoken"}),t=e?e.value:null,n=await chrome.cookies.get({url:ya,name:"sessionid"}),i=n?»n.value:null;chrome.storage.sync.set({authed:null!=t&&null!=i}).then((()=>{wa.defaults.headers["X-CSRFTOKEN"]=t}))«},async request(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==ar…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:binary-right, ASSIGN:logical-right, ELEMENT:object.setProperty

---
