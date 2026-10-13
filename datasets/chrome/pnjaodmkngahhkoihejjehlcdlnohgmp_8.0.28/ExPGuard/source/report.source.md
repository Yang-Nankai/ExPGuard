# Source-level Taint Flow — pnjaodmkngahhkoihejjehlcdlnohgmp 8.0.28

- Source type: CRX
- Files with issues: 3 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `mv3` L2:C176610 -> L2:C177377  `…mail:s.email}})})(),»e.onMessage.addListener((async t=>{const s=Mr();switch(t.type){case"api:request":await async function(e,t){(s=>{try{e.po …⟨tainted span: 767 chars⟩… getSyncStatus:response",data:{requestId:t.data.requestId,syncState:r}});break;case"postQueue:update":Ys=t.data.posts}}))«,e.onDisconnect.addL…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `mv3` L2:C116749 -> L2:C116870  `…;for(const e in this.headers)Object.prototype.hasOwnProperty.call(this.headers,e)&&(r[e]=this.headers[e]);const a=await »fetch(s,{credentials:"include",method:this.params.method,headers:r,body:this.makeParams(e.post,this.params.contentType)})«,n=await a.text(),i=new ys(n,a.status,a.url);if(a.status>=200&&a.status<499)return i;throw new ms(`Request failed ${a.st…`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `mv3` L2:C116749 -> L2:C116870  `…;for(const e in this.headers)Object.prototype.hasOwnProperty.call(this.headers,e)&&(r[e]=this.headers[e]);const a=await »fetch(s,{credentials:"include",method:this.params.method,headers:r,body:this.makeParams(e.post,this.params.contentType)})«,n=await a.text(),i=new ys(n,a.status,a.url);if(a.status>=200&&a.status<499)return i;throw new ms(`Request failed ${a.st…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (513 raw steps → 1 distinct lines):
   1. L2 `…>C(console.log,...k(»e)),T=(...e)=>C(console.error,...k(e));function I(e,t){if(!e)return"";if(/http?:\/\//.test(e))return e;if(!new(f())(e).p …⟨tainted span: 129771 chars⟩… getSyncStatus:response",data:{requestId:t.data.requestId,syncState:r}});break;case"postQueue:update":Ys=t.data.posts}}))«,e.onDisconnect.addL…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ASSIGN:binary-right, ASSIGN:binary-left, RETURN:json.parse, ASSIGN:conditional-alternate, ELEMENT:object.setProperty, ASSIGN:conditional-consequent, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:logical-right, ITERATE:loop.iteration, RETURN:fallback-return, RETURN:encodeURIComponent, RETURN:array.join, RETURN:json.stringify
      ⇄ cross-context hop: `runtime.connect.sender.message[feeder_api->mv3]`

---
