# Source-level Taint Flow — jlalnhjkfiogoeonamcnngdndjbneina 5.0.22

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 8  (collapsed from 22 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `scripts/chatgptContent` L1:C1907247 -> L1:C1907277  `…eturn ci(ii)[t]||[]}function pi(t,e){const n=ci(ii),i=[...new Set(e)];n[t]=i.slice(-5e3),li(ii,n)}function gi(){const t=»window.location.pathname.match«(/\/c\/([^/?#]+)/);return t?.[1]??null}function mi(t){return document.querySelector(`section[data-testid^="conversation-…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `scripts/chatgptContent` L1:C1906878 -> L1:C1906919  `…set(t,n)),n.add(e)}function ci(t){try{return JSON.parse(localStorage.getItem(t)||"{}")}catch{return{}}}function li(t,e){»localStorage.setItem(t,JSON.stringify(e))«}function di(t){return ci(ei)[t]||[]}function ui(t,e){const n=ci(ei),i=[...new Set(e)];n[t]=i.slice(-5e3),li(ei,n)}funct…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (593 raw steps → 1 distinct lines):
   1. L1 `…w.location.pathname;»return t.startsWith("/c/")&&t.split("/c/")[1]?.split(/[/?#]/)[0]||null}(),e=document.querySelectorAll("button[data-conve …⟨tainted span: 1640405 chars⟩… (()=>{})}(),await(0,me.Q)(void 0,!0),"/"===i||t.startsWith("/c/")||t.startsWith("/g/")||await Yn()),(0,fr.i)(),o<4&&(i=t«,A=!1,c=!1,d=!1,o++,…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:logical-left, ASSIGN:unary, ELEMENT:object.setProperty, RETURN:json.stringify, ASSIGN:logical-right, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:member-element-container, ELEMENT:string.split

---

## Flow #2 — ELEMENT_VALUE (folder-name-input)

- **Source**: `ELEMENT_VALUE` — `scripts/chatgptContent` L1:C193783 -> L1:C193796  `…st{selectedFolder:w,folders:b,previousModal:y,...v}=await(0,u.getStore)(),_=v[i.a.ECRYPTED_STORAGE_DATA.IS_PAID_USER],E=»m.value?.trim«();if(0===E.length||E.length>i.a.MANAGE_FOLDERS.ADD_FOLDER.MAX_NAME_LENGTH)throw(0,d.v)(!0,m,"create-folder-name-error")…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `scripts/chatgptContent` L1:C194513 -> L1:C194522  `…(),await(0,l.O7)(t,e||"MANAGE_FOLDER"===y?"MANAGE_FOLDER":"MANAGE_FOLDERS"),e&&await(0,u.DS)("MANAGE_FOLDERS"),p&&e&&(p.»innerHTML«=E),(0,c.showSnackbar)(f,3e3),(0,s.w)(),await(0,r.dH)(g)}catch(t){}finally{f=!1,h&&(h.disabled=!1),await(0,A.i)(!1)}}(t,…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (26 raw steps → 1 distinct lines):
   1. L1 `…manageFolderModal"),»p=h?.querySelector(".infi-chatgpt-modal-title h2"),g=document.getElementById("search-input"),m=document.getElementById(" …⟨tainted span: 1028 chars⟩… l.O7)(t,e||"MANAGE_FOLDER"===y?"MANAGE_FOLDER":"MANAGE_FOLDERS"),e&&await(0,u.DS)("MANAGE_FOLDERS"),p&&e&&(p.innerHTML=E«),(0,c.showSnackbar)…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('teamAccessToken') in scripts/background)  ·  7× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/chatgptContent` L1:C59071 -> L1:C59072  `… 14.6231L17.4515 16.0373L18.364 16.9498L19.7782 15.5356ZM19.7782 18.364C20.5592 17.5829 20.5592 16.3166 19.7782 15.5356L»1«8.364 16.9498H18.364L19.7782 18.364ZM18.364 19.7782L19.7782 18.364L18.364 16.9498L16.9498 18.364L18.364 19.7782ZM15.5355…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `scripts/chatgptContent` L1:C286905 -> L1:C286946  `…ction u(t){try{return chrome.storage.local.set({[c]:t}).catch(()=>{})}catch{return Promise.resolve()}}function f(t){try{»localStorage.setItem(c,JSON.stringify(t))«}catch{}u(t)}async function h(){try{const t=d(),e=await async function(){try{const t=await chrome.storage.local.get(c);r…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `scripts/chatgptContent` L1:C286807 -> L1:C286840  `…tion d(){try{const t=localStorage.getItem(c);return t?l(JSON.parse(t)):null}catch{return null}}function u(t){try{return »chrome.storage.local.set({[c]:t})«.catch(()=>{})}catch{return Promise.resolve()}}function f(t){try{localStorage.setItem(c,JSON.stringify(t))}catch{}u(t)}a…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (59 raw steps → 1 distinct lines):
   1. L1 `….45575 12" stroke="c»urrentColor" stroke-width="1.5"></path> <path d="M12 16.0678L15.7715 19.9728C16.3116 20.5321 16.5816 20.8117 16.8103 20. …⟨tainted span: 1797995 chars⟩… ken:t}}return{ok:!1,reason:"session_gone"}}return{ok:!1,reason:"network"}}(t)}();if(n.ok){const t=await Y(n.accessToken)«;return t?{status:"a…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: teamAccessToken, sender: scripts/background, receiver: scripts/chatgptContent], ASSIGN:logical-left, ASSIGN:unary, ASSIGN:template-literal, ELEMENT:implicit.add, ELEMENT:member-element-container

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('teamRefreshToken') in scripts/background)  ·  7× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/chatgptContent` L1:C59071 -> L1:C59072  `… 14.6231L17.4515 16.0373L18.364 16.9498L19.7782 15.5356ZM19.7782 18.364C20.5592 17.5829 20.5592 16.3166 19.7782 15.5356L»1«8.364 16.9498H18.364L19.7782 18.364ZM18.364 19.7782L19.7782 18.364L18.364 16.9498L16.9498 18.364L18.364 19.7782ZM15.5355…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `scripts/chatgptContent` L1:C286905 -> L1:C286946  `…ction u(t){try{return chrome.storage.local.set({[c]:t}).catch(()=>{})}catch{return Promise.resolve()}}function f(t){try{»localStorage.setItem(c,JSON.stringify(t))«}catch{}u(t)}async function h(){try{const t=d(),e=await async function(){try{const t=await chrome.storage.local.get(c);r…`
  - `CHROME_LOCAL_STORAGE` (unknown) — `scripts/chatgptContent` L1:C286807 -> L1:C286840  `…tion d(){try{const t=localStorage.getItem(c);return t?l(JSON.parse(t)):null}catch{return null}}function u(t){try{return »chrome.storage.local.set({[c]:t})«.catch(()=>{})}catch{return Promise.resolve()}}function f(t){try{localStorage.setItem(c,JSON.stringify(t))}catch{}u(t)}a…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (45 raw steps → 1 distinct lines):
   1. L1 `….45575 12" stroke="c»urrentColor" stroke-width="1.5"></path> <path d="M12 16.0678L15.7715 19.9728C16.3116 20.5321 16.5816 20.8117 16.8103 20. …⟨tainted span: 1797951 chars⟩… const t=await V();if(t)return{ok:!0,accessToken:t}}return{ok:!1,reason:"session_gone"}}return{ok:!1,reason:"network"}}(t«)}();if(n.ok){const …`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: teamRefreshToken, sender: scripts/background, receiver: scripts/chatgptContent], ASSIGN:logical-left, ASSIGN:unary, RETURN:json.stringify, ASSIGN:binary-left, ASSIGN:binary-right, ASSIGN:logical-right

---

## Flow #5 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `scripts/background` L1:C68445 -> L1:C68467  `….get("lang",a=>{if(chrome.runtime.lastError)return r(chrome.runtime.lastError);if(a.lang)return void t(a.lang);const n=(»navigator.language||""«).split("-")[0].toLowerCase(),o=["ar","de","en","es","fr","he","hi","it","ja","zh"].includes(n)?n:e.LANGUAGES.ENGLISH;ch…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (lang) — `scripts/background` L1:C68585 -> L1:C68619  `…"").split("-")[0].toLowerCase(),o=["ar","de","en","es","fr","he","hi","it","ja","zh"].includes(n)?n:e.LANGUAGES.ENGLISH;»chrome.storage.local.set({lang:o})«,t(o)})})}}catch(Cr){}})();`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (12 raw steps → 1 distinct lines):
   1. L1 `…cal.get("lang",a=>{if(chrome.runtime.lastError)return r(chrome.runtime.lastError);if(a.lang)return void t(a.lang);const »n=(navigator.language||"").split("-")[0].toLowerCase(),o=["ar","de","en","es","fr","he","hi","it","ja","zh"].includes(n)?n:e.LANGUAGES.ENGLISH;chrome.storage.local.set({lang:o}),t(o«)})})}}catch(Cr){}})();`  · ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:conditional-consequent

---

## Flow #6 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/background` L1:C59071 -> L1:C59072  `….origin&&vt.has(t.origin)?"TEAM_SESSION"===e?.type&&"string"==typeof e.accessToken&&"string"==typeof e.refreshToken?(Ge(»e«.accessToken,e.refreshToken).then(()=>r({ok:!0})).catch(()=>r({ok:!1})),!0):"TEAM_SIGNOUT"===e?.type?(async function(){a…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (teamAccessToken) — `scripts/background` L1:C41768 -> L1:C41817  `…0}catch(e){throw e}}const Me="teamAccessToken",Ue="teamRefreshToken",ve="teamMemberMarker";async function Ge(e,t){await »chrome.storage.local.set({[Me]:e,[Ue]:t,[ve]:!0})«}const Ke=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;const xe="claude.ai",Be="https://claude.ai",…`
  - `CHROME_LOCAL_STORAGE` (teamRefreshToken) — `scripts/background` L1:C41768 -> L1:C41817  `…0}catch(e){throw e}}const Me="teamAccessToken",Ue="teamRefreshToken",ve="teamMemberMarker";async function Ge(e,t){await »chrome.storage.local.set({[Me]:e,[Ue]:t,[ve]:!0})«}const Ke=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;const xe="claude.ai",Be="https://claude.ai",…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (8 raw steps → 1 distinct lines):
   1. L1 `…nc function Ge(e,t){»await chrome.storage.local.set({[Me]:e,[Ue]:t,[ve]:!0})}const Ke=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a …⟨tainted span: 17337 chars⟩… EAM_SESSION"===e?.type&&"string"==typeof e.accessToken&&"string"==typeof e.refreshToken?(Ge(e.accessToken,e.refreshToken«).then(()=>r({ok:!0}…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty

---

## Flow #7 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('teamAccessToken') in scripts/background)  ·  3× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/background` L1:C59071 -> L1:C59072  `….origin&&vt.has(t.origin)?"TEAM_SESSION"===e?.type&&"string"==typeof e.accessToken&&"string"==typeof e.refreshToken?(Ge(»e«.accessToken,e.refreshToken).then(()=>r({ok:!0})).catch(()=>r({ok:!1})),!0):"TEAM_SIGNOUT"===e?.type?(async function(){a…`
- **Sink(s)**:
  - `FETCH_HEADERS` ([Unknown URL]) — `scripts/background` L1:C67451 -> L1:C67547  `…ders:n,...o}=e.options||{},s="https://api.infi-dev.com/ai-toolbox",i=s&&e.url.startsWith(s)&&await Kt()||void 0,c=await »fetch(a,{headers:{Authorization:t,"Chatgpt-Account-Id":r,...i?{"X-Team-Token":i}:{},...n},...o})«;if(!c.ok)throw new Error(`HTTP error: ${c.status}`);return await c.json()}catch(e){throw e}}async function mr(e){chrome…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (48 raw steps → 1 distinct lines):
   1. L1 `…nc function Ge(e,t){»await chrome.storage.local.set({[Me]:e,[Ue]:t,[ve]:!0})}const Ke=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a …⟨tainted span: 25785 chars⟩… it Kt()||void 0,c=await fetch(a,{headers:{Authorization:t,"Chatgpt-Account-Id":r,...i?{"X-Team-Token":i}:{},...n},...o})«;if(!c.ok)throw new …`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: teamAccessToken, sender: scripts/background, receiver: scripts/background], ASSIGN:logical-left, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:logical-right, COPY:object-spread

---

## Flow #8 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('teamRefreshToken') in scripts/background)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/background` L1:C59071 -> L1:C59072  `….origin&&vt.has(t.origin)?"TEAM_SESSION"===e?.type&&"string"==typeof e.accessToken&&"string"==typeof e.refreshToken?(Ge(»e«.accessToken,e.refreshToken).then(()=>r({ok:!0})).catch(()=>r({ok:!1})),!0):"TEAM_SIGNOUT"===e?.type?(async function(){a…`
- **Sink(s)**:
  - `FETCH_BODY` (https://api.infi-dev.com/ai-toolbox/teams/member/refresh) — `scripts/background` L1:C60055 -> L1:C60218  `…e.local.get("teamRefreshToken"),t=e?.teamRefreshToken||null;if(!t)return{ok:!1,reason:"session_gone"};try{const e=await »fetch("https://api.infi-dev.com/ai-toolbox/teams/member/refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:t})})«,r=await e.json().catch(()=>null);return r?.accessToken&&r?.refreshToken?(await Ge(r.accessToken,r.refreshToken),{ok:!0,…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (17 raw steps → 1 distinct lines):
   1. L1 `…nc function Ge(e,t){»await chrome.storage.local.set({[Me]:e,[Ue]:t,[ve]:!0})}const Ke=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a …⟨tainted span: 18456 chars⟩… teams/member/refresh",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({refreshToken:t})})«,r=await e.json().ca…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: teamRefreshToken, sender: scripts/background, receiver: scripts/background], ASSIGN:logical-left, ASSIGN:unary, RETURN:json.stringify

---
