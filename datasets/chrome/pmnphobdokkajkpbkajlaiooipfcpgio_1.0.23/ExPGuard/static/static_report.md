# ExPAgent Static Verification — pmnphobdokkajkpbkajlaiooipfcpgio v1.0.23

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.485, scope=0.555
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'CRITICAL': 1, 'UNKNOWN': 1}

**Assessment:** Verified 2 flow(s): 1 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `src/js/contentScript` [CS_1] @ L1:C3206 -> L1:C3283
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/js/contentScript` [CS_1] @ L1:C693 -> L1:C740
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 8, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have confirmed the full chain. Here is my verification.

## Verification

**Source — attacker-controlled?** Yes. The source is `document.title`, read in the content script (`src/js/contentScript.js`), which runs at `document_start` on `<all_urls>`, all frames. `document.title` is page DOM state; any webpage can set it before the extension reads it. It is not browser-derived, not a literal, and there is no sanitizer (`reportEvidence.sanitized: false`).

**Path — is it unbroken?** Yes. The source anchor:

```
await s.images.set({dataUrl:a,title:document.title,id:Date.now().toString()})
```

I confirmed the helper mapping in the real source:

```
s={service:r,images:l}
l={set:async e=>{const t=await l.get();await chrome.storage.local.set({[i.Images]:[...t,e]})},...}
```

So `s.images.set(...)` is exactly `l.set(...)`, which persists the passed object (`e`) — including `title: document.title` — into `chrome.storage.local` under the `i.Images` key. The tainted field is stored verbatim.

**Sink — privileged operation with tainted argument?** Yes. `chrome.storage.local.set` is extension-authority storage. A webpage cannot write to the extension's `chrome.storage.local` directly, so this

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_TABS_CAPUTURE_VISIBLE_TAB` in `src/js/serviceWorker` [BG_1] @ L1:C570 -> L1:C571
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/js/serviceWorker` [BG_1] @ L1:C573 -> L1:C609
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 3, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've inspected the actual source and confirmed the full context of the flagged flow. Here is my verification.

## Four-part decision ledger

**(a) Who controls the source?**
The reported source is the callback parameter `a` of `chrome.tabs.captureVisibleTab(...)`, i.e., the screenshot data URL produced by the browser's tab-capture engine:

```js
h = e => {
  chrome.tabs.query({active:!0}, ([{windowId:a, id:t}]) => {
    chrome.tabs.captureVisibleTab(a, {format:"jpeg",quality:100}, (a => {
      chrome.storage.local.get("tmpImg", (r => {
        const s = r.tmpImg ?? [];
        s.push(a);                       // <-- tainted span »a«
        chrome.storage.local.set({tmpImg:s})   // <-- sink
          .then(() => n.sendMessage(t??0, {action:i.CheckIsScreenshotDone, data:{...e, verticalAnchor:e.verticalAnchor+1}}))
      }))
    }))
  }))
}
```

This is a **browser-generated value**, not attacker/untrusted input. It is not `ATTACKER_INPUT`, `WEB_CONTENT`, `NETWORK_RESPONSE`, `STORAGE_DATA`, or any web-surface source; it is the return value of a privileged `chrome.tabs.captureVisibleTab` call the background itself makes. A visible page can at most influence *pixels* of the captured s

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
