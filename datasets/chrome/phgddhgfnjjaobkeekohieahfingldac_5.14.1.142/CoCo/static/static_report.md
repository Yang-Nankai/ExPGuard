# ExPAgent Static Verification — phgddhgfnjjaobkeekohieahfingldac v5.14.1.142

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `content-script.js` [UNKNOWN] @ L49:C1 -> L49:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `content-script.js` [UNKNOWN] @ L51:C1 -> L51:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'e.detail'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

### (a) Who controls the source?
The source is a `document`-level `CustomEvent` listener registered by the content script:

```js
document.addEventListener('fdWebExtension.saveToStorage', e => {
  var key = e.detail.key;
  var value = e.detail.value;
  chrome.storage.local.set({ [key]: value });
});
```

The content script runs in an **ISOLATED** world but shares the DOM with the page. A page loaded under `http://*/*`, `https://*/*`, or `file:///*` can dispatch the same DOM event, and the content-script listener will receive it. Both `key` and `value` are entirely page/attacker-controlled.

### (b) Source-to-sink path
Unbroken, three-line data path:

1. `L49` — attacker can trigger `document.addEventListener('fdWebExtension.saveToStorage', ...)`.
2. `L50–51` — attacker-controlled `e.detail.key` and `e.detail.value` are read into `key` and `value`.
3. `L53` — those values are written directly to extension storage:
   ```js
   chrome.storage.local.set({ [key]: value });
   ```

The report anchors the sink at `L51` (`e.detail.value`), but the actual privileged sink call is the `chrome.storage.local.set` at `L

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `content-script.js` [UNKNOWN] @ L56:C1 -> L56:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `content-script.js` [UNKNOWN] @ L57:C1 -> L57:C1
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'e.detail'}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `TARGET_CUSTOM_EVENT` → `CHROME_LOCAL_STORAGE`

### (a) Who cont...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
