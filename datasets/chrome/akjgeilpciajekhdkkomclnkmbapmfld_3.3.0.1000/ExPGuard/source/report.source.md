# Source-level Taint Flow — akjgeilpciajekhdkkomclnkmbapmfld 3.3.0.1000

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/options.196cd971` L1:C25541 -> L1:C25542  `…bility="visible"}))}))},chrome.runtime.onMessageExternal.addListener(((e,t,o)=>{switch(console.log("onMessage()_option",»e«.cmd),e.cmd){case"hosting":o({received:!0}),console.info("子画面からメッセージを受信"),R.showFuncBtnSetPage=!1,console.log(JSON.strin…`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (funcBtnLayoutInfo) — `js/options.196cd971` L1:C25684 -> L1:C25743  `…ing":o({received:!0}),console.info("子画面からメッセージを受信"),R.showFuncBtnSetPage=!1,console.log(JSON.stringify(e.result.panel)),»chrome.storage.sync.set({funcBtnLayoutInfo:e.result.panel})«}})),"undefined"!==typeof _.OA){let e=0;var P=console.log;console.log=function(){P.apply(this,arguments);let t=" (LOG) "…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (24 raw steps → 1 distinct lines):
   1. L1 `…bility="visible"}))}))},chrome.runtime.onMessageExternal.addListener(((e,t,o)=>{switch(console.log("onMessage()_option",»e.cmd),e.cmd){case"hosting":o({received:!0}),console.info("子画面からメッセージを受信"),R.showFuncBtnSetPage=!1,console.log(JSON.stringify(e.result.panel)),chrome.storage.sync.set({funcBtnLayoutInfo:e.result.panel})«}})),"undefined"!==typeof _.OA){let e=0;var P=console.log;console.log=function(){P.apply(this,arguments);let t=" (LOG) "…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify, ELEMENT:object.setProperty

---
