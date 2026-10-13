# ExPAgent Static Verification — jkmpbdjckkgdaopigpfkahgomgcojlpg v2.3.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.982, scope=1
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C6676 -> L1:C6677
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L1:C7139 -> L1:C7415
- **Severity evidence**: ['https://appbox.space/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have sufficient evidence. Let me confirm the key facts from the source inspection:

**Source (attacker-controlled):** `chrome.runtime.onMessageExternal.addListener((e,r,t)=>{ if(r.url&&r.url.includes("appbox.space")) if("supabase-auth-adapter"===e.source) switch(e.action){ ... case "setItem": try{ const{key:r,value:o}=e.data; return chrome.storage.sync.set({[r]:o}, ...) } ... }`.

**Guard analysis:**
- The only sender gate is `r.url.includes("appbox.space")` — a substring check on `sender.url`, not a fixed `sender.id` equality. Per the browser trust rules, `sender.origin/url` restrictions are not unforgeable: they restrict scope but remain exploitable via XSS on `appbox.space` (which `externally_connectable.matches: ["https://appbox.space/*"]` permits).
- `"supabase-auth-adapter"===e.source` and `e.action==="setItem"` are checks on attacker-chosen message *fields*, not trust anchors — a sender can set them arbitrarily.

**Sink:** `chrome.storage.sync.set({[r]:o}, ...)` where `r` (key) and `o` (value) are destructured directly from `e.data`. Both the stored key and the stored value are fully attacker-controlled. This is not a boolean-gate-over-literal case; the actual persisted va

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
