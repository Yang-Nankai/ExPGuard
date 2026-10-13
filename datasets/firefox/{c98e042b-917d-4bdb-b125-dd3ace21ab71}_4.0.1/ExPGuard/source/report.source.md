# Source-level Taint Flow — {c98e042b-917d-4bdb-b125-dd3ace21ab71} 4.0.1

- Source type: XPI
- Files with issues: 6 / 24
- Distinct taint flows: 1  (collapsed from 1 raw issue entries)
- Sinkless sources skipped: 9 (sources that reach no sink)

> Tainted token spans are wrapped in `»…«`. Each flow is de-duplicated; propagation lists every distinct source line once, in flow order, one line per step. Long minified lines are windowed around the tainted span. See `report.flows.json` for the machine form.

---

## Flow #1 — WINDOW_MESSAGE_EVENT (window.addEventListener(message))

- **Source**: `WINDOW_MESSAGE_EVENT` — `background` L1112:C0 -> L1112:C47  `»extApi.runtime.onMessage.addListener(onMessage)«;`
- **Sink(s)**:
  - `CHROME_LOCAL_STORAGE` (hotmailToken) — `background` L69:C10 -> L69:C39  `await »exlib.savePrefsA("scriptInfo"«, si);`
- **Sanitized**: NO
- **Frame**: `BG_1`

- **Propagation** (10 raw steps → 6 distinct lines):
   1. L1112 `»extApi.runtime.onMessage.addListener(onMessage)«;`  · MESSAGE
      ⇄ cross-context hop: `runtime.single.sender.message[content/hotmail_bridge->background]`
   2. L1091 `»!req.token«`  · ASSIGN:unary
   3. L1084 (→L1091) `»        !sender ||«`  · ASSIGN:logical-right
   4. L1253 `»hotmailTokenData = { token: token }«;`  · ASSIGN:identifier, ELEMENT:object.setProperty
   5. L65 `»i«f (scripts[id].config.cookies) si[0][id] = scripts[id].config.cookies;`  · ASSIGN:binary-left
   6. L67 `if (»scripts[«id].config.inboxOnly) si[2][id] = scripts[id].config.inboxOnly;`  · ELEMENT:object.setProperty

---
