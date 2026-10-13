# ExPAgent Static Verification — twitchinventoryclaimer@schulzjona v5.0.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 3
- **Not reviewed due to analysis budget:** 2 flow(s): [0, 1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2, 'PRIVILEGE_ESCALATION': 3}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L43
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `background.js` [BG_1] @ L137
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?

The reported `WINDOW_MESSAGE_EVENT` maps to the isolated-world content script's listener in `contents/index_isolated.js` (the file `content_scripts.js` does not exist; this is the actual page-facing content script):

```js
window.addEventListener("message",(function(e){
  if(e.source!==window || !e.data || "TIC_BRIDGE_INIT"!==e.data.type) return;
  ...
  const[n]=e.ports||[];
  n&&(w=n, w.onmessage=L, w.start(), ...)
}),true);
```

A page on `https://www.twitch.tv/*` can satisfy `e.source === window` trivially and can **post its own `TIC_BRIDGE_INIT` with a `MessageChannel` port, overwriting the genuine MAIN-world bridge** (`w` is reassigned with no init guard). It can also capture the genuine `port2` from the MAIN script's `window.postMessage({type:"TIC_BRIDGE_INIT"},"*",[n.port2])`, since that message event is delivered to page listeners in the same window. Either way, the page fully controls the messages delivered to the isolated script's `L` handler.

### (b) The source-to-sink path

1. **Page → bridge**: attacker forges `TIC_BRIDGE_INIT` + own `MessagePort` → isolated script sets `w = attackerPort`, `w.onmessage = L`.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L43
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `background.js` [BG_1] @ L138
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?

The reported `WINDOW_MESSAGE_EVEN...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L43
- **Sink**: `CHROME_NOTIFICATIONS_CREATE_OPTIONS` in `background.js` [BG_1] @ L140
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?

The reported `WINDOW_MESSAGE_EVEN...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
