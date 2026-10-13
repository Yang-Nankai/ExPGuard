# ExPAgent Static Verification — nglbhlefjhcjockellmeclkcijildjhi v3.1.2

- Browser: `chrome`
- LLM: `deepseek` / `deepseek-flash`
- Flows in report: 3  |  Verified: 3
- Coverage: node=0.99, scope=1
- Flow types: {'STORAGE_POSOING': 1, 'DOM_XSS': 2}  |  Severities: {'CRITICAL': 1, 'LOW': 2}

**Assessment:** Verified 3 flow(s): 2 true-positive, 1 false-positive, 0 partial-available (PA), 0 uncertain, 0 duplicate; 3 flagged triggerable for dynamic testing.

---

## Flow #0 — 🔴 TRUE POSITIVE  (STORAGE_POSOING / CRITICAL, confidence 0.60)

- **Source**: `DOCUMENT_TITLE` in `content` [CS_1] @ L94:C153 -> L94:C162
- **Sink**: `CHROME_LOCAL_STORAGE` in `content` [CS_1] @ L94:C16 -> L94:C164
- **Severity evidence**: ['<all_urls>']
- **Source report Flow ID**: `1`
- **Provenance**: source=`CONTENT_SCRIPT`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification — Flow #1 (STORAGE_POSOING, DOCUMENT_TITLE → chrome.storage.local)

**Four-part ledger**

**(a) Who controls the source.** `content.js:88` — `const pageTitle = document.title;`. `document.title` is the current page's title, fully controllable by any page the content script runs on. The manifest registers this content script on `matches: ["<all_urls>"]` (with only lingualeo/slack/atlassian excluded), `runAt: document_start`. So *any* arbitrary web page (e.g. `https://attacker.example`) can set `<title>PAYLOAD</title>` and thereby drive this source. Source provenance = `CONTENT_SCRIPT` / web content — confirmed attacker-controllable.

**(b) Source → sink path.** `content.js:88` `pageTitle = document.title` → `content.js:94` `chrome.storage.local.set({…, pageTitle})`. `detectLanguage()` is invoked at load (`L108`, gated only by the user's own `autoLang` feature toggle — not a trust boundary) and via `chrome.runtime.onMessage` (`L111`). The propagation report shows the single direct ASSIGN into the storage write; there is **no intermediate hop, no overwrite, and `pageTitle` is never sanitized** (the `.replace(/^\s+/g,'')` is applied to `pageContent.textContent`, not to 

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `DOM_INPUT`)

---

## Flow #1 — 🟢 FALSE POSITIVE  (DOM_XSS / LOW, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `content` [CS_1] @ L280:C28 -> L280:C42
- **Sink**: `DOM_INNER_HTML` in `content` [CS_1] @ L281:C32 -> L281:C41
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNKNOWN`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: I've reviewed the propagation report, the manifest, and the surrounding source (`content.js` L108‑113, L144‑176, L237‑325, L351‑430). Here is my verification.

## Four‑part decision ledger

**(a) Who controls the source?** The source is the storage read `const { currentContext } = settings;` (content.js L280, inside `translateContext`). `currentContext` is written to `chrome.storage.local` in only two places, both inside the *same* content script:
- L365 `chrome.storage.local.set({currentContext: rawContext})` — `rawContext` = Google‑Docs `textContent` slice,
- L425 `chrome.storage.local.set({currentContext: formattedContext})` — `formattedContext` = `document.body.innerText` sentence slice.

The only other writer is `background.js:59`, which writes `currentContextTranslation` (a different key). There is no `externally_connectable` in the manifest, and the content‑script `onMessage` listener (L110‑113) only acts on `msg.selectedText`/`msg.tabChanged` to *trigger* `showTranslate()` — it does not let any message supply `currentContext`. So the stored value is the current page's own text, produced by the content script from the current page's DOM.

**(b) Exact source→sink path.** L280

**Attacker control:** See preserved static analyst transcript.

**Why false positive:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---

## Flow #2 — 🔴 TRUE POSITIVE  (DOM_XSS / LOW, confidence 0.60)

- **Source**: `STORAGE_ALL_ITEMS` in `content` [CS_1] @ L280:C28 -> L280:C42
- **Sink**: `DOM_INNER_HTML` in `content` [CS_1] @ L318:C36 -> L318:C45
- **Source report Flow ID**: `4`
- **Provenance**: source=`UNKNOWN`, sender=`?`

**Reasoning:** Structured extraction unavailable; explicit analyst conclusion preserved from the final static transcript: ## Verification Ledger

**(a) Who controls the source (STORAGE_ALL_ITEMS → `currentContext`)**

The report flags `chrome.storage.local.get(null, …)` at L280 as a `STORAGE_ALL_ITEMS` source (provenance UNKNOWN). I confirmed *where the stored value comes from*, because a storage read is only tainted if attacker data was written into it:

- `content.js:365` — `chrome.storage.local.set({currentContext: rawContext})`, where `rawContext = textContent.slice(...)`.
- `content.js:425` — `chrome.storage.local.set({currentContext: formattedContext})`, where both are built from `bodyText = document.body.innerText`.

So `currentContext` is populated by the **content script itself from page-supplied text** (`document.body.innerText` / Google-Docs text). On any page matching `<all_urls>`, that text is attacker-influenced (a hostile page, or an HTML-escaped/stored payload on a third-party site that the victim selects/translates). Stored value is therefore genuinely untrusted.

**(b) The exact source → sink path**

- Write: L363–365 / L423–425 store page text into `currentContext`.
- Read: L272 `const { … currentContext … } = settings;` and L280 `const { currentContext } = settings;`.
- Sink 1: L28

**Attacker control:** See preserved static analyst transcript.

**Confirmed path:** See preserved static analyst transcript.

**Dynamic-test guidance** (triggerable: yes, mechanism: `OTHER`)

---
