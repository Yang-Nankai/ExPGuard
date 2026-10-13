# Source-level Taint Flow — bfbameneiokkgbdmiekhjnmfkcnldhhm 3.0.1

- Source type: CRX
- Files with issues: 6 / 19
- Distinct taint flows: 20  (collapsed from 2535 raw issue entries)
- Sinkless sources skipped: 58 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_URL (document.documentURI)

- **Source**: `DOCUMENT_URL` — `background/background` L95:C0 -> L95:C69  `»chrome.runtime.onMessage.addListener(WebDeveloper.Background.message)«;`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background/background` L11:C21 -> L11:C31  `var urlContent = »fetch(url)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (54 raw steps → 5 distinct lines):
   1. L95 `»chrome.runtime.onMessage.addListener(WebDeveloper.Background.message)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[overlay/js/overlay->background/background]`
   2. L40 `for(var i = 0, l = »urls.length; i < l«; i++)`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-right
   3. L42 `promises.push(WebDeveloper.Background.getURLContent(»urls[i]«, errorMessage));`  · ELEMENT:member-element-container
   4. L11 `var urlContent = fetch(»url«);`  · ASSIGN:identifier
   5. L27 `»resolve({ content: errorMessage, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_TEXT_CONTENT (From storage.local.set('unknown') in options/js/options)  ·  1768× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `background/background` L104:C22 -> L104:C27  `return chrome.i18n.g»etMes«sage(name, parameters);`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `background/background` L339:C4 -> L339:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `background/background` L340:C4 -> L340:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background/background` L234:C2 -> L234:C49  `»chrome.storage.local.set(storageItem, callback)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (288 raw steps → 28 distinct lines):
   1. L104 `return chrome.i18n.g»etMes«sage(name, parameters);`  · ASSIGN:identifier
   2. L102 `WebDev»eloper.Locales.g«etFormattedString = function(name, parameters)`  · ELEMENT:object.setProperty
   3. L170 (→L181) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: options/js/options, receiver: background/background]
   4. L175 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   5. L156 `if(»featuresOnTab«)`  · ASSIGN:identifier
   6. L158 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L324 `if(»featuresOnTab«)`  · ASSIGN:identifier
   8. L326 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
   9. L330 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L335 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  11. L336 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  12. L339 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L340 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L202 `if(»featuresOnTab«)`  · ASSIGN:identifier
  15. L204 `var featuresOnTabArray = »featuresOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L207 `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  17. L210 `if(»featuresOnTabArray[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L278 `if(»currentFeaturesOnTab«)`  · ASSIGN:identifier
  19. L282 `newFeaturesOnTab = »currentFeaturesOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L311 `WebDeveloper.Storage.setItem(featureTabId, »newFeaturesOnTab«, function() { WebDeveloper.Storage.updateBadgeText(featureTabId, callback); });`  · ASSIGN:identifier
  21. L232 `storageItem[item] = »value«;`  · ASSIGN:identifier
  22. L230 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
  23. L285 `for(var i = 0, l = »newFeaturesOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  24. L288 `if(»newFeaturesOnTab[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L303 `newFeaturesOnTab = »currentFeaturesOnTab + ","« + feature;`  · ASSIGN:identifier, ASSIGN:binary-left
  26. L292 `»newFeaturesOnTab.splice(i, 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  27. L299 `newFeaturesOnTab = »newFeaturesOnTab.join(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  28. L243 `if(»!existingItem«)`  · ASSIGN:identifier, ASSIGN:unary

---

## Flow #3 — ELEMENT_VALUE (From storage.local.set('overlay_icon') in options/js/options)  ·  98× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background/background` L104:C22 -> L104:C27  `return chrome.i18n.g»etMes«sage(name, parameters);`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `background/background` L339:C4 -> L339:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `background/background` L340:C4 -> L340:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `background/background` L234:C2 -> L234:C49  `»chrome.storage.local.set(storageItem, callback)«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (188 raw steps → 24 distinct lines):
   1. L104 `return chrome.i18n.g»etMes«sage(name, parameters);`  · ASSIGN:identifier
   2. L102 `WebDev»eloper.Locales.g«etFormattedString = function(name, parameters)`  · ELEMENT:object.setProperty
   3. L170 (→L181) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: overlay_icon, sender: options/js/options, receiver: background/background]
   4. L175 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   5. L156 `if(»featuresOnTab«)`  · ASSIGN:identifier
   6. L158 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L324 `if(»featuresOnTab«)`  · ASSIGN:identifier
   8. L326 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
   9. L330 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L335 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  11. L336 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  12. L339 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L340 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L278 `if(»currentFeaturesOnTab«)`  · ASSIGN:identifier
  15. L282 `newFeaturesOnTab = »currentFeaturesOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L311 `WebDeveloper.Storage.setItem(featureTabId, »newFeaturesOnTab«, function() { WebDeveloper.Storage.updateBadgeText(featureTabId, callback); });`  · ASSIGN:identifier
  17. L232 `storageItem[item] = »value«;`  · ASSIGN:identifier
  18. L230 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
  19. L285 `for(var i = 0, l = »newFeaturesOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  20. L288 `if(»newFeaturesOnTab[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  21. L303 `newFeaturesOnTab = »currentFeaturesOnTab + ","« + feature;`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L292 `»newFeaturesOnTab.splice(i, 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  23. L299 `newFeaturesOnTab = »newFeaturesOnTab.join(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  24. L243 `if(»!existingItem«)`  · ASSIGN:identifier, ASSIGN:unary

---

## Flow #4 — ELEMENT_TEXT_CONTENT (From storage.local.set('unknown') in options/js/options)  ·  136× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `common/storage` L104:C22 -> L104:C27  `storageItem[item] = »value«;`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `common/storage` L211:C4 -> L211:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `common/storage` L212:C4 -> L212:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (110 raw steps → 17 distinct lines):
   1. L104 `storageItem[item] = »value«;`  · ASSIGN:identifier
   2. L102 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
   3. L42 (→L53) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: unknown, sender: options/js/options, receiver: common/storage]
   4. L47 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   5. L28 `if(»featuresOnTab«)`  · ASSIGN:identifier
   6. L30 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L196 `if(»featuresOnTab«)`  · ASSIGN:identifier
   8. L198 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
   9. L202 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L207 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  11. L208 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  12. L211 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L212 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L74 `if(»featuresOnTab«)`  · ASSIGN:identifier
  15. L76 `var featuresOnTabArray = »featuresOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L79 `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  17. L82 `if(»featuresOnTabArray[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #5 — ELEMENT_VALUE (From storage.local.set('overlay_icon') in options/js/options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `common/storage` L104:C22 -> L104:C27  `storageItem[item] = »value«;`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `common/storage` L211:C4 -> L211:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `common/storage` L212:C4 -> L212:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (95 raw steps → 18 distinct lines):
   1. L104 `storageItem[item] = »value«;`  · ASSIGN:identifier
   2. L102 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
   3. L42 (→L53) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: overlay_icon, sender: options/js/options, receiver: common/storage]
   4. L228 `if(»!item«)`  · ASSIGN:identifier, ASSIGN:unary
   5. L47 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   6. L28 `if(»featuresOnTab«)`  · ASSIGN:identifier
   7. L30 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L196 `if(»featuresOnTab«)`  · ASSIGN:identifier
   9. L198 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
  10. L202 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L207 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  12. L208 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  13. L211 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L212 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L74 `if(»featuresOnTab«)`  · ASSIGN:identifier
  16. L76 `var featuresOnTabArray = »featuresOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L79 `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  18. L82 `if(»featuresOnTabArray[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #6 — ELEMENT_VALUE (From storage.local.set('populate_email_address') in options/js/options)  ·  14× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options/js/options` L864:C57 -> L864:C117  `WebDeveloper.Storage.setItem("populate_email_address", »document.getElementById("populate_email_address").value.trim«());`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `common/storage` L211:C4 -> L211:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `common/storage` L212:C4 -> L212:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `common/storage` L106:C2 -> L106:C49  `»chrome.storage.local.set(storageItem, callback)«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (262 raw steps → 26 distinct lines):
   1. L864 _(in `options/js/options`)_ `WebDeveloper.Storage.setItem("populate_email_address", »document.getElementById("populate_email_address").value.trim()«);`  · ELEMENT:member-element, RETURN:fallback-return
   2. L104 `storageItem[item] = »value«;`  · ASSIGN:identifier
   3. L102 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
   4. L42 (→L53) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: populate_email_address, sender: options/js/options, receiver: common/storage]
   5. L47 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   6. L28 `if(»featuresOnTab«)`  · ASSIGN:identifier
   7. L30 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L196 `if(»featuresOnTab«)`  · ASSIGN:identifier
   9. L198 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
  10. L202 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  11. L207 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  12. L208 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  13. L211 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L212 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L74 `if(»featuresOnTab«)`  · ASSIGN:identifier
  16. L76 `var featuresOnTabArray = »featuresOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L79 `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  18. L82 `if(»featuresOnTabArray[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L150 `if(»currentFeaturesOnTab«)`  · ASSIGN:identifier
  20. L154 `newFeaturesOnTab = »currentFeaturesOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L183 `WebDeveloper.Storage.setItem(featureTabId, »newFeaturesOnTab«, function() { WebDeveloper.Storage.updateBadgeText(featureTabId, callback); });`  · ASSIGN:identifier
  22. L157 `for(var i = 0, l = »newFeaturesOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  23. L160 `if(»newFeaturesOnTab[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  24. L175 `newFeaturesOnTab = »currentFeaturesOnTab + ","« + feature;`  · ASSIGN:identifier, ASSIGN:binary-left
  25. L164 `»newFeaturesOnTab.splice(i, 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  26. L171 `newFeaturesOnTab = »newFeaturesOnTab.join(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #7 — ELEMENT_VALUE (From storage.local.set('syntax_highlight_theme') in options/js/options)  ·  14× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options/js/options` L956:C57 -> L956:C62  `WebDeveloper.Storage.setItem("syntax_highlight_theme", »theme«);`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `common/storage` L211:C4 -> L211:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `common/storage` L212:C4 -> L212:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `common/storage` L106:C2 -> L106:C49  `»chrome.storage.local.set(storageItem, callback)«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (262 raw steps → 27 distinct lines):
   1. L956 _(in `options/js/options`)_ `WebDeveloper.Storage.setItem("syntax_highlight_theme", »theme«);`  · ASSIGN:identifier
   2. L104 `storageItem[item] = »value«;`  · ASSIGN:identifier
   3. L102 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
   4. L957 _(in `options/js/options`)_ `document.getElementById("syntax-highlight-browser").contentDocument.defaultView.WebDeveloper.setTheme(»theme«);`  · ASSIGN:identifier
   5. L42 (→L53) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: syntax_highlight_theme, sender: options/js/options, receiver: common/storage]
   6. L47 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   7. L28 `if(»featuresOnTab«)`  · ASSIGN:identifier
   8. L30 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L196 `if(»featuresOnTab«)`  · ASSIGN:identifier
  10. L198 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
  11. L202 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L207 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  13. L208 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  14. L211 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L212 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L74 `if(»featuresOnTab«)`  · ASSIGN:identifier
  17. L76 `var featuresOnTabArray = »featuresOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L79 `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  19. L82 `if(»featuresOnTabArray[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  20. L150 `if(»currentFeaturesOnTab«)`  · ASSIGN:identifier
  21. L154 `newFeaturesOnTab = »currentFeaturesOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  22. L183 `WebDeveloper.Storage.setItem(featureTabId, »newFeaturesOnTab«, function() { WebDeveloper.Storage.updateBadgeText(featureTabId, callback); });`  · ASSIGN:identifier
  23. L157 `for(var i = 0, l = »newFeaturesOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  24. L160 `if(»newFeaturesOnTab[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  25. L175 `newFeaturesOnTab = »currentFeaturesOnTab + ","« + feature;`  · ASSIGN:identifier, ASSIGN:binary-left
  26. L164 `»newFeaturesOnTab.splice(i, 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  27. L171 `newFeaturesOnTab = »newFeaturesOnTab.join(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #8 — ELEMENT_VALUE (From storage.local.set('display_overlay_with') in options/js/options)  ·  14× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `common/storage` L104:C22 -> L104:C27  `storageItem[item] = »value«;`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `common/storage` L211:C4 -> L211:C72  `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`
  - `CHROME_ACTION_TITLE_OPTIONS` — `common/storage` L212:C4 -> L212:C72  `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`
  - `CHROME_LOCAL_STORAGE` (unknown) — `common/storage` L106:C2 -> L106:C49  `»chrome.storage.local.set(storageItem, callback)«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (258 raw steps → 25 distinct lines):
   1. L104 `storageItem[item] = »value«;`  · ASSIGN:identifier
   2. L102 `var »storageItem = {}«;`  · ELEMENT:object.setProperty
   3. L42 (→L53) `»  chrome.storage.local.get(item.toString(), function(storageItem)«`  · STORAGE:STORAGE_FLOW[area: local, key: display_overlay_with, sender: options/js/options, receiver: common/storage]
   4. L47 `callback(»storageItem[item]«);`  · ELEMENT:computed-member-unknown-alternative
   5. L28 `if(»featuresOnTab«)`  · ASSIGN:identifier
   6. L30 `callback(»featuresOnTab.split(",")«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   7. L196 `if(»featuresOnTab«)`  · ASSIGN:identifier
   8. L198 `var featureCount       = »featuresOnTab.length«;`  · ASSIGN:identifier, ELEMENT:member.length
   9. L202 `if(»featureCount« == 1)`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L207 `badgeText     = »featureCount.toString()«;`  · ASSIGN:identifier, RETURN:Primitive.toString
  11. L208 `badgeTooltip += »"\n" + badgeText + " active " + featureDescription« + " on this tab";`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
  12. L211 `»chrome.action.setBadgeText({ text: badgeText, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L212 `»chrome.action.setTitle({ title: badgeTooltip, tabId: featureTabId })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L74 `if(»featuresOnTab«)`  · ASSIGN:identifier
  15. L76 `var featuresOnTabArray = »featuresOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L79 `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  17. L82 `if(»featuresOnTabArray[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  18. L150 `if(»currentFeaturesOnTab«)`  · ASSIGN:identifier
  19. L154 `newFeaturesOnTab = »currentFeaturesOnTab.split(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L183 `WebDeveloper.Storage.setItem(featureTabId, »newFeaturesOnTab«, function() { WebDeveloper.Storage.updateBadgeText(featureTabId, callback); });`  · ASSIGN:identifier
  21. L157 `for(var i = 0, l = »newFeaturesOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  22. L160 `if(»newFeaturesOnTab[i]« == feature)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  23. L175 `newFeaturesOnTab = »currentFeaturesOnTab + ","« + feature;`  · ASSIGN:identifier, ASSIGN:binary-left
  24. L164 `»newFeaturesOnTab.splice(i, 1)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  25. L171 `newFeaturesOnTab = »newFeaturesOnTab.join(",")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #9 — DOCUMENT_URL (document.documentURI)

- **Source**: `DOCUMENT_URL` — `overlay/js/overlay` L14:C6 -> L22:C8 (spans to L22)  `»chrome.tabs.sendMessage(tab.id, { type: "get-location-details" }, function(response)«`
- **Sink(s)**:
  - `CHROME_HISTORY_ADD_URL` — `overlay/js/overlay` L2287:C2 -> L2287:C38  `»chrome.history.addUrl({ url: href })«;`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (511 raw steps → 47 distinct lines):
   1. L14 (→L22) `»      chrome.tabs.sendMessage(tab.id, { type: "get-location-details" }, function(response)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
   2. L57 _(in `common/common`)_ `element.style.le»ft = innerWidt«h + offsetX - offsetWidth - offset + "px";`  · ELEMENT:member.length
   3. L60 `a»ddCookieExpir«es.value    = WebDeveloper.Cookies.getDateTomorrow();`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L69 `var c»onvertedCooki«es = [];`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L75 _(in `common/cookies`)_ `»message = WebDeveloper.Locales.getFormattedString("deleteDomainCookiesMultipleConfirmation", [cookiesLength])«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L84 `cookie.secure   = coo»kieObject.sec«ure;`  · ASSIGN:identifier, ASSIGN:binary-right
   7. L90 _(in `common/common`)_ `// »If the elemen«t does not exist in the array`  · ASSIGN:identifier, ASSIGN:binary-left
   8. L96 _(in `common/cookies`)_ `»WebDeveloper.Common.displayNotification("deleteDomainCookiesMultipleResult", [cookiesLength])«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L104 (→L107) `»        chrome.tabs.sendMessage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-domain-cookies" }, function(cookies)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  10. L105 _(in `lib/mustache`)_ `* respectively, of »the token in t«he original template.`  · ELEMENT:member.length
  11. L108 _(in `lib/purify`)_ `»   const lcEl«ement = transformCaseFunc(element);`  · ASSIGN:identifier, ASSIGN:binary-left
  12. L117 _(in `lib/purify`)_ `s»et[element] =« true;`  · ASSIGN:identifier, ASSIGN:binary-left
  13. L123 (→L126) `»  chrome.tabs.sendMessage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-path-cookies" }, function(cookies)«`  · ASSIGN:identifier, ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  14. L132 _(in `common/common`)_ `WebDeveloper.Common.endsW»ith = functio«n(string, endsWith)`  · ASSIGN:identifier, ASSIGN:binary-right
  15. L138 _(in `common/common`)_ `WebDevelo»per.Common.fo«rmatDimensions = function(width, height, locale)`  · ASSIGN:identifier, ASSIGN:binary-left
  16. L144 _(in `common/cookies`)_ `»WebDeveloper.Common.displayNotification("deletePathCookiesMultipleResult", [cookiesLength])«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  17. L3225 `var generatedData   = »JSON.parse(JSON.stringify(data))«;`  · RETURN:json.stringify, RETURN:json.parse
  18. L419 (→L422) `»        chrome.tabs.sendMessage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-cookies" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  19. L738 (→L746) `»      chrome.tabs.sendMessage(tab.id, { type: "get-css" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  20. L1207 (→L1210) `»      chrome.tabs.sendMessage(tab.id, { type: "get-forms" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  21. L1303 (→L1311) `»      chrome.tabs.sendMessage(tab.id, { type: "get-broken-images" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  22. L1632 (→L1635) `»      chrome.tabs.sendMessage(tab.id, { type: "get-images" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  23. L1956 (→L1964) `»      chrome.tabs.sendMessage(tab.id, { type: "get-duplicate-ids" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  24. L2154 (→L2157) `»      chrome.tabs.sendMessage(tab.id, { type: "get-anchors" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  25. L2170 (→L2173) `»      chrome.tabs.sendMessage(tab.id, { type: "get-colors" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  26. L2186 (→L2189) `»      chrome.tabs.sendMessage(tab.id, { type: "get-document-outline" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  27. L2202 (→L2210) `»      chrome.tabs.sendMessage(tab.id, { type: "get-javascript" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  28. L2223 (→L2226) `»      chrome.tabs.sendMessage(tab.id, { type: "get-links" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  29. L2239 (→L2242) `»      chrome.tabs.sendMessage(tab.id, { type: "get-meta-tags" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  30. L2255 (→L2258) `»      chrome.tabs.sendMessage(tab.id, { type: "get-document-details" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  31. L2519 `for(var i = 0, l = »documents.length; i < l«; i++)`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-right
  32. L2521 `links = »documents[i].links«;`  · ELEMENT:member-element-container, ELEMENT:member-element
  33. L2524 `for(var j = 0, m = »links.length; j < m«; j++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  34. L2529 `WebDeveloper.Overlay.Miscellaneous.addToHistory(»links[j]«);`  · ASSIGN:identifier, ELEMENT:member-element
  35. L2287 `»chrome.history.addUrl({ url: href })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  36. L2513 (→L2547) `»      chrome.tabs.sendMessage(tab.id, { type: "get-links" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  37. L3461 (→L3469) `»      chrome.tabs.sendMessage(tab.id, { type: "get-window-size" }, function(response)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  38. L3482 (→L3485) `»      chrome.tabs.sendMessage(tab.id, { type: "get-window-size" }, function(response)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  39. L3888 `for(var i = 0, l = »documents.length; i < l«; i++)`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-right
  40. L3890 `contentDocument = »documents[i]«;`  · ELEMENT:member-element-container
  41. L3880 (→L3910) `»      chrome.tabs.sendMessage(tab.id, { type: "get-css" }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  42. L3903 `for(i = 0, l = »urlContents.length; i < l«; i++)`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-right
  43. L3900 (→L3909) `»        chrome.runtime.sendMessage({ errorMessage: "", type: "get-url-contents", urls: styleSheets }, function(urlContents)«`  · MESSAGE, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`
  44. L3891 `»styleSheets     = styleSheets.concat(contentDocument.styleSheets)«;`  · ELEMENT:member-element, ELEMENT:object.setProperty, ELEMENT:array.concat.scalar, ELEMENT:member-element-container, COPY:array.concat, ELEMENT:implicit.add
  45. L3894 `if(»contentDocument.embedded«)`  · ELEMENT:member-element
  46. L3896 `styles += »contentDocument.embedded«;`  · ELEMENT:member-element
  47. L3923 (→L3926) `»      chrome.runtime.sendMessage({ errorMessage: "", type: "get-url-contents", urls: [tab.url] }, function(data)«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[content/content->overlay/js/overlay]`

---

## Flow #10 — ELEMENT_VALUE (From storage.local.set('populate_email_address') in options/js/options)  ·  156× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options/js/options` L864:C57 -> L864:C117  `WebDeveloper.Storage.setItem("populate_email_address", »document.getElementById("populate_email_address").value.trim«());`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `overlay/js/overlay` L106:C2 -> L106:C49  `»        WebDeveloper.Cookies.deleteDomainCookie«s(cookies);`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (3423 raw steps → 23 distinct lines):
   1. L864 _(in `options/js/options`)_ `WebDeveloper.Storage.setItem("populate_email_address", »document.getElementById("populate_email_address").value.trim()«);`  · ELEMENT:member-element, RETURN:fallback-return
   2. L104 `chrome.tabs.se»ndMes«sage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-domain-cookies" }, function(cookies)`  · ASSIGN:identifier
   3. L102 `»chrome.cookies.g«etAll({}, function(allCookies)`  · ELEMENT:object.setProperty
   4. L42 (→L53) `»};«`  · STORAGE:STORAGE_FLOW[area: local, key: populate_email_address, sender: options/js/options, receiver: overlay/js/overlay]
   5. L47 `var addCookie»Expires = documen«t.getElementById("add-cookie-expires");`  · ELEMENT:computed-member-unknown-alternative
   6. L74 `for(v»ar i = 0, l =« cookies.length; i < l; i++)`  · ASSIGN:identifier
   7. L76 _(in `lib/purify`)_ `* @param {Function} func - T»he constructor function «to be wrapped and called.`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L79 _(in `common/storage`)_ `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
   9. L82 `cookie.»name     = cookieObje«ct.name;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L150 `local»e.cookie            «         = WebDeveloper.Locales.getString("cookie");`  · ASSIGN:identifier
  11. L154 `locale.cookies         »           = WebDeveloper.Local«es.getString("cookies");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  12. L183 `locale.yes                        = WebDevelo»per.Locales.getS«tring("yes");`  · ASSIGN:identifier
  13. L157 `locale.deleteCookieConf»irmation   = WebDeveloper.Loca«les.getString("deleteCookieConfirmation");`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  14. L160 `locale.ed»itCookie           «      = WebDeveloper.Locales.getString("editCookie");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  15. L175 `locale.pathCannotBeEmpty »         = WebDeveloper.Lo«cales.getString("pathCannotBeEmpty");`  · ASSIGN:identifier, ASSIGN:binary-left
  16. L164 `locale.e»xpiresPlaceholder         = W«ebDeveloper.Locales.getString("expiresPlaceholder");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L171 `locale.nameCannotBeEmpty »         = WebDeveloper.Lo«cales.getString("nameCannotBeEmpty");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L1142 `»WebDeveloper.Overlay.Forms.addFeatureOnTab(featureItem, tab, function(emailAddress, password) { WebDeveloper.Forms.populateFormFields([document], emailAddress, password); }, [item, WebDeveloper.Locales.getString("password").toLowerCase()])«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  19. L28 `WebDeve»loper.Overlay«.Cookies.addCookieKeyPress = function(event)`  · ASSIGN:identifier
  20. L30 _(in `common/common`)_ `var content»Window = WebDeveloper.Co«mmon.getContentWindow();`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L3149 `if(»featuresOnTab«)`  · ASSIGN:identifier
  22. L3152 `for(var i = 0, l = »featuresOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  23. L3154 `document.getElementById(»featuresOnTab[i]«).classList.add("active");`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #11 — ELEMENT_VALUE (From storage.local.set('syntax_highlight_theme') in options/js/options)  ·  156× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `common/common` L956:C57 -> L956:C62  `matchingElement.parentNode.removeChild(matchingElem»ent);«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `overlay/js/overlay` L106:C2 -> L106:C49  `»        WebDeveloper.Cookies.deleteDomainCookie«s(cookies);`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (3530 raw steps → 29 distinct lines):
   1. L956 _(in `common/common`)_ `matchingElement.parentNode.removeChild(matchingElem»ent);«`  · ASSIGN:identifier
   2. L104 `chrome.tabs.se»ndMes«sage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-domain-cookies" }, function(cookies)`  · ASSIGN:identifier
   3. L102 `»chrome.cookies.g«etAll({}, function(allCookies)`  · ELEMENT:object.setProperty
   4. L957 _(in `options/js/options`)_ `document.getElementById("syntax-highlight-browser").contentDocument.defaultView.WebDeveloper.setTheme(»theme«);`  · ASSIGN:identifier
   5. L42 (→L53) `»};«`  · STORAGE:STORAGE_FLOW[area: local, key: syntax_highlight_theme, sender: options/js/options, receiver: overlay/js/overlay]
   6. L47 `var addCookie»Expires = documen«t.getElementById("add-cookie-expires");`  · ELEMENT:computed-member-unknown-alternative
   7. L74 `for(v»ar i = 0, l =« cookies.length; i < l; i++)`  · ASSIGN:identifier
   8. L76 _(in `lib/purify`)_ `* @param {Function} func - T»he constructor function «to be wrapped and called.`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L79 _(in `common/storage`)_ `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  10. L82 `cookie.»name     = cookieObje«ct.name;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  11. L150 `local»e.cookie            «         = WebDeveloper.Locales.getString("cookie");`  · ASSIGN:identifier
  12. L154 `locale.cookies         »           = WebDeveloper.Local«es.getString("cookies");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  13. L183 `locale.yes                        = WebDevelo»per.Locales.getS«tring("yes");`  · ASSIGN:identifier
  14. L157 `locale.deleteCookieConf»irmation   = WebDeveloper.Loca«les.getString("deleteCookieConfirmation");`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  15. L160 `locale.ed»itCookie           «      = WebDeveloper.Locales.getString("editCookie");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  16. L175 `locale.pathCannotBeEmpty »         = WebDeveloper.Lo«cales.getString("pathCannotBeEmpty");`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L164 `locale.e»xpiresPlaceholder         = W«ebDeveloper.Locales.getString("expiresPlaceholder");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L171 `locale.nameCannotBeEmpty »         = WebDeveloper.Lo«cales.getString("nameCannotBeEmpty");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  19. L742 `data.theme = »item«;`  · ASSIGN:identifier
  20. L1543 `»  WebDeveloper.Overla«y.Images.toggleFeatureOnTab(featureItem, tab, function(featureEnabled) { WebDeveloper.Images.outlineImagesWithOversizedDimensions(!featureEnabled, [document]); }, [enabled]);`  · ELEMENT:object.setProperty
  21. L3225 `var generatedData   = »JSON.parse(JSON.stringify(data))«;`  · RETURN:json.stringify, RETURN:json.parse
  22. L2206 `data.theme = »item«;`  · ASSIGN:identifier
  23. L28 `WebDeve»loper.Overlay«.Cookies.addCookieKeyPress = function(event)`  · ASSIGN:identifier
  24. L30 _(in `common/common`)_ `var content»Window = WebDeveloper.Co«mmon.getContentWindow();`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  25. L3149 `if(»featuresOnTab«)`  · ASSIGN:identifier
  26. L3152 `for(var i = 0, l = »featuresOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  27. L3154 `document.getElementById(»featuresOnTab[i]«).classList.add("active");`  · ASSIGN:identifier, ELEMENT:member-element
  28. L3903 `for(i = 0, l = »urlContents.length; i < l«; i++)`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-right
  29. L3888 `for(var i = 0, l = documents.length; i < »l«; i++)`  · ASSIGN:identifier, ASSIGN:binary-right

---

## Flow #12 — ELEMENT_VALUE (From storage.local.set('display_overlay_with') in options/js/options)  ·  156× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `overlay/js/overlay` L104:C22 -> L104:C27  `chrome.tabs.se»ndMes«sage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-domain-cookies" }, function(cookies)`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `overlay/js/overlay` L106:C2 -> L106:C49  `»        WebDeveloper.Cookies.deleteDomainCookie«s(cookies);`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (3556 raw steps → 34 distinct lines):
   1. L104 `chrome.tabs.se»ndMes«sage(tab.id, { allCookies: WebDeveloper.Overlay.Cookies.convertCookies(allCookies), type: "get-domain-cookies" }, function(cookies)`  · ASSIGN:identifier
   2. L102 `»chrome.cookies.g«etAll({}, function(allCookies)`  · ELEMENT:object.setProperty
   3. L42 (→L53) `»};«`  · STORAGE:STORAGE_FLOW[area: local, key: display_overlay_with, sender: options/js/options, receiver: overlay/js/overlay]
   4. L3109 `WebDeveloper.Overlay.labelMenu(document.querySelector("#cookies-toolbar > a"), WebDeveloper.Locales.getString("cookies"), »displayOverlayWith«);`  · ASSIGN:identifier
   5. L3196 `if(»displayOverlayWith« == "icons")`  · ASSIGN:identifier, ASSIGN:binary-left
   6. L3110 `WebDeveloper.Overlay.labelMenu(document.querySelector("#css-toolbar > a"), WebDeveloper.Locales.getString("css"), »displayOverlayWith«);`  · ASSIGN:identifier
   7. L3111 `WebDeveloper.Overlay.labelMenu(document.querySelector("#disable-toolbar > a"), WebDeveloper.Locales.getString("disable"), »displayOverlayWith«);`  · ASSIGN:identifier
   8. L3112 `WebDeveloper.Overlay.labelMenu(document.querySelector("#forms-toolbar > a"), WebDeveloper.Locales.getString("forms"), »displayOverlayWith«);`  · ASSIGN:identifier
   9. L3113 `WebDeveloper.Overlay.labelMenu(document.querySelector("#images-toolbar > a"), WebDeveloper.Locales.getString("images"), »displayOverlayWith«);`  · ASSIGN:identifier
  10. L3114 `WebDeveloper.Overlay.labelMenu(document.querySelector("#information-toolbar > a"), WebDeveloper.Locales.getString("information"), »displayOverlayWith«);`  · ASSIGN:identifier
  11. L3115 `WebDeveloper.Overlay.labelMenu(document.querySelector("#miscellaneous-toolbar > a"), WebDeveloper.Locales.getString("miscellaneous"), »displayOverlayWith«);`  · ASSIGN:identifier
  12. L3116 `WebDeveloper.Overlay.labelMenu(document.querySelector("#options-toolbar > a"), WebDeveloper.Locales.getString("options"), »displayOverlayWith«);`  · ASSIGN:identifier
  13. L3117 `WebDeveloper.Overlay.labelMenu(document.querySelector("#outline-toolbar > a"), WebDeveloper.Locales.getString("outline"), »displayOverlayWith«);`  · ASSIGN:identifier
  14. L3118 `WebDeveloper.Overlay.labelMenu(document.querySelector("#resize-toolbar > a"), WebDeveloper.Locales.getString("resize"), »displayOverlayWith«);`  · ASSIGN:identifier
  15. L3119 `WebDeveloper.Overlay.labelMenu(document.querySelector("#tools-toolbar > a"), WebDeveloper.Locales.getString("tools"), »displayOverlayWith«);`  · ASSIGN:identifier
  16. L3122 `if(»displayOverlayWith« == "text")`  · ASSIGN:identifier, ASSIGN:binary-left
  17. L47 `var addCookie»Expires = documen«t.getElementById("add-cookie-expires");`  · ELEMENT:computed-member-unknown-alternative
  18. L74 `for(v»ar i = 0, l =« cookies.length; i < l; i++)`  · ASSIGN:identifier
  19. L76 _(in `lib/purify`)_ `* @param {Function} func - T»he constructor function «to be wrapped and called.`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  20. L79 _(in `common/storage`)_ `for(var i = 0, l = »featuresOnTabArray.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  21. L82 `cookie.»name     = cookieObje«ct.name;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L150 `local»e.cookie            «         = WebDeveloper.Locales.getString("cookie");`  · ASSIGN:identifier
  23. L154 `locale.cookies         »           = WebDeveloper.Local«es.getString("cookies");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  24. L183 `locale.yes                        = WebDevelo»per.Locales.getS«tring("yes");`  · ASSIGN:identifier
  25. L157 `locale.deleteCookieConf»irmation   = WebDeveloper.Loca«les.getString("deleteCookieConfirmation");`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  26. L160 `locale.ed»itCookie           «      = WebDeveloper.Locales.getString("editCookie");`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  27. L175 `locale.pathCannotBeEmpty »         = WebDeveloper.Lo«cales.getString("pathCannotBeEmpty");`  · ASSIGN:identifier, ASSIGN:binary-left
  28. L164 `locale.e»xpiresPlaceholder         = W«ebDeveloper.Locales.getString("expiresPlaceholder");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  29. L171 `locale.nameCannotBeEmpty »         = WebDeveloper.Lo«cales.getString("nameCannotBeEmpty");`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  30. L28 `WebDeve»loper.Overlay«.Cookies.addCookieKeyPress = function(event)`  · ASSIGN:identifier
  31. L30 _(in `common/common`)_ `var content»Window = WebDeveloper.Co«mmon.getContentWindow();`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  32. L3149 `if(»featuresOnTab«)`  · ASSIGN:identifier
  33. L3152 `for(var i = 0, l = »featuresOnTab.length; i < l«; i++)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  34. L3154 `document.getElementById(»featuresOnTab[i]«).classList.add("active");`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #13 — DOCUMENT_LOCATION (location.hash)

- **Source**: `DOCUMENT_LOCATION` — `options/js/options` L212:C5 -> L212:C9  `if(»hash«)`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (option) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (16 raw steps → 5 distinct lines):
   1. L212 `if(»hash«)`  · ASSIGN:identifier
   2. L214 `WebDeveloper.Storage.setItem("option", »hash«);`  · ASSIGN:identifier
   3. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   4. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty
   5. L215 `bootstrap.Tab.getOrCreateInstance(document.querySelector(»"#" + hash« + " > a")).show();`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #14 — ELEMENT_VALUE (populate_email_address)

- **Source**: `ELEMENT_VALUE` — `options/js/options` L864:C57 -> L864:C117  `WebDeveloper.Storage.setItem("populate_email_address", »document.getElementById("populate_email_address").value.trim«());`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (populate_email_address) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (10 raw steps → 3 distinct lines):
   1. L864 `WebDeveloper.Storage.setItem("populate_email_address", »document.getElementById("populate_email_address").value.trim()«);`  · ELEMENT:member-element, RETURN:fallback-return
   2. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   3. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty

---

## Flow #15 — ELEMENT_VALUE (syntax_highlight_theme)

- **Source**: `ELEMENT_VALUE` — `options/js/options` L956:C57 -> L956:C62  `WebDeveloper.Storage.setItem("syntax_highlight_theme", »theme«);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (syntax_highlight_theme) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (10 raw steps → 4 distinct lines):
   1. L956 `WebDeveloper.Storage.setItem("syntax_highlight_theme", »theme«);`  · ASSIGN:identifier
   2. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   3. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty
   4. L957 `document.getElementById("syntax-highlight-browser").contentDocument.defaultView.WebDeveloper.setTheme(»theme«);`  · ASSIGN:identifier

---

## Flow #16 — ELEMENT_VALUE (display_overlay_with)

- **Source**: `ELEMENT_VALUE` — `options/js/options` L104:C22 -> L104:C27  `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (display_overlay_with) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   2. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty

---

## Flow #17 — ELEMENT_VALUE (event(change))

- **Source**: `ELEMENT_VALUE` — `options/js/options` L104:C22 -> L104:C27  `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (overlay_icon) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   2. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty

---

## Flow #18 — ELEMENT_TEXT_CONTENT (td:nth-child(1))  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `options/js/options` L104:C22 -> L104:C27  `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (24 raw steps → 2 distinct lines):
   1. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   2. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty

---

## Flow #19 — ELEMENT_TEXT_CONTENT (td:nth-child(2))  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `options/js/options` L104:C22 -> L104:C27  `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (24 raw steps → 2 distinct lines):
   1. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   2. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty

---

## Flow #20 — ELEMENT_TEXT_CONTENT (td:nth-child(3))  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `options/js/options` L104:C22 -> L104:C27  `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options/js/options` L106:C2 -> L106:C49  `»WebDeveloper.Options.optionCallback = callback;«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (9 raw steps → 2 distinct lines):
   1. L104 `deleteDialog.querySe»lecto«r("p").replaceChildren(confirmation);`  · ASSIGN:identifier
   2. L102 _(in `lib/purify`)_ `»setPrototypeOf(s«et, null);`  · ELEMENT:object.setProperty

---
