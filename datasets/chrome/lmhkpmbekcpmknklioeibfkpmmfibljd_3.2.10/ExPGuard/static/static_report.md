# ExPAgent Static Verification — lmhkpmbekcpmknklioeibfkpmmfibljd v3.2.10

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.036, scope=0.036
- Flow types: {'CODE_INJECTION': 2, 'REQUEST_FORGERY': 1}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 3 flow(s): 1 true-positive, 2 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (CODE_INJECTION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `page.bundle` [CS_2] @ L6:C1219 -> L6:C1220
- **Sink**: `NEW_FUNCTION` in `page.bundle` [CS_2] @ L1:C8071 -> L1:C8096
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me set out the verified decision ledger.

## Decision ledger

**(a) Who controls the source?**
`page.bundle.js` (frame `CS_2`, manifest declares it as a content script with `"world": "MAIN"`). The taint enters at:
```
function Ce(e){if(!e||e.source!==window)return;let t=e.data;!t||t.source!=="@devtools-extension"||Object.keys(G).forEach(...)}
...
function Le(e,t){G[t]=e,window.addEventListener("message",Ce,!1)}
```
`event.source === window` and `t.source === "@devtools-extension"` are attacker-satisfiable fields (the harness confirms this: same-page origin checks and message `source`/`type` fields are not authentication). So a **same-window page script can forge the message**. Source provenance `CONTENT_SCRIPT` is correct. → item (a) *proven*.

**(b) The source-to-sink path.** The report claims a 479-step chain from `L6` (`e.data`) into `L1` (the `new Function` sinks) with only generic `ASSIGN/ELEMENT/RETURN` ops and a 4841-char "tainted span" on the source line. Inspecting the sink region:
```
C7700..: ...function qe(e,t=...){...}function se(e){...} var Ge=e=>new Function("return "+e)();
         function Ft(e,t){let r=e.map(Ge);...} function He(e,t){if

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (CODE_INJECTION / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `page.bundle` [CS_2] @ L6:C1219 -> L6:C1220
- **Sink**: `NEW_FUNCTION` in `page.bundle` [CS_2] @ L1:C7854 -> L1:C7879
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source?**
`page.bundle.js` L6 C1219 is the body of `Ce`, the `window` "message" listener:

```js
function Ce(e){ if(!e||e.source!==window) return; let t=e.data;
  !t||t.source!=="@devtools-extension"||Object.keys(G).forEach(r=>{
     if(t.id&&r!==t.id) return; let n=G[r];
     typeof n=="function" ? n(t) : n.forEach(o=>{o(t)}) }) }
```
Both checks are attacker-satisfiable in a page→page bridge: `e.source === window` is satisfied by the page posting to *its own* window (`window.postMessage` sets `source = window`), and `t.source === "@devtools-extension"` is a plain message *field* the page can forge (harness rule: "message action/type fields are not authentication"). With `id` omitted, the `t.id && r!==t.id` filter passes and **every** subscriber in `G` receives the raw message. So the source is genuinely untrusted-controllable (by a script already running in that page).

**(b) Source→sink path — verified in the real source (not just the report).**
The report's chain is real and I traced the missing link in the bundle:
- `function I(){ Le(A,i), … }` with `function Le(e,t){ G[t]=e; window.addEventListener("message",Ce,!1) }` ⇒ subscriber `G

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content.bundle` [CS_1] @ L3:C1809 -> L3:C1810
- **Sink**: `FETCH_BODY` in `background.bundle` [BG_1] @ L1:C16322 -> L1:C16427
- **Bridge**: message `runtime.connect.sender.message[content.bundle->background.bundle]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

**Harness check.** The harness resolved the reported source anchor to `content.bundle.js` and warned the minified text match was loose. I therefore anchored the decision on the actual code, which fully corroborates the report.

**(a) Who controls the source.** `content.bundle.js` (CS_1, matches `<all_urls>`) registers a window bridge:
```
L3: var c="@devtools-extension", I="@devtools-page", ...
    function b(e){ if(!x()||!e||e.source!==window||typeof e.data!="object")return;
                   let t=e.data; if(t.source===I){ ...; P(F,t) } }
    window.addEventListener("message",b,!1);
    function F(e){ h||w(); e.type==="INIT_INSTANCE" ? (...) : E({name:"RELAY",message:e}) }
    function E(e){ s.postMessage(e) }   // s = chrome.runtime.connect({name:"tab"})
```
Any page script can `window.postMessage({source:"@devtools-page",...},"*")`. `e.source===window` (same-page postMessage), `typeof e.data=="object"`, and `t.source===I` (the public constant `"@devtools-page"`) are all attacker-satisfiable; `x()` is the per-site injection switch and defaults to `inject:true`. No message-type allow-list exists in `P`/`F`. So the source is **attacker-controlled from any webpage

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
