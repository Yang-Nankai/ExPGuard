# ExPAgent Static Verification — gijhmcgnnbcpigflkfoimbnfjnbcphah v6.1.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.887, scope=0.928
- Flow types: {'REQUEST_FORGERY': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L3:C61468 -> L3:C61469
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L3:C58181 -> L3:C58273
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `5`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the full chain by reading the actual manifest and the minified background source. Here is my verification.

## Decision ledger

**(a) Who controls the source?**
An ordinary webpage controls the message. The manifest's `externally_connectable` block contains:
```json
"matches": ["<all_urls>"]
```
so any http/https page can call `chrome.runtime.sendMessage(EXTENSION_ID, ...)`. The `ids` list only enumerates allowed *extensions*; it does not restrict web pages when `matches` is `<all_urls>`. The listener registers `chrome.runtime.onMessageExternal.addListener((t,e,r)=>{...})` and never inspects `e.sender` / `e.id` / `e.origin`. The only gate is `t.type === "night-eye-create-support-message"`, which is an attacker-chosen field.

**(b) Source-to-sink data path (confirmed in background.js)**
- `t.payload` (attacker message payload) is passed to `J.sendExternalSupportMessage(e, cb)`.
- `sendExternalSupportMessage` calls `q.sendExternalMessage(SUPPORT_MESSAGE_SYSTEM_ID, i.id, i.email, i.name, instanceId, e, cb)` — the last-but-one argument is the attacker payload.
- `sendExternalMessage` constructs `new Y(...)` and calls `o.sendMessage(payload)`.
- `sendMessage(t)` builds a 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
