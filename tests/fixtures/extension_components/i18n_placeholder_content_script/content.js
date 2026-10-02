// The same syntactic helper inside a content script must NOT be suppressed:
// webpage JavaScript can mutate this DOM before this extension code executes.
function localize() {
  const elements = document.getElementsByTagName("html");
  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index];
    const previous = element.innerHTML;
    const localized = previous.replace(/__MSG_extension_name__/g, (_full) =>
      chrome.i18n.getMessage("extension_name"),
    );
    element.innerHTML = localized;
  }
}

localize();
