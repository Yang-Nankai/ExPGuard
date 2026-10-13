# Source-level Taint Flow — extension@oceanhero.today 10.7

- Source type: XPI
- Files with issues: 4 / 8
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C7234 -> L1:C7235  `…rl:"https://oceanhero.today",name:"shellsCounter",value:(r+e.amount).toString()})})),"setNtpSearchBoxFocus"===e.type?(f=»e«.payload,r({success:!0}),!0):"contentAdClicked"===e.type?(b(e.gain).then((function(){r({type:"success"})})),y(),!0):"she…`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `background` L1:C7093 -> L1:C7195  `….type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(t){var r=t?parseInt(t.value):0;»chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+e.amount).toString()})«})),"setNtpSearchBoxFocus"===e.type?(f=e.payload,r({success:!0}),!0):"contentAdClicked"===e.type?(b(e.gain).then((functi…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (41 raw steps → 1 distinct lines):
   1. L1 `…nction(e,t,r){return»"addShells"===e.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(t){var r=t?parse …⟨tainted span: 1065 chars⟩… s://docs.google.com/forms/d/e/1FAIpQLSdIttS4xOnSHUSaVHb1Q4q_MvrHB06tRzR4gDMFDSrYx-uLbg/viewform?usp=sf_link",active:!0})«,void("openTab"===e.…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:fallback-return, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #2 — CHROME_COOKIES_INFO (cookies(https://oceanhero.today))

- **Source**: `CHROME_COOKIES_INFO` — `background` L1:C7082 -> L1:C7083  `…Shells"===e.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(t){var r=t?parseInt(»t«.value):0;chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+e.amount).toString()})})),"set…`
- **Sink(s)**:
  - `CHROME_COOKIES_SET_OPTIONS` — `background` L1:C7093 -> L1:C7195  `….type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(t){var r=t?parseInt(t.value):0;»chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+e.amount).toString()})«})),"setNtpSearchBoxFocus"===e.type?(f=e.payload,r({success:!0}),!0):"contentAdClicked"===e.type?(b(e.gain).then((functi…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L1 `…eturn"addShells"===e.type&&chrome.cookies.get({url:"https://oceanhero.today",name:"shellsCounter"},(function(t){var r=t?»parseInt(t.value):0;chrome.cookies.set({url:"https://oceanhero.today",name:"shellsCounter",value:(r+e.amount).toString()})«})),"setNtpSearchBoxFocus"===e.type?(f=e.payload,r({success:!0}),!0):"contentAdClicked"===e.type?(b(e.gain).then((functi…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent, ASSIGN:binary-left, RETURN:fallback-return, ELEMENT:object.setProperty

---
