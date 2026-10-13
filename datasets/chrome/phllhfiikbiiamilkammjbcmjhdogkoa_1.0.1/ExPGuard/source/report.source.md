# Source-level Taint Flow — phllhfiikbiiamilkammjbcmjhdogkoa 1.0.1

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/background/background` L334:C14 -> L334:C20  `console.log(»action«);`
- **Sink(s)**:
  - `CHROME_ACTION_TITLE_OPTIONS` — `src/background/background` L321:C2 -> L321:C63  `»chrome.action.setTitle({ title: newOrdersTooltip }, () => {})«;`
  - `CHROME_ACTION_BADGE_OPTIONS` — `src/background/background` L323:C2 -> L323:C54  `»chrome.action.setBadgeText({ text: `${badgeText}` })«;`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `src/background/background` L411:C8 -> L414:C10 (spans to L414)  `»sendResponse({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (121 raw steps → 14 distinct lines):
   1. L334 `console.log(»action«);`  · ASSIGN:identifier
   2. L353 `if (»!action«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L362 `switch (»action.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   4. L376 `»action.newOrdersTooltip«,`  · ASSIGN:identifier, ELEMENT:member-element
   5. L377 `»action.newOrdersTotal«,`  · ASSIGN:identifier, ELEMENT:member-element
   6. L378 `»action.orderId«,`  · ASSIGN:identifier, ELEMENT:member-element
   7. L379 `»action.partnerId«,`  · ASSIGN:identifier, ELEMENT:member-element
   8. L321 `»chrome.action.setTitle({ title: newOrdersTooltip }, () => {})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L322 `const badgeText = newOrdersTotal > 0 ? »newOrdersTotal« : '';`  · ASSIGN:identifier, ASSIGN:conditional-consequent
  10. L323 `»chrome.action.setBadgeText({ text: `${badgeText}` })«;`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
  11. L324 `if (»orderId« != null) {`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L325 `focusApp(»orderId, partnerId«);`  · ASSIGN:identifier
  13. L413 `result: »`Action ${action.type} not found.`«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  14. L411 (→L414) `»        sendResponse({«`  · ELEMENT:object.setProperty

---
