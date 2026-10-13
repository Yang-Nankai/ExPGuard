# ExPAgent Static Verification — aaidjeidbnhpjhblbianjeghjopbimmk v4.1.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 4
- **Not reviewed due to analysis budget:** 1 flow(s): [4]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 5}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 4 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 3 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L740
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L745

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the reported flow

**Anchors.** The report's `background.js L740` source and `L745` sink do not match the current file literally — current `extras/background.js` line 740 is inside a nested helper and line 745 is `});`. However, the reported **5-line source→sink delta** maps exactly to the real external-message listener:

- reported source `L740` → actual **`extras/background.js:662`** — `msg` parameter of `chrome.runtime.onMessageExternal.addListener`
- reported sink `L745` → actual **`extras/background.js:667`** — the first `chrome.tabs.create(...)` in that listener

The `source.type` `WINDOW_MESSAGE_EVENT` is a mislabel; the actual source is `chrome.runtime.onMessageExternal` (external web message), and the actual code is:

```js
chrome.runtime.onMessageExternal.addListener(async function (msg, sender, sendResponse) {
  if (msg.msg === "openSupportChat") {
    await chrome.tabs.create({
      url: "/extras/support/chat/index.html?code=" + msg.token,
    });
    chrome.tabs.remove(sender.tab.id, function () {});
  }
  ...
});
```

## Decision ledger

1. **Who controls the source?** A web page matching `externally_connectable.matches: ["https://scratch.mit.edu/*

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L740
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L751

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the reported flow

**Anchors.** The report's `background.js L740` source a...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L740
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L756

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the reported flow

**Anchors.** The report's `background.js L740` source a...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L740
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L765

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the reported flow

**Anchors.** The report's `background.js L740` source a...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
