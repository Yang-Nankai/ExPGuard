# ExPAgent Static Verification — ohlencieiipommannpdfcmfdpjjmeolj v7.0.9

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.358, scope=0.413
- Flow types: {'REQUEST_FORGERY': 1}  |  Severities: {'HIGH': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L1:C2037242 -> L1:C2037243
- **Sink**: `FETCH_HEADERS` in `background` [BG_1] @ L1:C2036036 -> L1:C2036143
- **Severity evidence**: ['https://*.printfriendly.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #4 (REQUEST_FORGERY: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `FETCH_HEADERS`)

I reconstructed the exact minified code from `background.js` line 1 and confirmed the report's reconstruction:

- Top-level constants: `r="https://www.printfriendly.com"` (confirmed in source), and the sink uses `` fetch(`${r}/api/v4/user/profile`, ...) ``.
- External listener:
  ```js
  chrome.runtime.onMessageExternal.addListener(async (e, a, t) =>
    a.origin !== r
      ? t({success: false})
      : e.accessToken
        ? o(e.accessToken).then(t)
        : void (e.removeAccessToken && await la())
  );
  ```
  (`e` = message, `a` = sender, `t` = sendResponse)
- `o`:
  ```js
  o = async e => {
    let a = e || null;
    if (!a) { const e = await t(); e && !n(e) && (a = e.value) }
    if (a) {
      const e = await fetch(`${r}/api/v4/user/profile`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${a}` }
      });
      ...
    }
  }
  ```

### Four-part ledger

1. **Who controls the source?**
   Any script executing on an origin that passes the guard. The guard is exact-origin equality `sender.origin !== r` with `r = "https://www.printfriendly.com"`,

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
