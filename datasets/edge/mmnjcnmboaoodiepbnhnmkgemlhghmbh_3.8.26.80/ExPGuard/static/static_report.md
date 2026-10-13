# ExPAgent Static Verification — mmnjcnmboaoodiepbnhnmkgemlhghmbh v3.8.26.80

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.983, scope=1
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 2}  |  Severities: {'CRITICAL': 4}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/ContentScript` [CS_1] @ L2:C8 -> L2:C23
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/ContentScript` [CS_1] @ L29:C55 -> L29:C133
- **Bridge**: message `runtime.single.sender.message[js/background->js/ContentScript]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — STORAGE_POSOING (attacker-input-storage-write)

### 1. Source control (attacker-controllable?)
**Confirmed.** `js/ContentScript.js` line 1 registers `window.addEventListener("message", ...)`. The manifest content script matches `http://*/*` and `https://*/*`, runs at `document_start`, `allFrames: true`, in the ISOLATED world. A page can deliver arbitrary `window.postMessage` payloads to this listener (standard page→content-script bridge; the harness's `PAGE_TO_CONTENT_SCRIPT` reachability also confirms this). There is **no** `event.source`/`event.origin` check anywhere in the listener — every field of `event.data` is fully attacker-controlled.

### 2. Source-to-sink data path (unbroken?)
**Confirmed, unbroken.** The relevant branch is:

- L26: `} else if (event?.data?.cursorData){` — attacker supplies a truthy `cursorData`.
- L29: `if (event.data.details.action === 'setCursor') chrome.storage.local.set({[event.data.details.key]: event.data.details.value});`

The guard `event.data.details.action === 'setCursor'` is an attacker-chosen message field (not authentication), and `cursorData` is likewise attacker-chosen. The tainted `event.data.details.key` (co

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/ContentScript` [CS_1] @ L2:C8 -> L2:C23
- **Sink**: `FETCH_RESOURCE` in `js/background` [BG_1] @ L367:C8 -> L367:C48
- **Bridge**: message `runtime.single.sender.message[js/ContentScript->js/background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The evidence is sufficient; I inspected both the content-script bridge and the background sink.

## Four-part decision ledger

**(a) Who controls the source?**
The page controls it. `js/ContentScript.js` runs at `document_start` on `http://*/*` and `https://*/*` (all frames, ISOLATED world), and the actual bridge is:

- L1: `window.addEventListener("message", (event) => {...})`
- L26: `else if (event?.data?.cursorData)`
- L35: `if (event.data.details.action === 'getConfigValue')`
- L36: `chrome.runtime.sendMessage({type: "GET_CONFIG_VALUE", endpoint: event.data.details.endpoint, options: event.data.details.options, handler: event.data.details.handler}, ...)`

`event.data.cursorData`, `details.action`, `details.endpoint`, `details.options`, and `details.handler` are all attacker-chosen `postMessage` fields. There is no origin check, no value validation, no sanitizer.

**(b) Source-to-sink path**
`page postMessage` → `ContentScript.js L36 runtime.sendMessage` → `background.js L356 onMessage.addListener` → `L366 GET_CONFIG_VALUE` branch → `L367 fetch(request.endpoint, request.options)`. The propagation HOP `runtime.single.sender.message[js/ContentScript->js/background]` matches this e

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/ContentScript` [CS_1] @ L2:C8 -> L2:C23
- **Sink**: `FETCH_OPTIONS` in `js/background` [BG_1] @ L367:C8 -> L367:C48
- **Bridge**: message `runtime.single.sender.message[js/ContentScript->js/background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: attacker-input → background `fetch(request.endpoint, request.options)`

### (a) Who controls the source?
A webpage. The content script (`js/ContentScript.js`) runs on `http://*/*` and `https://*/*` in all frames at `document_start`. It registers `window.addEventListener("message", ...)` with **no origin/source check**. Any page can therefore inject a forged `message` event carrying arbitrary fields. The relevant branch is reached via attacker-chosen `event.data.cursorData` and `event.data.details.action === 'getConfigValue'`:

```js
// js/ContentScript.js L26-36
} else if (event?.data?.cursorData){
    ...
    if (event.data.details.action === 'getConfigValue') {
        chrome.runtime.sendMessage({
            type: "GET_CONFIG_VALUE",
            endpoint: event.data.details.endpoint,   // attacker
            options:  event.data.details.options,    // attacker
            handler:  event.data.details.handler
        }, function (response) { });
    }
}
```

`endpoint` and `options` are fully attacker-controlled. The `action`/`type`/`cursorData` fields are all page-chosen and thus trivially satisfiable (the harness's browserFacts correctly note these are no

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
