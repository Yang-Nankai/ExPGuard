# Source-level Taint Flow — aomcoolilopomacpljconemieflcmhmg 3.0

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `background` L232:C6 -> L246:C10 (spans to L246)  `»fetch(SOURCE_DATA_URL, {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://peanuts.pro/update) — `background` L232:C6 -> L239:C8 (spans to L239)  `»fetch(SOURCE_DATA_URL, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L232 (→L246) `»      fetch(SOURCE_DATA_URL, {«`  · ELEMENT:object.setProperty
   2. L234 (→L238) `»        body: JSON.stringify({«`  · RETURN:json.stringify

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L387:C12 -> L387:C19  `switch (»request«.type) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (SETTINGS) — `background` L199:C4 -> L203:C5 (spans to L203)  `»chrome.storage.local.set(data, () =>«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5 raw steps → 2 distinct lines):
   1. L387 `switch (»request.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L389 `»setStorageData({ SETTINGS: request.data })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('SETTINGS') in background)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L387:C12 -> L387:C19  `switch (»request«.type) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (LAST_PAID_REFERRAL) — `background` L199:C4 -> L203:C5 (spans to L203)  `»chrome.storage.local.set(data, () =>«`
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L263:C8 -> L263:C54  `»chrome.tabs.create({ url: url, active: true })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (118 raw steps → 31 distinct lines):
   1. L387 `switch (»request.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L389 `»setStorageData({ SETTINGS: request.data })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   3. L208 (→L212) `»    chrome.storage.local.get(key, (result) =>«`  · STORAGE:STORAGE_FLOW[area: local, key: SETTINGS, sender: background, receiver: background]
   4. L72 `if (»!stored.SETTINGS«) {`  · ASSIGN:unary
   5. L80 `const cfg = »s.notification_cfg.monetize«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L82 (→L83) `»s.search_monetization_enabled === 0 &&«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   7. L83 `»s.unmonetized_searches >= cfg.searchesTreshold«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
   8. L87 `Date.now() - stored.LAST_UNMONETIZED < »cfg.waitingTime«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   9. L86 (→L87) `»          stored.LAST_UNMONETIZED &&«`  · ASSIGN:logical-right
  10. L94 `»cfg.title«,`  · ASSIGN:identifier, ELEMENT:member-element
  11. L96 `»cfg.message«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L97 `»cfg.goTo«`  · ASSIGN:identifier, ELEMENT:member-element
  13. L185 `{ type: type, title: »title, iconUrl: icon, message: message« },`  · ASSIGN:identifier
  14. L183 (→L194) `»  chrome.notifications.create(«`  · ELEMENT:object.setProperty
  15. L105 `const cfg = »s.notification_cfg.paidReferral«;`  · ASSIGN:identifier, ELEMENT:member-element
  16. L107 (→L108) `(»s.referred.paid > 0 && !stored.LAST_PAID_REFERRAL) ||«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  17. L108 `»s.referred.paid« > stored.LAST_PAID_REFERRAL`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L113 `»cfg.title«,`  · ASSIGN:identifier, ELEMENT:member-element
  19. L115 `»cfg.message«,`  · ASSIGN:identifier, ELEMENT:member-element
  20. L116 `»cfg.goTo«`  · ASSIGN:identifier, ELEMENT:member-element
  21. L119 `»await setStorageData({ LAST_PAID_REFERRAL: s.referred.paid })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  22. L124 `const cfg = »s.notification_cfg.newReferral«;`  · ASSIGN:identifier, ELEMENT:member-element
  23. L126 (→L127) `(»s.referred.total > 0 && !stored.LAST_NEW_REFERRAL) ||«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  24. L127 `»s.referred.total« > stored.LAST_NEW_REFERRAL`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L132 `»cfg.title«,`  · ASSIGN:identifier, ELEMENT:member-element
  26. L134 `»cfg.message«,`  · ASSIGN:identifier, ELEMENT:member-element
  27. L135 `»cfg.goTo«`  · ASSIGN:identifier, ELEMENT:member-element
  28. L138 `»await setStorageData({ LAST_NEW_REFERRAL: s.referred.total })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  29. L189 `openTab(»goTo«);`  · ASSIGN:identifier
  30. L262 `if (tab[0].url != »url«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  31. L263 `»chrome.tabs.create({ url: url, active: true })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
