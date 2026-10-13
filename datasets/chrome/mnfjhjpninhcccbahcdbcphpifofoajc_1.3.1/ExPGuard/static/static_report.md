# ExPAgent Static Verification — mnfjhjpninhcccbahcdbcphpifofoajc v1.3.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.826, scope=0.886
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / MEDIUM, confidence 0.30)

- **Source**: `TARGET_CUSTOM_EVENT` in `src/contentScript` [CS_1] @ L169:C65 -> L169:C73
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/contentScript` [CS_1] @ L192:C4 -> L203:C6
- **Severity evidence**: ['https://www.patreon.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification Ledger

**(a) Who controls the source?**  
A page running on `https://www.patreon.com/*` (or `patreon.com/*`). The listener is registered in the content script's ISOLATED world, but it listens on the shared `document` DOM:

```js
document.addEventListener("pd-bootstrap-data", function handleBootstrapData(e) {
  console.log("Patreon Downloader | Received bootstrap data.", e.detail);
  setState(e.detail, 0);
});
```

The extension itself dispatches `pd-bootstrap-data` CustomEvents (L24–30, L68–74) to feed real Patreon data in, but the event name is public, the listener has no `isTrusted` check, no `origin` check, and no secret token. Any page script (including XSS on Patreon) can do `document.dispatchEvent(new CustomEvent("pd-bootstrap-data", {detail: {...}}))` and the isolated-world listener will fire with the attacker's `detail`. **Source is attacker-controllable.**

**(b) Source → sink path (unbroken):**  
`e.detail` (L169) → `setState(e.detail, 0)` (L170) → retry loop keeps the same `state` (L184) → `data[tab.toString()] = state` (L191) → `chrome.storage.local.set(data, ...)` (L192). The `tab` key is browser-derived (`whoAmI` background response), so it is not att

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
