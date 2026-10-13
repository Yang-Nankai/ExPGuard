# Source-level Taint Flow — mnampbajndaipakjhcbbaihllmghlcdf 3.1.10

- Source type: CRX
- Files with issues: 5 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 28 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `service_worker` L19:C20060 -> L19:C20061  `…),r.onMessage.addListener((i,s)=>{n.debug("[ServiceWorker:Connection] message received",{type:e,portName:r.name,message:»i«}),o(i,s)})}};chrome.runtime.onConnectExternal.addListener(RF("external"));var jn=[];switch("prod"){case"local":jn=["*:/…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `service_worker` L17:C22394 -> L17:C22430  `…tabs.onUpdated.removeListener(r),t(i))};chrome.tabs.onUpdated.addListener(r)}),ri=async({url:e,active:t})=>{let r=await »chrome.tabs.create({active:t,url:e})«;if(!r.id)throw new Error("ExtV3: Unable to open tab");return qR(r.id)};var Cg=(e,t)=>new Promise(r=>{ri({url:e.url,acti…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4913 raw steps → 2 distinct lines):
   1. L19 `…(i=>{n.debug("[ServiceWorker:Connection] connection closed",{type:e,portName:i.name})}),r.onMessage.addListener((i,s)=>{»n.debug("[ServiceWorker:Connection] message received",{type:e,portName:r.name,message:i}),o(i«,s)})}};chrome.runtime.onConnectExternal.addListener(RF("external"));var jn=[];switch("prod"){case"local":jn=["*://local…`  · ASSIGN:identifier, ELEMENT:object.setProperty
   2. L17 `…:e,active:t})=>{let »r=await chrome.tabs.create({active:t,url:e});if(!r.id)throw new Error("ExtV3: Unable to open tab");return qR(r.id)};var  …⟨tainted span: 6191 chars⟩… {error:new Error(`No handler for ${r.type} ${r.name}`)})},Fv=({logger:e,type:t})=>(r,n)=>qn({logger:e,type:t},{message:r«,msgPort:n});a();a()…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:unary, RETURN:fallback-return, COPY:object.assign-opaque, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, RETURN:json.parse, ITERATE:loop.iteration, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:destructure-property[file], ELEMENT:destructure-property[order], ELEMENT:destructure-property[type], RETURN:atob, INITIAL:Uint8Array.constructor, ASSIGN:conditional-alternate, RETURN:encodeURIComponent, RETURN:decodeURI, ASSIGN:conditional-consequent, ASSIGN:binary-right, RETURN:btoa, ASSIGN:template-literal, RETURN:json.stringify, ELEMENT:destructure-property[deviceId], COPY:object-spread

---
