# Source-level Taint Flow — fakegmdomhmegokfomgmkbopjibonfcp 2.4.0

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `app` L60:C73 -> L60:C79  `if (typeof action !== 'object' || typeof action.type !== 'string' || »action«.__internal) return`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `app` L52:C6 -> L52:C50  `»window.postMessage(message, location.origin)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (103 raw steps → 9 distinct lines):
   1. L60 `if (»typeof action !== 'object' || typeof action.type !== 'string' || action.__internal«) return`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
   2. L62 `if (»action.type.startsWith('metastream-')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L63 `console.debug('[Metastream Remote] Forwarding message to background', »action«)`  · ASSIGN:identifier
   4. L64 `chrome.runtime.sendMessage(»action«)`  · ASSIGN:identifier
   5. L44 (→L54) `»  chrome.runtime.onMessage.addListener((message) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->app]`
   6. L47 `if (»message.type.startsWith('metastream-')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L48 `console.debug('[Metastream Remote] Received message', »message«)`  · ASSIGN:identifier
   8. L51 `»message«.__internal = true`  · ASSIGN:identifier
   9. L52 `window.postMessage(»message«, location.origin)`  · ASSIGN:identifier

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `app` L44:C2 -> L54:C4 (spans to L54)  `»chrome.runtime.onMessage.addListener((message) => {«`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `app` L52:C6 -> L52:C50  `»window.postMessage(message, location.origin)«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (64 raw steps → 5 distinct lines):
   1. L44 (→L54) `»  chrome.runtime.onMessage.addListener((message) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->app]`
   2. L47 `if (»message.type.startsWith('metastream-')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L48 `console.debug('[Metastream Remote] Received message', »message«)`  · ASSIGN:identifier
   4. L51 `»message«.__internal = true`  · ASSIGN:identifier
   5. L52 `window.postMessage(»message«, location.origin)`  · ASSIGN:identifier

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L753:C0 -> L753:C52  `»chrome.runtime.onMessage.addListener(messageHandler)«`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L632:C4 -> L648:C6 (spans to L648)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L653:C34 -> L653:C68  `response = await asyncTimeout(»fetch(url, { ...options, signal })«, timeout)`  (url-control=FULL)
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L660:C2 -> L663:C4 (spans to L663)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L577:C2 -> L584:C4 (spans to L584)  `»storageArea.set({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L577:C2 -> L584:C4 (spans to L584)  `»storageArea.set({«`
  - `CHROME_SESSION_STORAGE` (unknown) — `background` L577:C2 -> L584:C4 (spans to L584)  `»storageArea.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (290 raw steps → 37 distinct lines):
   1. L753 `»chrome.runtime.onMessage.addListener(messageHandler)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[app->background]`
   2. L705 `if (!isValidAction(»action«)) return`  · ASSIGN:identifier
   3. L708 `if (»action.type === 'metastream-init' && isMetastreamUrl(url)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   4. L720 `switch (»action.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   5. L722 `handleWebviewEvent(sender, »action«)`  · ASSIGN:identifier
   6. L688 `sendWebviewEventToHost(parentId, TOP_FRAME, »action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
   7. L145 `{ type: 'metastream-webview-event', payload: »message«, framePath },`  · ASSIGN:identifier
   8. L143 (→L147) `»  sendToHost(«`  · ELEMENT:object.setProperty
   9. L694 `sendToFrame(»action.tabId || tabId, action.frameId, action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  10. L137 `chrome.tabs.sendMessage(»tabId, message, { frameId« })`  · ASSIGN:identifier
  11. L697 `sendWebviewEventToHost(tabId, frameId, »action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
  12. L725 `const { »requestId, url, options } = action.payload«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[url], ELEMENT:destructure-property[options]
  13. L726 `request(tabId, »requestId, url, options«)`  · ASSIGN:identifier
  14. L617 `const { »timeout } = options || {}«`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:destructure-property[timeout]
  15. L624 `const metastreamHeaders = Object.keys(»options.headers || {}«).filter(header => header.toLowerCase().startsWith('x-metastream')).map(header => ({`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  16. L630 `const ruleId = 1000 + »requestId«`  · ASSIGN:identifier, ASSIGN:binary-right
  17. L635 `"id": »ruleId«,`  · ASSIGN:identifier
  18. L632 (→L648) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  19. L642 `"urlFilter": »url«,`  · ASSIGN:identifier
  20. L652 `console.debug(»`Requesting ${url}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  21. L653 `response = await asyncTimeout(fetch(»url, { ...options, signal }), timeout«)`  · ASSIGN:identifier, COPY:object-spread
  22. L87 `new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), »timeout«))`  · ASSIGN:identifier
  23. L662 `removeRuleIds: [»ruleId«] // Use the unique rule ID generated for this request`  · ASSIGN:identifier
  24. L660 (→L663) `»  chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  25. L667 `type: »`metastream-fetch-response${requestId}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  26. L666 (→L672) `»  const action = {«`  · ELEMENT:object.setProperty
  27. L730 `const { »id: webviewId } = action.payload«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[id]
  28. L739 `requestPermissions(»action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
  29. L554 `const { »action, ...rest } = request«`  · ASSIGN:identifier, ELEMENT:destructure-property[action]
  30. L557 `chrome.permissions.request(»rest«, granted => {`  · ASSIGN:identifier
  31. L743 `updateSetting(»action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
  32. L571 `const scope = »update.scope || 'sync'«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  33. L572 `const storageArea = chrome.storage[»scope«]`  · ASSIGN:identifier
  34. L578 `[»update.key]: update.value«`  · ASSIGN:identifier, ELEMENT:member-element
  35. L577 (→L584) `»  storageArea.set({«`  · ELEMENT:object.setProperty
  36. L580 `const listeners = Array.from(settingListeners[»update.key«] || [])`  · ASSIGN:identifier, ELEMENT:member-element
  37. L582 `listener(»update.value«)`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L705:C21 -> L705:C27  `if (!isValidAction(»action«)) return`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L632:C4 -> L648:C6 (spans to L648)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L653:C34 -> L653:C68  `response = await asyncTimeout(»fetch(url, { ...options, signal })«, timeout)`  (url-control=FULL)
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L660:C2 -> L663:C4 (spans to L663)  `»chrome.declarativeNetRequest.updateSessionRules({«`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background` L577:C2 -> L584:C4 (spans to L584)  `»storageArea.set({«`
  - `CHROME_SYNC_STORAGE` (unknown) — `background` L577:C2 -> L584:C4 (spans to L584)  `»storageArea.set({«`
  - `CHROME_SESSION_STORAGE` (unknown) — `background` L577:C2 -> L584:C4 (spans to L584)  `»storageArea.set({«`
  - `CHROME_CONTENTSETTINGS_SET` (POPUPS) — `background` L545:C6 -> L548:C8 (spans to L548)  `»chrome.contentSettings.popups.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (298 raw steps → 40 distinct lines):
   1. L705 `if (!isValidAction(»action«)) return`  · ASSIGN:identifier
   2. L708 `if (»action.type === 'metastream-init' && isMetastreamUrl(url)«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left
   3. L720 `switch (»action.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   4. L722 `handleWebviewEvent(sender, »action«)`  · ASSIGN:identifier
   5. L688 `sendWebviewEventToHost(parentId, TOP_FRAME, »action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
   6. L145 `{ type: 'metastream-webview-event', payload: »message«, framePath },`  · ASSIGN:identifier
   7. L143 (→L147) `»  sendToHost(«`  · ELEMENT:object.setProperty
   8. L694 `sendToFrame(»action.tabId || tabId, action.frameId, action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   9. L137 `chrome.tabs.sendMessage(»tabId, message, { frameId« })`  · ASSIGN:identifier
  10. L697 `sendWebviewEventToHost(tabId, frameId, »action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
  11. L725 `const { »requestId, url, options } = action.payload«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[url], ELEMENT:destructure-property[options]
  12. L726 `request(tabId, »requestId, url, options«)`  · ASSIGN:identifier
  13. L617 `const { »timeout } = options || {}«`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:destructure-property[timeout]
  14. L624 `const metastreamHeaders = Object.keys(»options.headers || {}«).filter(header => header.toLowerCase().startsWith('x-metastream')).map(header => ({`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  15. L630 `const ruleId = 1000 + »requestId«`  · ASSIGN:identifier, ASSIGN:binary-right
  16. L635 `"id": »ruleId«,`  · ASSIGN:identifier
  17. L632 (→L648) `»    chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  18. L642 `"urlFilter": »url«,`  · ASSIGN:identifier
  19. L652 `console.debug(»`Requesting ${url}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  20. L653 `response = await asyncTimeout(fetch(»url, { ...options, signal }), timeout«)`  · ASSIGN:identifier, COPY:object-spread
  21. L87 `new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), »timeout«))`  · ASSIGN:identifier
  22. L662 `removeRuleIds: [»ruleId«] // Use the unique rule ID generated for this request`  · ASSIGN:identifier
  23. L660 (→L663) `»  chrome.declarativeNetRequest.updateSessionRules({«`  · ELEMENT:object.setProperty
  24. L667 `type: »`metastream-fetch-response${requestId}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  25. L666 (→L672) `»  const action = {«`  · ELEMENT:object.setProperty
  26. L730 `const { »id: webviewId } = action.payload«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:destructure-property[id]
  27. L739 `requestPermissions(»action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
  28. L554 `const { »action, ...rest } = request«`  · ASSIGN:identifier, ELEMENT:destructure-property[action]
  29. L557 `chrome.permissions.request(»rest«, granted => {`  · ASSIGN:identifier
  30. L743 `updateSetting(»action.payload«)`  · ASSIGN:identifier, ELEMENT:member-element
  31. L571 `const scope = »update.scope || 'sync'«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  32. L572 `const storageArea = chrome.storage[»scope«]`  · ASSIGN:identifier
  33. L578 `[»update.key]: update.value«`  · ASSIGN:identifier, ELEMENT:member-element
  34. L577 (→L584) `»  storageArea.set({«`  · ELEMENT:object.setProperty
  35. L580 `const listeners = Array.from(settingListeners[»update.key«] || [])`  · ASSIGN:identifier, ELEMENT:member-element
  36. L582 `listener(»update.value«)`  · ASSIGN:identifier, ELEMENT:member-element
  37. L559 `PERMISSION_ACTIONS[»action](request«)`  · ASSIGN:identifier
  38. L546 `primaryPattern: »request.origins[0]«,`  · ASSIGN:identifier, ELEMENT:member-element
  39. L545 (→L548) `»      chrome.contentSettings.popups.set({«`  · ELEMENT:object.setProperty
  40. L627 `"value": »options.headers[header]«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container

---
