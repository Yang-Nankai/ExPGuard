# ExPAgent Static Verification — bjkibipmicfkjnjmjpifhdbkcdjinncp v6.6.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.992, scope=1
- Flow types: {'STORAGE_POSOING': 3, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 4 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `assets/content` [CS_1] @ L2:C38 -> L2:C50
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C6292 -> L1:C6336
- **Bridge**: message `runtime.single.sender.message[assets/content->background]`
- **Severity evidence**: ['https://plus-max-speed.ru/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (TARGET_CUSTOM_EVENT → CHROME_LOCAL_STORAGE)

### Deterministic evidence confirmed against source

**Source (assets/content.js, L1–L4)** — confirmed verbatim:
```js
document.addEventListener("updateDataExtensionPopup", (event) => {
    chrome.runtime.sendMessage({data: event.detail}).then(r => {})
});
```
A raw DOM `CustomEvent` dispatched on `document`. The content script forwards `event.detail` **verbatim** — no shape/type/schema check, no origin check is even possible for custom events. Any script running in the page context of `https://plus-max-speed.ru/*` (the site's own JS, a compromised third-party script, or XSS) can forge the payload with `document.dispatchEvent(new CustomEvent("updateDataExtensionPopup", {detail:{action:"updateData", payment:"creating", date:…}}))`.

**Bridge** — `runtime.single.sender.message[assets/content -> background]`, confirmed by the sendMessage call and the receiving `chrome.runtime.onMessage.addListener`.

**Sink (background.js L1, C~6292–6336)** — confirmed via minified read:
```js
chrome.runtime.onMessage.addListener((e,t,o)=>{
  return "https://plus-max-speed.wip"!==t.origin && "https://plus-max-speed.ru"!==t.origin


**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `assets/content` [CS_1] @ L7:C38 -> L7:C50
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C6292 -> L1:C6336
- **Bridge**: message `runtime.single.sender.message[assets/content->background]`
- **Severity evidence**: ['https://plus-max-speed.ru/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Analysis

**Ledger**

**(a) Who controls the source?** The flow's source is in the content script `assets/content.js` (matches `https://plus-max-speed.ru/*`). Lines 1–9 register `document.addEventListener("updateDataExtensionPopup"/"openExtensionPopup", …)` and forward `event.detail` via `chrome.runtime.sendMessage({data: event.detail})`. These are DOM `CustomEvent`s on `document`; the page's own JS (or any script executing on that origin) can dispatch them with an arbitrary `detail`. The harness confirms reachability kind `PAGE_TO_CONTENT_SCRIPT` and warns that forged `CustomEvent` fields are not authentication. → **Page-controlled.**

**(b) The path.** Page dispatches `CustomEvent('updateDataExtensionPopup', {detail})` → CS listener → `chrome.runtime.sendMessage({data: detail})` [`runtime.single.sender.message[assets/content->background]`] → background `onMessage` listener. Unbroken; no hop mismatch (the report's HOP is the CS→BG message bridge).

**(c) Attacker-controlled argument at the sink.** In `background.js` L1 (~C6120–6480, minified):
```js
chrome.runtime.onMessage.addListener((function(e,t,o){
  return "https://plus-max-speed.wip"!==t.origin && "https://plus-max-speed

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `assets/content` [CS_1] @ L7:C38 -> L7:C50
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C6376 -> L1:C6437
- **Bridge**: message `runtime.single.sender.message[assets/content->background]`
- **Severity evidence**: ['https://plus-max-speed.ru/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

**Source anchor (confirmed).** `assets/content.js` L1–9:
```js
document.addEventListener("updateDataExtensionPopup", (event) => { chrome.runtime.sendMessage({data: event.detail}) ... });
document.addEventListener("openExtensionPopup",     (event) => { chrome.runtime.sendMessage({data: event.detail}) ... });
```
These are `document`-level `CustomEvent` listeners. Any script running on the matched page (`https://plus-max-speed.ru/*`, per manifest `content_scripts`) can `document.dispatchEvent(new CustomEvent('openExtensionPopup', {detail: {...}}))` and fully control `event.detail`. The tainted value is forwarded unmodified as `{data: event.detail}` over `runtime.sendMessage` → background. Harness `sourceReachability = PAGE_TO_CONTENT_SCRIPT`, provenance `CONTENT_SCRIPT` — corroborated.

**Bridge (confirmed).** `runtime.single.sender.message[assets/content->background]`; background receives it as `e` (message) with `e.data` = attacker detail. The HOP connects: action gate `"updateData"===e.data.action` and `"creating"===e.data.payment` are attacker-chosen message fields, not trust anchors.

**Sink (confirmed).** `background.js` L1 C6120–6520:
```js
chrome.runtime.onMe

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `assets/content` [CS_1] @ L1:C6120 -> L1:C6480
- **Sink**: `FETCH_BODY` in `popup` [POPUP_1] @ L1:C6067 -> L1:C6233
- **Bridge**: message `runtime.single.sender.message[assets/content->background]`, storage `STORAGE_FLOW[area: local, key: debugInfo, sender: background, receiver: popup]`
- **Severity evidence**: ['https://plus-max-speed.ru/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me consolidate the four-part ledger.

**(a) Who controls the source?** The real source is the page-to-content-script bridge in `assets/content.js`:

```js
document.addEventListener("updateDataExtensionPopup", (event) => {
    chrome.runtime.sendMessage({data: event.detail}).then(r => {})
});
document.addEventListener("openExtensionPopup", (event) => {
    chrome.runtime.sendMessage({data: event.detail}).then(r => {})
});
```

The content script runs on `https://plus-max-speed.ru/*` (manifest `content_scripts`), and it blindly forwards `event.detail` from a page-dispatched `CustomEvent` with **no field validation**. Per the harness (`PAGE_TO_CONTENT_SCRIPT`: "A page can forge window.postMessage/CustomEvent fields"), any script executing on that origin can supply `action`, `payment`, `date`, `uuid`.

**(b) The exact path.**
`CustomEvent` → `chrome.runtime.sendMessage({data: event.detail})` → background `onMessage`:

```js
chrome.runtime.onMessage.addListener((e,t,o) => {
  return (t.origin!=="https://plus-max-speed.wip" && t.origin!=="https://plus-max-speed.ru") || (
    "updateData"===e.data.action && chrome.storage.local.set({debugInfo:e.data}).then(...)

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
