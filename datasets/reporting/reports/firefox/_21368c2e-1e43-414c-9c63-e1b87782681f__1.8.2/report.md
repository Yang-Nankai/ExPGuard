# Security Vulnerability Report: Medium CSRF via Privileged Network Request and Unauthorized Browser Policy Change in Locoloader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **3 Flow(s)** in **Locoloader** (firefox, extension ID `{21368c2e-1e43-414c-9c63-e1b87782681f}`, version `1.8.2`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Browser Policy Change**.

The store currently reports version `1.8.5`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Locoloader
- Platform: firefox
- Extension ID: `{21368c2e-1e43-414c-9c63-e1b87782681f}`
- Dataset version: `1.8.2`
- Store version at review: `1.8.5`
- Users: 12262
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L30:C12 -> L30:C31 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L608:C35 -> L608:C51. The source scope is on pages matching `https://www.locoloader.com/*, https://www.locoloader.test/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-126f67dff1a3d3b1`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L30:C12 -> L30:C31
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L608:C35 -> L608:C51
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
;

function randomChars() {
    const CHARS = 'ABCDEFGHIJKL
```

**Sink code anchor (excerpt):**

```javascript
st response = await fetch(scriptUrl);
            if (re
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 3

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{21368c2e-1e43-414c-9c63-e1b87782681f}_1.8.2/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{21368c2e-1e43-414c-9c63-e1b87782681f}_1.8.2/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{21368c2e-1e43-414c-9c63-e1b87782681f}_1.8.2/static/static_report.json`; dynamic report `extensions/{21368c2e-1e43-414c-9c63-e1b87782681f}_1.8.2/dynamic/dynamic_report.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L30:C12 -> L30:C31 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L918:C34 -> L918:C102. The source scope is on pages matching `https://www.locoloader.com/*, https://www.locoloader.test/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-775f0fc2f2422425`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L30:C12 -> L30:C31
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L918:C34 -> L918:C102
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
;

function randomChars() {
    const CHARS = 'ABCDEFGHIJKL
```

**Sink code anchor (excerpt):**

```javascript
tchResponse = await fetch(message.url, message.fetchOptions ? message.fetchOptions : {});
        } catch (e
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 3

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 3: Unauthorized Browser Policy Modification

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L30:C12 -> L30:C31 to the privileged sink `CHROME_DECLARATIVENETREQUEST_RULES` in background at L1032:C10 -> L1042:C6. The source scope is on pages matching `https://www.locoloader.com/*, https://www.locoloader.test/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c8ef31db16526654`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L30:C12 -> L30:C31
- Sink: `CHROME_DECLARATIVENETREQUEST_RULES` in background at L1032:C10 -> L1042:C6
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
;

function randomChars() {
    const CHARS = 'ABCDEFGHIJKL
```

**Sink code anchor (excerpt):**

```javascript
P header.
    await chrome.declarativeNetRequest.updateSessionRules({
        addRules: [
            {
                id: headerInfo.id,
                priority: 1,
                action,
                condition,
            },
        ],
        removeRuleIds: [headerInfo.id],
    });

    // Return hea
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_DECLARATIVENETREQUEST_RULES`; candidate matches: 1

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.2` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
