# ExPAgent Static Verification — jolbglpclnpdolcmbgdipkdimneiplof v1.0.3

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.297, scope=0.303
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/content` [CS_1] @ L13:C8 -> L13:C23
- **Sink**: `FETCH_BODY` in `js/background` [BG_1] @ L51:C26 -> L51:C51
- **Bridge**: message `runtime.single.sender.message[js/content->js/background]`
- **Severity evidence**: ['https://*.1688.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (WINDOW_MESSAGE_EVENT → FETCH_BODY)

### 1. Source control — confirmed attacker-controllable
`js/content.js`:

```
7  window.addEventListener('message', function (event) {
9      if (event.source !== window) { return; }
13     if (event.data.type && (event.data.type === 'FROM_PAGE')) {
15         buyer_nick = event.data.buyer_nick;
18         chrome.runtime.sendMessage(
19             { type: "BUYER_LOGINID1688", data: buyer_nick }, ...);
```

A page running on one of the `content_scripts.matches` hosts can `postMessage({type:'FROM_PAGE', buyer_nick: ...}, '*')` to itself. The `event.source === window` check and the `event.data.type` check are both attacker-satisfiable (the page posts to its own window and supplies the type string). So `buyer_nick` is genuinely page-controlled. ✅

### 2. Source-to-sink path — **broken at the message bridge**
The content script sends exactly one message action from this handler: `BUYER_LOGINID1688`.

In `js/background.js`, `handleMessage` dispatches on `request.type`:

```
98   case 'BUYER_LOGINID1688':
99       buyer_nick = encodeURIComponent(request.data);   // stores to a global
100      break;
```

This branch **does n

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
