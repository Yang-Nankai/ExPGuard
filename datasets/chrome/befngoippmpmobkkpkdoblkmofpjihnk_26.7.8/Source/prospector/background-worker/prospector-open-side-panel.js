/**
 * Opens the side panel in the specified tab's window.
 *
 * @param {chrome.tabs.Tab} tab
 * @returns {void}
 */
self.openSidePanel = function (tab) {
  chrome.sidePanel.setOptions({ enabled: true })
  chrome.sidePanel.open({ windowId: tab.windowId })

  chrome.storage.local.get(['popupWindowId'], result => {
    if (result.popupWindowId) {
      chrome.windows.remove(result.popupWindowId).catch(() => {})
    }
  })
}

/**
 * Navigates the extension UI to the Lando agent chat once it's open. Waits for
 * the side panel to finish loading on a cold start before sending, mirroring the
 * readiness check in the SEARCH_BY_NAME context-menu handler. An optional prompt
 * is forwarded so the agent chat can pre-fill it into the input on arrival.
 *
 * @param {string} [prompt]
 * @returns {Promise<void>}
 */
self.openLandoUi = async function (prompt) {
  if (!(await self.isUiOpen())) await self.sleep(5000)
  self.sendMessageToUI({ type: 'OPEN_POPUP', page: 'agent', prompt })
}
