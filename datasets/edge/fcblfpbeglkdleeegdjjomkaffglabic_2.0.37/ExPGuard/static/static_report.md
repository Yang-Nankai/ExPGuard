# ExPAgent Static Verification — fcblfpbeglkdleeegdjjomkaffglabic v2.0.37

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.516, scope=0.474
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service_worker_utils/track_tabs` [BG_1] @ L157:C6 -> L157:C13
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `service_worker_utils/track_tabs` [BG_1] @ L164:C10 -> L167:C12
- **Severity evidence**: ['https://stg.matador.ai/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify this flow. Let me reason through the four-part ledger.

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(function (request) {...})` at L156. The `request` object is fully controlled by any page allowed by `externally_connectable.matches` — `https://stg.matador.ai/*` and `https://app.matador.ai/*`. There is no `sender.id` allowlist; the only gate is `request.action === 'openTab'`, which is an attacker-chosen message *field*, not a browser-authenticated trust anchor.

**(b) Source-to-sink data path:**
- L156: `chrome.runtime.onMessageExternal.addListener(function (request) {` — attacker message object enters.
- L157: `if (request.action === 'openTab') {` — attacker-satisfiable action check.
- L164-167: `chrome.tabs.create({ url: request.url, index: newTabIndex })` — the tainted `request.url` flows directly into the `url` option.

No assignment overwrites `request.url` with a constant, no scheme/URL validation, no allowlist, and no sanitizer is applied between L157 and L165. The propagation report (Sanitized: False) matches the raw source exactly.

**(c) Security-relevant argument controlled by attacker:**
The `url` argume

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
