# ExPAgent Static Verification — debflmkfmkejgppfabgfcbemelmnpnho v2.0.16

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L852
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L169

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Four-part decision ledger

**(a) Who controls the source?**
An external web page. The actual source in the shipped code is the `chrome.runtime.onMessageExternal.addListener((t,e,r)=>{...})` listener in `service-worker.js` (the manifest's background service worker). `externally_connectable.matches` is `["https://www.viitor.info/*"]`, so a page on `https://www.viitor.info` can send `chrome.runtime.sendMessage(<extensionId>, msg)` and reach this handler. The flow's reported file is `background.js` and the harness could not resolve it, but `service-worker.js` is the real background file and contains the matching web-accessible message listener with parameter `t`.

**(b) Exact source-to-sink path.**
No intermediate hop is required. In the same minified line of `service-worker.js`:

```js
chrome.runtime.onMessageExternal.addListener((t,e,r)=>{
  ...
  if(t?.type===o.loginSuccess && t.data &&
     (chrome.storage.local.set({[A.user]:t.data}), O(t.data), ...))
```

`o.loginSuccess === "LOGIN_SUCCESS"` and `A.user === "vf_user"`. The external message object `t` flows directly to `chrome.storage.local.set`, storing `t.data` under key `vf_user`.

**(c) Security-relevant argument.**
The ent

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L852
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L887

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Four-part decision ledger

**(a) Who controls the source?**
An external web page. The actu...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
