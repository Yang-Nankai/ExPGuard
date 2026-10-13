# ExPAgent Static Verification — ifompgilpgnbnopfpfdjcmmpgkgckabi v2.1.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `background.js` [BG_1] @ L163
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L170

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `chrome.storage.sync` read returned to an external web page

### 1. What the code actually does

The minified `background.js` contains an `onMessageExternal` handler. The relevant excerpt (single bundled line, but matching the reported `L163`/`L170` original-source anchors):

```js
chrome.runtime.onMessageExternal.addListener(((e,o,s)=>{
  if(o.url && o.url.includes("appbox.space"))
    if("supabase-auth-adapter"===e.source) switch(e.action){
      ...
      case "getItem":
        try {
          const { key: t } = e.data;
          return chrome.storage.sync.get(t, (e=>{
            if (chrome.runtime.lastError) { ... }
            else s({ status: "success", value: e[t] || null })
          })), true
        }
        ...
```

So:

- **Source (L163):** `chrome.storage.sync.get(t, ...)` — reads a key from extension sync storage.
- **Sink (L170):** `s({status:"success", value: e[t] || null})` — `s` is the `sendResponse` callback for `chrome.runtime.onMessageExternal`. ExPGuard labels it `WINDOW_POSTMESSAGE`, but semantically it is an external-message response returning the stored value to the caller's web page.

### 2. Four-part ledger

**(a) Who controls the

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
