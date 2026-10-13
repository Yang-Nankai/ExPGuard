# ExPAgent Static Verification — bcmoplgjpddohaelhnnodojbamdobbhc v1.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.491, scope=0.592
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 3}

**Assessment:** Verified 3 flow(s): 2 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `extension-content` [CS_3] @ L1:C202 -> L1:C213
- **Sink**: `CHROME_LOCAL_STORAGE` in `extension-content` [CS_3] @ L1:C620 -> L1:C881
- **Severity evidence**: ['https://youtubetotranscript.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #3 — STORAGE_POISONING (window `message` → `chrome.storage.local.set`)

### Source (verified in raw source)
`extension-content.js` L1 registers:
```js
window.addEventListener("message", function(e){
  if("https://youtubetotranscript.com"===e.origin || e.origin.startsWith("http://localhost:")){
    if(e.data && "EXTENSION_REQUEST_TOKENS"===e.data.type) { ... post back stored tokens ... }
    if(e.data && "EXTENSION_AUTH_SUCCESS"===e.data.type){
      var t=e.data, o=t.token, n=t.refresh_token;
      if(!o||!n) return;
      chrome.storage.local.set({token:o, refreshToken:n, isLoggedIn:!0,
        expiresAt:Date.now()+31536e6}, function(){ ...sendMessage({action:"AUTH_COMPLETE",token:o,...}) })
    }
  }
});
```
The tainted span confirmed: `chrome.storage.local.set({token:o, refreshToken:n, ...})` — the stored `token`/`refreshToken` values come directly from the page-supplied `e.data` (`t.token`, `t.refresh_token`).

### Four-part ledger
**(a) Who controls the source.** A page-level `window.postMessage`'s `e.data` fields (`token`, `refresh_token`). Per harness `sourceReachability = PAGE_TO_CONTENT_SCRIPT`, message fields are fully attacker-forgeable. Provenance 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `extension-content` [CS_3] @ L1:C202 -> L1:C213
- **Sink**: `CHROME_LOCAL_STORAGE` in `extension-content` [CS_3] @ L1:C620 -> L1:C881
- **Severity evidence**: ['https://youtubetotranscript.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #3 (WINDOW_MESSAGE_EVENT → CHROME_LOCAL_STORAGE)

**Confirmed source/sink code (extension-content.js, minified L1):**

```js
window.addEventListener("message", function(e){
  if("https://youtubetotranscript.com"===e.origin || e.origin.startsWith("http://localhost:")){
    if(e.data && "EXTENSION_REQUEST_TOKENS"===e.data.type)
      try{ chrome.storage.local.get([...], function(t){ ...window.postMessage({type:"EXTENSION_TOKENS",token:t.token...}, e.origin) }) }catch(e){}
    if(e.data && "EXTENSION_AUTH_SUCCESS"===e.data.type){
      var t=e.data, o=t.token, n=t.refresh_token;
      if(!o||!n) return;
      try{
        chrome.storage.local.set({token:o, refreshToken:n, isLoggedIn:!0, expiresAt:Date.now()+31536e6}, function(){
          chrome.runtime.lastError || chrome.runtime.sendMessage({action:"AUTH_COMPLETE", token:o, refresh_token:n, source:"email"}, ...)
        })
      }catch(e){}
    }
  }
});
```

### Decision ledger

**(a) Who controls the source.** The source is a `message` event delivered to a **content script** (provenance CONTENT_SCRIPT, frame CS_3), matched on `https://youtubetotranscript.com/*`. The payload fields read are `e.data.token` and

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #2 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `extension-content` [CS_3] @ L1:C202 -> L1:C213
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L1:C40966 -> L1:C41117
- **Bridge**: message `runtime.single.sender.message[extension-content->background]`
- **Severity evidence**: ['https://youtubetotranscript.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #6 (REQUEST_FORGERY, `attacker-input-network-send`)

### Four-part decision ledger

**(a) Who controls the source?**
`extension-content.js` is injected only into `https://youtubetotranscript.com/*` (manifest `content_scripts`) at `document_end`, ISOLATED world. Its `window.addEventListener("message", …)` handler accepts any page-originated message whose origin is `https://youtubetotranscript.com` or `http://localhost:*` (attacker-satisfiable via a page/XSS on that host, or a malicious localhost page). For `e.data.type === "EXTENSION_AUTH_SUCCESS"` it reads `token`/`refresh_token` straight out of `e.data`. So the *values* are genuinely attacker-controllable. (Source is real.)

**(b) Exact source→sink path (as reported):**
page `postMessage` → content-script listener → `chrome.runtime.sendMessage({action:"AUTH_COMPLETE", token:o, refresh_token:n, source:"email"})` → background `chrome.runtime.onMessage` AUTH_COMPLETE handler → `fetch(".../api/auth/create-session-code")`.

**The path breaks at the background gate.** In `background.js` the AUTH_COMPLETE handler (C40400+) executes:
```
r = e.token || e.refresh_token || e.refreshToken || "";   // rate-limit only
if

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
