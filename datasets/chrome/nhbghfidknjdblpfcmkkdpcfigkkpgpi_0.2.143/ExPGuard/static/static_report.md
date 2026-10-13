# ExPAgent Static Verification — nhbghfidknjdblpfcmkkdpcfigkkpgpi v0.2.143

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 11  |  Verified: 3
- Coverage: node=0.184, scope=0.199
- Flow types: {'STORAGE_POSOING': 9, 'PRIVILEGE_ESCALATION': 2}  |  Severities: {'LOW': 1, 'HIGH': 10}

**Assessment:** Verified 3 flow(s): 2 true-positive, 0 false-positive, 0 partial-available (PA), 1 uncertain, 0 duplicate; 0 flagged triggerable for dynamic testing.

---

## Flow #1 — 🟡 UNCERTAIN  (STORAGE_POSOING / HIGH, confidence 0.30)

- **Source**: `WINDOW_MESSAGE_EVENT` in `js/customer_followups/alura-followup-listener` [CS_4] @ L1:C174 -> L1:C184
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.bundle` [BG_1] @ L2:C111168 -> L2:C111224
- **Bridge**: message `runtime.single.sender.message[js/customer_followups/alura-followup-listener->background.bundle]`
- **Severity evidence**: ['*://*.alura.io/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`CONTENT_SCRIPT`

**Reasoning:** Structured extraction unavailable; preserved analyst notes: Sorry, need more steps to process this request.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / HIGH, confidence 0.60)

- **Source**: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` in `background.bundle` [BG_1] @ L2:C120485 -> L2:C120486
- **Sink**: `CHROME_LOCAL_STORAGE` in `background.bundle` [BG_1] @ L2:C120600 -> L2:C120666
- **Severity evidence**: ['*://*.alura.io/*']
- **Source report Flow ID**: `3`
- **Provenance**: source=`EXTERNAL_MESSAGE`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: The primary evidence and the raw code confirm an unbroken external-message → storage-write path.

## Decision ledger

**(a) Who controls the source?**
The source is `chrome.runtime.onMessageExternal.addListener(function(e,n,t){...})` in the background service worker. The tainted span is the message payload `e`. The manifest's `externally_connectable.matches` is `*://*.alura.io/*`, so any page on an alura.io subdomain (or any page injected there via XSS/subdomain takeover) can send this message. The listener uses `e` and never validates `n` (the browser-supplied sender).

**(b) Source-to-sink path**
```
onMessageExternal listener (e)
  -> handleBridgeMessage(e,n,t) short-circuit (returns falsy for this command)
  -> e && "saveLoggedInToExtension" == e.command
  -> chrome.storage.local.set({loggedInCustomToken: e.data.customToken})
```
The exact sink is present in the resolved snippet:

```js
e&&"saveLoggedInToExtension"==e.command?(chrome.storage.local.set({loggedInCustomToken:e.data.customToken}),t({loggedInSave:"success"}))
```

**(c) Which security-relevant argument is attacker-controlled?**
The *stored value* itself — `e.data.customToken` — is written verbatim into `chrome.stora

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / LOW, confidence 0.60)

- **Source**: `ELEMENT_TEXT_CONTENT` in `content_ranking.bundle` [CS_5] @ L2:C4128 -> L2:C4146
- **Sink**: `CHROME_LOCAL_STORAGE` in `content_ranking.bundle` [CS_5] @ L2:C9384 -> L2:C9442
- **Severity evidence**: ['*://app.alura.io/research/keyword*']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification of Flow #1 — STORAGE_POSOING (ELEMENT_TEXT_CONTENT → chrome.storage.local)

### (a) Who controls the source?
The source is the `textContent` of `p[data-seller-name-container] .wt-screen-reader-only:not([aria-hidden="true"])` inside a listing card on the Alura keyword-research page. The content script runs only on:

- `*://app.alura.io/research/keyword*`
- `*://platform.alura.io/research/keyword*`

The value rendered there is the Etsy shop name (`From shop <name>`), i.e. third-party seller-controlled text rendered into the page DOM. In the content-script world the page DOM is web-influenceable surface (the harness confirms `PAGE_TO_CONTENT_SCRIPT` and that a page can mutate shared DOM values). Provenance is `CONTENT_SCRIPT`, which the tool treats as web taint rather than trusted extension-user input.

### (b) Source-to-sink path
The report's propagation is confirmed by the raw bundle:

1. Source (L2 C4128–4146):
   `var h = y.textContent.trim().match(/From shop\s+(.+)/i); h && (f = h[1].trim())`
2. The extracted shop name is placed in the returned listing object (L2 C4180+):
   `... shop_name: f, images: [...] ...`
3. That object array becomes the page data (`b = f(S

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
