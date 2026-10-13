# ExPAgent Static Verification — hhoapolbeidlfbkkmieijgnfigijlimm v2.7.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 11  |  Verified: 7
- **Not reviewed due to analysis budget:** 4 flow(s): [2, 4, 1, 10]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 9, 'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 11}

**Assessment:** Verified 7 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 6 duplicate; 0 flagged triggerable for dynamic testing; 4 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L1480

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a) Source control:** The `WINDOW_MESSAGE_EVENT` label is a mislabel — the actual source is `chrome.runtime.onMessageExternal.addListener(function (msg, sender, sendResponse) { ... })` at `background.js:2815`. `msg` is fully attacker-influenced by any page whose origin matches `externally_connectable.matches` (screena.com, youtube.com, netflix.com, and ~40 other streaming origins). The listener performs no `sender.id`/`sender.url` check before dispatching on `msg.type`.

**(b) Source-to-sink path:** The `case 'join'` branch (L2825-2846) runs both `PlayerTab.open(msg)` and `SideTab.open(msg)`. `SideTab.open` (L1422-1437) destructures `{ url, screen }` directly from the message and calls:

```js
const tab = await chrome.tabs.create({ url, windowId: window.id });
```

There is **no** `checkContentScripts()` / URL-scheme / allow-list validation in `SideTab.open`, unlike `PlayerTab.open` which does validate `serviceSelectUrl || service`. So `msg.url` flows verbatim into `chrome.tabs.create`.

**(c) Security-relevant argument:** The `url` argument of `chrome.tabs.create` is the raw attacker-supplied

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L1519

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a)...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L1592

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a)...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L2188

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a)...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #7 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L2208

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a)...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #8 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L2302

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a)...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #9 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L2966
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L3034

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the source to decide. Let me lay out the four-part ledger.

**(a)...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
