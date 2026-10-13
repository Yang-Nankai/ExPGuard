# ExPAgent Static Verification — aomcoolilopomacpljconemieflcmhmg v3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.96)

- **Source**: `STORAGE_ALL_ITEMS` in `crx_headers/bg_header.js` [UNKNOWN] @ L498:C1 -> L498:C1
- **Sink**: `FETCH_RESOURCE` in `background.js` [UNKNOWN] @ L435:C1 -> L435:C1
- **Bridge**: storage `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'SENSITIVE_DATA', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'stored.USERID'}

**Reasoning:** Deterministic CoCo calibration [COCO_IDENTIFIER_NETWORK_FLOW]: A persistent extension identifier (USER_ID/UUID) is placed in a network request.  The fixed vendor destination does not erase the concrete storage-to-network boundary in this review baseline. Original model verdict: FALSE_POSITIVE.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** A persistent extension identifier (USER_ID/UUID) is placed in a network request.  The fixed vendor destination does not erase the concrete storage-to-network boundary in this review baseline.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
