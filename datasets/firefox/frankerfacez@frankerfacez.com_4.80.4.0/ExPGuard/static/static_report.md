# ExPAgent Static Verification — frankerfacez@frankerfacez.com v4.80.4.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `web/script.min` [CS_1] @ L1:C657 -> L1:C755
- **Sink**: `WINDOW_POSTMESSAGE` in `web/script.min` [CS_1] @ L1:C685 -> L1:C753
- **Bridge**: message `runtime.connect.sender.message[web/worker->web/script.min]`
- **Severity evidence**: ['*://*.twitch.tv/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`EXTERNAL_MESSAGE`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

### 1. Source control
The source is `chrome.runtime.onConnectExternal` in the background worker (`web/worker.js`), reachable because `externally_connectable.matches` includes `*://*.twitch.tv/*` and `*://*.youtube.com/*`. A page on those origins can call `chrome.runtime.connect(extensionId)` and send arbitrary messages. So the message data `n` is page-controlled. ✔ (source is genuinely untrusted input)

### 2. Data path
The report shows one HOP: `runtime.connect.sender.message[web/worker->web/script.min]` — the background sends the externally-received message down to the content script's `ffz-cs-bridge` port. The content-script anchor confirms:

```js
t = e.runtime.connect({name:"ffz-cs-bridge"});
t.onMessage.addListener(n => {
  window.postMessage({ffz_from_worker:!0, ...n}, window.location.origin)
})
```

The path is real: external page → background `onConnectExternal.onMessage` → content script port → `window.postMessage`. ✔

### 3. Sink privilege
The sink is **`window.postMessage(..., window.location.origin)`** from a content script. This posts a message back to the page's own origin (`window.location.origin` in a content script resolves to the host page origin

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
