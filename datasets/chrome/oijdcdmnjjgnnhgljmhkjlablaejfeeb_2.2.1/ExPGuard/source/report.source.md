# Source-level Taint Flow — oijdcdmnjjgnnhgljmhkjlablaejfeeb 2.2.1

- Source type: CRX
- Files with issues: 3 / 4
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `assets/service_worker.js` L1:C310 -> L1:C311  `…ome.runtime.lastError):console.log("Uninstall URL set.")});chrome?.runtime?.onMessageExternal?.addListener((e,t,s)=>{if(»e«.type==="SYNC_FIREBASE_SESSION")return o(e.refreshToken,e.uid).then(()=>{console.log("Session Saved from Web App and tok…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (fire_refresh_token) — `assets/service_worker.js` L1:C473 -> L1:C563  `….refreshToken,e.uid).then(()=>{console.log("Session Saved from Web App and token generated!"),s({success:!0})}).catch(r=»>{console.error("Error saving Firebase session:",r.message),s({success:!1,error:r.message}«)}),!0});`
  - `CHROME_LOCAL_STORAGE` (fire_uid) — `assets/service_worker.js` L1:C473 -> L1:C563  `….refreshToken,e.uid).then(()=>{console.log("Session Saved from Web App and token generated!"),s({success:!0})}).catch(r=»>{console.error("Error saving Firebase session:",r.message),s({success:!1,error:r.message}«)}),!0});`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (22 raw steps → 1 distinct lines):
   1. L1 _(in `assets/index.html`)_ `…r,o);s&&Object.defin»eProperty(e,o,s.get?s:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{v …⟨tainted span: 2145 chars⟩… react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode«"),o=Symbol.for("rea…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ELEMENT:object.setProperty

---
