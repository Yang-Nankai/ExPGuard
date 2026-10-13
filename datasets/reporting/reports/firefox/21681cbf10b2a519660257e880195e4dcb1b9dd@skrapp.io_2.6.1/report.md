# Security Vulnerability Report: High Telemetry Identity Injection and Page-Controlled Access-Key Injection in Skrapp Email Finder

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Skrapp Email Finder** (firefox, extension ID `21681cbf10b2a519660257e880195e4dcb1b9dd@skrapp.io`, version `2.6.1`).
The recorded issue type(s): **Telemetry Identity Injection; Page-Controlled Access-Key Injection**.

## Affected Extension Details

- Name: Skrapp Email Finder
- Platform: firefox
- Extension ID: `21681cbf10b2a519660257e880195e4dcb1b9dd@skrapp.io`
- Dataset version: `2.6.1`
- Store version at review: `2.6.1`
- Users: 1515
- Analysis tools: ExPGuard

## Findings

### Finding 1: Telemetry Identity Injection via Extension Storage

The content script on pages matching `*://*.skrapp.io/*` reads the `ph_phc_AWAqsmqqtv6DKmiDD9iWkZyqFAqCTAYivVqwYarjmury_posthog` cookie, parses its JSON `distinct_id`, and writes that value to `chrome.storage.local` as `posthog_distinct_id`. A page that can set the cookie can therefore choose the extension's telemetry identity. This demonstrates telemetry identity/state injection; the recorded Flow does not by itself show account access or account takeover.

- Ground Truth Flow: `gtf-43b24e2f3634cedd`
- Severity recorded by the analysis: **HIGH**
- Source: `DOCUMENT_COOKIE` (document.cookie) in keyContentScript.bundle at L1:C1705169 -> L1:C1705170
- Sink: `CHROME_LOCAL_STORAGE` (posthog_distinct_id) in keyContentScript.bundle at L1:C1706210 -> L1:C1706243
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
t?null:(A=>{try{if(!A)return null;const M
```

**Sink code anchor (excerpt):**

```javascript
D]===A)return;await chrome.storage.local.set({[D]:A})}catch{}})()},1e3),c
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/21681cbf10b2a519660257e880195e4dcb1b9dd@skrapp.io_2.6.1/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `2.6.1` and open a disposable page matching `*://*.skrapp.io/*`.
2. Set the named PostHog cookie to a URL-encoded JSON value containing only `distinct_id: "EXPGuard_test_marker"` (use the payload below).
3. Reload the page or wait for the content script's normal polling interval, then inspect extension local storage for `posthog_distinct_id`.

#### Proof-of-concept payload

```js
// Run on a disposable page matching the extension's content-script pattern.
// The value is a harmless test marker, not a real account identifier.
const cookieValue = encodeURIComponent(JSON.stringify({
  distinct_id: "EXPGuard_test_marker"
}));
document.cookie = "ph_phc_AWAqsmqqtv6DKmiDD9iWkZyqFAqCTAYivVqwYarjmury_posthog=" + cookieValue + "; path=/";
// Reload the page or trigger the extension's normal feature flow.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/21681cbf10b2a519660257e880195e4dcb1b9dd@skrapp.io_2.6.1/static/static_report.json`; dynamic report `not recorded`.

### Finding 2: Untrusted Access-Key Injection into Extension Storage

The content script on pages matching `*://*.skrapp.io/*` reads the value of the page DOM element `#access_key` and stores it as `accessKey` in `chrome.storage.sync`. A page script can create or change that element before the extension reads it, so page-controlled data enters extension-managed credential/configuration state. This Flow establishes storage injection; it does not establish that a real credential was disclosed or used.

- Ground Truth Flow: `gtf-45cbb4b6edaf07a6`
- Severity recorded by the analysis: **HIGH**
- Source: `ELEMENT_VALUE` (access_key) in keyContentScript.bundle at L1:C1705701 -> L1:C1705702
- Sink: `CHROME_SYNC_STORAGE` (accessKey) in keyContentScript.bundle at L1:C1705666 -> L1:C1705704
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
sync.set({accessKey:A});const{configSM:M}
```

**Sink code anchor (excerpt):**

```javascript
ow.clearInterval(u),chrome.storage.sync.set({accessKey:A});const{configSM:M}=a
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install version `2.6.1` and open a disposable page matching `*://*.skrapp.io/*`.
2. Before the content script reads the page, add the `#access_key` input with the benign marker shown below.
3. Inspect extension sync storage for `accessKey`; the stored value should match the page-controlled marker.

#### Proof-of-concept payload

```js
// Run on a page matching the extension's content-script URL pattern.
// This is a harmless marker, not a real access key.
const input = document.createElement("input");
input.id = "access_key";
input.value = "EXPGuard_test_marker";
document.body.appendChild(input);
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Generate or retrieve the analytics identifier in extension-owned state; do not use a page-set cookie as the authority for the extension's telemetry identity.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
