const scriptUrl = chrome.runtime.getURL("injected.js");
const script = document.createElement("script");
script.src = scriptUrl;
(document.head || document.documentElement).appendChild(script);

// Ordinary isolated-world code execution remains a real TP because this
// callback executes with the extension's content-script authority.
window.addEventListener("isolated-run", (event) => {
  const fn = new Function(event.detail.script);
  fn();
});
