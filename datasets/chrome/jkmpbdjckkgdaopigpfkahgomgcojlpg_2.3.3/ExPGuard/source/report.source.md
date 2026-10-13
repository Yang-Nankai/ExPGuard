# Source-level Taint Flow — jkmpbdjckkgdaopigpfkahgomgcojlpg 2.3.3

- Source type: CRX
- Files with issues: 2 / 6
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C6676 -> L1:C6677  `….runtime.onMessageExternal.addListener(((e,r,t)=>{if(r.url&&r.url.includes("appbox.space"))if("supabase-auth-adapter"===»e«.source)switch(e.action){case"ping":t({status:"ok"});break;case"getItem":try{const{key:r}=e.data;return chrome.storage.s…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L1:C7139 -> L1:C7415  `…ue:o}=e.data;return »chrome.storage.sync.set({[r]:o},(()=>{if(chrome.runtime.lastError){const e=chrome.runtime.lastError.message;console.erro …⟨tainted span: 276 chars⟩… or",message:e})}else t({status:"success"}),a({type:"storage_update",action:"set",key:r,value:o,timestamp:Date.now()})}))«,!0}catch(e){console…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (54 raw steps → 1 distinct lines):
   1. L1 `…ase-auth-adapter"===»e.source)switch(e.action){case"ping":t({status:"ok"});break;case"getItem":try{const{key:r}=e.data;return chrome.storage. …⟨tainted span: 1377 chars⟩… sole.warn("Unknown action:",e.action),t({status:"error",message:"Unknown action"})}else"broadcast"===e.type?(a(e.data||e«),t({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty

---
