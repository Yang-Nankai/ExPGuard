# ExPAgent Static Verification — nenibigflkdikhamlnekfppbganmojlg v3.0.29

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 8  |  Verified: 3
- Coverage: node=0.515, scope=0.465
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 7}  |  Severities: {'MEDIUM': 8}

**Assessment:** Verified 3 flow(s): 2 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L74:C8 -> L74:C11
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L1537:C24 -> L1537:C43
- **Severity evidence**: ['https://meet.google.com/*']
- **Source report Flow ID**: `10`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #10 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_HEADERS` (REQUEST_FORGERY)

### 1. Source: attacker-controllable — YES
`background.js` L71–76:

```js
chrome.runtime.onMessageExternal.addListener(
    async function (req, sender, sendResponse) {
        console.log('external sender', sender)
        req.sendingTab = sender.tab.id
        sendResponse(await newRequest(req))
    })
```

This listener accepts any JSON object `req` from an externally-connectable page (`https://meet.google.com/*`). There is **no** `sender.id` allowlist, no `sender.origin` check, and no field allowlist. Every field of `req` (including `token`, `type`, `body`, `id`, `values`, etc.) is attacker-chosen. The taint anchored at L74 (`req`) legitimately covers the whole message object.

### 2. Path to the sink — real, with one runtime precondition
The propagation is:

`req` → `newRequest(req)` (L75) → `getAuth(req)` (L489) → `switch (request.type)` (L492) → `createSink`/`meetInit`/`sheetCheck`/`newAttendance` → `dataRefresh(request)` (L249) → `fetchUser(request)` (L251) → `fetchRetry(url, options)` (L1510) → `fetch(url, options)` (L1537).

I confirmed in source:

- `getAuth` (L211–223) 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L74:C8 -> L74:C11
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L1537:C24 -> L1537:C43
- **Severity evidence**: ['https://meet.google.com/*']
- **Source report Flow ID**: `10`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — REQUEST_FORGERY (attacker-input-network-send)

### Decision ledger

**(a) Who controls the source?**
The source is the `req` object passed to `chrome.runtime.onMessageExternal.addListener` at `background.js` L71–76. Because `externally_connectable.matches` allows `https://meet.google.com/*`, a page on that origin (or XSS there) can send a message whose fields it controls. So the source *object* is genuinely attacker-influenced. The anchor line L74 (`req.sendingTab = sender.tab.id`) actually **overwrites** `req.sendingTab` with the browser-supplied tab id, but ExPGuard taints the whole `req` object, not a specific attacker field.

**(b) Exact path**
`onMessageExternal` → `newRequest(req)` (L486) → `getAuth(request)` (L211–223, sets `request.token = chrome.identity.getAuthToken(...)` token) → `switch(request.type)` case `'initialize'` (L496–497) → `initialize(request)` (L140) → `request.token = await getToken()` (L142, browser OAuth token) → `request.email = userInfo.email || 'Unknown User'` (L151, browser-derived/constant) → `request.subscription = 'prod_Hmgytm7tNFfpVD'` (L155, hardcoded) → `setSubScription(request)` (L166) → `subscription(request)` (L17

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L74:C8 -> L74:C11
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L1537:C24 -> L1537:C43
- **Severity evidence**: ['https://meet.google.com/*']
- **Source report Flow ID**: `10`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow index 6 — REQUEST_FORGERY (attacker-input → network-send)

### 1. Who controls the source?

`chrome.runtime.onMessageExternal.addListener(async function (req, sender, sendResponse) { ... req.sendingTab = sender.tab.id; sendResponse(await newRequest(req)); })` at **background.js L71–76**.

The whole `req` object is attacker-controlled message data from an externally-connectable page. The manifest restricts `externally_connectable.matches` to `https://meet.google.com/*`, so an attacker needs code execution in that origin (e.g. XSS on Meet) — a real precondition, but per the harness this is a scope restriction, not an unforgeable trust boundary. The listener itself performs **no** `sender.id` allowlist, no `sender.origin` equality check, and no message-field validation. So the source is genuinely untrusted data under the XSS precondition.

### 2. Source-to-sink path

The flagged sink is `let res = await fetch(url, options)` at **L1537** inside `fetchRetry`. I inspected the raw source and confirmed a concrete, reachable path where `url` is attacker-controlled:

1. `req` (external message) → `newRequest(req)` (L75).
2. `newRequest` calls `request = await getAuth(

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
