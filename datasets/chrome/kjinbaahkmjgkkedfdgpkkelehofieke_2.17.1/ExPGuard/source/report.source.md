# Source-level Taint Flow — kjinbaahkmjgkkedfdgpkkelehofieke 2.17.1

- Source type: CRX
- Files with issues: 8 / 10
- Distinct taint flows: 6  (collapsed from 6 raw issue entries)
- Sinkless sources skipped: 36 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content/meta-content` L1:C1014 -> L1:C1015  `…learInterval(l),l=null);return}f=null,E()}}function E(){if(l)return;let r=()=>{if(!o)return;let t=window.location.href;!»t«||t===f||(f=t,s&&s.abort(),s=new AbortController,S(t,s.signal))};l=setInterval(r,b),r()}async function S(r,t){if(o){`${r…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (location.href) — `content/meta-content` L1:C1154 -> L1:C1241  `…abort(),s=new AbortController,S(t,s.signal))};l=setInterval(r,b),r()}async function S(r,t){if(o){`${r}`;try{let e=await »fetch(r,{method:"GET",credentials:"same-origin",headers:{Accept:"text/html"},signal:t})«;if(!e.ok){`${e.status}${e.statusText}`;return}let n=await e.text();if(!o)return;w(n,"META_HTML_Fetch",r)}catch(e){if((e…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (550 raw steps → 1 distinct lines):
   1. L1 `…indow.location.href;»!t||t===f||(f=t,s&&s.abort(),s=new AbortController,S(t,s.signal))};l=setInterval(r,b),r()}async function S(r,t){if(o){`$ …⟨tainted span: 651 chars⟩… ommand:"meta-stream-detected",stream:i,source:t,pageUrl:e||window.location.href,pageTitle:document.title}).catch(()=>{})«}function A(r){if(ty…`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ASSIGN:binary-right

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L3:C11588 -> L3:C11623  `…l:e.job.tool,...t}),Jt())}function gr(){la||(chrome.runtime.onConnect.addListener(e=>{e.name==="wasm-offscreen-events"&&»e.onMessage.addListener(t=>{ua(t)})«}),chrome.runtime.onMessage.addListener((e,t,n)=>ua(e,n)?!1:void 0),la=!0)}function Zd(e,t){var n;!(e!=null&&e.wasmJobId…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L3:C18263 -> L3:C18368  `…ait pr(e,t));try{for(;u<=o;)try{let d=new AbortController,f=setTimeout(()=>d.abort(),r);u>0&&`${u}${o}${e}`;let p=await »fetch(e,{signal:d.signal,credentials:i,method:a,...l!==void 0?{body:ef(l)}:{},...s&&{headers:{Range:s}}})«;if(clearTimeout(f),!p.ok){if(p.status===403||p.status===429)return`${p.status}${e}`,{content:"",success:!1,status:p.sta…`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L4:C7464 -> L4:C7472  `…of e=="string"){if(!e.startsWith("data:"))throw new Error("Unsupported preview cache string payload");let n=await(await »fetch(e)«).blob();return{kind:"image",mime:n.type||"image/jpeg",blob:n,size:n.size}}if((e==null?void 0:e.blob)instanceof Blob){le…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (107641 raw steps → 7 distinct lines):
   1. L3 `…}function Dd(e){let »t=new Set;for(let n of Array.isArray(e)?e:[])if(!(typeof n!="string"||!n))try{let r=new URL(n);r.username="",r.password= …⟨tainted span: 16657 chars⟩… =new URL(e),r=Lo(t);return!n.pathname.includes(Mo)||!Ma.test(n.hostname)&&!(r!=null&&r.isChaturbatePage)?null:n.pathname«}catch{return null}}…`  · MESSAGE, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ASSIGN:identifier, COPY:object-spread, ELEMENT:member.length, ASSIGN:template-literal, ASSIGN:conditional-alternate, ASSIGN:unary, INITIAL:URL.constructor, RETURN:fallback-return, ELEMENT:member-element-container, ASSIGN:conditional-consequent, ELEMENT:implicit.add, ITERATE:loop.iteration
      ⇄ cross-context hop: `runtime.connect.sender.message[content/telegram-content->background]`
   2. L11 `…r n;return((n=H.get(»e))==null?void 0:n.get(t))||null}function Qe(e,t){let n=ot(e,t);return!n||n.timestampDismissed||!n.validForDisplay}async …⟨tainted span: 92045 chars⟩… elegram-events")return;let t=(r=(n=e.sender)==null?void 0:n.tab)==null?void 0:r.id;e.onMessage.addListener(o=>{Tg(o,t)})«}),Mu=!0)}var oe=new…`  · MESSAGE, ASSIGN:binary-left, ELEMENT:member-element-container, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:unary, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:template-literal, ELEMENT:implicit.add, ASSIGN:identifier, COPY:object-spread, ASSIGN:binary-right, RETURN:fallback-return, RETURN:decodeURIComponent, RETURN:json.parse, ELEMENT:member.length, ELEMENT:destructure-property[mediaId], ELEMENT:destructure-property[success], ELEMENT:destructure-property[previewUrl], ELEMENT:destructure-property[parsedMoovInfo]
      ⇄ cross-context hop: `runtime.connect.sender.message[content/telegram-content->background]`
   3. L1 `…turn!0;let r=Number(»t);return Number.isFinite(r)?!Array.isArray(e)||e.length===0?!1:e.includes(r):!0}function dd(e,t){var a,l,c,u,d;if(!t||t …⟨tainted span: 13996 chars⟩… ,a]of s.entries())o.getAll(i).includes(a)||o.append(i,a);return r.search=o.toString()?`?${o.toString()}`:"",r.toString()«}catch(n){return e}}…`  · ASSIGN:identifier, ASSIGN:unary, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ELEMENT:object.setProperty, INITIAL:URL.constructor, ASSIGN:binary-left, ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-right, RETURN:Math.abs, RETURN:Primitive.toString, ELEMENT:implicit.add, ASSIGN:template-literal, ASSIGN:conditional-consequent, RETURN:Number.toFixed, RETURN:Math.round, ASSIGN:conditional-alternate, RETURN:array.join
   4. L4 `…,n}function _a(e,t){»return Lt.has(t)?!1:(Lt.set(t,{tabId:e,startedAt:Date.now()}),!0)}function Na(e){Lt.delete(e)}function No(e,t){Lt.delete …⟨tainted span: 9014 chars⟩… (d.target.error)}});if(!i)return`${s}`,null;let a=lf(i);return a?a.createdAt<Date.now()-18e5?(`${s}`,Vo(n),null):(`${s}`«,a):null}catch(n){re…`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:member-element-container, ASSIGN:template-literal, COPY:object-spread, ELEMENT:implicit.add, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:conditional-alternate, RETURN:json.stringify, RETURN:json.parse, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:conditional-consequent
   5. L10 `…l(e,t,n,r=null){let »o=[],s=e.split(/\r?\n/),i=null,a=pn(n);for(let l=0;l<s.length;l++){let c=s[l].trim();if(c.startsWith("#EXT-X-STREAM-INF: …⟨tainted span: 18547 chars⟩… date",{tabId:e,mediaId:o,title:a,namingStatus:"smart-named"}):M("update",{tabId:e,mediaId:o,namingStatus:"smart-named"})«)}}var Dn="detection…`  · ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add, INITIAL:URL.constructor, ELEMENT:member-element-container, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:template-literal
   6. L14 `…n yt(e){let t=Number(e);return Number.isFinite(t)?(zt.has(t)||zt.set(t,0),zt.get(t)):null}function Ve(e,t){let n=Number(»e«),r=Number(t);return!Number.isFinite(n)||!Number.isFinite(r)||!zt.has(n)?!1:zt.get(n)===r}function yy(e){let t=Number(e)…`  · ASSIGN:identifier
   7. L2 `…/"),r=parseInt(t,10)/parseInt(n,10);return Math.round(r)}return Math.round(parseFloat(e))}function ae(e,t){if(!t)return »e||"";if(!e)return t;let n=e.trim(),r=t.trim();try{return new URL(r,n«).href}catch{return r}}function cr(e){let t=[];if(typeof e!="string"||!e)return t;for(let n of e.split(/\r?\n/)){let r=n…`  · ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:unary, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #3 — ELEMENT_INNER_HTML (report-page-button)

