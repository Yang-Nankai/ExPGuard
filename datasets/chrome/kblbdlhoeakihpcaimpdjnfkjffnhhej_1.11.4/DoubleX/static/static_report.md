# ExPAgent Static Verification — kblbdlhoeakihpcaimpdjnfkjffnhhej v1.11.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L647
- **Sink**: `CHROME_SESSION_STORAGE` in `background.js` [BG_1] @ L782

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source — ATTACKER, with origin restriction.**
The actual source is `chrome.runtime.onConnectExternal.addListener(...)` → `port.onMessage.addListener(async (t, r) => ...)`. The message object `t` is fully attacker-controlled. The browser only enforces `externally_connectable.matches` (`*://localhost/*`, `https://*.pointspath.com/*`), which restricts *which origin* may connect but does **not** sanitize any message field. There is no `sender.id`/`sender.url` allowlist and no schema/type check on `t.key`/`t.value`.

**(b) Source-to-sink path — UNBROKEN.**
`onConnectExternal` message handler switches on attacker-controlled `t.type`; the case `"setSessionStorage"` executes:
```js
await chrome.storage.session.set({[t.key]: t.value})
```
Both the computed key (`t.key`) and the value (`t.value`) flow directly from the message into the privileged storage write. No overwrite, sanitizer, or constant intervenes.

**(c) Security-relevant argument — YES.**
`chrome.storage.session.set` is a privileged storage write (CRITICAL under the provided storage-poisoning rule). The attacker controls both the storage key and stored value. Corroboration that poisoned

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
