# ExPAgent Static Verification — nkllpejimjknkljcbcmejbpnbcgpoecf v1.0.2

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.863, scope=1
- Flow types: {'REQUEST_FORGERY': 2, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #3 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/background.js-CPhEULRj` [BG_1] @ L1:C15514 -> L1:C15515
- **Sink**: `CHROME_CONTENTSETTINGS_SET` in `assets/background.js-CPhEULRj` [BG_1] @ L1:C14366 -> L1:C14441
- **Severity evidence**: ['http://bobobili.cn/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 — SyncFun `contentSettings.popups.set` via external message

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal.addListener(ne)` in the background service worker (`assets/background.js-CPhEULRj.js`). Confirmed in source:

```js
a.runtime.onMessage.addListener(ne);
a.runtime.onMessageExternal && a.runtime.onMessageExternal.addListener(ne);
```

The manifest `externally_connectable.matches` is limited to `http://localhost:3000/*`, `http://bobobili.cn/*`, `https://bobobili.cn/*`. This is a browser-enforced origin restriction, not an unforgeable `sender.id` trust boundary (`authenticatedExtensionAllowlist` is `null`). Per the harness rules, restricted externally-connectable hosts reduce scope but remain exploitable via XSS/control of the companion origin, so the message body is attacker-influenceable runtime input, not trusted.

### (b) Exact source-to-sink path
The propagation and source both confirm this chain (all in `background.js`):

1. `ne(e, t, s)` receives the external message `e`; `pe(e)` is only `typeof e == "object" && typeof e.type == "string"`.
2. `case "syncfun-permissions-request": { await Oe(e.payload); break }`.
3

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/background.js-CPhEULRj` [BG_1] @ L1:C15514 -> L1:C15515
- **Sink**: `FETCH_RESOURCE` in `assets/background.js-CPhEULRj` [BG_1] @ L1:C15171 -> L1:C15181
- **Severity evidence**: ['http://bobobili.cn/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🟡 UNCERTAIN  (REQUEST_FORGERY / MEDIUM, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `assets/background.js-CPhEULRj` [BG_1] @ L1:C15514 -> L1:C15515
- **Sink**: `FETCH_HEADERS` in `assets/background.js-CPhEULRj` [BG_1] @ L1:C15171 -> L1:C15181
- **Severity evidence**: ['http://bobobili.cn/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
