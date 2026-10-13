# ExPAgent Static Verification — hpjofgdodgbgelploffffpacpdpbnljg v1.1.1

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [0]
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1, 'PRIVILEGE_ESCALATION': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #1 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background.js` [UNKNOWN] @ L110:C1 -> L110:C1
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background.js` [UNKNOWN] @ L70:C1 -> L70:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `2`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 3, 'omitted': 0}, 'propagation': 'encodeURIComponent(url)'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #2 — IPTV Player `playStream` external message → `chrome.tabs.create`

### 1. Source controllability
The source is `chrome.runtime.onMessageExternal.addListener` in `js/background.js`. The listener is registered at L104 and the `playStream` branch is:

```js
} else if (request.action === 'playStream' && request.url) {
    openStreamInPlayer(request.url);
```

`request.url` is a free-form string chosen by whoever sends the external message. It is genuinely attacker/untrusted-controllable at runtime.

Reachability is constrained by the manifest `externally_connectable.matches: ["*://*.iptvplayer.stream/*"]`, so only a page on `iptvplayer.stream` (or any subdomain) can invoke the listener — no fixed-ID `sender.id` allowlist exists. Per the given trust rules, a specific-host externally_connectable surface is still exploitable via XSS on the trusted domain or a subdomain takeover. The extension even ships `js/website-connector.js`, which hardcodes the extension ID (`lljjhhjbbppcbfbhmflgjhloagchmijo`) and the exact payload shape `{ action: 'playStream', url: streamUrl }`, confirming this is the intended web→extension bridge.

### 2. Source → sink path (unbroken)
-

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
