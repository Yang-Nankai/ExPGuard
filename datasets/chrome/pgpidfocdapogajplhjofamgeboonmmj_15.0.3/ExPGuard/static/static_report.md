# ExPAgent Static Verification — pgpidfocdapogajplhjofamgeboonmmj v15.0.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 4
- Coverage: node=0.711, scope=0.692
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 4 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 3 duplicate; 4 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `ELEMENT_VALUE` in `ptt.bundle` [CS_1] @ L11:C785 -> L11:C786
- **Sink**: `CHROME_LOCAL_STORAGE` in `ptt.bundle` [CS_1] @ L11:C787 -> L11:C829
- **Severity evidence**: ['https://*.zoom.us/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification Ledger

**(a) Who controls the source?**
`document.getElementsByName(moduleag[12])[1].value` — a DOM input element's value, read inside the content script `ptt.bundle.js` running on the matched pages. The content script does not create this element; it attaches handlers to *existing page DOM* elements (`getElementsByClassName(moduleag[9])`, `getElementsByName(moduleag[11])`, `getElementsByName(moduleag[12])`). Content scripts share the DOM with the page (isolated world affects JS globals, not DOM), so the host page's own scripts — or XSS on the host page — control the element's `value`. Provenance is `CONTENT_SCRIPT`, which per the harness is treated as web taint. The source is genuinely web-content-controllable. ✔

**(b) Source-to-sink path**
Unbroken, single-frame, no bridge hop:
`document.getElementsByName(moduleag[12])[1].value` → `var e = ...` → `t.PAX = e` → `chrome.storage.local.set(t, ...)`.
The propagation evidence (L11, `ASSIGN:identifier, ELEMENT:object.setProperty`) matches the raw source exactly. ✔

**(c) Security-relevant sink argument**
The tainted value is stored verbatim as the `PAX` key of `chrome.storage.local`. It is the *stored value* itself, no

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `ELEMENT_VALUE` in `ptt.bundle` [CS_1] @ L11:C1200 -> L11:C1201
- **Sink**: `CHROME_LOCAL_STORAGE` in `ptt.bundle` [CS_1] @ L11:C1202 -> L11:C1244
- **Severity evidence**: ['https://*.zoom.us/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: ## Verification Ledger

**(a) Who controls the source?**
`document.getElementsByName(moduleag[12])[1].value` — a DOM input element's value, ...

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #2 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `ELEMENT_VALUE` in `ptt.bundle` [CS_1] @ L11:C1485 -> L11:C1486
- **Sink**: `CHROME_LOCAL_STORAGE` in `ptt.bundle` [CS_1] @ L11:C1494 -> L11:C1536
- **Severity evidence**: ['https://*.zoom.us/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: ## Verification Ledger

**(a) Who controls the source?**
`document.getElementsByName(moduleag[12])[1].value` — a DOM input element's value, ...

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #3 — ⚪ DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `ELEMENT_VALUE` in `ptt.bundle` [CS_1] @ L11:C1492 -> L11:C1493
- **Sink**: `CHROME_LOCAL_STORAGE` in `ptt.bundle` [CS_1] @ L11:C1494 -> L11:C1536
- **Severity evidence**: ['https://*.zoom.us/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; preserved analyst notes: ## Verification Ledger

**(a) Who controls the source?**
`document.getElementsByName(moduleag[12])[1].value` — a DOM input element's value, ...

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
