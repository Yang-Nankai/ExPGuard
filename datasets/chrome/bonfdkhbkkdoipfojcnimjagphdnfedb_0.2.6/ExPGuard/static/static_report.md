# ExPAgent Static Verification — bonfdkhbkkdoipfojcnimjagphdnfedb v0.2.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.38, scope=0.42
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-C5kIJibv` [BG_1] @ L2:C121028 -> L2:C121029
- **Sink**: `CHROME_LOCAL_STORAGE` in `assets/index.ts-C5kIJibv` [BG_1] @ L1:C1033 -> L1:C1125
- **Severity evidence**: ['https://datahive-dashboard-development.web.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've now recovered the actual code. Here is my verification.

## What the source actually does

From `assets/index.ts-C5kIJibv.js` (line 3, the background/service-worker bundle), the real handler is:

```js
chrome.runtime.onMessageExternal.addListener((e,t,n)=>{
  switch(e.action){
    case"login":
      return ta=!1,
        e.email && e.jwt && chrome.storage.local.get(["jwt","isConnected"],({jwt:t,isConnected:r})=>{
          l({email:e.email, jwt:e.jwt, isConnected:!t||r})          // <-- storage WRITE with attacker values
            .then(()=>{d.getWorker(), n({success:!0})})
            .catch(e=>{u.error("Failed to set app store",{error:e}), n({success:!1})})
        }), !0;
    case"logout":   return l({email:"",jwt:"",isConnected:!1})...   // literal write, corroborates sink identity
    case"isLoggedIn": return chrome.storage.local.get(["jwt"],...)
    case"isInstalled": return n({isNewlyInstalled:ta}), !0
  }
})
```

`l` is bound from the bundle import `import{... s as l ...}from"./apiClient-etL1MrFo.js"` and is the extension's storage-set helper — confirmed by the catch-path message `"Failed to set app store"` and by the sibling `logout` branch that writes constant lite

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-C5kIJibv` [BG_1] @ L2:C121028 -> L2:C121029
- **Sink**: `CHROME_LOCAL_STORAGE` in `assets/index.ts-C5kIJibv` [BG_1] @ L1:C1033 -> L1:C1125
- **Severity evidence**: ['https://datahive-dashboard-development.web.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me lay out the verified facts from the actual source.

**Actual handler source** (`assets/index.ts-C5kIJibv.js`, line 3, ~col 107000–110000):

```js
chrome.runtime.onMessageExternal.addListener(((e,t,n)=>{
  switch(e.action){
    case"login":
      return ta=!1,
        e.email && e.jwt && chrome.storage.local.get(["jwt","isConnected"],(({jwt:t,isConnected:r})=>{
          l({email:e.email, jwt:e.jwt, isConnected:!t||r})      // <-- sink
            .then((()=>{d.getWorker(), n({success:!0})}))
            .catch(...)
        })), !0;
    case"logout":   return l({email:"",jwt:"",isConnected:!1})...,!0;
    case"isLoggedIn": return chrome.storage.local.get(["jwt"],(({jwt:e})=>n(!!e))),!0;
    case"isInstalled": return n({isNewlyInstalled:ta}),!0;
  }
}))
```

**Four-part ledger**

1. **Who controls the source** — `e` is the external-message payload (`chrome.runtime.onMessageExternal.addListener[message]`, source type `CHROME_ONMESSAGEEXTERNAL_MESSAGE`, provenance `EXTERNAL_MESSAGE`). The listener does **no** `sender.id` / `sender.origin` check anywhere (`search_code` for `sender\.(id|origin|url)` → NO MATCHES). Reachability is governed only by the manife

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-C5kIJibv` [BG_1] @ L2:C121028 -> L2:C121029
- **Sink**: `CHROME_LOCAL_STORAGE` in `assets/index.ts-C5kIJibv` [BG_1] @ L1:C1033 -> L1:C1125
- **Bridge**: storage `STORAGE_FLOW[area: local, key: jwt, sender: assets/index.ts-C5kIJibv, receiver: assets/index.ts-C5kIJibv]`
- **Severity evidence**: ['https://datahive-dashboard-development.web.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

### Deterministic harness / anchor handling
The harness warnings are correct that the *reported* anchors are unreliable:
- The reported **sink** anchor (`assets/Text-CNnetboo L1:C1033-1125` / `assets/index.ts-C5kIJibv` "isObject/toArray/repeat") points into **js-yaml helper code** — a coincidental minified match, not a storage call. Harness `sourceAnchor.snippet`/`sinkAnchor.snippet` are literally empty (`…`), and both `read_minified_range` probes at C120900+ returned nothing.
- So I resolved the *real* code path in the resolved bundle `assets/index.ts-C5kIJibv.js` (line 3, ~C107900+), which contains the actual listener.

### The real source → sink path (confirmed in raw source)
`assets/index.ts-C5kIJibv.js` @ L3 C107900+, the verbatim app code:

```js
chrome.runtime.onMessageExternal.addListener(((e,t,n)=>{
  switch(e.action){
    case"login":
      return ta=!1,
        e.email && e.jwt && chrome.storage.local.get(["jwt","isConnected"],
          ({jwt:t,isConnected:r})=>{
            l({email:e.email, jwt:e.jwt, isConnected:!t||r})   // <-- storage WRITE
              .then(()=>{d.getWorker

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
