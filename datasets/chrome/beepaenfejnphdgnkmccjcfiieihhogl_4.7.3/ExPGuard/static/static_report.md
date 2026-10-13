# ExPAgent Static Verification — beepaenfejnphdgnkmccjcfiieihhogl v4.7.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 5  |  Verified: 5
- Coverage: node=0.849, scope=0.872
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 3}  |  Severities: {'HIGH': 5}

**Assessment:** Verified 5 flow(s): 5 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/sw` [BG_1] @ L1:C675 -> L1:C676
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/content` [CS_1] @ L1:C1005 -> L1:C1096
- **Bridge**: storage `STORAGE_FLOW[area: local, key: apiKey, sender: js/sw, receiver: js/content]`
- **Severity evidence**: ['https://*.checkvisaslots.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: # Verification — Flow #1 (STORAGE_POISONING, attacker-input → storage write)

## Deterministic harness / anchor checks
- Source anchor resolved to `js/sw.js`: `chrome.runtime.onMessageExternal.addListener((e,t,s)=>(e&&(e.message?"version"===e.message&&s({version:...}):e.apiKey&&chrome.storage.local.set({apiKey:e.apiKey})),!0))`.
- Sink anchor resolved to `js/content.js`: inside `clearOldUserProfiles()` → `chrome.storage.local.set({extVersion:chrome.runtime.getManifest().version,apiKey:t},()=>{})` where `let t=e.apiKey;` comes from `chrome.storage.local.get(["userProfiles","extVersion","apiKey"])`.
- Manifest: `externally_connectable.matches: ["https://*.checkvisaslots.com/*"]` (wildcard subdomain), no `sender.id` check anywhere (`search_code "sender\.id"` → NO MATCHES).

## Four-part decision ledger
**(a) Who controls the source.** The external-message handler takes `e.apiKey` verbatim from any page origin matching `https://*.checkvisaslots.com/*`. There is *no* `sender.id`/origin guard inside the listener (the `t` sender arg is unused). The wildcard subdomain broadens the surface to any subdomain (takeover / XSS / any host under that registrable domain). Provenance `UNTRUSTED_STOR

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/sw` [BG_1] @ L1:C675 -> L1:C676
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/sw` [BG_1] @ L1:C772 -> L1:C815
- **Severity evidence**: ['https://*.checkvisaslots.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Analysis

**Decision ledger**

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((e,t,s)=>…)` in `js/sw.js` receives messages from pages matching `externally_connectable.matches: ["https://*.checkvisaslots.com/*"]`. No `sender.id` check, no origin/url check inside the handler, and the harness confirms `authenticatedExtensionAllowlist: null` and `trustedWebOrigins: []`. The externally-connectable gate is an *origin allow-list*, not an unforgeable IPC boundary — it is satisfiable by any page/subdomain of `checkvisaslots.com` and is exploitable via XSS or a wildcard-subdomain takeover. The wildcard `*.checkvisaslots.com` broadens the surface to any subdomain. So `e.apiKey` is attacker-controllable.

**(b) Source → sink path.**
Confirmed directly in `js/sw.js` L1:
```js
chrome.runtime.onMessageExternal.addListener((e,t,s)=>(
  e && ( e.message
    ? "version"===e.message && s({version: chrome.runtime.getManifest().version})
    : e.apiKey && chrome.storage.local.set({apiKey: e.apiKey})
  ), !0))
```
An attacker page sends `{apiKey: "<attacker value>"}`. Since `e.message` is undefined, the ternary falls to `e.apiKey && chrome.storage.local.set({apiKey: e.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `js/content` [CS_1] @ L1:C7042 -> L1:C7050
- **Sink**: `FETCH_BODY` in `js/sw` [BG_1] @ L1:C3133 -> L1:C3185
- **Bridge**: message `runtime.single.sender.message[js/content->js/sw]`
- **Severity evidence**: ['https://*.usvisascheduling.com/*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the report plus targeted source inspection. Let me finalize the four-part ledger.

## Decision Ledger

**(a) Who controls the source.** The source is a page-dispatchable custom event `vSCP`. In `js/content.js` (content script, ISOLATED world, matches `https://*.usvisascheduling.com/*/*` and `https://atlasauth.b2clogin.com/*`) I found:

```js
addEventListener("vSCP",e=>{"vD"===e.detail.resource?setVisaDetails(e.detail.data):
 "vSD"===e.detail.resource?captureSlotDates(e.detail.data):
 "vST"===e.detail.resource&&captureSlotTimes(e.detail.data)})
```

A page script can `window.dispatchEvent(new CustomEvent('vSCP',{detail:{resource:'vSD',data:{…}}}))` and the isolated-world listener receives it (harness: `PAGE_TO_CONTENT_SCRIPT`, "a page can forge …CustomEvent fields"). `e.detail.data` is fully attacker-controlled — there is no origin/token guard (custom events can't be authenticated). ✅ attacker-controllable.

**(b) Source→sink path.** `captureSlotDates(e)` → `fetchSlotDates(e)` reads `e.ScheduleDays…` into the `slotDetails` array; `captureSlotTimes(e)` → `fetchSlotTimes(e)` reads `e.ScheduleEntries…` into the times array. Both then call:

```js
sendToServe

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/sw` [BG_1] @ L1:C675 -> L1:C676
- **Sink**: `FETCH_HEADERS` in `js/sw` [BG_1] @ L1:C3133 -> L1:C3185
- **Bridge**: storage `STORAGE_FLOW[area: local, key: apiKey, sender: js/sw, receiver: js/sw]`
- **Severity evidence**: ['https://*.checkvisaslots.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #6 (REQUEST_FORGERY, source CHROME_ONMESSAGEEXTERNAL_MESSAGE → FETCH_HEADERS)

### Deterministic harness facts
- **Source anchor** confirmed at `js/sw.js` L1 C675: `chrome.runtime.onMessageExternal.addListener((e,t,s)=>(e&&(e.message?…:e.apiKey&&chrome.storage.local.set({apiKey:e.apiKey})),!0))`.
- **Sink anchor** confirmed at L1 C3133: `const m={headers:{"x-api-key":t.apiKey,extVersion:t.extVersion},method:"POST",body:h};fetch("https://app.checkvisaslots.com"+e.resource,m)`.
- **externally_connectable**: `https://*.checkvisaslots.com/*` (wildcard subdomain), **no fixed `sender.id` allowlist**, no origin/action allow-list in the listener.
- No content-script surface is required to poison the key — the external listener is the entry.

### Four-part ledger
**(a) Who controls the source.** An external web page whose origin matches `https://*.checkvisaslots.com/*` can invoke `sendMessage` against this extension. The harness confirms the only unforgeable trust anchor would be a fixed `sender.id` comparison; there is none. Origin-scoping reduces reach but, per the harness rules, does not make attacker input impossible — wildcard-subdomain reach is the reported seve

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/sw` [BG_1] @ L1:C675 -> L1:C676
- **Sink**: `FETCH_HEADERS` in `js/popup` [OPTIONS_1] @ L1:C10039 -> L1:C10089
- **Bridge**: storage `STORAGE_FLOW[area: local, key: apiKey, sender: js/sw, receiver: js/popup]`
- **Severity evidence**: ['https://*.checkvisaslots.com/*']
- **Source report Flow ID**: `15`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the source-to-sink chain in the real source. Here's the ledger.

## Four-part decision ledger

**(a) Who controls the source — ATTACKER (web origin), no unforgeable guard**

`js/sw.js` (C600-720):
```js
chrome.runtime.onMessageExternal.addListener((e,t,s)=>(
  e && (e.message ? "version"===e.message && s({version:...})
                 : e.apiKey && chrome.storage.local.set({apiKey:e.apiKey})),
  !0))
```
The listener accepts an external-message object and, if `e.apiKey` is truthy, writes it verbatim to `chrome.storage.local`. There is **no `sender.id` comparison** and **no origin/url check**. The manifest exposes this surface with `externally_connectable.matches = ["https://*.checkvisaslots.com/*"]` — a *wildcard subdomain* web-origin match. Per the harness rules, an origin restriction is not an unforgeable IPC boundary; any page under any `checkvisaslots.com` subdomain (XSS, subdomain takeover, or an intentionally-hosted page) can send `{apiKey: <anything>}`. The only "guard" is truthiness — no schema, no allow-list, no length/format validation.

**(b) The exact source-to-sink path — UNBROKEN, single storage hop**

Confirmed by the report's `STORAGE_FLOW[area: local

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
