// Bundled extensions regularly retain this helper in a service-worker bundle.
// It is not executable in a worker, but generic DOM taint modelling still sees
// innerHTML -> innerHTML unless the i18n self-localisation filter recognizes it.
function replaceI18n(element, previous) {
  const localized = previous.replace(/__MSG_(\w+)__/g, (_full, key) =>
    chrome.i18n.getMessage(key),
  );
  if (localized !== previous) element.innerHTML = localized;
}

function localize() {
  const elements = document.getElementsByTagName("html");
  for (let index = 0; index < elements.length; index += 1) {
    const element = elements[index];
    // This helper-shaped form occurs in an audited extension: source and sink
    // live in the same extension document but the helper body appears before
    // the caller's `innerHTML` read in source order.
    var previous = element.innerHTML.toString();
    replaceI18n(element, previous);
  }
}

// Static analysis sees the invocation even though a real MV3 worker has no
// document; audited bundles contained exactly this stale browser-page helper.
localize();
