// The cookie is read and placed into the Cookie request HEADER — normal
// authenticated-request behavior. This must be suppressed (no DATA_LEAK).
// The domain is tagged on the source (sourceRemark = "cookies(https://api.self.example)").
chrome.cookies.get({ url: "https://api.self.example", name: "session" }, (cookie) => {
  fetch("https://api.self.example/data", {
    method: "GET",
    headers: { Cookie: cookie.value },
  });
});
