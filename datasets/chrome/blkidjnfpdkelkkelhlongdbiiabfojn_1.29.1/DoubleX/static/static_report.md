# ExPAgent Static Verification — blkidjnfpdkelkkelhlongdbiiabfojn v1.29.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L48
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L125

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification: `background.js` external message → `chrome.tabs.create`

### 1. Source provenance
The reported source `background.js:48` is real code, but it is **not** `WINDOW_MESSAGE_EVENT`; it is inside the `chrome.runtime.onMessageExternal.addListener` block:

```js
47| url = data?.url || "";
48| options = data?.options || {};
```

External messages are reachable by pages on the `externally_connectable` matches (`*.wildberries.ru`, `*.wb.ru`, `*.neuromarket.online`), so the incoming `req`/`data` is genuinely untrusted web input. The source is attacker-controllable.

### 2. Sink reality
The flow claims a sink at `background.js:125`, but the actual file is only 114 lines. Searching the whole extension shows exactly two `chrome.tabs.create` calls in `background.js`:

```js
31| chrome.tabs.create({ url: chrome.runtime.getURL("onboarding.html") });   // constant, install-time
...
100| if (type === "openTab") {
101|   if (typeof url === "string" && url.startsWith("chrome://extensions")) {
102|     chrome.tabs.create({ url })
```

The claimed sink is therefore the `openTab` branch at line 102.

### 3. Data-path / argument check
- The field flagged as tainted at L48 is **`options

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
