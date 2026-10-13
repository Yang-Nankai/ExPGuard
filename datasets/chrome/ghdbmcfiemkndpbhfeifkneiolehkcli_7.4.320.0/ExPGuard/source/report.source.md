# Source-level Taint Flow — ghdbmcfiemkndpbhfeifkneiolehkcli 7.4.320.0

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 6  (collapsed from 341 raw issue entries)
- Sinkless sources skipped: 19 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(windowManagerEventEx))  ·  288× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `bsWindowManagement` L815:C0 -> L1077:C2 (spans to L1077)  `»chrome.runtime.onMessage.addListener(function (request, sender, callback) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `csNativeMessage` L45:C12 -> L45:C72  `»localStorage.setItem("Synapse.Extension.HostName", hostName)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (189 raw steps → 48 distinct lines):
   1. L815 (→L1077) _(in `bsWindowManagement`)_ `»chrome.runtime.onMessage.addListener(function (request, sender, callback) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
   2. L818 _(in `bsWindowManagement`)_ `if (»!request.isWindowManagement«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   3. L823 _(in `bsWindowManagement`)_ `tabId = request.tabId ? »parseInt(request.tabId, 10) : tabId«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   4. L825 _(in `bsWindowManagement`)_ `windowId = request.windowId ? »parseInt(request.windowId, 10) : windowId«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   5. L826 _(in `bsWindowManagement`)_ `const storageKey = getStorageKey(»request«, sender);`  · ASSIGN:identifier
   6. L119 _(in `bsWindowManagement`)_ `let storageKey = »request.storageKey«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L120 _(in `bsWindowManagement`)_ `if (»!!storageKey«) {`  · ASSIGN:identifier, ASSIGN:unary
   8. L125 `functio»n (event) «{`  · ASSIGN:identifier
   9. L123 _(in `bsWindowManagement`)_ `storageKey = »`${storageKey}_${hostname}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L830 _(in `bsWindowManagement`)_ `if (»request.moveTo«) {`  · ASSIGN:identifier, ELEMENT:member-element
  11. L832 _(in `bsWindowManagement`)_ `left: »request.moveTo.offsetx«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L831 (→L836) _(in `bsWindowManagement`)_ `»            var updateInfo = {«`  · ELEMENT:object.setProperty
  13. L833 _(in `bsWindowManagement`)_ `top: »request.moveTo.offsety«,`  · ASSIGN:identifier, ELEMENT:member-element
  14. L834 _(in `bsWindowManagement`)_ `width: »request.moveTo.width«,`  · ASSIGN:identifier, ELEMENT:member-element
  15. L835 _(in `bsWindowManagement`)_ `height: »request.moveTo.height«`  · ASSIGN:identifier, ELEMENT:member-element
  16. L839 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'openwindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L837 _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId«, updateInfo);`  · ASSIGN:identifier
  18. L840 _(in `bsWindowManagement`)_ `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  19. L129 `console.log(`[ERR] Excep»tion in la«unchApplication: ${ex.message}`);`  · ASSIGN:identifier
  20. L861 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'opentabwindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L862 _(in `bsWindowManagement`)_ `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  22. L883 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'maximize') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L884 _(in `bsWindowManagement`)_ `if (»request.left && request.top && request.height && request.width«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  24. L899 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'minimize') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L859 _(in `bsWindowManagement`)_ `openWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  26. L226 _(in `bsWindowManagement`)_ `if (/WebHelp5/i.test(»request.url«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  27. L229 _(in `bsWindowManagement`)_ `if (»!request.width && !request.height && !request.left && !request.top«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  28. L231 `console.log(`[ERR] Exceptio»n in getDefaultPrin«tSettings: ${ex.message}`);`  · ASSIGN:identifier
  29. L380 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  30. L134 _(in `bsWindowManagement`)_ `if (»storageKey«) {`  · ASSIGN:identifier
  31. L138 _(in `bsWindowManagement`)_ `windowStateMap.set(»storageKey«, {`  · ASSIGN:identifier
  32. L140 _(in `bsWindowManagement`)_ `windowInfo: windowInfo || getWindowState(»storageKey«).windowInfo`  · ASSIGN:identifier
  33. L233 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  34. L885 (→L893) _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  35. L886 _(in `bsWindowManagement`)_ `left: »request.left«,`  · ASSIGN:identifier, ELEMENT:member-element
  36. L887 _(in `bsWindowManagement`)_ `top: »request.top«,`  · ASSIGN:identifier, ELEMENT:member-element
  37. L888 _(in `bsWindowManagement`)_ `height: »request.height«,`  · ASSIGN:identifier, ELEMENT:member-element
  38. L889 _(in `bsWindowManagement`)_ `width: »request.width«,`  · ASSIGN:identifier, ELEMENT:member-element
  39. L895 _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId«, { state: 'maximized' }).then((win) => {`  · ASSIGN:identifier
  40. L900 _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId«, { state: 'minimized' }).then((win) => {`  · ASSIGN:identifier
  41. L903 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'normal') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  42. L881 _(in `bsWindowManagement`)_ `openTabWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  43. L282 `.then(r»esponse =>« postPageEvent("onLaunchDiagnosticViewer", response))`  · ASSIGN:identifier
  44. L284 _(in `bsWindowManagement`)_ `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  45. L283 (→L293) `»                .catch(err => logExtError(err));«`  · ELEMENT:object.setProperty
  46. L288 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opened, tab);`  · ASSIGN:identifier
  47. L289 _(in `bsWindowManagement`)_ `»callback({ 'type': 'opentabwindow', windowId: tab.windowId, tabId: tab.id, windowStorageKey: storageKey })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  48. L73 `»chrome.runtime.sendMessage({ isNativeMsg: true, type: "InitPort" })«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[bsWindowManagement->csNativeMessage]`

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(windowManagerEventEx))

- **Source**: `TARGET_CUSTOM_EVENT` — `csWindowManagement` L21:C24 -> L21:C35  `const request = »evt?.detail«?.request;`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_KEY` — `csWindowManagement` L31:C24 -> L37:C31 (spans to L37)  `»window.localStorage.setItem(request.storageKey,«`
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `csWindowManagement` L31:C24 -> L37:C31 (spans to L37)  `»window.localStorage.setItem(request.storageKey,«`
  - `WEB_LOCAL_STORAGE_SET_KEY` — `csWindowManagement` L46:C24 -> L46:C92  `»window.localStorage.setItem(request.storageKey, JSON.stringify(obj))«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (40 raw steps → 14 distinct lines):
   1. L21 `const request = »evt?.detail?.request«;`  · ELEMENT:member-element
   2. L22 `if (»!request«) return;`  · ASSIGN:identifier, ASSIGN:unary
   3. L24 `»request.listenerId = evt?.detail?.id«;`  · ELEMENT:member-element, ASSIGN:identifier
   4. L25 `»request«.isWindowManagement = true;`  · ASSIGN:identifier
   5. L27 `chrome.runtime.sendMessage(»request«)`  · ASSIGN:identifier
   6. L31 (→L37) `window.localStorage.setItem(»request.storageKey,«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   7. L35 `opener: »request.opener«,`  · ASSIGN:identifier, ELEMENT:member-element
   8. L36 `isMaster: »request.isMaster ?? false«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   9. L32 (→L37) `»                            JSON.stringify({«`  · RETURN:json.stringify
  10. L40 `let obj = JSON.parse(window.localStorage.getItem(»request.storageKey«));`  · ASSIGN:identifier, ELEMENT:member-element
  11. L48 `const listenerId = »evt?.detail?.id«;`  · ELEMENT:member-element
  12. L49 (→L50) `document.dispatchEvent(new CustomEvent('windowManagerEventComplete_' + »listenerId,«`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty
  13. L50 `{ detail: { request: »request«, response: response } }));`  · ASSIGN:identifier
  14. L46 `window.localStorage.setItem(»request.storageKey«, JSON.stringify(obj));`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #3 — TARGET_CUSTOM_EVENT (target.addEventListener(windowManagerEventEx))  ·  48× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `bsWindowManagement` L815:C0 -> L1077:C2 (spans to L1077)  `»chrome.runtime.onMessage.addListener(function (request, sender, callback) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `csWindowManagement` L31:C24 -> L37:C31 (spans to L37)  `»window.localStorage.setItem(request.storageKey,«`
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `csWindowManagement` L46:C24 -> L46:C92  `»window.localStorage.setItem(request.storageKey, JSON.stringify(obj))«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (266 raw steps → 64 distinct lines):
   1. L815 (→L1077) _(in `bsWindowManagement`)_ `»chrome.runtime.onMessage.addListener(function (request, sender, callback) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
   2. L818 _(in `bsWindowManagement`)_ `if (»!request.isWindowManagement«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   3. L823 _(in `bsWindowManagement`)_ `tabId = request.tabId ? »parseInt(request.tabId, 10) : tabId«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   4. L825 _(in `bsWindowManagement`)_ `windowId = request.windowId ? »parseInt(request.windowId, 10) : windowId«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   5. L826 _(in `bsWindowManagement`)_ `const storageKey = getStorageKey(»request«, sender);`  · ASSIGN:identifier
   6. L119 _(in `bsWindowManagement`)_ `let storageKey = »request.storageKey«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L120 _(in `bsWindowManagement`)_ `if (»!!storageKey«) {`  · ASSIGN:identifier, ASSIGN:unary
   8. L125 _(in `bsWindowManagement`)_ `return »storageKey«;`  · ASSIGN:identifier
   9. L123 _(in `bsWindowManagement`)_ `storageKey = »`${storageKey}_${hostname}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L830 _(in `bsWindowManagement`)_ `if (»request.moveTo«) {`  · ASSIGN:identifier, ELEMENT:member-element
  11. L832 _(in `bsWindowManagement`)_ `left: »request.moveTo.offsetx«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L831 (→L836) _(in `bsWindowManagement`)_ `»            var updateInfo = {«`  · ELEMENT:object.setProperty
  13. L833 _(in `bsWindowManagement`)_ `top: »request.moveTo.offsety«,`  · ASSIGN:identifier, ELEMENT:member-element
  14. L834 _(in `bsWindowManagement`)_ `width: »request.moveTo.width«,`  · ASSIGN:identifier, ELEMENT:member-element
  15. L835 _(in `bsWindowManagement`)_ `height: »request.moveTo.height«`  · ASSIGN:identifier, ELEMENT:member-element
  16. L839 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'openwindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L837 _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId«, updateInfo);`  · ASSIGN:identifier
  18. L840 _(in `bsWindowManagement`)_ `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  19. L129 _(in `bsWindowManagement`)_ `const val = windowStateMap?.get(»storageKey«);`  · ASSIGN:identifier
  20. L861 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'opentabwindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L862 _(in `bsWindowManagement`)_ `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  22. L883 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'maximize') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L884 _(in `bsWindowManagement`)_ `if (»request.left && request.top && request.height && request.width«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  24. L899 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'minimize') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L859 _(in `bsWindowManagement`)_ `openWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  26. L226 _(in `bsWindowManagement`)_ `if (/WebHelp5/i.test(»request.url«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  27. L229 _(in `bsWindowManagement`)_ `if (»!request.width && !request.height && !request.left && !request.top«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  28. L231 _(in `bsWindowManagement`)_ `return openWindowMinimized(»storageKey, request«, sender.tab.incognito, callback);`  · ASSIGN:identifier
  29. L380 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  30. L134 _(in `bsWindowManagement`)_ `if (»storageKey«) {`  · ASSIGN:identifier
  31. L138 _(in `bsWindowManagement`)_ `windowStateMap.set(»storageKey«, {`  · ASSIGN:identifier
  32. L140 _(in `bsWindowManagement`)_ `windowInfo: windowInfo || getWindowState(»storageKey«).windowInfo`  · ASSIGN:identifier
  33. L233 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  34. L885 (→L893) _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  35. L886 _(in `bsWindowManagement`)_ `left: »request.left«,`  · ASSIGN:identifier, ELEMENT:member-element
  36. L887 _(in `bsWindowManagement`)_ `top: »request.top«,`  · ASSIGN:identifier, ELEMENT:member-element
  37. L888 _(in `bsWindowManagement`)_ `height: »request.height«,`  · ASSIGN:identifier, ELEMENT:member-element
  38. L889 _(in `bsWindowManagement`)_ `width: »request.width«,`  · ASSIGN:identifier, ELEMENT:member-element
  39. L895 _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId«, { state: 'maximized' }).then((win) => {`  · ASSIGN:identifier
  40. L900 _(in `bsWindowManagement`)_ `chrome.windows.update(»windowId«, { state: 'minimized' }).then((win) => {`  · ASSIGN:identifier
  41. L903 _(in `bsWindowManagement`)_ `} else if (»request.type« === 'normal') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  42. L881 _(in `bsWindowManagement`)_ `openTabWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  43. L282 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  44. L284 _(in `bsWindowManagement`)_ `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  45. L283 (→L293) _(in `bsWindowManagement`)_ `»        chrome.tabs.create({«`  · ELEMENT:object.setProperty
  46. L288 _(in `bsWindowManagement`)_ `setWindowState(»storageKey«, windowState.Opened, tab);`  · ASSIGN:identifier
  47. L289 _(in `bsWindowManagement`)_ `»callback({ 'type': 'opentabwindow', windowId: tab.windowId, tabId: tab.id, windowStorageKey: storageKey })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  48. L27 `»chrome.runtime.sendMessage(request)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[bsWindowManagement->csWindowManagement]`
  49. L29 `if (»response === undefined || response === null || !response.type«) return;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:unary
  50. L30 `if (»response.type === "openwindow" || response.type === "opentabwindow"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  51. L33 `tabId: »response.tabId«,`  · ASSIGN:identifier, ELEMENT:member-element
  52. L31 (→L37) `»                        window.localStorage.setItem(request.storageKey,«`  · ELEMENT:object.setProperty
  53. L34 `windowId: »response.windowId«,`  · ASSIGN:identifier, ELEMENT:member-element
  54. L32 (→L37) `»                            JSON.stringify({«`  · RETURN:json.stringify
  55. L39 `} else if (»response.type === "isAlive" || response.type === "saveWindowInfo"«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  56. L38 `»onBackgroundMessage({ type: 'onApplicationWindowOpened', responseData: { windowStorageKey: response.windowStorageKey } }, null, null)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  57. L62 `if (»response === undefined || response === null || !response.type || backgroundMessageResponseTypes.indexOf(response.type) < 0«) return;`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  58. L69 `»document.dispatchEvent(new CustomEvent('onWindowManagerExtEventComplete', { detail: { eventName: "AppWindowOpen", response: response } }))«;`  · ELEMENT:object.setProperty
  59. L50 `{ detail: { request: request, response: »response« } }));`  · ASSIGN:identifier
  60. L49 (→L50) `»                    document.dispatchEvent(new CustomEvent('windowManagerEventComplete_' + listenerId,«`  · ELEMENT:object.setProperty
  61. L44 `obj.tabId = »response.tabId«;`  · ASSIGN:identifier, ELEMENT:member-element
  62. L42 `»obj = {}«;`  · ELEMENT:object.setProperty
  63. L45 `obj.windowId = »response.windowId«;`  · ASSIGN:identifier, ELEMENT:member-element
  64. L46 `window.localStorage.setItem(request.storageKey, »JSON.stringify(obj)«);`  · RETURN:json.stringify

---

## Flow #4 — TARGET_CUSTOM_EVENT (target.addEventListener(windowManagerEventEx))

- **Source**: `TARGET_CUSTOM_EVENT` — `bsWindowManagement` L815:C0 -> L1077:C2 (spans to L1077)  `»chrome.runtime.onMessage.addListener(function (request, sender, callback) {«`
- **Sink(s)**:
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L837:C12 -> L837:C55  `»chrome.windows.update(windowId, updateInfo)«;`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L885:C16 -> L891:C18 (spans to L891)  `»chrome.windows.update(windowId, {«`
  - `CHROME_TABS_CREATE_OPTIONS` — `bsWindowManagement` L283:C8 -> L286:C10 (spans to L286)  `»chrome.tabs.create({«`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L759:C4 -> L765:C6 (spans to L765)  `»chrome.windows.update(windowId, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `bsWindowManagement` L550:C31 -> L557:C14 (spans to L557)  `const response = await »fetch(url,«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `bsWindowManagement` L550:C31 -> L557:C14 (spans to L557)  `const response = await »fetch(url,«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `bsWindowManagement` L242:C12 -> L250:C14 (spans to L250)  `»chrome.windows.create({«`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L253:C20 -> L258:C22 (spans to L258)  `»chrome.windows.update(win.id, {«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `bsWindowManagement` L350:C8 -> L358:C10 (spans to L358)  `»chrome.windows.create({«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `bsWindowManagement` L389:C12 -> L397:C14 (spans to L397)  `»chrome.windows.create({«`
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L799:C12 -> L805:C14 (spans to L805)  `»chrome.windows.update(windowId, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1564 raw steps → 221 distinct lines):
   1. L815 (→L1077) `»chrome.runtime.onMessage.addListener(function (request, sender, callback) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
   2. L818 `if (»!request.isWindowManagement«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   3. L823 `tabId = request.tabId ? »parseInt(request.tabId, 10) : tabId«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   4. L825 `windowId = request.windowId ? »parseInt(request.windowId, 10) : windowId«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:parseInt, ASSIGN:conditional-consequent
   5. L826 `const storageKey = getStorageKey(»request«, sender);`  · ASSIGN:identifier
   6. L119 `let storageKey = »request.storageKey«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L120 `if (»!!storageKey«) {`  · ASSIGN:identifier, ASSIGN:unary
   8. L125 `return »storageKey«;`  · ASSIGN:identifier
   9. L123 `storageKey = »`${storageKey}_${hostname}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L830 `if (»request.moveTo«) {`  · ASSIGN:identifier, ELEMENT:member-element
  11. L832 `left: »request.moveTo.offsetx«,`  · ASSIGN:identifier, ELEMENT:member-element
  12. L831 (→L836) `»            var updateInfo = {«`  · ELEMENT:object.setProperty
  13. L833 `top: »request.moveTo.offsety«,`  · ASSIGN:identifier, ELEMENT:member-element
  14. L834 `width: »request.moveTo.width«,`  · ASSIGN:identifier, ELEMENT:member-element
  15. L835 `height: »request.moveTo.height«`  · ASSIGN:identifier, ELEMENT:member-element
  16. L839 `} else if (»request.type« === 'openwindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L837 `chrome.windows.update(»windowId«, updateInfo);`  · ASSIGN:identifier
  18. L840 `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  19. L129 `const val = windowStateMap?.get(»storageKey«);`  · ASSIGN:identifier
  20. L861 `} else if (»request.type« === 'opentabwindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L862 `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  22. L883 `} else if (»request.type« === 'maximize') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L884 `if (»request.left && request.top && request.height && request.width«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  24. L899 `} else if (»request.type« === 'minimize') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L859 `openWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  26. L226 `if (/WebHelp5/i.test(»request.url«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  27. L229 `if (»!request.width && !request.height && !request.left && !request.top«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  28. L231 `return openWindowMinimized(»storageKey, request«, sender.tab.incognito, callback);`  · ASSIGN:identifier
  29. L380 `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  30. L134 `if (»storageKey«) {`  · ASSIGN:identifier
  31. L138 `windowStateMap.set(»storageKey«, {`  · ASSIGN:identifier
  32. L140 `windowInfo: windowInfo || getWindowState(»storageKey«).windowInfo`  · ASSIGN:identifier
  33. L233 `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  34. L885 (→L893) `chrome.windows.update(»windowId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  35. L886 `left: »request.left«,`  · ASSIGN:identifier, ELEMENT:member-element
  36. L887 `top: »request.top«,`  · ASSIGN:identifier, ELEMENT:member-element
  37. L888 `height: »request.height«,`  · ASSIGN:identifier, ELEMENT:member-element
  38. L889 `width: »request.width«,`  · ASSIGN:identifier, ELEMENT:member-element
  39. L895 `chrome.windows.update(»windowId«, { state: 'maximized' }).then((win) => {`  · ASSIGN:identifier
  40. L900 `chrome.windows.update(»windowId«, { state: 'minimized' }).then((win) => {`  · ASSIGN:identifier
  41. L903 `} else if (»request.type« === 'normal') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  42. L881 `openTabWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  43. L282 `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  44. L284 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  45. L283 (→L293) `»        chrome.tabs.create({«`  · ELEMENT:object.setProperty
  46. L288 `setWindowState(»storageKey«, windowState.Opened, tab);`  · ASSIGN:identifier
  47. L289 `»callback({ 'type': 'opentabwindow', windowId: tab.windowId, tabId: tab.id, windowStorageKey: storageKey })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  48. L914 `} else if (»request.type« === 'restore') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  49. L913 `getTabInfo(»windowId«, onSuccessCallback);`  · ASSIGN:identifier
  50. L50 `chrome.windows.get(»windowId«, function (win) {`  · ASSIGN:identifier
  51. L921 `} else if (»request.type« === 'redirect') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  52. L920 `handleRestore(»windowId, request«, callback, 2);`  · ASSIGN:identifier
  53. L759 (→L812) `chrome.windows.update(»windowId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  54. L761 `left: »request.left«,`  · ASSIGN:identifier, ELEMENT:member-element
  55. L762 `top: »request.top«,`  · ASSIGN:identifier, ELEMENT:member-element
  56. L763 `height: »request.height«,`  · ASSIGN:identifier, ELEMENT:member-element
  57. L764 `width: »request.width«`  · ASSIGN:identifier, ELEMENT:member-element
  58. L766 `if (»retryCount <= 0 || (win.height === request.height && win.width === request.width && win.top === request.top && win.left === request.left && win.state === 'normal')«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
  59. L771 `setTimeout(() => { handleRestore(»windowId, request«, callback, --retryCount); }, 50);`  · ASSIGN:identifier
  60. L924 (→L927) `chrome.tabs.update(»tabId, { url: request.url },«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  61. L931 `} else if (»request.type« === 'focus') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  62. L933 `chrome.windows.update(»windowId«, { focused: true },`  · ASSIGN:identifier
  63. L935 `if (»storageKey«) {`  · ASSIGN:identifier
  64. L936 `tabId = »getTabId(storageKey) || tabId«;`  · ASSIGN:identifier, ASSIGN:logical-right
  65. L188 `const winState = getWindowState(»storageKey«);`  · ASSIGN:identifier
  66. L938 `if (»!request.highlight || tabId === -1«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  67. L942 `»tabId«, (tab) => {`  · ASSIGN:identifier
  68. L959 `} else if (»request.type« === 'closeWindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  69. L960 `if (»!!storageKey«) {`  · ASSIGN:identifier, ASSIGN:unary
  70. L978 `} else if (»request.type« === 'reloadWindow') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  71. L961 `closeWindowByWindowKey(»storageKey«);`  · ASSIGN:identifier
  72. L206 `const tabId = getTabId(»key«);`  · ASSIGN:identifier
  73. L213 `setWindowState(»key«, windowState.Closed);`  · ASSIGN:identifier
  74. L964 `chrome.tabs.get(»tabId«, function (tab) {`  · ASSIGN:identifier
  75. L980 `if (»storageKey«) {`  · ASSIGN:identifier
  76. L998 `} else if (»request.type« === 'saveWindowInfo') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  77. L974 `setWindowState(»storageKey«, windowState.Closed);`  · ASSIGN:identifier
  78. L981 `tabId = »getTabId(storageKey) || tabId«;`  · ASSIGN:identifier, ASSIGN:logical-right
  79. L999 `if (»!!storageKey«) {`  · ASSIGN:identifier, ASSIGN:unary
  80. L1007 `} else if (»request.type« === 'isAlive') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  81. L983 `if (»tabId« === -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  82. L1000 `setWindowState(»storageKey«, windowState.Opened, sender.tab);`  · ASSIGN:identifier
  83. L1008 `isWindowAlive(»tabId, storageKey«, callback);`  · ASSIGN:identifier
  84. L74 `if (»storageKey«) {`  · ASSIGN:identifier
  85. L75 `tabId = »getTabId(storageKey) || tabId«;`  · ASSIGN:identifier, ASSIGN:logical-right
  86. L78 `if (»tabId« === -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  87. L79 `console.log(»`${storageKey} isAlive ignored for tabId ${tabId} `«);`  · ASSIGN:identifier, ASSIGN:template-literal
  88. L88 `chrome.tabs.get(»tabId«, function (tab) {`  · ASSIGN:identifier
  89. L1009 `} else if (»request.type« === 'restoreSeriesViewer') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  90. L984 `console.log(»`${storageKey} reloadWindow ignored for tabId ${tabId}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  91. L987 `chrome.tabs.get(»tabId«, function (tab) {`  · ASSIGN:identifier
  92. L1004 `windowId: »windowId«,`  · ASSIGN:identifier
  93. L1002 (→L1006) `»            callback({«`  · ELEMENT:object.setProperty
  94. L1005 `tabId: »tabId«`  · ASSIGN:identifier
  95. L1010 `if (»request.windowId«) {`  · ASSIGN:identifier, ELEMENT:member-element
  96. L1034 `} else if (»request.type« === 'tabInfo') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  97. L1012 `chrome.windows.get(»request.windowId«, function (win) {`  · ASSIGN:identifier, ELEMENT:member-element
  98. L1021 `} else if (»request.parentWindowId«) {`  · ASSIGN:identifier, ELEMENT:member-element
  99. L1035 `if (»request?.urlCheckKeyList?.length« > 0) { // get tab details based on the given URL`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left
  100. L1040 `} else if (»request.type« === 'onWindowRemoved') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  101. L1023 `chrome.windows.get(»request.parentWindowId«, function (win) {`  · ASSIGN:identifier, ELEMENT:member-element
  102. L1036 `return getTabInfoContainsUrlKey(»request.urlCheckKeyList, callback, storageKey«, true);`  · ASSIGN:identifier, ELEMENT:member-element
  103. L309 `if (»!urlCheckKeyList || urlCheckKeyList.length === 0 || !callback«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  104. L1038 `return getTabInfo(»windowId«, callback);`  · ASSIGN:identifier
  105. L1041 `if (»!!storageKey && !!callback«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
  106. L1045 `} else if (»request.type« === 'registerWindowClosedEvent') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  107. L1042 `setWindowCloseCallback(»storageKey«, callback);`  · ASSIGN:identifier
  108. L447 `if (»!storageKey«) return;`  · ASSIGN:identifier, ASSIGN:unary
  109. L452 `const »callbacks = windowCloseCallbackMap.get(storageKey) || []«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  110. L455 `windowCloseCallbackMap.set(»storageKey«, callbacks);`  · ASSIGN:identifier
  111. L1046 `if (»!!request.listenerKey«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  112. L1049 `} else if (»request.type« === 'onRegisterListener') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  113. L1050 `if (»!!storageKey && !!request.listenerKey«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  114. L1054 `} else if (»request.type« === 'onStartPolling') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  115. L1051 `handleOnRegisterListner(»request.listenerKey, storageKey, request.targetParams, request«, sender);`  · ASSIGN:identifier, ELEMENT:member-element
  116. L634 `if (»!listenerKey«) return;`  · ASSIGN:identifier, ASSIGN:unary
  117. L636 `setListener(»listenerKey, listenerStorageKey, request«);`  · ASSIGN:identifier
  118. L503 `if (»!listenerKey || !storageKey«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  119. L509 `let listenerItem = listenerMap.get(»listenerKey«) || null;`  · ASSIGN:identifier
  120. L516 `const »listenerItemRequests = listenerItem.get(storageKey) || []«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  121. L512 `listenerMap.set(»listenerKey«, listenerItem);`  · ASSIGN:identifier
  122. L521 `listenerItemRequests.push(»request«);`  · ASSIGN:identifier
  123. L525 `listenerItem.set(»storageKey«, listenerItemRequests);`  · ASSIGN:identifier
  124. L639 `if (»!!targetParams?.storageKey«) { // update target window storage key`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  125. L640 `»targetParams.storageKey = appendHostNameOnStorageKey(targetParams.storageKey«, sender);`  · ASSIGN:identifier, ELEMENT:member-element
  126. L653 `if (»!!storageKey«) { // Only from Synapse7.3.000 onwards`  · ASSIGN:identifier, ASSIGN:unary
  127. L657 `return »storageKey«;`  · ASSIGN:identifier
  128. L655 `storageKey = »`${storageKey}_${hostname}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  129. L643 `switch (»listenerKey«) {`  · ASSIGN:identifier
  130. L645 `bindIntegratedWindowCloseEvent(»targetParams?.storageKey, listenerKey«);`  · ASSIGN:identifier, ELEMENT:member-element
  131. L689 `if (»!storageKey || !listenerKey«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  132. L695 `let positionInfo = integratedWindowPosMap.get(»storageKey«) || null;`  · ASSIGN:identifier
  133. L700 `if (positionInfo.listenerKeys.indexOf(»listenerKey«) === -1) {`  · ASSIGN:identifier
  134. L701 `positionInfo.listenerKeys.push(»listenerKey«);`  · ASSIGN:identifier
  135. L697 `»positionInfo = { tabInfo: null, listenerKeys: [] }«;`  · ELEMENT:object.setProperty
  136. L704 `integratedWindowPosMap.set(»storageKey«, positionInfo);`  · ASSIGN:identifier
  137. L1055 `if (»!!request.listenerKey && !!request.pollingUrl && !!request.pollingInterval && !!request.pollingAuthorization«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  138. L1059 `} else if (»request.type« === 'onBroadcastSubscriptionStatus') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  139. L1056 `initializePolling(»request.listenerKey, request.pollingUrl, request.pollingInterval, request.pollingAuthorization, request.pollingContentType«);`  · ASSIGN:identifier, ELEMENT:member-element
  140. L529 `let timer = pollingTimerMap.get(»listenerKey«) || null;`  · ASSIGN:identifier
  141. L531 `console.log("Polling time already initialied for " + »listenerKey«);`  · ASSIGN:identifier, ASSIGN:binary-right
  142. L544 `}, »pollingInterval, listenerKey, pollingUrl, pollingAuthorization, pollingContentType«);`  · ASSIGN:identifier
  143. L537 `const responseData = await fetchUrl(»pollingUrl, pollingAuthorization, pollingContentType«);`  · ASSIGN:identifier
  144. L550 (→L557) `const response = await fetch(»url,«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  145. L554 `Authorization: »authorization«,`  · ASSIGN:identifier
  146. L555 `'Content-Type': »contentType«`  · ASSIGN:identifier
  147. L545 `pollingTimerMap.set(»listenerKey«, timer);`  · ASSIGN:identifier
  148. L1060 `if (»!!request.listenerKey && !!request.cacheStatus«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  149. L1064 `} else if (»request.type« === 'onStopPolling') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  150. L1061 `onPollingSuccess(»request.listenerKey, request.cacheStatus«);`  · ASSIGN:identifier, ELEMENT:member-element
  151. L566 `onListnerSuccess(»listenerKey, 'onPollingSuccess', responseData«);`  · ASSIGN:identifier
  152. L606 `const listenerItem = listenerMap.get(»listenerKey«) || null;`  · ASSIGN:identifier
  153. L620 `listenerKey: »listenerKey«,`  · ASSIGN:identifier
  154. L617 (→L623) `»                        chrome.tabs.sendMessage(getTabId(storageKey),«`  · ELEMENT:object.setProperty
  155. L622 `responseData: »responseData«`  · ASSIGN:identifier
  156. L1065 `handlePollingMapOnWindowClosed(»tabId«, (storageKey) => getTabId(storageKey));`  · ASSIGN:identifier
  157. L579 `if (»winId« === getWinIdFunc(storageKey)) {`  · ASSIGN:identifier, ASSIGN:binary-left
  158. L1067 `} else if (»request.type« === 'startHeartBeat') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  159. L95 `setWindowState(»storageKey«, windowState.Closed);`  · ASSIGN:identifier
  160. L104 `setWindowState(»storageKey«, windowState.Opened, tab);`  · ASSIGN:identifier
  161. L243 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  162. L242 (→L265) `»            chrome.windows.create({«`  · ELEMENT:object.setProperty
  163. L254 `left: »request.left«,`  · ASSIGN:identifier, ELEMENT:member-element
  164. L253 (→L258) `»                    chrome.windows.update(win.id, {«`  · ELEMENT:object.setProperty
  165. L255 `top: »request.top«,`  · ASSIGN:identifier, ELEMENT:member-element
  166. L256 `height: »request.height«,`  · ASSIGN:identifier, ELEMENT:member-element
  167. L257 `width: »request.width«`  · ASSIGN:identifier, ELEMENT:member-element
  168. L260 `setWindowState(»storageKey«, windowState.Opened, win.tabs[0]);`  · ASSIGN:identifier
  169. L261 `»callback({ 'type': 'openwindow', windowId: win.id, tabId: win.tabs[0].id, windowStorageKey: storageKey })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  170. L264 `handleOpenWindowFailed(»storageKey, () => openWindowInDefaultPosition(storageKey, request«, sender.tab.incognito, callback));`  · ASSIGN:identifier
  171. L412 `const winStateInfo = getWindowState(»storageKey«);`  · ASSIGN:identifier
  172. L415 `removeWindowState(»storageKey«);`  · ASSIGN:identifier
  173. L146 `windowStateMap?.delete(»storageKey«);`  · ASSIGN:identifier
  174. L349 `setWindowState(»storageKey«, windowState.Opening);`  · ASSIGN:identifier
  175. L351 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  176. L350 (→L364) `»        chrome.windows.create({«`  · ELEMENT:object.setProperty
  177. L359 `setWindowState(»storageKey«, windowState.Opened, win.tabs[0]);`  · ASSIGN:identifier
  178. L360 `»callback({ 'type': 'openwindow', windowId: win.id, tabId: win.tabs[0].id, windowStorageKey: storageKey })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  179. L269 `handleOpenWindowFailed(request.storageKey, () => openWindowInDefaultPosition(»storageKey, request«, sender.tab.incognito, callback));`  · ASSIGN:identifier
  180. L292 `handleOpenWindowFailed(»storageKey, () => openWindowInDefaultPosition(storageKey, request«, sender.tab.incognito, callback));`  · ASSIGN:identifier
  181. L296 `handleOpenWindowFailed(request.storageKey, () => openWindowInDefaultPosition(»storageKey, request«, sender.tab.incognito, callback));`  · ASSIGN:identifier
  182. L317 `for (»let urlKey of urlCheckKeyList«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  183. L318 `if (»urlKey?.length« > 0) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  184. L362 `handleOpenWindowFailed(»storageKey«);`  · ASSIGN:identifier
  185. L390 `url: »request.url«,`  · ASSIGN:identifier, ELEMENT:member-element
  186. L389 (→L403) `»            chrome.windows.create({«`  · ELEMENT:object.setProperty
  187. L398 `setWindowState(»storageKey«, windowState.Opened, win.tabs[0]);`  · ASSIGN:identifier
  188. L399 `»callback({ 'type': 'openwindow', windowId: win.id, tabId: win.tabs[0].id, windowStorageKey: storageKey })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  189. L401 `handleOpenWindowFailed(»storageKey«);`  · ASSIGN:identifier
  190. L518 `return obj.listenerId === »request.listenerId«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
  191. L774 `console.log(»`[ERR] handleRestore failed for windowId ${windowId} Exception:${reason} Last error: ${chrome.runtime.lastError}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  192. L780 `const width = »request.width, height = request.height«;`  · ASSIGN:identifier, ELEMENT:member-element
  193. L781 `let left = »request.left, top = request.top«;`  · ASSIGN:identifier, ELEMENT:member-element
  194. L786 `const overlapX = »Math.max(0, Math.min(left + width, screen.left + screen.width) - Math.max(left, screen.left))«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max
  195. L796 `left = »Math.round(Math.max(bestScreen.left, Math.min(left, bestScreen.left + bestScreen.width - request.width)))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max, RETURN:Math.round
  196. L787 `const overlapY = »Math.max(0, Math.min(top + height, screen.top + screen.height) - Math.max(top, screen.top))«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max
  197. L797 `top = »Math.round(Math.max(bestScreen.top, Math.min(top, bestScreen.top + bestScreen.height - request.height)))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max, RETURN:Math.round
  198. L788 `const overlapArea = »overlapX * overlapY«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  199. L799 (→L810) `chrome.windows.update(»windowId, {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  200. L801 `»left«,`  · ASSIGN:identifier
  201. L802 `»top«,`  · ASSIGN:identifier
  202. L803 `»height«,`  · ASSIGN:identifier
  203. L804 `»width«`  · ASSIGN:identifier
  204. L789 `if (»overlapArea > maxOverlap«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  205. L790 `maxOverlap = »overlapArea«;`  · ASSIGN:identifier
  206. L775 `»return callback({ 'type': 'restore', windowId: windowId, currentWindow: null });«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  207. L808 `console.log(»`[ERR] handleRestore failed for windowId ${windowId} after position auto adjustment completed. Exception:${errorReason} Last error: ${chrome.runtime.lastError}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  208. L809 `»return callback({ 'type': 'restore', windowId: windowId, currentWindow: null });«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  209. L848 `openWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  210. L850 `const »requestUrl = new URL(request.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor
  211. L852 `if (»requestUrl.pathname« !== tabUrl.pathname) {`  · ELEMENT:member-element, ASSIGN:binary-left
  212. L854 `openWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  213. L870 `openTabWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  214. L872 `const »requestUrl = new URL(request.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor
  215. L874 `if (»requestUrl.pathname« !== tabUrl.pathname) {`  · ELEMENT:member-element, ASSIGN:binary-left
  216. L876 `openTabWindow(»storageKey, request«, sender, callback);`  · ASSIGN:identifier
  217. L906 `chrome.windows.update(»windowId«, { state: 'normal' }).then((win) => {`  · ASSIGN:identifier
  218. L949 `windowId: »windowId«`  · ASSIGN:identifier
  219. L946 (→L953) `»                                chrome.tabs.highlight(«`  · ELEMENT:object.setProperty
  220. L1013 `chrome.windows.update(»windowId«, {`  · ASSIGN:identifier
  221. L1024 `chrome.windows.update(»windowId«, {`  · ASSIGN:identifier

---

## Flow #5 — CHROME_SYSTEM_DISPLAY

- **Source**: `CHROME_SYSTEM_DISPLAY` — `bsWindowManagement` L778:C8 -> L811:C10 (spans to L811)  `»chrome.system.display.getInfo((displays) => {«`
- **Sink(s)**:
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L799:C12 -> L805:C14 (spans to L805)  `»chrome.windows.update(windowId, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (686 raw steps → 14 distinct lines):
   1. L778 (→L811) `»        chrome.system.display.getInfo((displays) => {«`  · ELEMENT:object.setProperty
   2. L784 `let bestScreen = »screens[0]«, maxOverlap = -1;`  · ELEMENT:member-element-container
   3. L785 (→L793) `for (»const screen of screens) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   4. L786 `const overlapX = »Math.max(0, Math.min(left + width, screen.left + screen.width) - Math.max(left, screen.left))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max
   5. L796 `left = »Math.round(Math.max(bestScreen.left, Math.min(left, bestScreen.left + bestScreen.width - request.width)))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max, RETURN:Math.round
   6. L787 `const overlapY = »Math.max(0, Math.min(top + height, screen.top + screen.height) - Math.max(top, screen.top))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max
   7. L797 `top = »Math.round(Math.max(bestScreen.top, Math.min(top, bestScreen.top + bestScreen.height - request.height)))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max, RETURN:Math.round
   8. L788 `const overlapArea = »overlapX * overlapY«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   9. L801 `»left«,`  · ASSIGN:identifier
  10. L799 (→L810) `»            chrome.windows.update(windowId, {«`  · ELEMENT:object.setProperty
  11. L802 `»top«,`  · ASSIGN:identifier
  12. L789 `if (»overlapArea > maxOverlap«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  13. L790 `maxOverlap = »overlapArea«;`  · ASSIGN:identifier
  14. L791 `bestScreen = »screen«;`  · ASSIGN:identifier

---

## Flow #6 — CHROME_SYSTEM_DISPLAY (system.display)

- **Source**: `CHROME_SYSTEM_DISPLAY` — `bsWindowManagement` L784:C29 -> L784:C39  `let bestScreen = »screens[0]«, maxOverlap = -1;`
- **Sink(s)**:
  - `CHROME_WINDOWS_UPDATE_OPTIONS` — `bsWindowManagement` L799:C12 -> L805:C14 (spans to L805)  `»chrome.windows.update(windowId, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (684 raw steps → 13 distinct lines):
   1. L784 `let bestScreen = »screens[0]«, maxOverlap = -1;`  · ELEMENT:member-element-container
   2. L785 (→L793) `for (»const screen of screens) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L786 `const overlapX = »Math.max(0, Math.min(left + width, screen.left + screen.width) - Math.max(left, screen.left))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max
   4. L796 `left = »Math.round(Math.max(bestScreen.left, Math.min(left, bestScreen.left + bestScreen.width - request.width)))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max, RETURN:Math.round
   5. L787 `const overlapY = »Math.max(0, Math.min(top + height, screen.top + screen.height) - Math.max(top, screen.top))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max
   6. L797 `top = »Math.round(Math.max(bestScreen.top, Math.min(top, bestScreen.top + bestScreen.height - request.height)))«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.min, RETURN:Math.max, RETURN:Math.round
   7. L788 `const overlapArea = »overlapX * overlapY«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
   8. L801 `»left«,`  · ASSIGN:identifier
   9. L799 (→L810) `»            chrome.windows.update(windowId, {«`  · ELEMENT:object.setProperty
  10. L802 `»top«,`  · ASSIGN:identifier
  11. L789 `if (»overlapArea > maxOverlap«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  12. L790 `maxOverlap = »overlapArea«;`  · ASSIGN:identifier
  13. L791 `bestScreen = »screen«;`  · ASSIGN:identifier

---
