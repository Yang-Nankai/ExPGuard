# ExPAgent Static Verification — cimpffimgeipdhnhjohpbehjkcdpjolg v10.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 5
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 5}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 5 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 4 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L165
- **Sink**: `CHROME_SESSION_STORAGE` in `background.js` [BG_1] @ L436
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source: attacker-controllable — confirmed
The manifest shows the actual content script is `content_w2g.530d247b.js` (the report's `content_scripts.js` file name is stale). Its entry module contains:

```js
chrome.runtime.onMessage.addListener(function(msg) {
    msg._skipForward = true;
    window.postMessage(msg, "*");
});
window.addEventListener("message", function(event) {
    if (event.origin === window.origin) {
        if (event.data && !event.data._skipForward) chrome.runtime.sendMessage(event.data);
    }
});
```

This is a page↔content-script bridge. A page running on a matched w2g.tv host can `window.postMessage({...}, "*")`; `event.origin === window.origin` is trivially satisfied by the page's own `postMessage`, and `_skipForward` is only set by background-originated round-trips, so page-supplied data is forwarded to the background verbatim. **Source is genuinely page/attacker-controlled** (web-content message input), consistent with the harness's "page can forge postMessage fields" rule.

### 2. Path: unbroken message bridge — confirmed
In `sw.ef4d71da.js` (the real background/service worker, not `background.js`):

```js
chrome.runtime.o

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L165
- **Sink**: `CHROME_SESSION_STORAGE` in `background.js` [BG_1] @ L234
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source: attacker-controllable — confirmed
The manifest shows...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L165
- **Sink**: `CHROME_SESSION_STORAGE` in `background.js` [BG_1] @ L281
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source: attacker-controllable — confirmed
The manifest shows...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L165
- **Sink**: `CHROME_SESSION_STORAGE` in `background.js` [BG_1] @ L313
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source: attacker-controllable — confirmed
The manifest shows...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L165
- **Sink**: `CHROME_SESSION_STORAGE` in `background.js` [BG_1] @ L354
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source: attacker-controllable — confirmed
The manifest shows...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
