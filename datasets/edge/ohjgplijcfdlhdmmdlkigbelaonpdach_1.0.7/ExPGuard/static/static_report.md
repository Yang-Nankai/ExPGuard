# ExPAgent Static Verification — ohjgplijcfdlhdmmdlkigbelaonpdach v1.0.7

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 4
- Coverage: node=0.5, scope=0.475
- Flow types: {'STORAGE_POSOING': 4, 'REQUEST_FORGERY': 3}  |  Severities: {'MEDIUM': 7}

**Assessment:** Verified 4 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `src/ai-bridge` [CS_1] @ L459:C104 -> L459:C116
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L370:C6 -> L386:C17
- **Bridge**: message `runtime.single.sender.message[src/ai-bridge->src/background]`
- **Severity evidence**: ['https://www.xiaoheihe.cn/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (STORAGE_POSOING: `better-xiaoheihe-ai-bot-runtime-request` → `chrome.storage.local.set`)

### (a) Who controls the source?
The source is `window.addEventListener(AI_BOT_RUNTIME_REQUEST_EVENT, …)` in the content script `src/ai-bridge.js` (L459, `world: ISOLATED`, matches `https://www.xiaoheihe.cn/*`). `AI_BOT_RUNTIME_REQUEST_EVENT` is the fixed string `"better-xiaoheihe-ai-bot-runtime-request"` (L47). A page script on a matching xiaoheihe.cn URL can dispatch this `CustomEvent` on the shared DOM `window`; the isolated-world listener receives it. `parseEventDetail` (L244–254) accepts a raw object or JSON string, so `event.detail` is fully page-controlled.

### (b) Exact source → sink path
Confirmed by raw source:

1. `src/ai-bridge.js:459` → `requestAiBotRuntime(parseEventDetail(event.detail))`.
2. `requestAiBotRuntime` (L373–391) does **not** constrain the action:
   ```js
   const type = String(detail?.type || "");
   ...
   sendRuntimeMessageSafely({ type, detail: detail?.detail || {} }, ...)
   ```
   The page controls both the message `type` and `detail`. This is the `runtime.single.sender.message[src/ai-bridge->src/background]` HOP.
3. `src/background

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `src/ai-bridge` [CS_1] @ L3702:C2 -> L3766:C4
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L370:C6 -> L386:C17
- **Bridge**: message `runtime.single.sender.message[src/ai-bridge->src/background]`, storage `STORAGE_FLOW[area: local, key: better-xiaoheihe-ai-model-cache, sender: src/background, receiver: src/background]`
- **Severity evidence**: ['https://www.xiaoheihe.cn/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The propagation report confirms the storage path: step 26 (`listModels(message.detail?.settings)`) → step 27 (`normalizeAiSettings`) → step 28 (`getModelCacheKey` template `${provider}:${baseUrl}`) → step 29 (`chrome.storage.local.set`). This matches my direct source inspection exactly.

Final assessment:

- **Source is untrusted**: a MAIN-world page script on `https://www.xiaoheihe.cn/*` can forge `better-xiaoheihe-ai-model-list-request`; `ai-bridge.js` has no `event.source`/origin check and `parseEventDetail` accepts arbitrary objects.
- **Path is unbroken**: page CustomEvent → `requestModelList` → `chrome.runtime.sendMessage` → background `onMessage` (sender ignored) → `listModels` → `writeModelListCache` → `chrome.storage.local.set`.
- **Attacker-controlled sink argument**: `baseUrl` (only trimmed, no scheme/host validation) is stored both as a value field and inside the cache key. `provider` is allow-listed but `baseUrl` is not.
- **No effective guard/trust boundary**: no sender.id/origin allowlist, no fixed-action allowlist, no baseUrl validation.

This is a real page→extension-storage privilege crossing.

VERDICT: TRUE_POSITIVE

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `src/ai-bridge` [CS_1] @ L450:C62 -> L450:C74
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/background` [BG_1] @ L370:C6 -> L386:C17
- **Bridge**: storage `STORAGE_FLOW[area: local, key: better-xiaoheihe-ai-settings, sender: src/ai-bridge, receiver: src/background]`
- **Severity evidence**: ['https://www.xiaoheihe.cn/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #6 (STORAGE_POSOING, attacker-input-storage-write)

### 1. Source control — confirmed attacker-controlled

The source is `src/ai-bridge.js` L448–455:

```js
window.addEventListener(AI_SETTINGS_SAVE_EVENT, (event) => {
  const nextSettings = normalizeAiSettings(parseEventDetail(event.detail)); // L450
  dispatchSettings(nextSettings);
  writeStorageLocalSafely({ [AI_SETTINGS_STORAGE_KEY]: nextSettings });    // L452-454
});
```

`AI_SETTINGS_SAVE_EVENT` is `"better-xiaoheihe-ai-settings-save"` and there is **no `event.source` / `event.origin` / action allow-list** check. The content script runs on `https://www.xiaoheihe.cn/*` (`document_start`, isolated world), so page code on that host (or XSS on it) can dispatch the CustomEvent with arbitrary `detail`.

`parseEventDetail` (L244–254) returns the object or `JSON.parse` result, so `event.detail.baseUrl`, `provider`, `model`, etc. are fully page-controlled.

### 2. Source → sink path — connected (with one modeling nuance)

The report's storagePassing hop is real at the settings-write level:

- Page dispatches `better-xiaoheihe-ai-settings-save` → content script writes `chrome.storage.local` key `better-xiaoheih

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.00)

- **Source**: `WINDOW_CUSTOM_EVENT` in `src/ai-bridge` [CS_1] @ L459:C104 -> L459:C116
- **Sink**: `FETCH_RESOURCE` in `src/background` [BG_1] @ L781:C27 -> L781:C46
- **Bridge**: message `runtime.single.sender.message[src/ai-bridge->src/background]`
- **Severity evidence**: ['https://www.xiaoheihe.cn/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
