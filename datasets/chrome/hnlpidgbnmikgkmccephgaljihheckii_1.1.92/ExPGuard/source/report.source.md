# Source-level Taint Flow — hnlpidgbnmikgkmccephgaljihheckii 1.1.92

- Source type: CRX
- Files with issues: 3 / 9
- Distinct taint flows: 8  (collapsed from 8 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `assets/feature-Co_b3fur` L3:C19195 -> L3:C19386  `…nc()=>{const t=await Yt.getAll();return{...t,whitelist:t.whitelist.slice(0,100)}},xt=async()=>{var e;const t=await Zt();»return{app:{name:"amboss-browser-extension",version:(e=A.runtime.getManifest())==null?void 0:e.version,build:Rt},options:t,userAgent:navigator.userAgent,userAgentData:navigator.userAgentData}«},er=async({event:t,properties:e,context:r})=>{const s=await Se(),n=await Q(),i=await nt(),o={anonymousId:n,event:t,prop…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/i) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/a) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
- **Sanitized**: NO
- **Frame**: `SIDEPANEL_1`

- **Propagation** (30 raw steps → 1 distinct lines):
   1. L3 `…8n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body …⟨tainted span: 963 chars⟩… ifest())==null?void 0:e.version,build:Rt},options:t,userAgent:navigator.userAgent,userAgentData:navigator.userAgentData}«},er=async({event:t,…`  · ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify

---

## Flow #2 — NAVIGATOR_USER_AGENT (navigator.userAgentData)

- **Source**: `NAVIGATOR_USER_AGENT` — `assets/feature-Co_b3fur` L3:C19195 -> L3:C19386  `…nc()=>{const t=await Yt.getAll();return{...t,whitelist:t.whitelist.slice(0,100)}},xt=async()=>{var e;const t=await Zt();»return{app:{name:"amboss-browser-extension",version:(e=A.runtime.getManifest())==null?void 0:e.version,build:Rt},options:t,userAgent:navigator.userAgent,userAgentData:navigator.userAgentData}«},er=async({event:t,properties:e,context:r})=>{const s=await Se(),n=await Q(),i=await nt(),o={anonymousId:n,event:t,prop…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/i) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/a) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
- **Sanitized**: NO
- **Frame**: `SIDEPANEL_1`

- **Propagation** (30 raw steps → 1 distinct lines):
   1. L3 `…8n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body …⟨tainted span: 963 chars⟩… ifest())==null?void 0:e.version,build:Rt},options:t,userAgent:navigator.userAgent,userAgentData:navigator.userAgentData}«},er=async({event:t,…`  · ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify

---

## Flow #3 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `assets/feature-Co_b3fur` L3:C19833 -> L3:C19891  `…t ke("a",{previousId:t,anonymousId:await Q(),userId:e}),await Qt(t))};async function tr(t,{event:e,properties:r}){const »n={page:{hostname:t==="lifeCycleContext"?null:await Bt()}}«;t==="serviceWorkerContext"||t==="lifeCycleContext"?er({event:e,properties:r,context:n}):A.runtime.sendMessage({subject:…`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/feature-Co_b3fur` L3:C18423 -> L3:C18611  `…properties=="object"&&!((s=e.properties)!=null&&s.systemLanguage)&&(e.properties.systemLanguage=A.i18n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body:JSON.stringify({...e,context:{...r,...e==null?void 0:e.context}})})«.catch(n=>{console.error("API call failed",n)})},Se=async()=>De||(await A.storage.sync.get("userId")).userId,Xt=async t=…`
- **Sanitized**: NO
- **Frame**: `SIDEPANEL_1`

- **Propagation** (17 raw steps → 1 distinct lines):
   1. L3 `…8n.getUILanguage()),»fetch(`${Et}/${t}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Basic ${btoa(At+":")}`},body …⟨tainted span: 1635 chars⟩… ext"?er({event:e,properties:r,context:n}):A.runtime.sendMessage({subject:Nt,trackArgs:{event:e,properties:r,context:n}})«}const rr=t=>{let e;…`  · ELEMENT:implicit.add, ASSIGN:conditional-alternate, ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify

---

## Flow #4 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `assets/index.html-BZ4vRLLQ` L3:C19195 -> L3:C19386  `…b3BzPXtwcml2YXRlUHJvcHN9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIHsuLi5hcmlhRGVzY3JpYmVkQnlQcm9wfVxuICAg»ICAgICAvPlxuICAgICAgPC9Gb3JtRmllbGQ+XG4gICAgKTtcbiAgfVxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQzRCIn0= */"),u_=(t,i,r,a)=>i?"transparent":r?t.values.color.border.error.default:a?t.value«s.color.border.primary.disabled:t.values.color.border.primary.default,d_=(t,i)=>i?`calc(${t.variables.size.spacing.s} + …`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/i) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/a) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L3 _(in `assets/index.html-BZ4vRLLQ`)_ `…LXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxI …⟨tainted span: 963 chars⟩… lcyI6W10sIm1hcHBpbmdzIjoiQUFxQzRCIn0= */"),u_=(t,i,r,a)=>i?"transparent":r?t.values.color.border.error.default:a?t.value«s.color.border.prima…`  · ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify

---

## Flow #5 — NAVIGATOR_USER_AGENT (navigator.userAgentData)

- **Source**: `NAVIGATOR_USER_AGENT` — `assets/index.html-BZ4vRLLQ` L3:C19195 -> L3:C19386  `…b3BzPXtwcml2YXRlUHJvcHN9XG4gICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgIHsuLi5hcmlhRGVzY3JpYmVkQnlQcm9wfVxuICAg»ICAgICAvPlxuICAgICAgPC9Gb3JtRmllbGQ+XG4gICAgKTtcbiAgfVxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQzRCIn0= */"),u_=(t,i,r,a)=>i?"transparent":r?t.values.color.border.error.default:a?t.value«s.color.border.primary.disabled:t.values.color.border.primary.default,d_=(t,i)=>i?`calc(${t.variables.size.spacing.s} + …`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/i) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/a) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (42 raw steps → 1 distinct lines):
   1. L3 _(in `assets/index.html-BZ4vRLLQ`)_ `…LXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxI …⟨tainted span: 963 chars⟩… lcyI6W10sIm1hcHBpbmdzIjoiQUFxQzRCIn0= */"),u_=(t,i,r,a)=>i?"transparent":r?t.values.color.border.error.default:a?t.value«s.color.border.prima…`  · ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify

---

## Flow #6 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `assets/index.html-BZ4vRLLQ` L3:C19833 -> L3:C19891  `…,fontSize:t.variables.size.font[I],lineHeight:I==="s"?t.variables.size.lineHeight.xxxl:t.variables.size.lineHeight.xl,bo»rderRadius:t.variables.size.borderRadius.xs,borderWidth:"1«px",borderStyle:"solid",width:"100%",padding:`calc(${t.variables.size.spacing.xs} - 1px) ${t.variables.size.spacing.s}`,…`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (60 raw steps → 1 distinct lines):
   1. L3 _(in `assets/index.html-BZ4vRLLQ`)_ `…LXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxI …⟨tainted span: 1556 chars⟩… e.borderRadius.xs,borderWidth:"1px",borderStyle:"solid",width:"100%",padding:`calc(${t.variables.size.spacing.xs} - 1px)« ${t.variables.size.…`  · ELEMENT:implicit.add, ASSIGN:conditional-alternate, ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify

---

## Flow #7 — DOCUMENT_LOCATION (location.hostname)

- **Source**: `DOCUMENT_LOCATION` — `assets/background-script.ts-Bo6ccuRN` L3:C4983 -> L3:C6165  `…lection});break}}});»i.runtime.onMessage.addListener(async({subject:e,payload:t,trackArgs:s,ambossIdArgs:n},a)=>{var c,g,f,m;switch(e){case Y …⟨tainted span: 1182 chars⟩…  sender",{sender:a}),{portExists:!1}):{portExists:!!u[o]}}default:throw new Error("Message requires message.subject")}})«;i.runtime.onMessage…`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (46 raw steps → 1 distinct lines):
   1. L3 _(in `assets/index.html-BZ4vRLLQ`)_ `…fWAsXG4gICAgLi4uKGlu»cHV0U2l6ZSA9PT0gXCJzXCIgJiYge1xuICAgICAgcGFkZGluZzogYGNhbGMoJHt0aGVtZS52YXJpYWJsZXMuc2l6ZS5zcGFjaW5nLnh4c30gLSAxcHgpICR7 …⟨tainted span: 14996 chars⟩… e.borderRadius.xs,borderWidth:"1px",borderStyle:"solid",width:"100%",padding:`calc(${t.variables.size.spacing.xs} - 1px)« ${t.variables.size.…`  · MESSAGE, ELEMENT:implicit.add, ASSIGN:conditional-alternate, ELEMENT:object.setProperty, COPY:object-spread, RETURN:json.stringify
      ⇄ cross-context hop: `runtime.single.sender.message[assets/feature-Co_b3fur->assets/background-script.ts-Bo6ccuRN]`

---

## Flow #8 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/background-script.ts-Bo6ccuRN` L3:C6237 -> L3:C6238  `…new Error("Message requires message.subject")}});i.runtime.onMessageExternal.addListener((e={},t)=>{!(t!=null&&t.url)||!»e«||(/.next.medicuja.de/.test(t.url)||/next.amboss.com/.test(t.url))&&we(e)});`
- **Sink(s)**:
  - `FETCH_BODY` (https://www.amboss.com/us/api/sprx/v1/t) — `assets/index.html-BZ4vRLLQ` L3:C18423 -> L3:C18611  `…ICAgICAgICBkYXRhLWRzLWlkPVwiSW5wdXRcIlxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIGRhdGEtZTJlLXRlc3QtaWQ9e2RhdGFF»MmVUZXN0SWR9XG4gICAgICAgIGhpZGVMYWJlbD17aGlkZUxhYmVsfVxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGxhYmVsSGludD17bGFiZWxIaW50fVxuICAgICAgICBoaW50PXtoaW50fVxuICAgICAgICBlcnJvck1lc3NhZ2VzPXtl«cnJvck1lc3NhZ2VzfVxuICAgICAgICBtZXNzYWdlSWQ9e2lkfVxuICAgICAgPlxuICAgICAgICA8SW5wdXRSYXdcbiAgICAgICAgICB7Li4ucmVzdH1cbiAg…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (55 raw steps → 1 distinct lines):
   1. L3 _(in `assets/index.html-BZ4vRLLQ`)_ `…r_,y as s_,v as a_}f»rom"./feature-Co_b3fur.js";import{s as gA,a as o_}from"./messaging-D2GMZq-R.js";let l_=xi("div",{target:"e1h94re90",labe …⟨tainted span: 19040 chars⟩… e.borderRadius.xs,borderWidth:"1px",borderStyle:"solid",width:"100%",padding:`calc(${t.variables.size.spacing.xs} - 1px)« ${t.variables.size.…`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:member-element, ELEMENT:object.setProperty, COPY:object-spread, ASSIGN:binary-left, ASSIGN:logical-left, RETURN:json.stringify, ASSIGN:binary-right

---
