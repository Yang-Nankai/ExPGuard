# ExPAgent Static Verification — {57081fef-67b4-482f-bcb0-69296e63ec4f} v0.3.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.997, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (REQUEST_FORGERY / CRITICAL, confidence 0.30)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L433:C28 -> L433:C35
- **Sink**: `WEBSOCKET_DATA` in `background` [BG_1] @ L402:C4 -> L402:C73
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: I've confirmed the full path in the actual source. Here is my analysis.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener` (background.js L431) receives the `request` object. The manifest has no `externally_connectable` (null), so any installed external extension can reach this listener via `chrome.runtime.sendMessage(<this-extension-id>, ...)`; the only dispatch gates are `typeof request.mode !== 'undefined'` and `switch(request.action)` with `case "party"` — both chosen by the sender. There is no `sender.id` allowlist. The `clientId` field is fully attacker-controlled.

**(b) Exact source-to-sink path (confirmed in source):**
- L469–L474: `case "party":` → `partyListener[request.clientId] = { clientId: request.clientId, extId: sender.id }` — attacker's `clientId` is stored (as both object key and value).
- L475: `updatePartyListener()` is called.
- L400: `var listener = Object.values(partyListener);`
- L401: `if(listener.length) {`
- L402: `websocket.send(JSON.stringify({action: 'party', listener: listener}));`

This matches the propagation report exactly. The bridge connects: the listener is registered at the top level of the bac

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
