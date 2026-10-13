# ExPAgent Static Verification — ahknjhlmgkmlnjeaklpgllgmbjhdfgej v1.6.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.025, scope=0.031
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C7197 -> L1:C7198
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L1:C7660 -> L1:C7936
- **Severity evidence**: ['https://onlineapp.pro/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Flow id #1 (STORAGE_POSOING)

### 1. Source controllability
The source is `chrome.runtime.onMessageExternal.addListener` in `background.js`. The message object `e` and the sender object `t` are supplied by an externally-connected web page. The actual gating logic is:

```js
chrome.runtime.onMessageExternal.addListener((e, t, r) => {
  if (t.url && (t.url.includes("onlineapp.pro") || t.url.includes("onlineapp.live") || t.url.includes("onlineapp.stream")))
    if ("supabase-auth-adapter" === e.source)
      switch (e.action) {
        case "setItem":
          const { key: t, value: s } = e.data;
          return chrome.storage.sync.set({[t]: s}, ...);
```

Both `e.source` and `e.action` are **message fields chosen by the sender** — they are not browser-authenticated credentials. `e.data.key` and `e.data.value` are entirely attacker-controlled.

### 2. Source-to-sink path
The propagation is a single-context (background) flow: `e.data.key` → `t` (computed property key) and `e.data.value` → `s`, then `chrome.storage.sync.set({[t]: s}, …)`. The `setItem` branch is reachable when `e.source === "supabase-auth-adapter"` and `e.action === "setItem"`, both attacker-sat

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
