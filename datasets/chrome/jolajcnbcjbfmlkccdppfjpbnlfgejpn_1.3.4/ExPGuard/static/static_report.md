# ExPAgent Static Verification — jolajcnbcjbfmlkccdppfjpbnlfgejpn v1.3.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.923, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L99:C8 -> L99:C15
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L79:C8 -> L86:C10
- **Severity evidence**: ['https://*.onlineapp.pro/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have all the evidence I need. The raw source confirms the report exactly.

## Decision Ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((message, sender, ...)` at L97 receives `message` from any externally-connectable page. `externally_connectable.matches` includes `https://*.appbox.space/*` (wildcard subdomain), and the only additional guard is `sender.url.includes('appbox.space')` (L98) — a substring check that is *not* a browser-authenticated `sender.id` allowlist. `message.source`, `message.action`, and `message.data.key/value` are all attacker-chosen fields. Genuine attacker control: YES.

**(b) Source-to-sink path:**
- L97-99: external message received; `message.source === 'supabase-auth-adapter'` is a message field the attacker sets.
- L100 `switch (message.action)` → `case 'setItem'`.
- L127 `const { key, value } = message.data;` — attacker key/value destructured.
- L128 `syncQueue[key] = value;` — attacker value flows into the module-level `syncQueue` (L74).
- L129 `chrome.storage.local.set({ [key]: value });` — **immediate** privileged storage write (also a sink in the report).
- L131 `syncTimeout = setTimeout(flushSyncQueue, 500);`

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
