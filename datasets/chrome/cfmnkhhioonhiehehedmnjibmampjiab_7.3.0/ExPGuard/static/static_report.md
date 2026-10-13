# ExPAgent Static Verification — cfmnkhhioonhiehehedmnjibmampjiab v7.3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.443, scope=0.5
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L7576:C10 -> L7576:C17
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L7580:C8 -> L7583:C10
- **Severity evidence**: ['*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Four-part decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(function (request, sender, respond) { switch (request.message) ... })` at `js/background.js:7575`. `request` is the message object supplied by an external sender. The manifest sets `externally_connectable.ids = ["*"]`, so *any installed extension* can send this message. The `matches` list (`*://localhost/*`, `*://*.start.me/*`, `*://*.startme.com/*`) additionally permits web pages on those origins (exploitable via XSS there). There is no fixed-`sender.id` allowlist and no origin check inside the listener. Therefore the message fields, including `request.url`, are attacker-controlled.

**(b) Exact source-to-sink path**
`request` (attacker message) → `switch (request.message)` → `case SM_MESSAGE_OPEN_URL` (`'openUrl'`, confirmed at line 7003) → `if (request.openInNewWindow)` → `chrome.tabs.create({ url: request.url, active: !!request.active })`. The tainted `request.url` is passed directly as the `url` option of `chrome.tabs.create`. There is no intervening assignment that overwrites it with a constant or validated value.

**(c) Which security-relevant argument i

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
