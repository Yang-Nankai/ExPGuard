# ExPAgent Static Verification — icfhhpfimihpdgglmdlnmpaadfeaacbk v0.6.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.64, scope=0.529
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟠 PARTIAL / PA  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `worker` [BG_1] @ L612:C16 -> L612:C23
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `worker` [BG_1] @ L142:C4 -> L164:C6
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal` at `worker.js` L602. The manifest declares **no `externally_connectable`**, so (per Chrome default behavior) web pages cannot connect, but **other extensions can** reach the listener. The `request` object is fully attacker/caller-supplied. The listener does **not** read a page origin; it only inspects `sender.id`.

The decisive gate, at L603–L640:
- `prefs.external_denied.indexOf(sender.id) !== -1` → reject
- `prefs.external_allowed.indexOf(sender.id) !== -1` → **execute**
- otherwise, if `prefs.exaccess` is true → prompt; the user must **type the exact `sender.id`** to approve (`v === sender.id` at L620)
- otherwise (default: `exaccess: false`, `external_allowed: []`) → rejected

So any extension can *send* the message, but `execute()` only runs for a **user-approved sender ID**. `sender.id` is browser-populated from the sender's public key and cannot be chosen by a page-created extension. This is a browser-authenticated, user-managed sender allowlist — an unforgeable inter-extension trust boundary, not a page-controlled source.

### (b) Source-to-sink path
The data path is

**Attacker control:** See preserved static analyst transcript.

**Why partially available:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
