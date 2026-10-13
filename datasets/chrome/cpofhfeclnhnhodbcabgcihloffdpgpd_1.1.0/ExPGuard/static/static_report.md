# ExPAgent Static Verification — cpofhfeclnhnhodbcabgcihloffdpgpd v1.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 1
- Coverage: node=0.56, scope=0.612
- Flow types: {'STORAGE_POSOING': 6}  |  Severities: {'HIGH': 6}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L503:C17 -> L503:C24
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L643:C14 -> L668:C16
- **Bridge**: storage `STORAGE_FLOW[area: local, key: current, sender: background, receiver: background]`
- **Severity evidence**: ['*://*.custom-cursor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {...})` at `background.js:496`. `request` is the message payload sent by an externally-connectable web origin. The flow's tainted value is `request.data` (specifically `request.data.animationType`, `duration`, `collection`, `pattern`, etc.). This is attacker/untrusted input. The manifest `externally_connectable.matches` restricts which origins may call it (`*://*.custom-cursor.com/*`, `*://custom-cursor.com/*`), but that is an origin restriction, not an unforgeable browser-authenticated `sender.id` boundary — XSS or control of a matched origin still allows injection.

**(b) Exact source-to-sink data path:**
Confirmed in real source:
- `background.js:503` `_t = request.action;` dispatches to `case 8` (`"setAnimation"`).
- `background.js:639` `_data3 = request.data;`
- `background.js:640-642` reads `current` from storage, then `current.animationType = _data3.animationType;`
- `background.js:643-645` `chrome.storage.local.set({ current: current, animationType: _data3.animationType }, ...)`.

This matches the reported propagation 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
