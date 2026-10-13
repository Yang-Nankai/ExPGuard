# Source-level Taint Flow — jecjpgpgafmabefacgcfggpofndpbdod 10.7

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `SW_JS_ID` L5:C314 -> L5:C315  `…e.addListener((a,d,b)=>{89===a.i&&(h=a.r,b(m))});f.onMessageExternal.addListener((a,d,b)=>{"function"===typeof b&&(34===»a«?.i?v().then(b).catch(b):55===a?.i?(m=d.tab&&d.tab.id,h=1,k({url:"APPS_HTML_ID.html",active:!0,pinned:!0,index:999}).the…`
- **Sink(s)**:
  - `CHROME_MANAGEMENT_SETENABLED_ID` — `SW_JS_ID` L6:C35 -> L6:C44  `u(a.r).then(b).catch(b):233===a?.i?»p(a.r,!0)«.then(b).catch(b):377===a?.i?(self.checkIntegrity||self.importScripts("DIR_JS/INTEGRITY_JS_ID.js"),self.checkIntegrity(a.r,g=>{g?b("prohibited"):p(a.r,!1).then(b).catch(b)})):b():n.get("installed").then(g=>{g.v="10.7";b(g)}).catch(b))})})();`
- **Sanitized**: YES
- **Frame**: `BG_1`

- **Propagation** (70 raw steps → 3 distinct lines):
   1. L5 `…e.addListener((a,d,b)=>{89===a.i&&(h=a.r,b(m))});f.onMessageExternal.addListener((a,d,b)=>{"function"===typeof b&&(34===»a?.i?v().then(b).catch(b):55===a?.i?(m=d.tab&&d.tab.id,h=1,k({url:"APPS_HTML_ID.html",active:!0,pinned:!0,index:999}).then(b).catch(b)):89===a?.i?b(h):a?.r?.match(/[a-z]{32}/)?144===a?.i«?`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:fallback-return
   2. L6 `u(»a.r).then(b).catch(b):233===a?.i?p(a.r,!0).then(b).catch(b):377===a?.i?(self.checkIntegrity||self.importScripts("DIR_JS/INTEGRITY_JS_ID.js"),self.checkIntegrity(a.r«,g=>{g?b("prohibited"):p(a.r,!1).then(b).catch(b)})):b():n.get("installed").then(g=>{g.v="10.7";b(g)}).catch(b))})})();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   3. L4 `a.waitUntil(c)})»;self.addEventListener("activate",a=>a.waitUntil(c));f.onInstalled.addListener(a=>{let d=a&&a.reason,b=Date.now();d===x?(k({url:"https://www.hotcleaner.com/privacy-test-quick-start-guide.html"}).then(c).catch(e),n.set({«installed:b}).then(c).catch(e)):d===y&&"10.7"!==a.previousVersion&&(a=navigator.language||"en",(a.startsWith("en")||a.st…`  · ASSIGN:identifier, ASSIGN:binary-right, INITIAL:Uint8Array.constructor

---

## Flow #2 — CHROME_MANAGEMENT_INFO

- **Source**: `CHROME_MANAGEMENT_INFO` — `SW_JS_ID` L5:C319 -> L5:C339  `…Listener((a,d,b)=>{89===a.i&&(h=a.r,b(m))});f.onMessageExternal.addListener((a,d,b)=>{"function"===typeof b&&(34===a?.i?»v().then(b).catch(b)«:55===a?.i?(m=d.tab&&d.tab.id,h=1,k({url:"APPS_HTML_ID.html",active:!0,pinned:!0,index:999}).then(b).catch(b)):89===a?.i…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `SW_JS_ID` L5:C319 -> L5:C330  `…Listener((a,d,b)=>{89===a.i&&(h=a.r,b(m))});f.onMessageExternal.addListener((a,d,b)=>{"function"===typeof b&&(34===a?.i?»v().then(b)«.catch(b):55===a?.i?(m=d.tab&&d.tab.id,h=1,k({url:"APPS_HTML_ID.html",active:!0,pinned:!0,index:999}).then(b).catch(b)):…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L5 `…Listener((a,d,b)=>{89===a.i&&(h=a.r,b(m))});f.onMessageExternal.addListener((a,d,b)=>{"function"===typeof b&&(34===a?.i?»v().then(b).catch(b)«:55===a?.i?(m=d.tab&&d.tab.id,h=1,k({url:"APPS_HTML_ID.html",active:!0,pinned:!0,index:999}).then(b).catch(b)):89===a?.i…`  · ELEMENT:object.setProperty

---

## Flow #3 — ?

- **Source**: `?` — _(unresolved)_
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `SW_JS_ID` L6:C0 -> L6:C14  `»u(a.r).then(b)«.catch(b):233===a?.i?p(a.r,!0).then(b).catch(b):377===a?.i?(self.checkIntegrity||self.importScripts("DIR_JS/INTEGRITY_JS_ID.js"),self.checkIntegrity(a.r,g=>{g?b("prohibited"):p(a.r,!1).then(b).catch(b)})):b():n.get("installed").then(g=>{g.v="10.7";b(g)}).catch(b))})})();`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (0 raw steps → 0 distinct lines):

---
