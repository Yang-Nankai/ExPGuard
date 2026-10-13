# ExPAgent Static Verification — bpgaefcdjkhnfncepmpldfkkhfiihckc v2.4.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 3
- **Not reviewed due to analysis budget:** 2 flow(s): [4, 0]
- Coverage: node=0, scope=0
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 4}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background.js` [UNKNOWN] @ L26:C1 -> L26:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `resources/js/background.js` [UNKNOWN] @ L26:C1 -> L26:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (STORAGE_POSOING)

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {...})` at `resources/js/background.js` L24-25. The tainted anchor `request.action` is a field of a message object supplied by whoever can send an external message to the extension.

The manifest restricts `externally_connectable.matches` to `*://*.youtube-skins.com/*`, so only pages under `youtube-skins.com` (or an attacker with XSS/subdomain control there) can reach this listener. There is **no** `sender.id` fixed-ID allowlist — the code never inspects `sender`. So this is an origin-restricted web surface, not a browser-authenticated extension-IPC boundary. Per the given rules, that is exploitable via XSS on the allowed origin, and the `request.action` field itself is fully attacker-chosen.

### 2. Source → sink path
The reported single-step path anchors both source and sink at L26 (`if (request.action == 'install')`), but the actual privileged write is a few lines below (L34-36):

```js
if (request.action == 'install') {
    chrome.storage.local.get('skins').then(function (e) {
        delete request.action;
     

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `resources/js/background.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (STORAGE_POSOING)

### 1. Source control
The source is `chrome.run...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `resources/js/background.js` [UNKNOWN] @ L14:C1 -> L14:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'imgs[key]'}

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (STORAGE_POSOING)

### 1. Source control
The source is `chrome.run...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
