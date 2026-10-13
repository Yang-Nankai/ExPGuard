# Source-level Taint Flow — banchecker@kuzmenko.io 1.5.1

- Source type: XPI
- Files with issues: 6 / 7
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 14 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_VALUE (customapikey)

- **Source**: `ELEMENT_VALUE` — `options` L3:C56 -> L3:C68  `if (document.getElementById('radioCustom').checked && »customapikey« != '') {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (customapikey) — `options` L5:C4 -> L19:C6 (spans to L19)  `»chrome.storage.sync.set({ customapikey: customapikey }, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (8 raw steps → 4 distinct lines):
   1. L3 `if (»document.getElementById('radioCustom').checked && customapikey != ''«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   2. L5 (→L19) `chrome.storage.sync.set({ customapikey: »customapikey }, function () {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L22 `»customapikey« == ''`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L21 (→L22) `»    document.getElementById('radioDefault').checked ||«`  · ASSIGN:logical-right

---

## Flow #2 — ELEMENT_VALUE (customapikey)

- **Source**: `ELEMENT_VALUE` — `options` L3:C56 -> L3:C68  `if (document.getElementById('radioCustom').checked && »customapikey« != '') {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (customapikey) — `options` L5:C4 -> L19:C6 (spans to L19)  `»chrome.storage.sync.set({ customapikey: customapikey }, function () {«`
- **Sanitized**: NO
- **Frame**: `CS_4`

- **Propagation** (8 raw steps → 4 distinct lines):
   1. L3 _(in `options`)_ `if (»document.getElementById('radioCustom').checked && customapikey != ''«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   2. L5 (→L19) _(in `options`)_ `chrome.storage.sync.set({ customapikey: »customapikey }, function () {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L22 _(in `options`)_ `»customapikey« == ''`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L21 (→L22) `»    showCommunityBans = data['showcommunitybans'];«`  · ASSIGN:logical-right

---
