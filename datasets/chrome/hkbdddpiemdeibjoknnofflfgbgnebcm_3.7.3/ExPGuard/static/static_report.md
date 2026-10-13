# ExPAgent Static Verification — hkbdddpiemdeibjoknnofflfgbgnebcm v3.7.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.005, scope=0.005
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `serviceWorker` [BG_1] @ L1:C1496 -> L1:C1497
- **Sink**: `CHROME_LOCAL_STORAGE` in `serviceWorker` [BG_1] @ L1:C1811 -> L1:C1857
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have confirmed the complete listener from the minified source. Let me reason through the four-part ledger.

**(a) Who controls the source?**
`chrome.runtime.onMessageExternal.addListener((t,s,o)=>{const{type:e,content:n}=t;...})` — the source is an external runtime message. The sender `s` is never checked; the message body `t` is fully attacker-controlled. Manifest `externally_connectable.matches: ["https://www.youtube.com/*"]` narrows the origin surface, but a script executing in that origin (e.g. via XSS on youtube.com) can send the message. No `sender.id` allowlist, no `sender.origin` check, no `sender.url` check anywhere in the listener.

**(b) Exact source-to-sink data path:**
Source line destructures `{type:e, content:n}=t`. The `switch(e)` routes to `case "setHasVersionUpdate"`, which executes `chrome.storage.local.set({hasVersionUpdate:n})`. This is a direct, same-context data flow with no bridge hop, no sanitizer, no allow-list, and no constant overwrite. The report's propagation step (`ASSIGN ... destructure-property[content]`) matches exactly.

**(c) Security-relevant argument that is attacker-controlled:**
The stored *value* `n` (message `content` field) is written ve

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
