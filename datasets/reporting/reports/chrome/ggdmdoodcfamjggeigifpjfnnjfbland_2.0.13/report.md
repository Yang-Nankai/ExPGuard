# Security Vulnerability Report: Critical Arbitrary File Download and Unauthorized Tab/Window Control in OrangeMonkey Pro

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **OrangeMonkey Pro** (chrome, extension ID `ggdmdoodcfamjggeigifpjfnnjfbland`, version `2.0.13`).
The recorded issue type(s): **Arbitrary File Download; Unauthorized Tab/Window Control**.

The store currently reports version `2.0.15`. The update revalidation is summarized per tool below. This report covers only the original Flow(s); newly introduced Flow(s) are out of scope. Any mixed result, tool failure, or incomplete automated run is called out explicitly and should not be read as a final remediation determination.

## Affected Extension Details

- Name: OrangeMonkey Pro
- Platform: chrome
- Extension ID: `ggdmdoodcfamjggeigifpjfnnjfbland`
- Dataset version: `2.0.13`
- Store version at review: `2.0.15`
- Users: 300000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Arbitrary File Download

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(OMC)) in injected at L766:C12 -> L766:C20 to the privileged sink `CHROME_DOWNLOADS_OPTIONS` in background at L1:C68000 -> L1:C68028. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a64dd657db4615d6`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(OMC)) in injected at L766:C12 -> L766:C20
- Sink: `CHROME_DOWNLOADS_OPTIONS` in background at L1:C68000 -> L1:C68028
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_DOWNLOADS_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`; evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ggdmdoodcfamjggeigifpjfnnjfbland_2.0.13\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.13` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\ggdmdoodcfamjggeigifpjfnnjfbland_2.0.13\dynamic\dynamic_report.json`.

### Finding 2: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `TARGET_CUSTOM_EVENT` (target.addEventListener(OMC)) in injected at L766:C12 -> L766:C20 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in background at L1:C68748 -> L1:C68795. The source scope is on pages matching `<all_urls>`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-b2bfb523a2b40905`
- Severity recorded by the analysis: **CRITICAL**
- Source: `TARGET_CUSTOM_EVENT` (target.addEventListener(OMC)) in injected at L766:C12 -> L766:C20
- Sink: `CHROME_TABS_CREATE_OPTIONS` in background at L1:C68748 -> L1:C68795
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Updated-version tool result

- ExPGuard: `still_detected`; original source `TARGET_CUSTOM_EVENT` → sink `CHROME_TABS_CREATE_OPTIONS`; candidate matches: 1

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/ggdmdoodcfamjggeigifpjfnnjfbland_2.0.13/static/static_report.json`.
- Dynamic (ExPGuard): `CONFIRMED` (basis `runtime_reproduced`); runtime reproduction recorded; report `extensions/ggdmdoodcfamjggeigifpjfnnjfbland_2.0.13/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `2.0.13` in a disposable chrome profile.
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

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/ggdmdoodcfamjggeigifpjfnnjfbland_2.0.13/static/static_report.json`; dynamic report `extensions/ggdmdoodcfamjggeigifpjfnnjfbland_2.0.13/dynamic/dynamic_report.json`.


## Recommendations

1. Restrict download URLs and filenames, and require a visible user gesture before starting downloads.
2. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
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
