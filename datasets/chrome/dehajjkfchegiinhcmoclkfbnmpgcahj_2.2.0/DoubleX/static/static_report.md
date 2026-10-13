# ExPAgent Static Verification — dehajjkfchegiinhcmoclkfbnmpgcahj v2.2.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L125
- **Sink**: `FETCH_RESOURCE` in `background.js` [BG_1] @ L239
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source control (who controls the source)
The report points to a `WINDOW_MESSAGE_EVENT` listener in `content_scripts.js` at L125. That file does **not exist** in the unpacked extension (`list_files` shows no `content_scripts.js`). The only page-message listener in a content script is `version.js` L123–127:

```js
window.addEventListener('message', function(event) {
    if (event.source == window && event.data && event.data.type == 'relayFromIframeBridge') {
        chrome.runtime.sendMessage(event.data);
    }
})
```

A page on the content-script host (`docentedu.com`, `insertlearning.com`, `okeebo.com`) can forge a `window.postMessage` with arbitrary `event.data`. `event.source == window` and the message *field* `event.data.type` are attacker-satisfiable (harness browserFacts). So **the source is genuinely page-controllable** — but only for messages whose `type === 'relayFromIframeBridge'`.

### 2. Source-to-sink path
The forwarded `event.data` is sent via `chrome.runtime.sendMessage` and received by `background.js` `onMessage` (around L204). The background handler is a chain of `else if` branches:

- `request.type == 'relayFromIframeBridge'` → `chr

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
