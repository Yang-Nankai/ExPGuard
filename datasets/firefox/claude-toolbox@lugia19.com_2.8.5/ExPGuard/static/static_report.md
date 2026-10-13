# ExPAgent Static Verification — claude-toolbox@lugia19.com v2.8.5

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.938, scope=0.97
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/helpers/settings` [CS_1] @ L293:C11 -> L293:C26
- **Sink**: `CHROME_LOCAL_STORAGE` in `content/helpers/settings` [CS_1] @ L223:C9 -> L223:C51
- **Severity evidence**: ['https://claude.ai/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — STORAGE_POSOING (attacker-input-storage-write)

### 1. Source controllability
The source anchor `content/helpers/settings.js:293` is a real `window.addEventListener('message', ...)` handler (confirmed at L289). The handler runs in the **ISOLATED** content-script world (where `chrome.storage` is available) and is also duplicated in MAIN world. A page on `https://claude.ai/*` can call `window.postMessage(...)` to deliver arbitrary `event.data`; the only guard is:

```js
if (event.source !== window) return;
```

A same-page `window.postMessage` trivially satisfies this (the page is the source and equals `window`). It is not a sender/extension trust boundary. So `event.data.type`, `event.data.key`, and `event.data.value` are fully attacker-controlled.

### 2. Source-to-sink path (confirmed in source)
- L293 `switch (event.data.type)`
- L303–304 `case 'SETTINGS_SET': await settingsRegistry.set(event.data.key, event.data.value);`
- L219–223 `settingsRegistry.set`: `_resolveKey(keyOrDef)` → `_isLocalKey(keyOrDef)` → `await chrome.storage.local.set({ [key]: value })`

The `value` passed to `chrome.storage.local.set` is the unmodified `event.data.value`. The `ke

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
