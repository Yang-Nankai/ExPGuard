# ExPAgent Static Verification — ogdlpmhglpejoiomcodnpjnfgcpmgale v3.7.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.078, scope=0.126
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C30311 -> L1:C30312
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C33087 -> L1:C33170
- **Severity evidence**: ['https://*.custom-cursor.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`
- **Source-report evidence metadata**: {'sanitized': False, 'duplicatePaths': 1, 'rawSteps': 238, 'distinctLines': 1, 'crossContextHops': [], 'sinkUrlControl': []}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ### Verification of Flow #1 — STORAGE_POSOING (attacker external message → `chrome.storage.local.set`)

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener((t, r, e) => …)`. The tainted span is the message object `t` itself (`S=«t».action`), not merely a literal. The manifest `externally_connectable.matches` allows `https://custom-cursor.com/*` and `https://*.custom-cursor.com/*`, so a webpage on those origins (or XSS/subdomain on those origins) can call `chrome.runtime.sendMessage(EXT_ID, payload)` and fully control `t.action` and `t.rotator`.

**(b) Source-to-sink data path**
I inspected `background.js` around the reported anchors. The listener dispatches on `t.action`:

- `case 0`: `S = t.action` routes `"update_rotator"` → `case 15`.
- `case 15`: `w = t.rotator` (validated only as `typeof w === "object"`).
- `case 16`: builds `j = { status: !!w.status, type: ["time","request"].includes(w.type) ? w.type : "time", value: Math.max(3, Math.min(1e3, parseInt(w.value)||30)) }`.
- `case 16` sink: `chrome.storage.local.set({rotator: j}, …)`.

The reported source span taints the whole message object `t`, so the `t.rotator` read inherits the taint

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
