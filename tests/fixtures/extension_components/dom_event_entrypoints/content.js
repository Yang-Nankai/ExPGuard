// Every source here sits inside a *standard* DOM event handler. Those handlers
// used to be skipped outright, so none of this code was analyzed at all.

// 1. click handler reading the event target
document.addEventListener("click", function (e) {
  chrome.runtime.sendMessage({ kind: "click", url: e.target.value });
});

// 2. querySelectorAll(...).forEach(...) registration loop — the idiom real
//    form-hijacking / keylogging code uses
document.querySelectorAll('input[type="password"]').forEach(function (input) {
  input.addEventListener("input", function () {
    chrome.runtime.sendMessage({ kind: "input", url: input.value });
  });
});

// 3. element-level DOM traversal from the event target
document.addEventListener("submit", function (e) {
  const form = e.target.closest("form");
  const field = form.querySelector('input[type="email"]');
  chrome.runtime.sendMessage({ kind: "submit", url: field.value });
});
