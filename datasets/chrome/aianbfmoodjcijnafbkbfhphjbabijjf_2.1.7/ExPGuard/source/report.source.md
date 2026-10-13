# Source-level Taint Flow — aianbfmoodjcijnafbkbfhphjbabijjf 2.1.7

- Source type: CRX
- Files with issues: 13 / 27
- Distinct taint flows: 12  (collapsed from 12 raw issue entries)
- Sinkless sources skipped: 23 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `script/helper` L1:C904 -> L1:C946  `…ator.set("SLVLUP_LANG",t),void 0==StorageOperator.get("SLVLUP_LANG")&&StorageOperator.set("SLVLUP_LANG","Auto"));let e=(»navigator.language||navigator.userLanguage«).split("-")[0],a=StorageOperator.get("SLVLUP_LANG")||e.replace("-","_");const n=["en","ru","es","de","pl","tr","fr","zh…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `script/helper` L1:C287 -> L1:C295  `…orage.setItem(t,JSON.stringify(e))}};var SLVLUP_TEXT,DEFAULT_LANG;function getJSONP(t){return new Promise(function(e,a){»fetch(t)«.then(t=>t.json()).then(t=>{e(t)}).catch(t=>{throw t})})}function containsAny(t,e){return e.some(e=>t.includes(e))}funct…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (50 raw steps → 1 distinct lines):
   1. L1 `…function(e,a){fetch(»t).then(t=>t.json()).then(t=>{e(t)}).catch(t=>{throw t})})}function containsAny(t,e){return e.some(e=>t.includes(e))}fun …⟨tainted span: 4989 chars⟩… .id),getJSONP(`chrome-extension://${StorageOperator.get("SLVLUP_EX_ID")}/_locales/${detectUserLanguage()}/messages.json`«).then(t=>{SLVLUP_TE…`  · ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:template-literal

---

## Flow #2 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `script/settings` L1:C904 -> L1:C946  `…ge!=StorageOperator.get("SLVLUP_LANG",0)&&changeLanguage(e.language)})}if(document.querySelectorAll("a.username")[1]){if»(document.querySelectorAll("a.slvlup_cards«_farm_link")[0])return;let e=document.createElement("a");e.className="submenuitem slvlup_cards_farm_link",e.href="https:…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `script/settings` L1:C287 -> L1:C295  `…ome.runtime.id)return void window.location.reload();chrome.storage.local.get(null,function(e){JSON.stringify(e)==JSON.st»ringify(«{})&&(e={language:"Auto",showPrice:!0,showScamTrade:!0});let t=document.getElementsByClassName("slvlup_flex");for(let e …`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (150 raw steps → 1 distinct lines):
   1. L1 `…fy(e)==JSON.stringif»y({})&&(e={language:"Auto",showPrice:!0,showScamTrade:!0});let t=document.getElementsByClassName("slvlup_flex");for(let  …⟨tainted span: 1571 chars⟩… ce_svg global_action_link",o.href=`https://steamlvlup.com/balance?l=${e}&p=extension`,o.target="_blank",o.title="Пополни«ть баланс",l?o.inner…`  · ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:template-literal

---

## Flow #3 — STORAGE_ALL_ITEMS (storage.all.items[local])

