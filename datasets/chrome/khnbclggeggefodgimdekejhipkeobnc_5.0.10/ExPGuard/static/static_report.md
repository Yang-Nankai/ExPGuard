# ExPAgent Static Verification — khnbclggeggefodgimdekejhipkeobnc v5.0.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.527, scope=0.477
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/background-DncCHPoW` [BG_1] @ L1:C14038 -> L1:C14039
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `assets/background-DncCHPoW` [BG_1] @ L1:C14253 -> L1:C14301
- **Severity evidence**: ['https://*.lemlist.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The source is the message payload `e` delivered to `chrome.runtime.onMessageExternal.addListener((e,t,n)=>{...})`. This listener is reachable only from `externally_connectable.matches`:
- `https://*.lemlist.com/*`
- `http://localhost:8000/*`
- `http://dev.lemlist.com:8000/*`

That is a *web-origin* surface (not an extension-ID IPC surface). A web attacker who can execute script on any allowed origin can control `e.command` and `e.url`. The `sender.id` fixed-extension-ID trust boundary is **not** used.

### (b) Exact source-to-sink path
Minified code extracted from `assets/background-DncCHPoW.js`:

```js
st = e => {
  if(!e) return !1;
  try {
    const {hostname:t, protocol:n} = new URL(e);
    return n!=="https:"&&n!=="http:" ? !1
      : t==="app.lemlist.com"
      || t==="staging.lemlist.com"
      || t.endsWith(".lemlist.com")
      || t==="localhost"
      || t==="dev.lemlist.com";
  } catch { return !1; }
};

chrome.runtime.onMessageExternal.addListener((e,t,n)=>{
  if(!st(t.origin??t.url)) return n({ok:!1,error:"unauthorized origin"}),!1;
  if(e?.command==="openTab" && typeof e.url=="string"){
    let r;
    try { r 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
