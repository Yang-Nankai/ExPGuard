# ExPAgent Static Verification — imepglbecbimebpacblphbefkkmglnia v1.5.3

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_PROFILE` in `background.js` [BG_1] @ L275
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L278

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow: `chrome.identity.getProfileUserInfo` → `window.postMessage` (DATA_LEAK)

### (a) Who controls the source
The source is `chrome.identity.getProfileUserInfo(null, callback)` in `background.js`. It returns the signed-in Chrome profile's `email` and `id` (sensitive browser-identity data, not attacker input). The *trigger* is `request.info` being truthy in an `onMessageExternal` listener, which an external page can set. So the source is genuinely sensitive data, but this is an egress flow, not an input-taint flow.

### (b) Exact source-to-sink path
The actual code (lines 231–244):

```js
chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        var info = {};
        if (sender.url.match(/seabreezecomputers\.com/i)) {
            if (request.info) {
                chrome.identity.getProfileUserInfo(null, function(userInfo) {
                    console.log(userInfo);
                    info = userInfo;
                    sendResponse(info);
                });    
            }
        }
    }
);
```

`userInfo` → `info` → `sendResponse(info)`. Statically the value reaches the egress function.

### (c) Security-releva

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
