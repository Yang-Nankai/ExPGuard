# Source-level Taint Flow — fcblbbbkcneogddmpmfdchnocbpfpmag 0.3.0

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 2  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `worker` L144:C8 -> L144:C15  `if (»request«.cmd === 'keep-awake') {`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (level) — `worker` L176:C6 -> L179:C8 (spans to L179)  `»chrome.storage.local.set({«`
  - `CHROME_LOCAL_STORAGE` (aggressive) — `worker` L176:C6 -> L179:C8 (spans to L179)  `»chrome.storage.local.set({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (45 raw steps → 9 distinct lines):
   1. L144 `if (»request.cmd« === 'keep-awake') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L145 `if (»request['for-minutes']«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L166 `else if (»request.cmd« === 'release-awake') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L146 `schedule(»request['for-minutes']«).then(() => eport.postMessage({`  · ASSIGN:identifier, ELEMENT:member-element
   5. L175 `else if (»request.cmd« === 'set-level') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L177 `level: »request.level«,`  · ASSIGN:identifier, ELEMENT:member-element
   7. L176 (→L179) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   8. L178 `aggressive: »request.aggressive || false«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   9. L185 `else if (»request.cmd« === 'get-values') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left

---

## Flow #2 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (From storage.local.set('level') in worker)  ·  4× duplicate paths collapsed

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `worker` L144:C8 -> L144:C15  `if (»request«.cmd === 'keep-awake') {`
- **Sink(s)**:
  - `CHROME_ACTION_TITLE_OPTIONS` — `worker` L62:C6 -> L64:C8 (spans to L64)  `»chrome.action.setTitle({«`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (58 raw steps → 12 distinct lines):
   1. L144 `if (»request.cmd« === 'keep-awake') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   2. L145 `if (»request['for-minutes']«) {`  · ASSIGN:identifier, ELEMENT:member-element
   3. L166 `else if (»request.cmd« === 'release-awake') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   4. L146 `schedule(»request['for-minutes']«).then(() => eport.postMessage({`  · ASSIGN:identifier, ELEMENT:member-element
   5. L175 `else if (»request.cmd« === 'set-level') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
   6. L177 `level: »request.level«,`  · ASSIGN:identifier, ELEMENT:member-element
   7. L176 (→L179) `»      chrome.storage.local.set({«`  · ELEMENT:object.setProperty
   8. L178 `aggressive: »request.aggressive || false«`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left
   9. L185 `else if (»request.cmd« === 'get-values') {`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left
  10. L21 (→L25) `»    const p1 = await chrome.storage.local.get({«`  · STORAGE:STORAGE_FLOW[area: local, key: level, sender: worker, receiver: worker]
  11. L63 `title: »title.replace('[level]', p1.level).replace«('[timeout]', as[0]?.name.replace('timeout.', ''))`  · MUTATE:string.replace, ELEMENT:member-element-container
  12. L62 (→L64) `»      chrome.action.setTitle({«`  · ELEMENT:object.setProperty

---
