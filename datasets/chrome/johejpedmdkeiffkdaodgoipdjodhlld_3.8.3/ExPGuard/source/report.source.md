# Source-level Taint Flow — johejpedmdkeiffkdaodgoipdjodhlld 3.8.3

- Source type: CRX
- Files with issues: 1 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 4 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background.bundle` L1746:C1818 -> L1746:C1819  `…unction(t){return e.apply(this,arguments)}}()),Wn.runtime.onMessageExternal.addListener((function(e,t,r){if("sign_in"===»e«.action){var n=e.token;ar(ni,n).then((function(e){r({success:!0})})).catch((function(e){console.error("error",e),r({succ…`
- **Sink(s)**:
  - `FETCH_BODY` ([Unknown URL]) — `background.bundle` L510:C420 -> L510:C525  `…AdditionalHeaders();return a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode),»Ze.fetch()(ot(e,e.config.apiHost,r,o),Object.assign({method:t,headers:a,referrerPolicy:"no-referrer"},i))«}))}async function it(e,t,r){e._canInitEmulator=!1;const n=Object.assign(Object.assign({},et),t);try{const t=new at(e),i…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (38 raw steps → 4 distinct lines):
   1. L1746 `…t,r){if("sign_in"===»e.action){var n=e.token;ar(ni,n).then((function(e){r({success:!0})})).catch((function(e){console.error("error",e),r({suc …⟨tainted span: 328 chars⟩… tion(){r({success:!0})})).catch((function(e){console.error("error",e),r({success:!1})})):"upgrade_successful"===e.action«?ti({action:"account…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-right
   2. L1187 `async function(e,t){return st(e,"POST","/v1/accounts:signInWithCustomToken",rt(e,t))}(r,{token:»t«,returnSecureToken:!0}),i=await er._fromIdTokenResponse(r,"signIn",n);return await r._updateCurrentUser(i.user),i}`  · ASSIGN:identifier
   3. L1170 (→L1187) `»async function ar(e,t){const r=Ut(e),n=await«`  · ELEMENT:object.setProperty
   4. L510 `*/function rt(e,t){»return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function nt(e,t,r,n,i={} …⟨tainted span: 505 chars⟩… .languageCode),Ze.fetch()(ot(e,e.config.apiHost,r,o),Object.assign({method:t,headers:a,referrerPolicy:"no-referrer"},i))«}))}async function i…`  · ELEMENT:object.setProperty, COPY:object.assign, ASSIGN:conditional-alternate, RETURN:json.stringify

---
