# ExPAgent Static Verification — nemlggkoddlonfakhdkllifcgaeohkoi v1.10

- Browser: `edge`
- LLM: `deepseek` / `deepseek-v4-pro`
- Flows in report: 9  |  Verified: 2
- **Not reviewed due to analysis budget:** 7 flow(s): [3, 4, 5, 8, 0, 1, 6]
- Coverage: node=0, scope=0
- Flow types: {'DATA_LEAK': 3, 'REQUEST_FORGERY': 6}  |  Severities: {'UNKNOWN': 9}

**Assessment:** Verified 2 flow(s): 0 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 1 duplicate; 0 flagged triggerable for dynamic testing; 7 not reviewed due to the analysis budget.

---

## Flow #2 — 🟢 FALSE POSITIVE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `FETCH_RESPONSE` in `crx_headers/bg_header.js` [UNKNOWN] @ L12:C1 -> L12:C1
- **Sink**: `FETCH_RESOURCE` in `service_worker.js` [UNKNOWN] @ L29:C1 -> L29:C1
- **Source report Flow ID**: `3`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'NETWORK_RESPONSE', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 5, 'omitted': 0}, 'propagation': "response.split('>') | myArray[2].replace('</div', '') | params = '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link)"}

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow #3 verification — FETCH_RESPONSE `token` → `fetch()` (REQUEST_FORGERY)

### (a) Who controls the source?

The reported source file `crx_headers/bg_header.js` is **not resolvable** in the unpacked extension (the harness also flags this). It is a CoCo synthetic header, not real extension code. Tracing the actual runtime source:

- `service_worker.js:230` — `fetch(settings.s_port + 'token.html')`
- `service_worker.js:234-236` — `return response.text()`
- `service_worker.js:248-249` — `const myArray = response.split('>')`, `let token = myArray[2].replace('</div','')`

So the "FETCH_RESPONSE" source is the response body of a request to the **user-configured uTorrent Web UI** (`token.html`), i.e. the uTorrent CSRF token.

`settings.s_port` is not attacker-controllable:
- It is set only in `options.js:20-21` as `'http://localhost:' + SelectPort.value + '/gui/'` from the extension options page (user input).
- It defaults to `http://localhost:8080/gui/` (`service_worker.js:5`).
- There are **no content scripts** (`contentScripts: []`), **no web-page external messaging** (`externally_connectable: null` → web pages cannot send external messages), and **no message handler writes `setti

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---

## Flow #7 — ⚪ DUPLICATE  (REQUEST_FORGERY / UNKNOWN, confidence 0.60)

- **Source**: `FETCH_RESPONSE` in `crx_headers/bg_header.js` [UNKNOWN] @ L12:C1 -> L12:C1
- **Sink**: `FETCH_RESOURCE` in `service_worker.js` [UNKNOWN] @ L186:C1 -> L186:C1
- **Source report Flow ID**: `8`
- **Source-report evidence metadata**: {'tool': 'coco', 'sourceCapability': 'NETWORK_RESPONSE', 'sinkCapability': 'NETWORK_SEND', 'flowMeta': {'totalSteps': 6, 'omitted': 0}, 'propagation': "response.split('>') | myArray[2].replace('</div', '') | params = '?action=add-file&download_dir=0&token=' + token | params += '&path=' + where"}

**Reasoning:** Semantically identical to flow #2. Inherited analysis: Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Flow #3 verification — FETCH_RESPONSE `token` → `fetch()` (REQUEST_FORGERY)

### (a) Who c...

**Attacker control:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: no, mechanism: `OTHER`)

---
