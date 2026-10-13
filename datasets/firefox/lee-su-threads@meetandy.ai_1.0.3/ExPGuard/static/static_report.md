# ExPAgent Static Verification — lee-su-threads@meetandy.ai v1.0.3

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.973, scope=1
- Flow types: {'STORAGE_POSOING': 2}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content` [CS_1] @ L1:C1640 -> L1:C1674
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L1:C575 -> L1:C612
- **Bridge**: message `runtime.single.sender.message[content->background]`, storage `STORAGE_FLOW[area: local, key: profileCache, sender: background, receiver: background]`
- **Severity evidence**: ['https://www.threads.com/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification — STORAGE_POISONING (attacker-input → `chrome.storage.local.set`)

### (a) Who controls the source
The real data origin is the page-controlled `CustomEvent` `"threads-profile-extracted"`. In `content.js` (isolated world):

```js
window.addEventListener("threads-profile-extracted", e => {
  let t = e.detail;
  t && t.username && (f.set(t.username, t),
    z.runtime.sendMessage({ type: "PROFILE_INFO_EXTRACTED", data: t }), W(t, f))
});
```

`injected.js` (page MAIN world) dispatches this event from intercepted Threads API responses, but that is irrelevant to the trust boundary: **any script running in the threads.com page context can dispatch the same event directly** with an arbitrary `detail` object. There is no `event.source`/`origin` check, no `sender.id` check, and no field allow-list. Per the harness, CustomEvent fields are page-forgeable.

### (b) Exact source-to-sink path
1. Page (attacker) → `window.dispatchEvent(new CustomEvent("threads-profile-extracted", { detail: <attacker> }))`.
2. `content.js` `window.addEventListener("threads-profile-extracted", ...)` reads `e.detail` and forwards the whole object: `z.runtime.sendMessage({type:"PROFILE_INFO_EXTRAC

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
