# ExPAgent Static Verification — canbadmphamemnmdfngmcabnjmjgaiki v1.5.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.988, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'LOW': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `ELEMENT_VALUE` in `gcpd730` [CS_4] @ L3:C56 -> L3:C68
- **Sink**: `CHROME_SYNC_STORAGE` in `gcpd730` [CS_4] @ L5:C4 -> L19:C6
- **Severity evidence**: ['*://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitive']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (`ELEMENT_VALUE` → `chrome.storage.sync.set`)

### 1. Which source/sink is actually being flagged

There are two overlapping records in the normalized evidence:

- The **normalized JSON** points at `gcpd730`/`gcpd730.js` with a sink near `chrome.storage.sync.set({ showcommunitybans: true })` and a source anchor the harness resolved to `L3 C56-68: let profileURI = null;`. That is a **constant-to-constant** pair and cannot be a tainted flow.
- The **primary evidence (report.source.md)** is clearly the real flow: `options.js` L2–L5, where `customapikey` is read from `document.getElementById('customapikey').value` and then written with `chrome.storage.sync.set({ customapikey: customapikey }, ...)`.

I verified the actual `options.js` source:

```js
1  function saveOptions() {
2    var customapikey = document.getElementById('customapikey').value;
3    if (document.getElementById('radioCustom').checked && customapikey != '') {
5      chrome.storage.sync.set({ customapikey: customapikey }, function () { ... });
...
95  if (
96    document.location.protocol != 'http:' &&
97    document.location.protocol != 'https:'
98  ) {
99    document.addEventListener('DOMCont

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
