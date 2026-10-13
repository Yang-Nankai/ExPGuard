# ExPAgent Static Verification — mhmphnocemakkjdampibehejoaleebpo v0.93

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.202, scope=0.232
- Flow types: {'STORAGE_POSOING': 18, 'DATA_LEAK': 2, 'SOURCE_REPORT_ONLY': 1}  |  Severities: {'CRITICAL': 4, 'UNKNOWN': 17}

**Assessment:** Verified 3 flow(s): 3 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `scripts/content` [CS_1] @ L264:C7 -> L264:C13
- **Sink**: `CHROME_SYNC_STORAGE` in `scripts/content` [CS_1] @ L39:C16 -> L42:C18
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #3 (STORAGE_POSOING: attacker → `chrome.storage` "playedgames")

### (a) Who controls the source?
Attacker/untrusted web page. The source is `window.addEventListener('supernova-message', …)` in the content script, which runs on `http://*/*` and `https://*/*`. A page can dispatch:

```js
window.dispatchEvent(new MessageEvent('supernova-message', {
  data: { key: 'supernova-jslauncher-message', message: JSON.stringify({...}) }
}));
```

The "guards" are `e.data.key == "supernova-jslauncher-message"` and `message.command == "loggame"` — both are attacker-supplied fields, not authentication. There is no `sender.id`/origin allow-list. Source is fully attacker-controllable.

### (b) Exact source-to-sink path (confirmed in source)
1. L264–268: handler parses `e.data.message` via `JSON.parse`.
2. L274 `switch (message.command)` → L291–294 case `"loggame"`: `let apiobject = message.data; logGame(apiobject);`.
3. `logGame` (L115–179): validates only `game.url != null && game.title != null` (attacker supplies both), then:
   - L171 `games[game.url] = game;`
   - L174 `lib.syncdata.set({ playedgames: lib.entries(games) });`
4. `lib.entries` (scripts/lib.js L126–134) wra

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `scripts/content` [CS_1] @ L264:C7 -> L264:C13
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L49:C12 -> L55:C14
- **Bridge**: storage `STORAGE_FLOW[area: local, key: playedgames, sender: scripts/content, receiver: background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source?** — Any webpage matching `http://*/*` / `https://*/*`. The content script (`scripts/content.js`) registers `window.addEventListener("supernova-message", superNovaMessageEventHandler)` (L299, helper L238-240). The page can dispatch a `MessageEvent('supernova-message', {data: {...}})` on the shared DOM and the isolated-world listener receives it. The only checks are `if (!e.data || !e.data.message) return` (L264) and `if (e.data.key != "supernova-jslauncher-message") return` (L265) — both are attacker-chosen fields, with no origin/sender.id trust boundary. **Attacker-controlled: confirmed.**

**(b) Exact data path into the sink** — 
- Page `MessageEvent` → `superNovaMessageEventHandler` (L263-298) → `JSON.parse(e.data.message)` (L268) → `case "loggame"` (L291-295) → `logGame(apiobject)` where `apiobject = message.data` (fully page-controlled).
- `logGame` (L115-178) requires only `game.url != null && game.title != null` (attacker supplies both), then sets `games[game.url] = game` (L171) and calls `lib.syncdata.set({ playedgames: lib.entries(games) })` (L174).
- `lib.syncdata.set` resolves to `writeSortedArrayLossy` in `scripts/li

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `scripts/content` [CS_1] @ L264:C7 -> L264:C13
- **Sink**: `CHROME_SYNC_STORAGE` in `background` [BG_1] @ L51:C16 -> L54:C18
- **Bridge**: storage `STORAGE_FLOW[area: local, key: playedgames, sender: scripts/content, receiver: background]`
- **Severity evidence**: ['https://*/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to verify this flow. Let me reconstruct the full chain from source.

## (a) Who controls the source?

**Any webpage** (content script runs at `document_start` on `http://*/*` and `https://*/*`). The content script registers:

```js
// scripts/content.js:263-298
function superNovaMessageEventHandler(e) {
  if (!e.data || !e.data.message) return;
  if (e.data.key != "supernova-jslauncher-message") return;
  var message = null;
  try { message = JSON.parse(e.data.message); } catch (e) { return; }
  ...
  switch (message.command) {
    ...
    case "loggame":
      if (message.data) {
        let apiobject = message.data;
        logGame(apiobject);
      }
      break;
  }
}
addEventHandler("supernova-message", superNovaMessageEventHandler);
```

The only guards are `e.data.message` present and `e.data.key === "supernova-jslauncher-message"`, both of which the page supplies. There is no `event.source`/origin check and no sender authentication. This matches the deterministic harness ("a page can forge window.postMessage/CustomEvent fields").

## (b) Exact source-to-sink path

1. Page dispatches `new MessageEvent('supernova-message', { data: { key: 'supernova-jsla

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
