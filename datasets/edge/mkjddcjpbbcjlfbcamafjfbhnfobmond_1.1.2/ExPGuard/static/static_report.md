# ExPAgent Static Verification — mkjddcjpbbcjlfbcamafjfbhnfobmond v1.1.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.994, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `settings-listener` [CS_1] @ L14:C6 -> L14:C21
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L152:C2 -> L156:C4
- **Bridge**: message `runtime.connect.sender.message[settings-listener->background]`
- **Severity evidence**: ['https://*.wishlistr.com/home/']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (STORAGE_POSOING)

### (a) Who controls the source?
The entry point is the content script `settings-listener.js`, which runs on `https://*.wishlistr.com/home/`, `/your-list/`, and `/your-list/settings/`:

```js
window.addEventListener("message", function(event) {
  if (event.source != window || document.location.host.indexOf('wishlistr.com') === -1) {
    return;
  }
  if (event.data.type && (event.data.type == "settings-change")) {
    port.postMessage(event.data);
  }
}, false);
```

A page (or XSS on a matched subdomain) posting a message to *its own* `window` satisfies `event.source === window`, and the host check (`indexOf('wishlistr.com') !== -1`) is trivially satisfied on any matched `*.wishlistr.com` page. `event.data.type` and `event.data.tags` are entirely attacker-chosen. So the source is genuinely page/attacker-controllable. (The harness "codeContext" and `L14:C6` warning look like a minified-text matching artifact; the resolved anchor at line 14 is the real `window.addEventListener("message", ...)` listener, confirmed by raw source.)

### (b) Exact source-to-sink path
1. **settings-listener.js L9-15** — `window message` → `port.postMessage(ev

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `settings-listener` [CS_1] @ L14:C6 -> L14:C21
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L185:C2 -> L185:C46
- **Bridge**: message `runtime.connect.sender.message[settings-listener->background]`
- **Severity evidence**: ['https://*.wishlistr.com/home/']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (STORAGE_POSOING)

### (a) Who controls the source?
The entry poin...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
