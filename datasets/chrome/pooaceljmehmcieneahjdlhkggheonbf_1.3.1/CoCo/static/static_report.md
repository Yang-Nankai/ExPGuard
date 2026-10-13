# ExPAgent Static Verification — pooaceljmehmcieneahjdlhkggheonbf v1.3.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `login.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Sink**: `CHROME_SYNC_STORAGE` in `login.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'e.detail'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (`login.js` custom event → `chrome.storage.sync.set`)

### Source evidence

`login.js` is a single minified line:

```js
document.addEventListener("upword-authenticate",(e=>{
  let t;
  chrome.storage.sync.set({user:e.detail.user},(()=>{})),
  t=e.detail.user?"upword-login":"upword-logout",
  chrome.runtime.sendMessage(t)
}));
```

This confirms the reported propagation exactly:
- Source: the `detail.user` field of the `upword-authenticate` DOM custom event (`e.detail.user`).
- Sink: `chrome.storage.sync.set({ user: e.detail.user }, …)` — the attacker-controlled value is the **stored value itself**, written directly under the `user` key.

### Decision ledger

**(a) Who controls the source?**
The webpage on the upword.ai domains. `login.js` is a content script on `https://www.app.upword.ai/*`, `https://app.upword.ai/*`, `https://www.upword.ai/*`, `https://upword.ai/*`. Any script executing in the page (including via XSS on those domains, or the site's own scripts) can dispatch:

```js
document.dispatchEvent(new CustomEvent("upword-authenticate", {
  detail: { user: "<attacker value>" }
}));
```

Content scripts share the DOM with the page even in the isolat

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
