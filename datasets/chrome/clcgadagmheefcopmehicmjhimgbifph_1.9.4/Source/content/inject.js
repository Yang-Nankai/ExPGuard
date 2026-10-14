(function () {
  var g_historyCursor = window.g_historyCursor;
  if (g_historyCursor) {
    document.dispatchEvent(
      new CustomEvent("ReadVariable", { detail: g_historyCursor })
    );
  }
})();
