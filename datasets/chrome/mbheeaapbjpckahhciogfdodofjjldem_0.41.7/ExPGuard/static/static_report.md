# ExPAgent Static Verification — mbheeaapbjpckahhciogfdodofjjldem v0.41.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.996, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/index.ts-CRtxQaeF` [BG_1] @ L12:C9643 -> L12:C9644
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `assets/index.ts-CRtxQaeF` [BG_1] @ L12:C9173 -> L12:C9210
- **Severity evidence**: ['*://*.getmoonbounce.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: Moonbounce `teleport` external message → `chrome.tabs.create`

### Four-part decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(Y)`, confirmed in the bundle at the registration site:

```
chrome.runtime.onMessageExternal.addListener(Be);
chrome.runtime.onMessageExternal.addListener(Ge);
chrome.runtime.onMessageExternal.addListener(Y);
```

`Y` is registered **directly** with no `sender.id` allowlist and no `sender.origin`/`sender.url` guard. The manifest `externally_connectable.matches` limits callers to `*.getmoonbounce.com`, `getmoonbounce.com`, and the `moonbounce.gg/.xyz/.social` equivalents — but those use **wildcard subdomains**, so the attack surface is "any page executing on an allowed origin (or any subdomain)". Per the harness rules, specific-host externally_connectable is still exploitable via XSS on the allowed domain, subdomain takeover, or a page on a wildcard subdomain. So the source is attacker-controllable, with an XSS/origin precondition.

**(b) Exact source-to-sink path**
Reading the minified source around the anchors:

```
Y=(e,t,n)=>{
  return (e?.kind)==="teleport"
    && (e?.payl

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
