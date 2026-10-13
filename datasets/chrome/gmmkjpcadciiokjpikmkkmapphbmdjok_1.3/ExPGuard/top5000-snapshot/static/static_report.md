# ExPAgent Static Verification — gmmkjpcadciiokjpikmkkmapphbmdjok v1.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1, scope=1
- Flow types: {'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service-worker` [BG_1] @ L41:C12 -> L41:C15
- **Sink**: `FETCH_RESOURCE` in `service-worker` [BG_1] @ L69:C8 -> L69:C37
- **Severity evidence**: ['https://reqbin.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Analysis

**Four-part ledger:**

**(a) Who controls the source?** `chrome.runtime.onMessageExternal.addListener` (service-worker.js L32-51). The `req` argument and `req.data` are supplied by any page whose origin is in `externally_connectable.matches`: `https://reqbin.com/*`, `https://app.reqbin.com/*`, `https://beta.reqbin.com/*`. There is **no** fixed extension-ID allowlist (`authenticatedExtensionAllowlist: null`).

**(b) Source→sink path.** Confirmed in raw source:
- L34 `getSenderOrigin(sender)` → L36 `if (!TRUSTED_ORIGINS.has(origin)) return;` — a **web-origin equality** check (not a `sender.id` trust anchor).
- L45-47 `case 'rbPostData': fetchRequest(req.data, sendResponse)` forwards the attacker payload.
- fetchRequest.js L10 `const json = JSON.parse(data.json)` → L11 headers, L14 `method: json.method`, L19 `fetchData.body = json.content`, L57/`authHeader` → **L69 `fetch(json.idnUrl, fetchData)`**.

**(c) Security-relevant argument controlled.** `json.idnUrl` (sink URL, report metadata `('FETCH_RESOURCE','FULL')`) plus `method`, `body`, and `Authorization` header are all parsed straight from the attacker-supplied JSON. The service worker fetches with the extension's `hos

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service-worker` [BG_1] @ L41:C12 -> L41:C15
- **Sink**: `FETCH_BODY` in `service-worker` [BG_1] @ L69:C8 -> L69:C37
- **Severity evidence**: ['https://reqbin.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger — Flow #1 (REQUEST_FORGERY, `attacker-input-network-send`)

**(a) Who controls the source.**
The source is `chrome.runtime.onMessageExternal.addListener` in `service-worker.js`. The listener's first argument `req` (source anchor L41 `switch (req && req.cmd)`) is fully attacker-supplied. Reachability is gated only by `externally_connectable.matches` = `reqbin.com/*`, `app.reqbin.com/*`, `beta.reqbin.com/*` (harness), i.e. a **web-page-origin** surface, not an extension-ID allowlist. Note the harness warning that the raw anchor text doesn't itself contain `onMessageExternal` — but the resolved file confirms the listener at L32–L51, so the anchor is correct.

**(b) Exact source→sink path (confirmed in raw source).**
- `service-worker.js` L41 `switch (req && req.cmd)` → `case 'rbPostData'` L45–46: `fetchRequest(req.data, sendResponse); return true;`
- `fetchRequest.js` L3 `fetchRequest(data, …)`; L10 `const json = JSON.parse(data.json)` → attacker controls `json.idnUrl`, `json.method`, `json.headers`, `json.content`, `json.auth`.
- Sink `fetchRequest.js` L69 `fetch(json.idnUrl, fetchData)` with `method: json.method` (L14), `body: json.content` (L19), arbitrary `h

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
