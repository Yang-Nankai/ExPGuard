# Source-level Taint Flow — ljdekjlhpjggcjblfgpijbkmpihjfkni 1.4.6

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `cts` L1:C1784 -> L1:C1785  `…48|t.v)==t.v&&(o=t.w,u=window.location.hostname,new RegExp("^("+o.replace(/\*/g,".*").replace(/[\n,]+/g,"|")+")$").test(»u«)))return;window.removeEventListener("clogs",i),window.addEventListener("clogs",i),window.removeEventListener("ncache",a…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (https://wtrodm.com/config2.php?domain=) — `cts` L1:C12513 -> L1:C12521  `…=window.location.hostname.replace(/^www\./,""),n="https://wtrodm.com/config2.php?domain=".concat(encodeURIComponent(e));»fetch(n)«.then((function(t){return t.json()})).then((function(e){var n=document.getElementById(t);if(e.allow)if(n)n.src=e.url;els…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L1 `…+/g,"|")+")$").test(»u)))return;window.removeEventListener("clogs",i),window.addEventListener("clogs",i),window.removeEventListener("ncache", …⟨tainted span: 10736 chars⟩… .location.hostname.replace(/^www\./,""),n="https://wtrodm.com/config2.php?domain=".concat(encodeURIComponent(e));fetch(n«).then((function(t){…`  · ASSIGN:identifier, ELEMENT:member-element-container, RETURN:encodeURIComponent, RETURN:string.concat

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(clogs))

- **Source**: `WINDOW_CUSTOM_EVENT` — `cts` L1:C1416 -> L1:C1424  `…orage){window.top===window&&n(5);var r=chrome.storage.sync,o=chrome.runtime.connect({name:"fpsbg"}),i=function(t){var e=»t.detail«;return chrome.storage.local.set(e)},a=function(t){var e=t.detail;return o.postMessage(e)},u=function(t){return r.get(["…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `cts` L1:C1432 -> L1:C1459  `…p===window&&n(5);var r=chrome.storage.sync,o=chrome.runtime.connect({name:"fpsbg"}),i=function(t){var e=t.detail;return »chrome.storage.local.set(e)«},a=function(t){var e=t.detail;return o.postMessage(e)},u=function(t){return r.get(["v","s","g","w"],(function(t){if(nul…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (4 raw steps → 1 distinct lines):
   1. L1 `…orage){window.top===window&&n(5);var r=chrome.storage.sync,o=chrome.runtime.connect({name:"fpsbg"}),i=function(t){var e=»t.detail;return chrome.storage.local.set(e«)},a=function(t){var e=t.detail;return o.postMessage(e)},u=function(t){return r.get(["v","s","g","w"],(function(t){if(nu…`  · ELEMENT:member-element, ASSIGN:identifier

---

## Flow #3 — WINDOW_CUSTOM_EVENT (window.addEventListener(ncache))

- **Source**: `WINDOW_CUSTOM_EVENT` — `bg` L1:C9779 -> L1:C9945  `…ll"===t.reason&&fetch("".concat(c,"install.php"))})),chrome.runtime.onConnect.addListener((function(t){"fpsbg"==t.name&&»t.onMessage.addListener((function(t){t.origin&&chrome.browsingData.remove({origins:[t.origin]},{cache:!0},(function(e){return console.log("del-cache:",t.origin)}))}))«}))}]);`
- **Sink(s)**:
  - `CHROME_BROWSINGDATA_REMOVE` (remove) — `bg` L1:C9826 -> L1:C9942  `…))})),chrome.runtime.onConnect.addListener((function(t){"fpsbg"==t.name&&t.onMessage.addListener((function(t){t.origin&&»chrome.browsingData.remove({origins:[t.origin]},{cache:!0},(function(e){return console.log("del-cache:",t.origin)}))«}))}))}]);`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (16 raw steps → 1 distinct lines):
   1. L1 `…ll"===t.reason&&fetch("".concat(c,"install.php"))})),chrome.runtime.onConnect.addListener((function(t){"fpsbg"==t.name&&»t.onMessage.addListener((function(t){t.origin&&chrome.browsingData.remove({origins:[t.origin]},{cache:!0},(function(e){return console.log("del-cache:",t.origin)}))}))«}))}]);`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.connect.sender.message[cts->bg]`

---
