# Source-level Taint Flow — denohmphfiepkgihlobkpmkbdhgmjigf 3.3.2

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/extension-worker` L221:C16 -> L221:C23  `if (»message«.source === 'supabase-auth-adapter') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `js/extension-worker` L192:C12 -> L192:C42  `»port.postMessage(notification)«;`
  - `CHROME_SYNC_STORAGE` (unknown) — `js/extension-worker` L259:C28 -> L278:C30 (spans to L278)  `»chrome.storage.sync.set({ [key]: value }, () => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 18 distinct lines):
   1. L221 `if (»message.source« === 'supabase-auth-adapter') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L222 `switch (»message.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L329 `} else if (»message.type« === 'broadcast') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L330 `notifyConnectedClients(»message.data || message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   5. L192 `port.postMessage(»notification«);`  · ASSIGN:identifier
   6. L229 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
   7. L230 `chrome.storage.sync.get(»key«, (result) => {`  · ASSIGN:identifier
   8. L242 `value: result[»key«] || null,`  · ASSIGN:identifier
   9. L258 `const { »key, value } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
  10. L259 (→L278) `chrome.storage.sync.set({ [»key]: value }, () => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L273 `»key«,`  · ASSIGN:identifier
  12. L270 (→L276) `»                                    notifyConnectedClients({«`  · ELEMENT:object.setProperty
  13. L274 `»value«,`  · ASSIGN:identifier
  14. L291 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
  15. L292 `chrome.storage.sync.remove(»key«, () => {`  · ASSIGN:identifier
  16. L322 `console.warn('Unknown action:', »message.action«);`  · ASSIGN:identifier, ELEMENT:member-element
  17. L305 `»key«,`  · ASSIGN:identifier
  18. L302 (→L307) `»                                    notifyConnectedClients({«`  · ELEMENT:object.setProperty

---
