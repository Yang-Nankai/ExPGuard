# Source-level Taint Flow — pfldidmekndhkehcoikjgaiajcfnmfga 1.4.0

- Source type: CRX
- Files with issues: 2 / 3
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 3 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — CHROME_ONMESSAGEEXTERNAL_MESSAGE (chrome.runtime.onMessageExternal.addListener[message])

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` — `background` L1:C312 -> L1:C313  `….sendMessage(o[0].id,{action:"getDocument"},s=>{r(s)})}),!0});chrome.runtime.onMessageExternal.addListener((e,t,r)=>{if(»e«.action==="setUserId")return console.log("Received userId from content script:",e.userId),chrome.storage.local.get("user…`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (userId) — `background` L1:C534 -> L1:C647  `…age.local.get("userId",o=>{o.userId===e.userId?(console.log("User ID is the same, no changes needed."),r({success:!0})):»chrome.storage.local.set({userId:e.userId},()=>{console.log("User ID saved to chrome.storage!"),r({success:!0})})«}),!0;if(e.action==="removeUserId")return console.log("Removing userId from chrome.storage"),chrome.storage.local.remove…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (29 raw steps → 1 distinct lines):
   1. L1 `…stener((e,t,r)=>{if(»e.action==="setUserId")return console.log("Received userId from content script:",e.userId),chrome.storage.local.get("use …⟨tainted span: 352 chars⟩… rage.local.set({userId:e.userId},()=>{console.log("User ID saved to chrome.storage!"),r({success:!0})})}),!0;if(e.action«==="removeUserId")re…`  · ASSIGN:identifier, ELEMENT:member-element, ASSIGN:binary-left, ASSIGN:binary-right, ELEMENT:object.setProperty

---
