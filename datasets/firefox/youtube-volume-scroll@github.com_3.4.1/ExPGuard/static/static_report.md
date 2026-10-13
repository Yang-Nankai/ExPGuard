# ExPAgent Static Verification — youtube-volume-scroll@github.com v3.4.1

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.97, scope=1
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `index` [CS_1] @ L80:C12 -> L80:C23
- **Sink**: `CHROME_LOCAL_STORAGE` in `popup/popup` [OPTIONS_1] @ L58:C8 -> L58:C48
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: config, sender: index, receiver: popup/popup]`
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #6 (STORAGE_POSOING)

### (a) Who controls the source
The effective source is the `message` listener in the content script `index.js` (`init()`):

```js
window.addEventListener('message', e => {
    if (e.origin !== window.location.origin) return;
    ...
    } else if (
        e.data.type === 'YoutubeVolumeScroll-config-save' &&
        typeof e.data.config === 'object'
    ) {
        configFromPageAccess = e.data.config;
        browserApi.storage.sync.set({ config: e.data.config });
    }
});
```

`e.data.config` is attacker/page-controlled. The only checks are:

- `e.origin === window.location.origin` — this is not an authentication boundary for a page-to-content-script bridge. A script running in the YouTube page can trivially `window.postMessage(..., window.location.origin)`, satisfying the origin check.
- `typeof e.data.config === 'object'` — an attacker can supply any object; no schema or allow-list validation occurs.

So the source is genuinely untrusted at runtime.

### (b) Source-to-sink path
The path is real and unbroken:

1. `index.js` L85–L89: page `message` event `e.data.config` is written directly to `browserApi.storage.sync` under key `con

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `index` [CS_1] @ L80:C12 -> L80:C23
- **Sink**: `CHROME_SYNC_STORAGE` in `popup/popup` [OPTIONS_1] @ L73:C8 -> L73:C47
- **Bridge**: storage `STORAGE_FLOW[area: sync, key: config, sender: index, receiver: popup/popup]`
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `6`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #6 — STORAGE_POSOING

### 1. Source control (attacker-controllable?)

**Confirmed.** In `index.js` (content script, runs on `https://www.youtube.com/*`, `music.youtube.com/*`, `youtube-nocookie.com/embed/*`):

```js
window.addEventListener('message', e => {
    if (e.origin !== window.location.origin) return;
    if (e.data.type === 'YoutubeVolumeScroll-volume' && ...) {
        saveVolume(e.data.newVolume);
    } else if (
        e.data.type === 'YoutubeVolumeScroll-config-save' &&
        typeof e.data.config === 'object'
    ) {
        configFromPageAccess = e.data.config;
        browserApi.storage.sync.set({ config: e.data.config });   // L89
    }
});
```

The guards are exactly the bypassable class described in the harness:
- `e.origin !== window.location.origin` is a same-page origin check; a page (or injected/XSS script) calling `window.postMessage(msg, window.location.origin)` trivially satisfies it.
- `e.data.type === 'YoutubeVolumeScroll-config-save'` and `typeof e.data.config === 'object'` are checks on attacker-supplied message *fields*, not a trust anchor.
- There is no `sender.id` allowlist (this is not extension messaging), no fixed-truste

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
