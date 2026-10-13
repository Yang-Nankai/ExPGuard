# Source-level Taint Flow — egmjalgmmolinfenecmfaeognbjbiipi 3.1.0

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 2  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.ts-S8W15SDc` L15:C91733 -> L15:C91734  `…:",r),h.delete(s)}})}chrome.runtime.onMessageExternal.addListener((e,s,r)=>{if(s.url&&s.url.includes("appbox.space"))if(»e«.source==="supabase-auth-adapter")switch(e.action){case"ping":r({status:"ok"});break;case"getItem":try{const{key:i}=e.da…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `assets/index.ts-S8W15SDc` L15:C91538 -> L15:C91554  `…le.warn("Connection attempt from unauthorized domain:",e.sender?.url),e.disconnect())});function t(e){h.forEach(s=>{try{»s.postMessage(e)«}catch(r){console.error("Error sending notification to port:",r),h.delete(s)}})}chrome.runtime.onMessageExternal.addList…`
  - `CHROME_SYNC_STORAGE` (unknown) — `assets/index.ts-S8W15SDc` L15:C92220 -> L15:C92494  `…ue:a}=e.data;return »chrome.storage.sync.set({[i]:a},()=>{if(chrome.runtime.lastError){const n=chrome.runtime.lastError.message;console.error …⟨tainted span: 274 chars⟩… ror",message:n})}else r({status:"success"}),t({type:"storage_update",action:"set",key:i,value:a,timestamp:Date.now()})})«,!0}catch(i){console…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (161 raw steps → 1 distinct lines):
   1. L15 `…>{try{s.postMessage(»e)}catch(r){console.error("Error sending notification to port:",r),h.delete(s)}})}chrome.runtime.onMessageExternal.addLi …⟨tainted span: 1585 chars⟩… rn("Unknown action:",e.action),r({status:"error",message:"Unknown action"});break}else e.type==="broadcast"?(t(e.data||e«),r({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('unknown') in assets/index.ts-S8W15SDc)  ·  6× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.ts-S8W15SDc` L15:C91733 -> L15:C91734  `…:",r),h.delete(s)}})}chrome.runtime.onMessageExternal.addListener((e,s,r)=>{if(s.url&&s.url.includes("appbox.space"))if(»e«.source==="supabase-auth-adapter")switch(e.action){case"ping":r({status:"ok"});break;case"getItem":try{const{key:i}=e.da…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `assets/index.ts-S8W15SDc` L15:C92033 -> L15:C92071  `…astError){const n=chrome.runtime.lastError.message;console.error("Storage error:",n),r({status:"error",message:n})}else »r({status:"success",value:a[i]||null})«}),!0}catch(i){console.error("Error in getItem:",i),r({status:"error",message:i.message})}break;case"setItem":try{const{…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (168 raw steps → 1 distinct lines):
   1. L15 `…>{try{s.postMessage(»e)}catch(r){console.error("Error sending notification to port:",r),h.delete(s)}})}chrome.runtime.onMessageExternal.addLi …⟨tainted span: 1585 chars⟩… rn("Unknown action:",e.action),r({status:"error",message:"Unknown action"});break}else e.type==="broadcast"?(t(e.data||e«),r({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: sync, key: unknown, sender: assets/index.ts-S8W15SDc, receiver: assets/index.ts-S8W15SDc], ELEMENT:computed-member-unknown-alternative

---
