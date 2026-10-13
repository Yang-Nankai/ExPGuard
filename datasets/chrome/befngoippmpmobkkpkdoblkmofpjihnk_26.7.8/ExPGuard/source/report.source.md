# Source-level Taint Flow — befngoippmpmobkkpkdoblkmofpjihnk 26.7.8

- Source type: CRX
- Files with issues: 7 / 16
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `prospector/background-worker/prospector-open-popup` L48:C10 -> L48:C17  `switch (»message«.type) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (popupLeftPosition) — `prospector/background-worker/prospector-open-popup` L50:C6 -> L50:C67  `»chrome.storage.local.set({ popupLeftPosition: message.left })«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L48 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L50 `»chrome.storage.local.set({ popupLeftPosition: message.left })«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   3. L53 `if (»message.page) self.sendMessageToPopup(message«, sender, true)`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `prospector/background-worker/prospector-open-popup` L14:C0 -> L14:C64  `»chrome.runtime.onMessage.addListener(handleIncomingPopupMessage)«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (popupLeftPosition) — `prospector/background-worker/prospector-open-popup` L50:C6 -> L50:C67  `»chrome.storage.local.set({ popupLeftPosition: message.left })«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (143 raw steps → 4 distinct lines):
   1. L14 `»chrome.runtime.onMessage.addListener(handleIncomingPopupMessage)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[meta/on-message-external->prospector/background-worker/prospector-open-popup]`
   2. L48 `switch (»message.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L50 `»chrome.storage.local.set({ popupLeftPosition: message.left })«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   4. L53 `if (»message.page) self.sendMessageToPopup(message«, sender, true)`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `meta/on-message-external` L1:C57 -> L1:C61  `function asyncHandler (fn) { return (...args) => { fn(...»args«); return true } }`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `meta/on-message-external` L319:C35 -> L319:C54  `const response = await »fetch(url, options)«`  (url-control=FULL)
  - `FETCH_OPTIONS` ([Unknown URL]) — `meta/on-message-external` L319:C35 -> L319:C54  `const response = await »fetch(url, options)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (336 raw steps → 26 distinct lines):
   1. L1 `function asyncHandler (fn) { return (...args) => { fn(...»args«); return true } }`  · ASSIGN:identifier
   2. L6 `console.info('Received external message', »request.type«)`  · ASSIGN:identifier, ELEMENT:member-element
   3. L9 `if (»!request || (!request.type && !request.relay)«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   4. L10 `console.warn('Received message without type or relay', »request«)`  · ASSIGN:identifier
   5. L17 `if (»request.relay«) {`  · ASSIGN:identifier, ELEMENT:member-element
   6. L18 `chrome.tabs.sendMessage(sender.tab.id, »request.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
   7. L26 `switch (»request.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   8. L39 `self.sendRequestToTabs('CACHE_PARSER_OUTPUT', »request.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
   9. L50 `const { »permissions } = request«`  · ASSIGN:identifier, ELEMENT:destructure-property[permissions]
  10. L51 `syncResponse = await chrome.permissions.contains(»permissions«)`  · ASSIGN:identifier
  11. L165 `args: [»request.config«]`  · ASSIGN:identifier, ELEMENT:member-element
  12. L162 (→L166) `»          const results = await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  13. L189 `const { »subject, body } = request«`  · ASSIGN:identifier, ELEMENT:destructure-property[subject], ELEMENT:destructure-property[body]
  14. L224 `await chrome.tabs.sendMessage(tab.id, »request«)`  · ASSIGN:identifier
  15. L197 `args: [{ »subject, body }, request.config«]`  · ASSIGN:identifier, ELEMENT:member-element
  16. L194 (→L198) `»          const results = await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  17. L250 `const { »permissions } = request«`  · ASSIGN:identifier, ELEMENT:destructure-property[permissions]
  18. L256 `chrome.permissions.contains(»permissions«, hasPermissions => {`  · ASSIGN:identifier
  19. L274 `chrome.tabs.sendMessage(sender.tab.id, »request«)`  · ASSIGN:identifier
  20. L279 `chrome.tabs.sendMessage(sender.tab.id, »request«)`  · ASSIGN:identifier
  21. L315 `const { »url, options } = request.payload«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[url], ELEMENT:destructure-property[options]
  22. L319 `const response = await fetch(»url, options«)`  · ASSIGN:identifier
  23. L343 `self.openLandoUi(»request.prompt«)`  · ASSIGN:identifier, ELEMENT:member-element
  24. L321 `if (»request.type« === 'FETCH_TEXT') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L323 `} else if (»request.type« === 'FETCH_JSON') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  26. L261 `chrome.permissions.request(»permissions«, granted => {`  · ASSIGN:identifier

---
