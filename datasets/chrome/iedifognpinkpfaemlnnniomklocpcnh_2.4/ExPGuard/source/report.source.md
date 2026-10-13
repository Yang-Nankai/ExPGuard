# Source-level Taint Flow — iedifognpinkpfaemlnnniomklocpcnh 2.4

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L1:C438 -> L1:C439  `…ccept-Encoding":"gzip, deflate, br",Accept:"*/*"}}chrome.runtime.onMessageExternal.addListener(async(t,e,n)=>{var i,o,r=»t«.payload;if(t&&"status"===t.type&&(i=await chrome.cookies.get({url:"https://www.instagram.com",name:"ds_user_id"}),n({in…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/background` L1:C2175 -> L1:C2210  `…+"/comments/?can_support_threading=true&permalink_enabled=false";t.min_id&&(e+="&min_id="+encodeURIComponent(t.min_id));»fetch(e,{method:"GET",headers:s()})«.then(e=>e.json()).then(e=>{console.log(e),a&&a(e)}).catch(e=>{a({error:!0})})}}),ISPROD&&chrome.runtime.onInstalled.add…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (71 raw steps → 1 distinct lines):
   1. L1 `…(t,e,n)=>{var i,o,r=»t.payload;if(t&&"status"===t.type&&(i=await chrome.cookies.get({url:"https://www.instagram.com",name:"ds_user_id"}),n({i …⟨tainted span: 1744 chars⟩… ents/?can_support_threading=true&permalink_enabled=false";t.min_id&&(e+="&min_id="+encodeURIComponent(t.min_id));fetch(e«,{method:"GET",heade…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-left, RETURN:encodeURIComponent

---
