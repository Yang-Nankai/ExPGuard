# ExPAgent Static Verification — balkfdkhbcjjmhndnblgmlmcabnapogp v7.4.3.70

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L401
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L391

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the reported flow

### Decision ledger

**(a) Who controls the source?**
The normalized record claims `WINDOW_MESSAGE_EVENT` at `background.js:401`. Reading the real source, `background.js` is a Manifest V3 service worker and contains **no `window.addEventListener`, `window.onmessage`, or `window.postMessage`** — every `postMessage` in the file is a `chrome.runtime.Port.postMessage`. So the source *type* is already inconsistent with the file.

Line 401 is:

```js
case "FLOW":
  i("fluxo");        // L401
  break;
```

inside the `chrome.runtime.onMessage.addListener` handler. The message object `e` is used only as a **branch selector** (`switch (e.message)`); the value passed to `i(...)` is the hard-coded literal `"fluxo"`. No attacker-controlled field reaches `i`.

**(b) Source-to-sink path?**
`i()` (lines 73–80) computes a URL from the constant:

```js
const a = t ? e : chrome.runtime.getURL(e + "/src/index.html");
...
chrome.tabs.create({ url: a });   // L78 — not tabs.update
```

The result is the fixed extension URL `chrome.runtime.getURL("fluxo/src/index.html")`. There is no data flow from any untrusted value to the URL; the only reachable privileged call i

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L401
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L396

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of the reported flow

### Decision ledger

**(a) Who controls the source?**
T...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
