# ExPAgent Static Verification — aopfgjfeiimeioiajeknfidlljpoebgc v9.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- **Not reviewed due to analysis budget:** 1 flow(s): [2]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 3}  |  Severities: {'UNKNOWN': 3}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L3237
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L14
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the full source. The reported file names (`content_scripts.js` / `background.js`) don't resolve, but the actual files are `js/contentscript.js` and `js/erailchrome.js`, and they contain exactly the flow described.

## Decision ledger

**(a) Who controls the source?**
The source is `window.addEventListener("message", ...)` in the content script (`js/contentscript.js:1`). The page on which the content script runs can call `window.postMessage(...)` and fully control `event.data`. There is no origin check on the message; the only gate is `plugdata.Action != undefined`, which is an attacker-chosen field. Manifest `content_scripts.matches` is `http://*/*` / `https://*/*` with `allFrames: true`, so any site can drive it.

**(b) Exact source-to-sink path**
`js/contentscript.js:1`:
```js
window.addEventListener("message", function(a) {
  void 0 != a.data && (plugdata = a.data,
    void 0 != plugdata.Action && (... ,
      chrome.runtime.sendMessage(plugdata, function(a) {})))
});
```
The whole attacker-controlled `plugdata` is forwarded via `chrome.runtime.sendMessage`.

`js/erailchrome.js:2`:
```js
chrome.runtime.onMessage.addListener(function(a,b,c){
  ...
  switch(a.Action){
    .

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L3237
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L21
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have the full source. The reported file names (`content_scripts.js` / `background.js`) don'...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
