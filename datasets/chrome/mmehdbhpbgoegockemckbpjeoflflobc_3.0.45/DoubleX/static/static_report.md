# ExPAgent Static Verification — mmehdbhpbgoegockemckbpjeoflflobc v3.0.45

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 1
- **Not reviewed due to analysis budget:** 4 flow(s): [0, 1, 2, 3]
- Coverage: node=1.0, scope=1.0
- Flow types: {'DOM_XSS': 4, 'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 4 not reviewed due to the analysis budget.

---

## Flow #4 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L1303
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L1131

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
