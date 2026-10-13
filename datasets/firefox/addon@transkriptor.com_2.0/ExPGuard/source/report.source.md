# Source-level Taint Flow — addon@transkriptor.com 2.0

- Source type: XPI
- Files with issues: 5 / 6
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L6:C5 -> L6:C12  `if(»request«.action == "loginUser") {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userData) — `background` L11:C4 -> L15:C6 (spans to L15)  `»chrome.storage.local.set({ userData: { uid, language, email } }, function() {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (28 raw steps → 7 distinct lines):
   1. L6 `if(»request.action« == "loginUser") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L7 `let widgetData = »JSON.parse(request.widgetData)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse
   3. L8 `let uid = »widgetData.userId.replace("User#", "")«`  · ELEMENT:member-element, RETURN:fallback-return
   4. L9 `let email = »widgetData.email«`  · ELEMENT:member-element
   5. L10 `let language = »request.language«`  · ASSIGN:identifier, ELEMENT:member-element
   6. L11 (→L15) `chrome.storage.local.set({ userData: { »uid, language, email } }, function() {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L12 `console.log(»uid, email, language«)`  · ASSIGN:identifier

---
