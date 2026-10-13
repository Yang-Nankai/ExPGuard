# ExPAgent Static Verification — giendkofjkgpomkagbpkeimknkmfadgh v1.6.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.307, scope=0.358
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L45:C4071 -> L45:C4072
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L45:C4546 -> L45:C4808
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener` in the background service worker. The message is an external runtime message. The manifest restricts `externally_connectable.matches` to `["https://appbox.space/*"]`, so only pages on `appbox.space` can reach the listener. Within that surface, every field of the message (`r.source`, `r.action`, `r.data`) is fully attacker/script-controlled. There is no browser-authenticated `sender.id` allowlist — only `sender.url` (`e.url`) and attacker-chosen message fields.

**(b) Source-to-sink path (verified in raw source):**

```js
vt.runtime.onMessageExternal.addListener((r,e,n)=>{
  if(e.url && e.url.includes("appbox.space"))          // sender URL scope check
    if(r.source === "supabase-auth-adapter")           // attacker-chosen field
      switch(r.action){
        ...
        case "setItem":
          try {
            const {key:s, value:c} = r.data;            // attacker data
            return vt.storage.sync.set({[s]:c}, ...)    // sink
```

I confirmed both spans with `read_minified_range`: the source anchor and the `setItem` branch with `vt.storage.sync.set({[s]:c},

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
