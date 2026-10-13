# ExPAgent Static Verification — efgcpheifanopniaglaoeeecglncljkf v1.2.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.943, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `js/content` [CS_1] @ L1213:C12 -> L1216:C15
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `bg` [BG_1] @ L2312:C22 -> L2335:C18
- **Bridge**: message `runtime.single.sender.message[js/content->bg]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

### (a) Who controls the source
`document.title` is fully page-controlled. The content script runs at `document_start` on `<all_urls>` (`allFrames: true`, ISOLATED world), so any visited page can set `document.title` before/after the content script reads it.

### (b) Source-to-sink path
The report’s source anchor points to `js/content.js:1213-1216`, which returns `document.title` in a `CMD_BtoCR_REQUEST_INFO` reply. The actual sink-consuming occurrence is a second `document.title` read in the same content script:

- `js/content.js:2211`: `const filename = document.title + "." + suffix;`
- `js/content.js:2212-2217`: `sendMessageToSW({ cmd: CMD_CtoB_DIRECT_DOWNLOAD, params: { url, filename } })`
- `js/content.js:1081-1084`: `sendMessage` sets `msg.type = MESSAGE_TYPE_TO_SERVICEWORKER` and calls `runtime.sendMessage`
- `bg.js:2067`: `runtime.onMessage` listener receives the message
- `bg.js:2071`: checks `message.type === MESSAGE_TYPE_TO_SERVICEWORKER`
- `bg.js:2303-2304`: `CMD_CtoB_DIRECT_DOWNLOAD` destructures `filename` from `params`
- `bg.js:2306-2311`: derives `safeFileName` / `attachmentValue`
- `bg.js:2312-2335`: passes `value: attachmentValue` into `decla

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
