# ExPAgent Static Verification — zerodelay@joaogfc v1.5.0

- Browser: `firefox`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- Coverage: node=0.788, scope=0.804
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'MEDIUM': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / MEDIUM, confidence 0.60)

- **Source**: `TARGET_CUSTOM_EVENT` in `content` [CS_1] @ L143:C94 -> L143:C102
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L443:C37 -> L443:C66
- **Severity evidence**: ['https://www.youtube.com/*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 (`TARGET_CUSTOM_EVENT` → `chrome.storage.local.set`)

### Decision ledger

**(a) Who controls the source — ATTACKER (web page on youtube.com).**
The content script (`content.js`, isolated world) registers `document.addEventListener('_live_catch_up_video_meta', e => onChannelIdUpdate(common, e.detail))` on line 143. Custom DOM events are dispatched on the shared DOM, so a page-context script on `https://www.youtube.com/*` can fire this event with an arbitrary `detail.channel_id`. `event` action/type names are not authentication (per harness rules). The only surface restriction is the `matches: ["https://www.youtube.com/*"]` content-script constraint (hence MEDIUM severity, not CRITICAL).

**(b) Source-to-sink path — intact.**
- L143: `e.detail` → `onChannelIdUpdate(common, e.detail)`.
- L433: `const channelId = detail && detail.channel_id;` — attacker value extracted.
- L434: `if (!channelId || !extensionAlive()) return;` — only a truthiness/liveness guard; the attacker can satisfy it by supplying a non-empty string. `extensionAlive()` does not validate the value.
- L437–438: `const upd = {};` then `if (data[common.currentChannelIdKey] !== channelId) upd[c

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
