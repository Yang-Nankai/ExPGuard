# ExPAgent Static Verification — blkboeaihdlecgdjjgkcabbacndbjibc v4.4.27

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.308, scope=0.282
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 2 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `scripts/shell` [CS_1] @ L1:C1130 -> L1:C1144
- **Sink**: `CHROME_ACTION_BADGE_OPTIONS` in `scripts/shell` [CS_1] @ L1:C3823 -> L1:C3859
- **Bridge**: message `runtime.single.response.message[scripts/background->scripts/shell]`
- **Severity evidence**: ['https://www.dropbox.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

**Source (scripts/shell.js, L1:C1130; resolved anchor confirmed)**

```
…listenForCommands:function(n){ if(n.origin===dsCommon.docusignDomainOrigin && "object"==typeof n.data && "command"in n.data)
   switch(n.data.command){
     case"shell - open url in chrome": dsShell.openUrlInChrome(dsCommon.docusignDomain+n.data.url);break;
     …
     case"shell - set chrome badge text": dsCommon.setBadgeText(n.data.text);break;
```

The listener is registered in `scripts/shell.js`:
`$(document).ready(function(){window.addEventListener("message",dsShell.listenForCommands,!1), dsShell.navigateFrame("/chromeext/panel")});`
and `shell.js` is loaded both as the extension page script (`shell.html`) and as an injected content script (`dropbox.js` bundle). `docusignDomainOrigin` is a **fixed literal**: `docusignDomainOrigin:"https://googlechrome.docusign.net"` (scripts/common.js).

**Sink (scripts/common.js, L1:C3823)**

```
setBadgeText:function(e){ chrome.action.setBadgeBackgroundColor({color:"#e04f55"}); chrome.action.setBadgeText({text:e}) }
```

`chrome.action.setBadgeText` is extension/browser UI authority; the argument `e` is fed straight from the message field `n.da

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `scripts/shell` [CS_1] @ L1:C1130 -> L1:C1144
- **Sink**: `FETCH_BODY` in `scripts/background` [BG_1] @ L1:C2247 -> L1:C2401
- **Bridge**: message `runtime.single.sender.message[scripts/shell->scripts/background]`
- **Severity evidence**: ['https://www.dropbox.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence. Let me consolidate the ledger.

**Evidence gathered**

- **Source (content script, `scripts/shell.js`)**: `$(document).ready(function(){window.addEventListener("message",dsShell.listenForCommands,!1),…})` — a real `window` message listener registered in the CS frame. `listenForCommands(n){ if(n.origin===dsCommon.docusignDomainOrigin && "object"==typeof n.data && "command"in n.data) switch(n.data.command){ … case "landing - retrieve file from given url": … dsShell.retrieveFile(n.data, n.data.recipients) … } }`.
- **Gate**: `dsCommon.docusignDomainOrigin` is a **fixed literal** in `common.js` (`docusignDomainOrigin:"https://googlechrome.docusign.net"`) — an exact-equality origin check against a web origin (not self-origin, not substring, not a message field).
- **Bridge**: `retrieveFile:function(e,n){chrome.runtime.sendMessage({eventData:e,recipients:n,command:"retrieve file"}, …)}` → HOP `runtime.single.sender.message[scripts/shell->scripts/background]`. Confirmed: only `shell.js` sends/`retrieveFile`s the `"retrieve file"` command.
- **Sink (background SW)**: `chrome.runtime.onMessage.addListener(function(t,e,o){ if("object"==typeof t&&"command"in t) switch(

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `WINDOW_POSTMESSAGE`)

---
