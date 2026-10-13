# Source-level Taint Flow — angheeakoggimjlccancomcmdhjpadao 2.9.8

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C702 -> L1:C703  `…r((function(e,t,a){t&&t.tab&&a({data:t.tab.id})})),chrome.runtime.onMessageExternal.addListener((function(e,t,a){"get"==»e«.action&&chrome.storage.local.get(null,(e=>a(e))),"set"==e.action&&chrome.storage.local.get(null,(t=>{e.data.countRunned…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `background` L1:C903 -> L1:C935  `…e.local.get(null,(t=>{e.data.countRunned||(e.data.countRunned=t.countRunned),e.data.isShare||(e.data.isShare=t.isShare),»chrome.storage.local.set(e.data)«}))}));`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 1 distinct lines):
   1. L1 `…r((function(e,t,a){t&&t.tab&&a({data:t.tab.id})})),chrome.runtime.onMessageExternal.addListener((function(e,t,a){"get"==»e.action&&chrome.storage.local.get(null,(e=>a(e))),"set"==e.action&&chrome.storage.local.get(null,(t=>{e.data.countRunned||(e.data.countRunned=t.countRunned),e.data.isShare||(e.data.isShare=t.isShare),chrome.storage.local.set(e.data«)}))}));`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right

---

## Flow #2 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L1:C746 -> L1:C750  `…d})})),chrome.runtime.onMessageExternal.addListener((function(e,t,a){"get"==e.action&&chrome.storage.local.get(null,(e=>»a(e)«)),"set"==e.action&&chrome.storage.local.get(null,(t=>{e.data.countRunned||(e.data.countRunned=t.countRunned),e.data.isS…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---
