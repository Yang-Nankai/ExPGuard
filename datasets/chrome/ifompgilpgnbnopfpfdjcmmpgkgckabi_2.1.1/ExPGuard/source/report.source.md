# Source-level Taint Flow — ifompgilpgnbnopfpfdjcmmpgkgckabi 2.1.1

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C3506 -> L1:C3507  `….runtime.onMessageExternal.addListener(((e,o,s)=>{if(o.url&&o.url.includes("appbox.space"))if("supabase-auth-adapter"===»e«.source)switch(e.action){case"ping":s({status:"ok"});break;case"getItem":try{const{key:t}=e.data;return chrome.storage.s…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L1:C3979 -> L1:C4255  `…ue:o}=e.data;return »chrome.storage.sync.set({[t]:o},(()=>{if(chrome.runtime.lastError){const e=chrome.runtime.lastError.message;console.erro …⟨tainted span: 276 chars⟩… or",message:e})}else s({status:"success"}),r({type:"storage_update",action:"set",key:t,value:o,timestamp:Date.now()})}))«,!0}catch(e){const t…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (54 raw steps → 1 distinct lines):
   1. L1 `…ase-auth-adapter"===»e.source)switch(e.action){case"ping":s({status:"ok"});break;case"getItem":try{const{key:t}=e.data;return chrome.storage. …⟨tainted span: 1407 chars⟩… sole.warn("Unknown action:",e.action),s({status:"error",message:"Unknown action"})}else"broadcast"===e.type?(r(e.data||e«),s({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty

---
