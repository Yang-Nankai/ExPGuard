# Security Vulnerability Report: High CSRF via Privileged Network Request and Sensitive Data Exposure in Boomerang for Gmail

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Boomerang for Gmail** (chrome, extension ID `mdanidgdpmkimeiiojknlnekblgmpdll`, version `1.9.4`).
The recorded issue type(s): **CSRF via Privileged Network Request; Sensitive Data Exposure**.

The store currently reports version `1.9.6`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Boomerang for Gmail
- Platform: chrome
- Extension ID: `mdanidgdpmkimeiiojknlnekblgmpdll`
- Dataset version: `1.9.4`
- Store version at review: `1.9.6`
- Users: 800000
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `CHROME_MANAGEMENT_INFO` (chrome.management.getAll) in background.js at L179 to the privileged sink `WINDOW_POSTMESSAGE` ({
				type: "B4G_RESPONDABLE_OUTPUT",
				metrics: request.metrics
			}) in content_scripts.js at L459. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-af11b6331b0a250f`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_MANAGEMENT_INFO` (chrome.management.getAll) in background.js at L179
- Sink: `WINDOW_POSTMESSAGE` ({
				type: "B4G_RESPONDABLE_OUTPUT",
				metrics: request.metrics
			}) in content_scripts.js at L459
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Updated-version tool result

- DoubleX: `still_detected`; original source `CHROME_MANAGEMENT_INFO` → sink `WINDOW_POSTMESSAGE`; candidate matches: 1

#### Analysis and validation

- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/mdanidgdpmkimeiiojknlnekblgmpdll_1.9.4/static/static_report.json`.
- Dynamic (DoubleX): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-unconfirmed-20-r1\dynamic\doublex-r1\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.9.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdanidgdpmkimeiiojknlnekblgmpdll_1.9.4/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-unconfirmed-20-r1\dynamic\doublex-r1\summary.json`.

### Finding 2: Cross-Site Request Forgery (CSRF) / Privileged Network Request

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in b4g at L245:C8 -> L245:C23 to the privileged sink `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-48B3G8LRPQ&api_secret=uIAXRk5NR3m2Mef57TbpxQ) in background at L210:C8 -> L216:C12. The source scope is on pages matching `https://mail.google.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c41cf394ecba6bf6`
- Severity recorded by the analysis: **MEDIUM**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in b4g at L245:C8 -> L245:C23
- Sink: `FETCH_BODY` (https://www.google-analytics.com/mp/collect?measurement_id=G-48B3G8LRPQ&api_secret=uIAXRk5NR3m2Mef57TbpxQ) in background at L210:C8 -> L216:C12
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `WINDOW_MESSAGE_EVENT` → sink `FETCH_BODY`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/mdanidgdpmkimeiiojknlnekblgmpdll_1.9.4/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/mdanidgdpmkimeiiojknlnekblgmpdll_1.9.4/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.9.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/mdanidgdpmkimeiiojknlnekblgmpdll_1.9.4/static/static_report.json`; dynamic report `extensions/mdanidgdpmkimeiiojknlnekblgmpdll_1.9.4/dynamic/dynamic_report.json`.


## Recommendations

1. Authenticate page-to-extension events at the privilege boundary; validate the sender and origin instead of trusting DOM event detail.
2. Validate the request schema and restrict destination URLs, methods, headers, and bodies before issuing privileged network requests.
3. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
