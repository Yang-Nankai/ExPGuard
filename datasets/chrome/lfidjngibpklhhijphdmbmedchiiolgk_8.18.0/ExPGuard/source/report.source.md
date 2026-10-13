# Source-level Taint Flow — lfidjngibpklhhijphdmbmedchiiolgk 8.18.0

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 2  (collapsed from 9 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `filterUrl` L1:C9715 -> L1:C9716  `…rome.runtime.onMessageExternal.addListener(function(t,e){e.id!==CHROME_CLIENT_APP_ID&&e.origin!==IWA_CLIENT_ORIGIN_ID||!»t«||"updateRule"!==t.type||(t.content?["enabled","origin","host","protocols"].reduce((e,o)=>(Object.getOwnPropertyNames(t.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (data) — `filterUrl` L1:C9994 -> L1:C10052  `….error(`The content of updateRule request is missing the "${o}" property`)),e),!0)&&(Array.isArray(t.content.protocols)?»chrome.storage.local.set({data:JSON.stringify(t.content)})«:console.error("The updateRule request has no content")):console.error("The updateRule request has no content"))});`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (24 raw steps → 1 distinct lines):
   1. L1 `…tener(function(t,e){»e.id!==CHROME_CLIENT_APP_ID&&e.origin!==IWA_CLIENT_ORIGIN_ID||!t||"updateRule"!==t.type||(t.content?["enabled","origin", …⟨tainted span: 400 chars⟩… ${o}" property`)),e),!0)&&(Array.isArray(t.content.protocols)?chrome.storage.local.set({data:JSON.stringify(t.content)})«:console.error("The …`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, RETURN:json.stringify, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('data') in filterUrl)  ·  8× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `filterUrl` L1:C9715 -> L1:C9716  `…rome.runtime.onMessageExternal.addListener(function(t,e){e.id!==CHROME_CLIENT_APP_ID&&e.origin!==IWA_CLIENT_ORIGIN_ID||!»t«||"updateRule"!==t.type||(t.content?["enabled","origin","host","protocols"].reduce((e,o)=>(Object.getOwnPropertyNames(t.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (data) — `filterUrl` L1:C6212 -> L1:C6246  `…ve("tempConfigTabId"),chrome.storage.local.get("data",e=>{if(e&&e.data)try{var o=JSON.parse(e.data),t=JSON.stringify(o);»chrome.storage.local.set({data:t})«,console.log("Successfully read data from storage.")}catch(e){console.error("Invalid JSON in chrome.storage.local:",e.me…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (593 raw steps → 1 distinct lines):
   1. L1 `…new Promise((o,t)=>{»chrome.storage.local.get("data",e=>{chrome.runtime.lastError?t(new Error(chrome.runtime.lastError.message)):o(e)})});if( …⟨tainted span: 8552 chars⟩… ${o}" property`)),e),!0)&&(Array.isArray(t.content.protocols)?chrome.storage.local.set({data:JSON.stringify(t.content)})«:console.error("The …`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, RETURN:json.stringify, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: data, sender: filterUrl, receiver: filterUrl], RETURN:json.parse, RETURN:fallback-return, ITERATE:loop.iteration, ASSIGN:binary-left

---
