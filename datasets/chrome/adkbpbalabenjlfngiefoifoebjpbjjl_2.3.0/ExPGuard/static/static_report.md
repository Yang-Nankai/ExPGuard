# ExPAgent Static Verification — adkbpbalabenjlfngiefoifoebjpbjjl v2.3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.505, scope=0.478
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/extension-worker` [BG_1] @ L733:C12 -> L733:C19
- **Sink**: `CHROME_SYNC_STORAGE` in `js/extension-worker` [BG_1] @ L761:C24 -> L776:C26
- **Severity evidence**: ['https://onlineapp.pro/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Source control** — `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)` at `js/extension-worker.js:726`. `message` is fully supplied by a webpage that Chrome allows to message the extension through `externally_connectable`. The declared external origins are:

- `https://onlineapp.pro/*`
- `https://onlineapp.stream/*`
- `https://onlineapp.live/*`

There is no `sender.id` fixed-extension allowlist. The only additional gate is:

```js
sender.url.includes('onlineapp.pro') ||
sender.url.includes('onlineapp.live') ||
sender.url.includes('onlineapp.stream')
```

This is an origin-restriction, not an unforgeable sender boundary. `externally_connectable` already narrows the attack surface to those exact hosts, but a page on any of those hosts (or an XSS payload on one of them) can reach the listener. `message.source === 'supabase-auth-adapter'` and `message.action` are attacker-chosen fields, not trust anchors.

**(b) Path** — The relevant branch is:

- `message.source === 'supabase-auth-adapter'`
- `message.action === 'setItem'`
- `const { key, value } = message.data;` (L760)
- `chrome.storage.sync.set({ [key]: value }, ...)` 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
