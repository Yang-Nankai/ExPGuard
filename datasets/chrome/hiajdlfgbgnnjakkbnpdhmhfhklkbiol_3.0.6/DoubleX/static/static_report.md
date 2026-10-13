# ExPAgent Static Verification — hiajdlfgbgnnjakkbnpdhmhfhklkbiol v3.0.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L35
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L328
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Source control**
The real source is the `message` listener in `content/popup_guard.js:9`, not the reported `content_scripts.js:35`. The listener reads `event.data` and forwards `d.reason`, `d.url`, and `d.host`. These are page-controlled `window.postMessage` fields. The guards present are:

```js
if (event.source !== window) return;
const d = event.data || {};
if (d.source !== 'JUSTBLOCK_POPUP_GUARD_PAGE') return;
if (d.type === 'popup-blocked') { ... }
```

`event.source === window` and the fixed `source`/`type` string checks are attacker-satisfiable when the page posts a message to itself. They are not browser-authenticated sender validation.

**(b) Source-to-sink path**
The bridge is connected:

1. `content/popup_guard.js:9` — page-controlled message triggers:
   ```js
   chrome.runtime.sendMessage({
     type: 'popup-blocked-activity',
     reason: d.reason,
     url: String(d.url || location.href).slice(0,300),
     host: String(d.host || location.hostname || 'this site').replace(/^www\./,'')
   });
   ```
2. `sw.js:216` — `chrome.runtime.onMessage` listener receives it.
3. `sw.js:257-265` — the `"popup-blocked-activity"` branch consumes `msg.host

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L35
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L340
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Source control**
The real source is the `message` listener in `...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L35
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L360
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Source control**
The real source is the `message` listener in `...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
