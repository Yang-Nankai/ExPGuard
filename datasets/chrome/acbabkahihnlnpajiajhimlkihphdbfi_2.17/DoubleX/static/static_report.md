# ExPAgent Static Verification — acbabkahihnlnpajiajhimlkihphdbfi v2.17

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L307
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L315

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0 (STORAGE_POSOING)

### Source-level evidence vs. real source

The report cites `background.js` L307 (source) and L315 (sink), but `get_propagation()` found no source-level entry and the cited line numbers are drifted. Reading the real source resolves the discrepancy cleanly:

- `background.js:284` — `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {...})`
- `background.js:292-296` — the *only* storage write in this region and the one that matches the sink code context:

```js
await chrome.storage.local.set({
    Sendmsgcontentscript: request?.key || null,
    ClearBlockingkey: request || null,
    examTabId: examTabId || null
});
```

The reported source "WINDOW_MESSAGE_EVENT" is an external message received via `chrome.runtime.onMessageExternal`. There is no `window`/`addEventListener('message')` in `background.js` (search confirmed no matches), so the real source is the external runtime message listener at L284.

### Four-part ledger

1. **Who controls the source?** Any web page on the `externally_connectable.matches` origins (`https://examroom.ai/*`, `https://test.examroom.ai/*`, `https://dev.examroom.ai/*`, `http://loca

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
