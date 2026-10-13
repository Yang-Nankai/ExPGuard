# ExPAgent Static Verification — cphmbaonehalpppcapioaohgmkhoklgp v1.2.47

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 19  |  Verified: 2
- **Not reviewed due to analysis budget:** 17 flow(s): [13, 14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 4, 'DATA_LEAK': 15}  |  Severities: {'UNKNOWN': 19}

**Assessment:** Verified 2 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 17 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L1226
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L1233

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L1226
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L1261

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
