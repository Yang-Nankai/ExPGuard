# Source-level Taint Flow — iflipbenkncalpdbamhkaleppfnlefjm 3.2.0

- Source type: CRX
- Files with issues: 3 / 7
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L17:C0 -> L210:C2 (spans to L210)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_NOTIFICATIONS_CREATE_OPTIONS` — `js/background` L166:C48 -> L171:C50 (spans to L171)  `»chrome.notifications.create({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (457 raw steps → 33 distinct lines):
   1. L17 (→L210) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[js/content_script->js/background]`
   2. L18 `switch (»request.type«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L201 `if (»request«) {`  · ASSIGN:identifier
   4. L203 `updateUser(»request«);`  · ASSIGN:identifier
   5. L24 `f = »request.f«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L25 `t = »request.t«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L26 `itemInfo = »request.itemInfo«;`  · ASSIGN:identifier, ELEMENT:member-element
   8. L27 `let _files = »request.files«;`  · ASSIGN:identifier, ELEMENT:member-element
   9. L28 `fileLength = »_files.length«;`  · ASSIGN:identifier, ELEMENT:member.length
  10. L31 `for (»let i in _files«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  11. L32 `let _file = »_files[i]«;`  · ASSIGN:identifier, ELEMENT:member-element-container
  12. L33 `let blob = dataURItoBlob(»_file.dataURL«);`  · ASSIGN:identifier, ELEMENT:member-element
  13. L34 (→L36) `let file = new File([blob], »_file.name, {«`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  14. L35 `type: »_file.type«`  · ASSIGN:identifier, ELEMENT:member-element
  15. L37 `formData.append('file', file, »_file.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  16. L65 `if (['jpg', 'png'].indexOf(»f«) >= 0) {`  · ASSIGN:identifier
  17. L85 `if (successNum == »fileLength«) {`  · ASSIGN:identifier, ASSIGN:binary-right
  18. L86 `taskId = await taskCreate(»f + '-' + t«, file, taskId, userId);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  19. L229 `if (»t« == "pdf") {`  · ASSIGN:identifier, ASSIGN:binary-left
  20. L235 `type: »type«,`  · ASSIGN:identifier
  21. L232 (→L241) `»        let res = await fetch(DOMAIN + 'user/taskCreate', {«`  · ELEMENT:object.setProperty
  22. L194 `taskCreate(»f + '-' + t«, file, taskId, userId);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  23. L89 `if (»t« == "pdf") {`  · ASSIGN:identifier, ASSIGN:binary-left
  24. L97 `from: convertExt(»f«)[0],`  · ASSIGN:identifier
  25. L98 `to: convertExt(»t«)[0],`  · ASSIGN:identifier
  26. L145 `'show_name': »_file.name.split('.').slice(0, -1).join('.') + "_converted_by_abcdpdf."« + getFileExt(result.data.url)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
  27. L143 (→L146) `»                                                converted_file = {«`  · ELEMENT:object.setProperty
  28. L148 `converted_file.size = »_file.size«;`  · ASSIGN:identifier, ELEMENT:member-element
  29. L149 `converted_file.from = »f«;`  · ASSIGN:identifier
  30. L150 `converted_file.to = »t«;`  · ASSIGN:identifier
  31. L157 (→L160) `»                                                chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  32. L168 `title: »itemInfo.title« + chrome.i18n.getMessage('notifications_conversion_complete_title'),`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L166 (→L171) `»                                                chrome.notifications.create({«`  · ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_INNER_HTML ([data-localize])

- **Source**: `ELEMENT_INNER_HTML` — `js/localize` L13:C18 -> L13:C39  `obj.innerHTML=»obj.innerHTML.replace«(/__MSG_(\w+)__/g, function (match, v1) {`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `js/localize` L13:C8 -> L13:C17  `obj.»innerHTML«=obj.innerHTML.replace(/__MSG_(\w+)__/g, function (match, v1) {`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (15 raw steps → 2 distinct lines):
   1. L13 (→L15) `obj.innerHTML=»obj.innerHTML.replace(/__MSG_(\w+)__/g, function (match, v1) {«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L9 `let »data = document.querySelectorAll('[data-localize]')«;`  · ELEMENT:object.setProperty

---
