# ExPAgent Static Verification — knhbjeinoabfecakfppapfgdhcpnekmm v0.1.24

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.118, scope=0.152
- Flow types: {'REQUEST_FORGERY': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `worker` [BG_1] @ L80:C7892 -> L80:C7893
- **Sink**: `WEBSOCKET_URL` in `worker` [BG_1] @ L80:C5934 -> L80:C6062
- **Severity evidence**: ['https://*.oasis.ai/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (`attacker-input-network-send`)

### Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((I, A, C) => ...)` in `worker.js`. The manifest declares:

```
externally_connectable.matches: [
  "https://*.oasis.ai/*",
  "https://*.distribute.ai/*"
]
```

So a page on any `https://*.oasis.ai/*` or `https://*.distribute.ai/*` origin can invoke `chrome.runtime.sendMessage("<extension-id>", msg)` and reach this listener, and any other extension can also message this extension. `I` is the attacker-supplied message object.

**(b) Exact source-to-sink path**
Inspected raw minified source around the listener:

```js
chrome.runtime.onMessageExternal.addListener((I,A,C)=>{
  console.dir({message:I}),
  vA("Received chrome eternal message of type:"+I.type),
  I.type==="check"&&(...),
  I.type==="login"&&(
    vA("Provider connected: adding token to database & starting websocket"),
    $A.getState().legacyUpdateDatabase({token:I.authToken, stats:{status:"connected"}}),
    C({type:"login"})
  )
})
```

The state store subscription then reacts to the token change:

```js
$A.subscribe(I=>{
  ... || I

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
