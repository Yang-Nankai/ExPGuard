# ExPAgent Static Verification — adkbpbalabenjlfngiefoifoebjpbjjl v2.3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L758
- **Sink**: `CHROME_SYNC_STORAGE` in `background.js` [BG_1] @ L809

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #0 — STORAGE_POSOING (`chrome.storage.sync.set`)

### 1. Source reachability (who controls the input)

The reported file `background.js` does not exist; the actual background service worker is `js/extension-worker.js` (per the manifest). The reported source type `WINDOW_MESSAGE_EVENT` is a slight mislabel — the real external input surface is **`chrome.runtime.onMessageExternal.addListener`** at `js/extension-worker.js:726`, which is an attacker/web-content message source (the only real `window.addEventListener('message')` in the extension, `engine/index.js:6`, never reaches any storage sink).

The handler receives `(message, sender, sendResponse)` from web pages allowed by `externally_connectable`:
- `https://onlineapp.pro/*`, `https://onlineapp.stream/*`, `https://onlineapp.live/*`

The guard is:
```js
if (sender.url && (sender.url.includes('onlineapp.pro') ||
                   sender.url.includes('onlineapp.live') ||
                   sender.url.includes('onlineapp.stream')))
```
This is a **substring (`includes`) origin check**, not a browser-authenticated `sender.id` equality/allowlist. Per the trust rules, a web-origin guard is exploitable via XSS on 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
