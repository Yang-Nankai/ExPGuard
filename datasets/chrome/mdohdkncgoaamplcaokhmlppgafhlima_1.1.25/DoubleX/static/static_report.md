# ExPAgent Static Verification — mdohdkncgoaamplcaokhmlppgafhlima v1.1.25

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `content_scripts.js` [CS_1] @ L51
- **Sink**: `WINDOW_POSTMESSAGE` in `content_scripts.js` [CS_1] @ L52

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've reconstructed the full content script and traced the data end-to-end. Here is my analysis.

## Four-part decision ledger

**(a) Who controls the source**
The reported source is `chrome.storage.local.get` in the content script (`content.js`, misnamed `content_scripts.js` in the report). The actual code reads only one key:

```js
chrome.storage.local.get(["msg"], e=>{ e && e.msg && postMessage({type:"hidebmsg",value:e.msg.toString()},"*") })
```

The `msg` key is written **only by the extension popup** as a boolean checkbox:

```js
chrome.storage.local.set({ads: document.querySelector("#ads").checked,
                          msg: document.querySelector("#msg").checked}, ...)
```

and defaults to `false` in `background.js` (`o={msg:!1,ads:!0}`). It is a user UI preference ("hide broadcaster message"), **not** attacker/web-controlled and not network-derived. The page cannot write this storage key (the content script has no storage-write/message bridge for it).

**(b) Exact source-to-sink data path**
The path is real, not broken: `chrome.storage.local.get(["msg"])` → callback checks `e && e.msg` → `window.postMessage({type:"hidebmsg", value:e.msg.toString()}, "*")`. The helper `n

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
