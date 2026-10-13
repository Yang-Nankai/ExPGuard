# ExPAgent Static Verification — @ffn v8.0.6

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 1
- **Not reviewed due to analysis budget:** 3 flow(s): [1, 2, 3]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1, 'REQUEST_FORGERY': 1, 'DATA_LEAK': 2}  |  Severities: {'UNKNOWN': 4}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 3 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L48
- **Sink**: `CHROME_SYNC_STORAGE` in `content_scripts.js` [CS_1] @ L87

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've located the actual content script (`contentScript.bundle.js` — the reported `content_scripts.js` is the pre-bundle source name) and read the relevant minified range. The evidence is conclusive.

## Decision ledger

**(a) Who controls the source?**
The page controls it. `contentScript.bundle.js` registers `window.addEventListener("message", ...)` with **no origin check and no `event.source` check**. The content script runs on every `http://*/*` / `https://*/*` frame (`allFrames: true`), so any webpage (or any frame in it) can fire this listener with a forged `window.postMessage`.

**(b) Exact source-to-sink path**
```
window.addEventListener("message", t => {
  if (t.data) {
    const o = t.data.message ? t.data.message : t.data;   // attacker-controlled
    ...
    "save_storage" === o.type &&
      ((e,n,t) => {
        chrome.storage.sync.get(e, s => {
          const o = s && s[e] ? s[e] : {};
          n.forEach((e,n) => { o[e] = t[n] });            // merge attacker attrs/values
          chrome.storage.sync.set({ [e]: o });            // SINK
        })
      })(o.key, o.attributes, o.values),
    ...
```
The listener extracts `o = t.data.message || t.data` (attacker-cho

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
