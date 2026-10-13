# ExPAgent Static Verification — ojhgpcbnancefdjglmdgaheaiicllfgg v1.4.16

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 1
- Coverage: node=0.081, scope=0.067
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 4}  |  Severities: {'CRITICAL': 5}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/pages/background/index` [BG_1] @ L1:C5934 -> L1:C5935
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/pages/background/index` [BG_1] @ L1:C6236 -> L1:C6291
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The evidence confirms the chain end-to-end. Let me reason through the four-part ledger.

**1. Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((e,o,t)=>{ const {data:n}=e, {message:r}=n; ... })`. `e` is an external message payload from a web page. Manifest `externally_connectable.matches` is `["http://*/*","https://*/*","<all_urls>"]`, so *any* web origin can reach this listener (given the extension ID). Source is genuinely attacker-controlled.

**2. Is the source-to-sink path unbroken?**
Yes. For `r === "redirect" && n.redirect_url`, the code destructures `const {appId:s, connectionId:c, redirect_url:b}=n` from the attacker message body, then runs:

```js
setTimeout(()=>{
  s && !c && chrome.storage.local.set({appId:s, view:"connect-view"}),
  c && chrome.storage.local.set({connectionId:c, view:"connect-view"}),
  ...
})
```

The tainted span `s` (attacker-supplied `appId`) flows directly into `chrome.storage.local.set({appId:s,...})`. No sanitization or schema validation is applied.

**3. Which security-relevant argument is attacker-controlled?**
The stored `appId` value (and, in the same branch, `connectionId`, plus elsewhere `teamId`, `accessToken`) is a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
