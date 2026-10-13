# ExPAgent Static Verification — cbhljnnfpomfkmhefapcjmjignigcfpn v1.1.21

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.016, scope=0.016
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L1:C4279 -> L1:C4290
- **Sink**: `CHROME_DOWNLOADS_OPTIONS` in `background` [BG_1] @ L1:C14619 -> L1:C14696
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification of Flow #4 — `WINDOW_MESSAGE_EVENT` → `chrome.downloads.download`

### Decision ledger

**(a) Who controls the source?**
The source is `window.addEventListener("message", ...)` in `content.js`, which runs in an ISOLATED content-script world but listens on the shared `window` event target. The manifest mounts it on `https://*/*`, `http://*/*`, and `file://*/*`, so **any webpage the user visits** can dispatch `window.postMessage` into this listener. The guard is:

```js
if (e.source === window && "SP_DOWNLOAD_FILE" === e.data.type)
```

Both `e.source === window` and the `type` field are attacker-satisfiable (the page posts to its own window, and the type is an attacker-chosen message field). This is not authentication. **Source = attacker-controlled: confirmed.**

**(b) Exact source-to-sink path**
- Page → content script: `postMessage({type:"SP_DOWNLOAD_FILE", permissions:["downloads"], downloadData:{url, filename, headers}})`.
- `content.js` C4450–C4750: forwards `downloadData` verbatim:
  ```js
  t ? chrome.runtime.sendMessage({action:"SP_DOWNLOAD_FILE", data:{downloadData:e.data.downloadData}}) ...
  ```
- `background.js` C14450–C14696 (`onMessage` listener): `cas

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
