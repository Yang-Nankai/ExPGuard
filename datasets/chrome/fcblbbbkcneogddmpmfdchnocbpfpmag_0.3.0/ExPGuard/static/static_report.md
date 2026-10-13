# ExPAgent Static Verification — fcblbbbkcneogddmpmfdchnocbpfpmag v0.3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'STORAGE_POSOING': 2, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 3}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `worker` [BG_1] @ L144:C8 -> L144:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `worker` [BG_1] @ L176:C6 -> L179:C8
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `attacker-input-storage-write` (STORAGE_POSOING)

### (a) Who controls the source
`worker.js:142` registers `chrome.runtime.onConnectExternal.addListener(eport => ...)`, and `worker.js:143` registers `eport.onMessage.addListener(request => ...)`. The `request` object is entirely supplied by the connecting party.

The manifest has `externally_connectable: null` (absent). Per Chrome's documented behavior, when `externally_connectable` is not declared, **all other extensions/apps can connect by default** (web pages cannot). A malicious extension installed in the same profile is attacker-controlled, so `request` is genuine attacker input. I searched the whole `worker.js` for `sender.id` / `sender.origin` / `sender.url` and found **no sender guard at all** — there is no browser-authenticated trust boundary here.

### (b) Exact source-to-sink path
Unbroken and confirmed in real source:

```
142 chrome.runtime.onConnectExternal.addListener(eport => {
143   eport.onMessage.addListener(request => {
144     if (request.cmd === 'keep-awake') { ... }        // dead for this branch
175     else if (request.cmd === 'set-level') {
176       chrome.storage.local.set({
17

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