- **Source**: `STORAGE_ALL_ITEMS` — `script/settings` L1:C2481 -> L1:C2492  `…)[0].appendChild(t))}}}chrome.storage.local.get(null,function(e){StorageOperator.set("SLVLUP_CACHE_SETTINGS",{showPrice:»e.showPrice«,showScamTrade:e.showScamTrade})}),"https://steamcommunity.com"!=window.location.origin&&"https://store.steampowered.com…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `script/settings` L1:C153 -> L1:C201  `… 0==SLVLUP_TEXT)setTimeout(()=>{settingOnEvent()},100);else{if(void 0!==chrome.storage&&void 0!==chrome.storage.local){i»f(void 0===chrome.runtime.id)return void window.«location.reload();chrome.storage.local.get(null,function(e){JSON.stringify(e)==JSON.stringify({})&&(e={language:"Auto",s…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 1 distinct lines):
   1. L1 `…=chrome.runtime.id)r»eturn void window.location.reload();chrome.storage.local.get(null,function(e){JSON.stringify(e)==JSON.stringify({})&&(e= …⟨tainted span: 2341 chars⟩… .get(null,function(e){StorageOperator.set("SLVLUP_CACHE_SETTINGS",{showPrice:e.showPrice,showScamTrade:e.showScamTrade})«}),"https://steamcom…`  · ELEMENT:member-element, ELEMENT:object.setProperty, RETURN:json.stringify

---

## Flow #4 — ELEMENT_INNER_HTML (body)

- **Source**: `ELEMENT_INNER_HTML` — `script/booster` L1:C55 -> L1:C101  `class Booster{constructor(){this.gamesArray=JSON.parse(»document.querySelector("body").innerHTML.match«(/CBoosterCreatorPage\.Init\(\s+([^\n]+)/)[1].replace(/,$/,"")),this.language=document.querySelector("html").innerHTML.m…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `script/booster` L1:C16245 -> L1:C16254  `…{i.symbol}</span></div>\n                </div>\n            </div>`,r++}document.querySelector(".slvlup_booster_main").»innerHTML«=t,this.getTableLines();let s=document.getElementById("slvlup_booster_filter_input");s&&s.value&&this.filterBoosterTable…`
  - `FETCH_RESOURCE` ([Unknown URL]) — `script/booster` L1:C21755 -> L1:C21778  `…"https://steamcommunity.com/market/multisell?appid=753&contextid=6&l=en";for(let r of e)t+=r;return new Promise((r,s)=>{»fetch(t,{method:"GET"})«.then(e=>e.text()).then(function(e){return(new DOMParser).parseFromString(e,"text/html")}).then(t=>{let s=[],a=t.querySe…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_13`

- **Propagation** (358645 raw steps → 1 distinct lines):
   1. L1 `…r(){this.gamesArray=»JSON.parse(document.querySelector("body").innerHTML.match(/CBoosterCreatorPage\.Init\(\s+([^\n]+)/)[1].replace(/,$/,"")) …⟨tainted span: 45830 chars⟩… reloadPageAlert(!1);let t=[];for(let r of e.SLVLUP_BOOSTER_INF.games)t.push({price:r.request,appid:r.appid,profit:"-"});«e.updateMarketPrice(…`  · ELEMENT:member-element, RETURN:fallback-return, RETURN:json.parse, ELEMENT:object.setProperty, ITERATE:loop.iteration, ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:template-literal, ASSIGN:binary-right, ELEMENT:member-element-container, RETURN:Math.min, ASSIGN:logical-left, ELEMENT:implicit.add, RETURN:parseFloat, ASSIGN:logical-right, RETURN:isNaN, ASSIGN:conditional-consequent, RETURN:Math.max, RETURN:json.stringify, ASSIGN:conditional-alternate, RETURN:Number.toFixed, RETURN:parseInt, RETURN:encodeURIComponent

---

## Flow #5 — ELEMENT_INNER_HTML (body)

- **Source**: `ELEMENT_INNER_HTML` — `script/booster` L1:C849 -> L1:C895  `…={},this.activeProfitGames=[],this.testMode=!1,this.SLVLUP_USER_ID=StorageOperator.get("SLVLUP_USER_ID",0),this.steamID=»document.querySelector("body").innerHTML.match«(/g_steamID = "(\d+)/)[1]}validateInit(){let e=StorageOperator.get("SLVLUP_API_GAME_CACHE",null);if(!safeGet(e,"success"…`
- **Sink(s)**:
  - `WEB_LOCAL_STORAGE_SET_VALUE` — `script/booster` L1:C153 -> L1:C201  `…gamesArray=JSON.parse(document.querySelector("body").innerHTML.match(/CBoosterCreatorPage\.Init\(\s+([^\n]+)/)[1].replac»e(/,$/,"")),this.language=document.querySelector«("html").innerHTML.match(/g_strLanguage = "([^"]+)";/)[1],this.country="russian"==this.language?"RU":"EN",this.SLVLUP_AP…`
- **Sanitized**: NO
- **Frame**: `CS_13`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L1 `…),this.language=docu»ment.querySelector("html").innerHTML.match(/g_strLanguage = "([^"]+)";/)[1],this.country="russian"==this.language?"RU":" …⟨tainted span: 41497 chars⟩… equest"),this.updateMarketPrice([{price:0,appid:t}],"order")}this.sort()}}async function BoosterInit(){let e=new Booster«;if(e.validateInit()…`  · ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty, ASSIGN:identifier, RETURN:json.stringify, ASSIGN:binary-left, ASSIGN:binary-right

---

## Flow #6 — ELEMENT_INNER_HTML

- **Source**: `ELEMENT_INNER_HTML` — `script/booster` L1:C44938 -> L1:C45666  `…ket_hash_name)}`;if(»e.createGeneralElement(),e.SLVLUP_BOOSTER_INF.userInf.selectors.profit||(e.SLVLUP_BOOSTER_INF.userInf.selectors.profit=d …⟨tainted span: 728 chars⟩… dateProgressBar(Math.min(e.requestCount-10,e.gamesArray.length),e.gamesArray.length),reloadPageAlert(!0),e.arrG.length>0«)try{e.getSteamSellP…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `script/booster` L1:C45376 -> L1:C45385  `…_profit_selector").value=e.SLVLUP_BOOSTER_INF.userInf.selectors.profit,document.getElementById("slvlup_profit_div_sel").»innerHTML«=document.querySelector(`.slvlup_table_profit_select_el[data-value=${e.SLVLUP_BOOSTER_INF.userInf.selectors.profit}]`).i…`
- **Sanitized**: NO
- **Frame**: `CS_13`

- **Propagation** (9 raw steps → 1 distinct lines):
   1. L1 `…ket_hash_name)}`;if(»e.createGeneralElement(),e.SLVLUP_BOOSTER_INF.userInf.selectors.profit||(e.SLVLUP_BOOSTER_INF.userInf.selectors.profit=d …⟨tainted span: 728 chars⟩… dateProgressBar(Math.min(e.requestCount-10,e.gamesArray.length),e.gamesArray.length),reloadPageAlert(!0),e.arrG.length>0«)try{e.getSteamSellP…`  · ELEMENT:object.setProperty, ASSIGN:logical-right

---

## Flow #7 — ELEMENT_INNER_HTML

- **Source**: `ELEMENT_INNER_HTML` — `script/booster` L1:C8667 -> L1:C8863  `…ySelector(".booster_creator_area").appendChild(e),this.progressBar=document.querySelector(".slvlup_progress-bar-inner"),»document.getElementById("slvlup_profit_div_sel").innerHTML=document.querySelector(`.slvlup_table_profit_select_el[data-value=${document.getElementById("slvlup_profit_selector").value}]`).innerHTML«,slvlup_profit_div_sel_cont.addEventListener("click",()=>{document.getElementById("slvlup_table_profit_select").classLis…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `script/booster` L1:C8716 -> L1:C8725  `…,this.progressBar=document.querySelector(".slvlup_progress-bar-inner"),document.getElementById("slvlup_profit_div_sel").»innerHTML«=document.querySelector(`.slvlup_table_profit_select_el[data-value=${document.getElementById("slvlup_profit_selector").v…`
- **Sanitized**: NO
- **Frame**: `CS_13`

- **Propagation** (6 raw steps → 1 distinct lines):
   1. L1 `…ySelector(".booster_creator_area").appendChild(e),this.progressBar=document.querySelector(".slvlup_progress-bar-inner"),»document.getElementById("slvlup_profit_div_sel").innerHTML=document.querySelector(`.slvlup_table_profit_select_el[data-value=${document.getElementById("slvlup_profit_selector").value}]`).innerHTML«,slvlup_profit_div_sel_cont.addEventListener("click",()=>{document.getElementById("slvlup_table_profit_select").classLis…`  · ELEMENT:object.setProperty

---

## Flow #8 — ELEMENT_INNER_HTML

- **Source**: `ELEMENT_INNER_HTML` — `script/booster` L1:C9181 -> L1:C9337  `…fit_select_el"))e.addEventListener("click",()=>{document.getElementById("slvlup_profit_selector").value=e.dataset.value,»document.getElementById("slvlup_profit_div_sel").innerHTML=document.querySelector(`.slvlup_table_profit_select_el[data-value=${e.dataset.value}]`).innerHTML«,this.SLVLUP_BOOSTER_INF.userInf.selectors.profit=e.dataset.value,StorageOperator.set("SLVLUP_BOOSTER_INF",this.SLVLUP_B…`
- **Sink(s)**:
  - `DOM_INNER_HTML` (innerHTML) — `script/booster` L1:C9230 -> L1:C9239  `…ocument.getElementById("slvlup_profit_selector").value=e.dataset.value,document.getElementById("slvlup_profit_div_sel").»innerHTML«=document.querySelector(`.slvlup_table_profit_select_el[data-value=${e.dataset.value}]`).innerHTML,this.SLVLUP_BOOSTER_I…`
- **Sanitized**: NO
- **Frame**: `CS_13`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L1 `…fit_select_el"))e.addEventListener("click",()=>{document.getElementById("slvlup_profit_selector").value=e.dataset.value,»document.getElementById("slvlup_profit_div_sel").innerHTML=document.querySelector(`.slvlup_table_profit_select_el[data-value=${e.dataset.value}]`).innerHTML«,this.SLVLUP_BOOSTER_INF.userInf.selectors.profit=e.dataset.value,StorageOperator.set("SLVLUP_BOOSTER_INF",this.SLVLUP_B…`  · ELEMENT:object.setProperty

---

## Flow #9 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `script/background` L1:C1740 -> L1:C1741  `…tension/bonus"===o||o.startsWith("https://steamlvlup.com/extension/bonus?");if(!c&&!s)return n(!1),!1;if("queryResult"==»t«.contentScriptQuery)return chrome.storage.local.set({queryResult:t.data}),n(!0),!0;if("updateGamePrice"==t.contentScript…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (queryResult) — `script/background` L1:C1768 -> L1:C1814  `…With("https://steamlvlup.com/extension/bonus?");if(!c&&!s)return n(!1),!1;if("queryResult"==t.contentScriptQuery)return »chrome.storage.local.set({queryResult:t.data})«,n(!0),!0;if("updateGamePrice"==t.contentScriptQuery){let t=!1;return fetch("https://api.steamlvlup.com/v1/prices").then…`
  - `FETCH_BODY` (https://extension.steamlvlup.com/api/steamsocket) — `script/background` L1:C2508 -> L1:C2679  `…).then(t=>{console.log("getApiKey",t),n(t)}).catch(t=>{console.log(t),n(!1)}),!0):"apiExtension"==t.contentScriptQuery?(»fetch("https://extension.steamlvlup.com/api/steamsocket",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t.data)})«.then(t=>t.json()).then(t=>{n(t)}).catch(t=>{console.log(t),n(!1)}),!0):"osStart"==t.message&&t.offscreen?(createOffscre…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (47 raw steps → 1 distinct lines):
   1. L1 `…1;if("queryResult"==»t.contentScriptQuery)return chrome.storage.local.set({queryResult:t.data}),n(!0),!0;if("updateGamePrice"==t.contentScrip …⟨tainted span: 1140 chars⟩… ==t.message&&t.offscreen?(createOffscreen().then(()=>n("Offscreen Started")).catch(t=>{console.log(t),n(!1)}),!0):void 0«});`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right, ELEMENT:object.setProperty, RETURN:json.stringify

---

## Flow #10 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `script/popup` L1:C553 -> L1:C595  `…e").then(e=>{const t=["en","ru","es","de","pl","tr","fr","zh_CN","zn","uk"];let o=e.language,n=o;"Auto"==e.language&&(o=»navigator.language||navigator.userLanguage«,n=t.includes(o.replace("-","_"))?o.replace("-","_"):"en"),getJSONP(`chrome-extension://${StorageOperator.get("SLVLUP_EX…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `script/popup` L1:C287 -> L1:C295  `…e=document.getElementById("slvlup_sources"),popupMain=$(".slvlup_popup_main"),rateUsContainer=$(".buttons_container");le»t localT«emp;function getElementText(e,t){if(void 0!=e&&null!=e)return e.textContent=t}function changeLangPopup(){chrome.storage.…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (11 raw steps → 1 distinct lines):
   1. L1 `…container");let loca»lTemp;function getElementText(e,t){if(void 0!=e&&null!=e)return e.textContent=t}function changeLangPopup(){chrome.storag …⟨tainted span: 457 chars⟩… .replace("-","_"):"en"),getJSONP(`chrome-extension://${StorageOperator.get("SLVLUP_EX_ID")}/_locales/${n}/messages.json`«).then(e=>{SLVLUP_TE…`  · ASSIGN:logical-left, ASSIGN:identifier, ELEMENT:member-element-container, ASSIGN:template-literal

---

## Flow #11 — ELEMENT_VALUE (slvlup_sources)

- **Source**: `ELEMENT_VALUE` — `script/popup` L1:C2700 -> L1:C2835  `…},()=>{chrome.scripting.executeScript({target:{tabId:e.id},files:["script/bridge.js"]})})}function buttonClick(e=!1){e&&»chrome.storage.local.set({showPrice:buttonShowPrice.checked,showScamTrade:buttonShowScamTrade.checked,language:selectorLanguage.value})«,injectScript()}function addAreaPopup(){$(".slvlup_select").each(function(){var e=$(this).attr("class"),t=($(this).attr(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (language) — `script/popup` L1:C2700 -> L1:C2835  `…},()=>{chrome.scripting.executeScript({target:{tabId:e.id},files:["script/bridge.js"]})})}function buttonClick(e=!1){e&&»chrome.storage.local.set({showPrice:buttonShowPrice.checked,showScamTrade:buttonShowScamTrade.checked,language:selectorLanguage.value})«,injectScript()}function addAreaPopup(){$(".slvlup_select").each(function(){var e=$(this).attr("class"),t=($(this).attr(…`
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (5 raw steps → 1 distinct lines):
   1. L1 `…sWith("chrome://")||»await chrome.scripting.executeScript({target:{tabId:e.id},args:[{showPrice:buttonShowPrice.checked,showScamTrade:buttonS …⟨tainted span: 459 chars⟩… local.set({showPrice:buttonShowPrice.checked,showScamTrade:buttonShowScamTrade.checked,language:selectorLanguage.value})«,injectScript()}func…`  · ELEMENT:object.setProperty, COPY:object.assign

---

## Flow #12 — NAVIGATOR_LANGUAGE (navigator.language)

- **Source**: `NAVIGATOR_LANGUAGE` — `script/cardFarm` L1:C904 -> L1:C946  `…null,this.settingDropPage=StorageOperator.get("SLVLUP_DROP_SETT",{sound:!0,stealth:!0,change:!0}),this.audioPlay=this.se»ttingDropPage.sound,this.autoReplace=this.«settingDropPage.change,this.changeStatus=this.settingDropPage.stealth,this.setIntEx=null,this.setIntEn=null,this.setIntS…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `script/cardFarm` L1:C287 -> L1:C295  `…P_EX_ID"),this.sesInf=StorageOperator.get("SLVLUP_SESSION_HISTORY",0),this.PRICES_CACHE=null,this.arrAssetId=0==this.ses»Inf?[]:t«his.sesInf.map(e=>e.droppedCards.map(e=>e.assetId)).filter(e=>e.length>0).flatMap(e=>e),this.tempGameInfo=[],this.startD…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_12`

- **Propagation** (175 raw steps → 1 distinct lines):
   1. L1 `…Id=0==this.sesInf?[]»:this.sesInf.map(e=>e.droppedCards.map(e=>e.assetId)).filter(e=>e.length>0).flatMap(e=>e),this.tempGameInfo=[],this.star …⟨tainted span: 41560 chars⟩… ct(){getJSONP(`chrome-extension://${StorageOperator.get("SLVLUP_EX_ID")}/_locales/${detectUserLanguage()}/messages.json`«).then(e=>{SLVLUP_TE…`  · ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:template-literal

---
