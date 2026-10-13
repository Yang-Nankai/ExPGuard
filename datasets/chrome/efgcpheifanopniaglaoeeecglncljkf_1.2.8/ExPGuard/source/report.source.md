# Source-level Taint Flow — efgcpheifanopniaglaoeeecglncljkf 1.2.8

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 26 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `bg` L2067:C4 -> L2420:C7 (spans to L2420)  `»WebExtensions.runtime.onMessage.addListener(((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `bg` L2312:C22 -> L2335:C18 (spans to L2335)  `await »WebExtensions.declarativeNetRequest.updateSessionRules({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (84 raw steps → 8 distinct lines):
   1. L2067 (→L2420) `»    WebExtensions.runtime.onMessage.addListener(((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content->bg]`
   2. L2306 `let safeFileName = »filename.replace(/^\./, "_").replace(/[\\\/:\*\?'"<>|]/g, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L2307 `const _tmp = »safeFileName.match(/(.+)(\..+?)$/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   4. L2308 `if (»_tmp«) {`  · ASSIGN:identifier
   5. L2309 `safeFileName = »_tmp[1].substr(0, 200) + _tmp[2]«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:binary-right
   6. L2311 `const attachmentValue = "attachment; filename*=UTF-8''" + »encodeURIComponent(safeFileName)«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-right
   7. L2320 `value: »attachmentValue«`  · ASSIGN:identifier
   8. L2312 (→L2335) `»                await WebExtensions.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `bg` L1702:C31 -> L1702:C39  `const {»cmd: cmd«, params: params} = evt.data;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `bg` L1417:C24 -> L1420:C51 (spans to L1420)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `bg` L1449:C16 -> L1454:C18 (spans to L1454)  `»registered_workers[workerId].worker.postMessage({«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `bg` L1459:C35 -> L1464:C26 (spans to L1464)  `if (notify_to_content) »window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (location.origin) — `bg` L1438:C16 -> L1441:C30 (spans to L1441)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (4025 raw steps → 122 distinct lines):
   1. L1702 `const {»cmd: cmd, params: params«} = evt.data;`  · ELEMENT:destructure-property[cmd], ELEMENT:destructure-property[params]
   2. L1703 `if (»mediasource_handlers[cmd] && params?.workerId«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
   3. L1704 `mediasource_handlers[»cmd](params«, this);`  · ASSIGN:identifier
   4. L1547 `Mediasource: ({»sourceId: sourceId, workerId: workerId = 0«}, worker) => {`  · ELEMENT:destructure-property[sourceId], ELEMENT:destructure-property[workerId]
   5. L1548 `tmpSavedChunks[»sourceId«] = [];`  · ASSIGN:identifier
   6. L1553 `workerId: »workerId«,`  · ASSIGN:identifier
   7. L1549 (→L1557) `bufferInfo[»sourceId] = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
   8. L1352 `const »bufferInfo = {}«;`  · ELEMENT:object.setProperty
   9. L1558 `if (»workerId) registered_workers[workerId«] = {`  · ASSIGN:identifier
  10. L1562 `if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", »"sourceId : " + sourceId + " , origin:"« + origin));`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  11. L1173 `message = typeof message === "object" ? »JSON.stringify(message) : message«;`  · ASSIGN:identifier, RETURN:json.stringify, ASSIGN:conditional-alternate
  12. L1175 `»return [ "%cinject%c " + domain + " %c [" + eventName + "]%c " + message, "color:#ff0b01", "", "color:#f60b91", "" ];«`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty, ELEMENT:implicit.add
  13. L1564 `addSourceBuffer: ({»sourceId: sourceId, bufferId: bufferId, mimeType: mimeType, mode: mode«}) => {`  · ELEMENT:destructure-property[sourceId], ELEMENT:destructure-property[bufferId], ELEMENT:destructure-property[mimeType], ELEMENT:destructure-property[mode]
  14. L1566 `mimeType: »mimeType«,`  · ASSIGN:identifier
  15. L1565 (→L1568) `bufferInfo[»sourceId][bufferId] = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  16. L1570 `sourceId: »sourceId«,`  · ASSIGN:identifier
  17. L1569 (→L1574) `»                if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", "addSourceBuffer : " + JSON.stringify({«`  · ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:binary-right
  18. L1571 `bufferId: »bufferId«,`  · ASSIGN:identifier
  19. L1572 `mimeType: »mimeType«,`  · ASSIGN:identifier
  20. L1573 `mode: »mode«`  · ASSIGN:identifier
  21. L1576 `appendBuffer: ({»sourceId: sourceId, bufferId: bufferId, buffer: buffer«}) => {`  · ELEMENT:destructure-property[sourceId], ELEMENT:destructure-property[bufferId], ELEMENT:destructure-property[buffer]
  22. L1577 `if (»bufferInfo[sourceId].running«) {`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container
  23. L1578 `if (»buffer.length || buffer.byteLength«) {`  · ASSIGN:identifier, ELEMENT:member.length, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  24. L1579 `push_buffer(»sourceId, bufferId, buffer«);`  · ASSIGN:identifier
  25. L1475 `relate_mediaSource_to_videoTag(»sourceId, bufferId«);`  · ASSIGN:identifier
  26. L1290 `if (!_related_to_video[»sourceId«]) {`  · ASSIGN:identifier
  27. L1342 `if (!_related_to_video[»sourceId«]) {`  · ASSIGN:identifier
  28. L1339 `if (_related_to_video[»sourceId«]) break;`  · ASSIGN:identifier
  29. L1344 `list[sourceId] = (list[»sourceId«] || 0) + 1;`  · ASSIGN:identifier
  30. L1346 `if (list[»sourceId] > 10) _related_to_video[sourceId«] = true;`  · ASSIGN:identifier
  31. L1477 `const arrayBuffer = »buffer.buffer || buffer«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  32. L1480 `const offset = »buffer.byteOffset || 0«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  33. L1481 `const length = »buffer.byteLength || 0«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  34. L1482 `if (»offset || arrayBuffer.byteLength > length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  35. L1483 `sliced = »arrayBuffer.slice(offset, offset + length)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:fallback-return
  36. L1487 `const »mimeType = bufferInfo[sourceId][bufferId].mimeType || ""«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative, ASSIGN:logical-left
  37. L1488 `const »chunkId = bufferInfo[sourceId].order++«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container
  38. L1484 `if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", »"ArrayBuffer has trimmed : offset=" + offset + " ,len=" + length«));`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  39. L1489 `if (transfer_list[»sourceId«]) {`  · ASSIGN:identifier
  40. L1490 `const chunk = »sliced || arrayBuffer.slice(0)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  41. L1502 `const chunk = »sliced || arrayBuffer«;`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  42. L1491 `const »t = (timestamp - bufferInfo[sourceId].timestamp) / 1e3«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:binary-left
  43. L1503 `if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", »"+++ buffered : " + sourceId + "," + bufferId + "," + chunkId + "," + mimeType + "/" + chunk.byteLength«));`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:member-element
  44. L1492 `if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", »">>> transfer : " + sourceId + "," + bufferId + "," + chunkId + "," + mimeType + "/" + chunk.byteLength + "," + t«));`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:member-element
  45. L1504 `const buffered_count = tmpSavedChunks[»sourceId«].length;`  · ASSIGN:identifier
  46. L1493 (→L1500) `transfer(»sourceId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L1494 `bufferId: »bufferId«,`  · ASSIGN:identifier
  48. L1496 `chunk: »chunk«,`  · ASSIGN:identifier
  49. L1497 `mimeType: »mimeType«,`  · ASSIGN:identifier
  50. L1500 `}, transfer_list[»sourceId«]);`  · ASSIGN:identifier
  51. L1385 `if (»!bufferInfo[sourceId]?.pendingTransfer && transferTarget«) {`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left
  52. L1400 `const »{pendingTransfer: pendingTransfer} = bufferInfo[sourceId] || {}«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:destructure-property[pendingTransfer]
  53. L1387 `const »transferId = ++bufferInfo[sourceId].transfered_count«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container
  54. L1401 `if (»pendingTransfer«) {`  · ASSIGN:identifier
  55. L1388 (→L1398) `bufferInfo[»sourceId].pendingTransfer = {«`  · ELEMENT:object.setProperty, ASSIGN:identifier
  56. L1394 `sourceId: »sourceId«,`  · ASSIGN:identifier
  57. L1403 `»pendingTransfer«.prevSourceId = transferTarget.prevSourceId;`  · ASSIGN:identifier
  58. L1407 `»pendingTransfer.chunks.push(chunk)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  59. L1408 `if (»chunk.chunk) pendingTransfer.size += chunk.chunk.byteLength«;`  · ELEMENT:member-element, ASSIGN:identifier, ELEMENT:member-element-container
  60. L1410 `if (»pendingTransfer.chunks.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length
  61. L1411 `const lastChunk_ts = »pendingTransfer.chunks.at(-1).timestamp«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  62. L1412 `if (»pendingTransfer.size > 1048576 || lastChunk_ts - bufferInfo[sourceId].last_transfer_ts > MAX_TRANSFER_INTERVAL || !chunk«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  63. L1414 `for (»const i of pendingTransfer.chunks«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  64. L1415 `if (»i.chunk) transferObjects.push(i.chunk«);`  · ASSIGN:identifier, ELEMENT:member-element
  65. L1419 `params: »pendingTransfer«`  · ASSIGN:identifier
  66. L1417 (→L1420) `»                        window.postMessage({«`  · ELEMENT:object.setProperty
  67. L1413 `const »transferObjects = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  68. L1422 `bufferInfo[»sourceId].last_transfer_ts = lastChunk_ts«;`  · ASSIGN:identifier
  69. L1505 `const »buffered_duration = timestamp - bufferInfo[sourceId].timestamp«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-right
  70. L1506 `if (»total_buffered > MAX_BUFFERED_BYTES || buffered_count > MAX_BUFFERED_COUNT || buffered_count > 30 && buffered_duration > MAX_BUFFERED_DURATION«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
  71. L1516 `sourceId: »sourceId«,`  · ASSIGN:identifier
  72. L1515 (→L1523) `»                const c = {«`  · ELEMENT:object.setProperty
  73. L1517 `bufferId: »bufferId«,`  · ASSIGN:identifier
  74. L1519 `blob: new Blob([ »chunk« ]),`  · ASSIGN:identifier
  75. L1520 `mimeType: »mimeType«,`  · ASSIGN:identifier
  76. L1510 `buffered_duration: »buffered_duration«`  · ASSIGN:identifier
  77. L1507 (→L1511) `»                    if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", {«`  · ELEMENT:object.setProperty
  78. L1524 `tmpSavedChunks[»sourceId«].push(c);`  · ASSIGN:identifier
  79. L1512 `stop_capture(»sourceId«, true, "exceeds");`  · ASSIGN:identifier
  80. L1445 `if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", »"stop capture : mediasourceId = " + sourceId« + (reason ? ", " + reason : "")));`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  81. L1446 `bufferInfo[»sourceId«].running = false;`  · ASSIGN:identifier
  82. L1447 `const »{workerId: workerId} = bufferInfo[sourceId]«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:destructure-property[workerId]
  83. L1448 `if (registered_workers[»workerId«]) {`  · ASSIGN:identifier
  84. L1449 (→L1454) `registered_workers[»workerId].worker.postMessage({«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  85. L1452 `sourceId: »sourceId«`  · ASSIGN:identifier
  86. L1462 `sourceId: »sourceId«`  · ASSIGN:identifier
  87. L1459 (→L1464) `»            if (notify_to_content) window.postMessage({«`  · ELEMENT:object.setProperty
  88. L1456 `if (localStorage?.cpt_inject_log) console.log(...logGen("MediaSource", »"Worker " + workerId« + " has removed"));`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  89. L1465 `if (transfer_list[»sourceId«]) {`  · ASSIGN:identifier
  90. L1466 `transfer(»sourceId, null, transfer_list[sourceId«]);`  · ASSIGN:identifier
  91. L1469 `if (_related_to_video[»sourceId«]) {`  · ASSIGN:identifier
  92. L1525 `bufferInfo[»sourceId][bufferId«].latest = c;`  · ASSIGN:identifier
  93. L1526 `total_buffered += »chunk.byteLength«;`  · ASSIGN:identifier, ELEMENT:member-element
  94. L1508 `total_buffered: »total_buffered«,`  · ASSIGN:identifier
  95. L1583 `updateend: ({»sourceId: sourceId, bufferId: bufferId, timeRanges: timeRanges«}) => {`  · ELEMENT:destructure-property[sourceId], ELEMENT:destructure-property[bufferId], ELEMENT:destructure-property[timeRanges]
  96. L1584 `if (»bufferInfo[sourceId].running«) {`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container
  97. L1586 `push_timeRanges(»sourceId, bufferId, timeRanges«);`  · ASSIGN:identifier
  98. L1530 `if (transfer_list[»sourceId«]) {`  · ASSIGN:identifier
  99. L1542 `const »{latest: latest} = bufferInfo[sourceId][bufferId]«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative, ELEMENT:destructure-property[latest]
  100. L1532 `const »mimeType = bufferInfo[sourceId][bufferId].mimeType || ""«;`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:computed-member-unknown-alternative, ASSIGN:logical-left
  101. L1543 `if (»latest) latest.timeRanges = timeRanges«;`  · ASSIGN:identifier
  102. L1533 (→L1540) `transfer(»sourceId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  103. L1534 `bufferId: »bufferId«,`  · ASSIGN:identifier
  104. L1537 `mimeType: »mimeType«,`  · ASSIGN:identifier
  105. L1538 `timeRanges: »timeRanges«,`  · ASSIGN:identifier
  106. L1540 `}, transfer_list[»sourceId«]);`  · ASSIGN:identifier
  107. L1592 `handle: ({»sourceId: sourceId«}) => {`  · ELEMENT:destructure-property[sourceId]
  108. L1593 `latestMediaSourceHandleId = »sourceId«;`  · ASSIGN:identifier
  109. L1595 `wi2i_keep_alive: ({»workerId: workerId«}) => {`  · ELEMENT:destructure-property[workerId]
  110. L1596 `console.log("keep_alive", »workerId, !!registered_workers[workerId«]);`  · ASSIGN:identifier
  111. L1597 `if (registered_workers[»workerId]) registered_workers[workerId«].timestamp = now();`  · ASSIGN:identifier
  112. L1427 `const end_transfer = ({»sourceId: sourceId«}) => {`  · ELEMENT:destructure-property[sourceId]
  113. L1428 `const transferTarget = transfer_list[»sourceId«];`  · ASSIGN:identifier
  114. L1430 `transfer(»sourceId«, null, transferTarget);`  · ASSIGN:identifier
  115. L1436 `sourceId: »sourceId«`  · ASSIGN:identifier
  116. L1432 (→L1437) `»                const params = {«`  · ELEMENT:object.setProperty
  117. L1438 (→L1441) `»                window.postMessage({«`  · ELEMENT:object.setProperty
  118. L1722 `for (»const sourceId« in bufferInfo) {`  · ITERATE:loop.iteration
  119. L1723 `const »info = bufferInfo[sourceId] || {}«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left
  120. L1724 `if (»info.pendingTransfer?.chunks.length«) {`  · ELEMENT:member-element, ELEMENT:member.length
  121. L1725 `if (»info.last_transfer_ts + MAX_TRANSFER_INTERVAL + 1e3« < n) {`  · ELEMENT:member-element, ASSIGN:binary-left
  122. L1733 `for (»const sid« in bufferInfo) {`  · ITERATE:loop.iteration

---
