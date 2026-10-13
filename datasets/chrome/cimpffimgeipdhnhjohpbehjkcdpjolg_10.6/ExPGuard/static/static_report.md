# ExPAgent Static Verification — cimpffimgeipdhnhjohpbehjkcdpjolg v10.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 2
- Coverage: node=0.972, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'STORAGE_POSOING': 6}  |  Severities: {'MEDIUM': 7}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_w2g.530d247b` [CS_1] @ L166:C27 -> L166:C50
- **Sink**: `CHROME_SESSION_STORAGE` in `sw.ef4d71da` [BG_1] @ L209:C16 -> L211:C18
- **Bridge**: message `runtime.single.sender.message[content_w2g.530d247b->sw.ef4d71da]`
- **Severity evidence**: ['https://w2g.tv/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification

### Decision ledger

**(a) Who controls the source — ATTACKER (web content on w2g.tv).**
Confirmed at `content_w2g.530d247b.js` L164-166:
```js
window.addEventListener("message", function(event) {
    if (event.origin === window.origin) {
        if (event.data && !event.data._skipForward) chrome.runtime.sendMessage(event.data);
```
The page itself runs on the content-script origin, so `event.origin === window.origin` is trivially satisfied by the page's own `window.postMessage`. `_skipForward` is a field of `event.data`, i.e. page-controlled; the page simply omits it. So `event.data` is fully attacker-controlled and is forwarded verbatim.

**(b) Source-to-sink path — UNBROKEN.**
`page postMessage → content_w2g window.message listener → chrome.runtime.sendMessage(event.data) → sw.ef4d71da chrome.runtime.onMessage (L190) → if (msg.openSite) → db[sender.tab.id] = {..., syncurl: msg.openSite.url} (L201-208) → chrome.storage.session.set({db: db}) (L209-211)`.
The HOP `runtime.single.sender.message[content->background]` is real: the content script is the sender and the background listener consumes `msg`.

**(c) Security-relevant argument — attacker-controlled value stor

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content_w2g.530d247b` [CS_1] @ L190:C0 -> L278:C2
- **Sink**: `CHROME_SESSION_STORAGE` in `sw.ef4d71da` [BG_1] @ L209:C16 -> L211:C18
- **Bridge**: message `runtime.single.sender.message[content_w2g.530d247b->sw.ef4d71da]`, storage `STORAGE_FLOW[area: session, key: db, sender: sw.ef4d71da, receiver: sw.ef4d71da]`
- **Severity evidence**: ['https://w2g.tv/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to render a verdict. Let me lay out the reasoning.

## Decision ledger

**(a) Who controls the source?**
The content script bridge at `content_w2g.530d247b.js:164-167`:

```js
window.addEventListener("message", function(event) {
    if (event.origin === window.origin) {
        if (event.data && !event.data._skipForward) chrome.runtime.sendMessage(event.data);
    }
});
```

Any page script executing in the same origin as the W2G page (i.e., on the `w2g.tv`/`stage.watch2gether.com`/etc. domains where the content script is injected) can call `window.postMessage({openSite:{url:...}}, "*")`. The `event.origin === window.origin` check is a same-page origin check, not an authentication boundary (per the harness: "same-page origin checks ... are not authentication"). The forwarded `event.data` becomes `msg` in the service worker. The attack surface is the extension's own host (`w2g.tv` family), so the realistic precondition is XSS/compromise on those domains — this matches the MEDIUM severity ("Host is restricted, but path is wildcarded").

**(b) Source → sink path (unbroken):**
- `content_w2g.530d247b.js:166` — `chrome.runtime.sendMessage(event.data)` forwards att

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
