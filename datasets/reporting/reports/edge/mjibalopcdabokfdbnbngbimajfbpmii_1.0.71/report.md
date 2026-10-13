# Security Vulnerability Report: High Sensitive Data Exposure in Psychological AI

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Psychological AI** (edge, extension ID `mjibalopcdabokfdbnbngbimajfbpmii`, version `1.0.71`).
The recorded issue type(s): **Sensitive Data Exposure**.

## Affected Extension Details

- Name: Psychological AI
- Platform: edge
- Extension ID: `mjibalopcdabokfdbnbngbimajfbpmii`
- Dataset version: `1.0.71`
- Store version at review: `1.0.71`
- Users: 387
- Analysis tools: ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `CHROME_COOKIES_INFO` (cookies(.www.linkedin.com)) in scripts/background at L72:C19 -> L72:C31 to the privileged sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in scripts/background at L76:C6 -> L76:C83. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-a008f3ed73976cd2`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_COOKIES_INFO` (cookies(.www.linkedin.com)) in scripts/background at L72:C19 -> L72:C31
- Sink: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in scripts/background at L76:C6 -> L76:C83
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.71` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Run on a disposable page matching the extension's content-script pattern.
// The value is a harmless test marker, not a real account identifier.
const cookieValue = encodeURIComponent(JSON.stringify({
  distinct_id: "EXPGuard_test_marker"
}));
document.cookie = "<the exact cookie name used by the extension>=" + cookieValue + "; path=/";
// Reload the page or trigger the extension's normal feature flow.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Sensitive Data Exposure

The Ground Truth record traces Input reaching the recorded source from `CHROME_COOKIES_INFO` in scripts/background at L71:C4 -> L77:C6 to the privileged sink `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in scripts/background at L76:C6 -> L76:C83. The source scope is in the recorded source context. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-efc792535de67b16`
- Severity recorded by the analysis: **HIGH**
- Source: `CHROME_COOKIES_INFO` in scripts/background at L71:C4 -> L77:C6
- Sink: `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` (chrome.runtime.onMessageExternal.addListener[sendResponse]) in scripts/background at L76:C6 -> L76:C83
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (EXTERNALLY_CONNECTABLE); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `1.0.71` in a disposable edge profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Run on a disposable page matching the extension's content-script pattern.
// The value is a harmless test marker, not a real account identifier.
const cookieValue = encodeURIComponent(JSON.stringify({
  distinct_id: "EXPGuard_test_marker"
}));
document.cookie = "<the exact cookie name used by the extension>=" + cookieValue + "; path=/";
// Reload the page or trigger the extension's normal feature flow.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/edge/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


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
