# ExPAgent Static Verification — gdnpkbipbholkoaggmlblpbmgemddbgb v1.27.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.235, scope=0.177
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/awebChromeHelper.min` [CS_1] @ L2:C662435 -> L2:C662446
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background.min` [BG_1] @ L2:C618287 -> L2:C618328
- **Bridge**: message `runtime.single.sender.message[js/awebChromeHelper.min->js/background.min]`
- **Severity evidence**: ['*://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/awebChromeHelper.min` [CS_1] @ L2:C662435 -> L2:C662446
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background.min` [BG_1] @ L2:C618917 -> L2:C618958
- **Bridge**: message `runtime.single.sender.message[js/awebChromeHelper.min->js/background.min]`
- **Severity evidence**: ['*://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
