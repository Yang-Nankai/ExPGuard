# ExPAgent Static Verification — kpcdbiholadphpbimkgckhggglklemib v1.0.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.064, scope=0.108
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'LOW': 2, 'UNKNOWN': 1}

**Assessment:** Verified 3 flow(s): 0 true-positive, 2 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `js/background` [BG_1] @ L1:C584 -> L1:C661
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/background` [BG_1] @ L1:C584 -> L1:C661
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNKNOWN`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — storage write from `$("#languages").val()` / `$("#view-mode").val()`

### 1. Who controls the source?
Not a web attacker. The tainted "source" is `JQUERY_ELEMENT_VAL` reading two `<select>` elements:

- `#languages` in `settings.html` (lines 59–…) — a `<select>` whose options are **hardcoded** language codes (`af`, `sq`, `ar`, …).
- `#view-mode` in `settings.html` (line 130) — an empty `<select>` populated by `Translation.loadSupportedViewModes()` with a **fixed two-entry object** `{ont: ..., ognt: ...}` via `populateSelect`.

The values are chosen by the **extension user** on the extension's own options page. There is no content-script, external-message, or untrusted-storage provenance (`provenance: UNKNOWN`), and per the evaluation rules, popup/options `ELEMENT_VALUE` is extension-user input unless that provenance says otherwise.

### 2. Exact source-to-sink path
`js/settings.js` (loaded by `settings.html`):

```js
document.querySelector("#languages").addEventListener("change", ... this.translate.save() ...)
document.querySelector("#view-mode").addEventListener("change", ... this.translate.save() ...)
```

`js/core.js` `Translation.save()`:

```js
chrome.st

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `js/background` [BG_1] @ L1:C584 -> L1:C661
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/background` [BG_1] @ L1:C584 -> L1:C661
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNKNOWN`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow Verification — storage write from `$("#languages").val()` / `$("#view-mode").val()`

...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #2 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `js/core` [OPTIONS_1] @ L1:C61 -> L1:C138
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/core` [OPTIONS_1] @ L1:C61 -> L1:C138
- **ExPGuard disposition**: `SOURCE_REPORT_ONLY`
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 1, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (JQUERY_ELEMENT_VAL → CHROME_LOCAL_STORAGE)

### (a) Who controls the source?
The source is `$("#languages").val()` in `js/core.js`, executed in the **OPTIONS** frame (`settings.html`, an extension page at `chrome-extension://<id>/settings.html`).

`js/settings.js` shows how this runs:

```js
document.querySelector("#languages").addEventListener("change",function(){this.translate.save()}.bind(this))
document.querySelector("#view-mode").addEventListener("change",function(){this.translate.save()}.bind(this))
```

`save()` is triggered by the extension user changing the `#languages` / `#view-mode` dropdowns on the extension's **own options page**. The `#languages` element is populated from a hardcoded, extension-controlled list of supported locales (see `supportedLocale()` in `js/core.js`), and its value is whatever the *extension user* selects — not web content.

No message listener, `runtime.onMessage`, `postMessage`, or external bridge writes to `#languages`. A search across the whole extension found the only message listener is in the content script `js/translate.js` (`"translate" == e.action`), which is unrelated to this storage write.

### (b) Source-t

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
