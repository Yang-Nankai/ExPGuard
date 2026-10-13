# ExPAgent Static Verification — cjlmnfcfnofnglkphbcdclbpimdjkmdf v1.0.31

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.481, scope=0.444
- Flow types: {'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `isolated-bridge` [CS_2] @ L1:C302 -> L1:C312
- **Sink**: `FETCH_BODY` in `service-worker` [BG_1] @ L1:C287 -> L1:C402
- **Bridge**: message `runtime.single.sender.message[isolated-bridge->service-worker]`
- **Severity evidence**: ['https://gemini.google.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — REQUEST_FORGERY via page→content-script→background fetch proxy

### 1. Source control (who controls it)
The source is `window.addEventListener("message", ...)` in `isolated-bridge.js`, an **ISOLATED-world content script** injected at `document_start` on `https://gemini.google.com/*` (and business subdomain). A page script can trivially emit a `postMessage` event into this listener.

Confirmed guard in `isolated-bridge.js`:

```js
window.addEventListener("message", E=>{
  if(E.source!==window) return;
  let e=E.data||{};
  ...
  e.type!==s || !e.requestId || chrome.runtime.sendMessage({
    type:s, requestId:e.requestId, request:e.request||{}
  }, ...)
})
```

- `E.source !== window` — attacker-satisfiable: the page's own `window.postMessage` sets `source === window` in the shared window object.
- `e.type !== s` — attacker-satisfiable: `s = "GWR_EXTENSION_GM_XHR_REQUEST"` is a fixed string the page can copy.
- `e.requestId` — attacker-satisfiable: any non-empty value passes `!e.requestId`.
- `e.request` — **entirely attacker-controlled object**, forwarded verbatim to `chrome.runtime.sendMessage`.

So the source is genuinely webpage-controlled. ✅

### 2. 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
