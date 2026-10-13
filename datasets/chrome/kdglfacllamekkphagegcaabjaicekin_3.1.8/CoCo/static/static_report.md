# ExPAgent Static Verification — kdglfacllamekkphagegcaabjaicekin v3.1.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 1
- **Not reviewed due to analysis budget:** 5 flow(s): [2, 1, 3, 4, 5]
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 4, 'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 6}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 5 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L34:C1 -> L34:C1
- **Sink**: `CHROME_SYNC_STORAGE` in `background.js` [UNKNOWN] @ L34:C1 -> L34:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `onMessageExternal` → `chrome.storage.sync.set`

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener` in `background.js` (line 15). The manifest declares:

- `externally_connectable.ids: ["*"]` — any extension can connect
- `externally_connectable.matches: ["<all_urls>"]` — **any webpage can send external messages**

I read the actual listener:

```js
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  ...
  switch (message.type) {
    ...
    case 'setQiuToken': {
      chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })
      break
    }
```

There is **no `sender.id` / `sender.origin` / `sender.url` check at all** before the switch. The message payload (`message.type`, `message.data.qiuqiToken`) is fully attacker-chosen.

### 2. Data path
`message.data.qiuqiToken` (attacker-controlled string from an external message) flows directly into `chrome.storage.sync.set({ qiuqiToken: ... })`. The propagation report shows exactly two steps with the tainted span `message.data.qiuqiToken` reaching the storage argument. No sanitization, no allow-list, no constant replacement.



**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
