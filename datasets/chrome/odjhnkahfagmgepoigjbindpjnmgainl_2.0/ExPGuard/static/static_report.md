# ExPAgent Static Verification — odjhnkahfagmgepoigjbindpjnmgainl v2.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.955, scope=1
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `video/twitch-content` [CS_4] @ L103:C30 -> L103:C38
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L60:C8 -> L60:C48
- **Bridge**: message `runtime.single.sender.message[video/twitch-content->background]`
- **Severity evidence**: ['*://*.twitch.tv/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — STORAGE_POSOING (`adsBlocked`)

### Decision ledger

**(a) Who controls the source?**
The source is a `window` custom event, `twitch-ad-blocker-intercepted`, in the content script `video/twitch-content.js`:

```js
window.addEventListener('twitch-ad-blocker-intercepted', (e) => {
    if (isEnabled) {
        reportBlocked(e.detail?.count || 1);
        ...
```

`video/twitch-content.js` runs in the ISOLATED world, but DOM `window` events are shared across isolated worlds. Any page-context script on `*.twitch.tv` (including XSS/compromised page script) can dispatch:

```js
window.dispatchEvent(new CustomEvent('twitch-ad-blocker-intercepted', { detail: { count: <attacker value> } }));
```

and the content script's listener receives it. `e.detail?.count` is therefore genuinely attacker-controllable. The only gate, `if (isEnabled)`, is a state check (defaults to enabled), not a trust boundary.

**(b) Source-to-sink path**
Confirmed end-to-end in raw source:

1. `video/twitch-content.js:101-103` — custom-event listener reads `e.detail?.count || 1` and calls `reportBlocked(...)`.
2. `video/twitch-content.js:326-328` — `reportBlocked(count)` sends `chrome.runti

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
