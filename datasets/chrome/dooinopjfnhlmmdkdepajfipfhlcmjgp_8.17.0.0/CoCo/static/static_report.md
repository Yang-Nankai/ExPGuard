# ExPAgent Static Verification — dooinopjfnhlmmdkdepajfipfhlcmjgp v8.17.0.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 1
- **Not reviewed due to analysis budget:** 7 flow(s): [2, 3, 4, 6, 0, 1, 7]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 2, 'STORAGE_POSOING': 4, 'PRIVILEGE_ESCALATION': 1, 'UNKNOWN': 1}  |  Severities: {'UNKNOWN': 8}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 7 not reviewed due to the analysis budget.

---

## Flow #5 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `gen/ext_bg_module.js` [UNKNOWN] @ L157:C1 -> L157:C1
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `gen/ext_bg_module.js` [UNKNOWN] @ L228:C1 -> L228:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `6`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 7, 'omitted': 0}, 'propagation': 'url = url + "&" + extraQueryParams | shouldReloadPage = !!url | JSON.stringify(workerCommand) | encodeURIComponent(JSON.stringify(workerCommand)) | workerUrl += "?cmd=" + encodeURIComponent(JSON.stringify(workerCommand))'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #6 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_WINDOWS_CREATE_OPTIONS`

### (a) Who controls the source?

**Attacker/untrusted content — YES, and there is no `sender.id` trust boundary.**

- `gen/ext_bg_module.js:122` registers `chrome.runtime.onMessageExternal.addListener(function (req, sender, callback) { ... })`.
- `gen/ext_bg_module.js:156-157`: `req.cmd == 'showPopup'` → `showPopupCommand(sender.tab.id, req.shouldCloseCurrentTab, req.extraQueryParams)`. Both `req.cmd` and `req.extraQueryParams` are attacker-chosen message fields.
- `search_code` for `sender` shows `sender` is used only as `sender.tab.id` (lines 157/159); there is **no `sender.id` check anywhere** in the listener.
- The manifest `externally_connectable.matches` allows any page on `https://*.crankwheel.com/*` / `https://*.meeting.is/*` to send this message (and XSS/subdomain control on those origins makes it reachable), and `onMessageExternal` is additionally reachable by **any other installed extension**, since no sender ID is verified.

> Important correction of the deterministic harness: its `PA_PARTIAL_TRUSTED_IPC` conclusion is **unsound**. The "fixedExtensionIds" it found come fr

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
