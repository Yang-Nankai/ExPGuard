# ExPAgent Static Verification — mjgbhohbanahpldkmnaafjgpoflgnklk v2.0.1.3

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.601, scope=0.665
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `background` [BG_1] @ L2:C265559 -> L2:C265560
- **Sink**: `CHROME_WINDOWS_UPDATE_OPTIONS` in `background` [BG_1] @ L2:C266107 -> L2:C266170
- **Severity evidence**: ['*://*.cloudhq.net/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onConnectExternal.addListener(... e.onMessage.addListener(function(t){...}))` in `background.js` (BG context). The entire message object `t` is supplied by whatever page opens an external port. The manifest restricts `externally_connectable.matches` to `*://*.cloudhq.net/*`, so the attack surface is any page on any `*.cloudhq.net` subdomain (plus XSS on those origins / subdomain takeover). No `sender.id`, `sender.origin`, or `sender.url` check exists anywhere in `background.js` (confirmed by search: no matches). The source is genuinely attacker-controllable under the XSS/subdomain precondition.

**(b) Exact source-to-sink path**
Direct, no cross-context hop:
```
onConnectExternal(port e)
  -> name = e.name; n = o[name]; r = n.gmail_port
  -> if (r) e.onMessage.addListener(function(t) {
       ...
       t && "CHQ_UPDATE_HEIGHT_OF_VIDEO_MANAGER" == t.type && a && t.height
         && chrome.windows.update(a, {height: parseInt(t.height), focused: true})
     })
```
The report evidence (`report.source.md` flow #1) and the minified slice both show the same continuous code. The message field `t.height

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
