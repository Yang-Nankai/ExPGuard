# Source-level Taint Flow — ppkojackhibeogijphhfnamhemklmial 7.0.5

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 4  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L1:C37119 -> L1:C37120  `…s gt{constructor(){chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>(console.log("Data has been requested...",»e«),new Promise(async t=>{let r,s;switch(e.type){case"installedCheck":n(!0);break;case"getStorage":n(await d(e.keys));brea…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L1:C37617 -> L1:C37645  `…name&&e(n.shortcut)}):chrome.runtime.sendMessage(l,{type:"keyboardShortcut"},function(t){e(t)})})}();break;case"newTab":»chrome.tabs.create(e.object)«;break;case"goToAccountPage":s=await this.getTabID(),console.log("Tab ID:",s),await chrome.tabs.update(s,{url:"chrome-ex…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (93 raw steps → 1 distinct lines):
   1. L1 `… been requested...",»e),new Promise(async t=>{let r,s;switch(e.type){case"installedCheck":n(!0);break;case"getStorage":n(await d(e.keys));bre …⟨tainted span: 1118 chars⟩… T!"),mt("User signed out from website.");break;default:console.log("External Data Request: unknown request type!",e.type«)}console.log("Data …`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #2 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `js/background` L1:C1113 -> L1:C1117  `…le.log("VSSettings init...");let n=await new Promise(e=>{chrome.storage.local.get(null,async function(t){e(t)})}),r={id:»n.id«||i(),imageType:n.imageType||"image/jpeg",whitelist:n.whitelist||[],blacklist:n.blacklist||[],saveFolder:n.saveFolder||"…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (id) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (imageType) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (saveFolder) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (askToSave) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (hideAllVSSIcons) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (screenshotCount) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (reviewed) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (showReviewPrompt) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (lastReviewPrompt) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (user) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (sub) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (defManifestTimestamp) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (styleDefs) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (siteDefs) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
  - `CHROME_LOCAL_STORAGE` (lastError) — `js/background` L1:C2181 -> L1:C2223  `…p||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist&&(r.blacklist=[]);await new Promise(e=>{»chrome.storage.local.set(r,t=>{e("done")})«}),await async function(e,t){let n=Object.keys(e),r=Object.keys(t||{}).filter(e=>!n.includes(e));r.length&&await new Pro…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (116 raw steps → 1 distinct lines):
   1. L1 `…unction(t){e(t)})}),»r={id:n.id||i(),imageType:n.imageType||"image/jpeg",whitelist:n.whitelist||[],blacklist:n.blacklist||[],saveFolder:n.sav …⟨tainted span: 1033 chars⟩… subsEnabled||!1,r.autoCrop=!0===n.autoCrop||"true"===n.autoCrop||!1);""===r.whitelist&&(r.whitelist=[]);""===r.blacklist«&&(r.blacklist=[]);a…`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:conditional-consequent, ASSIGN:identifier

---

## Flow #3 — STORAGE_ALL_ITEMS (From storage.local.set('askToSave') in js/background)  ·  2× duplicate paths collapsed

- **Source**: `STORAGE_ALL_ITEMS` — `js/background` L1:C1113 -> L1:C1117  `…le.log("VSSettings init...");let n=await new Promise(e=>{chrome.storage.local.get(null,async function(t){e(t)})}),r={id:»n.id«||i(),imageType:n.imageType||"image/jpeg",whitelist:n.whitelist||[],blacklist:n.blacklist||[],saveFolder:n.saveFolder||"…`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `js/background` L1:C41435 -> L1:C41639  `…console.log(t),e(t)})}).then(async t=>{e.useBackground?(console.log("Using background to download..."),console.log(e,t),»chrome.downloads.download({url:e.url,filename:e.filename,saveAs:!0===t.askToSave},e=>{console.log("Screenshot Downloaded!",e),chrome.runtime.lastError&&console.log("Last Error",chrome.runtime.lastError)})«):console.log("Background not used to download.")})};const Et=function(e){chrome.tabs.query({currentWindow:!0,active:!0}…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (121 raw steps → 1 distinct lines):
   1. L1 `…unction(t){e(t)})}),»r={id:n.id||i(),imageType:n.imageType||"image/jpeg",whitelist:n.whitelist||[],blacklist:n.blacklist||[],saveFolder:n.sav …⟨tainted span: 40532 chars⟩… >{console.log("Screenshot Downloaded!",e),chrome.runtime.lastError&&console.log("Last Error",chrome.runtime.lastError)})«):console.log("Backg…`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:conditional-consequent, ASSIGN:identifier, STORAGE:STORAGE_FLOW[area: local, key: askToSave, sender: js/background, receiver: js/background]

---

## Flow #4 — STORAGE_ALL_ITEMS (From storage.local.set('id') in js/background)  ·  3× duplicate paths collapsed

- **Source**: `STORAGE_ALL_ITEMS` — `js/background` L1:C1113 -> L1:C1117  `…le.log("VSSettings init...");let n=await new Promise(e=>{chrome.storage.local.get(null,async function(t){e(t)})}),r={id:»n.id«||i(),imageType:n.imageType||"image/jpeg",whitelist:n.whitelist||[],blacklist:n.blacklist||[],saveFolder:n.saveFolder||"…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L1:C42459 -> L1:C42550  `…nt_id","G-6E5Z57BM0Y");let s={client_id:n,events:[{name:e.event,params:{action:e.action,URL:new URL(t.url).hostname}}]};»fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})«.then(function(e){console.log("GA4 Posted:",e)})}class kt{constructor(){chrome.runtime.onMessage.addListener((e,t,n)=>{i…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (129 raw steps → 1 distinct lines):
   1. L1 `…unction(t){e(t)})}),»r={id:n.id||i(),imageType:n.imageType||"image/jpeg",whitelist:n.whitelist||[],blacklist:n.blacklist||[],saveFolder:n.sav …⟨tainted span: 41491 chars⟩… ST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then(function(e){console.log("GA4 Posted:",e)})«}class kt{constructo…`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:conditional-consequent, ASSIGN:identifier, STORAGE:STORAGE_FLOW[area: local, key: id, sender: js/background, receiver: js/background], RETURN:json.stringify

---
