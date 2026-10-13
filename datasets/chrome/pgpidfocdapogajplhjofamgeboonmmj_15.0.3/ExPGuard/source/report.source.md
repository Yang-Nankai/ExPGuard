# Source-level Taint Flow — pgpidfocdapogajplhjofamgeboonmmj 15.0.3

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 5  (collapsed from 5 raw issue entries)
- Sinkless sources skipped: 14 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — ELEMENT_VALUE

- **Source**: `ELEMENT_VALUE` — `ptt.bundle` L11:C785 -> L11:C786  `…etElementsByName(moduleag[11])[1].onclick=function(){var e=document.getElementsByName(moduleag[12])[1].value,t={};t.PAX=»e«,chrome.storage.local.set(t,(function(){}))}}}catch(e){}try{t=document.getElementsByClassName(moduleag[9]);for(var o in …`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (PAX) — `ptt.bundle` L11:C787 -> L11:C829  `…ElementsByName(moduleag[11])[1].onclick=function(){var e=document.getElementsByName(moduleag[12])[1].value,t={};t.PAX=e,»chrome.storage.local.set(t,(function(){}))«}}}catch(e){}try{t=document.getElementsByClassName(moduleag[9]);for(var o in t)document.getElementsByClassName(moduleag[…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L11 `…,document.getElementsByName(moduleag[11])[1].onclick=function(){var e=document.getElementsByName(moduleag[12])[1].value,»t={};t.PAX=e«,chrome.storage.local.set(t,(function(){}))}}}catch(e){}try{t=document.getElementsByClassName(moduleag[9]);for(var o in …`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #2 — ELEMENT_VALUE

- **Source**: `ELEMENT_VALUE` — `ptt.bundle` L11:C1200 -> L11:C1201  `…etElementsByName(moduleag[11])[1].onclick=function(){var e=document.getElementsByName(moduleag[12])[1].value,t={};t.PAX=»e«,chrome.storage.local.set(t,(function(){}))}}}catch(e){}try{document.getElementsByName(moduleag[13])[0].onclick=function…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (PAX) — `ptt.bundle` L11:C1202 -> L11:C1244  `…ElementsByName(moduleag[11])[1].onclick=function(){var e=document.getElementsByName(moduleag[12])[1].value,t={};t.PAX=e,»chrome.storage.local.set(t,(function(){}))«}}}catch(e){}try{document.getElementsByName(moduleag[13])[0].onclick=function(){var e="",t="";try{e=document.getElements…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (3 raw steps → 1 distinct lines):
   1. L11 `…,document.getElementsByName(moduleag[11])[1].onclick=function(){var e=document.getElementsByName(moduleag[12])[1].value,»t={};t.PAX=e«,chrome.storage.local.set(t,(function(){}))}}}catch(e){}try{document.getElementsByName(moduleag[13])[0].onclick=function…`  · ASSIGN:identifier, ELEMENT:object.setProperty

---

## Flow #3 — ELEMENT_VALUE

- **Source**: `ELEMENT_VALUE` — `ptt.bundle` L11:C1485 -> L11:C1486  `…yName(moduleag[14])[0].value}catch(e){}try{t=document.getElementsByName(moduleag[15])[0].value}catch(e){}var o={};o.PAX=»e«+"||"+t,chrome.storage.local.set(o,(function(){}))}}catch(e){}}}));var contexdata="";function getdataads(e){var t=new XM…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (PAX) — `ptt.bundle` L11:C1494 -> L11:C1536  `…uleag[14])[0].value}catch(e){}try{t=document.getElementsByName(moduleag[15])[0].value}catch(e){}var o={};o.PAX=e+"||"+t,»chrome.storage.local.set(o,(function(){}))«}}catch(e){}}}));var contexdata="";function getdataads(e){var t=new XMLHttpRequest;t.withCredentials=!0,t.open("GET",mod…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (7 raw steps → 1 distinct lines):
   1. L11 `…etElementsByName(moduleag[14])[0].value}catch(e){}try{t=document.getElementsByName(moduleag[15])[0].value}catch(e){}var »o={};o.PAX=e+"||"«+t,chrome.storage.local.set(o,(function(){}))}}catch(e){}}}));var contexdata="";function getdataads(e){var t=new XMLHttp…`  · ASSIGN:identifier, ASSIGN:binary-left, ELEMENT:object.setProperty

---

## Flow #4 — ELEMENT_VALUE

- **Source**: `ELEMENT_VALUE` — `ptt.bundle` L11:C1492 -> L11:C1493  `…oduleag[14])[0].value}catch(e){}try{t=document.getElementsByName(moduleag[15])[0].value}catch(e){}var o={};o.PAX=e+"||"+»t«,chrome.storage.local.set(o,(function(){}))}}catch(e){}}}));var contexdata="";function getdataads(e){var t=new XMLHttpRe…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (PAX) — `ptt.bundle` L11:C1494 -> L11:C1536  `…uleag[14])[0].value}catch(e){}try{t=document.getElementsByName(moduleag[15])[0].value}catch(e){}var o={};o.PAX=e+"||"+t,»chrome.storage.local.set(o,(function(){}))«}}catch(e){}}}));var contexdata="";function getdataads(e){var t=new XMLHttpRequest;t.withCredentials=!0,t.open("GET",mod…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (5 raw steps → 1 distinct lines):
   1. L11 `…etElementsByName(moduleag[14])[0].value}catch(e){}try{t=document.getElementsByName(moduleag[15])[0].value}catch(e){}var »o={};o.PAX=e+"||"+t«,chrome.storage.local.set(o,(function(){}))}}catch(e){}}}));var contexdata="";function getdataads(e){var t=new XMLHttpRe…`  · ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty

---

## Flow #5 — ELEMENT_VALUE

- **Source**: `ELEMENT_VALUE` — `ptt.bundle` L11:C7007 -> L11:C7008  `…NEXTINPUT"};chrome.storage.local.set(t,(function(){}));var o=document.getElementsByTagName(moduleag[40])[1].value;if(6==»o«.length){const t=document.documentElement.innerHTML;var a=t.match(regexb(moduleag[41]))[3].split('"')[2],n=t.match(modul…`
- **Sink(s)**:
  - `XML_HTTP_REQUEST_SEND` — `ptt.bundle` L11:C7367 -> L11:C7376  `…7]+e+moduleag[48];m.open("POST",moduleag[49],!1),m.setRequestHeader("Content-type","application/x-www-form-urlencoded"),»m.send(l)«;if(1==JSON.parse(m.responseText).data[moduleag[50]][moduleag[51]]){var u=new XMLHttpRequest,d=moduleag[52]+n+moduleag[5…`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (14 raw steps → 1 distinct lines):
   1. L11 `…40])[1].value;if(6==»o.length){const t=document.documentElement.innerHTML;var a=t.match(regexb(moduleag[41]))[3].split('"')[2],n=t.match(modu …⟨tainted span: 368 chars⟩… uleag[48];m.open("POST",moduleag[49],!1),m.setRequestHeader("Content-type","application/x-www-form-urlencoded"),m.send(l«);if(1==JSON.parse(m…`  · ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left

---
