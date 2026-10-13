# Source-level Taint Flow — jabjbhgjaidecageckilhonbggakppme 1.3.19.0

- Source type: CRX
- Files with issues: 4 / 7
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L38:C31 -> L38:C38  `let meta = »message«?.meta;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L75:C35 -> L75:C67  `»window.postMessage(message, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (656 raw steps → 21 distinct lines):
   1. L38 `let meta = »message?.meta«;`  · ASSIGN:identifier, ELEMENT:member-element
   2. L40 `if (»meta?.format?.category« === "gosuslugi.plugin") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L42 `if (»message?.node« === "") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L43 `const id = »message.id«;`  · ASSIGN:identifier, ELEMENT:member-element
   5. L44 `const routeNode = »meta.routes?.[0]?.node«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L46 `if (»message.mode == "debug") console.info(_ID + " get from web page message: " + JSON.stringify(message)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:json.stringify, ASSIGN:binary-right
   7. L47 `else                         console.info(_ID + " get from web page message id: " + »id«);`  · ASSIGN:identifier, ASSIGN:binary-right
   8. L49 `_cache[»id] = routeNode«;`  · ASSIGN:identifier
   9. L3 `let »_cache = {}«;`  · ELEMENT:object.setProperty
  10. L51 `console.info(_ID + " send to background message id: " + »id«);`  · ASSIGN:identifier, ASSIGN:binary-right
  11. L53 `chrome.runtime.sendMessage(»message«);`  · ASSIGN:identifier
  12. L67 `let cached = »_cache[id]«;`  · ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:identifier
  13. L68 `if (»cached«) {`  · ASSIGN:identifier
  14. L70 `»message.node = cached«;`  · ASSIGN:identifier
  15. L59 (→L79) `»               chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->content]`
  16. L62 `let id = »message.id«;`  · ASSIGN:identifier, ELEMENT:member-element
  17. L64 `if (»message.mode == "debug") console.info(_ID + " get from background message: " + JSON.stringify(message)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:json.stringify, ASSIGN:binary-right
  18. L65 `else                         console.info(_ID + " get from background message id: " + »message.id«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  19. L69 `»message.meta.routes.push(new GosuslugiPluginRoute(_ID, new Date().toLocaleString()))«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L73 `console.info(_ID + " send to web page message id: " + »message.id«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  21. L75 `window.postMessage(»message«, '*');`  · ASSIGN:identifier

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L999:C8 -> L1010:C9 (spans to L1010)  `»chrome.runtime.onMessage.addListener(«`
- **Sink(s)**:
  - `CHROME_NOTIFICATIONS_CREATE_OPTIONS` — `background` L937:C20 -> L937:C71  `»chrome.notifications.create(...notificationOptions)«.then?.(callback) || callback();`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1422 raw steps → 96 distinct lines):
   1. L999 (→L1010) `»        chrome.runtime.onMessage.addListener(«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L1001 `let message = »request«;`  · ASSIGN:identifier
   3. L1003 `»message«.node = sender.tab.id.toString();`  · ASSIGN:identifier
   4. L1005 `»message«.node = "";`  · ASSIGN:identifier
   5. L1007 `_request(»message«);`  · ASSIGN:identifier
   6. L636 `const { »id, module, method, meta } = message«;`  · ASSIGN:identifier, ELEMENT:destructure-property[id], ELEMENT:destructure-property[module], ELEMENT:destructure-property[method], ELEMENT:destructure-property[meta]
   7. L637 `const mandatory = »method.type« == "config";`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L638 `const type = »method?.type«;`  · ASSIGN:identifier, ELEMENT:member-element
   9. L639 `const chunk = »meta?.chunk«;`  · ASSIGN:identifier, ELEMENT:member-element
  10. L640 `const chunks = »meta?.chunks«;`  · ASSIGN:identifier, ELEMENT:member-element
  11. L641 `if( »chunks« != -1 ) {`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L642 `chunksCounter = Number(chunksCounter) + Number(»chunks«);`  · ASSIGN:identifier
  13. L644 `const first = ['1', ''].includes(»chunk«);`  · ASSIGN:identifier
  14. L651 `} else if( ignoredIds.has( »id« ) ) {`  · ASSIGN:identifier
  15. L649 `ignoredIds.delete( »id« );`  · ASSIGN:identifier
  16. L655 `const unsupportedChunks = »_chunkUnsupportedVersion && type?.startsWith('signature') && !['1', ''].includes(chunks)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:logical-left
  17. L657 `if( »unsupportedChunks« ) {`  · ASSIGN:identifier
  18. L658 `ignoredIds.add( »id« );`  · ASSIGN:identifier
  19. L84 `let »ignoredIds = new Set()«;`  · ELEMENT:object.setProperty
  20. L661 `if (»_ban && !mandatory«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  21. L663 (→L668) `console.warn(»_ID + " cancelled message id: " + id +«`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  22. L665 `", mandatory: " + »mandatory« +`  · ASSIGN:identifier, ASSIGN:binary-right
  23. L675 `else if( »!!unsupportedChunks« ) {`  · ASSIGN:identifier, ASSIGN:unary
  24. L670 `error_handler.set_message_error(»message«, null, "Работа Госплагина невозможна. Обновите версию приложения");`  · ASSIGN:identifier
  25. L676 (→L678) `console.warn(»_ID + " cancelled message id: " + id +«`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  26. L686 `if (»message.mode == "debug") console.info(_ID + " send to host message: " + JSON.stringify(message)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:json.stringify, ASSIGN:binary-right
  27. L672 `_responce(»message«);`  · ASSIGN:identifier
  28. L698 `const id = »message.id«;`  · ASSIGN:identifier, ELEMENT:member-element
  29. L700 `if( ignoredIds.has( »id« ) ) {`  · ASSIGN:identifier
  30. L704 `if( »message.error« != "" ) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L705 `ignoredIds.add( »id« );`  · ASSIGN:identifier
  32. L708 `const methodType = »message.method.type«;`  · ASSIGN:identifier, ELEMENT:member-element
  33. L710 `if (»methodType« == "config") {`  · ASSIGN:identifier, ASSIGN:binary-left
  34. L711 `if (»message.error && message.error.length«) {`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right
  35. L736 `} else if (»methodType.startsWith( "signature" )« ) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  36. L715 `let result = »JSON.parse(message.method.result)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse
  37. L746 `if (»message.node« == "") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  38. L718 (→L731) `»result.some(function (each) {«`  · ELEMENT:member-element, RETURN:fallback-return
  39. L747 `if (»methodType« == "config") {`  · ASSIGN:identifier, ASSIGN:binary-left
  40. L759 `if (»message.mode == "debug") console.info(_ID + " send to tab message, tab id: " + message.node + ", message: " + JSON.stringify(message)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:json.stringify
  41. L734 `console.info(_ID + " actualized config info: " + »JSON.stringify(_config)«);`  · RETURN:json.stringify, ASSIGN:binary-right
  42. L755 `if (»message.mode == "debug") console.info(_ID + " send to popup message: " + JSON.stringify(message)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:json.stringify, ASSIGN:binary-right
  43. L760 `else console.info(»_ID + " send to tab message, tab id: " + message.node + ", message id: " + id«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:binary-left
  44. L756 `else console.info(_ID + " send to popup message id: " + »id«);`  · ASSIGN:identifier, ASSIGN:binary-right
  45. L762 `_notify('endSign', »message«);`  · ASSIGN:identifier
  46. L780 `if (»typeof _notify[reason] === 'undefined' || !!message«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  47. L783 `const { »method, meta } = message || {}«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:destructure-property[method], ELEMENT:destructure-property[meta]
  48. L784 `const type = »method?.type«;`  · ASSIGN:identifier, ELEMENT:member-element
  49. L785 `const chunk = »meta?.chunk«;`  · ASSIGN:identifier, ELEMENT:member-element
  50. L786 `const chunks = »meta?.chunks«;`  · ASSIGN:identifier, ELEMENT:member-element
  51. L789 (→L790) `const signatureMethod = »type?.startsWith('signature')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:logical-left
  52. L790 `&& ['1', '', »chunks].includes(chunk«);`  · ASSIGN:identifier
  53. L795 `if (»!signatureMethod && signatureReasons«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  54. L812 `const first = »( chunk == '1' ) || ( chunk == '' )«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  55. L813 `const last = »chunk == chunks«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  56. L814 `const send = »!!message.method.data«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  57. L816 `const beginSend =  »send && first«;`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  58. L817 `const beginSign =  »send && last«;`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  59. L818 `const endSign   = »!send && last«;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  60. L822 `if      ( »beginSend && ( 'beginSend' == reason )« ) options.message = "Передача данных";`  · ASSIGN:identifier, ASSIGN:logical-left
  61. L823 `else if ( »beginSign && ( 'beginSign' == reason )« ) options.message = "Начат процесс подписания файла";`  · ASSIGN:identifier, ASSIGN:logical-left
  62. L824 `else if ( »endSign   && ( 'endSign'   == reason )« ) {`  · ASSIGN:identifier, ASSIGN:logical-left
  63. L825 `if ( »!!message.method.result« ) { options.message = "Процесс подписания файла завершен";     }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  64. L826 `else                           { options.message = »message.error«; options.title = "Ошибка"; }`  · ASSIGN:identifier, ELEMENT:member-element
  65. L799 (→L806) `»            let options = {«`  · ELEMENT:object.setProperty
  66. L935 `const »notificationOptions = usePromise ? [options] : ["", options]«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:conditional-alternate
  67. L751 `result.config = message.method.result.length ? »JSON.parse(message.method.result)« : [];`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.parse
  68. L748 `let »result = {}«;`  · ELEMENT:object.setProperty
  69. L757 `chrome.runtime.sendMessage(»message«, (result) => { if (chrome.runtime.lastError) { } });`  · ASSIGN:identifier
  70. L765 `chrome.tabs.sendMessage(»+message.node, message«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  71. L753 `»message«.method.result = result;`  · ASSIGN:identifier
  72. L680 `error_handler.set_message_error(»message«, null, "Данный режим подписи недоступен. Обновите версию приложения");`  · ASSIGN:identifier
  73. L687 `else console.info(_ID + " send to host message id: " + »id«);`  · ASSIGN:identifier, ASSIGN:binary-right
  74. L682 `_responce(»message«);`  · ASSIGN:identifier
  75. L689 `_notify('beginSend', »message«);`  · ASSIGN:identifier
  76. L690 `_notify('beginSign', »message«);`  · ASSIGN:identifier
  77. L692 `_post(»message«);`  · ASSIGN:identifier
  78. L961 `let type = »message.method.type«;`  · ASSIGN:identifier, ELEMENT:member-element
  79. L965 `»message«.meta.protocol = protocol;`  · ASSIGN:identifier
  80. L967 `if ("disconnect" == »type«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  81. L970 `else if("protocol" == »type«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  82. L971 `»message«.method.result = JSON.stringify({ type: protocol.type, host: protocol.description, state: _protocol_state_to_string(_state) });`  · ASSIGN:identifier
  83. L972 `_responce(»message«);`  · ASSIGN:identifier
  84. L976 `if ("connect" == »type«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  85. L979 `_base64_transform_if(»message«, true);`  · ASSIGN:identifier
  86. L99 `const transferEncoding = »message.meta.content.transferEncoding«;`  · ASSIGN:identifier, ELEMENT:member-element
  87. L102 `if (»transferEncoding«) {`  · ASSIGN:identifier
  88. L103 `if (»transferEncoding« == "base64") {`  · ASSIGN:identifier, ASSIGN:binary-left
  89. L104 `const messageData = message.mode == "debug" ? »JSON.stringify(message) : message.id«;`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:member-element, ASSIGN:conditional-alternate
  90. L105 `const operationMessage = _ID + " " + operationPrefix + " : " + »messageData«;`  · ASSIGN:identifier, ASSIGN:binary-right
  91. L107 `console.info(»operationMessage«);`  · ASSIGN:identifier
  92. L109 `if( encode ) »message.method.data   = Base64.encode(message.method.data«  );`  · ASSIGN:identifier, ELEMENT:member-element
  93. L981 `if (»message.mode == "debug") console.info(_ID + " send: " + JSON.stringify(message)«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:json.stringify, ASSIGN:binary-right
  94. L982 `else console.info(_ID + " send id: " + »message.id«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  95. L984 `_protocol.post(»message«);`  · ASSIGN:identifier
  96. L567 `return _post(»message«);`  · ASSIGN:identifier

---
