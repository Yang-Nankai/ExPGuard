# ExPAgent Static Verification — ifompgilpgnbnopfpfdjcmmpgkgckabi v2.1.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.971, scope=1
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C3506 -> L1:C3507
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L1:C3979 -> L1:C4255
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — STORAGE_POSOING (attacker-input → chrome.storage.sync.set)

### Four-part decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener` in the MV3 background service worker (`background.js`). The manifest restricts `externally_connectable.matches` to `https://appbox.space/*`, so the message sender must be a page on that origin. This is not an unforgeable trust boundary — a page on `appbox.space` is exactly the web content the extension is exposed to, and any XSS/compromise of that origin (or attacker-controlled content served from it) lets an attacker reach this listener. `authenticatedExtensionAllowlist` is `null`, so there is **no** fixed `sender.id` trust boundary.

**(b) Exact source-to-sink path**
`onMessageExternal` receives message `e` and sender `o`. The code path (verified in raw source):

1. `if (o.url && o.url.includes("appbox.space"))` — sender-origin substring check (bypassable/redundant; manifest already constrains to appbox.space).
2. `if ("supabase-auth-adapter" === e.source)` — message field, fully attacker-chosen.
3. `switch (e.action) { ... case "setItem": ... }` — message field, fully 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
