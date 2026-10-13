# ExPAgent Static Verification — iflipbenkncalpdbamhkaleppfnlefjm v3.2.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.979, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content_script` [CS_1] @ L17:C0 -> L210:C2
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `js/background` [BG_1] @ L166:C48 -> L171:C50
- **Bridge**: message `runtime.single.sender.message[js/content_script->js/background]`
- **Severity evidence**: ['*://*.qwerpdf.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify this flow. Let me lay out the analysis.

## Decision Ledger

**(a) Who controls the source?**
The real source is `window.addEventListener('message', ...)` in `js/content_script.js` L1–21. The content script is injected into `*://*.qwerpdf.com/*`, and it forwards `e.data` wholesale to the background via `chrome.runtime.sendMessage(e.data)`. The only gate before forwarding is:

```js
if (e.origin != 'https://qwerpdf.com' && e.origin != 'https://www.qwerpdf.com') return false;
```

This is an exact web-origin equality check, not a browser-authenticated `sender.id` boundary. A page on `https://qwerpdf.com` / `https://www.qwerpdf.com` (the very site the content script runs in, or any XSS on it) can satisfy it trivially by calling `window.postMessage(...)`. Per the harness rules, `e.origin` equality is attacker-satisfiable / XSS-exploitable, not an unforgeable trust anchor. So the message payload (`request.itemInfo`, `request.f`, `request.t`, `request.files`) is page/untrusted-controlled.

**(b) The exact source→sink path**
1. Page posts `e.data` → content script `window.message` listener (L1).
2. Content script `chrome.runtime.sendMessage(e.data)` (L11) 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
