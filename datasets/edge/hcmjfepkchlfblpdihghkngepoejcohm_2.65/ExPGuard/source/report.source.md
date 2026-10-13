# Source-level Taint Flow — hcmjfepkchlfblpdihghkngepoejcohm 2.65

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 10  (collapsed from 10 raw issue entries)
- Sinkless sources skipped: 21 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content` L2:C640561 -> L2:C640562  `… eu=window.location.href,tu=async function(){console.log("injectButton called");let e=window.location.href,t=Xs.fromURL(»e«);if(null!=t)if(t.isProductPage(e)){console.log("isProductPage, injecting");let r=t.merchantIdFromURL(e,(new XMLSerializ…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (location.href) — `content` L2:C412063 -> L2:C412092  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
  - `FETCH_RESOURCE` (location.href) — `content` L2:C415606 -> L2:C415635  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content` L2:C663992 -> L2:C664069  `…e_type:"getProductPostMessage",url:e.data.url},(e=>{console.log("response getProductPostMessage from content script",e),»window.postMessage({direction:"getProductPostMessageFromContent",response:e})«}))),e.data.message&&"gatherOrdersPostMessage"==e.data.message&&(console.log("Content script received: gatherOrdersPostM…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content` L2:C664341 -> L2:C664420  `…age({message_type:"gatherOrdersPostMessage"},(e=>{console.log("response gatherOrdersPostMessage from content script",e),»window.postMessage({direction:"gatherOrdersPostMessageFromContent",response:e})«}))))}),!1)}})()})();`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1024 raw steps → 1 distinct lines):
   1. L2 `…n/\/dp\/(\w+)/.test(»e)||/\/gp\/product\/(\w+)/.test(e)}getMerchant(){return"amazonWishlist"}merchantIdFromURL(e,t=""){let r="",n=e.match(/\/ …⟨tainted span: 410621 chars⟩… rsPostMessage from content script",e),window.postMessage({direction:"gatherOrdersPostMessageFromContent",response:e})}))«))}),!1)}})()})();`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, MESSAGE
      ⇄ cross-context hop: `runtime.single.response.message[service-worker->content]`

---

## Flow #2 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `content` L2:C393595 -> L2:C393616  `…t(){return"target"}merchantIdFromURL(e,t=""){return this.normalizeUrl(e)}async getRequestInfo(){let e=function(e){let t=»document.cookie.split«("; ");for(let r of t){let[t,n]=r.split("=");if(t===e)return decodeURIComponent(n)}return null}("GuestLocation").split("…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content` L2:C393954 -> L2:C393962  `…9f36aeafbe60771e321a7cc95a78140772ab3e96&zipcode="+e;console.log("fetching preferred store for zip code",e);let n=await »fetch(r)«,a=await n.json();return a?.preferred_stores?.length>0?(t=a.preferred_stores[0].location_id,console.log("found store_id"…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (62 raw steps → 1 distinct lines):
   1. L2 `…etRequestInfo(){let »e=function(e){let t=document.cookie.split("; ");for(let r of t){let[t,n]=r.split("=");if(t===e)return decodeURIComponent …⟨tainted span: 587 chars⟩… location_id,console.log("found store_id",t)):console.log("could not find store id, length == 0"),{zip_code:e,store_id:t}«}async fetch(e){cons…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1], ASSIGN:binary-left, RETURN:decodeURIComponent, ASSIGN:binary-right

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L2:C663728 -> L2:C663742  `…og("injected beacon onto PL app page"),window.addEventListener("message",(function(e){console.log(e),e.source==window&&(»e.data.message«&&"getProductPostMessage"==e.data.message&&(console.log("Content script received: "+e.data.url),chrome.runtime.sendMessa…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content` L2:C663992 -> L2:C664069  `…e_type:"getProductPostMessage",url:e.data.url},(e=>{console.log("response getProductPostMessage from content script",e),»window.postMessage({direction:"getProductPostMessageFromContent",response:e})«}))),e.data.message&&"gatherOrdersPostMessage"==e.data.message&&(console.log("Content script received: gatherOrdersPostM…`
  - `WINDOW_POSTMESSAGE` ([UNKNOWN ORIGIN]) — `content` L2:C664341 -> L2:C664420  `…age({message_type:"gatherOrdersPostMessage"},(e=>{console.log("response gatherOrdersPostMessage from content script",e),»window.postMessage({direction:"gatherOrdersPostMessageFromContent",response:e})«}))))}),!1)}})()})();`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (129 raw steps → 1 distinct lines):
   1. L2 `…e worker to check"),»chrome.runtime.sendMessage({message_type:"check_alert_exists_product_id",product_id:r,merchant:t.getMerchant()},(a=>{if( …⟨tainted span: 23344 chars⟩… rsPostMessage from content script",e),window.postMessage({direction:"gatherOrdersPostMessageFromContent",response:e})}))«))}),!1)}})()})();`  · ELEMENT:member-element, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, MESSAGE, ELEMENT:member-element-container, ASSIGN:identifier, ASSIGN:binary-left
      ⇄ cross-context hop: `runtime.single.response.message[service-worker->content]`

---

## Flow #4 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `service-worker` L2:C410342 -> L2:C410561  `…dth");break}-1!=n?(console.log(s[n]),r("width",s[n].id)):console.log("Did not find a match for width")}}}))}let u=!0;if(»null==i||new URL(window.location.href).searchParams.has("color")||(u=!1),null==c||new URL(window.location.href).searchParams.has("size")||(u=!1),null==s||new URL(window.location.href).searchParams.has("width")||(u=!1),u«){let r=e.querySelector("#product-page-product-title-lockup");null!=r&&r.insertAdjacentElement("beforebegin",t)}let p=do…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (location.href) — `service-worker` L2:C411814 -> L2:C411843  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
  - `FETCH_RESOURCE` (location.href) — `service-worker` L2:C415357 -> L2:C415386  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (668 raw steps → 1 distinct lines):
   1. L2 `…function(e,t){const »r=new URL(window.location.href),n=r.searchParams;null==t?n.delete(e):n.set(e,t),window.history.replaceState({},"",r)},n= …⟨tainted span: 146044 chars⟩… cation.href).searchParams.has("size")||(u=!1),null==s||new URL(window.location.href).searchParams.has("width")||(u=!1),u«){let r=e.querySelec…`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:logical-left, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right

---

## Flow #5 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `service-worker` L2:C393346 -> L2:C393367  `…t(){return"target"}merchantIdFromURL(e,t=""){return this.normalizeUrl(e)}async getRequestInfo(){let e=function(e){let t=»document.cookie.split«("; ");for(let r of t){let[t,n]=r.split("=");if(t===e)return decodeURIComponent(n)}return null}("GuestLocation").split("…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L2:C393705 -> L2:C393713  `…9f36aeafbe60771e321a7cc95a78140772ab3e96&zipcode="+e;console.log("fetching preferred store for zip code",e);let n=await »fetch(r)«,a=await n.json();return a?.preferred_stores?.length>0?(t=a.preferred_stores[0].location_id,console.log("found store_id"…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (62 raw steps → 1 distinct lines):
   1. L2 `…etRequestInfo(){let »e=function(e){let t=document.cookie.split("; ");for(let r of t){let[t,n]=r.split("=");if(t===e)return decodeURIComponent …⟨tainted span: 587 chars⟩… location_id,console.log("found store_id",t)):console.log("could not find store id, length == 0"),{zip_code:e,store_id:t}«}async fetch(e){cons…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1], ASSIGN:binary-left, RETURN:decodeURIComponent, ASSIGN:binary-right

---

## Flow #6 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `service-worker` L2:C650726 -> L2:C654461  `…ts"),t.status}()})),»chrome.runtime.onMessage.addListener(((e,t,r)=>((async()=>{if(console.log("message.message_type: "+e.message_type),"chec …⟨tainted span: 3735 chars⟩… ostMessage"==e.message_type&&(console.log("called gatherOrdersPostMessage from service worker"),r(await ou()))})(),!0)))«,chrome.runtime.onMe…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L2:C650949 -> L2:C651142  `…ssage_type),"check_alert_exists_product_id"==e.message_type){console.log("message.product_id",e.product_id);let t=await »fetch("https://pricelasso.com/api/alerts?merchant="+e.merchant+"&merchant_product_id="+encodeURIComponent(e.product_id),{method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}})«;if(t.ok){let e=await t.json();console.log("alerts",e),console.log("alerts.length",e.length),0==e.length&&r({message:"no…`  (url-control=PARTIAL)
  - `FETCH_RESOURCE` (location.href) — `service-worker` L2:C651671 -> L2:C651685  `…ait n.fetch(a);else{let r="",a={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{let t=await »fetch(e.url,a)«;t.ok&&(r=await t.text())}catch(t){return console.log("Could not fetch for alert from product page",t),null}o=n.parse(r,…`  (url-control=FULL)
  - `FETCH_BODY` (https://pricelasso.com/api/alerts) — `service-worker` L2:C652191 -> L2:C652330  `…y(e.request_info),title:o.title,image_link:o.image_link,current_price:l}}),console.log("alert to insert",c);let s=await »fetch("https://pricelasso.com/api/alerts",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(c)})«;if(s.ok){console.log("inserted alerts!");let e=await s.json();console.log("alert_result",e);let t=e[0].alert_id;console…`
  - `FETCH_RESOURCE` (location.href) — `service-worker` L2:C645644 -> L2:C645656  `…oduct_url"),{status:"fail",data:"unsupported_product_url"};{console.log("supported domain and product url");let t=await »fetch(e.url)«;if(t.ok){let r=await t.text(),n=Ks.fromURL(e.url),a=n.parse(r,e.url);console.log("product from getProduct message",a);l…`  (url-control=FULL)
  - `FETCH_RESOURCE` (location.href) — `service-worker` L2:C411814 -> L2:C411843  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
  - `FETCH_RESOURCE` (location.href) — `service-worker` L2:C415357 -> L2:C415386  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (1075 raw steps → 1 distinct lines):
   1. L2 `…rmalizeUrl(e){return»"https://www.amazon.com/dp/"+this.merchantIdFromURL(e)+"?th=1&psc=1"}isProductPage(e){return/\/dp\/(\w+)/.test(e)||/\/gp …⟨tainted span: 401019 chars⟩… ostMessage"==e.message_type&&(console.log("called gatherOrdersPostMessage from service worker"),r(await ou()))})(),!0)))«,chrome.runtime.onMe…`  · MESSAGE, RETURN:encodeURIComponent, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, RETURN:json.stringify, ELEMENT:implicit.add, INITIAL:URL.constructor, ELEMENT:member-element-container, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href
      ⇄ cross-context hop: `runtime.single.sender.message[content->service-worker]`

---

## Flow #7 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `service-worker` L2:C650726 -> L2:C654461  `…ts"),t.status}()})),»chrome.runtime.onMessage.addListener(((e,t,r)=>((async()=>{if(console.log("message.message_type: "+e.message_type),"chec …⟨tainted span: 3735 chars⟩… ostMessage"==e.message_type&&(console.log("called gatherOrdersPostMessage from service worker"),r(await ou()))})(),!0)))«,chrome.runtime.onMe…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L2:C645644 -> L2:C645656  `…oduct_url"),{status:"fail",data:"unsupported_product_url"};{console.log("supported domain and product url");let t=await »fetch(e.url)«;if(t.ok){let r=await t.text(),n=Ks.fromURL(e.url),a=n.parse(r,e.url);console.log("product from getProduct message",a);l…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (267 raw steps → 1 distinct lines):
   1. L2 `…rmalizeUrl(e){return»"https://www.amazon.com/dp/"+this.merchantIdFromURL(e)+"?th=1&psc=1"}isProductPage(e){return/\/dp\/(\w+)/.test(e)||/\/gp …⟨tainted span: 401019 chars⟩… ostMessage"==e.message_type&&(console.log("called gatherOrdersPostMessage from service worker"),r(await ou()))})(),!0)))«,chrome.runtime.onMe…`  · MESSAGE, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-right, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:implicit.add
      ⇄ cross-context hop: `runtime.single.sender.message[content->service-worker]`

---

## Flow #8 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `service-worker` L2:C654542 -> L2:C654543  `…rvice worker"),r(await ou()))})(),!0))),chrome.runtime.onMessageExternal.addListener((async function(e,t,r){console.log(»e«,t),"gatherOrders"==e.message?r(await ou()):"getProduct"==e.message?r(await lu(e)):r({status:"fail",message:"unsupported…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `service-worker` L2:C645644 -> L2:C645656  `…oduct_url"),{status:"fail",data:"unsupported_product_url"};{console.log("supported domain and product url");let t=await »fetch(e.url)«;if(t.ok){let r=await t.text(),n=Ks.fromURL(e.url),a=n.parse(r,e.url);console.log("product from getProduct message",a);l…`  (url-control=FULL)
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `service-worker` L2:C654611 -> L2:C654625  `…nal.addListener((async function(e,t,r){console.log(e,t),"gatherOrders"==e.message?r(await ou()):"getProduct"==e.message?»r(await lu(e))«:r({status:"fail",message:"unsupported_message"})}))})()})();`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (122 raw steps → 1 distinct lines):
   1. L2 `…rmalizeUrl(e){return»"https://www.amazon.com/dp/"+this.merchantIdFromURL(e)+"?th=1&psc=1"}isProductPage(e){return/\/dp\/(\w+)/.test(e)||/\/gp …⟨tainted span: 401183 chars⟩… r((async function(e,t,r){console.log(e,t),"gatherOrders"==e.message?r(await ou()):"getProduct"==e.message?r(await lu(e))«:r({status:"fail",me…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:object.setProperty, ELEMENT:implicit.add

---

## Flow #9 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `popup` L2:C410333 -> L2:C410552  `…dth");break}-1!=n?(console.log(s[n]),r("width",s[n].id)):console.log("Did not find a match for width")}}}))}let u=!0;if(»null==i||new URL(window.location.href).searchParams.has("color")||(u=!1),null==c||new URL(window.location.href).searchParams.has("size")||(u=!1),null==s||new URL(window.location.href).searchParams.has("width")||(u=!1),u«){let r=e.querySelector("#product-page-product-title-lockup");null!=r&&r.insertAdjacentElement("beforebegin",t)}let p=do…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (location.href) — `popup` L2:C411805 -> L2:C411834  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
  - `FETCH_RESOURCE` (location.href) — `popup` L2:C415348 -> L2:C415377  `….log("entered getAddAlertInjection");let n={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8"}};try{»fetch(window.location.href,n)«.then((e=>e.text())).then((e=>{console.log("html fetched from addAlertInjection");let t=null;if(t=e.match(/<script type=…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (668 raw steps → 1 distinct lines):
   1. L2 `…function(e,t){const »r=new URL(window.location.href),n=r.searchParams;null==t?n.delete(e):n.set(e,t),window.history.replaceState({},"",r)},n= …⟨tainted span: 146044 chars⟩… cation.href).searchParams.has("size")||(u=!1),null==s||new URL(window.location.href).searchParams.has("width")||(u=!1),u«){let r=e.querySelec…`  · ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:logical-left, MUTATE:URLSearchParams.append->URL, MUTATE:URL.searchParams->href, ASSIGN:identifier, ASSIGN:binary-left, ASSIGN:binary-right

---

## Flow #10 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `popup` L2:C393337 -> L2:C393358  `…t(){return"target"}merchantIdFromURL(e,t=""){return this.normalizeUrl(e)}async getRequestInfo(){let e=function(e){let t=»document.cookie.split«("; ");for(let r of t){let[t,n]=r.split("=");if(t===e)return decodeURIComponent(n)}return null}("GuestLocation").split("…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup` L2:C393696 -> L2:C393704  `…9f36aeafbe60771e321a7cc95a78140772ab3e96&zipcode="+e;console.log("fetching preferred store for zip code",e);let n=await »fetch(r)«,a=await n.json();return a?.preferred_stores?.length>0?(t=a.preferred_stores[0].location_id,console.log("found store_id"…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (62 raw steps → 1 distinct lines):
   1. L2 `…etRequestInfo(){let »e=function(e){let t=document.cookie.split("; ");for(let r of t){let[t,n]=r.split("=");if(t===e)return decodeURIComponent …⟨tainted span: 587 chars⟩… location_id,console.log("found store_id",t)):console.log("could not find store id, length == 0"),{zip_code:e,store_id:t}«}async fetch(e){cons…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:implicit.add, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:destructure-element[0], ELEMENT:destructure-element[1], ASSIGN:binary-left, RETURN:decodeURIComponent, ASSIGN:binary-right

---
