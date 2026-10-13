# ExPAgent Static Verification — iekecadicdlboncnocjmnkajchdafecb v2.7.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 15  |  Verified: 4
- Coverage: node=0.817, scope=0.849
- Flow types: {'PRIVILEGE_ESCALATION': 12, 'REQUEST_FORGERY': 3}  |  Severities: {'CRITICAL': 15}

**Assessment:** Verified 4 flow(s): 1 true-positive, 3 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `js/content-script` [CS_1] @ L282:C31 -> L282:C65
- **Sink**: `CHROME_ACTION_BADGE_OPTIONS` in `js/background` [BG_1] @ L930:C8 -> L930:C137
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5 (DOCUMENT_TITLE → CHROME_ACTION_BADGE_OPTIONS)

### (a) Source control
The reported source is genuine and attacker-controllable:

- `js/content-script.js:282` — `event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString();`
- The content script runs on `http://*/*` and `https://*/*` at `document_start`, `allFrames: true`. A page can control `document.title` (and can also supply `event.data.title` directly via the window message the content script is listening for).
- So **source controllability: TRUE**.

### (b) Exact source-to-sink path
The tainted `title` field leaves the content script in the `catCatchFFmpeg` branch:

- `js/content-script.js:290-291`: `data = { ...event.data, ...data }; chrome.runtime.sendMessage(data);`
- `data.Message` becomes `event.data.action` (`"catCatchFFmpeg"`), and `data.title` is the page/document title.

In the background:

- `js/background.js:516-534` (`if (Message.Message == "catCatchFFmpeg")`) does **not** touch `chrome.action` at all. It builds `{...Message, Message:"ffmpeg", ...}` and forwards it to the online ffmpeg page via `chrome.tabs.sendMessage` / `G.ffmpegConfig.cacheData`. It never c

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L236:C12 -> L236:C23
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L944:C8 -> L961:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence from the report plus the focused source reads to decide. Here is my verification.

## Four-part decision ledger

**(a) Who controls the source?**
The page itself. `js/content-script.js` runs on every `http://*/*` / `https://*/*` page (ISOLATED world) and registers:

```js
window.addEventListener("message", (event) => {
    const action = ["catCatchAddMedia", "catCatchAddKey", "catCatchFFmpeg", "catCatchFFmpegResult", "catCatchCloseScript"];
    if (!event.data || !event.data.action || event.origin !== window.location.origin || !action.includes(event.data.action)) { return; }
```

`event.origin !== window.location.origin` is satisfied by the page's own `window.postMessage` (the page is same-origin with itself), and the `action` allowlist is attacker-satisfiable by choosing `"catCatchFFmpegResult"`. So `event.data` (including arbitrary `Message` and `tabId` fields) is page-controlled.

**(b) Exact source→sink path**
Confirmed in raw source:

- Content script L293–L295:
  ```js
  if (event.data.action == "catCatchFFmpegResult") {
      if (!event.data.state || !event.data.tabId) { return; }
      chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...e

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `js/content-script` [CS_1] @ L282:C31 -> L282:C65
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L944:C8 -> L961:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5 (DOCUMENT_TITLE → chrome.declarativeNetRequest.updateSessionRules)

### Four-part ledger

**(a) Who controls the source?**
The source `document.title` is genuinely page-controllable in principle. It is used only as a *fallback* at `js/content-script.js:282`:
```js
event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString();
```
So a page can control it either directly (`event.data.title`) or by setting `document.title`. Source controllability is real.

**(b) Exact source→sink data path**
The `document.title` value is assigned to `event.data.title` only inside the `catCatchFFmpeg` branch (`L276-L292`). That branch builds a message with `Message: "catCatchFFmpeg"` and spreads `event.data` (including `title`) into it before `chrome.runtime.sendMessage(data)`.

In the background, the `catCatchFFmpeg` branch is at `js/background.js:516-536`. It spreads `Message` into `data` and then only:
- sends `data` to the ffmpeg page via `chrome.tabs.sendMessage`, or
- caches it in `G.ffmpegConfig.cacheData`, or
- creates a tab with a **constant** URL `G.ffmpegConfig.url`.

It **never** calls `mobileUserAgent()` and never touches `chrome.decla

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #8 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L236:C12 -> L236:C23
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L520:C16 -> L524:C18
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #8 (sourceReportId 3)

### (a) Who controls the source?
The source is a `window.addEventListener("message", ...)` handler in `js/content-script.js` (L234–302), which runs on `http://*/*` and `https://*/*` in `document_start`/`allFrames`. The guard at L236 is:

```js
if (!event.data || !event.data.action || event.origin !== window.location.origin || !action.includes(event.data.action)) { return; }
```

`event.origin === window.location.origin` and the `action` allowlist are **attacker-satisfiable**: a malicious page posts to itself from the same origin with `action: "catCatchFFmpeg"`. So the source is genuinely web-controllable. ✅

### (b) The source-to-sink path
The `catCatchFFmpeg` branch (L276–291) validates `event.data.use` and `files`, then does:

```js
let data = { Message: event.data.action, action: event.data.use, files: event.data.files, url: event.data.href ?? event.source.location.href };
data = { ...event.data, ...data };
chrome.runtime.sendMessage(data);
```

Any extra field in `event.data` — including `active` — is preserved in the spread and sent to the background. The background handler at L516 checks `Message.Message == "catCatchFFmpeg"`, and

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
