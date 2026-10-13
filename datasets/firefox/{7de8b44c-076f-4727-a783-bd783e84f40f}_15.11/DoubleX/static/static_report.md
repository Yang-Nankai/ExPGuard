# ExPAgent Static Verification — {7de8b44c-076f-4727-a783-bd783e84f40f} v15.11

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- **Not reviewed due to analysis budget:** 2 flow(s): [1, 2]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L325
- **Sink**: `CHROME_SYNC_STORAGE` in `content_scripts.js` [CS_1] @ L2540

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification of Flow #0 — STORAGE_POSOING (WINDOW_MESSAGE_EVENT → chrome.storage.sync.set)

### Evidence assessment

The normalized record points at a file named `content_scripts.js`, which does **not** exist in the unpacked CRX/XPI (the real content script is `content.min.js`, loaded on `https://*.youtube.com/*`). The `get_propagation()`/report-source lookups returned no source-level entry. I therefore verified directly against the minified bundle, and the semantic chain is present and concrete.

### (a) Who controls the source

`content.min.js` (module `5031`) defines:

```js
addMessageListener:function(e,t){
  window.addEventListener("message", n => {
    n.source && n.source === window &&
    n.data && n.data.direction &&
    void 0 !== n.data.exId && n.data.exId === e && t(n.data)
  })
}
```

This is a page-to-content-script bridge. The content script later registers it with a 20-char random `exId` (`u = d(20)`, i.e. `generateId(20)`). The gate `n.source === window` and `n.data.exId === e` is **attacker-satisfiable**:

- any script executing in the same page main world trivially has `event.source === window`;
- `exId` is not a browser-authenticated sender id. It is a per-se

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
