# ExPAgent Static Verification — iedifognpinkpfaemlnnniomklocpcnh v2.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.145, scope=0.137
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L1:C438 -> L1:C439
- **Sink**: `FETCH_RESOURCE` in `js/background` [BG_1] @ L1:C2175 -> L1:C2210
- **Severity evidence**: ['https://*.app-sorteos.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 71, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': ['FULL']}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the flow from the primary evidence and confirmed the key code regions in `js/background.js`.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener` in the background service worker accepts messages from any origin allowed by `externally_connectable`. The manifest allows `https://*.app-sorteos.com/*` (wildcard subdomains). The handler immediately reads `t.payload` and `t.type` with **no `sender` check at all** (a `search_code` for `sender` returned NO MATCHES). So the message fields `type`, `payload.media_id`, and `payload.min_id` are fully attacker-controlled from an app-sorteos.com web surface (or XSS/subdomain takeover there). No fixed extension-ID allowlist exists.

**(b) Exact source-to-sink path (confirmed):**
- `onMessageExternal.addListener(async(t,e,n)=>{ ... r = t.payload ... })` (L1 C438)
- Branch: `t && "comments" === t.type` → `t = r` (reassigns `t` to the attacker payload)
- URL construction:
  ```js
  let e = "https://www.instagram.com/api/v1/media/" + t.media_id
          + "/comments/?can_support_threading=true&permalink_enabled=false";
  t.min_id && (e += "&min_id=" + encodeURIComponent(t.min_id));
  fetch

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
