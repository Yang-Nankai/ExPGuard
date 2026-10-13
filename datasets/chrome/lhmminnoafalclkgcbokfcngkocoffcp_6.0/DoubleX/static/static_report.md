# ExPAgent Static Verification — lhmminnoafalclkgcbokfcngkocoffcp v6.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- **Not reviewed due to analysis budget:** 1 flow(s): [2]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L2
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L53
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the raw source. The report's sink (background.js L53) and source (content script window message) are both real, and the bridge connects.

## Four-part decision ledger

**(a) Who controls the source?**
`content.js` L1–2:
```js
window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data.type) return;
```
This is a PAGE_TO_CONTENT_SCRIPT bridge. The guard `event.source !== window` is satisfied by the page's own `window.postMessage`, and `event.data.type` is an attacker-chosen field — neither is an authentication boundary. A page on the content-script-matched origins (or XSS on those origins) fully controls `event.data.type` and `event.data.payload`. Provenance is genuine web/attacker input.

**(b) Exact source-to-sink path**
- `content.js` L34–39: when `event.data.type === "SET_FULL_TOKEN_TO_EXTENSION"`, the content script forwards `{ type: event.data.type, payload: event.data.payload }` via `chrome.runtime.sendMessage`.
- `background.js` L5–6: `chrome.runtime.onMessage` receives it with no `sender.id`/origin check.
- `background.js` L49–55: `if (message.type === "SET_FULL_TOKEN_TO_EXTENSION")` → `chrome.storage.local.set({ 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L2
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L138
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the raw source. The report's sink (background.js L53) and source ...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
