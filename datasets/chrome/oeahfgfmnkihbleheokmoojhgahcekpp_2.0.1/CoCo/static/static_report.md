# ExPAgent Static Verification — oeahfgfmnkihbleheokmoojhgahcekpp v2.0.1

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 9  |  Verified: 2
- **Not reviewed due to analysis budget:** 7 flow(s): [3, 4, 5, 7, 0, 1, 8]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 3, 'REQUEST_FORGERY': 6}  |  Severities: {'UNKNOWN': 9}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 7 not reviewed due to the analysis budget.

---

## Flow #2 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `FETCH_RESPONSE` in `crx_headers/bg_header.js` [UNKNOWN] @ L12:C1 -> L12:C1
- **Sink**: `FETCH_RESOURCE` in `service_worker.js` [UNKNOWN] @ L30:C1 -> L30:C1
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'NETWORK_RESPONSE', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 6, 'omitted': 0}, 'propagation': "response.split('>') | myArray[2].replace('</div', '') | '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link) | params += '&path=' + where"}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #3 (REQUEST_FORGERY — FETCH_RESPONSE → FETCH_RESOURCE)

### Four-part decision ledger

**(a) Who controls the source?**
The reported source is `FETCH_RESPONSE` in `crx_headers/bg_header.js` (`responseText = 'data_from_fetch'`). That file **does not exist** in the unpacked CRX (`list_files()` shows no `crx_headers/`; the harness also reports `resolved: false`). It is a synthetic CoCo header, not real code.

The real source it corresponds to is the `findKey` fetch at `service_worker.js:195`:

```js
return fetch(settings.SelectPort + 'token.html', ...)
  .then(r => r.text())
  .then((response) => {
    const myArray = response.split('>')
    let token = myArray[2].replace('</div', '')
    ...
    f(token, cookie)
  })
```

`settings.SelectPort` defaults to `http://localhost:8080/gui/` and is only writable from the extension **options page** (`options/options.js`, via `document.querySelector('#SelectPort').value`, saved by a user blur event). There are **no content scripts** (`contentScripts: []`) and **no web `externally_connectable`** surface. A visited webpage therefore cannot supply, influence, or observe this token value — it is a response from the user's own

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #6 — ⚪ DUPLICATE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `FETCH_RESPONSE` in `crx_headers/bg_header.js` [UNKNOWN] @ L12:C1 -> L12:C1
- **Sink**: `FETCH_RESOURCE` in `service_worker.js` [UNKNOWN] @ L151:C1 -> L151:C1
- **Source report Flow ID**: `7`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'NETWORK_RESPONSE', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 6, 'omitted': 0}, 'propagation': "response.split('>') | myArray[2].replace('</div', '') | params = '?action=add-file&download_dir=0&token=' + token | params += '&path=' + where"}

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification: Flow #3 (REQUEST_FORGERY — FETCH_RESPONSE → FETCH_RESOURCE)

### Four-part d...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
