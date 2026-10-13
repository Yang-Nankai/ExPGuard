# ExPAgent Static Verification — bogabmgabnjabjbiggmfkdocbjgackfo v6.2.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 6
- **Not reviewed due to analysis budget:** 1 flow(s): [6]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 6, 'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 7}

**Assessment:** Verified 6 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 5 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L373
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L230

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L373
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L183

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L373
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L420

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L373
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L469

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L373
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L505

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L373
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L549

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
