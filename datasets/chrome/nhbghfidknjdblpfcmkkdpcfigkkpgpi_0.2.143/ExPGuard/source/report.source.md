# Source-level Taint Flow — nhbghfidknjdblpfcmkkdpcfigkkpgpi 0.2.143

- Source type: CRX
- Files with issues: 9 / 12
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 65 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_TEXT_CONTENT (p[data-seller-name-container] .wt-screen-reader-only:not([aria-hidden="true"]))

- **Source**: `ELEMENT_TEXT_CONTENT` — `content_ranking.bundle` L2:C4128 -> L2:C4146  `…ar f="",y=e.querySelector('p[data-seller-name-container] .wt-screen-reader-only:not([aria-hidden="true"])');if(y){var h=»y.textContent.trim«().match(/From shop\s+(.+)/i);h&&(f=h[1].trim())}var m=e.querySelector(".v2-listing-card__info .v2-listing-card__title")…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (etsySearchRankingProcessData) — `content_ranking.bundle` L2:C9384 -> L2:C9442  `…(S," of ").concat(v)),h(S,v),e.n=12,p();case 12:return b=f(S),k=(k=c.etsySearchRankingProcessData||[]).concat(b),e.n=13,»chrome.storage.local.set({etsySearchRankingProcessData:k})«;case 13:return w={currentPage:S,totalPages:v,pageData:b,allData:k,isComplete:S>=v,timestamp:(new Date).toISOString()},c…`
- **Sanitized**: NO
- **Frame**: `CS_5`

- **Propagation** (422 raw steps → 1 distinct lines):
   1. L2 `…ue"])');if(y){var h=»y.textContent.trim().match(/From shop\s+(.+)/i);h&&(f=h[1].trim())}var m=e.querySelector(".v2-listing-card__info .v2-lis …⟨tainted span: 6347 chars⟩… ebsite:COMPLETION",v),e.n=18,g(a,{totalPages:v,totalListings:k.length,completedAt:(new Date).toISOString(),pageData:k});«case 18:e.n=20;break…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:object.setProperty, ELEMENT:implicit.add, ELEMENT:member-element-container, ASSIGN:binary-right, ELEMENT:member.length, RETURN:string.concat, COPY:array.concat.arg

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background.bundle` L2:C120339 -> L2:C120391  `…er exists:",null===(a=chrome.runtime.lastError)||void 0===a?void 0:a.message)}):chrome.runtime.sendMessage(sender.id,n)}»chrome.runtime.onMessage.addListener(O.onExtMessage)«,chrome.runtime.onMessageExternal.addListener(function(e,n,t){return(0,k.handleBridgeMessage)(e,n,t)||(e&&"checkExtensio…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (uiSettings) — `background.bundle` L2:C111168 -> L2:C111224  `…JSON.parse(r));case 3:return e.a(2)}},e)})),function(e){return L.apply(this,arguments)}),saveUISettings:function(e,n,t){»chrome.storage.local.set({uiSettings:JSON.stringify(a)})«,"function"==typeof t&&t({uiSettings:a})},getSettingsDB:function(e,n,t){chrome.tabs.get(n.tab.id,function(e){var a;!chro…`
  - `CHROME_RUNTIME_SENDMESSAGE_EXTERNAL` (UNKNOWN_EXTENSION_ID) — `background.bundle` L2:C120299 -> L2:C120338  `…)}):console.log("sendMessage Tab no longer exists:",null===(a=chrome.runtime.lastError)||void 0===a?void 0:a.message)}):»chrome.runtime.sendMessage(sender.id,n)«}chrome.runtime.onMessage.addListener(O.onExtMessage),chrome.runtime.onMessageExternal.addListener(function(e,n,t){retur…`
  - `CHROME_LOCAL_STORAGE` (uiSettings) — `background.bundle` L2:C110923 -> L2:C110979  `…:return e.n=1,O.getStorageByKey("version");case 1:return null!=(t=e.v)&&null!=t||(chrome.storage.local.set({version:P}),»chrome.storage.local.set({uiSettings:JSON.stringify(a)})«),e.n=2,O.getStorageByKey("uiSettings");case 2:r=e.v,Object.assign(a,JSON.parse(r));case 3:return e.a(2)}},e)})),functio…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (18 raw steps → 1 distinct lines):
   1. L2 `…)})})},500)});const »a={signUp:!1,estyTabId:"",connectFromEtsyTabId:"",logInFromEtsyTabId:"",searchOverAction:!1,estySearchCount:0,estyDefaul …⟨tainted span: 25206 chars⟩… d 0===a?void 0:a.message)}):chrome.runtime.sendMessage(sender.id,n)}chrome.runtime.onMessage.addListener(O.onExtMessage)«,chrome.runtime.onMe…`  · MESSAGE, ELEMENT:object.setProperty, RETURN:json.stringify
      ⇄ cross-context hop: `runtime.single.sender.message[js/customer_followups/alura-followup-listener->background.bundle]`

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background.bundle` L2:C120485 -> L2:C120486  `…ddListener(O.onExtMessage),chrome.runtime.onMessageExternal.addListener(function(e,n,t){return(0,k.handleBridgeMessage)(»e«,n,t)||(e&&"checkExtensionInstalled"==e.command?t({installed:"success"}):e&&"saveLoggedInToExtension"==e.command?(chrome…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (loggedInCustomToken) — `background.bundle` L2:C120600 -> L2:C120666  `…age)(e,n,t)||(e&&"checkExtensionInstalled"==e.command?t({installed:"success"}):e&&"saveLoggedInToExtension"==e.command?(»chrome.storage.local.set({loggedInCustomToken:e.data.customToken})«,t({loggedInSave:"success"})):e&&"openEtsySearchTearmListingStatePage"==e.command?O.openEtsySearchTearmListingStatePage(…`
  - `CHROME_LOCAL_STORAGE` (etsySearchTearmImportProcessListingId) — `background.bundle` L2:C116440 -> L2:C116654  `…),t({success:!0,data:[]})},openEtsySearchTearmListingStatePage:function(e,n,t){var a=n.tab.id,r=n.tab.url,i=e.listingId;»chrome.storage.local.set({etsySearchTearmImportProcessStatus:!0,etsySearchTearmImportProcessData:[],etsySearchTearmImportProcessTabURL:r,etsySearchTearmImportProcessTabID:a,etsySearchTearmImportProcessListingId:i})«;var o=!1,s=null,u=null;function c(){u&&(chrome.tabs.onRemoved.removeListener(u),u=null)}var l="https://www.etsy.com/you…`
  - `CHROME_TABS_CREATE_OPTIONS` — `background.bundle` L2:C116861 -> L2:C117762  `…tion=import_terms");»chrome.tabs.create({url:l,active:E},function(e){var n=e.id;s=n,chrome.storage.local.set({etsySearchTearmImportProcessSta …⟨tainted span: 901 chars⟩… ase 7:return e.a(2)}},e)}));return function(n){return e.apply(this,arguments)}}(),chrome.tabs.onRemoved.addListener(u)})«;var d=0,m=setInterv…`
  - `CHROME_LOCAL_STORAGE` (etsyTargetCountry) — `background.bundle` L2:C115837 -> L2:C116192  `…"",s=e.market||"US";»chrome.storage.local.set({etsySearchRankingProcessStatus:!0,etsySearchRankingProcessData:[],etsyTargetCountry:s,etsyTarg …⟨tainted span: 355 chars⟩… :r,etsySearchRankingShopName:o,etsySearchRankingCurrentPage:1,targetWebsiteUrl:"https://app.alura.io/research/keyword"})«,chrome.tabs.create(…`
  - `CHROME_LOCAL_STORAGE` (etsySearchRankingProcessStartedTabURL) — `background.bundle` L2:C115837 -> L2:C116192  `…"",s=e.market||"US";»chrome.storage.local.set({etsySearchRankingProcessStatus:!0,etsySearchRankingProcessData:[],etsyTargetCountry:s,etsyTarg …⟨tainted span: 355 chars⟩… :r,etsySearchRankingShopName:o,etsySearchRankingCurrentPage:1,targetWebsiteUrl:"https://app.alura.io/research/keyword"})«,chrome.tabs.create(…`
  - `CHROME_LOCAL_STORAGE` (etsySearchRankingTotalPages) — `background.bundle` L2:C115837 -> L2:C116192  `…"",s=e.market||"US";»chrome.storage.local.set({etsySearchRankingProcessStatus:!0,etsySearchRankingProcessData:[],etsyTargetCountry:s,etsyTarg …⟨tainted span: 355 chars⟩… :r,etsySearchRankingShopName:o,etsySearchRankingCurrentPage:1,targetWebsiteUrl:"https://app.alura.io/research/keyword"})«,chrome.tabs.create(…`
  - `CHROME_LOCAL_STORAGE` (etsySearchRankingShopName) — `background.bundle` L2:C115837 -> L2:C116192  `…"",s=e.market||"US";»chrome.storage.local.set({etsySearchRankingProcessStatus:!0,etsySearchRankingProcessData:[],etsyTargetCountry:s,etsyTarg …⟨tainted span: 355 chars⟩… :r,etsySearchRankingShopName:o,etsySearchRankingCurrentPage:1,targetWebsiteUrl:"https://app.alura.io/research/keyword"})«,chrome.tabs.create(…`
  - `CHROME_TABS_CREATE_OPTIONS` — `background.bundle` L2:C116193 -> L2:C116321  `…r,etsySearchRankingShopName:o,etsySearchRankingCurrentPage:1,targetWebsiteUrl:"https://app.alura.io/research/keyword"}),»chrome.tabs.create({url:a,active:!1},function(e){var n=e.id;chrome.storage.local.set({etsySearchRankingProcessStartedTabID:n})})«,t({success:!0,data:[]})},openEtsySearchTearmListingStatePage:function(e,n,t){var a=n.tab.id,r=n.tab.url,i=e.listingId;c…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (49 raw steps → 1 distinct lines):
   1. L2 `…nction(e,n,t){var a=»e.etsyUrl,r=n.tab.id,i=e.pages||2,o=e.shopName||"",s=e.market||"US";chrome.storage.local.set({etsySearchRankingProcessSt …⟨tainted span: 5135 chars⟩… e(e.data,n,t):e&&"startScrappingSearchResultsFromEtsy"==e.command&&O.startScrappingSearchResultsFromEtsy(e.data,n,t)),!0«}),O.load(),chrome.a…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty, RETURN:string.concat, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:conditional-alternate

---
