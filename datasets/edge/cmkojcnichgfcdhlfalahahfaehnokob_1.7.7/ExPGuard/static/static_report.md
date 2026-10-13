# ExPAgent Static Verification — cmkojcnichgfcdhlfalahahfaehnokob v1.7.7

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.876, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'LOW': 1, 'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / LOW, confidence 0.00)

- **Source**: `DOCUMENT_TITLE` in `background.min` [BG_1] @ L20:C2469 -> L20:C2537
- **Sink**: `CHROME_BOOKMARK_CREATE_INFO` in `background.min` [BG_1] @ L20:C2469 -> L20:C2537
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNKNOWN`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
