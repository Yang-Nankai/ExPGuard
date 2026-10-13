# ExPAgent Static Verification — cpofhfeclnhnhodbcabgcihloffdpgpd v1.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 5
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 5}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 5 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 4 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1041
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1144

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: background.js — external message → `chrome.storage.local.set`

### Evidence notes
- The normalized report cites `background.js` L1041 (source) and L1144 (sink), but the actual bundle is only 764 lines; no source-level propagation entry exists. I therefore verified against the raw bundle.
- `background.js` has exactly one external/message listener: `chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {...})` at **L496**. There is no `window.addEventListener('message')` in the service worker, so the reported `WINDOW_MESSAGE_EVENT`/DoubleX source corresponds to this externally-connectable message entry point (the `request` parameter is the tainted value).
- The handler does **not** inspect `sender.id` or `sender.origin` at all. Dispatch is driven solely by the attacker-supplied `request.action`.

### Four-part decision ledger

**(a) Who controls the source?**
Untrusted web content. `externally_connectable.matches` is `*://*.custom-cursor.com/*` and `*://custom-cursor.com/*`. Any page on `custom-cursor.com` or any subdomain can call `chrome.runtime.sendMessage(<extension-id>, payload)`. The origin restriction narrows the surface b

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1041
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1173

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: background.js — external message → `chrome.storage.local.set`

### Evid...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1041
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1188

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: background.js — external message → `chrome.storage.local.set`

### Evid...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1041
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1221

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: background.js — external message → `chrome.storage.local.set`

### Evid...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1041
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1252

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: background.js — external message → `chrome.storage.local.set`

### Evid...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
