# ExPAgent Static Verification — chgajipdilbjolpgafadpdggjaeeapic v1.15.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'UNKNOWN': 4}

**Assessment:** Verified 4 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 3 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended.js` [UNKNOWN] @ L65:C1 -> L65:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended.js` [UNKNOWN] @ L66:C1 -> L66:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'event.detail'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source reachability — who controls `event.detail`?

The source anchor is confirmed:

```js
L65: document.addEventListener('certisigner-repoGenarateCsr-buffer', function(event) {
L66:     if (event.detail.repository){
L67:       chrome.storage.local.set({'repository': event.detail.repository});
L68:       chrome.storage.local.set({'provider': event.detail.provider});
L69:       chrome.storage.local.set({'alias': event.detail.alias});
L70:       chrome.storage.local.set({'hash': event.detail.hash});
```

This is a **custom DOM event listener on `document`**. The content script runs in `ISOLATED` world, but the DOM (`document`) is shared between the page world and the isolated world. A page script on a matched origin can dispatch:

```js
document.dispatchEvent(new CustomEvent('certisigner-repoGenarateCsr-buffer', {
  detail: { repository: '<attacker-controlled>', provider: ..., alias: ..., hash: ... }
}));
```

That event propagates into the content script's isolated-world listener, and `event.detail.*` carries the page-supplied values. This is a well-established page→content-script bridge (DOM custom-event channel), so the source is genuinely attacker

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended.js` [UNKNOWN] @ L65:C1 -> L65:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended.js` [UNKNOWN] @ L68:C1 -> L68:C1
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'event.detail'}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source reachability — who controls `event.detail`?

The sour...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended.js` [UNKNOWN] @ L65:C1 -> L65:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended.js` [UNKNOWN] @ L69:C1 -> L69:C1
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'event.detail'}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source reachability — who controls `event.detail`?

The sour...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended.js` [UNKNOWN] @ L65:C1 -> L65:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended.js` [UNKNOWN] @ L70:C1 -> L70:C1
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'event.detail'}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source reachability — who controls `event.detail`?

The sour...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
