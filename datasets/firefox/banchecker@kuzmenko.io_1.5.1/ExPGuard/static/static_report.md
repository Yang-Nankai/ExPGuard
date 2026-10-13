# ExPAgent Static Verification — banchecker@kuzmenko.io v1.5.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.988, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'LOW': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / LOW, confidence 0.30)

- **Source**: `ELEMENT_VALUE` in `gcpd730` [CS_4] @ L3:C56 -> L3:C68
- **Sink**: `CHROME_SYNC_STORAGE` in `gcpd730` [CS_4] @ L5:C4 -> L19:C6
- **Severity evidence**: ['*://steamcommunity.com/id/*/gcpd/730*tab=matchhistorycompetitive']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: I have enough evidence to render a verdict. Key facts from source inspection:

- `options.js` defines `saveOptions()` which reads `document.getElementById('customapikey').value` (web-page DOM) and writes it verbatim to `chrome.storage.sync.set({ customapikey: customapikey }, ...)` (L1–5). No sanitizer, no allow-list, no origin/sender guard.
- The guard at `options.js` L95–100 only gates the *automatic* `DOMContentLoaded → initOptions` wiring to non-http(s) pages. That would normally make this dead code in a content script.
- **But** `gcpd730.js` L679–690 bypasses that guard: it `fetch(chrome.runtime.getURL('/options.html'))`, injects the settings HTML into the page via `innerHTML`, and then calls `initOptions()` directly. `initOptions()` (options.js L76–93) wires `save` → `saveOptions` in the content-script world.
- The injected form contains `id="customapikey"`, `id="radioCustom"`, and `id="save"` (options.html L37/39/50). These DOM nodes live in the page DOM, so the page can set `.value` / `.checked` and dispatch a `click` on `save`; the isolated-world listener then runs and stores the attacker-chosen value.

Four-part ledger:
1. **Source control:** `ELEMENT_VALUE` with `CONTENT_

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
