# ExPAgent Static Verification — phllhfiikbiiamilkammjbcmjhdogkoa v1.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/background/background` [BG_1] @ L334:C14 -> L334:C20
- **Sink**: `CHROME_ACTION_BADGE_OPTIONS` in `src/background/background` [BG_1] @ L323:C2 -> L323:C54
- **Severity evidence**: ['https://aliados.rappi.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The source-level report and raw code corroborate each other. Let me lay out the four-part ledger.

**(a) Source control — confirmed attacker/untrusted at runtime.**
The source is the first argument of `chrome.runtime.onMessageExternal.addListener` (L329–333), the `action` object. This is `EXTERNAL_MESSAGE` provenance. `externally_connectable.matches` limits senders to `https://aliados.rappi.com/*`, which reduces the attack surface but does not eliminate it: any code running on that origin (e.g., XSS, a compromised dependency, or a subdomain/redirect under that path) can call `chrome.runtime.sendMessage(<extId>, ...)`. There is no `sender.id` fixed-ID allowlist — only `sender.url.indexOf(webAppUrlDomain) === -1` (L343), a substring check that is attacker-satisfiable, and it is not browser-authenticated IPC.

**(b) Data path — unbroken.**
L334 `console.log(action)` → L353 `!action` guard → L362 `switch (action.type)` → `case NEW_ORDER_ACTION` (L374) → `newOrder(action.newOrdersTooltip, action.newOrdersTotal, action.orderId, action.partnerId)` (L375–380). Inside `newOrder` (L320–327):
- `action.newOrdersTooltip` → `newOrdersTooltip` → `chrome.action.setTitle({ title: newOrdersTooltip 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
