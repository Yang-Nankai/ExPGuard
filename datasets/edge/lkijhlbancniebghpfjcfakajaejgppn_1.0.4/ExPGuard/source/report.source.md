# Source-level Taint Flow — lkijhlbancniebghpfjcfakajaejgppn 1.0.4

- Source type: CRX
- Files with issues: 2 / 6
- Distinct taint flows: 6  (collapsed from 10 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `content/index` L70:C4946 -> L70:C4972  `… findMediaId=async postId=>{let mediaIdPattern=/instagram:\/\/media\?id=(\d+)|["' ]media_id["' ]:["' ](\d+)["' ]/,match=»window.location.href.match«(/www.instagram.com\/stories\/[^/]+\/(\d+)/);if(match)return match[1];if(!mediaIdCache.has(postId)){let postUrl=`https:/…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/index` L70:C5933 -> L70:C6035  `… id"),null;if(!mediaInfoCache.has(mediaId)){let url="https://i.instagram.com/api/v1/media/"+mediaId+"/info/",resp=await »fetch(url,{method:"GET",headers:{Accept:"*/*","X-IG-App-ID":appId},credentials:"include",mode:"cors"})«;if(resp.status!==200)return console.log(`Fetch info API failed with status code: ${resp.status}`),null;let respJson=awa…`  (url-control=FULL)
  - `FETCH_RESOURCE` (location.href) — `content/index` L71:C2683 -> L71:C2741  `…hone|iPad|iPod|iOS)/i.test(navigator.userAgent)?"ios":"android":"pc";async function fetchHtml(){let content=await(await »fetch(window.location.href,{referrerPolicy:"no-referrer"})«).text();return new DOMParser().parseFromString(content,"text/html").querySelectorAll("script")}function getSectionNode(…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (800 raw steps → 1 distinct lines):
   1. L70 `… ](\d+)["' ]/,match=»window.location.href.match(/www.instagram.com\/stories\/[^/]+\/(\d+)/);if(match)return match[1];if(!mediaIdCache.has(pos …⟨tainted span: 996 chars⟩… l;if(!mediaInfoCache.has(mediaId)){let url="https://i.instagram.com/api/v1/media/"+mediaId+"/info/",resp=await fetch(url«,{method:"GET",heade…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:implicit.add, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #2 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `content/index` L89:C8351 -> L89:C8359  `…tedStyle(document.body).backgroundColor==="rgb(0, 0, 0)"?"white":"black",pathname=window.location.pathname,pathnameList=»pathname«.split("/").filter(e=>e),isFeedPage=pathnameList.length===2&&pathnameList[1]==="feed",isPostDetailWithNameInUrl=pathname…`
- **Sink(s)**:
  - `FETCH_RESOURCE` (https://www.instagram.com/p/null/) — `content/index` L70:C5146 -> L70:C5160  `…return match[1];if(!mediaIdCache.has(postId)){let postUrl=`https://www.instagram.com/p/${postId}/`,idMatch=(await(await »fetch(postUrl)«).text()).match(mediaIdPattern);if(!idMatch)return null;let mediaId=null;for(let i=0;i<idMatch.length;++i)idMatch[i]&&(m…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5777 raw steps → 7 distinct lines):
   1. L89 `…w.location.pathname,»pathnameList=pathPrefix.split("/").filter(e2=>e2),isPostDetailWithNameInUrl=pathnameList.length===3&&pathnameList[1]===" …⟨tainted span: 17236 chars⟩… e?.parentNode,iconColor)}(pathnameList.length===1||pathnameList.length===2&&["tagged","reels"].includes(pathnameList[1])«)&&document.querySel…`  · ASSIGN:identifier, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element, RETURN:fallback-return
   2. L70 `…wnloadResource({url,»username,datetime,fileId,button}){console.log(`Downloading ${url}`);let downloadButton=button;downloadButton||(downloadB …⟨tainted span: 4877 chars⟩… d=findPostId(articleNode);if(!postId)return console.log("Cannot find post id"),null;let mediaId=await findMediaId(postId«);if(!mediaId)return…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:unary, ASSIGN:template-literal, ELEMENT:destructure-property[username], ELEMENT:destructure-property[datetime], ASSIGN:logical-right, ASSIGN:logical-left
   3. L71 `…SectionNode(target),»pathnameArr=window.location.pathname.split("/"),{setting_format_use_indexing}=await chrome.storage.sync.get(["setting_fo …⟨tainted span: 3931 chars⟩… console.log("Err: not find media at handle post single")}}else{let isPostView=window.location.pathname.startsWith("/p/")«,dotsList;if(isPostV…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return
   4. L72 `…em)),url};async function getUrl(){let containerNode=document.querySelector("section main");if(!containerNode)return;let »pathnameList=window.location.pathname.split("/").filter(e=>e),isPostDetailWithNameInUrl=pathnameList.length===3&&pathnameList[1]==="p"«,mediaList=containerNode.querySelectorAll("li[style][class]"),url,res,mediaIndex=-1;if(mediaList.length===0){if(res=awai…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right
   5. L73 `…er_profile_pic_url),»arr=window.location.pathname.split("/").filter(e=>e),username=arr.length===1?arr[0]:document.querySelector("main header  …⟨tainted span: 6339 chars⟩… local.get(["reels_edges_data"]),code=window.location.pathname.split("/").at(-2),media=new Map(reels_edges_data).get(code«);if(media){handleMe…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:conditional-consequent, ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-left, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:implicit.add
   6. L48 `…target.style.position==="fixed")&&document.body.removeChild(alertDiv)})}function hashCode(str){let hash=0;for(let i=0;i<»str.length;i++){let char=str.charCodeAt(i);hash=(hash<<5)-hash+char,hash=hash&hash«}return hash>>>0}async function checkDownloadPermission(){return new Promise(resolve=>{if(!globalExtPay){console.warn("G…`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left
   7. L74 `…Clicked(target){let »pathnameArr=window.location.pathname.split("/").filter(e=>e),posterName=pathnameArr[1],{setting_format_use_indexing}=awa …⟨tainted span: 2613 chars⟩… item=(reels_media||[]).find(i=>i.media_ids?.includes(mediaId));if(item){handleMedia2(item,item.media_ids.indexOf(mediaId«));return}let sectio…`  · ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ELEMENT:member.length, ASSIGN:binary-left, ELEMENT:implicit.add, ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-left

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('reels_media') in background/chrome)  ·  3× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/chrome` L21:C4144 -> L21:C4151  `…=void 0)return result}}}chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse)=>{let{type,data,api}=»message«;return sender.origin==="https://www.threads.net"?(type==="threads_searchResults"?data.split(/\s*for\s+\(;;\);\s*/).filt…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `content/index` L70:C3230 -> L70:C3300  `…ncremented:",response.downloadCount)}).catch(error=>{console.error("Error incrementing download count:",error)});return}»fetch(url,{headers:new Headers({Origin:location.origin}),mode:"cors"})«.then(response=>response.blob()).then(blob=>{let extension=blob.type.split("/").pop(),blobUrl=window.URL.createObjectURL…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (1202 raw steps → 5 distinct lines):
   1. L21 _(in `background/chrome`)_ `…a){if(Array.isArray(»jsonData.data?.xdt_api__v1__feed__reels_media__connection?.edges)){let data=jsonData.data.xdt_api__v1__feed__reels_media …⟨tainted span: 4758 chars⟩… d));chrome.storage.local.set({reels:Object.assign({},reels,data.reels),reels_media:[...newArr,...jsonData.reels_media]})«;break}}catch{}sendR…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[data], ELEMENT:destructure-property[api], ELEMENT:member-element, RETURN:fallback-return, ITERATE:loop.iteration, ASSIGN:conditional-consequent, ASSIGN:binary-left, RETURN:json.parse, COPY:object.assign-opaque, ELEMENT:object.setProperty, ELEMENT:array-spread, ASSIGN:unary
   2. L74 `…aIndex)=>{let media=»item.items[mediaIndex];if(!media||import_dayjs7.default.unix(media.expiring_at).isBefore((0,import_dayjs7.default)()))re …⟨tainted span: 2391 chars⟩… tem=(reels_media||[]).find(i=>i.media_ids?.includes(mediaId));if(item){handleMedia2(item,item.media_ids.indexOf(mediaId)«);return}let section…`  · STORAGE:STORAGE_FLOW[area: local, key: reels_media, sender: background/chrome, receiver: content/index], ASSIGN:identifier, ASSIGN:logical-left, ELEMENT:member-element-container, ELEMENT:array.find, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ASSIGN:logical-right, ELEMENT:object.setProperty, ASSIGN:binary-left, ASSIGN:template-literal, ASSIGN:conditional-consequent
   3. L1 `…enInNewTab(url){try{»chrome.runtime.sendMessage({type:"open_url",data:url})}catch{window.open(url,"_blank","noopener,noreferrer")}}async func …⟨tainted span: 616 chars⟩… on getMediaName(url){let name=url.split("?")[0].split("/").pop();return name?name.substring(0,name.lastIndexOf(".")):url«}function showUpgrad…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:conditional-consequent, ASSIGN:binary-left, ELEMENT:object.setProperty
   4. L70 `…utton}){console.log(»`Downloading ${url}`);let downloadButton=button;downloadButton||(downloadButton=document.querySelector(".custom-btn.down …⟨tainted span: 2526 chars⟩… (blob=>{let extension=blob.type.split("/").pop(),blobUrl=window.URL.createObjectURL(blob);forceDownload(blobUrl,filename«,extension||"jpg"),d…`  · ASSIGN:identifier, ASSIGN:template-literal, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:member-element, RETURN:fallback-return
   5. L48 `…target.style.position==="fixed")&&document.body.removeChild(alertDiv)})}function hashCode(str){let hash=0;for(let i=0;i<»str.length;i++){let char=str.charCodeAt(i);hash=(hash<<5)-hash+char,hash=hash&hash«}return hash>>>0}async function checkDownloadPermission(){return new Promise(resolve=>{if(!globalExtPay){console.warn("G…`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:binary-left

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/chrome` L21:C4144 -> L21:C4151  `…=void 0)return result}}}chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse)=>{let{type,data,api}=»message«;return sender.origin==="https://www.threads.net"?(type==="threads_searchResults"?data.split(/\s*for\s+\(;;\);\s*/).filt…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (reels) — `background/chrome` L21:C5380 -> L21:C5496  `…orage.local.get(["reels","reels_media"]),newArr=(reels_media||[]).filter(i=>!jsonData.reels_media.find(j=>j.id===i.id));»chrome.storage.local.set({reels:Object.assign({},reels,data.reels),reels_media:[...newArr,...jsonData.reels_media]})«;break}}catch{}sendResponse()})(),!0)});})();`
  - `CHROME_LOCAL_STORAGE` (reels_media) — `background/chrome` L21:C5380 -> L21:C5496  `…orage.local.get(["reels","reels_media"]),newArr=(reels_media||[]).filter(i=>!jsonData.reels_media.find(j=>j.id===i.id));»chrome.storage.local.set({reels:Object.assign({},reels,data.reels),reels_media:[...newArr,...jsonData.reels_media]})«;break}}catch{}sendResponse()})(),!0)});})();`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (136 raw steps → 1 distinct lines):
   1. L21 `…a){if(Array.isArray(»jsonData.data?.xdt_api__v1__feed__reels_media__connection?.edges)){let data=jsonData.data.xdt_api__v1__feed__reels_media …⟨tainted span: 4758 chars⟩… d));chrome.storage.local.set({reels:Object.assign({},reels,data.reels),reels_media:[...newArr,...jsonData.reels_media]})«;break}}catch{}sendR…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[data], ELEMENT:destructure-property[api], ELEMENT:member-element, RETURN:fallback-return, ITERATE:loop.iteration, ASSIGN:conditional-consequent, ASSIGN:binary-left, RETURN:json.parse, COPY:object.assign-opaque, ELEMENT:object.setProperty, ELEMENT:array-spread, ASSIGN:unary

---

## Flow #5 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('reels') in background/chrome)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/chrome` L21:C4144 -> L21:C4151  `…=void 0)return result}}}chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse)=>{let{type,data,api}=»message«;return sender.origin==="https://www.threads.net"?(type==="threads_searchResults"?data.split(/\s*for\s+\(;;\);\s*/).filt…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (reels) — `background/chrome` L21:C5380 -> L21:C5496  `…orage.local.get(["reels","reels_media"]),newArr=(reels_media||[]).filter(i=>!jsonData.reels_media.find(j=>j.id===i.id));»chrome.storage.local.set({reels:Object.assign({},reels,data.reels),reels_media:[...newArr,...jsonData.reels_media]})«;break}}catch{}sendResponse()})(),!0)});})();`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (139 raw steps → 1 distinct lines):
   1. L21 `…a){if(Array.isArray(»jsonData.data?.xdt_api__v1__feed__reels_media__connection?.edges)){let data=jsonData.data.xdt_api__v1__feed__reels_media …⟨tainted span: 4758 chars⟩… d));chrome.storage.local.set({reels:Object.assign({},reels,data.reels),reels_media:[...newArr,...jsonData.reels_media]})«;break}}catch{}sendR…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[data], ELEMENT:destructure-property[api], ELEMENT:member-element, RETURN:fallback-return, ITERATE:loop.iteration, ASSIGN:conditional-consequent, ASSIGN:binary-left, RETURN:json.parse, COPY:object.assign-opaque, ELEMENT:object.setProperty, ELEMENT:array-spread, ASSIGN:unary, STORAGE:STORAGE_FLOW[area: local, key: reels, sender: background/chrome, receiver: background/chrome]

---

## Flow #6 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('reels_media') in background/chrome)  ·  3× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background/chrome` L21:C3136 -> L21:C3531  `…username_map:[]})});»chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{let{type,data}=message;if(type==="open_url")return  …⟨tainted span: 395 chars⟩…  page opened via background script")}catch(error){console.error("Error opening payment page:",error)}return!0}return!1})«;async function addT…`
- **Sink(s)**:
  - `CHROME_TABS_CREATE_OPTIONS` — `background/chrome` L21:C3256 -> L21:C3311  `…chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{let{type,data}=message;if(type==="open_url")return »chrome.tabs.create({url:data,index:sender.tab.index+1})«,!1;if(type==="open-payment-page"){try{ExtPay2("ig-download").openPaymentPage(),console.log("Payment page opened via bac…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L21 `…username_map:[]})});»chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{let{type,data}=message;if(type==="open_url")return  …⟨tainted span: 395 chars⟩…  page opened via background script")}catch(error){console.error("Error opening payment page:",error)}return!0}return!1})«;async function addT…`  · MESSAGE, ASSIGN:identifier, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[content/index->background/chrome]`

---
