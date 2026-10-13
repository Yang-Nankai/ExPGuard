# ExPAgent Static Verification — iedifognpinkpfaemlnnniomklocpcnh v2.4

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 2  |  Verified: 1
- **Not reviewed due to analysis budget:** 1 flow(s): [1]
- Coverage: node=0, scope=0
- Flow types: {'REQUEST_FORGERY': 1, 'UNKNOWN': 1}  |  Severities: {'UNKNOWN': 2}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing; 1 not reviewed due to the analysis budget.

---

## Flow #0 — 🔴 TRUE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `js/background.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Sink**: `FETCH_RESOURCE` in `js/background.js` [UNKNOWN] @ L1:C1 -> L1:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 4, 'omitted': 0}, 'propagation': 't.media_id | e="https://www.instagram.com/api/v1/media/"+t.media_id+"/comments/?can_support_threading=true&permalink_enabled=false"'}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've located the exact code in the minified `js/background.js`. Let me summarize the analysis.

## (a) Who controls the source

The listener is `chrome.runtime.onMessageExternal.addListener(async(t,e,n)=>{var i,o,r=t.payload; ...})`. This fires for messages from any origin allowed by `externally_connectable.matches: ["https://*.app-sorteos.com/*"]`.

- The handler destructures `r = t.payload` and, in the `"comments"` branch, does `t = r`, then reads `t.media_id` and `t.min_id`.
- There is **no `sender.id` check and no `sender.url`/`sender.origin` check** anywhere in the handler; `e` (the sender) is never inspected.
- The `t.type === "comments"` check is an attacker-chosen message field, not a trust anchor.

So the source is genuinely attacker-controllable (a page on `*.app-sorteos.com`, or any XSS on that domain, can send a crafted message). The specific-host externally_connectable reduces scope but does not eliminate it.

## (b) Source-to-sink path

The exact code (minified, `js/background.js:1`, columns ~1900-2100):

```js
t && "comments" === t.type) {
  t = r; var a = n;
  let e = "https://www.instagram.com/api/v1/media/" + t.media_id + "/comments/?can_support_threading=true&per

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
