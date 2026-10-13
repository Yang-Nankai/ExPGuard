# Source-level Taint Flow — fkhddgplfbdjopphepkohfgdkikfleai 1.0.9

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L356:C32 -> L356:C39  `queueWork(() => handleCommand(»request«.command, request.params || {}, sender, sendResponse));`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L315:C4 -> L315:C74  `»sendResponse({ success: false, error: 'Unknown command: ' + command })«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L257:C29 -> L262:C8 (spans to L262)  `const response = await »fetch(`${backend}/o/${orgId}/settings/calls/agent/surf-behind`, {«`  (url-control=PARTIAL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L257:C29 -> L262:C8 (spans to L262)  `const response = await »fetch(`${backend}/o/${orgId}/settings/calls/agent/surf-behind`, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L308:C29 -> L308:C39  `const response = await »fetch(url)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (293 raw steps → 18 distinct lines):
   1. L356 `queueWork(() => handleCommand(»request.command, request.params || {}«, sender, sendResponse));`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   2. L244 `if (»command« === 'activateMerchant') {`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L245 `const { »orgId, idToken, defaultOrigin« } = params;`  · ELEMENT:destructure-property[orgId], ELEMENT:destructure-property[idToken], ELEMENT:destructure-property[defaultOrigin]
   4. L292 `} else if (»command« === 'fetchMerchantHTML') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L246 `if (»!orgId || !idToken«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   6. L293 `const { »url« } = params;`  · ELEMENT:destructure-property[url]
   7. L315 `»sendResponse({ success: false, error: 'Unknown command: ' + command })«;`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty
   8. L294 `if (»!url«) {`  · ASSIGN:identifier, ASSIGN:unary
   9. L257 (→L262) `const response = await fetch(»`${backend}/o/${orgId}/settings/calls/agent/surf-behind`, {«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
  10. L260 `Authorization: »`Bearer ${idToken}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  11. L303 `if (!isEnabledOrigin(»url«, enabledTab.surfBehind.origins)) {`  · ASSIGN:identifier
  12. L344 `const »url = new URL(sourceUrl)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor
  13. L345 `if (origins.includes(»url.host«)) return true;`  · ELEMENT:member-element
  14. L346 `const parts = »url.host.split('.')«;`  · ELEMENT:member-element, RETURN:fallback-return
  15. L347 `while (»parts.length« > 1) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  16. L348 `»parts.shift()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L349 `if (origins.includes(»parts.join('.')«)) return true;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L308 `const response = await fetch(»url«);`  · ASSIGN:identifier

---
