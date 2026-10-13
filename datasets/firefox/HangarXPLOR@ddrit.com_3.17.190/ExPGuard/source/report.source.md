# Source-level Taint Flow — HangarXPLOR@ddrit.com 3.17.190

- Source type: XPI
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content_scripts/loader` L78:C9 -> L78:C24  `if ((»event.data.type« || false) == false) return;`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L82:C102 -> L82:C216  `case 'storage.sync.get.request': chrome.storage.sync.get(event.data.payload, function(result) { »window.postMessage({ type: "storage.get.response", callbackIndex: event.data.callbackIndex, result: result }, "*")« }); break;`
  - `CHROME_SYNC_STORAGE` (storage.fuzzy.settings) — `content_scripts/loader` L83:C39 -> L83:C197  `case 'storage.sync.set.request': »chrome.storage.sync.set(event.data.payload, function() { window.postMessage({ type: "storage.set.response", callbackIndex: event.data.callbackIndex }, "*") })«; break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L83:C96 -> L83:C194  `case 'storage.sync.set.request': chrome.storage.sync.set(event.data.payload, function() { »window.postMessage({ type: "storage.set.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L87:C104 -> L87:C218  `case 'storage.local.get.request': chrome.storage.local.get(event.data.payload, function(result) { »window.postMessage({ type: "storage.get.response", callbackIndex: event.data.callbackIndex, result: result }, "*")« }); break;`
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content_scripts/loader` L88:C40 -> L88:C199  `case 'storage.local.set.request': »chrome.storage.local.set(event.data.payload, function() { window.postMessage({ type: "storage.set.response", callbackIndex: event.data.callbackIndex }, "*") })«; break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L88:C98 -> L88:C196  `case 'storage.local.set.request': chrome.storage.local.set(event.data.payload, function() { »window.postMessage({ type: "storage.set.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L84:C102 -> L84:C203  `case 'storage.sync.remove.request': chrome.storage.sync.remove(event.data.payload, function() { »window.postMessage({ type: "storage.remove.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L85:C80 -> L85:C180  `case 'storage.sync.clear.request': chrome.storage.sync.clear(function() { »window.postMessage({ type: "storage.clear.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L89:C104 -> L89:C205  `case 'storage.local.remove.request': chrome.storage.local.remove(event.data.payload, function() { »window.postMessage({ type: "storage.remove.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`
  - `WINDOW_POSTMESSAGE` (*) — `content_scripts/loader` L90:C82 -> L90:C182  `case 'storage.local.clear.request': chrome.storage.local.clear(function() { »window.postMessage({ type: "storage.clear.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (98 raw steps → 10 distinct lines):
   1. L78 `if ((»event.data.type || false«) == false) return;`  · ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:binary-left
   2. L80 `switch (»event.data.type«)`  · ELEMENT:member-element
   3. L82 `case 'storage.sync.get.request': chrome.storage.sync.get(»event.data.payload, function(result) { window.postMessage({ type: "storage.get.response", callbackIndex: event.data.callbackIndex, result: result }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   4. L83 `case 'storage.sync.set.request': chrome.storage.sync.set(»event.data.payload, function() { window.postMessage({ type: "storage.set.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   5. L84 `case 'storage.sync.remove.request': chrome.storage.sync.remove(»event.data.payload, function() { window.postMessage({ type: "storage.remove.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   6. L87 `case 'storage.local.get.request': chrome.storage.local.get(»event.data.payload, function(result) { window.postMessage({ type: "storage.get.response", callbackIndex: event.data.callbackIndex, result: result }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   7. L88 `case 'storage.local.set.request': chrome.storage.local.set(»event.data.payload, function() { window.postMessage({ type: "storage.set.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   8. L89 `case 'storage.local.remove.request': chrome.storage.local.remove(»event.data.payload, function() { window.postMessage({ type: "storage.remove.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
   9. L85 `case 'storage.sync.clear.request': chrome.storage.sync.clear(function() { »window.postMessage({ type: "storage.clear.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty
  10. L90 `case 'storage.local.clear.request': chrome.storage.local.clear(function() { »window.postMessage({ type: "storage.clear.response", callbackIndex: event.data.callbackIndex }, "*")« }); break;`  · ELEMENT:member-element, ELEMENT:object.setProperty

---
