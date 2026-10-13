# Source-level Taint Flow — mnfjhjpninhcccbahcdbcphpifofoajc 1.3.1

- Source type: CRX
- Files with issues: 4 / 8
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(pd-bootstrap-data))

- **Source**: `TARGET_CUSTOM_EVENT` — `src/contentScript` L169:C65 -> L169:C73  `console.log("Patreon Downloader | Received bootstrap data.", »e.detail«);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `src/contentScript` L192:C4 -> L203:C6 (spans to L203)  `»chrome.storage.local.set(data, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (9 raw steps → 5 distinct lines):
   1. L169 `console.log("Patreon Downloader | Received bootstrap data.", »e.detail«);`  · ELEMENT:member-element
   2. L170 `setState(»e.detail«, 0);`  · ELEMENT:member-element
   3. L184 `setState(»state«, (iteration || 0) + 1);`  · ASSIGN:identifier
   4. L191 `data[tab.toString()] = »state«;`  · ASSIGN:identifier
   5. L190 `const »data = {}«;`  · ELEMENT:object.setProperty

---
