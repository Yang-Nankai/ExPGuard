# Security Vulnerability Report: High CSRF via Privileged Network Request in AppSorteos - Sorteos, Insights para Instagram

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **AppSorteos - Sorteos, Insights para Instagram** (chrome, extension ID `iedifognpinkpfaemlnnniomklocpcnh`, version `2.4`).
The recorded issue type(s): **CSRF via Privileged Network Request**.

## Affected Extension Details

- Name: AppSorteos - Sorteos, Insights para Instagram
- Platform: chrome
- Extension ID: `iedifognpinkpfaemlnnniomklocpcnh`
- Dataset version: `2.4`
- Store version at review: `2.4`
- Users: 300000
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L1:C438 -> L1:C439 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in js/background at L1:C2175 -> L1:C2210. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-4fdef115e32e19b6`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in js/background at L1:C438 -> L1:C439
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in js/background at L1:C2175 -> L1:C2210
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/static/static_report.json`.
- Dynamic (ExPGuard): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/dynamic/dynamic_report.json`.
- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/static/static_report.json`.
- Dynamic (CoCo): `EXTERNAL_CONDITION_REQUIRED` (basis `external_condition_required`); a sender-side precondition was recorded; this is not an unconditional runtime reproduction; report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/static/static_report.json`; dynamic report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/dynamic/dynamic_report.json`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/static/static_report.json`; dynamic report `extensions/iedifognpinkpfaemlnnniomklocpcnh_2.4/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `missing` (No reliable public email found)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
