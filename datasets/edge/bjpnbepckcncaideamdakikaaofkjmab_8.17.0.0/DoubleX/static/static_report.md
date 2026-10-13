# ExPAgent Static Verification — bjpnbepckcncaideamdakikaaofkjmab v8.17.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 1
- **Not reviewed due to analysis budget:** 3 flow(s): [1, 2, 3]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 2, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 4}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 3 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L142
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `background.js` [BG_1] @ L268

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify this flow. Let me summarize my analysis.

## Decision ledger

**(a) Who controls the source?**
The real entry point is `chrome.runtime.onMessageExternal.addListener(function (req, sender, callback) { ... })` at `gen/ext_bg_module.js:122` (the reported "background.js"/L142 maps to the `setServerUrl` branch). The manifest `externally_connectable.matches` are `https://*.crankwheel.com/*` and `https://*.meeting.is/*`, so any page on those origins (or XSS on those origins) can send `req` directly. There is **no `sender.id`/`sender.origin`/`sender.url` guard** in the handler, and `req` fields are attacker-chosen.

**(b) The source-to-sink path:**
- `L142`: `setServerUrl(req.url)` — attacker-controlled `req.url` is stored verbatim via `objStorageSet({'serverUrl': url})` → `chrome.storage.local.set` (`L24-25`, `L58-59`). No URL validation/allow-list.
- `L156-157`: the `showPopup` command calls `showPopupCommand(...)` → `getPopupUrl()` reads the stored `serverUrl` and builds `serverUrl + '/ss/zeroauth/login' + query` (`L39-43`), plus optional attacker `extraQueryParams` (`L413-417`).
- `L404-410`: `showCrankWheelPopup(...)` → `ebgLaunchWorker({cmd:"workerSho

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
