# ExPAgent Static Verification — {c98e042b-917d-4bdb-b125-dd3ace21ab71} v4.0.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.802, scope=0.833
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟡 UNCERTAIN  (STORAGE_POSOING / MEDIUM, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content/hotmail_bridge` [CS_4] @ L16:C7 -> L16:C11
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L69:C10 -> L69:C39
- **Bridge**: message `runtime.single.sender.message[content/hotmail_bridge->background]`
- **Severity evidence**: ['https://outlook.live.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: I've traced the full chain in the real source. Here is my verification.

## Decision ledger

**(a) Who controls the source?**
`content/hotmail_bridge.js` (ISOLATED world) listens for `window.addEventListener("message")` on `https://outlook.live.com/*`. The guard is:

```js
if (event.source !== window || event.origin !== ORIGIN) return;
const data = event.data;
if (!data || data.source !== SOURCE || data.type !== "token" || typeof data.token !== "string") return;
extApi.runtime.sendMessage({ cmd: "hotmailToken", token: data.token });
```

`SOURCE` is a message *field* (`"xnotifier-hotmail"`), `type` is a message *field*, and `event.origin === "https://outlook.live.com"` is satisfiable by any script executing in the outlook.live.com page (the page's own `postMessage` sets `event.origin` to its own origin). These are attacker-satisfiable, not authentication. The `token` value is fully attacker-controlled.

**(b) Source-to-sink path**
`page postMessage → hotmail_bridge (CS) → runtime.sendMessage({cmd:"hotmailToken", token}) → background onMessage case "hotmailToken" → storeHotmailToken(req.token)`.

The background handler's checks are:
```js
!sender || sender.id !== extApi.runtime.id |

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
