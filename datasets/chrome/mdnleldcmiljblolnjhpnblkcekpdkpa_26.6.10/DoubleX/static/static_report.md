# ExPAgent Static Verification — mdnleldcmiljblolnjhpnblkcekpdkpa v26.6.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 3
- **Not reviewed due to analysis budget:** 4 flow(s): [3, 5, 0, 6]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 5, 'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 7}

**Assessment:** Verified 3 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing; 4 not reviewed due to the analysis budget.

---

## Flow #1 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2027
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L1923

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2027
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L1998

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2027
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L2006

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
