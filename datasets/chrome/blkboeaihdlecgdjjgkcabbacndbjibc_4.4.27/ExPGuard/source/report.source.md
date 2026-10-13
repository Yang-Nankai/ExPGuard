# Source-level Taint Flow — blkboeaihdlecgdjjgkcabbacndbjibc 4.4.27

- Source type: CRX
- Files with issues: 7 / 15
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `scripts/shell` L1:C1130 -> L1:C1144  `…ForCommands:function(n){if(n.origin===dsCommon.docusignDomainOrigin&&"object"==typeof n.data&&"command"in n.data)switch(»n.data.command«){case"shell - open url in chrome":dsShell.openUrlInChrome(dsCommon.docusignDomain+n.data.url);break;case"shell - open e…`
- **Sink(s)**:
  - `CHROME_ACTION_BADGE_OPTIONS` — `scripts/common` L1:C3823 -> L1:C3859  `…),e.data("hidden")?e.hide():e.show()},setBadgeText:function(e){chrome.action.setBadgeBackgroundColor({color:"#e04f55"}),»chrome.action.setBadgeText({text:e})«},createContextMenuEntries:function(e,t){var n=chrome.contextMenus.create({title:chrome.i18n.getMessage("chromeMenuSign"…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `scripts/common` L1:C5694 -> L1:C5702  `…in e.data&&"common - show in-flow rating prompt"===e.data.command&&n(e.data.source,!0)},!1)},downloadFile:function(e,t){»fetch(e)«.then(function(e){return e.blob()}).then(function(e){var n=new FileReader;n.onloadend=function(){var e=btoa(n.result);t(…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (36 raw steps → 1 distinct lines):
   1. L1 _(in `scripts/common`)_ `…o&&$(".b-modal").cli»ck()})):0===n?fetch(dsCommon.docusignDomain+"/chromeext/inflow-rating-counter",{method:"POST",headers:{"Content-Type":"a …⟨tainted span: 4862 chars⟩… ta&&"common - show in-flow rating prompt"===e.data.command&&n(e.data.source,!0)},!1)},downloadFile:function(e,t){fetch(e«).then(function(e){r…`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:object.setProperty, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[scripts/background->scripts/shell]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `scripts/background` L1:C1754 -> L1:C2827  `…romeext/uninstall"),»chrome.runtime.onMessage.addListener(function(t,e,o){if("object"==typeof t&&"command"in t)switch(t.command){case"social  …⟨tainted span: 1073 chars⟩… },o(e)}).catch(function(e){o({command:"landing - retrieve file from given url - error",html:e.responseText})})})}),!0}})«,chrome.runtime.onCo…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `scripts/background` L1:C2247 -> L1:C2401  `…docusignDomain+"/csrf-token").then(function(e){return e.json()}).then(function(e){return e.csrfToken}).then(function(e){»fetch(dsCommon.docusignDomain+"/chromeext/attachment",{method:"POST",headers:{"Content-Type":"application/json","x-csrf-token":e},body:JSON.stringify(n)})«.then(function(e){return e.text()}).then(function(e){e="log out user"===e?{command:"landing - retrieve file from given u…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (17 raw steps → 1 distinct lines):
   1. L1 `…romeext/uninstall"),»chrome.runtime.onMessage.addListener(function(t,e,o){if("object"==typeof t&&"command"in t)switch(t.command){case"social  …⟨tainted span: 1073 chars⟩… },o(e)}).catch(function(e){o({command:"landing - retrieve file from given url - error",html:e.responseText})})})}),!0}})«,chrome.runtime.onCo…`  · MESSAGE, ELEMENT:member-element, ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:conditional-alternate
      ⇄ cross-context hop: `runtime.single.sender.message[scripts/shell->scripts/background]`

---
