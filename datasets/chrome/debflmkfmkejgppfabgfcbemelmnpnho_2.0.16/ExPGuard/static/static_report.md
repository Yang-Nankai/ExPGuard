# ExPAgent Static Verification — debflmkfmkejgppfabgfcbemelmnpnho v2.0.16

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.461, scope=0.366
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `service-worker` [BG_1] @ L1:C18548 -> L1:C18549
- **Sink**: `CHROME_LOCAL_STORAGE` in `service-worker` [BG_1] @ L1:C19097 -> L1:C19140
- **Severity evidence**: ['https://www.viitor.info/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Decision Ledger

| Question | Finding |
|---|---|
| (a) Who controls the source? | Any page/script executing on `https://www.viitor.info/*` can call `chrome.runtime.sendMessage(extensionId, payload)`. The `message` object `t` is fully attacker-controlled. |
| (b) Source-to-sink path | `chrome.runtime.onMessageExternal.addListener((t,e,r)=>{...})` → branch `t?.type===o.loginSuccess && t.data` → `chrome.storage.local.set({[A.user]:t.data})`. No message/storage hop; it is a direct external-message → privileged-storage sink. |
| (c) Security-relevant argument | The entire attacker-controlled `t.data` object is stored verbatim under `A.user` (`vf_user`). This is data flow into a privileged API argument, not merely a boolean gate. |
| (d) Guard/trust boundary | The only gate is `t.type === o.loginSuccess && t.data`, where `t.type` and `t.data` are both attacker-chosen message fields. There is **no** `sender.id`, `sender.origin`, action allow-list, schema validation, or origin check. `externally_connectable` restricts the attack surface to `https://www.viitor.info/*` but does not eliminate the attacker (XSS/control on that origin suffices). |

## Evidence

The `read_minified_range` ins

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
