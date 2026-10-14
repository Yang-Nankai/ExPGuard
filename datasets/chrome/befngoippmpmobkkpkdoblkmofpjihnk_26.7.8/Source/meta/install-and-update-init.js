// Despite the event name, this also fires on update and simply on reload
chrome.runtime.onInstalled.addListener(async () => {
  console.info('Extension init: installed or updated')

  self.registerScripts()
  self.injectContentScriptsManually()

  self.recreateContextMenuItems()

  // Note: We used to auto-open the popup on install, but the side panel
  // cannot be programmatically opened. It must be from a user gesture.
})

// Registering should not be done at the top level like this, instead
// it should go inside the onInstalled handler.
// However, we suspect there are bugs that sometimes do not call the
// onInstalled handler on update.

// See https://leadiq.slack.com/archives/C02RWG9N0NS/p1700731799971739
// and the chromium bug report links within that thread,
//
// Let's do this on every worker wake up as a precaution.
setTimeout(() => {
  self.registerScriptsSafeFallback()
  self.injectContentScriptsManually()
}, 2000)

// Similarly, ensure context menus are created as a fallback
setTimeout(
  self.recreateContextMenuItems,
  1000
)
