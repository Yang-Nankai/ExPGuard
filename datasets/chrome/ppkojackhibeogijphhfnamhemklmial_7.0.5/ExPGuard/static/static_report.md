# ExPAgent Static Verification — ppkojackhibeogijphhfnamhemklmial v7.0.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.595, scope=0.599
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L1:C37119 -> L1:C37120
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L1:C37617 -> L1:C37645
- **Severity evidence**: ['*://*.videoscreenshot.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE → chrome.tabs.create`

### Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>…)`. `e` is the raw message object delivered by an external sender. The manifest `externally_connectable.matches` is `["*://*.videoscreenshot.app/*", "*://localhost/*"]`, so any web page on a matching origin (or a page that achieves script execution on those origins via XSS/subdomain compromise) can call `chrome.runtime.sendMessage(<extId>, …)`. The message payload is fully attacker-controlled. There is **no `sender.id` / `sender.origin` check** in the listener body — the `t` (sender) parameter is never inspected before the sink.

**(b) Exact source-to-sink path**
- `e` (external message) → `switch(e.type)`.
- `case "newTab"` → `chrome.tabs.create(e.object)`.

`e.object` is used verbatim as the `createProperties` argument. This is a direct, unbroken data path with no intermediate message/storage hop.

**(c) Which security-relevant argument is attacker-controlled?**
The entire options object passed to `chrome.tabs.create` — including `url` — is the attacker-supplied `e.objec

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
