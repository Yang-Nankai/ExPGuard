# ExPAgent Static Verification — bogabmgabnjabjbiggmfkdocbjgackfo v6.2.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.196, scope=0.167
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C10242 -> L1:C10243
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C3458 -> L1:C3519
- **Severity evidence**: ['*://*.custom-cursor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have all the evidence I need. Let me lay out the decision ledger.

## Analysis

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener` in `background.js`. The manifest's `externally_connectable.matches` lists web origins:
`*://*.custom-cursor.com/*`, `*://*.custom-cursor-helper.com/*`, `*://*.cursor-helper.com/*`, `*://*.custom-cursors.com/*` — with **wildcard subdomain matching**, so any page served from those (sub)domains can reach the listener via `chrome.runtime.sendMessage(extensionId, msg)`. Per the trust rules, externally-connectable web hosts are attacker-reachable via XSS/subdomain takeover on those domains → attacker-controllable (`EXTERNAL_MESSAGE` provenance).

**(b) The source→sink path (confirmed in raw source at C10242+):**
```js
chrome.runtime.onMessageExternal.addListener(async(t,o,s)=>{  // t = message, o = sender (SHADOWED!)
  try{ let o=await u(); switch(o.collections||(o.collections=[]), t.action){
    case"addPack": {const{collection:r,pack:i}=t; ... chrome.storage.local.set(o) ... }
    case"addCollection": {... o.collections=...; chrome.storage.local.set(o)...}
    case"toogleFavoritePack": {... chrome.storage.local.s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C10242 -> L1:C10243
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C4533 -> L1:C4727
- **Severity evidence**: ['*://*.custom-cursor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source.** The source is the `message` argument `t` of the handler registered at `background.js` L1:C10182:
`chrome.runtime.onMessageExternal.addListener(async(t,o,s)=>{try{let o=await u();switch(o.collections||(o.collections=[]),t.action){...}})`.
`onMessageExternal` messages are delivered from any sender permitted by the manifest `externally_connectable` block, which here is web origins `*://*.custom-cursor.com/*`, `*://*.custom-cursor-helper.com/*`, `*://*.cursor-helper.com/*`, `*://*.custom-cursors.com/*` (wildcard subdomains, `*://` = http allowed). No `event.origin`/`sender.url` validation appears in the handler.

**(b) The exact source→sink path.** Two concrete, reachable legs, both fully attacker-controlled:
- `case "set_config"`: `t.data.selectedCursorPack` → `w(e, o.size)` → `chrome.storage.local.set({selectedCursorPack:o,size:t}, …)` at L1:C4533 (the reported sink). The first argument `e` is `t.data.selectedCursorPack`, and inside `w` it becomes the `selectedCursorPack:` value written to storage.
- Fallback: `await g(t.data).then(e=>s(e))` where `g = e=>new Promise(... chrome.storage.local.set(e,...))` (L1:C3458) — this writes th

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C10242 -> L1:C10243
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L1:C3585 -> L1:C3593
- **Severity evidence**: ['*://*.custom-cursor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

**Deterministic ledger**

**(a) Who controls the source.** The source is the `message` parameter `t` of `chrome.runtime.onMessageExternal.addListener(async(t,o,s)=>{…switch(t.action)…})` (background.js, C≈10140–10243). The receiver performs **no** `sender.id` / `sender.origin` / `sender.url` validation — the sender object is shadowed by `let o=await u()`. Reachability is governed by `externally_connectable.matches`, which are **web origins** (`*://*.custom-cursor.com/*`, `*://*.custom-cursor-helper.com/*`, `*://*.cursor-helper.com/*`, `*://*.custom-cursors.com/*`). Any page on those origins (or via XSS/subdomain on them) can `chrome.runtime.sendMessage(extId, payload)`. Source = attacker-influenced web input.

**Harness caveat resolved.** The harness's `authenticatedExtensionAllowlist` / `PA_PARTIAL_TRUSTED_IPC` (with `senderIdCheck:false`) is a **false artifact**: the three "fixed extension ids" (`bogabmgabnjabjbiggmfkdocbjgackfo`, `ilngnjopnchkedjkdjlalnlbfpkhmbie`, `nbkomboflhdlliegkaiepilnfmophgfg`) are merely Chrome‑Web‑Store *listing* IDs of the developer's other products embedded in notification HTML strings (read at C6000–14200). There is no `sender.id === 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
