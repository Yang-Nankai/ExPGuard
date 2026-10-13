# Source-level Taint Flow — bjnkkhimoaclnddigpphpgkfgeggokam 3.6.4

- Source type: CRX
- Files with issues: 4 / 6
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 11 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(levelup))

- **Source**: `TARGET_CUSTOM_EVENT` — `scripts/background` L135:C0 -> L306:C2 (spans to L306)  `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `scripts/background` L208:C32 -> L248:C38 (spans to L248)  `»chrome.declarativeNetRequest.updateDynamicRules({«`
  - `WINDOW_POSTMESSAGE` (*) — `scripts/background` L344:C4 -> L344:C81  `»window.postMessage({ type: message, category: category, content: data }, '*')«;`
  - `WINDOW_POSTMESSAGE` (*) — `scripts/background` L341:C4 -> L341:C66  `»window.postMessage({ type: message, category: category }, '*')«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (934 raw steps → 36 distinct lines):
   1. L135 (→L306) `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/app->scripts/background]`
   2. L143 `if (»!(message.type === 'Page')«) return [3 /*break*/, 1];`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:unary
   3. L144 `c = »message.category«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L145 `switch (»c«) {`  · ASSIGN:identifier
   5. L147 `content = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L157 `content = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
   7. L263 `if (»!(message.type === 'reset')«) return [3 /*break*/, 3];`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:unary
   8. L163 `content = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
   9. L170 `if (»message.content« === 'On') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L177 `sendResponse(»content«);`  · ASSIGN:identifier
  11. L173 `else if (»message.content« === 'Off')`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  12. L180 `content = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
  13. L186 `content = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
  14. L192 `impersonationResponse_1 = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
  15. L193 `if (»impersonationResponse_1.users.length === 0 || !impersonationResponse_1.impersonateRequest.canImpersonate«)`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  16. L278 `if (»!(message.type === 'impersonation' || message.type === 'search')«) return [3 /*break*/, 5];`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
  17. L198 `content: »impersonationResponse_1.users«,`  · ASSIGN:identifier, ELEMENT:member-element
  18. L195 (→L199) `»                            chrome.runtime.sendMessage({«`  · ELEMENT:object.setProperty
  19. L200 `if (»impersonationResponse_1.impersonateRequest.isActive«) {`  · ASSIGN:identifier, ELEMENT:member-element
  20. L279 `impersonizationMessage = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
  21. L203 `isImpersonationActive: »impersonationResponse_1.impersonateRequest.isActive«,`  · ASSIGN:identifier, ELEMENT:member-element
  22. L201 (→L207) `»                                chrome.storage.local.set((_a = {},«`  · ELEMENT:object.setProperty
  23. L204 `userName: »impersonationResponse_1.impersonateRequest.userName«,`  · ASSIGN:identifier, ELEMENT:member-element
  24. L205 `userFullName: »impersonationResponse_1.users[0].fullName«,`  · ASSIGN:identifier, ELEMENT:member-element
  25. L220 `value: »impersonationResponse_1.users[0].userId«,`  · ASSIGN:identifier, ELEMENT:member-element
  26. L208 (→L248) `»                                chrome.declarativeNetRequest.updateDynamicRules({«`  · ELEMENT:object.setProperty
  27. L225 `regexFilter: »impersonationResponse_1.impersonateRequest.url« + "api/*",`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  28. L288 `args: [»message.type.toString(), message.category.toString(), impersonizationMessage«],`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  29. L285 (→L289) `»                    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  30. L344 `»window.postMessage({ type: message, category: category, content: data }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  31. L299 `args: [»message.type.toString(), message.category.toString()«],`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  32. L296 (→L300) `»                    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  33. L341 `»window.postMessage({ type: message, category: category }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  34. L239 `renderBadge(»impersonationResponse_1.impersonateRequest.url«);`  · ASSIGN:identifier, ELEMENT:member-element
  35. L321 `localSettingForEnv = (_a.sent())[»url«];`  · ASSIGN:identifier
  36. L317 `if (»!url«)`  · ASSIGN:identifier, ASSIGN:unary

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(levelup))

- **Source**: `TARGET_CUSTOM_EVENT` — `scripts/options` L144:C4 -> L159:C6 (spans to L159)  `»chrome.runtime.onMessage.addListener(function (message) {«`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `scripts/options` L153:C60 -> L153:C69  `document.querySelector('datalist#userList').»innerHTML« = users`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (220 raw steps → 5 distinct lines):
   1. L144 (→L159) `»    chrome.runtime.onMessage.addListener(function (message) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/app->scripts/options]; runtime.single.sender.message[scripts/background->scripts/options]`
   2. L148 `if (»message.type !== 'search' || message.category !== 'Impersonation'«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   3. L150 `users = »message.content«;`  · ASSIGN:identifier, ELEMENT:member-element
   4. L151 `if (»users.length« > 0)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
   5. L153 (→L155) `document.querySelector('datalist#userList').innerHTML = »users«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty

---
