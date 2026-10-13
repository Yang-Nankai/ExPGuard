# ExPAgent Static Verification — mdanidgdpmkimeiiojknlnekblgmpdll v1.9.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_MANAGEMENT_INFO` in `background.js` [BG_1] @ L179
- **Sink**: `WINDOW_POSTMESSAGE` in `content_scripts.js` [BG_1] @ L459

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source**
`chrome.management.getAll` in `background.js` returns the browser's list of installed extensions — sensitive, extension-authority data. It is not directly web-controlled; it fires only when the background receives a `"list_extensions"` runtime message, which the content script sends only when the page URL contains `b4g_troubleshoot=1` (`b4g.js:305-307`).

**(b) The actual source-to-sink path**
The real path for the management data is:
1. `background.js:186` — `chrome.management.getAll(...)`
2. `background.js:188` — `chrome.tabs.sendMessage(tabs[0].id, {greeting: "extensions", extensions: extensions})`
3. `b4g.js:308-325` — the *conditional* content-script listener for `greeting == "extensions"` writes the list to `localStorage.setItem("b4g_extensions", ...)`.

That path terminates at `localStorage`. It **does not** reach any `window.postMessage`.

The reported sink, `b4g.js:268` (`window.postMessage({ type: "B4G_RESPONDABLE_OUTPUT", metrics: request.metrics }, "*")`), lives in a *different, always-registered* `chrome.runtime.onMessage` listener (`b4g.js:264-278`) that only handles `"respondable_output"` and `"get_ga_cid"`. Its

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
