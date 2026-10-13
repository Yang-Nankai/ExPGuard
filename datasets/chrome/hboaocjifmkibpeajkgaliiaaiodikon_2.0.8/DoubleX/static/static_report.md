# ExPAgent Static Verification — hboaocjifmkibpeajkgaliiaaiodikon v2.0.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 5
- **Not reviewed due to analysis budget:** 1 flow(s): [5]
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 5, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 6}

**Assessment:** Verified 5 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 4 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L110
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L111

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0 (STORAGE_POSOING)

### Primary evidence resolution
The ExPGuard flow names `content_scripts.js`, but the unpacked extension actually ships `content-script.js` (the file referenced by the manifest's `contentScripts.js`). `content-script.js` is a single minified line; the reported `L110/L111` anchors correspond to the beautified source, not the raw file. No source-level propagation entry exists in `report.flows.json`, so I inspected the raw minified source directly.

### Decision ledger

**(a) Who controls the source?**
The source is a `window.addEventListener("message", ...)` listener in the content script. The listener body reads `e.data.businessFlagResult`, `e.data.groupsInfoTwoInject`, `e.data.contactsInfoTwoInject`, `e.data.chatsInfoTwoInject`, and `e.data.communityInfoTwoInject` directly. A page running on a `*.whatsapp.com` origin can dispatch these `window.postMessage` events; no `event.source`/`event.origin`/sender-ID guard is present. Per the harness, page `postMessage` fields are attacker-forgeable in a page→content-script bridge.

**(b) Exact source-to-sink path**
Minified `content-script.js` contains:

```js
window.addEventListener("message",(f

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L110
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L119

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0 (STORAGE_POSOING)

### Primary evidence resolution
The ExPGuard fl...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L110
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L127

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0 (STORAGE_POSOING)

### Primary evidence resolution
The ExPGuard fl...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L110
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L135

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0 (STORAGE_POSOING)

### Primary evidence resolution
The ExPGuard fl...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L110
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_scripts.js` [CS_1] @ L143

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0 (STORAGE_POSOING)

### Primary evidence resolution
The ExPGuard fl...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
