# ExPAgent Static Verification — cpjicfogbgognnifjgmenmaldnmeeeib v3.0.21

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 4  |  Verified: 2
- Coverage: node=0.323, scope=0.216
- Flow types: {'STORAGE_POSOING': 4}  |  Severities: {'MEDIUM': 4}

**Assessment:** Verified 2 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content_scripts` [CS_1] @ L38:C0 -> L96:C2
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L107:C10 -> L107:C57
- **Bridge**: message `runtime.single.sender.message[content_scripts->background]`, storage `STORAGE_FLOW[area: local, key: gaea_plugin_token, sender: background, receiver: background]`
- **Severity evidence**: ['https://api.aigaea.net/*']
- **Source report Flow ID**: `2`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've confirmed the full chain in raw source. The report and the harness agree; the bridge connects.

## Four-part decision ledger

**(a) Who controls the source?**
A webpage on `https://api.aigaea.net/*` or `https://app.aigaea.net/*`. The content script (`content_scripts.js`) is injected into those origins (ISOLATED world, but DOM `CustomEvent` dispatch from page scripts is still delivered to the isolated-world listener). It listens for a forgeable page event:

```js
window.addEventListener("requestPluginVersion", (event) => {
  if (event.detail.type === "REQUEST_PLUGIN_VERSION") {
    ...
    if (event.detail.token) {
      chrome.runtime.sendMessage({ gaea_plugin_token: event.detail.gaea_plugin_token });
      chrome.runtime.sendMessage({ gaea_plugin_status: event.detail.gaea_plugin_status });
```

The `type` check and `token` check are attacker-chosen fields — the page controls every field in `event.detail`, including `gaea_plugin_token`.

**(b) Exact source-to-sink path**
`event.detail.gaea_plugin_token` → `chrome.runtime.sendMessage({ gaea_plugin_token: ... })` (content script, L52) → background `chrome.runtime.onMessage` (L38) → `tokenInfo = request["gaea_plugin_token"]` (L44

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #3 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `WINDOW_CUSTOM_EVENT` in `content_scripts` [CS_1] @ L38:C0 -> L96:C2
- **Sink**: `CHROME_LOCAL_STORAGE` in `background` [BG_1] @ L103:C10 -> L103:C58
- **Bridge**: message `runtime.single.sender.message[content_scripts->background]`, storage `STORAGE_FLOW[area: local, key: gaea_plugin_status, sender: background, receiver: background]`
- **Severity evidence**: ['https://api.aigaea.net/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`UNTRUSTED_STORAGE`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #3 (`STORAGE_POSOING`)

### (a) Who controls the source?
**Untrusted web content on the content-script host.** The content script is registered on `https://app.aigaea.net/*` and `https://api.aigaea.net/*`. The bridge is `window.addEventListener("requestPluginVersion", …)` in `content_scripts.js` (L40). A page script on those domains can dispatch:

```js
new CustomEvent("requestPluginVersion", {
  detail: { type: "REQUEST_PLUGIN_VERSION", token: "x", gaea_plugin_status: "EVIL" }
})
```

Both gates are attacker-satisfiable:
- L41 `event.detail.type === "REQUEST_PLUGIN_VERSION"` — attacker-chosen field.
- L50 `if (event.detail.token)` — attacker-chosen truthiness.

L53 then forwards `event.detail.gaea_plugin_status` to the background via `chrome.runtime.sendMessage`. The harness explicitly states page-forged `CustomEvent` fields are not authentication. So the source is genuinely attacker-controllable.

### (b) Source-to-sink path
1. `content_scripts.js` L40–53: page `CustomEvent` → `chrome.runtime.sendMessage({ gaea_plugin_status: event.detail.gaea_plugin_status })`.
2. `background.js` L38–49: `chrome.runtime.onMessage` → `if (request["gaea_plugin_status"])` → `

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
