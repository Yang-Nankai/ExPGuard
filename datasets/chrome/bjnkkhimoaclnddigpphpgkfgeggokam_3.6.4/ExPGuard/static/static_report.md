# ExPAgent Static Verification — bjnkkhimoaclnddigpphpgkfgeggokam v3.6.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.978, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'DOM_XSS': 1}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `scripts/app` [CS_1] @ L121:C16 -> L121:C27
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `scripts/background` [BG_1] @ L208:C32 -> L248:C38
- **Bridge**: message `runtime.single.sender.message[scripts/app->scripts/background]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source.**
The real source is the content script's page-facing listener in `scripts/app.js` (harness `sourceAnchor`, resolved to `scripts/app.js` L121):

```js
document.addEventListener('levelup', function (data) {      // L120
    if (data.detail && data.detail.type === 'Page') {        // L121
        chrome.runtime.sendMessage(data.detail);             // L122
    }
});
```

`contentScripts.matches = ["http://*/*","https://*/*"]`, so the content script runs on every page. Any page can fire `document.dispatchEvent(new CustomEvent('levelup', {detail:{...}}))`; DOM events (including page-dispatched `CustomEvent.detail`) cross the isolated-world boundary into the content script, and `data.detail.type === 'Page'` is an attacker-chosen field, not authentication (harness: *"A page can forge window.postMessage/CustomEvent fields … message action/type fields are not authentication"*). Confirmed: the `type==='Page'` check is trivially satisfied.

**(b) The exact source→sink path (with the HOP).**
`data.detail` is forwarded verbatim to the background (report step 1, `HOP: runtime.single.sender.message[scripts/app->scripts/background]`). In `scr

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (DOM_XSS / CRITICAL, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `scripts/app` [CS_1] @ L121:C16 -> L121:C27
- **Sink**: `DOM_INNER_HTML` in `scripts/options` [POPUP_1] @ L153:C60 -> L153:C69
- **Bridge**: message `runtime.single.sender.message[scripts/app->scripts/options]`
- **Severity evidence**: ['http://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #2 (DOM_XSS: page CustomEvent → extension-page innerHTML)

### Four-part decision ledger

**(a) Who controls the source — attacker/page-controlled.**
`scripts/app.js` (content script, matches `http://*/*` + `https://*/*`, ISOLATED world) registers:
```js
document.addEventListener('levelup', function (data) {
    if (data.detail && data.detail.type === 'Page') {
        chrome.runtime.sendMessage(data.detail);   // L120-124
    }
});
```
The source is a page-dispatchable `levelup` CustomEvent. The harness classifies reachability as `PAGE_TO_CONTENT_SCRIPT` and states page-forgeable CustomEvent fields are not authentication. The only check (`detail.type === 'Page'`) is an attacker-supplied field value, satisfiable by the page. So `data.detail` — and everything inside it — is attacker-controlled.

**(b) Source-to-sink path — unbroken, with a real message hop.**
1. `app.js` forwards the forged `detail` verbatim to `chrome.runtime.sendMessage`.
2. `scripts/background.js` L143-199 receives it (`message.type === 'Page'`), and for `category === 'Impersonation'` sets `impersonationResponse_1 = message.content` (attacker object). The only gate is `users.length === 0 ||

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
