self.getPopupId = async () => {
  const tabs = await chrome.tabs.query({
    url: 'https://*.leadiq.com/extension/*'
  })
  return tabs[0] ? tabs[0].id : null
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
self.sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Checks if the side panel is currently open by querying Chrome's context API.
 *
 * @returns {Promise<boolean>}
 */
self.isSidePanelOpen = async function () {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ['SIDE_PANEL']
  })
  return contexts.length > 0
}

self.reloadLinkedinTabs = async () => {
  const tabs = await chrome.tabs.query({ url: '*://*.linkedin.com/*' })
  for (const tab of tabs) {
    chrome.tabs.reload(tab.id)
  }
}

self.getFirstActiveLinkedinTab = async () => {
  const tabs = await chrome.tabs.query({
    url: 'https://*.linkedin.com/*',
    active: true
  })
  return tabs[0]
}

async function getWindowIdForTab (tabId) {
  if (!tabId) return undefined
  try {
    const tab = await chrome.tabs.get(tabId)
    return tab.windowId
  } catch (e) {
    console.warn('Failed to get window ID for tab:', e)
    return undefined
  }
}

self.getLastFocusedWindowId = async function () {
  const { lastFocusedTabId } = await chrome.storage.session.get('lastFocusedTabId')

  if (lastFocusedTabId) {
    const windowId = await getWindowIdForTab(lastFocusedTabId)
    if (windowId) return windowId
  }

  try {
    const currentWindow = await chrome.windows.getCurrent()
    return currentWindow.id
  } catch (e) {
    return undefined
  }
}

/**
 * Gets the last focused tab, falling back to current active tab if none found
 *
 * WARNING: The lastFocusedTabId is only tracked for websites where the
 * 'prospector-last-focused-tab' content script is injected. For other sites,
 * this will fall back to the current active tab which may not be reliable
 * in popup mode since it could return the popup window itself.
 *
 * @returns {Promise<chrome.tabs.Tab|null>}
 */
self.getLastFocusedTab = async function () {
  const { lastFocusedTabId } = await chrome.storage.session.get('lastFocusedTabId')

  if (lastFocusedTabId) {
    try {
      const tab = await chrome.tabs.get(lastFocusedTabId)
      return tab
    } catch (e) {
      console.warn('Last focused tab not found, falling back to current active tab:', e)
    }
  }

  // Fallback to current active tab
  try {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })
    return activeTab || null
  } catch (e) {
    console.error('Failed to get any active tab:', e)
    return null
  }
}

/**
 * @returns {Promise<boolean>}
 */
self.isUiOpen = async function () {
  return Boolean(await self.getPopupId() || await self.isSidePanelOpen())
}

/**
 * Opens either the side panel or the popup, based on user preference
 * Defaults to sidepanel if no preference is set
 *
 * @param {chrome.tabs.Tab} tab
 * @returns {void}
 */
self.openUI = async function (tab) {
  chrome.storage.local.get(['preferSidePanel'], result => {
    // Default to sidepanel if no preference set (undefined) or explicitly true
    if (result.preferSidePanel !== false && chrome.sidePanel) {
      self.openSidePanel(tab)
    } else {
      self.setupPopup()
    }
  })
}
