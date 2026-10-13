# ExPAgent Static Verification — angheeakoggimjlccancomcmdhjpadao v2.9.8

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [0, 1]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 2, 'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The report was minified-anchor-ambiguous, but the actual `background.js` source settles it. The single-line service worker contains:

```js
chrome.runtime.onMessageExternal.addListener((function(e,t,a){
  "get"==e.action && chrome.storage.local.get(null,(e=>a(e))),
  "set"==e.action && chrome.storage.local.get(null,(t=>{
    e.data.countRunned||(e.data.countRunned=t.countRunned),
    e.data.isShare||(e.data.isShare=t.isShare),
    chrome.storage.local.set(e.data)
  }))
}));
```

Decision ledger:

1. **Source control**: `onMessageExternal` receives `e` from any externally-connectable origin. `externally_connectable.matches` is `*://*.mymoneyrain.com/*`. There is **no `sender.id` allowlist and no `sender.origin`/`sender.url` check** — only `e.action`, which is an attacker-chosen field. An ordinary page cannot reach it directly, but an XSS on any `mymoneyrain.com` (sub)domain page can, and that page fully controls `e`/`e.data`.

2. **Path**: `onMessageExternal(e)` → `e.action === "set"` (attacker-satisfiable gate) → `e.data` is mutated with two fallback fields (`countRunned`, `isShare` only if the attacker did not supply them) → `chrome.storage.local.set(e.data)`. The attacker-control

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
