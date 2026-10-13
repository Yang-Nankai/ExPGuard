# Source-level Taint Flow — lojpdfjjionbhgplcangflkalmiadhfi 1.1.27

- Source type: CRX
- Files with issues: 3 / 7
- Distinct taint flows: 4  (collapsed from 4 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — JQUERY_ELEMENT_VAL (#languages)

- **Source**: `JQUERY_ELEMENT_VAL` — `data/bg` L1:C570 -> L1:C647  `…ction(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}class t{constructor(){this.Utils=new e}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (tl) — `data/bg` L1:C570 -> L1:C647  `…ction(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}class t{constructor(){this.Utils=new e}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…ction(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}class t{constructor(){this.Utils=new e}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`  · ELEMENT:object.setProperty

---

## Flow #2 — JQUERY_ELEMENT_VAL (#view-mode)

- **Source**: `JQUERY_ELEMENT_VAL` — `data/bg` L1:C570 -> L1:C647  `…ction(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}class t{constructor(){this.Utils=new e}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (vm) — `data/bg` L1:C570 -> L1:C647  `…ction(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}class t{constructor(){this.Utils=new e}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…ction(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)}))}}class t{constructor(){this.Utils=new e}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`  · ELEMENT:object.setProperty

---

## Flow #3 — JQUERY_ELEMENT_VAL (#languages)

- **Source**: `JQUERY_ELEMENT_VAL` — `data/libs/core` L1:C61 -> L1:C138  `class Translation{constructor(){this.Utils=new Config}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (tl) — `data/libs/core` L1:C61 -> L1:C138  `class Translation{constructor(){this.Utils=new Config}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `class Translation{constructor(){this.Utils=new Config}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`  · ELEMENT:object.setProperty

---

## Flow #4 — JQUERY_ELEMENT_VAL (#view-mode)

- **Source**: `JQUERY_ELEMENT_VAL` — `data/libs/core` L1:C61 -> L1:C138  `class Translation{constructor(){this.Utils=new Config}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (vm) — `data/libs/core` L1:C61 -> L1:C138  `class Translation{constructor(){this.Utils=new Config}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `class Translation{constructor(){this.Utils=new Config}save(){»chrome.storage.local.set({tl:$("#languages").val(),vm:$("#view-mode").val()})«,$("#notification").attr("class","notification is-warning"),$("#message").html(chrome.i18n.getMessage("automatic_save"))…`  · ELEMENT:object.setProperty

---
