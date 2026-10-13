# ExPAgent Static Verification — ladnfgcfpnjmepgopehjdcmfogokdlbe v3.1.15

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.03, scope=0.036
- Flow types: {'REQUEST_FORGERY': 1, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/sac` [CS_1] @ L1:C526 -> L1:C551
- **Sink**: `FETCH_RESOURCE` in `js/background` [BG_1] @ L2:C1489028 -> L2:C1489069
- **Bridge**: message `runtime.single.sender.message[js/sac->js/background]`
- **Severity evidence**: ['https://*.share-a-cart.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (REQUEST_FORGERY: WINDOW_MESSAGE_EVENT → FETCH_RESOURCE)

### Four-part decision ledger

**(a) Who controls the source?**
The page running under `https://*.share-a-cart.com/*` controls the data. The content script (`js/sac.js`) installs:

```js
window.addEventListener("message", e => {
  if (e.source === window && e.data && "from-page-script" === e.data.direction) {
    const {action:s} = e.data.message;
    if ("load-cart-from-site" === s) {
      const {vendor:t, cartId:s, cartItems:r, sourceParam:o} = e.data.message;
      (t === SAC_FLAVOR || "everything" === t && "sac" === SAC_FLAVOR) &&
        chrome.runtime.sendMessage({action:"receive-cart", id:s, cartItems:r, sourceParam:o});
    }
    ...
```

`e.source === window`, `e.data.direction`, `action`, `vendor`, and `cartId` are all chosen by the page's own `window.postMessage`. The `vendor` check is attacker-satisfiable (the page simply sets `vendor: "walmart"`, matching `SAC_FLAVOR`). So the page controls the `id` field that reaches the background. ✅

**(b) Exact source-to-sink path**
Page `postMessage` → content-script listener → `chrome.runtime.sendMessage({action:"receive-cart", id:cartId, ...})`

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
