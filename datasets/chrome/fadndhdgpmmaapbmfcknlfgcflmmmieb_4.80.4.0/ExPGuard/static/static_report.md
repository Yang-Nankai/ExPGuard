# ExPAgent Static Verification — fadndhdgpmmaapbmfcknlfgcflmmmieb v4.80.4.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `web/script.min` [CS_1] @ L1:C657 -> L1:C755
- **Sink**: `WINDOW_POSTMESSAGE` in `web/script.min` [CS_1] @ L1:C685 -> L1:C753
- **Bridge**: message `runtime.connect.sender.message[web/worker->web/script.min]`
- **Severity evidence**: ['*://*.twitch.tv/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`EXTERNAL_MESSAGE`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Analysis

**Reported flow:** `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` (web/worker, `originFrameFamily: BG`) → `WINDOW_POSTMESSAGE` sink in the content script `web/script.min` (`CS_1`), labelled `PRIVILEGE_ESCALATION` with `privilegeReason: "sink grants capability beyond the source origin"`. Channel: `runtime.connect.sender.message[web/worker->web/script.min]`.

### Four-part ledger

**(a) Source control.** The worker does register `f.runtime.onConnectExternal.addListener(q)` (confirmed at worker.js: `f.runtime.onConnect.addListener(q),f.runtime.onConnectExternal.addListener(q)…`). `q` is the same `newPort` handler used for the internal `ffz-cs-bridge` port, and it accepts attacker-chosen `ffz_type`/`key`/`value` and broadcasts derived data (`z(...)` → `{ffz_type:"change", key, value}`) to **all** connected ports, including the CS bridge port. So the source is genuinely attacker-reachable (externally_connectable includes `*://*.twitch.tv/*` and `*://*.youtube.com/*` — wildcard subdomains, so an XSS on Twitch or any subdomain suffices).

**(b) Path.** The reported path is real: external page → `onConnectExternal.onMessage` → `j()`/broadcast → CS `t.onMessage.addListener(n => …)` → sin

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