- **Source**: `ELEMENT_INNER_HTML` — `popup/popup` L44:C711 -> L44:C712  `…!0,u.tabUrl),k({command:"markTabReported",tabId:u.session.tabId,url:u.tabUrl}),await _e(u.session.tabId,u.tabUrl)):Cn(e,»t«)}catch(s){console.error("Error reporting page:",s),Cn(e,t)}}function Cn(e,t){let o=e.querySelector("span");o?o.textCont…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `popup/popup` L44:C943 -> L44:C952  `….textContent=c("downloadButtonError"):e.textContent=c("downloadButtonError"),e.classList.add("error"),setTimeout(()=>{e.»innerHTML«=t,e.classList.remove("error"),e.disabled=!1},2e3)}function W(e,t="info",o=3e3){let n=document.createElement("div");n.cl…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (4 raw steps → 2 distinct lines):
   1. L44 `…bId,u.tabUrl)):Cn(e,»t)}catch(s){console.error("Error reporting page:",s),Cn(e,t)}}function Cn(e,t){let o=e.querySelector("span");o?o.textCon …⟨tainted span: 243 chars⟩… t=c("downloadButtonError"):e.textContent=c("downloadButtonError"),e.classList.add("error"),setTimeout(()=>{e.innerHTML=t«,e.classList.remove(…`  · ASSIGN:identifier
   2. L317 `…()=>{if(u.tabUrl)try{let a=new URL(u.tabUrl).hostname;k({command:"togglePausedState",hostname:a})}catch{}i.blur()});let »s=document.getElementById("report-page-button")«;s&&s.addEventListener("click",()=>Dn(s));let r=document.getElementById("clear-history-button");r&&r.addEventListener("c…`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE (event(input))

- **Source**: `ELEMENT_VALUE` — `popup/popup` L44:C7853 -> L44:C7874  `…entById("search-input"),o=document.getElementById("search-clear-btn");!e||!t||!o||(t.addEventListener("input",n=>{let i=»n.target.value.length«>0;o.classList.toggle("visible",i),jt(n.target.value)}),o.addEventListener("click",()=>{t.value="",o.classList.remove("v…`
- **Sink(s)**:
  - `WEB_SESSION_STORAGE_SET_VALUE` — `popup/popup` L44:C8481 -> L44:C8542  `…""),t.blur())}))}var zt=null;function jt(e){zt&&clearTimeout(zt),zt=setTimeout(()=>{var t;(t=u.session)!=null&&t.tabId&&»sessionStorage.setItem(`mvd_tab_${u.session.tabId}_search`,e)«,H()},300)}function H(){let e=Xt(),t=Ve(),o=document.getElementById("videos-list"),n=(o==null?void 0:o.querySelectorAll(…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (5 raw steps → 1 distinct lines):
   1. L44 `…r("input",n=>{let i=»n.target.value.length>0;o.classList.toggle("visible",i),jt(n.target.value)}),o.addEventListener("click",()=>{t.value="", …⟨tainted span: 688 chars⟩… (zt),zt=setTimeout(()=>{var t;(t=u.session)!=null&&t.tabId&&sessionStorage.setItem(`mvd_tab_${u.session.tabId}_search`,e«),H()},300)}function…`  · ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:identifier

---

## Flow #5 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content/bilibili-main` L1:C447 -> L1:C619  `…n!=null&&n.dash)||typeof n.dash!="object")return!1;let t;try{t=JSON.stringify(n)}catch{return!1}try{let i=JSON.parse(t);»return window.postMessage({source:"mvd-bilibili-main",type:"bilibili-page-state",payload:i,pageUrl:window.location.href,pageTitle:document.title},window.location.origin),!0«}catch{return!1}}function o(){l!==null&&clearTimeout(l),l=null,e=0}function a(){if(l=null,c()){o();return}if(Date.now()>…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `content/bilibili-main` L1:C454 -> L1:C616  `…&&n.dash)||typeof n.dash!="object")return!1;let t;try{t=JSON.stringify(n)}catch{return!1}try{let i=JSON.parse(t);return »window.postMessage({source:"mvd-bilibili-main",type:"bilibili-page-state",payload:i,pageUrl:window.location.href,pageTitle:document.title},window.location.origin)«,!0}catch{return!1}}function o(){l!==null&&clearTimeout(l),l=null,e=0}function a(){if(l=null,c()){o();return}if(Date.now…`
- **Sanitized**: NO
- **Frame**: `MAIN_content_bilibili-main`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L1 `…n!=null&&n.dash)||typeof n.dash!="object")return!1;let t;try{t=JSON.stringify(n)}catch{return!1}try{let i=JSON.parse(t);»return window.postMessage({source:"mvd-bilibili-main",type:"bilibili-page-state",payload:i,pageUrl:window.location.href,pageTitle:document.title},window.location.origin),!0«}catch{return!1}}function o(){l!==null&&clearTimeout(l),l=null,e=0}function a(){if(l=null,c()){o();return}if(Date.now()>…`  · ELEMENT:object.setProperty

---

## Flow #6 — DOCUMENT_TITLE (document.title)

- **Source**: `DOCUMENT_TITLE` — `content/bilibili-main` L1:C447 -> L1:C619  `…n!=null&&n.dash)||typeof n.dash!="object")return!1;let t;try{t=JSON.stringify(n)}catch{return!1}try{let i=JSON.parse(t);»return window.postMessage({source:"mvd-bilibili-main",type:"bilibili-page-state",payload:i,pageUrl:window.location.href,pageTitle:document.title},window.location.origin),!0«}catch{return!1}}function o(){l!==null&&clearTimeout(l),l=null,e=0}function a(){if(l=null,c()){o();return}if(Date.now()>…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (location.origin) — `content/bilibili-main` L1:C454 -> L1:C616  `…&&n.dash)||typeof n.dash!="object")return!1;let t;try{t=JSON.stringify(n)}catch{return!1}try{let i=JSON.parse(t);return »window.postMessage({source:"mvd-bilibili-main",type:"bilibili-page-state",payload:i,pageUrl:window.location.href,pageTitle:document.title},window.location.origin)«,!0}catch{return!1}}function o(){l!==null&&clearTimeout(l),l=null,e=0}function a(){if(l=null,c()){o();return}if(Date.now…`
- **Sanitized**: NO
- **Frame**: `MAIN_content_bilibili-main`

- **Propagation** (2 raw steps → 1 distinct lines):
   1. L1 `…n!=null&&n.dash)||typeof n.dash!="object")return!1;let t;try{t=JSON.stringify(n)}catch{return!1}try{let i=JSON.parse(t);»return window.postMessage({source:"mvd-bilibili-main",type:"bilibili-page-state",payload:i,pageUrl:window.location.href,pageTitle:document.title},window.location.origin),!0«}catch{return!1}}function o(){l!==null&&clearTimeout(l),l=null,e=0}function a(){if(l=null,c()){o();return}if(Date.now()>…`  · ELEMENT:object.setProperty

---
