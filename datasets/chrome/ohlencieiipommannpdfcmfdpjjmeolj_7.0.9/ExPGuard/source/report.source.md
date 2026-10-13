# Source-level Taint Flow — ohlencieiipommannpdfcmfdpjjmeolj 7.0.9

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 8  (collapsed from 57 raw issue entries)
- Sinkless sources skipped: 17 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L1:C38184 -> L1:C38242  `…async function Pe(e,a){if(!xe())return[];const t=await chrome.cookies.getAllCookieStores(),n=[];for(const i of t){const »t=await chrome.cookies.getAll({name:e,url:a,storeId:i.id})«;n.push(...t)}return n}async function ze(e,a){if(!xe())return;const t=await chrome.cookies.getAllCookieStores();for(cons…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://www.printfriendly.com/api/v4/user/profile) — `background` L1:C2036036 -> L1:C2036143  `…||await la(),{success:!0}},o=async e=>{let a=e||null;if(!a){const e=await t();e&&!n(e)&&(a=e.value)}if(a){const e=await »fetch(`${r}/api/v4/user/profile`,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}})«;if(!e.ok)return 401!==e.status&&403!==e.status||await la(),{success:!1};const t=await e.json();await chrome.storage.loc…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L1:C2036245 -> L1:C2036313  `…n:`Bearer ${a}`}});if(!e.ok)return 401!==e.status&&403!==e.status||await la(),{success:!1};const t=await e.json();await »chrome.storage.local.set({[y.UserProfile]:t.user,[y.AccessToken]:a})«;const n=await chrome.storage.local.get([y.ExtensionTabId,y.SigninTabId]);for(let e=0;e<10;e++){await ke(1e3);if((await …`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1406 raw steps → 1 distinct lines):
   1. L1 `…etAllCookieStores(),»n=[];for(const i of t){const t=await chrome.cookies.getAll({name:e,url:a,storeId:i.id});n.push(...t)}return n}async func …⟨tainted span: 1999106 chars⟩… ome.runtime.onMessageExternal.addListener(async(e,a,t)=>a.origin!==r?t({success:!1}):e.accessToken?o(e.accessToken).then«(t):void(e.removeAcc…`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:template-literal

---

## Flow #2 — CHROME_COOKIES_STORE

