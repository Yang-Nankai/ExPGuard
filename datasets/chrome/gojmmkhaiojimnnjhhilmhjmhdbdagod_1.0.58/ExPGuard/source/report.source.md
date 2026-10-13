# Source-level Taint Flow — gojmmkhaiojimnnjhhilmhjmhdbdagod 1.0.58

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C2249 -> L1:C2250  `…te({url:`${t}?onboard=2`});e.runtime.id;chrome.runtime.onMessageExternal.addListener((async function(e,t,o){console.log(»e«.type);t.origin;if("ping"===e.type)return!0;if("boards:update"===e.type){let e=await n("um/token"),t=await r(e);await a(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (um/token) — `background` L1:C207 -> L1:C254  `…ekit.app",t="https://app.swipekit.app";let a=async function(e="um/token",t){let a={};return a[e]=t,new Promise(((e,t)=>{»chrome.storage.local.set(a,(function(t){e(t)}))«}))},n=async function(e="um/token"){return new Promise(((t,a)=>{chrome.storage.local.get([e],(a=>{a=a[e]||null,t(a)}))})…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (60 raw steps → 1 distinct lines):
   1. L1 `…e="um/token",t){let »a={};return a[e]=t,new Promise(((e,t)=>{chrome.storage.local.set(a,(function(t){e(t)}))}))},n=async function(e="um/token …⟨tainted span: 2519 chars⟩… :!0},c=await chrome.tabs.query(s),u=null;c&&c[0]&&(u=c[0]);let l=await i(e.jwt);await a("um/user",l);let d=await r(e.jwt«);await a("um/boards…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:template-literal

---
