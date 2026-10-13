# Source-level Taint Flow — aoiidodopnnhiflaflbfeblnojefhigh 9.4

- Source type: CRX
- Files with issues: 7 / 9
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 23 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/app` L1:C863101 -> L1:C863129  `…ction:"getAutoCouponsState",url:document.location.href});if(!state){let affiliateTabId=await openCloseAffiliateUrl();if(»window.location.href.indexOf«("cart")>-1){const shoppingCartIDXpath="substring-before(substring-after(//script[contains(text(),'shoppingCartId')],'sh…`
- **Sink(s)**:
  - `JQUERY_SETTINGS_DATA` — `js/app` L1:C842076 -> L1:C842539  `…getParam("orderId");»$.ajax({url:`https://api.thehalara.com/mall-order/order/submit-detail`,type:"POST",data:JSON.stringify({couponCode:code, …⟨tainted span: 463 chars⟩… ata.costPrice;callback(value)}else{callback(Number.POSITIVE_INFINITY)}},error:()=>{callback(Number.POSITIVE_INFINITY)}})«}},lelo:{removePrevC…`
  - `JQUERY_AJAX_DATA` (https://api.thehalara.com/mall-order/order/submit-detail) — `js/app` L1:C842076 -> L1:C842539  `…getParam("orderId");»$.ajax({url:`https://api.thehalara.com/mall-order/order/submit-detail`,type:"POST",data:JSON.stringify({couponCode:code, …⟨tainted span: 463 chars⟩… ata.costPrice;callback(value)}else{callback(Number.POSITIVE_INFINITY)}},error:()=>{callback(Number.POSITIVE_INFINITY)}})«}},lelo:{removePrevC…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (164 raw steps → 1 distinct lines):
   1. L1 `…getParam("orderId");»$.ajax({url:`https://api.thehalara.com/mall-order/order/submit-detail`,type:"POST",data:JSON.stringify({couponCode:code, …⟨tainted span: 21061 chars⟩… ment.location.href});if(!state){let affiliateTabId=await openCloseAffiliateUrl();if(window.location.href.indexOf("cart")«>-1){const shoppingC…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-right, ELEMENT:object.setProperty, INITIAL:URL.constructor, ELEMENT:member-element-container, ASSIGN:identifier, RETURN:json.stringify

---

## Flow #2 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `js/app` L1:C858918 -> L1:C858953  `…-ac_apply_variables"){windowVariables=e.data.content}}));function getCookie(cname){var name=cname+"=";var decodedCookie=»decodeURIComponent(document.cookie)«;var ca=decodedCookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" "){c=c.substring(1)}if(c.…`
- **Sink(s)**:
  - `JQUERY_SETTINGS_URL` — `js/app` L1:C834077 -> L1:C834326  `…okie("g2a-cart-id");»$.ajax({url:`https://www.g2a.com/cart/api/carts/${cartId}?`,type:"PATCH",headers:{"content-type":"application/json;chars …⟨tainted span: 249 chars⟩… ,"g2a-ctx-user-has-plus":false},data:JSON.stringify({couponCode:null}),success:()=>{callback()},error:()=>{callback()}})«},preApplyCodes:func…`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `js/app` L1:C834077 -> L1:C834326  `…okie("g2a-cart-id");»$.ajax({url:`https://www.g2a.com/cart/api/carts/${cartId}?`,type:"PATCH",headers:{"content-type":"application/json;chars …⟨tainted span: 249 chars⟩… ,"g2a-ctx-user-has-plus":false},data:JSON.stringify({couponCode:null}),success:()=>{callback()},error:()=>{callback()}})«},preApplyCodes:func…`  (url-control=PARTIAL)
  - `JQUERY_SETTINGS_URL` — `js/app` L1:C834948 -> L1:C835349  `…okie("g2a-cart-id");»$.ajax({url:`https://www.g2a.com/cart/api/carts/${cartId}?`,type:"PATCH",headers:{"content-type":"application/json;chars …⟨tainted span: 401 chars⟩… llback(value)}else{callback(Number.POSITIVE_INFINITY)}},error:(xhr,status,error)=>{callback(Number.POSITIVE_INFINITY)}})«}},intuit:{removePre…`  (url-control=PARTIAL)
  - `JQUERY_AJAX_URL` — `js/app` L1:C834948 -> L1:C835349  `…okie("g2a-cart-id");»$.ajax({url:`https://www.g2a.com/cart/api/carts/${cartId}?`,type:"PATCH",headers:{"content-type":"application/json;chars …⟨tainted span: 401 chars⟩… llback(value)}else{callback(Number.POSITIVE_INFINITY)}},error:(xhr,status,error)=>{callback(Number.POSITIVE_INFINITY)}})«}},intuit:{removePre…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (23660 raw steps → 1 distinct lines):
   1. L1 `…ode,callback){const »cartId=getCookie("g2a-cart-id");$.ajax({url:`https://www.g2a.com/cart/api/carts/${cartId}?`,type:"PATCH",headers:{"conte …⟨tainted span: 25086 chars⟩… ++){var c=ca[i];while(c.charAt(0)==" "){c=c.substring(1)}if(c.indexOf(name)==0){return c.substring(name.length,c.length)«}}return""}function …`  · RETURN:decodeURIComponent, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:implicit.add, ASSIGN:template-literal, ELEMENT:object.setProperty

---

## Flow #3 — TARGET_CUSTOM_EVENT (target.addEventListener(pb1_OpenUrl_Event))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/background` L1:C228012 -> L1:C228062  `…ON_URL="https://www.amazon.com/exec/obidos/ASIN/";const defaultHasPushCoupons=false;let isGetRetailersReady=true;init();»browser.runtime.onMessage.addListener(wrapRequest)«;browser.runtime.onInstalled.addListener((async function(details){let previousVersion=parseFloat(details.previousVersion…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/background` L1:C236576 -> L1:C236661  `…m_content=feb_chrome&url=https://www.cnet.com/shopping/welcome-priceblink/",active:true})}if(request.action=="openUrl"){»browser.tabs.create({url:request.url,active:false},(function(tab){callback(tab.id)}))«}if(request.action=="openCloseUrl"){browser.tabs.create({url:request.url,active:false},(async function(tab){if(request?.…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (184 raw steps → 1 distinct lines):
   1. L1 `…rsReady=true;init();»browser.runtime.onMessage.addListener(wrapRequest);browser.runtime.onInstalled.addListener((async function(details){let  …⟨tainted span: 41196 chars⟩… :invalidTabId}}}async function isSuppressed(url,suppressedRetailers,suppressingTabIDs,tabID){const rid=getRetailerId(url«);if(rid){if(suppres…`  · MESSAGE, ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:unary, INITIAL:URL.constructor, ELEMENT:member-element, ASSIGN:binary-right, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[js/app->js/background]`

---

## Flow #4 — TARGET_CUSTOM_EVENT (target.addEventListener(pb1_OpenUrl_Event))

- **Source**: `TARGET_CUSTOM_EVENT` — `js/coupons_popup` L1:C218342 -> L1:C218392  `…ON_URL="https://www.amazon.com/exec/obidos/ASIN/";const defaultHasPushCoupons=false;let isGetRetailersReady=true;init();»browser.runtime.onMessage.addListener(wrapRequest)«;browser.runtime.onInstalled.addListener((async function(details){let previousVersion=parseFloat(details.previousVersion…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `js/coupons_popup` L1:C226906 -> L1:C226991  `…m_content=feb_chrome&url=https://www.cnet.com/shopping/welcome-priceblink/",active:true})}if(request.action=="openUrl"){»browser.tabs.create({url:request.url,active:false},(function(tab){callback(tab.id)}))«}if(request.action=="openCloseUrl"){browser.tabs.create({url:request.url,active:false},(async function(tab){if(request?.…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (184 raw steps → 1 distinct lines):
   1. L1 `…rsReady=true;init();»browser.runtime.onMessage.addListener(wrapRequest);browser.runtime.onInstalled.addListener((async function(details){let  …⟨tainted span: 41196 chars⟩… :invalidTabId}}}async function isSuppressed(url,suppressedRetailers,suppressingTabIDs,tabID){const rid=getRetailerId(url«);if(rid){if(suppres…`  · MESSAGE, ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:unary, INITIAL:URL.constructor, ELEMENT:member-element, ASSIGN:binary-right, RETURN:fallback-return, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[js/app->js/coupons_popup]`

---

## Flow #5 — ELEMENT_VALUE (country)

- **Source**: `ELEMENT_VALUE` — `js/options` L1:C146863 -> L1:C146878  `…t updateUrl="https://tb.priceblink.com/universal_scrapes.php?uid="+uid+"&browser=chrome&ver=9.4&action=u&country_pref="+»selectedCountry«+"&n="+(new Date).getMilliseconds();const response=await fetch(updateUrl);if(!response.ok){setStatus("Oops!!! Something …`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/options` L1:C146935 -> L1:C146951  `…&browser=chrome&ver=9.4&action=u&country_pref="+selectedCountry+"&n="+(new Date).getMilliseconds();const response=await »fetch(updateUrl)«;if(!response.ok){setStatus("Oops!!! Something went wrong, please try again.");return}await storageSetPromise({country:s…`  (url-control=FULL)
  - `CHROME_SYNC_STORAGE` (country) — `js/options` L1:C141456 -> L1:C141492  `…romise=async function(obj,options={storageType:"local"}){return new Promise((resolve=>{if(options.storageType==="sync"){»chrome.storage.sync.set(obj,resolve)«}else{chrome.storage.local.set(obj,resolve)}})).then((result=>result))};const removeLeftoverTabsIdFromStorage=async func…`
- **Sanitized**: NO
- **Frame**: `OPTIONS_1`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…lue;const updateUrl=»"https://tb.priceblink.com/universal_scrapes.php?uid="+uid+"&browser=chrome&ver=9.4&action=u&country_pref="+selectedCoun …⟨tainted span: 353 chars⟩… Something went wrong, please try again.");return}await storageSetPromise({country:selectedCountry},{storageType:"sync"})«;browser.runtime.sen…`  · ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:object.setProperty

---
