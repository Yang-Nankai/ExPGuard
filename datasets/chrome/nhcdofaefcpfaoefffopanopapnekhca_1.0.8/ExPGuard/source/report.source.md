# Source-level Taint Flow — nhcdofaefcpfaoefffopanopapnekhca 1.0.8

- Source type: CRX
- Files with issues: 4 / 6
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `bg` L87:C8 -> L87:C15  `if (»message«.source === 'supabase-auth-adapter') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `bg` L61:C6 -> L61:C36  `»port.postMessage(notification)«;`
  - `CHROME_SYNC_STORAGE` (unknown) — `bg` L115:C12 -> L130:C14 (spans to L130)  `»chrome.storage.sync.set({ [key]: value }, () => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 18 distinct lines):
   1. L87 `if (»message.source« === 'supabase-auth-adapter') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L88 `switch (»message.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L168 `} else if (»message.type« === 'broadcast') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L169 `notifyConnectedClients(»message.data || message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   5. L61 `port.postMessage(»notification«);`  · ASSIGN:identifier
   6. L95 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
   7. L96 `chrome.storage.sync.get(»key«, result => {`  · ASSIGN:identifier
   8. L102 `sendResponse({ status: 'success', value: result[»key«] || null });`  · ASSIGN:identifier
   9. L114 `const { »key, value } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
  10. L115 (→L130) `chrome.storage.sync.set({ [»key]: value }, () => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L125 `»key«,`  · ASSIGN:identifier
  12. L122 (→L128) `»                notifyConnectedClients({«`  · ELEMENT:object.setProperty
  13. L126 `»value«,`  · ASSIGN:identifier
  14. L140 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
  15. L141 `chrome.storage.sync.remove(»key«, () => {`  · ASSIGN:identifier
  16. L164 `console.warn('Unknown action:', »message.action«);`  · ASSIGN:identifier, ELEMENT:member-element
  17. L150 `»key«,`  · ASSIGN:identifier
  18. L147 (→L152) `»                notifyConnectedClients({«`  · ELEMENT:object.setProperty

---
