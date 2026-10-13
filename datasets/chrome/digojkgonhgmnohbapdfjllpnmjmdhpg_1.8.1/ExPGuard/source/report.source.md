# Source-level Taint Flow — digojkgonhgmnohbapdfjllpnmjmdhpg 1.8.1

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background-script` L4:C2 -> L26:C4 (spans to L26)  `»port.onMessage.addListener(function(message) {«`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background-script` L72:C4 -> L72:C42  `»chrome.tabs.create({url: payload.url})«;// {url: "http..."}`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (62 raw steps → 11 distinct lines):
   1. L4 (→L26) `»  port.onMessage.addListener(function(message) {«`  · MESSAGE
      ⇄ cross-context hop: `runtime.connect.sender.message[content-script->background-script]`
   2. L5 `if(»message && message.method == 'getNumberTabs'«) {`  · ASSIGN:logical-left
   3. L8 `if(»message && message.method == 'getVersion'«) {`  · ASSIGN:logical-left
   4. L11 `if(»message && message.method == 'getTabs'«) {`  · ASSIGN:logical-left
   5. L14 `if(»message && message.method == 'openTab'«) {`  · ASSIGN:logical-left
   6. L17 `if(»message && message.method == 'refreshTab'«) {`  · ASSIGN:logical-left
   7. L76 `chrome.tabs.refresh(»payload.tab_id«, {bypassCache: false});`  · ASSIGN:identifier, ELEMENT:member-element
   8. L20 `if(»message && message.method == 'closeTab'«) {`  · ASSIGN:logical-left
   9. L23 `if(»message && message.method == 'isExtensionInstalled'«) {`  · ASSIGN:logical-left
  10. L72 `»chrome.tabs.create({url: payload.url})«;// {url: "http..."}`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
  11. L80 `chrome.tabs.remove(»payload.tab_id«);`  · ASSIGN:identifier, ELEMENT:member-element

---
