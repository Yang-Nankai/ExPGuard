# Security Vulnerability Report: High Extension Storage Poisoning in Rakuten Drive (Transfer&Cloud)

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **1 Flow(s)** in **Rakuten Drive (Transfer&Cloud)** (chrome, extension ID `pagahecnnmjjlpoakhagcpnalaodfbkk`, version `24.2.4`).
The recorded issue type(s): **Extension Storage Poisoning**.

## Affected Extension Details

- Name: Rakuten Drive (Transfer&Cloud)
- Platform: chrome
- Extension ID: `pagahecnnmjjlpoakhagcpnalaodfbkk`
- Dataset version: `24.2.4`
- Store version at review: `24.2.4`
- Users: 30000
- Analysis tools: ExPGuard

## Findings

### Finding 1: Storage Poisoning

The Ground Truth record traces A page or sender able to reach the recorded message/event source from `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/content-script at L402:C61 -> L402:C70 to the privileged sink `CHROME_SYNC_STORAGE` (options) in src/service_worker at L156:C6 -> L156:C42. The source scope is on pages matching `*://*.slack.com/*, *://mail.google.com/*, *://inbox.google.com/*, *://*.chatwork.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-89cb74c3c80f9ccc`
- Severity recorded by the analysis: **HIGH**
- Source: `WINDOW_MESSAGE_EVENT` (window.addEventListener(message)) in src/content-script at L402:C61 -> L402:C70
- Sink: `CHROME_SYNC_STORAGE` (options) in src/service_worker at L156:C6 -> L156:C42
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/pagahecnnmjjlpoakhagcpnalaodfbkk_24.2.4/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG` (basis `non_decisive`; evidence stage `LISTENER_READY`); the dynamic run did not establish a decisive runtime result; report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\pagahecnnmjjlpoakhagcpnalaodfbkk_24.2.4\dynamic\dynamic_report.json`.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `24.2.4` in a disposable chrome profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
// Use only a harmless marker in a disposable profile.
window.postMessage({ marker: "EXPGuard_test_marker" }, "*");
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/chrome/flow-verification-results-no-duplicate.json`; static report `extensions/pagahecnnmjjlpoakhagcpnalaodfbkk_24.2.4/static/static_report.json`; dynamic report `D:\Ph0jav7\ExtensionSecurity\ExPGuard-Data\Top5000\ExPGuard-Opti\chrome\extensions\pagahecnnmjjlpoakhagcpnalaodfbkk_24.2.4\dynamic\dynamic_report.json`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

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
