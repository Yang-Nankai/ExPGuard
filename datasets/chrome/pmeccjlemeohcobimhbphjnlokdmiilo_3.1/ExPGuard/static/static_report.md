# ExPAgent Static Verification — pmeccjlemeohcobimhbphjnlokdmiilo v3.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.941, scope=0.916
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L183:C8 -> L183:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L242:C14 -> L257:C16
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener` (background.js L178) is the entry point. It receives messages only from origins permitted by `externally_connectable.matches: ["https://appbox.space/*"]`. This restricts the attacker surface to pages under `appbox.space` (or code running in the context of such a page, e.g. via XSS on that origin). Within that surface, every field used by the flow — `message.source`, `message.action`, `message.data.key`, `message.data.value` — is attacker-chosen.

**(b) Exact source-to-sink path**
1. L178 `chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => ...)`
2. L179–182 guard `sender.url.includes('appbox.space')` (substring; manifest already restricts the origin).
3. L183 `if (message.source === 'supabase-auth-adapter')` — attacker-satisfiable string field.
4. L184 `switch (message.action)` → `case 'setItem'` (L226).
5. L228 `const { key, value } = message.data;`
6. L242 `chrome.storage.local.set({ [key]: value }, ...)` — the tainted key and value are written directly.

The propagation report confirms this exact chain (steps 1→6→11→15), and the raw source I read ma

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
