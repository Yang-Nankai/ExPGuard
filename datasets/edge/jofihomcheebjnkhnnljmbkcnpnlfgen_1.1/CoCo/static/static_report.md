# ExPAgent Static Verification — jofihomcheebjnkhnnljmbkcnpnlfgen v1.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `crx_headers/expguard_compat_header.js` [UNKNOWN] @ L41:C1 -> L41:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `crx_headers/expguard_compat_header.js` [UNKNOWN] @ L41:C1 -> L41:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'WEB_CONTENT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### 1. Reported evidence is a mangled placeholder — not the real anchor
The normalized flow cites `crx_headers/expguard_compat_header.js` with `codeContext: "document.title = 'title'"` at `L41:C1` for **both** source and sink. That file does **not exist** in the unpacked extension (`list_files()` shows only `background.js`, `content.js`, `popup.*`, `manifest.json`, `icons/`). The deterministic harness confirms both anchors are unresolved (`"resolved": false`, warnings: source/sink file could not be resolved). The codeContext is a *constant assignment* to `document.title` — it is not a read of attacker data and not a `chrome.storage` write. As reported, that literal span is a dead placeholder, not a data flow.

However, the *semantic* flow (DOCUMENT_TITLE → CHROME_LOCAL_STORAGE) genuinely exists in the real source, so I verified it against `content.js`.

### 2. Decision ledger (real extension source)

**(a) Who controls the source?** The web page itself. The content script is injected on `*://*/*` (manifest `contentScripts.matches`), so any page the user visits controls the DOM. In `content.js:9`:

```js
const mediaName = playingElement.getAttribute('title'

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
