# Source-level Taint Flow — mhkejggchhilmabpicojddgaahkkgoln 3.0.89

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 7 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/background` L2:C148000 -> L2:C148029  `…);if(function shouldShowBrowserExtensionError(){const e=te[te.chrome?"chrome":"browser"],t=e&&e.runtime&&e.runtime.id,n=»te.location&&te.location.href«||"",r=!!t&&te===te.top&&["chrome-extension:","moz-extension:","ms-browser-extension:"].some((e=>n.startsWith(`${e}//`))…`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_OPEN` — `js/background` L2:C19541 -> L2:C19658  `…("Network request timed out"))}),0)},a.onabort=function(){setTimeout((function(){i(new u("Aborted","AbortError"))}),0)},»a.open(s.method,function fixUrl(e){try{return""===e&&r.location.href?r.location.href:e}catch(t){return e}}(s.url),!0)«,"include"===s.credentials?a.withCredentials=!0:"omit"===s.credentials&&(a.withCredentials=!1),"responseType"in a&&(o.bl…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (39 raw steps → 1 distinct lines):
   1. L2 `…location.href,r=K;K=»n;if(triggerHandlers("history",{from:r,to:n}),e)try{return e.apply(this,t)}catch(e){}},fill(W.history,"pushState",histor …⟨tainted span: 43049 chars⟩… startSession({ignoreDuration:!0}),captureSession(),addHistoryInstrumentationHandler((({from:e,to:t})=>{void 0!==e&&e!==t«&&(startSession({ign…`  · ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty, ASSIGN:binary-right

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `js/background` L2:C241837 -> L2:C241838  `…:n="",...o}=t||{},i={uuid:await getUserUUID(),error:n,ext_version:e.VERSION,isError:!!n,...o};r(i)},{event:o=null,...i}=»t«||{};if(!o)return void sendCustomResponse({error:'"event" is required'});const s=xn[o];if(s)return s({sendResponse:sendC…`
- **Sink(s)**:
  - `CHROME_MANAGEMENT_SETENABLED_ID` — `js/background` L2:C238027 -> L2:C238121  `…unction toggleExtension(e,t=!1){return new Promise((async n=>{await Gt.check({permissions:[Vt.MANAGEMENT]})&&e||n(null),»callBrowser().management.setEnabled(e,t,(()=>{callBrowser().runtime.lastError&&n(null),n(t)}))«}))}const wn="enabled",bn="disabled",Tn="error";const xn={"@EXT_CHECK_EXTENSION":function checkInstall({sendResponse:e})…`
  - `CHROME_MANAGEMENT_SETENABLED_FLAG` — `js/background` L2:C238027 -> L2:C238121  `…unction toggleExtension(e,t=!1){return new Promise((async n=>{await Gt.check({permissions:[Vt.MANAGEMENT]})&&e||n(null),»callBrowser().management.setEnabled(e,t,(()=>{callBrowser().runtime.lastError&&n(null),n(t)}))«}))}const wn="enabled",bn="disabled",Tn="error";const xn={"@EXT_CHECK_EXTENSION":function checkInstall({sendResponse:e})…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `js/background` L2:C241811 -> L2:C241815  `…onse=async t=>{const{error:n="",...o}=t||{},i={uuid:await getUserUUID(),error:n,ext_version:e.VERSION,isError:!!n,...o};»r(i)«},{event:o=null,...i}=t||{};if(!o)return void sendCustomResponse({error:'"event" is required'});const s=xn[o];if(s)retur…`
  - `FETCH_BODY` ([Unknown URL]) — `js/background` L2:C164361 -> L2:C164452  `…try{const e={client_id:await this.getOrCreateClientId(),events:[{name:t,params:u}]};r&&!this.debug&&(e.user_id=r),await »fetch(l,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})«,this.debug}catch(e){}}async sendEvent(e,t=null){const{event:n,...r}=(null==e?void 0:e.data)||{};let o=(null==r?void 0:r…`
  - `CHROME_CONTENTSETTINGS_SET` (NOTIFICATIONS) — `js/background` L2:C237744 -> L2:C237896  `…Status=async(e,t)=>new Promise((async n=>{await Gt.check({permissions:[Vt.CONTENT_SETTINGS]})||n(null);const r=`${e}/*`;»callBrowser().contentSettings.notifications.set({primaryPattern:r,setting:t},(()=>{callBrowser().runtime.lastError&&n(null),t===Wt.ALLOW&&n(!0),n(!1)}))«}));async function toggleExtension(e,t=!1){return new Promise((async n=>{await Gt.check({permissions:[Vt.MANAGEMENT]})&&…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5745 raw steps → 1 distinct lines):
   1. L2 `…veInteger(e){return »Number.isInteger(e)&&e>=0}function ArgumentError(e){this.name="ArgumentError",this.message=e}return function(e,t){if(t=t …⟨tainted span: 234348 chars⟩… sponse({error:'"event" is required'});const s=xn[o];if(s)return s({sendResponse:sendCustomResponse,sender:n,data:i}),!0;«sendCustomResponse({…`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:destructure-property[event], ASSIGN:unary, ELEMENT:object.setProperty, ELEMENT:destructure-property[extensions], ITERATE:loop.iteration, ELEMENT:destructure-property[extensionId], ELEMENT:destructure-property[enabled], ASSIGN:logical-right, ASSIGN:binary-right, ELEMENT:member.length, ELEMENT:destructure-property[toaster], ELEMENT:destructure-property[screen_name], COPY:object-spread, RETURN:json.stringify, ELEMENT:destructure-property[error], ELEMENT:array.reduce, ELEMENT:member-element, ELEMENT:member-element-container, ELEMENT:implicit.add, ELEMENT:destructure-property[unwantedDomains], ELEMENT:destructure-property[domain], ELEMENT:destructure-property[status], ASSIGN:template-literal, ASSIGN:binary-left, ELEMENT:destructure-property[headers], ELEMENT:destructure-property[timeout], ELEMENT:destructure-property[tags], ASSIGN:conditional-alternate, ASSIGN:conditional-consequent

---
