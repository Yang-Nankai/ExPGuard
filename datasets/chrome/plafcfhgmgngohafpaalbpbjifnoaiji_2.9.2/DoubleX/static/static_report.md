# ExPAgent Static Verification — plafcfhgmgngohafpaalbpbjifnoaiji v2.9.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [1, 2]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 3}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1316
- **Sink**: `CHROME_NOTIFICATIONS_CLEAR_ID` in `background.js` [BG_1] @ L1079

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Decision ledger

**(a) Who controls the source?**
The reported source is `WINDOW_MESSAGE_EVENT` at `background.js L1316`, codeContext `request`. In the actual resolved file (`background/background.js`), line 1316 is inside a `chrome.tabs.onUpdated` `.then(...)` callback — it is **not** a window/message event at all. There is no `window.addEventListener("message", ...)` in the background service worker (search confirmed none). The `request` payload in this extension comes from `chrome.runtime.onMessage` (L1148) / `chrome.runtime.onMessageExternal` (L1219) listeners, not a `WINDOW_MESSAGE_EVENT`. So the reported source anchor/loc is mismatched; the real candidate source is an external/internal runtime message payload, which is only plausibly attacker-controlled via `onMessageExternal`.

**(b) Exact source-to-sink path**
The only path to the flagged API is the `notifications(show, msg)` helper (L1000–1034), reached from `xsListener` at L1142–1144:

```
request.otltype == G2C_MSG.DISPLAY_NOTIFICATION
  -> notifications(request.show, request.message)
```

Inside `notifications()`:

```js
const notificationId = "g2c";           // <-- hardcoded constant



**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
