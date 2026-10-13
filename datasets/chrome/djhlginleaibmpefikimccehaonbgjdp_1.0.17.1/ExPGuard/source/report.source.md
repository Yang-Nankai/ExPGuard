# Source-level Taint Flow — djhlginleaibmpefikimccehaonbgjdp 1.0.17.1

- Source type: CRX
- Files with issues: 8 / 15
- Distinct taint flows: 3  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(ggsel:integrity-captured))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L419:C0 -> L505:C2 (spans to L505)  `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (twitchClientIntegrity) — `background` L409:C10 -> L412:C6 (spans to L412)  `await »chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (20 raw steps → 9 distinct lines):
   1. L419 (→L505) `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content/twitch.integrity.bridge->background]`
   2. L400 `const value = »integrity.trim«();`  · ASSIGN:identifier, ELEMENT:member-element-container
   3. L401 `if (»!value || !value.startsWith('v4.local.')«) return;`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   4. L405 `if (current === »value«) {`  · ASSIGN:identifier, ASSIGN:binary-right
   5. L410 `[INTEGRITY_STORAGE_KEY]: »value«,`  · ASSIGN:identifier
   6. L409 (→L412) `»    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   7. L29 _(in `common/usherBypass`)_ `const »normalized = typeof token === 'string' ? token.trim() : ''«;`  · ELEMENT:implicit.add
   8. L41 _(in `common/usherBypass`)_ `const »integrityRaw = typeof clientIntegrity === 'string' ? clientIntegrity.trim() : ''«;`  · ELEMENT:implicit.add
   9. L42 _(in `common/usherBypass`)_ `const »deviceIdRaw = typeof deviceId === 'string' ? deviceId.trim() : ''«;`  · ELEMENT:implicit.add

---

## Flow #2 — CHROME_COOKIES_INFO

- **Source**: `CHROME_COOKIES_INFO` — `background` L102:C10 -> L102:C16  `if (»cookie« && typeof cookie.value === 'string' && cookie.value.trim()) {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (twitchAuthToken) — `background` L197:C14 -> L200:C10 (spans to L200)  `await »chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (twitchDeviceId) — `background` L210:C14 -> L210:C77  `await »chrome.storage.local.set({ [DEVICE_ID_STORAGE_KEY]: deviceId })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (111 raw steps → 19 distinct lines):
   1. L102 `if (»cookie && typeof cookie.value === 'string' && cookie.value.trim()«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
   2. L103 `return »cookie.value.trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L113 `»return readTwitchCookieValue('auth-token');«`  · ELEMENT:implicit.add
   4. L117 `»return readTwitchCookieValue('unique_id');«`  · ELEMENT:implicit.add
   5. L196 `if (»token && token !== current«) {`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   6. L197 (→L200) `»        await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   7. L202 `} else if (»!token && current«) {`  · ASSIGN:logical-left
   8. L205 `} else if (»token && current«) {`  · ASSIGN:logical-left
   9. L209 `if (»deviceId && deviceId !== currentDeviceId«) {`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  10. L210 `»await chrome.storage.local.set({ [DEVICE_ID_STORAGE_KEY]: deviceId })«;`  · ELEMENT:object.setProperty
  11. L211 `} else if (»!deviceId && currentDeviceId«) {`  · ASSIGN:logical-left
  12. L221 (→L224) `»    await applyUsherBypassRules(token, enableQuality, true, settings.apiBase, {«`  · ELEMENT:object.setProperty
  13. L152 (→L159) `»  const update = buildUsherBypassRulesUpdate({«`  · ELEMENT:object.setProperty
  14. L157 `clientIntegrity: »extras && extras.clientIntegrity«,`  · ASSIGN:logical-left
  15. L158 `deviceId: »extras && extras.deviceId«,`  · ASSIGN:logical-left
  16. L29 _(in `common/usherBypass`)_ `const normalized = typeof token === 'string' ? »token.trim«() : '';`  · ELEMENT:member-element-container
  17. L41 _(in `common/usherBypass`)_ `const integrityRaw = typeof clientIntegrity === 'string' ? »clientIntegrity.trim«() : '';`  · ELEMENT:member-element-container
  18. L42 _(in `common/usherBypass`)_ `const deviceIdRaw = typeof deviceId === 'string' ? »deviceId.trim«() : '';`  · ELEMENT:member-element-container
  19. L164 `const have2kCreds = Boolean(»extras && extras.clientIntegrity && extras.deviceId«);`  · ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #3 — TARGET_CUSTOM_EVENT (From storage.local.set('twitchClientIntegrity') in background)  ·  2× duplicate paths collapsed

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L419:C0 -> L505:C2 (spans to L505)  `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`
- **Sink(s)**:
  - `CHROME_DECLARATIVENETREQUEST_RULES` — `background` L162:C10 -> L162:C40  `await »dnr.updateDynamicRules(update)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (25 raw steps → 11 distinct lines):
   1. L419 (→L505) `»chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content/twitch.integrity.bridge->background]`
   2. L400 `const value = »integrity.trim«();`  · ASSIGN:identifier, ELEMENT:member-element-container
   3. L401 `if (»!value || !value.startsWith('v4.local.')«) return;`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   4. L405 `if (»current === value«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
   5. L410 `[INTEGRITY_STORAGE_KEY]: »value«,`  · ASSIGN:identifier
   6. L409 (→L412) `»    await chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   7. L29 _(in `common/usherBypass`)_ `const »normalized = typeof token === 'string' ? token.trim() : ''«;`  · ELEMENT:implicit.add
   8. L41 _(in `common/usherBypass`)_ `const »integrityRaw = typeof clientIntegrity === 'string' ? clientIntegrity.trim() : ''«;`  · ELEMENT:implicit.add
   9. L42 _(in `common/usherBypass`)_ `const »deviceIdRaw = typeof deviceId === 'string' ? deviceId.trim() : ''«;`  · ELEMENT:implicit.add
  10. L403 `const stored = await »chrome.storage.local.get([INTEGRITY_STORAGE_KEY])«;`  · STORAGE:STORAGE_FLOW[area: local, key: twitchClientIntegrity, sender: background, receiver: background]
  11. L404 `const current = typeof stored[INTEGRITY_STORAGE_KEY] === 'string' ? »stored[INTEGRITY_STORAGE_KEY]« : '';`  · ASSIGN:conditional-consequent

---
