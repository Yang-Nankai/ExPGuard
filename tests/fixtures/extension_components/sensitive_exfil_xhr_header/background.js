// Cookie sent via XHR setRequestHeader — benign auth. The header suppression
// must work across network APIs (fetch / XHR / axios), so this must NOT be a
// DATA_LEAK.
chrome.cookies.get({ url: "https://api.self.example", name: "session" }, (cookie) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.self.example/data");
  xhr.setRequestHeader("Authorization", "Bearer " + cookie.value);
  xhr.send();
});
