# Source-level Taint Flow — bbaogjaeflnjolejjcpceoapngapnbaj 7.1.5.3

- Source type: CRX
- Files with issues: 2 / 10
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/index.ts-Cd05R5Gr` L1:C41971 -> L1:C41972  `….onMessageExternal.addListener((async(o,c,d)=>{const{type:l,action:u,settings:m,aliExpressUrl:g="",rawDomain:p,token:y}=»o«;if(l)switch(l){case e.CHECK_INSTALL_EXT:d(l);break;case e.GET_AUTH_TOKEN:try{if(!p)return;d(await t(p))}catch(h){consol…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `assets/index.ts-Cd05R5Gr` L1:C42013 -> L1:C42017  `…d)=>{const{type:l,action:u,settings:m,aliExpressUrl:g="",rawDomain:p,token:y}=o;if(l)switch(l){case e.CHECK_INSTALL_EXT:»d(l)«;break;case e.GET_AUTH_TOKEN:try{if(!p)return;d(await t(p))}catch(h){console.log("error",h)}break;case e.SET_AUTH_TOKEN:…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `assets/index.ts-Cd05R5Gr` L1:C666 -> L1:C782  `…O.js";import"./_commonjsHelpers-CdNy-jbM.js";const X=e=>{chrome.scripting.executeScript({target:{tabId:e},world:"MAIN",f»unc:()=>{const e=window;if(e.__alireviewsDserHooked)return;e.__alireviewsDserHooked=!0;const a=window.fetch;window.f«etch=async function(...e){let t=null;try{const a=e[0],r=e[1]||{},n=a&&"string"!=typeof a&&"string"==typeof a.url,i=n?a.u…`  (url-control=FULL)
  - `FETCH_BODY` (https://priv.kudosi.ai/extension/v2/save-reviews) — `assets/main.tsx-CL5h2SCU` L1:C54497 -> L1:C54623  `…dow:[{shadow:["","inner","none",wr,Ar]}],"shadow-color":[{shadow:[Er]}],opacity:[{opacity:[h]}],"mix-blend":[{"mix-blend»":["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference"«,"exclusion","hue","saturation","color","luminosity","plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":["normal","…`
  - `FETCH_BODY` (https://priv.kudosi.ai/extension/set-error/:job_import_id) — `assets/index.ts-Cd05R5Gr` L1:C3156 -> L1:C3281  `….error("Error in addScriptToDom:",chrome.runtime.lastError.message),t(!1)):t(!0)}))}catch(r){console.error("Error in add»ScriptToDom:",r),t(!1)}},te=e=>{try{const a=document.createElement("script");a.src=chrome.runtime.getURL(`/assets/${e.name}.j«s`),a.type="module",a.onload=()=>console.log(`%cScript loaded: ${e.name}.js`,"background-color: #005bd3; color: #ffffff;…`
  - `FETCH_BODY` (https://priv.kudosi.ai/extension/set-status/:job_import_id) — `assets/index.ts-Cd05R5Gr` L1:C4145 -> L1:C4270  `…}=e.payload;(async function(e){const a=await v(e);if(!a)return{progress:0,isImporting:!1};const t=await f.getQueueByValu»e("rawDomain",e);if(!(null==t?void 0:t.length))return await h(e),{progress:0,isImporting:!1};const r=(null==a?void 0:a.total_«import_products)||0,n=r-t.length;return{progress:Math.round(n/r*100),isImporting:!0}})(a).then(t)}}};const ne=(e={},a)=>…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (658 raw steps → 1 distinct lines):
   1. L1 _(in `assets/main.tsx-CL5h2SCU`)_ `…";import{a as re,i a»s oe,g as ne,f as ie,d as se,s as ae,I as le,P as ce,r as ue,b as de,c as me,e as pe,E as ve,h as fe,j as be,k as he,p a …⟨tainted span: 58658 chars⟩… fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","r«ounded-b","rounded-l…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[action], ELEMENT:destructure-property[settings], ELEMENT:destructure-property[aliExpressUrl], ELEMENT:destructure-property[rawDomain], ELEMENT:destructure-property[token], ASSIGN:binary-left, ELEMENT:destructure-property[max_number_per_save], ELEMENT:destructure-property[get_max_number_review], ELEMENT:member-element, RETURN:fallback-return, ASSIGN:template-literal, ELEMENT:object.setProperty, INITIAL:URL.constructor, ASSIGN:unary, ASSIGN:logical-left, ELEMENT:member-element-container, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, ASSIGN:conditional-consequent, ASSIGN:binary-right, ELEMENT:destructure-property[shop_raw_domain], ELEMENT:destructure-property[product_id], ELEMENT:destructure-property[job_import_id], ELEMENT:implicit.add, RETURN:json.stringify, ASSIGN:logical-right

---
