# Source-level Taint Flow — amicfiagmpbgfiiopieeemlkblfeeeip 2.0.7

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 12  (collapsed from 39 raw issue entries)
- Sinkless sources skipped: 35 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_TEXT_CONTENT (.user-link-name)

- **Source**: `ELEMENT_TEXT_CONTENT` — `content/c` L7:C1706 -> L7:C1719  `…stError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-link-name");return e?»e.textContent«:null}catch(e){return d(`Error while getUserName: ${e}`),null}}var bt=ql;function Pl(){try{let e=document.querySelector(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userName) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
  - `CHROME_LOCAL_STORAGE` (appData) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (282 raw steps → 5 distinct lines):
   1. L7 `…ink-name");return e?»e.textContent:null}catch(e){return d(`Error while getUserName: ${e}`),null}}var bt=ql;function Pl(){try{let e=document.q …⟨tainted span: 376 chars⟩… : ${e}`),null}}var Io=Pl;function Y(){try{let e=Io(),t=bt();return{userId:e.userId,userName:t,csrfToken:e["csrf-token"]}«}catch(e){return d(`…`  · ASSIGN:conditional-consequent, ASSIGN:identifier, ELEMENT:object.setProperty
   2. L172 `…0)return null;let n=»e?.userName&&String(e.userName)||`#${t}`;return{funpayUserId:t,funpayUsername:n}}async function Yn(e){let{user:t}=j();t& …⟨tainted span: 2890 chars⟩… u("funpayUnlinkSuccess")||"FunPay account unlinked.",4e3,!1),Ee(e,t,"unlinked"),await Yn(null)}function Ja(e){let t=za()«;if(!t)return null;l…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
   3. L181 `…nked-provider");r&&(»r.textContent=`FunPay: ${t.funpayUsername}`);let i=a.querySelector(".LB-linked-action");i.addEventListener("click",()=>{ …⟨tainted span: 884 chars⟩… payUserId,funpayUsername:t.funpayUsername,linkedAt:new Date().toISOString(),lastSeenAt:new Date().toISOString()}),!0):!1«}catch(o){return d(`…`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:template-literal, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty
   4. L88 `…atures??[]).includes(t)}var te=null,Le=!1,Bn=new Set,ga=null;function j(){return{user:te,loaded:Le}}function Tt(){let e=»JSON.stringify(te);if(e«!==ga){ga=e;for(let t of Bn)t(te)}}function O(e){return Bn.add(e),()=>Bn.delete(e)}chrome.storage.onChanged.addListener(…`  · RETURN:json.stringify, ASSIGN:identifier, ASSIGN:binary-left
   5. L198 `…view",s.textContent=»e.nickname||u("nicknameColorPreviewFallback"),n.appendChild(s);let o=document.createElement("div");o.className="LB-nick- …⟨tainted span: 2722 chars⟩… nameColor??null});t.appendChild(a);function r(L){let h=Xe({nickname:o,initial:L?null:e?.nicknameColor??null,disabled:L})«;a.replaceWith(h),a=…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_INNER_HTML (.balances-value)

- **Source**: `ELEMENT_INNER_HTML` — `content/c` L252:C2583 -> L252:C2608  `…childList:!0,subtree:!0})})}var Vr=lu;var fs="lbOriginalHtml",Kt="lbBalanceHidden";function hs(e){e.dataset[Kt]!=="1"&&(»e.dataset[fs]=e.innerHTML«,e.innerHTML=e.innerHTML.replace(/\d/g,"?"),e.dataset[Kt]="1")}function cu(e){if(e.dataset[Kt]!=="1")return;let t=e.data…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `content/c` L252:C2611 -> L252:C2620  `…var Vr=lu;var fs="lbOriginalHtml",Kt="lbBalanceHidden";function hs(e){e.dataset[Kt]!=="1"&&(e.dataset[fs]=e.innerHTML,e.»innerHTML«=e.innerHTML.replace(/\d/g,"?"),e.dataset[Kt]="1")}function cu(e){if(e.dataset[Kt]!=="1")return;let t=e.dataset[fs];type…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L252 `…isconnect(),t(c))}),»a=document.querySelectorAll(e);if(a&&a.length)return t(a);o.observe(s,{childList:!0,subtree:!0})})}var Vr=lu;var fs="lbO …⟨tainted span: 259 chars⟩… BalanceHidden";function hs(e){e.dataset[Kt]!=="1"&&(e.dataset[fs]=e.innerHTML,e.innerHTML=e.innerHTML.replace(/\d/g,"?")«,e.dataset[Kt]="1")}…`  · ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return

---

## Flow #3 — ELEMENT_INNER_HTML (.badge-balance)

- **Source**: `ELEMENT_INNER_HTML` — `content/c` L252:C2583 -> L252:C2608  `…childList:!0,subtree:!0})})}var Vr=lu;var fs="lbOriginalHtml",Kt="lbBalanceHidden";function hs(e){e.dataset[Kt]!=="1"&&(»e.dataset[fs]=e.innerHTML«,e.innerHTML=e.innerHTML.replace(/\d/g,"?"),e.dataset[Kt]="1")}function cu(e){if(e.dataset[Kt]!=="1")return;let t=e.data…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `content/c` L252:C2611 -> L252:C2620  `…var Vr=lu;var fs="lbOriginalHtml",Kt="lbBalanceHidden";function hs(e){e.dataset[Kt]!=="1"&&(e.dataset[fs]=e.innerHTML,e.»innerHTML«=e.innerHTML.replace(/\d/g,"?"),e.dataset[Kt]="1")}function cu(e){if(e.dataset[Kt]!=="1")return;let t=e.dataset[fs];type…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (6 raw steps → 2 distinct lines):
   1. L252 `…childList:!0,subtree:!0})})}var Vr=lu;var fs="lbOriginalHtml",Kt="lbBalanceHidden";function hs(e){e.dataset[Kt]!=="1"&&(»e.dataset[fs]=e.innerHTML,e.innerHTML=e.innerHTML.replace(/\d/g,"?")«,e.dataset[Kt]="1")}function cu(e){if(e.dataset[Kt]!=="1")return;let t=e.dataset[fs];typeof t=="string"&&(e.innerHTML=t)…`  · ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return
   2. L7 `…turn n("No target found");let o=new MutationObserver((r,i)=>{let c=document.querySelector(e);c&&(i.disconnect(),t(c))}),»a=document.querySelector(e)«;if(a)return t(a);o.observe(s,{childList:!0,subtree:!0})})}var N=Il;function Fl(e){return new Promise(t=>setTimeout(t,e)…`  · ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE (#LB-welcome-text)

- **Source**: `ELEMENT_VALUE` — `content/c` L7:C1526 -> L7:C1527  `…rome.runtime.lastError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=»t«:s[e]=t,await chrome.storage.local.set(s),chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){tr…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L7 `…chrome.runtime.lastError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?»s=t:s[e]=t,await chrome.storage.local.set(s«),chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-li…`  · ASSIGN:identifier, ASSIGN:conditional-consequent

---

## Flow #5 — ELEMENT_VALUE (#LB-welcome-unit)

- **Source**: `ELEMENT_VALUE` — `content/c` L7:C1526 -> L7:C1527  `…rome.runtime.lastError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=»t«:s[e]=t,await chrome.storage.local.set(s),chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){tr…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (storage.fuzzy.settings) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L7 `…chrome.runtime.lastError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?»s=t:s[e]=t,await chrome.storage.local.set(s«),chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-li…`  · ASSIGN:identifier, ASSIGN:conditional-consequent

---

## Flow #6 — ELEMENT_VALUE (.lb-review-textarea)

- **Source**: `ELEMENT_VALUE` — `content/c` L217:C1424 -> L217:C1428  `…ReplyTemplates",nu=[5,4,3,2,1];function su(e){return"★".repeat(e)+"☆".repeat(5-e)}async function qr(){let e=await v(Pr),»t={}«;if(e&&typeof e=="object")for(let n=1;n<=5;n++){let s=e[String(n)];t[String(n)]=typeof s=="string"?s:""}return t}functio…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (unknown) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
  - `CHROME_LOCAL_STORAGE` (reviewReplyTemplates) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L217 `…ReplyTemplates",nu=[5,4,3,2,1];function su(e){return"★".repeat(e)+"☆".repeat(5-e)}async function qr(){let e=await v(Pr),»t={}«;if(e&&typeof e=="object")for(let n=1;n<=5;n++){let s=e[String(n)];t[String(n)]=typeof s=="string"?s:""}return t}functio…`  · ELEMENT:object.setProperty

---

## Flow #7 — ELEMENT_VALUE (select.LB-select)

- **Source**: `ELEMENT_VALUE` — `content/c` L88:C6893 -> L88:C6897  `…агрузке кнопки: ${e}`)}}var ba=fc;async function hc(e){return await D(null,e,!0)}var La=hc;async function yc(e,t,n){let »s={}«;for(let r=0;r<e.length;r++){let i=e[r].name;s[i]=e[r].checked}document.querySelectorAll("select.LB-select").forEach(r=>…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (null) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (27 raw steps → 1 distinct lines):
   1. L88 `…агрузке кнопки: ${e}`)}}var ba=fc;async function hc(e){return await D(null,e,!0)}var La=hc;async function yc(e,t,n){let »s={}«;for(let r=0;r<e.length;r++){let i=e[r].name;s[i]=e[r].checked}document.querySelectorAll("select.LB-select").forEach(r=>…`  · ELEMENT:object.setProperty

---

## Flow #8 — ELEMENT_VALUE (event(input))

- **Source**: `ELEMENT_VALUE` — `content/c` L121:C915 -> L121:C916  `…)=>{}),re(),document.dispatchEvent(new CustomEvent(Dn))}var Sc=new Set(["firewatch","red_moon"]);function me(e){return!!»e«&&Sc.has(e)}function Je(){document.querySelectorAll("style.LB-custom-bg").forEach(e=>e.remove()),document.querySelectorA…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `content/c` L121:C2868 -> L121:C2911  `…hemeName");else{let r=await Ce(n);r=r.replace(/<extension-id>/g,chrome.runtime.id),localStorage.setItem("LBThemeCSS",r),»localStorage.setItem("LBThemeName",t.value)«,Rn(!0)}let{user:s,loaded:o}=j();o&&!A(s,"custom_theme_background")||!me(t.value)?Je():re()}var Ba=kc;async function xc(…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (63 raw steps → 1 distinct lines):
   1. L121 `…unction me(e){return»!!e&&Sc.has(e)}function Je(){document.querySelectorAll("style.LB-custom-bg").forEach(e=>e.remove()),document.querySelect …⟨tainted span: 2079 chars⟩… lStorage.setItem("LBThemeName",t.value),Rn(!0)}let{user:s,loaded:o}=j();o&&!A(s,"custom_theme_background")||!me(t.value)«?Je():re()}var Ba=kc…`  · ASSIGN:identifier, ASSIGN:unary, ASSIGN:logical-left, ASSIGN:logical-right

---

## Flow #9 — ELEMENT_VALUE (event(change))

- **Source**: `ELEMENT_VALUE` — `content/c` L511:C3933 -> L511:C3934  `…Pu(e){return Math.round((e+Number.EPSILON)*100)/100}async function Ss(e){try{let n=e.target.value;d(`Selected period: ${»n«}`),localStorage.setItem("LBStatsPeriod",n);let s=document.getElementById("LB-stats-cards-pane");(!s||s.style.display!==…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `content/c` L511:C3938 -> L511:C3977  `…{return Math.round((e+Number.EPSILON)*100)/100}async function Ss(e){try{let n=e.target.value;d(`Selected period: ${n}`),»localStorage.setItem("LBStatsPeriod",n)«;let s=document.getElementById("LB-stats-cards-pane");(!s||s.style.display!=="none")&&await fe()}catch(t){d(`Error in st…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (16 raw steps → 2 distinct lines):
   1. L511 `…} ${t}`:""}function Pu(e){return Math.round((e+Number.EPSILON)*100)/100}async function Ss(e){try{let n=e.target.value;d(»`Selected period: ${n}`),localStorage.setItem("LBStatsPeriod",n«);let s=document.getElementById("LB-stats-cards-pane");(!s||s.style.display!=="none")&&await fe()}catch(t){d(`Error in s…`  · ASSIGN:identifier, ASSIGN:template-literal
   2. L7 `…{o}`),r.toString().length==1&&(r=`0${r}`),i.toString().length==1&&(i=`0${i}`),c.toString().length==1&&(c=`0${c}`);let l=»`>[${s}.${o}.${a}] [${r}:${i}:${c}] >LB: ${e}`;t?console.error(l):console.log(l),typeof e=="object"&&console.log(e«)}var d=xl;async function Bl(e){let t=await chrome.storage.local.get(e);return chrome.runtime.lastError?chrome.runtime.l…`  · ASSIGN:identifier, ASSIGN:template-literal

---

## Flow #10 — ELEMENT_VALUE (From storage.local.set('reviewReplyTemplates') in content/c)

- **Source**: `ELEMENT_VALUE` — `content/c` L217:C1424 -> L217:C1428  `…ReplyTemplates",nu=[5,4,3,2,1];function su(e){return"★".repeat(e)+"☆".repeat(5-e)}async function qr(){let e=await v(Pr),»t={}«;if(e&&typeof e=="object")for(let n=1;n<=5;n++){let s=e[String(n)];t[String(n)]=typeof s=="string"?s:""}return t}functio…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (reviewReplyTemplates) — `content/c` L7:C1541 -> L7:C1568  `…stError?chrome.runtime.lastError:e==null?t:t[e]}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await »chrome.storage.local.set(s)«,chrome.runtime.lastError?chrome.runtime.lastError:!0}var D=Ml;function ql(){try{let e=document.querySelector(".user-lin…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (22 raw steps → 2 distinct lines):
   1. L217 `…ReplyTemplates",nu=[5,4,3,2,1];function su(e){return"★".repeat(e)+"☆".repeat(5-e)}async function qr(){let e=await v(Pr),»t={};if(e&&typeof e=="object")for(let n=1;n<=5;n++){let s=e[String(n)];t[String(n)]=typeof s=="string"?s«:""}return t}function ds(){let e=nu.map(a=>``  · ELEMENT:object.setProperty, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:identifier, ASSIGN:conditional-consequent
   2. L7 `…B: ${e}`;t?console.error(l):console.log(l),typeof e=="object"&&console.log(e)}var d=xl;async function Bl(e){let t=await »chrome.storage.local.get(e);return chrome.runtime.lastError?chrome.runtime.lastError:e==null?t:t[e]«}var v=Bl;async function Ml(e,t,n=!1){let s={};return n?s=t:s[e]=t,await chrome.storage.local.set(s),chrome.runtime.last…`  · STORAGE:STORAGE_FLOW[area: local, key: reviewReplyTemplates, sender: content/c, receiver: content/c], ASSIGN:conditional-alternate

---

## Flow #11 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `background/b` L7:C63284 -> L7:C63324  `…:"raiseNotify",payload:s}).catch(()=>{}))})})().then(()=>t({ok:!0})).catch(n=>t({ok:!1,error:n.message})),!0}}var mn=ra;»chrome.runtime.onMessage.addListener(mn)«;chrome.runtime.onInstalled.addListener(qt);na();async function na(){await er(),await dr()}})();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background/b` L7:C815 -> L7:C856  `…)}var jt=xn;function kn(e="",r){return`https://${jt(e)}`}var E=kn;function En(e={}){return e}function Pn(e,r={}){return »fetch(e,{...r,headers:En(r.headers??{})})«}var P=Pn;async function B(e){let r=await P(`${E()}/auth/refresh`,{method:"POST",headers:{"Content-Type":"application/js…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (341 raw steps → 1 distinct lines):
   1. L7 `…,r={}){return fetch(»e,{...r,headers:En(r.headers??{})})}var P=Pn;async function B(e){let r=await P(`${E()}/auth/refresh`,{method:"POST",head …⟨tainted span: 62503 chars⟩… )})})().then(()=>t({ok:!0})).catch(n=>t({ok:!1,error:n.message})),!0}}var mn=ra;chrome.runtime.onMessage.addListener(mn)«;chrome.runtime.onIn…`  · MESSAGE, RETURN:encodeURIComponent, ASSIGN:template-literal, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:conditional-consequent, ELEMENT:implicit.add, ASSIGN:logical-left, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[content/c->background/b]`

---

## Flow #12 — ELEMENT_TEXT_CONTENT (From storage.local.set('appData') in content/c)  ·  28× duplicate paths collapsed

- **Source**: `ELEMENT_TEXT_CONTENT` — `background/b` L7:C1706 -> L7:C1719  `…ing().length==1&&(a=`0${a}`),i.toString().length==1&&(i=`0${i}`),c.toString().length==1&&(c=`0${c}`);let u=`>[${n}.${o}.»${s}] [${a}:$«{i}:${c}] >LB: ${e}`,f=globalThis.LB_Debug;r?console.error(u):f&&console.log(u),typeof e=="object"&&f&&console.log(e)}va…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background/b` L7:C9615 -> L7:C9625  `… ${Le}).`)}async function Zn(e,r={},t=Jn){let n=0,o=0;for(;n<t;){o>0&&(await G(o),o=0),await Yn(),n++;let s;try{s=await »fetch(e,r)«}catch(a){k(`FunPay fetch network error (try ${n}): ${a?.message??a}`),o=Math.min(Qe,Math.max(ie,(o||ie)*2));continue}if…`  (url-control=FULL)
  - `FETCH_BODY` (https://hbapi.funpaylitebot.com/api/v1/r) — `background/b` L7:C815 -> L7:C856  `…)}var jt=xn;function kn(e="",r){return`https://${jt(e)}`}var E=kn;function En(e={}){return e}function Pn(e,r={}){return »fetch(e,{...r,headers:En(r.headers??{})})«}var P=Pn;async function B(e){let r=await P(`${E()}/auth/refresh`,{method:"POST",headers:{"Content-Type":"application/js…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (542 raw steps → 5 distinct lines):
   1. L7 `…n yn(e){let r=await »chrome.storage.local.get(e);return chrome.runtime.lastError?chrome.runtime.lastError:e==null?r:r[e]}var m=yn;async funct …⟨tainted span: 32786 chars⟩… unction gt(){try{let r=(await m("appData"))?.userId;if(r==null||r==="")return[];let n=await(await M(`${$()}/users/${r}/`«,{method:"GET"}))?.t…`  · ASSIGN:conditional-consequent, ASSIGN:identifier, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: appData, sender: content/c, receiver: background/b], ASSIGN:conditional-alternate, ELEMENT:member-element, ASSIGN:template-literal, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:logical-left, ASSIGN:unary, RETURN:json.stringify, INITIAL:Uint8Array.constructor, ASSIGN:binary-right, RETURN:fallback-return, RETURN:WebCrypto.encrypt, RETURN:string.fromCharCode, RETURN:btoa, COPY:object-spread, ELEMENT:computed-member-unknown-alternative
   2. L172 _(in `content/c`)_ `…0)return null;let n=»e?.userName&&String(e.userName)||`#${t}`;return{funpayUserId:t,funpayUsername:n}}async function Yn(e){let{user:t}=j();t& …⟨tainted span: 2890 chars⟩… u("funpayUnlinkSuccess")||"FunPay account unlinked.",4e3,!1),Ee(e,t,"unlinked"),await Yn(null)}function Ja(e){let t=za()«;if(!t)return null;l…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add
   3. L181 _(in `content/c`)_ `…nked-provider");r&&(»r.textContent=`FunPay: ${t.funpayUsername}`);let i=a.querySelector(".LB-linked-action");i.addEventListener("click",()=>{ …⟨tainted span: 884 chars⟩… payUserId,funpayUsername:t.funpayUsername,linkedAt:new Date().toISOString(),lastSeenAt:new Date().toISOString()}),!0):!1«}catch(o){return d(`…`  · ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:template-literal, ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty
   4. L88 _(in `content/c`)_ `…atures??[]).includes(t)}var te=null,Le=!1,Bn=new Set,ga=null;function j(){return{user:te,loaded:Le}}function Tt(){let e=»JSON.stringify(te);if(e«!==ga){ga=e;for(let t of Bn)t(te)}}function O(e){return Bn.add(e),()=>Bn.delete(e)}chrome.storage.onChanged.addListener(…`  · RETURN:json.stringify, ASSIGN:identifier, ASSIGN:binary-left
   5. L198 _(in `content/c`)_ `…view",s.textContent=»e.nickname||u("nicknameColorPreviewFallback"),n.appendChild(s);let o=document.createElement("div");o.className="LB-nick- …⟨tainted span: 2722 chars⟩… nameColor??null});t.appendChild(a);function r(L){let h=Xe({nickname:o,initial:L?null:e?.nicknameColor??null,disabled:L})«;a.replaceWith(h),a=…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:object.setProperty

---
