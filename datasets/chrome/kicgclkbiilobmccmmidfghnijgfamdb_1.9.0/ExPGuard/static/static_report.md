# ExPAgent Static Verification — kicgclkbiilobmccmmidfghnijgfamdb v1.9.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 11  |  Verified: 5
- Coverage: node=0.181, scope=0.337
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 9, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 1, 'UNKNOWN': 10}

**Assessment:** Verified 5 flow(s): 0 true-positive, 3 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 5 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/kodepay-script` [CS_1] @ L1:C5120 -> L1:C5121
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L12:C50991 -> L12:C51110
- **Bridge**: message `runtime.single.sender.message[js/kodepay-script->js/background]`
- **Severity evidence**: ['https://kodepay.io/*']
- **Source report Flow ID**: `7`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 90, 'distinctLines': 1, 'crossContextHops': ['runtime.single.sender.message[js/kodepay-script->js/background]'], 'sinkUrlControl': []}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `NAVIGATOR_LANGUAGE` in `js/content-script` [CS_2] @ L12:C38514 -> L12:C38575
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/content-script` [CS_2] @ L12:C38520 -> L12:C38575
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: This flow is straightforward to verify from the injected evidence, so I don't need extra raw-source reads.

## Decision ledger

**(a) Who controls the source?**
The source is `navigator.language`, classified as `NAVIGATOR_LANGUAGE`. This is a browser/OS-derived, read-only property reflecting the user's locale preference (Accept-Language / browser UI language). It is **not** attacker-controlled:

- A webpage cannot set or override the content-script's `navigator.language`. The content script runs in an **ISOLATED** world (manifest confirms `world: ISOLATED`), so the page's own JavaScript object tampering cannot reach the content script's `navigator`.
- `navigator.language` is not a DOM value, not a message field, not a URL, not a storage read, and not a network response. There is no page-supplied data flowing here.

**(b) Source-to-sink path**
Single direct step in the report:
`navigator.language` → `chrome.storage.local.set({language: navigator.language})`
No message hop, no storage hop (`crossBoundary.storagePassing: false`, `crossContextHops: []`). The value written is literally the browser-provided language string.

**(c) Security-relevant argument**
The stored value is `navigat

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #2 — 🟡 UNCERTAIN  (STORAGE_POSOING / UNKNOWN, confidence 0.00)

- **Source**: `NAVIGATOR_PLATFORM` in `js/content-script` [CS_2] @ L12:C38452 -> L12:C38513
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/content-script` [CS_2] @ L12:C38458 -> L12:C38513
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #3 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `NAVIGATOR_USER_AGENT` in `js/content-script` [CS_2] @ L12:C36664 -> L12:C36695
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/content-script` [CS_2] @ L12:C38582 -> L12:C38639
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 7, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (STORAGE_POSOING)

### (a) Who controls the source?
The reported source is `navigator.userAgent` in `js/content-script`, an **ISOLATED-world content script** (manifest `world: null` = default isolated; harness confirms `world: ISOLATED`). `navigator.userAgent` is browser/extension-environment data, not page-controlled DOM or message data. A webpage running in `*://*.instagram.com/*` cannot mutate the isolated content-script world's `navigator.userAgent`; it is set by the browser. This is `SYSTEM_INFO`, not `ATTACKER_INPUT` / `WEB_CONTENT` / `NETWORK_RESPONSE`.

### (b) Source-to-sink path
The report shows a direct, single-context propagation (no messagePassing/storagePassing hop):

`navigator.userAgent` → (parse in `m()`) → `chrome.storage.local.set({browserType:t})` and, on the same line, `chrome.storage.local.set({userAgent:navigator.userAgent})`.

The sink anchor confirmed by source inspection:

```js
m();
await chrome.storage.local.set({browserType:t}),
await chrome.storage.local.set({platform:navigator.platform}),
await chrome.storage.local.set({language:navigator.language}),
await chrome.storage.local.set({userAgent:navigator.userAgent})
```

So the

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #4 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `NAVIGATOR_LANGUAGE` in `js/background` [BG_1] @ L12:C41035 -> L12:C41096
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/background` [BG_1] @ L12:C41041 -> L12:C41096
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `4`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification: Flow #4 (NAVIGATOR_LANGUAGE → chrome.storage.local)

### 1. Source controllability

**Source:** `navigator.language` at `js/background.js` L12 C41035–41096.

`navigator.language` is a **browser-derived, read-only value** reflecting the browser/user locale preference. It is:

- Not set by web page script (a page cannot assign `navigator.language` to spoof it — the property is read-only and derived from browser settings/Accept-Language).
- Not a `WINDOW_MESSAGE_EVENT`, `EXTERNAL_MESSAGE`, DOM value, cookie, or network response.
- ExPGuard itself classifies this source capability as `SYSTEM_INFO` (`NAVIGATOR_LANGUAGE`), not `ATTACKER_INPUT` or `WEB_CONTENT`.

The harness sink rule is explicit here: the tainted argument must not be "replaced by a literal **or browser-derived value**." In this flow the stored value *is* a browser-derived value, so the security-relevant precondition (attacker-controlled data reaching the storage argument) fails.

### 2. Path integrity

The path is a single background-context statement:

```js
await chrome.storage.local.set({language: navigator.language})
```

There are **no** message hops, no storage hops, no content-script bridge, 

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
