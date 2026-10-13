# Source-level Taint Flow — chgajipdilbjolpgafadpdggjaeeapic 1.15.1

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 1  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 41 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(certisigner-repoGenarateCsr-buffer))

- **Source**: `TARGET_CUSTOM_EVENT` — `extended` L66:C6 -> L66:C18  `if (»event.detail«.repository){`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (repository) — `extended` L67:C4 -> L67:C69  `»chrome.storage.local.set({'repository': event.detail.repository})«;`
  - `CHROME_LOCAL_STORAGE` (provider) — `extended` L68:C3 -> L68:C64  `»chrome.storage.local.set({'provider': event.detail.provider})«;`
  - `CHROME_LOCAL_STORAGE` (alias) — `extended` L69:C3 -> L69:C58  `»chrome.storage.local.set({'alias': event.detail.alias})«;`
  - `CHROME_LOCAL_STORAGE` (hash) — `extended` L70:C3 -> L70:C56  `»chrome.storage.local.set({'hash': event.detail.hash})«;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (16 raw steps → 5 distinct lines):
   1. L66 `if (»event.detail.repository«){`  · ELEMENT:member-element
   2. L67 `»chrome.storage.local.set({'repository': event.detail.repository})«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   3. L68 `»chrome.storage.local.set({'provider': event.detail.provider})«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   4. L69 `»chrome.storage.local.set({'alias': event.detail.alias})«;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   5. L70 `»chrome.storage.local.set({'hash': event.detail.hash})«;`  · ELEMENT:member-element, ELEMENT:object.setProperty

---

