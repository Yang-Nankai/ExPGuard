// A page controls the request payload, but the content script sends it using
// the same network authority as that page. A REQUEST_FORGERY rule matches,
// then the privilege-delta gate records the reason for suppressing it.
window.addEventListener("message", (event) => {
  fetch("https://collector.example/x", {
    method: "POST",
    body: JSON.stringify(event.data),
  });
});
