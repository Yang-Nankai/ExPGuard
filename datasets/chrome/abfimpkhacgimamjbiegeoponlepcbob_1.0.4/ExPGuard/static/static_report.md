# ExPAgent Static Verification — abfimpkhacgimamjbiegeoponlepcbob v1.0.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 7
- Coverage: node=0.945, scope=1
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 6}  |  Severities: {'CRITICAL': 1, 'HIGH': 6}

**Assessment:** Verified 7 flow(s): 6 true-positive, 0 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L593:C26 -> L593:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L21:C5 -> L28:C7
- **Severity evidence**: ['*://*.seedr.cc/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener` (background.js L597) dispatching to `external_listener(request, sender, sendResponse)` at L593. The manifest restricts `externally_connectable.matches` to `*://*.seedr.cc/*`. There is **no** `sender.id`, `sender.origin`, or `sender.url` check in the listener (verified at L534–540). Any page able to run on a `*.seedr.cc` subdomain — via XSS on an existing subdomain or control/takeover of a subdomain — can send the message. `request.func == 'login'` is an attacker-chosen field, not a trust anchor. Source is attacker-controllable (with the seedr.cc-origin precondition).

**(b) Exact source-to-sink path** (confirmed in real source):
1. `background.js:597` `chrome.runtime.onMessageExternal.addListener` → `external_listener(request, …)` (L593).
2. `background.js:535` `if (request.func == 'login')` — attacker-controlled branch.
3. `background.js:536` `oauth.login(request.username, request.access_token, 3600*12, request.refresh_token)`.
4. `oauth.js:181–183` `await s_storage.set('access_token', access_token)`, `'refresh_token'`, `'username'`.
5. `storage.js:21` `chrome.stor

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L593:C26 -> L593:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L21:C5 -> L28:C7
- **Severity evidence**: ['*://*.seedr.cc/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have confirmed the full chain in the raw source. The report's sink *loc* is mis-anchored (it points at the `keep_alive` interval block instead of the real storage write), but the propagation list and the actual code unambiguously identify the true sink: `s_storage.set('refresh_token', ...)` → `chrome.storage.local.set(...)` in `oauth.login`.

## Decision ledger

**(a) Who controls the source**
`chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => external_listener(request, sender, sendResponse))` (background.js L591–600). The `request` object is fully attacker-controlled by any page on `*://*.seedr.cc/*` (the manifest's `externally_connectable.matches`). There is **no** `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no token validation inside `external_listener`.

