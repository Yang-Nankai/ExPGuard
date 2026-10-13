# Source-level Taint Flow — fjjlkgnbokonfaiffccmofmfopdlfmmf 3.1.0

- Source type: CRX
- Files with issues: 5 / 5
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/service-worker` L110:C12 -> L110:C19  `switch (»request«.type) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `scripts/service-worker` L121:C11 -> L125:C6 (spans to L125)  `return »fetch(req.action, {«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `scripts/service-worker` L121:C11 -> L125:C6 (spans to L125)  `return »fetch(req.action, {«`
  - `FETCH_BODY` ([Unknown URL]) — `scripts/service-worker` L121:C11 -> L125:C6 (spans to L125)  `return »fetch(req.action, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (101 raw steps → 21 distinct lines):
   1. L110 `switch (»request.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   2. L112 `const req = »JSON.parse(request.data)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse
   3. L128 `state.urlExpire = »request.urlExpire«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L1 (→L6) `»let state = {«`  · ELEMENT:object.setProperty
   5. L114 `if(»req.header«){`  · ELEMENT:member-element
   6. L129 `state.iFURL = »request.data«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L115 `Object.keys(»req.header«).map(key => {`  · ELEMENT:member-element
   8. L130 `await updateRules(»request.blockURLs, request.iFHeaders«);`  · ASSIGN:identifier, ELEMENT:member-element
   9. L34 (→L48) `»blockURLs?.forEach((blockURL, index) => {«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  10. L49 `if(»iFHeaders«){`  · ASSIGN:identifier
  11. L56 `...(iFHeaders.del?.length ? »iFHeaders.del.map(h => ({ header:h, operation:'remove' }))« : []),`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  12. L57 `...(iFHeaders.add?.length ? »iFHeaders.add.map(h => ({ header:h.split(':')[0], value:h.split(':')[1], operation:'set' }))« : []),`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  13. L148 `data: »request«`  · ASSIGN:identifier
  14. L145 (→L149) `»        return chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  15. L121 (→L125) `return fetch(»req.action, {«`  · ELEMENT:member-element, ELEMENT:object.setProperty
  16. L122 `method : »req.method?.toLowerCase() ?? "get"«,`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  17. L123 `headers : »req.header«,`  · ELEMENT:member-element
  18. L124 `body : req.data ? (isJSON ? »JSON.stringify(req.data) : req.data«) : undefined`  · ELEMENT:member-element, RETURN:json.stringify, ASSIGN:conditional-alternate
  19. L135 `data: »request«`  · ASSIGN:identifier
  20. L132 (→L136) `»        return chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  21. L117 `isJSON = »req.header[key].includes«("application/json")`  · ELEMENT:member-element, ELEMENT:member-element-container

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(executeScript))

- **Source**: `TARGET_CUSTOM_EVENT` — `scripts/page-script` L12:C33 -> L12:C41  `result = (new Function(»e.detail«.code))();`
- **Sink(s)**:
  - `NEW_FUNCTION` — `scripts/page-script` L12:C20 -> L12:C47  `result = (»new Function(e.detail.code)«)();`
- **Sanitized**: NO
- **Frame**: `MAIN_scripts_page-script`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L12 `result = (new Function(»e.detail.code«))();`  · ELEMENT:member-element

---
