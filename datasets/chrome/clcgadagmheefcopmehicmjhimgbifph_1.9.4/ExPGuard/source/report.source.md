# Source-level Taint Flow — clcgadagmheefcopmehicmjhimgbifph 1.9.4

- Source type: CRX
- Files with issues: 7 / 13
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 17 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content/dataProcessing` L897:C6 -> L897:C32  `? »window.location.href.split«("/?")[0]`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/dataProcessing` L904:C29 -> L923:C8 (spans to L923)  `const response = await »fetch(url, {«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `content/dataProcessing` L904:C29 -> L923:C8 (spans to L923)  `const response = await »fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (106 raw steps → 5 distinct lines):
   1. L897 `? »window.location.href.split("/?")[0]«`  · ELEMENT:member-element-container, ELEMENT:string.split, ASSIGN:conditional-consequent
   2. L896 (→L898) `»  const baseUrl = window.location.href.includes("/?")«`  · ELEMENT:object.setProperty
   3. L899 `const url = »`${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=0&cursor%5Bs%5D=${undefined}&l=english&app%5B%5D=730`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   4. L904 (→L923) `const response = await fetch(»url, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   5. L917 `referrer: »baseUrl«,`  · ASSIGN:identifier

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/relay` L358:C20 -> L358:C35  `if (event.data && »event.data.type« === "relay/ping") {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content/relay` L431:C6 -> L439:C7 (spans to L439)  `»window.postMessage(«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `content/relay` L99:C4 -> L107:C5 (spans to L107)  `»window.postMessage(«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `content/relay` L124:C4 -> L130:C5 (spans to L130)  `»window.postMessage(«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `content/relay` L112:C4 -> L119:C5 (spans to L119)  `»window.postMessage(«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `content/relay` L135:C4 -> L142:C5 (spans to L142)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (343 raw steps → 48 distinct lines):
   1. L358 `if (»event.data && event.data.type === "relay/ping"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   2. L422 `if (»event.data && event.data.type === "relay/requestPermission"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L427 `permissionType: »event.data.permissionType«, // "tabs" or "host"`  · ELEMENT:member-element
   4. L425 (→L428) `»      const response = await sendPortMessage({«`  · ELEMENT:object.setProperty
   5. L315 (→L318) `»        port.postMessage({«`  · ELEMENT:object.setProperty
   6. L316 `»...message«,`  · COPY:object-spread
   7. L456 `if (»event.data && event.data.type === "relay/checkSteamLogon"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L434 `permissionType: »event.data.permissionType«,`  · ELEMENT:member-element
   9. L431 (→L439) `»      window.postMessage(«`  · ELEMENT:object.setProperty
  10. L493 `if (»event.data && event.data.type === "relay/startAgeDetection"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  11. L498 `sessionId: »event.data.sessionId«,`  · ELEMENT:member-element
  12. L496 (→L501) `»      const response = await sendPortMessage({«`  · ELEMENT:object.setProperty
  13. L499 `profileUrl: »event.data.profileUrl«,`  · ELEMENT:member-element
  14. L500 `tabId: »event.data.tabId«,`  · ELEMENT:member-element
  15. L529 `if (»event.data && event.data.type === "relay/stopAgeDetection"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  16. L534 `sessionId: »event.data.sessionId«,`  · ELEMENT:member-element
  17. L532 (→L535) `»      const response = await sendPortMessage({«`  · ELEMENT:object.setProperty
  18. L563 `if (»event.data && event.data.type === "relay/ageDetectionStatusResponse"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  19. L568 `sessionId: »event.data.sessionId«,`  · ELEMENT:member-element
  20. L566 (→L571) `»      sendPortMessage({«`  · ELEMENT:object.setProperty
  21. L579 `if (»event.data && event.data.type === "relay/startDataQuery"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  22. L584 `sessionId: »event.data.sessionId«,`  · ELEMENT:member-element
  23. L582 (→L589) `»      const response = await sendPortMessage({«`  · ELEMENT:object.setProperty
  24. L585 `profileUrl: »event.data.profileUrl«,`  · ELEMENT:member-element
  25. L586 `tabId: »event.data.tabId«,`  · ELEMENT:member-element
  26. L587 `startTimestamp: »event.data.startTimestamp«,`  · ELEMENT:member-element
  27. L588 `endTimestamp: »event.data.endTimestamp«,`  · ELEMENT:member-element
  28. L636 `if (»event.data && event.data.type === "relay/stopDataQuery"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  29. L639 `const sessionId = »event.data.sessionId«;`  · ELEMENT:member-element
  30. L676 `if (»event.data && event.data.type === "relay/dataQueryStatusResponse"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  31. L640 `if (»sessionId«) {`  · ASSIGN:identifier
  32. L681 `sessionId: »event.data.sessionId«,`  · ELEMENT:member-element
  33. L679 (→L684) `»      sendPortMessage({«`  · ELEMENT:object.setProperty
  34. L692 `if (»event.data && event.data.type === "relay/fetchLatestEventsPage"«) {`  · ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  35. L641 `stopDataQueryHeartbeat(»sessionId«);`  · ASSIGN:identifier
  36. L225 `if (dataQueryHeartbeats.has(»sessionId«)) {`  · ASSIGN:identifier
  37. L226 `clearInterval(dataQueryHeartbeats.get(»sessionId«));`  · ASSIGN:identifier
  38. L227 `dataQueryHeartbeats.delete(»sessionId«);`  · ASSIGN:identifier
  39. L697 `profileUrl: »event.data.profileUrl«,`  · ELEMENT:member-element
  40. L695 (→L698) `»      const response = await sendPortMessage({«`  · ELEMENT:object.setProperty
  41. L647 `sessionId: »sessionId«,`  · ASSIGN:identifier
  42. L645 (→L648) `»      const response = await sendPortMessage({«`  · ELEMENT:object.setProperty
  43. L204 `»port.onMessage.addListener(handlePortMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[background->content/relay]`
  44. L99 (→L107) `»    window.postMessage(«`  · ELEMENT:object.setProperty
  45. L38 `»port.onMessage.addListener(handlePortMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[background->content/relay]`
  46. L124 (→L130) `»    window.postMessage(«`  · ELEMENT:object.setProperty
  47. L112 (→L119) `»    window.postMessage(«`  · ELEMENT:object.setProperty
  48. L135 (→L142) `»    window.postMessage(«`  · ELEMENT:object.setProperty

---

## Flow #3 — WINDOW_MESSAGE_EVENT (From storage.local.set('inventoryAge') in background)

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/chunkManagement` L29:C4 -> L67:C6 (spans to L67)  `»request.onerror = () => reject(request.error);«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content/relay` L393:C6 -> L403:C7 (spans to L403)  `»window.postMessage(«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (372 raw steps → 64 distinct lines):
   1. L29 (→L67) `»  «`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[content/relay->background]`
   2. L31 _(in `content/syncData`)_ `const queryVersion» = data?.queryVer«sion ?? "1.7.7";`  · ELEMENT:member-element-container
   3. L32 _(in `content/chunkManagement`)_ `request.onupgra»deneeded = («event) => {`  · ELEMENT:member-element-container
   4. L98 `if (»response.type =«== "ageDetectionStatus") {`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L37 _(in `content/steamService`)_ `// R»esolve immediately - actua«l response handled by background script`  · ASSIGN:identifier, ASSIGN:logical-right
   6. L101 `»  type: "relay/«ageDetectionStatus",`  · ELEMENT:member-element, ASSIGN:binary-left
   7. L105 _(in `background`)_ `debug_name: »request.debugName«,`  · ELEMENT:member-element
   8. L102 (→L113) `»        sessionId: response.sessionId,«`  · ELEMENT:object.setProperty
   9. L106 _(in `content/dataProcessing`)_ `// Map internal type »(description.tags[«"Type"].internal_name) to UI display type`  · ELEMENT:member-element
  10. L107 _(in `content/dataProcessing`)_ `function mapIn»ternalTypeToDisplayType(inte«rnalType) {`  · ELEMENT:member-element, RETURN:json.stringify
  11. L109 _(in `content/steamService`)_ `return { hasCu»rsor, cursor: data?.curso«r, success: !!data?.success };`  · ELEMENT:member-element, ASSIGN:logical-left
  12. L104 (→L110) `»        month: response.month,«`  · RETURN:json.stringify
  13. L115 `»  sessionId:« response.sessionId,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L137 `»  type: "rel«ay/ageDetectionError",`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L139 _(in `content/domManipulation`)_ `// Start monitori»ng for other extension«s`  · ELEMENT:member-element-container
  16. L141 `wi»ndow.location.«origin`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L152 `status:» response.stat«us || "green",`  · ASSIGN:identifier, ASSIGN:binary-left
  18. L167 _(in `content/chunkManagement`)_ `co»nst db = awa«it initDB();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L214 _(in `content/chunkManagement`)_ `»lastEventTim«e: null,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L253 _(in `content/chunkManagement`)_ `»  if (color «=== "d4af37") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  21. L273 _(in `content/chunkManagement`)_ `»    if (coun«ts.gold > 0) counts.firstKnifeCaseCount++;`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L404 _(in `content/domManipulation`)_ `so»rtedSkins.fo«rEach((skin) => {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  23. L428 _(in `content/domManipulation`)_ `cons»t now = Date«.now();`  · ELEMENT:member-element-container, ASSIGN:binary-left
  24. L443 _(in `content/dataProcessing`)_ `»  gainedCont«ainer.querySelectorAll(".history_item"); // Find all descendants`  · ELEMENT:member-element-container, ASSIGN:binary-left
  25. L606 `»if (response«.success && response.sessionId) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  26. L633 _(in `content/dataProcessing`)_ `re»turn trackTo«ggles.drops;`  · ELEMENT:member-element-container, ASSIGN:binary-left
  27. L648 _(in `content/dataProcessing`)_ `ev»ent.lostItem«s[0].name.includes("Armory Pass")`  · ELEMENT:member-element-container, ASSIGN:binary-left
  28. L664 `»    type: "r«elay/dataQueryStopResponse",`  · ELEMENT:member-element-container, ASSIGN:binary-left
  29. L57 _(in `content/steamService`)_ `* @param {o»bject} stopFlag - Object with { stopped: boole«an } to check if should stop`  · ASSIGN:identifier, ASSIGN:logical-left
  30. L275 _(in `content/domManipulation`)_ `document.querySele»ctor("#lastDateChecked").innerText = new D«ate(`  · ELEMENT:member-element-container, ASSIGN:logical-left
  31. L279 _(in `content/chunkManagement`)_ `»  if (counts.gold > 0) counts.firstKnifeCaseCount+«+;`  · ELEMENT:member-element-container, ASSIGN:logical-left
  32. L280 _(in `content/dataProcessing`)_ `// Ensure image is normalized to the »path format o«ur UI expects`  · ELEMENT:member-element-container
  33. L296 _(in `background`)_ `let profileUrl = »sessionData.profileUrl || request.profileUrl«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  34. L298 `»// Max retr«ies reached`  · ASSIGN:identifier, ASSIGN:unary
  35. L307 `//» Check if port exists and appears connecte«d`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  36. L308 _(in `content/steamService`)_ `id: `${descript»ion.classid}_${description.instan«ceid}`,`  · ASSIGN:identifier, ASSIGN:template-literal
  37. L355 _(in `content/domManipulation`)_ `const goldPullList = docum»ent.query«Selector("#goldArea");`  · ASSIGN:identifier
  38. L358 `if (event.data && event.data.typ»e === "rel«ay/ping") {`  · ASSIGN:identifier
  39. L331 _(in `content/chunkManagement`)_ `if (item.»name.incl«udes("Armory Pass")) {`  · ASSIGN:identifier
  40. L329 (→L334) `»        // Check if error is about disconnected port«`  · ELEMENT:object.setProperty
  41. L344 _(in `background`)_ `const detection = activeAgeDetections.get(»sessionId«);`  · ASSIGN:identifier
  42. L150 _(in `content/steamService`)_ `const result = await hasMoreDataAt(checkTime, »profileUrl«, stopFlag);`  · ASSIGN:identifier
  43. L66 `// C»lear all heartbeat interv«als`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  44. L67 `for »(const [se«ssionId, intervalId] of dataQueryHeartbeats.entries()) {`  · ASSIGN:identifier
  45. L68 _(in `content/steamService`)_ `const url = »`${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=0&cursor%5Bs%5D=${undefined}&l=english&app%5B%5D=730`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  46. L77 (→L96) `function handlePortMessage(response») {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L90 _(in `content/chunkManagement`)_ `const transactio»n = db.«transaction(STORE_NAME, "readwrite");`  · ASSIGN:identifier
  48. L188 _(in `content/steamService`)_ `const result = await hasMoreDataAt(monthProbe, »profileUrl«, stopFlag);`  · ASSIGN:identifier
  49. L400 `invento»ryAge: in«ventoryAge,`  · ASSIGN:identifier
  50. L398 (→L401) `»          hasTabsPermission: permissionResponse?.hasTabsPermission || false,«`  · ELEMENT:object.setProperty
  51. L361 _(in `background`)_ `const detection = activeAgeDetections.get(»sessionId«);`  · ASSIGN:identifier
  52. L366 _(in `content/domManipulation`)_ `const pullElement = document.»createEle«ment("div");`  · ASSIGN:identifier
  53. L371 _(in `content/chunkManagement`)_ `const transaction = d»b.transac«tion(STORE_NAME, "readwrite");`  · ASSIGN:identifier
  54. L369 (→L372) `»      const permissionResponse = await sendPortMessage({«`  · ELEMENT:object.setProperty
  55. L377 `if (storageData.in»ventoryAge«) {`  · ASSIGN:identifier
  56. L375 (→L380) `»      try {«`  · ELEMENT:object.setProperty
  57. L384 _(in `content/dataProcessing`)_ `addLog(`Container» event de«tected.`, "debug");`  · ASSIGN:identifier
  58. L382 (→L386) `»            typeof parsed.timestamp === "number" &&«`  · ELEMENT:object.setProperty
  59. L390 _(in `content/dataProcessing`)_ `const contentDiv = eventElement».parentEl«ement; // Get the parent (.tradehistory_content)`  · ASSIGN:identifier
  60. L393 (→L403) `window.postMess»age(«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  61. L391 (→L395) `»«`  · ELEMENT:object.setProperty
  62. L376 `const storageData = await »chrome.storage.local.get("inventoryAge")«;`  · STORAGE:STORAGE_FLOW[area: local, key: inventoryAge, sender: background, receiver: content/relay]
  63. L379 `const parsed = typeof raw === "string" ? »JSON.parse(raw) : raw«;`  · ASSIGN:identifier, RETURN:json.parse, ASSIGN:conditional-alternate
  64. L381 (→L383) `»            parsed &&«`  · ASSIGN:logical-left

---

## Flow #4 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L29:C4 -> L67:C6 (spans to L67)  `»port.onMessage.addListener((request) => {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://api.lootspectrum.com/functions/v1/debug-log) — `background` L102:C4 -> L111:C6 (spans to L111)  `»fetch("https://api.lootspectrum.com/functions/v1/debug-log", {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L77:C29 -> L96:C8 (spans to L96)  `// Helper function to send me»ssage to relay ports«`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L77:C29 -> L96:C8 (spans to L96)  `// Helper function to send me»ssage to relay ports«`
  - `CHROME_LOCAL_STORAGE` (inventoryAge) — `background` L375:C10 -> L380:C12 (spans to L380)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (364 raw steps → 61 distinct lines):
   1. L29 (→L67) `»    port.onMessage.addListener((request) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[content/relay->background]`
   2. L31 `const requestId = »request.requestId«;`  · ELEMENT:member-element-container
   3. L32 `const type = »request.type«;`  · ELEMENT:member-element-container
   4. L98 `if (»request.message« === "getVersion") {`  · ELEMENT:member-element, ASSIGN:binary-left
   5. L37 `if (»!responseSent && requestId«) {`  · ASSIGN:identifier, ASSIGN:logical-right
   6. L101 `if (»request.message« === "logResponse") {`  · ELEMENT:member-element, ASSIGN:binary-left
   7. L105 `debug_name: »request.debugName«,`  · ELEMENT:member-element
   8. L102 (→L113) `»    fetch("https://api.lootspectrum.com/functions/v1/debug-log", {«`  · ELEMENT:object.setProperty
   9. L106 `status_code: »request.statusCode«,`  · ELEMENT:member-element
  10. L107 `body: »JSON.stringify(request.body)«,`  · ELEMENT:member-element, RETURN:json.stringify
  11. L109 `error_text: »request.errorText ?? null«,`  · ELEMENT:member-element, ASSIGN:logical-left
  12. L104 (→L110) `»      body: JSON.stringify({«`  · RETURN:json.stringify
  13. L115 `if (»request.type« === "checkPermissions") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  14. L137 `if (»request.type« === "requestPermission") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L139 `const permissionType = »request.permissionType«;`  · ELEMENT:member-element-container
  16. L141 `if (»permissionType« === "tabs") {`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L152 `} else if (»permissionType« === "host") {`  · ASSIGN:identifier, ASSIGN:binary-left
  18. L167 `if (»request.type« === "checkSteamLogon") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  19. L214 `if (»request.type« === "steamLoginCheckResponse") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  20. L253 `if (»request.type« === "steamCursorData") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  21. L273 `if (»request.type« === "startAgeDetection") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  22. L404 `if (»request.type« === "stopAgeDetection") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  23. L428 `if (»request.type« === "ageDetectionStatusResponse") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  24. L443 `if (»request.type« === "startDataQuery") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  25. L606 `if (»request.type« === "stopDataQuery") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  26. L633 `if (»request.type« === "dataQueryStatusResponse") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  27. L648 `if (»request.type« === "heartbeat/ping") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  28. L664 `if (»request.type« === "fetchLatestEventsPage") {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  29. L57 `if (»requestId && result === false && !responseSent«) {`  · ASSIGN:identifier, ASSIGN:logical-left
  30. L275 `const sessionId = »request.sessionId || Date.now().toString()«;`  · ELEMENT:member-element-container, ASSIGN:logical-left
  31. L279 `if (»request.tabId && sessionStorage.has(request.tabId)«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  32. L280 `sessionData = sessionStorage.get(»request.tabId«);`  · ELEMENT:member-element-container
  33. L296 `let profileUrl = »sessionData.profileUrl || request.profileUrl«;`  · ELEMENT:member-element-container, ASSIGN:logical-right
  34. L298 `if (»!profileUrl«) {`  · ASSIGN:identifier, ASSIGN:unary
  35. L307 `if (»!profileUrl.includes("/inventoryhistory/")«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  36. L308 `profileUrl = »`${profileUrl}/inventoryhistory/`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  37. L355 `activeAgeDetections.set(»sessionId«, detectionData);`  · ASSIGN:identifier
  38. L358 `detectInventoryAge(startTime, »profileUrl«, stopFlag, statusCallback)`  · ASSIGN:identifier
  39. L331 `sessionId: »sessionId«,`  · ASSIGN:identifier
  40. L329 (→L334) `»      sendToRelayPorts({«`  · ELEMENT:object.setProperty
  41. L344 `const detection = activeAgeDetections.get(»sessionId«);`  · ASSIGN:identifier
  42. L150 _(in `content/steamService`)_ `const result = await hasMoreDataAt(checkTime, »profileUrl«, stopFlag);`  · ASSIGN:identifier
  43. L66 _(in `content/steamService`)_ `? »profileUrl.split("/?")[0]«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
  44. L67 _(in `content/steamService`)_ `: »profileUrl«;`  · ASSIGN:identifier
  45. L68 _(in `content/steamService`)_ `const url = »`${baseUrl}/?ajax=1&cursor%5Btime%5D=${time}&cursor%5Btime_frac%5D=0&cursor%5Bs%5D=${undefined}&l=english&app%5B%5D=730`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  46. L77 (→L96) `// Helper function to send message »to relay ports«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L90 `// Clean up disc»onnecte«d ports`  · ASSIGN:identifier
  48. L188 _(in `content/steamService`)_ `const result = await hasMoreDataAt(monthProbe, »profileUrl«, stopFlag);`  · ASSIGN:identifier
  49. L400 `sessionId: »sessionId«,`  · ASSIGN:identifier
  50. L398 (→L401) `»    sendResponse({«`  · ELEMENT:object.setProperty
  51. L361 `const detection = activeAgeDetections.get(»sessionId«);`  · ASSIGN:identifier
  52. L366 `activeAgeDetections.delete(»sessionId«);`  · ASSIGN:identifier
  53. L371 `sessionId: »sessionId«,`  · ASSIGN:identifier
  54. L369 (→L372) `»          sendToRelayPorts({«`  · ELEMENT:object.setProperty
  55. L377 `profileUrl: »profileUrl«,`  · ASSIGN:identifier
  56. L375 (→L380) `»          chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  57. L384 `sessionId: »sessionId«,`  · ASSIGN:identifier
  58. L382 (→L386) `»          sendToRelayPorts({«`  · ELEMENT:object.setProperty
  59. L390 `activeAgeDetections.delete(»sessionId«);`  · ASSIGN:identifier
  60. L393 `sessionId: »sessionId«,`  · ASSIGN:identifier
  61. L391 (→L395) `»        sendToRelayPorts({«`  · ELEMENT:object.setProperty

---
