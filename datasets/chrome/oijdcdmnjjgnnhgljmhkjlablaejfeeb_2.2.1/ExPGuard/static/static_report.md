# ExPAgent Static Verification — oijdcdmnjjgnnhgljmhkjlablaejfeeb v2.2.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.118, scope=0.041
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/service_worker.js` [BG_1] @ L1:C310 -> L1:C311
- **Sink**: `CHROME_LOCAL_STORAGE` in `assets/service_worker.js` [BG_1] @ L1:C473 -> L1:C563
- **Severity evidence**: ['https://*.the-qrcode-generator.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 22, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Flow:** `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE` (`fire_refresh_token`) in `assets/service_worker.js` / `assets/firebase-auth.js`.

### 1. Who controls the source?
- The source is `chrome.runtime.onMessageExternal.addListener((e,t,s)=>{...})` in the MV3 service worker.
- `e` is the message object sent by any external page that matches `externally_connectable`.
- Manifest `externally_connectable.matches` is `https://*.the-qrcode-generator.com/*`, so any page on `the-qrcode-generator.com` or any subdomain can call `chrome.runtime.sendMessage(EXTENSION_ID, ...)`.
- There is no `sender.id` allowlist, no `sender.origin` equality guard, and no validation of `e.refreshToken` / `e.uid`. The only gate is `e.type === "SYNC_FIREBASE_SESSION"`, which is an attacker-chosen message field.

### 2. Source-to-sink path
In `assets/service_worker.js`:

```js
chrome?.runtime?.onMessageExternal?.addListener((e,t,s)=>{
  if(e.type==="SYNC_FIREBASE_SESSION")
    return o(e.refreshToken,e.uid).then(...)
})
```

`o` is imported as the exported function `s` from `assets/firebase-auth.js`, which is `P(e,r)`:

```js
async function P(e,r){
  await a(i,e);   // i === "

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
