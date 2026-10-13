# Source-level Taint Flow — mdnleldcmiljblolnjhpnblkcekpdkpa 26.6.10

- Source type: CRX
- Files with issues: 4 / 7
- Distinct taint flows: 8  (collapsed from 43 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `app.cs` L1:C7673 -> L1:C7787  `…cument.documentElement.setAttribute("rq-ext-id",chrome.runtime.id),window.addEventListener("message",async r=>{var u;if(»(!r||(e=>{let t=null;try{t=new URL(e).origin}catch(e){return!1}return!!e&&te().includes(t)})(r.origin))&&r&&r.data«&&r.data.source===ie)switch(void 0!==r.data.response&&(e=>{const t=ne[e.data.action+"_"+e.data.requestId];"function"==ty…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `app.cs` L1:C2554 -> L1:C2578  `…ps://requestly.com",logLevel:"info"};const Y=async()=>new Promise(e=>{chrome.storage[q].get(null,e)}),V=async e=>{await »chrome.storage[q].set(e)«},j=async e=>new Promise(t=>{chrome.storage[q].get(e,n=>t(n[e]))});var $,z;!function(e){e[e.MODIFIED=0]="MODIFIED",e[e.C…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `app.cs` L1:C3237 -> L1:C3272  `…ge_script",se="source",ae=(e,t)=>{e.action&&(t&&((e,t)=>{if(!t)return;ne[e.action+"_1"]=t,e.requestId=1})(e,t),e[se]=oe,»window.postMessage(e,window.origin)«)},re=(e,t)=>{ae({action:e.action,requestId:e.requestId,response:t})},ce=async()=>{const e=await ee(z.IS_EXTENSION_ENABL…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (326 raw steps → 1 distinct lines):
   1. L1 `…rome.storage[q].set(»e)},j=async e=>new Promise(t=>{chrome.storage[q].get(e,n=>t(n[e]))});var $,z;!function(e){e[e.MODIFIED=0]="MODIFIED",e[e …⟨tainted span: 6332 chars⟩… en(e=>{e&&(chrome.runtime.sendMessage({action:r}),chrome.runtime.onMessage.addListener(e=>{e.action===I&&ge(e.payload)})«,me())})}();`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:object.setProperty, MESSAGE, ELEMENT:member-element-container
      ⇄ cross-context hop: `runtime.single.sender.message[client.cs->app.cs]; runtime.single.sender.message[serviceWorker->app.cs]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `app.cs` L1:C8570 -> L1:C8736  `…void re(r.data);case a:case c:case d:case S:case h:case T:case l:u=r.data,chrome.runtime.sendMessage(u,e=>{re(u,e)})}}),»chrome.runtime.onMessage.addListener((e,t,n)=>{switch(e.action){case p:chrome.runtime.sendMessage({action:p});break;case R:case M:case w:case y:case P:case D:ae(e)}})«,(async()=>await ee(z.IS_EXTENSION_ENABLED,!0))().then(e=>{e&&(chrome.runtime.sendMessage({action:r}),chrome.runtime.onM…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `app.cs` L1:C3237 -> L1:C3272  `…ge_script",se="source",ae=(e,t)=>{e.action&&(t&&((e,t)=>{if(!t)return;ne[e.action+"_1"]=t,e.requestId=1})(e,t),e[se]=oe,»window.postMessage(e,window.origin)«)},re=(e,t)=>{ae({action:e.action,requestId:e.requestId,response:t})},ce=async()=>{const e=await ee(z.IS_EXTENSION_ENABL…`
  - `WINDOW_POSTMESSAGE` (location.href) — `app.cs` L1:C5519 -> L1:C5609  `…Mode:le.recordingMode,recordingStartTime:le.recordingStartTime}})})})},Re=(e,t)=>{ue[e]?.(t),delete ue[e]},Se=(e,t,n)=>{»window.postMessage({source:"requestly:extension",action:e,payload:t},window.location.href)«,n&&(ue[e]=n)},we=()=>{let e=Te();e||(e=document.createElement("rq-session-recording-widget"),e.classList.add("rq-elemen…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (239 raw steps → 1 distinct lines):
   1. L1 `…"source",ae=(e,t)=>{»e.action&&(t&&((e,t)=>{if(!t)return;ne[e.action+"_1"]=t,e.requestId=1})(e,t),e[se]=oe,window.postMessage(e,window.origin …⟨tainted span: 5757 chars⟩… en(e=>{e&&(chrome.runtime.sendMessage({action:r}),chrome.runtime.onMessage.addListener(e=>{e.action===I&&ge(e.payload)})«,me())})}();`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:unary, ELEMENT:destructure-property[notify], ELEMENT:destructure-property[markRecordingIcon], ELEMENT:destructure-property[explicit], ELEMENT:destructure-property[recordingStartTime], ELEMENT:destructure-property[showWidget], ELEMENT:destructure-property[widgetPosition], ELEMENT:destructure-property[previousSession], ASSIGN:logical-left, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:conditional-alternate, ELEMENT:member-element-container
      ⇄ cross-context hop: `runtime.single.sender.message[client.cs->app.cs]`

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.local.set('unknown') in serviceWorker)  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `libs/customElements` L1:C44514 -> L1:C49506  `… 0 20 20"\n    fill=»"none"\n    xmlns="http://www.w3.org/2000/svg"\n>\n    <path\n    d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 …⟨tainted span: 4992 chars⟩… lip-rule="evenodd"\n    d="M0 9C7.24238e-08 8.44771 0.447715 8 1 8L13 8C14.6569 8 16 6.65685 16 5L16 1C16 0.447715 16.44«77 -7.24234e-08 17 0…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `app.cs` L1:C2554 -> L1:C2578  `…ps://requestly.com",logLevel:"info"};const Y=async()=>new Promise(e=>{chrome.storage[q].get(null,e)}),V=async e=>{await »chrome.storage[q].set(e)«},j=async e=>new Promise(t=>{chrome.storage[q].get(e,n=>t(n[e]))});var $,z;!function(e){e[e.MODIFIED=0]="MODIFIED",e[e.C…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1284 raw steps → 1 distinct lines):
   1. L1 _(in `libs/customElements`)_ `…557892 0.97549 0.167»368L4 3.19188L7.02451 0.167368C7.24767 -0.0557892 7.60948 -0.0557892 7.83263 0.167368C8.05579 0.390524 8.05579 0.752333  …⟨tainted span: 47646 chars⟩… lip-rule="evenodd"\n    d="M0 9C7.24238e-08 8.44771 0.447715 8 1 8L13 8C14.6569 8 16 6.65685 16 5L16 1C16 0.447715 16.44«77 -7.24234e-08 17 0…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left, RETURN:Math.round, RETURN:Math.max, ASSIGN:binary-right, RETURN:json.stringify, ELEMENT:implicit.add, ASSIGN:conditional-consequent, RETURN:Date.constructor, ELEMENT:member-element-container, RETURN:Date.toISOString, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:conditional-alternate, ELEMENT:computed-member-unknown-alternative, ASSIGN:template-literal, ASSIGN:binary-left, ELEMENT:destructure-property[id], COPY:object-spread, STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: serviceWorker, receiver: app.cs]
      ⇄ cross-context hop: `runtime.single.sender.message[app.cs->serviceWorker]; runtime.single.sender.message[client.cs->serviceWorker]`

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `client.cs` L1:C12183 -> L1:C12349  `…e]=Ve,window.postMessage(e,window.origin))};("html"===document.doctype?.name||document.contentType?.includes("html"))&&(»chrome.runtime.onMessage.addListener((e,t,n)=>{switch(e.action){case r:chrome.runtime.sendMessage({action:r});break;case u:case P:case p:case E:case k:case O:We(e)}})«,(async(e,t)=>{return await ne((n=e,`rq_var_${n}`))??t;var n})(oe.IS_EXTENSION_ENABLED,!0).then(t=>{t&&(chrome.runtime.s…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `client.cs` L1:C12069 -> L1:C12104  `…nt_script",Ge="source",We=(e,t)=>{e.action&&(t&&((e,t)=>{if(!t)return;Fe[e.action+"_1"]=t,e.requestId=1})(e,t),e[Ge]=Ve,»window.postMessage(e,window.origin)«)};("html"===document.doctype?.name||document.contentType?.includes("html"))&&(chrome.runtime.onMessage.addListener((e,t…`
  - `WINDOW_POSTMESSAGE` (location.href) — `client.cs` L1:C3049 -> L1:C3139  `…ordingMode:W.recordingMode,recordingStartTime:W.recordingStartTime}})})})},Y=(e,t)=>{V[e]?.(t),delete V[e]},z=(e,t,n)=>{»window.postMessage({source:"requestly:extension",action:e,payload:t},window.location.href)«,n&&(V[e]=n)},$=()=>{let e=J();e||(e=document.createElement("rq-session-recording-widget"),e.classList.add("rq-element")…`
  - `WINDOW_POSTMESSAGE` (location.href) — `client.cs` L1:C12637 -> L1:C12742  `…addListener(e=>{e.action===C&&B(e.payload)}),j(),chrome.runtime.onMessage.addListener(e=>{e?.action!==h&&e?.action!==w||»window.postMessage({source:"requestly:extension",action:e.action,payload:e.payload},window.location.href)«}),window.addEventListener("message",function(e){if(e.source===window&&"requestly:client"===e.data.source)switch(e.data.…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (529 raw steps → 1 distinct lines):
   1. L1 `…V={};let G=!1;const »W={isRecording:!1,isExplicitRecording:!1,markRecordingIcon:!1,widgetPosition:null,recordingStartTime:null,showWidget:!1} …⟨tainted span: 12469 chars⟩… hrome.runtime.sendMessage({action:n,showWidget:!1}),Ae=!0,Me(e.ruleId);break;case q:Le?.enabled&&(Ie=!0,be())}return!1})«,He())}))}();`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:unary, ELEMENT:destructure-property[notify], ELEMENT:destructure-property[markRecordingIcon], ELEMENT:destructure-property[explicit], ELEMENT:destructure-property[recordingStartTime], ELEMENT:destructure-property[showWidget], ELEMENT:destructure-property[widgetPosition], ELEMENT:destructure-property[previousSession], ASSIGN:logical-left, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:conditional-alternate, ASSIGN:logical-right, ELEMENT:member-element-container
      ⇄ cross-context hop: `runtime.single.sender.message[app.cs->client.cs]; runtime.single.sender.message[serviceWorker->client.cs]`

---

## Flow #5 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `serviceWorker` L1:C44514 -> L1:C49506  `…TabId))}})},rr=()=>{»chrome.runtime.onMessage.addListener((e,t,r)=>{switch(e.action){case _:Ve().then(e=>{var r,a;e&&(r=t.tab?.id,a=t.frameId …⟨tainted span: 4992 chars⟩… ?{active:!0,entries:Ds.get(e)||[],startTime:t.startTime,url:t.url}:null})(e.tabId||t.tab?.id)),!0}var a,n,i,d;return!1})«},ar=async e=>{if(e?…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker` L1:C46554 -> L1:C46662  `…t:!0,showWidget:t};nt.setData(e.id,ot.SESSION_RECORDING,a),_t(e.id,a)})(e.tab??t.tab,e.showWidget);break;case x:i=e.url,»chrome.tabs.create({url:i},e=>{nt.setData(e.id,ot.SESSION_RECORDING,{notify:!0,explicit:!0,showWidget:!0})})«;break;case N:Ct(e.tabId??t.tab.id,e.openRecording);break;case A:return((e,t)=>{chrome.tabs.sendMessage(e,{action:me},{f…`
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker` L1:C19119 -> L1:C19179  `…&&(s=[{value:"*",key:r.URL,isActive:!0,operator:a.WILDCARD_MATCHES}])}if(s.some(t=>b(t,e)))return t}return null},At=e=>{»chrome.tabs.create({url:`${m.WEB_URL}/sessions/draft/${e}`})«},_t=(e,t)=>chrome.tabs.sendMessage(e,{action:ge,payload:t}),Ct=(e,t)=>{chrome.tabs.sendMessage(e,{action:Ee},()=>{nt.re…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `serviceWorker` L1:C22675 -> L1:C22761  `…erformance.now();let i=[];Pt.addHandler(o,e=>{i=e.responseHeaders?.map(e=>({key:e.name,value:e.value}))});const c=await »fetch(a,{method:t,headers:s,body:n,credentials:e.includeCredentials?"include":"omit"})«,d=performance.now()-r,u=[];for(const[e,t]of c.headers.entries())u.push({key:e,value:t});i=i.length?i:u;const l=await c.…`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `serviceWorker` L1:C22675 -> L1:C22761  `…erformance.now();let i=[];Pt.addHandler(o,e=>{i=e.responseHeaders?.map(e=>({key:e.name,value:e.value}))});const c=await »fetch(a,{method:t,headers:s,body:n,credentials:e.includeCredentials?"include":"omit"})«,d=performance.now()-r,u=[];for(const[e,t]of c.headers.entries())u.push({key:e,value:t});i=i.length?i:u;const l=await c.…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `serviceWorker` L1:C5787 -> L1:C5812  `…e(e=>{chrome.storage[Ce].get(null,e)}))();return Object.values(e).filter(e=>!!e)},Ne=async(e,t)=>{await(async e=>{await »chrome.storage[Ce].set(e)«})({[e]:t})},ke=async e=>new Promise(t=>{chrome.storage[Ce].get(e,s=>t(s[e]))});var Ue;!function(e){e[e.MODIFIED=0]="MOD…`
  - `CHROME_LOCAL_STORAGE` (testReports) — `serviceWorker` L1:C5787 -> L1:C5812  `…e(e=>{chrome.storage[Ce].get(null,e)}))();return Object.values(e).filter(e=>!!e)},Ne=async(e,t)=>{await(async e=>{await »chrome.storage[Ce].set(e)«})({[e]:t})},ke=async e=>new Promise(t=>{chrome.storage[Ce].get(e,s=>t(s[e]))});var Ue;!function(e){e[e.MODIFIED=0]="MOD…`
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker` L1:C10229 -> L1:C10280  `…url:e})}addOrUpdateTab(e){e.id!==chrome.tabs.TAB_ID_NONE&&(this.map[e.id]={...this.map[e.id],...e})}createNewTab(e,t,s){»chrome.tabs.create({url:e,openerTabId:t},e=>{s(e)})«}removeTab(e){const t=this.getData(e,ot.SESSION_RULES_MAP);let s=[];if(t){for(const e of Object.values(t))s.push(...Obje…`
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `serviceWorker` L1:C25693 -> L1:C25782  `…P)??{},o=n?.[r]??{};let i=[];return o[t]&&(a=o[t],i.push(a)),nt.setData(e,ot.SESSION_RULES_MAP,{...n,[r]:{...o,[t]:a}}),»chrome.declarativeNetRequest.updateSessionRules({addRules:[{id:a,...s}],removeRuleIds:i})«},Xt=["Authorization"],Qt=(e,t)=>Object.keys(e).some(e=>e.toLowerCase()===t.toLowerCase()),Jt="rq_request_initiator_orig…`
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker` L1:C48382 -> L1:C48624  `…s:e.appliedStatus}):»chrome.tabs.create({url:`${m.WEB_URL}/rules/editor/edit/${e.ruleId}`},a=>{nt.ensureTabLoadingComplete(a.id).then(()=>{ch …⟨tainted span: 242 chars⟩… me.tabs.sendMessage(a.id,{action:j,testReportId:r,testPageTabId:t.id,record:s.record,appliedStatus:e.appliedStatus})})})«})})(e,t.tab);break;…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1271 raw steps → 1 distinct lines):
   1. L1 `…g(e);return s?.test(»t)},R=e=>"/^"+e.replace(/([?.-])/g,"\\$1").replace(/(\*)/g,"(.*)")+"$/",b=(e,t)=>{const s=((e,t)=>{let s=null;try{s=new  …⟨tainted span: 47646 chars⟩… ?{active:!0,entries:Ds.get(e)||[],startTime:t.startTime,url:t.url}:null})(e.tabId||t.tab?.id)),!0}var a,n,i,d;return!1})«},ar=async e=>{if(e?…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left, RETURN:Math.round, RETURN:Math.max, ASSIGN:binary-right, RETURN:json.stringify, ELEMENT:implicit.add, ASSIGN:conditional-consequent, RETURN:Date.constructor, ELEMENT:member-element-container, RETURN:Date.toISOString, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:conditional-alternate, ELEMENT:computed-member-unknown-alternative, ASSIGN:template-literal, ASSIGN:binary-left, ELEMENT:destructure-property[id], COPY:object-spread
      ⇄ cross-context hop: `runtime.single.sender.message[app.cs->serviceWorker]; runtime.single.sender.message[client.cs->serviceWorker]`

---

## Flow #6 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `serviceWorker` L1:C43978 -> L1:C43979  `…,Ds.delete(e),0===ws.size&&Vs(),Ns()})(e)});const sr=()=>{chrome.runtime.onMessageExternal.addListener((e,t,s)=>{switch(»e«.action){case ce:return Ve().then(e=>{s({name:chrome.runtime.getManifest().name,version:chrome.runtime.getManifest().ver…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `serviceWorker` L1:C41221 -> L1:C42511  `…(e)?new Promise(r=>{»chrome.tabs.create({url:e},a=>{if(chrome.runtime.lastError||!a?.id)return void r({success:!1,error:chrome.runtime.lastEr …⟨tainted span: 1290 chars⟩… chrome.webRequest.onErrorOccurred.addListener(Hs,{urls:["<all_urls>"]}),xs(),Js(a.id),r({success:!0,targetTabId:a.id})})«}):Promise.resolve({…`
  - `CHROME_BROWSINGDATA_REMOVE` (remove) — `serviceWorker` L1:C41890 -> L1:C41933  `…rkers=!0,r.cacheStorage=!0),0===Object.keys(r).length)return;let a;try{a=new URL(e).origin}catch{return}Promise.resolve(»s.call(chrome.browsingData,{origins:[a]},r)«).catch(()=>{})})(e,t),void 0!==t.maxDuration&&(n.maxDurationTimer=setTimeout(()=>Zs(a.id,"max-duration"),t.maxDuration)…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `serviceWorker` L1:C44250 -> L1:C44279  `…0;case de:return Ys(e.payload?.url,e.payload?.config||{},{tabId:t.tab?.id,windowId:t.tab?.windowId}).then(s),!0;case ue:»s(Zs(e.payload?.targetTabId))«;break;case le:s((e=>{if(ws.has(e))return{success:!1,error:`Recording for tab ${e} is still active`};const t=er.get(e);r…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `serviceWorker` L1:C44294 -> L1:C44501  `…?.config||{},{tabId:t.tab?.id,windowId:t.tab?.windowId}).then(s),!0;case ue:s(Zs(e.payload?.targetTabId));break;case le:»s((e=>{if(ws.has(e))return{success:!1,error:`Recording for tab ${e} is still active`};const t=er.get(e);return t?{success:!0,summary:t}:{success:!1,error:`No summary for tab ${e}`}})(e.payload?.targetTabId))«}})},rr=()=>{chrome.runtime.onMessage.addListener((e,t,r)=>{switch(e.action){case _:Ve().then(e=>{var r,a;e&&(r=t.tab?.i…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (270 raw steps → 1 distinct lines):
   1. L1 `…turn this.getTabs()[»e]}getTabUrl(e){var t=this.getTab(e);return t&&t.url}focusTab(e){var t=this.getTab(e);if(t&&t.windowId)try{return chrome …⟨tainted span: 33943 chars⟩… onst t=er.get(e);return t?{success:!0,summary:t}:{success:!1,error:`No summary for tab ${e}`}})(e.payload?.targetTabId))«}})},rr=()=>{chrome.…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, COPY:object-spread, INITIAL:URL.constructor, ASSIGN:binary-right, ASSIGN:template-literal, ELEMENT:implicit.add, ASSIGN:conditional-alternate

---

## Flow #7 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `serviceWorker` L1:C39636 -> L1:C39637  `…)=>{chrome.runtime.onConnectExternal.addListener(e=>{"network-recording"===e.name&&(e.onMessage.addListener(t=>{const s=»t«?.targetTabId;if("number"==typeof s)if("subscribe"===t.action){if(!ws.has(s)&&!Ds.has(s))return void e.postMessage({type…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `serviceWorker` L1:C39802 -> L1:C39850  `…ribe"===t.action){if(!ws.has(s)&&!Ds.has(s))return void e.postMessage({type:"error",error:`No recording for tab ${s}`});»e.postMessage({type:"subscribed",targetTabId:s})«;const t=Ds.get(s)||[];for(const s of t)e.postMessage({type:"entry",entry:s});As.has(s)||As.set(s,new Set),As.get(s).add…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (129 raw steps → 1 distinct lines):
   1. L1 `…=e=>{const t=_s.get(»e);void 0!==t&&(clearTimeout(t),_s.delete(e))},$s=()=>{chrome.runtime.onConnectExternal.addListener(e=>{"network-recordi …⟨tainted span: 643 chars⟩… )||e.postMessage({type:"complete"})}else"unsubscribe"===t.action&&(As.get(s)?.delete(e),0===As.get(s)?.size&&As.delete(s«))}),e.onDisconnect.…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #8 — WINDOW_MESSAGE_EVENT (From storage.local.set('testReports') in serviceWorker)  ·  34× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `serviceWorker` L1:C44514 -> L1:C49506  `…TabId))}})},rr=()=>{»chrome.runtime.onMessage.addListener((e,t,r)=>{switch(e.action){case _:Ve().then(e=>{var r,a;e&&(r=t.tab?.id,a=t.frameId …⟨tainted span: 4992 chars⟩… ?{active:!0,entries:Ds.get(e)||[],startTime:t.startTime,url:t.url}:null})(e.tabId||t.tab?.id)),!0}var a,n,i,d;return!1})«},ar=async e=>{if(e?…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (testReports) — `serviceWorker` L1:C5787 -> L1:C5812  `…e(e=>{chrome.storage[Ce].get(null,e)}))();return Object.values(e).filter(e=>!!e)},Ne=async(e,t)=>{await(async e=>{await »chrome.storage[Ce].set(e)«})({[e]:t})},ke=async e=>new Promise(t=>{chrome.storage[Ce].get(e,s=>t(s[e]))});var Ue;!function(e){e[e.MODIFIED=0]="MOD…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1402 raw steps → 1 distinct lines):
   1. L1 `…g(e);return s?.test(»t)},R=e=>"/^"+e.replace(/([?.-])/g,"\\$1").replace(/(\*)/g,"(.*)")+"$/",b=(e,t)=>{const s=((e,t)=>{let s=null;try{s=new  …⟨tainted span: 51072 chars⟩… Lt.RUN_CURL_REQUEST&&await wt({selectedText:e.selectionText,pageURL:e.pageUrl},"context_menu")});const e=await Ve();Ot(e«)})(),cr(),chrome.ru…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right, ASSIGN:logical-left, RETURN:Math.round, RETURN:Math.max, ASSIGN:binary-right, RETURN:json.stringify, ELEMENT:implicit.add, ASSIGN:conditional-consequent, RETURN:Date.constructor, ELEMENT:member-element-container, RETURN:Date.toISOString, ELEMENT:object.setProperty, INITIAL:URL.constructor, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:conditional-alternate, ELEMENT:computed-member-unknown-alternative, ASSIGN:template-literal, ASSIGN:binary-left, ELEMENT:destructure-property[id], COPY:object-spread, STORAGE:STORAGE_FLOW[area: local, key: testReports, sender: serviceWorker, receiver: serviceWorker]
      ⇄ cross-context hop: `runtime.single.sender.message[app.cs->serviceWorker]; runtime.single.sender.message[client.cs->serviceWorker]`

---
