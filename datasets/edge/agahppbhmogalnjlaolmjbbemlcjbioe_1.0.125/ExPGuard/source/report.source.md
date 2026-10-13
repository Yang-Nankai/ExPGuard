# Source-level Taint Flow — agahppbhmogalnjlaolmjbbemlcjbioe 1.0.125

- Source type: CRX
- Files with issues: 2 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content_scripts/loader` L117:C11 -> L117:C26  `if ((»event.data.type« || false) == false)`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L124:C12 -> L128:C19 (spans to L128)  `»window.postMessage({«`
  - `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) — `content_scripts/loader` L133:C10 -> L138:C12 (spans to L138)  `»chrome.storage.sync.set(event.data.payload, function() {«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L134:C12 -> L137:C19 (spans to L137)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L161:C12 -> L165:C19 (spans to L165)  `»window.postMessage({«`
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content_scripts/loader` L170:C10 -> L175:C12 (spans to L175)  `»chrome.storage.local.set(event.data.payload, function() {«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L171:C12 -> L174:C19 (spans to L174)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L143:C12 -> L146:C19 (spans to L146)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L152:C12 -> L155:C19 (spans to L155)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L180:C12 -> L183:C19 (spans to L183)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L189:C12 -> L192:C19 (spans to L192)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (98 raw steps → 24 distinct lines):
   1. L117 `if ((»event.data.type || false«) == false)`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:binary-left
   2. L120 `switch (»event.data.type«)`  · ELEMENT:member-element
   3. L123 `chrome.storage.sync.get(»event.data.payload«, function(result) {`  · ELEMENT:member-element
   4. L126 `callbackIndex: »event.data.callbackIndex«,`  · ELEMENT:member-element
   5. L124 (→L128) `»            window.postMessage({«`  · ELEMENT:object.setProperty
   6. L133 `chrome.storage.sync.set(»event.data.payload«, function() {`  · ELEMENT:member-element
   7. L136 `callbackIndex: »event.data.callbackIndex«`  · ELEMENT:member-element
   8. L134 (→L137) `»            window.postMessage({«`  · ELEMENT:object.setProperty
   9. L142 `chrome.storage.sync.remove(»event.data.payload«, function() {`  · ELEMENT:member-element
  10. L160 `chrome.storage.local.get(»event.data.payload«, function(result) {`  · ELEMENT:member-element
  11. L163 `callbackIndex: »event.data.callbackIndex«,`  · ELEMENT:member-element
  12. L161 (→L165) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  13. L170 `chrome.storage.local.set(»event.data.payload«, function() {`  · ELEMENT:member-element
  14. L173 `callbackIndex: »event.data.callbackIndex«`  · ELEMENT:member-element
  15. L171 (→L174) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  16. L179 `chrome.storage.local.remove(»event.data.payload«, function() {`  · ELEMENT:member-element
  17. L145 `callbackIndex: »event.data.callbackIndex«`  · ELEMENT:member-element
  18. L143 (→L146) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  19. L154 `callbackIndex: »event.data.callbackIndex«`  · ELEMENT:member-element
  20. L152 (→L155) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  21. L182 `callbackIndex: »event.data.callbackIndex«`  · ELEMENT:member-element
  22. L180 (→L183) `»            window.postMessage({«`  · ELEMENT:object.setProperty
  23. L191 `callbackIndex: »event.data.callbackIndex«`  · ELEMENT:member-element
  24. L189 (→L192) `»            window.postMessage({«`  · ELEMENT:object.setProperty

---
