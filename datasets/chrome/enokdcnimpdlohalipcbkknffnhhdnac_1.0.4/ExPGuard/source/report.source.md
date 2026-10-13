# Source-level Taint Flow — enokdcnimpdlohalipcbkknffnhhdnac 1.0.4

- Source type: CRX
- Files with issues: 4 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 17 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(contentscript_host:storageChange))

- **Source**: `TARGET_CUSTOM_EVENT` — `scripts/content` L1:C497 -> L1:C505  `…n n({success:!0}),!0})),document.addEventListener("contentscript_host:storageChange",(e=>{let{eventType:t,key:n,data:o}=»e.detail«;"amconnect"===n&&("removed"===t?chrome.storage.sync.remove(n):chrome.storage.sync.set(o,(()=>{})))}));`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) — `scripts/content` L1:C568 -> L1:C603  `…torageChange",(e=>{let{eventType:t,key:n,data:o}=e.detail;"amconnect"===n&&("removed"===t?chrome.storage.sync.remove(n):»chrome.storage.sync.set(o,(()=>{}))«)}));`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (13 raw steps → 1 distinct lines):
   1. L1 `…ent.dispatchEvent(e)}return n({success:!0}),!0})),document.addEventListener("contentscript_host:storageChange",(e=>{let{»eventType:t,key:n,data:o}=e.detail;"amconnect"===n&&("removed"===t?chrome.storage.sync.remove(n):chrome.storage.sync.set(o«,(()=>{})))}));`  · ELEMENT:member-element, ELEMENT:destructure-property[eventType], ELEMENT:destructure-property[key], ELEMENT:destructure-property[data], ASSIGN:identifier, ASSIGN:binary-right

---
