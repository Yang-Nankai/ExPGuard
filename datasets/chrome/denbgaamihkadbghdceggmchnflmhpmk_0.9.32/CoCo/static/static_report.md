# ExPAgent Static Verification — denbgaamihkadbghdceggmchnflmhpmk v0.9.32

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `contentScriptProxy.js` [UNKNOWN] @ L47:C1 -> L47:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `contentScriptProxy.js` [UNKNOWN] @ L49:C1 -> L49:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'e.detail'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (STORAGE_POSOING — `SpectorOnCaptureEvent` → `browser.storage.local.set`)

### Decision ledger

**(a) Who controls the source?**
The source is `document.addEventListener('SpectorOnCaptureEvent', ...)` in `contentScriptProxy.js` (ISOLATED world), and the tainted field is `e.detail.capture`. The listener runs on `document`; DOM events dispatched on `document` are visible across script worlds, so any page script (MAIN world) can forge this event:

```js
document.dispatchEvent(new CustomEvent('SpectorOnCaptureEvent', { detail: { capture: ATTACKER_PAYLOAD } }));
```

The manifest runs `contentScriptProxy.js` at `document_start` on `http://*/*`, `https://*/*`, and `file://*/*`, `allFrames: true`. So the source is genuinely webpage-attacker-controllable (no `sender.id` or origin trust anchor exists for a DOM custom event).

**(b) Source → sink path**
Source line L47 registers the handler; the report's propagation shows the single tainted hop `e.detail` reaching the sink. Reading the real source confirms the sink at L48–50 is the actual privileged write:

```js
browser.storage.local.set({
    "currentCapture": e.detail.capture,
});
```

No sanitizer, allow-list, 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
