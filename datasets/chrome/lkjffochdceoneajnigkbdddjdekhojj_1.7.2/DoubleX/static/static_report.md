# ExPAgent Static Verification — lkjffochdceoneajnigkbdddjdekhojj v1.7.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L342
- **Sink**: `FETCH_RESOURCE` in `background.js` [BG_1] @ L25

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — REQUEST_FORGERY

### Decision ledger

**(a) Who controls the source?**
The reported source (`WINDOW_MESSAGE_EVENT` at `js/background.js:342`) is misattributed. Line 342 is inside `outputDevicesToList()` building an HTML `<table>` of device names — it is not a message listener, and a Manifest V3 service worker has no `window`/`postMessage` surface at all. However, reading the real source reveals the actual web-accessible input the DoubleX rule was pointing at: `chrome.runtime.onConnectExternal` at `js/background.js:304`.

`externally_connectable.matches: ["*://*.mazii.net/*"]` means any page whose origin is `https://*.mazii.net` can call `chrome.runtime.connect(extensionId)` and get a port. The listener has **no `sender.id` allowlist and no `sender.origin`/URL check** — it directly attaches `port.onMessage`. (It is also reachable by any other installed extension, since cross-extension connect is not restricted by `externally_connectable`.)

**(b) Source-to-sink path**
```
external page on *.mazii.net
  → chrome.runtime.connect(extId)                       // externally_connectable surface
  → chrome.runtime.onConnectExternal          (bg L304)
  → port.on

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
