# ExPAgent Static Verification — felflkndljbjehhgadcfmijcoamhhngl v2.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L835:C1 -> L835:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L835:C1 -> L835:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the full surrounding source and the propagation report. The evidence is decisive.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener` (background.js L831) is the entry point. The message comes from a *web page* whose origin matches `externally_connectable.matches` (`*://*.custom-cursor.com/*`, `*://custom-cursor.com/*`). There is **no `sender.id` check and no `sender.origin`/`sender.url` check** anywhere in the listener — only `request.action` is switched on. So `request.value` (and `request.key`) are web-content-controlled, constrained only by the connectable web origins (XSS/subdomain-takeover on those origins suffices).

**(b) Source-to-sink path**
L831 `onMessageExternal` → L833 `case "set"` → L834 `let obj = {}` → L835 `obj[request.key] = request.value` → L836 `chrome.storage.local.set(obj, ...)`. The tainted object is passed directly to the privileged storage write on the very next line. The sink is unbroken.

**(c) Security-relevant argument**
The attacker controls *both* the storage key (`request.key`) and the stored value (`request.value`). `chrome.storage.local.set(obj)` therefore writes fully attacker-chosen persist

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
