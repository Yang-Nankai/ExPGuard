# ExPAgent Static Verification — befngoippmpmobkkpkdoblkmofpjihnk v26.7.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.989, scope=1
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 2}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `prospector/background-worker/prospector-open-popup` [BG_1] @ L48:C10 -> L48:C17
- **Sink**: `CHROME_LOCAL_STORAGE` in `prospector/background-worker/prospector-open-popup` [BG_1] @ L50:C6 -> L50:C67
- **Severity evidence**: ['*://*.leadiq.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (STORAGE_POISONING, `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `chrome.storage.local.set`)

**Decision ledger**

**(a) Who controls the source.** The listener is `chrome.runtime.onMessageExternal.addListener(handleIncomingPopupMessage)` (`prospector-open-popup.js:15`), so the `message` parameter is by definition externally-sourced. The manifest's `externally_connectable.matches` is `["*://*.leadiq.com/*"]` — no `sender.id` check, no allow-list, no origin/url validation anywhere in the handler. ExPGuard provenance is `EXTERNAL_MESSAGE`. A page on any `leadiq.com` subdomain, a subdomain-takeover host, or an XSS on `leadiq.com` can drive `message` with arbitrary `{type, left}` fields. The harness itself warns: "*manifest matches reduce scope but are not proof that attacker input is impossible*".

**(b) Source→sink path.** Confirmed verbatim in the raw source (matches the primary report exactly):
- L47–48: `function handleIncomingPopupMessage (message, sender) { switch (message.type) {`
- L49–50: `case 'POPUP_LEFT_POSITION_CHANGED': chrome.storage.local.set({ popupLeftPosition: message.left })`

The tainted span `message.left` is the *stored value itself* — not a bo

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `prospector/background-worker/prospector-open-popup` [BG_1] @ L14:C0 -> L14:C64
- **Sink**: `CHROME_LOCAL_STORAGE` in `prospector/background-worker/prospector-open-popup` [BG_1] @ L50:C6 -> L50:C67
- **Bridge**: message `runtime.single.sender.message[meta/on-message-external->prospector/background-worker/prospector-open-popup]`
- **Severity evidence**: ['*://*.leadiq.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`EXTERNAL_MESSAGE`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #2 — external message → `chrome.storage.local.set`

### Deterministic harness reconciliation
- The harness flagged the reported anchor `L14` as not containing the expected `onMessageExternal` token. That is a one-line off-by-one: `L14 chrome.runtime.onMessage.addListener(handleIncomingPopupMessage)` and `L15 chrome.runtime.onMessageExternal.addListener(handleIncomingPopupMessage)` register **the same handler**. The external registration (L15) is real and reachable, so the source is genuinely `CHROME_ONMESSAGEEXTERNAL_MESSAGE`. Harness warning resolved, not a refutation.
- `externallyConnectable.matches = ["*://*.leadiq.com/*"]`; `authenticatedExtensionAllowlist = null`; no `sender.id`/`sender.origin` check anywhere in the handler.

### Four-part ledger
**(a) Who controls the source.** Any page on a `*.leadiq.com` subdomain can call `chrome.runtime.sendMessage(<extId>, payload)` and reach `onMessageExternal` (L15). There is **no** sender validation in the code — `handleIncomingPopupMessage(message, sender)` accepts `sender` but never inspects it (L47). Wildcard subdomain matching widens the surface (compromised/takeover subdomain, or XSS on any leadiq.com origi

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `meta/on-message-external` [BG_1] @ L1:C57 -> L1:C61
- **Sink**: `FETCH_RESOURCE` in `meta/on-message-external` [BG_1] @ L319:C35 -> L319:C54
- **Severity evidence**: ['*://*.leadiq.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source** — `chrome.runtime.onMessageExternal.addListener(asyncHandler(...))` (meta/on-message-external.js L4–5, in the background service worker, frame `BG_1`). The `request` object is wholly attacker-authored. Reachability is gated only by `externally_connectable.matches: ["*://*.leadiq.com/*"]` (wildcard subdomain) — the harness itself flags this as reduced-scope, not proof of impossibility. There is **no** `sender.id` comparison anywhere in the file (search for `sender.id` returns nothing); `authenticatedExtensionAllowlist: null`. So the trust anchor is exactly the class of check the rules call *not unforgeable*: a web-origin restriction.

**(b) Source → sink path** — The report's propagation chain is coherent and confirmed in raw source:
- L315 `const { url, options } = request.payload` (sink-side destructure)
- L319 `const response = await fetch(url, options)`
- L321–324 the raw response is read (`response.text()` / `response.json()`) and handed back through `syncResponse` → `sendResponse` to the page that sent the external message.

`FETCH_TEXT` / `FETCH_JSON` are live `switch` cases (L313–314), so the branch is reachable, not dead c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `meta/on-message-external` [BG_1] @ L1:C57 -> L1:C61
- **Sink**: `FETCH_OPTIONS` in `meta/on-message-external` [BG_1] @ L319:C35 -> L319:C54
- **Severity evidence**: ['*://*.leadiq.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source.** The sink branch is reached only through `chrome.runtime.onMessageExternal.addListener(...)` (`meta/on-message-external.js:4`). The `asyncHandler` wrapper (`L1`) simply forwards `...args` to the real handler, confirming the reported source anchor. The delivered `request` object is a page-authored message: the sender chooses `request.type` (`'FETCH_TEXT'`/`'FETCH_JSON'`) and, critically, `request.payload.url` and `request.payload.options`. Provenance is `EXTERNAL_MESSAGE` from an origin matched by `externally_connectable.matches: ["*://*.leadiq.com/*"]`.

**(b) The source→sink path.** The report's propagation is confirmed verbatim in source:
- `L315  const { url, options } = request.payload` (both fields destructured straight from the attacker message)
- `L319  const response = await fetch(url, options)`
The branch is selected by the attacker-chosen `request.type`, so it is live, not dead code. Unbroken: `request.payload.url/options → fetch(url, options)`.

**(c) Which security-relevant argument is tainted.** **Both** operative arguments — the request URL and the `RequestInit` options — are fully attacker-controlled at a background

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
