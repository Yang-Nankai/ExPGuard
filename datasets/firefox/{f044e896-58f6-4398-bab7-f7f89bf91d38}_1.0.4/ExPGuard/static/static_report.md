# ExPAgent Static Verification — {f044e896-58f6-4398-bab7-f7f89bf91d38} v1.0.4

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 1
- Coverage: node=0.945, scope=1
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 6}  |  Severities: {'CRITICAL': 7}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L215:C9 -> L215:C23
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L116:C29 -> L119:C8
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification

**Flow id #1 — WINDOW_MESSAGE_EVENT → FETCH_BODY (`https://www.seedr.cc/api/token`)**

### 1. Who controls the source?

The actual source is `content.js`:

```js
function receiveMessage(event) {
    if (event.origin !== "https://www.seedr.cc") return;

    const { function: func, username, password } = event.data;

    switch (func) {
        case 'login':
            showLoading();
            chrome.runtime.sendMessage({ type: 'login', username, password }, ...);
```

- The content script runs on `http://*/*` and `https://*/*`.
- The `username`/`password` fields are taken directly from `event.data` and are attacker-influenced web content.
- There is an origin guard, but it is an exact web-origin equality check against `https://www.seedr.cc`. That is not a browser-authenticated extension-ID boundary; an XSS/compromised page on `www.seedr.cc` satisfies it. Arbitrary third-party pages cannot directly satisfy it, so this reduces attack surface but does not make the source non-hostile.

### 2. Source-to-sink path

The path is real and unbroken:

1. `content.js` `window.addEventListener("message", receiveMessage)` receives page `postMessage`.
2. For `func === 'log

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
