# ExPAgent Static Verification — nhcdofaefcpfaoefffopanopapnekhca v1.0.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L88
- **Sink**: `CHROME_SYNC_STORAGE` in `background.js` [BG_1] @ L137

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the actual background service worker (`bg.js`; the report's `background.js` is a renamed/offset reference and resolves to this file). The flow is real.

## Decision ledger

**(a) Who controls the source?**
The entry point is `chrome.runtime.onMessageExternal.addListener` (bg.js L82). This receives messages from web pages allowed by `externally_connectable.matches: ["https://appbox.space/*"]`. The message object — including `message.source`, `message.action`, and `message.data.key` / `message.data.value` — is fully controlled by the sender page. This is attacker/untrusted input (web surface), with the caveat that it must originate from `appbox.space` (or a page compromised by XSS there).

**(b) Source-to-sink data path**
```
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (sender.url && sender.url.includes('appbox.space')) {          // L83-85
    if (message.source === 'supabase-auth-adapter') {               // L87
      switch (message.action) {                                     // L88
        case 'setItem':                                             // L112
          const { key, value } = message.data;                      

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
