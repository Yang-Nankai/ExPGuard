# ExPAgent Static Verification — ookgnahfklmejhicejjbfjifppjbfnlk v5.3.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 15  |  Verified: 4
- Coverage: node=0.943, scope=1
- Flow types: {'STORAGE_POSOING': 4, 'REQUEST_FORGERY': 10, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 15}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_2] @ L162:C6 -> L162:C13
- **Sink**: `CHROME_SESSION_STORAGE` in `content` [CS_2] @ L154:C14 -> L154:C46
- **Severity evidence**: ['https://www.facebook.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1: WINDOW_MESSAGE_EVENT → chrome.storage.* (STORAGE_POISONING)

### 1. Who controls the source?
The source is `window.addEventListener('message', ...)` in `content.js` (content script, ISOLATED world), running on `https://www.facebook.com/*`, `business.facebook.com/*`, `adsmanager.facebook.com/*`. The listener accepts messages where `e.source === window` and `e.data.__adsmeta` is truthy. Both conditions are satisfiable by page-context code on the matched origin itself (a page's own `window.postMessage` delivers to the content script's listener, and `e.source === window` is trivially true). Per the harness, `event.source === window` and message field flags are not authentication. **Attacker/untrusted-page-controllable.**

### 2. Source → sink path (confirmed in raw source, not just the report)
I read `content.js` L159–173:

- L160–162: `window.addEventListener('message', ...)`; guard `if (e.source !== window) return; if (!e.data || !e.data.__adsmeta) return;` — satisfiable.
- L163: `const { token, fbdt } = e.data;` — attacker-chosen fields.
- L164: `if (token && token.startsWith('EAA')) {` — bypassable prefix check; attacker sets `token = 'EAA' + <anything>`.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_2] @ L162:C6 -> L162:C13
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_2] @ L171:C10 -> L171:C82
- **Severity evidence**: ['https://www.facebook.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is a `window.addEventListener('message', ...)` in `content.js` (isolated-world content script running on `https://www.facebook.com/*`, `https://business.facebook.com/*`, `https://adsmanager.facebook.com/*`). Any script running in the page's MAIN world — including the page itself or XSS-injected code — can call `window.postMessage(...)` and drive `e.data`. The harness confirms this is a page-to-content-script bridge, and page-supplied message fields are attacker-controlled.

**(b) Source-to-sink path (confirmed in real source):**
- L160–162: listener runs; guard `if (e.source !== window) return;` then `if (!e.data || !e.data.__adsmeta) return;`
- L163: `const { token, fbdt } = e.data;` — attacker-controlled `token` extracted.
- L164: `if (token && token.startsWith('EAA'))` — a trivial format prefix gate, not sanitization (attacker supplies `token = 'EAA...'`).
- L165: `_cachedToken = token`
- L168: `sessionStorage.setItem('_adsmeta_fb_token', token)` (web storage)
- L169: `safeSessionSet({ fb_token: token, ... })` → L154 `chrome.storage.session.set(data)`
- L171: `chrome.storage.local.set({ fb_token: token, fb_token

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L413:C6 -> L413:C13
- **Sink**: `CHROME_SESSION_STORAGE` in `background` [BG_1] @ L7:C39 -> L7:C94
- **Severity evidence**: ['https://adsmeta.io/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener` (background.js L404). This listener is reachable by web pages whose origin is in `externally_connectable.matches` — `https://adsmeta.io/*`, `https://www.adsmeta.io/*`, `https://v2.adsmeta.io/*`, plus localhost dev origins. There is **no** `sender.id` extension allowlist. The only guard is an exact `sender.origin` equality check against a fixed origin list (L406–411), which is a web-origin restriction, not a browser-authenticated fixed-extension-ID trust boundary. Under the stated threat model, an attacker with XSS on any of those origins (or subdomain takeover) can emit arbitrary messages. So the message content, including `request.jwt`, is effectively attacker-controllable.

### (b) Source → sink data path
Confirmed intact:
- L404: `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {...})`
- L525: `if (request?.type === 'SMETA_JWT') {`
- L526: `const jwt = request.jwt;`
- L527: `if (jwt && typeof jwt === 'string' && jwt.length < 2048) {` — only a type/length gate; **the value is not sanitized, allowed-listed, or replaced**.
- L528: `

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L413:C6 -> L413:C13
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L58:C20 -> L65:C6
- **Severity evidence**: ['https://adsmeta.io/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — decision ledger

**(a) Who controls the source**
The source is the `request` object passed to `chrome.runtime.onMessageExternal.addListener` (confirmed at `background.js:404`). Any page on the `externally_connectable` origins — `https://adsmeta.io/*`, `https://www.adsmeta.io/*`, `https://v2.adsmeta.io/*`, and the localhost:5173 dev origins — can call the extension. The listener additionally checks `sender.origin` against an exact-origin allowlist (`background.js:406-411`). That is a *web-origin* equality check, not a browser-authenticated fixed `sender.id` boundary. Per the trust rules, exact `sender.origin` equality is exploitable via XSS on any allowed origin, so the source remains attacker-controllable (XSS prerequisite), not unforgeably authenticated.

**(b) Source-to-sink data path (verified in source)**
- `background.js:525` — `if (request?.type === 'SMETA_JWT') {`
- `background.js:526` — `const jwt = request.jwt;` (attacker-controlled)
- `background.js:527` — `if (jwt && typeof jwt === 'string' && jwt.length < 2048)` — only a type/length gate, trivially satisfiable; the value itself is not sanitized.
- `background.js:528` — `jwtStore.set(jwt)` → `backg

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
