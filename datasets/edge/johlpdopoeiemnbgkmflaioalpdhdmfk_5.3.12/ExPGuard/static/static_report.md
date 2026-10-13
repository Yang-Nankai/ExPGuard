# ExPAgent Static Verification — johlpdopoeiemnbgkmflaioalpdhdmfk v5.3.12

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.209, scope=0.182
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `scripts/content` [CS_1] @ L15:C8 -> L15:C23
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L261:C21 -> L261:C162
- **Bridge**: message `runtime.single.sender.message[scripts/content->background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify this flow. Let me reason through the four-part ledger.

**1. Source control** — `scripts/content.js` L8-27 installs `window.addEventListener('message', ...)`. The guard at L10 (`event.source !== window`) is trivially satisfied by a page posting to itself, and the type check at L15 (`event.data.type === 'FROM_PAGE'`) is attacker-chosen. L17 assigns `buyerLoginId1688 = event.data.buyerLoginId1688` directly from the page. The content script matches `http://*/*`/`https://*/*`, so any webpage can drive this. ✅ attacker-controlled.

**2. Source→sink path** — Unbroken:
- `content.js` L20-25: `chrome.runtime.sendMessage({type:"BUYER_LOGINID1688", data: buyerLoginId1688})`.
- `background.js` L10 `onMessage.addListener(handleMessage)`, L158-160: `case 'BUYER_LOGINID1688': buyerLoginId1688 = encodeURIComponent(request.data);` (attacker value now stored in background global).
- `background.js` L261: `fetch(\`${AaiIp}/...&buyerLoginId1688=${buyerLoginId1688}\`)` uses that global. ✅ HOP connects (same action name `BUYER_LOGINID1688` on both sides).

**3. Security-relevant argument** — The tainted value is embedded in the `fetch` URL's `buyerLoginId1688` query par

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
