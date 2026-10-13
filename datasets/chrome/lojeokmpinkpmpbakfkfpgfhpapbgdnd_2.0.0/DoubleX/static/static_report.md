# ExPAgent Static Verification — lojeokmpinkpmpbakfkfpgfhpapbgdnd v2.0.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_PROFILE` in `background.js` [BG_1] @ L126
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L127

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. What the source actually is
The reported source at `background.js:126` is `chrome.identity.getProfileUserInfo((userInfo) => { ... })`. This is a genuine sensitive-data source: it returns the signed-in Chrome profile's identity info, and `userInfo.email` (the user's Google account email) is extracted. The `identity` + `identity.email` permissions are present in the manifest.

### 2. What the sink actually is
The report labels the sink "WINDOW_POSTMESSAGE" with code `se({msg: userInfo.email})`. Reading the real source shows this is a mislabel: the actual line is

```js
sendResponse({ msg: userInfo.email });
```

`sendResponse` is the callback of `chrome.runtime.onMessageExternal`. So the real sink is a **MESSAGE_RESPONSE to an external caller** — not `window.postMessage`. The data-path conclusion is the same or worse: the email is returned directly to whatever web/external origin sent the message.

### 3. Unbroken path
- `chrome.runtime.onMessageExternal.addListener(onRequest)` (line 251) registers `onRequest` for **external** messages.
- In `onRequest`, `if (request.greeting === 'ping')` (line 123) → `chrome.identity.getProfileUserInfo(...)` (line 12

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
