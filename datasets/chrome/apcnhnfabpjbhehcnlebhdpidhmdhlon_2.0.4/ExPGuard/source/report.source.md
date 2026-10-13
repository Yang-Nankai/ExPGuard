# Source-level Taint Flow — apcnhnfabpjbhehcnlebhdpidhmdhlon 2.0.4

- Source type: CRX
- Files with issues: 3 / 3
- Distinct taint flows: 2  (collapsed from 2 raw issue entries)
- Sinkless sources skipped: 6 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — TARGET_CUSTOM_EVENT (target.addEventListener(emailActivation))

- **Source**: `TARGET_CUSTOM_EVENT` — `background` L1:C110096 -> L1:C117906  `…error(t)}}))}))})(),»chrome.runtime.onMessage.addListener((async(t,e,r)=>await(async(t,e,r)=>{try{let e=await di();if(void 0!==e){const i=e.p …⟨tainted span: 7810 chars⟩… }break;default:r({success:!1,message:"No message type provided"})}}}catch(t){console.error("errorHandler",t)}})(t,0,r)))«})();`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `background` L1:C115897 -> L1:C115905  `…rg/api/updateuser?old_user_id=${t.oldUserId}&new_user_id=${e.user_id}&uc=${e.uc.toString()}&source=${e.source}`,i=await »fetch(r)«,o=await i.json();o.success||(await Di("ab_emailActivationError",e.source,e.user_id,e.uc.toString(),e.hasPaid.toString()…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (13 raw steps → 1 distinct lines):
   1. L1 `…error(t)}}))}))})(),»chrome.runtime.onMessage.addListener((async(t,e,r)=>await(async(t,e,r)=>{try{let e=await di();if(void 0!==e){const i=e.p …⟨tainted span: 7810 chars⟩… }break;default:r({success:!1,message:"No message type provided"})}}}catch(t){console.error("errorHandler",t)}})(t,0,r)))«})();`  · MESSAGE, ASSIGN:template-literal, ASSIGN:identifier, ASSIGN:unary, ASSIGN:binary-right, ASSIGN:logical-left, ASSIGN:logical-right
      ⇄ cross-context hop: `runtime.single.sender.message[contentScript->background]`

---

## Flow #2 — ELEMENT_VALUE (#key-input)

- **Source**: `ELEMENT_VALUE` — `popup` L1:C92443 -> L1:C92477  `….style.opacity="0.5",e.settings.key.btn.style.backgroundColor="#efefef",e.settings.key.btn.style.pointerEvents="none")}(»e.settings.key.input.value.replace«(/[^0-9a-z]/gi,""),e)})),e.settings.key.input.addEventListener("keypress",(t=>{if("Enter"===t.key){if(this.value.replace…`
- **Sink(s)**:
  - `FETCH_RESOURCE` ([Unknown URL]) — `popup` L1:C83095 -> L1:C83103  `…{const e=await Ns(),n="https://api.adgone.org/api/Validate?key="+t+"&uc="+e.uc.toString()+"&user_id="+e.user_id,s=await »fetch(n)«,r=await s.text();return console.log("lib - activate - data",r),"true"===r?(e.key=t,e.hasPaid=!0,e.paddle&&(e.paddle.sta…`  (url-control=FULL)
- **Sanitized**: NO
- **Frame**: `POPUP_1`

- **Propagation** (138 raw steps → 1 distinct lines):
   1. L1 `…d 0!==await Ns()){t=»t.replace(/[^0-9a-z]/gi,"");const n=await async function(t){try{const e=await Ns(),n="https://api.adgone.org/api/Validat …⟨tainted span: 9583 chars⟩… oundColor="#efefef",e.settings.key.btn.style.pointerEvents="none")}(e.settings.key.input.value.replace(/[^0-9a-z]/gi,"")«,e)})),e.settings.ke…`  · ELEMENT:member-element, RETURN:fallback-return, ASSIGN:identifier, ELEMENT:member.length, ASSIGN:binary-right, ASSIGN:binary-left

---
