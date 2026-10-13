# ExPAgent Static Verification — imomahaddnhnhfggpmpbphdiobpmahof v2.4.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 3
- **Not reviewed due to analysis budget:** 2 flow(s): [2, 0]
- Coverage: node=0, scope=0
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 4}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `resources/js/background.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener` (background.js L24). The message is received from an external page. The manifest's `externally_connectable.matches` is `["*://*.youtube-skins.com/*"]` — so the sender must be a page under `youtube-skins.com` (any subdomain). There is **no fixed `sender.id` extension allowlist** and **no sender.origin/url check** in the listener. The `request.action == 'install'` gate is an attacker-chosen message field, not a trust anchor.

The `request.files` field is fully attacker-controlled. Per the deterministic harness: an origin-match restriction narrows the attack surface but remains exploitable via XSS/subdomain compromise on `youtube-skins.com`; it is not an unforgeable boundary. So the source is genuinely attacker/untrusted-controllable (with an XSS prerequisite on the allowed domain).

### (b) Exact source-to-sink data path
The report anchors both source and sink at L32 (`preloadImgs(request.files)`), which is a location approximation — the real sink is the `chrome.storage.local.set` a few lines below. Reading th

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `resources/js/background.js` [UNKNOWN] @ L14:C1 -> L14:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'imgs[key]'}

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

### (a) Wh...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background.js` [UNKNOWN] @ L26:C1 -> L26:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `resources/js/background.js` [UNKNOWN] @ L26:C1 -> L26:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `5`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

### (a) Wh...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
