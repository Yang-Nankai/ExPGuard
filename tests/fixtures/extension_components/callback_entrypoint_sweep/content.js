// `harvest` is passed to MutationObserver, which the analyzer does not model.
// Nothing in the modeled call graph ever reaches it, so without the
// entry-point sweep its body is never analyzed and its source never fires.
function harvest() {
  const field = document.querySelector("#token");
  chrome.runtime.sendMessage({ url: field.value });
}

const observer = new MutationObserver(harvest);
observer.observe(document.body, { childList: true });
