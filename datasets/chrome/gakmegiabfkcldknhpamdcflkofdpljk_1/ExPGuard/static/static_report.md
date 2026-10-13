# ExPAgent Static Verification — gakmegiabfkcldknhpamdcflkofdpljk v1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L104:C13 -> L104:C20
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `js/background` [BG_1] @ L129:C12 -> L132:C14
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I verified the flow against the primary evidence and the raw source. Both agree.

## Four-part decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => { listener(request, ...); return true; })` (js/background.js L103-106). The manifest declares no `externally_connectable`, so — as the harness notes — any installed external extension can connect by default and fully controls the `request` object (including `event`, `url`, `query`, `account`, `status`). There is no `sender.id` check and no sender allowlist anywhere in the listener, so the sender set is unbounded (not the fixed companion-ID "trusted IPC" case).

**(b) Source-to-sink path**
`listener(request, ...)` → `switch(request.event)` → `case EVENTS.OPEN_NEW_WINDOW` (`'open_new_window'`, confirmed at js/background.js L20) → `chrome.windows.create({ url: request.url, state: 'maximized' })` (L129-132). The propagation report traces `request.url` (L130) directly into the `windows.create` options object. No hop is needed — the source and sink are in the same function/context.

**(c) Which security-relevant argument is attacker-controlled?**
The `url` pro

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
