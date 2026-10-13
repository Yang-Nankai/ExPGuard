# Source-level Taint Flow — kpmjjdhbcfebfjgdnpjagcndoelnidfj 4.23.0

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L73:C6 -> L73:C21  `if (»event.data.type« === 'cpftConfigChange' && event.data.changes) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content` L75:C4 -> L77:C6 (spans to L77)  `»chrome.storage.local.set(event.data.changes, () => {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (27 raw steps → 2 distinct lines):
   1. L73 `if (»event.data.type === 'cpftConfigChange' && event.data.changes«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L75 `chrome.storage.local.set(»event.data.changes«, () => {`  · ELEMENT:member-element

---
