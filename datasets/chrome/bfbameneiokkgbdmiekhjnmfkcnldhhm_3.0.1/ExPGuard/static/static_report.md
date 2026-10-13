# ExPAgent Static Verification — bfbameneiokkgbdmiekhjnmfkcnldhhm v3.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.987, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 1 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_URL` in `content/content` [CS_1] @ L1421:C6 -> L1421:C29
- **Sink**: `CHROME_HISTORY_ADD_URL` in `overlay/js/overlay` [POPUP_1] @ L2287:C2 -> L2287:C38
- **Bridge**: message `runtime.single.response.message[content/content->overlay/js/overlay]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `9`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision ledger

**(a) Who controls the source.** The taint originates in the content script `content/content.js`, which runs on `<all_urls>` (`world: ISOLATED`, `runAt` default). The operative value reaching the sink is the page's own DOM: `getLinks()` iterates `contentDocument.links` and pushes `documentAllLinks[j].href` into the response (`content/content.js:2127,2136,2152`), plus `document.documentURI` (`L2121/L2130`). A malicious page fully controls its anchors' `href` values; the `DOCUMENT_URL`/WEB_CONTENT provenance (CONTENT_SCRIPT) is therefore genuinely attacker-controllable, and the `<all_urls>` match means any site can drive it.

**(b) The exact source→sink path.** Confirmed in raw source:
- content script handler `else if(message.type == "get-links") sendResponse(WebDeveloper.Content.getLinks());` (`content/content.js:2418-2420`).
- Response crosses the CS→EX boundary via `runtime.single.response.message[content/content->overlay/js/overlay]`.
- `overlay/js/overlay.js:2513` `chrome.tabs.sendMessage(tab.id, { type: "get-links" }, function(data){ var documents = data.documents; …})`, then `2521 links = documents[i].links;` and `2529 addToHistory(links[j])`.
- `overlay/j

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---
