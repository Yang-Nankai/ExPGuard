# ExPAgent Static Verification — fkhddgplfbdjopphepkohfgdkikfleai v1.0.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.919, scope=1
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L356:C32 -> L356:C39
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L257:C29 -> L262:C8
- **Severity evidence**: ['https://lcx.bambuser.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification — Flow #1 (REQUEST_FORGERY, `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `fetch`)

### Decision ledger

**(a) Who controls the source?**
The source is `request` in `chrome.runtime.onMessageExternal.addListener(...)` (background.js L354–358). The manifest `externally_connectable.matches` is restricted to `https://lcx.bambuser.com/*` and `https://lcx-eu.bambuser.com/*`, and there are no content scripts. So the message can only originate from a page on those two dashboard origins — i.e., an attacker needs script execution there (XSS) or a DevTools console on the trusted page. Per the harness rules, a specific-host `externally_connectable` restriction does *not* eliminate the finding; it reduces reachability/severity with an XSS prerequisite.

**(b) Exact source→sink path (confirmed in real source).**
L356 `queueWork(() => handleCommand(request.command, request.params || {}, sender, sendResponse))` →
L243 `handleCommand(command, params, ...)` →
L244 `command === 'activateMerchant'` →
L245 `const { orgId, idToken, defaultOrigin } = params` (attacker-controlled) →
L246 truthiness check only (no value sanitization) →
L250 `backend = backendMap[sender.origin]` (fixed per origin; `s

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
