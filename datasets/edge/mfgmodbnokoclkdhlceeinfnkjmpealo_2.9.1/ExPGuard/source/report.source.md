# Source-level Taint Flow — mfgmodbnokoclkdhlceeinfnkjmpealo 2.9.1

- Source type: CRX
- Files with issues: 4 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 12 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C1053 -> L1:C1528  `…orage.removeItem(r)}»$browser.runtime.onMessage.addListener(((e,r,o)=>{if(e.type===RequestType.ACTIVATE){const{clientId:r,secretKey:t,baseUrl …⟨tainted span: 475 chars⟩… _URL]).then((({clientId:e,secretKey:r,baseUrl:t})=>{o(e&&r&&t?ResponseType.ACTIVATED:ResponseType.UN_ACTIVATED)})),!0}))«,$browser.runtime.on…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (clientId) — `background` L1:C1195 -> L1:C1257  `…sage.addListener(((e,r,o)=>{if(e.type===RequestType.ACTIVATE){const{clientId:r,secretKey:t,baseUrl:s}=e.payload;r&&t&&s?»$browser.storage.local.set({clientId:r,secretKey:t,baseUrl:s})«.then((()=>{o({ok:!0})})):o({ok:!1})}return e.type===RequestType.GET_STATUS&&$browser.storage.local.get([Config.CLIENT_I…`
  - `CHROME_LOCAL_STORAGE` (secretKey) — `background` L1:C1195 -> L1:C1257  `…sage.addListener(((e,r,o)=>{if(e.type===RequestType.ACTIVATE){const{clientId:r,secretKey:t,baseUrl:s}=e.payload;r&&t&&s?»$browser.storage.local.set({clientId:r,secretKey:t,baseUrl:s})«.then((()=>{o({ok:!0})})):o({ok:!1})}return e.type===RequestType.GET_STATUS&&$browser.storage.local.get([Config.CLIENT_I…`
  - `CHROME_LOCAL_STORAGE` (baseUrl) — `background` L1:C1195 -> L1:C1257  `…sage.addListener(((e,r,o)=>{if(e.type===RequestType.ACTIVATE){const{clientId:r,secretKey:t,baseUrl:s}=e.payload;r&&t&&s?»$browser.storage.local.set({clientId:r,secretKey:t,baseUrl:s})«.then((()=>{o({ok:!0})})):o({ok:!1})}return e.type===RequestType.GET_STATUS&&$browser.storage.local.get([Config.CLIENT_I…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L1 `…orage.removeItem(r)}»$browser.runtime.onMessage.addListener(((e,r,o)=>{if(e.type===RequestType.ACTIVATE){const{clientId:r,secretKey:t,baseUrl …⟨tainted span: 475 chars⟩… _URL]).then((({clientId:e,secretKey:r,baseUrl:t})=>{o(e&&r&&t?ResponseType.ACTIVATED:ResponseType.UN_ACTIVATED)})),!0}))«,$browser.runtime.on…`  · MESSAGE, ELEMENT:destructure-property[clientId], ELEMENT:destructure-property[secretKey], ELEMENT:destructure-property[baseUrl], ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[content-script->background]`

---
