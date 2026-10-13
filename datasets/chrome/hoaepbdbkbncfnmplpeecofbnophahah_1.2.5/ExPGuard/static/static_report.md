# ExPAgent Static Verification — hoaepbdbkbncfnmplpeecofbnophahah v1.2.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 2
- Coverage: node=0.013, scope=0.031
- Flow types: {'STORAGE_POSOING': 1, 'REQUEST_FORGERY': 2}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 2 flow(s): 1 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/zendrop-aliexpress-importer` [CS_1] @ L6:C8 -> L6:C23
- **Sink**: `FETCH_BODY` in `js/background` [BG_1] @ L37:C12 -> L43:C14
- **Bridge**: message `runtime.single.sender.message[js/zendrop-aliexpress-importer->js/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `WINDOW_MESSAGE_EVENT` → `FETCH_BODY` (REQUEST_FORGERY)

### Decision ledger

**(a) Who controls the source?**
A webpage matching `<all_urls>` can `window.postMessage` into the content script's window. The content script's `event.source != window` check is satisfied by the page's own postMessage (attacker-satisfiable, not authentication). So the source is genuinely attacker-controllable.

**(b) Source-to-sink path**
Content script `js/zendrop-aliexpress-importer.js`:

```js
window.addEventListener("message", function(event) {
    if (event.source != window) return;
    if (event.data.type && ["LOGIN_TO_EXTENSION", "LOGOUT_TO_EXTENSION"].includes(event.data.type)) {
        chrome.runtime.sendMessage(event.data);
    }
});
```

The content script forwards `event.data` **only when `type` is `LOGIN_TO_EXTENSION` or `LOGOUT_TO_EXTENSION`**. It never forwards `PRODUCT_DETAIL`.

Background `js/background.js`:

```js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'LOGIN_TO_EXTENSION') {
        chrome.storage.local.set({'email': message.email}, ...)
    } else if (message.type === 'LOGOUT_TO_EXTENSION') {
   

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/zendrop-aliexpress-importer` [CS_1] @ L73:C0 -> L83:C2
- **Sink**: `FETCH_BODY` in `js/background` [BG_1] @ L37:C12 -> L43:C14
- **Bridge**: message `runtime.single.sender.message[js/zendrop-aliexpress-importer->js/background]`, storage `STORAGE_FLOW[area: local, key: email, sender: js/background, receiver: js/background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the flow against the actual extension source. Here is my analysis.

## Four-part decision ledger

**(a) Who controls the source?**
Attacker/untrusted page content. Two page-influenced paths converge on the fetch body:

1. **Email (via window message + storage):** `js/zendrop-aliexpress-importer.js` (content script, `<all_urls>`) does:
   ```js
   window.addEventListener("message", function(event) {
       if (event.source != window) return;
       if (event.data.type && ["LOGIN_TO_EXTENSION", "LOGOUT_TO_EXTENSION"].includes(event.data.type)) {
           chrome.runtime.sendMessage(event.data);
       }
   }, false);
   ```
   `event.source == window` is trivially satisfiable by the page's own `window.postMessage`, so any page can send `{type:'LOGIN_TO_EXTENSION', email:<arbitrary>}`. The background stores it with no validation (`js/background.js` L74-77).

2. **productData/url (page DOM):** `js/aliexpress.js` `extractDOMAndSend()` scrapes `document.scripts` for `window.runParams` and uses `document.location.href`, then sends `PRODUCT_DETAIL`. The page fully controls that DOM.

**(b) Exact source-to-sink path**
- Email path: page `postMessage` → content script `runtime

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
