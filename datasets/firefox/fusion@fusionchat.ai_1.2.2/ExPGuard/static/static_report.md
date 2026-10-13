# ExPAgent Static Verification — fusion@fusionchat.ai v1.2.2

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.246, scope=0.177
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'CRITICAL': 4}

**Assessment:** Verified 3 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 2 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / CRITICAL, confidence 0.00)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content` [CS_1] @ L8:C1107956 -> L8:C1107972
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L8:C1078836 -> L8:C1078875
- **Bridge**: storage `STORAGE_FLOW[area: local, key: authToken, sender: content, receiver: content]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🟡 UNCERTAIN  (STORAGE_POSOING / CRITICAL, confidence 0.00)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C29350 -> L1:C29351
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L8:C1078836 -> L8:C1078875
- **Bridge**: storage `STORAGE_FLOW[area: local, key: authToken, sender: background, receiver: content]`
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Verification error: Connection error.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C29350 -> L1:C29351
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C29386 -> L1:C29431
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — STORAGE_POSOING (external message → `chrome.storage.local.set`)

### Decision ledger

**(a) Who controls the source?**
An *external* message sender. The listener is registered with no sender/origin guard:

```js
chrome.runtime.onMessageExternal.addListener((function(e){
  "sign-out" === e.message && j(),
  "login" === e.message && chrome.storage.local.set({authToken: e.token})
}))
```

`e` is the message payload (`e.message`, `e.token`) and is fully chosen by whoever sends the external message. In Chrome, with `externally_connectable` absent, other installed extensions can message this extension by ID — so a malicious or compromised extension controls the source. This is attacker-controllable `EXTERNAL_MESSAGE` provenance.

**(b) Source-to-sink path?**
Direct, unbroken, single-context data flow: `onMessageExternal` payload field `e.token` → object literal property `authToken: e.token` → `chrome.storage.local.set(...)`. No hop is needed; the tainted span is used verbatim in the sink argument.

**(c) Security-relevant argument controlled?**
Yes — the *stored value itself* (`authToken`) is attacker-supplied. This is not a boolean gate over a constant; the 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
