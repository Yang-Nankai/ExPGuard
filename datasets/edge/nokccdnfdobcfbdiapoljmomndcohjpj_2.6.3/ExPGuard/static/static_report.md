# ExPAgent Static Verification — nokccdnfdobcfbdiapoljmomndcohjpj v2.6.3

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 16  |  Verified: 4
- Coverage: node=0.78, scope=0.814
- Flow types: {'PRIVILEGE_ESCALATION': 12, 'REQUEST_FORGERY': 2, 'DOM_XSS': 2}  |  Severities: {'CRITICAL': 16}

**Assessment:** Verified 4 flow(s): 1 true-positive, 3 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `js/content-script` [CS_1] @ L234:C31 -> L234:C65
- **Sink**: `CHROME_ACTION_BADGE_OPTIONS` in `js/background` [BG_1] @ L809:C8 -> L809:C137
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #5: DOCUMENT_TITLE → chrome.action.setBadgeText

### Decision ledger

**(a) Source controllability**  
The source is genuinely web-controlled: the content script listens to `window.addEventListener("message", ...)` with no `event.source`/origin check. At `js/content-script.js:234`:

```js
event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString();
```

A page can supply `event.data.title` directly, or the fallback `document.title` is also page-controlled. So the *source value* is attacker-influenced.

**(b) Source-to-sink path**  
The source line L234 belongs only to the `catCatchFFmpeg` branch. That branch sends:

```js
chrome.runtime.sendMessage(data);   // Message: event.data.action = "catCatchFFmpeg"
```

The background handler for that action is `js/background.js:504-523`. It spreads `Message` into `data`, then either:

- `chrome.tabs.sendMessage(tabs[0].id, data)` to the ffmpeg page, or
- `G.ffmpegConfig.cacheData.push(data)`

It never calls `SetIcon`, never touches `cacheData[tabId].length` for badge purposes, and never reaches `chrome.action.setBadgeText` from the title value.

The propagation step that does reach the si

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L197:C12 -> L197:C23
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L823:C8 -> L840:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — `WINDOW_MESSAGE_EVENT` → `chrome.declarativeNetRequest.updateSessionRules`

### Decision ledger

**(a) Who controls the source?**
The source is the `window.addEventListener("message", ...)` listener in `js/content-script.js` (L196–253). The content script runs in an ISOLATED world on `http://*/*` and `https://*/*` (`runAt: document_start`, `allFrames: true`). There is **no `event.source === window` check and no `event.origin`/URL validation** — so any script on the hosting page can forge `event.data`. The harness note that "page can forge window.postMessage fields" is satisfied.

**(b) Source-to-sink path**
- Page dispatches `window.postMessage` with a chosen payload.
- Content script L249–251:
  ```js
  if (event.data.action == "catCatchToBackground") {
      delete event.data.action;
      chrome.runtime.sendMessage(event.data);
  }
  ```
  So the page can send `{ action: "catCatchToBackground", Message: "mobileUserAgent", tabId: X }`. The `action` field is stripped, but `Message` and `tabId` pass through verbatim.
- Background `chrome.runtime.onMessage.addListener` (L308) receives the forwarded object. L315 `Message.tabId = Message.tabId ?? G.tabId` 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `js/content-script` [CS_1] @ L234:C31 -> L234:C65
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L823:C8 -> L840:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've inspected the actual content-script and background source. The evidence is sufficient to reach a verdict.

## Verification reasoning

### (a) Who controls the source
The source anchor (`js/content-script.js` L234) sits inside the `window.addEventListener("message", …)` handler in the **`catCatchFFmpeg`** branch:

```js
event.data.title = event.data.title ?? document.title ?? new Date().getTime().toString();
```

The listener has **no `event.source`/`event.origin` check** (L196–197 only checks `event.data.action`), so a page (or any frame on the matched `http/https` host) can postMessage a crafted payload. The `title` value is genuinely page-controllable (`event.data.title`) or page-derived (`document.title`). So the source itself is attacker-controllable.

### (b) The exact source-to-sink path
The claimed path is:

1. L234: page-controlled `title` set on `event.data`.
2. L242–243: `data = { ...event.data, ...data }` then `chrome.runtime.sendMessage(data)` with `Message: "catCatchFFmpeg"`.
3. L308 background `onMessage` receives the whole object as `Message`.
4. Claimed sink: L823–840 `chrome.declarativeNetRequest.updateSessionRules({…})` inside `mobileUserAgent(tabId, …)`.

Th

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #8 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L197:C12 -> L197:C23
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L508:C16 -> L512:C18
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to reach a verdict.

## Analysis

### 1. Who controls the source?
The content script at `js/content-script.js:196` registers `window.addEventListener("message", ...)`. A page on any `http(s)://*` origin can post a crafted `event.data`. The `catCatchFFmpeg` branch (L228–243) forwards attacker-supplied fields (`event.data` spread) to the background via `chrome.runtime.sendMessage(data)`. This is genuinely attacker-controllable.

### 2. Does the bridge connect?
Yes. Content-script `Message: "catCatchFFmpeg"` maps directly to the background branch `if (Message.Message == "catCatchFFmpeg")` at `js/background.js:504`. The message reaches the flagged call at L508.

### 3. What reaches the security-relevant sink argument?
This is the decisive point. The flagged sink is:

```js
chrome.tabs.create({ url: G.ffmpegConfig.url, active: Message.active ?? true }, ...)
```

The propagation step #83 pinpoints the taint precisely at `active: »Message.active ?? true«`. The attacker controls **only** the `active` boolean option.

The URL argument is **not** attacker-controlled in this flow. `G.ffmpegConfig.url` is a getter (`js/init.js:192–199`) returning a hard-coded constant:



**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
