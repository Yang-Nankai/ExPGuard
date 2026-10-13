# ExPAgent Static Verification — lkijhlbancniebghpfjcfakajaejgppn v1.0.4

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1211
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1245

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Summary

**Flow:** `WINDOW_MESSAGE_EVENT` (background.js L1211) → `chrome.storage.local.set` (L1245), `STORAGE_POSOING`, same frame `BG_1`, no cross-boundary hop.

I inspected the actual bundle (`background/chrome.js`) and its inlined `ExtPay.js` library source (the root `ExtPay.js` matches the source map `sourcesContent`).

### The real source/sink code

The only `window` message listener in the background bundle is the ExtPay content-script bridge:

```js
typeof window < "u" && window.addEventListener("message", event => {
    event.origin === "https://extensionpay.com" &&
    event.source == window &&
    (event.data === "extpay-fetch-user" || event.data === "extpay-trial-start") &&
    (window.postMessage(`${event.data}-received`),
     browserPolyfill.runtime.sendMessage(event.data))
}, false);
```

And the corresponding background handler:

```js
browserPolyfill.runtime.onMessage.addListener(function(message, sender, send_response) {
    if (message == "extpay-fetch-user") poll_user_paid();
    else if (message == "extpay-trial-start") fetch_user();
    ...
});
```

### Four-part decision ledger

1. **Who controls the source?** The `message` event data is atta

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
