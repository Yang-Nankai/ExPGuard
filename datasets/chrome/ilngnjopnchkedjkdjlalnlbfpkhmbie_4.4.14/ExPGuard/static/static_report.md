# ExPAgent Static Verification — ilngnjopnchkedjkdjlalnlbfpkhmbie v4.4.14

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 1
- Coverage: node=0.561, scope=0.583
- Flow types: {'STORAGE_POSOING': 6}  |  Severities: {'HIGH': 6}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C10832 -> L1:C10833
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C14843 -> L1:C15087
- **Bridge**: storage `STORAGE_FLOW[area: local, key: current, sender: background, receiver: background]`
- **Severity evidence**: ['*://*.custom-cursor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — STORAGE_POSOING (attacker-input-storage-write)

### (a) Who controls the source?
The source anchor is `chrome.runtime.onMessageExternal.addListener((async(t,e,a)=>{...switch(t.action)...})` in `background.js`. The manifest's `externally_connectable` allows `*://*.custom-cursor.com/*` and `*://*.custom-cursor-trails.com/*` to call this listener. A web page on any such origin (wildcard subdomain) can send `chrome.runtime.sendMessage(EXTENSION_ID, payload)`, so the entire message object `t` is attacker-controllable. The wildcard subdomain match further widens the reachable surface.

### (b) Source-to-sink path
I confirmed the exact sink region in `background.js`:

```js
case"setAnimation":{
  const{data:e}=t;                        // e = attacker message data
  chrome.storage.local.get(["current"],(({current:t})=>{
    t.animationType=e.animationType,       // attacker value injected into stored object
    chrome.storage.local.set({current:t,animationType:e.animationType}, ()=>{...})
  }))
}
```

The chain is unbroken: external message `t` → `switch(t.action)` (`"setAnimation"`) → `const {data:e}=t` → `e.animationType` → `chrome.storage.local.set({current

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
