# Source-level Taint Flow — hfonloodfjgngkhglcdnkjdlllfjdbck 1.0.1

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 6  (collapsed from 7 raw issue entries)
- Sinkless sources skipped: 10 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — DOCUMENT_LOCATION (location.pathname)

- **Source**: `DOCUMENT_LOCATION` — `js/in` L1:C27571 -> L1:C27594  `…e||"VIDEO"==t.target.tagName)){try{n(t.target)}catch(i){}try{m()}catch(i){}}})).observe(b,{attributes:!0,subtree:!0}),s=»location.pathname.match«(/\/p\/.*?(?=\/)|explore/g),document.querySelectorAll(["article img:not([data-ig_toolkit_marked])","article video:not([d…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/in` L1:C12339 -> L1:C12598  `…g)[0].split('"')[2];»fetch("https://i.instagram.com/api/v1/users/web_profile_info/?username="+i,{method:"GET",headers:{"x-instagram-ajax":"10 …⟨tainted span: 259 chars⟩… d":"129477","x-ig-app-id":"936619743392459","x-requested-with":"XMLHttpRequest","x-csrftoken":a},credentials:"include"})«.then((i=>i.json()))…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (216 raw steps → 1 distinct lines):
   1. L1 `…am"))return;var t,e,»l=[];chrome.runtime.sendMessage({openig:!0},(i=>{})),window.addEventListener("message",(i=>{"nullvideo"==i.data&&e.paren …⟨tainted span: 29231 chars⟩… _toolkit_marked="1",l.parentElement.parentElement.getAttribute("toolin")||""==e||((I=document.createElement("div")).id=e«,I.onclick=d,I.class…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:logical-right, ELEMENT:object.setProperty, ASSIGN:binary-left, ITERATE:loop.iteration, ELEMENT:implicit.add, ELEMENT:member-element-container

---

