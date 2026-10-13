# Source-level Taint Flow — kikmpcjfahemhdgnlncobpamgoopocpm 2.0.0

- Source type: CRX
- Files with issues: 4 / 8
- Distinct taint flows: 3  (collapsed from 3 raw issue entries)
- Sinkless sources skipped: 5 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `content` L1:C1136 -> L1:C1161  `…nction(){t(s.result)},s.onerror=function(){t(null)},s.readAsDataURL(e)}window.addEventListener("message",function(e){if(»e.source===window&&e.data«){if(e.data._tq_cancel)return o=!0,s&&(s.abort(),s=null),void _br.runtime.sendMessage({type:"ffmpeg-cancel"});if(e.data.…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C1538 -> L1:C1623  `…})}),e.data._tq_checkStatus){const t=e.data.reqId;return void _br.runtime.sendMessage({type:"check-status"},function(e){»window.postMessage({_tq_statusResponse:!0,reqId:t,status:e?e.status:{broken:!1}},"*")«})}if(e.data._tq_upload&&_br.storage.local.get("tq_telemetry",function(t){!1!==t.tq_telemetry&&_br.runtime.sendMessage({…`
  - `XML_HTTP_REQUEST_SEND` — `content` L1:C8188 -> L1:C8197  `…out=function(){s=null,window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Request timed out"},"*")},»p.send(d)«})}(e,d,a)}(a,new Blob(d,{type:i.mimeType||"video/mp4"}),i)}}}})}();`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C7115 -> L1:C7224  `…gress:!0,phase:"downloading",pct:t,loaded:e.loaded,total:e.total},"*")},n.onload=function(){n.status<200||n.status>=300?»window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Download failed ("+n.status+")"},"*")«:(window.postMessage({_tq_processProgress:!0,phase:"converting"},"*"),r(n.response,function(t){window.postMessage({_tq_p…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C7319 -> L1:C7424  `…led ("+n.status+")"},"*"):(window.postMessage({_tq_processProgress:!0,phase:"converting"},"*"),r(n.response,function(t){»window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!0,dataUrl:t,mimeType:n.response.type},"*")«}))},n.onerror=function(){window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Download network error…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C7450 -> L1:C7551  `…Message({_tq_processResult:!0,_tq_transfer_id:e,ok:!0,dataUrl:t,mimeType:n.response.type},"*")}))},n.onerror=function(){»window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Download network error"},"*")«},n.send()}catch(t){window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Bad JSON response"},"*")}},t…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C7793 -> L1:C7898  `…eadAsText(p.response)}else window.postMessage({_tq_processProgress:!0,phase:"converting"},"*"),r(p.response,function(t){»window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!0,dataUrl:t,mimeType:p.response.type},"*")«})},p.onerror=function(){s=null,window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Network error, C…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C7930 -> L1:C8058  `…e({_tq_processResult:!0,_tq_transfer_id:e,ok:!0,dataUrl:t,mimeType:p.response.type},"*")})},p.onerror=function(){s=null,»window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Network error, Check your connection OR try a VPN"},"*")«},p.ontimeout=function(){s=null,window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Request timed ou…`
  - `WINDOW_POSTMESSAGE` (*) — `content` L1:C8090 -> L1:C8186  `…,_tq_transfer_id:e,ok:!1,error:"Network error, Check your connection OR try a VPN"},"*")},p.ontimeout=function(){s=null,»window.postMessage({_tq_processResult:!0,_tq_transfer_id:e,ok:!1,error:"Request timed out"},"*")«},p.send(d)})}(e,d,a)}(a,new Blob(d,{type:i.mimeType||"video/mp4"}),i)}}}})}();`
- **Sanitized**: NO
- **Frame**: `CS_1`

- **Propagation** (140 raw steps → 1 distinct lines):
   1. L1 `…ppendChild(e);const »t={};let s=null;let o=!1;function n(e,t,s){const o=(e/1048576).toFixed(1),n=(t/1048576).toFixed(1),r=Math.min(s.width,s. …⟨tainted span: 7532 chars⟩… ransfer_id:e,ok:!1,error:"Request timed out"},"*")},p.send(d)})}(e,d,a)}(a,new Blob(d,{type:i.mimeType||"video/mp4"}),i)«}}}})}();`  · ASSIGN:logical-right, ELEMENT:member-element, ELEMENT:object.setProperty, ASSIGN:logical-left, ASSIGN:binary-right, ASSIGN:identifier, ELEMENT:implicit.add, ELEMENT:member-element-container, ELEMENT:member.length, ASSIGN:binary-left, COPY:object.assign-opaque, COPY:object.assign, MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[background->content]`

---

## Flow #2 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1:C2603 -> L1:C6314  `…q_offscreenReady=!1;»chrome.runtime.onMessage.addListener((e,t,r)=>{if(e){if(e._tq_frame_result||e._tq_frame_result_chunk||e._tq_frame_result …⟨tainted span: 3711 chars⟩… .sendMessage({_tq_frame_cmd:"cancel"})}catch(e){}}}else r(t.tab?.id??null)}else t.tab&&chrome.tabs.remove(t.tab.id)}}}})«,chrome.runtime.onIn…`
- **Sink(s)**:
  - `FETCH_BODY` (https://tikquick.online/api/extension/telemetry/api.php) — `background` L1:C2048 -> L1:C2443  `…tor.userAgent;await »fetch(TELEMETRY_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"upload",insta …⟨tainted span: 395 chars⟩… wser:parseBrowser(n),os:parseOS(n),caption:e.caption||null,visibility:e.visibility??null,post_type:e.post_type??null})})«}catch(e){}}function…`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (165 raw steps → 1 distinct lines):
   1. L1 `…navigator.userAgent;»await fetch(TELEMETRY_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event:"upload" …⟨tainted span: 4272 chars⟩… .sendMessage({_tq_frame_cmd:"cancel"})}catch(e){}}}else r(t.tab?.id??null)}else t.tab&&chrome.tabs.remove(t.tab.id)}}}})«,chrome.runtime.onIn…`  · MESSAGE, ASSIGN:logical-right, ELEMENT:destructure-property[uniqueId], ELEMENT:destructure-property[browserRegion], ELEMENT:destructure-property[serverRegion], ELEMENT:destructure-property[language], ASSIGN:identifier, ELEMENT:member-element, ASSIGN:logical-left, ELEMENT:object.setProperty, RETURN:json.stringify
      ⇄ cross-context hop: `runtime.single.sender.message[content->background]`

---

## Flow #3 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `ffmpeg/frame` L1:C1010 -> L1:C4370  `…let _tq_inChunks=[];»chrome.runtime.onMessage.addListener((e,n,t)=>{if(!e||!e._tq_frame_cmd)return;if("cancel"===e._tq_frame_cmd){if(console. …⟨tainted span: 3360 chars⟩… e_result_done:!0,originTabId:r}),console.log("[TQ/frame] step G: done! Sent",F,"chunks")}catch(e){o("compress",e)}})()})«,console.log("[TQ/fr…`
- **Sink(s)**:
  - `WINDOW_POSTMESSAGE` (*) — `inject` L1:C24290 -> L1:C24364  `…?.text||null,i=n?.privacy_setting_info?.visibility_type??null,s=e.post_common_info?.post_type??null;null===o&&null===i||»window.postMessage({_tq_upload:!0,caption:o,visibility:i,post_type:s},"*")«}catch(e){}window._tq_active&&w(e)}}catch(e){}return x.apply(this,arguments)}}();`
- **Sanitized**: NO
- **Frame**: `OFFSCREEN_1`

- **Propagation** (963 raw steps → 1 distinct lines):
   1. L1 _(in `inject`)_ `…n._timer=setTimeout(»function(){n.style.opacity="0"},1500)})})}else requestAnimationFrame(t)}function n(e){if(0===e)return"0 B";const t=Math. …⟨tainted span: 23354 chars⟩… mon_info?.post_type??null;null===o&&null===i||window.postMessage({_tq_upload:!0,caption:o,visibility:i,post_type:s},"*")«}catch(e){}window._t…`  · MESSAGE, ASSIGN:logical-left, ELEMENT:member-element, ASSIGN:logical-right, ASSIGN:identifier, ASSIGN:binary-right, ELEMENT:object.setProperty, ASSIGN:binary-left, RETURN:Math.floor, RETURN:Math.max, RETURN:Math.min
      ⇄ cross-context hop: `runtime.single.sender.message[content->ffmpeg/frame]; runtime.single.sender.message[background->ffmpeg/frame]`

---
