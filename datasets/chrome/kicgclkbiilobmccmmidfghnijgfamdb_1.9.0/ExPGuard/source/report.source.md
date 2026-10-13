# Source-level Taint Flow — kicgclkbiilobmccmmidfghnijgfamdb 1.9.0

- Source type: CRX
- Files with issues: 5 / 7
- Distinct taint flows: 11  (collapsed from 11 raw issue entries)
- Sinkless sources skipped: 47 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `js/content-script` L12:C38514 -> L12:C38575  `…nst t=m();await chrome.storage.local.set({browserType:t}),await chrome.storage.local.set({platform:navigator.platform}),»await chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=O…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (language) — `js/content-script` L12:C38520 -> L12:C38575  `…m();await chrome.storage.local.set({browserType:t}),await chrome.storage.local.set({platform:navigator.platform}),await »chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=O…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L12 `…nst t=m();await chrome.storage.local.set({browserType:t}),await chrome.storage.local.set({platform:navigator.platform}),»await chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=O…`  · ELEMENT:object.setProperty

---

## Flow #2 — NAVIGATOR_PLATFORM (navigator.platform)

- **Source**: `NAVIGATOR_PLATFORM` — `js/content-script` L12:C38452 -> L12:C38513  `…]=t:l[s]=JSON.stringify(t)}c.send(l)}async function S(){v();const t=m();await chrome.storage.local.set({browserType:t}),»await chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (platform) — `js/content-script` L12:C38458 -> L12:C38513  `…s]=JSON.stringify(t)}c.send(l)}async function S(){v();const t=m();await chrome.storage.local.set({browserType:t}),await »chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L12 `…]=t:l[s]=JSON.stringify(t)}c.send(l)}async function S(){v();const t=m();await chrome.storage.local.set({browserType:t}),»await chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`  · ELEMENT:object.setProperty

---

## Flow #3 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/content-script` L12:C36664 -> L12:C36695  `…=/firefox\/([\d.]+)/,d=/chrome\/([\d.]+)/,p=/opera.([\d.]+)/,g=/version\/([\d.]+).*safari/;function m(){let t="other",e=»navigator.userAgent.toLowerCase«();return u.test(e)?t="Edge":h.test(e)||f.test(e)?t="IE":l.test(e)?t="Firefox":d.test(e)?t="Chrome":p.test(e)?t="Opera":…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userAgent) — `js/content-script` L12:C38582 -> L12:C38639  `…me.storage.local.set({platform:navigator.platform}),await chrome.storage.local.set({language:navigator.language}),await »chrome.storage.local.set({userAgent:navigator.userAgent})«}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=Object.defineProperty;t.exports=function(t,e){try{i(n,t,{value:e,…`
- **Sanitized**: NO
- **Frame**: `CS_2`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L12 `…m(){let t="other",e=»navigator.userAgent.toLowerCase();return u.test(e)?t="Edge":h.test(e)||f.test(e)?t="IE":l.test(e)?t="Firefox":d.test(e)? …⟨tainted span: 1975 chars⟩…  chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userAgent})«}},6374:function(t,e…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #4 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `js/background` L12:C41035 -> L12:C41096  `…nst t=m();await chrome.storage.local.set({browserType:t}),await chrome.storage.local.set({platform:navigator.platform}),»await chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=O…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (language) — `js/background` L12:C41041 -> L12:C41096  `…m();await chrome.storage.local.set({browserType:t}),await chrome.storage.local.set({platform:navigator.platform}),await »chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=O…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L12 `…nst t=m();await chrome.storage.local.set({browserType:t}),await chrome.storage.local.set({platform:navigator.platform}),»await chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=O…`  · ELEMENT:object.setProperty

---

## Flow #5 — NAVIGATOR_PLATFORM (navigator.platform)

- **Source**: `NAVIGATOR_PLATFORM` — `js/background` L12:C40973 -> L12:C41034  `…]=t:h[s]=JSON.stringify(t)}c.send(h)}async function E(){v();const t=m();await chrome.storage.local.set({browserType:t}),»await chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (platform) — `js/background` L12:C40979 -> L12:C41034  `…s]=JSON.stringify(t)}c.send(h)}async function E(){v();const t=m();await chrome.storage.local.set({browserType:t}),await »chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L12 `…]=t:h[s]=JSON.stringify(t)}c.send(h)}async function E(){v();const t=m();await chrome.storage.local.set({browserType:t}),»await chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`  · ELEMENT:object.setProperty

---

## Flow #6 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/background` L12:C39185 -> L12:C39216  `…=/firefox\/([\d.]+)/,d=/chrome\/([\d.]+)/,p=/opera.([\d.]+)/,g=/version\/([\d.]+).*safari/;function m(){let t="other",e=»navigator.userAgent.toLowerCase«();return u.test(e)?t="Edge":f.test(e)||l.test(e)?t="IE":h.test(e)?t="Firefox":d.test(e)?t="Chrome":p.test(e)?t="Opera":…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userAgent) — `js/background` L12:C41103 -> L12:C41160  `…me.storage.local.set({platform:navigator.platform}),await chrome.storage.local.set({language:navigator.language}),await »chrome.storage.local.set({userAgent:navigator.userAgent})«}},6374:function(t,e,r){"use strict";var n=r("cfe9"),i=Object.defineProperty;t.exports=function(t,e){try{i(n,t,{value:e,…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L12 `…m(){let t="other",e=»navigator.userAgent.toLowerCase();return u.test(e)?t="Edge":f.test(e)||l.test(e)?t="IE":h.test(e)?t="Firefox":d.test(e)? …⟨tainted span: 1975 chars⟩…  chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userAgent})«}},6374:function(t,e…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #7 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/background` L12:C50432 -> L12:C51114  `…,(function(){})))}),»chrome.runtime.onMessage.addListener((t,e,r)=>{if("object"===typeof t&&"action"in t)switch(t.action){case"onmessage":bre …⟨tainted span: 682 chars⟩… ome.tabs.create({url:"options.html?ins="+encodeURIComponent(t.insid)+"&type="+t.follow_type+"&&task=ig"+ +new Date})))})«,chrome.cookies.onCh…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L12:C50991 -> L12:C51110  `…LLOW_EXPORT"===(null===t||void 0===t?void 0:t.code)&&(Object(n["a"])(210200,{userUrl:t.insid,exportType:t.follow_type}),»chrome.tabs.create({url:"options.html?ins="+encodeURIComponent(t.insid)+"&type="+t.follow_type+"&&task=ig"+ +new Date})«))}),chrome.cookies.onChanged.addListener(async({cookie:t,removed:e})=>{if(!t)return;const r=t.domain&&-1!==t.domain.ind…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (90 raw steps → 1 distinct lines):
   1. L12 `…Object(a["d"])();if(»!t)return void console.error("缺少价格ID参数");if(null===e||void 0===e||null===(o=e.userinfo)||void 0===o||!o.email)return voi …⟨tainted span: 1272 chars⟩… ome.tabs.create({url:"options.html?ins="+encodeURIComponent(t.insid)+"&type="+t.follow_type+"&&task=ig"+ +new Date})))})«,chrome.cookies.onCh…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:unary, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, RETURN:encodeURIComponent
      ⇄ cross-context hop: `runtime.single.sender.message[js/kodepay-script->js/background]`

---

## Flow #8 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `js/chunk-common` L1:C44063 -> L1:C44124  `…nst e=w();await chrome.storage.local.set({browserType:e}),await chrome.storage.local.set({platform:navigator.platform}),»await chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},7354:function(e,o,t){var a=t("24fb");o=a(!1),o.push([…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (language) — `js/chunk-common` L1:C44069 -> L1:C44124  `…w();await chrome.storage.local.set({browserType:e}),await chrome.storage.local.set({platform:navigator.platform}),await »chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},7354:function(e,o,t){var a=t("24fb");o=a(!1),o.push([…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…nst e=w();await chrome.storage.local.set({browserType:e}),await chrome.storage.local.set({platform:navigator.platform}),»await chrome.storage.local.set({language:navigator.language})«,await chrome.storage.local.set({userAgent:navigator.userAgent})}},7354:function(e,o,t){var a=t("24fb");o=a(!1),o.push([…`  · ELEMENT:object.setProperty

---

## Flow #9 — NAVIGATOR_PLATFORM (navigator.platform)

- **Source**: `NAVIGATOR_PLATFORM` — `js/chunk-common` L1:C44001 -> L1:C44062  `…]=e:p[r]=JSON.stringify(e)}l.send(p)}async function I(){y();const e=w();await chrome.storage.local.set({browserType:e}),»await chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (platform) — `js/chunk-common` L1:C44007 -> L1:C44062  `…r]=JSON.stringify(e)}l.send(p)}async function I(){y();const e=w();await chrome.storage.local.set({browserType:e}),await »chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (1 raw steps → 1 distinct lines):
   1. L1 `…]=e:p[r]=JSON.stringify(e)}l.send(p)}async function I(){y();const e=w();await chrome.storage.local.set({browserType:e}),»await chrome.storage.local.set({platform:navigator.platform})«,await chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userA…`  · ELEMENT:object.setProperty

---

## Flow #10 — NAVIGATOR_USER_AGENT (navigator.userAgent)

- **Source**: `NAVIGATOR_USER_AGENT` — `js/chunk-common` L1:C42213 -> L1:C42244  `…=/firefox\/([\d.]+)/,g=/chrome\/([\d.]+)/,m=/opera.([\d.]+)/,f=/version\/([\d.]+).*safari/;function w(){let e="other",o=»navigator.userAgent.toLowerCase«();return c.test(o)?e="Edge":u.test(o)||d.test(o)?e="IE":p.test(o)?e="Firefox":g.test(o)?e="Chrome":m.test(o)?e="Opera":…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userAgent) — `js/chunk-common` L1:C44131 -> L1:C44188  `…me.storage.local.set({platform:navigator.platform}),await chrome.storage.local.set({language:navigator.language}),await »chrome.storage.local.set({userAgent:navigator.userAgent})«}},7354:function(e,o,t){var a=t("24fb");o=a(!1),o.push([e.i,".ig-drainage-item[data-v-0f64f7e9]{display:flex;justify-con…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L1 `…w(){let e="other",o=»navigator.userAgent.toLowerCase();return c.test(o)?e="Edge":u.test(o)||d.test(o)?e="IE":p.test(o)?e="Firefox":g.test(o)? …⟨tainted span: 1975 chars⟩…  chrome.storage.local.set({language:navigator.language}),await chrome.storage.local.set({userAgent:navigator.userAgent})«}},7354:function(e,o…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #11 — CHROME_COOKIES_INFO (cookies(https://www.instagram.com))

- **Source**: `CHROME_COOKIES_INFO` — `js/options` L1:C185742 -> L1:C185743  `…const e=await chrome.cookies.get({url:"https://www.instagram.com",name:"csrftoken"});return(null===e||void 0===e?void 0:»e«.value)||""}catch(e){return""}}async function qe(){const t={...ze,"x-requested-with":"XMLHttpRequest"},e=await Ae();retu…`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `js/options` L1:C184404 -> L1:C184414  `…)}}},Me=$e,De=(a("d1bf"),Object(b["a"])(Me,Pe,Se,!1,null,"0c185365",null)),je=De.exports;function Ie(t,e,a=2e4){const o=»fetch(t,e)«.catch(t=>{throw Le({code:1001,message:t.message})}),i=new Promise((t,e)=>setTimeout(()=>e(Le({code:1e3,message:"Network…`
  - `FETCH_HEADERS` (https://www.instagram.com/graphql/query) — `js/options` L1:C184404 -> L1:C184414  `…)}}},Me=$e,De=(a("d1bf"),Object(b["a"])(Me,Pe,Se,!1,null,"0c185365",null)),je=De.exports;function Ie(t,e,a=2e4){const o=»fetch(t,e)«.catch(t=>{throw Le({code:1001,message:t.message})}),i=new Promise((t,e)=>setTimeout(()=>e(Le({code:1e3,message:"Network…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (308 raw steps → 1 distinct lines):
   1. L1 `…"csrftoken"});return»(null===e||void 0===e?void 0:e.value)||""}catch(e){return""}}async function qe(){const t={...ze,"x-requested-with":"XMLH …⟨tainted span: 4753 chars⟩… nstagram.com/graphql/query",{...a,"content-type":"application/x-www-form-urlencoded"},{method:"POST",body:i.toString()})«;if(Ee(s))throw Ne("…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:implicit.add, ELEMENT:object.setProperty, COPY:object-spread

---
