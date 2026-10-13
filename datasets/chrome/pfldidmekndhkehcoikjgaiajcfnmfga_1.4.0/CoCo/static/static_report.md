# ExPAgent Static Verification — pfldidmekndhkehcoikjgaiajcfnmfga v1.4.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Summary

**Flow under review:** `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`, `e.userId` in `background.js` (storage poisoning).

### (a) Who controls the source
The actual source is a real `chrome.runtime.onMessageExternal.addListener` (confirmed in raw source; the harness warning arose because the truncated snippet matched the *first* `onMessage` listener, but the genuine external listener exists further in the same line). The tainted field `e.userId` comes from an external message sender. External senders are restricted by `externally_connectable.matches` to `https://*.staging.recime.app/*`, `https://*.recime.app/*`, and `http://localhost:3000/*`.

Those are **web origins**, not browser-authenticated extension IDs. Per the harness rules, such origin restrictions reduce the attack surface but do not eliminate it: XSS on `recime.app`, a subdomain takeover of the wildcard `*.recime.app`, or control of a process bound to `localhost:3000` all let an attacker run JS on a matching origin and send this message. There is no `sender.id` allowlist and no in-code `sender.origin`/`sender.url` check.

### (b) Source-to-sink path
```js
chrome.runtime.onMessageExt

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
