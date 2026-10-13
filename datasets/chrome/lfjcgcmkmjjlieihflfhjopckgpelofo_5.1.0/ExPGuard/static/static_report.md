# ExPAgent Static Verification — lfjcgcmkmjjlieihflfhjopckgpelofo v5.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.56, scope=0.6
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `src/gas-hub` [CS_1] @ L274:C21 -> L274:C53
- **Sink**: `CHROME_SYNC_STORAGE` in `src/gas-hub` [CS_1] @ L278:C6 -> L280:C8
- **Severity evidence**: ['https://script.google.com/*']
- **Source report Flow ID**: `19`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #19 (JQUERY_ELEMENT_VAL → CHROME_SYNC_STORAGE)

### (a) Who controls the source?
The source is `$('#ignore-pattern').val()` at `src/gas-hub.js:274`. The `#ignore-pattern` element is defined in `content/modal.html:129`, which is injected into the page DOM by the content script (listed as a web-accessible resource for `https://script.google.com/*`). Content scripts and the page share the DOM, so a script running on `script.google.com` can set this input's value directly (e.g., `document.getElementById('ignore-pattern').value = '...'`). The harness confirms: a page can mutate shared DOM values. **The source is genuinely page-controllable.**

### (b) Source-to-sink path
Read from the real source:

```js
270  $(document).on('click', '#save-config', () => {
271    const config = {
272      filetype: $('#selected-suffix').text(),
273      manifestEnabled: $('#manage-manifest').prop("checked"),
274      ignorePattern: $('#ignore-pattern').val().split(';').filter(p => p !== '')
275    }
276    context.bindConfig[getId()] = config;
277    try {
278      chrome.storage.sync.set({
279        bindConfig: context.bindConfig
280      });
```

The tainted `ignorePattern` va

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
