# Source-level Taint Flow — {57081fef-67b4-482f-bcb0-69296e63ec4f} 0.3.0

- Source type: XPI
- Files with issues: 1 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L433:C28 -> L433:C35  `console.log('Register', »request«, sender);`
- **Sink(s)**:
  - `WEBSOCKET_DATA` — `background` L402:C4 -> L402:C73  `»websocket.send(JSON.stringify({action: 'party', listener: listener}))«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (35 raw steps → 12 distinct lines):
   1. L433 `console.log('Register', »request«, sender);`  · ASSIGN:identifier
   2. L468 `switch (»request.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L502 `console.error('Unknown runtime message', »request«, sender);`  · ASSIGN:identifier
   4. L441 `}else if(»request.mode« == 'passive'){`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L470 `console.log('party', »request«);`  · ASSIGN:identifier
   6. L472 `clientId: »request.clientId«,`  · ASSIGN:identifier, ELEMENT:member-element
   7. L471 (→L474) `partyListener[»request.clientId] = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element
   8. L398 `var »partyListener = {}«;`  · ELEMENT:object.setProperty
   9. L400 `var »listener = Object.values(partyListener)«;`  · ELEMENT:object.setProperty
  10. L401 `if(»listener.length«) {`  · ELEMENT:member.length
  11. L402 `»websocket.send(JSON.stringify({action: 'party', listener: listener}))«;`  · ELEMENT:object.setProperty, RETURN:json.stringify
  12. L498 `console.error('Unknown runtime action', »request«, sender);`  · ASSIGN:identifier

---
