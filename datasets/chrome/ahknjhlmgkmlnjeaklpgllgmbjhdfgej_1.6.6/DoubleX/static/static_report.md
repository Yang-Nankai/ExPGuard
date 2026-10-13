# ExPAgent Static Verification — ahknjhlmgkmlnjeaklpgllgmbjhdfgej v1.6.6

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1, 'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🟢 FALSE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L227
- **Sink**: `CHROME_TABS_EXECUTE` in `background.js` [BG_1] @ L246

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the actual `background.js` source (single minified line; the `L227`/`L246` locations correspond to code inside the background listener/handlers), plus the manifest attack surface.

## Decision ledger

**(a) Who controls the source?**
Not web content, and the reported source kind is mislabeled. `background.js` is a Manifest V3 service worker; there is **no `window` and no `window.addEventListener('message')`**. The actual listener that reaches `chrome.scripting.executeScript` is:

```js
chrome.runtime.onMessage.addListener((r,o,n)=>{ switch(r.action){ case "captureScreen": ... } })
```

`chrome.runtime.onMessage` is extension-*internal*: only the extension's own popup/sidepanel can send to it. The manifest has **no content scripts**, and web pages do **not** reach `onMessage` — they reach `onMessageExternal`/`onConnectExternal`. I confirmed those external handlers exist:

- `onMessageExternal` only handles `source:"supabase-auth-adapter"` storage `getItem/setItem/removeItem` and `type:"broadcast"` — it **never calls `chrome.scripting.executeScript`**.
- `onConnectExternal` only adds the port to a broadcast `Set` and never registers `port.onMessage`, so it reads no page m

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
