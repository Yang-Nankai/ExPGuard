# Source-level Taint Flow — hempobbgibapjbnijjmmiifibjlfnifi 1.2.0

- Source type: CRX
- Files with issues: 6 / 12
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/load` L1:C105 -> L1:C106  `((()=>{window['addEventListener']('message',function(b){;if(b['source']!=window)return;const c=b['data'];»c«['action']&&c['action']==='sendProductData'&&(console['log']('Received\x20product\x20data\x20from\x20page\x20context:',c…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (productData) — `js/load` L1:C236 -> L1:C309  `…&&c['action']==='sendProductData'&&(console['log']('Received\x20product\x20data\x20from\x20page\x20context:',c['data']),»chrome['storage']['local']['set']({'productData':c['data']},function(){})«,chrome['runtime']['sendMessage']({'action':'sendProductData','data':c['data']}));},![]);var a=document['createElement']…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (15 raw steps → 1 distinct lines):
   1. L1 `…n;const c=b['data'];»c['action']&&c['action']==='sendProductData'&&(console['log']('Received\x20product\x20data\x20from\x20page\x20context:', …⟨tainted span: 284 chars⟩… ({'productData':c['data']},function(){}),chrome['runtime']['sendMessage']({'action':'sendProductData','data':c['data']})«);},![]);var a=docum…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty

---
