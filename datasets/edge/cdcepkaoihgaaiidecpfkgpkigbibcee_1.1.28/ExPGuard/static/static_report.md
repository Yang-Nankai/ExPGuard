# ExPAgent Static Verification — cdcepkaoihgaaiidecpfkgpkigbibcee v1.1.28

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.061, scope=0.106
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'LOW': 2}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Sink**: `CHROME_LOCAL_STORAGE` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNKNOWN`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The tainted span is `$("#languages").val()` — the value of a `<select>` element on the extension's **options page** (`options.html`). The element is populated with a fixed, hardcoded list of `<option>` values (e.g. `af`, `sq`, …). This value is chosen by the **extension user** via the options UI, not by web content.

The report's frame label (`BG_1`, file `data/bg`) is a misattribution: the actual code lives in `data/libs/core.js:1` (`class Translation{ ... save(){ chrome.storage.local.set({tl:$("#languages").val(), vm:$("#view-mode").val()}) ... }`), and it is instantiated/called from `data/options.js` in response to the options page's `change` event:

```js
document.querySelector("#languages").addEventListener("change", function(){ this.translate.save() }.bind(this))
document.querySelector("#view-mode").addEventListener("change", function(){ this.translate.save() }.bind(this))
```

`data/options.js` has no `onMessage`/`postMessage`/`connect` listener, no content-script bridge, and `externally_connectable` is absent (not externally connectable). There is no cross-boundary transport (`messagePassing: false`, `storagePassing

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `JQUERY_ELEMENT_VAL` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Sink**: `CHROME_LOCAL_STORAGE` in `data/bg` [BG_1] @ L1:C570 -> L1:C647
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNKNOWN`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The tainted span is `$("#languages...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
