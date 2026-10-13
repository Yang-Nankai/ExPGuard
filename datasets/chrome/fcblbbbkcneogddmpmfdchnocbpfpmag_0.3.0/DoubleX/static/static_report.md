# ExPAgent Static Verification — fcblbbbkcneogddmpmfdchnocbpfpmag v0.3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L141
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L171

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the reported source?**
The report claims a `WINDOW_MESSAGE_EVENT` source at `background.js:141` in the background/service-worker frame. There is no `background.js` in the unpacked extension; the MV3 background is `worker.js` (a service worker), which has no `window` and no `window.addEventListener('message', ...)`. A project-wide search found no window `message` listener anywhere. Therefore the reported `WINDOW_MESSAGE_EVENT` source does not exist and is not attacker-controllable through the reported mechanism.

**(b) Source-to-sink path**
The only external-ish message inputs are:

- `worker.js:142` — `chrome.runtime.onConnectExternal.addListener(eport => eport.onMessage.addListener(request => ...))`
- `worker.js:199` — `chrome.runtime.onMessageExternal.addListener(...)`
- `context.js:214` — `chrome.runtime.onMessage.addListener(...)` (internal extension messaging only)

Within `worker.js`, a real branch does write request-derived data:

```js
else if (request.cmd === 'set-level') {
  chrome.storage.local.set({
    level: request.level,
    aggressive: request.aggressive || false
  });
}
```

So a *latent* `request.level`/`request.aggressi

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
