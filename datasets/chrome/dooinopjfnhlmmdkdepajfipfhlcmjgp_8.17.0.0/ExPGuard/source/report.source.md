# Source-level Taint Flow — dooinopjfnhlmmdkdepajfipfhlcmjgp 8.17.0.0

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 5  (collapsed from 144 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `gen/ext_bg_module` L123:C6 -> L123:C9  `if (»req«.cmd == 'extensionCheck') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (serverUrl) — `gen/ext_bg_module` L59:C2 -> L59:C35  `»chrome.storage.local.set(keyVals)«;`
  - `CHROME_LOCAL_STORAGE` (crmConfig) — `gen/ext_bg_module` L59:C2 -> L59:C35  `»chrome.storage.local.set(keyVals)«;`
  - `CHROME_LOCAL_STORAGE` (instantDemosToken) — `gen/ext_bg_module` L59:C2 -> L59:C35  `»chrome.storage.local.set(keyVals)«;`
  - `CHROME_LOCAL_STORAGE` (reloadOnPopupClose) — `gen/ext_bg_module` L172:C4 -> L172:C74  `»chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose})«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (233 raw steps → 38 distinct lines):
   1. L123 `if (»req.cmd« == 'extensionCheck') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L128 `} else if (»req.cmd« == 'getLegacySettingsOnce') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L139 `} else if (»req.cmd« == 'setServerUrl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L142 `setServerUrl(»req.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L25 `»objStorageSet({'serverUrl': url})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L144 `} else if (»req.cmd« == 'setCrmConfig') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L145 `setCrmConfig(»req.config«);`  · ASSIGN:identifier, ELEMENT:member-element
   8. L29 `ssCrmConfig = »config«;`  · ASSIGN:identifier
   9. L30 `»objStorageSet({'crmConfig': config})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L147 `} else if (»req.cmd« == 'chromeIdleSetDetectionInterval') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L148 `chrome.idle.setDetectionInterval(»req.interval«);`  · ASSIGN:identifier, ELEMENT:member-element
  12. L150 `} else if (»req.cmd« == 'setInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L151 `setInstantDemosToken(»req.token«);`  · ASSIGN:identifier, ELEMENT:member-element
  14. L473 `»objStorageSet({instantDemosToken: token})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L153 `} else if (»req.cmd« == 'clearInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L156 `} else if (»req.cmd« == 'showPopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L157 `showPopupCommand(sender.tab.id, »req.shouldCloseCurrentTab, req.extraQueryParams«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L415 `if (»extraQueryParams«) {`  · ASSIGN:identifier
  19. L416 `url = »url + "&" + extraQueryParams«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  20. L158 `} else if (»req.cmd« == 'closeCurrentTab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L160 `} else if (»req.cmd« == 'closePopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L165 `} else if (»req.cmd« == 'reloadExtension') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L169 `} else if (»req.cmd« == 'setReloadOnPopupClose') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L172 `»chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  25. L173 `} else if (»req.cmd« == 'getManifest') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  26. L177 `} else if (»req.cmd == 'createHostPerm' || req.cmd == 'hasHostPerm' || req.cmd == 'removeHostPerm'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  27. L181 `let origins = »req.host«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L182 `if (!Array.isArray(»req.host«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  29. L183 `»origins = [ req.host ]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  30. L186 `if (»req.cmd« == 'createHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L187 (→L192) `»      chrome.permissions.request({«`  · ELEMENT:object.setProperty
  32. L193 `} else if (»req.cmd« == 'hasHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L194 (→L199) `»      chrome.permissions.contains({«`  · ELEMENT:object.setProperty
  34. L200 `} else if (»req.cmd« == 'removeHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L201 (→L206) `»      chrome.permissions.remove({«`  · ELEMENT:object.setProperty
  36. L341 `if (»ssCrmConfig && ssCrmConfig.highlevel_contact_id_pattern«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  37. L343 `let match = url.match(new RegExp(»ssCrmConfig.highlevel_contact_id_pattern«));`  · ASSIGN:identifier, ELEMENT:member-element
  38. L426 `if (»shouldCloseCurrentTab«) {`  · ASSIGN:identifier

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('serverUrl') in gen/ext_bg_module)  ·  63× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `gen/ext_bg_module` L123:C6 -> L123:C9  `if (»req«.cmd == 'extensionCheck') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (serverUrl) — `gen/ext_bg_module` L59:C2 -> L59:C35  `»chrome.storage.local.set(keyVals)«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `gen/ext_bg_module` L483:C4 -> L486:C6 (spans to L486)  `»fetch(url, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (339 raw steps → 53 distinct lines):
   1. L123 `if (»req.cmd« == 'extensionCheck') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L128 `} else if (»req.cmd« == 'getLegacySettingsOnce') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L139 `} else if (»req.cmd« == 'setServerUrl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L142 `setServerUrl(»req.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L25 `»objStorageSet({'serverUrl': url})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L144 `} else if (»req.cmd« == 'setCrmConfig') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L145 `setCrmConfig(»req.config«);`  · ASSIGN:identifier, ELEMENT:member-element
   8. L29 `ssCrmConfig = »config«;`  · ASSIGN:identifier
   9. L30 `»objStorageSet({'crmConfig': config})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L147 `} else if (»req.cmd« == 'chromeIdleSetDetectionInterval') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L148 `chrome.idle.setDetectionInterval(»req.interval«);`  · ASSIGN:identifier, ELEMENT:member-element
  12. L150 `} else if (»req.cmd« == 'setInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L151 `setInstantDemosToken(»req.token«);`  · ASSIGN:identifier, ELEMENT:member-element
  14. L473 `»objStorageSet({instantDemosToken: token})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L153 `} else if (»req.cmd« == 'clearInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L156 `} else if (»req.cmd« == 'showPopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L157 `showPopupCommand(sender.tab.id, »req.shouldCloseCurrentTab, req.extraQueryParams«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L415 `if (»extraQueryParams«) {`  · ASSIGN:identifier
  19. L416 `url = »url + "&" + extraQueryParams«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  20. L158 `} else if (»req.cmd« == 'closeCurrentTab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L160 `} else if (»req.cmd« == 'closePopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L165 `} else if (»req.cmd« == 'reloadExtension') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L169 `} else if (»req.cmd« == 'setReloadOnPopupClose') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L172 `»chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  25. L173 `} else if (»req.cmd« == 'getManifest') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  26. L177 `} else if (»req.cmd == 'createHostPerm' || req.cmd == 'hasHostPerm' || req.cmd == 'removeHostPerm'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  27. L181 `let origins = »req.host«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L182 `if (!Array.isArray(»req.host«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  29. L183 `»origins = [ req.host ]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  30. L186 `if (»req.cmd« == 'createHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L187 (→L192) `»      chrome.permissions.request({«`  · ELEMENT:object.setProperty
  32. L193 `} else if (»req.cmd« == 'hasHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L194 (→L199) `»      chrome.permissions.contains({«`  · ELEMENT:object.setProperty
  34. L200 `} else if (»req.cmd« == 'removeHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L201 (→L206) `»      chrome.permissions.remove({«`  · ELEMENT:object.setProperty
  36. L341 `if (»ssCrmConfig && ssCrmConfig.highlevel_contact_id_pattern«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  37. L343 `let match = url.match(new RegExp(»ssCrmConfig.highlevel_contact_id_pattern«));`  · ASSIGN:identifier, ELEMENT:member-element
  38. L426 `if (»shouldCloseCurrentTab«) {`  · ASSIGN:identifier
  39. L55 `»chrome.storage.local.get(keyObj, callback)«;`  · STORAGE:STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: gen/ext_bg_module]
  40. L12 `if (»value«) {`  · ASSIGN:identifier
  41. L13 `callback(»value«);`  · ASSIGN:identifier
  42. L42 `callback(»url + '/ss/zeroauth/login'« + query);`  · ASSIGN:identifier, ASSIGN:binary-left
  43. L307 `popupUrl = »popupUrl + "&customer-ref="« + encodeURIComponent('/lightning/r/' + salesforceMatch.groups['ObjectType'] + '/' + salesforceMatch.groups['WhoId']);`  · ASSIGN:identifier, ASSIGN:binary-left
  44. L312 `popupUrl = »popupUrl + "&customer-ref="« + encodeURIComponent('/crm/fakeorg/Contacts/' + zohoMatch.groups['WhoId']);`  · ASSIGN:identifier, ASSIGN:binary-left
  45. L322 `popupUrl = »popupUrl + "&customer-ref="« + encodeURIComponent('/contacts/12345/record/0-1/' + hubspotMatch.groups['WhoId']);`  · ASSIGN:identifier, ASSIGN:binary-left
  46. L327 `popupUrl = »popupUrl + "&customer-ref="« + encodeURIComponent(lessAnnoyingMatch.groups['WhoId']);`  · ASSIGN:identifier, ASSIGN:binary-left
  47. L482 `var url = »serverUrl + uri + '?'« + new URLSearchParams(params).toString();`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L483 `fetch(»url«, {`  · ASSIGN:identifier
  49. L610 `console.log('In callback for server url', »url«)`  · ASSIGN:identifier
  50. L623 `args: [ »url« ]`  · ASSIGN:identifier
  51. L620 (→L639) `»    chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty
  52. L613 `if (»url === null || url === undefined || url === ''«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  53. L616 `document.cwServerUrl = »url«;`  · ASSIGN:identifier

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('instantDemosToken') in gen/ext_bg_module)  ·  44× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `gen/ext_bg_module` L123:C6 -> L123:C9  `if (»req«.cmd == 'extensionCheck') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (instantDemosToken) — `gen/ext_bg_module` L59:C2 -> L59:C35  `»chrome.storage.local.set(keyVals)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (249 raw steps → 41 distinct lines):
   1. L123 `if (»req.cmd« == 'extensionCheck') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L128 `} else if (»req.cmd« == 'getLegacySettingsOnce') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L139 `} else if (»req.cmd« == 'setServerUrl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L142 `setServerUrl(»req.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L25 `»objStorageSet({'serverUrl': url})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L144 `} else if (»req.cmd« == 'setCrmConfig') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L145 `setCrmConfig(»req.config«);`  · ASSIGN:identifier, ELEMENT:member-element
   8. L29 `ssCrmConfig = »config«;`  · ASSIGN:identifier
   9. L30 `»objStorageSet({'crmConfig': config})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L147 `} else if (»req.cmd« == 'chromeIdleSetDetectionInterval') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L148 `chrome.idle.setDetectionInterval(»req.interval«);`  · ASSIGN:identifier, ELEMENT:member-element
  12. L150 `} else if (»req.cmd« == 'setInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L151 `setInstantDemosToken(»req.token«);`  · ASSIGN:identifier, ELEMENT:member-element
  14. L473 `»objStorageSet({instantDemosToken: token})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L153 `} else if (»req.cmd« == 'clearInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L156 `} else if (»req.cmd« == 'showPopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L157 `showPopupCommand(sender.tab.id, »req.shouldCloseCurrentTab, req.extraQueryParams«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L415 `if (»extraQueryParams«) {`  · ASSIGN:identifier
  19. L416 `url = »url + "&" + extraQueryParams«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  20. L158 `} else if (»req.cmd« == 'closeCurrentTab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L160 `} else if (»req.cmd« == 'closePopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L165 `} else if (»req.cmd« == 'reloadExtension') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L169 `} else if (»req.cmd« == 'setReloadOnPopupClose') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L172 `»chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  25. L173 `} else if (»req.cmd« == 'getManifest') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  26. L177 `} else if (»req.cmd == 'createHostPerm' || req.cmd == 'hasHostPerm' || req.cmd == 'removeHostPerm'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  27. L181 `let origins = »req.host«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L182 `if (!Array.isArray(»req.host«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  29. L183 `»origins = [ req.host ]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  30. L186 `if (»req.cmd« == 'createHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L187 (→L192) `»      chrome.permissions.request({«`  · ELEMENT:object.setProperty
  32. L193 `} else if (»req.cmd« == 'hasHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L194 (→L199) `»      chrome.permissions.contains({«`  · ELEMENT:object.setProperty
  34. L200 `} else if (»req.cmd« == 'removeHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L201 (→L206) `»      chrome.permissions.remove({«`  · ELEMENT:object.setProperty
  36. L341 `if (»ssCrmConfig && ssCrmConfig.highlevel_contact_id_pattern«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  37. L343 `let match = url.match(new RegExp(»ssCrmConfig.highlevel_contact_id_pattern«));`  · ASSIGN:identifier, ELEMENT:member-element
  38. L426 `if (»shouldCloseCurrentTab«) {`  · ASSIGN:identifier
  39. L55 `»chrome.storage.local.get(keyObj, callback)«;`  · STORAGE:STORAGE_FLOW[area: local, key: instantDemosToken, sender: gen/ext_bg_module, receiver: gen/ext_bg_module]
  40. L500 `if (»!token«) return;`  · ASSIGN:identifier, ASSIGN:unary
  41. L502 (→L509) `internalApiCall("/ss/internal/indicate_agent_availability", {active: isActive, token: »token}, function (result) {«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('serverUrl') in gen/ext_bg_module)  ·  27× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `gen/ext_bg_module` L123:C6 -> L123:C9  `if (»req«.cmd == 'extensionCheck') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (serverUrl) — `js/ext_common` L56:C2 -> L56:C35  `»chrome.storage.local.set(keyVals)«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (241 raw steps → 42 distinct lines):
   1. L123 _(in `gen/ext_bg_module`)_ `if (»req.cmd« == 'extensionCheck') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L128 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'getLegacySettingsOnce') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L139 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setServerUrl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L142 _(in `gen/ext_bg_module`)_ `setServerUrl(»req.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L25 _(in `gen/ext_bg_module`)_ `»objStorageSet({'serverUrl': url})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L144 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setCrmConfig') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L145 _(in `gen/ext_bg_module`)_ `setCrmConfig(»req.config«);`  · ASSIGN:identifier, ELEMENT:member-element
   8. L29 _(in `gen/ext_bg_module`)_ `ssCrmConfig = »config«;`  · ASSIGN:identifier
   9. L30 _(in `gen/ext_bg_module`)_ `»objStorageSet({'crmConfig': config})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L147 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'chromeIdleSetDetectionInterval') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L148 _(in `gen/ext_bg_module`)_ `chrome.idle.setDetectionInterval(»req.interval«);`  · ASSIGN:identifier, ELEMENT:member-element
  12. L150 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L151 _(in `gen/ext_bg_module`)_ `setInstantDemosToken(»req.token«);`  · ASSIGN:identifier, ELEMENT:member-element
  14. L473 _(in `gen/ext_bg_module`)_ `»objStorageSet({instantDemosToken: token})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L153 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'clearInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L156 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'showPopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L157 _(in `gen/ext_bg_module`)_ `showPopupCommand(sender.tab.id, »req.shouldCloseCurrentTab, req.extraQueryParams«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L415 _(in `gen/ext_bg_module`)_ `if (»extraQueryParams«) {`  · ASSIGN:identifier
  19. L416 _(in `gen/ext_bg_module`)_ `url = »url + "&" + extraQueryParams«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  20. L158 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'closeCurrentTab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L160 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'closePopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L165 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'reloadExtension') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L169 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setReloadOnPopupClose') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L172 _(in `gen/ext_bg_module`)_ `»chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  25. L173 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'getManifest') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  26. L177 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd == 'createHostPerm' || req.cmd == 'hasHostPerm' || req.cmd == 'removeHostPerm'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  27. L181 _(in `gen/ext_bg_module`)_ `let origins = »req.host«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L182 _(in `gen/ext_bg_module`)_ `if (!Array.isArray(»req.host«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  29. L183 _(in `gen/ext_bg_module`)_ `»origins = [ req.host ]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  30. L186 _(in `gen/ext_bg_module`)_ `if (»req.cmd« == 'createHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L187 (→L192) _(in `gen/ext_bg_module`)_ `»      chrome.permissions.request({«`  · ELEMENT:object.setProperty
  32. L193 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'hasHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L194 (→L199) _(in `gen/ext_bg_module`)_ `»      chrome.permissions.contains({«`  · ELEMENT:object.setProperty
  34. L200 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'removeHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L201 (→L206) _(in `gen/ext_bg_module`)_ `»      chrome.permissions.remove({«`  · ELEMENT:object.setProperty
  36. L341 _(in `gen/ext_bg_module`)_ `if (»ssCrmConfig && ssCrmConfig.highlevel_contact_id_pattern«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  37. L343 _(in `gen/ext_bg_module`)_ `let match = url.match(new RegExp(»ssCrmConfig.highlevel_contact_id_pattern«));`  · ASSIGN:identifier, ELEMENT:member-element
  38. L426 _(in `gen/ext_bg_module`)_ `if (»shouldCloseCurrentTab«) {`  · ASSIGN:identifier
  39. L52 `»chrome.storage.local.get(keyObj, callback)«;`  · STORAGE:STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: js/ext_common]
  40. L9 `if (»value«) {`  · ASSIGN:identifier
  41. L10 `callback(»value«);`  · ASSIGN:identifier
  42. L39 `callback(»url + '/ss/zeroauth/login'« + query);`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #5 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('serverUrl') in js/ext_common)  ·  9× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `gen/ext_bg_module` L123:C6 -> L123:C9  `if (»req«.cmd == 'extensionCheck') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (serverUrl) — `js/ext_common` L56:C2 -> L56:C35  `»chrome.storage.local.set(keyVals)«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (242 raw steps → 42 distinct lines):
   1. L123 _(in `gen/ext_bg_module`)_ `if (»req.cmd« == 'extensionCheck') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L128 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'getLegacySettingsOnce') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L139 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setServerUrl') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L142 _(in `gen/ext_bg_module`)_ `setServerUrl(»req.url«);`  · ASSIGN:identifier, ELEMENT:member-element
   5. L25 _(in `gen/ext_bg_module`)_ `»objStorageSet({'serverUrl': url})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L144 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setCrmConfig') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L145 _(in `gen/ext_bg_module`)_ `setCrmConfig(»req.config«);`  · ASSIGN:identifier, ELEMENT:member-element
   8. L29 _(in `gen/ext_bg_module`)_ `ssCrmConfig = »config«;`  · ASSIGN:identifier
   9. L30 _(in `gen/ext_bg_module`)_ `»objStorageSet({'crmConfig': config})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L147 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'chromeIdleSetDetectionInterval') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L148 _(in `gen/ext_bg_module`)_ `chrome.idle.setDetectionInterval(»req.interval«);`  · ASSIGN:identifier, ELEMENT:member-element
  12. L150 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  13. L151 _(in `gen/ext_bg_module`)_ `setInstantDemosToken(»req.token«);`  · ASSIGN:identifier, ELEMENT:member-element
  14. L473 _(in `gen/ext_bg_module`)_ `»objStorageSet({instantDemosToken: token})«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L153 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'clearInstantDemosToken') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L156 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'showPopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L157 _(in `gen/ext_bg_module`)_ `showPopupCommand(sender.tab.id, »req.shouldCloseCurrentTab, req.extraQueryParams«);`  · ASSIGN:identifier, ELEMENT:member-element
  18. L415 _(in `gen/ext_bg_module`)_ `if (»extraQueryParams«) {`  · ASSIGN:identifier
  19. L416 _(in `gen/ext_bg_module`)_ `url = »url + "&" + extraQueryParams«;`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  20. L158 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'closeCurrentTab') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L160 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'closePopup') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L165 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'reloadExtension') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L169 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'setReloadOnPopupClose') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L172 _(in `gen/ext_bg_module`)_ `»chrome.storage.local.set({reloadOnPopupClose: req.reloadOnPopupClose})«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  25. L173 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'getManifest') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  26. L177 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd == 'createHostPerm' || req.cmd == 'hasHostPerm' || req.cmd == 'removeHostPerm'«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  27. L181 _(in `gen/ext_bg_module`)_ `let origins = »req.host«;`  · ASSIGN:identifier, ELEMENT:member-element
  28. L182 _(in `gen/ext_bg_module`)_ `if (!Array.isArray(»req.host«)) {`  · ASSIGN:identifier, ELEMENT:member-element
  29. L183 _(in `gen/ext_bg_module`)_ `»origins = [ req.host ]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  30. L186 _(in `gen/ext_bg_module`)_ `if (»req.cmd« == 'createHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L187 (→L192) _(in `gen/ext_bg_module`)_ `»      chrome.permissions.request({«`  · ELEMENT:object.setProperty
  32. L193 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'hasHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  33. L194 (→L199) _(in `gen/ext_bg_module`)_ `»      chrome.permissions.contains({«`  · ELEMENT:object.setProperty
  34. L200 _(in `gen/ext_bg_module`)_ `} else if (»req.cmd« == 'removeHostPerm') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L201 (→L206) _(in `gen/ext_bg_module`)_ `»      chrome.permissions.remove({«`  · ELEMENT:object.setProperty
  36. L341 _(in `gen/ext_bg_module`)_ `if (»ssCrmConfig && ssCrmConfig.highlevel_contact_id_pattern«) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  37. L343 _(in `gen/ext_bg_module`)_ `let match = url.match(new RegExp(»ssCrmConfig.highlevel_contact_id_pattern«));`  · ASSIGN:identifier, ELEMENT:member-element
  38. L426 _(in `gen/ext_bg_module`)_ `if (»shouldCloseCurrentTab«) {`  · ASSIGN:identifier
  39. L52 `»chrome.storage.local.get(keyObj, callback)«;`  · STORAGE:STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: js/ext_common], STORAGE:STORAGE_FLOW[area: local, key: serverUrl, sender: js/ext_common, receiver: js/ext_common]
  40. L9 `if (»value«) {`  · ASSIGN:identifier
  41. L10 `callback(»value«);`  · ASSIGN:identifier
  42. L39 `callback(»url + '/ss/zeroauth/login'« + query);`  · ASSIGN:identifier, ASSIGN:binary-left

---
