# Source-level Taint Flow — phgddhgfnjjaobkeekohieahfingldac 5.14.1.142

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(fdWebExtension.saveToStorage))

- **Source**: `TARGET_CUSTOM_EVENT` — `content-script` L50:C14 -> L50:C22  `var key = »e.detail«.key;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content-script` L53:C4 -> L53:C46  `»chrome.storage.local.set({ [key]: value })«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (7 raw steps → 3 distinct lines):
   1. L50 `var key = »e.detail.key«;`  · ELEMENT:member-element
   2. L51 `var value = »e.detail.value«;`  · ELEMENT:member-element
   3. L53 `»chrome.storage.local.set({ [key]: value })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(fdWebExtension.multipleConnectionSupport))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L301:C0 -> L339:C2 (spans to L339)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (fdWebExtension.multipleConnectionSupport) — `background` L88:C2 -> L88:C80  `»chrome.storage.local.set({'fdWebExtension.multipleConnectionSupport':enabled})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (22 raw steps → 9 distinct lines):
   1. L301 (→L339) `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content-script->background]`
   2. L305 `if (»isSupported« !== wasSupported) {`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L306 `storeMultipleConnectionSupport(»isSupported«);`  · ASSIGN:identifier
   4. L87 `multipleConnectionSupport = »enabled«;`  · ASSIGN:identifier
   5. L88 `»chrome.storage.local.set({'fdWebExtension.multipleConnectionSupport':enabled})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L307 `if (»!isSupported«) {`  · ASSIGN:identifier, ASSIGN:unary
   7. L93 `if (»multipleConnectionSupport« !== undefined) {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L94 `console.log(»`multiple connection support not undefined: ${multipleConnectionSupport}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
   9. L95 `resolve(»multipleConnectionSupport«);`  · ASSIGN:identifier

---
