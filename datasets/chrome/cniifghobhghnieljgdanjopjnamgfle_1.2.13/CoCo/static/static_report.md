# ExPAgent Static Verification — cniifghobhghnieljgdanjopjnamgfle v1.2.13

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 1  |  Verified: 1
- Coverage: node=0, scope=0
- Flow types: {'STORAGE_POSOING': 1}  |  Severities: {'UNKNOWN': 1}

**Assessment:** Verified 1 flow(s): 1 true-positive, 0 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / UNKNOWN, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.bundle.js` [UNKNOWN] @ L2:C1 -> L2:C1
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.bundle.js` [UNKNOWN] @ L2:C1 -> L2:C1
- **Bridge**: message `None`
- **Source report Flow ID**: `1`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'ATTACKER_INPUT', 'sinkCapability': 'STORAGE_WRITE', 'flowMeta': {'totalSteps': 1, 'omitted': 0}, 'propagation': ''}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → `CHROME_LOCAL_STORAGE`

### Four-part ledger

**1. Who controls the source?**
Attacker-controllable web origin, restricted by `externally_connectable.matches` to `https://blerp.com/*` and `https://webbeta.blerp.com/*`. Any page/XSS on those origins can send `chrome.runtime.sendMessage(<extension-id>, {...})`, and the background listener reads the untrusted message fields directly. This is `ATTACKER_INPUT`, not an extension-owned surface.

**2. Exact source-to-sink data path?**
Confirmed from `background.bundle.js` (minified, but I inspected the actual surrounding ranges):

Source listener (`onMessageExternal`):
```js
chrome.runtime.onMessageExternal.addListener((function(t,e,o){
  return console.log("Received external message:",t.type),
    "initialSignIn" === t.type && t.accessToken && (
      (0, r.setGlobalCacheJwt)(t.accessToken, t.refreshToken),
      o({success:!0})
    ), !0
}))
```

Sink function (`setGlobalCacheJwt`):
```js
e.setGlobalCacheJwt = function(t, e) {
  var o, r;
  if (a.jwt = t, a.refreshToken = e,
      (("undefined" != typeof chrome || "undefined" != typeof browser) &&
       (chrome?.storage |

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
