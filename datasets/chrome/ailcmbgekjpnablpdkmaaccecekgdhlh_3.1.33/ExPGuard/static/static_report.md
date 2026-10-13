# ExPAgent Static Verification — ailcmbgekjpnablpdkmaaccecekgdhlh v3.1.33

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.641, scope=0.569
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L6:C24365 -> L6:C24366
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L5:C15079 -> L5:C15102
- **Severity evidence**: ['https://*.workona.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE → chrome.storage.local.set ("wkTabCache")

### Four-part decision ledger

**(a) Who controls the source?**
The source is the `message` argument `e` of the listener registered at `chrome.runtime.onMessageExternal.addListener(Fi)`. `Fi` forwards the raw message straight to `Xh(e,r)` with **no sender validation**:

```js
var Fi=(e,r,t)=>{ ... return Xh(e,r).then(n).catch(i),!0};
chrome.runtime.onMessage.addListener(Fi);
chrome.runtime.onMessageExternal.addListener(Fi);
```

The manifest declares `externally_connectable.matches = ["https://workona.com/*","https://*.workona.com/*"]`. Chrome delivers external messages from those **web origins** (and from any extension) to `onMessageExternal`. I inspected the whole `Fi` body and the `Xh` dispatcher: there is **no `sender.id`, `sender.origin`, or `sender.url` check**. The harness's own evidence agrees — `codeEvidence: {senderIdCheck:false, allowlistCue:true}` — i.e. an array of extension-ID-looking strings exists somewhere, but **no `sender.id` comparison gates this listener**. The harness's `AUTHENTICATED_EXTENSION_IPC` / `PA_PARTIAL_TRUSTED_IPC` label is therefore not backed by 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L6:C24365 -> L6:C24366
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L5:C15079 -> L5:C15102
- **Severity evidence**: ['https://*.workona.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me confirm the concrete sink path and that no sender/origin guard exists.

Key findings from source inspection:

1. **Source registration (no guard):** `chrome.runtime.onMessageExternal.addListener(Fi)` where `Fi=(e,r,t)=>{...return Xh(e,r).then(n).catch(i),!0}` — the external message `e` is passed straight into the dispatcher `Xh(e, sender)` with **no sender.id / sender.origin check**. A search for `sender.id|senderId|sender.url|sender.origin` in `background.js` returns **NO MATCHES**, i.e. there is no unforgeable inter-extension trust boundary anywhere.

2. **The harness "fixed extension-ID allowlist" cue is a false cue:** the IDs `ailcmbgekjpnablpdkmaaccecekgdhlh`, `gdfnelpciiajgjenlapgkdcjpcfpfpob`, etc. appear only as constants used to build **tab-URL regexes** (e.g. `chrome-extension://klbibkeccnjlkjkiokjodocebajanakg/suspended.html#`), not as `sender.id` comparisons (`senderIdCheck:false` in the harness confirms this). So `PA_PARTIAL_TRUSTED_IPC` is unsound here.

3. **Reachability:** manifest `externally_connectable.matches = ["https://workona.com/*","https://*.workona.com/*"]` → any page on workona.com or **any wildcard subdomain** (XSS / subdom

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
