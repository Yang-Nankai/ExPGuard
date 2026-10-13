# ExPAgent Static Verification — nnkbmmkimbjddlcjhakcjcjjmcgghpmp v2.0.17

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.15, scope=0.096
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/service-worker.js-B6n9e7uU` [BG_1] @ L1:C3146 -> L1:C3153
- **Sink**: `CHROME_LOCAL_STORAGE` in `assets/service-worker.js-B6n9e7uU` [BG_1] @ L1:C3110 -> L1:C3278
- **Severity evidence**: ['https://*.askgo.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `chrome.storage.local.set({app_token})`

### 1. Source controllability — TRUE
The source is `chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) { ... "setToken"===request.action ? chrome.storage.local.set({app_token: request.token}, ...) ... })`. `request.token` is a message field chosen entirely by the external caller. The only gate is `request.action === "setToken"`, which is itself an attacker-chosen field — trivially satisfiable, not an authentication boundary.

### 2. Source → sink path — UNBROKEN
There is no message/storage hop and no intermediate transform. The propagation is direct: the tainted span `request.token` is embedded verbatim as the value of the `app_token` key in the object passed to `chrome.storage.local.set`. The sink context confirms the same expression: `"setToken"===request.action?(chrome.storage.local.set({app_token:request.token}, ...)`. This is a genuine data flow into a storage-write sink, not a boolean gate over a constant.

### 3. Security-relevant argument — TRUE
`chrome.storage.*` is a CRITICAL privilege API because it writes persistent extension state t

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
