# ExPAgent Static Verification — denohmphfiepkgihlobkpmkbdhgmjigf v3.3.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L227
- **Sink**: `CHROME_SYNC_STORAGE` in `background.js` [BG_1] @ L279

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow 0 (STORAGE_POSOING)

**Source (reported L227):** `background.js` could not be resolved; the actual MV3 service worker is `js/extension-worker.js`. Reading that file shows the real external-message listener at L213:

```js
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (sender.url &&
        (sender.url.includes('onlineapp.pro') ||
         sender.url.includes('onlineapp.live') ||
         sender.url.includes('onlineapp.stream'))) {
        if (message.source === 'supabase-auth-adapter') {
            switch (message.action) {
                ...
                case 'setItem':
                    const { key, value } = message.data;
                    chrome.storage.sync.set({ [key]: value }, () => { ... });
```

The reported "WINDOW_MESSAGE_EVENT" label is imprecise; the real source is `chrome.runtime.onMessageExternal`, which is still attacker-controllable web input.

**Sink (L259):** `chrome.storage.sync.set({ [key]: value })` — the key and value are taken verbatim from `message.data`, an attacker-controlled external message field. This writes attacker-supplied data into persistent extension storage. That is a ge

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
