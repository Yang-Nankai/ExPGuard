# ExPAgent Static Verification — adiibejjcageoiipfmjafdlfhppedlbj v1.0.4

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 1
- **Not reviewed due to analysis budget:** 3 flow(s): [0, 1, 2]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 3, 'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 4}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 3 not reviewed due to the analysis budget.

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L122:C1 -> L122:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L122:C1 -> L122:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow #4 Verification — STORAGE_POSOING (onMessageExternal → chrome.storage.local.set)

### 1. Source control (who controls the data)
The source is `chrome.runtime.onMessageExternal` in `background.js`. The message content is supplied by **any external web page** whose origin matches the manifest's `externally_connectable.matches: ["https://*.dalualex.com/*"]`. There is **no `sender.id` allowlist** and no origin/url check inside the listener, so any page on a `dalualex.com` subdomain (or any XSS on that origin) controls `message` fully, including `message.data.email`.

### 2. Source-to-sink path (unbroken?)
Confirmed in source, lines 104–126:

```js
chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    console.log(message);
    if (message.type == 'get-authorization') { ... }
    else if (message.type == 'remove-authorization') { ... }
    else if (message.type == 'set-authorization') {
        // 保存登录信息
        chrome.storage.local.set({ 'email': message.data.email }, function () {
            sendResponse('success');
        });
    }
});
```

The path is direct and unbroken: external message → `message.type == 'set-authorization'` branch →

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
