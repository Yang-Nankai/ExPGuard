# Source-level Taint Flow — kcgedkeajhbfkackhppmenimpfpnopje 4.0.3

- Source type: CRX
- Files with issues: 1 / 9
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/chunk-9d6a3cd2` L1:C1004 -> L1:C1005  `…,n)=>{var u,l;const s=i.url??"";if(!e(s))return n({status:"error",message:"Unauthorized domain"}),!1;if((r==null?void 0:»r«.source)==="supabase-auth-adapter"){switch(r.action){case"ping":n({status:"ok"});break;case"getItem":{try{const o=(u=r.d…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `assets/chunk-9d6a3cd2` L1:C554 -> L1:C570  `…t{g as W}from"./chunk-0598ba2e.js";const gt=chrome.offscreen.Reason,K="popup.html";{let t=function(r){a.forEach(i=>{try{»i.postMessage(r)«}catch{a.delete(i)}})},e=function(r){return r.includes(mt)};const a=new Set;chrome.runtime.onConnectExternal.addListener…`
  - `CHROME_SYNC_STORAGE` (unknown) — `assets/chunk-9d6a3cd2` L1:C1462 -> L1:C1685  `…eof Error?o.message:String(o);n({status:"error",message:c})}break}case"setItem":{try{const{key:o,value:c}=r.data;return »chrome.storage.sync.set({[o]:c},()=>{chrome.runtime.lastError?n({status:"error",message:chrome.runtime.lastError.message}):(n({status:"success"}),t({type:"storage_update",action:"set",key:o,value:c,timestamp:Date.now()}))})«,!0}catch(o){const c=o instanceof Error?o.message:String(o);n({status:"error",message:c})}break}case"removeItem":{try{co…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (59 raw steps → 1 distinct lines):
   1. L1 `…>{try{i.postMessage(»r)}catch{a.delete(i)}})},e=function(r){return r.includes(mt)};const a=new Set;chrome.runtime.onConnectExternal.addListen …⟨tainted span: 1709 chars⟩… k}default:n({status:"error",message:"Unknown action"})}return!0}return(r==null?void 0:r.type)==="broadcast"?(t(r.data??r«),n({status:"success…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value], ELEMENT:object.setProperty

---
