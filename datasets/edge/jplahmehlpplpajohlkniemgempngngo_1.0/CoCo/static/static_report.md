# ExPAgent Static Verification — jplahmehlpplpajohlkniemgempngngo v1.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=0, scope=0
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `content.js` [UNKNOWN] @ L15:C1 -> L15:C1
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `content.js` [UNKNOWN] @ L17:C1 -> L17:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 4, 'omitted': 0}, 'propagation': 'event.target | event.target.src'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — Double-click image download

### (a) Who controls the source
The source is `event.target.src` inside a `dblclick` listener registered by the content script on `<all_urls>`. `event.target` is the DOM element the user double-clicks; the page fully controls every `<img>` element's `src` attribute. This is genuine untrusted web content, not a browser-derived or literal value.

### (b) Source-to-sink path (verified in raw source)
- **content.js L15–18**:
  ```js
  document.addEventListener('dblclick', (event) => {
    if (isExtensionEnabled && event.target.tagName.toLowerCase() === 'img') {
      const imageUrl = event.target.src;
      chrome.runtime.sendMessage({ action: 'downloadImage', imageUrl });
    }
  });
  ```
- **background.js L7–20**:
  ```js
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'downloadImage') {
      ...
      const imageUrl = message.imageUrl;
      const filename = imageUrl.split('/').pop().split('?')[0];
      chrome.downloads.download({
        url: imageUrl,
        filename: filename,
        saveAs: false
      });
    }
  });
  ```
The bridge connects exactly: the fixed 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
