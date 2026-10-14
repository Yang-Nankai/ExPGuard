// Handlers must always be declared at the top-level, or they'll be killed
// when the worker becomes inactive.
chrome.action.onClicked.addListener((tab) => {
  self.openUI(tab)
})

// Constants for all context menu IDs
const SEARCH_BY_NAME_MENU_ID = 'search-by-name-right-click-menu'
const OPEN_POPUP_MENU_ID = 'leadiq-open-popup'
const OPEN_SIDE_PANEL_MENU_ID = 'leadiq-open-side-panel'

// Handle context menu actions, AKA right click on the main icon
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  switch (info.menuItemId) {
    case OPEN_POPUP_MENU_ID:
      self.setupPopup()
      chrome.storage.local.set({ preferSidePanel: false })
      break

    case OPEN_SIDE_PANEL_MENU_ID:
      self.openSidePanel(tab)
      chrome.storage.local.set({ preferSidePanel: true })
      break

    case SEARCH_BY_NAME_MENU_ID: {
      const { selectionText: value, pageUrl: url } = info
      const message = { type: 'HIGHLIGHT_NAME', payload: { value, url } }

      // sidePanel.open() can only be done inside a "user gesture"
      // In practice that means we cannot do any `await` in front of it
      // So go ahead and always open the UI fist, then we can immediately check
      // if the UI is open. That check should still fail if the UI was just opened
      // which is goood, we then wait before sending the message.
      self.openUI(tab)

      if (!(await self.isUiOpen())) {
        await self.sleep(5000)
      }

      self.sendMessageToUI(message)
      break
    }
  }
})

// Listen for changes to the preference to update context menus
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.preferSidePanel) {
    self.recreateContextMenuItems()
  }
})

// Export the function to make it available to other modules
self.recreateContextMenuItems = async function () {
  const result = await chrome.storage.local.get(['preferSidePanel'])
  await chrome.contextMenus.removeAll()

  // Create only the relevant menu item based on current preference
  // Default to sidepanel if no preference set (undefined) or explicitly true
  if (result.preferSidePanel !== false) {
    chrome.contextMenus.create({
      id: OPEN_POPUP_MENU_ID,
      title: 'Open as popup',
      contexts: ['action']
    })
  } else {
    chrome.contextMenus.create({
      id: OPEN_SIDE_PANEL_MENU_ID,
      title: 'Open as side panel',
      contexts: ['action']
    })
  }

  // Create the search by name context menu
  chrome.contextMenus.create({
    id: SEARCH_BY_NAME_MENU_ID,
    title: 'Search lead by name',
    contexts: ['selection']
  })
}
