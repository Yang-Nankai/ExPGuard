# ExPAgent Static Verification — ofpfdpleloialedjbfpocglfggbdpiem v1.0.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1903
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1903

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source resolution

The flow's reported file (`background.js`) does not exist in the unpacked extension — the shipped service worker is `background.bundle.js` (minified to a single line). ExPGuard's "WINDOW_MESSAGE_EVENT" label is a slight misclassification: the actual source is `chrome.runtime.onMessageExternal` (an **external web-message** source), which is *more* clearly attacker-controllable than a window message event.

Extracted from the bundle (single line, around column ~53000):

```js
chrome.runtime.onMessageExternal.addListener(((e,t,s)=>(
  "storeData"===e.action && e.key && e.value ? (
    chrome.storage.local.set({[e.key]:e.value}, (()=>{...})),
    r = e.value
  ) :
  "removeData"===e.action && e.key ? (
    "token"==e.key && (r=""),
    chrome.storage.local.remove(e.key, ...)
  ) :
  s({status:"error",message:"Invalid request"}),
  !0
)));
```

This matches the flow exactly: source codeContext `e` is the message object, and the sink is `chrome.storage.local.set({[e.key]: e.value}, callback)` — first arg a ValueExpr (attacker key/value object), second arg a FunctionExpression (callback).

### 2. Four-part decision ledger

**(a) Who cont

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
