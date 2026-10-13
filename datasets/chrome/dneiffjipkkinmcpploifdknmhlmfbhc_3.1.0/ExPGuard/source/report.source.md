# Source-level Taint Flow — dneiffjipkkinmcpploifdknmhlmfbhc 3.1.0

- Source type: CRX
- Files with issues: 2 / 2
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 2 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L5:C130910 -> L5:C130911  `…tch(n){console.warn("Error sending response",n.message)}},E=C=>(console.error(C),F({error:{message:C.message}}));switch(»e«.method){case 999:a(!0);break;case 42:b("management.uninstallSelf").then(a).catch(E);break;default:u(e,a,E,r)||E(new Err…`
- **Sink(s)**:
  - `CHROME_SESSION_STORAGE` (unknown) — `background` L5:C124762 -> L5:C124797  `…chrome.storage.local.get(u))[u]||D}catch{return D}},delete(u){chrome.storage.local.remove(u)},session:{set(u,D){D!=null?»chrome.storage.session.set({[u]:D})«:chrome.storage.session.remove(u)},async get(u,D){try{return(await chrome.storage.session.get(u))[u]||D}catch{return D}}…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (106 raw steps → 1 distinct lines):
   1. L5 `…},session:{set(u,D){»D!=null?chrome.storage.session.set({[u]:D}):chrome.storage.session.remove(u)},async get(u,D){try{return(await chrome.sto …⟨tainted span: 12439 chars⟩… .method==="checkPermissions"?"permissions.contains":"permissions.request",{origins:C,permissions:n}).then(D).catch(e),!0«}return!1});chrome.r…`  · ASSIGN:identifier, ELEMENT:member-element, RETURN:fallback-return, ELEMENT:object.setProperty, ASSIGN:binary-left, RETURN:json.stringify, ELEMENT:destructure-property[withRequest], ELEMENT:destructure-property[text], ELEMENT:destructure-property[maxResults], ELEMENT:destructure-property[startTime], ELEMENT:destructure-property[origins], ELEMENT:destructure-property[permissions], ASSIGN:template-literal, ELEMENT:computed-member-unknown-alternative, ELEMENT:member-element-container, ASSIGN:logical-left, ELEMENT:implicit.add, ASSIGN:conditional-alternate, ASSIGN:binary-right, ASSIGN:logical-right

---
