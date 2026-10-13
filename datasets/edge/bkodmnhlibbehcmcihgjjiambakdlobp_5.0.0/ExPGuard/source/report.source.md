# Source-level Taint Flow — bkodmnhlibbehcmcihgjjiambakdlobp 5.0.0

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 23  (collapsed from 282 raw issue entries)
- Sinkless sources skipped: 32 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L188:C8 -> L188:C15  `if (»request«) {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L175:C4 -> L175:C56  `»chrome.storage.sync.set({ search_history: history })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (129 raw steps → 19 distinct lines):
   1. L188 `if (»request«) {`  · ASSIGN:identifier
   2. L189 `if (»request.msg« === 'popupSearch') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L190 `onClickHandler(»request«);`  · ASSIGN:identifier
   4. L94 (→L95) `if (»!info || (info && info.menuItemId === 'searchEbayMenu' && !info.selectionText)«`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   5. L95 `|| (»info && info.action === 'invokeOnClickHandler' && !info.data?.search«)) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
   6. L98 `»info«.context = "contextMenu";`  · ASSIGN:identifier
   7. L123 `const searchSelection = »info.selectionText || info.data.search«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   8. L124 `const ebaySearchUrl = buildEbaySearchUrl(»searchSelection, items, info«);`  · ASSIGN:identifier
   9. L61 `const context = »info.context«;`  · ASSIGN:identifier, ELEMENT:member-element
  10. L66 (→L67) `const searchOptionsEnabled = ((»context === 'contextMenu') ||«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  11. L67 `(»context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)«));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  12. L69 `let ebaySearchUrl = »`${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  13. L73 `if (»searchOptionsEnabled«) {`  · ASSIGN:identifier
  14. L128 `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L168 `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L171 `if (»history.length« > maxHistory) {`  · ELEMENT:member.length, ASSIGN:binary-left
  17. L172 `history = »history.slice«(0, maxHistory);`  · ELEMENT:member-element-container
  18. L175 `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  19. L162 `const existingIndex = history.findIndex(item => item.term.toLowerCase() === »term.toLowerCase()«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right

---

## Flow #2 — ELEMENT_VALUE (search)

- **Source**: `ELEMENT_VALUE` — `background` L196:C0 -> L202:C2 (spans to L202)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L175:C4 -> L175:C56  `»chrome.storage.sync.set({ search_history: history })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (74 raw steps → 16 distinct lines):
   1. L196 (→L202) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L95 `|| (»info && info.action === 'invokeOnClickHandler' && !info.data?.search«)) {`  · ASSIGN:unary, ASSIGN:logical-right
   3. L94 (→L95) `if (!info || (info && »info.menuItemId === 'searchEbayMenu' && !info.selectionText)«`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-left
   4. L123 `const searchSelection = »info.selectionText || info.data.search«;`  · ELEMENT:member-element, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
   5. L124 `const ebaySearchUrl = buildEbaySearchUrl(»searchSelection«, items, info);`  · ASSIGN:identifier
   6. L61 `const context = »info.context«;`  · ELEMENT:member-element-container
   7. L66 (→L67) `const searchOptionsEnabled = ((»context === 'contextMenu') ||«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L67 `(»context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)«));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container, ASSIGN:logical-right
   9. L69 `let ebaySearchUrl = »`${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  10. L73 `if (»searchOptionsEnabled«) {`  · ASSIGN:identifier
  11. L128 `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  12. L168 `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L171 `if (»history.length« > maxHistory) {`  · ELEMENT:member.length, ASSIGN:binary-left
  14. L172 `history = »history.slice«(0, maxHistory);`  · ELEMENT:member-element-container
  15. L175 `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  16. L200 `»sendResponse({ status: "success", request: request })«;`  · ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE (From storage.sync.set('search_sort') in options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L186:C12 -> L186:C36  `if (»elements.sorting().value« === '13') {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_sort) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (98 raw steps → 5 distinct lines):
   1. L186 _(in `options`)_ `if (»elements.sorting().value« === '13') {`  · ASSIGN:binary-left
   2. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   3. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: search_sort, sender: options, receiver: background]
   4. L74 `ebaySearchUrl += »`&_sop=${search_sort}&LH_Complete=${ebaySearchCompleted}&LH_Sold=${ebaySearchSold}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   5. L90 `return »ebaySearchUrl«;`  · ASSIGN:identifier

---

## Flow #4 — ELEMENT_VALUE (From storage.sync.set('price_min') in options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L113:C10 -> L131:C5 (spans to L131)  `'w»intype_pref',«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (price_min) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (72 raw steps → 3 distinct lines):
   1. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   2. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: price_min, sender: options, receiver: background]
   3. L83 `if (»price_min) ebaySearchUrl += `&_udlo=${price_min}`«;`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #5 — ELEMENT_VALUE (From storage.sync.set('price_max') in options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L113:C10 -> L131:C5 (spans to L131)  `'w»intype_pref',«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (price_max) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (72 raw steps → 3 distinct lines):
   1. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   2. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: price_max, sender: options, receiver: background]
   3. L84 `if (»price_max) ebaySearchUrl += `&_udhi=${price_max}`«;`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #6 — ELEMENT_VALUE (From storage.sync.set('display_mode') in options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L113:C10 -> L131:C5 (spans to L131)  `'w»intype_pref',«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L175:C4 -> L175:C56  `»chrome.storage.sync.set({ search_history: history })«;`
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L134:C16 -> L137:C18 (spans to L137)  `»chrome.tabs.create({«`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `background` L140:C16 -> L144:C18 (spans to L144)  `»chrome.windows.create({«`
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L150:C16 -> L153:C18 (spans to L153)  `»chrome.tabs.create({«`
  - `CHROME_SYNC_STORAGE` (display_mode) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (410 raw steps → 17 distinct lines):
   1. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   2. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: display_mode, sender: options, receiver: background]
   3. L88 `if (»display_mode && display_mode !== '0') ebaySearchUrl += `&_dmd=${display_mode}`«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:template-literal
   4. L90 `return »ebaySearchUrl«;`  · ASSIGN:identifier
   5. L128 `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L168 `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L171 `if (»history.length« > maxHistory) {`  · ELEMENT:member.length, ASSIGN:binary-left
   8. L172 `history = »history.slice«(0, maxHistory);`  · ELEMENT:member-element-container
   9. L175 `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  10. L135 `'url': »ebaySearchUrl«,`  · ASSIGN:identifier
  11. L134 (→L137) `»                chrome.tabs.create({«`  · ELEMENT:object.setProperty
  12. L141 `'url': »ebaySearchUrl«,`  · ASSIGN:identifier
  13. L140 (→L144) `»                chrome.windows.create({«`  · ELEMENT:object.setProperty
  14. L147 `openInSameTab(»ebaySearchUrl«);`  · ASSIGN:identifier
  15. L151 `'url': »ebaySearchUrl«,`  · ASSIGN:identifier
  16. L150 (→L153) `»                chrome.tabs.create({«`  · ELEMENT:object.setProperty
  17. L182 `»chrome.tabs.update(tabs[0].id, { url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #7 — ELEMENT_VALUE (From storage.sync.set('location_pref') in options)  ·  16× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L113:C10 -> L131:C5 (spans to L131)  `'w»intype_pref',«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (location_pref) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (88 raw steps → 5 distinct lines):
   1. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
   2. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: location_pref, sender: options, receiver: background]
   3. L65 `const ebaySearchLocationPref = location_pref !== null ? »location_pref« : 0;`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   4. L70 `if (»ebaySearchLocationPref« === 2) {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L75 `if (»ebaySearchLocationPref«) ebaySearchUrl += `&LH_PrefLoc=${ebaySearchLocationPref}`;`  · ASSIGN:identifier

---

## Flow #8 — ELEMENT_VALUE (From storage.sync.set('wintype_pref') in options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L113:C10 -> L131:C5 (spans to L131)  `'w»intype_pref',«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (wintype_pref) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (44 raw steps → 3 distinct lines):
   1. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   2. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: wintype_pref, sender: options, receiver: background]
   3. L132 `switch (»wintypePref«) {`  · ASSIGN:identifier

