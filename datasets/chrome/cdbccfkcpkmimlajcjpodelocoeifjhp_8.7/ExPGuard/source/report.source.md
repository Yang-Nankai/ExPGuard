# Source-level Taint Flow — cdbccfkcpkmimlajcjpodelocoeifjhp 8.7

- Source type: CRX
- Files with issues: 4 / 8
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 20 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C85860 -> L1:C85861  `…rl:"https://oceanhero.today",name:"shellsCounter",value:(r+t.amount).toString()})})),"setNtpSearchBoxFocus"===t.type?(l=»t«.payload,r({success:!0}),!0):"contentAdClicked"===t.type?(m(t.gain).then((function(){r({type:"success"})})),g(t),w(),!0)…`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `background` L1:C85719 -> L1:C85821  `….type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(e){var r=e?parseInt(e.value):0;»chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+t.amount).toString()})«})),"setNtpSearchBoxFocus"===t.type?(l=t.payload,r({success:!0}),!0):"contentAdClicked"===t.type?(m(t.gain).then((functi…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (43 raw steps → 1 distinct lines):
   1. L1 `…ole.log("MESSAGE: ",»t),"addShells"===t.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(e){var r=e?pa …⟨tainted span: 1080 chars⟩… ://docs.google.com/forms/d/e/1FAIpQLSdIttS4xOnSHUSaVHb1Q4q_MvrHB06tRzR4gDMFDSrYx-uLbg/viewform?usp=sf_link",active:!0}))«,void("openTab"===t.…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:fallback-return, ELEMENT:object.setProperty, ASSIGN:logical-left

---

## Flow #2 — CHROME_COOKIES_INFO (cookies(https://oceanhero.today))

- **Source**: `CHROME_COOKIES_INFO` — `background` L1:C85708 -> L1:C85709  `…Shells"===t.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(e){var r=e?parseInt(»e«.value):0;chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+t.amount).toString()})})),"set…`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `background` L1:C85719 -> L1:C85821  `….type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(e){var r=e?parseInt(e.value):0;»chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+t.amount).toString()})«})),"setNtpSearchBoxFocus"===t.type?(l=t.payload,r({success:!0}),!0):"contentAdClicked"===t.type?(m(t.gain).then((functi…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L1 `…",t),"addShells"===t.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(e){var r=e?»parseInt(e.value):0;chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+t.amount).toString()})«})),"setNtpSearchBoxFocus"===t.type?(l=t.payload,r({success:!0}),!0):"contentAdClicked"===t.type?(m(t.gain).then((functi…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent, ASSIGN:binary-left, RETURN:fallback-return, ELEMENT:object.setProperty

---
