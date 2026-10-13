# ExPAgent Static Verification — lkhjgdkpibcepflmlgahofcmeagjmecc v7.1.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.961, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / HIGH, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background/index` [BG_1] @ L477:C130295 -> L477:C130298
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background/index` [BG_1] @ L477:C133852 -> L477:C133908
- **Severity evidence**: ['*://*.netflix.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 349, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
