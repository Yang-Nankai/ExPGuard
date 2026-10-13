# ExPAgent Static Verification — pooaceljmehmcieneahjdlhkggheonbf v1.3.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.36, scope=0.369
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'CRITICAL': 1, 'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `login` [CS_2] @ L1:C89 -> L1:C97
- **Sink**: `CHROME_SYNC_STORAGE` in `login` [CS_2] @ L1:C59 -> L1:C113
- **Severity evidence**: ['https://www.app.upword.ai/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — Upword login.js `upword-authenticate` → `chrome.storage.sync.set`

### 1. Who controls the source
The source is `document.addEventListener("upword-authenticate", e => ...)` in `login.js`, a content script registered only on the Upword domains (`https://www.app.upword.ai/*`, `https://app.upword.ai/*`, `https://www.upword.ai/*`, `https://upword.ai/*`), running at `document_start` in the **isolated world**.

Content scripts share the DOM with the page, so a page (or injected/XSS script) on any of those origins can dispatch:

```js
document.dispatchEvent(new CustomEvent('upword-authenticate', {
  detail: { user: { ...attackerControlled... } }
}));
```

The isolated-world listener receives that DOM event, and `e.detail.user` is fully attacker-controlled. There is no `event.source`/origin check, no sender.id trust boundary, no allow-list, and no schema/type validation.

### 2. Source-to-sink path
The evidence is a direct, single-frame path — no message or storage hop is needed:

```
TARGET_CUSTOM_EVENT (page-dispatched CustomEvent)
  -> e.detail.user (attacker value)
  -> chrome.storage.sync.set({ user: e.detail.user }, () => {})
```

I confirmed the raw source (`l

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
