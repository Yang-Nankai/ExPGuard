# ExPAgent Static Verification — bkodmnhlibbehcmcihgjjiambakdlobp v5.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 3
- **Not reviewed due to analysis budget:** 2 flow(s): [2, 4]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 5}  |  Severities: {'UNKNOWN': 5}

**Assessment:** Verified 3 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing; 2 not reviewed due to the analysis budget.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L200
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L193

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — PRIVILEGE_ESCALATION (WINDOW_MESSAGE_EVENT → chrome.tabs.update)

### 1. Source check — the reported source does not exist

The report labels the source as `WINDOW_MESSAGE_EVENT` at `background.js L200`. I read the actual source:

- `L200` is `sendResponse({ status: "success", request: request });` inside `chrome.runtime.onMessage.addListener` — it is **not** a `window` message event.
- A project-wide search for `window.addEventListener`, `onmessage`, and `postMessage` returned **NO MATCHES** anywhere in the extension. There is no `window` message listener at all.

A `WINDOW_MESSAGE_EVENT` cannot exist in `background.js`: this is a Manifest V3 **service worker**, which has no `window`/DOM. The source type is misattributed by ExPGuard.

### 2. Sink check — the reported sink anchor is also wrong

The report says `chrome.tabs.update` is at `L193`. The actual code at `L193` is:

```js
return true;
```

inside `chrome.runtime.onMessageExternal.addListener`. The real `chrome.tabs.update(tabs[0].id, { url: url })` is at `L182`, inside `openInSameTab()`, reached only when the stored `wintype_pref === 'sametab'`.

### 3. Attack surface — no web-accessible path ex

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L200
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L137

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — PRIVILEGE_ESCALATION (WINDOW_MESSAGE_EVENT → chrome.tabs.update)
...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L200
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L153

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — PRIVILEGE_ESCALATION (WINDOW_MESSAGE_EVENT → chrome.tabs.update)
...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
