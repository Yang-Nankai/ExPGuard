# ExPAgent Static Verification — yurui0216@gmail.com v1.3.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.627, scope=0.61
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `scripts/docxConverter` [CS_1] @ L12:C24 -> L12:C36
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L35:C31 -> L39:C10
- **Bridge**: message `runtime.single.sender.message[scripts/docxConverter->background]`
- **Severity evidence**: ['https://chat.deepseek.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — REQUEST_FORGERY (attacker input → background fetch body)

### (a) Who controls the source?
The resolved source anchor is `scripts/docxConverter.js:12`:

```js
document.addEventListener('deepshare:convertToDocx', async (event) => {
    const message = event.detail?.messages || {};
```

`docxConverter.js` runs as an ISOLATED-world content script on `https://chat.deepseek.com/*`, `https://chatgpt.com/*`, and `https://gemini.google.com/*`. The listener is registered via `initDocxConverter()` at line 395. A page on any of those origins can dispatch the same DOM `CustomEvent` on `document` with an arbitrary `detail.messages` object — there is no `event.isTrusted`, `event.origin`, action allow-list, or sender check. So the source is genuinely web-content/attacker-controllable. The harness confirms this (`PAGE_TO_CONTENT_SCRIPT`, page can forge CustomEvent fields).

### (b) Source-to-sink path
1. `scripts/docxConverter.js:11-14` — page-forged `deepshare:convertToDocx` → `message = event.detail.messages`.
2. `convertToDocx(message, sourceButton)` → `convertToDocxViaApi(message.content, settings.docxServerUrl)` (lines 85-88, when `docxMode !== 'local'`).
3. `conv

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
