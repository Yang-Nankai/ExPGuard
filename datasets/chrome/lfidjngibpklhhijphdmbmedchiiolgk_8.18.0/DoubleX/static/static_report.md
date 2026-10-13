# ExPAgent Static Verification — lfidjngibpklhhijphdmbmedchiiolgk v8.18.0

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=1.0, scope=1.0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 0 true-positive, 0 false-positive, 1 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🟠 PARTIAL / PA  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `WINDOW_MESSAGE_EVENT` in `background.js` [BG_1] @ L275
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.js` [BG_1] @ L276

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow 0 (STORAGE_POSOING)

### Four-part decision ledger

**(a) Who controls the source?**
The reported source is `WINDOW_MESSAGE_EVENT` at `background.js:275`. That anchor does not resolve:
- There is no `background.js` in the extension (manifest declares `background.serviceWorker: filterUrl.js`).
- `filterUrl.js` is a single minified line and contains **no** `addEventListener(` / `onmessage` window listener at all (`search_code("addEventListener\(")` → NO MATCHES).
- The **actual** external-input surface is `chrome.runtime.onMessageExternal.addListener(...)` in `filterUrl.js` (line 1, columns ~9680–10900). So the real source is an *external extension/IWA message*, not a window message.

This source is reachable **only** by:
- the fixed companion extension `ppkfnjlimknmjoaemnpidmdlfchhehel` (via `externally_connectable.ids`), or
- an Isolated Web App at `isolated-app://ckg65ilaae42o6wd3uj4xfwznhba7pz2p6kojga5c27hkwq5f66qaaic` (via `externally_connectable.matches`).

An ordinary webpage cannot send this message: `externally_connectable.matches` is an `isolated-app://` origin (not `<all_urls>`/`*`), and `ids` is a fixed extension ID.

**(b) Exact source-to-sink pat

**Attacker control:** See preserved static analyst transcript.

**Why partially available:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
