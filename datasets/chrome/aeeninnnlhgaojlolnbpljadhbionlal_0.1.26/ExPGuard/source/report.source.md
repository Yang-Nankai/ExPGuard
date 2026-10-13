# Source-level Taint Flow — aeeninnnlhgaojlolnbpljadhbionlal 0.1.26

- Source type: CRX
- Files with issues: 1 / 2
- Distinct taint flows: 2  (collapsed from 19 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/background` L1:C225090 -> L1:C225091  `…T.StartMeetingAutoRecording,void 0,!1);break}}})()});chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>{switch(»e«.type){case ha.T.OpenExtension:await Gc(t.tab);break;case ha.T.RefreshWorkspace:Lc();break;case ha.T.CheckStoredRecordin…`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (localUploadState) — `scripts/background` L1:C226001 -> L1:C226128  `…await $c(!0),r=await(async e=>{try{const t=await(0,oc.e)(e,!0),n=t.map(e=>({dbName:e.dbName}));if(n.length)return await »chrome.storage.session.set({localUploadState:{queue:n,userId:e,recordings:t,status:rc.Z.Idle,updateDate:(new Date).getTime()}})«,await Nc(),!0;throw new Error("No stored recordings")}catch(e){return console.log(e),await ic(),!1}})(e.userId)),t?.tab…`
  - `CHROME_SESSION_STORAGE` (localUploadPendingArr) — `scripts/background` L1:C195639 -> L1:C195692  `…[Ta,Ia,ka]),s=r;if(s&&(n||i)){let e=o;if(o){-1===e.findIndex(e=>e.dbName===t.dbName)&&e.push(t)}else e=[t];return await »chrome.storage.session.set({localUploadPendingArr:e})«,!0}try{const n=await(0,oc.e)(e,!1),r=n.find(e=>e.dbName===t.dbName);if(r){r.enqueued=!0;const o=s?.queue?[...s.queue,t]…`
  - `CHROME_SESSION_STORAGE` (localUploadState) — `scripts/background` L1:C195830 -> L1:C195957  `…ait(0,oc.e)(e,!1),r=n.find(e=>e.dbName===t.dbName);if(r){r.enqueued=!0;const o=s?.queue?[...s.queue,t]:[t];return await »chrome.storage.session.set({localUploadState:{recordings:n,userId:e,status:rc.Z.Idle,updateDate:(new Date).getTime(),queue:o}})«,await Nc(),!0}return!1}catch(e){return console.log(e),!1}},ac=async(e,t,n,r,o)=>{const{meetSpeakersData:i,meetCommentsD…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (103 raw steps → 1 distinct lines):
   1. L1 `…me)&&e.push(t)}else »e=[t];return await chrome.storage.session.set({localUploadPendingArr:e}),!0}try{const n=await(0,oc.e)(e,!1),r=n.find(e=> …⟨tainted span: 31083 chars⟩… loadStatusAppTabId:t.tab.id}),n({wasInitiated:r});break}case ha.T.DeleteDatabase:if(e.dbName)try{await(0,nc.MR)(e.dbName«),n({success:!0})}ca…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:conditional-alternate

---

## Flow #2 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (From storage.session.set('localUploadState') in scripts/background)  ·  18× duplicate paths collapsed

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `scripts/background` L1:C225090 -> L1:C225091  `…T.StartMeetingAutoRecording,void 0,!1);break}}})()});chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>{switch(»e«.type){case ha.T.OpenExtension:await Gc(t.tab);break;case ha.T.RefreshWorkspace:Lc();break;case ha.T.CheckStoredRecordin…`
- **Sink(s)**:
  - `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) — `scripts/background` L1:C225619 -> L1:C225693  `…e.userId&&(a=await(0,oc.e)(e.userId,!1))),t?.tab?.id&&await chrome.storage.session.set({uploadStatusAppTabId:t.tab.id}),»n({recordings:a,isUploadInProgress:!!s,isRecordingInProgress:r!==pa.Idle})«}break;case ha.T.UploadStoredRecordings:{let r=!1;const{status:o,defaultWorkspace:i,uploaderTabId:s}=await chrome.storag…`
  - `CHROME_SESSION_STORAGE` (localUploadState) — `scripts/background` L1:C195830 -> L1:C195957  `…ait(0,oc.e)(e,!1),r=n.find(e=>e.dbName===t.dbName);if(r){r.enqueued=!0;const o=s?.queue?[...s.queue,t]:[t];return await »chrome.storage.session.set({localUploadState:{recordings:n,userId:e,status:rc.Z.Idle,updateDate:(new Date).getTime(),queue:o}})«,await Nc(),!0}return!1}catch(e){return console.log(e),!1}},ac=async(e,t,n,r,o)=>{const{meetSpeakersData:i,meetCommentsD…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (122 raw steps → 1 distinct lines):
   1. L1 `…me)&&e.push(t)}else »e=[t];return await chrome.storage.session.set({localUploadPendingArr:e}),!0}try{const n=await(0,oc.e)(e,!1),r=n.find(e=> …⟨tainted span: 31083 chars⟩… loadStatusAppTabId:t.tab.id}),n({wasInitiated:r});break}case ha.T.DeleteDatabase:if(e.dbName)try{await(0,nc.MR)(e.dbName«),n({success:!0})}ca…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:logical-left, ELEMENT:object.setProperty, ELEMENT:implicit.add, ASSIGN:conditional-alternate, STORAGE:STORAGE_FLOW[area: session, key: localUploadState, sender: scripts/background, receiver: scripts/background], ASSIGN:unary

---
