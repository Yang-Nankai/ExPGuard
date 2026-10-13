# Source-level Taint Flow — ookgnahfklmejhicejjbfjifppjbfnlk 5.3.3

- Source type: CRX
- Files with issues: 5 / 8
- Distinct taint flows: 11  (collapsed from 125 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L162:C6 -> L162:C13  `if (»!e.data« || !e.data.__adsmeta) return;`
- **Sink(s)**:
  - `WEB_SESSION_STORAGE_SET_VALUE` — `content` L168:C10 -> L168:C60  `try { »sessionStorage.setItem('_adsmeta_fb_token', token)«; sessionStorage.setItem('_adsmeta_fb_token_time', String(Date.now())) } catch {}`
  - `CHROME_SESSION_STORAGE` (fb_token) — `content` L154:C14 -> L154:C46  `const p = »chrome.storage.session.set(data)«`
  - `CHROME_SESSION_STORAGE` (fb_fbdt) — `content` L154:C14 -> L154:C46  `const p = »chrome.storage.session.set(data)«`
  - `CHROME_LOCAL_STORAGE` (fb_token) — `content` L171:C10 -> L171:C82  `try { »chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now() })« } catch {}`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (33 raw steps → 9 distinct lines):
   1. L162 `if (»!e.data || !e.data.__adsmeta«) return;`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L163 `const { »token, fbdt« } = e.data;`  · ELEMENT:destructure-property[token], ELEMENT:destructure-property[fbdt]
   3. L164 `if (»token && token.startsWith('EAA')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   4. L165 `_cachedToken = »token«;`  · ASSIGN:identifier
   5. L166 `if (»fbdt) _cachedFbdt = fbdt«;`  · ASSIGN:identifier
   6. L168 `try { sessionStorage.setItem('_adsmeta_fb_token', »token«); sessionStorage.setItem('_adsmeta_fb_token_time', String(Date.now())) } catch {}`  · ASSIGN:identifier
   7. L169 `»safeSessionSet({ fb_token: token, fb_token_time: Date.now(), ...(fbdt ? { fb_fbdt: fbdt } : {}) })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, COPY:object-spread
   8. L171 `try { »chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now() })« } catch {}`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L37 `if (»_cachedToken) return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };«`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `sidebar` L197:C14 -> L197:C33  `const m = »location.href.match«(/act[=_](\d+)/)`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `sidebar` L318:C11 -> L321:C6 (spans to L321)  `return »fetch(url, {«`  (url-control=FULL)
  - `FETCH_BODY` (location.origin/api/graphql) — `sidebar` L272:C24 -> L274:C8 (spans to L274)  `const res = await »fetch(`${window.location.origin}/api/graphql`, {«`
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (4595 raw steps → 44 distinct lines):
   1. L197 `const m = »location.href.match(/act[=_](\d+)/)«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L198 `return m ? »m[1]« : null`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
   3. L2193 `const »actId = actFromUrl()«`  · ELEMENT:implicit.add
   4. L2194 `if (»!actId«) {`  · ASSIGN:identifier, ASSIGN:unary
   5. L2201 `if (»!force && S.actId === actId && S.info«) { renderBody(); return }`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left
   6. L2203 `if (»S.actId !== actId || force«) { S.newLimit = null; S.spendMax = null; S.bmAcct = null }  // đổi TK HOẶC bấm 🔄 làm mới → bỏ cache Limit/Chi-tiêu-max/BM để tải lại HẾT`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-left
   7. L2204 `S.actId = »actId«`  · ASSIGN:identifier
   8. L147 (→L178) `»  let S = {«`  · ELEMENT:object.setProperty
   9. L2205 `actidEl.textContent = »actId«`  · ASSIGN:identifier
  10. L1024 `const »actidEl = document.getElementById('__amsb-actid')«`  · ELEMENT:object.setProperty
  11. L2240 `directFetch(»`${GRAPH}/act_${actId}?fields=${encodeURIComponent(fields)}&access_token=${token}`«),`  · ASSIGN:identifier, ASSIGN:template-literal
  12. L318 `return fetch(»url«, {`  · ASSIGN:identifier
  13. L2247 `fetchNewLimit(»actId«)`  · ASSIGN:identifier
  14. L262 `if (»S.newLimit && S.newLimit.actId === actId && S.newLimit.done«) return`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:binary-left, ELEMENT:member-element-container
  15. L264 `const retry = () => { if (attempt < 3) setTimeout(() => { if (»S.actId === actId) fetchNewLimit(actId«, attempt + 1) }, 1200 * (attempt + 1)); else finalize(null) }`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right
  16. L263 `const finalize = raw => { »S.newLimit = { actId, raw, done: true }; if (S.open && S.info && S.actId === actId«) renderBody() }`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right
  17. L271 `fd.append('variables', »`{"assetID":${actId}}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  18. L268 `const »fd = new FormData()«`  · ELEMENT:object.setProperty
  19. L272 (→L274) `»      const res = await fetch(`${window.location.origin}/api/graphql`, {«`  · ELEMENT:object.setProperty
  20. L2249 `fetchSpendMax(»actId«, token)`  · ASSIGN:identifier
  21. L289 `if (»S.spendMax && S.spendMax.actId === actId«) return  // cache theo account`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container
  22. L292 `const r = await directFetch(»`${GRAPH}/act_${actId}/insights?date_preset=maximum&fields=spend&access_token=${token}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  23. L294 `»S.spendMax = { actId, raw: spend == null ? null : Number(spend) }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  24. L295 `if (»S.open && S.info && S.actId === actId«) renderBody()`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right
  25. L2264 `if (info.owner_business?.id) fetchBmAcctCount(»actId«, info.owner_business.id, token)`  · ASSIGN:identifier
  26. L304 `if (»S.bmAcct && S.bmAcct.actId === actId«) return  // cache theo account`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container
  27. L309 `»S.bmAcct = { actId, raw: total == null ? null : Number(total) }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  28. L310 `if (»S.open && S.info && S.actId === actId«) renderBody()`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right
  29. L2266 `acnEl.textContent = »info.name || ('act_' + actId)«`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right
  30. L1023 `const »acnEl   = document.getElementById('__amsb-acname')«`  · ELEMENT:object.setProperty
  31. L1931 `if (»!S.newLimit || S.newLimit.actId !== S.actId«) limitHtml = '<span class="__amsb-ispin"></span>'`  · ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right, ELEMENT:member-element-container
  32. L1932 `else if (»S.newLimit.raw« == null) limitHtml = '—'`  · ELEMENT:member-element-container, ASSIGN:binary-left
  33. L1937 `if (»!S.spendMax || S.spendMax.actId !== S.actId«) spentHtml = '<span class="__amsb-ispin"></span>'`  · ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right, ELEMENT:member-element-container
  34. L1938 `else if (»S.spendMax.raw« == null) spentHtml = '—'`  · ELEMENT:member-element-container, ASSIGN:binary-left
  35. L1967 `else if (»!S.bmAcct || S.bmAcct.actId !== S.actId«) bmHtml = '<span class="__amsb-ispin"></span>'`  · ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right, ELEMENT:member-element-container
  36. L1968 `else if (»S.bmAcct.raw« == null) bmHtml = escH(info.owner_business.name || '—')  // lấy count lỗi → hiện tên BM`  · ELEMENT:member-element-container, ASSIGN:binary-left
  37. L2013 `${isBillingPage ? row(ic.person, 'ID', »info.id || S.actId || '—'«) : ''}`  · ASSIGN:logical-right, ASSIGN:logical-left
  38. L2054 `if (»S._prevCur !== cur || S._prevAct !== S.actId«) { S._prevVals = {}; S._prevCur = cur; S._prevAct = S.actId }`  · ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:binary-left
  39. L1449 `function curName() { return (S.info && S.info.name) ? S.info.name : (»acnEl.textContent || ''«) }`  · ASSIGN:logical-left
  40. L1441 `const »renameInput = document.getElementById('__amsb-rename-input')«`  · ELEMENT:object.setProperty
  41. L1458 `if (»!trimmedName || trimmedName === curName()«) { closeRename(); return }`  · ASSIGN:binary-right, ASSIGN:logical-right
  42. L1461 `if (»!S.actId«) { showRenameMsg('Chưa nhận diện TKQC — mở Ads Manager rồi thử lại.', false); return }`  · ASSIGN:unary
  43. L1616 `navigator.clipboard.writeText(»actidEl.textContent || ''«).catch(() => {})`  · ASSIGN:logical-left
  44. L2409 `if (»location.href !== _url«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right

---

## Flow #3 — DOCUMENT_LOCATION (location.origin)

- **Source**: `DOCUMENT_LOCATION` — `sidebar` L272:C30 -> L272:C69  `const res = await fetch(»`${window.location.origin}/api/graphql`«, {`
- **Sink(s)**:
  - `FETCH_RESOURCE` (location.origin/api/graphql) — `sidebar` L272:C24 -> L274:C8 (spans to L274)  `const res = await »fetch(`${window.location.origin}/api/graphql`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (30 raw steps → 1 distinct lines):
   1. L272 `const res = await fetch(»`${window.location.origin}/api/graphql`«, {`  · ASSIGN:template-literal

---

## Flow #4 — ELEMENT_VALUE (__amsb-uid-input)

- **Source**: `ELEMENT_VALUE` — `sidebar` L413:C20 -> L413:C35  `const lines = »inp.value.split«('\n').map(s => s.trim()).filter(Boolean)`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `sidebar` L318:C11 -> L321:C6 (spans to L321)  `return »fetch(url, {«`  (url-control=FULL)
  - `DOM_INNER_HTML` (innerHTML) — `sidebar` L450:C8 -> L450:C17  `out.»innerHTML« = ``
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (2089 raw steps → 29 distinct lines):
   1. L413 `const lines = »inp.value.split('\n').map(s => s.trim()).filter(Boolean)«`  · ELEMENT:member-element, RETURN:fallback-return
   2. L414 `if (»!lines.length«) return`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:unary
   3. L423 `const results = await lookupUids(»lines«, token)`  · ASSIGN:identifier
   4. L359 `for (»const raw of inputs«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
   5. L360 `const inp = »raw.trim()«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   6. L361 `if (»!inp«) continue`  · ASSIGN:identifier, ASSIGN:unary
   7. L362 `const profMatch = »inp.match(/profile\.php[?&]id=(\d+)/)«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   8. L363 `if (»profMatch«) {`  · ASSIGN:identifier
   9. L365 `const d = await directFetch(»`${GAPI}/${profMatch[1]}?fields=id,name&access_token=${token}`«)`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:template-literal
  10. L318 `return fetch(»url«, {`  · ASSIGN:identifier
  11. L370 `const isGroup = /facebook\.com\/groups\//i.test(»inp«)`  · ASSIGN:identifier
  12. L366 `»results.push({ input: inp, uid: d.id || profMatch[1], name: d.name || '', type: 'Profile' })«`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:member-element, ASSIGN:logical-right
  13. L358 `const »results = []«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  14. L371 `let slug = »inp.replace(/https?:\/\/[^/]*facebook\.com\//i, '').replace(/\/$/, '').split(/[?&#]/)[0]«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  15. L372 `slug = »slug.replace(/^(?:groups|pages)\/[^/]+\//, '').replace(/^(?:groups|pages)\//, '')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L373 `if (»!slug || slug === 'home' || slug === 'feed') { results.push({ input: inp, uid: '—', name: 'URL không hợp lệ', type: '—', error: true })«; continue }`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty
  17. L375 `const d = await directFetch(»`${GAPI}/${encodeURIComponent(slug)}?fields=id,name,fan_count,category&access_token=${token}`«)`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:template-literal
  18. L380 `»results.push({ input: inp, uid: '—', name: 'Không tìm thấy', type: '—', error: true })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  19. L378 `»results.push({ input: inp, uid: d.id, name: d.name || '', type })«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  20. L147 (→L178) `»  let S = {«`  · ELEMENT:object.setProperty
  21. L431 `if (»!results.length«) return`  · ELEMENT:member.length, ASSIGN:unary
  22. L432 `const allUids = »results.filter(r => !r.error).map(r => r.uid).join('\n')«`  · RETURN:array.join
  23. L433 (→L448) `»    const rows = results.map(r => `«`  · RETURN:array.join
  24. L452 `<span style="font-size:10px;color:${dark?'#9ca3af':'#6b7280'}">${»results.length«} kết quả</span>`  · ELEMENT:member.length
  25. L455 `${»rows«}`  · ASSIGN:identifier
  26. L450 (→L456) `»    out.innerHTML = `«`  · ASSIGN:template-literal
  27. L408 `const »out = document.getElementById('__amsb-uid-out')«`  · ELEMENT:object.setProperty
  28. L464 `navigator.clipboard.writeText(»allUids«).catch(() => {})`  · ASSIGN:identifier
  29. L410 `if (»S.uidResults?.length«) renderUidResults(S.uidResults, out, dark)`  · ELEMENT:member.length

---

## Flow #5 — ELEMENT_VALUE (__amsb-rating-comment)

- **Source**: `ELEMENT_VALUE` — `sidebar` L1785:C24 -> L1785:C85  `const comment = »document.getElementById('__amsb-rating-comment')?.value?.trim«() || ''`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `sidebar` L1640:C11 -> L1640:C20  `bodyEl.»innerHTML« = ``
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (74 raw steps → 8 distinct lines):
   1. L1785 `const comment = »document.getElementById('__amsb-rating-comment')?.value?.trim() || ''«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left
   2. L1788 (→L1823) `chrome.runtime.sendMessage({ type: 'SMETA_SUBMIT_RATING', stars: S.ratingStars, »comment }, r => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L1793 `»S.ratingExisting = { stars: S.ratingStars, comment, rewarded: true }«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   4. L147 (→L178) `»  let S = {«`  · ELEMENT:object.setProperty
   5. L1671 `>${»existing?.comment || ''«}</textarea>`  · ASSIGN:logical-left
   6. L1666 (→L1677) `»        ${stars > 0 && stars < 4 ? `«`  · ASSIGN:template-literal, ASSIGN:conditional-consequent
   7. L1640 (→L1723) `»    bodyEl.innerHTML = `«`  · ASSIGN:template-literal
   8. L1021 `const »bodyEl  = document.getElementById('__amsb-body')«`  · ELEMENT:object.setProperty

---

## Flow #6 — WINDOW_MESSAGE_EVENT (From storage.local.set('fb_token') in content)  ·  30× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `sidebar` L162:C6 -> L162:C13  `cu»rrOpen:« false,`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `sidebar` L318:C11 -> L321:C6 (spans to L321)  `return »fetch(url, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (808 raw steps → 26 distinct lines):
   1. L162 _(in `overlay`)_ `co»nst nativeMajor = toMajor(na«tiveV, nativeCur, useRound);`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L163 `usdRat»es: null, u«sdRatesTime: 0,`  · ELEMENT:destructure-property[token], ELEMENT:destructure-property[fbdt]
   3. L164 `bi»ll: null,  // tỷ giá BÁN + %biên« (báo khách) — bridge amsbridge.js đẩy vào chrome.storage`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   4. L165 `newLimit: null,»  // «{ actId, raw } — "Limit" (formatted_dsl) fetched via billing GraphQL`  · ASSIGN:identifier
   5. L166 _(in `overlay`)_ `if (»noBill && dispCur === 'B«ILL') return html;  // Ngưỡng: chế độ VND* hiện NATIVE, không cộng biên (giống "Ngưỡng còn lại")`  · ASSIGN:identifier
   6. L168 `visRows: (() => { const DEF = { name:false, nextBi»ll:fa«lse }; try { const v = JSON.parse(localStorage.getItem('_amsb_vis') || 'null'); return v || DEF } catch { return { name:false, nextBill:false } } })()`  · ASSIGN:identifier
   7. L169 _(in `content`)_ `»safeSessionSet({ fb_token: token, fb_token_time: Date.now(), ...(fbdt ? { fb_fbdt: fbdt } : {}) })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, COPY:object-spread
   8. L171 _(in `content`)_ `try { »chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now() })« } catch {}`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L37 _(in `content`)_ `if (»_cachedToken) return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L218 (→L236) `»      chrome.storage.local.get(['fb_token','fb_token_time'], items => {«`  · STORAGE:STORAGE_FLOW[area: local, key: fb_token, sender: content, receiver: sidebar]
  11. L221 `if (»items.fb_token && items.fb_token_time && Date.now() - items.fb_token_time < 43200000«)`  · ASSIGN:logical-left
  12. L2220 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
  13. L2240 `directFetch(»`${GRAPH}/act_${actId}?fields=${encodeURIComponent(fields)}&access_token=${token}`«),`  · ASSIGN:identifier, ASSIGN:template-literal
  14. L318 `return fetch(»url«, {`  · ASSIGN:identifier
  15. L2242 `if (!S.myId)          promises.push(directFetch(»`${GRAPH}/me?fields=id&access_token=${token}`«))`  · ASSIGN:identifier, ASSIGN:template-literal
  16. L2249 `fetchSpendMax(actId, »token«)`  · ASSIGN:identifier
  17. L292 `const r = await directFetch(»`${GRAPH}/act_${actId}/insights?date_preset=maximum&fields=spend&access_token=${token}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  18. L2264 `if (info.owner_business?.id) fetchBmAcctCount(actId, info.owner_business.id, »token«)`  · ASSIGN:identifier
  19. L307 `const r = await directFetch(»`${GRAPH}/${ownerBizId}/owned_ad_accounts?fields=id&limit=1&summary=true&access_token=${token}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  20. L1460 `if (»!token«)   { showRenameMsg('Không lấy được token FB — hãy đăng nhập Facebook.', false); return }`  · ASSIGN:identifier, ASSIGN:unary
  21. L1469 `const body = 'name=' + encodeURIComponent(trimmedName) + '&access_token=' + »encodeURIComponent(token)«`  · ASSIGN:identifier, RETURN:encodeURIComponent, ASSIGN:binary-right
  22. L1475 (→L1478) `chrome.runtime.sendMessage({ type: 'FB_FETCH', method: 'POST', url: `https://graph.facebook.com/v21.0/act_${bare}`, »body }, (r) => {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  23. L419 `if (»!token«) {`  · ASSIGN:identifier, ASSIGN:unary
  24. L423 `const results = await lookupUids(lines, »token«)`  · ASSIGN:identifier
  25. L365 `const d = await directFetch(»`${GAPI}/${profMatch[1]}?fields=id,name&access_token=${token}`«)`  · ASSIGN:identifier, ASSIGN:template-literal
  26. L375 `const d = await directFetch(»`${GAPI}/${encodeURIComponent(slug)}?fields=id,name,fan_count,category&access_token=${token}`«)`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #7 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L413:C6 -> L413:C13  `if (»request«?.type === 'PING') {`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (smeta_jwt) — `background` L7:C39 -> L7:C94  `set: (jwt) => new Promise(resolve => »chrome.storage.session.set({ smeta_jwt: jwt }, resolve)«),`
  - `FETCH_HEADERS` (https://adsmeta.io/api/auth/me) — `background` L58:C20 -> L65:C6 (spans to L65)  `const r = await »fetch(`${SMETA_API}${path}`, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L515:C24 -> L515:C88  `const r = await »fetch(url, { method: 'POST', credentials: 'include', body: fd })«;`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `background` L515:C24 -> L515:C88  `const r = await »fetch(url, { method: 'POST', credentials: 'include', body: fd })«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L446:C30 -> L446:C124  `const r = await »fetch(u, { method: m, credentials: 'include', headers: h, body: m !== 'GET' ? b : undefined })«;`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L446:C30 -> L446:C124  `const r = await »fetch(u, { method: m, credentials: 'include', headers: h, body: m !== 'GET' ? b : undefined })«;`
  - `FETCH_BODY` ([Unknown URL]) — `background` L446:C30 -> L446:C124  `const r = await »fetch(u, { method: m, credentials: 'include', headers: h, body: m !== 'GET' ? b : undefined })«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L587:C6 -> L587:C30  `»fetch(request.url, opts)«`  (url-control=FULL)
  - `FETCH_HEADERS` ([Unknown URL]) — `background` L587:C6 -> L587:C30  `»fetch(request.url, opts)«`
  - `FETCH_BODY` ([Unknown URL]) — `background` L587:C6 -> L587:C30  `»fetch(request.url, opts)«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1066 raw steps → 56 distinct lines):
   1. L413 `if (»request?.type« === 'PING') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L419 `if (»request?.type« === 'GET_EXT_CONFIG') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L432 `if (»request?.type« === 'GQL_IN_TAB') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L433 `const { »url, method = 'POST', body, headers } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[url], ELEMENT:destructure-property[method], ELEMENT:destructure-property[body], ELEMENT:destructure-property[headers]
   5. L462 `if (»request?.type« === 'GET_FB_TOKEN') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L484 `if (»request?.type« === 'CLEAR_FB_TOKEN') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L495 `if (»request?.type === 'FB_FETCH') return handleFbFetch(request«, sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L381 `const { »url, method = 'GET', body, headers: extraHeaders, credentials: credOverride } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[url], ELEMENT:destructure-property[method], ELEMENT:destructure-property[body], ELEMENT:destructure-property[headers], ELEMENT:destructure-property[credentials]
   9. L382 `if (»!url«) { sendResponse(JSON.stringify({ error: 'no_url' })); return true; }`  · ASSIGN:identifier, ASSIGN:unary
  10. L385 `const »h = new URL(url).hostname«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element
  11. L390 `const »opts = { method, credentials: credOverride || 'include' }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left
  12. L391 `if (»body && method !== 'GET'«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  13. L395 `if (»extraHeaders && typeof extraHeaders === 'object') { opts.headers = { ...(opts.headers || {}), ...extraHeaders« }; }`  · ASSIGN:identifier, ASSIGN:logical-left, COPY:object-spread
  14. L392 `if (typeof body === 'string') { opts.body = »body«; opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }; }`  · ASSIGN:identifier
  15. L393 `else { opts.body = »JSON.stringify(body)«; }`  · ASSIGN:identifier, RETURN:json.stringify
  16. L498 `if (»request?.type« === 'FB_UPLOAD_PHOTO') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L499 `const { »url, fields, file } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[url], ELEMENT:destructure-property[fields], ELEMENT:destructure-property[file]
  18. L525 `if (»request?.type« === 'SMETA_JWT') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L500 `if (»!url || !file?.base64«) { sendResponse(JSON.stringify({ error: 'bad_upload_args' })); return true; }`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  20. L526 `const jwt = »request.jwt«;`  · ASSIGN:identifier, ELEMENT:member-element
  21. L548 `if (»request?.type« === 'SMETA_LOGOUT') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L527 `if (»jwt && typeof jwt === 'string' && jwt.length < 2048«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  23. L560 `if (»request?.url«) {`  · ASSIGN:identifier, ELEMENT:member-element
  24. L502 `try { »h = new URL(url).hostname«; } catch {}`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element
  25. L528 `jwtStore.set(»jwt«).then(async () => {`  · ASSIGN:identifier
  26. L7 `set: (jwt) => new Promise(resolve => chrome.storage.session.set({ smeta_jwt: »jwt« }, resolve)),`  · ASSIGN:identifier
  27. L533 `const me = await smetaFetch('/auth/me', »jwt«);`  · ASSIGN:identifier
  28. L61 `'Authorization': »`Bearer ${jwt}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  29. L58 (→L65) `»    const r = await fetch(`${SMETA_API}${path}`, {«`  · ELEMENT:object.setProperty
  30. L569 `const »{ hostname } = new URL(request.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:destructure-property[hostname]
  31. L503 `if (»h« !== 'upload.facebook.com') { sendResponse(JSON.stringify({ error: 'url_not_allowed' })); return true; }`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L508 `const bin = »atob(file.base64)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:atob
  33. L509 `const »bytes = new Uint8Array(bin.length)«;`  · ASSIGN:identifier, ELEMENT:member.length, INITIAL:Uint8Array.constructor, ELEMENT:object.setProperty
  34. L510 `for (let i = 0; i < »bin.length; i++) bytes[i] = bin.charCodeAt(i)«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return
  35. L511 `const »blob = new Blob([bytes], { type: file.mime || 'image/jpeg' })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  36. L513 `for (»const k in (fields || {})) fd.append(k, fields[k]«);`  · ASSIGN:identifier, ASSIGN:logical-left, ITERATE:loop.iteration, ELEMENT:member-element
  37. L512 `const »fd = new FormData()«;`  · ELEMENT:object.setProperty
  38. L514 `fd.append('farr', blob, »file.name || 'photo.jpg'«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  39. L515 `const »r = await fetch(url, { method: 'POST', credentials: 'include', body: fd })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  40. L577 `const opts = buildFetchOptions(»request«);`  · ASSIGN:identifier
  41. L34 `const { »method = 'GET', header = {}, body, form } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[method], ELEMENT:destructure-property[header], ELEMENT:destructure-property[body], ELEMENT:destructure-property[form]
  42. L35 `const isForm = »!!form«;`  · ASSIGN:identifier, ASSIGN:unary
  43. L36 `const isFbOrSmeta = /facebook\.com|fbcdn\.net|adsmeta\.io/.test(»request.url || ''«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L38 `»method«,`  · ASSIGN:identifier
  45. L37 (→L44) `»  const opts = {«`  · ELEMENT:object.setProperty
  46. L42 `»...header«,`  · ASSIGN:identifier, COPY:object-spread
  47. L45 `if (»method« !== 'GET') {`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L46 `if (»isForm) opts.body = form«;`  · ASSIGN:identifier
  49. L47 `else if (»body) opts.body = typeof body === 'string' ? body : JSON.stringify(body)«;`  · ASSIGN:identifier, RETURN:json.stringify, ASSIGN:conditional-consequent
  50. L580 `const »{ hostname } = new URL(request.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:destructure-property[hostname]
  51. L581 `if (»hostname === 'graph.facebook.com' || hostname.endsWith('.graph.facebook.com')«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  52. L443 `args: [»url, method, body || '', headers || {}«],`  · ASSIGN:identifier, ASSIGN:logical-left
  53. L440 (→L450) `»        const inj = await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  54. L446 `const »r = await fetch(u, { method: m, credentials: 'include', headers: h, body: m !== 'GET' ? b : undefined })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:conditional-consequent
  55. L570 `urlHostOk = EXTERNAL_ALLOWED.some(h => »hostname === h || hostname.endsWith('.' + h)«);`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  56. L587 `fetch(»request.url«, opts)`  · ASSIGN:identifier, ELEMENT:member-element

---

## Flow #8 — ELEMENT_VALUE (__amsb-rename-input)

- **Source**: `ELEMENT_VALUE` — `background` L599:C0 -> L791:C2 (spans to L791)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background` L398:C4 -> L398:C20  `»fetch(url, opts)«.then(r => r.text()).then(text => sendResponse(text)).catch(err => sendResponse(JSON.stringify({ error: err.message })));`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1602 raw steps → 5 distinct lines):
   1. L599 (→L791) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[sidebar->background]`
   2. L391 `if (»body && method !== 'GET'«) {`  · ASSIGN:identifier, ASSIGN:logical-left
   3. L392 `if (typeof body === 'string') { opts.body = »body«; opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }; }`  · ASSIGN:identifier
   4. L390 `const »opts = { method, credentials: credOverride || 'include' }«;`  · ELEMENT:object.setProperty
   5. L393 `else { opts.body = »JSON.stringify(body)«; }`  · ASSIGN:identifier, RETURN:json.stringify

---

## Flow #9 — ELEMENT_VALUE (__amsb-rating-comment)

- **Source**: `ELEMENT_VALUE` — `background` L599:C0 -> L791:C2 (spans to L791)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_BODY` (https://adsmeta.io/api/rating) — `background` L58:C20 -> L65:C6 (spans to L65)  `const r = await »fetch(`${SMETA_API}${path}`, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (156 raw steps → 5 distinct lines):
   1. L599 (→L791) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[sidebar->background]`
   2. L765 `body: »JSON.stringify({ stars: request.stars, comment: request.comment || '', source: 'extension' })«,`  · ASSIGN:logical-left, RETURN:json.stringify
   3. L763 (→L766) `»        const data = await smetaFetch('/rating', smeta_jwt, {«`  · ELEMENT:object.setProperty
   4. L58 (→L65) `»    const r = await fetch(`${SMETA_API}${path}`, {«`  · ELEMENT:object.setProperty
   5. L59 `»...opts«,`  · COPY:object-spread

---

## Flow #10 — WINDOW_MESSAGE_EVENT (From storage.local.set('fb_token') in content)  ·  3× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L162:C6 -> L162:C13  `for »(const «n of newNotifs.slice(0, 3)) {`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `background` L471:C8 -> L471:C101  `»sendResponse({ token: items.fb_token, fbdt: items.fb_fbdt || '', time: items.fb_token_time })«;`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (43 raw steps → 12 distinct lines):
   1. L162 `for »(const n of newNotifs.slice(«0, 3)) {`  · ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
   2. L163 _(in `sidebar`)_ `usdRat»es: null, u«sdRatesTime: 0,`  · ELEMENT:destructure-property[token], ELEMENT:destructure-property[fbdt]
   3. L164 `»await chrome.notifications.creat«e(`smeta-${n.id}`, {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   4. L165 _(in `sidebar`)_ `newLimit: null,»  // «{ actId, raw } — "Limit" (formatted_dsl) fetched via billing GraphQL`  · ASSIGN:identifier
   5. L166 `»iconUrl: 'icons/icon48.p«ng',`  · ASSIGN:identifier
   6. L168 _(in `sidebar`)_ `visRows: (() => { const DEF = { name:false, nextBi»ll:fa«lse }; try { const v = JSON.parse(localStorage.getItem('_amsb_vis') || 'null'); return v || DEF } catch { return { name:false, nextBill:false } } })()`  · ASSIGN:identifier
   7. L169 _(in `content`)_ `»safeSessionSet({ fb_token: token, fb_token_time: Date.now(), ...(fbdt ? { fb_fbdt: fbdt } : {}) })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, COPY:object-spread
   8. L171 _(in `content`)_ `try { »chrome.storage.local.set({ fb_token: token, fb_token_time: Date.now() })« } catch {}`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L37 _(in `content`)_ `if (»_cachedToken) return { token: _cachedToken, fbdt: _cachedFbdt, eaag: _cachedEaag };«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L464 (→L480) `»    chrome.storage.local.get(['fb_token', 'fb_token_time', 'fb_fbdt', 'fb_cuser'], async (items) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: fb_token, sender: content, receiver: background]
  11. L470 `if (»items.fb_token && age < TOKEN_MAX_AGE && !switched«) {`  · ASSIGN:logical-left
  12. L471 `»sendResponse({ token: items.fb_token, fbdt: items.fb_fbdt || '', time: items.fb_token_time })«;`  · ELEMENT:object.setProperty

---

## Flow #11 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.session.set('smeta_jwt') in background)  ·  84× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L413:C6 -> L413:C13  `if (»request«?.type === 'PING') {`
- **Sink(s)**:
  - `FETCH_HEADERS` (https://adsmeta.io/api/ext/fetch-command) — `background` L58:C20 -> L65:C6 (spans to L65)  `const r = await »fetch(`${SMETA_API}${path}`, {«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1474 raw steps → 72 distinct lines):
   1. L413 `if (»request?.type« === 'PING') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L419 `if (»request?.type« === 'GET_EXT_CONFIG') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L432 `if (»request?.type« === 'GQL_IN_TAB') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L433 `const { »url, method = 'POST', body, headers } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[url], ELEMENT:destructure-property[method], ELEMENT:destructure-property[body], ELEMENT:destructure-property[headers]
   5. L462 `if (»request?.type« === 'GET_FB_TOKEN') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L484 `if (»request?.type« === 'CLEAR_FB_TOKEN') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   7. L495 `if (»request?.type === 'FB_FETCH') return handleFbFetch(request«, sendResponse);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   8. L381 `const { »url, method = 'GET', body, headers: extraHeaders, credentials: credOverride } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[url], ELEMENT:destructure-property[method], ELEMENT:destructure-property[body], ELEMENT:destructure-property[headers], ELEMENT:destructure-property[credentials]
   9. L382 `if (»!url«) { sendResponse(JSON.stringify({ error: 'no_url' })); return true; }`  · ASSIGN:identifier, ASSIGN:unary
  10. L385 `const »h = new URL(url).hostname«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element
  11. L390 `const »opts = { method, credentials: credOverride || 'include' }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:logical-left
  12. L391 `if (»body && method !== 'GET'«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  13. L395 `if (»extraHeaders && typeof extraHeaders === 'object') { opts.headers = { ...(opts.headers || {}), ...extraHeaders« }; }`  · ASSIGN:identifier, ASSIGN:logical-left, COPY:object-spread
  14. L392 `if (typeof body === 'string') { opts.body = »body«; opts.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }; }`  · ASSIGN:identifier
  15. L393 `else { opts.body = »JSON.stringify(body)«; }`  · ASSIGN:identifier, RETURN:json.stringify
  16. L498 `if (»request?.type« === 'FB_UPLOAD_PHOTO') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  17. L499 `const { »url, fields, file } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[url], ELEMENT:destructure-property[fields], ELEMENT:destructure-property[file]
  18. L525 `if (»request?.type« === 'SMETA_JWT') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  19. L500 `if (»!url || !file?.base64«) { sendResponse(JSON.stringify({ error: 'bad_upload_args' })); return true; }`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right
  20. L526 `const jwt = »request.jwt«;`  · ASSIGN:identifier, ELEMENT:member-element
  21. L548 `if (»request?.type« === 'SMETA_LOGOUT') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  22. L527 `if (»jwt && typeof jwt === 'string' && jwt.length < 2048«) {`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right
  23. L560 `if (»request?.url«) {`  · ASSIGN:identifier, ELEMENT:member-element
  24. L502 `try { »h = new URL(url).hostname«; } catch {}`  · ASSIGN:identifier, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element
  25. L528 `jwtStore.set(»jwt«).then(async () => {`  · ASSIGN:identifier
  26. L7 `set: (jwt) => new Promise(resolve => chrome.storage.session.set({ smeta_jwt: »jwt« }, resolve)),`  · ASSIGN:identifier
  27. L533 `const me = await smetaFetch('/auth/me', »jwt«);`  · ASSIGN:identifier
  28. L61 `'Authorization': »`Bearer ${jwt}`«,`  · ASSIGN:identifier, ASSIGN:template-literal
  29. L58 (→L65) `»    const r = await fetch(`${SMETA_API}${path}`, {«`  · ELEMENT:object.setProperty
  30. L569 `const »{ hostname } = new URL(request.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:destructure-property[hostname]
  31. L503 `if (»h« !== 'upload.facebook.com') { sendResponse(JSON.stringify({ error: 'url_not_allowed' })); return true; }`  · ASSIGN:identifier, ASSIGN:binary-left
  32. L508 `const bin = »atob(file.base64)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:atob
  33. L509 `const »bytes = new Uint8Array(bin.length)«;`  · ASSIGN:identifier, ELEMENT:member.length, INITIAL:Uint8Array.constructor, ELEMENT:object.setProperty
  34. L510 `for (let i = 0; i < »bin.length; i++) bytes[i] = bin.charCodeAt(i)«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return
  35. L511 `const »blob = new Blob([bytes], { type: file.mime || 'image/jpeg' })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  36. L513 `for (»const k in (fields || {})) fd.append(k, fields[k]«);`  · ASSIGN:identifier, ASSIGN:logical-left, ITERATE:loop.iteration, ELEMENT:member-element
  37. L512 `const »fd = new FormData()«;`  · ELEMENT:object.setProperty
  38. L514 `fd.append('farr', blob, »file.name || 'photo.jpg'«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  39. L515 `const »r = await fetch(url, { method: 'POST', credentials: 'include', body: fd })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  40. L577 `const opts = buildFetchOptions(»request«);`  · ASSIGN:identifier
  41. L34 `const { »method = 'GET', header = {}, body, form } = request«;`  · ASSIGN:identifier, ELEMENT:destructure-property[method], ELEMENT:destructure-property[header], ELEMENT:destructure-property[body], ELEMENT:destructure-property[form]
  42. L35 `const isForm = »!!form«;`  · ASSIGN:identifier, ASSIGN:unary
  43. L36 `const isFbOrSmeta = /facebook\.com|fbcdn\.net|adsmeta\.io/.test(»request.url || ''«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  44. L38 `»method«,`  · ASSIGN:identifier
  45. L37 (→L44) `»  const opts = {«`  · ELEMENT:object.setProperty
  46. L42 `»...header«,`  · ASSIGN:identifier, COPY:object-spread
  47. L45 `if (»method« !== 'GET') {`  · ASSIGN:identifier, ASSIGN:binary-left
  48. L46 `if (»isForm) opts.body = form«;`  · ASSIGN:identifier
  49. L47 `else if (»body) opts.body = typeof body === 'string' ? body : JSON.stringify(body)«;`  · ASSIGN:identifier, RETURN:json.stringify, ASSIGN:conditional-consequent
  50. L580 `const »{ hostname } = new URL(request.url)«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:destructure-property[hostname]
  51. L581 `if (»hostname === 'graph.facebook.com' || hostname.endsWith('.graph.facebook.com')«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  52. L443 `args: [»url, method, body || '', headers || {}«],`  · ASSIGN:identifier, ASSIGN:logical-left
  53. L440 (→L450) `»        const inj = await chrome.scripting.executeScript({«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  54. L446 `const »r = await fetch(u, { method: m, credentials: 'include', headers: h, body: m !== 'GET' ? b : undefined })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:conditional-consequent
  55. L570 `urlHostOk = EXTERNAL_ALLOWED.some(h => »hostname === h || hostname.endsWith('.' + h)«);`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  56. L587 `fetch(»request.url«, opts)`  · ASSIGN:identifier, ELEMENT:member-element
  57. L6 `get: () => new Promise(resolve => »chrome.storage.session.get('smeta_jwt', d => resolve(d.smeta_jwt || null))«),`  · STORAGE:STORAGE_FLOW[area: session, key: smeta_jwt, sender: background, receiver: background], ASSIGN:logical-left
  58. L151 `if (»!smeta_jwt«) return;`  · ASSIGN:identifier, ASSIGN:unary
  59. L153 `checkFetchCommand(»smeta_jwt«);   // LỚP 1: kiểm lệnh lấy số tươi (on-demand, không chạm FB)`  · ASSIGN:identifier
  60. L134 `const cmd = await smetaFetch('/ext/fetch-command', »smeta_jwt«);`  · ASSIGN:identifier
  61. L141 `await smetaFetch('/ext/fetch-done', »smeta_jwt«, { method: 'POST', body: JSON.stringify({ reqId: cmd.reqId, ok: false, reason: 'no_dashboard_tab' }) });`  · ASSIGN:identifier
  62. L155 `const notifs = await smetaFetch('/notifications', »smeta_jwt«);`  · ASSIGN:identifier
  63. L761 `if (»!smeta_jwt«) { sendResponse({ ok: false, error: 'Chưa đăng nhập' }); return; }`  · ASSIGN:identifier, ASSIGN:unary
  64. L763 `const data = await smetaFetch('/rating', »smeta_jwt«, {`  · ASSIGN:identifier
  65. L196 `if (»smeta_jwt«) chrome.alarms.create(POLL_ALARM, { periodInMinutes: 5 });`  · ASSIGN:identifier
  66. L256 `if (»smeta_jwt«) chrome.alarms.create(POLL_ALARM, { periodInMinutes: 5 });`  · ASSIGN:identifier
  67. L620 `if (»jwt && request.account«) {`  · ASSIGN:identifier, ASSIGN:logical-left
  68. L621 `await smetaFetch('/sync/fb-data', »jwt«, { method: 'POST', body: JSON.stringify({ accounts: [request.account] }) });`  · ASSIGN:identifier
  69. L666 `if (»!jwt«) { sendResponse({ ok: false }); return; }`  · ASSIGN:identifier, ASSIGN:unary
  70. L668 `const data = await smetaFetch('/auth/me', »jwt«);`  · ASSIGN:identifier
  71. L683 `if (»!jwt«) { sendResponse({ ok: false }); return; }`  · ASSIGN:identifier, ASSIGN:unary
  72. L684 `const data = await smetaFetch('/ext/promo-context', »jwt«);`  · ASSIGN:identifier

---
