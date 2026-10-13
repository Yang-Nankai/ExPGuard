# Source-level Taint Flow — ao3-advanced-marker-2@leehsuus.com 13.7

- Source type: XPI
- Files with issues: 10 / 12
- Distinct taint flows: 43  (collapsed from 378 raw issue entries)
- Sinkless sources skipped: 65 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_VALUE (From storage.local.set('jsonbin_api_key') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `content` L213:C19 -> L213:C63  `con»st wordElem = context.querySelector('dd.word«s');`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L426:C31 -> L434:C10 (spans to L434)  `const response = await »fetch(API_URL, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L455:C37 -> L458:C18 (spans to L458)  `const getRes = await »fetch(REVIEW_API_URL + '/latest', {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L469:C45 -> L481:C18 (spans to L481)  `const reviewResponse = await »fetch(REVIEW_API_URL, {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L549:C31 -> L552:C10 (spans to L552)  `const response = await »fetch(API_URL + '/latest', {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L615:C36 -> L618:C14 (spans to L618)  `const reviewRes = await »fetch(REVIEW_API_URL + '/latest', {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (91 raw steps → 17 distinct lines):
   1. L213 _(in `content`)_ `con»st wordElem = context.querySelector('dd.words'«);`  · ELEMENT:member-element, RETURN:fallback-return
   2. L249 _(in `ui`)_ `* Injects the "Filter WT»R" but«ton into the Marker Tools container.`  · ASSIGN:identifier
   3. L248 (→L268) `»    } else {«`  · ELEMENT:object.setProperty
   4. L375 (→L384) `»        storage.local.get([API_KEY_STORE, BIN_ID_STORE, REVIEW_BIN_ID_STORE, AUTO_BACKUP_STORE, STATS_CONFIG_KEY], (items) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_api_key, sender: options, receiver: storage]
   5. L376 `if (items[API_KEY_STORE]) JSONBIN_API_KEY = »items[API_KEY_STORE] || ''«;`  · ASSIGN:logical-left
   6. L357 `if (»!JSONBIN_API_KEY || !JSONBIN_BIN_ID«) return false;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   7. L430 `"X-Master-Key": »JSONBIN_API_KEY«,`  · ASSIGN:identifier
   8. L426 (→L434) `»        const response = await fetch(API_URL, {«`  · ELEMENT:object.setProperty
   9. L457 `headers: { "X-Master-Key": »JSONBIN_API_KEY« }`  · ASSIGN:identifier
  10. L455 (→L458) `»                const getRes = await fetch(REVIEW_API_URL + '/latest', {«`  · ELEMENT:object.setProperty
  11. L473 `"X-Master-Key": »JSONBIN_API_KEY«,`  · ASSIGN:identifier
  12. L469 (→L481) `»                const reviewResponse = await fetch(REVIEW_API_URL, {«`  · ELEMENT:object.setProperty
  13. L551 `headers: { "X-Master-Key": »JSONBIN_API_KEY« }`  · ASSIGN:identifier
  14. L549 (→L552) `»        const response = await fetch(API_URL + '/latest', {«`  · ELEMENT:object.setProperty
  15. L617 `headers: { "X-Master-Key": »JSONBIN_API_KEY« }`  · ASSIGN:identifier
  16. L615 (→L618) `»            const reviewRes = await fetch(REVIEW_API_URL + '/latest', {«`  · ELEMENT:object.setProperty
  17. L654 `if (»!JSONBIN_API_KEY || !JSONBIN_BIN_ID«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left

---

## Flow #2 — ELEMENT_VALUE (From storage.local.set('jsonbin_bin_id') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `content` L214:C18 -> L214:C61  `co»nst chapterElem = context.querySelector('dd«.chapters');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L426:C31 -> L434:C10 (spans to L434)  `const response = await »fetch(API_URL, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L549:C31 -> L552:C10 (spans to L552)  `const response = await »fetch(API_URL + '/latest', {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (45 raw steps → 10 distinct lines):
   1. L214 _(in `content`)_ `co»nst chapterElem = context.querySelector('dd.c«hapters');`  · ELEMENT:member-element, RETURN:fallback-return
   2. L250 `reviews[work»Id][c«hapterIndex] = { text: typeof text === 'string' ? text : text.text, url: url };`  · ASSIGN:identifier
   3. L248 (→L268) `»    } else {«`  · ELEMENT:object.setProperty
   4. L375 (→L384) `»        storage.local.get([API_KEY_STORE, BIN_ID_STORE, REVIEW_BIN_ID_STORE, AUTO_BACKUP_STORE, STATS_CONFIG_KEY], (items) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_bin_id, sender: options, receiver: storage]
   5. L377 `JSONBIN_BIN_ID = »items[BIN_ID_STORE] || ''«;`  · ASSIGN:logical-left
   6. L381 `if (»JSONBIN_BIN_ID) API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L357 `if (»!JSONBIN_API_KEY || !JSONBIN_BIN_ID«) return false;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
   8. L426 `const response = await fetch(»API_URL«, {`  · ASSIGN:identifier
   9. L549 `const response = await fetch(»API_URL« + '/latest', {`  · ASSIGN:identifier, ASSIGN:binary-left
  10. L654 `if (»!JSONBIN_API_KEY || !JSONBIN_BIN_ID«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right

---

## Flow #3 — ELEMENT_VALUE (From storage.local.set('jsonbin_review_bin_id') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L215:C24 -> L215:C73  `const reviewBinId = »document.getElementById('reviewBinId').value.trim«();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L455:C37 -> L458:C18 (spans to L458)  `const getRes = await »fetch(REVIEW_API_URL + '/latest', {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L469:C45 -> L481:C18 (spans to L481)  `const reviewResponse = await »fetch(REVIEW_API_URL, {«`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L615:C36 -> L618:C14 (spans to L618)  `const reviewRes = await »fetch(REVIEW_API_URL + '/latest', {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (75 raw steps → 11 distinct lines):
   1. L215 _(in `options`)_ `const reviewBinId = »document.getElementById('reviewBinId').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L251 _(in `stats`)_ `if (typeof ratings[»workId][key«] === 'number') {`  · ASSIGN:identifier
   3. L248 (→L268) `»    } else {«`  · ELEMENT:object.setProperty
   4. L375 (→L384) `»        storage.local.get([API_KEY_STORE, BIN_ID_STORE, REVIEW_BIN_ID_STORE, AUTO_BACKUP_STORE, STATS_CONFIG_KEY], (items) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_review_bin_id, sender: options, receiver: storage]
   5. L378 `JSONBIN_REVIEW_BIN_ID = »items[REVIEW_BIN_ID_STORE] || ''«;`  · ASSIGN:logical-left
   6. L382 `if (»JSONBIN_REVIEW_BIN_ID) REVIEW_API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_REVIEW_BIN_ID}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L450 `if (»JSONBIN_REVIEW_BIN_ID && REVIEW_API_URL«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
   8. L455 `const getRes = await fetch(»REVIEW_API_URL« + '/latest', {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L469 `const reviewResponse = await fetch(»REVIEW_API_URL«, {`  · ASSIGN:identifier
  10. L613 `if (»JSONBIN_REVIEW_BIN_ID && REVIEW_API_URL«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  11. L615 `const reviewRes = await fetch(»REVIEW_API_URL« + '/latest', {`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #4 — ELEMENT_VALUE (From storage.local.set('google_refresh_token') in options)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L668:C29 -> L668:C56  `const tokenStr = »importTokenInput.value.trim«();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `auth` L252:C22 -> L255:C18 (spans to L255)  `await »fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(tokenToRevoke)}`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (33 raw steps → 13 distinct lines):
   1. L668 _(in `options`)_ `const tokenStr = »importTokenInput.value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L669 _(in `content`)_ `»if (_wtrS«ettings.enabled) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L674 _(in `highlights`)_ `* Removes a highlight from the DOM by unwrapping al»l <mark>« elements`  · ASSIGN:identifier
   4. L320 `const jsonStr = »atob(encodedString.trim())«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:atob
   5. L321 `const payload = »JSON.parse(jsonStr)«;`  · ASSIGN:identifier, RETURN:json.parse
   6. L323 `if (»!payload.r«) throw new Error('Invalid token string: Missing refresh token.');`  · ELEMENT:member-element, ASSIGN:unary
   7. L326 `[GOOGLE_REFRESH_KEY]: »payload.r«`  · ELEMENT:member-element
   8. L325 (→L327) `»            const toSave = {«`  · ELEMENT:object.setProperty
   9. L328 `if (»payload.e) toSave[GOOGLE_EMAIL_KEY] = payload.e«;`  · ELEMENT:member-element
  10. L188 `»_storage.local.get([GOOGLE_TOKEN_KEY, GOOGLE_REFRESH_KEY, GOOGLE_EXPIRY_KEY], r)«`  · STORAGE:STORAGE_FLOW[area: local, key: google_refresh_token, sender: options, receiver: auth]
  11. L202 `if (»!refreshToken«) {`  · ASSIGN:identifier, ASSIGN:unary
  12. L212 `refresh_token: »refreshToken«,`  · ASSIGN:identifier
  13. L206 (→L215) `»        const response = await fetch('https://oauth2.googleapis.com/token', {«`  · ELEMENT:object.setProperty

---

## Flow #5 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `drive_sync` L34:C36 -> L34:C46  `data[key] = »items[key]«;`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `drive_sync` L114:C36 -> L121:C14 (spans to L121)  `const uploadRes = await »fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (13 raw steps → 7 distinct lines):
   1. L34 `data[key] = »items[key]«;`  · ELEMENT:member-element
   2. L31 `const »data = {}«;`  · ELEMENT:object.setProperty
   3. L38 (→L42) `»                const payload = {«`  · ELEMENT:object.setProperty
   4. L111 `»JSON.stringify(payload)« +`  · RETURN:json.stringify, ASSIGN:binary-right
   5. L106 (→L111) `»                delimiter +«`  · ASSIGN:binary-left
   6. L120 `body: »multipartRequestBody«`  · ASSIGN:identifier
   7. L114 (→L121) `»            const uploadRes = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`, {«`  · ELEMENT:object.setProperty

---

## Flow #6 — ELEMENT_VALUE (From storage.local.set('ao3_wtr_tag') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `stats` L280:C52 -> L280:C71  `const avg = await window.stats.getWorkAv»erageRating(workId)«;`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `ao3_api` L174:C39 -> L174:C89  `const postResponse = await »fetch(postUrl, { method: 'POST', body: formData })«;`
  - `FETCH_BODY` ([Unknown URL]) — `ao3_api` L159:C38 -> L159:C88  `const putResponse = await »fetch(editUrl, { method: 'POST', body: formData })«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (123 raw steps → 15 distinct lines):
   1. L280 _(in `options`)_ `items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? »wtrTagEl.value.trim() || 'AO3 Advanced Marker Want to Read'« : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:conditional-consequent
   2. L248 (→L268) _(in `content`)_ `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   3. L724 (→L738) _(in `storage`)_ `»        storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_wtr_tag, sender: options, receiver: ao3_api]
   4. L735 _(in `storage`)_ `tag: »items[WTR_TAG_KEY] || 'AO3 Advanced Marker Want to Read'«,`  · ASSIGN:logical-left
   5. L731 (→L737) _(in `storage`)_ `»            resolve({«`  · ELEMENT:object.setProperty
   6. L207 `await syncWTRBookmarkToAO3(workId, »tag«);`  · ASSIGN:identifier
   7. L139 `if (!tagsArray.includes(»customTag«)) {`  · ASSIGN:identifier
   8. L140 `tagsArray.push(»customTag«);`  · ASSIGN:identifier
   9. L138 `const »tagsArray = existingTags.split(',').map(t => t.trim()).filter(Boolean)«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  10. L170 `formData.append('bookmark[tag_string]', »customTag«);`  · ASSIGN:identifier
  11. L164 `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  12. L174 `const »postResponse = await fetch(postUrl, { method: 'POST', body: formData })«;`  · ELEMENT:object.setProperty
  13. L153 `formData.append('bookmark[tag_string]', »tagsArray.join(', ')«);`  · RETURN:array.join
  14. L148 `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  15. L159 `const »putResponse = await fetch(editUrl, { method: 'POST', body: formData })«;`  · ELEMENT:object.setProperty

---

## Flow #7 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `content` L34:C36 -> L34:C46  `container.style.display »= 'block';«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `ui` L114:C36 -> L121:C14 (spans to L121)  `const statusLabel = »document.createElement('span');«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (9 raw steps → 7 distinct lines):
   1. L34 _(in `content`)_ `container.style.display »= 'block';«`  · ELEMENT:member-element
   2. L31 _(in `content`)_ `container.»style.mar«ginBottom = '0';`  · ELEMENT:object.setProperty
   3. L38 (→L42) `»«`  · ELEMENT:object.setProperty
   4. L111 `// ─»─ JSONBin route (origin«al logic — unchanged) ──────────`  · RETURN:json.stringify, ASSIGN:binary-right
   5. L106 (→L111) `»                    isDownloading = false;«`  · ASSIGN:binary-left
   6. L120 `upload»Btn.textContent = 'U«pload Backup (API)';`  · ASSIGN:identifier
   7. L114 (→L121) `»                const statusLabel = document.createElement('span');«`  · ELEMENT:object.setProperty

---

## Flow #8 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content` L954:C13 -> L954:C42  `if (!»window.location.href.includes«('/bookmarks')) return;`
- **Sink(s)**:
  - `FETCH_RESOURCE` (location.href) — `content` L1361:C35 -> L1361:C54  `const response = await »fetch(nextUrl.href)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (155 raw steps → 16 distinct lines):
   1. L954 `if (»!window.location.href.includes('/bookmarks')«) return;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   2. L958 `const »url = new URL(window.location.href)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
   3. L959 `const hasSortParam = »url.searchParams.has('bookmark_search[sort_column]')«;`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
   4. L961 `if (»!hasSortParam«) {`  · ASSIGN:identifier, ASSIGN:unary
   5. L962 `»url.searchParams.set('bookmark_search[sort_column]', 'bookmarkable_date')«;`  · ELEMENT:member-element-container, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href
   6. L963 `window.location.replace(»url.href«);`  · ELEMENT:member-element-container
   7. L322 `const »currentChapterURL = window.location.href.split('?')[0].split('#')[0]«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return
   8. L324 `if (»storedPartialData && storedPartialData.url === currentChapterURL«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
   9. L482 `url: »currentChapterURL«,`  · ASSIGN:identifier
  10. L480 (→L486) `»                await updateStorageEntry(LAST_READ_CHAPTER_KEY, workId, {«`  · ELEMENT:object.setProperty
  11. L263 (→L267) `»        allEntries[workId] = {«`  · ELEMENT:object.setProperty
  12. L265 `»...newData«,      // Sobrescreve dados de progresso`  · COPY:object-spread
  13. L488 `»lastReadChapters[workId] = { title: chapterTitle, url: currentChapterURL, timestamp: Date.now(), chapter: chapterNumber, meta: meta }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L1357 `const »nextUrl = new URL(window.location.href)«;`  · ELEMENT:object.setProperty, INITIAL:URL.constructor
  15. L1358 `»nextUrl.searchParams.set('page', currentPage)«;`  · ELEMENT:member-element-container, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href
  16. L1361 `const response = await fetch(»nextUrl.href«);`  · ELEMENT:member-element-container

---

## Flow #9 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `content` L106:C27 -> L106:C31  `const isBookmarkPage = »path«.includes('/bookmarks');`
- **Sink(s)**:
  - `FETCH_RESOURCE` (https://archiveofourown.org/works/null/bookmarks/new) — `content` L10:C31 -> L10:C46  `let isBookmarkGroupingMode »= false; // Ras«treia se estamos em modo agrupado de bookmarks`  (url-control=FULL)
  - `FETCH_RESOURCE` (https://archiveofourown.org/works/null/bookmarks/new) — `ui` L103:C31 -> L103:C46  `await windo»w.driveSync.dow«nload();`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1299 raw steps → 104 distinct lines):
   1. L106 `const isBookmarkPage = »path.includes('/bookmarks')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   2. L108 `if (»path.startsWith('/works/search')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   3. L1253 `if (»isBookmarkPage && !bookmarksEnabled«) return;`  · ASSIGN:identifier, ASSIGN:logical-left
   4. L1254 `if (»!isBookmarkPage && !generalEnabled«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   5. L1260 `if (»isBookmarkPage && isBookmarkGroupingMode«) return;`  · ASSIGN:identifier, ASSIGN:logical-left
   6. L110 `} else if (»path.match(/^\/works\/\d+/) && !path.includes('works/new')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
   7. L7 _(in `rating-ui`)_ `createStarCont»ainer: (currentRating = 0, onRatingChange = nu«ll, workPage = true, allowRate = true) => {`  · ELEMENT:member-element, RETURN:fallback-return
   8. L8 _(in `ui`)_ `toTo»pButton.id = 'marker-b«ack-to-top';`  · ASSIGN:identifier, ELEMENT:member-element
   9. L302 `const »workId = getWorkIdFromUrl()«;`  · ELEMENT:implicit.add
  10. L303 `if (»!workId«) return;`  · ASSIGN:identifier, ASSIGN:unary
  11. L318 `let isRead = !!readWorks[»workId«];`  · ASSIGN:identifier
  12. L319 `let isDoNotRead = !!doNotReadWorks[»workId«];`  · ASSIGN:identifier
  13. L323 `const storedPartialData = lastReadChapters[»workId«];`  · ASSIGN:identifier
  14. L340 `injectReviewIcon(»workId«, titleElement, currentChapterIndex);`  · ASSIGN:identifier
  15. L891 `injectFloatingReviewButton(»workId«, currentChapterIndex);`  · ASSIGN:identifier
  16. L895 `await injectStarRatingOnWorkPage(»workId«, currentChapterIndex, titleElement);`  · ASSIGN:identifier
  17. L902 `allowRating = !!(window.globalPageData.readWorks && window.globalPageData.readWorks[»workId]) || !!(window.globalPageData.lastReadChapters && window.globalPageData.lastReadChapters[workId«]);`  · ASSIGN:identifier
  18. L911 `const existingStars = document.getElementById(»`marker-rating-stars-${workId}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  19. L907 `allowRating = !!localRead[»workId] || !!localLast[workId«];`  · ASSIGN:identifier
  20. L932 `if (ratings[»workId] && ratings[workId«][chapterIndex]) {`  · ASSIGN:identifier
  21. L933 `return ratings[»workId«][chapterIndex];`  · ASSIGN:identifier
  22. L943 `starsContainer.id = »`marker-rating-stars-${workId}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  23. L347 `initHighlightFeature(»workId«, currentChapterIndex, contentContainer, hlProSettings.is_pro_user);`  · ASSIGN:identifier
  24. L1698 `const storageKey = »`ao3_hl_${workId}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  25. L1700 `storage.local.get(»storageKey«, items => {`  · ASSIGN:identifier
  26. L1701 `resolve(items[»storageKey«] || null);`  · ASSIGN:identifier
  27. L1764 `setupHlSelectionListeners(container, »workId«, chapterIndex, isProUser);`  · ASSIGN:identifier
  28. L1765 `setupHlClickListeners(container, »workId«, chapterIndex, isProUser);`  · ASSIGN:identifier
  29. L613 `const isInWTR = !!_wtrQueue[»workId«];`  · ASSIGN:identifier
  30. L588 `return !!readWorks[»workId] || !!lastReadChapters[workId«];`  · ASSIGN:identifier
  31. L113 `} else if (»path.includes('/users/') && !path.includes('/works') && !path.includes('/bookmarks') && !path.includes('/profile') && !path.includes('/readings')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  32. L688 `if (»currentUsername && window.location.pathname.includes(currentUsername)«) {`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  33. L115 `} else if (»isBookmarkPage«) {`  · ASSIGN:identifier
  34. L141 `const isOwnBookmarkPage = »loggedInUsername && window.location.pathname.includes(`/users/${loggedInUsername}`)«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right
  35. L142 `if (»isOwnBookmarkPage«) {`  · ASSIGN:identifier
  36. L366 `injectReviewIcon(»workId«, newTitleElement, currentChapterIndex);`  · ASSIGN:identifier
  37. L417 `if (isRead && _wtrSettings.enabled && _wtrQueue[»workId«]) {`  · ASSIGN:identifier
  38. L480 `await updateStorageEntry(LAST_READ_CHAPTER_KEY, »workId«, {`  · ASSIGN:identifier
  39. L248 `const currentEntry = allEntries[»workId«] || {};`  · ASSIGN:identifier
  40. L496 `syncBookmarkToAO3(»workId«);`  · ASSIGN:identifier
  41. L9 _(in `drive_sync`)_ `// Cross-browser stor»age handle (shared scope with storage.js in content scripts«)`  · ASSIGN:identifier, ASSIGN:template-literal
  42. L10 `let isBookmarkGroupingMode = fals»e; // Ra«streia se estamos em modo agrupado de bookmarks`  · ASSIGN:identifier
  43. L65 `safeLog('[AO3 »Marker] Online detected. Retrying pending« bookmarks...');`  · ASSIGN:identifier, ASSIGN:template-literal
  44. L28 _(in `ui`)_ `const container = document.createEle»ment('«div');`  · ASSIGN:identifier
  45. L176 `const »titleE«lem = document.querySelector('h2.title');`  · ASSIGN:identifier
  46. L178 `»        const fandomElem = document.queryS«elector('.fandom ul li a'); // Pega o 1º fandom`  · ASSIGN:identifier, ELEMENT:object.setProperty
  47. L180 `»const chapterElem = document.querySelector('dd.chapt«ers');`  · ASSIGN:identifier, ASSIGN:template-literal
  48. L35 _(in `ao3_api`)_ `await removeFromPendingBookmarks(»workId«);`  · ASSIGN:identifier
  49. L192 _(in `storage`)_ `safeLog(»`[RetryQueue] Work ${workId} removed from pending list.`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  50. L57 _(in `storage`)_ `const INFINITE_SCROL»L_BOOKMARKS_KEY = 'ao3_infinite_scroll_bookma«rks';`  · ASSIGN:identifier, ASSIGN:template-literal
  51. L59 `if (typeof processPendingBookmarks === 'f»unctio«n') {`  · ASSIGN:identifier
  52. L498 `if (_wtrSettings.enabled && _wtrQueue[»workId«]) {`  · ASSIGN:identifier
  53. L499 `await removeFromWTRQueue(»workId«);`  · ASSIGN:identifier
  54. L702 `* Called »once o«n page load if PRO + wtr_enabled + wtr_show_header_menu.`  · ASSIGN:identifier
  55. L705 `if (!_wt»rSettings.enabled || !_wtrSettings.sh«owHeaderMenu) return;`  · ASSIGN:identifier, ASSIGN:template-literal
  56. L510 `await window.stats.recordManualRead(»workId«, userStuff.innerText, meta);`  · ASSIGN:identifier
  57. L529 `await injectStarRatingOnWorkPage(»workId«, currentChapterIndex, titleElement);`  · ASSIGN:identifier
  58. L570 `await injectStarRatingOnWorkPage(»workId«, currentChapterIndex, titleElement);`  · ASSIGN:identifier
  59. L593 `const isInWTR = !!_wtrQueue[»workId«];`  · ASSIGN:identifier
  60. L599 `await addToWTRQueue(»workId«, { title: meta?.title || 'Unknown', author: meta?.author || 'Unknown' });`  · ASSIGN:identifier
  61. L684 `const g»reetin«g = document.querySelector('#greeting ul li a');`  · ASSIGN:identifier
  62. L692 _(in `storage`)_ `safeLog(»`[WTR] Added ${workId} to queue.`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  63. L602 `syncWTRBookmarkToAO3(»workId«, _wtrSettings.tag);`  · ASSIGN:identifier
  64. L102 _(in `ao3_api`)_ `const fetchUrl = »`https://archiveofourown.org/works/${workId}/bookmarks/new`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  65. L103 _(in `ui`)_ `await window.driv»eSync.do«wnload();`  · ASSIGN:identifier
  66. L188 _(in `auth`)_ `_storage.l»ocal.get([GOOGLE_TOKEN_KEY, GOOGLE_REFRESH_«KEY, GOOGLE_EXPIRY_KEY], r)`  · ASSIGN:identifier, ASSIGN:template-literal
  67. L117 `const settings = await storage.loca»l.get(«[ENABLE_BOOKMARK_GROUPING_KEY, IS_PRO_USER_KEY]);`  · ASSIGN:identifier
  68. L789 _(in `storage`)_ `if (!ids.includes(»workId«)) {`  · ASSIGN:identifier
  69. L794 `empt»y.textContent = 'Your Want to Read list is« empty.';`  · ASSIGN:identifier, ELEMENT:object.setProperty
  70. L796 _(in `storage`)_ `safeLog(»`[WTR RetryQueue] ${workId} added to pending.`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  71. L128 _(in `storage`)_ `// 2. Resolve a Promise imediatamente sem bloque»ar a U«I`  · ASSIGN:identifier
  72. L143 `const markerToolsContainer = documen»t.quer«ySelector('.marker-data-sync-container');`  · ASSIGN:identifier
  73. L184 _(in `storage`)_ `async function removeFromPendingBookmarks(wo»rkId) «{`  · ASSIGN:identifier
  74. L185 `»    const link = authorElem.querySelector('a')«;`  · ASSIGN:identifier, ASSIGN:template-literal
  75. L648 `await window.stats.recordManualRead(»workId«, userStuff.innerText, meta);`  · ASSIGN:identifier
  76. L885 `openReviewModal(»workId«, currentChapterIndex);`  · ASSIGN:identifier
  77. L509 `meta.chapterI»ndex = chapterNumber || '1';«`  · ASSIGN:identifier
  78. L940 `await saveChapterRating(»workId«, chapterIndex, newRating, totalChapters);`  · ASSIGN:identifier
  79. L268 _(in `storage`)_ `if (!ratings[»workId«]) ratings[workId] = {};`  · ASSIGN:identifier
  80. L271 _(in `storage`)_ `if (!ratings[»workId«]._meta) {`  · ASSIGN:identifier
  81. L283 _(in `storage`)_ `if (chapterIndex === 'global' && ratings[»workId«]._meta) {`  · ASSIGN:identifier
  82. L296 _(in `storage`)_ `const hasIndividualRatings = Object.keys(ratings[»workId«]).some(k => k !== '_meta');`  · ASSIGN:identifier
  83. L297 _(in `storage`)_ `const hasGlobal = ratings[»workId«]._meta && typeof ratings[workId]._meta.globalRating === 'number';`  · ASSIGN:identifier
  84. L2399 `await removeHighlightFromStorage(»workId«, chapterIndex, highlightId);`  · ASSIGN:identifier
  85. L2500 `const storageKey = »`ao3_hl_${workId}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  86. L2504 `storage.local.get(»storageKey«, items => {`  · ASSIGN:identifier
  87. L2505 `resolve(items[»storageKey«] || null);`  · ASSIGN:identifier
  88. L2528 `storage.local.remove(»storageKey«, resolve);`  · ASSIGN:identifier
  89. L2532 `storage.local.set({ [»storageKey«]: workData }, resolve);`  · ASSIGN:identifier
  90. L2536 `safeLog(»`[Highlights] Removed highlight ${highlightId} from work ${workId} ch.${chapterIndex}`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  91. L2418 `await updateHighlightColorInStorage(»workId«, chapterIndex, highlightId, newColor);`  · ASSIGN:identifier
  92. L2432 `const storageKey = »`ao3_hl_${workId}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  93. L2436 `storage.local.get(»storageKey«, items => {`  · ASSIGN:identifier
  94. L2437 `resolve(items[»storageKey«] || null);`  · ASSIGN:identifier
  95. L2451 `storage.local.set({ [»storageKey«]: workData }, resolve);`  · ASSIGN:identifier
  96. L2310 `const chapterPathMatch = »currentPath.match(/\/works\/\d+\/chapters\/\d+/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  97. L2312 `? »'https://archiveofourown.org' + chapterPathMatch[0]«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:conditional-consequent
  98. L2313 `: window.location.origin + »currentPath«; // strip query params (?view_full_work=true etc)`  · ASSIGN:identifier, ASSIGN:binary-right
  99. L2325 `await saveHighlightToStorage(»workId«, chapterIndex, hlDescriptor, { workTitle, workAuthor });`  · ASSIGN:identifier
  100. L2460 `const storageKey = »`ao3_hl_${workId}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
  101. L2465 `storage.local.get(»storageKey«, items => {`  · ASSIGN:identifier
  102. L2466 `resolve(items[»storageKey«] || null);`  · ASSIGN:identifier
  103. L2490 `storage.local.set({ [»storageKey«]: workData }, resolve);`  · ASSIGN:identifier
  104. L2493 `safeLog(»`[Highlights] Saved highlight ${hlDescriptor.id} for work ${workId} ch.${chapterIndex}`«);`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #10 — ELEMENT_TEXT_CONTENT (a[rel="author"])

- **Source**: `ELEMENT_TEXT_CONTENT` — `content` L2289:C59 -> L2289:C89  `const workAuthor = authorElement ? »authorElement.textContent.trim«() : 'Unknown Author';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_hl_null) — `content` L2490:C12 -> L2490:C66  `»storage.local.set({ [storageKey]: workData }, resolve)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11 raw steps → 4 distinct lines):
   1. L2289 `const workAuthor = authorElement ? »authorElement.textContent.trim()« : 'Unknown Author';`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
   2. L2325 `»await saveHighlightToStorage(workId, chapterIndex, hlDescriptor, { workTitle, workAuthor })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L2475 `»workData = { chapters: {} }«;`  · ELEMENT:object.setProperty
   4. L2490 `»storage.local.set({ [storageKey]: workData }, resolve)«;`  · ELEMENT:object.setProperty

---

## Flow #11 — ELEMENT_VALUE (From storage.local.set('jsonbin_api_key') in options)  ·  21× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `content` L213:C19 -> L213:C63  `con»st wordElem = context.querySelector('dd.word«s');`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `content` L426:C31 -> L434:C10 (spans to L434)  `const meta = ex»tractUniversalMetadata(document);«`
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L455:C37 -> L458:C18 (spans to L458)  `const getRes = await »fetch(REVIEW_API_URL + '/latest', {«`
  - `FETCH_HEADERS` ([Unknown URL]) — `storage` L469:C45 -> L481:C18 (spans to L481)  `const reviewResponse = await »fetch(REVIEW_API_URL, {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (45 raw steps → 13 distinct lines):
   1. L213 `con»st wordElem = context.querySelector('dd.words'«);`  · ELEMENT:member-element, RETURN:fallback-return
   2. L249 _(in `ui`)_ `* Injects the "Filter WT»R" but«ton into the Marker Tools container.`  · ASSIGN:identifier
   3. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   4. L375 (→L384) `»                }«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_api_key, sender: options, receiver: content]
   5. L376 _(in `storage`)_ `if (items[API_KEY_STORE]) JSONBIN_API_KEY = »items[API_KEY_STORE] || ''«;`  · ASSIGN:logical-left
   6. L654 _(in `storage`)_ `if (»!JSONBIN_API_KEY || !JSONBIN_BIN_ID«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   7. L357 `»            if (m.addedNodes.length« > 0) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left
   8. L430 _(in `storage`)_ `"X-Master-Key": »JSONBIN_API_KEY«,`  · ASSIGN:identifier
   9. L426 (→L434) `»                const meta = extractUniversalMetadata(document);«`  · ELEMENT:object.setProperty
  10. L457 `btn.style.cssText = `${base»Style} backgrou«nd: ${CUSTOM_COLORS.READ} !important; color: #ffffff !important;`;`  · ASSIGN:identifier
  11. L455 (→L458) `»                if (isRead) {«`  · ELEMENT:object.setProperty
  12. L473 _(in `storage`)_ `"X-Master-Key": »JSONBIN_API_KEY«,`  · ASSIGN:identifier
  13. L469 (→L481) `»«`  · ELEMENT:object.setProperty

---

## Flow #12 — ELEMENT_VALUE (From storage.local.set('jsonbin_bin_id') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `content` L214:C18 -> L214:C61  `co»nst chapterElem = context.querySelector('dd«.chapters');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content` L426:C31 -> L434:C10 (spans to L434)  `const meta = ex»tractUniversalMetadata(document);«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (30 raw steps → 9 distinct lines):
   1. L214 `co»nst chapterElem = context.querySelector('dd.c«hapters');`  · ELEMENT:member-element, RETURN:fallback-return
   2. L250 `// 2. Otimização»: Evi«ta re-salvar se o META for idêntico`  · ASSIGN:identifier
   3. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   4. L375 (→L384) `»                }«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_bin_id, sender: options, receiver: content]
   5. L377 `commentObserver.o»bserve(commentsContainer,« { childList: true, subtree: true });`  · ASSIGN:logical-left
   6. L381 _(in `storage`)_ `if (»JSONBIN_BIN_ID) API_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`«;`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L654 _(in `storage`)_ `if (»!JSONBIN_API_KEY || !JSONBIN_BIN_ID«) return;`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
   8. L357 `»            if (m.addedNodes.length« > 0) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
   9. L426 `const meta = extractU»niversa«lMetadata(document);`  · ASSIGN:identifier

---

## Flow #13 — ELEMENT_VALUE (From storage.local.set('jsonbin_review_bin_id') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L215:C24 -> L215:C73  `const reviewBinId = »document.getElementById('reviewBinId').value.trim«();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L455:C37 -> L458:C18 (spans to L458)  `const getRes = await »fetch(REVIEW_API_URL + '/latest', {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `storage` L469:C45 -> L481:C18 (spans to L481)  `const reviewResponse = await »fetch(REVIEW_API_URL, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (37 raw steps → 9 distinct lines):
   1. L215 _(in `options`)_ `const reviewBinId = »document.getElementById('reviewBinId').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L251 _(in `stats`)_ `if (typeof ratings[»workId][key«] === 'number') {`  · ASSIGN:identifier
   3. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   4. L375 (→L384) `»                }«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_review_bin_id, sender: options, receiver: content]
   5. L378 _(in `storage`)_ `JSONBIN_REVIEW_BIN_ID = »items[REVIEW_BIN_ID_STORE] || ''«;`  · ASSIGN:logical-left
   6. L382 `const bo»ttomMenu = document.querySelector("div#feedback ul.actions") || document.querySelector("div#fe«edback > ul");`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L450 _(in `storage`)_ `if (»JSONBIN_REVIEW_BIN_ID && REVIEW_API_URL«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
   8. L455 _(in `storage`)_ `const getRes = await fetch(»REVIEW_API_URL« + '/latest', {`  · ASSIGN:identifier, ASSIGN:binary-left
   9. L469 _(in `storage`)_ `const reviewResponse = await fetch(»REVIEW_API_URL«, {`  · ASSIGN:identifier

---

## Flow #14 — ELEMENT_VALUE (From storage.local.set('ao3_stats_config') in options)  ·  60× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L243:C22 -> L243:C85  `wordsPerBook: »parseInt(document.getElementById('stats_words_per_book').value)« || 50000,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content` L137:C12 -> L139:C14 (spans to L139)  `// [»WTR] Inject WTR filter button on user's own Bookmarks page«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (25 raw steps → 7 distinct lines):
   1. L243 _(in `options`)_ `wordsPerBook: »parseInt(document.getElementById('stats_words_per_book').value) || 50000«,`  · RETURN:parseInt, ASSIGN:logical-left
   2. L241 (→L246) `»        }«`  · ELEMENT:object.setProperty
   3. L264 `...currentEntry,» // Mantém dados antigos (e«x: timestamp original se não informado)`  · RETURN:json.stringify
   4. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   5. L375 (→L384) `»                }«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_stats_config, sender: options, receiver: content]
   6. L380 _(in `storage`)_ `if (items[STATS_CONFIG_KEY]) STATS_CONFIG_ENABLED = »JSON.parse(items[STATS_CONFIG_KEY])?.enabled || false«;`  · RETURN:json.parse, ELEMENT:member-element, ASSIGN:logical-left
   7. L496 `»        syncBookmark«ToAO3(workId);`  · ASSIGN:identifier

---

## Flow #15 — ELEMENT_VALUE (From storage.local.set('ao3_stats_config') in options)  ·  60× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L244:C20 -> L244:C80  `yearlyGoal: »parseInt(document.getElementById('stats_yearly_goal').value)« || 50,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content` L137:C12 -> L139:C14 (spans to L139)  `// [»WTR] Inject WTR filter button on user's own Bookmarks page«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (25 raw steps → 7 distinct lines):
   1. L244 _(in `options`)_ `yearlyGoal: »parseInt(document.getElementById('stats_yearly_goal').value) || 50«,`  · RETURN:parseInt, ASSIGN:logical-left
   2. L241 (→L246) `»        }«`  · ELEMENT:object.setProperty
   3. L264 `...currentEntry,» // Mantém dados antigos (e«x: timestamp original se não informado)`  · RETURN:json.stringify
   4. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   5. L375 (→L384) `»                }«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_stats_config, sender: options, receiver: content]
   6. L380 _(in `storage`)_ `if (items[STATS_CONFIG_KEY]) STATS_CONFIG_ENABLED = »JSON.parse(items[STATS_CONFIG_KEY])?.enabled || false«;`  · RETURN:json.parse, ELEMENT:member-element, ASSIGN:logical-left
   7. L496 `»        syncBookmark«ToAO3(workId);`  · ASSIGN:identifier

---

## Flow #16 — ELEMENT_VALUE (From storage.local.set('ao3_stats_config') in options)  ·  60× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `stats` L245:C20 -> L245:C68  `const hasAny»Rating = Object.values(ratings[workId]).some(v =«> typeof v === 'number') || globalRating !== null;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content` L137:C12 -> L139:C14 (spans to L139)  `// [»WTR] Inject WTR filter button on user's own Bookmarks page«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (25 raw steps → 7 distinct lines):
   1. L245 _(in `stats`)_ `const hasAny»Rating = Object.values(ratings[workId]).some(v => «typeof v === 'number') || globalRating !== null;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L241 (→L246) `»        }«`  · ELEMENT:object.setProperty
   3. L264 `...currentEntry,» // Mantém dados antigos (e«x: timestamp original se não informado)`  · RETURN:json.stringify
   4. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   5. L375 (→L384) `»                }«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_stats_config, sender: options, receiver: content]
   6. L380 _(in `storage`)_ `if (items[STATS_CONFIG_KEY]) STATS_CONFIG_ENABLED = »JSON.parse(items[STATS_CONFIG_KEY])?.enabled || false«;`  · RETURN:json.parse, ELEMENT:member-element, ASSIGN:logical-left
   7. L496 `»        syncBookmark«ToAO3(workId);`  · ASSIGN:identifier

---

## Flow #17 — ELEMENT_VALUE (From storage.local.set('ao3_wtr_tag') in options)  ·  12× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `stats` L280:C52 -> L280:C71  `const avg = await window.stats.getWorkAv»erageRating(workId)«;`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `ao3_api` L174:C39 -> L174:C89  `const postResponse = await »fetch(postUrl, { method: 'POST', body: formData })«;`
  - `FETCH_BODY` ([Unknown URL]) — `ao3_api` L159:C38 -> L159:C88  `const putResponse = await »fetch(editUrl, { method: 'POST', body: formData })«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (282 raw steps → 15 distinct lines):
   1. L280 _(in `options`)_ `items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? »wtrTagEl.value.trim() || 'AO3 Advanced Marker Want to Read'« : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:conditional-consequent
   2. L248 (→L268) `»        const currentEntry = allEntries[workId] || {};«`  · ELEMENT:object.setProperty
   3. L724 (→L738) `»«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_wtr_tag, sender: options, receiver: content]
   4. L735 _(in `storage`)_ `tag: »items[WTR_TAG_KEY] || 'AO3 Advanced Marker Want to Read'«,`  · ASSIGN:logical-left
   5. L731 (→L737) `»«`  · ELEMENT:object.setProperty
   6. L207 _(in `storage`)_ `try { return JSON.parse(record[»'CH«APTER_REVIEWS_KEY']); } catch (e) { return {}; }`  · ASSIGN:identifier
   7. L139 `const greetingLink = doc»ument.que«rySelector('#greeting ul li a');`  · ASSIGN:identifier
   8. L140 `const loggedInUsern»ame = gre«etingLink ? greetingLink.href.split('/users/')[1]?.split('/')[0] : null;`  · ASSIGN:identifier
   9. L138 _(in `ao3_api`)_ `const »tagsArray = existingTags.split(',').map(t => t.trim()).filter(Boolean)«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  10. L170 _(in `storage`)_ `if (modified) await saveData(PENDING_BOOKMARKS_K»EY, valid«List);`  · ASSIGN:identifier
  11. L164 _(in `storage`)_ `validL»ist.push(isObj ? item : {« workId: id, addedAt });`  · ELEMENT:object.setProperty
  12. L174 _(in `ao3_api`)_ `const »postResponse = await fetch(postUrl, { method: 'POST', body: formData })«;`  · ELEMENT:object.setProperty
  13. L153 _(in `auth`)_ `headers: { Authorization: `Beare»r ${data.access_toke«n}` }`  · RETURN:array.join
  14. L148 _(in `storage`)_ `const list = a»wait loadData(PENDING_BOO«KMARKS_KEY).then(data => Array.isArray(data) ? data : []);`  · ELEMENT:object.setProperty
  15. L159 _(in `ao3_api`)_ `const »putResponse = await fetch(editUrl, { method: 'POST', body: formData })«;`  · ELEMENT:object.setProperty

---

## Flow #18 — ELEMENT_TEXT_CONTENT (From storage.local.set('ao3_hl_null') in content)  ·  14× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `content` L2289:C59 -> L2289:C89  `const workAuthor = authorElement ? »authorElement.textContent.trim«() : 'Unknown Author';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_hl_null) — `content` L2532:C16 -> L2532:C70  `»storage.local.set({ [storageKey]: workData }, resolve)«;`
  - `CHROME_LOCAL_STORAGE` (ao3_hl_null) — `content` L2451:C16 -> L2451:C70  `»storage.local.set({ [storageKey]: workData }, resolve)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2660 raw steps → 53 distinct lines):
   1. L2289 `const workAuthor = authorElement ? »authorElement.textContent.trim()« : 'Unknown Author';`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent
   2. L2325 `»await saveHighlightToStorage(workId, chapterIndex, hlDescriptor, { workTitle, workAuthor })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L2475 `»workData = { chapters: {} }«;`  · ELEMENT:object.setProperty
   4. L2490 `»storage.local.set({ [storageKey]: workData }, resolve)«;`  · ELEMENT:object.setProperty
   5. L1700 (→L1702) `»            storage.local.get(storageKey, items => {«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_hl_null, sender: content, receiver: content]
   6. L1701 `resolve(»items[storageKey] || null«);`  · ASSIGN:logical-left
   7. L1705 `let workHighlights = »stored«;`  · ASSIGN:identifier
   8. L1707 `try { workHighlights = »JSON.parse(workHighlights)«; } catch (e) { workHighlights = null; }`  · ASSIGN:identifier, RETURN:json.parse
   9. L1710 `const chapterHighlights = »workHighlights?.chapters?.[String(chapterIndex)] || []«;`  · ELEMENT:member-element, ASSIGN:logical-left
  10. L1755 `if (»chapterHighlights.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  11. L266 `»    meta: metaToSave // Usa o meta dec«idido`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  12. L274 `// --»- Page H«andlers ---`  · ITERATE:loop.iteration
  13. L275 _(in `highlights`)_ `const »matchIndex = findHighlightPosition(flatText, map, hl, container)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  14. L329 _(in `highlights`)_ `const { »text, prefix, suffix } = hl«;`  · ASSIGN:identifier, ELEMENT:destructure-property[text], ELEMENT:destructure-property[prefix], ELEMENT:destructure-property[suffix]
  15. L332 `const match »= titleElement.textCon«tent.match(/Chapter (\d+)/);`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  16. L333 `if (match) currentChapter»Index = mat«ch[1];`  · ASSIGN:identifier
  17. L335 `titleElement »= document.qu«erySelector('h2.title.heading');`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  18. L339 `// 5. Review Sy»stem Injectio«n (Moved up to run even if not logged in)`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  19. L340 `injectReviewIcon(workId, titl»eElement, «currentChapterIndex);`  · ASSIGN:identifier
  20. L342 `// 6. PRO Text Hi»ghlights (Mov«ed up to run even if not logged in)`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  21. L346 _(in `storage`)_ `CUSTOM_COLO»RS.WTR = item«s[COLOR_WTR_KEY];`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  22. L347 `initHighlightFeature(»workId, cu«rrentChapterIndex, contentContainer, hlProSettings.is_pro_user);`  · ASSIGN:identifier
  23. L353 _(in `highlights`)_ `const firstOccurrence = flatText.indexOf(»text«);`  · ASSIGN:identifier
  24. L355 _(in `ui`)_ `const existingBadges = header.querySelectorAll»('.m«arker-badge');`  · ASSIGN:identifier
  25. L366 `injectReviewIcon(workId, n»ew«TitleElement, currentChapterIndex);`  · ASSIGN:identifier
  26. L383 `»const workActions«Menus = [];`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  27. L385 `if (bottomMenu && bottomMe»nu !== topMenu) w«orkActionsMenus.push(bottomMenu);`  · ASSIGN:identifier, ELEMENT:member-element
  28. L390 _(in `ui`)_ `workElement.s»etAttribute('data-marker-status', 'update«d-read');`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, RETURN:fallback-return
  29. L393 _(in `highlights`)_ `if (»storedPrefix && !blockText.substring(0, 30).includes(storedPrefix.substring(0, 15))«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
  30. L397 _(in `storage`)_ `async function syncDataToAP»I(isAutomatic = f«alse) {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  31. L417 `if (isRead && _wtrSettings.»enabled« && _wtrQueue[workId]) {`  · ASSIGN:identifier, ELEMENT:member-element
  32. L398 _(in `highlights`)_ `if (»adjIdx < 0 || adjIdx >= allBlocks.length«) continue;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  33. L400 _(in `ui`)_ `updateBadge.style.cssText =» `disp«lay: inline-block; padding: 2px 6px; font-size: 0.8em; font-weight: bold; background-color: ${CUSTOM_COLORS.UPDATED}; color: #000000; border-radius: 10px;`;`  · ASSIGN:identifier
  34. L402 _(in `highlights`)_ `if (adjText.substring(0, 30).includes(»storedPrefix.substring(0, 15)«)) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  35. L404 _(in `highlights`)_ `const localIdx = adjText.indexOf(»hl.text«);`  · ASSIGN:identifier, ELEMENT:member-element
  36. L362 _(in `ui`)_ `badgesWrapper.style.cssText = 'display: block;» m«argin-top: 5px;';`  · ASSIGN:identifier
  37. L277 _(in `storage`)_ `rati»ngs[workId«]._meta.totalChapters = totalChapters;`  · ASSIGN:binary-left
  38. L284 _(in `highlights`)_ `const range = flatTextRangeToDOM(map, matchIndex, »matchIndex + hl.text.length«);`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  39. L485 _(in `storage`)_ `»            if (!isAutomatic) messages.push("«Reviews Backup: Success (Merged).");`  · ASSIGN:binary-left, ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right
  40. L489 `isPartial» = «true;`  · ASSIGN:identifier, ASSIGN:binary-left
  41. L279 _(in `highlights`)_ `safeLog(»`[Highlights] Orphaned highlight: "${hl.text.substring(0, 30)}..."`«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
  42. L9 _(in `storage`)_ `if (typeof DEBUG !== 'undefined' && DEBUG) console.log(...»args«);`  · ASSIGN:identifier
  43. L290 _(in `storage`)_ `ratings[workId]._meta.glo»balRating = parseFloat(rati«ng);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L527 _(in `highlights`)_ `wrapTextSegment(node, startOffset, endOffset, »highlightId, color«);`  · ASSIGN:identifier
  45. L655 _(in `ui`)_ `// Detect theme — mirrors the sa»me check us«ed in openReviewModal (ui.js)`  · ASSIGN:identifier
  46. L658 `»    menu.appendChild(listItemR«ead);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  47. L659 _(in `storage`)_ `await window.driveSyn»c.upl«oad(true);`  · ASSIGN:identifier
  48. L661 _(in `storage`)_ `console.err»or('[AutoBackup] Google Drive auto«matic upload failed', e);`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:template-literal
  49. L294 _(in `highlights`)_ `const firstMark = document.querySelector(»`mark.ao3-pro-highlight[data-hl-id="${hl.id}"]`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  50. L301 _(in `highlights`)_ `marker.dataset.hlId = »hl.id«;`  · ASSIGN:identifier, ELEMENT:member-element
  51. L303 _(in `highlights`)_ `if (»hl.color && hl.color.startsWith('#')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  52. L304 _(in `ui`)_ `blurb.style.display = isInWTR ? '' »: 'none'«;`  · ASSIGN:identifier, ELEMENT:member-element
  53. L306 _(in `highlights`)_ `marker.classList.add(»`ao3-hl-mark-${hl.color || 'yellow'}`«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:template-literal

---

## Flow #19 — ELEMENT_VALUE (importTokenInput)

- **Source**: `ELEMENT_VALUE` — `options` L668:C29 -> L668:C56  `const tokenStr = »importTokenInput.value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (google_refresh_token) — `options` L335:C16 -> L338:C18 (spans to L338)  `// Sync »picker to hex text«`
  - `CHROME_LOCAL_STORAGE` (google_user_email) — `options` L335:C16 -> L338:C18 (spans to L338)  `// Sync »picker to hex text«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (22 raw steps → 9 distinct lines):
   1. L668 `const tokenStr = »importTokenInput.value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L669 `if (»!tokenStr«) return showToast('Please paste a token string first.');`  · ASSIGN:identifier, ASSIGN:unary
   3. L674 `await window.googleAuth.importToken(»tokenStr«);`  · ASSIGN:identifier
   4. L320 `{ pickerId: 'color-d»o-not-read', hexId: 'hex-c«olor-do-not-read' },`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:atob
   5. L321 `{ pickerId: 'color-w»tr', hexId: 'hex-co«lor-wtr' }`  · ASSIGN:identifier, RETURN:json.parse
   6. L323 _(in `auth`)_ `if (»!payload.r«) throw new Error('Invalid token string: Missing refresh token.');`  · ELEMENT:member-element, ASSIGN:unary
   7. L326 _(in `auth`)_ `[GOOGLE_REFRESH_KEY]: »payload.r«`  · ELEMENT:member-element
   8. L325 (→L327) `»«`  · ELEMENT:object.setProperty
   9. L328 _(in `auth`)_ `if (»payload.e) toSave[GOOGLE_EMAIL_KEY] = payload.e«;`  · ELEMENT:member-element

---

## Flow #20 — ELEMENT_VALUE (proLicenseKey)

- **Source**: `ELEMENT_VALUE` — `options` L792:C21 -> L792:C72  `const keyInput = »document.getElementById('proLicenseKey').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_pro_license) — `options` L817:C18 -> L817:C93  `await »storage.local.set({ [PRO_LICENSE_KEY]: keyInput, [IS_PRO_USER_KEY]: true })«;`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (13 raw steps → 5 distinct lines):
   1. L792 `const keyInput = »document.getElementById('proLicenseKey').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L796 `if (»!keyInput«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L811 `body: new URLSearchParams({ product_id: GUMROAD_PRODUCT_ID, license_key: »keyInput« })`  · ASSIGN:identifier
   4. L808 (→L812) `»        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {«`  · ELEMENT:object.setProperty
   5. L817 `»await storage.local.set({ [PRO_LICENSE_KEY]: keyInput, [IS_PRO_USER_KEY]: true })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #21 — ELEMENT_VALUE (apiKey)

- **Source**: `ELEMENT_VALUE` — `options` L213:C19 -> L213:C63  `const apiKey = »document.getElementById('apiKey').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (jsonbin_api_key) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L213 `const apiKey = »document.getElementById('apiKey').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L249 `[API_KEY_STORE]: »apiKey«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #22 — ELEMENT_VALUE (binId)

- **Source**: `ELEMENT_VALUE` — `options` L214:C18 -> L214:C61  `const binId = »document.getElementById('binId').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (jsonbin_bin_id) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L214 `const binId = »document.getElementById('binId').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L250 `[BIN_ID_STORE]: »binId«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #23 — ELEMENT_VALUE (reviewBinId)

- **Source**: `ELEMENT_VALUE` — `options` L215:C24 -> L215:C73  `const reviewBinId = »document.getElementById('reviewBinId').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (jsonbin_review_bin_id) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (12 raw steps → 3 distinct lines):
   1. L215 `const reviewBinId = »document.getElementById('reviewBinId').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L251 `[REVIEW_BIN_ID_STORE]: »reviewBinId«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #24 — ELEMENT_VALUE (color-read)

- **Source**: `ELEMENT_VALUE` — `options` L257:C26 -> L257:C35  `[COLOR_READ_KEY]: »colorRead«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (custom_color_read) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L257 `[COLOR_READ_KEY]: »colorRead«,`  · ASSIGN:identifier
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #25 — ELEMENT_VALUE (color-updated)

- **Source**: `ELEMENT_VALUE` — `options` L258:C29 -> L258:C41  `[COLOR_UPDATED_KEY]: »colorUpdated«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (custom_color_updated) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L258 `[COLOR_UPDATED_KEY]: »colorUpdated«,`  · ASSIGN:identifier
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #26 — ELEMENT_VALUE (color-partial)

- **Source**: `ELEMENT_VALUE` — `options` L259:C29 -> L259:C41  `[COLOR_PARTIAL_KEY]: »colorPartial«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (custom_color_partial) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L259 `[COLOR_PARTIAL_KEY]: »colorPartial«,`  · ASSIGN:identifier
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #27 — ELEMENT_VALUE (color-do-not-read)

- **Source**: `ELEMENT_VALUE` — `options` L260:C31 -> L260:C45  `[COLOR_DONOTREAD_KEY]: »colorDoNotRead«,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (custom_color_do_not_read) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L260 `[COLOR_DONOTREAD_KEY]: »colorDoNotRead«,`  · ASSIGN:identifier
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #28 — ELEMENT_VALUE (color-wtr)

- **Source**: `ELEMENT_VALUE` — `options` L232:C60 -> L232:C102  `const colorWtr = document.getElementById('color-wtr') ? »document.getElementById('color-wtr').value« : '#6f42c1';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (custom_color_wtr) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (9 raw steps → 3 distinct lines):
   1. L232 `const colorWtr = document.getElementById('color-wtr') ? »document.getElementById('color-wtr').value« : '#6f42c1';`  · ASSIGN:conditional-consequent
   2. L261 `[COLOR_WTR_KEY]: »colorWtr«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #29 — ELEMENT_VALUE (stats_words_per_book)

- **Source**: `ELEMENT_VALUE` — `options` L243:C22 -> L243:C85  `wordsPerBook: »parseInt(document.getElementById('stats_words_per_book').value)« || 50000,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_stats_config) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (15 raw steps → 4 distinct lines):
   1. L243 `wordsPerBook: »parseInt(document.getElementById('stats_words_per_book').value) || 50000«,`  · RETURN:parseInt, ASSIGN:logical-left
   2. L241 (→L246) `»    const statsConfig = {«`  · ELEMENT:object.setProperty
   3. L264 `[STATS_CONFIG_KEY]: »JSON.stringify(statsConfig)«,`  · RETURN:json.stringify
   4. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #30 — ELEMENT_VALUE (stats_yearly_goal)

- **Source**: `ELEMENT_VALUE` — `options` L244:C20 -> L244:C80  `yearlyGoal: »parseInt(document.getElementById('stats_yearly_goal').value)« || 50,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_stats_config) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (15 raw steps → 4 distinct lines):
   1. L244 `yearlyGoal: »parseInt(document.getElementById('stats_yearly_goal').value) || 50«,`  · RETURN:parseInt, ASSIGN:logical-left
   2. L241 (→L246) `»    const statsConfig = {«`  · ELEMENT:object.setProperty
   3. L264 `[STATS_CONFIG_KEY]: »JSON.stringify(statsConfig)«,`  · RETURN:json.stringify
   4. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #31 — ELEMENT_VALUE (statsBinId)

- **Source**: `ELEMENT_VALUE` — `options` L245:C20 -> L245:C68  `statsBinId: »document.getElementById('statsBinId').value.trim«()`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_stats_config) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (15 raw steps → 4 distinct lines):
   1. L245 `statsBinId: »document.getElementById('statsBinId').value.trim()«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L241 (→L246) `»    const statsConfig = {«`  · ELEMENT:object.setProperty
   3. L264 `[STATS_CONFIG_KEY]: »JSON.stringify(statsConfig)«,`  · RETURN:json.stringify
   4. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #32 — ELEMENT_VALUE (ao3_wtr_tag)

- **Source**: `ELEMENT_VALUE` — `options` L280:C52 -> L280:C71  `items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? »wtrTagEl.value.trim«() || 'AO3 Advanced Marker Want to Read' : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (ao3_wtr_tag) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (27 raw steps → 2 distinct lines):
   1. L280 `items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? »wtrTagEl.value.trim() || 'AO3 Advanced Marker Want to Read'« : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:conditional-consequent
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #33 — ELEMENT_VALUE (input[name="storageProvider"]:checked)

- **Source**: `ELEMENT_VALUE` — `options` L285:C47 -> L285:C63  `items[STORAGE_PROVIDER_KEY] = providerEl ? »providerEl.value« : 'jsonbin';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage_provider) — `options` L296:C4 -> L299:C6 (spans to L299)  `»storage.local.set(items, function () {«`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (9 raw steps → 2 distinct lines):
   1. L285 `items[STORAGE_PROVIDER_KEY] = providerEl ? »providerEl.value« : 'jsonbin';`  · ASSIGN:conditional-consequent
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty

---

## Flow #34 — ELEMENT_VALUE (From storage.local.set('jsonbin_api_key') in options)  ·  6× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L213:C19 -> L213:C63  `const apiKey = »document.getElementById('apiKey').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (14 raw steps → 5 distinct lines):
   1. L213 `const apiKey = »document.getElementById('apiKey').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L249 `[API_KEY_STORE]: »apiKey«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   4. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_api_key, sender: options, receiver: options]
   5. L399 `if (document.getElementById('apiKey')) »document.getElementById('apiKey').value = items[API_KEY_STORE]«;`  · ELEMENT:object.setProperty

---

## Flow #35 — ELEMENT_VALUE (From storage.local.set('jsonbin_bin_id') in options)  ·  6× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L214:C18 -> L214:C61  `const binId = »document.getElementById('binId').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (14 raw steps → 5 distinct lines):
   1. L214 `const binId = »document.getElementById('binId').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L250 `[BIN_ID_STORE]: »binId«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   4. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_bin_id, sender: options, receiver: options]
   5. L400 `if (document.getElementById('binId')) »document.getElementById('binId').value = items[BIN_ID_STORE]«;`  · ELEMENT:object.setProperty

---

## Flow #36 — ELEMENT_VALUE (From storage.local.set('jsonbin_review_bin_id') in options)  ·  6× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L215:C24 -> L215:C73  `const reviewBinId = »document.getElementById('reviewBinId').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (14 raw steps → 5 distinct lines):
   1. L215 `const reviewBinId = »document.getElementById('reviewBinId').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L251 `[REVIEW_BIN_ID_STORE]: »reviewBinId«,`  · ASSIGN:identifier
   3. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   4. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: jsonbin_review_bin_id, sender: options, receiver: options]
   5. L401 `if (document.getElementById('reviewBinId')) »document.getElementById('reviewBinId').value = items[REVIEW_BIN_ID_STORE]«;`  · ELEMENT:object.setProperty

---

## Flow #37 — ELEMENT_VALUE (From storage.local.set('ao3_stats_config') in options)  ·  24× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L243:C22 -> L243:C85  `wordsPerBook: »parseInt(document.getElementById('stats_words_per_book').value)« || 50000,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (40 raw steps → 10 distinct lines):
   1. L243 `wordsPerBook: »parseInt(document.getElementById('stats_words_per_book').value) || 50000«,`  · RETURN:parseInt, ASSIGN:logical-left
   2. L241 (→L246) `»    const statsConfig = {«`  · ELEMENT:object.setProperty
   3. L264 `[STATS_CONFIG_KEY]: »JSON.stringify(statsConfig)«,`  · RETURN:json.stringify
   4. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   5. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_stats_config, sender: options, receiver: options]
   6. L461 `statsConfig = »JSON.parse(items[STATS_CONFIG_KEY] || '{}')«;`  · ASSIGN:logical-left, RETURN:json.parse
   7. L464 `if (document.getElementById('enable_stats')) »document.getElementById('enable_stats').checked = statsConfig.enabled !== false«;`  · ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
   8. L465 `if (document.getElementById('stats_words_per_book')) »document.getElementById('stats_words_per_book').value = statsConfig.wordsPerBook || 50000«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
   9. L466 `if (document.getElementById('stats_yearly_goal')) »document.getElementById('stats_yearly_goal').value = statsConfig.yearlyGoal || 50«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  10. L467 `if (document.getElementById('statsBinId')) »document.getElementById('statsBinId').value = statsConfig.statsBinId || ''«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #38 — ELEMENT_VALUE (From storage.local.set('ao3_stats_config') in options)  ·  24× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L244:C20 -> L244:C80  `yearlyGoal: »parseInt(document.getElementById('stats_yearly_goal').value)« || 50,`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (40 raw steps → 10 distinct lines):
   1. L244 `yearlyGoal: »parseInt(document.getElementById('stats_yearly_goal').value) || 50«,`  · RETURN:parseInt, ASSIGN:logical-left
   2. L241 (→L246) `»    const statsConfig = {«`  · ELEMENT:object.setProperty
   3. L264 `[STATS_CONFIG_KEY]: »JSON.stringify(statsConfig)«,`  · RETURN:json.stringify
   4. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   5. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_stats_config, sender: options, receiver: options]
   6. L461 `statsConfig = »JSON.parse(items[STATS_CONFIG_KEY] || '{}')«;`  · ASSIGN:logical-left, RETURN:json.parse
   7. L464 `if (document.getElementById('enable_stats')) »document.getElementById('enable_stats').checked = statsConfig.enabled !== false«;`  · ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
   8. L465 `if (document.getElementById('stats_words_per_book')) »document.getElementById('stats_words_per_book').value = statsConfig.wordsPerBook || 50000«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
   9. L466 `if (document.getElementById('stats_yearly_goal')) »document.getElementById('stats_yearly_goal').value = statsConfig.yearlyGoal || 50«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  10. L467 `if (document.getElementById('statsBinId')) »document.getElementById('statsBinId').value = statsConfig.statsBinId || ''«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #39 — ELEMENT_VALUE (From storage.local.set('ao3_stats_config') in options)  ·  24× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L245:C20 -> L245:C68  `statsBinId: »document.getElementById('statsBinId').value.trim«()`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (40 raw steps → 10 distinct lines):
   1. L245 `statsBinId: »document.getElementById('statsBinId').value.trim()«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L241 (→L246) `»    const statsConfig = {«`  · ELEMENT:object.setProperty
   3. L264 `[STATS_CONFIG_KEY]: »JSON.stringify(statsConfig)«,`  · RETURN:json.stringify
   4. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   5. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_stats_config, sender: options, receiver: options]
   6. L461 `statsConfig = »JSON.parse(items[STATS_CONFIG_KEY] || '{}')«;`  · ASSIGN:logical-left, RETURN:json.parse
   7. L464 `if (document.getElementById('enable_stats')) »document.getElementById('enable_stats').checked = statsConfig.enabled !== false«;`  · ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty
   8. L465 `if (document.getElementById('stats_words_per_book')) »document.getElementById('stats_words_per_book').value = statsConfig.wordsPerBook || 50000«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
   9. L466 `if (document.getElementById('stats_yearly_goal')) »document.getElementById('stats_yearly_goal').value = statsConfig.yearlyGoal || 50«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty
  10. L467 `if (document.getElementById('statsBinId')) »document.getElementById('statsBinId').value = statsConfig.statsBinId || ''«;`  · ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty

---

## Flow #40 — ELEMENT_VALUE (From storage.local.set('ao3_pro_license') in options)  ·  4× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L792:C21 -> L792:C72  `const keyInput = »document.getElementById('proLicenseKey').value.trim«();`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (15 raw steps → 7 distinct lines):
   1. L792 `const keyInput = »document.getElementById('proLicenseKey').value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L796 `if (»!keyInput«) {`  · ASSIGN:identifier, ASSIGN:unary
   3. L811 `body: new URLSearchParams({ product_id: GUMROAD_PRODUCT_ID, license_key: »keyInput« })`  · ASSIGN:identifier
   4. L808 (→L812) `»        const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {«`  · ELEMENT:object.setProperty
   5. L817 `»await storage.local.set({ [PRO_LICENSE_KEY]: keyInput, [IS_PRO_USER_KEY]: true })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   6. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_pro_license, sender: options, receiver: options]
   7. L425 `const »proKeyEl = document.getElementById('proLicenseKey')«;`  · ELEMENT:object.setProperty

---

## Flow #41 — ELEMENT_VALUE (From storage.local.set('ao3_wtr_tag') in options)  ·  6× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L280:C52 -> L280:C71  `items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? »wtrTagEl.value.trim«() || 'AO3 Advanced Marker Want to Read' : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (31 raw steps → 5 distinct lines):
   1. L280 `items[WTR_TAG_KEY] = isProForSave ? (wtrTagEl ? »wtrTagEl.value.trim() || 'AO3 Advanced Marker Want to Read'« : 'AO3 Advanced Marker Want to Read') : 'AO3 Advanced Marker Want to Read';`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:conditional-consequent
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   3. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: ao3_wtr_tag, sender: options, receiver: options]
   4. L437 `if (wtrTagEl) wtrTagEl.value = »items[WTR_TAG_KEY] || 'Want to Read'«;`  · ASSIGN:logical-left
   5. L433 `const »wtrTagEl = document.getElementById('ao3_wtr_tag')«;`  · ELEMENT:object.setProperty

---

## Flow #42 — ELEMENT_VALUE (From storage.local.set('storage_provider') in options)  ·  6× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L285:C47 -> L285:C63  `items[STORAGE_PROVIDER_KEY] = providerEl ? »providerEl.value« : 'jsonbin';`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `options` L1885:C49 -> L1885:C96  `await new Promise(resolve => »storage.local.set({ [workKey]: data }, resolve)«);`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (14 raw steps → 6 distinct lines):
   1. L285 `items[STORAGE_PROVIDER_KEY] = providerEl ? »providerEl.value« : 'jsonbin';`  · ASSIGN:conditional-consequent
   2. L248 (→L268) `»    const items = {«`  · ELEMENT:object.setProperty
   3. L369 (→L491) `»    storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: storage_provider, sender: options, receiver: options]
   4. L470 `const provider = »items[STORAGE_PROVIDER_KEY] || 'jsonbin'«;`  · ASSIGN:logical-left
   5. L473 `applyProviderVisibility(»provider«);`  · ASSIGN:identifier
   6. L567 `const isJsonbin = »provider« === 'jsonbin';`  · ASSIGN:identifier, ASSIGN:binary-left

---

## Flow #43 — ELEMENT_VALUE (From storage.local.set('google_refresh_token') in options)  ·  3× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `options` L668:C29 -> L668:C56  `const tokenStr = »importTokenInput.value.trim«();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `options` L252:C22 -> L255:C18 (spans to L255)  `[AUTO_BACKUP_S»TORE]: autoBackup,«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (28 raw steps → 13 distinct lines):
   1. L668 `const tokenStr = »importTokenInput.value.trim()«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L669 `if (»!tokenStr«) return showToast('Please paste a token string first.');`  · ASSIGN:identifier, ASSIGN:unary
   3. L674 `await window.googleAuth.importToken(»tokenStr«);`  · ASSIGN:identifier
   4. L320 `{ pickerId: 'color-d»o-not-read', hexId: 'hex-c«olor-do-not-read' },`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, RETURN:atob
   5. L321 `{ pickerId: 'color-w»tr', hexId: 'hex-co«lor-wtr' }`  · ASSIGN:identifier, RETURN:json.parse
   6. L323 _(in `auth`)_ `if (»!payload.r«) throw new Error('Invalid token string: Missing refresh token.');`  · ELEMENT:member-element, ASSIGN:unary
   7. L326 _(in `auth`)_ `[GOOGLE_REFRESH_KEY]: »payload.r«`  · ELEMENT:member-element
   8. L325 (→L327) `»«`  · ELEMENT:object.setProperty
   9. L328 _(in `auth`)_ `if (»payload.e) toSave[GOOGLE_EMAIL_KEY] = payload.e«;`  · ELEMENT:member-element
  10. L244 `year»lyGoal: parseInt(document.getElementById('stats_yearly_goal')«.value) || 50,`  · STORAGE:STORAGE_FLOW[area: local, key: google_refresh_token, sender: options, receiver: options]
  11. L248 _(in `auth`)_ `const tokenToRevoke = »items[GOOGLE_REFRESH_KEY] || items[GOOGLE_TOKEN_KEY]«;`  · ASSIGN:logical-left
  12. L250 `[BIN»_ID_STORE]: b«inId,`  · ASSIGN:identifier
  13. L252 _(in `auth`)_ `await fetch(»`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(tokenToRevoke)}`«, {`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal

---
