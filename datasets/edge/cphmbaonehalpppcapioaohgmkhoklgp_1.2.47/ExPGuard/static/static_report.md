# ExPAgent Static Verification — cphmbaonehalpppcapioaohgmkhoklgp v1.2.47

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 10  |  Verified: 3
- Coverage: node=0.151, scope=0.169
- Flow types: {'STORAGE_POSOING': 5, 'REQUEST_FORGERY': 5}  |  Severities: {'MEDIUM': 10}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #7 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L1:C75323 -> L1:C75348
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C1240 -> L1:C1328
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://web.whatsapp.com/*']
- **Source report Flow ID**: `8`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to render a verdict. The bridge connects end-to-end.

## Verification ledger

**(a) Who controls the source?**
The source is `window.addEventListener("message", ...)` in the content script `content.js` (isolated world), running on `https://web.whatsapp.com/*`. A page script on that origin (or XSS on it) can forge `window.postMessage` data. The guard `n.source === window` is satisfied by the page's own `postMessage`, so it is not authentication. Attacker controls `type`, `action`, `key`, and `value`.

**(b) Exact source-to-sink path**
`content.js`:
```js
window.addEventListener("message", function(n){
  if(n.source===window && n.data){
    ...
    if("WASAI_TEMPLATE_MSG"===n.data.type){
      const{requestId:t, action:o, key:e, value:i}=n.data;
      chrome.runtime.sendMessage({action:o, key:e, value:i}, ...)
    }
  }
});
```
This forwards the page-chosen `action`, `key`, `value` verbatim to the background via `chrome.runtime.sendMessage` — a real cross-context bridge (`runtime.single.sender.message[content->background]`).

`background.js` (service worker):
```js
chrome.runtime.onMessage.addListener((e,r,t)=>{
  ...
  return "WASAI_TEMPLATE_SAVE"===e.action
 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L1:C75323 -> L1:C75348
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L1:C717 -> L1:C1005
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://web.whatsapp.com/*']
- **Source report Flow ID**: `8`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (REQUEST_FORGERY)

### (a) Who controls the source
The source is a `window.addEventListener("message", …)` listener in `content.js`, which runs on `https://web.whatsapp.com/*` at `document_start`. The page (or any script executing in the page on that origin — e.g. via XSS or page compromise) can call `window.postMessage` and fully control `n.data`. The only gate is `n.source === window` plus `n.data.type === "WASAI_CALL_API"`, both of which a page can trivially satisfy with its own `postMessage`. So the source is genuinely web-content-controlled.

### (b) Exact source-to-sink path (confirmed in raw source)
Content script (`content.js`, L1 C75323ff):

```js
window.addEventListener("message", function(n){
  if(n.source===window && n.data){
    if("WASAI_CALL_API"===n.data.type){
      const{requestId:t, payload:o}=n.data;
      chrome.runtime.sendMessage({action:"WASAI_FETCH_AI", payload:o}, …)
    }
  }
})
```

Background (`background.js`, L1 C9ff):

```js
chrome.runtime.onMessage.addListener((e,r,t)=>{
  if("WASAI_FETCH_AI"===e.action){
    const{provider:r, apiKey:s, systemPrompt:o, history:a}=e.payload;
    ...
    return "claude"===r ? (
      fetch("h

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L1:C75323 -> L1:C75348
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L1:C717 -> L1:C1005
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://web.whatsapp.com/*']
- **Source report Flow ID**: `8`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #8 (REQUEST_FORGERY)

### (a) Who controls the source?
The source is a `window.addEventListener("message", ...)` in the content script (`content.js`), running in an ISOLATED world on `https://web.whatsapp.com/*`. The resolved anchor confirms:

```js
window.addEventListener("message",function(n){
  if(n.source===window&&n.data){
    if("WASAI_CALL_API"===n.data.type){
      const{requestId:t,payload:o}=n.data;
      chrome.runtime.sendMessage({action:"WASAI_FETCH_AI",payload:o}, ...)
```

- `n.source===window` is trivially satisfied by the page's own `window.postMessage`.
- The `"WASAI_CALL_API"` type check is an attacker-chosen message field, not an authentication boundary.
- Per the harness, page-origin code can forge window messages and message fields. So `payload` (`provider`, `apiKey`, `systemPrompt`, `history`) is fully attacker-controllable (via page code / XSS on the matched origin).

### (b) Source-to-sink path
Confirmed unbroken:

1. **Page → content script:** `window.postMessage({type:"WASAI_CALL_API", payload:{...}})` is received at the content-script listener.
2. **Content script → background:** `chrome.runtime.sendMessage({action:"WASAI_FETCH_AI

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
