# ExPAgent Static Verification — nnkgneoiohoecpdiaponcejilbhhikei v3.2.10

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.036, scope=0.036
- Flow types: {'CODE_INJECTION': 2, 'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content.bundle` [CS_1] @ L3:C1809 -> L3:C1810
- **Sink**: `FETCH_BODY` in `background.bundle` [BG_1] @ L1:C16322 -> L1:C16427
- **Bridge**: message `runtime.connect.sender.message[content.bundle->background.bundle]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5 — REQUEST_FORGERY (`attacker-input-network-send`)

### (a) Who controls the source?
A webpage controls it. The content script runs on `<all_urls>` (excluding Google) and its `message` listener is:

```js
function b(e){
  if(!x()||!e||e.source!==window||typeof e.data!="object")return;
  let t=e.data;
  if(t.source===I){ ... P(F,t) }
}
window.addEventListener("message",b,!1);
```

The bridge constants are hardcoded in `content.bundle.js`: `c="@devtools-extension"`, `I="@devtools-page"`. So the only "authentication" is `t.source==="@devtools-page"`, which any page script can forge with:

```js
window.postMessage({source:"@devtools-page", type:"GET_REPORT", payload:"evil", instanceId:"x"}, "*");
```

This is fully attacker-satisfiable (`e.source===window` is the page's own postMessage). Source is untrusted. ✔

### (b) Exact source-to-sink path (confirmed in source)
1. Page → `content.bundle.js` window listener.
2. Content script `F()` forwards `E({name:"RELAY", message:e})` over the tab port to the background.
3. Background `Re()` tab-port handler: `o.name==="RELAY" && ce(o.message, e.sender)`.
4. `ce()`: `if(e.type==="GET_REPORT"){ ve(e.payload, n, e.instanc

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
