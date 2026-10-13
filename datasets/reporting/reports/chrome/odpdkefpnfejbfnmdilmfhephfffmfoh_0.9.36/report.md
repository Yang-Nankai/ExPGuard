# Security Vulnerability Report: High CSRF via Privileged Network Request and Unauthorized Tab/Window Control in Readlang Web Reader

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Readlang Web Reader** (chrome, extension ID `odpdkefpnfejbfnmdilmfhephfffmfoh`, version `0.9.36`).
The recorded issue type(s): **CSRF via Privileged Network Request; Unauthorized Tab/Window Control**.

The store currently reports version `0.9.43`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Readlang Web Reader
- Platform: chrome
- Extension ID: `odpdkefpnfejbfnmdilmfhephfffmfoh`
- Dataset version: `0.9.36`
- Store version at review: `0.9.43`
- Users: 100000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35 to the privileged sink `FETCH_RESOURCE` ([Unknown URL]) in src/background at L159:C27 -> L170:C12. The source scope is on pages matching `https://readlang.com/*, https://test.readlang.com/*, http://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f04d786096221daa`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35
- Sink: `FETCH_RESOURCE` ([Unknown URL]) in src/background at L159:C27 -> L170:C12
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1
- DoubleX: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_RESOURCE`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36/static/static_report.json`.
- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36\dynamic\dynamic_report.json`.
- Static (DoubleX): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36/static/static_report.json`.
- Dynamic (DoubleX): `INCONCLUSIVE_AFTER_DEBUG` (basis `runtime_or_static_dynamic_evidence`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.9.36` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36\dynamic\dynamic_report.json`.
- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36/static/static_report.json`; dynamic report `extensions/odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36/dynamic/dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in src/background at L259:C4 -> L271:C5. The source scope is on pages matching `https://readlang.com/*, https://test.readlang.com/*, http://localhost/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-f882838e033e2e8d`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/contentScript at L20:C13 -> L20:C35
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in src/background at L259:C4 -> L271:C5
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `CHROME_WINDOWS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `PARTIAL` (basis `non_decisive`; evidence stage `SINK_REACHED`); the recorded replay did not establish the complete source-to-sink effect; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `0.9.36` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\odpdkefpnfejbfnmdilmfhephfffmfoh_0.9.36\dynamic\dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
