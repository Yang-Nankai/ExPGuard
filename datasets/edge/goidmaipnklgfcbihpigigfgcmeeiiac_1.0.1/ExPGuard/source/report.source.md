# Source-level Taint Flow — goidmaipnklgfcbihpigigfgcmeeiiac 1.0.1

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/chrome/service-worker` L81:C6 -> L81:C7  `if (»e«.type === "CAVE_MODIFY_HEADERS") {`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `scripts/chrome/service-worker` L134:C4 -> L137:C6 (spans to L137)  `»chrome.declarativeNetRequest.updateSessionRules({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (69 raw steps → 17 distinct lines):
   1. L81 `if (»e.type« === "CAVE_MODIFY_HEADERS") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L83 `console.log("Event", »e«);`  · ASSIGN:identifier
   3. L88 `const reqHeaderData = »e.req_data«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L89 `const resHeaderData = »e.res_data«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L91 `const refererIndex = »reqHeaderData.findIndex(item => item.key == "Referer")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L92 `const originIndex = »reqHeaderData.findIndex(item => item.key == "Origin")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L94 `if (»refererIndex !== -1 && originIndex === -1«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L95 (→L98) `»reqHeaderData.push({«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, RETURN:fallback-return
   9. L97 `value: »`${reqHeaderData[refererIndex].value}`«,`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:template-literal
  10. L101 `if (»refererIndex« !== -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L102 `»reqHeaderData[refererIndex].value = `${reqHeaderData[refererIndex].value}/`«;`  · ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:template-literal
  12. L105 (→L109) `const reqHeaderRules = »reqHeaderData.map(header => ({«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L111 (→L115) `const resHeaderRules = »resHeaderData.map(header => ({«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L123 `requestHeaders: »reqHeaderRules«,`  · ASSIGN:identifier
  15. L117 (→L132) `»    const rules = [«`  · ELEMENT:object.setProperty
  16. L124 `responseHeaders: »resHeaderRules«,`  · ASSIGN:identifier
  17. L134 (→L137) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty

---
