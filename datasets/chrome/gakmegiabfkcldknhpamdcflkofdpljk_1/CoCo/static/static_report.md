# ExPAgent Static Verification — gakmegiabfkcldknhpamdcflkofdpljk v1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 25  |  Verified: 1
- **Not reviewed due to analysis budget:** 23 flow(s): [23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 13]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 21, 'UNKNOWN': 2, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'UNKNOWN': 25}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 23 not reviewed due to the analysis budget.

---

## Flow #22 — 🔴 TRUE POSITIVE  (PRIVILEGE_ESCALATION / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background.js` [UNKNOWN] @ L125:C1 -> L125:C1
- **Sink**: `CHROME_TABS_CREATE_OPTIONS` in `js/background.js` [UNKNOWN] @ L125:C1 -> L125:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `23`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'PRIVILEGED_OPERATION', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow verification

**Evidence inspected**
- `js/background.js:103-106` registers the source:
  ```js
  chrome.runtime.onMessageExternal.addListener(async (request, sender, sendResponse) => {
      listener(request, sender, sendResponse);
      return true;
  });
  ```
- `listener()` switches on `request.event`:
  ```js
  case EVENTS.OPEN_NEW_TAB:
      chrome.tabs.create({
          url: request.url
      });
      break;
  ```
- `EVENTS.OPEN_NEW_TAB` is `'open_new_tab'` (`js/background.js:19`).
- No `sender.id`, `sender.origin`, `sender.url`, or action/URL allow-list/validation is applied before `request.url` reaches the sink.

**Four-part ledger**
1. **Source control:** `request.url` comes from an `onMessageExternal` message body. There is no browser-authenticated fixed `sender.id` allow-list, so the request fields are attacker-controlled by any sender that can reach this listener.
2. **Path:** `onMessageExternal` → `listener(request, ...)` → `switch(request.event)` → `EVENTS.OPEN_NEW_TAB` → `chrome.tabs.create({ url: request.url })`. The tainted span is used directly.
3. **Security-relevant argument:** `request.url` is the operative `url` option of `chrome.tabs.create`, a pri

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
