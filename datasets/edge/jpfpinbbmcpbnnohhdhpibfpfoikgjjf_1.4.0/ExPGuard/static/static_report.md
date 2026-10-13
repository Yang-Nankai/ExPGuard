# ExPAgent Static Verification — jpfpinbbmcpbnnohhdhpibfpfoikgjjf v1.4.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.988, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'LOW': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `ELEMENT_VALUE` in `gcpd730` [CS_4] @ L3:C56 -> L3:C68
- **Sink**: `CHROME_SYNC_STORAGE` in `gcpd730` [CS_4] @ L5:C4 -> L16:C6
- **Severity evidence**: ['*://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitive']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source control (attacker-controlled?)
The true source is in **options.js**, not the mislabeled `gcpd730` loc in the normalized record:

```js
// options.js L2-5
var customapikey = document.getElementById('customapikey').value;
if (document.getElementById('radioCustom').checked && customapikey != '') {
  chrome.storage.sync.set({ customapikey: customapikey }, ...);
```

The normalized flow's `gcpd730 L3:C56` anchor is a misattribution (the harness warns: *"The exact source anchor does not contain the expected source API/token"*). The injected `report.source.md` correctly points at `options L3` → `options L5` `chrome.storage.sync.set`.

`options.js` is shipped as a content script, and on the gcpd frames it does **not** stay dead. `gcpd730.js`'s `showSettings()` fetches `options.html`, injects it into the live `steamcommunity.com` page via `innerHTML`, and then calls `initOptions()`:

```js
// gcpd730.js L642-653
fetch(chrome.runtime.getURL('/options.html'))
  .then(resp => resp.text())
  .then(settingsHTML => {
    settingsDiv.innerHTML = settingsHTML;
    document.body.appendChild(settingsDiv);
    ...
    initOptions();   // binds: #save.addEventLis

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
