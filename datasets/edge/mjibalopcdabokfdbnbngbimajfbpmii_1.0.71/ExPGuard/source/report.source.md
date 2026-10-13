# Source-level Taint Flow — mjibalopcdabokfdbnbngbimajfbpmii 1.0.71

- Source type: CRX
- Files with issues: 7 / 12
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 34 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/background` L50:C6 -> L50:C13  `if (»request«.action === 'sign-in') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (token) — `scripts/background` L54:C4 -> L54:C39  `»chrome.storage.local.set({ token })«;`
  - `CHROME_LOCAL_STORAGE` (user) — `scripts/background` L55:C4 -> L55:C38  `»chrome.storage.local.set({ user })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (66 raw steps → 8 distinct lines):
   1. L50 `if (»request.action« === 'sign-in') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L51 `const user = »request.body.user«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L66 `if (»request.action« === 'sign-out') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L52 `const token = »request.body.token«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L54 `»chrome.storage.local.set({ token })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L70 `if (»request.action« === 'get-linkedin-cookies') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L55 `»chrome.storage.local.set({ user })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L80 `if (»request.ping« === 'check-installation') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #2 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `scripts/background` L71:C4 -> L77:C6 (spans to L77)  `»chrome.cookies.getAll({ domain: '.www.linkedin.com' }, (cookies) => {«`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `scripts/background` L76:C6 -> L76:C83  `»sendResponse({ action: 'linkedin-cookies', body: { liAt, jSessionId, liA } })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (22 raw steps → 5 distinct lines):
   1. L71 (→L77) `»    chrome.cookies.getAll({ domain: '.www.linkedin.com' }, (cookies) => {«`  · ELEMENT:object.setProperty
   2. L72 `const liAt = »cookies.find((cookie) => cookie.name === 'li_at')«;`  · ELEMENT:array.find
   3. L73 `const jSessionId = »cookies.find((cookie) => cookie.name === 'JSESSIONID')«;`  · ELEMENT:array.find
   4. L74 `const liA = »cookies.find((cookie) => cookie.name === 'li_a')«;`  · ELEMENT:array.find
   5. L76 `»sendResponse({ action: 'linkedin-cookies', body: { liAt, jSessionId, liA } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — CHROME_COOKIES_INFO (cookies(.www.linkedin.com))

- **Source**: `CHROME_COOKIES_INFO` — `scripts/background` L72:C19 -> L72:C68  `const liAt = »cookies.find((cookie) => cookie.name === 'li_at')«;`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `scripts/background` L76:C6 -> L76:C83  `»sendResponse({ action: 'linkedin-cookies', body: { liAt, jSessionId, liA } })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 4 distinct lines):
   1. L72 `const liAt = »cookies.find((cookie) => cookie.name === 'li_at')«;`  · ELEMENT:array.find
   2. L73 `const jSessionId = »cookies.find((cookie) => cookie.name === 'JSESSIONID')«;`  · ELEMENT:array.find
   3. L74 `const liA = »cookies.find((cookie) => cookie.name === 'li_a')«;`  · ELEMENT:array.find
   4. L76 `»sendResponse({ action: 'linkedin-cookies', body: { liAt, jSessionId, liA } })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