---

## Flow #9 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('search_history') in background)  ·  118× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L188:C8 -> L188:C15  `if (»request«) {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L175:C4 -> L175:C56  `»chrome.storage.sync.set({ search_history: history })«;`
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (368 raw steps → 22 distinct lines):
   1. L188 `if (»request«) {`  · ASSIGN:identifier
   2. L189 `if (»request.msg« === 'popupSearch') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L190 `onClickHandler(»request«);`  · ASSIGN:identifier
   4. L94 (→L95) `if (»!info || (info && info.menuItemId === 'searchEbayMenu' && !info.selectionText)«`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   5. L95 `|| (»info && info.action === 'invokeOnClickHandler' && !info.data?.search«)) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
   6. L98 `»info«.context = "contextMenu";`  · ASSIGN:identifier
   7. L123 `const searchSelection = »info.selectionText || info.data.search«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   8. L124 `const ebaySearchUrl = buildEbaySearchUrl(»searchSelection, items, info«);`  · ASSIGN:identifier
   9. L61 `const context = »info.context«;`  · ASSIGN:identifier, ELEMENT:member-element
  10. L66 (→L67) `const searchOptionsEnabled = ((»context === 'contextMenu') ||«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  11. L67 `(»context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)«));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  12. L69 `let ebaySearchUrl = »`${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  13. L73 `if (»searchOptionsEnabled«) {`  · ASSIGN:identifier
  14. L128 `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left
  15. L168 `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:member-element-container
  16. L171 `if (»history.length« > maxHistory) {`  · ELEMENT:member.length, ASSIGN:binary-left
  17. L172 `history = »history.slice«(0, maxHistory);`  · ELEMENT:member-element-container
  18. L175 `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  19. L162 `const existingIndex = »history.findIndex(item => item.term.toLowerCase() === term.toLowerCase())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right
  20. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: background]
  21. L163 `if (»existingIndex« !== -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  22. L164 `»history.splice(existingIndex«, 1);`  · ELEMENT:member-element-container, ASSIGN:identifier

---

## Flow #10 — ELEMENT_VALUE (From storage.sync.set('search_history') in background)  ·  40× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `background` L196:C0 -> L202:C2 (spans to L202)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L175:C4 -> L175:C56  `»chrome.storage.sync.set({ search_history: history })«;`
  - `CHROME_SYNC_STORAGE` (search_history) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (313 raw steps → 20 distinct lines):
   1. L196 (→L202) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L95 `|| (»info && info.action === 'invokeOnClickHandler' && !info.data?.search«)) {`  · ASSIGN:unary, ASSIGN:logical-right
   3. L94 (→L95) `if (!info || (info && »info.menuItemId === 'searchEbayMenu' && !info.selectionText)«`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-left
   4. L123 `const searchSelection = »info.selectionText || info.data.search«;`  · ELEMENT:member-element, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
   5. L124 `const ebaySearchUrl = buildEbaySearchUrl(»searchSelection«, items, info);`  · ASSIGN:identifier
   6. L61 `const context = »info.context«;`  · ELEMENT:member-element-container
   7. L66 (→L67) `const searchOptionsEnabled = ((»context === 'contextMenu') ||«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L67 `(»context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)«));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container, ASSIGN:logical-right
   9. L69 `let ebaySearchUrl = »`${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  10. L73 `if (»searchOptionsEnabled«) {`  · ASSIGN:identifier
  11. L128 `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left
  12. L168 `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:member-element-container
  13. L171 `if (»history.length« > maxHistory) {`  · ELEMENT:member.length, ASSIGN:binary-left
  14. L172 `history = »history.slice«(0, maxHistory);`  · ELEMENT:member-element-container
  15. L175 `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  16. L200 `»sendResponse({ status: "success", request: request })«;`  · ELEMENT:object.setProperty
  17. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: background]
  18. L162 `const existingIndex = »history.findIndex(item => item.term.toLowerCase() === term.toLowerCase())«;`  · ELEMENT:member-element, RETURN:fallback-return
  19. L163 `if (»existingIndex« !== -1) {`  · ASSIGN:identifier, ASSIGN:binary-left
  20. L164 `»history.splice(existingIndex«, 1);`  · ELEMENT:member-element-container, ASSIGN:identifier

---

## Flow #11 — ELEMENT_VALUE (From storage.sync.set('history_limit') in options)  ·  8× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L129:C23 -> L129:C66  `history_limit: »parseInt(elements.historyLimit().value, 10)«,`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (history_limit) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (129 raw steps → 7 distinct lines):
   1. L129 _(in `options`)_ `history_limit: »parseInt(elements.historyLimit().value, 10)«,`  · RETURN:parseInt
   2. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   3. L99 (→L156) `»    chrome.storage.sync.get([«`  · STORAGE:STORAGE_FLOW[area: sync, key: history_limit, sender: options, receiver: background]
   4. L125 `const historyLimit = »items.history_limit || DEFAULT_OPTIONS.history_limit«;`  · ASSIGN:logical-left
   5. L128 `updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], »historyLimit«);`  · ASSIGN:identifier
   6. L171 `if (history.length > »maxHistory«) {`  · ASSIGN:identifier, ASSIGN:binary-right
   7. L172 `history = history.slice(0, »maxHistory«);`  · ASSIGN:identifier

---

## Flow #12 — ELEMENT_VALUE (From storage.sync.set('theme_preference') in options)

- **Source**: `ELEMENT_VALUE` — `background` L113:C10 -> L131:C5 (spans to L131)  `'w»intype_pref',«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (theme_preference) — `background` L11:C8 -> L32:C10 (spans to L32)  `»chrome.storage.sync.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 6 distinct lines):
   1. L113 (→L131) `»        'wintype_pref',«`  · ELEMENT:object.setProperty
   2. L282 _(in `options`)_ `if (»theme« === 'light') {`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L284 _(in `options`)_ `} else if (»theme« === 'dark') {`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L4 (→L40) `»    chrome.storage.sync.get(DEFAULT_OPTIONS, (data) => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: theme_preference, sender: options, receiver: background]
   5. L30 `theme_preference: »data.theme_preference || DEFAULT_OPTIONS.theme_preference«,`  · ASSIGN:logical-left
   6. L11 (→L32) `»        chrome.storage.sync.set({«`  · ELEMENT:object.setProperty

---

## Flow #13 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.sync.set('search_history') in background)  ·  36× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `popup` L188:C8 -> L188:C15  `»    e.p«reventDefault();`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `popup` L231:C8 -> L234:C10 (spans to L234)  `»chrome.storage.sync.set({ search_history: history }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (139 raw steps → 23 distinct lines):
   1. L188 `»    e.p«reventDefault();`  · ASSIGN:identifier
   2. L189 `»// Open in «configured way via background script`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L190 `chrome.runtime.»sendMes«sage({`  · ASSIGN:identifier
   4. L94 (→L95) _(in `options`)_ `»applyTheme(items.theme_preference || 'auto');«`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   5. L95 _(in `background`)_ `|| (»info && info.action === 'invokeOnClickHandler' && !info.data?.search«)) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
   6. L98 `»// A«utocomplete`  · ASSIGN:identifier
   7. L123 _(in `background`)_ `const searchSelection = »info.selectionText || info.data.search«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   8. L124 _(in `background`)_ `const ebaySearchUrl = buildEbaySearchUrl(»searchSelection, items, info«);`  · ASSIGN:identifier
   9. L61 _(in `background`)_ `const context = »info.context«;`  · ASSIGN:identifier, ELEMENT:member-element
  10. L66 (→L67) _(in `background`)_ `const searchOptionsEnabled = ((»context === 'contextMenu') ||«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  11. L67 _(in `background`)_ `(»context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)«));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  12. L69 _(in `background`)_ `let ebaySearchUrl = »`${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  13. L73 _(in `background`)_ `if (»searchOptionsEnabled«) {`  · ASSIGN:identifier
  14. L128 _(in `background`)_ `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  15. L168 _(in `background`)_ `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  16. L171 `»deleteAllBtn.c«lassList.add('hidden');`  · ELEMENT:member.length, ASSIGN:binary-left
  17. L172 _(in `options`)_ `ukOptions.»classList.rem«ove('hidden');`  · ELEMENT:member-element-container
  18. L175 _(in `background`)_ `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  19. L162 _(in `background`)_ `const existingIndex = history.findIndex(item => item.term.toLowerCase() === »term.toLowerCase()«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right
  20. L33 (→L59) `»    chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: popup]
  21. L55 `searchHistory = »items.search_history || []«;`  · ASSIGN:logical-left
  22. L169 `if (»!history || history.length === 0«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  23. L178 `»history.forEach«((item, index) => {`  · ELEMENT:member-element-container

---

## Flow #14 — ELEMENT_VALUE (From storage.sync.set('search_history') in background)  ·  12× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `popup` L196:C0 -> L202:C2 (spans to L202)  `»            });«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_history) — `popup` L231:C8 -> L234:C10 (spans to L234)  `»chrome.storage.sync.set({ search_history: history }, () => {«`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (87 raw steps → 22 distinct lines):
   1. L196 (→L202) `»            });«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[popup->background]`
   2. L95 _(in `background`)_ `|| (»info && info.action === 'invokeOnClickHandler' && !info.data?.search«)) {`  · ASSIGN:unary, ASSIGN:logical-right
   3. L94 (→L95) _(in `options`)_ `applyTheme(items.t»heme_preference || 'auto');«`  · ASSIGN:logical-right, ELEMENT:member-element, ASSIGN:binary-left
   4. L123 _(in `background`)_ `const searchSelection = »info.selectionText || info.data.search«;`  · ELEMENT:member-element, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
   5. L124 _(in `background`)_ `const ebaySearchUrl = buildEbaySearchUrl(»searchSelection«, items, info);`  · ASSIGN:identifier
   6. L61 _(in `background`)_ `const context = »info.context«;`  · ELEMENT:member-element-container
   7. L66 (→L67) _(in `background`)_ `const searchOptionsEnabled = ((»context === 'contextMenu') ||«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L67 _(in `background`)_ `(»context !== 'contextMenu' && use_saved_options_for_freeform && (info.data && info.data.use_options)«));`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container, ASSIGN:logical-right
   9. L69 _(in `background`)_ `let ebaySearchUrl = »`${default_ebay_site}_nkw=${encodeURIComponent(searchSelection)}`«;`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  10. L73 _(in `background`)_ `if (»searchOptionsEnabled«) {`  · ASSIGN:identifier
  11. L128 _(in `background`)_ `»updateHistory(searchSelection, ebaySearchUrl, items.search_history || [], historyLimit)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  12. L168 _(in `background`)_ `»history.unshift({ term: term, url: url })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L171 `»deleteAllBtn.c«lassList.add('hidden');`  · ELEMENT:member.length, ASSIGN:binary-left
  14. L172 _(in `options`)_ `ukOptions.»classList.rem«ove('hidden');`  · ELEMENT:member-element-container
  15. L175 _(in `background`)_ `»chrome.storage.sync.set({ search_history: history })«;`  · ELEMENT:object.setProperty
  16. L200 _(in `background`)_ `»sendResponse({ status: "success", request: request })«;`  · ELEMENT:object.setProperty
  17. L4 (→L40) `»import { DEFAULT_OPTIONS } from './defaults.js';«`  · STORAGE:STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: background]
  18. L11 (→L32) `»    optionsLink: () => document.getElementById('optionsLink'),«`  · ELEMENT:object.setProperty
  19. L33 (→L59) `»    chrome.storage.sync.get(DEFAULT_OPTIONS, (items) => {«`  · STORAGE:STORAGE_FLOW[area: sync, key: search_history, sender: background, receiver: popup]
  20. L55 `searchHistory = »items.search_history || []«;`  · ASSIGN:logical-left
  21. L169 `if (»!history || history.length === 0«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  22. L178 `»history.forEach«((item, index) => {`  · ELEMENT:member-element-container

---

## Flow #15 — ELEMENT_VALUE (priceMin)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (price_min) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty

---

## Flow #16 — ELEMENT_VALUE (priceMax)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (price_max) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty

---

## Flow #17 — ELEMENT_VALUE (sorting)

- **Source**: `ELEMENT_VALUE` — `options` L186:C12 -> L186:C36  `if (»elements.sorting().value« === '13') {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (search_sort) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (35 raw steps → 2 distinct lines):
   1. L186 `if (»elements.sorting().value« === '13') {`  · ASSIGN:binary-left
   2. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty

---

## Flow #18 — ELEMENT_VALUE (themePref)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (theme_preference) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (11 raw steps → 3 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty
   2. L282 `if (»theme« === 'light') {`  · ASSIGN:identifier, ASSIGN:binary-left
   3. L284 `} else if (»theme« === 'dark') {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #19 — ELEMENT_VALUE (displayMode)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (display_mode) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty

---

## Flow #20 — ELEMENT_VALUE (wintypePref)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (wintype_pref) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty

---

## Flow #21 — ELEMENT_VALUE (historyLimit)

- **Source**: `ELEMENT_VALUE` — `options` L129:C23 -> L129:C66  `history_limit: »parseInt(elements.historyLimit().value, 10)«,`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (history_limit) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L129 `history_limit: »parseInt(elements.historyLimit().value, 10)«,`  · RETURN:parseInt
   2. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:object.setProperty

---

## Flow #22 — ELEMENT_VALUE (canLocation)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (location_pref) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty

---

## Flow #23 — ELEMENT_VALUE (ukLocation)

- **Source**: `ELEMENT_VALUE` — `options` L113:C10 -> L131:C5 (spans to L131)  `const »dataToSave = {«`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (location_pref) — `options` L133:C4 -> L139:C6 (spans to L139)  `»chrome.storage.sync.set(dataToSave, () => {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L113 (→L131) `»    const dataToSave = {«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty

---