**(b) Exact source-to-sink path (verified in source)**
1. L597–598: `chrome.runtime.onMessageExternal.addListener` → `external_listener(request, ...)`.
2. L535: `if (request.func == 'login')` — attacker-chosen action field, trivially satisfiable.
3. L536: `await oauth.login(request.username, request.access_token, 3600 * 12, request.refresh_token)` — attacker fields passed th

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L593:C26 -> L593:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L21:C5 -> L28:C7
- **Severity evidence**: ['*://*.seedr.cc/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (Seedr extension, storage poisoning)

### Four-part decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener` in `background.js` L597–599 forwards the raw `request` object to `external_listener`. The message payload is controlled by whatever web origin is allowed by `externally_connectable.matches: ["*://*.seedr.cc/*"]`. This is a web-origin restriction, not a browser-authenticated sender identity: there is **no** `sender.id`/`sender.origin`/`sender.url` check anywhere in `background.js` (verified via search — zero matches). `request.func === 'login'` is an attacker-chosen field, not a trust anchor.

**(b) Exact source-to-sink path**
- `background.js:597-599` `chrome.runtime.onMessageExternal.addListener` → `external_listener(request, sender, sendResponse)`
- `background.js:534-536` `if (request.func == 'login') { await oauth.login(request.username, request.access_token, 3600*12, request.refresh_token); }`
- `oauth.js:175-183` `login()` does `this.username = username` and `await s_storage.set('username', username)` (also `access_token`, `refresh_token`)
- `storage.js:10-21` `set()` builds `i[setting] = value` and cal

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L598:C26 -> L598:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L21:C5 -> L28:C7
- **Severity evidence**: ['*://*.seedr.cc/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 (STORAGE_POSOING)

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener` in the background service worker (background.js L597–598), which invokes `external_listener(request, sender, sendResponse)`.

`request` here is the raw external message payload. Any page whose origin matches `externally_connectable.matches: ["*://*.seedr.cc/*"]` can call `chrome.runtime.sendMessage(<extension_id>, payload)` and fully control:

- `request.func`
- `request.username`
- `request.access_token`
- `request.refresh_token`

There is **no `sender.id` allowlist** and no origin/URL equality check inside `external_listener`. The only guard is the browser-enforced `externally_connectable` origin restriction, which is a real scope reduction but is not an unforgeable identity boundary: XSS on any `*.seedr.cc` origin (or a weakly controlled matching subdomain) satisfies it.

### 2. Source-to-sink path (confirmed in source)
The propagation evidence is correct and unbroken:

1. `background.js:598` — `external_listener(request, sender, sendResponse)` (external message).
2. `background.js:535` — `if (request.func == 'login')` — attacker-satisfiable field chec

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #5 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L598:C26 -> L598:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L21:C5 -> L28:C7
- **Severity evidence**: ['*://*.seedr.cc/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: Seedr — external login message → `chrome.storage.local` poisoning

### (a) Who controls the source?
`chrome.runtime.onMessageExternal.addListener` (background.js L597–600) is invoked by any page matching the manifest's `externally_connectable.matches: ["*://*.seedr.cc/*"]`. The message object `request` is fully attacker-influenced when code can run on that origin (XSS on seedr.cc or a subdomain). There is **no `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no validation of the token fields** — `request.func`, `request.username`, `request.access_token`, and `request.refresh_token` are all taken verbatim from the message.

### (b) Exact source→sink path
Confirmed in raw source:

1. **Source** — `background.js:597-598`:
   `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => { external_listener(request, sender, sendResponse); ... })`
2. **Branch** — `background.js:535`:
   `if (request.func == 'login')` (attacker-chosen action selector).
3. **Call** — `background.js:536`:
   `await oauth.login(request.username, request.access_token, 3600 * 12, request.refresh_token);`
4. **Sink** — `oauth.js:181-183`:
   ```js
   awa

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #6 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L598:C26 -> L598:C33
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L21:C5 -> L28:C7
- **Severity evidence**: ['*://*.seedr.cc/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener` (background.js L597–598), which dispatches into `external_listener(request, sender, sendResponse)` (L534). The `request` object is supplied by any webpage/extension that the manifest allows to connect. The listener completely ignores `sender` — there is **no `sender.id` fixed-ID allowlist and no `sender.origin`/`sender.url` check**. The only gate is the manifest `externally_connectable.matches: ["*://*.seedr.cc/*"]`, a wildcard subdomain scope. A page on any `*.seedr.cc` subdomain (or XSS on one of those origins) can invoke the listener with attacker-chosen fields.

### (b) Exact source-to-sink path
1. `external_listener(request, ...)` — attacker message object.
2. L535: `if (request.func == 'login')` — attacker sets `func: "login"`.
3. L536: `await oauth.login(request.username, request.access_token, 3600 * 12, request.refresh_token)` — attacker fields passed through.
4. oauth.js L175–183: `this.username = username; this.access_token = access_token; this.refresh_token = refresh_token;` then
   - `s_storage.set('access_token', access_token)`
   - `s_storage.set('re

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #0 — 🟠 PARTIAL / PA  (REQUEST_FORGERY / CRITICAL, confidence 0.70)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L215:C9 -> L215:C23
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L116:C29 -> L119:C8
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (REQUEST_FORGERY: `WINDOW_MESSAGE_EVENT` → `FETCH_BODY` to `https://www.seedr.cc/api/token`)

### 1. Who controls the source?
The source is `content.js` `receiveMessage` — `window.addEventListener("message", receiveMessage, false)` at L239, with the tainted destructure at L215:

```js
if (event.origin !== "https://www.seedr.cc") return;
const { function: func, username, password } = event.data;
```

`username` and `password` are fully attacker-controlled *postMessage fields*. The only guard is `event.origin !== "https://www.seedr.cc"`, an exact web-origin equality check. Per the harness rules, this is **not** an unforgeable browser-authenticated boundary (`sender.id` is; `event.origin` is not). An attacker who can run JS on `https://www.seedr.cc` (XSS on the trusted partner, or control of a seedr.cc-origin frame/page) trivially satisfies it, because on seedr.cc the check degenerates to `event.origin === window.location.origin`. A random arbitrary page (e.g. `evil.com`) cannot set `event.origin` to seedr.cc, so the effective surface is narrowed — but it is not eliminated.

### 2. Source-to-sink path
The data path is unbroken:

1. `content.js` L215: attacke

**Attacker control:** See preserved static analyst transcript.

**PA category:** `PA_TRUSTED_WEB_ORIGIN`

**Why partially available:** The message listener accepts only an exact event.origin allowlist (https://www.seedr.cc). Exploitation requires control/XSS at that trusted web origin; arbitrary websites cannot invoke it.

**Dynamic-test guidance** (triggerable: no, mechanism: `WINDOW_POSTMESSAGE`)
- Origin requirement: https://www.seedr.cc
- Notes: PA_TRUSTED_WEB_ORIGIN: replay only with an operator-owned origin fixture.

---
