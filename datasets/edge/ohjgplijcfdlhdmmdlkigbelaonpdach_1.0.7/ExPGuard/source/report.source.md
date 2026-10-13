# Source-level Taint Flow — ohjgplijcfdlhdmmdlkigbelaonpdach 1.0.7

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 4  (collapsed from 58 raw issue entries)
- Sinkless sources skipped: 32 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_CUSTOM_EVENT (window.addEventListener(better-xiaoheihe-ai-settings-save))

- **Source**: `WINDOW_CUSTOM_EVENT` — `src/ai-bridge` L450:C62 -> L450:C74  `const nextSettings = normalizeAiSettings(parseEventDetail(»event.detail«));`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-settings) — `src/ai-bridge` L238:C6 -> L238:C38  `»chrome.storage.local.set(values)«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (128 raw steps → 20 distinct lines):
   1. L450 `const »nextSettings = normalizeAiSettings(parseEventDetail(event.detail))«;`  · ELEMENT:member-element, ELEMENT:implicit.add
   2. L246 `return »detail || {}«;`  · ASSIGN:identifier, ASSIGN:logical-left
   3. L250 `return »JSON.parse(detail)« || {};`  · ASSIGN:identifier, RETURN:json.parse
   4. L95 `const provider = normalizeProvider(»settings?.provider || settings?.endpointMode«);`  · ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
   5. L87 `return Object.values(AI_PROVIDERS).includes(provider) ? »provider« : DEFAULT_AI_PROVIDER;`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   6. L97 `enabled: »settings?.enabled« !== false,`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L96 (→L106) `»    return {«`  · ELEMENT:object.setProperty
   8. L98 `»provider«,`  · ASSIGN:identifier
   9. L99 `endpointMode: »provider«,`  · ASSIGN:identifier
  10. L100 `baseUrl: normalizeBaseUrl(»settings?.baseUrl, provider«),`  · ELEMENT:member-element-container, ASSIGN:identifier
  11. L91 `return String(»baseUrl || AI_PROVIDER_DEFAULT_BASE_URLS[provider] || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  12. L101 `model: String(»settings?.model || ""«).trim(),`  · ELEMENT:member-element-container, ASSIGN:logical-left
  13. L102 `apiKey: String(»settings?.apiKey || ""«),`  · ELEMENT:member-element-container, ASSIGN:logical-left
  14. L103 `allowEmoji: »settings?.allowEmoji« !== false,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L104 `autoPopup: »settings?.autoPopup« !== false,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L105 `summaryPrompt: String(»settings?.summaryPrompt || ""«).trim() || DEFAULT_SUMMARY_PROMPT`  · ELEMENT:member-element-container, ASSIGN:logical-left
  17. L263 (→L275) `»    window.dispatchEvent(new CustomEvent(AI_SETTINGS_EVENT, {«`  · ELEMENT:object.setProperty
  18. L257 `return »JSON.stringify(detail || {})«;`  · RETURN:json.stringify
  19. L452 (→L454) `»    writeStorageLocalSafely({«`  · ELEMENT:object.setProperty
  20. L341 (→L351) `»    sendRuntimeMessageSafely({«`  · ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(better-xiaoheihe-ai-bot-runtime-request))

- **Source**: `WINDOW_CUSTOM_EVENT` — `src/background` L3702:C2 -> L3766:C4 (spans to L3766)  `»chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `src/background` L781:C27 -> L781:C46  `const response = await »fetch(url, options)«;`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `src/background` L781:C27 -> L781:C46  `const response = await »fetch(url, options)«;`
  - `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) — `src/background` L370:C6 -> L386:C17 (spans to L386)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1206 raw steps → 42 distinct lines):
   1. L3702 (→L3766) `»  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[src/ai-bridge->src/background]`
   2. L3707 `}, »message.detail?.settings«).then(sendResponse);`  · ELEMENT:member-element
   3. L948 `const settings = overrideSettings ? normalizeAiSettings(»overrideSettings«) : await readAiSettings();`  · ASSIGN:identifier
   4. L95 `const provider = normalizeProvider(»settings?.provider || settings?.endpointMode«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
   5. L87 `return Object.values(AI_PROVIDERS).includes(provider) ? »provider« : DEFAULT_AI_PROVIDER;`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   6. L97 `enabled: »settings?.enabled« !== false,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
   7. L96 (→L106) `»    return {«`  · ELEMENT:object.setProperty
   8. L98 `»provider«,`  · ASSIGN:identifier
   9. L99 `endpointMode: »provider«,`  · ASSIGN:identifier
  10. L100 `baseUrl: normalizeBaseUrl(»settings?.baseUrl, provider«),`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  11. L91 `return String(»baseUrl || AI_PROVIDER_DEFAULT_BASE_URLS[provider] || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  12. L101 `model: String(»settings?.model || ""«).trim(),`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  13. L102 `apiKey: String(»settings?.apiKey || ""«),`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  14. L103 `allowEmoji: »settings?.allowEmoji« !== false,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  15. L104 `autoPopup: »settings?.autoPopup« !== false,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  16. L105 `summaryPrompt: String(»settings?.summaryPrompt || ""«).trim() || DEFAULT_SUMMARY_PROMPT`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  17. L949 `if (»!settings.enabled || !settings.baseUrl || !settings.model«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  18. L960 `const content = await requesters[»settings.provider«](settings, detail);`  · ELEMENT:member-element-container
  19. L846 (→L854) `const data = await fetchJson(buildOpenAiChatUrl(»settings.baseUrl), {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  20. L733 `return /\/chat\/completions$/i.test(baseUrl) ? »baseUrl : buildProviderUrl(baseUrl«, "chat/completions");`  · ASSIGN:identifier, ASSIGN:conditional-consequent
  21. L727 `const normalizedBaseUrl = String(»baseUrl || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  22. L757 `if (»settings.apiKey«) {`  · ELEMENT:member-element-container
  23. L850 `model: »settings.model«,`  · ELEMENT:member-element-container
  24. L849 (→L853) `»      body: JSON.stringify({«`  · RETURN:json.stringify
  25. L781 `const response = await fetch(»url«, options);`  · ASSIGN:identifier
  26. L3712 `listModels(»message.detail?.settings«).then(sendResponse);`  · ELEMENT:member-element
  27. L1024 `const settings = normalizeAiSettings(»overrideSettings || await readAiSettings()«);`  · ASSIGN:identifier, ASSIGN:logical-left
  28. L335 `return »`${normalized.provider}:${normalized.baseUrl}`«;`  · ASSIGN:template-literal
  29. L370 (→L386) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  30. L3717 `getCachedModelList(»message.detail?.settings«).then(sendResponse);`  · ELEMENT:member-element
  31. L353 `const provider = normalizeAiSettings(»settings«).provider;`  · ASSIGN:identifier
  32. L354 `const exactCache = cache[getModelCacheKey(»settings«)];`  · ASSIGN:identifier
  33. L334 `const normalized = normalizeAiSettings(»settings«);`  · ASSIGN:identifier
  34. L355 `const providerCache = cache[getProviderModelCacheKey(»settings«)];`  · ASSIGN:identifier
  35. L339 `return normalizeAiSettings(»settings«).provider;`  · ASSIGN:identifier
  36. L3726 `»...message.detail?.settings«,`  · ELEMENT:member-element, COPY:object-spread
  37. L851 `messages: Array.isArray(detail?.messages) ? »detail.messages« : [],`  · ELEMENT:member-element, ASSIGN:conditional-consequent
  38. L790 `return Number.isFinite(detail?.temperature) ? »detail.temperature« : 0.2;`  · ELEMENT:member-element, ASSIGN:conditional-consequent
  39. L357 `.filter((item) => item?.provider === »provider«)`  · ASSIGN:identifier, ASSIGN:binary-right
  40. L3628 `const id = String(»detail.id || ""«);`  · ELEMENT:member-element, ASSIGN:logical-left
  41. L3633 `const cookieHeader = String(»detail.cookieHeader || ""«);`  · ELEMENT:member-element, ASSIGN:logical-left
  42. L3645 `const id = String(»detail.id || ""«);`  · ELEMENT:member-element, ASSIGN:logical-left

---

## Flow #3 — WINDOW_CUSTOM_EVENT (From storage.local.set('better-xiaoheihe-ai-model-cache') in src/background)  ·  18× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `src/background` L3702:C2 -> L3766:C4 (spans to L3766)  `»chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {«`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) — `src/background` L370:C6 -> L386:C17 (spans to L386)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1303 raw steps → 48 distinct lines):
   1. L3702 (→L3766) `»  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[src/ai-bridge->src/background]`
   2. L3707 `}, »message.detail?.settings«).then(sendResponse);`  · ELEMENT:member-element
   3. L948 `const settings = overrideSettings ? normalizeAiSettings(»overrideSettings«) : await readAiSettings();`  · ASSIGN:identifier
   4. L95 `const provider = normalizeProvider(»settings?.provider || settings?.endpointMode«);`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container
   5. L87 `return Object.values(AI_PROVIDERS).includes(provider) ? »provider« : DEFAULT_AI_PROVIDER;`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   6. L97 `enabled: »settings?.enabled« !== false,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
   7. L96 (→L106) `»    return {«`  · ELEMENT:object.setProperty
   8. L98 `»provider«,`  · ASSIGN:identifier
   9. L99 `endpointMode: »provider«,`  · ASSIGN:identifier
  10. L100 `baseUrl: normalizeBaseUrl(»settings?.baseUrl, provider«),`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  11. L91 `return String(»baseUrl || AI_PROVIDER_DEFAULT_BASE_URLS[provider] || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  12. L101 `model: String(»settings?.model || ""«).trim(),`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  13. L102 `apiKey: String(»settings?.apiKey || ""«),`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  14. L103 `allowEmoji: »settings?.allowEmoji« !== false,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  15. L104 `autoPopup: »settings?.autoPopup« !== false,`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:member-element-container
  16. L105 `summaryPrompt: String(»settings?.summaryPrompt || ""«).trim() || DEFAULT_SUMMARY_PROMPT`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:member-element-container
  17. L949 `if (»!settings.enabled || !settings.baseUrl || !settings.model«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  18. L960 `const content = await requesters[»settings.provider«](settings, detail);`  · ELEMENT:member-element-container
  19. L846 (→L854) `const data = await fetchJson(buildOpenAiChatUrl(»settings.baseUrl), {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  20. L733 `return /\/chat\/completions$/i.test(baseUrl) ? »baseUrl : buildProviderUrl(baseUrl«, "chat/completions");`  · ASSIGN:identifier, ASSIGN:conditional-consequent
  21. L727 `const normalizedBaseUrl = String(»baseUrl || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  22. L757 `if (»settings.apiKey«) {`  · ELEMENT:member-element-container
  23. L850 `model: »settings.model«,`  · ELEMENT:member-element-container
  24. L849 (→L853) `»      body: JSON.stringify({«`  · RETURN:json.stringify
  25. L781 `const response = await fetch(»url«, options);`  · ASSIGN:identifier
  26. L3712 `listModels(»message.detail?.settings«).then(sendResponse);`  · ELEMENT:member-element
  27. L1024 `const settings = normalizeAiSettings(»overrideSettings || await readAiSettings()«);`  · ASSIGN:identifier, ASSIGN:logical-left
  28. L335 `return »`${normalized.provider}:${normalized.baseUrl}`«;`  · ASSIGN:template-literal
  29. L370 (→L386) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
  30. L3717 `getCachedModelList(»message.detail?.settings«).then(sendResponse);`  · ELEMENT:member-element
  31. L353 `const provider = normalizeAiSettings(»settings«).provider;`  · ASSIGN:identifier
  32. L354 `const exactCache = »cache[getModelCacheKey(settings)]«;`  · ASSIGN:identifier, ELEMENT:member-element-container
  33. L334 `const normalized = normalizeAiSettings(»settings«);`  · ASSIGN:identifier
  34. L355 `const providerCache = »cache[getProviderModelCacheKey(settings)]«;`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member-element-container
  35. L339 `return normalizeAiSettings(»settings«).provider;`  · ASSIGN:identifier
  36. L3726 `»...message.detail?.settings«,`  · ELEMENT:member-element, COPY:object-spread
  37. L851 `messages: Array.isArray(detail?.messages) ? »detail.messages« : [],`  · ELEMENT:member-element, ASSIGN:conditional-consequent
  38. L790 `return Number.isFinite(detail?.temperature) ? »detail.temperature« : 0.2;`  · ELEMENT:member-element, ASSIGN:conditional-consequent
  39. L357 `.filter((item) => item?.provider === »provider«)`  · ASSIGN:identifier, ASSIGN:binary-right
  40. L3628 `const id = String(»detail.id || ""«);`  · ELEMENT:member-element, ASSIGN:logical-left
  41. L3633 `const cookieHeader = String(»detail.cookieHeader || ""«);`  · ELEMENT:member-element, ASSIGN:logical-left
  42. L3645 `const id = String(»detail.id || ""«);`  · ELEMENT:member-element, ASSIGN:logical-left
  43. L344 (→L347) `»      chrome.storage.local.get(AI_MODEL_CACHE_STORAGE_KEY, (result) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: better-xiaoheihe-ai-model-cache, sender: src/background, receiver: src/background]
  44. L346 `resolve(cache && typeof cache === "object" ? »cache« : {});`  · ASSIGN:identifier, ASSIGN:conditional-consequent
  45. L361 `models: normalizeModelList(»(exactCache || providerCache || legacyProviderCache)?.models«)`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element, ELEMENT:member-element-container
  46. L327 (→L329) `return [...new Set((Array.isArray(models) ? »models : [])«`  · ASSIGN:identifier, ASSIGN:conditional-consequent, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return
  47. L372 `»...cache«,`  · COPY:object-spread
  48. L356 (→L358) `»    const legacyProviderCache = Object.values(cache)«`  · ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member-element-container

---

## Flow #4 — WINDOW_CUSTOM_EVENT (From storage.local.set('better-xiaoheihe-ai-settings') in src/ai-bridge)  ·  38× duplicate paths collapsed

- **Source**: `WINDOW_CUSTOM_EVENT` — `src/content/layout-style` L450:C62 -> L450:C74  `.${HOME_LAYOUT_CLASS} .${HEADER_MORE_MENU_PANEL_CLASS} >» button:hove«r {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `src/background` L781:C27 -> L781:C46  `const response = await »fetch(url, options)«;`  (url-control=FULL)
  - `CHROME_LOCAL_STORAGE` (better-xiaoheihe-ai-model-cache) — `src/background` L370:C6 -> L386:C17 (spans to L386)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2663 raw steps → 33 distinct lines):
   1. L450 _(in `src/content/layout-style`)_ `.${H»OME_LAYOUT_CLASS} .${HEADER_MORE_MENU_PANEL_CLASS} > button:hover «{`  · ELEMENT:member-element, ELEMENT:implicit.add
   2. L246 `level»: ["error", «"warn", "success"].includes(level) ? level : "info",`  · ASSIGN:identifier, ASSIGN:logical-left
   3. L250 `...curr»entLogs.filter((it«em) => !item?.skipped && Number(item?.timestamp || 0) >= now - AI_BOT_LOG_RETENTION_MS)`  · ASSIGN:identifier, RETURN:json.parse
   4. L95 `const provider = normalizeProvider(»settings?.provider || settings?.endpointMode«);`  · ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right
   5. L87 `return Object.values(AI_PROVIDERS).includes(provider) ? »provider« : DEFAULT_AI_PROVIDER;`  · ASSIGN:identifier, ASSIGN:conditional-consequent
   6. L97 `enabled: »settings?.enabled« !== false,`  · ELEMENT:member-element-container, ASSIGN:binary-left
   7. L96 (→L106) `»    return {«`  · ELEMENT:object.setProperty
   8. L98 `»provider«,`  · ASSIGN:identifier
   9. L99 `endpointMode: »provider«,`  · ASSIGN:identifier
  10. L100 `baseUrl: normalizeBaseUrl(»settings?.baseUrl, provider«),`  · ELEMENT:member-element-container, ASSIGN:identifier
  11. L91 `return String(»baseUrl || AI_PROVIDER_DEFAULT_BASE_URLS[provider] || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  12. L101 `model: String(»settings?.model || ""«).trim(),`  · ELEMENT:member-element-container, ASSIGN:logical-left
  13. L102 `apiKey: String(»settings?.apiKey || ""«),`  · ELEMENT:member-element-container, ASSIGN:logical-left
  14. L103 `allowEmoji: »settings?.allowEmoji« !== false,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  15. L104 `autoPopup: »settings?.autoPopup« !== false,`  · ELEMENT:member-element-container, ASSIGN:binary-left
  16. L105 `summaryPrompt: String(»settings?.summaryPrompt || ""«).trim() || DEFAULT_SUMMARY_PROMPT`  · ELEMENT:member-element-container, ASSIGN:logical-left
  17. L263 (→L275) `»        id: `${now}-${Math.random().toString(16).slice(2)}`,«`  · ELEMENT:object.setProperty
  18. L257 `const r»esult = await storageGet(AI_«BOT_MESSAGE_LOGS_STORAGE_KEY);`  · RETURN:json.stringify
  19. L452 (→L454) `»    }«`  · ELEMENT:object.setProperty
  20. L341 (→L351) `»«`  · ELEMENT:object.setProperty
  21. L746 (→L748) `»      chrome.storage.local.get(AI_SETTINGS_STORAGE_KEY, (result) => {«`  · STORAGE:STORAGE_FLOW[area: local, key: better-xiaoheihe-ai-settings, sender: src/ai-bridge, receiver: src/background]
  22. L948 `const settings = overrideSettings ? normalizeAiSettings(overrideSettings) : »await readAiSettings()«;`  · ASSIGN:conditional-alternate
  23. L949 `if (»!settings.enabled || !settings.baseUrl || !settings.model«) {`  · ELEMENT:member-element-container, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right
  24. L960 `const content = await requesters[»settings.provider«](settings, detail);`  · ELEMENT:member-element-container
  25. L846 (→L854) `const data = await fetchJson(buildOpenAiChatUrl(»settings.baseUrl), {«`  · ELEMENT:member-element-container, ELEMENT:object.setProperty
  26. L733 `return /\/chat\/completions$/i.test(baseUrl) ? »baseUrl : buildProviderUrl(baseUrl«, "chat/completions");`  · ASSIGN:identifier, ASSIGN:conditional-consequent
  27. L727 `const normalizedBaseUrl = String(»baseUrl || ""«).trim().replace(/\/+$/, "");`  · ASSIGN:identifier, ASSIGN:logical-left
  28. L757 `if (»settings.apiKey«) {`  · ELEMENT:member-element-container
  29. L850 `model: »settings.model«,`  · ELEMENT:member-element-container
  30. L849 (→L853) `»      body: JSON.stringify({«`  · RETURN:json.stringify
  31. L781 `const response = await fetch(»url«, options);`  · ASSIGN:identifier
  32. L335 `return »`${normalized.provider}:${normalized.baseUrl}`«;`  · ASSIGN:template-literal
  33. L370 (→L386) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty

---
