# ExPAgent Static Verification — mjibalopcdabokfdbnbngbimajfbpmii v1.0.71

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.011, scope=0.011
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L50:C6 -> L50:C13
- **Sink**: `CHROME_LOCAL_STORAGE` in `scripts/background` [BG_1] @ L54:C4 -> L54:C39
- **Severity evidence**: ['https://*.psychological.ai/dashboard/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `attacker-input-storage-write` (STORAGE_POISONING)

### 1. Who controls the source?

The source is `chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => ...)` at `scripts/background.js:49`. The `request` object is an **external message** delivered by the browser from any page origin listed in `externally_connectable`:

- `https://*.psychological.ai/dashboard/*`
- `https://*.100worte.de/dashboard/*`
- `http://localhost:3000/dashboard/*`

There is **no** `sender.id` check, no `sender.origin`/`sender.url` check, and no action/value allow-list. The only boundary is the manifest's `externally_connectable` origin list, which (per the deterministic harness) narrows scope but is not a browser-authenticated sender boundary. Any JavaScript executing on those origins — including via XSS on `psychological.ai`/`100worte.de`, a wildcard-subdomain page, or a local service on `localhost:3000` — can invoke this listener and fully control `request`.

### 2. Exact source-to-sink path

Confirmed from the real source (`scripts/background.js:49-55`):

```js
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  if (reques

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L50:C6 -> L50:C13
- **Sink**: `CHROME_LOCAL_STORAGE` in `scripts/background` [BG_1] @ L55:C4 -> L55:C38
- **Severity evidence**: ['https://*.psychological.ai/dashboard/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `attacker-input-storage-write` (STORAGE_POISONING)

### 1. Who con...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
