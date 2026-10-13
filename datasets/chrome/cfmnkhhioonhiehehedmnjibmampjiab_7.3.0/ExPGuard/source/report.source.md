# Source-level Taint Flow — cfmnkhhioonhiehehedmnjibmampjiab 7.3.0

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L7576:C10 -> L7576:C17  `switch (»request«.message) {`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L7580:C8 -> L7583:C10 (spans to L7583)  `»chrome.tabs.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (105 raw steps → 15 distinct lines):
   1. L7576 `switch (»request.message«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L7579 `if (»request.openInNewWindow«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L7581 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
   4. L7580 (→L7583) `»        chrome.tabs.create({«`  · ELEMENT:object.setProperty
   5. L7582 `active: »!!request.active«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   6. L7586 `url: »request.url«`  · ASSIGN:identifier, ELEMENT:member-element
   7. L7585 (→L7587) `»        chrome.tabs.update({«`  · ELEMENT:object.setProperty
   8. L7599 `saveHomepageBackground(»request.page«);`  · ASSIGN:identifier, ELEMENT:member-element
   9. L7604 `pageId: »request.pageId«,`  · ASSIGN:identifier, ELEMENT:member-element
  10. L7603 (→L7606) `»      resetHomepageId({«`  · ELEMENT:object.setProperty
  11. L7605 `pagePublicId: »request.pagePublicId«`  · ASSIGN:identifier, ELEMENT:member-element
  12. L7631 `var sourcePageId = »pageId«;`  · ASSIGN:identifier
  13. L7633 `if (»sourcePageId && sourcePageId === homepageId«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  14. L7635 `} else if (»!sourcePageId && pagePublicId«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  15. L7636 `var url = Startme["a" /* default */].apiURL(»"/tools/get_page_id/".concat(pagePublicId)«);`  · ASSIGN:identifier, RETURN:string.concat

---
