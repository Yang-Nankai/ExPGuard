# ExPAgent Static Verification — dmllejimliaillabfcoeoombkeabmada v3.8.12

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 6  |  Verified: 2
- Coverage: node=0.63, scope=0.567
- Flow types: {'STORAGE_POSOING': 4, 'REQUEST_FORGERY': 2}  |  Severities: {'CRITICAL': 6}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / CRITICAL, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L10940:C10 -> L10940:C24
- **Sink**: `CHROME_SESSION_STORAGE` in `background` [BG_1] @ L91:C16 -> L91:C35
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification of Flow #2 (STORAGE_POSOING — attacker input → chrome.storage.session.set)

### 1. Source is genuinely attacker-controllable
Confirmed in `content.js`:

```js
10937  function listenForMessagesFromWebApp() {
10938    window.addEventListener("message", async function(event) {
10939      chrome.runtime.sendMessage({
10940        ...event?.data
10941      });
```

- Called unconditionally at `content.js:10889` (`listenForMessagesFromWebApp();`).
- The content script runs at `document_start`, in `allFrames`, with `matches: ["https://*/*"]` (ISOLATED world).
- A malicious page can post an arbitrary object to its own window; the isolated-world listener receives it (shared DOM event) and forwards **all of `event.data`** to the background via `runtime.sendMessage`. No `event.source`/`event.origin` check, no field filtering. The harness warning about the anchor not containing the literal `message` token is resolved: the surrounding `window.addEventListener("message", …)` is present.

### 2. Bridge connects concretely
The forwarded object reaches `background.js:604`:

```js
604  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
605    switch (reque

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L10940:C10 -> L10940:C24
- **Sink**: `FETCH_BODY` in `background` [BG_1] @ L372:C4 -> L378:C6
- **Bridge**: message `runtime.single.sender.message[content->background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 — REQUEST_FORGERY (attacker-input → network send)

### Decision ledger

**(a) Who controls the source — ATTACKER PAGE.**
`content.js` runs on `https://*/*` (main frame), and `listenForMessagesFromWebApp()` is invoked at `content.js:10889`. The listener is:

```js
window.addEventListener("message", async function(event) {
  chrome.runtime.sendMessage({
    ...event?.data
  });
  ...
});
```

There is **no** `event.origin`, `event.source`, `event.data.type`, or any other validation before forwarding. Any HTTPS page can `window.postMessage` arbitrary fields, and the entire object is spread into `chrome.runtime.sendMessage`. (The only precondition is that the user accepted "data control" at `content.js:10883-10886`; that is a consent gate, not an attacker trust boundary.)

**(b) Source→sink path — UNBROKEN.**
- Page `postMessage` → `content.js:10938-10941` (spread `event.data` → `chrome.runtime.sendMessage`)
- `background.js:604` `chrome.runtime.onMessage.addListener`
- `background.js:605` `switch(request.type)` — `type` is attacker-chosen
- `background.js:635-643` `case messageTypes.mixpanel` (`"mixpanel"`): `trackEvent({ data: { event: request.eventName, pr

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
