# ExPAgent Static Verification — odpdkefpnfejbfnmdilmfhephfffmfoh v0.9.36

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- Coverage: node=0.972, scope=1
- Flow types: {'REQUEST_FORGERY': 2, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `src/contentScript` [CS_1] @ L20:C13 -> L20:C35
- **Sink**: `FETCH_RESOURCE` in `src/background` [BG_1] @ L159:C27 -> L170:C12
- **Bridge**: message `runtime.single.sender.message[src/contentScript->src/background]`
- **Severity evidence**: ['https://readlang.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ### Flow verification — REQUEST_FORGERY (attacker input → background `fetch`)

**1. Who controls the source?**
The actual untrusted source is `src/contentScript.js` L20:

```js
data = JSON.parse(event.data);
```

The content script is injected only on `https://readlang.com/*`, `https://test.readlang.com/*`, and `http://localhost/*` (manifest + the origin check at L45–51). A script running on any of those pages can call `window.postMessage(...)` and fully control `event.data`. The checks at L28–38 (`type === "readlangMessage"`, `to === "extension"`, `message === "backgroundPageMessage"`) are all attacker-supplied fields, not authentication. There is no `event.origin` or `event.source` validation that could block a same-origin page.

**2. Is the path unbroken?**
Yes. The content script forwards the attacker payload at L52–53:

```js
chrome.runtime.sendMessage({ message, data }, ...)
```

The background listener at `src/background.js` L105 receives it and, for `request.message === "serverRequest"`, does:

```js
const data = request.data?.data;                 // attacker-controlled
const queryStringSuffix =
  data.method === "GET" && data.data
    ? `?${new URLSearchParams(data.data)}

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `src/contentScript` [CS_1] @ L20:C13 -> L20:C35
- **Sink**: `FETCH_BODY` in `src/background` [BG_1] @ L159:C27 -> L170:C12
- **Bridge**: message `runtime.single.sender.message[src/contentScript->src/background]`
- **Severity evidence**: ['https://readlang.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — REQUEST_FORGERY (attacker input → background fetch)

### (a) Who controls the source?
The source is `src/contentScript.js` L16–20: a `window.addEventListener("message", ...)` handler that does `JSON.parse(event.data)`. The content script runs on `https://readlang.com/*`, `https://test.readlang.com/*`, and `http://localhost/*` (manifest `content_scripts`, `allFrames: true`). A page on those origins can `window.postMessage` arbitrary JSON to itself; the isolated-world content script receives it. The fields `data.type === "readlangMessage"`, `data.to === "extension"`, and `data.message === "backgroundPageMessage"` are all page-chosen and attacker-satisfiable — not authentication.

### (b) Source-to-sink path
- `contentScript.js` L41: `handler(data.data.message, data.data, event, data.requestId)` — the page controls both the action (`data.data.message`) and the payload (`data.data`).
- L52–53: `chrome.runtime.sendMessage({ message, data }, ...)` — the attacker-chosen action/payload cross into the background.
- `background.js` L105: `chrome.runtime.onMessage.addListener(...)`.
- L115: `const data = request.data?.data;` — the payload object.
- L150: `case "serv

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
