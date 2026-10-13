# ExPAgent Static Verification — illemhbijpiebjfilfmgebahaakajkpe v7.4.3.70

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L401
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L391

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the actual source. The normalized report's line numbers (L401 source / L391 sink) are stale relative to the pretty-printed `background.js` in the bundle, but the semantic flow described ("DoubleX web-accessible message input" → `chrome.tabs.update`) resolves cleanly to a real, reachable path.

## Four-part decision ledger

**(a) Who controls the source**
The source is the external message payload `e` in `chrome.runtime.onMessageExternal.addListener(async (e, t, a) => ...)` at `background.js:304`. This listener is registered at startup via `R();` (`background.js:388`). Any page on the `externally_connectable` origins can call `chrome.runtime.sendMessage(extensionId, msg)`:

- `https://app.wascript.com.br/*`
- `https://dev.watools.com.br/*`
- `https://web.whatsapp.com/*`
- `https://meta-oficial.wascript.com.br/*`

There is no `sender.id` allowlist and no origin check in this listener. The browser only enforces the `externally_connectable` origin membership, which per the harness rules is a real (XSS-exploitable) attack surface, not a neutralizer.

**(b) Source-to-sink path**
```
onMessageExternal (L304)
  switch (e.action)
    case "open_whatsapp": f(e.bearer)          

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L401
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L396

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've verified the actual source. The normalized report's line numbers (L401 source / L391 sin...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
