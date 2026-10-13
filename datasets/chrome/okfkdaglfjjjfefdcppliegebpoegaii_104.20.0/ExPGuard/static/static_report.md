# ExPAgent Static Verification — okfkdaglfjjjfefdcppliegebpoegaii v104.20.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 2
- Coverage: node=0.246, scope=0.223
- Flow types: {'STORAGE_POSOING': 3, 'PRIVILEGE_ESCALATION': 5}  |  Severities: {'HIGH': 8}

**Assessment:** Verified 2 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #3 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.js-Cvbn7zHo` [BG_1] @ L15:C17778 -> L15:C17779
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `assets/index.js-Cvbn7zHo` [BG_1] @ L15:C188941 -> L15:C188968
- **Severity evidence**: ['https://*.cursive.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.js-Cvbn7zHo` [BG_1] @ L15:C17778 -> L15:C17779
- **Sink**: `CHROME_LOCAL_STORAGE` in `assets/index.js-Cvbn7zHo` [BG_1] @ L1:C8741 -> L1:C8797
- **Severity evidence**: ['https://*.cursive.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
