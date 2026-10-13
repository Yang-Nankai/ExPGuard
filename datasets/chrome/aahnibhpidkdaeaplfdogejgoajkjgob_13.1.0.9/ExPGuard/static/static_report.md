# ExPAgent Static Verification — aahnibhpidkdaeaplfdogejgoajkjgob v13.1.0.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.989, scope=1
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L213:C12 -> L213:C19
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L99:C11 -> L102:C6
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (onMessageExternal → fetch)

### (a) Who controls the source
The source is the `message` parameter of `chrome.runtime.onMessageExternal.addListener` (background.js L211–212). There is **no `sender.id` check and no allowlist** anywhere in the file (search confirmed only the `addListener` call, no `sender.id` usage). The manifest omits `externally_connectable`, which per Chrome's default means **any other installed extension can connect** (the severityReason is correct for extension-to-extension reachability). The `sender` argument is even ignored entirely — the handler only inspects attacker-supplied `message` fields.

So `message.type`, `message.url`, and `message.folder` are fully attacker-controlled by any external extension the victim installs.

### (b) Exact source-to-sink path (confirmed in source)
`onMessageExternal` → `switch (message.type)` → `case 'ADD_TORRENT'` (L213–214) →
- if `message.url.startsWith('magnet:')` → `addTorrents(settings, message.url, message.folder)` (L217) → `params = '?action=add-url&...&s=' + encodeURI(link)` (L91) → `fetch(settings.host + params, ...)` (L99);
- else → `downloadLink(settings, message.url, m

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L213:C12 -> L213:C19
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L131:C9 -> L134:C4
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: onMessageExternal → fetch(attacker URL)

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)` at `background.js:211-213`. The manifest declares **no `externally_connectable`**, which means (per Chrome semantics) *any other installed extension* can send this extension a message. There is **no `sender.id` check, no sender.origin/url check, and no allow-list** anywhere in the listener (`background.js:211-226`). Therefore the entire `message` object — `type`, `url`, `folder` — is attacker-controlled by any extension.

This is weaker than arbitrary-webpage control (webpages cannot reach `onMessageExternal` without `externally_connectable`), but it is still an untrusted external-message source, exactly as ExPGuard models it. No browser-authenticated fixed-ID IPC boundary exists, so this is not a `PARTIAL` trusted-peer case.

### (b) Source-to-sink data path
The propagation report is confirmed by raw source:

1. `switch (message.type)` (`L213`) — attacker chooses the branch.
2. `case 'ADD_TORRENT'` (`L214`).
3. `if (message.url && message.url.startsWith('magnet:'))` → `addTorrents(setting

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L213:C12 -> L213:C19
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L173:C15 -> L177:C10
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — `attacker-input-network-send` (REQUEST_FORGERY)

### Decision ledger

**(a) Who controls the source?**
An external actor controls `message`. The listener is `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => …)` at `background.js:211-213`. There is **no `sender.id` check, no allowlist, no origin check** — the listener ignores `sender` entirely. With `externally_connectable` absent, web pages cannot reach it, but **any other installed extension** can send a crafted message by its ID, so the message fields are untrusted input in this threat model. The only gates are `message.type === 'ADD_TORRENT'` (an attacker-chosen field) and `message.url.startsWith('magnet:')` (which only selects a branch, it does not neutralize the value).

**(b) Exact source-to-sink path**
- `L213` `switch (message.type)` → `case 'ADD_TORRENT'`
- `L215-222`: if `message.url` is magnet → `addTorrents(settings, message.url, message.folder)`; otherwise → `downloadLink(settings, message.url, message.folder)`.
- **Path 1** (`addTorrents`, `L91→L99`): `params = '?action=add-url…&s=' + encodeURI(link)` then `fetch(settings.host + params)`. Attacker controls `s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
