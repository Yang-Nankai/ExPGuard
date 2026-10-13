# ExPAgent Static Verification — jkmpbdjckkgdaopigpfkahgomgcojlpg v2.3.3

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'DATA_LEAK': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟢 FALSE POSITIVE  (DATA_LEAK / UNKNOWN, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `background.js` [BG_1] @ L315
- **Sink**: `WINDOW_POSTMESSAGE` in `background.js` [BG_1] @ L322

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I inspected the raw `background.js` around the external-message `getItem` handler that contains both the reported source and sink.

## Decision ledger

**(a) Source control / reachability**
The source is `chrome.storage.sync.get(key, cb)` inside:

```js
chrome.runtime.onMessageExternal.addListener((e, r, t) => {
  if (r.url && r.url.includes("appbox.space"))
    if ("supabase-auth-adapter" === e.source)
      switch (e.action) {
        case "getItem":
          const { key: r } = e.data;
          return chrome.storage.sync.get(r, (e => {
            ...
```

This is reachable from `https://appbox.space/*` (manifest `externally_connectable.matches`), and the guard is a substring `r.url.includes("appbox.space")` check, not a fixed `sender.id` allowlist. So the source is real and external-origin reachable.

**(b) Source-to-sink path**
The exact sink shown in the flow is the **error branch** of the storage callback:

```js
if (chrome.runtime.lastError) {
  const e = chrome.runtime.lastError.message;
  console.error("Storage error:", e), t({ status: "error", message: e });
} else {
  t({ status: "success", value: e[r] || null });
}
```

The storage-result callback parameter `e` is **s

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
