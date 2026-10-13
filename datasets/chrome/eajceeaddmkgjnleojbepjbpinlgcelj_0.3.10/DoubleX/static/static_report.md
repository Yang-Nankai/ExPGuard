# ExPAgent Static Verification — eajceeaddmkgjnleojbepjbpinlgcelj v0.3.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L504
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L110

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The report labels the source `WINDOW_MESSAGE_EVENT` in `background.js` — but `background.js` is the MV3 service worker and contains **no** `window.addEventListener` (verified: `search_code("addEventListener", "background.js")` → NO MATCHES). The actual untrusted input is the `chrome.runtime.onMessageExternal.addListener` block in `background.js`:

```js
chrome.runtime.onMessageExternal.addListener((e,t,s)=>{
  switch(e.type){
    case S.POST_RESPONSE: {...}
    case S.WEB_APP_SESSION_UPDATED: {ie(e.sessionData).then(...);break}
    case S.WEB_APP_REQUEST_SESSION: {...}
    case S.WEB_APP_REFERRAL_INFO_UPDATED: {ce(e.referralInfo).then(...);break}
  }
})
```

`externally_connectable.matches` is `*://*.chakra.dev/*`, so any page on a `*.chakra.dev` origin can send a direct external message to the background worker. There is **no** `sender.id`/`sender.origin` check — the second parameter `t` (the sender) is never used. The only "guard" is the `e.type` switch, which is an attacker-chosen field. So the source is genuinely web-controllable (XSS on `app.chakra.dev`, or any attacker-controlled `*.chakra.dev` subdomain, satisfies the 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L504
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L124

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The report labels the source `WINDOW...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
