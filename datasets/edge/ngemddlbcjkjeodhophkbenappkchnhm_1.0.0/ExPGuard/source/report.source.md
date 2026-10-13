# Source-level Taint Flow — ngemddlbcjkjeodhophkbenappkchnhm 1.0.0

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L155:C34 -> L155:C45  `'tntConfigChange' === »e.data.type« &&`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content` L158:C12 -> L160:C14 (spans to L160)  `»chrome.storage.local.set(e.data.changes, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (7 raw steps → 4 distinct lines):
   1. L155 `'tntConfigChange' === »e.data.type« &&`  · ELEMENT:member-element, ASSIGN:binary-right
   2. L154 (→L156) `»          e.source === window &&«`  · ASSIGN:logical-right, ASSIGN:logical-left
   3. L156 `»e.data.changes« &&`  · ELEMENT:member-element
   4. L158 `chrome.storage.local.set(»e.data.changes«, function () {`  · ELEMENT:member-element

---
