# ExPAgent Static Verification — mnampbajndaipakjhcbbaihllmghlcdf v3.1.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.764, scope=0.709
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `service_worker` [BG_1] @ L19:C20060 -> L19:C20061
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `service_worker` [BG_1] @ L17:C22394 -> L17:C22430
- **Severity evidence**: ['https://web.vendoo.co/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE → CHROME_TABS_CREATE_OPTIONS`

### (a) Who controls the source
The source is `chrome.runtime.onConnectExternal.addListener(RF("external"))` in the service worker (`service_worker.js` L19). `externally_connectable.matches` restricts connection to four `*.vendoo.co` origins, but the message **payload is fully attacker/page-controlled**: the code passes `o(i,s)` straight through with no `sender.id`, no `sender.origin`, and no message-field allow-list. `search_code("sender")` returned **NO MATCHES**, confirming no browser-authenticated sender trust boundary exists anywhere in the worker.

The only restriction is the `externally_connectable` origin allow-list. Per the harness rules, a specific-host `externally_connectable` list reduces scope but is **exploitable via XSS on those domains**; it is not an unforgeable boundary.

### (b) Source-to-sink path (verified in raw source)
From the minified worker I traced the concrete dispatch chain:

1. `RF` registers `r.onMessage.addListener((i,s)=>{ … o(i,s) })` where `o = Fv(...)` (L19 C19400–20100). No guard.
2. `Fv=({logger,type})=>(r,n)=>qn(...,{message:r,msgPort:n})` (L17).
3. 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
