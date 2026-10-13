# ExPAgent Static Verification — eojdckfcadamkapabechhbnkleligand v40.5

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L102
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `background.js` [BG_1] @ L116

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the actual code. Let me record my analysis.

## Analysis

**1. Resolving the report anchors.** The report names `background.js`, but the real file is `background.min.js` (manifest service worker). The reported "WINDOW_MESSAGE_EVENT" source is actually a `chrome.runtime.onMessageExternal` listener — an external web message input, which matches the "DoubleX" / `doublex-edg-provenance` rule (DoubleX = external message). The sink `chrome.tabs.create` is real and lives in the `"tab"` command branch.

**2. Who controls the source.** The full minified code contains:

```js
const l = chrome.runtime.getManifest().externally_connectable.matches.map(e => new URL(e).hostname);
chrome.runtime.onMessageExternal.addListener((function(s, m, h) {
  return (async () => {
    const d = new URL(m.url).hostname;
    if (!l.includes(d)) return h({error: "Invalid request"});
    if (!s.cmd) return h({error: "Invalid request"});
    if ("ping" === s.cmd) return h("pong");
    const f = await chrome.cookies.get({url: "https://facebook.com", name: "c_user"});
    f ? ("pingping" === s.cmd ? h("pongpong") :
         "tab" === s.cmd && s.url ? (chrome.tabs.create({url: s.url}), h(!0)) :
       

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
