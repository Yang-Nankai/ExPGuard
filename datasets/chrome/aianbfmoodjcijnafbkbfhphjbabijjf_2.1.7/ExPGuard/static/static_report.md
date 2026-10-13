# ExPAgent Static Verification — aianbfmoodjcijnafbkbfhphjbabijjf v2.1.7

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 2
- Coverage: node=0.485, scope=0.488
- Flow types: {'STORAGE_POSOING': 1, 'REQUEST_FORGERY': 1}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `script/background` [BG_1] @ L1:C1740 -> L1:C1741
- **Sink**: `CHROME_LOCAL_STORAGE` in `script/background` [BG_1] @ L1:C1768 -> L1:C1814
- **Severity evidence**: ['*://steamcommunity.com/*']
- **Source report Flow ID**: `9`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #9 — STORAGE_POSOING (`attacker-input-storage-write`)

### 1. Source control
The source is `chrome.runtime.onMessageExternal.addListener(function(t,e,n){...})` in `script/background.js` (confirmed at L1 C1400–1520). `t` is the full message object delivered by an **externally connectable page**. `externally_connectable.matches` includes `*://steamcommunity.com/*`, `*://store.steampowered.com/*`, `*://steamlvlup.com/extension/bonus`, and `*://store.steampowered.com/app/*`. Any page on those origins (including an attacker-owned Steam profile page, which lives under `steamcommunity.com`) can call `chrome.runtime.sendMessage(<ext-id>, ...)`. So `t.data` is genuinely untrusted/attacker-controllable.

### 2. Path
```
onMessageExternal message t
  → guard: o = sender.url; s = o.startsWith("https://steamcommunity.com/") || ... ; if(!c && !s) reject
  → if ("queryResult" == t.contentScriptQuery)
       chrome.storage.local.set({ queryResult: t.data })
```
The raw source confirms exactly this:
```js
const o=e&&e.url?e.url:"",
      c=e&&e.id===chrome.runtime.id,
      s=o.startsWith("https://steamcommunity.com/")||o.startsWith("https://store.steampowered.com/")||"https

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `script/background` [BG_1] @ L1:C1740 -> L1:C1741
- **Sink**: `FETCH_BODY` in `script/background` [BG_1] @ L1:C2508 -> L1:C2679
- **Severity evidence**: ['*://steamcommunity.com/*']
- **Source report Flow ID**: `9`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal` in `script/background.js`. The raw source confirms the listener:

```js
...addListener(function(t,e,n){const o=e&&e.url?e.url:"",c=e&&e.id===chrome.runtime.id,
s=o.startsWith("https://steamcommunity.com/")||o.startsWith("https://store.steampowered.com/")||
"https://steamlvlup.com/extension/bonus"===o||o.startsWith("https://steamlvlup.com/extension/bonus?");
if(!c&&!s)return n(!1),!1;...
```

`t` is the entire external message payload; `t.data` is fully attacker-supplied by any page permitted by `externally_connectable` (`*://steamcommunity.com/*`, `*://store.steampowered.com/*`, `*://steamlvlup.com/extension/bonus`). The `s` guard is an origin/URL check matching those same host surfaces, not a browser-authenticated fixed `sender.id` allowlist. `c` (self-id) is not the realistic external-sender path for web pages. So the source is untrusted at runtime, restricted to the externally-connectable origins (XSS/content-injection prerequisite on those domains).

**(b) Source-to-sink path**
Unbroken within the same listener: external message `t` → `"apiExtension"==t.contentScriptQuery` 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `RUNTIME_SENDMESSAGE`)
- Notes: Source type requires external conditions not available in sandbox.

---
