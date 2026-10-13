# ExPAgent Static Verification — empfolmdjakdffahnikgmlblkabaiklc v1.0.9

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 16  |  Verified: 4
- Coverage: node=0.154, scope=0.213
- Flow types: {'PRIVILEGE_ESCALATION': 10, 'REQUEST_FORGERY': 3, 'STORAGE_POSOING': 1, 'CODE_INJECTION': 2}  |  Severities: {'CRITICAL': 16}

**Assessment:** Verified 4 flow(s): 0 true-positive, 2 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/content-script` [CS_1] @ L253:C19 -> L253:C30
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L553:C8 -> L559:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2: `contentScriptExecuteScriptEndFromPage` → `chrome.tabs.create`

### Decision ledger

**(a) Who controls the source?**
The page. The content script registers
`document.addEventListener('contentScriptExecuteScriptEndFromPage', ...)` at `js/content-script.js:252`, and it only runs when `params.executeScript` is truthy (which the page can influence via its own URL query string). A page can dispatch a `CustomEvent` with arbitrary `detail.waitTime` and `detail.data`, and set `detail.actionSource === 'page'` to pass the guard at L254. So the *source* itself is genuinely attacker-controllable.

**(b) Exact source→sink path.**
The listener builds:

```js
var executeScriptDataPrefix = {
  action: params.action,
  actionId: decodeURIComponent(params.actionId),
  actionSource: 'contentScriptExecuteScriptEnd',   // hardcoded
};
chrome.runtime.sendMessage(Object.assign({}, executeScriptDataPrefix, {
  waitTime: detail.waitTime,
  actionData: detail.data ? JSON.stringify(detail.data) : ''
}));
```

That message goes to *every* `chrome.runtime.onMessage` listener in `js/background.js`. The relevant dispatcher is the one at `js/background.js:499`, which contains the `get

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #8 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/content-script` [CS_1] @ L253:C19 -> L253:C30
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `js/background` [BG_1] @ L807:C12 -> L882:C14
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #8

### (a) Who controls the source

The source anchor resolves to `js/content-script.js:253`:

```js
document.addEventListener('contentScriptExecuteScriptEndFromPage', async function(data) {
  var detail = data.detail || {};      // ← tainted span
  if (detail.actionSource !== 'page') return;
  ...
  chrome.runtime.sendMessage(Object.assign({}, executeScriptDataPrefix, {
    waitTime: detail.waitTime,
    actionData: detail.data ? JSON.stringify(detail.data) : ''
  }));
});
```

The page can dispatch this `CustomEvent` because the content script runs at `document_start` on `<all_urls>`. However, the only page-controlled values carried into the runtime message are **`detail.waitTime`** and **`detail.data`**. The message's `action`, `actionId`, and — critically — `actionSource` are not taken from `detail`:

```js
var executeScriptDataPrefix = {
  action: params.action,            // from URL params, not the event
  actionId: decodeURIComponent(params.actionId),
  actionSource: 'contentScriptExecuteScriptEnd',   // hard-coded
};
```

### (b) Exact source-to-sink path

The outbound message (`actionSource === 'contentScriptExecuteScriptEnd'`) is handled by the b

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #12 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.00)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/content-script` [CS_1] @ L253:C19 -> L253:C30
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L899:C22 -> L931:C17
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #7 — 🟡 UNCERTAIN  (CODE_INJECTION / CRITICAL, confidence 0.30)

- **Source**: `TARGET_CUSTOM_EVENT` in `js/content-script` [CS_1] @ L253:C19 -> L253:C30
- **Sink**: `EVAL` in `js/background` [BG_1] @ L722:C24 -> L725:C26
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: I have enough evidence to decide. Here is my analysis.

## Four-part decision ledger

**(a) Who controls the source?**
The source is `TARGET_CUSTOM_EVENT` `contentScriptExecuteScriptEndFromPage` in `js/content-script.js` L252–266. The page can forge this event:
```js
document.dispatchEvent(new CustomEvent('contentScriptExecuteScriptEndFromPage',
  { detail: { actionSource: 'page', waitTime: 0, data: {...} } }));
```
The `detail` is attacker-controllable (a `CustomEvent` is fully forgeable by the page; the `detail.actionSource !== 'page'` check is attacker-satisfiable). This part is genuinely untrusted. Note the listener only exists when `params.executeScript` is truthy (URL contains `executeScript=1`).

**(b) Exact source-to-sink path**
The listener at L262–265 sends:
```js
chrome.runtime.sendMessage(Object.assign({}, executeScriptDataPrefix, {
  waitTime: detail.waitTime,
  actionData: detail.data ? JSON.stringify(detail.data) : ''
}));
```
with `actionSource: 'contentScriptExecuteScriptEnd'`.

In `js/background.js`, this message is consumed by the **first** `onMessage` listener (L462–474), which only accepts `actionSource === 'getLocalStorage'` or `'contentScriptExecuteScriptEnd'

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
