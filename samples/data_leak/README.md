# Data leakage across the extension privilege boundary

This intentionally vulnerable Manifest V3 extension demonstrates the paper's
Data Leak class. A webpage on `https://*.lab.example/*` can ask the service worker
for cookies belonging to `https://private.example.test/` or recent browser
history. Those permission-gated records leave through `sendResponse`, which
returns them directly to the requesting webpage. The attacker cannot obtain
these cross-origin cookies or browser history with ordinary webpage APIs.

The command check selects an operation; it does not authorize the caller.
`externally_connectable` admits every subdomain of `lab.example`, including an
attacker-controlled subdomain. The service worker never checks `sender.origin`.
The asynchronous API callbacks return data and the listener returns `true` to
keep the response channel open. There are no network exfiltration or DOM XSS
paths in this example.

Build and verify with ExPGuard:

```sh
npm ci
npm run build
node dist/main.js analyze --type DIR --input samples/data_leak --out output/data_leak --id aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa --extension-version 1.0.0
```

Expected reported flows (both `DATA_LEAK`):

| Sensitive source | Attacker-observable sink |
| --- | --- |
| `CHROME_COOKIES_INFO` | `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` |
| `CHROME_HISTORY_INFO` | `CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE` |

The checked-in `verification/summary.json` is the actual ExPGuard static
analysis result. `verification/synthetic-runtime.json` records a Node.js API
mock check of the asynchronous response logic; it is not a browser exploit
reproduction. The mock uses synthetic records only.

For a browser demonstration, load only in an isolated test profile with
synthetic cookies and history. From a controlled matching HTTPS webpage:

```js
chrome.runtime.sendMessage("<loaded-extension-id>", { kind: "READ_COOKIES" }, response => {
  console.log(response.cookies);
});
chrome.runtime.sendMessage("<loaded-extension-id>", { kind: "READ_HISTORY" }, response => {
  console.log(response.history);
});
```
