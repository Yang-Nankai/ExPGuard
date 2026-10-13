# Security Vulnerability Report: Critical Extension Storage Poisoning in Solventum Fluency Direct Web Connector

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Solventum Fluency Direct Web Connector** (chrome, extension ID `phgddhgfnjjaobkeekohieahfingldac`, version `5.14.1.142`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `5.14.3.170`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Solventum Fluency Direct Web Connector
- Platform: chrome
- Extension ID: `phgddhgfnjjaobkeekohieahfingldac`
- Dataset version: `5.14.1.142`
- Store version at review: `5.14.3.170`
- Users: 1000000
- Analysis tools: CoCo, ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(fdWebExtension.multipleConnectionSupport)) in content-script at L66:C25 -> L66:C33 to the privileged sink `CHROME_LOCAL_STORAGE` (fdWebExtension.multipleConnectionSupport) in background at L88:C2 -> L88:C80. The source scope is on pages matching `http://*/*, https://*/*, file:///*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-32c2f271c8723c41`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(fdWebExtension.multipleConnectionSupport)) in content-script at L66:C25 -> L66:C33
- Sink: `CHROME_LOCAL_STORAGE` (fdWebExtension.multipleConnectionSupport) in background at L88:C2 -> L88:C80
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.14.1.142` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/static/static_report.json`; dynamic report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(fdWebExtension.saveToStorage)) in content-script at L50:C14 -> L50:C22 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in content-script at L53:C4 -> L53:C46. The source scope is on pages matching `http://*/*, https://*/*, file:///*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-779d17cc8caf85f9`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(fdWebExtension.saveToStorage)) in content-script at L50:C14 -> L50:C22
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in content-script at L53:C4 -> L53:C46
- Tools reporting this Flow: ExPGuard, CoCo

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 2
- CoCo: `tool_failure`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_LOCAL_STORAGE`; candidate matches: 0

#### Analysis and validation

- Static (CoCo): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/static/static_report.json`.
- Dynamic (CoCo): `CONFIRMED` (basis `runtime_or_static_dynamic_evidence`); runtime reproduction recorded; report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `5.14.1.142` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Replace EVENT_NAME and the documented field names with the handler's
// public event contract. Do not use real URLs, tokens, or credentials.
document.dispatchEvent(new CustomEvent("EVENT_NAME", {
  detail: { marker: "EXPGuard_test_marker" }
}));
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.
- CoCo: source report `CoCo/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/static/static_report.json`; dynamic report `extensions/phgddhgfnjjaobkeekohieahfingldac_5.14.1.142/dynamic/dynamic_report.json`.


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
