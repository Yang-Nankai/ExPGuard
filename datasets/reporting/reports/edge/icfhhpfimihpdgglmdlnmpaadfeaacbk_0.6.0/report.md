# Security Vulnerability Report: Critical Arbitrary File Download in External Application Launcher

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **External Application Launcher** (edge, extension ID `icfhhpfimihpdgglmdlnmpaadfeaacbk`, version `0.6.0`).
The recorded issue type(s): **Arbitrary File Download**.

The store currently reports version `0.6.1`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: External Application Launcher
- Platform: edge
- Extension ID: `icfhhpfimihpdgglmdlnmpaadfeaacbk`
- Dataset version: `0.6.0`
- Store version at review: `0.6.1`
- Users: 1410
- Analysis tools: ExPGuard

## Findings

### Finding 1: Arbitrary File Download

The Ground Truth record traces An external extension able to message this extension from `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in worker at L612:C16 -> L612:C23 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in worker at L142:C4 -> L164:C6. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-d969a6ad86f83759`
- Severity recorded by the analysis: **CRITICAL**
- Source: `CHROME_ONMESSAGEEXTERNAL_MESSAGE` (chrome.runtime.onMessageExternal.addListener[message]) in worker at L612:C16 -> L612:C23
- Sink: `CHROME_DOWNLOADS_OPTIONS` in worker at L142:C4 -> L164:C6
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `CHROME_ONMESSAGEEXTERNAL_MESSAGE` → sink `CHROME_DOWNLOADS_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `PARTIAL`, confidence 0.6; report `extensions/icfhhpfimihpdgglmdlnmpaadfeaacbk_0.6.0/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\icfhhpfimihpdgglmdlnmpaadfeaacbk_0.6.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.6.0` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/icfhhpfimihpdgglmdlnmpaadfeaacbk_0.6.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\icfhhpfimihpdgglmdlnmpaadfeaacbk_0.6.0\dynamic\dynamic_report.json`.


## Recommendations

1. Restrict download URLs and filenames, and require a visible user gesture before starting downloads.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
