# ExPAgent Static Verification — lppmekppnliemjclknbagdhoocikieoi v1.8.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 3
- Coverage: node=0.532, scope=0.59
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'HIGH': 4}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content-scripts/content` [CS_1] @ L1:C7072 -> L1:C7080
- **Sink**: `CHROME_LOCAL_STORAGE` in `content-scripts/content` [CS_1] @ L1:C6886 -> L1:C6914
- **Severity evidence**: ['*://*.kick.com/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source — CONFIRMED page-controlled.**
The source is `window.addEventListener("seventv:account-token:set", V)` in the content script, and `V` runs `K(e)` which does `JSON.parse(e.detail)`. I confirmed the constants in `content-scripts/content.js`:

```js
A = "7tv.account.token"
N = "seventv:account-token:set"
...
V = e => { let t = K(e); if (t) { if (!t.token || !L(t.token)) { q(t.requestId, false); return } G(t.token).then(...) } }
```

`K` only checks `e instanceof CustomEvent` and `typeof e.detail === "string"`. There is **no `event.origin`/`event.source` check** on this path (the separate `message` listener `z` checks `e.origin === "https://7tv.app"`, but that is a different listener, not the flagged CustomEvent path). The content script runs on `*://*.kick.com/*` and `*://*.twitch.tv/*`, so a page on those origins (or XSS there) can dispatch the CustomEvent. The harness classifies this as `PAGE_TO_CONTENT_SCRIPT` and states CustomEvent fields are page-forgeable; the extension's own page-side `site.js` uses the same `seventv:account-token:*` window-event vocabulary, corroborating the cross-world bridge.

**(b) Source-to-sink path — 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content-scripts/content` [CS_1] @ L1:C4025 -> L1:C4033
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L5:C16443 -> L5:C16471
- **Bridge**: message `runtime.single.sender.message[content-scripts/content->background]`
- **Severity evidence**: ['*://*.kick.com/*']
- **Source report Flow ID**: `4`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I verified the full chain from the page-dispatched `CustomEvent` through the content-script → background runtime message into `chrome.storage.local.set`, and inspected the actual source to confirm the bridge and the sink argument.

## Decision ledger

**(a) Who controls the source?**
Untrusted web content. The content script (`content-scripts/content.js`) runs on `*://*.kick.com/*` and `*://*.twitch.tv/*` at `document_start` in the ISOLATED world and registers:

```js
function w(){
  b||=(x=e=>{
    if(!(e instanceof CustomEvent))return;
    let n=me(e.detail);
    n&&t.runtime.sendMessage({type:`seventv:service-status`,...n})
      .then(e=>S(n.id,e))
      .catch(()=>S(n.id,{status:null,dismissed:!1}))
  }, window.addEventListener(v,x), window.addEventListener(`pagehide`,C), !0)
}
```

with `v = "seventv:service-status"`. A page script (or any XSS on those domains) can dispatch a `CustomEvent` whose `detail` is attacker-chosen. `me()` only requires `JSON.parse` to yield `id` string, `op === "dismiss"`, and `outageKey` string; it then forwards those exact fields:

```js
if(t.op===`dismiss`&&typeof t.outageKey==`string`)
  return{id:t.id,op:`dismiss`,outageKey:t.outageKey}
```

So 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `content-scripts/content` [CS_1] @ L1:C4463 -> L1:C4470
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L5:C16443 -> L5:C16471
- **Bridge**: message `runtime.single.sender.message[content-scripts/content->background]`
- **Severity evidence**: ['*://*.kick.com/*']
- **Source report Flow ID**: `5`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
