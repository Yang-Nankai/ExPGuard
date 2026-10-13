# Source-level Taint Flow — bnlghmkgojdehkigfkkblmmeldkmoccb 1.3.6

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L2:C78054 -> L2:C78055  `…eturn pt(t)})):"open-markups"===t&&dt()})),chrome.runtime.onMessageExternal.addListener((function(t,e,r){if("version"===»t«.message){var n=chrome.runtime.getManifest();r(n.version)}else if("take_scrolling_screenshot"===t.message)try{it().then(…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L2:C78207 -> L2:C78762  `…{var n=t.url,o=null;»chrome.tabs.create({url:n},function(){var e=rt(tt().mark((function e(n){return tt().wrap((function(e){for(;;)switch(e.pr …⟨tainted span: 555 chars⟩… :e.t0});case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t){return e.apply(this,arguments)}}())«}))}catch(t){r({erro…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (32 raw steps → 1 distinct lines):
   1. L2 `…e,r){if("version"===»t.message){var n=chrome.runtime.getManifest();r(n.version)}else if("take_scrolling_screenshot"===t.message)try{it().then …⟨tainted span: 789 chars⟩… (t){return e.apply(this,arguments)}}())}))}catch(t){r({error:t})}else"user-initialized"===t.message&&(t.payload.closeTab«&&chrome.tabs.remove…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:unary

---
