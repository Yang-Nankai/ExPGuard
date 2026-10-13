# ExPAgent Static Verification — ijpgjiobapjdadigoagamcmhmdfdggmg v10.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L348
- **Sink**: `CHROME_COOKIES_SET_OPTIONS` in `background.js` [BG_1] @ L354

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
