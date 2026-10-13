# ExPAgent Static Verification — {a7f2c94e-5b8d-4f9a-9c21-8e4b5d6f7a9c} v1.2.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.993, scope=1
- Flow types: {'STORAGE_POSOING': 2, 'REQUEST_FORGERY': 1, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 4}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_2] @ L79:C11 -> L79:C37
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_2] @ L86:C5 -> L86:C69
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_2] @ L79:C11 -> L79:C37
- **Sink**: `CHROME_SYNC_STORAGE` in `content` [CS_2] @ L94:C5 -> L94:C68
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_2] @ L79:C11 -> L79:C37
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L39:C2 -> L39:C41
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verdict reasoning

### 1. Source control
The primary evidence identifies a `WINDOW_MESSAGE_EVENT` in the content script. I inspected `content.js` L76–101:

```js
function unlockQueue() {
    window.addEventListener('message', (unlockResend) => {
        if (unlockResend.source !== window) return;
        switch (unlockResend.data.webPage){
            case 'exportArticleData':
                chrome.runtime.sendMessage(unlockResend.data.srcDomain, ...);
```

This is a real page-facing `message` listener. The guard `unlockResend.source !== window` is attacker-satisfiable: a page posting to its own window (`window.postMessage(...)`) produces `event.source === window`. The `webPage` field is a page-chosen action string, not a trust anchor. So the **source is fully attacker/untrusted-controlled** and runs on every `http://*/*` / `https://*/*` page (content script `matches`).

The harness warning about the anchor not containing `addEventListener` is explained: the anchor is the `switch` inside the listener; the listener is registered 2 lines above (L77).

### 2. Source → sink path
The bridge is confirmed:

- Content script (`content.js:81`): `chrome.runtime.sendMessage(unlockResend.d

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
