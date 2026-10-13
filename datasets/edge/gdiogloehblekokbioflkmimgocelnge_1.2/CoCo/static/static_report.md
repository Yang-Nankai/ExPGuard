# ExPAgent Static Verification — gdiogloehblekokbioflkmimgocelnge v1.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `crx_headers/expguard_compat_header.js` [UNKNOWN] @ L41:C1 -> L41:C1
- **Sink**: `CHROME_SESSION_STORAGE` in `crx_headers/expguard_compat_header.js` [UNKNOWN] @ L41:C1 -> L41:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'WEB_CONTENT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 2, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (DOCUMENT_TITLE → CHROME_SESSION_STORAGE)

### Evidence reconciliation
The reported source/sink file `crx_headers/expguard_compat_header.js` is an ExPGuard compatibility-header placeholder (`document.title = 'title'`), not the real extension code. The harness confirms it "could not be resolved in the unpacked CRX." I therefore inspected the actual extension files (`js/content.js`, `js/background.js`) and found the real, equivalent chain:

**`js/content.js:4`** (content script, `document_end`, all frames, matches `http://*/*` + `https://*/*`):
```js
if (document.documentElement.outerHTML.match(/<(img|link|script) [^>]+wp-content/i) &&
    document.documentElement.outerHTML.match(/<(img|link|script) [^>]+wp-includes/i)) {
    chrome.runtime.sendMessage({action: 'prepare', siteUrl: location.href,
                                siteHtml: document.documentElement.outerHTML,
                                siteTitle: document.title});
}
```

**`js/background.js:27-33`**:
```js
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    switch (msg.action) {
        case 'prepare':
            chrome.storage.session.set({[sender.tab.id]: msg

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
