# ExPAgent Static Verification — gekgfnbhagbmhfjjmljkagehgckmbili v1.1.3

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=0.121, scope=0.316
- Flow types: {'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `contentScript.bundle` [CS_1] @ L1:C29888 -> L1:C29901
- **Sink**: `FETCH_RESOURCE` in `background.bundle` [BG_1] @ L1:C1223 -> L1:C1244
- **Bridge**: message `runtime.single.sender.message[contentScript.bundle->background.bundle]`
- **Severity evidence**: ['https://*/**']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (attacker-input-network-send)

### 1. Who controls the source
Confirmed. The harness source anchor and raw source show a page-bridge listener in the content script:

```js
window.addEventListener("message",(r=>{
  chrome.storage.local.get("affiliateParams",(t=>{
    if("USER_POST_FLIPKART_DATA"===r.data.action){
      let c=JSON.parse(r.data.payload);
      c.length>0&&(c=c.map((r=>(r.url=e(r.url,t.affiliateParams),{...r,merchant_id:x,merchant_name:T}))),
      chrome.runtime.sendMessage({from:"content script page",action:"POST_DATA",payload:c,isProductPage:r.data.isProductPage}))
    }
  }))
}))
```

The content script runs on `https://*/**` (any HTTPS site), so an arbitrary page can `window.postMessage` a message with `action: "USER_POST_FLIPKART_DATA"` and a JSON-string `payload` array. The `action` field is attacker-chosen and the same-page `window` bridge is attacker-satisfiable (not authentication). Source is genuinely attacker-controlled.

### 2. Source-to-sink path (unbroken)
- Page → content script: `window.postMessage({action:"USER_POST_FLIPKART_DATA", payload: JSON.stringify([...]), isProductPage:true})`.
- Content script pars

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
