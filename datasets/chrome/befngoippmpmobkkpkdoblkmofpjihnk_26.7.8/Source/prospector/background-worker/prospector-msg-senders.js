self.sendMessageToUI = async function (messageObject) {
  // Try to send to popup first
  const popupId = await self.getPopupId()

  if (popupId) {
    try {
      await chrome.tabs.sendMessage(popupId, messageObject)
      return // If successful, don't try side panel
    } catch (e) {
      console.info('Failed to send to popup, will try side panel:', e)
    }
  }

  // If no popup or sending to popup failed, try side panel
  const lastFocusedWindowId = await self.getLastFocusedWindowId()

  if (lastFocusedWindowId) {
    await chrome.runtime.sendMessage({
      type: 'WORKER_TO_SIDEPANEL',
      payload: messageObject,
      lastFocusedWindowId
    })
  }
}

self.sendRequestToTabs = (type = 'REQUEST_STATE', payload = undefined) => {
  chrome.tabs.query(
    { }, // Query all tabs
    tabs => {
      tabs.forEach(async tab => {
        // But only send the message to tabs for which we have permission
        try {
          if (tab.url) {
            await chrome.tabs.sendMessage(
              tab.id,
              {
                type,
                payload
              }
            )
          }
        } catch (_e) {
          console.info('Prospector tried requesting state from a tab without content scripts')
        }
      })
    }
  )
}

self.isSenderTheLatestFocusedTab = async (sender) => {
  const { lastFocusedTabId } = await chrome.storage.session.get('lastFocusedTabId')

  // When there's nothing in the cache, skip this check
  if (!lastFocusedTabId) return true

  // If the saved tab is no longer open or active, skip this check
  let tab
  try { tab = await chrome.tabs.get(lastFocusedTabId) } catch { return true }
  if (!tab.active) return true

  return lastFocusedTabId === sender.tab.id
}
