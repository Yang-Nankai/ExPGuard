# ExPAgent Static Verification — mbpfipleganodbgndfadpokojibnfhjb v0.4.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.555, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `serviceWorker` [BG_1] @ L1366:C11 -> L1366:C18
- **Sink**: `WEBSOCKET_URL` in `serviceWorker` [BG_1] @ L1135:C21 -> L1135:C39
- **Severity evidence**: ['*://*.vidangel.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 46, 'distinctLines': 11, 'crossContextHops': [], 'sinkUrlControl': ['FULL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. The source-level report and raw source agree.

## Verification analysis

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener` (serviceWorker.js L1365–1368) receives `message` from any external origin permitted by `externally_connectable.matches: ["*://*.vidangel.com/*"]`. The message payload — including `message.request.uri` and `message.request.args` — is fully chosen by the calling page. There is **no** `sender.id` fixed-extension allowlist; the only boundary is the web-origin match pattern on `vidangel.com` subdomains, which is satisfiable via XSS on any allowed host or subdomain takeover. The extension ID is public (Chrome Web Store).

**(b) Source-to-sink data path (unbroken):**
- L1366: `router(message.request, sender, sendResponse)` — taint carried on `message.request`.
- L1322: `switch (request.uri)` — dispatches on the attacker-chosen action.
- L1338–1340: `case "socket": doWebSocket(request.args[0], request.args[1]).then(sendResponse)` — `request.args[0]` becomes the first parameter `uri`.
- L1132–1135: `function doWebSocket(uri, initial_data = {}) { ... const socket = new WebSocket(uri); }` — the attacker-chose

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
