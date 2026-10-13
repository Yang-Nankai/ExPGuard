# ExPAgent Static Verification — abfimpkhacgimamjbiegeoponlepcbob v1.0.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L227
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L587
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Source anchoring — does the reported source exist?

- The flow reports source file `content_scripts.js` L227, but the manifest (and `list_files()`) shows the content script is actually **`content.js`**; `content_scripts.js` does not exist in the unpacked extension.
- In `content.js`, the real `window.addEventListener("message", receiveMessage, false)` is at **L239**, and the handler body is **L212–236**. Line 227 is `const loginFrame = document.getElementById('seedr-chrome-login-frame');` — inside the login response callback, not a message source line.

So the source anchor is misaligned, though a real `WINDOW_MESSAGE_EVENT` listener does exist in `content.js`.

### 2. What the window-message handler actually does

```js
function receiveMessage(event) {
    if (event.origin !== "https://www.seedr.cc") return;
    const { function: func, username, password } = event.data;
    switch (func) {
        case 'close_login': hideLoading(); break;
        case 'login':
            showLoading();
            chrome.runtime.sendMessage({ type: 'login', username, password }, ...);
            break;
    }
}
```

The only background message emitted from this we

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
