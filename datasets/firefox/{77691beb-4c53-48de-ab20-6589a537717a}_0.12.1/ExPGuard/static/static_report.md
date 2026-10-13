# ExPAgent Static Verification — {77691beb-4c53-48de-ab20-6589a537717a} v0.12.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.106, scope=0.113
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `inject` [CS_1] @ L18:C10 -> L18:C47
- **Sink**: `FETCH_RESOURCE` in `index` [BG_1] @ L1:C37278 -> L1:C37290
- **Bridge**: message `runtime.single.sender.message[inject->index]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — Frame Companion `media_blob` request forgery

### (a) Who controls the source
The source is a page-level `window` message listener in the content script `inject.js`:

```js
window.addEventListener('message', event => {
  if (event.source === window && event.data && event.data.type === 'eth:send')
    chrome.runtime.sendMessage(event.data.payload)
})
```

This content script runs at `document_start`, all frames, on `file://*/*`, `http://*/*`, `https://*/*`. Any page on those schemes can execute:

```js
window.postMessage({type: 'eth:send', payload: {...}}, '*')
```

`event.source === window` and the `type === 'eth:send'` field are attacker-satisfiable, not authentication. The page fully controls `event.data.payload`, which is forwarded verbatim to the background service worker via `chrome.runtime.sendMessage`.

### (b) Source-to-sink path
The propagation evidence shows the bridge:

`inject.js` `WINDOW_MESSAGE_EVENT` → `chrome.runtime.sendMessage(event.data.payload)` → background `index.js` `chrome.runtime.onMessage.addListener(...)`.

Inspected `index.js` confirms the listener destructures the message and uses attacker-controlled fields directly:

```js
chrome

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
