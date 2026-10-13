# ExPAgent Static Verification — pabnknalmhfecdheflmcaehlepmhjlaa v0.7.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L254
- **Sink**: `CHROME_TABS_EXECUTE` in `background.js` [BG_1] @ L219

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of flow #0: WINDOW_MESSAGE_EVENT → chrome.scripting.executeScript

### 1. Source anchor reality

The report names `background.js` L254, but that file does not exist in this unpacked extension. The actual service worker is `worker.js`. The code at the reported location is:

```js
// worker.js L252-257
/* allow external download and store requests */
chrome.runtime.onMessageExternal.addListener((request, sender, response) => {
  if (request.method === 'add-jobs' || request.method === 'store-links') {
    onMessage(request, sender, response);
  }
});
```

So the "source" ExPGuard matched is actually `chrome.runtime.onMessageExternal`, not a `window` `message` event. The harness's `sourceExpectedMarkers` (`message`/`addEventListener`/`onmessage`) are not present — this is an extension-external message listener, and `codeContext` is `request`.

### 2. The bridge does not connect to the sink

The sink is inside the `onMessage` handler:

```js
// worker.js L216-233
else if (request.method === 'collect') {
  chrome.scripting.executeScript({
    target: {
      tabId: request.tabId,
      allFrames: true
    },
    func: () => { ... collect media from DOM ... }
  })...
}
```

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
