# Security Vulnerability Report: Critical Extension Storage Poisoning in Global Speed - Video Speed Control

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Global Speed - Video Speed Control** (chrome, extension ID `jpbjcnkcffbooppibceonlgknpkniiff`, version `3.3.18`).
The recorded issue type(s): **Extension Storage Poisoning**.

The store currently reports version `3.4.124`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: Global Speed - Video Speed Control
- Platform: chrome
- Extension ID: `jpbjcnkcffbooppibceonlgknpkniiff`
- Dataset version: `3.3.18`
- Store version at review: `3.4.124`
- Users: 700000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_URL` (document.URL) in isolated at L1:C26919 -> L1:C26935 to the privileged sink `CHROME_SESSION_STORAGE` (unknown) in isolated at L1:C70792 -> L1:C70821. The source scope is on pages matching `https://*/*, http://*/*, file://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-88e49eca874ab02c`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_URL` (document.URL) in isolated at L1:C26919 -> L1:C26935
- Sink: `CHROME_SESSION_STORAGE` (unknown) in isolated at L1:C70792 -> L1:C70821
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `DOCUMENT_URL` → sink `CHROME_SESSION_STORAGE`; candidate matches: 2

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/jpbjcnkcffbooppibceonlgknpkniiff_3.3.18/static/static_report.json`.
- Dynamic (ExPGuard): `PRECONDITION_UNMET` (basis `inconclusive`); this result does not independently confirm execution at the sink; report `extensions/jpbjcnkcffbooppibceonlgknpkniiff_3.3.18/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.3.18` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/jpbjcnkcffbooppibceonlgknpkniiff_3.3.18/static/static_report.json`; dynamic report `extensions/jpbjcnkcffbooppibceonlgknpkniiff_3.3.18/dynamic/dynamic_report.json`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `DOCUMENT_TITLE` (document.title) in isolated at L1:C69113 -> L1:C70540 to the privileged sink `CHROME_SESSION_STORAGE` (unknown) in isolated at L1:C70792 -> L1:C70821. The source scope is on pages matching `https://*/*, http://*/*, file://*/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b812c3028887482c`
- Severity recorded by the analysis: **CRITICAL**
- Source: `DOCUMENT_TITLE` (document.title) in isolated at L1:C69113 -> L1:C70540
- Sink: `CHROME_SESSION_STORAGE` (unknown) in isolated at L1:C70792 -> L1:C70821
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `DOCUMENT_TITLE` → sink `CHROME_SESSION_STORAGE`; candidate matches: 2

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.3.18` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


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
