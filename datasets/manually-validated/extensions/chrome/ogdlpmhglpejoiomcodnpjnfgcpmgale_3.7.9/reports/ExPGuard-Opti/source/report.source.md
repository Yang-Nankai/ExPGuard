# Source-level Taint Flow — ogdlpmhglpejoiomcodnpjnfgcpmgale 3.7.9

- Source type: CRX
- Files with issues: 2 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C30311 -> L1:C30312  `…nt(Q().m((function r(n){var o,i,c,a,u,f,s,l,p,y,h,v,b,d,g,O,w,j,S;return Q().w((function(r){for(;;)switch(r.n){case 0:S=»t«.action,r.n="getInstalled"===S||"get_config"===S?1:"install_collection"===S?2:"set_config"===S?4:"delete_pack"===S?8:"de…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (rotator) — `background` L1:C33087 -> L1:C33170  `…!w.status,type:["time","request"].includes(w.type)?w.type:"time",value:Math.max(3,Math.min(1e3,parseInt(w.value)||30))},»chrome.storage.local.set({rotator:j},(function(){j.status?B():W(),e({status:!0})}))«,r.a(3,17);case 17:return r.a(2)}}),r)})));return function(t){return r.apply(this,arguments)}}()),!0})),chrome.runtime.o…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (238 raw steps → 1 distinct lines):
   1. L1 `…"symbol":typeof t})(»t)}function tt(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=null==t?null:"undefined"!=t …⟨tainted span: 4901 chars⟩… ,parseInt(w.value)||30))},chrome.storage.local.set({rotator:j},(function(){j.status?B():W(),e({status:!0})})),r.a(3,17);«case 17:return r.a(2…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:unary, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:conditional-consequent, RETURN:parseInt, RETURN:Math.min, RETURN:Math.max, ASSIGN:binary-right

---
