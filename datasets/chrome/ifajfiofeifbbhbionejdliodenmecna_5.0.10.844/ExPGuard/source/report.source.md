# Source-level Taint Flow — ifajfiofeifbbhbionejdliodenmecna 5.0.10.844

- Source type: CRX
- Files with issues: 10 / 12
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 47 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONCONNECTEXTERNAL_ONMESSAGE (chrome.runtime.onConnectExternal.addListener[onMessage])

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` — `Common/core-libs` L6:C6858 -> L6:C6859  `…y{e.apply(this,t)}catch(e){n.error(e)}}function C(e){return M.indexOf(e)>=0}function x(e){const t=this;"notification"===»e«.type?D.onNotification&&R(D.onNotification,e.data):"query"===e.type&&(D.onQuery?R(D.onNotification,e.data,(n=>{t.postMes…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `Common/core-libs` L6:C7024 -> L6:C7077  `…data):"query"===e.type&&(D.onQuery?R(D.onNotification,e.data,(n=>{t.postMessage({queryId:e.id,type:"answer",data:n})})):»t.postMessage({queryId:e.id,type:"answer",data:null})«)}function L(e){e&&e.sender&&e.sender.id&&C(e.sender.id)&&e.onMessage.addListener(x.bind(e))}O.init=function(e){T||(e=e|…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (20 raw steps → 1 distinct lines):
   1. L6 `…(e)try{e.apply(this,»t)}catch(e){n.error(e)}}function C(e){return M.indexOf(e)>=0}function x(e){const t=this;"notification"===e.type?D.onNoti …⟨tainted span: 324 chars⟩… ,e.data,(n=>{t.postMessage({queryId:e.id,type:"answer",data:n})})):t.postMessage({queryId:e.id,type:"answer",data:null})«)}function L(e){e&&e…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #2 — WINDOW_CUSTOM_EVENT (window.addEventListener(fetch))

- **Source**: `WINDOW_CUSTOM_EVENT` — `background-service` L12:C149317 -> L12:C149326  `…finished activation.")})),e.waitUntil(t)})),self.addEventListener("fetch",(e=>{if(globalThis.dji.logger.warn(`[fetch] ${»e.request«.method} ${e.request.url} (from ${e.request.referrer})`),"GET"!==e.request.method)return;const t=(i=e.request).url.index…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background-service` L12:C149708 -> L12:C149863  `…:i.url.indexOf("data:")?"media-src 'self' blob: data:; ":null;var i;t&&e.respondWith(async function(){try{const i=await »fetch(function(e){let t=e.url.indexOf(et);return t>0?e.url.substring(0,t+24):(t=e.url.indexOf(tt),t>0?e.url.substring(0,t+26):null)}(e.request)||e.request)«,n=new Headers(i.headers);return n.set("content-security-policy",t),n.set("X-Version",`2024-03-11.01 / ${Ze.toISOString(…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (168 raw steps → 1 distinct lines):
   1. L12 `…his.dji.logger.warn(»`[fetch] ${e.request.method} ${e.request.url} (from ${e.request.referrer})`),"GET"!==e.request.method)return;const t=(i= …⟨tainted span: 799 chars⟩… `),new Response(i.body,{status:i.status,statusText:i.statusText,headers:n})}catch(e){globalThis.dji.logger.error(e)}}())«})),self.addEventLis…`  · ELEMENT:member-element, ASSIGN:template-literal, ASSIGN:binary-right, ASSIGN:identifier, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:conditional-consequent, ASSIGN:logical-left, ASSIGN:logical-right

---
