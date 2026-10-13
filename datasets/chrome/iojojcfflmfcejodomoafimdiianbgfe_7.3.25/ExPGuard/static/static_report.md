# ExPAgent Static Verification — iojojcfflmfcejodomoafimdiianbgfe v7.3.25

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 3
- Coverage: node=0.428, scope=0.474
- Flow types: {'REQUEST_FORGERY': 1, 'PRIVILEGE_ESCALATION': 2, 'STORAGE_POSOING': 4}  |  Severities: {'MEDIUM': 7}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #3 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `lbg` [BG_1] @ L16:C97501 -> L16:C97502
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `lbg` [BG_1] @ L16:C62007 -> L16:C62376
- **Severity evidence**: ['*://leadleaper.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Key findings from the source:

**1. The sender guard is NOT a companion-extension allowlist.**
`ceID` is defined at the top of `lbg.js` as `chrome.runtime.id` — the extension's **own** ID:

```
var user,winProcF,jsFN="lbg.js",ceID=chrome.runtime.id,...
```

The guard in the listener is:

```js
if(r.id && r.id != ceID) throw ... "Attempted invalid onMessageExternal access"
```

This only rejects messages from *other extensions*. A web page sender has no `sender.id`, so `r.id` is falsy and the guard does not fire. There is no `sender.origin`/`sender.url` check anywhere (`search_code` for `r.origin|r.url|sender.*` returned no matches). The harness's `PA_PARTIAL_TRUSTED_IPC` / `FIXED_SENDER_ID_ALLOWLIST` classification is therefore **unsound** — the only real boundary is the browser-enforced `externally_connectable` match list (`*://leadleaper.com/*`, `*://aws.leadleaper.net/*`).

**2. The message object `n` genuinely reaches the privileged sink as `s.url`.**
The listener signature is `function(n,r,a)`, and the `reqPerm` branch calls:

```js
popInWin("request.reqPerm.result", n, a, e)   // and analogous granted/NOT.granted/catch branches
```

`popInWin

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `lbg` [BG_1] @ L16:C97501 -> L16:C97502
- **Sink**: `CHROME_LOCAL_STORAGE` in `lbg` [BG_1] @ L16:C61688 -> L16:C61744
- **Severity evidence**: ['*://leadleaper.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Analysis

### (a) Who controls the source?
The source is the first argument `n` of `chrome.runtime.onMessageExternal.addListener(function(n,r,a){...})`. It is the full message object sent by an external sender.

Critically, I inspected the actual guard at the listener head:

```js
ceID = chrome.runtime.id
...
if (r.id && r.id != ceID) throw new Error("Attempted invalid onMessageExternal access");
if (n.reqPerm) ...
```

The deterministic harness labeled this a `FIXED_SENDER_ID_ALLOWLIST` of a trusted peer extension. That is **incorrect**. `ceID` is `chrome.runtime.id` — the *extension's own* ID, not a trusted peer's ID. The guard therefore:

- rejects any *other extension* sender (`r.id` present but != self),
- **allows web-page senders**, because for a page sending via `externally_connectable`, `MessageSender.id` is `undefined`, so `r.id && ...` is falsy and the `throw` is skipped.

There is no `sender.url`/`sender.origin` check. The only effective boundary is the manifest `externally_connectable.matches` (`*://leadleaper.com/*`, `*://aws.leadleaper.net/*`), so a page on those origins (e.g., via XSS or site control) is the attacker surface.

### (b) Source-to-sink 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `lbg` [BG_1] @ L16:C97501 -> L16:C97502
- **Sink**: `FETCH_BODY` in `lbg` [BG_1] @ L16:C29815 -> L16:C30107
- **Severity evidence**: ['*://leadleaper.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

**Who controls the source?**  
The source is the message object `n` delivered to `chrome.runtime.onMessageExternal.addListener(function(n,r,a){...})` in the MV3 service worker `lbg.js`. The manifest sets:

```json
"externallyConnectable": {
  "matches": [
    "*://leadleaper.com/*",
    "*://aws.leadleaper.net/*"
  ]
}
```

So a page running on those origins can call `chrome.runtime.sendMessage(extensionId, payload)`. This is web-origin-controlled input, though the attack surface is limited to those two hosts (exploitable via XSS/compromise on either host, per ExPGuard’s model).

**Is the guard a real trust boundary?**  
The listener guard is:

```js
if(r.id && r.id != ceID) throw ...
```

`ceID` is initialized to `chrome.runtime.id`. This check only rejects messages where `sender.id` is present and differs from the extension’s own ID. A web page sender has **no `sender.id`**, so `r.id` is undefined and the condition is false — the message is accepted. Therefore this is **not** a browser-authenticated fixed-extension-ID allowlist boundary against web pages. The harness labels this `PA_PARTIAL_TRUSTED_IPC`, but the actual code does not enforce that for the 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
