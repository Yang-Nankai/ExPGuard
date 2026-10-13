# ExPAgent Static Verification — gcoekeoenehjmndhkdnoomdjeaclkhbe v0.0.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L37
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L80
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow 0 (STORAGE_POISONING)

### Mapping report names → actual files
The report references `content_scripts.js` and `background.js`, which do not exist in the unpacked extension. The actual files are:
- `scripts/classroom/content.js` (the only content script, per manifest)
- `scripts/service-worker.js` (the MV3 background service worker)

### (a) Source control — CONFIRMED attacker-controllable
`scripts/classroom/content.js` L30–44 registers `window.addEventListener('message', activeIframeEventHandler)`. The handler at L31 only checks attacker-satisfiable message fields:

```js
if (ev.data && ev.data.type === 'nearpodMessage' && ev.data.action_type === actionTypes.MY_LIBRARY_EXTENSION_LESSON_LAUNCHED_SUCCESS)
```

There is **no `event.origin` / `event.source` check**. The content script runs on `https://classroom.google.com/*`, so the page (or the injected `nearpod.com` iframe) can `postMessage` a crafted `ev.data.payload.{assignmentTitle, assignmentMaterial}` and the listener will accept it. Source is genuinely untrusted.

### (b) Path / bridge
The bridge itself connects correctly:
- Content script: `chrome.runtime.sendMessage({ type: messageTypes.CREATE_ASSIGNMENT

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L37
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L91
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow 0 (STORAGE_POISONING)

### Mapping report names → actual files
The repo...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
