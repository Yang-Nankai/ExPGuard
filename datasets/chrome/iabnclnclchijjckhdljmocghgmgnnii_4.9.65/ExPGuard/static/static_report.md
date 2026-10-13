# ExPAgent Static Verification — iabnclnclchijjckhdljmocghgmgnnii v4.9.65

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.854, scope=0.882
- Flow types: {'STORAGE_POSOING': 2, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1, 'UNKNOWN': 2}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L5404:C10 -> L5404:C17
- **Sink**: `CHROME_RUNTIME_ONCONNECTEXTERNAL_POSTMESSAGE` in `background` [BG_1] @ L5378:C8 -> L5378:C38
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 55, 'distinctLines': 18, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: source-report id #2

### (a) Who controls the source

`chrome.runtime.onMessageExternal.addListener` at `background.js:5399` receives messages from web pages that are permitted by `externally_connectable.matches: ["https://appbox.space/*"]`.

The handler guards with:

```js
sender.url && sender.url.includes('appbox.space')
```

This is **not** a fixed `sender.id` allowlist. `sender.url` is browser-supplied but originates from the web origin; the guard is effectively satisfied by any page on `appbox.space`, and it is reachable from there via XSS/subdomain or page compromise. The message fields themselves — `message.source`, `message.action`, `message.data.key`, `message.data.value` — are entirely attacker-controlled.

### (b) Source-to-sink path

The source-level report traces the unbroken path:

1. `L5404` `if (message.source === 'supabase-auth-adapter')`
2. `L5405` `switch (message.action)`
3. `L5429` `const { key, value } = message.data;`
4. `L5430` `chrome.storage.sync.set({ [key]: value }, () => {`
5. `L5437-L5443` `notifyConnectedClients({ type: 'storage_update', key, value, ... })`
6. `L5378` `port.postMessage(notification)`

I inspected `background.js:5

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L5404:C10 -> L5404:C17
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L5430:C14 -> L5445:C16
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 55, 'distinctLines': 18, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — STORAGE_POSOING via `onMessageExternal`

### 1. Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)` in `background.js` (L5399). The incoming `message` object is fully attacker-controlled.

The manifest sets `externally_connectable.matches: ["https://appbox.space/*"]`, so any page running on `appbox.space` can send an external message. That is a *restricted* but not *closed* surface: per the audit rules, a web-origin restriction remains exploitable via any XSS/content-control on that origin (or subdomain compromise). There is **no** fixed `sender.id` extension allowlist; the only sender check is:

```js
sender.url && sender.url.includes('appbox.space')
```

This is a substring check over `sender.url`. With `externally_connectable` already limited to `https://appbox.space/*`, this adds no unforgeable trust boundary — and even standalone it is not browser-authenticated.

### 2. Source-to-sink path
The report evidence and raw source agree exactly:

1. L5404 `if (message.source === 'supabase-auth-adapter')` — attacker-controlled field, trivially satisfiable.
2. L5405 `switch (message.a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.00)

- **Source**: `STORAGE_ALL_ITEMS` in `background` [BG_1] @ L2775:C13 -> L2775:C22
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L2998:C6 -> L3014:C7
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 10785, 'distinctLines': 253, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
