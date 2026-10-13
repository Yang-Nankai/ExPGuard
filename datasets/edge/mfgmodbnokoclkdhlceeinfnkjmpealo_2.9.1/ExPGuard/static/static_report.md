# ExPAgent Static Verification — mfgmodbnokoclkdhlceeinfnkjmpealo v2.9.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.612, scope=0.703
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-script` [CS_1] @ L1:C177 -> L1:C188
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C1195 -> L1:C1257
- **Bridge**: message `runtime.single.sender.message[content-script->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Flow ID #1 — STORAGE_POSOING (attacker → chrome.storage.local.set)**

### 1. Source control
The source is a `window.addEventListener("message", ...)` listener in `content-script.js`, injected into every page via `<all_urls>`. Any webpage can dispatch an arbitrary `MessageEvent` to that listener. The listener is not guarded by `event.origin`, `event.source`, or any sender authentication.

The harness snippet only showed the `GET_STATUS` branch, but the raw source confirms the relevant `ACTIVATE` branch:

```js
"edflexSearch@ACTIVATE" === e.data.type &&
  $browser.runtime.sendMessage({ type: "ACTIVATE", payload: e.data.payload })
```

So the page fully controls `e.data.payload.clientId`, `secretKey`, and `baseUrl`.

### 2. Source → sink path
- Page → `window.postMessage({ type: "edflexSearch@ACTIVATE", payload: {...} })`
- `content-script.js` listener checks `e.data.type === "edflexSearch@ACTIVATE"` (attacker-satisfiable) and forwards `payload: e.data.payload` via `runtime.sendMessage`
- `background.js` `runtime.onMessage` listener checks `e.type === RequestType.ACTIVATE`, destructures `{ clientId, secretKey, baseUrl } = e.payload`, and executes:

```js
r && t

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-script` [CS_1] @ L1:C177 -> L1:C188
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C1195 -> L1:C1257
- **Bridge**: message `runtime.single.sender.message[content-script->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Flow ID #1 — STORAGE_POSOING (attacker → chrome.storage.local.set)**
...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-script` [CS_1] @ L1:C177 -> L1:C188
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C1195 -> L1:C1257
- **Bridge**: message `runtime.single.sender.message[content-script->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Flow ID #1 — STORAGE_POSOING (attacker → chrome.storage.local.set)**
...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
