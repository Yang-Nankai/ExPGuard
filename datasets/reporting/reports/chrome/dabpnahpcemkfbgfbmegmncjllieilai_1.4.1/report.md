# Security Vulnerability Report: Critical CSRF via Privileged Network Request in Showdex

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Showdex** (chrome, extension ID `dabpnahpcemkfbgfbmegmncjllieilai`, version `1.4.1`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

The store currently reports version `1.4.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Showdex
- Platform: chrome
- Extension ID: `dabpnahpcemkfbgfbmegmncjllieilai`
- Dataset version: `1.4.1`
- Store version at review: `1.4.2`
- Users: 80000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C4774 -> L1:C4775 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in background at L1:C3928 -> L1:C4086. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a4e4c88d6b397a4d`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in background at L1:C4774 -> L1:C4775
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in background at L1:C3928 -> L1:C4086
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/dabpnahpcemkfbgfbmegmncjllieilai_1.4.1/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/dabpnahpcemkfbgfbmegmncjllieilai_1.4.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.4.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/dabpnahpcemkfbgfbmegmncjllieilai_1.4.1/static/static_report.json`; dynamic report `extensions/dabpnahpcemkfbgfbmegmncjllieilai_1.4.1/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `updated_still_detected`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
