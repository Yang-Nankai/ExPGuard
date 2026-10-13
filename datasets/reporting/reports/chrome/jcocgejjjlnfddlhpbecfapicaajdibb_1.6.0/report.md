# Security Vulnerability Report: High CSRF via Privileged Network Request in Bark for Chrome

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Bark for Chrome** (chrome, extension ID `jcocgejjjlnfddlhpbecfapicaajdibb`, version `1.6.0`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

The store currently reports version `1.7.0`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Bark for Chrome
- Platform: chrome
- Extension ID: `jcocgejjjlnfddlhpbecfapicaajdibb`
- Dataset version: `1.6.0`
- Store version at review: `1.7.0`
- Users: 100000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L3:C6 -> L3:C22 to the privileged sink `FETCH_BODY` (https://urls.bark.us) in monitor at L11:C9 -> L17:C4. The source scope is on pages matching `https://gemini.google.com/*, https://*.canva.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0ae58e7804c4a7ee`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content at L3:C6 -> L3:C22
- Sink: `FETCH_BODY` (https://urls.bark.us) in monitor at L11:C9 -> L17:C4
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_BODY`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `UNCERTAIN`, confidence 0; report `extensions/jcocgejjjlnfddlhpbecfapicaajdibb_1.6.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/jcocgejjjlnfddlhpbecfapicaajdibb_1.6.0/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.6.0` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jcocgejjjlnfddlhpbecfapicaajdibb_1.6.0/static/static_report.json`; dynamic report `extensions/jcocgejjjlnfddlhpbecfapicaajdibb_1.6.0/dynamic/dynamic_report.json`.


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
