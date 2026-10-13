# Source-level Taint Flow — {77691beb-4c53-48de-ab20-6589a537717a} 0.12.1

- Source type: XPI
- Files with issues: 4 / 4
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `inject` L18:C10 -> L18:C47  `if (»event.source === window && event.data« && event.data.type === 'eth:send') chrome.runtime.sendMessage(event.data.payload)`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `inject` L6:C8 -> L6:C91  `»window.postMessage({type: 'eth:payload', payload: payload}, window.location.origin)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (22 raw steps → 6 distinct lines):
   1. L18 `if (»event.source === window && event.data && event.data.type === 'eth:send') chrome.runtime.sendMessage(event.data.payload«)`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   2. L3 (→L16) `»    chrome.runtime.onMessage.addListener((payload, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[index->inject]`
   3. L4 `if (»payload.type« === 'eth:payload') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   4. L6 `»window.postMessage({type: 'eth:payload', payload: payload}, window.location.origin)«`  · ELEMENT:object.setProperty
   5. L8 `if (»payload.type« === 'embedded:action') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
   6. L11 `if (»payload.type« === 'eth:event') {`  · ELEMENT:member-element-container, ASSIGN:binary-left

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `index` L1:C36948 -> L1:C37877  `…tMediaBlob__(e,t,n)}»chrome.runtime.onMessage.addListener((async(e,n)=>{const{tab:s,...r}=e,{method:o,params:a}=r;if(console.debug("Message r …⟨tainted span: 929 chars⟩… ;const l={...r,jsonrpc:"2.0",id:d,__frameOrigin:h,__extensionConnecting:r.__extensionConnecting};i.connection.send(l)}))«,chrome.runtime.onCo…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `index` L1:C37278 -> L1:C37290  `…tChainId"===e.type&&t.chainId)return y(t.chainId)}else if("media_blob"===r.method){const e=r.location;try{const i=await »fetch(r.src)«,s=await i.blob(),o=URL.createObjectURL(s);chrome.scripting.executeScript({target:{tabId:n.tab.id},func:t,args:[o,e]})}c…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (284 raw steps → 1 distinct lines):
   1. L1 `…e"];let i,s,r;const »o={},c={},a={connected:!1,availableChains:[],currentChain:""},d=e=>{if(!e)return"";const t=e.split("/");return`${t[0]}// …⟨tainted span: 3448 chars⟩… ;const l={...r,jsonrpc:"2.0",id:d,__frameOrigin:h,__extensionConnecting:r.__extensionConnecting};i.connection.send(l)}))«,chrome.runtime.onCo…`  · MESSAGE, ASSIGN:identifier, ELEMENT:destructure-property[tab], ELEMENT:destructure-property[method], ELEMENT:destructure-property[params], ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1], ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:template-literal, ELEMENT:implicit.add, ASSIGN:unary, RETURN:fallback-return, COPY:object-spread, ASSIGN:binary-left, ELEMENT:member-element-container, ELEMENT:destructure-property[tabId], ELEMENT:destructure-property[payloadId], ASSIGN:conditional-consequent, ASSIGN:conditional-alternate, COPY:object.assign
      ⇄ cross-context hop: `runtime.single.sender.message[inject->index]`

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `frame` L1:C18578 -> L1:C18606  `…statechange",(e=>{"interactive"===document.readyState&&setProvider()})),window.addEventListener("message",(async e=>{if(»e&&e.source===window&&e.data«&&"embedded:action"===e.data.type&&window.self===window.top&&e.data.action){const t=e.data.action;if(c[t.type]){const e=…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `frame` L1:C18787 -> L1:C18857  `…e.data.action){const t=e.data.action;if(c[t.type]){const e={method:"embedded_action_res",params:[t,await c[t.type](t)]};»window.postMessage({type:"eth:send",payload:e},window.location.origin)«}else console.warn(`Could not find embedded action ${t.type}`)}}))})()})();`
- **Sanitized**: NO
- **Frame**: `MAIN_frame`

- **Propagation** (31 raw steps → 1 distinct lines):
   1. L1 `…sage",(async e=>{if(»e&&e.source===window&&e.data&&"embedded:action"===e.data.type&&window.self===window.top&&e.data.action){const t=e.data.a …⟨tainted span: 340 chars⟩… Message({type:"eth:send",payload:e},window.location.origin)}else console.warn(`Could not find embedded action ${t.type}`«)}}))})()})();`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:template-literal

---
