# Source-level Taint Flow — eipdnjedkpcnlmmdfdkgfpljanehloah 10.4.0

- Source type: CRX
- Files with issues: 1 / 1
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 1 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `sw` L13:C30614 -> L13:C30615  `…entId:"set-default-app",contexts:["action"]})}chrome.runtime.onMessageExternal.addListener((d,p,w)=>{const E={messageId:»d«.messageId,messageType:"RESPONSE",actionOutput:null};return d?d.actionName==="XHR_SEND"?Ht(d.actionInput).then(N=>{E.act…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `sw` L1:C43 -> L1:C51  `let X={};async function zt(d){return await »fetch(d)«.then(p=>p.blob())}function We(d){if(!d)return!1;const p=d.toLowerCase();return p.startsWith("image/")||p.startsWith("au…`  (url-control=FULL)
  - `FETCH_RESOURCE` ([Unknown URL]) — `sw` L8:C588 -> L8:C602  `…"&&(N=null);const _={method:U,headers:E,body:N,credentials:"include",signal:w},D=new Date().getTime();try{const y=await »fetch(d.url,_)«,R=new Date().getTime()-D,l=y.headers.get("Content-Type");let m="";if(l!=null&&l.includes("multipart/"))m=await Vt(y);el…`  (url-control=FULL)
  - `FETCH_BODY` ([Unknown URL]) — `sw` L8:C588 -> L8:C602  `…"&&(N=null);const _={method:U,headers:E,body:N,credentials:"include",signal:w},D=new Date().getTime();try{const y=await »fetch(d.url,_)«,R=new Date().getTime()-D,l=y.headers.get("Content-Type");let m="";if(l!=null&&l.includes("multipart/"))m=await Vt(y);el…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `sw` L13:C30826 -> L13:C30830  `…d.actionInput).then(N=>{E.actionOutput=N,w(E)}).catch(N=>{E.error=N,w(E)}):d.actionName==="XHR_ABORT"?Qt(d.actionInput):»w(E)«:w(E),!0});const en=chrome.runtime.getURL("/index.html"),tn="https://app.boomerangapi.com";chrome.action.onClicked.addLi…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `sw` L13:C30831 -> L13:C30835  `…ionInput).then(N=>{E.actionOutput=N,w(E)}).catch(N=>{E.error=N,w(E)}):d.actionName==="XHR_ABORT"?Qt(d.actionInput):w(E):»w(E)«,!0});const en=chrome.runtime.getURL("/index.html"),tn="https://app.boomerangapi.com";chrome.action.onClicked.addListene…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `sw` L13:C30747 -> L13:C30751  `…essageType:"RESPONSE",actionOutput:null};return d?d.actionName==="XHR_SEND"?Ht(d.actionInput).then(N=>{E.actionOutput=N,»w(E)«}).catch(N=>{E.error=N,w(E)}):d.actionName==="XHR_ABORT"?Qt(d.actionInput):w(E):w(E),!0});const en=chrome.runtime.getURL…`
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `sw` L13:C30774 -> L13:C30778  `…nOutput:null};return d?d.actionName==="XHR_SEND"?Ht(d.actionInput).then(N=>{E.actionOutput=N,w(E)}).catch(N=>{E.error=N,»w(E)«}):d.actionName==="XHR_ABORT"?Qt(d.actionInput):w(E):w(E),!0});const en=chrome.runtime.getURL("/index.html"),tn="https:/…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (181 raw steps → 3 distinct lines):
   1. L13 `…"use-pwa",parentId:"set-default-app",contexts:["action"]})}chrome.runtime.onMessageExternal.addListener((d,p,w)=>{const »E={messageId:d.messageId,messageType:"RESPONSE",actionOutput:null};return d?d.actionName==="XHR_SEND"?Ht(d.actionInput).then(N=>{E.actionOutput=N,w(E)}).catch(N=>{E.error=N,w(E)}):d.actionName==="XHR_ABORT"?Qt(d.actionInput«):w(E):w(E),!0});const en=chrome.runtime.getURL("/index.html"),tn="https://app.boomerangapi.com";chrome.action.onClicked…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:object.setProperty
   2. L8 `…ntroller,w=p.signal;»d.id&&(X[d.id]=p);const E={};d.headers&&Object.entries(d.headers).forEach(([y,R])=>{E[y]=R});let N=null;const I=d.multip …⟨tainted span: 1427 chars⟩… lease install the Boomerang extension and reload the app to resolve this issue."}}function Qt(d){X[d]&&(X[d].abort(),X[d«]=null,delete X[d])}…`  · ASSIGN:identifier, ELEMENT:member-element, ELEMENT:member.length, ASSIGN:logical-left, ASSIGN:logical-right, ASSIGN:binary-right, ASSIGN:binary-left, ELEMENT:object.setProperty
   3. L1 `let X={};async function zt(d){return await fetch(»d«).then(p=>p.blob())}function We(d){if(!d)return!1;const p=d.toLowerCase();return p.startsWith("image/")||p.startsWith("a…`  · ASSIGN:identifier

---
