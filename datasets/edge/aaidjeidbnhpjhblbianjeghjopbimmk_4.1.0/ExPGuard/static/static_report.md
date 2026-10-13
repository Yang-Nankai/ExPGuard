# ExPAgent Static Verification — aaidjeidbnhpjhblbianjeghjopbimmk v4.1.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 1
- Coverage: node=0.967, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 4, 'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 5}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #4 — 🟡 UNCERTAIN  (STORAGE_POSOING / MEDIUM, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `extras/background` [BG_1] @ L666:C6 -> L666:C9
- **Sink**: `CHROME_SYNC_STORAGE` in `extras/background` [BG_1] @ L725:C12 -> L725:C61
- **Severity evidence**: ['https://scratch.mit.edu/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: I've confirmed the listener and the sink directly from source. Here's my analysis.

## Four-part decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(async function (msg, sender, sendResponse) {...})` at `extras/background.js:661`. `msg` is the external message payload, fully attacker-controlled by any sender the browser permits. `externally_connectable.matches` is `["https://scratch.mit.edu/*"]`, so the message must originate from a `scratch.mit.edu` page (or be relayed through it). No fixed-extension-ID allowlist exists (`authenticatedExtensionAllowlist: null`), and there is **no** `sender.id`/`sender.url`/`sender.origin` check anywhere in the listener. The restriction to `scratch.mit.edu` reduces scope but does not neutralize the attack surface (XSS on that domain can send the message), consistent with the MEDIUM severity.

**(b) Exact source-to-sink path**
Direct data flow, no message/storage bridge hop:
- L661: external message enters listener.
- L723: `if (typeof msg === "object")` — trivially satisfied.
- L724: `if (msg.message === "storageSet")` — an attacker-chosen message field, not a trust anchor; attacker simply sets it.
- L725

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
