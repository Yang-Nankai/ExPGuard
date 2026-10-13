# ExPAgent Static Verification — addon@transkriptor.com v2.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.849, scope=0.805
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L6:C5 -> L6:C12
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L11:C4 -> L15:C6
- **Severity evidence**: ['https://dashboard.transkriptor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The report evidence is fully corroborated by the raw source. Let me walk through the four-part ledger.

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {...})` (background.js L5). `request` is a fully attacker-controlled message payload. The sender is a web page from one of the `externally_connectable` origins (`https://dashboard.transkriptor.com/*`, `https://app.transkriptor.com/*`, plus the specific dashboard path). There is **no** `sender.id` fixed-extension allowlist, no `sender.origin` equality check, and no per-field validation. The `externally_connectable` host restriction narrows the attack surface but is not an unforgeable trust boundary — XSS (or any content injection) on those origins can drive the listener.

**(b) Source-to-sink path.**
Unbroken and direct, in a single function:
- L6 `if(request.action == "loginUser")` — action check is attacker-satisfiable (attacker supplies the field).
- L7 `let widgetData = JSON.parse(request.widgetData)` — attacker-controlled object.
- L8 `let uid = widgetData.userId.replace("User#", "")` — attacker-controlled (prefix strip only).
- L9 `let email = widgetData.ema

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
