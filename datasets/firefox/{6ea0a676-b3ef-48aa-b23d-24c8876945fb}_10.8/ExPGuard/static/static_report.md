# ExPAgent Static Verification — {6ea0a676-b3ef-48aa-b23d-24c8876945fb} v10.8

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 2
- Coverage: node=0.972, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 6}  |  Severities: {'MEDIUM': 7}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_w2g.530d247b` [CS_1] @ L166:C27 -> L166:C50
- **Sink**: `CHROME_SESSION_STORAGE` in `sw.98b6defa` [BG_1] @ L209:C16 -> L211:C18
- **Bridge**: message `runtime.single.sender.message[content_w2g.530d247b->sw.98b6defa]`
- **Severity evidence**: ['https://w2g.tv/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 (STORAGE_POSOING)

### 1. Source control — attacker-controllable ✓

The source anchor in `content_w2g.530d247b.js`:

```js
window.addEventListener("message", function(event) {
    if (event.origin === window.origin) {
        if (event.data && !event.data._skipForward) chrome.runtime.sendMessage(event.data);
    }
});
```

- A page running on the content-script match host (e.g. `https://w2g.tv/*`) can call `window.postMessage(attackerData, "*")`.
- `event.origin === window.origin` is trivially satisfied by the page's own same-origin `postMessage`; it is **not** an unforgeable trust anchor.
- `event.data._skipForward` is only set by the extension's own outbound relay (`chrome.runtime.onMessage` → `window.postMessage`), so the page's attacker-controlled object passes through unchanged.
- Therefore `event.data` (and every field, including `openSite.url`) is fully page-controlled.

### 2. Source-to-sink path — intact ✓

The cross-boundary bridge is a real runtime message:

`content_w2g` `chrome.runtime.sendMessage(event.data)` → `sw.98b6defa` `chrome.runtime.onMessage`.

In the background service worker:

```js
chrome.runtime.onMessage.addListener(function(ms

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_w2g.530d247b` [CS_1] @ L190:C0 -> L278:C2
- **Sink**: `CHROME_SESSION_STORAGE` in `sw.98b6defa` [BG_1] @ L209:C16 -> L211:C18
- **Bridge**: message `runtime.single.sender.message[content_w2g.530d247b->sw.98b6defa]`, storage `STORAGE_FLOW[area: session, key: db, sender: sw.98b6defa, receiver: sw.98b6defa]`
- **Severity evidence**: ['https://w2g.tv/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 (STORAGE_POSOING)

### 1. Source controllability — CONFIRMED
The actual chain starts in the content script, which is a raw page→background bridge:

```js
// content_w2g.530d247b.js
window.addEventListener("message", function(event) {
    if (event.origin === window.origin) {
        if (event.data && !event.data._skipForward) chrome.runtime.sendMessage(event.data);
    }
});
```

Any script executing on the matched `https://w2g.tv/*` page can call `window.postMessage({openSite:{url:...}}, "*")`. The `event.origin === window.origin` check is trivially satisfied by a same-origin script (or XSS payload), and `_skipForward` is attacker-chosen (simply omit it). This is attacker/untrusted web content per the harness. The manifest restricts injection to W2G hosts, but that only narrows the surface to XSS on those hosts — the source is still genuinely web-controlled.

### 2. Source→sink path — CONFIRMED
```
page postMessage({openSite:{url}})
  → content_w2g window "message" listener (L164-166)
  → chrome.runtime.sendMessage(event.data)          [HOP: content → background]
  → sw.98b6defa chrome.runtime.onMessage (L190)
  → sender.url.match(allowed_hosts)         

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
