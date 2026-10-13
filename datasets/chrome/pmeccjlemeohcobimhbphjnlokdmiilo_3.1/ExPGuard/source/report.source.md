# Source-level Taint Flow — pmeccjlemeohcobimhbphjnlokdmiilo 3.1

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L183:C8 -> L183:C15  `if (»message«.source === 'supabase-auth-adapter') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `background` L157:C6 -> L157:C36  `»port.postMessage(notification)«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L242:C14 -> L257:C16 (spans to L257)  `»chrome.storage.local.set({ [key]: value }, () => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (95 raw steps → 25 distinct lines):
   1. L183 `if (»message.source« === 'supabase-auth-adapter') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L184 `switch (»message.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L310 `} else if (»message.type« === 'broadcast') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L311 `notifyConnectedClients(»message.data || message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   5. L157 `port.postMessage(»notification«);`  · ASSIGN:identifier
   6. L191 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
   7. L194 `chrome.storage.local.get(»key«, result => {`  · ASSIGN:identifier
   8. L200 `const localValue = result[»key«];`  · ASSIGN:identifier
   9. L208 `chrome.storage.sync.get(»key«, syncResult => {`  · ASSIGN:identifier
  10. L214 `sendResponse({ status: 'success', value: syncResult[»key«] || null });`  · ASSIGN:identifier
  11. L228 `const { »key, value } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
  12. L229 `chrome.storage.local.get(»key«, currentResult => {`  · ASSIGN:identifier
  13. L235 `const currentValue = currentResult ? currentResult[»key«] : undefined;`  · ASSIGN:identifier
  14. L236 `if (currentValue === »value«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  15. L242 (→L257) `chrome.storage.local.set({ [»key]: value }, () => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L252 `»key«,`  · ASSIGN:identifier
  17. L249 (→L255) `»                  notifyConnectedClients({«`  · ELEMENT:object.setProperty
  18. L253 `»value«,`  · ASSIGN:identifier
  19. L268 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
  20. L269 `chrome.storage.local.get(»key«, currentResult => {`  · ASSIGN:identifier
  21. L276 `const hadKey = currentResult && Object.prototype.hasOwnProperty.call(currentResult, »key«);`  · ASSIGN:identifier
  22. L282 `chrome.storage.local.remove(»key«, () => {`  · ASSIGN:identifier
  23. L306 `console.warn('Unknown action:', »message.action«);`  · ASSIGN:identifier, ELEMENT:member-element
  24. L291 `»key«,`  · ASSIGN:identifier
  25. L288 (→L293) `»                  notifyConnectedClients({«`  · ELEMENT:object.setProperty

---
