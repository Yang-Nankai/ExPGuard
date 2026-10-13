# ExPAgent Static Verification — pfldidmekndhkehcoikjgaiajcfnmfga v1.4.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.001, scope=0.003
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C312 -> L1:C313
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C534 -> L1:C647
- **Severity evidence**: ['https://*.staging.recime.app/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have everything needed to verify the flow. The full `background.js` is one line and confirms the exact source-to-sink chain with no guards.

## Verification Ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((e,t,r)=>{ if(e.action==="setUserId") ... chrome.storage.local.set({userId:e.userId}) ...})`.

`e` is the message payload from an external sender. The `setUserId` action is a fixed string the attacker can trivially satisfy, and `e.userId` is fully attacker-chosen. There is **no** `sender.id` check, no `sender.origin`/`sender.url` check, and no allowlist — the `t` (sender) parameter is never even referenced.

**(b) Exact source-to-sink data path**
`e.userId` (external message field) → `chrome.storage.local.get("userId", o => ...)` → if the stored value differs → `chrome.storage.local.set({userId: e.userId}, ...)`. The comparison `o.userId===e.userId` only gates *whether* the write runs; it does not sanitize or replace the attacker-controlled value. This is a direct data flow, not a boolean gate over a constant write.

**(c) Security-relevant argument**
`chrome.storage.local.set({userId: e.userId})` — the stored **value** itself is attacker-c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
