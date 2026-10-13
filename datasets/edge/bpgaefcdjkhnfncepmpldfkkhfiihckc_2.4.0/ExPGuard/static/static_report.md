# ExPAgent Static Verification — bpgaefcdjkhnfncepmpldfkkhfiihckc v2.4.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.903, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background` [BG_1] @ L26:C16 -> L26:C23
- **Sink**: `FETCH_RESOURCE` in `resources/js/background` [BG_1] @ L5:C18 -> L5:C49
- **Severity evidence**: ['*://*.youtube-skins.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) { ... })` — `request` is fully controlled by any external message sender. There is **no `sender.id`, `sender.origin`, or `sender.url` check at all** in the listener. The only gate is the manifest `externally_connectable.matches: ["*://*.youtube-skins.com/*"]`, which narrows the attack surface but does not eliminate it: any page (including an XSS'd page or a hostile subdomain) on `*.youtube-skins.com` can call `chrome.runtime.sendMessage(EXTENSION_ID, ...)`. The `request.action == 'install'` check is an attacker-chosen field, not a trust anchor.

**(b) Exact source-to-sink path**
Confirmed in raw source (`background.js`):
- L26: `request.action == 'install'` (attacker-satisfiable)
- L32: `preloadImgs(request.files)` → L12 `JSON.parse(imgs)` → L13–L15: for each key, `img_files.push('https://youtube-skins.com' + imgs[key])`
- L19/L4–L5: `httpPreload(img_files.shift())` → `rawResponse = fetch(img_url, {method: 'get'})`

This matches the propagation report exactly. The bridge is intact.

**(c) Which security-relevant API argument is attacker-con

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
