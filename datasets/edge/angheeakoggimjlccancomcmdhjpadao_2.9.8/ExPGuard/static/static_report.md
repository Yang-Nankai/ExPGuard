# ExPAgent Static Verification — angheeakoggimjlccancomcmdhjpadao v2.9.8

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.486, scope=0.444
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C702 -> L1:C703
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C903 -> L1:C935
- **Severity evidence**: ['*://*.mymoneyrain.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the source directly from the raw minified code. Here is my verification.

## Four-part decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(...)` in `background.js`. The message object `e` is fully controlled by any webpage on an origin matching the manifest's `externally_connectable.matches`: `*://*.mymoneyrain.com/*`. There is no `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no signature/schema validation in the listener. Provenance `EXTERNAL_MESSAGE` is correct.

**(b) Exact source-to-sink path**
```
chrome.runtime.onMessageExternal.addListener((function(e,t,a){
    "get" == e.action && chrome.storage.local.get(null, (e=>a(e))),
    "set" == e.action && chrome.storage.local.get(null, (t=>{
        e.data.countRunned || (e.data.countRunned = t.countRunned),
        e.data.isShare  || (e.data.isShare  = t.isShare),
        chrome.storage.local.set(e.data)   // <-- sink
    }))
}));
```
The `"set" == e.action` gate is satisfied by an attacker-chosen field value (`{action:"set"}`). The body then writes the entire attacker-supplied `e.data` object into `chrome.storage.local`. Only two keys (`c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
