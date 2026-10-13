# ExPAgent Static Verification — chgajipdilbjolpgafadpdggjaeeapic v1.15.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.982, scope=1
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 4 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 3 duplicate; 4 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended` [CS_1] @ L66:C6 -> L66:C18
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended` [CS_1] @ L67:C4 -> L67:C69
- **Severity evidence**: ['https://*.certisign.com.br/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 16, 'distinctLines': 5, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (TARGET_CUSTOM_EVENT → CHROME_LOCAL_STORAGE)

### 1. Who controls the source?
**Attacker/page-controlled.** The source is `event.detail` of a DOM `CustomEvent` named `certisigner-repoGenarateCsr-buffer`. The content script registers the listener directly on `document` (`extended.js:65`). DOM events are shared across the page and the content script's isolated world, and a page on any matched origin can dispatch:

```js
document.dispatchEvent(new CustomEvent('certisigner-repoGenarateCsr-buffer', {
  detail: { repository: '...', provider: '...', alias: '...', hash: '...' }
}));
```

There is no `event.source`, `event.origin`, or sender check — none is possible/needed here, since the page itself is the dispatcher. This is a classic PAGE_TO_CONTENT_SCRIPT bridge, exactly as the harness models.

### 2. Source-to-sink path
Unbroken, same-frame data flow in `extended.js:65-70`:

1. `document.addEventListener('certisigner-repoGenarateCsr-buffer', fn)` (L65) — confirmed registered, not dead code.
2. `if (event.detail.repository){` (L66) — tainted detail read.
3. `chrome.storage.local.set({'repository': event.detail.repository});` (L67) — tainted value stored.
4. `ch

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended` [CS_1] @ L66:C6 -> L66:C18
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended` [CS_1] @ L68:C3 -> L68:C64
- **Severity evidence**: ['https://*.certisign.com.br/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 16, 'distinctLines': 5, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (TARGET_CUSTOM_EVENT → CHROME_LOCAL_STORAGE)

### 1. Who controls t...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended` [CS_1] @ L66:C6 -> L66:C18
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended` [CS_1] @ L69:C3 -> L69:C58
- **Severity evidence**: ['https://*.certisign.com.br/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 16, 'distinctLines': 5, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (TARGET_CUSTOM_EVENT → CHROME_LOCAL_STORAGE)

### 1. Who controls t...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `extended` [CS_1] @ L66:C6 -> L66:C18
- **Sink**: `CHROME_LOCAL_STORAGE` in `extended` [CS_1] @ L70:C3 -> L70:C56
- **Severity evidence**: ['https://*.certisign.com.br/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 16, 'distinctLines': 5, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (TARGET_CUSTOM_EVENT → CHROME_LOCAL_STORAGE)

### 1. Who controls t...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
