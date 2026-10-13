# ExPAgent Static Verification — mmlnljdcfjnfeikeioghbkobdcmnhgko v1.0.13

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L901
- **Sink**: `CHROME_ALARMS_CREATE_OPTIONS` in `background.js` [BG_1] @ L103
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #0

### 1. Source anchor

The normalized report says `content_scripts.js L901`, but the unpacked extension only ships `content.js` (manifest `contentScripts[0].js = ["content.js"]`). Reading the real `content.js` (webpack module `41`) confirms the actual source:

```js
window.addEventListener("message", e => {
  e.data && "ping" === e.data.type &&
    chrome.runtime.sendMessage({ type: "ping", value: e.data.value })
})
```

- `window.postMessage`/`message` events are page-forgeable (content script runs on `<all_urls>`).
- `e.data.type === "ping"` is an attacker-satisfiable field check, not authentication.
- **Source is genuinely attacker-controlled**: the page supplies `e.data.value`.

### 2. Cross-boundary bridge

The bridge is real and connected:

- Content script (`CS`) sends `{type:"ping", value: e.data.value}` via `chrome.runtime.sendMessage`.
- Background (`BG`) listener:

```js
chrome.runtime.onMessage.addListener((n,e,t) => {
  const o = n.value;
  "ping" === n.type && (o ? c() : l())
})
```

The message reaches the background and the attacker-controlled `value` is used — **but only as a boolean branch selector**.

### 3. Sink anchor and the actual a

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L901
- **Sink**: `CHROME_ALARMS_CREATE_OPTIONS` in `background.js` [BG_1] @ L57
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #0

### 1. Source anchor

The normalized report says `content_scripts...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
