# Source-level Taint Flow — ahknjhlmgkmlnjeaklpgllgmbjhdfgej 1.6.6

- Source type: CRX
- Files with issues: 1 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C7197 -> L1:C7198  `…es("onlineapp.pro")||t.url.includes("onlineapp.live")||t.url.includes("onlineapp.stream")))if("supabase-auth-adapter"===»e«.source)switch(e.action){case"ping":r({status:"ok"});break;case"getItem":try{const{key:t}=e.data;return chrome.storage.s…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L1:C7660 -> L1:C7936  `…ue:s}=e.data;return »chrome.storage.sync.set({[t]:s},(()=>{if(chrome.runtime.lastError){const e=chrome.runtime.lastError.message;console.erro …⟨tainted span: 276 chars⟩… or",message:e})}else r({status:"success"}),n({type:"storage_update",action:"set",key:t,value:s,timestamp:Date.now()})}))«,!0}catch(e){console…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (54 raw steps → 1 distinct lines):
   1. L1 `…ase-auth-adapter"===»e.source)switch(e.action){case"ping":r({status:"ok"});break;case"getItem":try{const{key:t}=e.data;return chrome.storage. …⟨tainted span: 1377 chars⟩… sole.warn("Unknown action:",e.action),r({status:"error",message:"Unknown action"})}else"broadcast"===e.type?(n(e.data||e«),r({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty

---
