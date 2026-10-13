# ExPAgent Static Verification — cbhljnnfpomfkmhefapcjmjignigcfpn v1.1.21

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- **Not reviewed due to analysis budget:** 1 flow(s): [3]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 4}  |  Severities: {'UNKNOWN': 4}

**Assessment:** Verified 3 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 2 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L244
- **Sink**: `CHROME_TABS_EXECUTE` in `background.js` [BG_1] @ L258
- **Bridge**: message `doublex-edg`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — `WINDOW_MESSAGE_EVENT` → `chrome.scripting.executeScript`

### Evidence reviewed

- **Manifest**: content script `./content.js` on `https://*/*`, `http://*/*`, `file://*/*` (any page can reach the message listener). `externally_connectable` limited to supercopy.app/enablecopy.com, but there is **no `onMessageExternal`/`onConnectExternal`** in the extension, so the page-visible attack surface is the content-script `window` message listener.
- **content.js (actual file, minified single line)**: I read the entire file. It contains exactly **one** page-facing message bridge:

```js
window.addEventListener("message", async e => {
  if (e.source === window && "SP_DOWNLOAD_FILE" === e.data.type) {
    let t = false;
    t = !!(await chrome.runtime.sendMessage({action:"checkPermission", data:{permissions:e.data.permissions}})).hasPermission
      || (await chrome.runtime.sendMessage({action:"REQUEST_PERMISSION_DIRECT", data:{permissions:e.data.permissions}})).granted;
    t ? chrome.runtime.sendMessage({action:"SP_DOWNLOAD_FILE", data:{downloadData:e.data.downloadData}}) ...
  }
});
```

This handler only ever emits three background actions: `checkPermission`, `

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L244
- **Sink**: `CHROME_TABS_EXECUTE` in `background.js` [BG_1] @ L267
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — `WINDOW_MESSAGE_EVENT` → `chrome.scripting.executeScript`

### Ev...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_scripts.js` [CS_1] @ L244
- **Sink**: `CHROME_TABS_EXECUTE` in `background.js` [BG_1] @ L278
- **Bridge**: message `doublex-edg`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 — `WINDOW_MESSAGE_EVENT` → `chrome.scripting.executeScript`

### Ev...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
