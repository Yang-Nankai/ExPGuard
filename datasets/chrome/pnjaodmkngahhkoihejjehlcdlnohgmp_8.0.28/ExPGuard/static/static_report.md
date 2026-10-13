# ExPAgent Static Verification — pnjaodmkngahhkoihejjehlcdlnohgmp v8.0.28

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.274, scope=0.243
- Flow types: {'REQUEST_FORGERY': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `feeder_api` [CS_3] @ L1:C4036 -> L1:C4054
- **Sink**: `FETCH_BODY` in `mv3` [BG_1] @ L2:C116749 -> L2:C116870
- **Bridge**: message `runtime.connect.sender.message[feeder_api->mv3]`
- **Severity evidence**: ['http://*.feeder.co/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the report plus the raw minified source I inspected to verify this flow.

## Decision ledger

**(a) Who controls the source — attacker-controllable.**
`feeder_api.js` (content script, `document_start`, matches `http(s)://feeder.co/*` and `*.feeder.co/*` etc.) registers:

```js
window.addEventListener("message", function(n){
  ...
  o = JSON.parse(n.data);
  if ("feeder.co" === o.from && "feeder.co-version1" === o.sanityCheck)
    switch(o.payload.action){ ... case "callApi": ... u.postMessage({type:"api:request", data:o.payload.request}); }
})
```

The only gate before forwarding is `o.from` and `o.sanityCheck` — both fields are supplied *by the page in its own `postMessage` payload*. This is exactly the harness rule: "message action/type fields are attacker-satisfiable in a page-to-content-script bridge." There is no `event.origin`/`sender` check that is unforgeable. Any page on a matching domain (or XSS on feeder.co, or a subdomain via the wildcard match) can trivially craft this message.

**(b) Source-to-sink path — unbroken.**
1. Page `postMessage` → content-script `message` listener (`feeder_api.js` L1 C4036–C4054).
2. `case "callApi"` → content scr

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
