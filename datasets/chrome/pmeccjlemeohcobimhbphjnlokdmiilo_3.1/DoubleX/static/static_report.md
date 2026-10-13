# ExPAgent Static Verification — pmeccjlemeohcobimhbphjnlokdmiilo v3.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [1, 2]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L208
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L300

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification

**Decision ledger**

1. **Who controls the source?**  
   The reported source locator (`WINDOW_MESSAGE_EVENT`, `background.js:208`) does not match the actual code: line 208 is `chrome.storage.sync.get(...)` inside a storage callback, and there is no `window.addEventListener`/`onmessage` in `background.js`. The *real* untrusted entry point is:

   ```js
   background.js:178  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
   ```

   This is reachable by web pages that are allowed by the manifest's `externally_connectable.matches`, i.e. `https://appbox.space/*`.

2. **Source-to-sink path**  
   `sender.url.includes('appbox.space')` (L180-181) → `message.source === 'supabase-auth-adapter'` (L183) → `message.action === 'setItem'` (L226) → destructure:

   ```js
   background.js:228  const { key, value } = message.data;
   background.js:242  chrome.storage.local.set({ [key]: value }, () => { ... });
   ```

   Both `key` and `value` are entirely attacker-supplied message fields. They are not validated, schema-checked, or overwritten by a constant.

3. **Which security-relevant argument is attacker-controlled?**  
   The full storage obj

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
