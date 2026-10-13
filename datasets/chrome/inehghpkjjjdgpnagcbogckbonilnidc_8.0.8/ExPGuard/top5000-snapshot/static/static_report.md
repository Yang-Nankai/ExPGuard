# ExPAgent Static Verification — inehghpkjjjdgpnagcbogckbonilnidc v8.0.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.974, scope=1
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 2}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L350:C27 -> L350:C34
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L125:C8 -> L130:C10
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: dgServiceHost, sender: background, receiver: background]`
- **Severity evidence**: ['https://*.degreed.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — REQUEST_FORGERY (attacker-controlled fetch URL)

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener` in `background.js` L348. `onMessageExternal` receives messages only from origins matching the manifest's `externally_connectable.matches`:

- `https://*.degreed.com/*`
- `https://*.degreed.app/*`

There is **no `sender.id` allowlist and no `sender.origin`/`sender.url` check** anywhere in the listener (L348–405). The harness correctly notes that wildcard-subdomain origin matching is a scope reduction, not an unforgeable trust anchor: a subdomain takeover or XSS on any `*.degreed.com` / `*.degreed.app` origin satisfies it. So the message payload is attacker-controllable under that prerequisite.

### (b) Exact source-to-sink path
Verified in real source:

1. **L348** `onMessageExternal` listener receives `request`.
2. **L351–352** `switch(message)` → case `EVENT_SET_SERVICE_HOST` (`'SET_SERVICE_HOST'`, L30).
3. **L354** `const dgServiceHost = request.value;` — the tainted span.
4. **L355–356** only a `localhost`/port check that conditionally appends `:44300`; it does **not** validate scheme/host.
5. **L357** `chrome.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L350:C27 -> L350:C34
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L125:C8 -> L130:C10
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: degreed_bearer_access, sender: background, receiver: background]`
- **Severity evidence**: ['https://*.degreed.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => …)` at `background.js:348`. `request` is supplied by any page running on an origin matched by `externally_connectable.matches`, i.e. `https://*.degreed.com/*` and `https://*.degreed.app/*`. The handler **never inspects `sender`** — no `sender.id` allowlist, no `sender.origin` check. The switch is keyed on `request.message`, which is itself attacker-chosen. So the source is externally reachable and fully attacker-controllable (subject only to the manifest origin restriction, which is wildcard-subdomain and XSS-exploitable per the harness rules).

**(b) Exact source→sink path**
- `L350`: `message = request.message?.message || request.message`.
- `L352` `case EVENT_SET_SERVICE_HOST` (`'SET_SERVICE_HOST'`): `dgServiceHost = request.value` (L354) → `chrome.storage.sync.set({ dgServiceHost: dgServiceHost + localPort })` (L357). Attacker controls the stored service host.
- `L377` `case EVENT_SET_ACCESS_TOKEN` (`'SET_ACCESS_TOKEN'`): `token = request.token || request.message?.value` (L378) → `storageValue[BEARER_ACCESS_TOKEN] = token[BEARER_ACC

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
