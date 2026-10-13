# ExPAgent Static Verification — hpjofgdodgbgelploffffpacpdpbnljg v1.1.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.996, scope=1
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background` [BG_1] @ L107:C8 -> L107:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `js/background` [BG_1] @ L52:C4 -> L52:C54
- **Severity evidence**: ['*://*.iptvplayer.stream/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I verified the flow against the source-level report and the actual `js/background.js` code.

## Decision ledger

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal` at `js/background.js:104-116`. `request.url` comes from an external webpage that is allowed to message the extension under:

```
externally_connectable.matches: ["*://*.iptvplayer.stream/*"]
```

This is a wildcard subdomain pattern. Any page served from an `iptvplayer.stream` subdomain (or any page on a trusted subdomain via XSS) can send `{action:'playStream', url: ...}`. There is no `sender.id` extension-ID allowlist and no URL scheme/format validation on `request.url`. The `isAllowedOrigin()` check is just `url.includes('iptvplayer.stream')`, which is satisfied by the browser-enforced `externally_connectable` origin itself and is not an unforgeable trust boundary.

**(b) Source-to-sink path**
The path is real and unbroken:

1. `L110-111`: `else if (request.action === 'playStream' && request.url) { openStreamInPlayer(request.url); }`
2. `L61`: `saveStreamToHistory(url)`
3. `L46`: `history.unshift(url)`
4. `L49`: `history = history.slice(0, 5)`
5. `L52`: `chrome.storage.local.set({streamHistory: histor

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
