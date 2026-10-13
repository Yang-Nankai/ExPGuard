# Security Vulnerability Report: Medium Extension Storage Poisoning and Unauthorized Tab/Window Control in 'Improve YouTube!'  🎧 (For YouTube & Video)

## Summary

We are writing on behalf of a security research team from Nankai University and the University of Liverpool. Our Ground Truth review identified **4 Flow(s)** in **'Improve YouTube!'  🎧 (For YouTube & Video)** (firefox, extension ID `{3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf}`, version `4.2081`).
The recorded issue type(s): **Extension Storage Poisoning; Unauthorized Tab/Window Control**.

## Affected Extension Details

- Name: 'Improve YouTube!'  🎧 (For YouTube & Video)
- Platform: firefox
- Extension ID: `{3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf}`
- Dataset version: `4.2081`
- Store version at review: `4.2081`
- Users: 100849
- Analysis tools: ExPGuard

## Findings

### Finding 1: Unauthorized Tab or Window Manipulation

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31 to the privileged sink `CHROME_WINDOWS_CREATE_OPTIONS` in background at L354:C5 -> L354:C32. The source scope is on pages matching `https://www.youtube.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-0a3e37f73c5f85ac`
- Severity recorded by the analysis: **MEDIUM**
- Source: `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31
- Sink: `CHROME_WINDOWS_CREATE_OPTIONS` in background at L354:C5 -> L354:C32
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
nguage.substring(0, 2) + '/messages.json').then
```

**Sink code anchor (excerpt):**

```javascript
.tabId = tID;}
					chrome.windows.create(data);

					//append to 
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.2081` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 2: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31 to the privileged sink `CHROME_LOCAL_STORAGE` (unknown) in js&css/extension/init at L276:C4 -> L276:C62. The source scope is on pages matching `https://www.youtube.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-7123a346fb3d3fc9`
- Severity recorded by the analysis: **MEDIUM**
- Source: `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31
- Sink: `CHROME_LOCAL_STORAGE` (unknown) in js&css/extension/init at L276:C4 -> L276:C62
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
essage = JSON.parse(message);
		} catch (error)
```

**Sink code anchor (excerpt):**

```javascript
essage.value) {
				chrome.storage.local.set({ [message.key]: message.value });
			} else {
				ch
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Static (ExPGuard): verdict `TRUE_POSITIVE`, confidence 0.6; report `extensions/{3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf}_4.2081/static/static_report.json`.
- Dynamic (ExPGuard): `INCONCLUSIVE_AFTER_DEBUG`; the dynamic agent exceeded its 30-second budget, so this run did not establish a decisive runtime result; report `extensions/{3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf}_4.2081/dynamic/dynamic_report.json`.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.2081` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `extensions/{3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf}_4.2081/static/static_report.json`; dynamic report `extensions/{3c6bf0cc-3ae2-42fb-9993-0d33104fdcaf}_4.2081/dynamic/dynamic_report.json`.

### Finding 3: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31 to the privileged sink `CHROME_LOCAL_STORAGE` (watched) in js&css/extension/init at L700:C2 -> L702:C4. The source scope is on pages matching `https://www.youtube.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-c9948e1b432449b3`
- Severity recorded by the analysis: **MEDIUM**
- Source: `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31
- Sink: `CHROME_LOCAL_STORAGE` (watched) in js&css/extension/init at L700:C2 -> L702:C4
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
essage = JSON.parse(message);
		} catch (error)
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.2081` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.

### Finding 4: Storage Poisoning

The Ground Truth record traces Input reaching the recorded source from `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31 to the privileged sink `CHROME_LOCAL_STORAGE` (watched) in js&css/extension/init at L271:C3 -> L273:C5. The source scope is on pages matching `https://www.youtube.com/*`. The reported issue is that this data reaches the extension capability at the sink; the concrete effect is limited to the operation shown by that API and the extension's runtime permissions.

- Ground Truth Flow: `gtf-cc4088c398f974c4`
- Severity recorded by the analysis: **MEDIUM**
- Source: `ELEMENT_TEXT_CONTENT` (#it-messages-from-youtube) in js&css/extension/init at L167:C24 -> L167:C31
- Sink: `CHROME_LOCAL_STORAGE` (watched) in js&css/extension/init at L271:C3 -> L273:C5
- Tools reporting this Flow: ExPGuard

**Source code anchor (excerpt):**

```javascript
essage = JSON.parse(message);
		} catch (error)
```

**Sink code anchor (excerpt):**

```javascript
ssage.id];
			}

			chrome.storage.local.set({
				watched: extension.storage.data.watched
			});
		} else if (messa
```

- Privilege boundary recorded: `True` (CONTENT_SCRIPT_MATCHES); sink grants capability beyond the source origin

#### Analysis and validation

- Dynamic: no structured dynamic-verification result is attached to this Flow in the Ground Truth dataset.
- Manual review: Ground Truth records `TP` — the dataset records manual confirmation that this Flow is reachable and produces its associated privileged effect.

#### Steps to reproduce

Use a disposable profile and a benign marker. Do not use real credentials or personal data.

1. Install and enable version `4.2081` in a disposable firefox profile.
2. Deliver the harmless marker through the source described below.
3. Observe the sink using the browser's extension developer tools and verify whether the marker reaches it.

#### Proof-of-concept payload

```js
const input = document.getElementById("access_key") || document.querySelector("input");
if (input) {
  input.value = "EXPGuard_test_marker";
  input.dispatchEvent(new Event("input", { bubbles: true }));
}
```

#### Supporting material

- ExPGuard: source report `ExPGuard-Opti/firefox/flow-verification-results-no-duplicate.json`; static report `not recorded`; dynamic report `not recorded`.


## Recommendations

1. Do not let page-controlled cookies or DOM values select extension-owned storage values; validate the expected value and keep credentials in extension-owned UI/state.
2. Treat storage writes as privileged state changes: use an allowlisted schema, reject attacker-controlled keys, and avoid merging untrusted objects into extension state.
3. Validate tab/window IDs and navigation targets, and require a user gesture for externally initiated changes.
4. Reduce host permissions and sensitive API access to the smallest scope required by the feature.

## Impact

The demonstrated impact is limited to the operation described in each finding and the extension's granted permissions. The evidence above distinguishes the recorded static path from any runtime result; it does not imply unrelated account compromise, data theft, or malware installation.

## Disclosure Status

- Report class: `version_unchanged`
- This report covers only the listed Ground Truth Flow(s). Newly introduced Flow(s) are outside scope.
- Contact discovery: `found` (Mozilla Add-ons API support_email)

Please contact us so that we can coordinate remediation and retest the affected Flow(s).

Regards,
Xin Yang
Nankai University / University of Liverpool
