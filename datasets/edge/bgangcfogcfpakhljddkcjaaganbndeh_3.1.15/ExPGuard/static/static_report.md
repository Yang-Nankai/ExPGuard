# ExPAgent Static Verification — bgangcfogcfpakhljddkcjaaganbndeh v3.1.15

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.03, scope=0.036
- Flow types: {'REQUEST_FORGERY': 1, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/sac` [CS_1] @ L1:C526 -> L1:C551
- **Sink**: `FETCH_RESOURCE` in `js/background` [BG_1] @ L2:C1489028 -> L2:C1489069
- **Bridge**: message `runtime.single.sender.message[js/sac->js/background]`
- **Severity evidence**: ['https://*.share-a-cart.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
