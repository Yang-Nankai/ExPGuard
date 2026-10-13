# ExPAgent Static Verification — cklckpipkomgbhiigjgpcnajjmbboihf v1.5.0

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.29, scope=0.233
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'CRITICAL': 2, 'HIGH': 2}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L1:C342007 -> L1:C342023
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L1:C289456 -> L1:C289495
- **Bridge**: storage `STORAGE_FLOW[area: local, key: authToken, sender: content, receiver: content]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I verified the flow against the injected source-level report and the raw `content.js` ranges.

## Decision ledger

**(a) Who controls the source?**
Any webpage can control it. The content script is registered with `matches: ["<all_urls>"]` in ISOLATED world and installs:

```js
window.addEventListener("message", t => {
  if (t.source === window && "from-fusionchat" === t?.data?.message) {
    let e = t.data.payload;
    ...
    "login" === e.message && (
      console.log(...),
      chrome.storage.local.set({ authToken: e.token })
    )
    ...
  }
})
```

A page can satisfy `t.source === window`, `data.message === "from-fusionchat"`, and `payload.message === "login"` by calling its own `window.postMessage`. These are attacker-chosen fields, not a browser-authenticated trust boundary. No `sender.id` allowlist exists for this path.

**(b) Source-to-sink path**
`window.postMessage` → `t.data.payload.token` (`e.token`) → `chrome.storage.local.set({ authToken: e.token })` (direct storage poisoning at ~C342160). The report's chosen sink is the later re-write:

- `initUser()` reads `chrome.storage.local.get(["authToken"])`
- if present, calls `initUserFromToken(t.authToken)`
- `initUser

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C33361 -> L1:C33362
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L1:C289456 -> L1:C289495
- **Bridge**: storage `STORAGE_FLOW[area: local, key: authToken, sender: background, receiver: content]`
- **Severity evidence**: ['https://*.fusionchat.ai/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C33361 -> L1:C33362
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C33397 -> L1:C33442
- **Severity evidence**: ['https://*.fusionchat.ai/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — ExPGuard source report

**Flow id #4** — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE` (`authToken`).

### Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((function(e){...}))`. The manifest exposes this listener to web origins:

```json
"externally_connectable": {
  "matches": [
    "https://fusionchat.ai/*",
    "https://*.fusionchat.ai/*"
  ]
}
```

So any page loaded on `https://fusionchat.ai/*` or any subdomain matching `https://*.fusionchat.ai/*` can send `chrome.runtime.sendMessage(<extension-id>, {...})`. The message object `e` is fully controlled by that page.

I inspected the actual background code:

```js
chrome.runtime.onMessageExternal.addListener((function(e) {
  "sign-out"===e.message&&j(),
  "login"===e.message&&chrome.storage.local.set({authToken:e.token})
}))
```

There is **no** `sender.id` check, **no** `sender.origin` check, and **no** allow-list inside this listener. The harness labels this as `PA_PARTIAL_TRUSTED_IPC` with a fixed sender-ID allowlist, but the code evidence itself shows `senderIdCheck: false`, and my raw-source read confirms the listener takes only

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
