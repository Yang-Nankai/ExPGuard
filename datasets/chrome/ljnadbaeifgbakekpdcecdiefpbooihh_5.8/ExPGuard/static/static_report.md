# ExPAgent Static Verification — ljnadbaeifgbakekpdcecdiefpbooihh v5.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 3}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L152:C15 -> L152:C22
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L63:C34 -> L69:C8
- **Severity evidence**: ['https://*.octagst.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: The evidence is decisive and I confirmed it against the raw source. Filling the four-part ledger:

**(a) Source control.** `chrome.runtime.onMessageExternal.addListener` at `background.js` L151–154 receives `request` from any externally-connectable origin. `externally_connectable.matches` = `https://*.octagst.com/*`, `https://*.octagst.in/*`, `*://localhost/*`, `https://*.taxcpc.com/*`, `https://*.nanogst.in/*`. These are web origins (not extension IDs), and wildcard subdomains + `*://localhost/*` give a broad, attacker-reachable surface (subdomain takeover, XSS on any allowed domain, or any local web page). The `sender` parameter is **completely unused** — there is no sender.id/origin/url check of any kind.

**(b) Path.** Direct and unbroken: `onMessageExternal` L152 → `processAsync(request, sendResponse)` L152 → L49 `if (['GET','POST','HEAD'].includes(request.method))` → L63 `fetch(request.url, {...})`. No message/storage hop, no constant overwrite, no sanitizer, no allow-list on the URL or method.

**(c) Security-relevant argument.** The tainted `request.url` is the **full URL** consumed by `fetch`, and `request.method`, `request.body`, `request.contentType` (→ `Content-Type` he

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L152:C15 -> L152:C22
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L63:C34 -> L69:C8
- **Severity evidence**: ['https://*.octagst.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener` at `background.js:151–154`. The listener body immediately calls `processAsync(request, sendResponse)` with the incoming message object. I inspected the real source:

```js
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  processAsync(request, sendResponse)
  return true
})
```

There is **no `sender.id` / `sender.origin` / `sender.url` check and no action allow-list**. The message is accepted from any origin permitted by `externally_connectable`, which is:

- `https://*.octagst.com/*`
- `https://*.octagst.in/*`
- `*://localhost/*`
- `https://*.taxcpc.com/*`
- `https://*.nanogst.in/*`

Wildcard-subdomain matches (plus `*://localhost/*`) mean the source is genuinely attacker-controllable: any subdomain of those hosts — or any page on `localhost` — can call the listener, and XSS/subdomain hosting on those origins is a realistic trigger. The message fields (`request.url`, `request.method`, `request.contentType`, `request.at`, `request.body`, `request.responseType`) are entirely attacker-chosen.

### (b) Exact source-to-sink pat

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L152:C15 -> L152:C22
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L63:C34 -> L69:C8
- **Severity evidence**: ['https://*.octagst.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (REQUEST_FORGERY: external message → background `fetch`)

### Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener` at `background.js:151`, which hands the raw `request` object to `processAsync(request, sendResponse)` at L152. There is **no `sender.id` allowlist, no `sender.origin`/`sender.url` check, no action whitelist, and no schema/URL validation**. The message comes from any web origin listed in `externally_connectable`:

- `https://*.octagst.com/*`
- `https://*.octagst.in/*`
- `*://localhost/*` (any local server/port)
- `https://*.taxcpc.com/*`
- `https://*.nanogst.in/*`

These are wildcard matches, not browser-authenticated extension IDs, so any page on those origins — or XSS on any of them — can fully control `request`. Source is genuinely attacker-controllable.

**(b) Exact source-to-sink path**
```
onMessageExternal (L151) 
  → processAsync(request) (L152)
  → if (['GET','POST','HEAD'].includes(request.method)) (L49)   // attacker-chosen method
  → fetch(request.url, {                                        // L63
        method: request.method,                                 // L64
     

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
