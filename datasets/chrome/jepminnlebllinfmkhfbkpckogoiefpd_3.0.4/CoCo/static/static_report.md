# ExPAgent Static Verification — jepminnlebllinfmkhfbkpckogoiefpd v3.0.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content.js` [UNKNOWN] @ L4:C1 -> L4:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `content.js` [UNKNOWN] @ L4:C1 -> L4:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 't.violatedDirective'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `WINDOW_CUSTOM_EVENT` — a `securitypolicyviolation` listener in `content.js` (runs in ISOLATED world on `<all_urls>`). The tainted field `t.violatedDirective` is the `SecurityPolicyViolationEvent.violatedDirective` string, which is derived from the *page's own Content Security Policy*. A page an attacker serves can set its CSP (HTTP header or `<meta http-equiv="Content-Security-Policy">`) and then load a blocked resource, so the attacker selects which directive is violated (e.g., `script-src-elem`, `img-src`). The companion `blockedURI` is also attacker-chosen (the blocked resource URL). This is genuine page-controlled attacker input, not a browser-derived constant.

**(b) Exact source-to-sink path**
The report's propagation is collapsed to one step (`t.violatedDirective`), and the reported sink location `content.js L4` is imprecise — `content.js` itself performs no storage write. I confirmed the real cross-boundary chain in source:

1. `content.js L4` — `securitypolicyviolation` handler builds `details:{violatedDirective: t.violatedDirective, blockedURI: new URL(t.blockedURI).host}` and calls `chrome.runtime.se

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
