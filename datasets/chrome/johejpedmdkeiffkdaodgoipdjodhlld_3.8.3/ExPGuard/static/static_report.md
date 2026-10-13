# ExPAgent Static Verification — johejpedmdkeiffkdaodgoipdjodhlld v3.8.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.235, scope=0.358
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.bundle` [BG_1] @ L1746:C1818 -> L1746:C1819
- **Sink**: `FETCH_BODY` in `background.bundle` [BG_1] @ L510:C420 -> L510:C525
- **Severity evidence**: ['https://*.chessvision.ai/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 38, 'distinctLines': 4, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (attacker token → fetch body)

### (a) Who controls the source
The source is the `e.token` field of an `chrome.runtime.onMessageExternal` message. I confirmed the exact listener code in `background.bundle.js`:

```js
Wn.runtime.onMessageExternal.addListener((function(e,t,r){
  if("sign_in"===e.action){var n=e.token;ar(ni,n).then(...)}
  ...
  return !0
}))
```

- `e.action` and `e.token` are both attacker-chosen message fields.
- The listener **never uses `t` (the sender)** — no `sender.id` allowlist, no `sender.origin`/`sender.url` check.
- The only boundary is the manifest `externally_connectable.matches: ["https://*.chessvision.ai/*"]`. This is a scope reduction, not an unforgeable boundary: XSS on `chessvision.ai` or any of its subdomains satisfies it. Per the harness, that keeps the source genuinely attacker-controllable (with an XSS prerequisite on a listed origin).

### (b) Exact source-to-sink data path (unbroken)
1. `L1746` — `e.token` is copied to `n` and passed to `ar(ni, n)`.
2. `ar` (`signInWithCustomToken` implementation) builds `{token: t, returnSecureToken: true}` and calls `st(e, "POST", "/v1/accounts:signInWithCustomTok

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
