# ExPAgent Static Verification — helper@bypass.tools v4.1.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 4
- Coverage: node=0.379, scope=0.345
- Flow types: {'REQUEST_FORGERY': 6}  |  Severities: {'HIGH': 6}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `proxy` [CS_1] @ L52:C22 -> L52:C37
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L53:C31 -> L58:C10
- **Bridge**: message `runtime.single.sender.message[proxy->background]`
- **Severity evidence**: ['*://*.linkvertise.lol/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the primary report plus the raw source to render a verdict.

## Decision ledger

**(a) Who controls the source?**
The page running on any `content_scripts` match controls it. Two page-forgeable event paths exist in `proxy.js` (isolated-world content script):
- `window.addEventListener('message', …)` → branch `event.data.type === 'bt-ext-forward'` forwards `event.data.payload` verbatim: `chrome.runtime.sendMessage(event.data.payload)` (L60–66).
- `window.addEventListener('BypassTools_GM_XHR', …)` reads `e.detail.url/method/headers/data` and sends them to the background (L70–80).

Both `postMessage` and DOM `CustomEvent` data are forgeable by the page. The reported anchor (L52, `easx-bypass-success`) is the adjacent branch of the *same* message listener and only increments a storage counter; it does not itself reach the fetch. However, the `bt-ext-forward` branch in that same listener and the `BypassTools_GM_XHR` listener do reach the sink, and the propagation report's actual steps target the `GM_xmlhttpRequest` path. So the source is genuinely attacker-controlled.

**(b) Source→sink path**
`proxy.js` page event → `chrome.runtime.sendMessage` → `background

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `proxy` [CS_1] @ L52:C22 -> L52:C37
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L53:C31 -> L58:C10
- **Bridge**: message `runtime.single.sender.message[proxy->background]`
- **Severity evidence**: ['*://*.linkvertise.lol/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source
The source is a `window.addEventListener('message', ...)` listener in `proxy.js` (ISOLATED-world content script, `run_at: document_start`, `all_frames: true`, on a large set of `*://…/*` domains including wildcard subdomains like `*://*.linkvertise.lol/*`). A page/iframe on any matched origin can `window.postMessage({...})`, and the content script receives it — no `event.origin` / `event.source` check is present. The message fields are fully attacker-chosen.

### (b) Source-to-sink data path
The exact reported anchor (`proxy.js` L52, `event.data.type === 'easx-bypass-success'`) is a branch that only increments storage and returns — it does **not** reach the sink. However, the *same* listener contains the real forwarding branch:

```js
// proxy.js L60-66
if (event.data && event.data.type === 'bt-ext-forward' && event.data.payload) {
    chrome.runtime.sendMessage(event.data.payload);
}
```

That bridges a page-controlled payload into `chrome.runtime.onMessage` in `background.js`. The background listener then dispatches on the payload's own fields:

```js
// background.js L102-104
if (request.type === 'GM_xmlhttpRequest') {
  

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `proxy` [CS_1] @ L71:C20 -> L71:C28
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L53:C31 -> L58:C10
- **Bridge**: message `runtime.single.sender.message[proxy->background]`
- **Severity evidence**: ['*://*.linkvertise.lol/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5 — `BypassTools_GM_XHR` → background `fetch`

### 1. Source: attacker-controllable? — YES
`proxy.js` is a content script injected at `document_start` into `ISOLATED` world on the huge `matches` list. At line 70–71 it does:

```js
window.addEventListener('BypassTools_GM_XHR', function (e) {
    const details = e.detail;
```

The source type is `WINDOW_CUSTOM_EVENT`. DOM events dispatched on `window` cross the isolated-world boundary, so **any script on the matched page can dispatch** `new CustomEvent('BypassTools_GM_XHR', {detail: {...}})` and fully control `details`. There is no `event.origin`, `event.source`, sender, or other authenticity check — so this is genuinely page-forgeable, per the harness note that CustomEvent fields are not authentication.

### 2. Source→sink path — intact
The bridge is unbroken and confirmed in real source:

- `proxy.js` L75–80 builds the message directly from page-controlled `details`:
  ```js
  chrome.runtime.sendMessage({
      type: 'GM_xmlhttpRequest',
      url: details.url,
      method: details.method,
      headers: details.headers,
      data: details.data
  }, ...)
  ```
- `background.js` L102–104 matches on the exa

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `proxy` [CS_1] @ L71:C20 -> L71:C28
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L53:C31 -> L58:C10
- **Bridge**: message `runtime.single.sender.message[proxy->background]`
- **Severity evidence**: ['*://*.linkvertise.lol/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Bypass Tools Helper (flow index 4, REQUEST_FORGERY)

### 1. Who controls the source?
**Attacker-controlled.** The source is a `WINDOW_CUSTOM_EVENT` in `proxy.js` (content script, ISOLATED world):

```js
window.addEventListener('BypassTools_GM_XHR', function (e) {
    const details = e.detail;   // L71
    const requestId = details.id;
    chrome.runtime.sendMessage({
        type: 'GM_xmlhttpRequest',
        url: details.url,
        method: details.method,
        headers: details.headers,
        data: details.data
    }, ...)
});
```

A page script running on any `content_scripts.matches` domain can dispatch `new CustomEvent('BypassTools_GM_XHR', { detail: {...} })`. DOM/window events are shared across isolated worlds, so the isolated-world listener receives the page-forged `detail`. There is no origin check, no `event.source` check, no action allowlist, and no sanitization of `url/method/headers/data`.

### 2. Exact source-to-sink path
- Page → `window.dispatchEvent(new CustomEvent('BypassTools_GM_XHR', {detail}))` on a matched page.
- `proxy.js` L70-81 reads `e.detail` and `chrome.runtime.sendMessage({type:'GM_xmlhttpRequest', url, method, headers, data

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
