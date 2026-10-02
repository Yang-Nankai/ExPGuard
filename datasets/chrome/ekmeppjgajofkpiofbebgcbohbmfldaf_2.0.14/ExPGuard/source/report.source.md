# Source-level Taint Flow — ekmeppjgajofkpiofbebgcbohbmfldaf 2.0.14

- Source type: CRX
- Files with issues: 4 / 5
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `injected` L940:C6 -> L940:C20  `if (»event.data.cmd« === "iframe-fetch") {`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `injected` L839:C27 -> L839:C51  `const response = await »fetch(url, fetchOptions)«;`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (132 raw steps → 24 distinct lines):
   1. L940 `if (»event.data.cmd« === "iframe-fetch") {`  · ELEMENT:member-element, ASSIGN:binary-left
   2. L941 `iframeFetch(»event.data.data«, event);`  · ELEMENT:member-element
   3. L828 `async function iframeFetch({ »url, options« }, event) {`  · ELEMENT:destructure-property[url], ELEMENT:destructure-property[options]
   4. L836 `} = »options || {}«;`  · ASSIGN:identifier, ASSIGN:logical-left
   5. L830 `»requestId«,`  · ELEMENT:destructure-property[requestId]
   6. L831 `»responseStatus«,`  · ELEMENT:destructure-property[responseStatus]
   7. L832 `»responseOk = true«,`  · ELEMENT:destructure-property[responseOk]
   8. L833 `»responseType = 'text'«,`  · ELEMENT:destructure-property[responseType]
   9. L834 `»stream = false«,`  · ELEMENT:destructure-property[stream]
  10. L839 `const response = await fetch(»url«, fetchOptions);`  · ASSIGN:identifier
  11. L841 (→L842) `if ((»responseOk && !response.ok) ||«`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:logical-right
  12. L842 `(»responseStatus && responseStatus !== response.status«)) {`  · ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
  13. L919 `data: { »requestId«, error: String(error) }`  · ASSIGN:identifier
  14. L917 (→L920) `»    event.source.postMessage({«`  · ELEMENT:object.setProperty
  15. L856 `if (»stream && response.body && response.body.getReader«) {`  · ASSIGN:identifier, ASSIGN:logical-left
  16. L909 `const body = await readBody(response, »responseType«);`  · ASSIGN:identifier
  17. L913 `data: { »requestId«, response: safeResponse, body },`  · ASSIGN:identifier
  18. L911 (→L914) `»    event.source.postMessage({«`  · ELEMENT:object.setProperty
  19. L862 `data: { »requestId«, response: safeResponse },`  · ASSIGN:identifier
  20. L860 (→L863) `»      event.source.postMessage({«`  · ELEMENT:object.setProperty
  21. L871 `data: { »requestId«, response: safeResponse, received },`  · ASSIGN:identifier
  22. L869 (→L872) `»          event.source.postMessage({«`  · ELEMENT:object.setProperty
  23. L882 `»requestId«,`  · ASSIGN:identifier
  24. L879 (→L888) `»        event.source.postMessage({«`  · ELEMENT:object.setProperty

---

## Flow #2 — TARGET_CUSTOM_EVENT (target.addEventListener(OMC))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C70045 -> L1:C70299  `…tTimeout(Ee,2e4)})),»chrome.runtime.onMessage.addListener((function(e,t,n){var r=_e[e.cmd];if(r){var a=r(e.data,t);if(!1===a)return;var o=fun …⟨tainted span: 254 chars⟩… (e)}catch(e){}};return Promise.resolve(a).then((function(e){o({data:e,error:null})}),(function(e){o({error:e})})),!0}}))«,chrome.runtime.onMe…`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `background` L1:C68000 -> L1:C68028  `…rs).forEach((function(t){var r=String(e.headers[t]);n.push({name:t,value:r})}))}return void 0===e.saveAs&&(e.saveAs=!0),»chrome.downloads.download(t)«,!0},Notification:(be=o(c().mark((function e(t,n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:retur…`
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C68748 -> L1:C68795  `…ta:t});case 3:case"end":return e.stop()}}),e)}))),function(e,t){return ye.apply(this,arguments)}),OpenTab:function(e,t){»chrome.tabs.create({url:e.url,active:e.active})«},CheckIfUserScriptsAvailable:(ge=o(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){cas…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (382 raw steps → 1 distinct lines):
   1. L1 `…tion J(){var e=this;»e.storage={values:{},scripts:{},cache:{},require:{}},e.initialized=e.initCache(),e.checkUpdate=e.checkUpdate.bind(e)}J.p …⟨tainted span: 25310 chars⟩… Ie.apply(this,arguments)}().then((function(e){return n({enabled:e})})).catch((function(){return n({enabled:!1})})),!0}))«;var Ce,Ue=(Ce={},fu…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, ELEMENT:member-element-container, ASSIGN:conditional-alternate
      ⇄ cross-context hop: `runtime.single.sender.message[injected->background]`

---
