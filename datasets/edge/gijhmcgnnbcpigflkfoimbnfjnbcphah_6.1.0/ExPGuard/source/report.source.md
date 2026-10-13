# Source-level Taint Flow — gijhmcgnnbcpigflkfoimbnfjnbcphah 6.1.0

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 23 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.origin)

- **Source**: `DOCUMENT_LOCATION` — `js/content/content` L6:C40833 -> L6:C40855  `…eSimple(r))return;let o="light";this.mode===f.Mode.DARK&&this.enabled&&(o="dark");var n=new XMLHttpRequest;n.open("PUT",»window.location.origin«+"/rest/api/3/mypreferences?key=jira.user.theme.preference",!0),n.setRequestHeader("Content-Type","application/json"),n.…`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_OPEN` — `js/content/content` L6:C40820 -> L6:C40918  `…kAndUpdateModeSimple(r))return;let o="light";this.mode===f.Mode.DARK&&this.enabled&&(o="dark");var n=new XMLHttpRequest;»n.open("PUT",window.location.origin+"/rest/api/3/mypreferences?key=jira.user.theme.preference",!0)«,n.setRequestHeader("Content-Type","application/json"),n.onload=function(){200!==n.status&&204!==n.status||window.locati…`  (url-control=PARTIAL)
  - `XML_HTTP_REQUEST_OPEN` — `js/content/content` L6:C41458 -> L6:C41563  `…kAndUpdateModeSimple(r))return;let o="light";this.mode===f.Mode.DARK&&this.enabled&&(o="dark");var n=new XMLHttpRequest;»n.open("POST",window.location.origin+"/cgraphql?q=UpdateLocalStorageMutation,ThemePreferenceMutation",!0)«,n.setRequestHeader("Content-Type","application/json"),n.onload=function(){200!==n.status&&204!==n.status||window.locati…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L6 `…equest;n.open("PUT",»window.location.origin+"/rest/api/3/mypreferences?key=jira.user.theme.preference",!0),n.setRequestHeader("Content-Type", …⟨tainted span: 661 chars⟩… ="light";this.mode===f.Mode.DARK&&this.enabled&&(o="dark");var n=new XMLHttpRequest;n.open("POST",window.location.origin«+"/cgraphql?q=Update…`  · ASSIGN:binary-left

---

## Flow #2 — NAVIGATOR_LANGUAGE (navigator.languages)

- **Source**: `NAVIGATOR_LANGUAGE` — `js/content/content` L6:C180973 -> L6:C181180  `…STATE,e.value),t.postMessage({});break;case"updateDeviceId":console.log("data.value: ",e.value)}}checkAndInitDeviceId(){»s.browser.runtime.onMessage.addListener((function(e,t,r){if(void 0!==typeof e.key&&e.key===h.Kernel.ID&&e.action===h.Kernel.ACTION_UPDATE_DEVICE_ID)window.localStorage.setItem("nighteye-ins",e.data),r({})}))«}updateHTMLStyles(e){e.brightness*=2,e.contrast*=2,e.saturation*=2;var t=e.temperature<50?1-.02*e.temperature:0,r=e.temp…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/content/content` L6:C181121 -> L6:C181171  `…addListener((function(e,t,r){if(void 0!==typeof e.key&&e.key===h.Kernel.ID&&e.action===h.Kernel.ACTION_UPDATE_DEVICE_ID)»window.localStorage.setItem("nighteye-ins",e.data)«,r({})}))}updateHTMLStyles(e){e.brightness*=2,e.contrast*=2,e.saturation*=2;var t=e.temperature<50?1-.02*e.temperature:0…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L6 `…STATE,e.value),t.postMessage({});break;case"updateDeviceId":console.log("data.value: ",e.value)}}checkAndInitDeviceId(){»s.browser.runtime.onMessage.addListener((function(e,t,r){if(void 0!==typeof e.key&&e.key===h.Kernel.ID&&e.action===h.Kernel.ACTION_UPDATE_DEVICE_ID)window.localStorage.setItem("nighteye-ins",e.data),r({})}))«}updateHTMLStyles(e){e.brightness*=2,e.contrast*=2,e.saturation*=2;var t=e.temperature<50?1-.02*e.temperature:0,r=e.temp…`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->js/content/content]`

---

## Flow #3 — NAVIGATOR_LANGUAGE (navigator.languages)

- **Source**: `NAVIGATOR_LANGUAGE` — `background` L3:C33203 -> L3:C33204  `…stuvwxyz0123456789",e=Math.random().toString().replace("0.",""),r=(new Date).getTime(),n=navigator.languages,a="",i=0;i<»n«.length;++i)for(var o=n[i],s=0;s<o.length;++s){var c=o[s];a+=t.charAt(Math.floor(Math.random()*t.length))+(c.charCodeAt(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (device_id) — `background` L3:C2642 -> L3:C2681  `…Object.getPrototypeOf(this.currentLocalStorage).setItem=function(t,e){return new Promise((function(r,n){var a={};a[t]=e,»chrome.storage.local.set(a,(()=>{r()}))«}))},Object.getPrototypeOf(this.currentLocalStorage).getItem=function(t){return new Promise((function(e,r){chrome.storag…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (557 raw steps → 1 distinct lines):
   1. L3 `…Storage().setItem(t,»e)}setItemSafariPromise(t,e){return new Promise(((r,n)=>{try{let n=setInterval(function i(){return a.browser.runtime.sen …⟨tainted span: 44930 chars⟩… y(t)),r}activateColorSelector(){}async generateDeviceId(){var t=G.generateUniqueDeviceId();await c.setItem("device_id",t«),await G.checkUsing…`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, RETURN:btoa, ELEMENT:object.setProperty, ASSIGN:template-literal

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L3:C60357 -> L3:C60635  `…st $=new J;$.init(),»a.browser.runtime.onMessage.addListener(((t,e,r)=>{switch(t.key){case f.Kernel.ID:$.kernel.onMessage(t.action,t.data,e,r …⟨tainted span: 278 chars⟩… r.onMessage(t.action,t.data,e,r);break;default:console.warn(`Not implemeted action recieved. Key: ${t.key}`)}return!0}))«,a.browser.runtime.o…`
- **Sink(s)**:
  - `FETCH_BODY` (https://billing.nighteye.app/exc/InstanceController) — `background` L3:C23476 -> L3:C23635  `…e,r,n)}activateNetworkRequest(t,e,r,n,i,o){return new Promise(((s,c)=>{var u=a.CONTROLLER_URL+"/exc/InstanceController";»fetch(u,{method:"POST",body:"ac=b&id="+t+"&devid="+e+"&instnm="+r+"&eml="+n+"&pass="+i+"&gId="+o,headers:{"Content-Type":"application/x-www-form-urlencoded"}})«.then((t=>t.json())).then((async t=>{const e=await this.activateProcessResponse(t,n);s(e)})).catch((t=>{console.error("E…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (15 raw steps → 1 distinct lines):
   1. L3 `…ivate(e,r,n){null===»e&&(e=t),e=encodeURIComponent(e),r=encodeURIComponent(r);const a=await c.getItem(u.instanceID),i=await c.getItem(u.devic …⟨tainted span: 37485 chars⟩… r.onMessage(t.action,t.data,e,r);break;default:console.warn(`Not implemeted action recieved. Key: ${t.key}`)}return!0}))«,a.browser.runtime.o…`  · MESSAGE, ASSIGN:identifier, ASSIGN:binary-right, RETURN:encodeURIComponent, ASSIGN:binary-left, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/content/content->background]`

---

## Flow #5 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L3:C61468 -> L3:C61469  `…pdate(t,{url:e})}})),a.browser.runtime.onMessageExternal.addListener(((t,e,r)=>{if("night-eye-create-support-message"===»t«.type){const e=t.payload;J.sendExternalSupportMessage(e,(t=>{r({response:t})}))}}))},9662:(t,e,r)=>{var n=r(614),a=r(633…`
- **Sink(s)**:
  - `FETCH_BODY` (https://relayflow.promotino.com/api/external/a) — `background` L3:C58181 -> L3:C58273  `…){if(void 0!==t)for(var e=t.firstChild;e;)t.removeChild(e),e=t.firstChild}}class z{static send(t,e,r){var n=e.join("&");»fetch(t,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:n})«.then((t=>t.text())).then((t=>{r(t)})).catch((t=>{}))}}Y.Controllers={MESSAGE:a.SUPPORT_MESSAGE_SYSTEM_URL+"/api/externa…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L3 `…(()=>{o.sendMessage(»i)}));o.sendMessage(i)}sendMessage(t){this.showSendLoading();var e=this.createMessageText(null,t);this.scrollToBottom(); …⟨tainted span: 8142 chars⟩… .addListener(((t,e,r)=>{if("night-eye-create-support-message"===t.type){const e=t.payload;J.sendExternalSupportMessage(e«,(t=>{r({response:t}…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:decodeURIComponent, ELEMENT:object.setProperty, ELEMENT:implicit.add, RETURN:array.join

---
