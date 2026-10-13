# Security Vulnerability Report: High Extension Storage Poisoning in FunPay Lite Bot

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **FunPay Lite Bot** (chrome, extension ID `amicfiagmpbgfiiopieeemlkblfeeeip`, version `2.0.7`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `2.3.5`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: FunPay Lite Bot
- Platform: chrome
- Extension ID: `amicfiagmpbgfiiopieeemlkblfeeeip`
- Dataset version: `2.0.7`
- Store version at review: `2.3.5`
- Users: 60000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_VALUE` (.lb-review-textarea) in content/c at L217:C1424 -> L217:C1428 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in content/c at L7:C1541 -> L7:C1568. The source scope is on pages matching `https://funpay.com/*, https://*.funpay.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-39ad68a575b09dd1`
- Severity recorded by the analysis: **HIGH**
- Source: `ELEMENT_VALUE` (.lb-review-textarea) in content/c at L217:C1424 -> L217:C1428
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in content/c at L7:C1541 -> L7:C1568
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_VALUE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `ENVIRONMENT_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7\dynamic\dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_VALUE` (select.LB-select) in content/c at L88:C6893 -> L88:C6897 to the privileged sink `CHROME_LOCAL_STORAGE` (null) in content/c at L7:C1541 -> L7:C1568. The source scope is on pages matching `https://funpay.com/*, https://*.funpay.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-cc459a48ac381e2d`
- Severity recorded by the analysis: **HIGH**
- Source: `ELEMENT_VALUE` (select.LB-select) in content/c at L88:C6893 -> L88:C6897
- Sink: `CHROME_LOCAL_STORAGE` (null) in content/c at L7:C1541 -> L7:C1568
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_VALUE` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 8

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `ENVIRONMENT_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.7` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\amicfiagmpbgfiiopieeemlkblfeeeip_2.0.7\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
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
