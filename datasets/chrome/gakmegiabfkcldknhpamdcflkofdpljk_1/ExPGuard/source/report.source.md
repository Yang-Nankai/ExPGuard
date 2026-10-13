# Source-level Taint Flow — gakmegiabfkcldknhpamdcflkofdpljk 1

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L104:C13 -> L104:C20  `listener(»request«, sender, sendResponse);`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L124:C12 -> L126:C14 (spans to L126)  `»chrome.tabs.create({«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `js/background` L129:C12 -> L132:C14 (spans to L132)  `»chrome.windows.create({«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `js/background` L135:C12 -> L139:C14 (spans to L139)  `»chrome.windows.create({«`
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `js/background` L143:C16 -> L143:C80  `»localStorage.setItem('account', JSON.stringify(request.account))«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (126 raw steps → 14 distinct lines):
   1. L104 `listener(»request«, sender, sendResponse);`  · ASSIGN:identifier
   2. L109 `switch(»request.event«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L114 `searchBookmarks(»request.query«).then(res => {`  · ASSIGN:identifier, ELEMENT:member-element
   4. L153 `chrome.bookmarks.search(»query«, (res) => {`  · ASSIGN:identifier
   5. L119 `searchHistory(»request.query«).then(res => {`  · ASSIGN:identifier, ELEMENT:member-element
   6. L161 (→L163) `chrome.history.search({ text: »query, maxResults: 10 }, (res) => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L125 `url: »request.url«`  · ASSIGN:identifier, ELEMENT:member-element
   8. L124 (→L126) `»            chrome.tabs.create({«`  · ELEMENT:object.setProperty
   9. L130 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L129 (→L132) `»            chrome.windows.create({«`  · ELEMENT:object.setProperty
  11. L136 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L135 (→L139) `»            chrome.windows.create({«`  · ELEMENT:object.setProperty
  13. L142 `if (»request.status && request.account«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  14. L143 `localStorage.setItem('account', »JSON.stringify(request.account)«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify

---

## Flow #2 — CHROME_BOOKMARK_INFO

- **Source**: `CHROME_BOOKMARK_INFO` — `js/background` L153:C8 -> L155:C10 (spans to L155)  `»chrome.bookmarks.search(query, (res) => {«`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `js/background` L115:C16 -> L115:C33  `»sendResponse(res)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L153 (→L155) `»        chrome.bookmarks.search(query, (res) => {«`  · ELEMENT:object.setProperty

---

## Flow #3 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `js/background` L115:C16 -> L115:C33  `»sendResponse(res)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---

## Flow #4 — CHROME_HISTORY_INFO

- **Source**: `CHROME_HISTORY_INFO` — `js/background` L161:C8 -> L163:C10 (spans to L163)  `»chrome.history.search({ text: query, maxResults: 10 }, (res) => {«`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `js/background` L120:C16 -> L120:C33  `»sendResponse(res)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L161 (→L163) `»        chrome.history.search({ text: query, maxResults: 10 }, (res) => {«`  · ELEMENT:object.setProperty

---

## Flow #5 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `js/background` L120:C16 -> L120:C33  `»sendResponse(res)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---
