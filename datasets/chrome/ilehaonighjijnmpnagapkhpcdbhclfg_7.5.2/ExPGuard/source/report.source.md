# Source-level Taint Flow — ilehaonighjijnmpnagapkhpcdbhclfg 7.5.2

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 5  (collapsed from 505 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/background` L13:C19307 -> L13:C19308  `…w.JWT,e),ea(e),n({success:!0})))(),!0}}),chrome.runtime.onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=»e«;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.runtime.getManifest(…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (wynd:user_id) — `src/background` L1:C15174 -> L1:C15223  `…t)))}catch(r){console.error("[getStorageValue]",r)}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await »chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSON.stringify(t)),window.dispatchEvent(new StorageEvent("local-storage",{key:e,newValue:JSON.stringify…`
  - `CHROME_LOCAL_STORAGE` (accessToken) — `src/background` L1:C15174 -> L1:C15223  `…t)))}catch(r){console.error("[getStorageValue]",r)}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await »chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSON.stringify(t)),window.dispatchEvent(new StorageEvent("local-storage",{key:e,newValue:JSON.stringify…`
  - `CHROME_LOCAL_STORAGE` (refreshToken) — `src/background` L1:C15174 -> L1:C15223  `…t)))}catch(r){console.error("[getStorageValue]",r)}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await »chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSON.stringify(t)),window.dispatchEvent(new StorageEvent("local-storage",{key:e,newValue:JSON.stringify…`
  - `CHROME_LOCAL_STORAGE` (tokenExpiry) — `src/background` L1:C15174 -> L1:C15223  `…t)))}catch(r){console.error("[getStorageValue]",r)}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await »chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSON.stringify(t)),window.dispatchEvent(new StorageEvent("local-storage",{key:e,newValue:JSON.stringify…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (150 raw steps → 2 distinct lines):
   1. L13 `…ner((e,t,n)=>{const{»type:r,payload:s}=e;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.r …⟨tainted span: 344 chars⟩… ([D(w.USER_ID,s.userId),D(w.ACCESS_TOKEN,s.accessToken),D(w.REFRESH_TOKEN,s.refreshToken),D(w.TOKEN_EXPIRY,s.tokenExpiry«),D(w.IS_AUTHENTICAT…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[payload], ELEMENT:member-element
   2. L1 `…set(e,t)))}catch(r){console.error("[getStorageValue]",r)}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?»await chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSON.stringify(t)),window.dispatchEvent(new StorageEvent("local-storage",{key:e,newValue:JSON.stringify…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('wynd:user_id') in src/background)  ·  288× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/background` L13:C19307 -> L13:C19308  `…w.JWT,e),ea(e),n({success:!0})))(),!0}}),chrome.runtime.onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=»e«;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.runtime.getManifest(…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `src/background` L13:C19868 -> L13:C19960  `…w.USER_ID),i=await k(w.ACCESS_TOKEN),a=await k(w.REFRESH_TOKEN),c=await k(w.TOKEN_EXPIRY),f=await k(w.IS_AUTHENTICATED);»n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAuthenticateUser:case J.ClearStorage:return(async()=>(await Promise.allSettled([D(w.IS_AUTHENTICATED,!1…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (235 raw steps → 2 distinct lines):
   1. L13 `…ner((e,t,n)=>{const{»type:r,payload:s}=e;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.r …⟨tainted span: 671 chars⟩… await k(w.IS_AUTHENTICATED);n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAut…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[payload], ELEMENT:member-element, ELEMENT:object.setProperty
   2. L1 `…),Pn=e=>{try{return »JSON.parse(e)}catch{return e}},k=async e=>{let t;const n=at();try{n===je.EXTENSION?t=(await chrome.storage.local.get([e] …⟨tainted span: 369 chars⟩… )}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSO…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: wynd:user_id, sender: src/background, receiver: src/background], RETURN:json.parse

---

## Flow #3 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('accessToken') in src/background)  ·  72× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/background` L13:C19307 -> L13:C19308  `…w.JWT,e),ea(e),n({success:!0})))(),!0}}),chrome.runtime.onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=»e«;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.runtime.getManifest(…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `src/background` L13:C19868 -> L13:C19960  `…w.USER_ID),i=await k(w.ACCESS_TOKEN),a=await k(w.REFRESH_TOKEN),c=await k(w.TOKEN_EXPIRY),f=await k(w.IS_AUTHENTICATED);»n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAuthenticateUser:case J.ClearStorage:return(async()=>(await Promise.allSettled([D(w.IS_AUTHENTICATED,!1…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (181 raw steps → 2 distinct lines):
   1. L13 `…ner((e,t,n)=>{const{»type:r,payload:s}=e;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.r …⟨tainted span: 671 chars⟩… await k(w.IS_AUTHENTICATED);n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAut…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[payload], ELEMENT:member-element, ELEMENT:object.setProperty
   2. L1 `…),Pn=e=>{try{return »JSON.parse(e)}catch{return e}},k=async e=>{let t;const n=at();try{n===je.EXTENSION?t=(await chrome.storage.local.get([e] …⟨tainted span: 369 chars⟩… )}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSO…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: accessToken, sender: src/background, receiver: src/background], RETURN:json.parse

---

## Flow #4 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('refreshToken') in src/background)  ·  72× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/background` L13:C19307 -> L13:C19308  `…w.JWT,e),ea(e),n({success:!0})))(),!0}}),chrome.runtime.onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=»e«;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.runtime.getManifest(…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `src/background` L13:C19868 -> L13:C19960  `…w.USER_ID),i=await k(w.ACCESS_TOKEN),a=await k(w.REFRESH_TOKEN),c=await k(w.TOKEN_EXPIRY),f=await k(w.IS_AUTHENTICATED);»n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAuthenticateUser:case J.ClearStorage:return(async()=>(await Promise.allSettled([D(w.IS_AUTHENTICATED,!1…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (181 raw steps → 2 distinct lines):
   1. L13 `…ner((e,t,n)=>{const{»type:r,payload:s}=e;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.r …⟨tainted span: 671 chars⟩… await k(w.IS_AUTHENTICATED);n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAut…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[payload], ELEMENT:member-element, ELEMENT:object.setProperty
   2. L1 `…),Pn=e=>{try{return »JSON.parse(e)}catch{return e}},k=async e=>{let t;const n=at();try{n===je.EXTENSION?t=(await chrome.storage.local.get([e] …⟨tainted span: 369 chars⟩… )}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSO…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: refreshToken, sender: src/background, receiver: src/background], RETURN:json.parse

---

## Flow #5 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.local.set('tokenExpiry') in src/background)  ·  72× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `src/background` L13:C19307 -> L13:C19308  `…w.JWT,e),ea(e),n({success:!0})))(),!0}}),chrome.runtime.onMessageExternal.addListener((e,t,n)=>{const{type:r,payload:s}=»e«;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.runtime.getManifest(…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `src/background` L13:C19868 -> L13:C19960  `…w.USER_ID),i=await k(w.ACCESS_TOKEN),a=await k(w.REFRESH_TOKEN),c=await k(w.TOKEN_EXPIRY),f=await k(w.IS_AUTHENTICATED);»n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAuthenticateUser:case J.ClearStorage:return(async()=>(await Promise.allSettled([D(w.IS_AUTHENTICATED,!1…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (181 raw steps → 2 distinct lines):
   1. L13 `…ner((e,t,n)=>{const{»type:r,payload:s}=e;switch(r){case J.Ping:n("pong");return;case J.GetCurrentVersion:n({success:!0,data:{version:chrome.r …⟨tainted span: 671 chars⟩… await k(w.IS_AUTHENTICATED);n({success:!0,data:{userId:o,accessToken:i,refreshToken:a,tokenExpiry:c,isAuthenticated:f}})«})(),!0;case J.UnAut…`  · ASSIGN:identifier, ELEMENT:destructure-property[type], ELEMENT:destructure-property[payload], ELEMENT:member-element, ELEMENT:object.setProperty
   2. L1 `…),Pn=e=>{try{return »JSON.parse(e)}catch{return e}},k=async e=>{let t;const n=at();try{n===je.EXTENSION?t=(await chrome.storage.local.get([e] …⟨tainted span: 369 chars⟩… )}return Pn(t)},D=async(e,t)=>{const n=at();try{n===je.EXTENSION?await chrome.storage.local.set({[e]:JSON.stringify(t)})«:(await lt.set(e,JSO…`  · ASSIGN:identifier, RETURN:json.stringify, ELEMENT:object.setProperty, STORAGE:STORAGE_FLOW[area: local, key: tokenExpiry, sender: src/background, receiver: src/background], RETURN:json.parse

---
