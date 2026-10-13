# ExPAgent Static Verification — jfedfbgedapdagkghmgibemcoggfppbb v2.7.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 15  |  Verified: 4
- Coverage: node=0.821, scope=0.862
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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me reason through the four-part ledger.

**1. Source control.** The content-script source at L282 is inside a page-driven event listener and does `event.data.title = event.data.title ?? document.title ?? ...`. `document.title` is genuinely page-controlled, and the harness confirms the page can forge `event.data` fields. So the *source* is attacker-controllable. ✔

**2. Where the title actually goes.** After L283 (quote/space stripping), the title is spread into the message sent by the `catCatchFFmpeg` branch (`data = { ...event.data, ...data }`, `chrome.runtime.sendMessage(data)` with `Message: "catCatchFFmpeg"`). In the background, `Message.Message == "catCatchFFmpeg"` (L516) forwards the object to the ffmpeg web page (`chrome.tabs.sendMessage` / `G.ffmpegConfig.cacheData.push(data)`). There is **no** use of `Message.title` in the background badge path. A search for `.title` in background shows only `webInfo.title` (a different object used for download directory/filename at L244–257).

**3. The sink argument actually consumed.** `SetIcon(obj)` at L928–937:
- L930: `chrome.action.setBadgeText({ text: "", ... })` — `text` is a **hard-coded empty string**.

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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

### (a) Who controls the source?
The source is a page-originated `window.postMessage` event received by the content script's `window.addEventListener("message", ...)` at `js/content-script.js:234`. The content script is injected into `http(s)://*/*` (all frames, `document_start`, ISOLATED world). The only guard at line 236 is:

```js
if (!event.data || !event.data.action || event.origin !== window.location.origin || !action.includes(event.data.action)) { return; }
```

`event.origin !== window.location.origin` is trivially satisfied by the page's **own** `window.postMessage(...)`, and `event.data.action` is attacker-chosen. So the source is genuinely page/attacker-controllable.

### (b) Source-to-sink path
The path is real, via a message-field override:

- Page sends `{ action: "catCatchFFmpegResult", state: true, tabId: <n>, Message: "mobileUserAgent" }`.
- Content script line 295 forwards:
  ```js
  chrome.runtime.sendMessage({ Message: "catCatchFFmpegResult", ...event.data });
  ```
  Because `...event.data` is spread **after** the fixed `Message`, the page-controlled `event.data.Message = "mobileUserAgent"` overrides the fixed value. `tabId` is also ca

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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5 (DOCUMENT_TITLE → `chrome.declarativeNetRequest.updateSessionRules`)

### Decision ledger

**(a) Who controls the source?**
`document.title` is genuinely page-controlled (untrusted). The content script reads it at `js/content-script.js:282`:
```js
event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString();
```
This is reachable only inside the `event.data.action == "catCatchFFmpeg"` branch of the `window.addEventListener("message", ...)` handler. So the source is attacker-controllable *as a string field named `title`*.

**(b) Exact source-to-sink path**
- `document.title` → `event.data.title` (content-script L282).
- `event.data.title` is sanitized for quotes/spaces (L283), but it remains in the `title` field.
- The message sent at L291 (`catCatchFFmpeg` branch) spreads `event.data`, so the background receives `Message.title`.
- The background `catCatchFFmpeg` branch (L516–535) spreads `Message` into `data` (`Message: "ffmpeg"`) and either pushes it into `G.ffmpegConfig.cacheData` or forwards it to the ffmpeg page tab. `title` is **never** used as `tabId`.

The flagged sink (`updateSessionRules` at L944–961) is inside `mobile

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

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (WINDOW_MESSAGE_EVENT → CHROME_TABS_CREATE_OPTIONS)

### Four-part decision ledger

**(a) Who controls the source?**
Genuinely attacker-controllable. `js/content-script.js:234-236` registers `window.addEventListener("message", …)`. The guard is `event.origin !== window.location.origin || !action.includes(event.data.action)` — a same-origin check on a page's own `postMessage`, which a malicious page trivially satisfies by calling `window.postMessage(...)` from itself. `"catCatchFFmpeg"` is in the allow-list, so the branch is reachable. No browser-authenticated sender check exists on this path.

**(b) Exact source-to-sink path**
Confirmed and connected:
1. Page `postMessage` with `action: "catCatchFFmpeg"` reaches the content-script listener (L234-236).
2. L276-292: after a weak gate (`use` truthy and `files` non-empty array), the content script builds `data = { ...event.data, ...data }` and calls `chrome.runtime.sendMessage(data)`. Any page-supplied field, including `active`, is spread through.
3. Background handler at `js/background.js:516` (`Message.Message == "catCatchFFmpeg"`) is reached. No `sender.id`/origin trust check here.
4. L520: `chrome.tabs.cr

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
