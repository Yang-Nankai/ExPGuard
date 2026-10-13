# ExPAgent Static Verification — dneiffjipkkinmcpploifdknmhlmfbhc v3.1.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.974, scope=1
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L5:C130910 -> L5:C130911
- **Sink**: `CHROME_SESSION_STORAGE` in `background` [BG_1] @ L5:C124762 -> L5:C124797
- **Severity evidence**: ['https://workona.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to issue a verdict. Let me record the decision ledger and final judgment.

## Decision ledger

**(a) Who controls the source**
The source is `chrome.runtime.onMessageExternal.addListener(...)` in `Sg` (background.js L5 ~C130910). The message object `e` — including `e.method` and every payload field such as `e.tasks` — is attacker-controlled. The manifest sets `externally_connectable.matches: ["https://workona.com/*"]` (no `ids`), so any page on `https://workona.com/*` (or XSS on that origin) can call `chrome.runtime.sendMessage(EXT_ID, msg)` and reach this listener. Provenance is `EXTERNAL_MESSAGE`; this is a real web→background privilege boundary.

**(b) Exact source-to-sink data path (verified in raw source)**
- `Sg`'s listener: `switch(e.method){... default: u(e,a,E,r) ...}` — the whole message is forwarded to the handler `u` (C130400–131400).
- `ns((u,D,e)=>{ switch(u.method){ ... case "updateAttachments": return BB(u.tasks), ... }})` (C136000–137800).
- `sB = new pe("tasksByDomain", {})`; `BB = u => { u && sB.set(u.reduce((D,e)=>(e.attachments.forEach(r=>{ let F=oB(r); F&&(D[F]=sS(e,D[F])) }),D),{})) }` (C134500–136000).
- `pe` inherits `de.set(D){ this.

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
