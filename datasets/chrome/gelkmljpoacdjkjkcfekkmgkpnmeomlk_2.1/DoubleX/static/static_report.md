# ExPAgent Static Verification — gelkmljpoacdjkjkcfekkmgkpnmeomlk v2.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 14  |  Verified: 1
- **Not reviewed due to analysis budget:** 13 flow(s): [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 13}  |  Severities: {'UNKNOWN': 14}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 13 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L401
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `background.js` [BG_1] @ L479

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `chatnotif` → `chrome.notifications.create`

### 1. Source control (who controls `msg`)

The real source is not a DOM `window` message but the port-message listener in `background.js`:

```js
chrome.runtime.onConnectExternal.addListener(function (port) {      // L318
    ...
    port.onMessage.addListener(async function (msg) {               // L326
        ...
        } else if (msg.meta == 'chatnotif') {                        // L373
```

- The manifest's `externally_connectable.matches` is `["https://scratch.mit.edu/*"]`, so any page on that origin (or an XSS on that origin) can open a connection with `chrome.runtime.connect(<extensionId>)`.
- The listener performs **no sender verification**: no `sender.id` fixed-ID allowlist, no `sender.origin`/`sender.url` check, no authentication of the `msg` fields. The only gate is `msg.meta == 'chatnotif'`, which is itself an attacker-chosen field.
- The extension's own content script (`scripts/editor.js`) also forwards collaborative-chat data through this same port (`liveMessage({ meta: 'chatnotif', sender: msg.sender, text: msg.text, ... })`), so a malicious collaborator's chat text is another source — but the exte

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
