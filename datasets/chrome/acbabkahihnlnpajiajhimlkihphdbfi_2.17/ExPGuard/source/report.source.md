# Source-level Taint Flow — acbabkahihnlnpajiajhimlkihphdbfi 2.17

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 10  (collapsed from 241 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('myPassword') in background)  ·  3× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `content` L31:C0 -> L62:C2 (spans to L62)  `»chrome.runtime.onMessage.addListener(function (message, sender, reply) {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (myKey) — `content` L33:C2 -> L33:C46  `»chrome.storage.local.set({ myKey: message })«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (178 raw steps → 12 distinct lines):
   1. L31 (→L62) `»chrome.runtime.onMessage.addListener(function (message, sender, reply) {«`  · MESSAGE, ELEMENT:implicit.add
      ⇄ cross-context hop: `runtime.single.sender.message[background->content]`
   2. L33 `»chrome.storage.local.set({ myKey: message })«;`  · ELEMENT:object.setProperty
   3. L35 `if (»message.data« == 'start') {`  · ELEMENT:member-element, ASSIGN:binary-left
   4. L36 `readApijson = »message.readData«`  · ELEMENT:member-element
   5. L45 `} else if (»message.data« == "stop") {`  · ELEMENT:member-element, ASSIGN:binary-left
   6. L37 `allowedUrlsList = »message.allowedUrl«`  · ELEMENT:member-element
   7. L48 `} else if (»message.data« == 'refresh') {`  · ELEMENT:member-element, ASSIGN:binary-left
   8. L38 `Clientid = »message.clientID«`  · ELEMENT:member-element
   9. L50 `} else if (»message.data« == "passwaord") {`  · ELEMENT:member-element, ASSIGN:binary-left
  10. L53 `if (»message.data« === "analysis background") {`  · ELEMENT:member-element, ASSIGN:binary-left
  11. L58 `if(»message.key« === "set-alert-extensions"){`  · ELEMENT:member-element, ASSIGN:binary-left
  12. L59 `return »message.data«`  · ELEMENT:member-element

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `background` L194:C0 -> L238:C2 (spans to L238)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (lastParsedMessage) — `background` L531:C14 -> L533:C10 (spans to L533)  `await »chrome.storage.local.set({«`
  - `FETCH_BODY` (https://3l7giimka4.execute-api.us-east-1.amazonaws.com/Prod/gesturelog) — `background` L570:C31 -> L577:C10 (spans to L577)  `const response = await »fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1170 raw steps → 8 distinct lines):
   1. L194 (→L238) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L529 `typeof message === "string" ? »JSON.parse(message) : message«;`  · ASSIGN:identifier, RETURN:json.parse, ASSIGN:conditional-alternate
   3. L531 (→L533) `»        await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   4. L547 `msg: »`${parsedMessage?.Remark || ""} ${parsedMessage?.url || ""}`«,`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:template-literal
   5. L543 (→L552) `»        const payload = {«`  · ELEMENT:object.setProperty
   6. L548 `url: »parsedMessage?.url || ""«,`  · ELEMENT:member-element, ASSIGN:logical-left
   7. L575 `body: »JSON.stringify(data)«,`  · RETURN:json.stringify
   8. L570 (→L577) `»        const response = await fetch(url, {«`  · ELEMENT:object.setProperty

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L293:C38 -> L293:C45  `Sendmsgcontentscript: »request«?.key || null,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (Sendmsgcontentscript) — `background` L292:C18 -> L296:C14 (spans to L296)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (ClearBlockingkey) — `background` L292:C18 -> L296:C14 (spans to L296)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (candidateData) — `background` L451:C26 -> L454:C22 (spans to L454)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (clientId) — `background` L462:C26 -> L465:C22 (spans to L465)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (examId) — `background` L462:C26 -> L465:C22 (spans to L465)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (clientId) — `background` L481:C26 -> L484:C22 (spans to L484)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (examId) — `background` L481:C26 -> L484:C22 (spans to L484)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (myPassword) — `background` L499:C26 -> L501:C22 (spans to L501)  `await »chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (259 raw steps → 24 distinct lines):
   1. L293 `Sendmsgcontentscript: »request?.key || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   2. L292 (→L296) `»            await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   3. L294 `ClearBlockingkey: »request || null«,`  · ASSIGN:identifier, ASSIGN:logical-left
   4. L302 `if (»request« === "uninstall") {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L308 `if (»request« === "closedTab") {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L334 `if (»request« === "examCompleted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L367 `if (»request« === "examStarted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L380 `if (»request« === "check-extension") {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L428 `if (»request« === "open-chrom-extensions") {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L434 `if (»request« === "blockExtension") {`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L450 `if (»request.key« === "candidateDetails") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L452 `candidateData: »request.value«,`  · ASSIGN:identifier, ELEMENT:member-element
  13. L451 (→L454) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  14. L460 `if (»request.key« === "checkInstallation") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L463 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  16. L462 (→L465) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  17. L464 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  18. L479 `if (»request.key« === "installExtension") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L482 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  20. L481 (→L484) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  21. L483 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  22. L497 `if (»request.key« === "candidatePassword") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L500 `myPassword: »request.value«`  · ASSIGN:identifier, ELEMENT:member-element
  24. L499 (→L501) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---

## Flow #4 — CHROME_MANAGEMENT_INFO

- **Source**: `CHROME_MANAGEMENT_INFO` — `background` L1133:C14 -> L1133:C59  `const »extensions = await chrome.management.getAll()«;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (installedExtension) — `background` L1145:C14 -> L1145:C62  `await »chrome.storage.local.set({ installedExtension })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 2 distinct lines):
   1. L1133 `const »extensions = await chrome.management.getAll()«;`  · ELEMENT:object.setProperty
   2. L1145 `»await chrome.storage.local.set({ installedExtension })«;`  · ELEMENT:object.setProperty

---

## Flow #5 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L673:C22 -> L673:C71  `const »cookies = await chrome.cookies.getAll({ domain })«;`
- **Sink(s)**:
  - `CHROME_COOKIES_REMOVE_OPTIONS` — `background` L679:C26 -> L682:C22 (spans to L682)  `await »chrome.cookies.remove({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (972 raw steps → 6 distinct lines):
   1. L673 `const »cookies = await chrome.cookies.getAll({ domain })«;`  · ELEMENT:object.setProperty
   2. L675 (→L683) `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L677 `const cookieUrl = »`${protocol}//${cookie.domain.replace(/^\./, "")}${cookie.path}`«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
   4. L680 `url: »cookieUrl«,`  · ASSIGN:identifier
   5. L679 (→L682) `»                    await chrome.cookies.remove({«`  · ELEMENT:object.setProperty
   6. L681 `name: »cookie.name«`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #6 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('candidateData') in background)  ·  24× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L293:C38 -> L293:C45  `Sendmsgcontentscript: »request«?.key || null,`
- **Sink(s)**:
  - `FETCH_BODY` (https://3l7giimka4.execute-api.us-east-1.amazonaws.com/Prod/gesturelog) — `background` L570:C31 -> L577:C10 (spans to L577)  `const response = await »fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (260 raw steps → 25 distinct lines):
   1. L293 `Sendmsgcontentscript: »request?.key || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   2. L292 (→L296) `»            await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   3. L294 `ClearBlockingkey: »request || null«,`  · ASSIGN:identifier, ASSIGN:logical-left
   4. L302 `if (»request« === "uninstall") {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L308 `if (»request« === "closedTab") {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L334 `if (»request« === "examCompleted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L367 `if (»request« === "examStarted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L380 `if (»request« === "check-extension") {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L428 `if (»request« === "open-chrom-extensions") {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L434 `if (»request« === "blockExtension") {`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L450 `if (»request.key« === "candidateDetails") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L452 `candidateData: »request.value«,`  · ASSIGN:identifier, ELEMENT:member-element
  13. L451 (→L454) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  14. L460 `if (»request.key« === "checkInstallation") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L463 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  16. L462 (→L465) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  17. L464 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  18. L479 `if (»request.key« === "installExtension") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L482 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  20. L481 (→L484) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  21. L483 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  22. L497 `if (»request.key« === "candidatePassword") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L500 `myPassword: »request.value«`  · ASSIGN:identifier, ELEMENT:member-element
  24. L499 (→L501) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  25. L183 `return await »chrome.storage.local.get(keys)«;`  · STORAGE:STORAGE_FLOW[area: local, key: candidateData, sender: background, receiver: background]

---

## Flow #7 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('clientId') in background)  ·  150× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L293:C38 -> L293:C45  `Sendmsgcontentscript: »request«?.key || null,`
- **Sink(s)**:
  - `FETCH_BODY` (https://examroomapi.com/api/Allowedextensions/Extension) — `background` L1164:C31 -> L1173:C10 (spans to L1173)  `const response = await »fetch('https://examroomapi.com/api/Allowedextensions/Extension', {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L75:C31 -> L77:C9 (spans to L77)  `const response = await »fetch(«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L831:C39 -> L833:C17 (spans to L833)  `const response = await »fetch(«`  (url-control=PARTIAL)
  - `CHROME_LOCAL_STORAGE` (allowedUrlsList) — `background` L864:C18 -> L871:C14 (spans to L871)  `await »chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (290 raw steps → 28 distinct lines):
   1. L293 `Sendmsgcontentscript: »request?.key || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   2. L292 (→L296) `»            await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   3. L294 `ClearBlockingkey: »request || null«,`  · ASSIGN:identifier, ASSIGN:logical-left
   4. L302 `if (»request« === "uninstall") {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L308 `if (»request« === "closedTab") {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L334 `if (»request« === "examCompleted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L367 `if (»request« === "examStarted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L380 `if (»request« === "check-extension") {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L428 `if (»request« === "open-chrom-extensions") {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L434 `if (»request« === "blockExtension") {`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L450 `if (»request.key« === "candidateDetails") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L452 `candidateData: »request.value«,`  · ASSIGN:identifier, ELEMENT:member-element
  13. L451 (→L454) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  14. L460 `if (»request.key« === "checkInstallation") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L463 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  16. L462 (→L465) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  17. L464 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  18. L479 `if (»request.key« === "installExtension") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L482 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  20. L481 (→L484) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  21. L483 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  22. L497 `if (»request.key« === "candidatePassword") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L500 `myPassword: »request.value«`  · ASSIGN:identifier, ELEMENT:member-element
  24. L499 (→L501) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  25. L1162 `await »chrome.storage.local.get(["clientId", "examId"])«;`  · STORAGE:STORAGE_FLOW[area: local, key: clientId, sender: background, receiver: background]
  26. L1170 `clientId: »clientId || ""«,`  · ASSIGN:identifier, ASSIGN:logical-left
  27. L1164 (→L1173) `»        const response = await fetch('https://examroomapi.com/api/Allowedextensions/Extension', {«`  · ELEMENT:object.setProperty
  28. L1169 (→L1172) `»            body: JSON.stringify({«`  · RETURN:json.stringify

---

## Flow #8 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('examId') in background)  ·  36× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L293:C38 -> L293:C45  `Sendmsgcontentscript: »request«?.key || null,`
- **Sink(s)**:
  - `FETCH_BODY` (https://examroomapi.com/api/Allowedextensions/Extension) — `background` L1164:C31 -> L1173:C10 (spans to L1173)  `const response = await »fetch('https://examroomapi.com/api/Allowedextensions/Extension', {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (290 raw steps → 28 distinct lines):
   1. L293 `Sendmsgcontentscript: »request?.key || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   2. L292 (→L296) `»            await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   3. L294 `ClearBlockingkey: »request || null«,`  · ASSIGN:identifier, ASSIGN:logical-left
   4. L302 `if (»request« === "uninstall") {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L308 `if (»request« === "closedTab") {`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L334 `if (»request« === "examCompleted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   7. L367 `if (»request« === "examStarted") {`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L380 `if (»request« === "check-extension") {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L428 `if (»request« === "open-chrom-extensions") {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L434 `if (»request« === "blockExtension") {`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L450 `if (»request.key« === "candidateDetails") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L452 `candidateData: »request.value«,`  · ASSIGN:identifier, ELEMENT:member-element
  13. L451 (→L454) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  14. L460 `if (»request.key« === "checkInstallation") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L463 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  16. L462 (→L465) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  17. L464 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  18. L479 `if (»request.key« === "installExtension") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L482 `clientId: »request.clientId || null«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  20. L481 (→L484) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  21. L483 `examId: »request.examIdToUnblock || null«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  22. L497 `if (»request.key« === "candidatePassword") {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L500 `myPassword: »request.value«`  · ASSIGN:identifier, ELEMENT:member-element
  24. L499 (→L501) `»                    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  25. L1162 `await »chrome.storage.local.get(["clientId", "examId"])«;`  · STORAGE:STORAGE_FLOW[area: local, key: examId, sender: background, receiver: background]
  26. L1171 `examId: »examId || ""«`  · ASSIGN:identifier, ASSIGN:logical-left
  27. L1164 (→L1173) `»        const response = await fetch('https://examroomapi.com/api/Allowedextensions/Extension', {«`  · ELEMENT:object.setProperty
  28. L1169 (→L1172) `»            body: JSON.stringify({«`  · RETURN:json.stringify

---

## Flow #9 — CHROME_MANAGEMENT_INFO (From storage.local.set('installedExtension') in background)  ·  18× duplicate paths collapsed

- **Source**: `CHROME_MANAGEMENT_INFO` — `background` L1133:C14 -> L1133:C59  `const »extensions = await chrome.management.getAll()«;`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L419:C16 -> L423:C17 (spans to L423)  `»sendResponse(«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (22 raw steps → 5 distinct lines):
   1. L1133 `const »extensions = await chrome.management.getAll()«;`  · ELEMENT:object.setProperty
   2. L1145 `»await chrome.storage.local.set({ installedExtension })«;`  · ELEMENT:object.setProperty
   3. L408 `await »chrome.storage.local.get("installedExtension")«;`  · STORAGE:STORAGE_FLOW[area: local, key: installedExtension, sender: background, receiver: background]
   4. L412 (→L416) `»                    await chrome.tabs.sendMessage(examTabId, {«`  · ELEMENT:object.setProperty
   5. L421 `? »`${installedExtension}`«`  · ASSIGN:template-literal, ASSIGN:conditional-consequent

---

## Flow #10 — DOCUMENT_LOCATION (From storage.local.set('lastParsedMessage') in background)  ·  6× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `background` L194:C0 -> L238:C2 (spans to L238)  `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://3l7giimka4.execute-api.us-east-1.amazonaws.com/Prod/gesturelog) — `background` L570:C31 -> L577:C10 (spans to L577)  `const response = await »fetch(url, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (103 raw steps → 11 distinct lines):
   1. L194 (→L238) `»chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`
   2. L529 `typeof message === "string" ? »JSON.parse(message) : message«;`  · ASSIGN:identifier, RETURN:json.parse, ASSIGN:conditional-alternate
   3. L531 (→L533) `»        await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   4. L547 `msg: »`${parsedMessage?.Remark || ""} ${parsedMessage?.url || ""}`«,`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:template-literal
   5. L543 (→L552) `»        const payload = {«`  · ELEMENT:object.setProperty
   6. L548 `url: »parsedMessage?.url || ""«,`  · ELEMENT:member-element, ASSIGN:logical-left
   7. L575 `body: »JSON.stringify(data)«,`  · RETURN:json.stringify
   8. L570 (→L577) `»        const response = await fetch(url, {«`  · ELEMENT:object.setProperty
   9. L1005 `const { candidateData, lastParsedMessage } = await »chrome.storage.local.get(["candidateData", "lastParsedMessage"])«;`  · STORAGE:STORAGE_FLOW[area: local, key: lastParsedMessage, sender: background, receiver: background]
  10. L1012 `url: candidateData ? »lastParsedMessage?.url || ""« : "",`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:conditional-consequent
  11. L1007 (→L1016) `»        const payload = {«`  · ELEMENT:object.setProperty

---
