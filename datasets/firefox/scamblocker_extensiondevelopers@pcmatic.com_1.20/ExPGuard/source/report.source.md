# Source-level Taint Flow — scamblocker_extensiondevelopers@pcmatic.com 1.20

- Source type: XPI
- Files with issues: 4 / 4
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(contentEvent))

- **Source**: `TARGET_CUSTOM_EVENT` — `service-worker` L8:C0 -> L39:C2 (spans to L39)  `»brow.onMessage.addListener((message, sender, sendResponse) =>  {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L20:C31 -> L26:C11 (spans to L26)  `const response = await »fetch(message.url, {«`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (28 raw steps → 7 distinct lines):
   1. L8 (→L39) `»brow.onMessage.addListener((message, sender, sendResponse) =>  {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[override->service-worker]`
   2. L9 `if (»message.callingFunc« === 'isMalicious') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   3. L35 `sw_blockingPost(»message«);`  · ASSIGN:identifier
   4. L16 `for (const [key, value] of Object.entries(»message.form«)) {`  · ASSIGN:identifier, ELEMENT:member-element
   5. L20 `const response = await fetch(»message.url«, {`  · ASSIGN:identifier, ELEMENT:member-element
   6. L28 `»message«.data = data;`  · ASSIGN:identifier
   7. L29 `sendResponse(»message«);`  · ASSIGN:identifier

---

## Flow #2 — ELEMENT_VALUE (whitelist)

- **Source**: `ELEMENT_VALUE` — `settings/options` L12:C31 -> L12:C40  `await LS.setItem("whitelist",»whitelist«);`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (whitelist) — `settings/options` L5:C25 -> L5:C63  `setItem: (key, val) => »chrome.storage.local.set({[key]: val})«,`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L12 `await LS.setItem("whitelist",»whitelist«);`  · ASSIGN:identifier
   2. L5 `setItem: (key, val) => chrome.storage.local.set({[key]: »val«}),`  · ASSIGN:identifier

---
