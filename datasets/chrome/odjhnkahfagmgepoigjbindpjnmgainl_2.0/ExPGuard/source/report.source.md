# Source-level Taint Flow — odjhnkahfagmgepoigjbindpjnmgainl 2.0

- Source type: CRX
- Files with issues: 5 / 8
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(twitch-ad-blocker-intercepted))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background` L325:C0 -> L426:C2 (spans to L426)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (adsBlocked) — `background` L60:C8 -> L60:C48  `»chrome.storage.local.set({ adsBlocked })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (8 raw steps → 4 distinct lines):
   1. L325 (→L426) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[video/twitch-content->background]`
   2. L340 `handleAdBlocked(»message.count || 1«);`  · ASSIGN:logical-left
   3. L66 `adsBlocked += »count«;`  · ASSIGN:identifier
   4. L60 `»chrome.storage.local.set({ adsBlocked })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
