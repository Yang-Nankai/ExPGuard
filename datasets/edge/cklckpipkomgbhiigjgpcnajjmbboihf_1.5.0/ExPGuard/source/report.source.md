# Source-level Taint Flow — cklckpipkomgbhiigjgpcnajjmbboihf 1.5.0

- Source type: CRX
- Files with issues: 4 / 4
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 26 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C342007 -> L1:C342023  `…"),r())})),setInterval(r,2e3)},Sl=()=>{window.addEventListener("message",(t=>{if(t.source===window&&"from-fusionchat"===»t?.data?.message«){let e=t.data.payload;console.log("[Fusion Auth][content] website postMessage received",e),"login"===e.message&&(consol…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `content` L1:C342220 -> L1:C342265  `…e received",e),"login"===e.message&&(console.log("[Fusion Auth][content] postMessage login -> set extension authToken"),»chrome.storage.local.set({authToken:e.token})«),"sign-out"===e.message&&(console.log("[Fusion Auth][content] postMessage sign-out -> remove extension authToken"),chro…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (14 raw steps → 1 distinct lines):
   1. L1 `…r("message",(t=>{if(»t.source===window&&"from-fusionchat"===t?.data?.message){let e=t.data.payload;console.log("[Fusion Auth][content] websit …⟨tainted span: 321 chars⟩… nt] postMessage login -> set extension authToken"),chrome.storage.local.set({authToken:e.token})),"sign-out"===e.message«&&(console.log("[Fus…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('authToken') in content)

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C342007 -> L1:C342023  `…"),r())})),setInterval(r,2e3)},Sl=()=>{window.addEventListener("message",(t=>{if(t.source===window&&"from-fusionchat"===»t?.data?.message«){let e=t.data.payload;console.log("[Fusion Auth][content] website postMessage received",e),"login"===e.message&&(consol…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `content` L1:C289456 -> L1:C289495  `…n=t,da().defaults.headers.common={Authorization:`Bearer ${t}`},this.user=ba(t),location.host!=Ca.routes.testHost&&await »chrome.storage.local.set({authToken:t})«},dreamLinkClicked(){this.store.dreamLinkClicked=!0,location.host!=Ca.routes.testHost&&chrome.storage.local.set({dreamLi…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (75 raw steps → 1 distinct lines):
   1. L1 `…unction ga(t){var e=»t.replace(/-/g,"+").replace(/_/g,"/");switch(e.length%4){case 0:break;case 2:e+="==";break;case 3:e+="=";break;default:t …⟨tainted span: 59412 chars⟩… nt] postMessage login -> set extension authToken"),chrome.storage.local.set({authToken:e.token})),"sign-out"===e.message«&&(console.log("[Fus…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: authToken, sender: content, receiver: content], ASSIGN:template-literal, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('authToken') in background)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `content` L1:C33361 -> L1:C33362  `…on(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(t){return t instanceof TypeError}},p=l||!u();o({t»a«rget:"Array",proto:!0,arity:1,forced:p},{push:function(t){var e=n(this),r=i(e),o=arguments.length;a(r+o);for(var c=0;c<o…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `content` L1:C289456 -> L1:C289495  `…n=t,da().defaults.headers.common={Authorization:`Bearer ${t}`},this.user=ba(t),location.host!=Ca.routes.testHost&&await »chrome.storage.local.set({authToken:t})«},dreamLinkClicked(){this.store.dreamLinkClicked=!0,location.host!=Ca.routes.testHost&&chrome.storage.local.set({dreamLi…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (70 raw steps → 1 distinct lines):
   1. L1 `…ror}},p=l||!u();o({t»arget:"Array",proto:!0,arity:1,forced:p},{push:function(t){var e=n(this),r=i(e),o=arguments.length;a(r+o);for(var c=0;c< …⟨tainted span: 256999 chars⟩… serFromToken(t)},async initTestUser(){this.user={id:"xxxxxxxxxxxxxxxxxxxxxxx",name:"Test User",email:"test@gmail.com"}}}«,qa=null;var Ia=Ra,j…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: authToken, sender: background, receiver: content], ASSIGN:template-literal, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C33361 -> L1:C33362  `…ge()}))}else chrome.runtime.openOptionsPage()})),chrome.runtime.onMessageExternal.addListener((function(e){"sign-out"===»e«.message&&j(),"login"===e.message&&chrome.storage.local.set({authToken:e.token})})),chrome.tabs.onUpdated.addListener(((…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (authToken) — `background` L1:C33397 -> L1:C33442  `…onsPage()})),chrome.runtime.onMessageExternal.addListener((function(e){"sign-out"===e.message&&j(),"login"===e.message&&»chrome.storage.local.set({authToken:e.token})«})),chrome.tabs.onUpdated.addListener(((e,t,n)=>{if("complete"!==t.status)return;const r=n.url.includes("fusionchat.ai")…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…ge()}))}else chrome.runtime.openOptionsPage()})),chrome.runtime.onMessageExternal.addListener((function(e){"sign-out"===»e.message&&j(),"login"===e.message&&chrome.storage.local.set({authToken:e.token})«})),chrome.tabs.onUpdated.addListener(((e,t,n)=>{if("complete"!==t.status)return;const r=n.url.includes("fusionchat.ai")…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty

---
