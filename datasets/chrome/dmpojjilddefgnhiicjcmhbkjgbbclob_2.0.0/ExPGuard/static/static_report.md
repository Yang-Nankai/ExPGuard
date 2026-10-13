# ExPAgent Static Verification — dmpojjilddefgnhiicjcmhbkjgbbclob v2.0.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.231, scope=0.276
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.30)

- **Source**: `TARGET_CUSTOM_EVENT` in `injected` [CS_1] @ L766:C12 -> L766:C20
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background` [BG_1] @ L1:C65849 -> L1:C65896
- **Bridge**: message `runtime.single.sender.message[injected->background]`
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: ## Verification of Flow #1 — TARGET_CUSTOM_EVENT → CHROME_TABS_CREATE_OPTIONS

### Four-part decision ledger

**(a) Who controls the source?**
Attacker (any webpage). The content script `injected.js` runs at `document_start` on `<all_urls>` in the isolated world. It registers:

- `injected.js:215` → `comm.did = 'OM' + destId` and `init(C, R)` (line 914) yields the fixed event name **`OMC`**.
- `injected.js:216` → `document.addEventListener('OMC', comm.handleC.bind(comm), false)`.
- `injected.js:765-766` → `function handleC(e) { var req = e.detail; ... }`.

The event name is a hard-coded string, not a secret. Any page can run:
```js
document.dispatchEvent(new CustomEvent('OMC', {detail:{cmd:'OpenTab', data:{url:'https://attacker.example/', active:true}}}));
```
and the isolated-world listener reads the attacker-controlled `e.detail`. This is the standard Violentmonkey/Chameleon page↔content-script DOM bridge, and the same channel is used in `comm.post` (`injected.js:226-228`). The harness's "page can forge CustomEvent fields" note applies directly.

**(b) Source-to-sink path (unbroken):**
1. `injected.js:766` — `var req = e.detail;` (attacker-controlled CustomEvent detail).
2. `inje

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
