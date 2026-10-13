# Source-level Taint Flow — gcoekeoenehjmndhkdnoomdjeaclkhbe 0.0.10

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `scripts/service-worker` L25:C0 -> L99:C2 (spans to L99)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `scripts/service-worker` L91:C9 -> L91:C96  `await »fetch(`${googleApiUrl}courses/${courseId}/courseWork?access_token=${oauthToken}`, init)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 3 distinct lines):
   1. L25 (→L99) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/classroom/content->scripts/service-worker]`
   2. L76 (→L90) `»			const init = {«`  · ELEMENT:object.setProperty
   3. L80 (→L89) `»				body: JSON.stringify({«`  · RETURN:json.stringify

---
