# ExPAgent Static Verification — lbfjgknkjfjmnjdgdhbbmmbkoddgpdoc v11.5.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.131, scope=0.15
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 1, 'UNKNOWN': 1}

**Assessment:** Verified 2 flow(s): 1 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C3014 -> L1:C3015
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L1:C3021 -> L1:C3210
- **Severity evidence**: ['*://meet.google.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 210, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `chrome.tabs.create({url: e.url})`

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener` in the MV3 service worker (`background.js`). The manifest's `externally_connectable.matches` is `["*://meet.google.com/*"]`, so any script running on a `meet.google.com` page (including an injected/XSS payload on that origin) can send an external message to the extension. The message object `e` is fully attacker-controlled. There is no `externally_connectable.ids` allowlist.

### 2. Source → sink path
Confirmed directly from the minified source:

```js
chrome.runtime.onMessageExternal.addListener(async(e,t,o)=>{
  "open_new_tab"===e.type
    ? chrome.tabs.create({url:e.url}, t=>{ ... })
    : ...
})
```

- `e` (the external message) → gate `"open_new_tab" === e.type` → `chrome.tabs.create({url: e.url})`.
- No sanitization, URL-scheme validation, or allow-list is applied to `e.url`.
- The second listener parameter `t` (the sender object) is **not** consulted in this branch — no `sender.id`, `sender.origin`, or `sender.url` guard exists.

### 3. Security-relevant argument
The `url` field of `chrome.tab

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_IDENTITY_TOKEN` in `background` [BG_1] @ L1:C2169 -> L1:C2170
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L1:C3308 -> L1:C3369
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 12, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': ['PARTIAL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (CHROME_IDENTITY_TOKEN → FETCH_RESOURCE)

### Four-part decision ledger

**(a) Who controls the source?**
The source is `chrome.identity.getAuthToken` (via the helper `async function s()`). The token `a` is browser-derived: it is the user's own OAuth token for the extension's Google client, obtained with `{interactive:!0}`. It is *not* an attacker-controllable value — no webpage, content script, or message field can set or influence the token string. It is classified as SENSITIVE_DATA, not ATTACKER_INPUT/WEB_CONTENT/NETWORK_RESPONSE.

**(b) Exact source-to-sink path**
1. `s()` calls `chrome.identity.getAuthToken({interactive:!0}, t => { t && (a = t, e(t)) })` — the token is cached in module variable `a`.
2. In the background message dispatcher, the `"logoutGDrive" === e.type` branch awaits `s()`.
3. `if (a)` then executes:
   `fetch("https://accounts.google.com/o/oauth2/revoke?token=" + a)`
   and `chrome.identity.removeCachedAuthToken({token: a}, ...)`.

The propagation report's single-line "raw step" matches this exactly: the token identifier `a` is the value interpolated into the fetch URL.

**(c) Which security-relevant API argument is attacker-contro

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
