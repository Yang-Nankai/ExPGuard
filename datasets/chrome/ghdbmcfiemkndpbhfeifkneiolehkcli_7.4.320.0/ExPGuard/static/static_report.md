# ExPAgent Static Verification — ghdbmcfiemkndpbhfeifkneiolehkcli v7.4.320.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.962, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 11, 'REQUEST_FORGERY': 2, 'STORAGE_POSOING': 6}  |  Severities: {'CRITICAL': 11, 'UNKNOWN': 8}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `csNativeMessage` [CS_1] @ L55:C0 -> L63:C6
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `bsWindowManagement` [BG_1] @ L283:C8 -> L286:C10
- **Bridge**: message `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
- **Severity evidence**: ['*://*/*SynapseSignOn/sts/login*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Who controls the source
The true attacker source is the page-side `windowManagerEventEx` CustomEvent listener in **csWindowManagement.js** (L18–57), not the `csNativeMessage` anchor the normalized flow cited (the harness warning about a source-anchor mismatch is correct — the real bridge is in `csWindowManagement.js`).

```js
document.addEventListener("windowManagerEventEx", function (evt) {
    const request = evt?.detail?.request;
    if (!request) return;
    request.listenerId = evt?.detail?.id;
    request.isWindowManagement = true;
    chrome.runtime.sendMessage(request) ...
```

There is **no origin check, no `event.source` check, and no field validation**. Any script running on a page where the content script is injected can dispatch a `CustomEvent` with an arbitrary `detail.request` object. The content-script match list is host-wildcarded (`*://*/*SynapseSignOn/sts/login*`, `*://*/WorkflowUI*`, etc.), so an attacker can host their own matching URL (e.g. `https://evil.example/WorkflowUI/x`) and fully control the page context.

### 2. Source-to-sink path
- Page → `document.dispatchEvent(new CustomEvent('windowManagerEventEx', {detail:{request

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `csNativeMessage` [CS_1] @ L55:C0 -> L63:C6
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `bsWindowManagement` [BG_1] @ L242:C12 -> L250:C14
- **Bridge**: message `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
- **Severity evidence**: ['*://*/*SynapseSignOn/sts/login*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #6 (ExPGuard report id #5)

### 1) Who controls the source

The effective source is not the mislabeled `csNativeMessage` snippet; the harness warning is correct. The actual page→extension bridge is in **`csWindowManagement.js` L18–57**:

```js
document.addEventListener("windowManagerEventEx", function (evt) {
    const request = evt?.detail?.request;
    if (!request) return;
    request.listenerId = evt?.detail?.id;
    request.isWindowManagement = true;
    chrome.runtime.sendMessage(request) ...
});
```

The content script runs in an **ISOLATED** world, but `document.dispatchEvent(new CustomEvent(...))` is a shared DOM channel: any page script on a matched origin can dispatch `windowManagerEventEx` with a `detail.request` object, and this listener receives it. There is no origin/source check. `request.isWindowManagement` is force-set by the content script, so it is not a trust boundary. The source is fully page-controlled.

The manifest content-script match `*://*/*SynapseSignOn/sts/login*` (and the other path patterns with wildcard scheme/host) means an attacker can host `https://evil.example/SynapseSignOn/sts/login` (or `/ImageViewer`, etc.) and drive t

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `csNativeMessage` [CS_1] @ L55:C0 -> L63:C6
- **Sink**: `FETCH_RESOURCE` in `bsWindowManagement` [BG_1] @ L550:C31 -> L557:C14
- **Bridge**: message `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
- **Severity evidence**: ['*://*/*SynapseSignOn/sts/login*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me lay out the four-part ledger.

## (a) Who controls the source?

The real source is **not** the `csNativeMessage` anchor in the summary (that anchor is a mislabeled `nativeHostDisconnect` handler — the harness warning is correct). The actual page-to-extension bridge is in `csWindowManagement.js`:

```js
document.addEventListener(
    "windowManagerEventEx",
    function (evt) {
        const request = evt?.detail?.request;
        if (!request) return;
        request.listenerId = evt?.detail?.id;
        request.isWindowManagement = true;
        try {
            chrome.runtime.sendMessage(request)
                .then(...)
```

The listener runs in the content script's isolated world but receives `CustomEvent`s dispatched from the page (main world). The page fully controls `evt.detail.request`, including every field (`type`, `pollingUrl`, `pollingInterval`, `pollingAuthorization`, `pollingContentType`, etc.). The content script adds `isWindowManagement = true` and forwards the object verbatim. There is no origin/source/field validation in this listener. Content-script matches include `*://*/*PowerJacket*`, `*://*/*WebQueryAPI*`, etc., so an attacke

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `csNativeMessage` [CS_1] @ L55:C0 -> L63:C6
- **Sink**: `FETCH_HEADERS` in `bsWindowManagement` [BG_1] @ L550:C31 -> L557:C14
- **Bridge**: message `runtime.single.sender.message[csWindowManagement->bsWindowManagement]`
- **Severity evidence**: ['*://*/*SynapseSignOn/sts/login*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Here is my verification.

## (a) Who controls the source

The real page→content-script bridge is in `csWindowManagement.js`:

```js
document.addEventListener("windowManagerEventEx", function (evt) {
    const request = evt?.detail?.request;
    if (!request) return;
    request.listenerId = evt?.detail?.id;
    request.isWindowManagement = true;
    chrome.runtime.sendMessage(request) ...
});
```

There is **no** sender/origin/allow-list authentication. A page that matches the content-script patterns can dispatch `new CustomEvent('windowManagerEventEx', {detail:{id, request:{...}}})`, and the content script forwards the whole attacker-supplied `request` object to the background via `runtime.sendMessage`. The manifest match `*://*/ImageViewer*`, `*://*/WorkflowUI*`, `*://*/*PowerJacket*`, etc. means the attacker can simply host `https://attacker.example/ImageViewer` — no trusted-site XSS is required. Source is genuinely attacker-controllable.

## (b) Source-to-sink path

Confirmed via the primary propagation plus raw source:

1. Page dispatches `windowManagerEventEx` (`csWindowManagement.js:18-27`).
2. Content script `chrome.runtime.sendMessage(requ

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
