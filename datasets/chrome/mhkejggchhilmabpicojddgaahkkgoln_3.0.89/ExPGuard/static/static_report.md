# ExPAgent Static Verification — mhkejggchhilmabpicojddgaahkkgoln v3.0.89

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.345, scope=0.321
- Flow types: {'PRIVILEGE_ESCALATION': 3, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L2:C241837 -> L2:C241838
- **Sink**: `CHROME_MANAGEMENT_SETENABLED_FLAG` in `js/background` [BG_1] @ L2:C238027 -> L2:C238121
- **Severity evidence**: ['https://franceverif.fr/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — PRIVILEGE_ESCALATION via `chrome.runtime.onMessageExternal` → `chrome.management.setEnabled`

### 1. Source: attacker-controllable external message
The source anchor is the `onMessageExternal` handler `An` in `js/background.js`:

```js
const An = function onMessageExternal(t,n,r){
  ...
  {event:o=null,...i}=t||{};
  if(!o) return void sendCustomResponse({error:'"event" is required'});
  const s=xn[o];
  if(s) return s({sendResponse:sendCustomResponse,sender:n,data:i}),!0;
  sendCustomResponse({error:"Unknown event"})
};
```

I inspected the full handler and its registration:

```js
callBrowser().runtime.onMessageExternal.addListener(An)
```

There is **no `sender.id` check** and no `sender.origin`/`sender.url` validation in `An`. The only filtering is the `event` action-name lookup `xn[o]`. Therefore the harness’s `authenticatedExtensionAllowlist` / `AUTHENTICATED_EXTENSION_IPC` classification is not supported by the actual source path (`senderIdCheck` is itself reported `false`). The message body is controlled by any page allowed by `externally_connectable`.

Manifest:

```json
"externally_connectable": { "matches": ["https://franceverif.fr/*"] }
```

So an

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L2:C241837 -> L2:C241838
- **Sink**: `CHROME_CONTENTSETTINGS_SET` in `js/background` [BG_1] @ L2:C237744 -> L2:C237896
- **Severity evidence**: ['https://franceverif.fr/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the primary evidence and the actual minified source around the source/sink anchors. The chain is real.

## Decision ledger

**(a) Who controls the source**
`chrome.runtime.onMessageExternal` handler `An` (js/background.js L2 C241837) receives an external message object `t`. The manifest restricts web-page senders to `https://franceverif.fr/*`. There is **no `sender.id` allowlist and no `sender.url`/`sender.origin` check** in the dispatch path — I read `An` in full:

```js
const An = function onMessageExternal(t,n,r){
  const sendCustomResponse = async t => {...},
  {event:o=null, ...i} = t||{};
  if(!o) return void sendCustomResponse({error:'"event" is required'});
  const s = xn[o];
  if(s) return s({sendResponse:sendCustomResponse, sender:n, data:i}), !0;
  sendCustomResponse({error:"Unknown event"})
};
```

It is registered directly: `callBrowser().runtime.onMessageExternal.addListener(An)`. So the harness’s `PA_PARTIAL_TRUSTED_IPC` classification is **not supported by the code** — the `fixedExtensionIds`/`allowlistCue` is an inference from a hardcoded ID elsewhere, not an actual guard here.

**(b) Source-to-sink path**
Message `t` → destructured `i` (rest/spread of 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🟠 PARTIAL / PA  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L2:C241837 -> L2:C241838
- **Sink**: `FETCH_BODY` in `js/background` [BG_1] @ L2:C164361 -> L2:C164452
- **Severity evidence**: ['https://franceverif.fr/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Reclassified from FALSE_POSITIVE to PARTIAL / PA because the source is guarded by a fixed browser-authenticated extension-ID allowlist. Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — REQUEST_FORGERY (`onMessageExternal` → `fetch`)

### (a) Source control — who controls the message
The source is real: `An = function onMessageExternal(t, n, r)` in `js/background.js` and it is registered unconditionally:

```
"CHROME"===e.BROWSER && (
  callBrowser().runtime.onMessageExternal.addListener(An),
  ...
)
```

I inspected the registration and `An` itself. **There is no `sender.id` / `sender.url` / `sender.origin` check** before dispatch:

```
const An = function onMessageExternal(t, n, r){
  const sendCustomResponse = async t => {...};
  const {event:o=null, ...i}=t||{};
  if(!o) return void sendCustomResponse({error:'"event" is required'});
  const s = xn[o];
  if(s) return s({sendResponse:sendCustomResponse, sender:n, data:i}), true;
  ...
}
```

The harness’s “fixed sender ID allowlist” (`mhkejggchhilmabpicojddgaahkkgoln`) is **not** applied to this path (`senderIdCheck: false`); the ID is just a bundle constant elsewhere. Actual attack surface is the manifest `externally_connectable.matches: ["https://franceverif.fr/*"]`, so a page on that origin (or XSS on it) can reach the listener. That makes the *source* web-reachable, but with the 

**Attacker control:** See preserved static analyst transcript.

**PA category:** `PA_PARTIAL_TRUSTED_IPC`

**Why partially available:** The privileged path is reachable only from a fixed, browser-authenticated extension sender ID. It is not reachable by an ordinary webpage, but remains partially available to the trusted companion/peer extension (or if that peer is compromised).

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)
- Notes: PA_PARTIAL_TRUSTED_IPC: do not attempt as an ordinary webpage; requires the browser-authenticated companion extension.

---
