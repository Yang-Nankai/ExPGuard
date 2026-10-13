# ExPAgent Static Verification — nhcdofaefcpfaoefffopanopapnekhca v1.0.8

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.057, scope=0.102
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `bg` [BG_1] @ L87:C8 -> L87:C15
- **Sink**: `CHROME_SYNC_STORAGE` in `bg` [BG_1] @ L115:C12 -> L130:C14
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (STORAGE_POISONING: external message → chrome.storage.sync.set)

### Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener` in `bg.js` (L82). This listener is reachable by any page matching `externally_connectable.matches: ["https://appbox.space/*"]`. The message object is entirely attacker-controlled. The manifest restriction narrows the attacker to the `appbox.space` origin (or any page obtained via XSS/subdomain issues there), but it does **not** remove attacker control. Severity MEDIUM correctly reflects this restricted host.

**(b) Source-to-sink path (confirmed in raw source):**
```
L82  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
L83-86   if (sender.url && sender.url.includes('appbox.space')) {
L87        if (message.source === 'supabase-auth-adapter') {
L88          switch (message.action) {
L112          case 'setItem':
L114            const { key, value } = message.data;
L115            chrome.storage.sync.set({ [key]: value }, () => { ... });
```
This is an unbroken data path: `message.data.key` and `message.data.value` flow directly into `chrome.stora

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
