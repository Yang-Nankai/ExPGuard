# Source-level Taint Flow — mjgbhohbanahpldkmnaafjgpoflgnklk 2.0.1.3

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `background` L2:C265559 -> L2:C265560  `…rt&&(r=n.gmail_port),r?(e.onMessage.addListener((function(t){console.log("gmail_video: got message from popup message=",»t«);var n=t.draft_id;o[n].popup_port=e,r.postMessage(t),e.postMessage(t),t&&"CHQ_VIDEO_MANAGER_CLOSE"==t.type?(console.log…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L2:C265614 -> L2:C265630  `…on(t){console.log("gmail_video: got message from popup message=",t);var n=t.draft_id;o[n].popup_port=e,r.postMessage(t),»e.postMessage(t)«,t&&"CHQ_VIDEO_MANAGER_CLOSE"==t.type?(console.log("gmail_VIDEO: fosucing gmail since we received CHQ_VIDEO_MANAGER_CLOS…`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `background` L2:C266107 -> L2:C266170  `…,chrome.tabs.update(extension_sender.tab.id,{active:!0})):t&&"CHQ_UPDATE_HEIGHT_OF_VIDEO_MANAGER"==t.type&&a&&t.height&&»chrome.windows.update(a,{height:parseInt(t.height),focused:!0})«})),e.onDisconnect.addListener((function(e){console.log("gmail_video: sending CHQ_VIDEO_MANAGER_CLOSE to popup since gma…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (28 raw steps → 1 distinct lines):
   1. L2 `…rom popup message=",»t);var n=t.draft_id;o[n].popup_port=e,r.postMessage(t),e.postMessage(t),t&&"CHQ_VIDEO_MANAGER_CLOSE"==t.type?(console.lo …⟨tainted span: 611 chars⟩… HQ_UPDATE_HEIGHT_OF_VIDEO_MANAGER"==t.type&&a&&t.height&&chrome.windows.update(a,{height:parseInt(t.height),focused:!0})«})),e.onDisconnect.a…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, RETURN:parseInt, ELEMENT:object.setProperty

---
