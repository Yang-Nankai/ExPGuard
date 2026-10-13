# Source-level Taint Flow — jjjoiagdgjhecijlkfkipeilgfgbhkgc 0.012

- Source type: CRX
- Files with issues: 4 / 7
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L29:C8 -> L29:C15  `if (»request«.code == "ping_from_web") {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L49:C8 -> L49:C37  `»chrome.storage.local.set(obj)«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L122:C12 -> L124:C14 (spans to L124)  `»chrome.storage.local.set(obj, function() {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (290 raw steps → 25 distinct lines):
   1. L29 `if (»request.code« == "ping_from_web") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L34 `} else if (»request.code« == "get_from_web") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L35 `console.log("RECEIVED get_from_web", »request.keys«)`  · ASSIGN:identifier, ELEMENT:member-element
   4. L40 `} else if (»request.code« == "set_from_web") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L37 `chrome.storage.local.get(»request.keys«, function(items) {`  · ASSIGN:identifier, ELEMENT:member-element
   6. L54 `} else if (»request.code« == "get_chrx_progress") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L79 `} else if (»request.code« == "overwrite_web") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L43 `for (»let key in request.obj«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
   9. L95 `} else if (»request.code« == "clear_storage_data") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L44 `let »val = to_num(request.obj[key])«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:implicit.add
  11. L5 `if (»x« == null) return null;`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L6 `if (»x« === false) return false;`  · ASSIGN:identifier, ASSIGN:binary-left
  13. L7 `if (»x« === true) return true;`  · ASSIGN:identifier, ASSIGN:binary-left
  14. L9 `let n = (»+x«);`  · ASSIGN:identifier, ASSIGN:unary
  15. L10 `if (»!isNaN(n)«) {`  · ASSIGN:identifier, RETURN:isNaN, ASSIGN:unary
  16. L11 `return »n«;`  · ASSIGN:identifier
  17. L13 `return »x«;`  · ASSIGN:identifier
  18. L105 `} else if (»request.code« == "overwrite_chrx") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L45 `obj[»key«] = val;`  · ASSIGN:identifier
  20. L42 `var »obj = {}«;`  · ELEMENT:object.setProperty
  21. L128 `} else if (»request.code« == "save_sync") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L117 `for (»let key in request.new_data«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  23. L118 `let »val = to_num(request.new_data[key])«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:implicit.add
  24. L119 `obj[»key«] = val;`  · ASSIGN:identifier
  25. L116 `var »obj = {}«;`  · ELEMENT:object.setProperty

---
