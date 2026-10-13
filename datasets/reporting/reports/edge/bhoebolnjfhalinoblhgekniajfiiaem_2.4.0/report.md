# Security Vulnerability Report: Critical Unauthorized Tab/Window Control in Diccionario RAE en bocadillo

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Diccionario RAE en bocadillo** (edge, extension ID `bhoebolnjfhalinoblhgekniajfiiaem`, version `2.4.0`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

The store currently reports version `2.4.2`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Diccionario RAE en bocadillo
- Platform: edge
- Extension ID: `bhoebolnjfhalinoblhgekniajfiiaem`
- Dataset version: `2.4.0`
- Store version at review: `2.4.2`
- Users: 884
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_VALUE` (event(contextmenu)) in content at L250:C12 -> L250:C30 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in popup at L70:C2 -> L70:C101. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-ff85e26dccdef430`
- Severity recorded by the analysis: **CRITICAL**
- Source: `ELEMENT_VALUE` (event(contextmenu)) in content at L250:C12 -> L250:C30
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in popup at L70:C2 -> L70:C101
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `ELEMENT_VALUE` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/bhoebolnjfhalinoblhgekniajfiiaem_2.4.0/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `ENVIRONMENT_READY`); the recorded replay did not hit the exact sink; this run is inconclusive and is not a runtime confirmation; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bhoebolnjfhalinoblhgekniajfiiaem_2.4.0\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.4.0` in a disposable edge profile.
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

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `extensions/bhoebolnjfhalinoblhgekniajfiiaem_2.4.0/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\edge\extensions\bhoebolnjfhalinoblhgekniajfiiaem_2.4.0\dynamic\dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
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
