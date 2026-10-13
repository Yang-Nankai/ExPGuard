# ExPAgent Static Verification — akjgeilpciajekhdkkomclnkmbapmfld v3.3.0.1000

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.018, scope=0.017
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/options.196cd971` [OPTIONS_1] @ L1:C25541 -> L1:C25542
- **Sink**: `CHROME_SYNC_STORAGE` in `js/options.196cd971` [OPTIONS_1] @ L1:C25684 -> L1:C25743
- **Severity evidence**: ['https://jsctrl.web.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me confirm there is no sender/origin guard in the options handler (already searched: `sender` yields no matches in the options file) and that the stored value is the raw message field.

The minified region confirms the full handler:

```js
chrome.runtime.onMessageExternal.addListener(((e,t,o)=>{
  switch(console.log("onMessage()_option",e.cmd),e.cmd){
    case "hosting":
      o({received:!0}),
      console.info("子画面からメッセージを受信"),
      R.showFuncBtnSetPage=!1,
      console.log(JSON.stringify(e.result.panel)),
      chrome.storage.sync.set({funcBtnLayoutInfo:e.result.panel})   // <-- SINK
  }
}))
```

## Decision ledger

**(a) Who controls the source.** `chrome.runtime.onMessageExternal.addListener` in the options bundle (`js/options.196cd971.js`). The manifest's `externally_connectable` contains **both** `ids` (one extension ID) **and** `matches: ["https://jsctrl.web.app/*","https://educational-search.web.app/*"]`. Under Chrome's rules, `matches` lets *pages on those origins* invoke `chrome.runtime.sendMessage(extensionId, …)`, which fires `onMessageExternal`. So the source is reachable not just by the trusted peer extension but by a page on the listed

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
