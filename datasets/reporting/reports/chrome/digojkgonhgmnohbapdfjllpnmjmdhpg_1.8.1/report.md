# Security Vulnerability Report: High Unauthorized Tab/Window Control in ProctorExam Activity Sharing

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **ProctorExam Activity Sharing** (chrome, extension ID `digojkgonhgmnohbapdfjllpnmjmdhpg`, version `1.8.1`).
The recorded issue type(s): **Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: ProctorExam Activity Sharing
- Platform: chrome
- Extension ID: `digojkgonhgmnohbapdfjllpnmjmdhpg`
- Dataset version: `1.8.1`
- Store version at review: `1.8.1`
- Users: 800000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-script at L61:C9 -> L61:C19 to the privileged sink `CHROME_TABS_CREATE_OPTIONS` in background-script at L72:C4 -> L72:C42. The source scope is on pages matching `https://*.proctorexam.com/check_requirements/*, https://*.proctorexam.com/student_sessions/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-6426b45222283fca`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in content-script at L61:C9 -> L61:C19
- Sink: `CHROME_TABS_CREATE_OPTIONS` in background-script at L72:C4 -> L72:C42
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/digojkgonhgmnohbapdfjllpnmjmdhpg_1.8.1/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `inconclusive`); the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/digojkgonhgmnohbapdfjllpnmjmdhpg_1.8.1/dynamic/dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.8.1` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/digojkgonhgmnohbapdfjllpnmjmdhpg_1.8.1/static/static_report.json`; dynamic report `extensions/digojkgonhgmnohbapdfjllpnmjmdhpg_1.8.1/dynamic/dynamic_report.json`.


## Recommendations

1. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
2. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
