# Source-level Taint Flow — jpfpinbbmcpbnnohhdhpibfpfoikgjjf 1.4.0

- Source type: CRX
- Files with issues: 6 / 7
- Distinct taint flows: 4  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 12 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_VALUE (customapikey)

- **Source**: `ELEMENT_VALUE` — `options` L3:C56 -> L3:C68  `if (document.getElementById('radioCustom').checked && »customapikey« != '') {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (customapikey) — `options` L5:C4 -> L16:C6 (spans to L16)  `»chrome.storage.sync.set({ customapikey: customapikey }, function() {«`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (8 raw steps → 4 distinct lines):
   1. L3 `if (»document.getElementById('radioCustom').checked && customapikey != ''«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   2. L5 (→L16) `chrome.storage.sync.set({ customapikey: »customapikey }, function() {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L19 `»customapikey« == ''`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L18 (→L19) `»    document.getElementById('radioDefault').checked ||«`  · ASSIGN:logical-right

---

## Flow #2 — ELEMENT_VALUE (customapikey)

- **Source**: `ELEMENT_VALUE` — `options` L3:C56 -> L3:C68  `if (document.getElementById('radioCustom').checked && »customapikey« != '') {`
- **Sink(s)**:
  - `CHROME_SYNC_STORAGE` (customapikey) — `options` L5:C4 -> L16:C6 (spans to L16)  `»chrome.storage.sync.set({ customapikey: customapikey }, function() {«`
- **Sanitized**: NO
- **Frame**: `CS_4`

- **Propagation** (8 raw steps → 4 distinct lines):
   1. L3 _(in `options`)_ `if (»document.getElementById('radioCustom').checked && customapikey != ''«) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-right
   2. L5 (→L16) _(in `options`)_ `chrome.storage.sync.set({ customapikey: »customapikey }, function() {«`  · ASSIGN:identifier, ELEMENT:object.setProperty
   3. L19 _(in `options`)_ `»customapikey« == ''`  · ASSIGN:identifier, ASSIGN:binary-left
   4. L18 (→L19) `»};«`  · ASSIGN:logical-right

---

## Flow #3 — ELEMENT_VALUE (From storage.sync.set('customapikey') in options)  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `service_worker` L51:C0 -> L69:C2 (spans to L69)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L53:C4 -> L57:C5 (spans to L57)  `»fetch(«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (3 raw steps → 2 distinct lines):
   1. L51 (→L69) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[checkbans->service_worker]`
   2. L54 (→L56) `»      `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${«`  · ASSIGN:template-literal

---

## Flow #4 — ELEMENT_VALUE (From storage.sync.set('customapikey') in gcpd730)  ·  2× duplicate paths collapsed

- **Source**: `ELEMENT_VALUE` — `service_worker` L51:C0 -> L69:C2 (spans to L69)  `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service_worker` L53:C4 -> L57:C5 (spans to L57)  `»fetch(«`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (2 raw steps → 2 distinct lines):
   1. L51 (→L69) `»chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[checkbans->service_worker]`
   2. L54 (→L56) `»      `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${«`  · ASSIGN:template-literal

---
