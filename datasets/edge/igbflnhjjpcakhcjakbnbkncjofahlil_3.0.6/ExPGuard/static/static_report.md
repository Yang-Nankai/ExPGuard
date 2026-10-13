# ExPAgent Static Verification — igbflnhjjpcakhcjakbnbkncjofahlil v3.0.6

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.641, scope=0.684
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `serviceWorker` [BG_1] @ L1:C90130 -> L1:C90131
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `serviceWorker` [BG_1] @ L1:C90211 -> L1:C90274
- **Severity evidence**: ['*://*.csdn.net/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
