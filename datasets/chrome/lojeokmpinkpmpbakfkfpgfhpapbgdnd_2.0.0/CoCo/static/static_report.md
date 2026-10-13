# ExPAgent Static Verification — lojeokmpinkpmpbakfkfpgfhpapbgdnd v2.0.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_PROFILE` in `crx_headers/expguard_compat_header.js` [UNKNOWN] @ L83:C1 -> L83:C1
- **Sink**: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` in `background.js` [UNKNOWN] @ L126:C1 -> L126:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'SENSITIVE_DATA', 'sinkCapability': 'MESSAGE_RESPONSE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

### (a) Who controls the source
The source is **not attacker input** — it is the extension user's own **sensitive identity data**. The real source (visible in `background.js:125`) is:

```js
chrome.identity.getProfileUserInfo((userInfo) => {
    sendResponse({ msg: userInfo.email });
});
```

`getProfileUserInfo` returns the signed-in account's `id` and `email`; the manifest grants `identity` and `identity.email`, so `userInfo.email` is populated. This is genuine **SENSITIVE_DATA (PII)**, not a guessed variable name. The synthetic `expguard_compat_header.js` `MarkSource(value, 'CHROME_IDENTITY_PROFILE')` is just ExPGuard's instrumentation of this call.

### (b) Source-to-sink data path
The chain is intact and fully verifiable in real source:

1. `background.js:251` — `chrome.runtime.onMessageExternal.addListener(onRequest);` (listener actually registered).
2. `background.js:122-128` — `onRequest` checks `request.greeting === 'ping'`, then calls `chrome.identity.getProfileUserInfo`, and in the callback does `sendResponse({ msg: userInfo.email })`.
3. The `sendResponse` is the async response channel for `onMessageExternal`, returning the email to the externa

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
