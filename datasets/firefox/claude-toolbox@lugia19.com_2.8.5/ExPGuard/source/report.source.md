# Source-level Taint Flow — claude-toolbox@lugia19.com 2.8.5

- Source type: XPI
- Files with issues: 23 / 32
- Distinct taint flows: 18  (collapsed from 18 raw issue entries)
- Sinkless sources skipped: 46 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/helpers/settings` L293:C11 -> L293:C26  `switch (»event.data.type«) {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/settings` L296:C5 -> L300:C12 (spans to L300)  `»window.postMessage({«`
  - `CHROME_LOCAL_STORAGE` (unknown) — `content/helpers/settings` L223:C9 -> L223:C51  `await »chrome.storage.local.set({ [key]: value })«;  // chrome.storage.onChanged notifies`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/settings` L305:C5 -> L308:C12 (spans to L308)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/settings` L314:C5 -> L318:C12 (spans to L318)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/settings` L324:C5 -> L327:C12 (spans to L327)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/settings` L333:C5 -> L336:C12 (spans to L336)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (206 raw steps → 43 distinct lines):
   1. L293 `switch (»event.data.type«) {`  · ELEMENT:member-element
   2. L295 `const value = await settingsRegistry.get(»event.data.key«);`  · ELEMENT:member-element
   3. L208 `const key = _resolveKey(»keyOrDef«);`  · ASSIGN:identifier
   4. L79 `return typeof keyOrDef === 'string' ? »keyOrDef : keyOrDef.key«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:conditional-alternate, ELEMENT:member-element-container
   5. L209 `if (_isLocalKey(»keyOrDef«)) {`  · ASSIGN:identifier
   6. L97 `const def = _resolveDef(»keyOrDef«);`  · ASSIGN:identifier
   7. L83 `return typeof keyOrDef === 'string' ? _settingsDefinitions[»keyOrDef] : keyOrDef«;`  · ASSIGN:identifier
   8. L98 `return »!!(def && def.local)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary
   9. L210 `const result = await chrome.storage.local.get(»key«);`  · ASSIGN:identifier
  10. L213 `const row = await _settingsDB.settings.get(»key«);`  · ASSIGN:identifier
  11. L211 `if (result[»key] !== undefined) return result[key«];`  · ASSIGN:identifier
  12. L216 `»return _resolveDefault(keyOrDef);«`  · ASSIGN:identifier, ELEMENT:implicit.add
  13. L87 `const def = _resolveDef(»keyOrDef«);`  · ASSIGN:identifier
  14. L88 `if (»!def«) return undefined;`  · ASSIGN:identifier, ASSIGN:unary
  15. L91 `return (def.default && typeof def.default === 'object') ? structuredClone(»def.default) : def.default«;`  · ASSIGN:identifier, ELEMENT:member-element
  16. L298 `messageId: »event.data.messageId«,`  · ELEMENT:member-element
  17. L296 (→L300) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  18. L304 `await settingsRegistry.set(»event.data.key, event.data.value«);`  · ELEMENT:member-element
  19. L221 `const key = _resolveKey(»keyOrDef«);`  · ASSIGN:identifier
  20. L222 `if (_isLocalKey(»keyOrDef«)) {`  · ASSIGN:identifier
  21. L223 `»await chrome.storage.local.set({ [key]: value })«;  // chrome.storage.onChanged notifies`  · ASSIGN:identifier, ELEMENT:object.setProperty
  22. L225 `»await _settingsDB.settings.put({ key, value })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  23. L226 `_notifyChange(»key, value«);`  · ASSIGN:identifier
  24. L307 `messageId: »event.data.messageId«`  · ELEMENT:member-element
  25. L305 (→L308) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  26. L312 `const »def = _settingsDefinitions[event.data.key] || { key: event.data.key }«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  27. L313 `const value = await settingsRegistry.getPerChat(def, »event.data.conversationId«);`  · ELEMENT:member-element
  28. L272 `const »obj = await settingsRegistry.get(def) || {}«;`  · ELEMENT:implicit.add, ASSIGN:logical-left
  29. L273 `return obj[conversationId] !== undefined ? »obj[conversationId]« : null;`  · ASSIGN:identifier, ELEMENT:member-element-container
  30. L322 `const »def = _settingsDefinitions[event.data.key] || { key: event.data.key }«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  31. L316 `messageId: »event.data.messageId«,`  · ELEMENT:member-element
  32. L314 (→L318) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  33. L317 `value: »value«`  · ASSIGN:identifier
  34. L323 `await settingsRegistry.setPerChat(def, »event.data.conversationId, event.data.value«);`  · ELEMENT:member-element
  35. L277 `const »obj = await settingsRegistry.get(def) || {}«;`  · ELEMENT:implicit.add, ASSIGN:logical-left, ELEMENT:object.setProperty
  36. L278 `obj[»conversationId] = value«;`  · ASSIGN:identifier
  37. L331 `const »def = _settingsDefinitions[event.data.key] || { key: event.data.key }«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  38. L326 `messageId: »event.data.messageId«`  · ELEMENT:member-element
  39. L324 (→L327) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  40. L332 `await settingsRegistry.removePerChat(def, »event.data.conversationId«);`  · ELEMENT:member-element
  41. L283 `const »obj = await settingsRegistry.get(def) || {}«;`  · ELEMENT:implicit.add, ASSIGN:logical-left
  42. L335 `messageId: »event.data.messageId«`  · ELEMENT:member-element
  43. L333 (→L336) `»					window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #2 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1863:C24 -> L1863:C79  `const response = await »fetch(`/api/organizations/${orgId}/skills/list-skills`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1871:C24 -> L1875:C3 (spans to L1875)  `const response = await »fetch(`/api/organizations/${orgId}/skills/create-simple-skill`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/databases` L215:C35 -> L215:C90  `const connectors = await (await »fetch(`/api/organizations/${orgId}/mcp/remote_servers`)«).json();`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/databases` L220:C9 -> L220:C98  `await »fetch(`/api/organizations/${orgId}/mcp/remote_servers/${old.uuid}`, { method: 'DELETE' })«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1886:C24 -> L1890:C3 (spans to L1890)  `const response = await »fetch(`/api/organizations/${orgId}/skills/disable-skill`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (13553 raw steps → 12 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L1863 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${orgId}/skills/list-skills`«);`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L168 `const skill = await createSkill(»orgId«, ENCRYPTION_SKILL_NAME, base64Key);`  · ASSIGN:identifier
   8. L1871 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${orgId}/skills/create-simple-skill`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
   9. L215 `const connectors = await (await fetch(»`/api/organizations/${orgId}/mcp/remote_servers`«)).json();`  · ASSIGN:identifier, ASSIGN:template-literal
  10. L220 `await fetch(»`/api/organizations/${orgId}/mcp/remote_servers/${old.uuid}`«, { method: 'DELETE' });`  · ASSIGN:identifier, ASSIGN:template-literal
  11. L170 `await disableSkill(»orgId«, skill.id);`  · ASSIGN:identifier
  12. L1886 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${orgId}/skills/disable-skill`«, {`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/helpers/databases` L455:C11 -> L455:C26  `switch (»event.data.type«) {`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/databases` L458:C5 -> L462:C12 (spans to L462)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/databases` L467:C5 -> L470:C12 (spans to L470)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/databases` L475:C5 -> L479:C12 (spans to L479)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/databases` L484:C5 -> L488:C12 (spans to L488)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/databases` L493:C5 -> L496:C12 (spans to L496)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (154 raw steps → 33 distinct lines):
   1. L455 `switch (»event.data.type«) {`  · ELEMENT:member-element
   2. L457 `const entry = await conversationCache.get(»event.data.uuid«);`  · ELEMENT:member-element
   3. L346 `const entry = await cacheDB.conversations.get(»conversationId«);`  · ASSIGN:identifier
   4. L460 `messageId: »event.data.messageId«,`  · ELEMENT:member-element
   5. L458 (→L462) `»					window.postMessage({«`  · ELEMENT:object.setProperty
   6. L466 `await conversationCache.put(»event.data.uuid, event.data.updatedAt, event.data.data«);`  · ELEMENT:member-element
   7. L366 `const »encrypted = await encryptData(data)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
   8. L78 `return »data«;`  · ASSIGN:identifier
   9. L83 `const encoded = »new TextEncoder().encode(JSON.stringify(data))«;`  · ASSIGN:identifier, RETURN:json.stringify, INITIAL:Uint8Array.constructor
  10. L84 (→L86) `»		const ciphertext = await crypto.subtle.encrypt(«`  · RETURN:WebCrypto.encrypt
  11. L87 `const combined = »new Uint8Array(iv.length + ciphertext.byteLength)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, INITIAL:Uint8Array.constructor
  12. L88 `»combined.set(iv)«;`  · ELEMENT:member-element, RETURN:fallback-return
  13. L89 `»combined.set(new Uint8Array(ciphertext), iv.length)«;`  · ELEMENT:member-element, ASSIGN:identifier, INITIAL:Uint8Array.constructor, RETURN:fallback-return
  14. L91 `for (let i = 0; i < »combined.length; i++) binary += String.fromCharCode(combined[i])«;`  · ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:string.fromCharCode
  15. L92 `»return { v: 1, keyHash: _keyHash, data: btoa(binary) };«`  · ASSIGN:identifier, RETURN:btoa, ELEMENT:object.setProperty
  16. L367 `»await cacheDB.conversations.put({ uuid: conversationId, updated_at: updatedAt, data: encrypted })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  17. L469 `messageId: »event.data.messageId«`  · ELEMENT:member-element
  18. L467 (→L470) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  19. L474 `const messages = await getPhantomMessagesDB(»event.data.conversationId«);`  · ELEMENT:member-element
  20. L390 `const result = await phantomDB.phantomMessages.get(»conversationId«);`  · ASSIGN:identifier
  21. L399 `»await phantomDB.phantomMessages.put({ conversationId, encryptedData: encrypted })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  22. L477 `messageId: »event.data.messageId«,`  · ELEMENT:member-element
  23. L475 (→L479) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  24. L483 `await storePhantomMessagesDB(»event.data.conversationId, event.data.messages«);`  · ELEMENT:member-element
  25. L385 `const »encrypted = await encryptData({ messages, timestamp: Date.now() })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
  26. L386 `»await phantomDB.phantomMessages.put({ conversationId, encryptedData: encrypted })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  27. L486 `messageId: »event.data.messageId«,`  · ELEMENT:member-element
  28. L484 (→L488) `»					window.postMessage({«`  · ELEMENT:object.setProperty
  29. L487 `conversationId: »event.data.conversationId«`  · ELEMENT:member-element
  30. L492 `await clearPhantomMessagesDB(»event.data.conversationId«);`  · ELEMENT:member-element
  31. L410 `await phantomDB.phantomMessages.delete(»conversationId«);`  · ASSIGN:identifier
  32. L495 `messageId: »event.data.messageId«`  · ELEMENT:member-element
  33. L493 (→L496) `»					window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #4 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/isolated/global-search` L22:C25 -> L22:C104  `const response = await »fetch(`/api/organizations/${orgId}/chat_conversations_v2?limit=10000&offset=0`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L501:C25 -> L501:C38  `const response = await »fetch(apiUrl)«;`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/isolated/global-search` L328:C31 -> L331:C4 (spans to L331)  `const exportResponse = await »fetch(`/api/organizations/${orgId}/export_data`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/isolated/global-search` L304:C25 -> L307:C4 (spans to L307)  `const response = await »fetch(`/api/organizations/${orgId}/export_signed_url/${nonce}`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (813 raw steps → 13 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L22 `const response = await fetch(»`/api/organizations/${orgId}/chat_conversations_v2?limit=10000&offset=0`«);`  · ASSIGN:identifier, ASSIGN:template-literal
   7. L80 `const »conversation = new ClaudeConversation(orgId, conv.uuid)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L179 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
   9. L479 _(in `content/helpers/claude-api`)_ `const apiUrl = »`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ASSIGN:template-literal
  10. L501 _(in `content/helpers/claude-api`)_ `const response = await fetch(»apiUrl«);`  · ASSIGN:identifier
  11. L328 `const exportResponse = await fetch(»`/api/organizations/${orgId}/export_data`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  12. L362 `const result = await resolveExportSignedUrl(»orgId«, nonce);`  · ASSIGN:identifier
  13. L304 `const response = await fetch(»`/api/organizations/${orgId}/export_signed_url/${nonce}`«, {`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #5 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/isolated/global-search` L475:C6 -> L475:C21  `if (»event.data.type« !== 'SEARCH_INTERCEPT') return;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/isolated/global-search` L484:C3 -> L488:C10 (spans to L488)  `»window.postMessage({«`
  - `WINDOW_POSTMESSAGE` (*) — `content/isolated/global-search` L498:C3 -> L503:C10 (spans to L503)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (170 raw steps → 26 distinct lines):
   1. L475 `if (»event.data.type« !== 'SEARCH_INTERCEPT') return;`  · ELEMENT:member-element, ASSIGN:binary-left
   2. L477 `const { »messageId, query, url« } = event.data;`  · ELEMENT:destructure-property[messageId], ELEMENT:destructure-property[query], ELEMENT:destructure-property[url]
   3. L486 `»messageId«,`  · ASSIGN:identifier
   4. L484 (→L488) `»			window.postMessage({«`  · ELEMENT:object.setProperty
   5. L494 `const results = await searchAllConversations(»query«);`  · ASSIGN:identifier
   6. L554 `if (»!query || query.trim() === ''«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   7. L560 `console.log('[QOL-Search] Query:', »query«);`  · ASSIGN:identifier
   8. L562 `const lowerQuery = »query.toLowerCase()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L579 `const matchCount = (lowerText.match(new RegExp(»lowerQuery«, 'gi')) || []).length;`  · ASSIGN:identifier
  10. L500 `»messageId«,`  · ASSIGN:identifier
  11. L498 (→L503) `»			window.postMessage({«`  · ELEMENT:object.setProperty
  12. L595 `const »titleMatches = findMatches(metadata.name, lowerQuery)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  13. L517 `if (»!text || !lowerQuery«) return [];`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  14. L522 `const i = lowerText.indexOf(»lowerQuery, from«);`  · ASSIGN:identifier
  15. L524 `»out.push({ start: i, end: i + lowerQuery.length })«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:object.setProperty
  16. L519 `const »out = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  17. L525 `from = i + »lowerQuery.length«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  18. L602 `matched_snippet: buildSnippet(entry ? entry.searchableText : '', »lowerQuery«),`  · ASSIGN:identifier
  19. L534 `const idx = text.toLowerCase().indexOf(»lowerQuery«);`  · ASSIGN:identifier
  20. L538 `const pad = »Math.max(0, Math.floor((snippetSize - lowerQuery.length) / 2))«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:Math.floor, RETURN:Math.max
  21. L539 `const start = »Math.max(0, idx - pad)«;`  · ASSIGN:identifier, ASSIGN:binary-right, RETURN:Math.max
  22. L540 `const end = »Math.min(text.length, idx + lowerQuery.length + pad)«;`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:Math.min
  23. L543 `const body = text.slice(»start, end«);`  · ASSIGN:identifier
  24. L545 (→L548) `const matches = »findMatches(body, lowerQuery).map(m => ({«`  · ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container
  25. L549 `»return { text: prefix + body + suffix, matches };«`  · ELEMENT:object.setProperty
  26. L597 (→L604) `»			return {«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty

---

## Flow #6 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/isolated/tts` L145:C33 -> L145:C44  `if (event.source !== window || »!event.data«) return;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/isolated/tts` L50:C2 -> L50:C64  `»window.postMessage({ type: 'TTS_SYNTH_DONE', requestId }, '*')«;`
  - `WINDOW_POSTMESSAGE` (*) — `content/isolated/tts` L89:C3 -> L89:C75  `»window.postMessage({ type: 'TTS_SYNTH_PCM', requestId, chunk: ab }, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (310 raw steps → 37 distinct lines):
   1. L145 `if (»event.source !== window || !event.data«) return;`  · ASSIGN:unary, ASSIGN:logical-right
   2. L148 `if (»d.type« === 'TTS_SYNTH_REQUEST') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L149 `handleSynthRequest(»d«);`  · ASSIGN:identifier
   4. L62 `async function handleSynthRequest({ »requestId, text, conversationId« }) {`  · ELEMENT:destructure-property[requestId], ELEMENT:destructure-property[text], ELEMENT:destructure-property[conversationId]
   5. L66 `if (!provider) { postSynthDone(»requestId«); return; }`  · ASSIGN:identifier
   6. L50 `»window.postMessage({ type: 'TTS_SYNTH_DONE', requestId }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L69 `settingsRegistry.getPerChat(TP.ACTOR_MODE, »conversationId«).then(v => v === true),`  · ASSIGN:identifier
   8. L273 `nativeNote.textContent = "Using Claude's built»-in voice (set« it in Claude's own settings). Pick ElevenLabs or OpenAI to use a custom voice.";`  · ASSIGN:identifier
   9. L70 `settingsRegistry.getPerChat(TP.VOICE, »conversationId«).then(v => v || ''),`  · ASSIGN:identifier
  10. L71 `settingsRegistry.getPerChat(TP.QUOTES_ONLY, »conversationId«).then(v => v === true),`  · ASSIGN:identifier
  11. L72 `settingsRegistry.getPerChat(TP.CHARACTERS, »conversationId«).then(v => v || [])`  · ASSIGN:identifier
  12. L77 `const »finalText = cleanupText(text, quotesOnly)«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  13. L183 `text = »text.replace(/```[\s\S]*?```/g, '')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  14. L185 (→L187) `text = »text.split('\n')«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  15. L189 `text = »text.replace(/\n{3,}/g, '\n\n').trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  16. L191 `text = »text.replace("*", "").replace("_", "").replace("#", "").trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L194 `const quotes = »text.match(/"([^"]*)"/g)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  18. L198 `return »text«;`  · ASSIGN:identifier
  19. L195 `if (»!quotes«) return '';`  · ASSIGN:identifier, ASSIGN:unary
  20. L196 `return »quotes.map(q => q.slice(1, -1)).join(". ")«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  21. L78 `if (»!finalText) { postSynthDone(requestId«); return; } // e.g. quotes-only with no quotes`  · ASSIGN:identifier, ASSIGN:unary
  22. L81 `activeSynth.set(»requestId«, entry);`  · ASSIGN:identifier
  23. L94 `await synthesizeActorMode(provider, »finalText«, characters, settings, baseUrl, signal, onChunk, entry);`  · ASSIGN:identifier
  24. L89 `»window.postMessage({ type: 'TTS_SYNTH_PCM', requestId, chunk: ab }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  25. L110 `const segments = await provider.attributeDialogueToCharacters(»text«, characters, settings.model);`  · ASSIGN:identifier
  26. L96 `await provider.synthesize(»finalText«, defaultVoice, settings.model, settings.apiKey, { baseUrl }, signal, onChunk);`  · ASSIGN:identifier
  27. L101 `if (!entry.cancelled) postSynthDone(»requestId«);`  · ASSIGN:identifier
  28. L102 `activeSynth.delete(»requestId«);`  · ASSIGN:identifier
  29. L150 `} else if (»d.type« === 'TTS_SYNTH_ABORT') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  30. L151 `abortSynth(»d.requestId«);`  · ASSIGN:identifier, ELEMENT:member-element
  31. L54 `const entry = activeSynth.get(»requestId«);`  · ASSIGN:identifier
  32. L58 `activeSynth.delete(»requestId«);`  · ASSIGN:identifier
  33. L152 `} else if (»d.type« === 'TTS_HIJACK_CONFIG_REQUEST') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  34. L154 `} else if (»d.type« === 'tts-auto-speak') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  35. L158 `const { »messageUuid } = d«;`  · ASSIGN:identifier, ELEMENT:destructure-property[messageUuid]
  36. L163 `const messageElement = document.querySelector(»`[data-message-uuid="${messageUuid}"]`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  37. L175 `console.log('[QOL-TTS] Could not find native read-aloud button for message:', »messageUuid«);`  · ASSIGN:identifier

---

## Flow #7 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/isolated/exporter` L444:C25 -> L447:C3 (spans to L447)  `if (fi < message.fil»es.length - 1) {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/isolated/exporter` L943:C26 -> L946:C5 (spans to L946)  `// Convert and store pha»ntom messages«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L959:C26 -> L962:C5 (spans to L962)  `const response = await »fetch(`/api/organizations/${orgId}/convert_document`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (2417 raw steps → 26 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) `// I»mport button handler«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 `han»dleI«mport(`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 `modelS»elect«.value,`  · ASSIGN:identifier
   6. L179 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
   7. L741 `const »conversation = new ClaudeConversation(getOrgId(), null)«;`  · ELEMENT:object.setProperty
   8. L743 `const »msg = new ClaudeMessage(conversation)«;`  · ELEMENT:object.setProperty
   9. L1094 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(json, orgId, conversationId);«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  10. L1027 `msg.attachF»ile(p«arseFileFromAPI(f, conversation));`  · ASSIGN:identifier
  11. L1182 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  12. L1148 `»	placeholder.con«tent = [{ type: 'text', text: '[Conversation imported from LibreChat]' }];`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  13. L1187 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(a, this.conversation))«;`  · ELEMENT:implicit.add
  14. L1192 _(in `content/helpers/claude-api`)_ `const »existingUuids = new Set(this._files.map(f => f.file_uuid).filter(Boolean))«;`  · ELEMENT:object.setProperty
  15. L1195 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  16. L750 `»msg.attachFile(parseFileFromAPI(f, conversation))«;`  · ELEMENT:implicit.add
  17. L755 `»msg.attachFile(parseFileFromAPI(a, conversation))«;`  · ELEMENT:implicit.add
  18. L889 `const »conversation = new ClaudeConversation(getOrgId())«;`  · ELEMENT:object.setProperty
  19. L893 `const »importMessage = new ClaudeMessage(conversation)«;`  · ELEMENT:object.setProperty
  20. L661 _(in `content/helpers/claude-api`)_ `const »conv = conversation || new ClaudeConversation(getOrgId(), null)«;`  · ELEMENT:object.setProperty
  21. L698 `thro»w new Error(`Consecutive [${marker}] bl«ocks not allowed`);`  · ELEMENT:object.setProperty
  22. L445 _(in `content/helpers/claude-api`)_ `»`/api/organizations/${this.orgId}/conversations/${this.conversationId}/wiggle/upload-file`«,`  · ASSIGN:template-literal
  23. L454 `»	messagesHtml += `<div class="msg ${roleClass}" id="msg-${message.uuid}"${ts«Attr} style="display:none"><div class="msg-header">${role}</div><div class="msg-body">${contentHtml}</div></div>\n`;`  · ELEMENT:object.setProperty
  24. L943 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/${orgId}/upload`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  25. L959 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${orgId}/convert_document`«, {`  · ASSIGN:identifier, ASSIGN:template-literal
  26. L934 `»await importMessage.addFile(cleanedContent, "chatlog.txt", true)«;`  · ELEMENT:implicit.add

---

## Flow #8 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L62:C2 -> L62:C55  `»window.postMessage({ type, messageId, ...data }, '*')«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L501:C25 -> L501:C38  `const response = await »fetch(apiUrl)«;`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L78:C1 -> L78:C106  `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (16927 raw steps → 97 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L23 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L179 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
   8. L1094 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(json, orgId, conversationId);«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   9. L1027 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
  10. L1182 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  11. L1148 _(in `content/helpers/claude-api`)_ `»this._files = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  12. L1187 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(a, this.conversation))«;`  · ELEMENT:implicit.add
  13. L1192 _(in `content/helpers/claude-api`)_ `const »existingUuids = new Set(this._files.map(f => f.file_uuid).filter(Boolean))«;`  · ELEMENT:object.setProperty
  14. L1195 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  15. L775 _(in `content/helpers/claude-api`)_ `const »conv = new ClaudeConversation(getOrgId(), null)«;`  · ELEMENT:object.setProperty
  16. L782 _(in `content/helpers/claude-api`)_ `const »userMsg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
  17. L805 _(in `content/helpers/claude-api`)_ `const »msg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
  18. L99 (→L102) `»						const reconstructed = ClaudeConversation.fromChatlog(«`  · ELEMENT:implicit.add
  19. L1374 (→L1416) _(in `content/helpers/claude-api`)_ `for (»const f of this._files) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  20. L1377 _(in `content/helpers/claude-api`)_ `»attachments.push(f.toApiFormat())«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  21. L1078 _(in `content/helpers/claude-api`)_ `file_uuid: »this.file_uuid«,`  · ELEMENT:member-element-container
  22. L1077 (→L1090) _(in `content/helpers/claude-api`)_ `»		return {«`  · ELEMENT:object.setProperty
  23. L1079 _(in `content/helpers/claude-api`)_ `file_name: »this.file_name«,`  · ELEMENT:member-element-container
  24. L1080 _(in `content/helpers/claude-api`)_ `sanitized_name: »this.sanitized_name«,`  · ELEMENT:member-element-container
  25. L1081 _(in `content/helpers/claude-api`)_ `path: »this.path«,`  · ELEMENT:member-element-container
  26. L1082 _(in `content/helpers/claude-api`)_ `size_bytes: »this.size_bytes«,`  · ELEMENT:member-element-container
  27. L1083 _(in `content/helpers/claude-api`)_ `file_kind: »this.file_kind«,`  · ELEMENT:member-element-container
  28. L1084 _(in `content/helpers/claude-api`)_ `created_at: »this.created_at«,`  · ELEMENT:member-element-container
  29. L1085 _(in `content/helpers/claude-api`)_ `preview_asset: »this.preview_asset«,`  · ELEMENT:member-element-container
  30. L1086 _(in `content/helpers/claude-api`)_ `document_asset: »this.document_asset«,`  · ELEMENT:member-element-container
  31. L1087 _(in `content/helpers/claude-api`)_ `thumbnail_asset: »this.thumbnail_asset«,`  · ELEMENT:member-element-container
  32. L1088 _(in `content/helpers/claude-api`)_ `preview_url: »this.preview_url«,`  · ELEMENT:member-element-container
  33. L1089 _(in `content/helpers/claude-api`)_ `thumbnail_url: »this.thumbnail_url«`  · ELEMENT:member-element-container
  34. L988 _(in `content/helpers/claude-api`)_ `extracted_content: »this.extracted_content«,`  · ELEMENT:member-element-container
  35. L987 (→L992) _(in `content/helpers/claude-api`)_ `»		return {«`  · ELEMENT:object.setProperty
  36. L989 _(in `content/helpers/claude-api`)_ `file_name: »this.file_name«,`  · ELEMENT:member-element-container
  37. L990 _(in `content/helpers/claude-api`)_ `file_size: »this.file_size«,`  · ELEMENT:member-element-container
  38. L991 _(in `content/helpers/claude-api`)_ `file_type: »this.file_type«`  · ELEMENT:member-element-container
  39. L904 _(in `content/helpers/claude-api`)_ `file_uuid: »this.file_uuid«,`  · ELEMENT:member-element-container
  40. L903 (→L912) _(in `content/helpers/claude-api`)_ `»		return {«`  · ELEMENT:object.setProperty
  41. L905 _(in `content/helpers/claude-api`)_ `file_name: »this.file_name«,`  · ELEMENT:member-element-container
  42. L906 _(in `content/helpers/claude-api`)_ `file_kind: »this.file_kind«,`  · ELEMENT:member-element-container
  43. L907 _(in `content/helpers/claude-api`)_ `preview_asset: »this.preview_asset«,`  · ELEMENT:member-element-container
  44. L908 _(in `content/helpers/claude-api`)_ `document_asset: »this.document_asset«,`  · ELEMENT:member-element-container
  45. L909 _(in `content/helpers/claude-api`)_ `thumbnail_asset: »this.thumbnail_asset«,`  · ELEMENT:member-element-container
  46. L910 _(in `content/helpers/claude-api`)_ `preview_url: »this.preview_url«,`  · ELEMENT:member-element-container
  47. L911 _(in `content/helpers/claude-api`)_ `thumbnail_url: »this.thumbnail_url«`  · ELEMENT:member-element-container
  48. L1372 _(in `content/helpers/claude-api`)_ `const »attachments = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  49. L1407 _(in `content/helpers/claude-api`)_ `const »apiFormat = f.toApiFormat()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  50. L1418 _(in `content/helpers/claude-api`)_ `»return { files_v2, files_completion, files_history, attachments };«`  · ELEMENT:object.setProperty
  51. L1381 _(in `content/helpers/claude-api`)_ `if (»f.extracted_content« !== null) {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  52. L1369 _(in `content/helpers/claude-api`)_ `const »files_v2 = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  53. L1382 (→L1383) _(in `content/helpers/claude-api`)_ `shouldInline = »f.force_attachment_mode ||«`  · ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
  54. L1383 _(in `content/helpers/claude-api`)_ `»f.extracted_content.length« <= ATTACHMENT_CHAR_LIMIT;`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  55. L1409 _(in `content/helpers/claude-api`)_ `files_completion.push(»f.file_uuid«);`  · ELEMENT:member-element-container
  56. L1370 _(in `content/helpers/claude-api`)_ `const »files_completion = []«;`  · ELEMENT:object.setProperty
  57. L1412 _(in `content/helpers/claude-api`)_ `if (»f.file_kind« === 'image') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  58. L1396 _(in `content/helpers/claude-api`)_ `const »apiFormat = f.toApiFormat()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  59. L1371 _(in `content/helpers/claude-api`)_ `const »files_history = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  60. L1398 _(in `content/helpers/claude-api`)_ `files_completion.push(»f.file_uuid«);`  · ELEMENT:member-element-container
  61. L1401 _(in `content/helpers/claude-api`)_ `if (»f.file_kind« === 'image') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  62. L1386 _(in `content/helpers/claude-api`)_ `if (»shouldInline«) {`  · ASSIGN:identifier
  63. L1389 _(in `content/helpers/claude-api`)_ `extracted_content: »f.extracted_content«,`  · ELEMENT:member-element-container
  64. L1388 (→L1393) _(in `content/helpers/claude-api`)_ `»					attachments.push({«`  · ELEMENT:object.setProperty
  65. L1390 _(in `content/helpers/claude-api`)_ `file_name: »f.file_name«,`  · ELEMENT:member-element-container
  66. L1391 _(in `content/helpers/claude-api`)_ `file_size: »f.extracted_content.length«,`  · ELEMENT:member-element-container, ELEMENT:member.length
  67. L1425 (→L1439) _(in `content/helpers/claude-api`)_ `»		return {«`  · ELEMENT:object.setProperty
  68. L791 _(in `content/helpers/claude-api`)_ `const »ackMsg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
  69. L105 `const »messages = await reconstructed.getMessages()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  70. L529 _(in `content/helpers/claude-api`)_ `const »data = await this.getData(forceRefresh)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  71. L471 _(in `content/helpers/claude-api`)_ `if (»!this.created«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ELEMENT:implicit.add
  72. L472 _(in `content/helpers/claude-api`)_ `return »this.conversationData«;`  · ELEMENT:member-element-container
  73. L475 _(in `content/helpers/claude-api`)_ `if (»this.conversationData && !forceRefresh«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  74. L476 _(in `content/helpers/claude-api`)_ `return »this.conversationData«;`  · ELEMENT:member-element-container
  75. L479 _(in `content/helpers/claude-api`)_ `const »apiUrl = `/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:template-literal
  76. L484 _(in `content/helpers/claude-api`)_ `const cachedEntry = await _convCacheGet(»this.conversationId«);`  · ELEMENT:member-element-container
  77. L68 _(in `content/helpers/claude-api`)_ `if (cache) return await cache.get(»uuid«);`  · ASSIGN:identifier
  78. L70 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('CONV_CACHE_GET', { uuid }, 'CONV_CACHE_RESULT')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  79. L62 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type, messageId, ...data }, '*')«;`  · ELEMENT:object.setProperty, COPY:object-spread
  80. L501 _(in `content/helpers/claude-api`)_ `const response = await fetch(»apiUrl«);`  · ASSIGN:identifier
  81. L503 _(in `content/helpers/claude-api`)_ `if (»response.status === 404 && this.conversationData«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  82. L510 _(in `content/helpers/claude-api`)_ `»this._syncAccountFeatureSettings«();`  · ELEMENT:member-element-container
  83. L459 _(in `content/helpers/claude-api`)_ `const »s = this.conversationData?.settings«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  84. L460 _(in `content/helpers/claude-api`)_ `if (»s«) {`  · ASSIGN:identifier
  85. L505 _(in `content/helpers/claude-api`)_ `»return this.conversationData;«`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  86. L513 _(in `content/helpers/claude-api`)_ `if (»this.conversationData.updated_at«) {`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  87. L514 _(in `content/helpers/claude-api`)_ `»_convCachePut(this.conversationId, this.conversationData.updated_at, this.conversationData)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  88. L76 `let phantomMessages = await» getPhantomMessages(c«onversationId);`  · ASSIGN:identifier
  89. L78 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  90. L517 _(in `content/helpers/claude-api`)_ `»return this.conversationData;«`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  91. L530 _(in `content/helpers/claude-api`)_ `const allMessages = »data.chat_messages« || [];`  · ELEMENT:member-element-container
  92. L533 _(in `content/helpers/claude-api`)_ `return »allMessages.map«(msg => ClaudeMessage.fromHistoryJSON(this, msg));`  · ELEMENT:member-element-container
  93. L537 _(in `content/helpers/claude-api`)_ `const messageMap = new Map(»allMessages.map«(msg => [msg.uuid, msg]));`  · ELEMENT:member-element-container
  94. L540 _(in `content/helpers/claude-api`)_ `let currentId = »data.current_leaf_message_uuid«;`  · ELEMENT:member-element-container
  95. L542 _(in `content/helpers/claude-api`)_ `while (»currentId && currentId !== rootId«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  96. L106 `const »messagesJson = messages.map(m => m.toHistoryJSON())«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  97. L85 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('PHANTOM_STORE', { conversationId, messages }, 'PHANTOM_STORED')«;`  · ELEMENT:object.setProperty

---

## Flow #9 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `content/helpers/claude-api` L41:C8 -> L41:C104  `return »_cachedLocale ?? (SUPPORTED_LOCALES.includes(navigator.language) ? navigator.language : 'en-US')«;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L62:C2 -> L62:C55  `»window.postMessage({ type, messageId, ...data }, '*')«;`
  - `FETCH_BODY` ([Unknown URL]) — `content/main/forking` L444:C25 -> L447:C3 (spans to L447)  `loadingModal.setConten»t(createLoadingContent('Fork complete! Redirecting...'));«`
  - `FETCH_BODY` ([Unknown URL]) — `content/helpers/claude-api` L943:C26 -> L946:C5 (spans to L946)  `const response = await »fetch(`/api/${orgId}/upload`, {«`
  - `FETCH_BODY` ([Unknown URL]) — `content/helpers/claude-api` L959:C26 -> L962:C5 (spans to L962)  `const response = await »fetch(`/api/organizations/${orgId}/convert_document`, {«`
  - `FETCH_BODY` ([Unknown URL]) — `content/main/forking` L325:C26 -> L329:C5 (spans to L329)  `let phantomsToCarryOver» = [];«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (48301 raw steps → 287 distinct lines):
   1. L41 _(in `content/helpers/claude-api`)_ `return »_cachedLocale ?? (SUPPORTED_LOCALES.includes(navigator.language) ? navigator.language : 'en-US')«;`  · ASSIGN:logical-right
   2. L924 `const »chunkMsg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
   3. L857 `const »normalized = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
   4. L950 `const »ackMsg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
   5. L859 (→L963) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   6. L860 `const »msgTokens = estimateTokens([msg])«;`  · ELEMENT:object.setProperty
   7. L649 (→L659) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:identifier
   8. L627 _(in `content/helpers/claude-api`)_ `if (»!message.content || message.content.length === 0«) return '';`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
   9. L653 `// A»dd attachment content from files« getter (ClaudeAttachments have extracted_content)`  · ELEMENT:member-element-container, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member-element
  10. L654 `for (»const file of msg.files«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ITERATE:loop.iteration, ELEMENT:member-element
  11. L632 `if (p»riorSummaryC«ount > 0) {`  · ASSIGN:identifier, ELEMENT:member-element
  12. L633 `fullPrompt += `\n»\nIMPORTANT:« I've attached ${priorSummaryCount} previous summary files (summary_chunk_1.txt, summary_chunk_2.txt, etc.) for context. These contain summaries of earlier parts of the conversation. DO NOT re-summarize these summaries - they are only for your understanding of what came before. Only summarize the NEW conversation in chatlog.txt.`;`  · ASSIGN:identifier, ELEMENT:member-element
  13. L629 `let fu»llPrompt = pend«ingFork.summaryPrompt;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  14. L635 _(in `content/helpers/claude-api`)_ `if (»content.input«) {`  · ASSIGN:identifier, ELEMENT:member-element
  15. L636 `// Add file handli»ng instruction based on setti«ngs`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  16. L638 `full»Prompt += "\n\n«Other attached files will be forwarded to the new chat - don't summarize them, only the conversation itself.";`  · ASSIGN:identifier, ELEMENT:member-element
  17. L640 `fullPrompt += "\n\n»Files will NOT «be forwarded, so include summaries of relevant file contents in your summary.";`  · ASSIGN:identifier, ELEMENT:member-element
  18. L641 _(in `content/helpers/claude-api`)_ `for (»const nestedContent of content.content«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  19. L642 _(in `content/helpers/claude-api`)_ `extractFromContent(»nestedContent«);`  · ASSIGN:identifier
  20. L647 _(in `content/helpers/claude-api`)_ `extractFromContent(»content.content«);`  · ASSIGN:identifier, ELEMENT:member-element
  21. L657 _(in `content/helpers/claude-api`)_ `return »textPieces.join('\n')«;`  · RETURN:array.join
  22. L651 `»totalChars += ClaudeConversation.extractMessageText(msg).length«;`  · ELEMENT:implicit.add, ELEMENT:member.length, ASSIGN:identifier
  23. L661 `return »Math.ceil(totalChars / 4)«;`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.ceil
  24. L655 `if (»file« instanceof ClaudeAttachment) {`  · ASSIGN:identifier
  25. L656 `totalChars += »file.extracted_content?.length || 0«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left
  26. L863 `const msgAttachments = »msg.files.filter«(f => f instanceof ClaudeAttachment);`  · ELEMENT:member-element-container
  27. L864 `const msgNonAttachments = »msg.files.filter«(f => !(f instanceof ClaudeAttachment));`  · ELEMENT:member-element-container
  28. L866 `if (»msgTokens <= LAST_CHUNK_SIZE || !msgAttachments.length«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  29. L913 `console.log(»`Splitting message ${msg.uuid} into ${attachmentChunks.length} chunks.`«);`  · ELEMENT:member-element-container, ASSIGN:template-literal
  30. L915 `const originalSender = »msg.sender«;`  · ELEMENT:member-element-container
  31. L918 `let previousUuid = »msg.parent_message_uuid«;`  · ELEMENT:member-element-container
  32. L962 `console.log(»`Message ${msg.uuid} split into ${attachmentChunks.length} chunks with acknowledgments.`«);`  · ELEMENT:member-element-container, ASSIGN:template-literal
  33. L925 `chunkMsg.uuid = isLast ? »msg.uuid« : crypto.randomUUID();`  · ELEMENT:member-element-container
  34. L926 `chunkMsg.parent_message_uuid = »previousUuid«;`  · ASSIGN:identifier
  35. L927 `chunkMsg.sender = »originalSender«;`  · ASSIGN:identifier
  36. L928 `chunkMsg.created_at = »msg.created_at«;`  · ELEMENT:member-element-container
  37. L932 `»chunkMsg.content = [...msg.content]«;`  · ELEMENT:member-element-container, ELEMENT:array-spread, ELEMENT:object.setProperty
  38. L955 `ackMsg.created_at = »msg.created_at«;`  · ELEMENT:member-element-container
  39. L662 _(in `content/helpers/claude-api`)_ `const »cleaned = [...messages]«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:identifier, ELEMENT:array-spread
  40. L665 _(in `content/helpers/claude-api`)_ `while (i < »cleaned.length«) {`  · ELEMENT:member.length, ASSIGN:binary-right
  41. L666 _(in `content/helpers/claude-api`)_ `const msg = »cleaned[i]«;`  · ELEMENT:member-element-container
  42. L667 _(in `content/helpers/claude-api`)_ `const text = »msg.content?.[0]?.text || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  43. L690 _(in `content/helpers/claude-api`)_ `while (i < »cleaned.length - 1«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  44. L669 `cons»t msgTokens = estimateTokens([messages[i]])«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ELEMENT:object.setProperty
  45. L691 _(in `content/helpers/claude-api`)_ `const current = »cleaned[i]«;`  · ELEMENT:member-element-container
  46. L692 _(in `content/helpers/claude-api`)_ `const next = »cleaned[i + 1]«;`  · ELEMENT:member-element-container
  47. L694 `const» reversed = messages.slice().r«everse();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  48. L698 `function »calculateSplitIndex(messages, rawTextPe«rcentage) {`  · ELEMENT:object.setProperty
  49. L700 `const targetKeepTokens = »Math.ceil(totalTokens * rawTextPercentage / 100)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:Math.ceil
  50. L703 _(in `content/helpers/claude-api`)_ `fillerMessage.c»reated_at = current.created_at || new Date().toISOString()«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:binary-left
  51. L705 `//» Adj«ust to ensure we cut before a user message`  · ASSIGN:identifier
  52. L724 `i»f (item.type« == 'text') {`  · ASSIGN:conditional-alternate, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  53. L727 `if (»text.includes("Simply say 'Acknowledged' and wait for user input.")«) {`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  54. L733 _(in `content/helpers/claude-api`)_ `const chatlogText = »messageParts.join(separator)«;`  · ELEMENT:member-element-container, RETURN:array.join
  55. L737 (→L739) `const files = »messages.flatMap(m =>«`  · ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  56. L738 `m.files.filte»r(f => f instanceof Claude«File || f instanceof ClaudeCodeExecutionFile)`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  57. L736 `// Extr»act from mes«sages using files getter with instanceof filters`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  58. L740 (→L742) `const attachment»s = messages.flatMap(m =>«`  · RETURN:array.join, ASSIGN:template-literal, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  59. L741 _(in `content/helpers/claude-api`)_ `»return { text: header + '\n' + chatlogText, filename: 'chatlog.txt' };«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:object.setProperty
  60. L744 _(in `content/helpers/claude-api`)_ `»return { text: chatlogText, filename: 'chatlog.txt' };«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  61. L396 `»forkAttachments = [ClaudeConversation.buildChatlog(messages, { includeHeader: true })]«;`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  62. L702 `let keepCount = takeMessagesFromEnd(messages, »targetKeepTokens«, true);`  · ASSIGN:identifier
  63. L695 `return takeMessagesUpToTokens(reversed, »maxTokens«, greedy);`  · ASSIGN:identifier
  64. L668 `for (let i = 0; i < »messages.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  65. L671 `if (»totalTokens + msgTokens > maxTokens && splitIndex > 0«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:logical-left
  66. L681 `totalTokens += »msgTokens«;`  · ASSIGN:identifier
  67. L676 `totalTokens += »msgTokens«;`  · ASSIGN:identifier
  68. L706 `while (»splitIndex < messages.length && messages[splitIndex].sender !== 'human'«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
  69. L707 `»splitIndex++«;`  · ASSIGN:identifier, ASSIGN:update
  70. L710 `if (»splitIndex >= messages.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  71. L403 `if (»messages.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  72. L414 (→L426) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  73. L500 (→L507) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  74. L502 `»msg.clearFiles«();`  · ELEMENT:member-element-container
  75. L505 `»msg.removeToolCalls«();`  · ELEMENT:member-element-container
  76. L1346 _(in `content/helpers/claude-api`)_ `this.content = »this.content.filter«(item =>`  · ELEMENT:member-element-container
  77. L406 `»messages = [...existingPhantoms, ...messages]«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  78. L416 `const chatlogFiles = »msg.files.filter«(f =>`  · ELEMENT:member-element-container
  79. L422 _(in `content/helpers/claude-api`)_ `co»nst downloadedBlob = await fileOrAttachmentOrBlob.download()«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  80. L430 (→L432) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  81. L359 `if (»toSummarize.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  82. L431 `»msg.removeToolCalls«();`  · ELEMENT:member-element-container
  83. L85 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('PHANTOM_STORE', { conversationId, messages }, 'PHANTOM_STORED')«;`  · ELEMENT:object.setProperty
  84. L62 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type, messageId, ...data }, '*')«;`  · ELEMENT:object.setProperty, COPY:object-spread
  85. L569 `const »forkMessage = new ClaudeMessage(conversation)«;`  · ELEMENT:object.setProperty
  86. L575 (→L577) `for (»const att of forkAttachments) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  87. L576 `»await forkMessage.addFile(att.text, att.filename, true)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  88. L1215 _(in `content/helpers/claude-api`)_ `if (»input« instanceof Blob) {`  · ASSIGN:identifier
  89. L1216 _(in `content/helpers/claude-api`)_ `const »isText = await isLikelyTextFile(input)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  90. L1902 _(in `content/helpers/claude-api`)_ `if (»file.type && file.type.startsWith('text/')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  91. L1907 _(in `content/helpers/claude-api`)_ `const mimeType = mime.getType(»file.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  92. L1095 _(in `content/helpers/claude-styles`)_ `document.body.appendC»hild«(portal);`  · ASSIGN:identifier
  93. L1936 _(in `content/helpers/claude-api`)_ `const slice = »file.slice(0, 1024)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  94. L1937 _(in `content/helpers/claude-api`)_ `const arrayBuffer = await »slice.arrayBuffer()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  95. L1938 _(in `content/helpers/claude-api`)_ `const bytes = »new Uint8Array(arrayBuffer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  96. L1941 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »bytes.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  97. L1942 _(in `content/helpers/claude-api`)_ `if (»bytes[i]« === 0) {`  · ELEMENT:member-element, ASSIGN:binary-left
  98. L1949 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »bytes.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  99. L1950 _(in `content/helpers/claude-api`)_ `const byte = »bytes[i]«;`  · ELEMENT:member-element
  100. L1958 _(in `content/helpers/claude-api`)_ `return (»printableCount / bytes.length«) > 0.9;`  · ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left
  101. L1952 _(in `content/helpers/claude-api`)_ `if (»(byte >= 32 && byte <= 126) || byte === 9 || byte === 10 || byte === 13 || byte >= 128«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  102. L1225 _(in `content/helpers/claude-api`)_ `const name = »filename || 'text.txt'«;`  · ASSIGN:logical-left
  103. L1241 `le»t edi«tPrompt;`  · ASSIGN:identifier
  104. L1218 `leftBtn.style.cursor = lef»tBtn.disable«d ? 'not-allowed' : 'pointer';`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  105. L1242 _(in `content/helpers/claude-api`)_ `const name = »filename || 'file'«;`  · ASSIGN:logical-left
  106. L1257 `f»or (l«et i = 0; i < currentIndex; i++) {`  · ASSIGN:identifier
  107. L1219 _(in `content/helpers/claude-api`)_ `input = »textContent«;`  · ASSIGN:identifier
  108. L1227 _(in `content/helpers/claude-api`)_ `const »blob = new Blob([input], { type: 'text/plain' })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  109. L1234 _(in `content/helpers/claude-api`)_ `const result = ClaudeAttachment.fromText(»input, name«);`  · ASSIGN:identifier
  110. L997 _(in `content/helpers/claude-api`)_ `extracted_content: »text«,`  · ASSIGN:identifier
  111. L996 (→L1001) `»		});«`  · ELEMENT:object.setProperty
  112. L998 _(in `content/helpers/claude-api`)_ `file_name: »fileName«,`  · ASSIGN:identifier
  113. L999 `// ===== PH»ASE 1: Calc«ulate chunk boundaries (work backwards) =====`  · ASSIGN:identifier, ELEMENT:member.length
  114. L980 `const totalTokens = estim»ateTokens(message«s);`  · ASSIGN:identifier
  115. L981 _(in `content/helpers/claude-api`)_ `this.file_name = »file_name«;`  · ASSIGN:identifier
  116. L982 _(in `content/helpers/claude-api`)_ `this.file_size = »file_size«;`  · ASSIGN:identifier
  117. L1262 _(in `content/helpers/claude-api`)_ `if (»input« instanceof ClaudeAttachment && !codeExecutionEnabled) {`  · ASSIGN:identifier
  118. L1228 _(in `content/helpers/claude-api`)_ `const result = await this.conversation.uploadToCodeExecution(blob, »name«);`  · ASSIGN:identifier
  119. L423 _(in `content/helpers/claude-api`)_ `name = »fileName ?? fileOrAttachmentOrBlob.file_name«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  120. L426 _(in `content/helpers/claude-api`)_ `name = »fileName ?? fileOrAttachmentOrBlob.file_name«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  121. L436 _(in `content/helpers/claude-api`)_ `const mimeType = »mime.getType(name) || blob?.type || 'application/octet-stream'«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left
  122. L429 `if (!pe»ndingFork.includeTool«Calls) {`  · ASSIGN:identifier, ASSIGN:logical-left
  123. L442 _(in `content/helpers/claude-api`)_ `formData.append('file', »blob, name«);`  · ASSIGN:identifier
  124. L441 _(in `content/helpers/claude-api`)_ `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  125. L438 _(in `content/helpers/claude-api`)_ `»blob = new Blob([sourceBlob], { type: mimeType })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier
  126. L444 (→L447) `»			loadingModal.setContent(createLoadingContent('Fork complete! Redirecting...'));«`  · ELEMENT:object.setProperty
  127. L1148 `»	content.appendC«hild(indicator);`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  128. L1244 _(in `content/helpers/claude-api`)_ `const result = await this.conversation.uploadToCodeExecution(»input, name«);`  · ASSIGN:identifier
  129. L421 _(in `content/helpers/claude-api`)_ `if (»fileOrAttachmentOrBlob« instanceof ClaudeFile) {`  · ASSIGN:identifier
  130. L424 _(in `content/helpers/claude-api`)_ `} el»se if (fileOrAttachmentOrBlob« instanceof ClaudeAttachment) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  131. L425 _(in `content/helpers/claude-api`)_ `»blob = new Blob([fileOrAttachmentOrBlob.extracted_content], { type: 'text/plain' })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  132. L427 _(in `content/helpers/claude-api`)_ `} else if (»fileOrAttachmentOrBlob« instanceof Blob) {`  · ASSIGN:identifier
  133. L428 _(in `content/helpers/claude-api`)_ `blob = »fileOrAttachmentOrBlob«;`  · ASSIGN:identifier
  134. L435 _(in `content/helpers/claude-api`)_ `if (»!blob || !blob.type || blob.type === 'application/octet-stream'«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-left
  135. L437 _(in `content/helpers/claude-api`)_ `const sourceBlob = »blob ?? await fileOrAttachmentOrBlob.download()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  136. L1249 `const loadingModal = createLoadingModal('Rewriting summary with »Claude...')«;`  · ASSIGN:identifier
  137. L916 `const alternateSender = originalS»ender ==«= 'human' ? 'assistant' : 'human';`  · ASSIGN:identifier
  138. L917 _(in `content/helpers/claude-api`)_ `const blobMime = blob.type && blob.type !== 'application/octet-stream' ? »blob.type« : null;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  139. L923 _(in `content/helpers/claude-api`)_ `if (»blobMime && blobMime !== filenameMime«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  140. L933 _(in `content/helpers/claude-api`)_ `const »typedBlob = new Blob([blob], { type: mimeType })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  141. L937 _(in `content/helpers/claude-api`)_ `console.log(»`[QOL-ClaudeFile] Uploading file "${fileName}" as ${isDirectUpload ? 'direct upload' : 'document conversion'} (MIME: ${mimeType})`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  142. L941 `for (const attJson of attachmentCh»unks[i])« {`  · ASSIGN:identifier
  143. L940 `// Ad»d this chunk's attachment«s as ClaudeAttachment instances`  · ELEMENT:object.setProperty
  144. L957 _(in `content/helpers/claude-api`)_ `formData.append('file', typedBlob, »fileName«);`  · ASSIGN:identifier
  145. L956 _(in `content/helpers/claude-api`)_ `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  146. L943 (→L946) `»				}«`  · ELEMENT:object.setProperty
  147. L959 (→L962) `»				}«`  · ELEMENT:object.setProperty
  148. L1263 `»	// Get chunk for curr«ent summary`  · ASSIGN:identifier, ELEMENT:member-element-container
  149. L1229 _(in `content/helpers/claude-api`)_ `result.extracted_content = »input«;  // Store text content for inline attachment mode`  · ASSIGN:identifier
  150. L454 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(result, this.orgId, this.conversationId);«`  · ELEMENT:object.setProperty
  151. L1264 `const »chunk« = chunks[currentIndex];`  · ASSIGN:identifier
  152. L1269 _(in `content/helpers/claude-api`)_ `if (»input« instanceof ClaudeFile) {`  · ASSIGN:identifier
  153. L1270 `const attach»ments = chunk.fl«atMap(m =>`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  154. L1272 _(in `content/helpers/claude-api`)_ `} else if (»input« instanceof ClaudeAttachment) {`  · ASSIGN:identifier
  155. L1271 `m.files.f»ilter(f => f in«stanceof ClaudeAttachment)`  · ASSIGN:identifier, ELEMENT:member-element
  156. L1273 _(in `content/helpers/claude-api`)_ `»blob = new Blob([input.extracted_content], { type: 'text/plain' })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  157. L1276 `rewriteMe»ssage«.text = `\`\`\``  · ASSIGN:identifier
  158. L1274 `// Build m»essage for rewr«ite`  · ASSIGN:identifier, ELEMENT:member-element
  159. L1277 _(in `content/helpers/claude-api`)_ `blob = await »input.download()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  160. L1275 `const rewriteMessa»ge = new ClaudeMessage(«tempConversation);`  · ASSIGN:identifier, ELEMENT:member-element
  161. L1278 _(in `content/helpers/claude-api`)_ `fileName = »input.file_name«;`  · ASSIGN:identifier, ELEMENT:member-element
  162. L1279 _(in `content/helpers/claude-api`)_ `extractedContent = »input.extracted_content«;  // Preserve text content`  · ASSIGN:identifier, ELEMENT:member-element
  163. L1284 _(in `content/helpers/claude-api`)_ `result = await this.conversation.uploadToCodeExecution(»blob, fileName«);`  · ASSIGN:identifier
  164. L1290 _(in `content/helpers/claude-api`)_ `result = await ClaudeFile.upload(this.conversation.orgId, »blob, fileName«);`  · ASSIGN:identifier
  165. L1285 _(in `content/helpers/claude-api`)_ `if (»extractedContent« !== null) {`  · ASSIGN:identifier, ASSIGN:binary-left
  166. L1286 _(in `content/helpers/claude-api`)_ `result.extracted_content = »extractedContent«;  // Transfer to new file`  · ASSIGN:identifier
  167. L227 (→L234) `»			const keepTokens = Math.ceil(totalTokens * pct / 100);«`  · ELEMENT:object.setProperty
  168. L247 _(in `content/helpers/claude-api`)_ `if (»completionFiles.length <=« MAX_FILES_PER_MESSAGE) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  169. L1374 (→L1416) _(in `content/helpers/claude-api`)_ `for (»const f of this._files) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  170. L1377 _(in `content/helpers/claude-api`)_ `»attachments.push(f.toApiFormat())«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  171. L904 `currentTo»kens += attTok«ens;`  · ELEMENT:member-element-container
  172. L903 (→L912) `»					currentChunk.push(attachment);«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  173. L905 _(in `content/helpers/claude-api`)_ `file_name: »this.file_name«,`  · ELEMENT:member-element-container
  174. L906 _(in `content/helpers/claude-api`)_ `file_kind: »this.file_kind«,`  · ELEMENT:member-element-container
  175. L907 _(in `content/helpers/claude-api`)_ `preview_asset: »this.preview_asset«,`  · ELEMENT:member-element-container
  176. L908 _(in `content/helpers/claude-api`)_ `document_asset: »this.document_asset«,`  · ELEMENT:member-element-container
  177. L909 `attachmentChunks».push(currentChunk);«`  · ELEMENT:member-element-container
  178. L910 _(in `content/helpers/claude-api`)_ `preview_url: »this.preview_url«,`  · ELEMENT:member-element-container
  179. L911 _(in `content/helpers/claude-api`)_ `thumbnail_url: »this.thumbnail_url«`  · ELEMENT:member-element-container
  180. L987 (→L992) `»		}«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  181. L988 _(in `content/helpers/claude-api`)_ `extracted_content: »this.extracted_content«,`  · ELEMENT:member-element-container
  182. L989 `// Create te»mp conversatio«n`  · ELEMENT:member-element-container
  183. L990 `const summar»yConvoName = `«Temp_Summary_${Date.now()}`;`  · ELEMENT:member-element-container
  184. L991 `const summar»yModel = pendi«ngFork.useSelectedModelForSummary ? pendingFork.model : FAST_MODEL;`  · ELEMENT:member-element-container
  185. L1078 `function calc»ulateChunkBoun«daries(messages) {`  · ELEMENT:member-element-container
  186. L1077 (→L1090) `»«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  187. L1079 `const totalT»okens = estima«teTokens(messages);`  · ELEMENT:member-element-container
  188. L1080 _(in `content/helpers/claude-api`)_ `sanitized_name: »this.sanitized_name«,`  · ELEMENT:member-element-container
  189. L1081 `// Sing»le chunk «case`  · ELEMENT:member-element-container
  190. L1082 `if (»totalTokens < 2 * LAST_C«HUNK_SIZE) {`  · ELEMENT:member-element-container, ASSIGN:identifier, ASSIGN:binary-left
  191. L1083 _(in `content/helpers/claude-api`)_ `»file_kind: this.file_kind«,`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  192. L1084 _(in `content/helpers/claude-api`)_ `created_at: »this.created_at«,`  · ELEMENT:member-element-container
  193. L1085 _(in `content/helpers/claude-api`)_ `preview_asset: »this.preview_asset«,`  · ELEMENT:member-element-container
  194. L1086 _(in `content/helpers/claude-api`)_ `document_asset: »this.document_asset«,`  · ELEMENT:member-element-container
  195. L1087 _(in `content/helpers/claude-api`)_ `thumbnail_asset: »this.thumbnail_asset«,`  · ELEMENT:member-element-container
  196. L1088 `// Reserve las»t chunk (greedy,« work from end)`  · ELEMENT:member-element-container
  197. L1089 `let lastChunkCou»nt = takeMessagesF«romEnd(remaining, LAST_CHUNK_SIZE, true);`  · ELEMENT:member-element-container
  198. L1372 _(in `content/helpers/claude-api`)_ `const »attachments = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  199. L1407 _(in `content/helpers/claude-api`)_ `const »apiFormat = f.toApiFormat()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  200. L1418 _(in `content/helpers/claude-api`)_ `»return { files_v2, files_completion, files_history, attachments };«`  · ELEMENT:object.setProperty
  201. L1381 _(in `content/helpers/claude-api`)_ `if (»f.extracted_content !== null«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left
  202. L1369 _(in `content/helpers/claude-api`)_ `const »files_v2 = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  203. L1382 (→L1383) _(in `content/helpers/claude-api`)_ `shouldInline = »f.force_attachment_mode ||«`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right
  204. L1383 _(in `content/helpers/claude-api`)_ `»f.extracted_content.length« <= ATTACHMENT_CHAR_LIMIT;`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  205. L1409 _(in `content/helpers/claude-api`)_ `files_completion.push(»f.file_uuid«);`  · ELEMENT:member-element-container
  206. L1370 _(in `content/helpers/claude-api`)_ `const »files_completion = []«;`  · ELEMENT:object.setProperty
  207. L1412 _(in `content/helpers/claude-api`)_ `if (»f.file_kind« === 'image') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  208. L1396 _(in `content/helpers/claude-api`)_ `const »apiFormat = f.toApiFormat()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  209. L1371 _(in `content/helpers/claude-api`)_ `const »files_history = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  210. L1398 _(in `content/helpers/claude-api`)_ `files_completion.push(»f.file_uuid«);`  · ELEMENT:member-element-container
  211. L1401 _(in `content/helpers/claude-api`)_ `if (»f.file_kind« === 'image') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  212. L1386 _(in `content/helpers/claude-api`)_ `if (»shouldInline«) {`  · ASSIGN:identifier
  213. L1388 (→L1393) _(in `content/helpers/claude-api`)_ `»					attachments.push({«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  214. L1389 _(in `content/helpers/claude-api`)_ `extracted_content: »f.extracted_content«,`  · ELEMENT:member-element-container
  215. L1390 _(in `content/helpers/claude-api`)_ `file_name: »f.file_name«,`  · ELEMENT:member-element-container
  216. L1391 _(in `content/helpers/claude-api`)_ `file_size: »f.extracted_content.length«,`  · ELEMENT:member-element-container, ELEMENT:member.length
  217. L1459 (→L1470) _(in `content/helpers/claude-api`)_ `»		return {«`  · ELEMENT:object.setProperty
  218. L328 `if (pen»dingFork.rawTextPercentage «< 100) {`  · RETURN:json.stringify
  219. L325 (→L329) `»			let phantomsToCarryOver = [];«`  · ELEMENT:object.setProperty
  220. L257 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »completionFiles.length«; i += MAX_FILES_PER_MESSAGE) {`  · ELEMENT:member.length, ASSIGN:binary-right
  221. L256 `if (i»sSyncing) r«eturn;`  · ELEMENT:object.setProperty
  222. L261 _(in `content/helpers/claude-api`)_ `const »lastChunk = chunks[chunks.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  223. L264 `rawTextSlider.input.»addEventListener('i«nput', syncFromSlider);`  · ELEMENT:member.length, ASSIGN:binary-right
  224. L266 _(in `content/helpers/claude-api`)_ `prompt: »`[Forking chat in progress -> Uploading file batch ${i + 1}/${chunks.length} — please reply with "ok" so the next batch can be sent. Context will be in the last batch.]`«,`  · ELEMENT:member.length, ASSIGN:template-literal
  225. L265 (→L276) `»		percentInput.addEventListener('input', syncFromPercent);«`  · ELEMENT:object.setProperty
  226. L273 `const mod»al = new ClaudeModa«l('Choose Model for Fork', content);`  · ELEMENT:member-element-container
  227. L1356 _(in `content/helpers/claude-api`)_ `return »this._files.filter«(f => {`  · ELEMENT:member-element-container
  228. L258 `rawTextSlide»r.setValue(getCurrent«Percent());`  · ELEMENT:member-element-container
  229. L1235 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  230. L1250 `»loadingModal.sho«w();`  · ELEMENT:member-element-container
  231. L1246 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  232. L1231 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  233. L1292 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  234. L348 `if (»tokensToSummarize« < phantomTokens) {`  · ASSIGN:identifier, ASSIGN:binary-left
  235. L985 `createLoadingContent(»`Summarizing conversation...\nCurrent progress: 0 / ${totalTokens.toLocaleString()} tokens`«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
  236. L251 (→L258) `»		updateDisplay();«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  237. L1092 (→L1093) `while (lastChunkCount < »remaining.length &&«`  · ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right
  238. L1093 `»remaining[remaining.length - lastChunkCount].sender« !== 'human') {`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container
  239. L1097 `if (lastChunkCount >= »remaining.length«) {`  · ELEMENT:member.length, ASSIGN:binary-right
  240. L1098 `»return [messages];«  // Everything became last chunk`  · ELEMENT:object.setProperty
  241. L1000 `const »chunks = calculateChunkBoundaries(messages)«;`  · ELEMENT:implicit.add
  242. L1106 `const numFrontChunks = »Math.max(1, Math.round(remainingTokens / MAIN_TARGET_CHUNK))«;`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.round, RETURN:Math.max
  243. L1107 `const targetPerChunk = »Math.ceil(remainingTokens / numFrontChunks)«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.ceil
  244. L1111 `for (let i = 0; i < »numFrontChunks«; i++) {`  · ASSIGN:identifier, ASSIGN:binary-right
  245. L1112 `if (»remaining.length« === 0) break;`  · ELEMENT:member.length, ASSIGN:binary-left
  246. L1137 `»return [...frontChunks, lastChunk];«`  · ELEMENT:object.setProperty
  247. L1115 `? »remaining.length«  // Last front chunk takes everything left`  · ELEMENT:member.length, ASSIGN:conditional-consequent
  248. L1116 `: takeMessagesFromEnd(remaining, »targetPerChunk«, false);`  · ASSIGN:identifier
  249. L1119 `let adjustedTakeCount = »takeCount«;`  · ASSIGN:identifier
  250. L1120 (→L1121) `while (»adjustedTakeCount < remaining.length &&«`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right
  251. L1121 `»remaining[remaining.length - adjustedTakeCount].sender« !== 'human') {`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:member-element-container
  252. L1122 `»adjustedTakeCount++«;`  · ASSIGN:identifier, ASSIGN:update
  253. L1125 `if (»adjustedTakeCount >= remaining.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  254. L1126 `adjustedTakeCount = »remaining.length«;`  · ELEMENT:member.length
  255. L1129 `const chunk = remaining.slice(»-adjustedTakeCount«);`  · ASSIGN:identifier, ASSIGN:unary
  256. L1130 `remaining = remaining.slice(0, »-adjustedTakeCount«);`  · ASSIGN:identifier, ASSIGN:unary
  257. L1110 `const »frontChunks = []«;`  · ELEMENT:object.setProperty
  258. L1005 `for (»const chunk« of chunks) {`  · ITERATE:loop.iteration
  259. L1006 `processedTokens += estimateTokens(»chunk«);`  · ASSIGN:identifier
  260. L1009 `»chunk«,`  · ASSIGN:identifier
  261. L718 `console.log("Generating summary for chunk with", »messages.length«, "messages");`  · ASSIGN:identifier, ELEMENT:member.length
  262. L720 `for (»const msg of messages«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  263. L723 _(in `content/helpers/claude-api`)_ `? Cla»udeConversation.cleanupMessages(messages«, conversation)`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  264. L734 `»msg«.content = newContentArray;`  · ASSIGN:identifier
  265. L743 `const syncSources = »messages.flatMap(m => m.sync_sources || [])«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  266. L725 `console.log("Original text content:", »item.text«);`  · ASSIGN:identifier, ELEMENT:member-element
  267. L732 `newContentArray.push(»item«);`  · ASSIGN:identifier
  268. L722 `const »newContentArray = []«`  · ELEMENT:object.setProperty
  269. L746 `const »summaryMessage = new ClaudeMessage(tempConversation)«;`  · ELEMENT:object.setProperty
  270. L726 `const text = »item.text«;`  · ASSIGN:identifier, ELEMENT:member-element
  271. L728 `»item.text = text.replace("Simply say 'Acknowledged' and wait for user input.", '').trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  272. L757 `for (»const a of attachments«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  273. L758 `summaryMessage.attachFile(»a«);`  · ASSIGN:identifier
  274. L1333 _(in `content/helpers/claude-api`)_ `if (!(»fileObj« instanceof ClaudeFile ||`  · ASSIGN:identifier
  275. L1338 `»	modal.addConfirm('Submi«t', () => {`  · ASSIGN:identifier, ELEMENT:member-element-container
  276. L1340 `»	resolv«e(editedTexts);`  · ASSIGN:identifier
  277. L1342 _(in `content/helpers/claude-api`)_ `return »fileObj«;`  · ASSIGN:identifier
  278. L762 `const »chatlogAtt = ClaudeConversation.buildChatlog(messages, { includeRoleLabels: true })«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  279. L763 `»await summaryMessage.addFile(chatlogAtt.text, chatlogAtt.filename, true)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  280. L766 `for (»const f of files«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  281. L770 `await summaryMessage.addFile(»f«);`  · ASSIGN:identifier
  282. L1015 `createLoadingContent(`Summarizing conversation...\nCurrent progress: ${»processedTokens.toLocaleString()} / ${totalTokens.toLocaleString«()} tokens`)`  · ASSIGN:identifier, ELEMENT:member-element
  283. L350 `const phantomTokensToKeep = phantomTokens - »tokensToSummarize«;`  · ASSIGN:identifier, ASSIGN:binary-right
  284. L351 `const phantomKeepCount = takeMessagesFromEnd(existingPhantoms, »phantomTokensToKeep«, true);`  · ASSIGN:identifier
  285. L353 `console.log(»`Carrying over ${phantomsToCarryOver.length} phantom messages (${phantomTokensToKeep} tokens)`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  286. L383 `} else if (»toKeep.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  287. L377 `if (»toKeep.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #10 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `content/main/forking` L1202:C21 -> L1202:C51  `editWithClaudeBtn».style.backgroundColor = 'hsl(«var(--accent-main-100))';`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L62:C2 -> L62:C55  `»window.postMessage({ type, messageId, ...data }, '*')«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L501:C25 -> L501:C38  `const response = await »fetch(apiUrl)«;`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L78:C1 -> L78:C106  `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`
  - `WEB_LOCAL_STORAGE_REMOVE` — `content/helpers/claude-styles` L31:C2 -> L31:C33  `T»OOLTIP_WRAPPER: 'fixed left-0 t«op-0 min-w-max z-tooltip pointer-events-none',`
  - `WEB_LOCAL_STORAGE_REMOVE` — `content/helpers/claude-styles` L32:C2 -> L32:C33  `T»OOLTIP_CONTENT: 'px-2 rounded-[«6px] bg-[var(--cds-tooltip-bg)] text-[var(--cds-tooltip-fg)] text-[13px]/[18px] shadow-sm dark:shadow-panel-sm inline-flex items-center whitespace-nowrap gap-2 h-6',`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (382 raw steps → 40 distinct lines):
   1. L1202 _(in `content/helpers/claude-styles`)_ `match() { return »!!window.location.pathname.match(/\/claude-code-desktop\/draft_/)«; },`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   2. L1706 _(in `content/helpers/claude-styles`)_ `if (»layout.match()«) { group = layout.group; break; }`  · ELEMENT:implicit.add
   3. L1213 `indica»tor.textContent = `Summary ${currentIndex + 1} of ${summaryTexts.le«ngth}`;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   4. L1229 (→L1230) `update»Navigation();«`  · ASSIGN:binary-left, ASSIGN:logical-left
   5. L1294 _(in `content/helpers/claude-styles`)_ `const isHome = »window.location.pathname === '/new' || window.location.pathname === '/'«;`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   6. L1295 `fo»r (cons«t a of attachments) {`  · ASSIGN:identifier, ASSIGN:unary
   7. L1320 _(in `content/helpers/claude-styles`)_ `const isHome = »window.location.pathname === '/new' || window.location.pathname === '/'«;`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L1321 _(in `content/helpers/claude-styles`)_ `return »isHome && !!document.querySelector('.dframe-pane-header')«;`  · ASSIGN:identifier, ASSIGN:logical-left
   9. L1333 _(in `content/helpers/claude-styles`)_ `return »!!window.location.pathname.match(/\/project\/[a-f0-9-]+/)«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  10. L1851 _(in `content/helpers/claude-api`)_ `const match = »window.location.pathname.match(/\/chat\/([a-f0-9-]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  11. L1852 _(in `content/helpers/claude-api`)_ `return match ? »match[1]« : null;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  12. L66 `getConversationMessages(orgId, »conversationId«, messageUuid)`  · ASSIGN:identifier
  13. L478 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L180 `promptLabel.className »= CLAUDE_CLASS«ES.LABEL;`  · ASSIGN:identifier
  15. L479 _(in `content/helpers/claude-api`)_ `const apiUrl = »`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ASSIGN:template-literal
  16. L68 _(in `content/helpers/claude-api`)_ `if (cache) return await cache.get(»uuid«);`  · ASSIGN:identifier
  17. L70 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('CONV_CACHE_GET', { uuid }, 'CONV_CACHE_RESULT')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  18. L62 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type, messageId, ...data }, '*')«;`  · ELEMENT:object.setProperty, COPY:object-spread
  19. L501 _(in `content/helpers/claude-api`)_ `const response = await fetch(»apiUrl«);`  · ASSIGN:identifier
  20. L76 _(in `content/helpers/claude-api`)_ `if (cache) { await cache.put(»uuid«, updatedAt, data); return; }`  · ASSIGN:identifier
  21. L78 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  22. L491 (→L495) `»		return {«`  · ELEMENT:object.setProperty
  23. L309 `console.log('Forking conversation', »conversationId«, 'from message', messageUuid, 'with model', pendingFork.model);`  · ASSIGN:identifier
  24. L314 `await getConversationMessages(orgId, »conversationId«, messageUuid);`  · ASSIGN:identifier
  25. L321 `const existingPhantoms = await getPhantomMessagesFromMain(»conversationId«);`  · ASSIGN:identifier
  26. L512 `const messagesJson = await getPhantomMessages(»conversationId«) || [];`  · ASSIGN:identifier
  27. L19 _(in `content/main/edit-files`)_ `»<svg xmlns="http://www.w3.org/2000/sv«g" width="20" height="20" fill="none" viewBox="0 0 24 24" class="shrink-0" aria-hidden="true" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" style="color: currentColor;">`  · ASSIGN:identifier, ASSIGN:template-literal
  28. L20 _(in `content/main/edit-files`)_ `»    <path d="M13 2H6a2 2 0 0 0-2 2v1«6a2 2 0 0 0 2 2h9"/>`  · ASSIGN:identifier, ASSIGN:template-literal
  29. L23 _(in `content/helpers/claude-styles`)_ `CHECKB»OX: 'mr-2 rounded border-border-300 accent-accent-main-100',«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  30. L25 `<div class="flex items-center justify»-center transition-all" style="width: «20px; height: 20px;">`  · ASSIGN:identifier
  31. L27 `<path d="»M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.7402«8 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.…`  · ASSIGN:identifier, ASSIGN:template-literal
  32. L37 _(in `content/helpers/claude-api`)_ `return SUPPORTED_LOCALES.includes(navigator.langua»ge) ? navigato«r.language : 'en-US';`  · ASSIGN:identifier
  33. L91 _(in `content/helpers/claude-api`)_ `if (get) return await get(»conversationId«);`  · ASSIGN:identifier
  34. L93 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('PHANTOM_GET', { conversationId }, 'PHANTOM_RESULT')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  35. L30 _(in `content/main/edit-files`)_ `btn.setAttribute('aria-labe»l', 'Advanced «Edit');`  · ASSIGN:identifier
  36. L83 `const leftPanel = docume»nt.createEleme«nt('div');`  · ASSIGN:identifier
  37. L85 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('PHANTOM_STORE', { conversationId, messages }, 'PHANTOM_STORED')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  38. L31 _(in `content/helpers/claude-styles`)_ `TOOLTIP_WRAPPER: 'fixed l»eft-0 «top-0 min-w-max z-tooltip pointer-events-none',`  · ASSIGN:identifier
  39. L32 _(in `content/helpers/claude-styles`)_ `TOOLTIP_CONTENT: 'px-2 ro»unded-«[6px] bg-[var(--cds-tooltip-bg)] text-[var(--cds-tooltip-fg)] text-[13px]/[18px] shadow-sm dark:shadow-panel-sm inline-flex items-center whitespace-nowrap gap-2 h-6',`  · ASSIGN:identifier
  40. L513 `const »conversation = new ClaudeConversation(getOrgId(), conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #11 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L501:C25 -> L501:C38  `const response = await »fetch(apiUrl)«;`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L62:C2 -> L62:C55  `»window.postMessage({ type, messageId, ...data }, '*')«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/main/forking` L444:C25 -> L447:C3 (spans to L447)  `loadingModal.setConten»t(createLoadingContent('Fork complete! Redirecting...'));«`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `content/main/forking` L444:C25 -> L447:C3 (spans to L447)  `loadingModal.setConten»t(createLoadingContent('Fork complete! Redirecting...'));«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L943:C26 -> L946:C5 (spans to L946)  `const response = await »fetch(`/api/${orgId}/upload`, {«`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `content/helpers/claude-api` L943:C26 -> L946:C5 (spans to L946)  `const response = await »fetch(`/api/${orgId}/upload`, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L959:C26 -> L962:C5 (spans to L962)  `const response = await »fetch(`/api/organizations/${orgId}/convert_document`, {«`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `content/helpers/claude-api` L959:C26 -> L962:C5 (spans to L962)  `const response = await »fetch(`/api/organizations/${orgId}/convert_document`, {«`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/main/forking` L325:C26 -> L329:C5 (spans to L329)  `let phantomsToCarryOver» = [];«`  (url-control=PARTIAL)
  - `FETCH_BODY` ([Unknown URL]) — `content/main/forking` L325:C26 -> L329:C5 (spans to L329)  `let phantomsToCarryOver» = [];«`
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L78:C1 -> L78:C106  `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (68073 raw steps → 350 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L66 `getConversationMessages(»orgId«, conversationId, messageUuid)`  · ASSIGN:identifier
   7. L478 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   8. L179 `const promptL»abel «= document.createElement('label');`  · ASSIGN:identifier
   9. L479 _(in `content/helpers/claude-api`)_ `const apiUrl = »`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ASSIGN:template-literal, ELEMENT:member-element-container
  10. L501 _(in `content/helpers/claude-api`)_ `const response = await fetch(»apiUrl«);`  · ASSIGN:identifier
  11. L491 (→L495) `»		return {«`  · ELEMENT:object.setProperty
  12. L314 `await getConversationMessages(»orgId«, conversationId, messageUuid);`  · ASSIGN:identifier
  13. L23 _(in `content/helpers/claude-styles`)_ `CHECKB»OX: 'mr-2 rounded border-border-300 accent-accent-main-100',«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L513 `cons»t conversation = new ClaudeConversation(getOrgId(), conversationId)«;`  · ELEMENT:object.setProperty, ELEMENT:member-element-container, ELEMENT:member-element
  15. L856 `const »conv = conversation || new ClaudeConversation(getOrgId(), null)«;`  · ELEMENT:object.setProperty
  16. L924 `const »chunkMsg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
  17. L1094 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(json, orgId, conversationId);«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  18. L1027 `const timest»amp =« new Date().toISOString();`  · ASSIGN:identifier
  19. L1182 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  20. L1148 `»	content.appendC«hild(indicator);`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  21. L1187 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(a, this.conversation))«;`  · ELEMENT:implicit.add
  22. L1192 _(in `content/helpers/claude-api`)_ `const »existingUuids = new Set(this._files.map(f => f.file_uuid).filter(Boolean))«;`  · ELEMENT:object.setProperty
  23. L1195 `e»ditWithClaudeBtn.style.color = 'hsl(var(--oncolor-100))«';`  · ELEMENT:implicit.add
  24. L857 `const »normalized = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  25. L950 `const »ackMsg = new ClaudeMessage(conv)«;`  · ELEMENT:object.setProperty
  26. L859 (→L963) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  27. L860 `const »msgTokens = estimateTokens([msg])«;`  · ELEMENT:object.setProperty
  28. L649 (→L659) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:identifier
  29. L627 _(in `content/helpers/claude-api`)_ `if (»!message.content || message.content.length === 0«) return '';`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary
  30. L653 `// A»dd attachment content from files« getter (ClaudeAttachments have extracted_content)`  · ELEMENT:member-element-container, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member-element
  31. L654 `for (»const file of msg.files«) {`  · ASSIGN:identifier, ELEMENT:member-element-container, ITERATE:loop.iteration, ELEMENT:member-element
  32. L632 `if (p»riorSummaryC«ount > 0) {`  · ASSIGN:identifier, ELEMENT:member-element
  33. L633 `fullPrompt += `\n»\nIMPORTANT:« I've attached ${priorSummaryCount} previous summary files (summary_chunk_1.txt, summary_chunk_2.txt, etc.) for context. These contain summaries of earlier parts of the conversation. DO NOT re-summarize these summaries - they are only for your understanding of what came before. Only summarize the NEW conversation in chatlog.txt.`;`  · ASSIGN:identifier, ELEMENT:member-element
  34. L629 `let fu»llPrompt = pend«ingFork.summaryPrompt;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  35. L635 _(in `content/helpers/claude-api`)_ `if (»content.input«) {`  · ASSIGN:identifier, ELEMENT:member-element
  36. L636 `// Add file handli»ng instruction based on setti«ngs`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:json.stringify
  37. L638 `full»Prompt += "\n\n«Other attached files will be forwarded to the new chat - don't summarize them, only the conversation itself.";`  · ASSIGN:identifier, ELEMENT:member-element
  38. L640 `fullPrompt += "\n\n»Files will NOT «be forwarded, so include summaries of relevant file contents in your summary.";`  · ASSIGN:identifier, ELEMENT:member-element
  39. L641 _(in `content/helpers/claude-api`)_ `for (»const nestedContent of content.content«) {`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  40. L642 _(in `content/helpers/claude-api`)_ `extractFromContent(»nestedContent«);`  · ASSIGN:identifier
  41. L647 _(in `content/helpers/claude-api`)_ `extractFromContent(»content.content«);`  · ASSIGN:identifier, ELEMENT:member-element
  42. L657 _(in `content/helpers/claude-api`)_ `return »textPieces.join('\n')«;`  · RETURN:array.join
  43. L651 `»totalChars += ClaudeConversation.extractMessageText(msg).length«;`  · ELEMENT:implicit.add, ELEMENT:member.length, ASSIGN:identifier
  44. L661 _(in `content/helpers/claude-api`)_ `const »conv = conversation || new ClaudeConversation(getOrgId(), null)«;`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.ceil, ELEMENT:object.setProperty, ASSIGN:logical-right
  45. L655 `if (»file« instanceof ClaudeAttachment) {`  · ASSIGN:identifier
  46. L656 `totalChars += »file.extracted_content?.length || 0«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left
  47. L863 `const msgAttachments = »msg.files.filter«(f => f instanceof ClaudeAttachment);`  · ELEMENT:member-element-container
  48. L864 `const msgNonAttachments = »msg.files.filter«(f => !(f instanceof ClaudeAttachment));`  · ELEMENT:member-element-container
  49. L866 `if (»msgTokens <= LAST_CHUNK_SIZE || !msgAttachments.length«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left
  50. L913 `console.log(»`Splitting message ${msg.uuid} into ${attachmentChunks.length} chunks.`«);`  · ELEMENT:member-element-container, ASSIGN:template-literal
  51. L915 `const originalSender = »msg.sender«;`  · ELEMENT:member-element-container
  52. L918 `let previousUuid = »msg.parent_message_uuid«;`  · ELEMENT:member-element-container
  53. L962 `console.log(»`Message ${msg.uuid} split into ${attachmentChunks.length} chunks with acknowledgments.`«);`  · ELEMENT:member-element-container, ASSIGN:template-literal
  54. L925 `chunkMsg.uuid = isLast ? »msg.uuid« : crypto.randomUUID();`  · ELEMENT:member-element-container
  55. L926 `chunkMsg.parent_message_uuid = »previousUuid«;`  · ASSIGN:identifier
  56. L927 `chunkMsg.sender = »originalSender«;`  · ASSIGN:identifier
  57. L928 `chunkMsg.created_at = »msg.created_at«;`  · ELEMENT:member-element-container
  58. L932 `»chunkMsg.content = [...msg.content]«;`  · ELEMENT:member-element-container, ELEMENT:array-spread, ELEMENT:object.setProperty
  59. L955 `ackMsg.created_at = »msg.created_at«;`  · ELEMENT:member-element-container
  60. L662 _(in `content/helpers/claude-api`)_ `const »cleaned = [...messages]«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:identifier, ELEMENT:array-spread
  61. L665 _(in `content/helpers/claude-api`)_ `while (i < »cleaned.length«) {`  · ELEMENT:member.length, ASSIGN:binary-right
  62. L666 _(in `content/helpers/claude-api`)_ `const msg = »cleaned[i]«;`  · ELEMENT:member-element-container
  63. L667 _(in `content/helpers/claude-api`)_ `const text = »msg.content?.[0]?.text || ''«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  64. L690 _(in `content/helpers/claude-api`)_ `while (i < »cleaned.length - 1«) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  65. L669 `cons»t msgTokens = estimateTokens([messages[i]])«;`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element-container, ELEMENT:object.setProperty
  66. L691 _(in `content/helpers/claude-api`)_ `const current = »cleaned[i]«;`  · ELEMENT:member-element-container
  67. L692 _(in `content/helpers/claude-api`)_ `const next = »cleaned[i + 1]«;`  · ELEMENT:member-element-container
  68. L694 `const» reversed = messages.slice().r«everse();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right
  69. L698 `function »calculateSplitIndex(messages, rawTextPe«rcentage) {`  · ELEMENT:object.setProperty
  70. L700 `const targetKeepTokens = »Math.ceil(totalTokens * rawTextPercentage / 100)«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, RETURN:Math.ceil
  71. L703 _(in `content/helpers/claude-api`)_ `fillerMessage.c»reated_at = current.created_at || new Date().toISOString()«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member.length, ASSIGN:binary-left
  72. L705 `//» Adj«ust to ensure we cut before a user message`  · ASSIGN:identifier
  73. L724 `i»f (item.type« == 'text') {`  · ASSIGN:conditional-alternate, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  74. L727 `if (»text.includes("Simply say 'Acknowledged' and wait for user input.")«) {`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  75. L733 _(in `content/helpers/claude-api`)_ `const chatlogText = »messageParts.join(separator)«;`  · ELEMENT:member-element-container, RETURN:array.join
  76. L737 (→L739) `const files = »messages.flatMap(m =>«`  · ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  77. L738 `m.files.filte»r(f => f instanceof Claude«File || f instanceof ClaudeCodeExecutionFile)`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  78. L736 `// Extr»act from mes«sages using files getter with instanceof filters`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  79. L740 (→L742) `const attachment»s = messages.flatMap(m =>«`  · RETURN:array.join, ASSIGN:template-literal, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  80. L741 _(in `content/helpers/claude-api`)_ `»return { text: header + '\n' + chatlogText, filename: 'chatlog.txt' };«`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:object.setProperty
  81. L744 _(in `content/helpers/claude-api`)_ `»return { text: chatlogText, filename: 'chatlog.txt' };«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  82. L396 `»forkAttachments = [ClaudeConversation.buildChatlog(messages, { includeHeader: true })]«;`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  83. L702 `let keepCount = takeMessagesFromEnd(messages, »targetKeepTokens«, true);`  · ASSIGN:identifier
  84. L695 `return takeMessagesUpToTokens(reversed, »maxTokens«, greedy);`  · ASSIGN:identifier
  85. L668 `for (let i = 0; i < »messages.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  86. L671 `if (»totalTokens + msgTokens > maxTokens && splitIndex > 0«) {`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:logical-left
  87. L681 `totalTokens += »msgTokens«;`  · ASSIGN:identifier
  88. L676 `totalTokens += »msgTokens«;`  · ASSIGN:identifier
  89. L706 `while (»splitIndex < messages.length && messages[splitIndex].sender !== 'human'«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element
  90. L707 `»splitIndex++«;`  · ASSIGN:identifier, ASSIGN:update
  91. L710 `if (»splitIndex >= messages.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  92. L403 `if (»messages.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  93. L414 (→L426) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  94. L500 (→L507) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  95. L502 `»msg.clearFiles«();`  · ELEMENT:member-element-container
  96. L505 _(in `content/helpers/claude-api`)_ `»return this.conversationData«;`  · ELEMENT:member-element-container
  97. L1346 _(in `content/helpers/claude-api`)_ `this.content = »this.content.filter«(item =>`  · ELEMENT:member-element-container
  98. L406 `»messages = [...existingPhantoms, ...messages]«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  99. L416 `const chatlogFiles = »msg.files.filter«(f =>`  · ELEMENT:member-element-container
  100. L422 _(in `content/helpers/claude-api`)_ `co»nst downloadedBlob = await fileOrAttachmentOrBlob.download()«;`  · ELEMENT:member-element-container, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  101. L430 (→L432) `for (»const msg of messages) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  102. L359 `if (»toSummarize.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  103. L431 `»msg.removeToolCalls«();`  · ELEMENT:member-element-container
  104. L436 _(in `content/helpers/claude-api`)_ `c»onst mimeType = mime.getType(name) || blob?.type || 'application/octet-stream'«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left
  105. L563 `const »conversation = new ClaudeConversation(orgId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  106. L1114 _(in `content/helpers/claude-api`)_ `return ClaudeCodeExecutionFile.fromJSON(apiData, »conversation?.orgId, conversation?.conversationId«);`  · ELEMENT:member-element-container
  107. L1028 _(in `content/helpers/claude-api`)_ `this.conversationId = »conversationId«;`  · ASSIGN:identifier
  108. L533 `await storePhantomMessages(»conversationId«, messages.map(m => m.toHistoryJSON()));`  · ASSIGN:identifier
  109. L83 `const leftPanel = docume»nt.createEleme«nt('div');`  · ASSIGN:identifier
  110. L85 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('PHANTOM_STORE', { conversationId, messages }, 'PHANTOM_STORED')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  111. L62 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type, messageId, ...data }, '*')«;`  · ELEMENT:object.setProperty, COPY:object-spread
  112. L569 `const »forkMessage = new ClaudeMessage(conversation)«;`  · ELEMENT:object.setProperty
  113. L575 (→L577) `for (»const att of forkAttachments) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  114. L576 `»await forkMessage.addFile(att.text, att.filename, true)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  115. L1212 _(in `content/helpers/claude-api`)_ `const codeExecutionEnabled = »this.conversation.accountFeatureSettings?.enabled_monkeys_in_a_barrel« === true;`  · ELEMENT:member-element-container, ASSIGN:binary-left
  116. L1215 _(in `content/helpers/claude-api`)_ `if (»input« instanceof Blob) {`  · ASSIGN:identifier
  117. L1216 _(in `content/helpers/claude-api`)_ `const »isText = await isLikelyTextFile(input)«`  · ASSIGN:identifier, ELEMENT:implicit.add
  118. L1902 _(in `content/helpers/claude-api`)_ `if (»file.type && file.type.startsWith('text/')«) {`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  119. L1907 _(in `content/helpers/claude-api`)_ `const mimeType = mime.getType(»file.name«);`  · ASSIGN:identifier, ELEMENT:member-element
  120. L1095 _(in `content/helpers/claude-styles`)_ `document.body.appendC»hild«(portal);`  · ASSIGN:identifier
  121. L1936 _(in `content/helpers/claude-api`)_ `const slice = »file.slice(0, 1024)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  122. L1937 _(in `content/helpers/claude-api`)_ `const arrayBuffer = await »slice.arrayBuffer()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  123. L1938 _(in `content/helpers/claude-api`)_ `const bytes = »new Uint8Array(arrayBuffer)«;`  · ASSIGN:identifier, INITIAL:Uint8Array.constructor
  124. L1941 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »bytes.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  125. L1942 _(in `content/helpers/claude-api`)_ `if (»bytes[i]« === 0) {`  · ELEMENT:member-element, ASSIGN:binary-left
  126. L1949 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »bytes.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  127. L1950 _(in `content/helpers/claude-api`)_ `const byte = »bytes[i]«;`  · ELEMENT:member-element
  128. L1958 _(in `content/helpers/claude-api`)_ `return (»printableCount / bytes.length«) > 0.9;`  · ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left
  129. L1952 _(in `content/helpers/claude-api`)_ `if (»(byte >= 32 && byte <= 126) || byte === 9 || byte === 10 || byte === 13 || byte >= 128«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  130. L1225 _(in `content/helpers/claude-api`)_ `const name = »filename || 'text.txt'«;`  · ASSIGN:logical-left
  131. L1241 `le»t edi«tPrompt;`  · ASSIGN:identifier
  132. L1218 `leftBtn.style.cursor = lef»tBtn.disable«d ? 'not-allowed' : 'pointer';`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  133. L1226 `tex»tareas[currentIndex]«.style.display = 'none';`  · ASSIGN:identifier
  134. L1242 _(in `content/helpers/claude-api`)_ `const name = »filename || 'file'«;`  · ASSIGN:logical-left
  135. L1257 `f»or (l«et i = 0; i < currentIndex; i++) {`  · ASSIGN:identifier
  136. L1219 _(in `content/helpers/claude-api`)_ `input = »textContent«;`  · ASSIGN:identifier
  137. L1227 _(in `content/helpers/claude-api`)_ `const »blob = new Blob([input], { type: 'text/plain' })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  138. L1234 _(in `content/helpers/claude-api`)_ `const result = ClaudeAttachment.fromText(»input, name«);`  · ASSIGN:identifier
  139. L997 _(in `content/helpers/claude-api`)_ `extracted_content: »text«,`  · ASSIGN:identifier
  140. L996 (→L1001) `»		});«`  · ELEMENT:object.setProperty
  141. L998 _(in `content/helpers/claude-api`)_ `file_name: »fileName«,`  · ASSIGN:identifier
  142. L999 `// ===== PH»ASE 1: Calc«ulate chunk boundaries (work backwards) =====`  · ASSIGN:identifier, ELEMENT:member.length
  143. L980 `const totalTokens = estim»ateTokens(message«s);`  · ASSIGN:identifier
  144. L981 _(in `content/helpers/claude-api`)_ `this.file_name = »file_name«;`  · ASSIGN:identifier
  145. L982 _(in `content/helpers/claude-api`)_ `this.file_size = »file_size«;`  · ASSIGN:identifier
  146. L1243 `ed»itPrompt = await sho«wClaudePrompt('How should Claude edit this summary?', '');`  · ASSIGN:identifier
  147. L1262 _(in `content/helpers/claude-api`)_ `if (»input instanceof ClaudeAttachment && !codeExecutionEnabled«) {`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right
  148. L1228 _(in `content/helpers/claude-api`)_ `const result = await »this.conversation.uploadToCodeExecution(blob, name«);`  · ELEMENT:member-element-container, ASSIGN:identifier
  149. L423 _(in `content/helpers/claude-api`)_ `name = »fileName ?? fileOrAttachmentOrBlob.file_name«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  150. L426 _(in `content/helpers/claude-api`)_ `name = »fileName ?? fileOrAttachmentOrBlob.file_name«;`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right
  151. L429 `if (!pe»ndingFork.includeTool«Calls) {`  · ASSIGN:identifier, ASSIGN:logical-left
  152. L442 _(in `content/helpers/claude-api`)_ `formData.append('file', »blob, name«);`  · ASSIGN:identifier
  153. L441 _(in `content/helpers/claude-api`)_ `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  154. L438 _(in `content/helpers/claude-api`)_ `»blob = new Blob([sourceBlob], { type: mimeType })«;`  · ELEMENT:object.setProperty, ASSIGN:identifier
  155. L445 _(in `content/helpers/claude-api`)_ `»`/api/organizations/${this.orgId}/conversations/${this.conversationId}/wiggle/upload-file`«,`  · ELEMENT:member-element-container, ASSIGN:template-literal
  156. L444 (→L447) `»			loadingModal.setContent(createLoadingContent('Fork complete! Redirecting...'));«`  · ELEMENT:object.setProperty
  157. L454 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(result, this.orgId, this.conversationId);«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  158. L1244 _(in `content/helpers/claude-api`)_ `const result = await »this.conversation.uploadToCodeExecution(input, name«);`  · ELEMENT:member-element-container, ASSIGN:identifier
  159. L421 _(in `content/helpers/claude-api`)_ `if (»fileOrAttachmentOrBlob« instanceof ClaudeFile) {`  · ASSIGN:identifier
  160. L424 _(in `content/helpers/claude-api`)_ `} el»se if (fileOrAttachmentOrBlob« instanceof ClaudeAttachment) {`  · ASSIGN:identifier, ELEMENT:member-element-container
  161. L425 _(in `content/helpers/claude-api`)_ `»blob = new Blob([fileOrAttachmentOrBlob.extracted_content], { type: 'text/plain' })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  162. L427 _(in `content/helpers/claude-api`)_ `} else if (»fileOrAttachmentOrBlob« instanceof Blob) {`  · ASSIGN:identifier
  163. L428 _(in `content/helpers/claude-api`)_ `blob = »fileOrAttachmentOrBlob«;`  · ASSIGN:identifier
  164. L435 _(in `content/helpers/claude-api`)_ `if (»!blob || !blob.type || blob.type === 'application/octet-stream'«) {`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-left
  165. L437 _(in `content/helpers/claude-api`)_ `const sourceBlob = »blob ?? await fileOrAttachmentOrBlob.download()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
  166. L1249 `const loadingModal = createLoadingModal»('Rewriting summary with Claude...')«;`  · ELEMENT:member-element-container, ASSIGN:identifier
  167. L916 `const alternateSender = originalS»ender ==«= 'human' ? 'assistant' : 'human';`  · ASSIGN:identifier
  168. L917 _(in `content/helpers/claude-api`)_ `const blobMime = blob.type && blob.type !== 'application/octet-stream' ? »blob.type« : null;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  169. L923 _(in `content/helpers/claude-api`)_ `if (»blobMime && blobMime !== filenameMime«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  170. L933 _(in `content/helpers/claude-api`)_ `const »typedBlob = new Blob([blob], { type: mimeType })«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  171. L937 _(in `content/helpers/claude-api`)_ `console.log(»`[QOL-ClaudeFile] Uploading file "${fileName}" as ${isDirectUpload ? 'direct upload' : 'document conversion'} (MIME: ${mimeType})`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  172. L941 `for (const attJson of attachmentCh»unks[i])« {`  · ASSIGN:identifier
  173. L940 `// Ad»d this chunk's attachment«s as ClaudeAttachment instances`  · ELEMENT:object.setProperty
  174. L957 _(in `content/helpers/claude-api`)_ `formData.append('file', typedBlob, »fileName«);`  · ASSIGN:identifier
  175. L956 _(in `content/helpers/claude-api`)_ `const »formData = new FormData()«;`  · ELEMENT:object.setProperty
  176. L943 (→L946) _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/${orgId}/upload`, {«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
  177. L959 (→L962) _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${orgId}/convert_document`, {«`  · ASSIGN:identifier, ASSIGN:template-literal, ELEMENT:object.setProperty
  178. L1263 `»	// Get chunk for curr«ent summary`  · ASSIGN:identifier, ELEMENT:member-element-container
  179. L1229 _(in `content/helpers/claude-api`)_ `result.extracted_content = »input«;  // Store text content for inline attachment mode`  · ASSIGN:identifier
  180. L1264 `const »chunk« = chunks[currentIndex];`  · ASSIGN:identifier
  181. L1269 _(in `content/helpers/claude-api`)_ `if (»input« instanceof ClaudeFile) {`  · ASSIGN:identifier
  182. L1270 `const attach»ments = chunk.fl«atMap(m =>`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  183. L1272 _(in `content/helpers/claude-api`)_ `} else if (»input« instanceof ClaudeAttachment) {`  · ASSIGN:identifier
  184. L1271 `m.files.f»ilter(f => f in«stanceof ClaudeAttachment)`  · ASSIGN:identifier, ELEMENT:member-element
  185. L1273 _(in `content/helpers/claude-api`)_ `»blob = new Blob([input.extracted_content], { type: 'text/plain' })«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  186. L1276 `rewriteMe»ssage«.text = `\`\`\``  · ASSIGN:identifier
  187. L1274 `// Build m»essage for rewr«ite`  · ASSIGN:identifier, ELEMENT:member-element
  188. L1277 _(in `content/helpers/claude-api`)_ `blob = await »input.download()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  189. L1275 `const rewriteMessa»ge = new ClaudeMessage(«tempConversation);`  · ASSIGN:identifier, ELEMENT:member-element
  190. L1278 _(in `content/helpers/claude-api`)_ `fileName = »input.file_name«;`  · ASSIGN:identifier, ELEMENT:member-element
  191. L1283 _(in `content/helpers/claude-api`)_ `if (»codeExecutionEnabled«) {`  · ASSIGN:identifier
  192. L1279 _(in `content/helpers/claude-api`)_ `extractedContent = »input.extracted_content«;  // Preserve text content`  · ASSIGN:identifier, ELEMENT:member-element
  193. L1284 _(in `content/helpers/claude-api`)_ `result = await »this.conversation.uploadToCodeExecution(blob, fileName«);`  · ELEMENT:member-element-container, ASSIGN:identifier
  194. L1290 _(in `content/helpers/claude-api`)_ `result = await ClaudeFile.upload(»this.conversation.orgId, blob, fileName«);`  · ELEMENT:member-element-container, ASSIGN:identifier
  195. L1285 _(in `content/helpers/claude-api`)_ `if (»extractedContent« !== null) {`  · ASSIGN:identifier, ASSIGN:binary-left
  196. L1286 _(in `content/helpers/claude-api`)_ `result.extracted_content = »extractedContent«;  // Transfer to new file`  · ASSIGN:identifier
  197. L621 `await »conversation.sendMessageAndWaitForResponse«(forkMessage);`  · ELEMENT:member-element-container
  198. L227 (→L234) `»			const keepTokens = Math.ceil(totalTokens * pct / 100);«`  · ELEMENT:object.setProperty
  199. L247 _(in `content/helpers/claude-api`)_ `if (»completionFiles.length <=« MAX_FILES_PER_MESSAGE) {`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  200. L1374 (→L1416) _(in `content/helpers/claude-api`)_ `for (»const f of this._files) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
  201. L1377 _(in `content/helpers/claude-api`)_ `»attachments.push(f.toApiFormat())«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  202. L904 `currentTo»kens += attTok«ens;`  · ELEMENT:member-element-container
  203. L903 (→L912) `»					currentChunk.push(attachment);«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  204. L905 _(in `content/helpers/claude-api`)_ `file_name: »this.file_name«,`  · ELEMENT:member-element-container
  205. L906 _(in `content/helpers/claude-api`)_ `file_kind: »this.file_kind«,`  · ELEMENT:member-element-container
  206. L907 _(in `content/helpers/claude-api`)_ `preview_asset: »this.preview_asset«,`  · ELEMENT:member-element-container
  207. L908 _(in `content/helpers/claude-api`)_ `document_asset: »this.document_asset«,`  · ELEMENT:member-element-container
  208. L909 `attachmentChunks».push(currentChunk);«`  · ELEMENT:member-element-container
  209. L910 _(in `content/helpers/claude-api`)_ `preview_url: »this.preview_url«,`  · ELEMENT:member-element-container
  210. L911 _(in `content/helpers/claude-api`)_ `thumbnail_url: »this.thumbnail_url«`  · ELEMENT:member-element-container
  211. L987 (→L992) `»		}«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  212. L988 _(in `content/helpers/claude-api`)_ `extracted_content: »this.extracted_content«,`  · ELEMENT:member-element-container
  213. L989 `// Create te»mp conversatio«n`  · ELEMENT:member-element-container
  214. L990 `const summar»yConvoName = `«Temp_Summary_${Date.now()}`;`  · ELEMENT:member-element-container
  215. L991 `const summar»yModel = pendi«ngFork.useSelectedModelForSummary ? pendingFork.model : FAST_MODEL;`  · ELEMENT:member-element-container
  216. L1078 `function calc»ulateChunkBoun«daries(messages) {`  · ELEMENT:member-element-container
  217. L1077 (→L1090) `»«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  218. L1079 `const totalT»okens = estima«teTokens(messages);`  · ELEMENT:member-element-container
  219. L1080 _(in `content/helpers/claude-api`)_ `sanitized_name: »this.sanitized_name«,`  · ELEMENT:member-element-container
  220. L1081 `// Sing»le chunk «case`  · ELEMENT:member-element-container
  221. L1082 `if (»totalTokens < 2 * LAST_C«HUNK_SIZE) {`  · ELEMENT:member-element-container, ASSIGN:identifier, ASSIGN:binary-left
  222. L1083 _(in `content/helpers/claude-api`)_ `»file_kind: this.file_kind«,`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  223. L1084 _(in `content/helpers/claude-api`)_ `created_at: »this.created_at«,`  · ELEMENT:member-element-container
  224. L1085 _(in `content/helpers/claude-api`)_ `preview_asset: »this.preview_asset«,`  · ELEMENT:member-element-container
  225. L1086 _(in `content/helpers/claude-api`)_ `document_asset: »this.document_asset«,`  · ELEMENT:member-element-container
  226. L1087 _(in `content/helpers/claude-api`)_ `thumbnail_asset: »this.thumbnail_asset«,`  · ELEMENT:member-element-container
  227. L1088 `// Reserve las»t chunk (greedy,« work from end)`  · ELEMENT:member-element-container
  228. L1089 `let lastChunkCou»nt = takeMessagesF«romEnd(remaining, LAST_CHUNK_SIZE, true);`  · ELEMENT:member-element-container
  229. L1372 _(in `content/helpers/claude-api`)_ `const »attachments = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  230. L1407 _(in `content/helpers/claude-api`)_ `const »apiFormat = f.toApiFormat()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  231. L1418 _(in `content/helpers/claude-api`)_ `»return { files_v2, files_completion, files_history, attachments };«`  · ELEMENT:object.setProperty
  232. L1381 _(in `content/helpers/claude-api`)_ `if (»f.extracted_content !== null«) {`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-left
  233. L1369 _(in `content/helpers/claude-api`)_ `const »files_v2 = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  234. L1382 (→L1383) _(in `content/helpers/claude-api`)_ `shouldInline = »f.force_attachment_mode ||«`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right
  235. L1383 _(in `content/helpers/claude-api`)_ `»f.extracted_content.length« <= ATTACHMENT_CHAR_LIMIT;`  · ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left
  236. L1409 _(in `content/helpers/claude-api`)_ `files_completion.push(»f.file_uuid«);`  · ELEMENT:member-element-container
  237. L1370 _(in `content/helpers/claude-api`)_ `const »files_completion = []«;`  · ELEMENT:object.setProperty
  238. L1412 _(in `content/helpers/claude-api`)_ `if (»f.file_kind« === 'image') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  239. L1396 _(in `content/helpers/claude-api`)_ `const »apiFormat = f.toApiFormat()«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  240. L1371 _(in `content/helpers/claude-api`)_ `const »files_history = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  241. L1398 _(in `content/helpers/claude-api`)_ `files_completion.push(»f.file_uuid«);`  · ELEMENT:member-element-container
  242. L1401 _(in `content/helpers/claude-api`)_ `if (»f.file_kind« === 'image') {`  · ELEMENT:member-element-container, ASSIGN:binary-left
  243. L1386 _(in `content/helpers/claude-api`)_ `if (»shouldInline«) {`  · ASSIGN:identifier
  244. L1388 (→L1393) _(in `content/helpers/claude-api`)_ `»					attachments.push({«`  · ELEMENT:implicit.add, ELEMENT:object.setProperty
  245. L1389 _(in `content/helpers/claude-api`)_ `extracted_content: »f.extracted_content«,`  · ELEMENT:member-element-container
  246. L1390 _(in `content/helpers/claude-api`)_ `file_name: »f.file_name«,`  · ELEMENT:member-element-container
  247. L1391 _(in `content/helpers/claude-api`)_ `file_size: »f.extracted_content.length«,`  · ELEMENT:member-element-container, ELEMENT:member.length
  248. L1459 (→L1470) _(in `content/helpers/claude-api`)_ `»		return {«`  · ELEMENT:object.setProperty
  249. L240 `const» text = ClaudeConversation.extractMes«sageText(firstKept);`  · ELEMENT:member-element-container
  250. L315 _(in `content/helpers/claude-api`)_ `if (»!this.created«) {`  · ELEMENT:member-element-container, ASSIGN:unary
  251. L325 (→L329) `let phantomsToCarryOver = [];»«`  · ELEMENT:member-element-container, ASSIGN:template-literal, ELEMENT:object.setProperty
  252. L328 `if (pen»dingFork.rawTextPercentage «< 100) {`  · RETURN:json.stringify
  253. L336 `con»st splitIndex« = calculateSplitIndex(messages, pendingFork.rawTextPercentage);`  · ELEMENT:member-element-container, ASSIGN:unary
  254. L391 _(in `content/helpers/claude-api`)_ `messages = await »this.getMessages«(false, true);`  · ELEMENT:member-element-container
  255. L529 _(in `content/helpers/claude-api`)_ `const »data = await this.getData(forceRefresh)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add
  256. L471 `us»eSelectedMode«lForSummary: false`  · ELEMENT:member-element-container, ASSIGN:unary
  257. L475 _(in `content/helpers/claude-api`)_ `if (»this.conversationData && !forceRefresh«) {`  · ELEMENT:member-element-container, ASSIGN:logical-left
  258. L503 _(in `content/helpers/claude-api`)_ `if (»response.status === 404 && this.conversationData«) {`  · ELEMENT:member-element-container, ASSIGN:logical-right
  259. L510 _(in `content/helpers/claude-api`)_ `»this._syncAccountFeatureSettings«();`  · ELEMENT:member-element-container
  260. L459 `console.e»rror('Failed to fork conversati«on:', error);`  · ELEMENT:member-element-container, ELEMENT:member-element
  261. L460 `loa»d«ingModal.setTitle('Error');`  · ASSIGN:identifier
  262. L462 _(in `content/helpers/claude-api`)_ `preview_feature_uses_artifacts: »s.preview_feature_uses_artifacts« === true,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  263. L461 (→L464) `»			loadingModal.setContent(`Failed to fork conversation: ${error.message}`);«`  · ELEMENT:object.setProperty
  264. L463 _(in `content/helpers/claude-api`)_ `enabled_monkeys_in_a_barrel: »s.enabled_monkeys_in_a_barrel« === true,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  265. L514 _(in `content/helpers/claude-api`)_ `_convCachePut(»this.conversationId, this.conversationData.updated_at, this.conversationData«);`  · ELEMENT:member-element-container, ELEMENT:member-element
  266. L76 _(in `content/helpers/claude-api`)_ `if (cache) { await cache.put(»uuid, updatedAt, data«); return; }`  · ASSIGN:identifier
  267. L78 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  268. L517 _(in `content/helpers/claude-api`)_ `return »this.conversationData«;`  · ELEMENT:member-element-container
  269. L530 _(in `content/helpers/claude-api`)_ `const allMessages = »data.chat_messages || []«;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
  270. L537 `const content = document.cr»eateElement('di«v');`  · ELEMENT:member-element-container
  271. L540 `const fileList =» document.createElement('ul');«`  · ASSIGN:identifier, ELEMENT:member-element
  272. L542 _(in `content/helpers/claude-api`)_ `while (»currentId && currentId !== rootId«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  273. L543 `const li = document.createE»lement('l«i');`  · ASSIGN:identifier
  274. L476 `//#region» Convo extraction & O«ther API`  · ELEMENT:member-element-container
  275. L257 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »completionFiles.length«; i += MAX_FILES_PER_MESSAGE) {`  · ELEMENT:member.length, ASSIGN:binary-right
  276. L250 `percent»Input.value = rawTextSlider.input.val«ue;`  · ELEMENT:member-element-container
  277. L256 `if (i»sSyncing) r«eturn;`  · ELEMENT:object.setProperty
  278. L261 _(in `content/helpers/claude-api`)_ `const »lastChunk = chunks[chunks.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ELEMENT:member-element-container
  279. L264 `rawTextSlider.input.»addEventListener('i«nput', syncFromSlider);`  · ELEMENT:member.length, ASSIGN:binary-right
  280. L266 _(in `content/helpers/claude-api`)_ `prompt: »`[Forking chat in progress -> Uploading file batch ${i + 1}/${chunks.length} — please reply with "ok" so the next batch can be sent. Context will be in the last batch.]`«,`  · ELEMENT:member.length, ASSIGN:template-literal
  281. L265 (→L276) `»		percentInput.addEventListener('input', syncFromPercent);«`  · ELEMENT:object.setProperty
  282. L273 `const mod»al = new ClaudeModa«l('Choose Model for Fork', content);`  · ELEMENT:member-element-container
  283. L277 _(in `content/helpers/claude-api`)_ `const fillerAsst = await »this._postCompletionAndAwaitAssistant«(fillerBody);`  · ELEMENT:member-element-container
  284. L285 `pendin»gFork.includeToolCalls = includeToolC«allsToggle.input.checked;`  · ELEMENT:member-element-container
  285. L1356 _(in `content/helpers/claude-api`)_ `return »this._files.filter«(f => {`  · ELEMENT:member-element-container
  286. L258 `rawTextSlide»r.setValue(getCurrent«Percent());`  · ELEMENT:member-element-container
  287. L625 `»return { newUuid: conversation.conversationId, failedFiles };«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  288. L1235 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  289. L1250 `»loadingModal.sho«w();`  · ELEMENT:member-element-container
  290. L1246 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  291. L1231 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  292. L592 `»await forkMessage.addFile(f)«;`  · ELEMENT:implicit.add
  293. L1292 _(in `content/helpers/claude-api`)_ `»this._files.push«(result);`  · ELEMENT:member-element-container
  294. L348 `if (»tokensToSummarize« < phantomTokens) {`  · ASSIGN:identifier, ASSIGN:binary-left
  295. L360 `const summaryMsgs = await chunkAndSummarize(»orgId«, toSummarize);`  · ASSIGN:identifier
  296. L985 `createLoadingContent(»`Summarizing conversation...\nCurrent progress: 0 / ${totalTokens.toLocaleString()} tokens`«)`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal
  297. L251 (→L258) `»		updateDisplay();«`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  298. L992 `const »summaryConv = new ClaudeConversation(orgId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  299. L1092 (→L1093) `while (lastChunkCount < »remaining.length &&«`  · ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right
  300. L1093 `»remaining[remaining.length - lastChunkCount].sender« !== 'human') {`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:member-element-container
  301. L1097 `if (lastChunkCount >= »remaining.length«) {`  · ELEMENT:member.length, ASSIGN:binary-right
  302. L1098 `»return [messages];«  // Everything became last chunk`  · ELEMENT:object.setProperty
  303. L1000 `const »chunks = calculateChunkBoundaries(messages)«;`  · ELEMENT:implicit.add
  304. L1106 `const numFrontChunks = »Math.max(1, Math.round(remainingTokens / MAIN_TARGET_CHUNK))«;`  · ASSIGN:identifier, ASSIGN:binary-left, RETURN:Math.round, RETURN:Math.max
  305. L1107 `const targetPerChunk = »Math.ceil(remainingTokens / numFrontChunks)«;`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, RETURN:Math.ceil
  306. L1111 `for (let i = 0; i < »numFrontChunks«; i++) {`  · ASSIGN:identifier, ASSIGN:binary-right
  307. L1112 `if (»remaining.length« === 0) break;`  · ELEMENT:member.length, ASSIGN:binary-left
  308. L1137 `»return [...frontChunks, lastChunk];«`  · ELEMENT:object.setProperty
  309. L1115 `? »remaining.length«  // Last front chunk takes everything left`  · ELEMENT:member.length, ASSIGN:conditional-consequent
  310. L1116 `: takeMessagesFromEnd(remaining, »targetPerChunk«, false);`  · ASSIGN:identifier
  311. L1119 `let adjustedTakeCount = »takeCount«;`  · ASSIGN:identifier
  312. L1120 (→L1121) `while (»adjustedTakeCount < remaining.length &&«`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:implicit.add, ASSIGN:logical-left, ASSIGN:logical-right
  313. L1121 `»remaining[remaining.length - adjustedTakeCount].sender« !== 'human') {`  · ELEMENT:member.length, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:member-element-container
  314. L1122 `»adjustedTakeCount++«;`  · ASSIGN:identifier, ASSIGN:update
  315. L1125 `if (»adjustedTakeCount >= remaining.length«) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:binary-right
  316. L1126 `adjustedTakeCount = »remaining.length«;`  · ELEMENT:member.length
  317. L1129 `const chunk = remaining.slice(»-adjustedTakeCount«);`  · ASSIGN:identifier, ASSIGN:unary
  318. L1130 `remaining = remaining.slice(0, »-adjustedTakeCount«);`  · ASSIGN:identifier, ASSIGN:unary
  319. L1110 `const »frontChunks = []«;`  · ELEMENT:object.setProperty
  320. L1005 `for (»const chunk« of chunks) {`  · ITERATE:loop.iteration
  321. L1006 `processedTokens += estimateTokens(»chunk«);`  · ASSIGN:identifier
  322. L1009 `»chunk«,`  · ASSIGN:identifier
  323. L718 `console.log("Generating summary for chunk with", »messages.length«, "messages");`  · ASSIGN:identifier, ELEMENT:member.length
  324. L720 `for (»const msg of messages«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  325. L723 _(in `content/helpers/claude-api`)_ `? Cla»udeConversation.cleanupMessages(messages«, conversation)`  · ASSIGN:identifier, ELEMENT:member-element, ITERATE:loop.iteration
  326. L734 `»msg«.content = newContentArray;`  · ASSIGN:identifier
  327. L743 `const syncSources = »messages.flatMap(m => m.sync_sources || [])«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  328. L725 `console.log("Original text content:", »item.text«);`  · ASSIGN:identifier, ELEMENT:member-element
  329. L732 `newContentArray.push(»item«);`  · ASSIGN:identifier
  330. L722 `const »newContentArray = []«`  · ELEMENT:object.setProperty
  331. L746 `const »summaryMessage = new ClaudeMessage(tempConversation)«;`  · ELEMENT:object.setProperty
  332. L726 `const text = »item.text«;`  · ASSIGN:identifier, ELEMENT:member-element
  333. L728 `»item.text = text.replace("Simply say 'Acknowledged' and wait for user input.", '').trim()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  334. L757 `for (»const a of attachments«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  335. L758 `summaryMessage.attachFile(»a«);`  · ASSIGN:identifier
  336. L1333 _(in `content/helpers/claude-api`)_ `if (!(»fileObj« instanceof ClaudeFile ||`  · ASSIGN:identifier
  337. L1338 `»	modal.addConfirm('Submi«t', () => {`  · ASSIGN:identifier, ELEMENT:member-element-container
  338. L1340 `»	resolv«e(editedTexts);`  · ASSIGN:identifier
  339. L1342 _(in `content/helpers/claude-api`)_ `return »fileObj«;`  · ASSIGN:identifier
  340. L762 `const »chatlogAtt = ClaudeConversation.buildChatlog(messages, { includeRoleLabels: true })«;`  · ASSIGN:identifier, ELEMENT:implicit.add
  341. L763 `»await summaryMessage.addFile(chatlogAtt.text, chatlogAtt.filename, true)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container
  342. L766 `for (»const f of files«) {`  · ASSIGN:identifier, ITERATE:loop.iteration
  343. L770 `await summaryMessage.addFile(»f«);`  · ASSIGN:identifier
  344. L1015 `createLoadingContent(`Summarizing conversation...\nCurrent progress: ${»processedTokens.toLocaleString()} / ${totalTokens.toLocaleString«()} tokens`)`  · ASSIGN:identifier, ELEMENT:member-element
  345. L443 `console.log('Forked conversation created:', »newUuid«);`  · ASSIGN:identifier
  346. L350 `const phantomTokensToKeep = phantomTokens - »tokensToSummarize«;`  · ASSIGN:identifier, ASSIGN:binary-right
  347. L351 `const phantomKeepCount = takeMessagesFromEnd(existingPhantoms, »phantomTokensToKeep«, true);`  · ASSIGN:identifier
  348. L353 `console.log(»`Carrying over ${phantomsToCarryOver.length} phantom messages (${phantomTokensToKeep} tokens)`«);`  · ASSIGN:identifier, ASSIGN:template-literal
  349. L383 `} else if (»toKeep.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left
  350. L377 `if (»toKeep.length« > 0) {`  · ELEMENT:member.length, ASSIGN:binary-left

---

## Flow #12 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `content/helpers/claude-api` L1202:C21 -> L1202:C51  `const textBlocks = »this.content.filter(c => c.typ«e === 'text');`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L62:C2 -> L62:C55  `»window.postMessage({ type, messageId, ...data }, '*')«;`
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/main/edit-files` L501:C25 -> L501:C38  `const fileInput = docum»ent.createEle«ment('input');`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` (*) — `content/helpers/claude-api` L78:C1 -> L78:C106  `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (767 raw steps → 30 distinct lines):
   1. L1202 _(in `content/helpers/claude-styles`)_ `match() { return »!!window.location.pathname.match(/\/claude-code-desktop\/draft_/)«; },`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   2. L1706 _(in `content/helpers/claude-styles`)_ `if (»layout.match()«) { group = layout.group; break; }`  · ELEMENT:implicit.add
   3. L1213 _(in `content/helpers/claude-styles`)_ `return »!!window.location.pathname.match(/\/claude-code-desktop\/session_/)«`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
   4. L1229 (→L1230) _(in `content/helpers/claude-api`)_ `result».extracted_content = input;  // Store text content for inline attachment mode«`  · ASSIGN:binary-left, ASSIGN:logical-left
   5. L1294 _(in `content/helpers/claude-styles`)_ `const isHome = »window.location.pathname === '/new' || window.location.pathname === '/'«;`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   6. L1295 _(in `content/helpers/claude-styles`)_ `if (»!isHome«) return false;`  · ASSIGN:identifier, ASSIGN:unary
   7. L1320 _(in `content/helpers/claude-styles`)_ `const isHome = »window.location.pathname === '/new' || window.location.pathname === '/'«;`  · ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   8. L1321 _(in `content/helpers/claude-styles`)_ `return »isHome && !!document.querySelector('.dframe-pane-header')«;`  · ASSIGN:identifier, ASSIGN:logical-left
   9. L1333 _(in `content/helpers/claude-styles`)_ `return »!!window.location.pathname.match(/\/project\/[a-f0-9-]+/)«;`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary
  10. L1851 _(in `content/helpers/claude-api`)_ `const match = »window.location.pathname.match(/\/chat\/([a-f0-9-]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
  11. L1852 _(in `content/helpers/claude-api`)_ `return match ? »match[1]« : null;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
  12. L79 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  13. L180 _(in `content/helpers/claude-api`)_ `this.conversationId = »conversationId«;`  · ASSIGN:identifier
  14. L479 _(in `content/helpers/claude-api`)_ `const apiUrl = »`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ASSIGN:template-literal
  15. L68 _(in `content/helpers/claude-api`)_ `if (cache) return await cache.get(»uuid«);`  · ASSIGN:identifier
  16. L70 _(in `content/helpers/claude-api`)_ `const »result = await _bridgeRequest('CONV_CACHE_GET', { uuid }, 'CONV_CACHE_RESULT')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  17. L62 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type, messageId, ...data }, '*')«;`  · ELEMENT:object.setProperty, COPY:object-spread
  18. L501 `const fileInput = document.cr»eateEl«ement('input');`  · ASSIGN:identifier
  19. L76 _(in `content/helpers/claude-api`)_ `if (cache) { await cache.put(»uuid«, updatedAt, data); return; }`  · ASSIGN:identifier
  20. L78 _(in `content/helpers/claude-api`)_ `»window.postMessage({ type: 'CONV_CACHE_PUT', uuid, updatedAt, data, messageId: ++_bridgeMessageId }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  21. L88 `await createEditModal(orgId, »conversationId«, existingMessage);`  · ASSIGN:identifier
  22. L149 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  23. L151 `»editMessage = new ClaudeMessage(conversation)«;`  · ELEMENT:object.setProperty
  24. L1094 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(json, orgId, conversationId);«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  25. L1028 _(in `content/helpers/claude-api`)_ `this.conversationId = »conversationId«;`  · ASSIGN:identifier
  26. L1182 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  27. L1148 _(in `content/helpers/claude-api`)_ `»this._files = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  28. L1187 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(a, this.conversation))«;`  · ELEMENT:implicit.add
  29. L1192 _(in `content/helpers/claude-api`)_ `const »existingUuids = new Set(this._files.map(f => f.file_uuid).filter(Boolean))«;`  · ELEMENT:object.setProperty
  30. L1195 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add

---

## Flow #13 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/main/edit-files` L501:C25 -> L501:C38  `const fileInput = docum»ent.createEle«ment('input');`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (603 raw steps → 19 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L79 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L179 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
   8. L479 _(in `content/helpers/claude-api`)_ `const apiUrl = »`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ASSIGN:template-literal
   9. L501 `const fileInput = document.cr»eateEl«ement('input');`  · ASSIGN:identifier
  10. L88 `await createEditModal(»orgId«, conversationId, existingMessage);`  · ASSIGN:identifier
  11. L149 `const »conversation = new ClaudeConversation(orgId, conversationId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
  12. L151 `»editMessage = new ClaudeMessage(conversation)«;`  · ELEMENT:object.setProperty
  13. L1094 _(in `content/helpers/claude-api`)_ `»return new ClaudeCodeExecutionFile(json, orgId, conversationId);«`  · ASSIGN:identifier, ELEMENT:object.setProperty
  14. L1027 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
  15. L1182 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add
  16. L1148 _(in `content/helpers/claude-api`)_ `»this._files = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  17. L1187 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(a, this.conversation))«;`  · ELEMENT:implicit.add
  18. L1192 _(in `content/helpers/claude-api`)_ `const »existingUuids = new Set(this._files.map(f => f.file_uuid).filter(Boolean))«;`  · ELEMENT:object.setProperty
  19. L1195 _(in `content/helpers/claude-api`)_ `»this.attachFile(parseFileFromAPI(f, this.conversation))«;`  · ELEMENT:implicit.add

---

## Flow #14 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content/main/file-download` L316:C6 -> L316:C16  `if (»currentUrl« !== lastUrl && currentUrl.includes('/project/')) {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1517:C26 -> L1517:C94  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1528:C25 -> L1528:C99  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}/syncs`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1537:C25 -> L1537:C98  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}/docs`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1547:C25 -> L1547:C99  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}/files`)«;`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (159 raw steps → 17 distinct lines):
   1. L316 `if (»currentUrl !== lastUrl && currentUrl.includes('/project/')«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right
   2. L318 `lastUrl = »currentUrl«;`  · ASSIGN:identifier
   3. L13 `const match = »url.match(/\/project\/([a-f0-9-]+)/)«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   4. L14 `if (»!match«) {`  · ASSIGN:identifier, ASSIGN:unary
   5. L19 `const projectId = »match[1]«;`  · ASSIGN:identifier, ELEMENT:member-element
   6. L22 `»return { orgId, projectId };«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L203 `const »urlData = parseProjectUrl(window.location.href)«;`  · ELEMENT:implicit.add
   8. L214 `const »project = new ClaudeProject(urlData.orgId, urlData.projectId)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ELEMENT:object.setProperty
   9. L1507 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
  10. L1508 _(in `content/helpers/claude-api`)_ `this.projectId = »projectId«;`  · ASSIGN:identifier
  11. L1517 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}`«);`  · ASSIGN:template-literal
  12. L1528 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}/syncs`«);`  · ASSIGN:template-literal
  13. L1537 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}/docs`«);`  · ASSIGN:template-literal
  14. L1547 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}/files`«);`  · ASSIGN:template-literal
  15. L327 `if (»window.location.href.includes('/project/')«) {`  · ELEMENT:member-element, RETURN:fallback-return
  16. L52 `const »urlData = parseProjectUrl(window.location.href)«;`  · ELEMENT:implicit.add
  17. L55 `const »project = new ClaudeProject(urlData.orgId, urlData.projectId)«;`  · ELEMENT:member-element-container, ELEMENT:implicit.add, ELEMENT:object.setProperty

---

## Flow #15 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1517:C26 -> L1517:C94  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1528:C25 -> L1528:C99  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}/syncs`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1537:C25 -> L1537:C98  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}/docs`)«;`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L1547:C25 -> L1547:C99  `const response = await »fetch(`/api/organizations/${this.orgId}/projects/${this.projectId}/files`)«;`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (299 raw steps → 16 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L22 `»return { orgId, projectId };«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L203 `const »urlData = parseProjectUrl(window.location.href)«;`  · ELEMENT:implicit.add
   8. L214 `const »project = new ClaudeProject(urlData.orgId, urlData.projectId)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty
   9. L1507 _(in `content/helpers/claude-api`)_ `this.orgId = »orgId«;`  · ASSIGN:identifier
  10. L1508 _(in `content/helpers/claude-api`)_ `this.projectId = »projectId«;`  · ASSIGN:identifier
  11. L1517 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}`«);`  · ASSIGN:template-literal
  12. L1528 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}/syncs`«);`  · ASSIGN:template-literal
  13. L1537 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}/docs`«);`  · ASSIGN:template-literal
  14. L1547 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/projects/${this.projectId}/files`«);`  · ASSIGN:template-literal
  15. L52 `const »urlData = parseProjectUrl(window.location.href)«;`  · ELEMENT:implicit.add
  16. L55 `const »project = new ClaudeProject(urlData.orgId, urlData.projectId)«;`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:object.setProperty

---

## Flow #16 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content/helpers/claude-api` L1840:C17 -> L1840:C38  `const cookies = »document.cookie.split«(';');`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L325:C26 -> L329:C5 (spans to L329)  `const response = await »fetch(`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}/completion`, {«`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L501:C25 -> L501:C38  `const response = await »fetch(apiUrl)«;`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/helpers/claude-api` L615:C25 -> L617:C4 (spans to L617)  `const response = await »fetch(`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}`, {«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (170 raw steps → 11 distinct lines):
   1. L1840 _(in `content/helpers/claude-api`)_ `const »cookies = document.cookie.split(';')«;`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty
   2. L1841 (→L1846) _(in `content/helpers/claude-api`)_ `for (»const cookie of cookies) {«`  · ELEMENT:implicit.add, ITERATE:loop.iteration
   3. L1842 _(in `content/helpers/claude-api`)_ `const [»name, value] = cookie.trim().split('=')«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1]
   4. L1843 _(in `content/helpers/claude-api`)_ `if (»name« === 'lastActiveOrg') {`  · ASSIGN:identifier, ASSIGN:binary-left
   5. L1844 _(in `content/helpers/claude-api`)_ `return »value«;`  · ASSIGN:identifier
   6. L165 `const »conversation = new ClaudeConversation(orgId)«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   7. L179 `requestId:» requ«estId,`  · ASSIGN:identifier
   8. L325 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}/completion`«, {`  · ASSIGN:template-literal
   9. L479 _(in `content/helpers/claude-api`)_ `const apiUrl = »`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}?tree=true&rendering_mode=messages&render_all_tools=true&skip_uuid_injection=true&consistency=strong`«;`  · ASSIGN:template-literal
  10. L501 _(in `content/helpers/claude-api`)_ `const response = await fetch(»apiUrl«);`  · ASSIGN:identifier
  11. L615 _(in `content/helpers/claude-api`)_ `const response = await fetch(»`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}`«, {`  · ASSIGN:template-literal

---

## Flow #17 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content/main/tts-interceptor` L160:C6 -> L160:C21  `if (»event.data.type« === 'tts-analyze-dialogue-request') {`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `content/helpers/claude-api` L325:C26 -> L329:C5 (spans to L329)  `const response = await »fetch(`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}/completion`, {«`
  - `WINDOW_POSTMESSAGE` (*) — `content/main/tts-interceptor` L177:C4 -> L182:C11 (spans to L182)  `»window.postMessage({«`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (227 raw steps → 36 distinct lines):
   1. L160 `if (»event.data.type« === 'tts-analyze-dialogue-request') {`  · ELEMENT:member-element, ASSIGN:binary-left
   2. L161 `const { »prompt, requestId« } = event.data;`  · ELEMENT:destructure-property[prompt], ELEMENT:destructure-property[requestId]
   3. L168 `const response = await conversation.sendMessageAndWaitForResponse(»prompt«, { model: FAST_MODEL });`  · ASSIGN:identifier
   4. L218 _(in `content/helpers/claude-api`)_ `if (!(»promptOrMessage« instanceof ClaudeMessage)) {`  · ASSIGN:identifier
   5. L243 _(in `content/helpers/claude-api`)_ `const msg = »promptOrMessage«;`  · ASSIGN:identifier
   6. L228 _(in `content/helpers/claude-api`)_ `prompt: »promptOrMessage«,`  · ASSIGN:identifier
   7. L227 (→L234) _(in `content/helpers/claude-api`)_ `»			const requestBody = {«`  · ELEMENT:object.setProperty
   8. L244 _(in `content/helpers/claude-api`)_ `const completionFiles = »msg._getCompletionFiles()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
   9. L247 _(in `content/helpers/claude-api`)_ `if (»completionFiles.length« <= MAX_FILES_PER_MESSAGE) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left
  10. L248 _(in `content/helpers/claude-api`)_ `const requestBody = »msg.toCompletionJSON()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  11. L328 _(in `content/helpers/claude-api`)_ `body: »JSON.stringify(requestBody)«`  · RETURN:json.stringify, ASSIGN:identifier
  12. L325 (→L329) _(in `content/helpers/claude-api`)_ `»			const response = await fetch(`/api/organizations/${this.orgId}/chat_conversations/${this.conversationId}/completion`, {«`  · ELEMENT:object.setProperty
  13. L249 _(in `content/helpers/claude-api`)_ `if (options.model) »requestBody«.model = options.model;`  · ASSIGN:identifier
  14. L257 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »completionFiles.length«; i += MAX_FILES_PER_MESSAGE) {`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right
  15. L250 _(in `content/helpers/claude-api`)_ `return this._postCompletionAndAwaitAssistant(»requestBody«);`  · ASSIGN:identifier
  16. L258 _(in `content/helpers/claude-api`)_ `chunks.push(»completionFiles.slice(i, i + MAX_FILES_PER_MESSAGE)«);`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  17. L256 _(in `content/helpers/claude-api`)_ `const »chunks = []«;`  · ELEMENT:object.setProperty, ELEMENT:implicit.add
  18. L261 _(in `content/helpers/claude-api`)_ `const lastChunk = »chunks[chunks.length - 1]«;`  · ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container
  19. L263 _(in `content/helpers/claude-api`)_ `let parentUuid = »msg.parent_message_uuid«;`  · ASSIGN:identifier, ELEMENT:member-element
  20. L264 _(in `content/helpers/claude-api`)_ `for (let i = 0; i < »fillerChunks.length«; i++) {`  · ELEMENT:member.length, ASSIGN:binary-right
  21. L266 _(in `content/helpers/claude-api`)_ `prompt: »`[Forking chat in progress -> Uploading file batch ${i + 1}/${chunks.length} — please reply with "ok" so the next batch can be sent. Context will be in the last batch.]`«,`  · ELEMENT:member.length, ASSIGN:template-literal
  22. L265 (→L276) _(in `content/helpers/claude-api`)_ `»			const fillerBody = {«`  · ELEMENT:object.setProperty
  23. L267 _(in `content/helpers/claude-api`)_ `parent_message_uuid: »parentUuid«,`  · ASSIGN:identifier
  24. L268 _(in `content/helpers/claude-api`)_ `timezone: »msg.timezone«,`  · ASSIGN:identifier, ELEMENT:member-element
  25. L269 _(in `content/helpers/claude-api`)_ `locale: »msg.locale«,`  · ASSIGN:identifier, ELEMENT:member-element
  26. L270 _(in `content/helpers/claude-api`)_ `model: »options.model ?? msg.model«,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right
  27. L271 _(in `content/helpers/claude-api`)_ `tools: »msg.tools«,`  · ASSIGN:identifier, ELEMENT:member-element
  28. L273 _(in `content/helpers/claude-api`)_ `files: »fillerChunks[i].map(f => f.file_uuid)«,`  · ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  29. L275 _(in `content/helpers/claude-api`)_ `rendering_mode: »msg.rendering_mode«`  · ASSIGN:identifier, ELEMENT:member-element
  30. L281 _(in `content/helpers/claude-api`)_ `const finalBody = »msg.toCompletionJSON()«;`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return
  31. L282 _(in `content/helpers/claude-api`)_ `»finalBody.parent_message_uuid = parentUuid«;`  · ASSIGN:identifier
  32. L283 _(in `content/helpers/claude-api`)_ `»finalBody«.files = lastChunk.map(f => f.file_uuid);`  · ASSIGN:identifier
  33. L284 _(in `content/helpers/claude-api`)_ `if (options.model) »finalBody«.model = options.model;`  · ASSIGN:identifier
  34. L285 _(in `content/helpers/claude-api`)_ `return this._postCompletionAndAwaitAssistant(»finalBody«);`  · ASSIGN:identifier
  35. L179 `requestId: »requestId«,`  · ASSIGN:identifier
  36. L177 (→L182) `»				window.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #18 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `content/helpers/claude-api` L1851:C15 -> L1851:C45  `const match = »window.location.pathname.match«(/\/chat\/([a-f0-9-]+)/);`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content/main/tts-ws-interceptor` L100:C4 -> L100:C108  `»window.postMessage({ type: 'TTS_SYNTH_REQUEST', requestId: this._requestId, text, conversationId }, '*')«;`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (7 raw steps → 3 distinct lines):
   1. L1851 _(in `content/helpers/claude-api`)_ `const match = »window.location.pathname.match(/\/chat\/([a-f0-9-]+)/)«;`  · ELEMENT:member-element, RETURN:fallback-return
   2. L1852 _(in `content/helpers/claude-api`)_ `return match ? »match[1]« : null;`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent
   3. L100 `»window.postMessage({ type: 'TTS_SYNTH_REQUEST', requestId: this._requestId, text, conversationId }, '*')«;`  · ASSIGN:identifier, ELEMENT:object.setProperty

---
