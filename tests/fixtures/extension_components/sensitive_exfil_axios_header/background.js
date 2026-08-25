// Cross-API suppression: the cookie goes into the axios request HEADERS
// (Authorization) — normal authenticated request. axios maps that to
// AXIOS_HEADERS, which suppress-sensitive-data-request-headers filters out.
// Must NOT be a DATA_LEAK.
chrome.cookies.get({ url: "https://api.self.example", name: "session" }, (cookie) => {
  axios.get("https://api.self.example/data", {
    headers: { Authorization: "Bearer " + cookie.value },
  });
});
