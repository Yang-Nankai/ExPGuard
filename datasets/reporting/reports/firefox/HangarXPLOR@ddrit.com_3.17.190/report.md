# Security Vulnerability Report: High Sensitive Data Exposure in Star Citizen Hangar XPLORer

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **2 Flow(s)** in **Star Citizen Hangar XPLORer** (firefox, extension ID `HangarXPLOR@ddrit.com`, version `3.17.190`).

The recorded issue type(s): **Sensitive Data Exposure**.

Ground Truth review flagged Flows in which data read from extension storage in the content-script loader is passed to a window.postMessage sink using a wildcard target origin on pages matching robertsspaceindustries.com account pledge URLs. The evidence is static only: the recorded static verdict is UNCERTAIN and no dynamic or manual confirmation is attached.

## Affected Extension Details

- Name: Star Citizen Hangar XPLORer
- Platform: firefox
- Extension ID: `HangarXPLOR@ddrit.com`
- Dataset version: `3.17.190`
- Store version at review: `3.17.190`
- Users: 1934
- Analysis tools: DoubleX, ExPGuard

## Findings

### Finding 1: Sensitive Data Exposure

Flow gtf-08258bdca2e66f99 traces data from STORAGE_ALL_ITEMS (storage.dynamic.items[sync]) at content_scripts/loader L82:C102 -> L82:C216 to a WINDOW_POSTMESSAGE sink with a wildcard (*) target at the same location, within content scripts scoped to https://robertsspaceindustries.com/*/account/pledges* and https://www.robertsspaceindustries.com/*/account/pledges*. The record flags a true (unknown) privilege boundary because the sink can deliver data beyond the source origin, but the concrete effect is limited to the operation shown by that API and the extension's runtime permissions. The Flow is reported by ExPGuard and DoubleX; the DoubleX static verdict is UNCERTAIN (confidence 0), and no dynamic or manual verification result is attached.
- Ground Truth Flow: `gtf-08258bdca2e66f99`
- Severity recorded by the analysis: **HIGH**
- Source: `STORAGE_ALL_ITEMS` (storage.dynamic.items[sync]) in content_scripts/loader at L82:C102 -> L82:C216
- Sink: `WINDOW_POSTMESSAGE` (*) in content_scripts/loader at L82:C102 -> L82:C216
- Tools reporting this Flow: ExPGuard, DoubleX

- Privilege boundary recorded: `True` (UNKNOWN); sink grants capability beyond the source origin

#### Analysis and validation

- Static (DoubleX): verdict `UNCERTAIN`, confidence 0; report `extensions/HangarXPLOR@ddrit.com_3.17.190/static/static_report.json`.
- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.17.190` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.
- DoubleX: source report `DoubleX/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/HangarXPLOR@ddrit.com_3.17.190/static/static_report.json`; dynamic report `not recorded`.

### Finding 2: Sensitive Data Exposure

Flow gtf-6f9f809f9e0d6ddd traces data from STORAGE_ALL_ITEMS (storage.dynamic.items[local]) at content_scripts/loader L87:C104 -> L87:C218 to a WINDOW_POSTMESSAGE sink with a wildcard (*) target at the same location, on the same robertsspaceindustries.com account pledge pages. It records the same true (unknown) privilege boundary, and the observable effect is limited to the operation exposed by window.postMessage and the extension's granted permissions. The Flow is reported by ExPGuard only, with no static, dynamic, or manual validation result attached.
- Ground Truth Flow: `gtf-6f9f809f9e0d6ddd`
- Severity recorded by the analysis: **LOW**
- Source: `STORAGE_ALL_ITEMS` (storage.dynamic.items[local]) in content_scripts/loader at L87:C104 -> L87:C218
- Sink: `WINDOW_POSTMESSAGE` (*) in content_scripts/loader at L87:C104 -> L87:C218
- Tools reporting this Flow: ExPGuard

- Privilege boundary recorded: `True` (UNKNOWN); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: no structured manual-validation record is present for this Flow in the dataset.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `3.17.190` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```text
Deliver the benign marker EXPGuard_test_marker through the source shown in
the finding, then observe whether it reaches the privileged sink.
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Replace the wildcard target origin in window.postMessage calls in content_scripts/loader with an explicit origin, and validate event.origin on the receiving side against a strict allowlist.
2. Avoid forwarding raw chrome.storage contents to page-context messages; send only the minimal fields the Hangar feature needs and strip or redact account-identifying values.
3. Verify that page-context messaging is actually required for the storage data in these Flows; prefer keeping it in the extension context and rendering results without exposing it to the page.
4. If page-to-extension messaging is required, use a per-session random channel name or token and verify the sender frame before acting on storage-derived data.
5. Reduce content-script host matches for the affected code to the exact robertsspaceindustries.com pledge paths needed, rather than broad account page patterns.

## Impact

The recorded Flows indicate extension storage data may reach page-context window.postMessage calls with a wildcard target origin on the affected pledge pages, limited to the operation shown by that API and the extension's granted permissions; no dynamic confirmation, account compromise, or data theft is established by the evidence.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
