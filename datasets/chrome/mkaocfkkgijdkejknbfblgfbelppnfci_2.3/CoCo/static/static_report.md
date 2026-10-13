# ExPAgent Static Verification — mkaocfkkgijdkejknbfblgfbelppnfci v2.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `scripts/storage.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `scripts/storage.js` [UNKNOWN] @ L96:C1 -> L96:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 4, 'omitted': 0}, 'propagation': 'event.data | event.data.msg'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the primary evidence and the raw source. Let me verify the complete picture.

## Four-part decision ledger

**(a) Who controls the source — attacker-controlled.**
`scripts/storage.js` is a content script registered with `matches: ["http://*/*", "https://*/*", "file://*/", "*://*/"]` and `allFrames: true`. Any webpage (or iframe) can drive `window.addEventListener("message", ...)` at L32. The guard at L34 (`event.source != window || event.isTrusted == false`) is a self-origin guard, which the harness explicitly flags as attacker-satisfiable in a page-to-content-script bridge: the malicious page's own `window.postMessage` yields `event.source === window` and `isTrusted === true`. The L37 `type` check and the L74 `switch (msg.action)` are checks on attacker-supplied message fields — also attacker-chosen. The only precondition (L23: a `#ADHelperCheck`/`#ADSharedStorageCheck` element) is page-controlled DOM; a malicious page simply includes `<div id="ADHelperCheck"></div>` in its markup before `document_end`.

**(b) Source-to-sink path — unbroken.**
`event.data` (L37) → `event.data.msg` (L42, `var msg = event.data.msg`) → `msg.value` (L96) → `String(msg.value)` → `chrome.storage.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `scripts/storage.js` [UNKNOWN] @ L32:C1 -> L32:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `scripts/storage.js` [UNKNOWN] @ L44:C1 -> L44:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 4, 'omitted': 0}, 'propagation': 'event.origin | keyOriginPrefix = origin + "_"'}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the primary evidence and the raw source. Let me verify the complete picture.

## Four-...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
