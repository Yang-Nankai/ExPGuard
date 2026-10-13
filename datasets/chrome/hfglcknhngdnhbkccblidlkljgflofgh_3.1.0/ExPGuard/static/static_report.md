# ExPAgent Static Verification — hfglcknhngdnhbkccblidlkljgflofgh v3.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.152, scope=0.218
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content` [CS_1] @ L1:C11056 -> L1:C11064
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L1:C7318 -> L1:C7351
- **Bridge**: storage `STORAGE_FLOW[area: local, key: labs-sessions, sender: content, receiver: content]`
- **Severity evidence**: ['https://*.force.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow #3 — STORAGE_POSOING via `labsPermCheck` CustomEvent → `chrome.storage.local.set('labs-sessions')`

### Four-part ledger

**(a) Who controls the source?**
The source is `WINDOW_CUSTOM_EVENT` in `content.js` at L1:C11056 — the `window.addEventListener("labsPermCheck", e => ...)` handler reading `e.detail.labsAllowed` and `e.detail.labsAdminDisabledFeatures`. This listener runs in the content script's **ISOLATED** world, but DOM `CustomEvent`s cross world boundaries, and a page can construct/dispatch them freely. The deterministic harness confirms: *"A page can forge window.postMessage/CustomEvent fields … message action/type fields are not authentication."* No nonce, signature, or `sender.id`/`origin` check exists; the handler trusts any `e.detail`. The content script runs on `https://*.force.com/*`, `https://*.salesforce.com/*`, `https://*.visualforce.com/*` — Salesforce Sites/Communities and Visualforce pages are user-hostable surfaces, so a page-controlled payload is realistic. ✅ attacker-controllable.

**(b) Exact source→sink path**
From the raw source (C10900–11900):

```js
window.addEventListener("labsPermCheck", function e(t){
  window.removeEventListener("labsPermChe

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content` [CS_1] @ L1:C10470 -> L1:C10478
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C754 -> L1:C787
- **Bridge**: storage `STORAGE_FLOW[area: local, key: plugin-metrics, sender: content, receiver: background]`
- **Severity evidence**: ['https://*.force.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification of Flow #4 — STORAGE_POSOING (`attacker-input-storage-write`)

### Decision ledger

**(a) Who controls the source — ATTACKER-CONTROLLED (confirmed).**
`content.js` registers, in the **top frame only** (`u() === window !== window.top`), the listener:

```js
window.addEventListener("savePluginMetrics", e => {
  e && e.detail && e.detail.id && e.detail.state && (async function(e,n){
    o(`Saving metrics for feature '${e}'`, n);
    const t = await chrome.storage.local.get(s);   // s === "plugin-metrics"
    t[s] || (t[s] = {});
    t[s][e] = n;
    chrome.storage.local.set(t);                    // immediate storage write
  })(e.detail.id, e.detail.state);
});
```

I confirmed `const s = "plugin-metrics"` at content.js L1 C~1590 and `u(){ return window !== window.top }`. A page running in the top frame on `https://*.force.com/*`, `https://*.salesforce.com/*`, or `https://*.visualforce.com/*` can dispatch `savePluginMetrics` with arbitrary `detail.id` / `detail.state`. There is no origin check, no sender.id allowlist, and the field checks (`e.detail.id && e.detail.state`) are attacker-chosen values.

**(b) Source-to-sink path — UNBROKEN.**
`window CustomEvent` → conten

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
