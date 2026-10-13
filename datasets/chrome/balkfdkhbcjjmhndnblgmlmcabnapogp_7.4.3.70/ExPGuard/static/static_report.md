# ExPAgent Static Verification — balkfdkhbcjjmhndnblgmlmcabnapogp v7.4.3.70

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L305:C12 -> L305:C13
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L299:C6 -> L301:C8
- **Severity evidence**: ['https://app.wascript.com.br/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #2 (CHROME_ONMESSAGEEXTERNAL_MESSAGE → chrome.tabs.create)

**Harness/anchors:** Source resolved to `background.js:305` inside the `chrome.runtime.onMessageExternal.addListener` registered at `background.js:304` (listener registered by `R()` at `background.js:388` — confirmed reachable, not dead code). Sink resolved to `background.js:299-301`. The harness warning about the source anchor (the marker sits on the `switch (e.action)` line, one line below the `onMessageExternal` registration) is benign — the tainted `e` is the external message parameter.

**Ledger**

- **(a) Who controls the source?** `e` is the message object delivered by `chrome.runtime.onMessageExternal`. `externally_connectable.matches` = 4 web origins (`app.wascript.com.br`, `dev.watools.com.br`, `web.whatsapp.com`, `meta-oficial.wascript.com.br`). The listener performs **no** `sender.id`, `sender.origin`, `sender.url` check anywhere (searched `sender.id|sender.url|sender.origin` → zero hits in `background.js`). Provenance is `EXTERNAL_MESSAGE`; the browser-enforced origin allowlist is a *scope limiter* (attacker needs a page/XSS on one of those origins), not an unforgeable IPC identity like 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
