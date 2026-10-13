# Source-level Taint Flow — firefox@squadrats.com 2026.38

- Source type: XPI
- Files with issues: 4 / 5
- Distinct taint flows: 1  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 12 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `squadratsCaller` L1:C270 -> L1:C281  `…EventListener("message",(async e=>{if(e.source===window&&e.origin===window.location.origin)if("SQUADRATS_SAFARI_AUTH"!==»e.data.type«){if("SQUADRATS_SET_UID"===e.data.type){const{id:t,uid:a}=e.data;console.log("[squadrats-caller] SET_UID received",{id:t…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (squadrant_uid) — `squadratsCaller` L1:C654 -> L1:C700  `…e({type:"SQUADRATS_SET_UID_RESPONSE",id:t,ok:!chrome.runtime.lastError,error:chrome.runtime.lastError?.message})};try{a?»browser.storage.local.set({squadrant_uid:a},s)«:browser.storage.local.remove(["squadrant_uid"],s)}catch(e){console.error("[squadrats-caller] storage call threw",e),win…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `squadratsCaller` L1:C517 -> L1:C646  `…id:t,uid:a});const s=()=>{console.log("[squadrats-caller] storage callback fired",{lastError:chrome.runtime.lastError}),»window.postMessage({type:"SQUADRATS_SET_UID_RESPONSE",id:t,ok:!chrome.runtime.lastError,error:chrome.runtime.lastError?.message})«};try{a?browser.storage.local.set({squadrant_uid:a},s):browser.storage.local.remove(["squadrant_uid"],s)}catch(e){consol…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (27 raw steps → 1 distinct lines):
   1. L1 `…RATS_SAFARI_AUTH"!==»e.data.type){if("SQUADRATS_SET_UID"===e.data.type){const{id:t,uid:a}=e.data;console.log("[squadrats-caller] SET_UID rece …⟨tainted span: 772 chars⟩… Url:t}=e.data;if(!t)return;let a=!1;try{const e=await browser.runtime.sendMessage({action:"safari-auth",squadratsUrl:t})«;e?.uid&&(a=!0,brows…`  · ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:destructure-property[squadratsUrl], ELEMENT:destructure-property[id], ELEMENT:destructure-property[uid], ASSIGN:identifier, ASSIGN:unary, ELEMENT:object.setProperty

---

