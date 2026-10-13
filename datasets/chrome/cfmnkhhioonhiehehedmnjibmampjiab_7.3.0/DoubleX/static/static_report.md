# ExPAgent Static Verification — cfmnkhhioonhiehehedmnjibmampjiab v7.3.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 2 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L8616
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L8621

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the raw bundle and found that the reported locations are shifted, but they resolve to a real, reachable external-message → `chrome.tabs.create/update` flow.

## Decision ledger

**1. Who controls the source?**
The reported source `L8616` in `js/background.js` is actually core-js `Symbol` polyfill code (`var string = symbolToString(symbol);`). However, the reported source/sink line pair is offset by exactly **+1041** lines:

- reported source `L8616` → real source `js/background.js:7575`
- reported sink `L8621` → real sink `js/background.js:7580`

The real source is:

```js
chrome.runtime.onMessageExternal.addListener(function (request, sender, respond) {
  switch (request.message) {
    case SM_MESSAGE_OPEN_URL:
      if (request.openInNewWindow) {
        chrome.tabs.create({
          url: request.url,
          active: !!request.active
        });
      } else {
        chrome.tabs.update({
          url: request.url
        });
      }
```

`request` is attacker/external-sender-controlled. The manifest sets:

```json
"externally_connectable": {
  "ids": ["*"],
  "matches": [
    "*://localhost/*",
    "*://*.start.me/*",
    "*://*.startme.com/*"
  ]
}
```

So the s

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — ⚪ DUPLICATE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L8616
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L8626

**Reasoning:** Semantically identical to flow #0. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the raw bundle and found that the reported locations are shifted, but they resolv...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
