# Source-level Taint Flow — mbheeaapbjpckahhciogfdodofjjldem 0.41.7

- Source type: CRX
- Files with issues: 1 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `assets/index.ts-CRtxQaeF` L12:C4325 -> L12:C4428  `…ok:a.ok,status:a.status}}catch{return{ok:!1,status:404}}},Ie=async(e,t)=>{const{version:n}=chrome.runtime.getManifest(),»a=await Me(e,{version:n,url:t.url,title:t.title,favIconUrl:t.favIconUrl,userAgent:navigator.userAgent})«;return a.ok?null:a.status===401?(await $(null),await B(),""):a.status===403?(t!=null&&t.id&&await m(t.id,"disabled"),"T…`
- **Sink(s)**:
  - `FETCH_BODY` (https://api.moonbounce.gg/status/check) — `assets/index.ts-CRtxQaeF` L12:C4078 -> L12:C4197  `…e=async()=>{const e=await w();return e||(await B(),null)},Me=async(e,t)=>{const n=`${f}/status/check`;try{const a=await »fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(t)})«;return{ok:a.ok,status:a.status}}catch{return{ok:!1,status:404}}},Ie=async(e,t)=>{const{version:n}=chrome.runtime.getMan…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (24 raw steps → 1 distinct lines):
   1. L12 `…us/check`;try{const »a=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringi …⟨tainted span: 358 chars⟩… me.getManifest(),a=await Me(e,{version:n,url:t.url,title:t.title,favIconUrl:t.favIconUrl,userAgent:navigator.userAgent})«;return a.ok?null:a.…`  · ELEMENT:object.setProperty, RETURN:json.stringify

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.ts-CRtxQaeF` L12:C9643 -> L12:C9644  `… _(o.id);await I(s),n({success:!0})},Y=(e,t,n)=>{var a,r;return(e==null?void 0:e.kind)==="teleport"&&((a=e==null?void 0:»e«.payload)!=null&&a.url)&&((r=t==null?void 0:t.tab)!=null&&r.id)?(We(e,t,n).catch(o=>{console.error("Error handling telep…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `assets/index.ts-CRtxQaeF` L12:C9173 -> L12:C9210  `…c(e,t,n)=>{var r;const a=(r=n==null?void 0:n.tab)==null?void 0:r.id;return e==="_self"&&a?chrome.tabs.update(a,{url:t}):»chrome.tabs.create({url:t,active:!0})«},We=async(e,t,n)=>{var c,l;const a=((c=e==null?void 0:e.payload)==null?void 0:c.url)??"",r=((l=e==null?void 0:e.payload…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (25 raw steps → 1 distinct lines):
   1. L12 `…)==null?void 0:r.id;»return e==="_self"&&a?chrome.tabs.update(a,{url:t}):chrome.tabs.create({url:t,active:!0})},We=async(e,t,n)=>{var c,l;con …⟨tainted span: 592 chars⟩… l?void 0:e.kind)==="teleport"&&((a=e==null?void 0:e.payload)!=null&&a.url)&&((r=t==null?void 0:t.tab)!=null&&r.id)?(We(e«,t,n).catch(o=>{cons…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, RETURN:fallback-return, ELEMENT:object.setProperty

---
