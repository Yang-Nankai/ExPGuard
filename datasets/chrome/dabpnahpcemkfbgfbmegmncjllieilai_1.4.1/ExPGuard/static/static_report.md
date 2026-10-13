# ExPAgent Static Verification — dabpnahpcemkfbgfbmegmncjllieilai v1.4.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.015, scope=0.017
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C4774 -> L1:C4775
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L1:C3928 -> L1:C4086
- **Severity evidence**: ['*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
An external message delivered to `chrome.runtime.onMessageExternal.addListener(function(e,t,r){return i(e,r)})` (background.js L1:C4774). The listener ignores the browser-supplied `sender` (`t`) entirely and dispatches on the attacker-controlled message object `e`. The manifest has `externally_connectable.ids: ["*"]` (any extension can connect) plus `matches` for `play.pokemonshowdown.com`, `*.psim.us`, and `play.radicalred.net` (web pages/XSS on those origins can connect). So the message is genuinely attacker-controllable — no sender.id allowlist, no origin guard.

**(b) Exact source-to-sink path**
`onMessageExternal` → `i(e, r)` → dispatcher `var i=function(t,n){switch(null==t?void 0:t.type){case"fetch":...` → when `t.type === "fetch"` and `t.url` is truthy, it executes the compiled async wrapper that performs `fetch(t.url, u(o({method:e.GET}, t.options), {headers:{Accept:"application/json", ...t.options.headers}}))`. I confirmed this in the raw minified source (L1 C3550–4700): the dispatcher and the fetch are the same function chain, not dead code.

**(c) Which security-relevant argument is attacker-controlled?**
The URL (

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
