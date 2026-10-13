# ExPAgent Static Verification — jkchgejbjikoopancfjpbofabaoceohd v1.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 3}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L5
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `background.js` [BG_1] @ L69
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the flow

**Files actually present:** `contentScript.js` (not `content_scripts.js`) and `service_worker.js` (not `background.js`). The sink line number is stale (`background.js:69`), but the equivalent real sink is present at `service_worker.js:59`.

### 1. Who controls the source?

`contentScript.js:4-6`:

```js
window.addEventListener("message", function (e) {
    if (e.source === window) chrome.runtime.sendMessage(null, e.data);
});
```

Any page can call `window.postMessage(payload, '*')`. The guard `e.source === window` is satisfied by the malicious page's own same-window `postMessage`, so it is not a trust boundary. `e.data` is fully attacker-controlled.

### 2. Exact source-to-sink path

1. Attacker page posts `e.data`.
2. Content script forwards `e.data` to the extension's runtime.
3. `service_worker.js:2` receives it as `request` in `chrome.runtime.onMessage`.
4. `switch (request.type)` dispatches on the attacker-chosen field `request.type`:

```js
case 'nilread.wkx.fullscreen': return fullscreen(sender.tab, request);
```

5. `service_worker.js:59` consumes `request.name` in the privileged call:

```js
chrome.windows.update(tab.windowId, { state: request

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L5
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `background.js` [BG_1] @ L48
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the flow

**Files actually present:** `contentScript.js` (not `content_scr...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L5
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `background.js` [BG_1] @ L52
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the flow

**Files actually present:** `contentScript.js` (not `content_scr...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
