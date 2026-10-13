# ExPAgent Static Verification — mbchdidopjakdkjkekaogajhcdekciop v1.4.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.119, scope=0.096
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service-worker` [BG_1] @ L1:C830144 -> L1:C830145
- **Sink**: `FETCH_RESOURCE` in `service-worker` [BG_1] @ L1:C446363 -> L1:C446389
- **Severity evidence**: ['*://qa.bookbeam.io/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've now inspected enough of the service worker to reach a grounded decision.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(this.handleExternalMessage.bind(this))` (confirmed at ~L1 C826700). The message object `t` is attacker-controllable from any origin in `externally_connectable` (`*://qa.bookbeam.io/*`, `*://app.bookbeam.io/*`, and the Amazon/Audible domains). There is **no** fixed `sender.id` allowlist (`authenticatedExtensionAllowlist: null`). So the *source* is genuinely untrusted in principle. However, an untrusted source alone does not make the flagged sink real.

**(b) Exact source→sink path?**
The propagation evidence is **not a concrete path**. It is a single minified line with a `⟨tainted span: 428049 chars⟩` covering columns ~402096–830144 — i.e., the taint engine painted roughly half the bundle (the HTTP client class `Vf` at C446363, dozens of service/repository classes, the locator, and the message handler at C830144) as one contiguous taint blob. The listed operators are generic (`ASSIGN:identifier`, `ELEMENT:member-element`, `RETURN:template-literal`, …), and there is no function-level chain from `handleExterna

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
