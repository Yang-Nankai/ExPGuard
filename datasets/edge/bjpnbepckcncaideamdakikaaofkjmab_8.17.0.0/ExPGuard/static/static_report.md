# ExPAgent Static Verification — bjpnbepckcncaideamdakikaaofkjmab v8.17.0.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 2
- Coverage: node=0.989, scope=1
- Flow types: {'STORAGE_POSOING': 5, 'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 6}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #5 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `gen/ext_bg_module` [BG_1] @ L123:C6 -> L123:C9
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/ext_common` [OPTIONS_1] @ L56:C2 -> L56:C35
- **Bridge**: storage `STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: js/ext_common]`
- **Severity evidence**: ['https://*.crankwheel.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to make the verdict. Let me summarize the four-part ledger.

## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(function (req, sender, callback) {...})` at `gen/ext_bg_module.js:122`. The `req` object is the attacker-controlled message payload. The manifest's `externally_connectable.matches` is `["https://*.crankwheel.com/*", "https://*.meeting.is/*"]`, so any page on any `*.crankwheel.com` or `*.meeting.is` subdomain (or any other extension) can send a crafted message. There is **no sender authentication**: I searched for `sender.id`, `sender.origin`, and `sender.url` and found none — `sender` is only used as `sender.tab.id` for tab operations (L157, L159, L371).

**(b) The exact source-to-sink path**
Confirmed unbroken:
- L122 `onMessageExternal.addListener(...)`
- L139 `} else if (req.cmd == 'setServerUrl') {`
- L142 `setServerUrl(req.url);`
- L24-25 `function setServerUrl(url) { objStorageSet({'serverUrl': url}); }`
- L58-59 `function objStorageSet(keyVals) { chrome.storage.local.set(keyVals); }`

The attacker controls both `req.cmd` and `req.url`. `req.url` flows verbatim into `chrome.stor

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🟡 UNCERTAIN  (REQUEST_FORGERY / HIGH, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `gen/ext_bg_module` [BG_1] @ L123:C6 -> L123:C9
- **Sink**: `FETCH_RESOURCE` in `gen/ext_bg_module` [BG_1] @ L483:C4 -> L486:C6
- **Bridge**: storage `STORAGE_FLOW[area: local, key: serverUrl, sender: gen/ext_bg_module, receiver: gen/ext_bg_module]`
- **Severity evidence**: ['https://*.crankwheel.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
