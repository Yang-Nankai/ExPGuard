# ExPAgent Static Verification — mmioliijnhnoblpgimnlajmefafdfilb v2.5.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.373, scope=0.335
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `contentScript.bundle` [CS_1] @ L1:C497 -> L1:C505
- **Sink**: `CHROME_SYNC_STORAGE` in `contentScript.bundle` [CS_1] @ L1:C568 -> L1:C603
- **Severity evidence**: ['*://www.shazam.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 13, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `TARGET_CUSTOM_EVENT` → `chrome.storage.sync.set`

### (a) Who controls the source
The source is the `detail` of a `CustomEvent` named **`contentscript_host:storageChange`**, listened for on `document` inside the content script running on `*://www.shazam.com/*` and `*://amp.shazam.com/*`.

I read the actual code around the reported columns:

```js
document.addEventListener("contentscript_host:storageChange",(e=>{
  let{eventType:t,key:n,data:o}=e.detail;
  "amconnect"===n && ("removed"===t ? chrome.storage.sync.remove(n) : chrome.storage.sync.set(o,(()=>{})))
}));
```

The content script shares the DOM with the host page. A script running on `www.shazam.com` (or `amp.shazam.com`) can dispatch a custom event with any name on `document`, so the page controls `e.detail` and therefore `data`. The deterministic harness corroborates this (`PAGE_TO_CONTENT_SCRIPT`, "a page can forge … CustomEvent fields"). This is untrusted web content reaching a content-script API.

### (b) Exact source-to-sink path
`e.detail` → destructuring `{eventType:t, key:n, data:o}` → `"amconnect" === n` gate → `"removed" !== t` branch → **`chrome.storage.sync.set(o)`**.

There is no s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
