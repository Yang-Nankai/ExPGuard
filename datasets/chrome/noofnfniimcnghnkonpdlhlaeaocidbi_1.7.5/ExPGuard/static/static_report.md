# ExPAgent Static Verification — noofnfniimcnghnkonpdlhlaeaocidbi v1.7.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.481, scope=0.605
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-scripts/content` [CS_1] @ L376:C4085 -> L376:C4099
- **Sink**: `CHROME_LOCAL_STORAGE` in `content-scripts/content` [CS_1] @ L376:C6181 -> L376:C6219
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide this flow. Let me record the ledger and verdict.

## Decision ledger

**(a) Who controls the source?**
The source is `window.addEventListener("message", i => { if(!i.data?.action) return; ... })` in `content-scripts/content.js`. The content script runs at `document_start`, `allFrames: true`, on `<all_urls>`. A page in the main world can call `window.postMessage(...)` and the isolated-world content script receives that `message` event — this is the standard page↔content-script bridge. The only guard before the switch is `if(!i.data?.action) return`, which the attacker trivially satisfies by supplying an `action`. There is **no** `i.origin` / `i.source` / sender check. So the source is fully attacker-controllable on any site.

**(b) Source-to-sink path**
From the decoded minified handler:

```
switch(l){
  ...
  case "dt-web-login":
    const h = i.data.user;
    if(h && typeof h.vipExpiryTimestamp < "u") {
      const p = Math.floor(Date.now()/1e3);
      h.isPro = h.vipExpiryTimestamp > 0 && h.vipExpiryTimestamp > p;
    } else h.isPro = !1;
    chrome.storage.local.set({userInfo:h}).then(...);
    break;
  ...
}
```

`i.data.user` (attacker message

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — DUPLICATE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-scripts/content` [CS_1] @ L376:C4085 -> L376:C4099
- **Sink**: `CHROME_LOCAL_STORAGE` in `content-scripts/content` [CS_1] @ L376:C6624 -> L376:C6662
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide this flow. Let me record the ledger and verdict.

## Decisio...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
