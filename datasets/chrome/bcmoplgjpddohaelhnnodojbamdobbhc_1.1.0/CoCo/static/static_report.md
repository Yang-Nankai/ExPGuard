# ExPAgent Static Verification — bcmoplgjpddohaelhnnodojbamdobbhc v1.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.96)

- **Source**: `STORAGE_ALL_ITEMS` in `crx_headers/cs_header.js` [UNKNOWN] @ L165:C1 -> L165:C1
- **Sink**: `WINDOW_POSTMESSAGE` in `extension-content.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Bridge**: storage `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'SENSITIVE_DATA', 'sinkCapability': 'MESSAGE_RESPONSE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 't.isLoggedIn'}

**Reasoning:** Deterministic CoCo calibration [COCO_AUTH_TOKEN_PAGE_BRIDGE]: Authentication token material is read from extension storage and returned across the extension/page postMessage boundary.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** Authentication token material is read from extension storage and returned across the extension/page postMessage boundary.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
