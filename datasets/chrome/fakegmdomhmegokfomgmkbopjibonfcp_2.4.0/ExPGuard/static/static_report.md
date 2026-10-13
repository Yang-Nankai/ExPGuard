# ExPAgent Static Verification — fakegmdomhmegokfomgmkbopjibonfcp v2.4.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 7  |  Verified: 4
- Coverage: node=0.987, scope=1
- Flow types: {'PRIVILEGE_ESCALATION': 5, 'REQUEST_FORGERY': 2}  |  Severities: {'MEDIUM': 7}

**Assessment:** Verified 4 flow(s): 4 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #3 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L705:C21 -> L705:C27
- **Sink**: `CHROME_DECLARATIVENETREQUEST_RULES` in `background` [BG_1] @ L632:C4 -> L648:C6
- **Severity evidence**: ['https://app.getmetastream.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #4 — Metastream Remote `onMessageExternal` → `declarativeNetRequest`/`fetch`

### Decision ledger

**(a) Who controls the source?**
The source is `action`, the message object delivered to `chrome.runtime.onMessageExternal.addListener(messageHandler)` (background.js L755-756). The listener is reachable from any origin listed in `externally_connectable`: `https://app.getmetastream.com/*`, `*://local.getmetastream.com/*`, `*://127.0.0.1/*`, `*://localhost/*`. Those are web origins, so a page running there (e.g. via XSS on the trusted app, or a local service) controls the message payload.

**(b) Exact source-to-sink path**
- L705: `isValidAction(action)` only checks that `action` is an object and `action.type` is a string (L81). It does **not** validate the payload.
- L708-712: an attacker first sends `{type:'metastream-init'}` from an allowed origin (`isMetastreamUrl(url)` passes for the fixed Metastream origins), causing `startWatchingTab(sender.tab)` and adding the tab to `watchedTabs`.
- L718: `if (!watchedTabs.includes(tabId)) return` is then satisfiable by that same tab.
- L724-727: `case 'metastream-fetch'` destructures `{ requestId, url, options } = acti

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L705:C21 -> L705:C27
- **Sink**: `CHROME_CONTENTSETTINGS_SET` in `background` [BG_1] @ L545:C6 -> L548:C8
- **Severity evidence**: ['https://app.getmetastream.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**1. Who controls the source?**
`chrome.runtime.onMessageExternal.addListener(messageHandler)` is registered at `background.js:755-757`. External messages are accepted from the manifest's `externally_connectable.matches`:
- `https://app.getmetastream.com/*`
- `*://local.getmetastream.com/*`
- `*://127.0.0.1/*`
- `*://localhost/*`

The message payload is fully controlled by that connecting web origin. `isValidAction` (`L81`) is only a weak type check: `typeof action === 'object' && typeof action.type === 'string'` — it does not constrain `action.payload`. So the tainted `action` is genuinely externally controlled.

**2. Exact source-to-sink path (confirmed in raw source):**
- `L705` `if (!isValidAction(action)) return` (weak type check only).
- `L720` `switch (action.type)` → `case 'metastream-permissions-request'` (`L738`) → `requestPermissions(action.payload)` (`L739`).
- `requestPermissions` (`L553-563`): `const { action, ...rest } = request`, calls `chrome.permissions.request(rest, …)`, then on `granted` calls `PERMISSION_ACTIONS[action](request)` (`L559`).
- `PERMISSION_ACTIONS.allowPopups` (`L538-551`): `chrome.contentSettings.popups.set({ primaryPatter

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #1 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `app` [CS_1] @ L60:C73 -> L60:C79
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L653:C34 -> L653:C68
- **Bridge**: message `runtime.single.sender.message[app->background]`
- **Severity evidence**: ['https://app.getmetastream.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Report — Flow #3 (REQUEST_FORGERY: page → content script → background `fetch(url)`)

### 1. Who controls the source
The source is `WINDOW_MESSAGE_EVENT` in `app.js` (content script, ISOLATED world), running on `https://app.getmetastream.com/*` (plus local dev origins). The content script registers `window.addEventListener('message', …)` at `app.js:57`. The only guards are:

- `event.origin !== location.origin` (app.js:58) — a page's **own** `postMessage` trivially satisfies this; the harness confirms this is not an unforgeable trust anchor (XSS/malicious script on the matched origin can drive it).
- `action.__internal` (app.js:60) — attacker-chosen; omitting it passes.
- `action.type.startsWith('metastream-')` (app.js:62) — attacker-chosen prefix.

So the message `data` is fully attacker-controllable at runtime on a matching origin.

### 2. Source-to-sink path (unbroken)
- `app.js:64` `chrome.runtime.sendMessage(action)` forwards the page message to the background (HOP: `runtime.single.sender.message[app->background]`).
- `background.js:753` `chrome.runtime.onMessage.addListener(messageHandler)`.
- `background.js:705` `isValidAction(action)` = `typeof action === 'ob

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #4 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / MEDIUM, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background` [BG_1] @ L705:C21 -> L705:C27
- **Sink**: `FETCH_RESOURCE` in `background` [BG_1] @ L653:C34 -> L653:C68
- **Severity evidence**: ['https://app.getmetastream.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I have enough evidence to decide. Let me lay out the four-part ledger.

**1. Who controls the source?**
The source is `action` in `messageHandler(action, sender, sendResponse)` registered on `chrome.runtime.onMessageExternal` (background.js L755-757). `action` is the raw message object from any externally-connected page. There is **no** `sender.id` check anywhere in the handler; the only per-action gate is `isValidAction` (L81), which is just `typeof action === 'object' && typeof action.type === 'string'`. That is attacker-satisfiable. `externally_connectable.matches` restricts the sender to `app.getmetastream.com`, `local.getmetastream.com`, `127.0.0.1`, `localhost` — a host restriction (hence MEDIUM), not an unforgeable trust boundary.

**2. Source-to-sink path**
- L705 `if (!isValidAction(action)) return` → passes.
- L720 `switch (action.type)` → case `'metastream-fetch'`.
- L725 `const { requestId, url, options } = action.payload` → attacker-chosen `url`.
- L726 `request(tabId, requestId, url, options)`.
- L616-653 `request()` → `fetch(url, { ...options, signal })` at L653 with **no URL validation**. The `isMetastreamUrl(url)` check at L708 applies only to the *sender tab URL* 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
