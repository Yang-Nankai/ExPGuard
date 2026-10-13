# ExPAgent Static Verification — iemilfmlaliblejogfofhmjbfiaiegnd v3.9.8.843

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.367, scope=0.371
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'LOW': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `js/content/autosave` [CS_3] @ L5:C5 -> L5:C41
- **Sink**: `CHROME_SYNC_STORAGE` in `js/background` [BG_1] @ L14:C3 -> L16:C5
- **Bridge**: message `runtime.single.sender.message[js/content/autosave->js/background]`
- **Severity evidence**: ['*://gitzip.org/gettoken/success']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — STORAGE_POSOING (ELEMENT_TEXT_CONTENT → CHROME_SYNC_STORAGE)

### 1. Source is attacker/untrusted-controllable?

**Yes, under the harness threat model.** The source is `document.querySelector('p.token-cache').textContent` in `js/content/autosave.js` L4–L5. Provenance is `CONTENT_SCRIPT` (ISOLATED world), which per the given rules is treated as web taint. The content script runs only on `*://gitzip.org/gettoken/success`.

I inspected the real source:

```js
function save(){
    if(document.readyState === "complete"){
        var tokencache = document.querySelector('p.token-cache');
        if(tokencache && tokencache.textContent){
            chrome.runtime.sendMessage({action: "setKey", value: tokencache.textContent}, function(response){});
        }
    }
}
```

This is a real page-DOM read, not a constant or browser-derived value. The match restriction to `gitzip.org/gettoken/success` narrows the attack surface (hence LOW severity) but does not eliminate it: the match is `*://` (includes plain-HTTP, where a network attacker can inject the DOM), and an XSS on `gitzip.org/gettoken/success` would let a page-side attacker control `p.token-cache`. So the s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
