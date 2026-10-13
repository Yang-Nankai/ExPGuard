# ExPAgent Static Verification — hiiildgldbpfbegcfgemoliikibfhaeh v1.3.12

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [0]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 1, 'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.js` [UNKNOWN] @ L2:C1 -> L2:C1
- **Sink**: `CHROME_SYNC_STORAGE` in `background.js` [UNKNOWN] @ L2:C1 -> L2:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'e.data.key'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verdict reasoning

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener(function(e,r,i){...})` in the service worker (`background.js`). The message object `e` is fully controlled by the external sender. The manifest restricts external senders to `https://appbox.space/*`, so the message is reachable only from that origin (or via XSS/control of that origin). The code additionally checks `r.url && r.url.includes("appbox.space")` — a **substring** check, not a fixed `sender.id` allowlist.

### (b) Exact source-to-sink path (confirmed in minified source)
The extracted tail of `background.js` shows the real handler:

```js
chrome.runtime.onMessageExternal.addListener(function(e,r,i){
  if(r.url && r.url.includes("appbox.space"))
    if("supabase-auth-adapter"===e.source)
      switch(e.action){
        case "getItem":  var n=e.data.key; chrome.storage.sync.get(n, ...);
        case "setItem":  var s=e.data, a=s.key, o=s.value;
                         chrome.storage.sync.set(Po({},a,o), ...);
        case "removeItem": var u=e.data.key; chrome.storage.sync.remove(u, ...);
      }
    ...
});
```

So the propagation `e.data.key` is real, and for `

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
