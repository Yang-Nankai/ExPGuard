# ExPAgent Static Verification — kpiecbcckbofpmkkkdibbllpinceiihk v2.8.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 12  |  Verified: 3
- Coverage: node=0.961, scope=1
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 9, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 12}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/worker` [BG_1] @ L1:C129552 -> L1:C129553
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/worker` [BG_1] @ L1:C1948 -> L1:C1981
- **Severity evidence**: ['https://*.dotvpn.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The source is `chrome.runtime.onMessageExternal.addListener` in the background service worker (`js/worker.js`). Message content (`a.action`, `a.email`, `a.token`, `a.udid`) is entirely controlled by whatever context is permitted to send external messages — here, any page under `https://*.dotvpn.com/*`. No `sender.id` allowlist is checked; only the attacker-supplied `a.action === "auth"` field is tested, which is trivially satisfiable.

### (b) Exact source-to-sink data path
The report's primary evidence plus direct source inspection confirm an unbroken path:

```
chrome.runtime.onMessageExternal.addListener(function(a,o,t){
  return (async()=>{
    "auth"==a.action && (
      e.set("email", a.email),   // tainted value flows as value argument
      e.set("token", a.token),
      await e.get("udid") || e.set("udid", a.udid)
    )
  })(), true
})
```

`e` is a storage wrapper whose `set` method I confirmed at the sink location:

```
set: async function(a, e) {
  try {
    switch(a){ case "bwStat": case "perSiteProxyHosts": case "proxyDomains":
      e = JSON.stringify(Array.from(e.entries()))
    }
    return await chrome.sto

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/worker` [BG_1] @ L1:C129552 -> L1:C129553
- **Sink**: `FETCH_BODY` in `js/worker` [BG_1] @ L1:C121841 -> L1:C122065
- **Bridge**: storage `STORAGE_FLOW[area: local, key: token, sender: js/worker, receiver: js/worker]`
- **Severity evidence**: ['https://*.dotvpn.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: ExPGuard finding #4 (REQUEST_FORGERY)

### Four-part ledger

**(a) Who controls the source?**
Attacker-controlled, subject to the `externally_connectable` surface. The source anchor resolves to `js/worker.js`:

```
chrome.runtime.onMessageExternal.addListener(function(a,o,t){
  return (async()=>{
    "auth"==a.action && (
      e.set("email",a.email),
      e.set("token",a.token),
      await e.get("udid") || e.set("udid",a.udid)
    )
  })(), !0
})
```

This is an `onMessageExternal` listener. There is **no** `sender.id` allowlist, no `sender.origin`/`sender.url` check, and no validation of the message fields. The only gate is `"auth"==a.action`, which is an attacker-satisfiable field check, not a trust boundary. The manifest restricts callers to `https://*.dotvpn.com/*`; that narrows the surface to dotvpn subdomains (and is exploitable via XSS/subdomain control), but does not eliminate attacker control.

**(b) Source-to-sink path**
The tainted message object `a` reaches `a.token`, which is written to `chrome.storage.local`:

```
e.set("token", a.token)
```

The same `js/worker.js` bundle later reads that stored value in `updateUserInfo` and embeds it in an o

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/worker` [BG_1] @ L1:C129552 -> L1:C129553
- **Sink**: `FETCH_BODY` in `popup/js/bridge` [POPUP_1] @ L1:C127267 -> L1:C127491
- **Bridge**: storage `STORAGE_FLOW[area: local, key: token, sender: js/worker, receiver: popup/js/bridge]`
- **Severity evidence**: ['https://*.dotvpn.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me summarize my verification.

## Verification ledger

**(a) Who controls the source?**
`js/worker.js` registers `chrome.runtime.onMessageExternal.addListener(function(a,o,t){ ... "auth"==a.action && (e.set("email",a.email), e.set("token",a.token), ...) ... })`. I confirmed via `read_minified_range` that there is **no `sender.id` / `sender.url` / `sender.origin` guard** — only the attacker-satisfiable `a.action === "auth"` check. The manifest exposes `externally_connectable.matches: ["https://*.dotvpn.com/*"]`, so a page on any dotvpn.com subdomain (or XSS on one) can drive `a.token`. This is untrusted web content; `authenticatedExtensionAllowlist` is null, so no browser-authenticated trust boundary applies.

**(b) Source-to-sink path**
Unbroken cross-context path:
1. `onMessageExternal` in background (`js/worker.js` L1:C129552) → `e.set("token", a.token)` (storage.local write).
2. `STORAGE_FLOW[area: local, key: token, sender: js/worker, receiver: popup/js/bridge]` — the poisoned `token` is read by the popup.
3. `popup/js/bridge.js` `updateUserInfo`: `fetch(await n.get("apiHost")+"/3/user/info", {..., body: JSON.stringify({token: await n.get("

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
