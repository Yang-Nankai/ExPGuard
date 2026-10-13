# Source-level Taint Flow — giendkofjkgpomkagbpkeimknkmfadgh 1.6.0

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 2  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L45:C4071 -> L45:C4072  `…port:",n),f.delete(e)}})}vt.runtime.onMessageExternal.addListener((r,e,n)=>{if(e.url&&e.url.includes("appbox.space"))if(»r«.source==="supabase-auth-adapter")switch(r.action){case"ping":n({status:"ok"});break;case"getItem":try{const{key:s}=r.da…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L45:C3880 -> L45:C3896  `…le.warn("Connection attempt from unauthorized domain:",r.sender?.url),r.disconnect())});function t(r){f.forEach(e=>{try{»e.postMessage(r)«}catch(n){console.error("Error sending notification to port:",n),f.delete(e)}})}vt.runtime.onMessageExternal.addListener…`
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L45:C4546 -> L45:C4808  `…ue:c}=r.data;return »vt.storage.sync.set({[s]:c},()=>{if(vt.runtime.lastError){const l=vt.runtime.lastError.message;console.error("Storage er …⟨tainted span: 262 chars⟩… ror",message:l})}else n({status:"success"}),t({type:"storage_update",action:"set",key:s,value:c,timestamp:Date.now()})})«,!0}catch(s){console…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (106 raw steps → 1 distinct lines):
   1. L45 `…>{try{e.postMessage(»r)}catch(n){console.error("Error sending notification to port:",n),f.delete(e)}})}vt.runtime.onMessageExternal.addListen …⟨tainted span: 1545 chars⟩… rn("Unknown action:",r.action),n({status:"error",message:"Unknown action"});break}else r.type==="broadcast"?(t(r.data||r«),n({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('unknown') in background)  ·  2× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L45:C4071 -> L45:C4072  `…port:",n),f.delete(e)}})}vt.runtime.onMessageExternal.addListener((r,e,n)=>{if(e.url&&e.url.includes("appbox.space"))if(»r«.source==="supabase-auth-adapter")switch(r.action){case"ping":n({status:"ok"});break;case"getItem":try{const{key:s}=r.da…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L45:C4359 -> L45:C4397  `…me.lastError){const l=vt.runtime.lastError.message;console.error("Storage error:",l),n({status:"error",message:l})}else »n({status:"success",value:c[s]||null})«}),!0}catch(s){console.error("Error in getItem:",s),n({status:"error",message:s.message})}break;case"setItem":try{const{…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (110 raw steps → 1 distinct lines):
   1. L45 `…>{try{e.postMessage(»r)}catch(n){console.error("Error sending notification to port:",n),f.delete(e)}})}vt.runtime.onMessageExternal.addListen …⟨tainted span: 1545 chars⟩… rn("Unknown action:",r.action),n({status:"error",message:"Unknown action"});break}else r.type==="broadcast"?(t(r.data||r«),n({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: sync, key: unknown, sender: background, receiver: background], ELEMENT:computed-member-unknown-alternative

---
