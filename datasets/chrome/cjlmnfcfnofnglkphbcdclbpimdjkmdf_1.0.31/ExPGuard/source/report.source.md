# Source-level Taint Flow — cjlmnfcfnofnglkphbcdclbpimdjkmdf 1.0.31

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `isolated-bridge` L1:C302 -> L1:C312  `…storage.local.get({[N]:!0},e=>{E(e?.[N]!==!1)})}window.addEventListener("message",E=>{if(E.source!==window)return;let e=»E.data||{}«;if(e.type===r&&e.requestId){o(t=>{window.postMessage({type:S,requestId:e.requestId,enabled:t},"*")});return}e.type!==s|…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `isolated-bridge` L1:C347 -> L1:C411  `…})}window.addEventListener("message",E=>{if(E.source!==window)return;let e=E.data||{};if(e.type===r&&e.requestId){o(t=>{»window.postMessage({type:S,requestId:e.requestId,enabled:t},"*")«});return}e.type!==s||!e.requestId||chrome.runtime.sendMessage({type:s,requestId:e.requestId,request:e.request||{}},t=>{…`
  - `WINDOW_POSTMESSAGE` (*) — `isolated-bridge` L1:C531 -> L1:C713  `…});return}e.type!==s||!e.requestId||chrome.runtime.sendMessage({type:s,requestId:e.requestId,request:e.request||{}},t=>{»window.postMessage({type:_,requestId:e.requestId,response:t||{ok:!1,status:0,statusText:"",headers:{},bytes:[],error:chrome.runtime.lastError?.message||"No extension response"}},"*")«})});})();`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (39 raw steps → 1 distinct lines):
   1. L1 `…window)return;let e=»E.data||{};if(e.type===r&&e.requestId){o(t=>{window.postMessage({type:S,requestId:e.requestId,enabled:t},"*")});return}e …⟨tainted span: 413 chars⟩… :!1,status:0,statusText:"",headers:{},bytes:[],error:chrome.runtime.lastError?.message||"No extension response"}},"*")})«});})();`  · ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ASSIGN:unary, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[service-worker->isolated-bridge]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `service-worker` L1:C186 -> L1:C717  `…])=>[_,String(r)]))}»chrome.runtime.onMessage.addListener((e,_,r)=>{if(!e||e.type!==a)return!1;let E=e.request||{};return fetch(E.url,{method …⟨tainted span: 531 chars⟩… }).catch(t=>{r({ok:!1,finalUrl:E.url||"",status:0,statusText:"",headers:{},bytes:[],error:String(t?.message||t)})}),!0})«;})();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L1:C287 -> L1:C402  `…)=>[_,String(r)]))}chrome.runtime.onMessage.addListener((e,_,r)=>{if(!e||e.type!==a)return!1;let E=e.request||{};return »fetch(E.url,{method:E.method||"GET",headers:n(E.headers),body:E.data??void 0,credentials:"omit",redirect:"follow"})«.then(async t=>{let S=await t.arrayBuffer();r({ok:t.ok,finalUrl:t.url,status:t.status,statusText:t.statusText,headers:Ob…`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `service-worker` L1:C287 -> L1:C402  `…)=>[_,String(r)]))}chrome.runtime.onMessage.addListener((e,_,r)=>{if(!e||e.type!==a)return!1;let E=e.request||{};return »fetch(E.url,{method:E.method||"GET",headers:n(E.headers),body:E.data??void 0,credentials:"omit",redirect:"follow"})«.then(async t=>{let S=await t.arrayBuffer();r({ok:t.ok,finalUrl:t.url,status:t.status,statusText:t.statusText,headers:Ob…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (23 raw steps → 1 distinct lines):
   1. L1 `…ries(Object.entries(»e).filter(([_,r])=>_&&r!=null).map(([_,r])=>[_,String(r)]))}chrome.runtime.onMessage.addListener((e,_,r)=>{if(!e||e.type …⟨tainted span: 591 chars⟩… }).catch(t=>{r({ok:!1,finalUrl:E.url||"",status:0,statusText:"",headers:{},bytes:[],error:String(t?.message||t)})}),!0})«;})();`  · MESSAGE, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:identifier
      ⇄ cross-context hop: `runtime.single.sender.message[isolated-bridge->service-worker]`

---
