# ExPAgent Static Verification — denohmphfiepkgihlobkpmkbdhgmjigf v3.3.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1, scope=1
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/extension-worker` [BG_1] @ L221:C16 -> L221:C23
- **Sink**: `CHROME_SYNC_STORAGE` in `js/extension-worker` [BG_1] @ L259:C28 -> L278:C30
- **Severity evidence**: ['https://onlineapp.pro/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the flow against the actual source. Here is my analysis.

## Decision ledger

**(a) Who controls the source**
`chrome.runtime.onMessageExternal.addListener` (js/extension-worker.js L213) receives messages from externally connectable web origins. The manifest restricts this to `https://onlineapp.pro/*`, `https://onlineapp.stream/*`, and `https://onlineapp.live/*`. Per the harness trust rules, an origin restriction is *not* an unforgeable boundary — it limits the attack surface but is still exploitable via XSS on any of those three domains. `message.source`, `message.action`, and `message.data` are all attacker-chosen message fields.

**(b) Source → sink path**
- L213 `onMessageExternal.addListener` (source)
- L216–220 `sender.url.includes('onlineapp.pro'|'onlineapp.live'|'onlineapp.stream')` — substring guard on the page URL; with `externally_connectable` already gating the origin, this does not neutralize the flow.
- L221 `message.source === 'supabase-auth-adapter'` — attacker-supplied field, trivially satisfiable.
- L222 `switch (message.action)` → `case 'setItem'` (L256) — attacker-supplied field.
- L258 `const { key, value } = message.data;` — both destructured di

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
