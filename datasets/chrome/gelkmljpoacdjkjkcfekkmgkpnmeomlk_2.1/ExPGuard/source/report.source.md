# Source-level Taint Flow — gelkmljpoacdjkjkcfekkmgkpnmeomlk 2.1

- Source type: CRX
- Files with issues: 4 / 9
- Distinct taint flows: 5  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/auth` L143:C8 -> L143:C15  `if (»request«.meta == 'startVerifyCallback') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (dontShowVerifyError) — `background/auth` L160:C8 -> L160:C67  `»chrome.storage.local.set({dontShowVerifyError:request.val})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (51 raw steps → 7 distinct lines):
   1. L143 `if (»request.meta« == 'startVerifyCallback') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L148 `}  else if (»request.meta« == 'endVerifyCallback') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L151 `}  else if (»request.meta« == 'verifying') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L156 `} else if (»request.meta«=='getVerifyError') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L159 `} else if (»request.meta« == 'dontShowVerifyError') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L160 `»chrome.storage.local.set({dontShowVerifyError:request.val})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   7. L161 `} else if (»request.meta« == 'getShowVerifyError') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L437:C49 -> L437:C56  `console.log('external message:', »request«);`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L445:C50 -> L445:C162  `sendResponse(await (await »fetch(`${apiUrl}/projectJSON/${request.blId}?username=${uname}`, { headers: { authorization: currentBlToken } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L440:C47 -> L440:C148  `sendResponse((await (await »fetch(`${apiUrl}/lsId/${request.scratchId}/${uname}`, { headers: { authorization: currentBlToken } })«).text()).replaceAll('"', ''));`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L448:C46 -> L448:C167  `sendResponse(await (await »fetch(`${apiUrl}/changesSince/${request.blId}/${request.version}`, { headers: { authorization: currentBlToken, uname } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L459:C20 -> L459:C155  `»fetch(`${apiUrl}/projectSaved/${request.scratchId}/${request.version}`, { method: 'POST', headers: { authorization: currentBlToken } })«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L462:C20 -> L462:C217  `»fetch(`${apiUrl}/projectSavedJSON/${request.blId}/${request.version}`, { method: 'POST', body: request.json, headers: { 'Content-Type': 'application/json', authorization: currentBlToken, uname } })«;`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L462:C20 -> L462:C217  `»fetch(`${apiUrl}/projectSavedJSON/${request.blId}/${request.version}`, { method: 'POST', body: request.json, headers: { 'Content-Type': 'application/json', authorization: currentBlToken, uname } })«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L467:C46 -> L472:C26 (spans to L472)  `sendResponse(await (await »fetch(`${apiUrl}/newProject/${request.scratchId}/${await refreshUsername()}?title=${encodeURIComponent(request.title)}`,«`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L467:C46 -> L472:C26 (spans to L472)  `sendResponse(await (await »fetch(`${apiUrl}/newProject/${request.scratchId}/${await refreshUsername()}?title=${encodeURIComponent(request.title)}`,«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L474:C41 -> L477:C22 (spans to L477)  `let response = await »fetch(`${apiUrl}/share/${request.id}/${request.username}/${uname}?pk=${request.pk}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L481:C20 -> L484:C22 (spans to L484)  `»fetch(`${apiUrl}/unshare/${request.id}/${request.user}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L486:C46 -> L486:C139  `sendResponse(await (await »fetch(`${apiUrl}/share/${request.id}`, { headers: { authorization: currentBlToken, uname } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L488:C47 -> L488:C149  `sendResponse((await (await »fetch(`${apiUrl}/projectTitle/${request.blId}`, { headers: { authorization: currentBlToken, uname } })«).json()).title);`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L490:C20 -> L493:C22 (spans to L493)  `»fetch(`${apiUrl}/leaveScratchId/${request.scratchId}/${await refreshUsername()}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L495:C20 -> L498:C22 (spans to L498)  `»fetch(`${apiUrl}/leaveLSId/${request.blId}/${await refreshUsername()}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L500:C46 -> L500:C140  `sendResponse(await (await »fetch(`${apiUrl}/active/${request.id}`, { headers: { authorization: currentBlToken, uname } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L306:C28 -> L306:C69  `let res = await »fetch(`${apiUrl}/userExists/${username}`)«;`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (265 raw steps → 44 distinct lines):
   1. L437 `console.log('external message:', »request«);`  · ASSIGN:identifier
   2. L438 `if (»request.meta« == 'getBlId') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L439 `if (»!request.scratchId || request.scratchId == '.'«) { return ''; }`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   4. L443 `} else if (»request.meta« == 'getJson') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   5. L445 `sendResponse(await (await fetch(»`${apiUrl}/projectJSON/${request.blId}?username=${uname}`«, { headers: { authorization: currentBlToken } })).json());`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
   6. L447 `} else if (»request.meta« == 'getChanges') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L440 `sendResponse((await (await fetch(»`${apiUrl}/lsId/${request.scratchId}/${uname}`«, { headers: { authorization: currentBlToken } })).text()).replaceAll('"', ''));`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
   8. L448 `sendResponse(await (await fetch(»`${apiUrl}/changesSince/${request.blId}/${request.version}`«, { headers: { authorization: currentBlToken, uname } })).json());`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
   9. L449 `} else if (»request.meta« == 'getUsername') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L451 `} else if (»request.meta« == 'getUsernamePlus') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L455 `} else if (»request.meta« == 'callback') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L457 `} else if (»request.meta« == 'projectSaved') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L459 `fetch(»`${apiUrl}/projectSaved/${request.scratchId}/${request.version}`«, { method: 'POST', headers: { authorization: currentBlToken } });`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  14. L460 `} else if (»request.meta« == 'projectSavedJSON') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L462 `»fetch(`${apiUrl}/projectSavedJSON/${request.blId}/${request.version}`, { method: 'POST', body: request.json, headers: { 'Content-Type': 'application/json', authorization: currentBlToken, uname } })«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:object.setProperty
  16. L463 `} else if (»request.meta« == 'myStuff') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L465 `} else if (»request.meta« == 'create') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L467 (→L472) `sendResponse(await (await fetch(»`${apiUrl}/newProject/${request.scratchId}/${await refreshUsername()}?title=${encodeURIComponent(request.title)}`,«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:encodeURIComponent, ASSIGN:template-literal, ELEMENT:object.setProperty
  19. L470 `body: »request.json«,`  · ASSIGN:identifier, ELEMENT:member-element
  20. L473 `} else if (»request.meta« == 'shareWith') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L474 `let response = await fetch(»`${apiUrl}/share/${request.id}/${request.username}/${uname}?pk=${request.pk}`«, {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  22. L480 `} else if (»request.meta« == 'unshareWith') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L481 `fetch(»`${apiUrl}/unshare/${request.id}/${request.user}`«, {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  24. L485 `} else if (»request.meta« == 'getShared') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L486 `sendResponse(await (await fetch(»`${apiUrl}/share/${request.id}`«, { headers: { authorization: currentBlToken, uname } })).json());`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  26. L487 `} else if (»request.meta« == 'getTitle') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  27. L488 `sendResponse((await (await fetch(»`${apiUrl}/projectTitle/${request.blId}`«, { headers: { authorization: currentBlToken, uname } })).json()).title);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  28. L489 `} else if (»request.meta« == 'leaveScratchId') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  29. L490 `fetch(»`${apiUrl}/leaveScratchId/${request.scratchId}/${await refreshUsername()}`«, {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  30. L494 `} else if (»request.meta« == 'leaveLSId') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L495 `fetch(»`${apiUrl}/leaveLSId/${request.blId}/${await refreshUsername()}`«, {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  32. L499 `} else if (»request.meta« == 'getActive') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L500 `sendResponse(await (await fetch(»`${apiUrl}/active/${request.id}`«, { headers: { authorization: currentBlToken, uname } })).json());`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  34. L501 `} else if (»request.meta« == 'getUrl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L502 `sendResponse(await chrome.runtime.getURL(»request.for«));`  · ASSIGN:identifier, ELEMENT:member-element
  36. L503 `} else if (»request.meta« == 'isPingEnabled') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  37. L505 `} else if (»request.meta« == 'userExists') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  38. L506 `sendResponse(await testUserExists(»request.username«));`  · ASSIGN:identifier, ELEMENT:member-element
  39. L301 `username = »username.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  40. L302 `if (»username« in userExistsStore) {`  · ASSIGN:identifier
  41. L306 `let res = await fetch(»`${apiUrl}/userExists/${username}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  42. L304 `return userExistsStore[»username«];`  · ASSIGN:identifier
  43. L309 `userExistsStore[»username«] = answer;`  · ASSIGN:identifier
  44. L507 `}  else if (»request.meta« == 'badges?') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #3 — ELEMENT_VALUE (From storage.local.set('server-url') in popups/script)  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L105:C13 -> L105:C18  `let portI»ds = «{};`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L254:C36 -> L254:C132  `let json = await (await »fetch(`${apiUrl}/verify/test?username=${uname}`, { headers: { authorization: currentBlToken } })«).json();`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L445:C50 -> L445:C162  `sendResponse(await (await »fetch(`${apiUrl}/projectJSON/${request.blId}?username=${uname}`, { headers: { authorization: currentBlToken } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L440:C47 -> L440:C148  `sendResponse((await (await »fetch(`${apiUrl}/lsId/${request.scratchId}/${uname}`, { headers: { authorization: currentBlToken } })«).text()).replaceAll('"', ''));`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L448:C46 -> L448:C167  `sendResponse(await (await »fetch(`${apiUrl}/changesSince/${request.blId}/${request.version}`, { headers: { authorization: currentBlToken, uname } })«).json());`  (url-control=PARTIAL)
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L454:C20 -> L454:C76  `»sendResponse({ uname, signedin, currentBlToken, apiUrl})«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L459:C20 -> L459:C155  `»fetch(`${apiUrl}/projectSaved/${request.scratchId}/${request.version}`, { method: 'POST', headers: { authorization: currentBlToken } })«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L462:C20 -> L462:C217  `»fetch(`${apiUrl}/projectSavedJSON/${request.blId}/${request.version}`, { method: 'POST', body: request.json, headers: { 'Content-Type': 'application/json', authorization: currentBlToken, uname } })«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L464:C46 -> L464:C166  `sendResponse(await (await »fetch(`${apiUrl}/userProjectsScratch/${await makeSureUsernameExists()}`, { headers: { authorization: currentBlToken } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L467:C46 -> L472:C26 (spans to L472)  `sendResponse(await (await »fetch(`${apiUrl}/newProject/${request.scratchId}/${await refreshUsername()}?title=${encodeURIComponent(request.title)}`,«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L474:C41 -> L477:C22 (spans to L477)  `let response = await »fetch(`${apiUrl}/share/${request.id}/${request.username}/${uname}?pk=${request.pk}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L481:C20 -> L484:C22 (spans to L484)  `»fetch(`${apiUrl}/unshare/${request.id}/${request.user}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L486:C46 -> L486:C139  `sendResponse(await (await »fetch(`${apiUrl}/share/${request.id}`, { headers: { authorization: currentBlToken, uname } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L488:C47 -> L488:C149  `sendResponse((await (await »fetch(`${apiUrl}/projectTitle/${request.blId}`, { headers: { authorization: currentBlToken, uname } })«).json()).title);`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L490:C20 -> L493:C22 (spans to L493)  `»fetch(`${apiUrl}/leaveScratchId/${request.scratchId}/${await refreshUsername()}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L495:C20 -> L498:C22 (spans to L498)  `»fetch(`${apiUrl}/leaveLSId/${request.blId}/${await refreshUsername()}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L500:C46 -> L500:C140  `sendResponse(await (await »fetch(`${apiUrl}/active/${request.id}`, { headers: { authorization: currentBlToken, uname } })«).json());`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L306:C28 -> L306:C69  `let res = await »fetch(`${apiUrl}/userExists/${username}`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L132:C12 -> L135:C14 (spans to L135)  `»fetch(`${apiUrl}/linkScratch/${id}/${blId}/${uname}`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L148:C32 -> L148:C126  `let info = await (await »fetch(apiUrl + `/userRedirect/${id}/${uname}`, { headers: { authorization: currentBlToken } })«).json();`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (100 raw steps → 31 distinct lines):
   1. L105 `let port»Ids = «{};`  · ASSIGN:identifier, ASSIGN:unary
   2. L112 _(in `popups/script`)_ `»chrome.storage.local.set({'server-url': value})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L16 (→L22) `»        chrome.storage.local.get(key, (result) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: server-url, sender: popups/script, receiver: background]
   4. L31 `return »serverUrl || 'https://livescratchapi.waakul.com'«;`  · ASSIGN:identifier, ASSIGN:logical-left
   5. L42 `»apiUrl = await getApiUrl()«;`  · ELEMENT:implicit.add
   6. L181 `const »URLApiUrl = new URL(apiUrl)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor
   7. L182 `const URLApiDomain = »URLApiUrl.origin«;`  · ELEMENT:member-element
   8. L183 `const »URLApiPath = [''].concat(URLApiUrl.pathname.split('/').filter(Boolean)).join('/')«;`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:array.concat.scalar, ELEMENT:member-element-container, RETURN:array.join
   9. L184 `const »socket = io.connect(URLApiDomain, { path: `${URLApiPath}/socket.io/`, jsonp: false, transports: ['websocket', 'xhr-polling', 'polling', 'htmlfile', 'flashsocket'] })«;`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
  10. L254 `let json = await (await fetch(»`${apiUrl}/verify/test?username=${uname}`«, { headers: { authorization: currentBlToken } })).json();`  · ASSIGN:identifier, ASSIGN:template-literal
  11. L445 `sendResponse(await (await fetch(»`${apiUrl}/projectJSON/${request.blId}?username=${uname}`«, { headers: { authorization: currentBlToken } })).json());`  · ASSIGN:identifier, ASSIGN:template-literal
  12. L440 `sendResponse((await (await fetch(»`${apiUrl}/lsId/${request.scratchId}/${uname}`«, { headers: { authorization: currentBlToken } })).text()).replaceAll('"', ''));`  · ASSIGN:identifier, ASSIGN:template-literal
  13. L448 `sendResponse(await (await fetch(»`${apiUrl}/changesSince/${request.blId}/${request.version}`«, { headers: { authorization: currentBlToken, uname } })).json());`  · ASSIGN:identifier, ASSIGN:template-literal
  14. L453 `»console.log({ uname, signedin, currentBlToken, apiUrl})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L454 `»sendResponse({ uname, signedin, currentBlToken, apiUrl})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L459 `fetch(»`${apiUrl}/projectSaved/${request.scratchId}/${request.version}`«, { method: 'POST', headers: { authorization: currentBlToken } });`  · ASSIGN:identifier, ASSIGN:template-literal
  17. L462 `fetch(»`${apiUrl}/projectSavedJSON/${request.blId}/${request.version}`«, { method: 'POST', body: request.json, headers: { 'Content-Type': 'application/json', authorization: currentBlToken, uname } });`  · ASSIGN:identifier, ASSIGN:template-literal
  18. L464 `sendResponse(await (await fetch(»`${apiUrl}/userProjectsScratch/${await makeSureUsernameExists()}`«, { headers: { authorization: currentBlToken } })).json());`  · ASSIGN:identifier, ASSIGN:template-literal
  19. L467 `sendResponse(await (await fetch(»`${apiUrl}/newProject/${request.scratchId}/${await refreshUsername()}?title=${encodeURIComponent(request.title)}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  20. L474 `let response = await fetch(»`${apiUrl}/share/${request.id}/${request.username}/${uname}?pk=${request.pk}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  21. L481 `fetch(»`${apiUrl}/unshare/${request.id}/${request.user}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  22. L486 `sendResponse(await (await fetch(»`${apiUrl}/share/${request.id}`«, { headers: { authorization: currentBlToken, uname } })).json());`  · ASSIGN:identifier, ASSIGN:template-literal
  23. L488 `sendResponse((await (await fetch(»`${apiUrl}/projectTitle/${request.blId}`«, { headers: { authorization: currentBlToken, uname } })).json()).title);`  · ASSIGN:identifier, ASSIGN:template-literal
  24. L490 `fetch(»`${apiUrl}/leaveScratchId/${request.scratchId}/${await refreshUsername()}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  25. L495 `fetch(»`${apiUrl}/leaveLSId/${request.blId}/${await refreshUsername()}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  26. L500 `sendResponse(await (await fetch(»`${apiUrl}/active/${request.id}`«, { headers: { authorization: currentBlToken, uname } })).json());`  · ASSIGN:identifier, ASSIGN:template-literal
  27. L306 `let res = await fetch(»`${apiUrl}/userExists/${username}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  28. L61 `»sendResponse({apiURL: apiUrl})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  29. L132 `fetch(»`${apiUrl}/linkScratch/${id}/${blId}/${uname}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  30. L148 `let info = await (await fetch(»apiUrl« + `/userRedirect/${id}/${uname}`, { headers: { authorization: currentBlToken } })).json();`  · ASSIGN:identifier, ASSIGN:binary-left
  31. L519 `»sendResponse({ uname, signedin, currentBlToken, apiUrl})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE (input#server-url)

- **Source**: `ELEMENT_VALUE` — `popups/script` L105:C13 -> L105:C18  `if (!»value«) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (server-url) — `popups/script` L112:C16 -> L112:C63  `»chrome.storage.local.set({'server-url': value})«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (5 raw steps → 2 distinct lines):
   1. L105 `if (»!value«) {`  · ASSIGN:identifier, ASSIGN:unary
   2. L112 `»chrome.storage.local.set({'server-url': value})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE (#add)  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popups/script` L202:C12 -> L202:C16  `if (»name«.toLowerCase() in alreadyAdded) { return; }`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popups/script` L208:C29 -> L208:C130  `let response = await »fetch(`${apiUrl}/friends/${username}/${name}`, { method: 'POST', headers: { authorization: token } })«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `popups/script` L222:C8 -> L222:C111  `»fetch(`${apiUrl}/friends/${username}/${name}`, { method: 'DELETE', headers: { authorization: token } })«;`  (url-control=PARTIAL)
  - `CHROME_TABS_CREATE_OPTIONS` — `popups/script` L177:C19 -> L177:C87  `else { »chrome.tabs.create({ url: `https://scratch.mit.edu/users/${name}` })«; }`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (67 raw steps → 15 distinct lines):
   1. L202 `if (»name.toLowerCase()« in alreadyAdded) { return; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   2. L203 `if (»name.toLowerCase()« == username.toLowerCase()) { return; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   3. L204 `if (»!name.trim()«) { return; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   4. L205 `if (»name.includes(' ')«) { return; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   5. L208 `let response = await fetch(»`${apiUrl}/friends/${username}/${name}`«, { method: 'POST', headers: { authorization: token } });`  · ASSIGN:identifier, ASSIGN:template-literal
   6. L211 `addFriendGUI(»name«);`  · ASSIGN:identifier
   7. L169 `if (»name?.toLowerCase()« in alreadyAdded) { return; }`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L170 `alreadyAdded[»name.toLowerCase()«] = true;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L173 `item.username = »name«;`  · ASSIGN:identifier
  10. L174 `item.innerHTML = `<span class="friend-name" >@${sanitize(»name«)}</span>  <span class="x" href="page2.html">x</span>`;`  · ASSIGN:identifier
  11. L155 `string = String(»string«);`  · ASSIGN:identifier
  12. L176 `if (e.target?.classList?.contains('x')) { removeFriend(»name«) }`  · ASSIGN:identifier
  13. L220 `if (child.username == »name«) { child.remove(); break; }`  · ASSIGN:identifier, ASSIGN:binary-right
  14. L222 `fetch(»`${apiUrl}/friends/${username}/${name}`«, { method: 'DELETE', headers: { authorization: token } });`  · ASSIGN:identifier, ASSIGN:template-literal
  15. L177 `else { »chrome.tabs.create({ url: `https://scratch.mit.edu/users/${name}` })«; }`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty

---
