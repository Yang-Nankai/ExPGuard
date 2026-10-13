# ExPAgent Static Verification — lojpdfjjionbhgplcangflkalmiadhfi v1.1.27

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.063, scope=0.108
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'LOW': 2, 'UNKNOWN': 1}

**Assessment:** Verified 3 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 1 uncertain, 1 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / LOW, confidence 0.00)

- **Source**: `JQUERY_ELEMENT_VAL` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Sink**: `CHROME_LOCAL_STORAGE` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNKNOWN`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / LOW, confidence 0.00)

- **Source**: `JQUERY_ELEMENT_VAL` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Sink**: `CHROME_LOCAL_STORAGE` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNKNOWN`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Verification error: Connection error....

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #2 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `data/libs/core` [OPTIONS_1] @ L1:C61 -> L1:C138
- **Sink**: `CHROME_LOCAL_STORAGE` in `data/libs/core` [OPTIONS_1] @ L1:C61 -> L1:C138
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #3 (`JQUERY_ELEMENT_VAL` → `chrome.storage.local.set`)

### Decision ledger

**(a) Who controls the source?**
The source is `$("#languages").val()` in `data/libs/core.js`, executed from the extension's **options page** (`OPTIONS_1` frame). `#languages` is a `<select>` in `options.html` whose `<option>` values are hard-coded language codes (`af`, `sq`, …). `data/options.js` wires the change handler:

```js
document.querySelector("#languages").addEventListener("change", function(){ this.translate.save() }.bind(this))
```

The value is therefore chosen by the **extension user** interacting with the settings UI, from a fixed, hard-coded dropdown. It is not web content, not a message, and not storage-derived.

**(b) Source-to-sink path?**
Direct (no cross-context hop): `save()` reads the selected `<option>` value and writes it via:

```js
chrome.storage.local.set({ tl: $("#languages").val(), vm: $("#view-mode").val() })
```

`crossBoundary` confirms `messagePassing: false` and `storagePassing: false`. There is no bridge from a content script, external message, or webpage.

**(c) Security-relevant argument?**
The stored value (`tl`) does reach the storage argument,

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
