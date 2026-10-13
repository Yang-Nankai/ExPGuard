# ExPAgent Static Verification — mklbhckkgddhlcdagmobdmnadpjokkkn v2.106.7846

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.472, scope=0.474
- Flow types: {'STORAGE_POSOING': 1, 'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (REQUEST_FORGERY / CRITICAL, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L3:C455609 -> L3:C455610
- **Sink**: `XML_HTTP_REQUEST_SEND` in `background` [BG_1] @ L3:C25513 -> L3:C25558
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
