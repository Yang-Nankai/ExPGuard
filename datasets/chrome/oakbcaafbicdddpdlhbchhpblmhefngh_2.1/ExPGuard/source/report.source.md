# Source-level Taint Flow — oakbcaafbicdddpdlhbchhpblmhefngh 2.1

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `bg` L1:C360 -> L1:C698  `…uffleEnable:!0})})),»chrome.runtime.onMessage.addListener(((e,t,a)=>{switch(e.action){case"set-active-tab":activeTab=e.tab;break;case"get-act …⟨tainted span: 338 chars⟩… t t=new FileReader;t.onload=()=>{a(t.result)},t.onerror=()=>{a(null)},t.readAsDataURL(e)})).catch((e=>{a(null)})),!0}}))«,chrome.tabs.onUpdat…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `bg` L1:C533 -> L1:C545  `…h(e.action){case"set-active-tab":activeTab=e.tab;break;case"get-active-tab":return a(activeTab),!0;case"get-swf":return »fetch(e.url)«.then((e=>e.blob())).then((e=>{let t=new FileReader;t.onload=()=>{a(t.result)},t.onerror=()=>{a(null)},t.readAsDataURL(e…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…uffleEnable:!0})})),»chrome.runtime.onMessage.addListener(((e,t,a)=>{switch(e.action){case"set-active-tab":activeTab=e.tab;break;case"get-act …⟨tainted span: 338 chars⟩… t t=new FileReader;t.onload=()=>{a(t.result)},t.onerror=()=>{a(null)},t.readAsDataURL(e)})).catch((e=>{a(null)})),!0}}))«,chrome.tabs.onUpdat…`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[dist/content->bg]`

---
