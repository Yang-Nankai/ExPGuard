# Source-level Taint Flow — aaidjeidbnhpjhblbianjeghjopbimmk 4.1.0

- Source type: CRX
- Files with issues: 4 / 6
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `extras/background` L666:C6 -> L666:C9  `if (»msg«.msg === "openSupportChat") {`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `extras/background` L667:C10 -> L669:C6 (spans to L669)  `await »chrome.tabs.create({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `extras/background` L673:C10 -> L676:C6 (spans to L676)  `await »chrome.tabs.create({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `extras/background` L679:C10 -> L685:C6 (spans to L685)  `await »chrome.tabs.create({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `extras/background` L689:C10 -> L691:C6 (spans to L691)  `await »chrome.tabs.create({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `extras/background` L725:C12 -> L725:C61  `await »chrome.storage.sync.set({ [msg.key]: msg.value })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (179 raw steps → 29 distinct lines):
   1. L666 `if (»msg.msg« === "openSupportChat") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L668 `url: "/extras/support/chat/index.html?code=" + »msg.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   3. L667 (→L669) `»    await chrome.tabs.create({«`  · ELEMENT:object.setProperty
   4. L672 `if (»msg.msg« === "openPong") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L675 `»"/api/april/pong/index.html?username=" + msg.username + "&id=" + msg.id«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
   6. L673 (→L676) `»    await chrome.tabs.create({«`  · ELEMENT:object.setProperty
   7. L678 `if (»msg.msg« === "openDashboardPage") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L682 `»msg.token« +`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   9. L681 (→L683) `»        "/extras/dashboard/index.html?code=" +«`  · ASSIGN:binary-left
  10. L684 `»msg.username«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  11. L679 (→L685) `»    await chrome.tabs.create({«`  · ELEMENT:object.setProperty
  12. L688 `if (»msg.msg« === "openFeedbackPage") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L690 `url: "/extras/feedback/index.html?code=" + »msg.token«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  14. L689 (→L691) `»    await chrome.tabs.create({«`  · ELEMENT:object.setProperty
  15. L694 `if (»msg« === "openSettings") {`  · ASSIGN:identifier, ASSIGN:binary-left
  16. L699 `if (»msg« === "returnToTab") {`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L702 `if (»msg.source« === "message-api") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L703 `if (»msg.message?.startsWith("request-perms")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L704 `let perms = »msg.content«;`  · ASSIGN:identifier, ELEMENT:member-element
  20. L706 (→L720) `chrome.permissions.request({ permissions: »perms }, async (granted) => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  21. L724 `if (»msg.message« === "storageSet") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L725 `»await chrome.storage.sync.set({ [msg.key]: msg.value })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  23. L727 `if (»msg.message« === "storageGet") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L728 `var data = (await chrome.storage.sync.get(»msg.key))?.[msg.key«] || null;`  · ASSIGN:identifier, ELEMENT:member-element
  25. L730 `args: [»msg.key«, data],`  · ASSIGN:identifier, ELEMENT:member-element
  26. L729 (→L734) `»      await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  27. L710 `args: [isComplete, »msg.uuid«],`  · ASSIGN:identifier, ELEMENT:member-element
  28. L709 (→L714) `»        await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  29. L716 `ScratchTools.MESSAGES.find((el) => el.uuid === »uuid«).resolve(`  · ASSIGN:identifier, ASSIGN:binary-right

---
