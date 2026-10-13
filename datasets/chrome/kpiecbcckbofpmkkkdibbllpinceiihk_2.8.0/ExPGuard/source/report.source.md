# Source-level Taint Flow — kpiecbcckbofpmkkkdibbllpinceiihk 2.8.0

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 4  (collapsed from 164 raw issue entries)
- Sinkless sources skipped: 15 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/worker` L1:C129552 -> L1:C129553  `…s:a.error})})}}(async()=>{H()})(),chrome.runtime.onMessageExternal.addListener(function(a,o,t){return(async()=>{"auth"==»a«.action&&(e.set("email",a.email),e.set("token",a.token),await e.get("udid")||e.set("udid",a.udid))})(),!0}),chrome.runti…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (email) — `js/worker` L1:C1948 -> L1:C1981  `…witch(a){case"bwStat":case"perSiteProxyHosts":case"proxyDomains":e=JSON.stringify(Array.from(e.entries()))}return await »chrome.storage.local.set({[a]:e})«}catch(a){return}},reset:async function(){var e=await this.get("udid",a.udid),o=await this.get("firstRun",a.firstRun),t=…`
  - `CHROME_LOCAL_STORAGE` (token) — `js/worker` L1:C1948 -> L1:C1981  `…witch(a){case"bwStat":case"perSiteProxyHosts":case"proxyDomains":e=JSON.stringify(Array.from(e.entries()))}return await »chrome.storage.local.set({[a]:e})«}catch(a){return}},reset:async function(){var e=await this.get("udid",a.udid),o=await this.get("firstRun",a.firstRun),t=…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (33 raw steps → 1 distinct lines):
   1. L1 `….from(e.entries()))}»return await chrome.storage.local.set({[a]:e})}catch(a){return}},reset:async function(){var e=await this.get("udid",a.ud …⟨tainted span: 127672 chars⟩… ageExternal.addListener(function(a,o,t){return(async()=>{"auth"==a.action&&(e.set("email",a.email),e.set("token",a.token«),await e.get("udid"…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('token') in js/worker)  ·  60× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/worker` L1:C129552 -> L1:C129553  `…s:a.error})})}}(async()=>{H()})(),chrome.runtime.onMessageExternal.addListener(function(a,o,t){return(async()=>{"auth"==»a«.action&&(e.set("email",a.email),e.set("token",a.token),await e.get("udid")||e.set("udid",a.udid))})(),!0}),chrome.runti…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `js/worker` L1:C121841 -> L1:C122065  `…ener(x)},rotateApiEndpoints:async function(){},updateUserInfo:async function(a){await e.get("location");try{var o=await »fetch(await e.get("apiHost")+"/3/user/info",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:await e.get("token"),type:this.getNavigator(),version:chrome.runtime.getManifest().version})})«;if(!o.ok)return;var t=await o.json();if(0!=t.code)return;await e.get("premium")!=!!t.premium&&this.init(),e.set("bwGrou…`
  - `FETCH_BODY` ([Unknown URL]) — `js/worker` L1:C122585 -> L1:C122779  `…at",n),t.token2&&e.set("token",t.token2),a&&a()}catch(a){console.log(a)}},getNode:async function(a,o,t){try{var n=await »fetch(await e.get("apiHost")+"/3/user/get-node",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:await e.get("token"),location:a,type:this.getNavigator()})})«;if(!n.ok)return void(t&&t());var i=await n.json();if(0==i.code){var s=await e.get("nodes");s[a]=i.node,await e.set("nod…`
  - `FETCH_BODY` ([Unknown URL]) — `js/worker` L1:C125811 -> L1:C125954  `…:o})})).ok)return}catch(a){}},checkNotifications:async function(){var a=await e.get("token");if(null!=a)try{var o=await »fetch(await e.get("apiHost")+"/3/user/notification",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:a})})«;if(!o.ok)return;var t=await o.json();if(!t.event)return;t.event!=e.event&&(e.set("event",t.event),e.set("eventView",!1)…`
  - `FETCH_BODY` ([Unknown URL]) — `js/worker` L1:C126195 -> L1:C126381  `…,e.set("eventExpire",t.eventExpire)}catch(a){console.log(a)}},updateNotification:async function(a,o,t,n){try{if(!(await »fetch(await e.get("apiHost")+"/3/user/notification",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:await e.get("token"),event:a,action:o,info:t})})«).ok)return;n()}catch(a){}},isNumber:function(a){var e=(a=a||window.event).which?a.which:a.keyCode;e>31&&(e<48||e>57)&&a…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (147 raw steps → 1 distinct lines):
   1. L1 `…(e){try{var o=await »chrome.storage.local.get(e);if(void 0===o[e])return a[e]instanceof Array?[]:a[e]instanceof Map?new Map:a[e]instanceof Se …⟨tainted span: 129792 chars⟩… {delayInMinutes:0,periodInMinutes:60}),chrome.alarms.onAlarm.addListener(async function(a){if(null!=await e.get("token")«)switch(a.name){case…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: token, sender: js/worker, receiver: js/worker], ELEMENT:implicit.add, RETURN:json.stringify

---

## Flow #3 — CHROME_MANAGEMENT_INFO

- **Source**: `CHROME_MANAGEMENT_INFO` — `popup/js/bridge` L1:C141113 -> L1:C141289  `…nterval(async function(){o("connectionDurationChange",t(A.getUnixtime()-await a.get("lastConnectTime")))},1e3);var e=!0;»(await chrome.management.getAll()).forEach(function(a){a.id!=chrome.runtime.id&&0!=a.enabled&&-1!==a.permissions.indexOf("proxy")&&(e=!1,r.name=a.shortName||a.name,r.id=a.id)})«;var i=await a.get("token");if(e||o("proxyControl",r),!i)return o("showSignupView"),void await l();null!=await a.get("si…`
- **Sink(s)**:
  - `CHROME_MANAGEMENT_SETENABLED_ID` — `popup/js/bridge` L1:C147973 -> L1:C148163  `…ction(){if(r.id&&chrome.management&&chrome.management.setEnabled){var e=await a.get("token");return new Promise(a=>{try{»chrome.management.setEnabled(r.id,!1,()=>{chrome.runtime&&chrome.runtime.lastError&&console.error("[BridgeAPI] getProxyControl error:",chrome.runtime.lastError.message),null==e?m():d(),a()})«}catch(e){console.error("[BridgeAPI] getProxyControl exception:",e),a()}})}},addEventListener:function(a,o){switch(a){ca…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (250 raw steps → 1 distinct lines):
   1. L1 `…event:",a,e)}}const »r={id:null,name:null},c=function(){const e=(e,o)=>async function(){const t=await a.get(e);return"boolean"==typeof t?t:vo …⟨tainted span: 10617 chars⟩… gement&&chrome.management.setEnabled){var e=await a.get("token");return new Promise(a=>{try{chrome.management.setEnabled«(r.id,!1,()=>{chrome…`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, RETURN:fallback-return, ELEMENT:member-element-container

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('token') in js/worker)  ·  102× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `popup/js/bridge` L1:C129552 -> L1:C129553  `…etNode(t,async(a,e)=>{await n.get("enabled")&&s.enable(a,e)}),await n.get("blockWebRTC")&&this.disableWebRTC()):await th»i«s.getNode(t,async(e,o)=>{s.enable(e,o),await n.get("firstConnect")||n.set("firstConnect",!0),this._updateUI(a),await n.g…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `popup/js/bridge` L1:C127267 -> L1:C127491  `…ener(j)},rotateApiEndpoints:async function(){},updateUserInfo:async function(a){await n.get("location");try{var e=await »fetch(await n.get("apiHost")+"/3/user/info",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:await n.get("token"),type:this.getNavigator(),version:chrome.runtime.getManifest().version})})«;if(!e.ok)return;var o=await e.json();if(0!=o.code)return;await n.get("premium")!=!!o.premium&&this.init(),n.set("bwGrou…`
  - `FETCH_BODY` ([Unknown URL]) — `popup/js/bridge` L1:C128011 -> L1:C128205  `…at",t),o.token2&&n.set("token",o.token2),a&&a()}catch(a){console.log(a)}},getNode:async function(a,e,o){try{var t=await »fetch(await n.get("apiHost")+"/3/user/get-node",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:await n.get("token"),location:a,type:this.getNavigator()})})«;if(!t.ok)return void(o&&o());var i=await t.json();if(0==i.code){var s=await n.get("nodes");s[a]=i.node,await n.set("nod…`
  - `FETCH_BODY` ([Unknown URL]) — `popup/js/bridge` L1:C131237 -> L1:C131380  `…:e})})).ok)return}catch(a){}},checkNotifications:async function(){var a=await n.get("token");if(null!=a)try{var e=await »fetch(await n.get("apiHost")+"/3/user/notification",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:a})})«;if(!e.ok)return;var o=await e.json();if(!o.event)return;o.event!=n.event&&(n.set("event",o.event),n.set("eventView",!1)…`
  - `FETCH_BODY` ([Unknown URL]) — `popup/js/bridge` L1:C131621 -> L1:C131807  `…,n.set("eventExpire",o.eventExpire)}catch(a){console.log(a)}},updateNotification:async function(a,e,o,t){try{if(!(await »fetch(await n.get("apiHost")+"/3/user/notification",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:await n.get("token"),event:a,action:e,info:o})})«).ok)return;t()}catch(a){}},isNumber:function(a){var e=(a=a||window.event).which?a.which:a.keyCode;e>31&&(e<48||e>57)&&a…`
  - `CHROME_TABS_CREATE_OPTIONS` — `popup/js/bridge` L1:C144158 -> L1:C144185  `…it a.get("token")||"",o="https://dotvpn.com/?token="+encodeURIComponent(e)+"&order";try{chrome.tabs&&chrome.tabs.create?»chrome.tabs.create({url:o})«:"undefined"!=typeof window&&window.open(o,"_blank")}catch(a){console.error("[BridgeAPI] openUpgradeTab exception:",a)}}…`
  - `FETCH_BODY` ([Unknown URL]) — `popup/js/bridge` L1:C145921 -> L1:C146060  `…!n)return console.error("[BridgeAPI] sendFeedback: apiHost is not configured"),500;const i=await a.get("token"),s=await »fetch(n+"/3/user/app-feedback",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify({token:i,subject:t,text:o})})«;return s.ok?(await s.json()).code:500},signinSendCode:async function(e){const t=await a.get("apiHost")||"";if(!t)return…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (213 raw steps → 1 distinct lines):
   1. L1 `…his.target):this.lis»tener.apply(this.target,arguments)}function m(a,e,o){var t={fired:!1,wrapFn:void 0,target:a,type:e,listener:o},n=l.bind( …⟨tainted span: 146214 chars⟩… &&chrome.runtime.lastError&&console.error("[BridgeAPI] getProxyControl error:",chrome.runtime.lastError.message),null==e«?m():d(),a()})}catch…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: token, sender: js/worker, receiver: popup/js/bridge], ELEMENT:implicit.add, RETURN:json.stringify, ASSIGN:logical-left, RETURN:encodeURIComponent, ASSIGN:binary-left

---
