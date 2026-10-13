# ExPAgent Static Verification — eojdckfcadamkapabechhbnkleligand v40.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 2
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 6}  |  Severities: {'MEDIUM': 7}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.min` [BG_1] @ L1:C1972 -> L1:C1973
- **Sink**: `FETCH_RESOURCE` in `background.min` [BG_1] @ L1:C2832 -> L1:C2986
- **Severity evidence**: ['https://loc.dev/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me complete the verification ledger and verdict.

## Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((s, m, h) => ...)` in the MV3 service worker (`background.min.js`). `s` is the external message object, fully controlled by any page/script running on an origin permitted by `externally_connectable.matches`:
- `https://loc.dev/*`
- `https://lnmai.com/*`
- `https://mtfb.lnmai.com/*`

The listener is guarded only by:
- `const d = new URL(m.url).hostname; if(!l.includes(d)) return h({error:"Invalid request"});` where `l = chrome.runtime.getManifest().externally_connectable.matches.map(e => new URL(e).hostname)` — i.e. an **exact-hostname origin check** (loc.dev / lnmai.com / mtfb.lnmai.com). This is not a `sender.id` allowlist; it is exploitable via XSS on any of those allowed origins (the browser-enforced `externally_connectable` surface does not remove the XSS attack path).
- `if(!s.cmd)` — only requires the attacker-chosen `cmd` field to be non-empty. This is a feature selector, not an authentication/allow-list.

**(b) Exact source-to-sink path**
`onMessageExternal` message `s` → (`s.config` is

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.min` [BG_1] @ L1:C1972 -> L1:C1973
- **Sink**: `FETCH_BODY` in `background.min` [BG_1] @ L1:C2832 -> L1:C2986
- **Severity evidence**: ['https://loc.dev/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Report — Flow #2 (REQUEST_FORGERY)

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener((s, m, h) => …)` in `background.min.js`. `s` is the entire message object received from an externally-connectable web page. The message fields (`s.cmd`, `s.config`, `s.config.url`, `s.config.body`) are fully attacker-chosen.

The only pre-sink gate is:

```js
const d = new URL(m.url).hostname;
if (!l.includes(d)) return h({error:"Invalid request"});
if (!s.cmd) return h({error:"Invalid request"});
```

`l` is built from `externally_connectable.matches` → `["loc.dev","lnmai.com","mtfb.lnmai.com"]` (exact hostnames). This is a **sender-origin restriction**, not an unforgeable `sender.id` boundary (harness confirms `authenticatedExtensionAllowlist: null`). Per the audit rules, a web-origin hostname allowlist reduces scope but is exploitable via XSS/control of those origins; it does not break the data path.

### (b) Source-to-sink path
- `s` (external message) → `s.cmd === "str"` gate (attacker-satisfiable) → `s.config` → `s.config.url` and `s.config.body`.
- Sink: `fetch(s.config.url, {method:"POST", …, body: JSON.stringify({...s.config.body, 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
