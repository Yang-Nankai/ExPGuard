# ExPAgent Static Verification — @ffn v8.0.6

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [1, 2]
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `contentScript.bundle.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Sink**: `CHROME_SYNC_STORAGE` in `contentScript.bundle.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 4, 'omitted': 0}, 'propagation': 't.data | t.data.message'}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
