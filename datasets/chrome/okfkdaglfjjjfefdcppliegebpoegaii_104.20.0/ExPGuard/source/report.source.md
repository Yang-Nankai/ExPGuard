# Source-level Taint Flow — okfkdaglfjjjfefdcppliegebpoegaii 104.20.0

- Source type: CRX
- Files with issues: 8 / 65
- Distinct taint flows: 2  (collapsed from 82 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.js-Cvbn7zHo` L15:C17778 -> L15:C17779  `…:e,to:t})=>{e!==void 0&&e!==t&&(Nu({ignoreDuration:!0}),Pu())})}function ac(e,t,n=!1){const r=e.handlers,a=(s,i,o)=>{if(»s«&&typeof s=="object"&&"type"in s&&r[s.type]){const c=r[s.type];try{const d=p=>{o(p)},l=p=>{const m=p instanceof Error?p.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (liveAction) — `assets/reactUi.tsx-BeR8kKjE` L1:C8741 -> L1:C8797  `…on(){var t=this,l=this.props.exit,u=this.getTimeouts(),p=this.props.nodeRef?void 0:Wn.findDOMNode(this);if(!l||la.disabl»ed){this.safeSetState({status:ht},function(){t.props.onE«xited(p)});return}this.props.onExit(p),this.safeSetState({status:Zn},function(){t.props.onExiting(p),t.onTransitionEnd(u…`
  - `CHROME_LOCAL_STORAGE` (isGuiding) — `assets/reactUi.tsx-BeR8kKjE` L1:C9064 -> L1:C9114  `…tate({status:ht},function(){t.props.onExited(p)})})})},a.cancelNextCallback=function(){this.nextCallback!==null&&(this.n»extCallback.cancel(),this.nextCallback=null)},a.sa«feSetState=function(t,l){l=this.setNextCallback(l),this.setState(t,l)},a.setNextCallback=function(t){var l=this,u=!0;ret…`
  - `CHROME_WINDOWS_CREATE_OPTIONS` — `assets/index.js-Cvbn7zHo` L1:C4540 -> L1:C4615  `…port{V as ii}from"./messages-Doy4qVfQ.js";import{d as $A,a as Un,l as qA,u as zA,p as jA,m as pp,o as WA,g as VA,c as GA»,b as KA,e as HA,__tla as YA}from"./dwScreenshotsDB-fKyjZO8n.js";import{u a«s JA}from"./domUtils-CHRfe7Op.js";import{s as XA,S as QA}from"./sidepanelActiveLifecycle-B52e0DNH.js";import{E as ci}fro…`
  - `CHROME_TABS_CREATE_OPTIONS` — `assets/index.js-Cvbn7zHo` L15:C188941 -> L15:C188968  `…ng:!1})),noAllowedDefaultRecordingTabUrl:!0,recordingStartFailureReason:"no_allowed_default_recording_tab_url"});return}»chrome.tabs.create({url:l})«.then(_=>{if(r||a||s||i){u.dispatch(Ht(!0)),u.dispatch(ze(!0)),S("create_new_tab_error",{networkOrServerError:o}),Se({in…`
  - `CHROME_TABS_CREATE_OPTIONS` — `assets/index.js-Cvbn7zHo` L1:C7566 -> L1:C7616  `….constructor.name,Object.setPrototypeOf(this,new.target.prototype),this.logLevel=n}}const Fn={},_i={};function Ke(e,t){F»n[e]=Fn[e]||[],Fn[e].push(t)}function He(e,t){_i[e«]||(t(),_i[e]=!0)}function ge(e,t){const n=e&&Fn[e];if(n)for(const r of n)try{r(t)}catch(a){_o&&P.error(`Error while tri…`
  - `CHROME_TABS_CREATE_OPTIONS` — `assets/index.js-Cvbn7zHo` L1:C6306 -> L1:C6344  `…==="https"}function Wt(e,t=!1){const{host:n,path:r,pass:a,port:s,projectId:i,protocol:o,publicKey:c}=e;return`${o}://${c»}${t&&a?`:${a}`:""}@${n}${s?`:${s}`:""«}/${r&&`${r}/`}${i}`}function yp(e){const t=gp.exec(e);if(!t){Su(()=>{console.error(`Invalid Sentry Dsn: ${e}`)});return…`
  - `CHROME_TABS_CREATE_OPTIONS` — `assets/index.js-Cvbn7zHo` L15:C199843 -> L15:C199874  `…e==="editRecordingFor"&&(u.dispatch(Zo(e)),Js(e,t,n)),e==="stopRecording"){r&&On();return}if(e.messageType==="openUrl"&&»chrome.tabs.create({url:e.url})«.then(a=>{if(e.pinDocument){Hs=a.id,u.dispatch(Je(!0)),u.dispatch(pt(e.pinDocument));const s=(i,o,c)=>{i===a.id&&o.statu…`
  - `CHROME_LOCAL_STORAGE` (isPinExtensionModalVisible) — `assets/index.js-Cvbn7zHo` L15:C201844 -> L15:C201910  `…:s,status:a,version:chrome.runtime.getManifest().version});return}if(e?.messageType==="setPinExtensionModalVisibility"&&»chrome.storage.local.set({isPinExtensionModalVisible:e.isVisible})«,e.messageType==="startDropPin"){Y().then(async a=>{!a?.id||await ce(a)||(chrome.tabs.sendMessage(a.id,{messageType:"sta…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5229 raw steps → 2 distinct lines):
   1. L15 `…lers,a=(s,i,o)=>{if(»s&&typeof s=="object"&&"type"in s&&r[s.type]){const c=r[s.type];try{const d=p=>{o(p)},l=p=>{const m=p instanceof Error?p …⟨tainted span: 184389 chars⟩… spatch(Je(!0)),e.scribe?u.dispatch(pt(e.scribe)):u.dispatch(pt(null)))});return}return!1};Hv(function(e,t,n){return xT(e«,t,n)});const LT=new…`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:destructure-property[updates], ASSIGN:binary-right, ASSIGN:unary, ASSIGN:conditional-alternate, COPY:object-spread, ELEMENT:implicit.add
   2. L1 _(in `assets/reactUi.tsx-BeR8kKjE`)_ `…r,bs as np,s as Ve,g»j as rp,gk as ap,aq as ip,gl as go,gm as op,cR as sp,gn as lp,go as Do,cd as bo,gp as up,e0 as cp,gq as xo,gr as dp,dc a …⟨tainted span: 8785 chars⟩… tion(t,l){l=this.setNextCallback(l),this.setState(t,l)},a.setNextCallback=function(t){var l=this,u=!0;return this.nextCa«llback=function(p){u…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:logical-left, COPY:object-spread, ASSIGN:template-literal, ELEMENT:destructure-property[scribe], ASSIGN:unary, ELEMENT:destructure-property[id], ELEMENT:destructure-property[name], ASSIGN:conditional-consequent, RETURN:encodeURI, ELEMENT:implicit.add, ELEMENT:member-element-container

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('liveAction') in assets/index.js-Cvbn7zHo)  ·  81× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.js-Cvbn7zHo` L15:C17778 -> L15:C17779  `…:e,to:t})=>{e!==void 0&&e!==t&&(Nu({ignoreDuration:!0}),Pu())})}function ac(e,t,n=!1){const r=e.handlers,a=(s,i,o)=>{if(»s«&&typeof s=="object"&&"type"in s&&r[s.type]){const c=r[s.type];try{const d=p=>{o(p)},l=p=>{const m=p instanceof Error?p.…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (liveAction) — `assets/reactUi.tsx-BeR8kKjE` L1:C8741 -> L1:C8797  `…on(){var t=this,l=this.props.exit,u=this.getTimeouts(),p=this.props.nodeRef?void 0:Wn.findDOMNode(this);if(!l||la.disabl»ed){this.safeSetState({status:ht},function(){t.props.onE«xited(p)});return}this.props.onExit(p),this.safeSetState({status:Zn},function(){t.props.onExiting(p),t.onTransitionEnd(u…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (5266 raw steps → 2 distinct lines):
   1. L15 `…lers,a=(s,i,o)=>{if(»s&&typeof s=="object"&&"type"in s&&r[s.type]){const c=r[s.type];try{const d=p=>{o(p)},l=p=>{const m=p instanceof Error?p …⟨tainted span: 184389 chars⟩… spatch(Je(!0)),e.scribe?u.dispatch(pt(e.scribe)):u.dispatch(pt(null)))});return}return!1};Hv(function(e,t,n){return xT(e«,t,n)});const LT=new…`  · ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:destructure-property[updates], ASSIGN:binary-right, ASSIGN:unary, ASSIGN:conditional-alternate, COPY:object-spread, ELEMENT:implicit.add
   2. L1 _(in `assets/reactUi.tsx-BeR8kKjE`)_ `…r,bs as np,s as Ve,g»j as rp,gk as ap,aq as ip,gl as go,gm as op,cR as sp,gn as lp,go as Do,cd as bo,gp as up,e0 as cp,gq as xo,gr as dp,dc a …⟨tainted span: 8785 chars⟩… tion(t,l){l=this.setNextCallback(l),this.setState(t,l)},a.setNextCallback=function(t){var l=this,u=!0;return this.nextCa«llback=function(p){u…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:logical-left, COPY:object-spread, ASSIGN:template-literal, ELEMENT:destructure-property[scribe], ASSIGN:unary, ELEMENT:destructure-property[id], ELEMENT:destructure-property[name], ASSIGN:conditional-consequent, RETURN:encodeURI, ELEMENT:implicit.add, ELEMENT:member-element-container, STORAGE:STORAGE_FLOW[area: local, key: liveAction, sender: assets/index.js-Cvbn7zHo, receiver: assets/index.js-Cvbn7zHo], RETURN:json.parse

---
