# Source-level Taint Flow — dabpnahpcemkfbgfbmegmncjllieilai 1.4.1

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C4774 -> L1:C4775  `…id 0)})})(),!0}var i};"undefined"!=typeof chrome&&chrome.runtime.onMessageExternal.addListener(function(e,t,r){return i(»e«,r)})}();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C3928 -> L1:C4086  `…nction(){var r,i,l,s,f,p,y,b,h,v,O,d,m;return a(this,function(a){switch(a.label){case 0:return a.trys.push([0,3,,4]),[4,»fetch(t.url,u(o({method:e.GET},null==t?void 0:t.options),{headers:o({Accept:"application/json"},null==t||null===(r=t.options)||void 0===r?void 0:r.headers)}))«];case 1:return[4,(i=a.sent()).text()];case 2:l=a.sent(),s={},f=!0,p=!1,y=void 0;try{for(b=i.headers[Symbol.iterator]();…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 1 distinct lines):
   1. L1 `…itch(null==t?void 0:»t.type){case"fetch":if(!(null==t?void 0:t.url))break;return(i=function(){var r,i,l,s,f,p,y,b,h,v,O,d,m;return a(this,fun …⟨tainted span: 1031 chars⟩… d 0)})})(),!0}var i};"undefined"!=typeof chrome&&chrome.runtime.onMessageExternal.addListener(function(e,t,r){return i(e«,r)})}();`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary

---
