# Source-level Taint Flow — fcblfpbeglkdleeegdjjomkaffglabic 2.0.37

- Source type: CRX
- Files with issues: 5 / 13
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 17 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service_worker_utils/track_tabs` L157:C6 -> L157:C13  `if (»request«.action === 'openTab') {`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `service_worker_utils/track_tabs` L164:C10 -> L167:C12 (spans to L167)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L157 `if (»request.action« === 'openTab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L165 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
   3. L164 (→L167) `»          chrome.tabs.create({«`  · ELEMENT:object.setProperty

---