## Flow #2 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/fb-v` L1:C54 -> L1:C83  `document.addEventListener("DOMContentLoaded",(i=>{if(!»window.location.href.includes«("facebook"))return;var l;function I(){l=this;var i="",I="";try{i=document.cookie.match(/c_user.*?(?=;)/g)[0].split("=")…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/fb-v` L1:C9123 -> L1:C9530  `…t("=")[1]}catch(i){}»fetch("https://www.facebook.com/video/video_data_async/?video_id="+c+"&fb_dtsg_ag="+I+"&__user="+i+"&__a=1",{headers:{ac …⟨tainted span: 407 chars⟩… ite":"none"},referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",mode:"cors",credentials:"include"})«.then((i=>i.text()))…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (85 raw steps → 1 distinct lines):
   1. L1 `…tentLoaded",(i=>{if(»!window.location.href.includes("facebook"))return;var l;function I(){l=this;var i="",I="";try{i=document.cookie.match(/c …⟨tainted span: 11471 chars⟩… w.facebook']>img").alt}catch(i){l="none"}chrome.runtime.sendMessage({downloadv1:i.data,idx:l,url:location.href},(i=>{}))«}}),!1),document.add…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:unary, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container, ELEMENT:string.split, ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #3 — DOCUMENT_COOKIE (document.cookie)

- **Source**: `DOCUMENT_COOKIE` — `js/fb-v` L1:C149 -> L1:C170  `…MContentLoaded",(i=>{if(!window.location.href.includes("facebook"))return;var l;function I(){l=this;var i="",I="";try{i=»document.cookie.match«(/c_user.*?(?=;)/g)[0].split("=")[1],I=document.documentElement.innerHTML.match(/"async_get_token":".*?(?=")/g)[0].split…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/fb-v` L1:C9123 -> L1:C9530  `…t("=")[1]}catch(i){}»fetch("https://www.facebook.com/video/video_data_async/?video_id="+c+"&fb_dtsg_ag="+I+"&__user="+i+"&__a=1",{headers:{ac …⟨tainted span: 407 chars⟩… ite":"none"},referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",mode:"cors",credentials:"include"})«.then((i=>i.text()))…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (20 raw steps → 1 distinct lines):
   1. L1 `…var i="",I="";try{i=»document.cookie.match(/c_user.*?(?=;)/g)[0].split("=")[1],I=document.documentElement.innerHTML.match(/"async_get_token": …⟨tainted span: 9072 chars⟩… lit("=")[1]}catch(i){}fetch("https://www.facebook.com/video/video_data_async/?video_id="+c+"&fb_dtsg_ag="+I+"&__user="+i«+"&__a=1",{headers:{…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left

---

## Flow #4 — DOCUMENT_LOCATION (location.href)

- **Source**: `DOCUMENT_LOCATION` — `js/fb-v` L1:C11707 -> L1:C14096  `…&(elementping=I)})),»chrome.runtime.onMessage.addListener(((i,I,c)=>{if(i.countdow&&"ok"==i.countdow)try{l.getElementsByClassName("violet_too …⟨tainted span: 2389 chars⟩… cludes("stories")&&elementping.parentElement.parentElement.getElementsByClassName("violet_toolkit_dl_btn")[0].click()}))«;let t=document.getE…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `js/fb-v` L1:C9123 -> L1:C9530  `…t("=")[1]}catch(i){}»fetch("https://www.facebook.com/video/video_data_async/?video_id="+c+"&fb_dtsg_ag="+I+"&__user="+i+"&__a=1",{headers:{ac …⟨tainted span: 407 chars⟩… ite":"none"},referrerPolicy:"strict-origin-when-cross-origin",body:null,method:"GET",mode:"cors",credentials:"include"})«.then((i=>i.text()))…`  (url-control=PARTIAL)
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (83 raw steps → 1 distinct lines):
   1. L1 `…1);var c=this.id;if(»location.href.includes("watch/?v=")||location.href.includes("watch?v="))try{c=location.href.split("=")[1]}catch(i){}fetc …⟨tainted span: 5089 chars⟩… cludes("stories")&&elementping.parentElement.parentElement.getElementsByClassName("violet_toolkit_dl_btn")[0].click()}))«;let t=document.getE…`  · MESSAGE, ELEMENT:member-element, RETURN:fallback-return, ASSIGN:logical-left, ASSIGN:logical-right, ELEMENT:member-element-container, ELEMENT:string.split, ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:binary-right, ASSIGN:binary-left
      ⇄ cross-context hop: `runtime.single.sender.message[js/in->js/fb-v]`

---

## Flow #5 — DOCUMENT_LOCATION (location.href)  ·  2× duplicate paths collapsed

- **Source**: `DOCUMENT_LOCATION` — `js/bg` L1:C102149 -> L1:C104296  `…up/popup.html"})})),»chrome.runtime.onMessage.addListener((async function(e,t){if(e.downloadv1){let t=new Date,r=t.getFullYear()+"-"+(t.getMo …⟨tainted span: 2147 chars⟩… downloadCounter:r})}))}(t.tab.id)):chrome.storage.local.set({rated1:"true"}):chrome.storage.local.set({rated:"true"})}))«}},t={};function r(n…`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `js/bg` L1:C102400 -> L1:C102489  `…"+t.getDate()+"-"+t.getHours()+"."+t.getMinutes()+"."+t.getMilliseconds(),n=e.downloadv1.split("?")[0].split(".").pop();»chrome.downloads.download({url:e.downloadv1,filename:e.idx+"'s"+r+" story."+n,saveAs:!1})«,chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e.length>0&&chrome.tabs.sendMessage(e[0].id,{countdow:"ok"})}))}if(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (10 raw steps → 1 distinct lines):
   1. L1 `…up/popup.html"})})),»chrome.runtime.onMessage.addListener((async function(e,t){if(e.downloadv1){let t=new Date,r=t.getFullYear()+"-"+(t.getMo …⟨tainted span: 2147 chars⟩… downloadCounter:r})}))}(t.tab.id)):chrome.storage.local.set({rated1:"true"}):chrome.storage.local.set({rated:"true"})}))«}},t={};function r(n…`  · MESSAGE, ASSIGN:binary-left, ELEMENT:object.setProperty
      ⇄ cross-context hop: `runtime.single.sender.message[js/in->js/bg]; runtime.single.sender.message[js/fb-v->js/bg]`

---

## Flow #6 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `js/bg` L1:C102149 -> L1:C104296  `…up/popup.html"})})),»chrome.runtime.onMessage.addListener((async function(e,t){if(e.downloadv1){let t=new Date,r=t.getFullYear()+"-"+(t.getMo …⟨tainted span: 2147 chars⟩… downloadCounter:r})}))}(t.tab.id)):chrome.storage.local.set({rated1:"true"}):chrome.storage.local.set({rated:"true"})}))«}},t={};function r(n…`
- **Sink(s)**:
  - `CHROME_DOWNLOADS_OPTIONS` — `js/bg` L1:C102400 -> L1:C102489  `…"+t.getDate()+"-"+t.getHours()+"."+t.getMinutes()+"."+t.getMilliseconds(),n=e.downloadv1.split("?")[0].split(".").pop();»chrome.downloads.download({url:e.downloadv1,filename:e.idx+"'s"+r+" story."+n,saveAs:!1})«,chrome.tabs.query({active:!0,currentWindow:!0},(e=>{e.length>0&&chrome.tabs.sendMessage(e[0].id,{countdow:"ok"})}))}if(…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (23 raw steps → 1 distinct lines):
   1. L1 `…up/popup.html"})})),»chrome.runtime.onMessage.addListener((async function(e,t){if(e.downloadv1){let t=new Date,r=t.getFullYear()+"-"+(t.getMo …⟨tainted span: 2147 chars⟩… downloadCounter:r})}))}(t.tab.id)):chrome.storage.local.set({rated1:"true"}):chrome.storage.local.set({rated:"true"})}))«}},t={};function r(n…`  · MESSAGE, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty, ASSIGN:identifier, ASSIGN:binary-right
      ⇄ cross-context hop: `runtime.single.sender.message[js/fb-v->js/bg]`

---
