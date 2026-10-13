# ExPAgent Static Verification — kjinbaahkmjgkkedfdgpkkelehofieke v2.17.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.268, scope=0.26
- Flow types: {'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 0 false-positive, 1 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/telegram-content` [CS_1] @ L1:C1570 -> L1:C1577
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L3:C18263 -> L3:C18368
- **Bridge**: message `runtime.connect.sender.message[content/telegram-content->background]`
- **Severity evidence**: ['https://web.telegram.org/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — DUPLICATE  (REQUEST_FORGERY / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/telegram-content` [CS_1] @ L1:C1570 -> L1:C1577
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L4:C7464 -> L4:C7472
- **Bridge**: message `runtime.connect.sender.message[content/telegram-content->background]`
- **Severity evidence**: ['https://web.telegram.org/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
