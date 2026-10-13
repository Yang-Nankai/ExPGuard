# ExPAgent Static Verification — ngemddlbcjkjeodhophkbenappkchnhm v1.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content.js` [UNKNOWN] @ L153:C1 -> L153:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `content.js` [UNKNOWN] @ L156:C1 -> L156:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'e.data'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (STORAGE_POSOING)

### 1. Source reachability — confirmed

The source is a `window.addEventListener('message', function (e) {...})` in `content.js` (L151–153). The content script is registered with:

- `matches: ["https://twitter.com/*", "https://mobile.twitter.com/*"]`
- `world: ISOLATED`, `run_at: document_start`

`window.postMessage` is a standard page→content-script channel; the page context on the matched origin can reach this listener. The source capability (`ATTACKER_INPUT`) is therefore genuinely attacker/untrusted-controlled (any script running in the twitter.com page context, or the page's own injected companion `script.js`, can post a message).

### 2. Data path — unbroken

The raw code at L151–160:

```js
window.addEventListener('message', function (e) {
  e.source === window &&
    'tntConfigChange' === e.data.type &&
    e.data.changes &&
    (chrome.storage.onChanged.removeListener(i),
    chrome.storage.local.set(e.data.changes, function () {
      chrome.storage.onChanged.addListener(i)
    }))
}, !1)
```

The tainted span flows directly from `e.data` (message payload) to `e.data.changes`, which is passed **as the entire object argument**

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
