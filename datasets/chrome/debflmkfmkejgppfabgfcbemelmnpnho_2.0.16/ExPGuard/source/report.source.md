# Source-level Taint Flow — debflmkfmkejgppfabgfcbemelmnpnho 2.0.16

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 3  (collapsed from 10 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `service-worker` L1:C6334 -> L1:C6363  `…g("[logger] enqueue",e.event?.eventName??"(log)","queueSize=",y.length+1),y.push(e),tt(),et()}async function rt(){let t=»self.navigator?.userAgent??""«;C={appVersion:chrome.runtime.getManifest().version,os:Et(t),systemVersion:t,appDisplayLanguage:chrome.i18n.getUILanguag…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (vf_log_queue) — `service-worker` L1:C5146 -> L1:C5179  `…="string"&&(r.log=r.log.slice(0,yt)+"...[truncated]",r.truncated=!0,n={base:e,event:r}),n}async function tt(){try{await »chrome.storage.local.set({[V]:y})«}catch(t){console.warn("[logger] persist queue failed",t)}}async function vt(){if(k)return;k=!0;let t=(await chrome.stor…`
  - `FETCH_BODY` ([Unknown URL]) — `service-worker` L1:C5640 -> L1:C5725  `…ft}?pid=${X}&tag=${encodeURIComponent(Z)}&timestamp=${e}&signature=${r}`;console.debug("[logger] POST",n,t);let i=await »fetch(n,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify(t)})«;if(!i.ok)throw new Error(`log http ${i.status}`);console.debug("[logger] sent OK")}async function Nt(t){for(let e=0;e<=…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (123 raw steps → 1 distinct lines):
   1. L1 `…ull,R=null,j=0,b="",»y=[],F=!1,k=!1;function Et(t){return/Edg\//.test(t)?"Edge":/Firefox/.test(t)?"Firefox":/OPR\//.test(t)?"Opera":/Chrome/. …⟨tainted span: 3025 chars⟩… appVersion:chrome.runtime.getManifest().version,os:Et(t),systemVersion:t,appDisplayLanguage:chrome.i18n.getUILanguage()}«,await Ct();let e=aw…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty, RETURN:json.stringify, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:array.shift

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service-worker` L1:C18548 -> L1:C18549  `…sed?re(a):t.type===o.webrtcCaptureResumed&&ee(a,t)}return!0});chrome.runtime.onMessageExternal.addListener((t,e,r)=>{if(»t«?.type!==o.trackEvent&&_.then(()=>{let n="";try{let i=t?{...t}:{};if(i.data&&typeof i.data=="object"){let{token:a,...s}=…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (vf_user) — `service-worker` L1:C19097 -> L1:C19140  `…WN",requestType:"API",code:t.data.response?.status??-1,result:n})}),r({ok:!0}),!0}if(t?.type===o.loginSuccess&&t.data&&(»chrome.storage.local.set({[A.user]:t.data})«,O(t.data),_.then(()=>{E.event("anon_uid_bind","login",{anonUid:Y(),userId:String(t.data.uid||"")}),E.event("loginSucces…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (206 raw steps → 1 distinct lines):
   1. L1 `…{return btoa(String(»t??""))}function jt(t){let e=new URL(Gt());return e.searchParams.set("ver",chrome.runtime.getManifest().version),e.searc …⟨tainted span: 10653 chars⟩… !a)return r({ok:!1,error:"eventName and eventScene are required"}),!0;let s=n.params&&typeof n.params=="object"?n.params«:{};return _.then(()…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:conditional-consequent, ASSIGN:unary

---

## Flow #3 — NAVIGATOR_USER_AGENT (From storage.local.set('vf_log_queue') in service-worker)  ·  8× duplicate paths collapsed

- **Source**: `NAVIGATOR_USER_AGENT` — `service-worker` L1:C6334 -> L1:C6363  `…g("[logger] enqueue",e.event?.eventName??"(log)","queueSize=",y.length+1),y.push(e),tt(),et()}async function rt(){let t=»self.navigator?.userAgent??""«;C={appVersion:chrome.runtime.getManifest().version,os:Et(t),systemVersion:t,appDisplayLanguage:chrome.i18n.getUILanguag…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `service-worker` L1:C5640 -> L1:C5725  `…ft}?pid=${X}&tag=${encodeURIComponent(Z)}&timestamp=${e}&signature=${r}`;console.debug("[logger] POST",n,t);let i=await »fetch(n,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify(t)})«;if(!i.ok)throw new Error(`log http ${i.status}`);console.debug("[logger] sent OK")}async function Nt(t){for(let e=0;e<=…`
  - `CHROME_LOCAL_STORAGE` (vf_log_queue) — `service-worker` L1:C5146 -> L1:C5179  `…="string"&&(r.log=r.log.slice(0,yt)+"...[truncated]",r.truncated=!0,n={base:e,event:r}),n}async function tt(){try{await »chrome.storage.local.set({[V]:y})«}catch(t){console.warn("[logger] persist queue failed",t)}}async function vt(){if(k)return;k=!0;let t=(await chrome.stor…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (193 raw steps → 1 distinct lines):
   1. L1 `…ull,R=null,j=0,b="",»y=[],F=!1,k=!1;function Et(t){return/Edg\//.test(t)?"Edge":/Firefox/.test(t)?"Firefox":/OPR\//.test(t)?"Opera":/Chrome/. …⟨tainted span: 3025 chars⟩… appVersion:chrome.runtime.getManifest().version,os:Et(t),systemVersion:t,appDisplayLanguage:chrome.i18n.getUILanguage()}«,await Ct();let e=aw…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty, RETURN:json.stringify, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:array.shift, STORAGE:STORAGE_FLOW[area: local, key: vf_log_queue, sender: service-worker, receiver: service-worker], ASSIGN:logical-right

---