- **Source**: `CHROME_COOKIES_STORE` — `background` L1:C38310 -> L1:C38353  `…t chrome.cookies.getAll({name:e,url:a,storeId:i.id});n.push(...t)}return n}async function ze(e,a){if(!xe())return;const »t=await chrome.cookies.getAllCookieStores()«;for(const n of t)await chrome.cookies.remove({url:a,name:e,storeId:n.id})}function Re(e){return e===x.PNG?"image/png":"…`
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `background` L1:C38377 -> L1:C38427  `…eturn n}async function ze(e,a){if(!xe())return;const t=await chrome.cookies.getAllCookieStores();for(const n of t)await »chrome.cookies.remove({url:a,name:e,storeId:n.id})«}function Re(e){return e===x.PNG?"image/png":"image/jpeg"}async function Ie(){const e=(await chrome.storage.local.get(y.…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (992 raw steps → 1 distinct lines):
   1. L1 `…t chrome.cookies.getAll({name:e,url:a,storeId:i.id});n.push(...t)}return n}async function ze(e,a){if(!xe())return;const »t=await chrome.cookies.getAllCookieStores();for(const n of t)await chrome.cookies.remove({url:a,name:e,storeId:n.id})«}function Re(e){return e===x.PNG?"image/png":"image/jpeg"}async function Ie(){const e=(await chrome.storage.local.get(y.…`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member-element

---

## Flow #3 — CHROME_COOKIES_ONCHANGED  ·  2× duplicate paths collapsed

- **Source**: `CHROME_COOKIES_ONCHANGED` — `background` L1:C2036760 -> L1:C2036761  `…Id],{active:!0,highlighted:!0}),await chrome.storage.local.remove(String(y.ExtensionTabId)))}return{success:!!a}},s=e=>{»e«.cookie.name===d&&(e.removed?"overwrite"!==e.cause&&la().catch(e=>console.error("[auth-detection] reset on cookie remova…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://www.printfriendly.com/api/v4/user/profile) — `background` L1:C2036036 -> L1:C2036143  `…||await la(),{success:!0}},o=async e=>{let a=e||null;if(!a){const e=await t();e&&!n(e)&&(a=e.value)}if(a){const e=await »fetch(`${r}/api/v4/user/profile`,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}})«;if(!e.ok)return 401!==e.status&&403!==e.status||await la(),{success:!1};const t=await e.json();await chrome.storage.loc…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (29 raw steps → 1 distinct lines):
   1. L1 `…},o=async e=>{let a=»e||null;if(!a){const e=await t();e&&!n(e)&&(a=e.value)}if(a){const e=await fetch(`${r}/api/v4/user/profile`,{headers:{"C …⟨tainted span: 1034 chars⟩… removal failed:",e)):o(e.cookie.value).catch(e=>console.error("[auth-detection] auth check on cookie change failed:",e))«)};return chrome.coo…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:unary, ASSIGN:template-literal, ELEMENT:object.setProperty, ELEMENT:implicit.add

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C2037242 -> L1:C2037243  `…stener(s),e=!0),chrome.runtime.onMessageExternal.addListener(async(e,a,t)=>a.origin!==r?t({success:!1}):e.accessToken?o(»e«.accessToken).then(t):void(e.removeAccessToken&&await la())),{messageListener:async(a,t,n)=>{switch(a.action){case v.Che…`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://www.printfriendly.com/api/v4/user/profile) — `background` L1:C2036036 -> L1:C2036143  `…||await la(),{success:!0}},o=async e=>{let a=e||null;if(!a){const e=await t();e&&!n(e)&&(a=e.value)}if(a){const e=await »fetch(`${r}/api/v4/user/profile`,{headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`}})«;if(!e.ok)return 401!==e.status&&403!==e.status||await la(),{success:!1};const t=await e.json();await chrome.storage.loc…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (17 raw steps → 1 distinct lines):
   1. L1 `…},o=async e=>{let a=»e||null;if(!a){const e=await t();e&&!n(e)&&(a=e.value)}if(a){const e=await fetch(`${r}/api/v4/user/profile`,{headers:{"C …⟨tainted span: 1294 chars⟩… 0),chrome.runtime.onMessageExternal.addListener(async(e,a,t)=>a.origin!==r?t({success:!1}):e.accessToken?o(e.accessToken«).then(t):void(e.rem…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:unary, ASSIGN:template-literal, ELEMENT:object.setProperty

---

## Flow #5 — CHROME_TABS_CAPUTURE_VISIBLE_TAB

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` — `background` L1:C38831 -> L1:C38832  `…Ie(),t=await chrome.tabs.captureVisibleTab(e.windowId,{format:a});await chrome.storage.local.set({[y.ScreenshotImages]:[»t«]})}async function De(e,a=""){const t=await chrome.tabs.get(e);if(t){const e=_e(t.url||"",t.title||"",a);await chrome.st…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L1:C38783 -> L1:C38835  `…nction je(){const e=await Ee(),{format:a}=await Ie(),t=await chrome.tabs.captureVisibleTab(e.windowId,{format:a});await »chrome.storage.local.set({[y.ScreenshotImages]:[t]})«}async function De(e,a=""){const t=await chrome.tabs.get(e);if(t){const e=_e(t.url||"",t.title||"",a);await chrome.stora…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (33 raw steps → 1 distinct lines):
   1. L1 `…ync function je(){const e=await Ee(),{format:a}=await Ie(),t=await chrome.tabs.captureVisibleTab(e.windowId,{format:a});»await chrome.storage.local.set({[y.ScreenshotImages]:[t]})«}async function De(e,a=""){const t=await chrome.tabs.get(e);if(t){const e=_e(t.url||"",t.title||"",a);await chrome.stora…`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #6 — CHROME_TABS_CAPUTURE_VISIBLE_TAB

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` — `background` L1:C54590 -> L1:C54591  `…Ie();for(;;){try{r=await chrome.tabs.captureVisibleTab(e,{format:s})}catch(e){if(o(e)){await ke(50);continue}throw e}if(»r«)break}if(!r){const e=new Error("No dataURI generated for visible tab");throw e.name="APICaptureStepError",e}const l=awa…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C35778 -> L1:C35786  `…d"))},a.onload=()=>t({img:a,src:e,width:a.width,height:a.height}),a.crossOrigin="anonymous",a.src=e})}try{const a=await »fetch(e)«,t=await a.blob(),n=await createImageBitmap(t);return{img:n,src:e,width:n.width,height:n.height}}catch{throw new Error("…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L1 `…ve(e){if(!be){const »a=new Image;return new Promise((t,n)=>{a.onerror=()=>{n(new Error("Image load failed"))},a.onload=()=>t({img:a,src:e,wid …⟨tainted span: 19832 chars⟩…  mask!",JSON.stringify(i)):0===c||0===d?console.warn("Zero area for image!",JSON.stringify(i)):n.drawImage(l.img,f,b,c,d«,i,{x:p,y:m,width:g,…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left, ASSIGN:conditional-alternate, ASSIGN:binary-right, ASSIGN:logical-left, RETURN:json.stringify

---

## Flow #7 — CHROME_COOKIES_INFO (From storage.local.set('unknown') in background)  ·  28× duplicate paths collapsed

- **Source**: `CHROME_COOKIES_INFO` — `background` L1:C38184 -> L1:C38242  `…async function Pe(e,a){if(!xe())return[];const t=await chrome.cookies.getAllCookieStores(),n=[];for(const i of t){const »t=await chrome.cookies.getAll({name:e,url:a,storeId:i.id})«;n.push(...t)}return n}async function ze(e,a){if(!xe())return;const t=await chrome.cookies.getAllCookieStores();for(cons…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C2013079 -> L1:C2013120  `…(),await chrome.storage.local.set({[y.PdfLocalTakeoverEnabled]:!0,[y.PdfConsentModalShownAt]:Date.now()});const a=await »chrome.tabs.create({url:Z(_i,e.fileUrl)})«;void 0!==a.windowId&&await chrome.windows.update(a.windowId,{focused:!0}),void 0!==e.settingsTabId&&chrome.tabs.remove(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1408 raw steps → 1 distinct lines):
   1. L1 `…ie=(async()=>{let e=»(await chrome.storage.local.get(y.ClientId))[y.ClientId];return e||(e=self.crypto.randomUUID(),await chrome.storage.loca …⟨tainted span: 2021801 chars⟩… ome.runtime.onMessageExternal.addListener(async(e,a,t)=>a.origin!==r?t({success:!1}):e.accessToken?o(e.accessToken).then«(t):void(e.removeAcc…`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:template-literal, STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: background, receiver: background], ELEMENT:computed-member-unknown-alternative

---

## Flow #8 — CHROME_TABS_CAPUTURE_VISIBLE_TAB (From storage.local.set('unknown') in background)  ·  22× duplicate paths collapsed

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` — `background` L1:C38831 -> L1:C38832  `…Ie(),t=await chrome.tabs.captureVisibleTab(e.windowId,{format:a});await chrome.storage.local.set({[y.ScreenshotImages]:[»t«]})}async function De(e,a=""){const t=await chrome.tabs.get(e);if(t){const e=_e(t.url||"",t.title||"",a);await chrome.st…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C2013079 -> L1:C2013120  `…(),await chrome.storage.local.set({[y.PdfLocalTakeoverEnabled]:!0,[y.PdfConsentModalShownAt]:Date.now()});const a=await »chrome.tabs.create({url:Z(_i,e.fileUrl)})«;void 0!==a.windowId&&await chrome.windows.update(a.windowId,{focused:!0}),void 0!==e.settingsTabId&&chrome.tabs.remove(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (35 raw steps → 1 distinct lines):
   1. L1 `…ie=(async()=>{let e=»(await chrome.storage.local.get(y.ClientId))[y.ClientId];return e||(e=self.crypto.randomUUID(),await chrome.storage.loca …⟨tainted span: 23375 chars⟩… ,t=await chrome.tabs.captureVisibleTab(e.windowId,{format:a});await chrome.storage.local.set({[y.ScreenshotImages]:[t]})«}async function De(e…`  · ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: background, receiver: background], ELEMENT:computed-member-unknown-alternative

---
