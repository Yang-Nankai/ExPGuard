# ExPAgent Static Verification — lfidjngibpklhhijphdmbmedchiiolgk v8.18.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.967, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟠 PARTIAL / PA  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `filterUrl` [BG_1] @ L1:C9715 -> L1:C9716
- **Sink**: `CHROME_LOCAL_STORAGE` in `filterUrl` [BG_1] @ L1:C6212 -> L1:C6246
- **Bridge**: storage `STORAGE_FLOW[area: local, key: data, sender: filterUrl, receiver: filterUrl]`
- **Severity evidence**: ['isolated-app://ckg65ilaae42o6wd3uj4xfwznhba7pz2p6kojga5c27hkwq5f66qaaic/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → CHROME_LOCAL_STORAGE)

### 1. Who controls the source?
The source is `t`, the message payload of:

```js
chrome.runtime.onMessageExternal.addListener(function(t,e){
  e.id!==CHROME_CLIENT_APP_ID && e.origin!==IWA_CLIENT_ORIGIN_ID || !t || "updateRule"!==t.type || ...
```

`t` (and specifically `t.content`) is attacker-controlled **by whatever sender is allowed to reach this listener**. Reachability is restricted by both the in-code guard and the manifest `externally_connectable`:

- `ids: ["ppkfnjlimknmjoaemnpidmdlfchhehel"]` — fixed, browser-authenticated extension ID.
- `matches: ["isolated-app://ckg65ilaae42o6wd3uj4xfwznhba7pz2p6kojga5c27hkwq5f66qaaic/*"]` — isolated web app origin (also browser-authenticated, tied to a signed web bundle).

The guard logic `e.id !== CHROME_CLIENT_APP_ID && e.origin !== IWA_CLIENT_ORIGIN_ID || ...` rejects only when **both** the sender ID and origin are wrong. So the handler accepts either the fixed companion extension ID **or** the fixed isolated-app origin. An ordinary webpage cannot satisfy `externally_connectable`, so this is a trusted-peer-only boundary, not an open web attack su

**Attacker control:** See preserved static analyst transcript.

**PA category:** `PA_PARTIAL_TRUSTED_IPC`

**Why partially available:** The privileged path is reachable only from a fixed, browser-authenticated extension sender ID. It is not reachable by an ordinary webpage, but remains partially available to the trusted companion/peer extension (or if that peer is compromised).

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)
- Notes: PA_PARTIAL_TRUSTED_IPC: do not attempt as an ordinary webpage; requires the browser-authenticated companion extension.

---
