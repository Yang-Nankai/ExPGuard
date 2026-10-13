# ExPAgent Static Verification — jjjoiagdgjhecijlkfkipeilgfgbhkgc v0.012

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.597, scope=0.589
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'HIGH': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L29:C8 -> L29:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L49:C8 -> L49:C37
- **Severity evidence**: ['https://*.onionfist.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The propagation report confirms the complete chain: `request.obj[key]` (L43–44) and `request.new_data[key]` (L117–118) flow through `obj` (L42/L45, L116/L119) into `chrome.storage.local.set(obj)` (L49 and L122). Combined with the raw-source confirmation that `chrome.runtime.onMessageExternal` has **no sender/origin guard**, and that `externally_connectable` is a wildcard subdomain match, this is a genuine storage-poisoning flow.

VERDICT: TRUE_POSITIVE

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — DUPLICATE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L29:C8 -> L29:C15
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L122:C12 -> L124:C14
- **Severity evidence**: ['https://*.onionfist.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The propagation report confirms the complete chain: `request.obj[key]` (L43–44) and `request....

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
