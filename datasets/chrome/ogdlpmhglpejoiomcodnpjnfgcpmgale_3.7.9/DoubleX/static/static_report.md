# ExPAgent Static Verification — ogdlpmhglpejoiomcodnpjnfgcpmgale v3.7.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1532
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1562

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the path by reading the actual background service worker code (the bundle is minified into one line, so I analyzed the `chrome.runtime.onMessageExternal` handler and the storage writes).

## Four-part decision ledger

**(a) Who controls the source**
The flagged source is the external-message handler in `background.js`:

```js
chrome.runtime.onMessageExternal.addListener((function(t, r, e) { ... }))
```

`t` is the message object supplied by an *external* sender. The browser restricts this to `externally_connectable.matches: ["https://custom-cursor.com/*", "https://*.custom-cursor.com/*"]`, so a page on `custom-cursor.com` (or a subdomain) controls `t` (exploitable via XSS/script execution on those origins). This is a web-controlled surface — not a browser-authenticated extension peer.

**(b) Exact source-to-sink data path**
For action `"install_collection"` (the 30-line listener→sink gap matches this branch):

1. `t.action === "install_collection"`
2. `o = t.slug` — validated only as `/^[a-z0-9-]+$/` (the *key*)
3. `i = t.collection` — **not validated at all** (the *value*)
4. `n.collection[o] = i` (where `n` is the previously loaded storage config)
5. `chrome.storag

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L1532
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L1675

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the path by reading the actual background service worker code (the bundle is m...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
