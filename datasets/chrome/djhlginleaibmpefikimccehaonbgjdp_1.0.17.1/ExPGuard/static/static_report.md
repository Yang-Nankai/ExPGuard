# ExPAgent Static Verification — djhlginleaibmpefikimccehaonbgjdp v1.0.17.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.951, scope=1
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `content/twitch.integrity.bridge` [CS_2] @ L7:C83 -> L7:C92
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L409:C10 -> L412:C6
- **Bridge**: message `runtime.single.sender.message[content/twitch.integrity.bridge->background]`
- **Severity evidence**: ['*://*.twitch.tv/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Source control — attacker-controlled:**  
`content/twitch.integrity.bridge.js` is an isolated-world content script that listens for a DOM CustomEvent:

```js
document.addEventListener('ggsel:integrity-captured', function (ev) {
  const integrity = ev && ev.detail && typeof ev.detail.integrity === 'string' ? ev.detail.integrity : '';
  if (!integrity) return;
  chrome.runtime.sendMessage({ type: 'GGSEL_INTEGRITY_CAPTURED', integrity, ts: ev.detail.ts || Date.now() }, ...)
```

The event name is fixed and publicly known. A page running on any matched `*://*.twitch.tv/*` origin can dispatch the same event on `document`:

```js
document.dispatchEvent(new CustomEvent('ggsel:integrity-captured', {
  detail: { integrity: 'v4.local.attacker-controlled' }
}));
```

DOM events dispatched by the page are visible to isolated-world listeners, so the page can forge `ev.detail.integrity`. There is no `event.source`, origin, sender.id, or authenticity check in the bridge.

**(b) Path is unbroken:**  
Bridge (`L7`) → `chrome.runtime.sendMessage` (`L10-13`) → background `chrome.runtime.onMessage` (`L419`) → `message.type === 'GGSEL_INTEGRITY_CAPTURED'` branch (`L437`) →

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
