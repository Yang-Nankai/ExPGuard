# ExPAgent Static Verification — eipdnjedkpcnlmmdfdkgfpljanehloah v10.4.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.984, scope=1
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `sw` [BG_1] @ L13:C30614 -> L13:C30615
- **Sink**: `FETCH_BODY` in `sw` [BG_1] @ L8:C588 -> L8:C602
- **Severity evidence**: ['https://*.boomerangapi.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the verification ledger.

## (a) Who controls the source

The source is `chrome.runtime.onMessageExternal.addListener((d, p, w) => ...)` in `sw.js` (background service worker). The message object `d` is supplied by any page/extension permitted by `externally_connectable.matches`:

- `*://localhost/*`
- `https://*.boomerangapi.com/*`
- `https://*.curlite.rest/*`

There is **no `sender.id` check and no origin check inside the listener** — the only trust boundary is the browser-enforced `externally_connectable` list plus the attacker-chosen `d.actionName` branch value. Both `d.actionName` and `d.actionInput` are fully message-supplied.

## (b) Exact source-to-sink path

Confirmed in the minified source:

```js
chrome.runtime.onMessageExternal.addListener((d,p,w)=>{
  const E={messageId:d.messageId,messageType:"RESPONSE",actionOutput:null};
  return d ? d.actionName==="XHR_SEND"
    ? Ht(d.actionInput).then(N=>{E.actionOutput=N,w(E)}).catch(...)
    : ... , true
});
```

And `Ht` is:

```js
async function Ht(d){
  ...
  const U=d.method||"GET";
  ...
  const _={method:U, headers:E, body:N, credentials:"include", signal:w};
  const y=awai

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
