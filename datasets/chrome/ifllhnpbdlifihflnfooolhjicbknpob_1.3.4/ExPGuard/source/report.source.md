# Source-level Taint Flow — ifllhnpbdlifihflnfooolhjicbknpob 1.3.4

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(KTD_EXT_EVENT_SEARCH))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C1 -> L4:C2 (spans to L4)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L31:C31 -> L31:C41  `const response = await »fetch(url)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L1 (→L4) `»﻿chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[contentscript->background]`
   2. L31 `const response = await fetch(»url«);`  · ASSIGN:identifier

---
