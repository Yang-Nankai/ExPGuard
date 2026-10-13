# ExPAgent Static Verification — jfpmpikgjeggmkgaalgjacfmlpbfmkcg v1.2.6

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.47, scope=0.457
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `src/inject` [CS_1] @ L3:C74565 -> L3:C74566
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `src/background` [BG_1] @ L3:C23381 -> L3:C23408
- **Bridge**: message `runtime.single.sender.message[src/inject->src/background]`
- **Severity evidence**: ['https://www.linkedin.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
