# ExPAgent Static Verification — okpndnhlmanejgfjlkpmgnebmeehakik v1.78.58

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `setup.js` [UNKNOWN] @ L74:C1 -> L74:C1
- **Sink**: `CHROME_SYNC_STORAGE` in `setup.js` [UNKNOWN] @ L76:C1 -> L76:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'payload.detail'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — STORAGE_POSOING via `window` custom event → `chrome.storage.sync.set`

### 1. Who controls the source?

The source is a `WINDOW_CUSTOM_EVENT` listener registered by the content script (`setup.js`). The raw code confirms:

```js
for (let event of events) {
  window.addEventListener(event, (payload) => {
    chrome.storage.sync.set({
      [event]: payload.detail[event],
    });
  });
}
```

`setup.js` runs as an **ISOLATED-world content script** on `https://*.netflix.com/*` and `https://*.disneyplus.com/*`. The `window` event target is the shared DOM window; a page (or any script running in the page's main world on those hosts, e.g. via XSS) can dispatch `window.dispatchEvent(new CustomEvent('...', {detail: {...}}))`, and the isolated-world listener receives it. The event name is chosen from the fixed list `events` (lines 44–51): `isExtensionEnabled`, `speedRate`, `setCaptions`, `toggleCaption`, `isUserLoggedIn`, `isShowSupported` — all publicly visible constants in the shipped code. The page fully controls both the event name and `payload.detail[event]`. **Attacker-controllable: confirmed.**

### 2. Source-to-sink path

There is no cross-context message/s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
