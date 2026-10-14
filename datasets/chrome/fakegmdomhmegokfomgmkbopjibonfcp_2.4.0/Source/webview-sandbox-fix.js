;(function metastreamWebviewSandboxFixScript() {
  // Fix for setting document.domain in sandboxed iframe
  try {
    Object.defineProperty(document, 'domain', {
      value: document.domain,
      writable: true
    })
  } catch (e) {}

  // Fix for sandboxed iframe detection
  try {
    Object.defineProperty(HTMLObjectElement.prototype, 'onerror', {
      set: () => {}
    })
  } catch (e) {}
})()
