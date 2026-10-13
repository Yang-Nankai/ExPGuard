# Source-level Taint Flow — gmmkjpcadciiokjpikmkkmapphbmdjok 1.3

- Source type: CRX
- Files with issues: 1 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service-worker` L41:C12 -> L41:C15  `switch (»req« && req.cmd) {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `fetchRequest` L51:C12 -> L51:C51  `»sendResponse(invalidRequest(authError))«;`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `fetchRequest` L30:C16 -> L30:C74  `»sendResponse(invalidRequest(`Invalid Header:\n${header}`))«;`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `fetchRequest` L37:C16 -> L37:C74  `»sendResponse(invalidRequest(`Invalid Header:\n${header}`))«;`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `fetchRequest` L42:C16 -> L42:C78  `»sendResponse(invalidRequest(`Cannot set the header:\n${key}`))«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `fetchRequest` L69:C8 -> L69:C37  `»fetch(json.idnUrl, fetchData)«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `fetchRequest` L69:C8 -> L69:C37  `»fetch(json.idnUrl, fetchData)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1090 raw steps → 54 distinct lines):
   1. L41 _(in `utils`)_ `»return `Invalid Basic Auth header:\n${header}`«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:template-literal
   2. L46 `fetchRequest(»req.data, sendR«esponse);`  · ASSIGN:identifier, ELEMENT:member-element
   3. L5 _(in `fetchRequest`)_ `if (»!data || typeof data.json !== 'string'«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   4. L10 _(in `fetchRequest`)_ `const json = »JSON.parse(data.json)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse
   5. L11 _(in `fetchRequest`)_ `const headers = typeof json.headers === 'st»ring' ? json.headers.split("\n")« : [];`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent, ASSIGN:binary-right, ASSIGN:identifier
   6. L14 _(in `fetchRequest`)_ `method: »json.method«,`  · ELEMENT:member-element
   7. L13 (→L16) `»    if (!sender) {«`  · ELEMENT:object.setProperty
   8. L18 _(in `fetchRequest`)_ `if (»json.content !== undefined && json.method !== 'GET' && json.method !== 'HEAD'«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier
   9. L19 _(in `fetchRequest`)_ `fetchData.body = »json.content«;`  · ELEMENT:member-element
  10. L22 _(in `fetchRequest`)_ `»for (let i = 0; i < headers.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  11. L23 `return new URL(»sender.url).origi«n;`  · ELEMENT:member-element, RETURN:fallback-return
  12. L49 _(in `fetchRequest`)_ `»const authError = validateAuthHeader(json.auth)«;`  · ELEMENT:member-element, ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:implicit.add
  13. L26 _(in `utils`)_ `const authType = »auth.auth«;`  · ASSIGN:identifier, ELEMENT:member-element
  14. L27 _(in `utils`)_ `if (»authType« === "bearerToken") {`  · ASSIGN:identifier, ASSIGN:binary-left
  15. L28 _(in `fetchRequest`)_ `const separ»atorIndex = header.indexOf(':')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L38 _(in `utils`)_ `if (»authType« === "basicAuth") {`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L29 _(in `fetchRequest`)_ `»if (separatorIndex« <= 0) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left
  18. L39 _(in `utils`)_ `const  header = »auth.basicUsername + ":" + auth.basicPassword«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  19. L40 _(in `utils`)_ `if (»!auth.basicUsername || !auth.basicPassword«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  20. L50 _(in `utils`)_ `const  header = »auth.customHeader«;`  · ASSIGN:identifier, ELEMENT:member-element
  21. L33 `function(req, sender,» sendR«esponse) {`  · ASSIGN:identifier
  22. L51 _(in `utils`)_ `if (»!header«) {`  · ASSIGN:identifier, ASSIGN:unary
  23. L34 _(in `utils`)_ `return »`Bearer Token contains non-ascii characters:\n${header}`«;`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:member-element, RETURN:fallback-return
  24. L44 _(in `utils`)_ `if (!isASCII(»header«)) {`  · ASSIGN:identifier
  25. L45 _(in `utils`)_ `return »`Basic Auth header contains non-ascii characters:\n${header}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  26. L55 _(in `fetchRequest`)_ `const »authHeader = getAuthHeader(json.auth).trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:implicit.add, ELEMENT:member-element-container
  27. L56 _(in `utils`)_ `return »`Custom Auth header contains non-ascii characters:\n${header}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  28. L24 `} catch »(error)« {`  · ASSIGN:identifier, ASSIGN:unary
  29. L4 (→L14) `»console.log('The ReqBin plugin has been initialized.');«`  · ELEMENT:object.setProperty
  30. L12 _(in `utils`)_ `'ContentLength': »("ReqBin Chrome Extension\n\n" + error).length«,`  · ASSIGN:binary-right, ELEMENT:member.length, ASSIGN:identifier
  31. L64 _(in `utils`)_ `if (»!auth || !auth.auth«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  32. L68 _(in `utils`)_ `const authType = »auth.auth«;`  · ASSIGN:identifier, ELEMENT:member-element
  33. L69 _(in `utils`)_ `if (»authType === "noA«uth") {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element
  34. L73 _(in `utils`)_ `if (»authType« === "bearerToken") {`  · ASSIGN:identifier, ASSIGN:binary-left
  35. L74 _(in `utils`)_ `return "Bearer " + »auth.bearerToken«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  36. L77 _(in `utils`)_ `if (»authType« === "basicAuth") {`  · ASSIGN:identifier, ASSIGN:binary-left
  37. L78 _(in `utils`)_ `const basic = »auth.basicUsername + ":" + auth.basicPassword«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  38. L82 _(in `utils`)_ `if (»authType« === "customAuth") {`  · ASSIGN:identifier, ASSIGN:binary-left
  39. L79 _(in `utils`)_ `return "Basic " + »btoa(basic)«;`  · ASSIGN:identifier, RETURN:btoa, ASSIGN:binary-right
  40. L83 _(in `utils`)_ `return »auth.customHeader«;`  · ASSIGN:identifier, ELEMENT:member-element
  41. L30 _(in `fetchRequest`)_ `sendResponse(invalidRequest(»`Invalid Header:\n${header}`«));`  · ASSIGN:identifier, ASSIGN:template-literal
  42. L35 _(in `fetchRequest`)_ `const val = »header.slice(separatorIndex + 1).trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:fallback-return
  43. L36 _(in `fetchRequest`)_ `if (»!isASCII(key) || !isASCII(val) || key.includes(' ')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  44. L37 _(in `fetchRequest`)_ `sendResponse(invalidRequest(»`Invalid Header:\n${header}`«));`  · ASSIGN:identifier, ASSIGN:template-literal
  45. L42 _(in `fetchRequest`)_ `sendResponse(invalidRequest(»`Cannot set the header:\n${key}`«));`  · ASSIGN:identifier, ASSIGN:template-literal
  46. L62 _(in `fetchRequest`)_ `if (»json.method === 'POST' || json.method === 'PUT' || json.method === 'PATCH'«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  47. L63 _(in `fetchRequest`)_ `const contentType = »json.contentType«;`  · ELEMENT:member-element
  48. L65 _(in `fetchRequest`)_ `»fetchHeaders.set('Content-Type', getContentType(contentType))«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  49. L90 _(in `utils`)_ `if (»contentType« === "URLENCODED")`  · ASSIGN:identifier, ASSIGN:binary-left
  50. L92 _(in `utils`)_ `if (»contentType« === "JSON")`  · ASSIGN:identifier, ASSIGN:binary-left
  51. L94 _(in `utils`)_ `if (»contentType« === "HTML")`  · ASSIGN:identifier, ASSIGN:binary-left
  52. L96 _(in `utils`)_ `if (»contentType« === "XML")`  · ASSIGN:identifier, ASSIGN:binary-left
  53. L98 _(in `utils`)_ `if (»contentType« === "TEXT")`  · ASSIGN:identifier, ASSIGN:binary-left
  54. L100 _(in `utils`)_ `return »contentType«;`  · ASSIGN:identifier

---
