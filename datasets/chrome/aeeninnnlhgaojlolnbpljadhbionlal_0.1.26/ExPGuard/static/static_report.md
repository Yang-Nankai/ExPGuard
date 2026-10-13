# ExPAgent Static Verification — aeeninnnlhgaojlolnbpljadhbionlal v0.1.26

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.838, scope=0.917
- Flow types: {'STORAGE_POSOING': 3}  |  Severities: {'HIGH': 3}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L1:C225090 -> L1:C225091
- **Sink**: `CHROME_SESSION_STORAGE` in `scripts/background` [BG_1] @ L1:C226001 -> L1:C226128
- **Severity evidence**: ['*://*.app.bluedothq.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `chrome.storage.session.set`

### Decision ledger

**(a) Source control — ATTACKER-CONTROLLED**  
The source anchor is the external-message listener:

```js
chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>{switch(e.type){...}})
```

`e` is the raw message object supplied by any page allowed by `externally_connectable`. The manifest restricts the allowed origins to:

```json
"externally_connectable": { "matches": ["*://*.app.bluedothq.com/*"] }
```

That is a web-origin restriction, not a browser-authenticated sender boundary. There is no `sender.id` equality check or fixed extension-ID allowlist in the evidence. The `e.userId` field is therefore attacker-chosen whenever the message is sent from an allowed origin (e.g. via XSS on `app.bluedothq.com` or a subdomain-takeover surface).

**(b) Source-to-sink path — CONNECTED**  
The reported path is real and direct within `scripts/background.js`:

- External message arrives.
- `switch(e.type)` reaches `case ha.T.UploadStoredRecordings`.
- The guarded branch evaluates:
  ```js
  !s && e.userId && o===pa.Idle && (... r = await (async e => {
      const t = await 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L1:C225090 -> L1:C225091
- **Sink**: `CHROME_SESSION_STORAGE` in `scripts/background` [BG_1] @ L1:C195639 -> L1:C195692
- **Severity evidence**: ['*://*.app.bluedothq.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>{switch(e.type){...}})`. The `e` object is the message body sent by an external web page. `onMessageExternal` delivers messages from any origin matched by `externally_connectable.matches`, which here is `*://*.app.bluedothq.com/*`. The message fields (`type`, `userId`, `dbName`, …) are fully chosen by the sending page. There is no `sender.id` allowlist and no `sender.url`/`origin` check anywhere before the switch — I read the listener's opening and it dispatches directly on `e.type`. So the source is genuinely webpage-controlled, subject only to the externally-connectable origin restriction (Bluedot app subdomains).

**(b) Exact source→sink path**
`switch(e.type)` → `case ha.T.UploadDB:` → `r = await sc(e.userId, {dbName: e.dbName}, true)` → inside `sc`, first branch stores:
```js
chrome.storage.session.set({ localUploadPendingArr: [{dbName: e.dbName}] })
```
The primary sink (`C195639`) writes `localUploadPendingArr` whose element `t = {dbName: e.dbName}` comes straight from the message. The alternate sink (`C195830`) writes `userId: e` (message `userI

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `scripts/background` [BG_1] @ L1:C225090 -> L1:C225091
- **Sink**: `CHROME_SESSION_STORAGE` in `scripts/background` [BG_1] @ L1:C195830 -> L1:C195957
- **Severity evidence**: ['*://*.app.bluedothq.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verdict reasoning

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener(async(e,t,n)=>{switch(e.type){...}})` in the MV3 background service worker (`scripts/background.js`). The tainted span is the incoming message object `e`. `onMessageExternal` is driven by any page (or extension) that satisfies `externally_connectable`.

Manifest `externally_connectable.matches` is `*://*.app.bluedothq.com/*`. There is **no** `sender.id` allowlist, `sender.origin`/`sender.url` check, or any other sender validation in the handler — the handler switches only on the attacker-chosen `e.type` field. Per the harness/audit rules, `*.app.bluedothq.com/*` restricts scope but does not eliminate attacker control: XSS on that origin (or the wildcard subdomain surface) can drive the listener. So the source is genuinely web/attacker-controllable.

### (b) Exact source-to-sink path
The raw source confirms a concrete, connected path:

`onMessageExternal(e)` → `switch(e.type)` → `case ha.T.UploadDB:` → `sc(e.userId, {dbName: e.dbName}, !0)` → inside `sc`, `chrome.storage.session.set({localUploadState:{recordings:n, userId:e, status:..., updateDate:..., queue:o}})` (sink 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
