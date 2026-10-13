# ExPAgent Static Verification — ohcpnigalekghcmgcdcenkpelffpdolg v0.0.3.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.893, scope=0.875
- Flow types: {'REQUEST_FORGERY': 1, 'STORAGE_POSOING': 1}  |  Severities: {'CRITICAL': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟠 PARTIAL / PA  (REQUEST_FORGERY / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L89:C16 -> L89:C23
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L363:C3 -> L363:C79
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Finding: PARTIAL (trusted-companion-extension IPC), not a webpage-reachable privilege escalation.**

### (a) Who controls the source
The source is `chrome.runtime.onMessageExternal` (`background.js:86-89`), i.e., external-message input. However, the whole handler body is wrapped in:

```js
if (sender.id === extensionsKnown.color_pick_tablet){   // L91
```

`extensionsKnown.color_pick_tablet` is a hardcoded 32-char extension ID:
- production: `hobaclohjecibademehpakdcphmbodmb`
- dev IDs: `amlacjdajlinpfncappopgkheaooknbe` / `kjgakcoopjnkaobapohfkipbkpnajocc` (`EXPORT_options_prefs.js:20-30`).

`sender.id` is browser-populated from the sender extension's public key. An ordinary webpage or arbitrary extension cannot choose this ID. So the effective controller of the tainted value is the fixed, browser-authenticated companion extension ("ColorPick Tablet Edition").

### (b) Source-to-sink path (confirmed unbroken)
1. `onMessageExternal` reads `request.hex` in branch `request.historyPush && request.hex && request.rgb && request.hsv` (L113).
2. Calls `processSetColor({setColor:true, hex:request.hex, rgb:request.rgb, hsv:request.hsv})` (L114).
3. `processSetColor` 

**Attacker control:** See preserved static analyst transcript.

**Why partially available:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
