# ExPAgent Static Verification — goidmaipnklgfcbihpigigfgcmeeiiac v1.0.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/chrome/service-worker` [BG_1] @ L81:C6 -> L81:C7
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `scripts/chrome/service-worker` [BG_1] @ L134:C4 -> L137:C6
- **Severity evidence**: ['https://*.cavehls.net/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1: `onMessageExternal` → `declarativeNetRequest.updateSessionRules`

### 1. Who controls the source?

The source is `chrome.runtime.onMessageExternal.addListener` at `scripts/chrome/service-worker.js:80-81`. The entire message object `e` is supplied by an external sender. The manifest's `externally_connectable.matches` is `["https://*.cavehls.net/*"]`, so any page served from any subdomain of `cavehls.net` (or XSS on one of those origins) can call this listener. There is **no `sender.id` allow-list** and no origin check on `sender.url`/`sender.origin`. The only gate is `e.type === "CAVE_MODIFY_HEADERS"` (L81), which is a message *field* the sender chooses — attacker-satisfiable, not an authentication boundary.

Confirmed source anchor: `if (e.type === "CAVE_MODIFY_HEADERS") {`.

### 2. Source-to-sink data path

The propagation is unbroken:

- L88 `reqHeaderData = e.req_data` — attacker array.
- L89 `resHeaderData = e.res_data` — attacker array.
- L91-103 look for a `"Referer"`/`"Origin"` entry, optionally push an `"Origin"` header copied from the attacker's Referer value, and append `/` to the Referer value. These are cosmetic transformations; the key and v

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
