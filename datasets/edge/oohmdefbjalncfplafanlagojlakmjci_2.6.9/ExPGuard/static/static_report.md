# ExPAgent Static Verification — oohmdefbjalncfplafanlagojlakmjci v2.6.9

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 16  |  Verified: 4
- Coverage: node=0.821, scope=0.861
- Flow types: {'PRIVILEGE_ESCALATION': 12, 'REQUEST_FORGERY': 2, 'DOM_XSS': 2}  |  Severities: {'CRITICAL': 16}

**Assessment:** Verified 4 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 3 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `js/content-script` [CS_1] @ L234:C31 -> L234:C65
- **Sink**: `CHROME_ACTION_BADGE_OPTIONS` in `js/background` [BG_1] @ L887:C8 -> L887:C137
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I verified the source, the cross-context bridge, and the sink argument.

### (a) Who controls the source
The page controls `document.title` in the content script’s `window` message listener:

```js
// js/content-script.js L228-243
if (event.data.action == "catCatchFFmpeg") {
    ...
    event.data.title = event.data.title ?? document.title ?? ...;   // L234
    event.data.title = event.data.title.replaceAll('"', "").replaceAll("'", "").replaceAll(" ", "");
    let data = { Message: event.data.action, ... };
    data = { ...event.data, ...data };
    chrome.runtime.sendMessage(data);                              // L243
}
```

This is genuinely page-controllable (subject to the bypassable same-origin check at L197 and the action check).

### (b) Source-to-sink path
The content-script message at L243 sends `Message: "catCatchFFmpeg"` with `event.data.title` spread into the payload.

The background listener handles that action at `js/background.js:517`:

```js
if (Message.Message == "catCatchFFmpeg") {
    const data = { ...Message, Message: "ffmpeg", ... };
    chrome.tabs.query(...);          // then tabs.create OR tabs.sendMessage to the ffmpeg page
    G.ffmpegConfig.cacheData.pus

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L197:C12 -> L197:C23
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L901:C8 -> L918:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #5 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.00)

- **Source**: `DOCUMENT_TITLE` in `js/content-script` [CS_1] @ L234:C31 -> L234:C65
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `js/background` [BG_1] @ L901:C8 -> L918:C10
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #8 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content-script` [CS_1] @ L197:C12 -> L197:C23
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background` [BG_1] @ L521:C16 -> L525:C18
- **Bridge**: message `runtime.single.sender.message[js/content-script->js/background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
