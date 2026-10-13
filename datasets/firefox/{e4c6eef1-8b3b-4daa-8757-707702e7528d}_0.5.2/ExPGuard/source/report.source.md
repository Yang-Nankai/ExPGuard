# Source-level Taint Flow — {e4c6eef1-8b3b-4daa-8757-707702e7528d} 0.5.2

- Source type: XPI
- Files with issues: 1 / 1
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `worker` L349:C16 -> L349:C23  `console.log(»request«);`
- **Sink(s)**:
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `worker` L188:C20 -> L193:C4 (spans to L193)  `const win = await »chrome.windows.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (74 raw steps → 20 distinct lines):
   1. L349 `console.log(»request«);`  · ASSIGN:identifier
   2. L351 `if (»request.cmd« === 'request-ocr') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L352 `»request«.agent = true; // to let the popup window know it needs to connect to this port`  · ASSIGN:identifier
   4. L371 `else if (»request.cmd« === 'close') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L366 `win = await standalone(»request«);`  · ASSIGN:identifier
   6. L171 `»image = ''«,`  · ELEMENT:destructure-property[image]
   7. L172 `»proceed = false«,`  · ELEMENT:destructure-property[proceed]
   8. L173 `»selector = false«,`  · ELEMENT:destructure-property[selector]
   9. L174 `»agent = false«,`  · ELEMENT:destructure-property[agent]
  10. L175 `»title = ''«,`  · ELEMENT:destructure-property[title]
  11. L176 `»message = ''«`  · ELEMENT:destructure-property[message]
  12. L180 `»args.set('proceed', proceed)«;`  · ASSIGN:identifier, RETURN:URLSearchParams.append
  13. L181 `»args.set('selector', selector)«;`  · ELEMENT:member-element-container, ASSIGN:identifier, RETURN:URLSearchParams.append
  14. L182 `»args.set('agent', agent)«;`  · ELEMENT:member-element-container, ASSIGN:identifier, RETURN:URLSearchParams.append
  15. L183 `»args.set('title', title || 'OCR for Local Images')«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ASSIGN:logical-left, RETURN:URLSearchParams.append
  16. L184 `if (»message«) {`  · ASSIGN:identifier
  17. L185 `»args.set('message', message)«;`  · ELEMENT:member-element-container, ASSIGN:identifier, RETURN:URLSearchParams.append
  18. L189 `url: '/data/blank/index.html?' + »args.toString()«,`  · ELEMENT:member-element-container, RETURN:URLSearchParams.toString, ASSIGN:binary-right
  19. L188 (→L193) `»  const win = await chrome.windows.create({«`  · ELEMENT:object.setProperty
  20. L194 `internals.set(win.tabs[0].id, »image«);`  · ASSIGN:identifier

---
