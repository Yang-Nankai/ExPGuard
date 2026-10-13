# ExPAgent Static Verification — apcnhnfabpjbhehcnlebhdpidhmdhlon v2.0.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.715, scope=0.684
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `contentScript` [CS_1] @ L1:C68872 -> L1:C68880
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L1:C115897 -> L1:C115905
- **Bridge**: message `runtime.single.sender.message[contentScript->background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

**(a) Who controls the source — attacker-controlled.**
The content script registers a DOM listener on `document` for a *page-dispatchable* custom event:
```js
document.addEventListener("emailActivation", e =>
  function(e=!1,t=null,n=null){ chrome.runtime.sendMessage({type:"startEmailActivation",updateUser:e,oldUserId:t,email:n}) }
  (e.detail.updateUser, e.detail.oldUserId, e.detail.email))
```
No `event.origin`/`source` check, no structure validation, no sender/type gate. Any script in the page's main world can `document.dispatchEvent(new CustomEvent('emailActivation',{detail:{...}}))` — confirmed by the harness (`PAGE_TO_CONTENT_SCRIPT`; "a page can forge … CustomEvent fields"). The listener is registered on all `http://*/*` / `https://*/*` pages (`contentScriptSurface.matches`), so the attack surface is arbitrary origins. `e.detail.oldUserId` is forwarded verbatim into the runtime message.

**(b) Source→sink path — unbroken, with one message hop.**
`e.detail.oldUserId` → `chrome.runtime.sendMessage({type:"startEmailActivation", oldUserId: …})` → background `chrome.runtime.onMessage.addListener((async(t,e,r)=>…` → `switch(t.type){ case "startEmailActivation": … 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
