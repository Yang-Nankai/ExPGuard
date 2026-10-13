# ExPAgent Static Verification — imomahaddnhnhfggpmpbphdiobpmahof v2.4.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.941, scope=1
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `resources/js/background` [BG_1] @ L26:C16 -> L26:C23
- **Sink**: `FETCH_RESOURCE` in `resources/js/background` [BG_1] @ L5:C18 -> L5:C49
- **Severity evidence**: ['*://*.youtube-skins.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse){...})` at `background.js` L24–25. `request` is fully attacker-controlled by any page whose origin matches `externally_connectable.matches: ["*://*.youtube-skins.com/*"]`. There is **no `sender.id` check and no `sender.url`/`sender.origin` check** anywhere in the listener, so the only boundary is the manifest origin restriction — exploitable via XSS on `youtube-skins.com` (or any controlled subdomain, since the pattern is a wildcard subdomain match). Provenance is `EXTERNAL_MESSAGE`; source is genuinely untrusted.

### (b) Exact source-to-sink path (confirmed in raw source)
1. L26: `if (request.action == 'install')` — attacker supplies `action`.
2. L32: `preloadImgs(request.files)` — attacker supplies `files`.
3. L12: `imgs = JSON.parse(imgs)` — attacker controls the JSON.
4. L13–14: iterate; `if (imgs[key].indexOf('themes_pic_file') > 0)` — a **bypassable** filter (attacker just includes the literal substring after index 0; it is a functional theme filter, not a security sanitizer).
5. L15: `img_files.push('https://youtube-ski

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
