# ExPAgent Static Verification — hijhdcajmgppagiofmdeemecamdebamn v0.1.8

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.98, scope=1
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `src/sw` [BG_1] @ L159:C8 -> L159:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `src/sw` [BG_1] @ L183:C12 -> L183:C114
- **Severity evidence**: ['https://*.amazon.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener` in `src/sw.js` (background service worker). The message object (`message.event`, `message.timeSaved`, etc.) is fully attacker-chosen. The only access control is the manifest's `externally_connectable.matches`:
- `https://*.amazon.com/*`, `https://*.june07.com/*`, `http://127.0.0.1:8080/*`

There is **no** `sender.id` / `sender.origin` / `sender.url` check anywhere in `src/sw.js` (confirmed by search: `sender.(id|origin|url)` → NO MATCHES). So a page on any matched origin (or any page that can execute script on such an origin, e.g. via XSS, or a wildcard subdomain) can drive the source directly.

### (b) Source-to-sink path
1. L158 `chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {...})`
2. L176 gate: `else if (message.event === 'adAvoided')` — the gate is an **attacker-chosen field** (`message.event`), trivially satisfiable by sending `event: 'adAvoided'`.
3. L178 reads existing `timeSaved` from storage.
4. L183 writes back: `chrome.storage.local.set({ timeSaved: timeSaved ? timeSaved + message.timeSaved : message.timeSaved })`

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
