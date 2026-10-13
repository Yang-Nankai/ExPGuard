# ExPAgent Static Verification — lkhjgdkpibcepflmlgahofcmeagjmecc v7.1.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [0, 1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #2 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L14451
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L14644

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
