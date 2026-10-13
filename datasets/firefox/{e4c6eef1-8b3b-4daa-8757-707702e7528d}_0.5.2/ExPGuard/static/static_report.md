# ExPAgent Static Verification — {e4c6eef1-8b3b-4daa-8757-707702e7528d} v0.5.2

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.953, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'CRITICAL': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / CRITICAL, confidence 0.60)

- **Source**: `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` in `worker` [BG_1] @ L349:C16 -> L349:C23
- **Sink**: `CHROME_WINDOWS_CREATE_OPTIONS` in `worker` [BG_1] @ L188:C20 -> L193:C4
- **Severity evidence**: ['externally_connectable: <missing>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #1 — `CHROME_ONCONNECTEXTERNAL_ONMESSAGE` → `chrome.windows.create`

### (a) Who controls the source
The source is the `request` object received by the `onConnectExternal` port message listener in `worker.js`:

```js
chrome.runtime.onConnectExternal.addListener(eport => {
  ...
  eport.onMessage.addListener(async request => {
    console.log(request);
    if (request.cmd === 'request-ocr') {
      ...
      win = await standalone(request);
```

`externally_connectable` is absent from the manifest, and there is **no `sender.id` / `sender.origin` check** anywhere in this listener. The `cmd` value is part of the attacker-supplied message and is not a trust anchor. Under the harness model, any external extension can connect; the message payload is fully attacker-controlled.

### (b) Source-to-sink path
The propagation is unbroken:

1. `request` (external message) → `request.cmd === 'request-ocr'` branch.
2. `request` is passed to `standalone(request)`.
3. `standalone` destructures attacker-controlled fields:
   - `proceed`, `selector`, `agent`, `title`, `message`
4. Those fields are appended to a `URLSearchParams` object:
   - `args.set('proceed', proceed)`
   - `

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
