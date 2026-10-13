# ExPAgent Static Verification — gmimaknkjommijabfploclcikgjacpdn v1.0.15

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0.042, scope=0.06
- Flow types: {'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `sw.bundle` [BG_1] @ L3:C305 -> L3:C306
- **Sink**: `CHROME_ACTION_BADGE_OPTIONS` in `sw.bundle` [BG_1] @ L3:C323 -> L3:C465
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification analysis

### 1. Source: attacker-controllable?

Yes. The raw minified source confirms:

```js
chrome.runtime.onMessageExternal.addListener(function(_,w,f){ ... })
```

`_` is the message object delivered via `chrome.runtime.onMessageExternal`. The manifest declares:

```json
"externally_connectable": { "matches": ["https://www.youtube.com/*"] }
```

So a page running in the `https://www.youtube.com/*` origin can call `chrome.runtime.sendMessage(<extensionId>, {...})` and reach this listener. There is **no** `sender.id` / `sender.origin` / `sender.url` check — the listener signature is `(_,w,f)` and `w` (sender) is never used. The source field `_.badge` is therefore attacker-controlled from the YouTube origin (exploitable via XSS on YouTube, or by any script executing in that origin).

### 2. Source-to-sink path

The listener body (comma-operator sequence in the `if` condition) executes the badge branch **unconditionally on message type**:

```js
_?.hasOwnProperty("badge") && (
  h = { text: _.badge },
  h?.text && chrome.action.setBadgeText(
    (b => (["On","Off"].includes(b.text) && chrome.action.setBadgeBackgroundColor({...}), b))(h)
  ).then()
)
```

- `h = { t

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
