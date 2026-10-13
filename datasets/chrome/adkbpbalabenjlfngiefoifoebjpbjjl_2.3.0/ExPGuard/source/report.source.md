# Source-level Taint Flow — adkbpbalabenjlfngiefoifoebjpbjjl 2.3.0

- Source type: CRX
- Files with issues: 2 / 6
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/extension-worker` L733:C12 -> L733:C19  `if (»message«.source === 'supabase-auth-adapter') {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` (chrome.runtime.onConnectExternal.addListener[postMessage]) — `js/extension-worker` L705:C12 -> L705:C42  `»port.postMessage(notification)«;`
  - `CHROME_SYNC_STORAGE` (unknown) — `js/extension-worker` L761:C24 -> L776:C26 (spans to L776)  `»chrome.storage.sync.set({ [key]: value }, () => {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 18 distinct lines):
   1. L733 `if (»message.source« === 'supabase-auth-adapter') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L734 `switch (»message.action«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L814 `} else if (»message.type« === 'broadcast') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L815 `notifyConnectedClients(»message.data || message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   5. L705 `port.postMessage(»notification«);`  · ASSIGN:identifier
   6. L741 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
   7. L742 `chrome.storage.sync.get(»key«, result => {`  · ASSIGN:identifier
   8. L748 `sendResponse({ status: 'success', value: result[»key«] || null });`  · ASSIGN:identifier
   9. L760 `const { »key, value } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key], ELEMENT:destructure-property[value]
  10. L761 (→L776) `chrome.storage.sync.set({ [»key]: value }, () => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  11. L771 `»key«,`  · ASSIGN:identifier
  12. L768 (→L774) `»                                notifyConnectedClients({«`  · ELEMENT:object.setProperty
  13. L772 `»value«,`  · ASSIGN:identifier
  14. L786 `const { »key } = message.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[key]
  15. L787 `chrome.storage.sync.remove(»key«, () => {`  · ASSIGN:identifier
  16. L810 `console.warn('Unknown action:', »message.action«);`  · ASSIGN:identifier, ELEMENT:member-element
  17. L796 `»key«,`  · ASSIGN:identifier
  18. L793 (→L798) `»                                notifyConnectedClients({«`  · ELEMENT:object.setProperty

---
