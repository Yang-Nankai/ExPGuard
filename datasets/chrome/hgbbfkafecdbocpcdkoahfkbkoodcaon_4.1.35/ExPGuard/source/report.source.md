# Source-level Taint Flow — hgbbfkafecdbocpcdkoahfkbkoodcaon 4.1.35

- Source type: CRX
- Files with issues: 4 / 7
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 20 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `compiledBackgroundScript` L1541:C12 -> L1541:C19  `if (»message«.action === constants_1.MS_RESTART_ACTION) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `compiledBackgroundScript` L1551:C39 -> L1551:C57  `const response = await »fetch(message.url)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (187 raw steps → 13 distinct lines):
   1. L1541 `if (»message.action« === constants_1.MS_RESTART_ACTION) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L1545 `if (»message.action« === constants_1.MS_RELOAD_ACTION) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L1549 `if (»message.action« === "get-image-data") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L1551 `const response = await fetch(»message.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L1562 `if (»message.project« === "moonsift-web") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L1563 `if (»message.action« === "auth-logout") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L1586 `if (»message.protocol« === "harlinator") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L1567 `if (»message.action« === "auth-check") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   9. L1589 `harlinatorAPI.receiveApi(»message.message«, sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element
  10. L1572 `if (»message.action« === "auth-login") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L1569 `firebaseLink.authCheck(»message.authUserUID«, sender.tab.id);`  · ASSIGN:identifier, ELEMENT:member-element
  12. L1573 `firebaseLink.authenticate(»message.token«);`  · ASSIGN:identifier, ELEMENT:member-element
  13. L1576 `if (»message.type === "front-end" && message.action === "ping"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right

---
