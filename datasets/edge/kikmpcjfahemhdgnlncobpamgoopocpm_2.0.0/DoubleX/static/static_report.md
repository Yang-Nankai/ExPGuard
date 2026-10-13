# ExPAgent Static Verification — kikmpcjfahemhdgnlncobpamgoopocpm v2.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- **Not reviewed due to analysis budget:** 1 flow(s): [0]
- Coverage: node=1.0, scope=1.0
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L49
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L114
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the flow by reading the actual (minified) extension source, since the source-level report entry could not be resolved.

## Decision ledger

**(a) Who controls the source?**
`content.js` (the only content script that listens for window messages; the report's `content_scripts.js` name doesn't resolve, but this is the matching file) runs on `https://www.tiktok.com/tiktokstudio/*`. Its listener is:

```js
window.addEventListener("message", function(e){
  if(e.source===window && e.data){
    ...
    if(e.data._tq_harvest && _br.storage.local.get("tq_telemetry", function(t){
      !1!==t.tq_telemetry && _br.runtime.sendMessage({type:"harvest", payload:e.data})
    }))
    ...
```

`e.source===window` is satisfied by the host page posting a message to itself, and the message *fields* (`_tq_harvest`, `uniqueId`, `browserRegion`, `serverRegion`, `language`) are entirely page-chosen. This is a classic page→content-script spoofable bridge; no origin check, no sender authentication, no field validation.

**(b) Source-to-sink path**
1. Page (tiktok.com/tiktokstudio, or XSS/script injection on that page) does `window.postMessage({_tq_harvest:true, uniqueId, browserRegion, serverReg

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L49
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L124
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #1. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the flow by reading the actual (minified) extension source, since the source-le...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
