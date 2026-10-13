# ExPAgent Static Verification — kdnnmhpmcakdilnofmllgcigkibjonof v1.7.41

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_PROFILE` in `background.js` [BG_1] @ L498
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L501

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source — genuinely sensitive data ✓
`chrome.identity.getProfileUserInfo` (background.js:462) returns the signed-in user's Google identity (`{id, email}` — email is returned because the manifest requests `identity.email`). This is real sensitive PII.

### 2. Path — intact ✓
`userInfo` is assigned to `info` and passed to `sendResponse(info)` (background.js:464–465). The data-flow step is real.

### 3. Sink — does not actually deliver (broken channel) ✗
The reported sink (`WINDOW_POSTMESSAGE` at "L501") is mislabeled and stale:

- The actual code is in `chrome.runtime.onMessageExternal.addListener` at lines 457–470, and the real channel is **`sendResponse`**, not `window.postMessage`. (Also, `background.js` is an MV3 **service worker**; `window` does not exist there — the file itself comments *"Can't use window with Manifest V3 in service worker"* at line 446.)
- The reported source/sink line numbers (L498/L501) do not even exist in the current file (it ends at ~L470), indicating a stale mapping; the actual lines are L462/L465.
- Critically, `chrome.identity.getProfileUserInfo` is **asynchronous**, and the `onMessageExternal` listener **does not `retur

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
