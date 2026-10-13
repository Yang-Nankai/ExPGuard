# ExPAgent Static Verification — dooinopjfnhlmmdkdepajfipfhlcmjgp v8.17.0.0

- Browser: `chrome`
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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: CrankWheel `setServerUrl` → `chrome.windows.create`

### 1. Evidence resolution

The report names `background.js`, but that file does not exist in the unpacked extension. The real MV3 background bundle is `gen/ext_bg_module.js` (concatenated from `js/background/ext_bg.js` + `js/ext_common.js`). Reading that bundle:

- **Reported source L142** maps to the `onMessageExternal` handler:
  ```js
  } else if (req.cmd == 'setServerUrl') {
    // Although an arbitrary URL can be set...
    setServerUrl(req.url);
  ```
  So the source is **not** `WINDOW_MESSAGE_EVENT`; it is an **external message** (`chrome.runtime.onMessageExternal`, L122). It is still attacker-controllable web content, restricted only by `externally_connectable`.

- **Reported sink** `chrome.windows.create` is at L230:
  ```js
  function ebgLaunchWorker(workerCommand, optCb) {
    var workerUrl = chrome.runtime.getURL("html/ext_worker.html");
    workerUrl += "?cmd=" + encodeURIComponent(JSON.stringify(workerCommand));
    chrome.windows.create({state: "minimized", url: workerUrl}, optCb);
  }
  ```

### 2. Decision ledger

**(a) Who controls the source?**
Any page on `https://*.crankwheel.com/*` or 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
