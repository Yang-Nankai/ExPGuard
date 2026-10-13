# ExPAgent Static Verification — bjpnbepckcncaideamdakikaaofkjmab v8.17.0.0

- Browser: `edge`
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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've traced the full source-level path and inspected the actual listener and downstream functions. Here is my verification.

## Four-part decision ledger

**(a) Who controls the source?**
`req.extraQueryParams` originates in `chrome.runtime.onMessageExternal.addListener(...)` at L122. I inspected the entire listener (L122–L211): there is **no `sender.id`/`sender.origin` check** before `req.cmd == 'showPopup'` is dispatched. The manifest `externally_connectable.matches` restricts senders to `https://*.crankwheel.com/*` and `https://*.meeting.is/*`, so the value is attacker-controllable by a page running on (or injected via XSS on) those origins. The harness's `AUTHENTICATED_EXTENSION_IPC` / `PA_PARTIAL_TRUSTED_IPC` classification is **not supported by the code**: the only fixed extension IDs in the file (L15, `klbhnajndhaoadcnjhodkdplkcfehiia`, `gebjopojipeanednoamlckcdldamjecb`) are used to select a staging vs production server URL, **not** to authenticate message senders. The harness itself records `senderIdCheck: false`.

**(b) Source-to-sink path (unbroken, confirmed in source):**
- L157: `showPopupCommand(sender.tab.id, req.shouldCloseCurrentTab, req.extraQueryParams);` — attac

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
