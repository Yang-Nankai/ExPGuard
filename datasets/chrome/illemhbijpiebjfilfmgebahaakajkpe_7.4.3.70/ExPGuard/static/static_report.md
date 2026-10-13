# ExPAgent Static Verification — illemhbijpiebjfilfmgebahaakajkpe v7.4.3.70

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L305:C12 -> L305:C13
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L299:C6 -> L301:C8
- **Severity evidence**: ['https://app.wascript.com.br/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `chrome.tabs.create`

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener(async (e, t, a) => ...)` at `background.js:304-305`. The listener is reachable from any origin in `externally_connectable.matches`:
- `https://app.wascript.com.br/*`
- `https://dev.watools.com.br/*`
- `https://web.whatsapp.com/*`
- `https://meta-oficial.wascript.com.br/*`

Any page served from those origins (or any script running there, e.g. via XSS on the allowed host) can call `chrome.runtime.sendMessage(<extensionId>, {...})` and fully control the `e` object, including `e.action`, `e.bearer`, and `e.bearer_token`. The restriction to specific hosts reduces reachability but does not eliminate attacker control (the harness explicitly flags this). There is **no `sender.id` allowlist and no `sender.origin`/`sender.url` check** — only the manifest match set.

### (b) Source-to-sink path
Read from the actual source (`background.js:290-320`):

```
f = (e) => {
  chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, (t) => {
    if (t && t.length > 0) {
      const r = `https://web.whatsapp.com/?bearer_token

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
