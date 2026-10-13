# ExPAgent Static Verification — jjjoiagdgjhecijlkfkipeilgfgbhkgc v0.012

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `background.js` [BG_1] @ L40
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L41

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #0 — DATA_LEAK

### Source-level evidence (from `background.js`)

The report's line numbers are slightly offset, but the reported code anchors match real code exactly. The actual handler is:

```js
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.code == "ping_from_web") {
        sendResponse({status: "Success!"});
    } else if (request.code == "get_from_web") {
        chrome.storage.local.get(request.keys, function(items) {   // L37 (source)
            sendResponse(items);                                    // L38 (sink)
        });
    } else if (request.code == "set_from_web") { ... }
```

The report labels the sink `WINDOW_POSTMESSAGE`, but the actual egress is `sendResponse(items)` — a `chrome.runtime` message response returning to the external sender. That is a functionally equivalent web-accessible egress (MESSAGE_RESPONSE), so the discrepancy does not break the finding.

### Four-part decision ledger

**(a) Who controls the source / read scope.**
`request` is the body of an `onMessageExternal` message sent by a web page. `request.keys` is passed directly to `chrome.storage.local.get(...)`. 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
