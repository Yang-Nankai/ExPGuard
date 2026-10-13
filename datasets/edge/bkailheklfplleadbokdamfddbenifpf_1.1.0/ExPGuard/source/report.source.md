# Source-level Taint Flow — bkailheklfplleadbokdamfddbenifpf 1.1.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(PriceDogExt))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C25086 -> L1:C25245  `…ction(){o(6573),o(8100),o(7936),o(7467),o(4732),o(9577),o(4979),o(4603),o(7566),o(8721);const t={},e={get(e,o){t[e]=o}};»chrome.runtime.onMessage.addListener(((e,o,n)=>{if("bgRequest"===e.type&&t[e.path])return t[e.path](e.params?JSON.parse(e.params):{},(function(t){n(t)})),!0}))«;var n=e,s=JSON.parse('[{"site":228,"sname":"Amazon","name":"amazon","home":"https://www.amazon.com","bicon":"https://cd…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C63260 -> L1:C63377  `…/"!==t.url[0]&&(e="");let s={};return t.params&&(s=t.params),h||"/Jwt/Generate"===t.url?(u[t.referer]&&(h=u[t.referer]),»fetch(e+t.url+(t.params?`?${new URLSearchParams(s).toString()}`:""),{headers:{"x-referer":t.referer,autoken:h,...n}})«.then((e=>{const o=e.status,n=e.headers;return n.has("autoken")&&(h=n.get("autoken")||"",u[t.referer]=h),e.text().then((…`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L1:C63260 -> L1:C63377  `…/"!==t.url[0]&&(e="");let s={};return t.params&&(s=t.params),h||"/Jwt/Generate"===t.url?(u[t.referer]&&(h=u[t.referer]),»fetch(e+t.url+(t.params?`?${new URLSearchParams(s).toString()}`:""),{headers:{"x-referer":t.referer,autoken:h,...n}})«.then((e=>{const o=e.status,n=e.headers;return n.has("autoken")&&(h=n.get("autoken")||"",u[t.referer]=h),e.text().then((…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C61968 -> L1:C62052  `… o="common";switch(e.pageType){case i.Product:o="page";break;case i.List:o="list";break;default:o="common";break}return »fetch(`https://api.pricedog.com/Jwt/Generate?scene=${o}&url=`+encodeURIComponent(t))«.then((e=>{const o=e.headers;o.has("autoken")&&(h=o.get("autoken")||"",u[t]=h)}))}let d="";function g(t){let e="";const …`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C64348 -> L1:C64383  `…append(o,s[o]);c.body=e}else c.body=JSON.stringify(s),c.headers={...c.headers,"Content-Type":"application/json"};return »fetch(e+t.url,{method:"POST",...c})«.then((t=>{const e=t.status;return t.text().then((t=>({status:e,text:t})))})).then((({status:t,text:e})=>{console.log("p…`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L1:C64348 -> L1:C64383  `…append(o,s[o]);c.body=e}else c.body=JSON.stringify(s),c.headers={...c.headers,"Content-Type":"application/json"};return »fetch(e+t.url,{method:"POST",...c})«.then((t=>{const e=t.status;return t.text().then((t=>({status:e,text:t})))})).then((({status:t,text:e})=>{console.log("p…`
  - `FETCH_BODY` ([Unknown URL]) — `background` L1:C64348 -> L1:C64383  `…append(o,s[o]);c.body=e}else c.body=JSON.stringify(s),c.headers={...c.headers,"Content-Type":"application/json"};return »fetch(e+t.url,{method:"POST",...c})«.then((t=>{const e=t.status;return t.text().then((t=>({status:e,text:t})))})).then((({status:t,text:e})=>{console.log("p…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (343 raw steps → 1 distinct lines):
   1. L1 `…={get(e,o){t[e]=o}};»chrome.runtime.onMessage.addListener(((e,o,n)=>{if("bgRequest"===e.type&&t[e.path])return t[e.path](e.params?JSON.parse( …⟨tainted span: 39488 chars⟩… )))})).then((({status:t,text:e})=>{console.log("proxy request response",e),console.log(o),o({status:t,text:e})})),!0}}))«,n.get("/extensionPa…`  · MESSAGE, RETURN:json.parse, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty, RETURN:encodeURIComponent, RETURN:json.stringify, COPY:object-spread, ITERATE:loop.iteration, RETURN:fallback-return, ASSIGN:logical-right, ELEMENT:member-element-container, ELEMENT:member.length, RETURN:atob, INITIAL:Uint8Array.constructor, ASSIGN:update, ASSIGN:conditional-consequent
      ⇄ cross-context hop: `runtime.single.sender.message[contentLoader->background]`

---

## Flow #2 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L1:C62602 -> L1:C62603  `…ction f(t,e,o){return new Promise(((n,s)=>{chrome.cookies.get({url:e,name:t,partitionKey:{topLevelSite:o}},(function(o){»o«?chrome.cookies.set({url:e,name:t,value:o.value,domain:o.domain,path:o.path,secure:o.secure,httpOnly:o.httpOnly,expirati…`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `background` L1:C62604 -> L1:C62838  `…ion f(t,e,o){return new Promise(((n,s)=>{chrome.cookies.get({url:e,name:t,partitionKey:{topLevelSite:o}},(function(o){o?»chrome.cookies.set({url:e,name:t,value:o.value,domain:o.domain,path:o.path,secure:o.secure,httpOnly:o.httpOnly,expirationDate:o.expirationDate,partitionKey:{topLevelSite:`chrome-extension://${chrome.runtime.id}`}},(function(t){n(t)}))«:n(o)}))}))}chrome.storage.local.get("armorToken",(t=>{console.log("armorToken",t),d=t.armorToken})),chrome.runtime.onMe…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (40 raw steps → 1 distinct lines):
   1. L1 `…ction f(t,e,o){return new Promise(((n,s)=>{chrome.cookies.get({url:e,name:t,partitionKey:{topLevelSite:o}},(function(o){»o?chrome.cookies.set({url:e,name:t,value:o.value,domain:o.domain,path:o.path,secure:o.secure,httpOnly:o.httpOnly,expirationDate:o.expirationDate,partitionKey:{topLevelSite:`chrome-extension://${chrome.runtime.id}`}},(function(t){n(t)})):n(o«)}))}))}chrome.storage.local.get("armorToken",(t=>{console.log("armorToken",t),d=t.armorToken})),chrome.runtime.onMessag…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---
