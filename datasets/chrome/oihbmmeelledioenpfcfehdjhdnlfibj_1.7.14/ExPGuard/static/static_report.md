# ExPAgent Static Verification — oihbmmeelledioenpfcfehdjhdnlfibj v1.7.14

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 10  |  Verified: 3
- Coverage: node=0.149, scope=0.115
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 8}  |  Severities: {'CRITICAL': 10}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `load_embeds` [CS_1] @ L1:C465 -> L1:C624
- **Sink**: `FETCH_BODY` in `service_worker` [BG_1] @ L1:C558 -> L1:C741
- **Bridge**: message `runtime.single.sender.message[load_embeds->service_worker]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify the flow. Here is the structured verdict.

## Four-part decision ledger

**(a) Who controls the source — ATTACKER**
- `load_embeds.js` runs as an ISOLATED content script on `<all_urls>` (any page).
- Its `window.addEventListener("message", …)` listener forwards the entire `e.data` object into `chrome.runtime.sendMessage`.
- The only guard is `e.origin === window.location.origin`, which the malicious page satisfies trivially by posting to itself (`window.postMessage(..., location.origin)`). `origin` is not an authentication boundary here.

**(b) Source-to-sink path — UNBROKEN**
Confirmed from the harness snippet and the minified service-worker code:
1. Page posts `{type: "call-extension-/track-posthog-event", payload: {event, properties}}`.
2. `load_embeds.js` → `chrome.runtime.sendMessage(e.data)` (messagePassing hop `load_embeds -> service_worker`).
3. `service_worker.js` `chrome.runtime.onMessage.addListener`: `e.type?.startsWith("call-extension-")` → `a = e.type.slice(15)`.
4. Branch `/track-posthog-event`: `const {event:a, properties:t} = e.payload, o = await trackPosthogEvent(a,t)`.
5. `trackPosthogEvent` does `fetch("https://us.i.posthog.com/c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `load_embeds` [CS_1] @ L1:C465 -> L1:C624
- **Sink**: `FETCH_RESOURCE` in `service_worker` [BG_1] @ L1:C3114 -> L1:C3323
- **Bridge**: message `runtime.single.sender.message[load_embeds->service_worker]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the full chain from the primary evidence and the raw source. Here's my analysis.

## Decision ledger

**(a) Who controls the source?**
The source is a `WINDOW_MESSAGE_EVENT` in `load_embeds.js` (content script on `<all_urls>`):

```js
window.addEventListener("message",(e=>{
  e.origin===window.location.origin
    ? chrome.runtime.sendMessage(e.data, ...)
    : console.warn("Blocked message from unauthorized origin:", e.origin)
}))
```

Any page matching `<all_urls>` can post a message to its own window; the guard `e.origin === window.location.origin` is trivially satisfied because the page is posting to itself. The harness confirms this is an attacker-satisfiable, non-authenticating origin check. The message payload (`e.data`) is fully attacker-controlled. ✔

**(b) Source-to-sink path**
`load_embeds.js` forwards `e.data` verbatim via `chrome.runtime.sendMessage` (HOP: `runtime.single.sender.message[load_embeds->service_worker]`). In `service_worker.js`:

```js
chrome.runtime.onMessage.addListener((e,a,s)=>
  e.type?.startsWith("call-extension-")
    ? (async()=>{
        const a=e.type.slice(15);
        ...
        else if("/token"===a){
          const{apiKey:a,ref

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `load_embeds` [CS_1] @ L1:C465 -> L1:C624
- **Sink**: `FETCH_HEADERS` in `service_worker` [BG_1] @ L1:C4398 -> L1:C4572
- **Bridge**: message `runtime.single.sender.message[load_embeds->service_worker]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source
The source is a `window.addEventListener("message", …)` listener in the content script `load_embeds.js`, which runs on `<all_urls>`:

```js
window.addEventListener("message",(e=>{
  e.origin===window.location.origin
    ? chrome.runtime.sendMessage(e.data, …)
    : console.warn("Blocked message from unauthorized origin:", e.origin)
}))
```

A page's own `window.postMessage(payload, "*")` is delivered to this listener, and `e.origin === window.location.origin` is trivially satisfied by the page posting to itself. The message field `e.data` is forwarded **unmodified** to `chrome.runtime.sendMessage`. This is a genuine page-controlled (attacker-controlled) source; the origin check is self-origin, which the harness correctly classifies as attacker-satisfiable, not authentication.

### (b) Source-to-sink path
The propagation evidence shows the HOP:
`runtime.single.sender.message[load_embeds -> service_worker]`.

In `service_worker.js` the background registers:

```js
chrome.runtime.onMessage.addListener(((e,a,s)=>(
  e.source,
  e.type?.startsWith("call-extension-") ? …
  : e.type?.startsWith("call-assistants-") ? ((async()=>{
  

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
