# Source-level Taint Flow — dmpojjilddefgnhiicjcmhbkjgbbclob 2.0.0

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 8 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(OMC))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C66571 -> L1:C66825  `…tTimeout(xe,2e4)})),»chrome.runtime.onMessage.addListener((function(e,t,n){var r=Se[e.cmd];if(r){var o=r(e.data,t);if(!1===o)return;var a=fun …⟨tainted span: 254 chars⟩… (e)}catch(e){}};return Promise.resolve(o).then((function(e){a({data:e,error:null})}),(function(e){a({error:e})})),!0}}))«;var je,Ee=(je={},fu…`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `background` L1:C65101 -> L1:C65129  `…rs).forEach((function(t){var r=String(e.headers[t]);n.push({name:t,value:r})}))}return void 0===e.saveAs&&(e.saveAs=!0),»chrome.downloads.download(t)«,!0},Notification:(he=a(s().mark((function e(t,n){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:retur…`
  - `CHROME_TABS_CREATE_OPTIONS` — `background` L1:C65849 -> L1:C65896  `…ta:t});case 3:case"end":return e.stop()}}),e)}))),function(e,t){return me.apply(this,arguments)}),OpenTab:function(e,t){»chrome.tabs.create({url:e.url,active:e.active})«},CheckIfUserScriptsAvailable:(de=a(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){cas…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (194 raw steps → 1 distinct lines):
   1. L1 `…tion J(){var e=this;»e.storage={values:{},scripts:{},cache:{},require:{}},e.initialized=e.initCache(),e.checkUpdate=e.checkUpdate.bind(e)}J.p …⟨tainted span: 21609 chars⟩… (e)}catch(e){}};return Promise.resolve(o).then((function(e){a({data:e,error:null})}),(function(e){a({error:e})})),!0}}))«;var je,Ee=(je={},fu…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, ELEMENT:member-element-container, ASSIGN:conditional-alternate
      ⇄ cross-context hop: `runtime.single.sender.message[injected->background]`

---
