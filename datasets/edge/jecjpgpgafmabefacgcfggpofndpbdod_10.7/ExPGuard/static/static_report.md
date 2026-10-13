# ExPAgent Static Verification — jecjpgpgafmabefacgcfggpofndpbdod v10.7

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.896, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `SW_JS_ID` [BG_1] @ L5:C314 -> L5:C315
- **Sink**: `CHROME_MANAGEMENT_SETENABLED_ID` in `SW_JS_ID` [BG_1] @ L6:C35 -> L6:C44
- **Severity evidence**: ['https://www.hotcleaner.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have confirmed the raw code. Here is my verification.

## Four-part decision ledger

**(a) Source — who controls it?**
`f.onMessageExternal.addListener((a,d,b)=>{...})` in the MV3 service worker (`SW_JS_ID.js` L5). The message object `a` (fields `a.i`, `a.r`) is attacker-controlled by any externally-connectable sender. The manifest `externally_connectable` is:
- `ids`: `dacknjoogbepndbemlmljdobinliojbk`, `ghgabhipcejejjmhhchfonmamedcbeod`
- `matches`: `https://www.hotcleaner.com/*`

The listener performs **no `sender.id` / `sender.origin` check**. The web-surface match (`hotcleaner.com`) therefore means a page on that origin (or XSS on it) can drive this listener directly. This is the exploitable route; the fixed extension IDs are merely an additional trusted-peer path.

**(b) Source-to-sink data path — unbroken?**
Yes. Reading the actual minified code:

```
const { ..., management:{get:u=c, getAll:v=c, setEnabled:p=c} } = chrome;
...
f.onMessageExternal.addListener((a,d,b)=>{ "function"===typeof b && (
   34===a?.i ? v().then(b).catch(b)
   : 55===a?.i ? (...)
   : 89===a?.i ? b(h)
   : a?.r?.match(/[a-z]{32}/) ?
        (144===a?.i ? u(a.r).then(b).catch(b)
         : 233===a?.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
