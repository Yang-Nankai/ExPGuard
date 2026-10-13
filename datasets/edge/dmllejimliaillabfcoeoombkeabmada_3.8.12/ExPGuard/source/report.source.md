# Source-level Taint Flow — dmllejimliaillabfcoeoombkeabmada 3.8.12

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 2  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 12 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L10940:C10 -> L10940:C24  `»...event?.data«`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (unknown) — `content` L5253:C16 -> L5253:C35  `await »storage2.set(items)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (42 raw steps → 14 distinct lines):
   1. L10940 `»...event?.data«`  · COPY:object-spread
   2. L10942 `switch (»event.data.type«) {`  · ELEMENT:member-element
   3. L10950 `extensionMode: »event.data.extensionMode«`  · ELEMENT:member-element
   4. L10949 (→L10951) `»            makeExtensionVisible({«`  · ELEMENT:object.setProperty
   5. L5440 `if (»extensionMode« === messageTypes.iconMode) {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L5442 `} else if (»extensionMode« === messageTypes.fullMode) {`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L10957 `if (»event.data.key && event.data.value«) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   8. L10959 `[»event.data.key«]: {`  · ELEMENT:member-element
   9. L10961 `...await storage.getItem(»event.data.key«),`  · ELEMENT:member-element
  10. L5260 `const result = await storage2.get(»key«);`  · ASSIGN:identifier
  11. L5261 `const value = result[»key«];`  · ASSIGN:identifier
  12. L10963 `»...JSON.parse(event.data.value)«`  · ELEMENT:member-element, RETURN:json.parse, COPY:object-spread
  13. L10958 (→L10965) `»              storage.setItem({«`  · ELEMENT:object.setProperty
  14. L10901 (→L10935) `»      chrome.runtime.onMessage.addListener(async (request) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->content]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))  ·  2× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L604:C2 -> L728:C4 (spans to L728)  `»chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `background` L793:C6 -> L793:C57  `»localStorage.setItem(STORAGE_KEY.AUTH_KEY, authKey)«;`
  - `CHROME_SESSION_STORAGE` (authKey) — `background` L91:C16 -> L91:C35  `await »storage2.set(items)«;`
  - `CHROME_SESSION_STORAGE` (authValue) — `background` L91:C16 -> L91:C35  `await »storage2.set(items)«;`
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `background` L794:C6 -> L794:C61  `»localStorage.setItem(STORAGE_KEY.AUTH_VALUE, authValue)«;`
  - `FETCH_BODY` (https://api.mixpanel.com/track) — `background` L372:C4 -> L378:C6 (spans to L378)  `»fetch(reqUrl, {«`
  - `CHROME_SESSION_STORAGE` (storage.fuzzy.settings) — `background` L91:C16 -> L91:C35  `await »storage2.set(items)«;`
  - `FETCH_BODY` (https://catalog-service-api.faircado.com/api/v1/supported-website) — `background` L235:C29 -> L242:C8 (spans to L242)  `const response = await »fetch(IS_SUPPORTED_WEBSITE_API, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (415 raw steps → 51 distinct lines):
   1. L604 (→L728) `»  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L605 `switch (»request.type«) {`  · ELEMENT:member-element
   3. L615 `if (»request.authKey && request.authValue«) {`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   4. L616 `storeAuthData(»request.authKey, request.authValue«);`  · ELEMENT:member-element
   5. L793 `localStorage.setItem(STORAGE_KEY.AUTH_KEY, »authKey«);`  · ASSIGN:identifier
   6. L797 `»authKey«,`  · ASSIGN:identifier
   7. L796 (→L799) `»      await syncStorage.setItem({«`  · ELEMENT:object.setProperty
   8. L798 `»authValue«`  · ASSIGN:identifier
   9. L794 `localStorage.setItem(STORAGE_KEY.AUTH_VALUE, »authValue«);`  · ASSIGN:identifier
  10. L617 `distributeAuthData(»request.authKey, request.authValue«);`  · ELEMENT:member-element
  11. L627 `event: »request.detail«,`  · ELEMENT:member-element
  12. L625 (→L633) `»        trackEvent({«`  · ELEMENT:object.setProperty
  13. L629 `message: »request.message«,`  · ELEMENT:member-element
  14. L630 `url: »request.url«`  · ELEMENT:member-element
  15. L364 (→L371) `»    mixpanelData.properties = {«`  · ELEMENT:object.setProperty
  16. L365 `»...mixpanelData.properties«,`  · COPY:object-spread
  17. L372 (→L380) `»    fetch(reqUrl, {«`  · ELEMENT:object.setProperty
  18. L377 `body: »JSON.stringify([mixpanelData])«`  · RETURN:json.stringify
  19. L638 `event: »request.eventName«,`  · ELEMENT:member-element
  20. L636 (→L643) `»        trackEvent({«`  · ELEMENT:object.setProperty
  21. L640 `»...request.payload«`  · ELEMENT:member-element, COPY:object-spread
  22. L646 `if (»!request.isSnoozed«) {`  · ELEMENT:member-element, ASSIGN:unary
  23. L708 `sessionStorage.setItem(»request.items«).then(sendResponse);`  · ELEMENT:member-element
  24. L91 `await storage2.set(»items«);`  · ASSIGN:identifier
  25. L141 `»items«`  · ASSIGN:identifier
  26. L713 `sessionStorage.getItem(»request.key«).then(sendResponse);`  · ELEMENT:member-element
  27. L98 `const result = await storage2.get(»key«);`  · ASSIGN:identifier
  28. L99 `const value = result[»key«];`  · ASSIGN:identifier
  29. L137 `getItem: (key) => chrome.runtime.sendMessage({ type: InternalMessageTypes.GetItemFromSessionStorage, »key« }),`  · ASSIGN:identifier
  30. L718 `sessionStorage.removeItem(»request.key«).then(sendResponse);`  · ELEMENT:member-element
  31. L115 `await storage2.remove(»key«);`  · ASSIGN:identifier
  32. L138 `removeItem: (key) => chrome.runtime.sendMessage({ type: InternalMessageTypes.RemoveItemFromSessionStorage, »key« }),`  · ASSIGN:identifier
  33. L665 `const supportedResponse = await fetchIsSupportedWebsite(»request.url«);`  · ELEMENT:member-element
  34. L233 `const »data = { url }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  35. L241 `body: »JSON.stringify(data)«`  · RETURN:json.stringify
  36. L235 (→L242) `»      const response = await fetch(IS_SUPPORTED_WEBSITE_API, {«`  · ELEMENT:object.setProperty
  37. L673 `const websiteData = findSite(»request.url«, supportedSites);`  · ELEMENT:member-element
  38. L897 `const siteName = getSiteName(»url«);`  · ASSIGN:identifier
  39. L874 `const domainName = »url.replace(/http(s)?:\/\/|www\.|\/.*/g, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  40. L875 `return »removeSubdomain(domainName).split(".")[0].toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  41. L886 `const s = »domainName.replace(knownSubdomainsRegExp, "")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  42. L887 `const parts = »s.split(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  43. L888 `while (»parts.length« > 3) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  44. L889 `»parts.shift()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  45. L891 `if (»parts.length === 3 && (parts[1].length > 2 && parts[2].length > 2 || secondTLDs.indexOf(parts[1]) === -1 && firstTLDs.indexOf(parts[2]) === -1)«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  46. L892 `»parts.shift()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  47. L894 `return »parts.join(".")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  48. L774 `»authKey«,`  · ASSIGN:identifier
  49. L772 (→L776) `»        chrome.tabs.sendMessage(tab.id, {«`  · ELEMENT:object.setProperty
  50. L775 `»authValue«`  · ASSIGN:identifier
  51. L899 `(site) => »site.website_name !== undefined && site.website_name === siteName«`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right

---
