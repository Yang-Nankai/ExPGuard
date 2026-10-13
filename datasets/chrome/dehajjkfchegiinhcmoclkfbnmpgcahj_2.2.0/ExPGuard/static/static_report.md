# ExPAgent Static Verification — dehajjkfchegiinhcmoclkfbnmpgcahj v2.2.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.995, scope=1
- Flow types: {'REQUEST_FORGERY': 1, 'SOURCE_REPORT_ONLY': 2}  |  Severities: {'MEDIUM': 1, 'UNKNOWN': 2}

**Assessment:** Verified 3 flow(s): 0 true-positive, 3 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `version` [CS_1] @ L124:C8 -> L124:C44
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L231:C8 -> L231:C76
- **Bridge**: message `runtime.single.sender.message[version->background]`
- **Severity evidence**: ['https://docentedu.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 82, 'distinctLines': 15, 'crossContextHops': ['runtime.single.sender.message[version->background]'], 'sinkUrlControl': ['PARTIAL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
The source is the `window.addEventListener('message')` listener in the `version.js` content script:

```js
window.addEventListener('message', function(event) {
    if (event.source == window && event.data && event.data.type == 'relayFromIframeBridge') {
        chrome.runtime.sendMessage(event.data);
    }
})
```

A page on a matched origin (`docentedu.com`, `insertlearning.com`, `www.okeebo.com`) can forge `window.postMessage` payloads; `event.source == window` and the `event.data.type` field are attacker-satisfiable. So the *source* itself is genuinely page-controllable.

**(b) The exact source-to-sink path**
The claimed path is: page `postMessage` → `version.js` forwards `event.data` → `background.js` `onMessage` → `fetch('https://dnmkr7tf85gze.cloudfront.net/data/p/' + request.uuid)`.

The bridge breaks at the message-type gate:

- `version.js` **only** forwards messages where `event.data.type === 'relayFromIframeBridge'` (L124).
- In `background.js`, the sink lives in a **different, mutually exclusive** branch:
  ```js
  else if (request.type == 'getReadworksArticle') {
      fetch('https://dnmkr7tf85gze.cloudfront.net/d

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (SOURCE_REPORT_ONLY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_TOKEN` in `version` [CS_1] @ L78:C4 -> L97:C6
- **Sink**: `WINDOW_POSTMESSAGE` in `version` [CS_1] @ L96:C8 -> L96:C48
- **Bridge**: message `runtime.single.response.message[background->version]`
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 9, 'distinctLines': 5, 'crossContextHops': ['runtime.single.response.message[background->version]', 'runtime.single.response.message[background->version]'], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to make a determination.

## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.identity.getAuthToken(...)` — the extension's *own* Google OAuth token, returned by the background's `login` handler as the `sendMessage` callback response.

Confirmed in background.js L189–196:
```js
else if (request.type == 'login') {
    chrome.permissions[...]...
    chrome.identity.getAuthToken({interactive: request.interactive, scopes: request.scopes }, sendResponse);
```

The token value is browser/Google-issued and is **not** attacker-controllable. The page cannot forge it. This is `SENSITIVE_DATA`, not `ATTACKER_INPUT`.

**(b) Source-to-sink data path**
The path is real and unbroken:
- `version.js:78` — `chrome.runtime.sendMessage(msg, function(token) {...})` receives the OAuth token from background.
- `version.js:83` — `if (!token)` guard (only affects the empty/error branch).
- `version.js:92–95` — `var msg = { token: token, googleClassroom: googleClassroom };`
- `version.js:96` — `window.postMessage(msg, location.origin);`

So the OAuth token genuinely reaches `window.postMessage`.

**(c) Which security-relevant API argument is tainted?**
The `

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #2 — 🟢 FALSE POSITIVE  (SOURCE_REPORT_ONLY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_TOKEN` in `background` [BG_1] @ L218:C58 -> L218:C63
- **Sink**: `XML_HTTP_REQUEST_OPEN` in `background` [BG_1] @ L222:C12 -> L222:C89
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 4, 'distinctLines': 2, 'crossContextHops': [], 'sinkUrlControl': ['PARTIAL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow id #3 (CHROME_IDENTITY_TOKEN → XML_HTTP_REQUEST_OPEN)

### Four-part ledger

**(a) Who controls the source?**
The tainted span `token` is the callback argument of `chrome.identity.getAuthToken(...)` (background.js L214). It is a browser-issued OAuth access token obtained by the extension's own identity API — not webpage input, not message content, not DOM/storage taint. The message field `request.scopes` only influences which scopes are requested; the token value itself is not attacker-supplied.

**Confirmation from raw source (L213–L222):**
```js
else if (request.type == 'logout') {
    chrome.identity.getAuthToken({ 'interactive': false, scopes: request.scopes }, function(token) {
        ...
        chrome.identity.removeCachedAuthToken({token: token }, function() {
            console.log('Token removed from cache');
        });
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + token);
```

**(b) Source-to-sink path**
`chrome.identity.getAuthToken` callback parameter `token` → used at L218 in `removeCachedAuthToken` → used at L222 in `xhr.open('GET', ... + token)`. The propagation report

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
