# ExPAgent Static Verification — iflipbenkncalpdbamhkaleppfnlefjm v3.2.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.96)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content_script.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `js/background.js` [UNKNOWN] @ L168:C1 -> L168:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 6, 'omitted': 0}, 'propagation': 'e.data | e.data | request.itemInfo | itemInfo.title'}

**Reasoning:** Deterministic CoCo calibration [COCO_FIXED_VENDOR_UI_BRIDGE]: The content script accepts the message only from the fixed vendor origin and forwards it to the extension's notification UI; this is the vendor integration path, not an arbitrary webpage privilege escalation under the review baseline. Original model verdict: TRUE_POSITIVE.

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** The content script accepts the message only from the fixed vendor origin and forwards it to the extension's notification UI; this is the vendor integration path, not an arbitrary webpage privilege escalation under the review baseline.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
