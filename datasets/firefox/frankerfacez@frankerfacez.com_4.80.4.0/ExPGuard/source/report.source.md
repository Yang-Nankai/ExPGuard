# Source-level Taint Flow — frankerfacez@frankerfacez.com 4.80.4.0

- Source type: XPI
- Files with issues: 2 / 2
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `web/script.min` L1:C957 -> L1:C978  `…ing to reconnect."),setTimeout(r,0)})},"initialize");r(),window.addEventListener("message",n=>{if(!(n.source!==window||!»n.data?.ffz_to_worker«))try{t.postMessage(n.data)}catch{r();try{t.postMessage(n.data)}catch(f){console.log("FFZ-CS-Bridge: Error sending messa…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `web/script.min` L1:C685 -> L1:C753  `…{type:"ffz_injecting"}),s){let t;const r=d(()=>{t=e.runtime.connect({name:"ffz-cs-bridge"}),t.onMessage.addListener(n=>{»window.postMessage({ffz_from_worker:!0,...n},window.location.origin)«}),t.onDisconnect.addListener(()=>{console.log("FFZ-CS-Bridge: Disconnected, attempting to reconnect."),setTimeout(r,0)}…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (48 raw steps → 1 distinct lines):
   1. L1 `…e:"ffz-cs-bridge"}),»t.onMessage.addListener(n=>{window.postMessage({ffz_from_worker:!0,...n},window.location.origin)}),t.onDisconnect.addLis …⟨tainted span: 322 chars⟩… tTimeout(r,0)})},"initialize");r(),window.addEventListener("message",n=>{if(!(n.source!==window||!n.data?.ffz_to_worker)«)try{t.postMessage(n…`  · ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-right, MESSAGE, ELEMENT:object.setProperty, COPY:object-spread
      ⇄ cross-context hop: `runtime.connect.sender.message[web/worker->web/script.min]`

---

## Flow #2 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `web/script.min` L1:C657 -> L1:C755  `…me.id,e.runtime.sendMessage({type:"ffz_injecting"}),s){let t;const r=d(()=>{t=e.runtime.connect({name:"ffz-cs-bridge"}),»t.onMessage.addListener(n=>{window.postMessage({ffz_from_worker:!0,...n},window.location.origin)})«,t.onDisconnect.addListener(()=>{console.log("FFZ-CS-Bridge: Disconnected, attempting to reconnect."),setTimeout(r,0)})}…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `web/script.min` L1:C685 -> L1:C753  `…{type:"ffz_injecting"}),s){let t;const r=d(()=>{t=e.runtime.connect({name:"ffz-cs-bridge"}),t.onMessage.addListener(n=>{»window.postMessage({ffz_from_worker:!0,...n},window.location.origin)«}),t.onDisconnect.addListener(()=>{console.log("FFZ-CS-Bridge: Disconnected, attempting to reconnect."),setTimeout(r,0)}…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (22 raw steps → 1 distinct lines):
   1. L1 `…me.id,e.runtime.sendMessage({type:"ffz_injecting"}),s){let t;const r=d(()=>{t=e.runtime.connect({name:"ffz-cs-bridge"}),»t.onMessage.addListener(n=>{window.postMessage({ffz_from_worker:!0,...n},window.location.origin)})«,t.onDisconnect.addListener(()=>{console.log("FFZ-CS-Bridge: Disconnected, attempting to reconnect."),setTimeout(r,0)})}…`  · MESSAGE, ELEMENT:object.setProperty, COPY:object-spread
      ⇄ cross-context hop: `runtime.connect.sender.message[web/worker->web/script.min]`

---

## Flow #3 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `web/worker` L1:C827 -> L1:C828  `…tion from extension:",e),P.add(e),w(),e.onDisconnect.addListener(()=>{P.delete(e)}),e.onMessage.addListener(t=>{const n=»t«?.ffz_type,o=t?.id;if(n)if(n==="ready"){e.postMessage({ffz_type:"ready"});return}else n==="init-load"?x().then(()=>{e.po…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `web/worker` L1:C944 -> L1:C1031  `… n=t?.ffz_type,o=t?.id;if(n)if(n==="ready"){e.postMessage({ffz_type:"ready"});return}else n==="init-load"?x().then(()=>{»e.postMessage({ffz_type:"reply",id:t.id,reply:{blobs:!0,values:Object.fromEntries(u)}})«}).catch(r=>{console.error("Error while initializing cache for init-load:",r),e.postMessage({ffz_type:"reply-error",id:t…`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `web/worker` L1:C1815 -> L1:C1831  `…),f.runtime.onConnectExternal.addListener(q),f.runtime.onConnect.addListener(q);function z(e,t){for(const n of P)n!==t&&»n.postMessage(e)«}d(z,"broadcast");let u=null;const v=1,L=new Map,S=new Map;function w(e="FFZ",t=0){let n=L.get(e);if(n)return Promise.re…`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `web/worker` L1:C1485 -> L1:C1534  `…"?h(t,e,V(t.key,e)):n==="clear-blobs"?h(t,e,A(e)):n==="flush"&&h(t,e,D())})}d(q,"newPort");function h(e,t,n){n.then(o=>{»t.postMessage({ffz_type:"reply",id:e.id,reply:o})«}).catch(o=>{console.error("Error while replying to message:",o),t.postMessage({ffz_type:"reply-error",id:e.id})})}d(h,"…`
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `web/worker` L1:C1599 -> L1:C1646  `…n(o=>{t.postMessage({ffz_type:"reply",id:e.id,reply:o})}).catch(o=>{console.error("Error while replying to message:",o),»t.postMessage({ffz_type:"reply-error",id:e.id})«})}d(h,"reply"),f.runtime.onConnect.addListener(q),f.runtime.onConnectExternal.addListener(q),f.runtime.onConnect.addLis…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (159 raw steps → 1 distinct lines):
   1. L1 `…istener(t=>{const n=»t?.ffz_type,o=t?.id;if(n)if(n==="ready"){e.postMessage({ffz_type:"ready"});return}else n==="init-load"?x().then(()=>{e.p …⟨tainted span: 5102 chars⟩… le.error("Error while deleting blob.",b),l(c),s()},a.onsuccess=()=>{l(c),i()}}).then(()=>z({ffz_type:"change-blob",key:e«,deleted:!0},t))}d(V…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty, ASSIGN:binary-right

---
