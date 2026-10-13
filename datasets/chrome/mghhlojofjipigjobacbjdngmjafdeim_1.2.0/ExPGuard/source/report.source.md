# Source-level Taint Flow — mghhlojofjipigjobacbjdngmjafdeim 1.2.0

- Source type: CRX
- Files with issues: 3 / 7
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(updateCounter))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L2:C0 -> L2:C47  `»chrome.runtime.onMessage.addListener(onMessage)«;`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `background` L9:C3 -> L9:C75  `»chrome.action.setBadgeText({text: messageEvent.counterValue.toString()})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 2 distinct lines):
   1. L2 `»chrome.runtime.onMessage.addListener(onMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content_script->background]`
   2. L9 `»chrome.action.setBadgeText({text: messageEvent.counterValue.toString()})«;`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---
