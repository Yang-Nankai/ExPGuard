# Security Vulnerability Report: High Sensitive Data Exposure in A+ FontSize Changer

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **A+ FontSize Changer** (edge, extension ID `imepglbecbimebpacblphbefkkmglnia`, version `1.5.3`).
The recorded issue type(s): **Sensitive Data Exposure**.

## Affected Extension Details

- Name: A+ FontSize Changer
- Platform: edge
- Extension ID: `imepglbecbimebpacblphbefkkmglnia`
- Dataset version: `1.5.3`
- Store version at review: `1.5.3`
- Users: 4222
- Analysis tools: DoubleX

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `CHROME_IDENTITY_PROFILE` (chrome.identity.getProfileUserInfo) in background.js at L275 to the privileged sink `WINDOW_POSTMESSAGE` (userInfo) in background.js at L278. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-2acf7467bda0b355`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_IDENTITY_PROFILE` (chrome.identity.getProfileUserInfo) in background.js at L275
- Sink: `WINDOW_POSTMESSAGE` (userInfo) in background.js at L278
- Tools reporting this Flow: DoubleX

- Privilege boundary recorded: `True` (None); Sensitive extension data is returned to a web-accessible channel.

#### Analysis and validation

- Static (DoubleX): verdict `FALSE_POSITIVE`, confidence 0.6; report `extensions/imepglbecbimebpacblphbefkkmglnia_1.5.3/static/static_report.json`.
- Dynamic (DoubleX): `CONFIRMED` (evidence stage `MARKER_REACHED`); runtime reproduction recorded; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-21-r2\dynamic\doublex-edge-r2\summary.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.5.3` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- DoubleX: source report `DoubleX/edge/flow-verification-results-no-duplicate.json`; static report `extensions/imepglbecbimebpacblphbefkkmglnia_1.5.3/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Ablation\ExPAgent\runs\round-doublex-edge-unconfirmed-21-r2\dynamic\doublex-edge-r2\summary.json`.


## Recommendations

1. Never return sensitive extension data to an untrusted page or external sender; enforce an explicit origin and sender allowlist.
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
