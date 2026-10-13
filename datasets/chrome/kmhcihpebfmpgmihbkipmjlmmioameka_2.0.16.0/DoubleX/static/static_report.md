# ExPAgent Static Verification — kmhcihpebfmpgmihbkipmjlmmioameka v2.0.16.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 1
- **Not reviewed due to analysis budget:** 6 flow(s): [5, 1, 2, 3, 4, 6]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 2, 'STORAGE_POSOING': 5}  |  Severities: {'UNKNOWN': 7}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 6 not reviewed due to the analysis budget.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L87
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L547
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Four-part decision ledger**

1. **Who controls the source?** A web page. The content script runs on `http://*/*`/`https://*/*` (all frames), and `app/content.js` registers `window.addEventListener("message", onPostMessage)`. The guard in `onPostMessage` (`msg.source == window`, `channel == "eternl-dom-to-cs"`, `payload.contentId === randId`) is satisfiable: `randId` is exposed to the page via the injected DOM script's `data-token` attribute / `?token=` query (`app/content.js` L113–116). The page controls `msg.data` fully.

2. **Source-to-sink path.** Unbroken. Page `postMessage` → `onPostMessage` (`app/content.js` L67–88) sets `data.channel = "eternl-cs-to-bg"` and calls `chrome.runtime.sendMessage(data)` → background `onMessage` (`app/bg.js` L2035) → `handleCommands` (`app/bg.js` L1891) with `req.reqId === "0"` and `req.api === "openUI"` → `openUI(req.payload.deeplink)` (`app/bg.js` L1905).

3. **Which API argument is attacker-controlled?** `openUI` builds:
   ```js
   const url = chrome.runtime.getURL(route) + (deeplink ? "#?dl=" + deeplink : "");
   chrome.tabs.create({ url }, ...)
   ```
   `route` defaults to the constant `"index.html"`, so the URL is a

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
