# Source-level Taint Flow — mmehdbhpbgoegockemckbpjeoflflobc 3.0.45

- Source type: CRX
- Files with issues: 3 / 6
- Distinct taint flows: 5  (collapsed from 16 raw issue entries)
- Sinkless sources skipped: 16 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_TEXT_CONTENT (script[type="application/json"][data-sjs])

- **Source**: `ELEMENT_TEXT_CONTENT` — `static/js/content` L1:C3030 -> L1:C3055  `…st n=[];return e.forEach((e=>{try{var o,l,a,s,r,d,c,u,v,m,p,g,h,y,f,x,b,w,_,S,k,A,L,q,E,C,I,j,O,D,B,T,M,N,z,R,V;const K=»JSON.parse(e.textContent)«,Y=null===K||void 0===K||null===(o=K.require)||void 0===o||null===(l=o[0])||void 0===l||null===(a=l[3])||void 0===a||nul…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `static/js/content` L1:C31370 -> L1:C31399  `…RLs)||void 0===v||null===(p=v[e])||void 0===p?void 0:p.video_hd_url):s.getAttribute("src");if(!t)continue;const n=await »fetch(t,{credentials:"omit"})«,i=await n.blob(),{outBlob:r,format:d}=await w(i,{...L,onProgress:e=>{let{pct:t}=e;return l(t||0)}}),g=b(r.type||"video/…`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `static/js/content` L1:C32114 -> L1:C32122  `…url)||(null===_||void 0===_||null===(i=_.videoURLs[n])||void 0===i?void 0:i.video_hd_url):t.getAttribute("src"),a=await »fetch(l)«;return await a.blob()})))).map((e=>{const t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="video…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (11378 raw steps → 1 distinct lines):
   1. L1 `…s]');let t=[];const »n=[];return e.forEach((e=>{try{var o,l,a,s,r,d,c,u,v,m,p,g,h,y,f,x,b,w,_,S,k,A,L,q,E,C,I,j,O,D,B,T,M,N,z,R,V;const K=JSO …⟨tainted span: 49555 chars⟩… checked)})),null===g||void 0===g||g.addEventListener("change",(async function(){await o.update("videoOptions",(e=>({...e«,format:this.value})…`  · RETURN:json.parse, ELEMENT:member-element, ASSIGN:identifier, RETURN:fallback-return, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:member.length, ELEMENT:implicit.add, ELEMENT:array.find, ELEMENT:member-element-container, RETURN:string.concat, ASSIGN:binary-left, ITERATE:loop.iteration, ASSIGN:unary, ASSIGN:conditional-consequent, COPY:object-spread

---

## Flow #2 — WINDOW_MESSAGE_EVENT (From storage.local.set('adsList') in static/js/ads)

- **Source**: `WINDOW_MESSAGE_EVENT` — `static/js/content` L1:C12357 -> L1:C12365  `…nt"),s=document.getElementById("resetImgControls"),r=await o.get("imgOptions");Object.assign(e,r),t.value=String(e.noise»Amount),«n.value=String(e.quality);const d=()=>{i.textContent=String(t.value);const e=Number(n.value)||0;l.textContent=e.toFixed(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (adsList) — `static/js/content` L1:C39990 -> L1:C40042  `…yAd"),postText:g,platformsData:v,activeTime:u&&u[4]&&u[4].innerText,subattachments:[...x,...b],savedAt:Date.now(),...p},»chrome.storage.local.set({adsList:t},(function(){}))«}))})(e,o),setTimeout((()=>{n.textContent="Saved \u2705",setTimeout((()=>{n.classList.remove("saveToStorageActionClick")…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1761 raw steps → 1 distinct lines):
   1. L1 `…)){const t=n[i],l=o[»i];t&&"object"===typeof t&&!Array.isArray(t)?o[i]=e(l&&"object"===typeof l?l:{},t):o[i]=t}return o}const t={imgOptions:{ …⟨tainted span: 39836 chars⟩… 4].innerText,subattachments:[...x,...b],savedAt:Date.now(),...p},chrome.storage.local.set({adsList:t},(function(){}))}))«})(e,o),setTimeout((…`  · ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:member.length, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:binary-left, STORAGE:STORAGE_FLOW[area: local, key: adsList, sender: static/js/ads, receiver: static/js/content]

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `static/js/ads` L1:C12357 -> L1:C12365  `…(i))}}catch(o){}})),window.addEventListener("message",(async function(o){try{var n,l,i;if(null!==o&&void 0!==o&&null!==(»n=o.data«)&&void 0!==n&&n.type&&("ADS"===(null===o||void 0===o||null===(l=o.data)||void 0===l?void 0:l.type)||"ADS SPONSORED"===(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (adsList) — `static/js/ads` L1:C9897 -> L1:C9949  `…e.pageLink,btnText:e.btnText,subattachments:e.subattachments,adData:null===e||void 0===e?void 0:e.adData};o[n.postId]=n,»chrome.storage.local.set({adsList:o},(function(){}))«}))},o=document.body,n={childList:!0,subtree:!0};let l,i;const a=()=>{if(l)return!1;l=!0,i=setInterval((function(){windo…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (1758 raw steps → 1 distinct lines):
   1. L1 `…,he,ye,pe;let Oe,Me=»e.node.comet_sections.context_layout.story.comet_sections.actor_photo.story.actors[0],Ue=Me.category_type,Be=e.node.come …⟨tainted span: 12602 chars⟩… electorAll("h4 span a strong span"),r=l.pageName;Array.from(i).map((e=>{if((null===e||void 0===e?void 0:e.innerText)===r«){var t,o,n,i,a,d,c;…`  · ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:member.length, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:binary-left

---

## Flow #4 — WINDOW_MESSAGE_EVENT (From storage.local.set('adsList') in static/js/ads)  ·  3× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `static/js/ads` L1:C12357 -> L1:C12365  `…(i))}}catch(o){}})),window.addEventListener("message",(async function(o){try{var n,l,i;if(null!==o&&void 0!==o&&null!==(»n=o.data«)&&void 0!==n&&n.type&&("ADS"===(null===o||void 0===o||null===(l=o.data)||void 0===l?void 0:l.type)||"ADS SPONSORED"===(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (adsList) — `static/js/ads` L1:C9897 -> L1:C9949  `…e.pageLink,btnText:e.btnText,subattachments:e.subattachments,adData:null===e||void 0===e?void 0:e.adData};o[n.postId]=n,»chrome.storage.local.set({adsList:o},(function(){}))«}))},o=document.body,n={childList:!0,subtree:!0};let l,i;const a=()=>{if(l)return!1;l=!0,i=setInterval((function(){windo…`
- **Sanitized**: NO
- **Frame**: `CS_3`

- **Propagation** (1759 raw steps → 1 distinct lines):
   1. L1 `…,he,ye,pe;let Oe,Me=»e.node.comet_sections.context_layout.story.comet_sections.actor_photo.story.actors[0],Ue=Me.category_type,Be=e.node.come …⟨tainted span: 12602 chars⟩… electorAll("h4 span a strong span"),r=l.pageName;Array.from(i).map((e=>{if((null===e||void 0===e?void 0:e.innerText)===r«){var t,o,n,i,a,d,c;…`  · ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:member.length, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:binary-left, STORAGE:STORAGE_FLOW[area: local, key: adsList, sender: static/js/ads, receiver: static/js/ads]

---

## Flow #5 — WINDOW_MESSAGE_EVENT (From storage.local.set('adsList') in static/js/ads)  ·  10× duplicate paths collapsed

- **Source**: `WINDOW_MESSAGE_EVENT` — `static/js/adsList` L1:C12357 -> L1:C12365  `…oxy&&delete n.__emitterProxy;for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];t.apply(s,i)}return» n.__emi«tterProxy=t,s.on(e,n,a)},onAny(e,t){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!==typeof e)re…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `static/js/adsList` L1:C200414 -> L1:C200443  `…RLs)||void 0===v||null===(g=v[e])||void 0===g?void 0:g.video_hd_url):r.getAttribute("src");if(!t)continue;const a=await »fetch(t,{credentials:"omit"})«,n=await a.blob(),{outBlob:o,format:l}=await De(n,{...L,onProgress:e=>{let{pct:t}=e;return i(t||0)}}),c=Ie(o.type||"vide…`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `static/js/adsList` L1:C201380 -> L1:C201388  `…===(o=P.adData)||void 0===o||null===(l=o.videoURLs[a])||void 0===l?void 0:l.video_hd_url):t.getAttribute("src"),d=await »fetch(c)«;return await d.blob()})))).map((e=>{const t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="video…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (2317 raw steps → 1 distinct lines):
   1. L1 `…)){const t=a[n],i=s[»n];t&&"object"===typeof t&&!Array.isArray(t)?s[n]=e(i&&"object"===typeof i?i:{},t):s[n]=t}return s}const t=function(){le …⟨tainted span: 201178 chars⟩… .adData)||void 0===o||null===(l=o.videoURLs[a])||void 0===l?void 0:l.video_hd_url):t.getAttribute("src"),d=await fetch(c«);return await d.blo…`  · ASSIGN:binary-right, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:conditional-consequent, ELEMENT:member.length, ELEMENT:object.setProperty, RETURN:fallback-return, ASSIGN:binary-left, STORAGE:STORAGE_FLOW[area: local, key: adsList, sender: static/js/ads, receiver: static/js/adsList], ASSIGN:unary, RETURN:string.concat, ELEMENT:member-element-container

---
