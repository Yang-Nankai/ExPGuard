# Source-level Taint Flow — cpofhfeclnhnhodbcabgcihloffdpgpd 1.1.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 19 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L503:C17 -> L503:C24  `_t = »request«.action;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (current) — `background` L628:C12 -> L636:C14 (spans to L636)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (animationType) — `background` L628:C12 -> L636:C14 (spans to L636)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (animationType) — `background` L643:C14 -> L668:C16 (spans to L668)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (duration) — `background` L676:C14 -> L701:C16 (spans to L701)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (196 raw steps → 22 distinct lines):
   1. L503 `_t = »request.action«;`  · ASSIGN:identifier, ELEMENT:member-element
   2. L579 `data = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L596 `_data = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L626 `_data2 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L598 `current.pattern = »_data.pattern«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L627 `»_data2.trailItem.animationType = _data2.animationType«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L639 `_data3 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   8. L629 `current: »_data2.trailItem«,`  · ASSIGN:identifier, ELEMENT:member-element
   9. L628 (→L636) `»            chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  10. L630 `animationType: »_data2.animationType«`  · ASSIGN:identifier, ELEMENT:member-element
  11. L642 `current.animationType = »_data3.animationType«;`  · ASSIGN:identifier, ELEMENT:member-element
  12. L645 `animationType: »_data3.animationType«`  · ASSIGN:identifier, ELEMENT:member-element
  13. L643 (→L668) `»              chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  14. L672 `_data4 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
  15. L675 `current.duration = »_data4.duration«;`  · ASSIGN:identifier, ELEMENT:member-element
  16. L678 `duration: »_data4.duration«`  · ASSIGN:identifier, ELEMENT:member-element
  17. L676 (→L701) `»              chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  18. L705 `_data5 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
  19. L706 `storage.collections.push(»_data5.collection«);`  · ASSIGN:identifier, ELEMENT:member-element
  20. L718 `return (0,_actions_getConfig__WEBPACK_IMPORTED_MODULE_2__.setConfig)(»request.data«).then(function (data) {`  · ASSIGN:identifier, ELEMENT:member-element
  21. L582 `if (collection.id == »data.item.collectionId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  22. L583 `collection.items.push(»data.item«);`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('current') in background)  ·  18× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L503:C17 -> L503:C24  `_t = »request«.action;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (current) — `background` L643:C14 -> L668:C16 (spans to L668)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (current) — `background` L676:C14 -> L701:C16 (spans to L701)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (206 raw steps → 24 distinct lines):
   1. L503 `_t = »request.action«;`  · ASSIGN:identifier, ELEMENT:member-element
   2. L579 `data = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   3. L596 `_data = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L626 `_data2 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L598 `current.pattern = »_data.pattern«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L627 `»_data2.trailItem.animationType = _data2.animationType«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L639 `_data3 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   8. L629 `current: »_data2.trailItem«,`  · ASSIGN:identifier, ELEMENT:member-element
   9. L628 (→L636) `»            chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  10. L630 `animationType: »_data2.animationType«`  · ASSIGN:identifier, ELEMENT:member-element
  11. L642 `»current.animationType = _data3.animationType«;`  · ASSIGN:identifier, ELEMENT:member-element
  12. L645 `animationType: »_data3.animationType«`  · ASSIGN:identifier, ELEMENT:member-element
  13. L643 (→L668) `»              chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  14. L672 `_data4 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
  15. L675 `current.duration = »_data4.duration«;`  · ASSIGN:identifier, ELEMENT:member-element
  16. L678 `duration: »_data4.duration«`  · ASSIGN:identifier, ELEMENT:member-element
  17. L676 (→L701) `»              chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  18. L705 `_data5 = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
  19. L706 `storage.collections.push(»_data5.collection«);`  · ASSIGN:identifier, ELEMENT:member-element
  20. L718 `return (0,_actions_getConfig__WEBPACK_IMPORTED_MODULE_2__.setConfig)(»request.data«).then(function (data) {`  · ASSIGN:identifier, ELEMENT:member-element
  21. L582 `if (collection.id == »data.item.collectionId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  22. L583 `collection.items.push(»data.item«);`  · ASSIGN:identifier, ELEMENT:member-element
  23. L640 (→L669) `»            chrome.storage.local.get(['current'], function (_ref2) {«`  · STORAGE:STORAGE_FLOW[area: local, key: current, sender: background, receiver: background]
  24. L644 `current: »current«,`  · ASSIGN:identifier

---
