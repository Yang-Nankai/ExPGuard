# Source-level Taint Flow — lmhkpmbekcpmknklioeibfkpmmfibljd 3.2.10

- Source type: CRX
- Files with issues: 3 / 6
- Distinct taint flows: 6  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content.bundle` L3:C205 -> L3:C224  `…e.allowlist):e.allowlist,denylist:e.filter!==r.DO_NOT_FILTER?S(e.denylist):e.denylist}),x=(e=u)=>!e||e.inject||!e.urls||»location.href.match«(S(e.urls));var c="@devtools-extension",I="@devtools-page",m=32*1024*1024,h=!1,s;function l(e){window.postMessage(e,"*")…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content.bundle` L3:C319 -> L3:C344  `…urls||location.href.match(S(e.urls));var c="@devtools-extension",I="@devtools-page",m=32*1024*1024,h=!1,s;function l(e){»window.postMessage(e,"*")«}function w(){h=!0;let e="tab";window.devToolsExtensionID?s=chrome.runtime.connect(window.devToolsExtensionID,{name:e}):…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1169 raw steps → 2 distinct lines):
   1. L3 `…in("|"):null,A=e=>({»...e,allowlist:e.filter!==r.DO_NOT_FILTER?S(e.allowlist):e.allowlist,denylist:e.filter!==r.DO_NOT_FILTER?S(e.denylist):e …⟨tainted span: 1845 chars⟩… of e.data!="object")return;let t=e.data;if(t.source===I){if(t.type==="DISCONNECT"){s&&(s.disconnect(),h=!1);return}P(F,t«)}}C();window.addEve…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:member.length, ELEMENT:implicit.add, MESSAGE, COPY:object-spread, ASSIGN:conditional-alternate
      ⇄ cross-context hop: `runtime.connect.sender.message[background.bundle->content.bundle]`
   2. L2 (→L3) `^https?://.+\\.github\\.io`,showContextMenus:!0},function(t){u=M(t),e(u)})},C=()=>g(()=>{});var S=e=>e!==""?»e.split(`«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content.bundle` L3:C1809 -> L3:C1810  `…({name:"RELAY",message:e})}function b(e){if(!x()||!e||e.source!==window||typeof e.data!="object")return;let t=e.data;if(»t«.source===I){if(t.type==="DISCONNECT"){s&&(s.disconnect(),h=!1);return}P(F,t)}}C();window.addEventListener("message",b,!…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content.bundle` L3:C319 -> L3:C344  `…urls||location.href.match(S(e.urls));var c="@devtools-extension",I="@devtools-page",m=32*1024*1024,h=!1,s;function l(e){»window.postMessage(e,"*")«}function w(){h=!0;let e="tab";window.devToolsExtensionID?s=chrome.runtime.connect(window.devToolsExtensionID,{name:e}):…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2193 raw steps → 2 distinct lines):
   1. L3 `…in("|"):null,A=e=>({»...e,allowlist:e.filter!==r.DO_NOT_FILTER?S(e.allowlist):e.allowlist,denylist:e.filter!==r.DO_NOT_FILTER?S(e.denylist):e …⟨tainted span: 1845 chars⟩… of e.data!="object")return;let t=e.data;if(t.source===I){if(t.type==="DISCONNECT"){s&&(s.disconnect(),h=!1);return}P(F,t«)}}C();window.addEve…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty, ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:logical-right, ELEMENT:implicit.add, MESSAGE, COPY:object-spread, ASSIGN:conditional-alternate
      ⇄ cross-context hop: `runtime.connect.sender.message[background.bundle->content.bundle]`
   2. L2 (→L3) `^https?://.+\\.github\\.io`,showContextMenus:!0},function(t){u=M(t),e(u)})},C=()=>g(()=>{});var S=e=>e!==""?»e.split(`«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent

---

## Flow #3 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `page.bundle` L6:C1649 -> L6:C1656  `…e,t)}}):e(r)};function It(){window.removeEventListener("message",Ce),M({type:"DISCONNECT",source:$})}function bt(e){let »t=e||{}«,r=X(t.instanceId);t.instanceId||(t.instanceId=r),t.name||(t.name=document.title&&r===1?document.title:`Instance ${r}`),…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `page.bundle` L4:C3070 -> L4:C3095  `…t.replacer&&!t.reviver?{options:t.options}:{replacer:t.replacer,reviver:t.reviver,options:t.options||!0}}}function M(e){»window.postMessage(e,"*")«}function Fr(e,t){if(!e.trace)return;if(typeof e.trace=="function")return e.trace();let r,n=0,o,a=e.traceLimit,i=Error()…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (31 raw steps → 1 distinct lines):
   1. L6 `…}function bt(e){let »t=e||{},r=X(t.instanceId);t.instanceId||(t.instanceId=r),t.name||(t.name=document.title&&r===1?document.title:`Instance  …⟨tainted span: 4126 chars⟩… {name:e.name||document.title,actionCreators:JSON.stringify(o),features:e.features,serialize:!!e.serialize,type:"redux"})«,J&&(N({type:"GET_RE…`  · ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `page.bundle` L6:C1219 -> L6:C1220  `…|o,instanceId:r.instanceId||n||1},r.serialize,r.serialize)}function Ce(e){if(!e||e.source!==window)return;let t=e.data;!»t«||t.source!=="@devtools-extension"||Object.keys(G).forEach(r=>{if(t.id&&r!==t.id)return;let n=G[r];typeof n=="function"?…`
- **Sink(s)**:
  - `NEW_FUNCTION` — `page.bundle` L1:C8071 -> L1:C8096  `…isArray(n))return r.concat(...n);throw new Error("rest must be an array")}function He(e,t){if(typeof e=="string")return »new Function("return "+e)«();let r=t[e.selected].func,n=Ft(e.args,e.rest);return r(...n)}var Bt=typeof global=="object"&&global&&global.Object===O…`
  - `NEW_FUNCTION` — `page.bundle` L1:C7854 -> L1:C7879  `…ault)(o)}):typeof o=="object"&&(r=r.concat(qe(o,t+n+".")))}),r}function se(e){return Array.isArray(e)?e:qe(e)}var Ge=e=>»new Function("return "+e)«();function Ft(e,t){let r=e.map(Ge);if(!t)return r;let n=Ge(t);if(Array.isArray(n))return r.concat(...n);throw new Error…`
  - `WINDOW_POSTMESSAGE` (*) — `page.bundle` L4:C3070 -> L4:C3095  `…t.replacer&&!t.reviver?{options:t.options}:{replacer:t.replacer,reviver:t.reviver,options:t.options||!0}}}function M(e){»window.postMessage(e,"*")«}function Fr(e,t){if(!e.trace)return;if(typeof e.trace=="function")return e.trace();let r,n=0,o,a=e.traceLimit,i=Error()…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (479 raw steps → 3 distinct lines):
   1. L6 `…return;let t=e.data;»!t||t.source!=="@devtools-extension"||Object.keys(G).forEach(r=>{if(t.id&&r!==t.id)return;let n=G[r];typeof n=="function …⟨tainted span: 4841 chars⟩… rce:k,instanceId:i},d,c);return;case"OPTIONS":window.devToolsOptions=Object.assign(window.devToolsOptions||{},y.options)«;return}}let p=[],w=…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, COPY:object.assign-opaque
   2. L1 `… Function("return "+»e)();function Ft(e,t){let r=e.map(Ge);if(!t)return r;let n=Ge(t);if(Array.isArray(n))return r.concat(...n);throw new Err …⟨tainted span: 280 chars⟩… e,t){if(typeof e=="string")return new Function("return "+e)();let r=t[e.selected].func,n=Ft(e.args,e.rest);return r(...n«)}var Bt=typeof glob…`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ELEMENT:implicit.add
   3. L4 `…"*")}function vr(e){»window.devToolsOptions&&!window.devToolsOptions.shouldCatchErrors||e.timeStamp-gt<At()||(gt=e.timeStamp,At(!0),Rr(e.mess …⟨tainted span: 474 chars⟩… fault.parse(i,F(t.immutable,t.refs,t.replacer,t.reviver).reviver):Pr(t)&&(r=i=>le.default.parse(i,t.reviver)));let n=r(e«),o="payload"in n&&n…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #5 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background.bundle` L1:C20797 -> L1:C20823  `…MPORT",id:t,instanceId:s,state:h(i,r.instances.options[s].serialize)})}return}o.name==="RELAY"&&ce(o.message,e.sender)},»e.onMessage.addListener(n)«,e.onDisconnect.addListener(Pe("tab",t,n));else if(e.name&&e.name.indexOf("monitor")===0){t=ie(e.sender,e.name),console.…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background.bundle` L1:C16322 -> L1:C16427  `…=>{if(!o["s:hostname"]||!o["s:port"])return;let r=`${o["s:secure"]?"https":"http"}://${o["s:hostname"]}:${o["s:port"]}`;»fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({op:"get",id:e})})«.then(s=>s.json()).then(s=>{let{payload:i,preloadedState:a}=s;i&&p.dispatch({type:C,message:"IMPORT",state:JSON.stringif…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (551 raw steps → 1 distinct lines):
   1. L1 `…{};function b(e){re[»e]?chrome.windows.update(re[e],{focused:!0},()=>{chrome.runtime.lastError&&Ce(e)}):Ce(e)}function Ce(e){let t=chrome.run …⟨tainted span: 5431 chars⟩… +,ae({type:"START"}),n=r=>{console.log(`Message from monitor ${t}: ${r.type}`),p.dispatch(r)},e.onMessage.addListener(n)«,e.onDisconnect.addL…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:template-literal, ASSIGN:binary-left, ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:binary-right, ASSIGN:unary, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ELEMENT:implicit.add
      ⇄ cross-context hop: `runtime.connect.sender.message[content.bundle->background.bundle]`

---

## Flow #6 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `background.bundle` L1:C20797 -> L1:C20823  `…MPORT",id:t,instanceId:s,state:h(i,r.instances.options[s].serialize)})}return}o.name==="RELAY"&&ce(o.message,e.sender)},»e.onMessage.addListener(n)«,e.onDisconnect.addListener(Pe("tab",t,n));else if(e.name&&e.name.indexOf("monitor")===0){t=ie(e.sender,e.name),console.…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background.bundle` L1:C16322 -> L1:C16427  `…=>{if(!o["s:hostname"]||!o["s:port"])return;let r=`${o["s:secure"]?"https":"http"}://${o["s:hostname"]}:${o["s:port"]}`;»fetch(r,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({op:"get",id:e})})«.then(s=>s.json()).then(s=>{let{payload:i,preloadedState:a}=s;i&&p.dispatch({type:C,message:"IMPORT",state:JSON.stringif…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (512 raw steps → 1 distinct lines):
   1. L1 `…{};function b(e){re[»e]?chrome.windows.update(re[e],{focused:!0},()=>{chrome.runtime.lastError&&Ce(e)}):Ce(e)}function Ce(e){let t=chrome.run …⟨tainted span: 5431 chars⟩… +,ae({type:"START"}),n=r=>{console.log(`Message from monitor ${t}: ${r.type}`),p.dispatch(r)},e.onMessage.addListener(n)«,e.onDisconnect.addL…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:template-literal, ASSIGN:binary-right, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:implicit.add
      ⇄ cross-context hop: `runtime.connect.sender.message[content.bundle->background.bundle]`

---
