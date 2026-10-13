# ExPAgent Static Verification — {bc6c10a3-cb0f-4cbf-964a-4ab6b5476f20} v2026.11

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.921, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L4:C7849 -> L4:C8042
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C12859 -> L1:C12990
- **Bridge**: message `runtime.single.sender.message[goldiemay_content->background]`
- **Severity evidence**: ['https://*.ancestry.ca/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L4:C7849 -> L4:C8042
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C12859 -> L1:C12990
- **Bridge**: message `runtime.single.sender.message[goldiemay_content->background]`
- **Severity evidence**: ['https://*.ancestry.ca/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request....

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
