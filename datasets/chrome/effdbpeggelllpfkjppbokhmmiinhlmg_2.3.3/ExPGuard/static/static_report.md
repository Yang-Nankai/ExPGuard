# ExPAgent Static Verification — effdbpeggelllpfkjppbokhmmiinhlmg v2.3.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.236, scope=0.216
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `background/service_worker` [BG_1] @ L4:C2200 -> L4:C2201
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `background/service_worker` [BG_1] @ L1:C5164 -> L1:C5250
- **Severity evidence**: ['https://unison.boidu.dev/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source
The source is the `e.onMessage.addListener(a => ...)` callback on a `chrome.runtime.onConnectExternal` port. The port is only reachable from `externally_connectable.matches` = `https://unison.boidu.dev/*` and `https://blrcunison.vercel.app/*`. A page attacker therefore needs code execution (e.g., XSS) on one of those two trusted origins to drive the message. The message fields `a.nonce` / `a.origin` are attacker-chosen, but the listener immediately constrains `a.origin`:

```js
if ("bl-auth-site" !== e.name) return void e.disconnect();      // fixed port name
let t = e.sender?.origin;                                       // browser-supplied
if (void 0 === (u.find(x => x.origin === t))) return void e.disconnect(); // fixed allowlist
...
if (!(a && "object" == typeof a && a.type === s && "string" == typeof a.nonce
      && a.nonce.length >= 16 && "string" == typeof a.origin && a.origin.length > 0)) { ... INVALID_REQUEST }
if (t !== a.origin) { ... ORIGIN_MISMATCH }                     // a.origin must equal sender origin
```

So `a.origin` is forced to equal the browser-supplied sender origin, which must itself be in the fixe

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
