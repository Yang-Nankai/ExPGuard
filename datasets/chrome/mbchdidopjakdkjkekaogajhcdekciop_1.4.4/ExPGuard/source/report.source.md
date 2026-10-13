# Source-level Taint Flow — mbchdidopjakdkjkekaogajhcdekciop 1.4.4

- Source type: CRX
- Files with issues: 1 / 5
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service-worker` L1:C830144 -> L1:C830145  `…ca)($|\/.*)/);t.forEach(r=>{n.test(r.url)&&chrome.tabs.reload(r.id)})}handleExternalMessage(t,n,r){switch(null!=t.event?»t«.event:t.id){case yt.PREREQUISITE_REQUEST:this.handlePrerequisiteRequest(t.marketplace,r);break;case yt.AUTH_TOKENS_CACH…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L1:C446363 -> L1:C446389  `…{status:0,message:u.message}))}).catch(o=>{i.error({status:0,message:o.message})})}).pipe(me(1)))))}delete(t){return ml(»fetch(t,{method:"DELETE"})«)}}class Ke{static getHttpClient(){return Ke.HttpClient||(Ke.HttpClient=new Vf),Ke.HttpClient}}function Pl(e,t,n,r,s,a,i…`  (url-control=FULL)
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `service-worker` L1:C834400 -> L1:C834437  `…InAmazon(t.book,{caller:n.tab,index:t.index}).subscribe({next:i=>{r(new nt({status:Ee.COMPLETED,payload:i}))},error:i=>{»r(new nt({status:Ee.FAILED,error:i}))«}});break;case lt.BookFetchFromBackend:I.getProductMgmtService().getBookFromBackend(t.bookId).subscribe({next:i=>{r(new …`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (7714 raw steps → 1 distinct lines):
   1. L1 `…his.marketplaceName=»t,this.asin=n}static clone(t){if(!t)return null;const n=new Bn;return n.asin=t.asin,n.marketplaceName=t.marketplaceName, …⟨tainted span: 428049 chars⟩… :Ee.COMPLETED,payload:i}))},error:i=>{if(r){const o=new Q({message:i.message});r(new nt({status:Ee.FAILED,error:o}))}}})«}return!0}handlePrer…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:conditional-consequent, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ELEMENT:object.setProperty, RETURN:fallback-return, ELEMENT:implicit.add, ASSIGN:binary-right, RETURN:parseFloat, ELEMENT:member.length, ASSIGN:conditional-alternate, ASSIGN:binary-left, RETURN:encodeURIComponent, ASSIGN:template-literal, RETURN:Date.constructor, RETURN:json.stringify, ELEMENT:destructure-property[code], ELEMENT:destructure-property[payload]

---
