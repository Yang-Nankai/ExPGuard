# ExPAgent Static Verification — dooinopjfnhlmmdkdepajfipfhlcmjgp v8.17.0.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 2
- Coverage: node=0.989, scope=1
- Flow types: {'STORAGE_POSOING': 5, 'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 6}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #5 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `gen/ext_bg_module` [BG_1] @ L123:C6 -> L123:C9
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/ext_common` [OPTIONS_1] @ L56:C2 -> L56:C35
- **Bridge**: storage `STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: js/ext_common]`
- **Severity evidence**: ['https://*.crankwheel.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the actual source. The flow is real, and the harness's "AUTHENTICATED_EXTENSION_IPC" classification is incorrect — the fixed extension IDs it found are a self-ID check, not a sender allowlist.

**1. Who controls the source?**
`gen/ext_bg_module.js:122` registers `chrome.runtime.onMessageExternal.addListener(function (req, sender, callback) {...})`. The handler is guarded only by `externally_connectable.matches: ["https://*.crankwheel.com/*", "https://*.meeting.is/*"]`. There is **no `sender.id` check and no `sender.origin`/`sender.url` check** in the handler. The two IDs at line 15 (`klbhnajndhaoadcnjhodkdplkcfehiia`, `gebjopojipeanednoamlckcdldamjecb`) are compared against `chrome.runtime.id` — the extension's *own* runtime ID to pick a default server URL — not `sender.id`. So the source is web-origin-controlled (reachable via any page/XSS on the matching origins), not restricted to a browser-authenticated companion extension.

**2. Exact source→sink path (verified in source):**
- `req.cmd == 'setServerUrl'` (L139) → `setServerUrl(req.url)` (L142) → `objStorageSet({'serverUrl': url})` (L25) → `chrome.storage.local.set(keyVals)` (L59).
- Also `setCrmConfig(req.config)` 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `gen/ext_bg_module` [BG_1] @ L123:C6 -> L123:C9
- **Sink**: `FETCH_RESOURCE` in `gen/ext_bg_module` [BG_1] @ L483:C4 -> L486:C6
- **Bridge**: storage `STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: gen/ext_bg_module]`
- **Severity evidence**: ['https://*.crankwheel.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — Request Forgery via `setServerUrl` → `fetch`

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal` at `gen/ext_bg_module.js:122`. The handler branches on `req.cmd == 'setServerUrl'` and calls `setServerUrl(req.url)` (L139–143). There is **no `sender.id` or `sender.origin` check** anywhere in the listener. The only boundary is the manifest:

```json
"externally_connectable": {
  "matches": ["https://*.crankwheel.com/*", "https://*.meeting.is/*"]
}
```

So the message can be sent by any page on a `*.crankwheel.com` / `*.meeting.is` origin (or a compromised companion extension). The source is attacker-controllable from those web origins.

### (b) Source-to-sink path
Confirmed from the source-level report and raw code:

1. `L139–142` `req.cmd == 'setServerUrl'` → `setServerUrl(req.url)` — `req.url` is fully attacker-controlled.
2. `L24–25` `setServerUrl` → `objStorageSet({'serverUrl': url})`.
3. `L58–59` `objStorageSet` → `chrome.storage.local.set(keyVals)` (storage poisoning sink).
4. `L9–13` `getServerUrl` reads `serverUrl` back from storage and returns the stored value verbatim (`callback(value)`).
5. `L480–483` `internalApiCall` → 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
